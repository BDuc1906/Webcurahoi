import { Injectable } from '@nestjs/common';
import { MessageEvent } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Observable } from 'rxjs';
import { PrismaService } from '../../prisma/prisma.service';
import { FinanceEventsService } from '../events/finance-events.service';
import { statementInclude, toStatementRow } from '../lib/mappers';
import { HonorRollQuery, StatementQuery } from './statement.schemas';

@Injectable()
export class StatementService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly events: FinanceEventsService,
  ) {}

  /** Bảng sao kê công khai: giao dịch mới nhất ở dòng đầu tiên. */
  async list(q: StatementQuery) {
    const where: Prisma.PaymentTransactionWhereInput = {
      status: 'COMPLETED',
      ...(q.purpose ? { purpose: q.purpose } : {}),
      ...(q.campaign ? { campaign: { slug: q.campaign } } : {}),
      // Không cho tìm theo tên của nhà hảo tâm ẩn danh
      ...(q.q ? { payerName: { contains: q.q, mode: 'insensitive' as const }, isAnonymous: false } : {}),
    };

    const [total, rows] = await this.prisma.$transaction([
      this.prisma.paymentTransaction.count({ where }),
      this.prisma.paymentTransaction.findMany({
        where,
        orderBy: { completedAt: 'desc' },
        skip: (q.page - 1) * q.limit,
        take: q.limit,
        include: statementInclude,
      }),
    ]);

    return { page: q.page, limit: q.limit, total, items: rows.map(toStatementRow) };
  }

  /** Tổng quỹ thiện nguyện, tổng hội phí, tổng lượt giao dịch đối soát. */
  async summary() {
    const [byPurpose, disbursed, latest] = await Promise.all([
      this.prisma.paymentTransaction.groupBy({
        by: ['purpose'],
        where: { status: 'COMPLETED' },
        _sum: { amount: true },
        _count: { _all: true },
      }),
      this.prisma.disbursement.aggregate({ _sum: { amount: true } }),
      this.prisma.paymentTransaction.findFirst({
        where: { status: 'COMPLETED' },
        orderBy: { completedAt: 'desc' },
        select: { completedAt: true },
      }),
    ]);

    const sum = (purpose: string) => Number(byPurpose.find((x) => x.purpose === purpose)?._sum.amount ?? 0);
    const count = (purpose: string) => byPurpose.find((x) => x.purpose === purpose)?._count._all ?? 0;

    return {
      totalCharity: sum('CHARITY_DONATION'),
      totalMembershipFees: sum('ANNUAL_MEMBERSHIP_FEE'),
      totalEstablishmentFees: sum('ESTABLISHMENT_FEE'),
      totalFees: sum('ANNUAL_MEMBERSHIP_FEE') + sum('ESTABLISHMENT_FEE'),
      totalDisbursed: Number(disbursed._sum.amount ?? 0),
      totalTransactions: byPurpose.reduce((n, x) => n + x._count._all, 0),
      charityCount: count('CHARITY_DONATION'),
      lastTransactionAt: latest?.completedAt ?? null,
    };
  }

  /** Bảng vàng vinh danh nhà hảo tâm (không gồm người chọn ẩn danh). */
  async honorRoll(q: HonorRollQuery) {
    const now = new Date();
    const since =
      q.period === 'quarter'
        ? new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1)
        : q.period === 'year'
          ? new Date(now.getFullYear(), 0, 1)
          : undefined;

    const rows = await this.prisma.paymentTransaction.groupBy({
      by: ['payerName', 'payerType'],
      where: {
        status: 'COMPLETED',
        purpose: 'CHARITY_DONATION',
        isAnonymous: false,
        ...(since ? { completedAt: { gte: since } } : {}),
      },
      _sum: { amount: true },
      _count: { _all: true },
      orderBy: { _sum: { amount: 'desc' } },
      take: q.limit,
    });

    return rows.map((r, i) => ({
      rank: i + 1,
      name: r.payerName,
      payerType: r.payerType,
      totalAmount: Number(r._sum.amount ?? 0),
      donations: r._count._all,
    }));
  }

  /** SSE: mỗi giao dịch mới thành công được đẩy tới mọi trình duyệt đang mở trang sao kê. */
  stream(): Observable<MessageEvent> {
    return new Observable<MessageEvent>((subscriber) => {
      const off = this.events.on('payment:completed', (row) => subscriber.next({ type: 'payment', data: row }));
      const heartbeat = setInterval(() => subscriber.next({ type: 'ping', data: { t: Date.now() } }), 25_000);
      return () => {
        clearInterval(heartbeat);
        off();
      };
    });
  }
}

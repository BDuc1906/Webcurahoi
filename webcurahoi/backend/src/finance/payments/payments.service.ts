import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { MessageEvent } from '@nestjs/common';
import { PaymentMethod, Prisma } from '@prisma/client';
import { Observable } from 'rxjs';
import { env } from '../../config/env';
import { PrismaService } from '../../prisma/prisma.service';
import { FinanceEventsService } from '../events/finance-events.service';
import { generateCode } from '../lib/codes';
import { PURPOSE_LABEL } from '../lib/labels';
import { statementInclude, toPaymentDto, toStatementRow } from '../lib/mappers';
import { renderReceiptHtml } from '../lib/receipt-html';
import { MailService } from '../mail/mail.service';
import { AdminPaymentsQuery, ConfirmPaymentInput, CreatePaymentInput } from './payments.schemas';

interface ResolvedTarget {
  amount: number;
  payerType: 'INDIVIDUAL' | 'ORGANIZATION';
  campaignId?: string;
  unitId?: string;
  obligationId?: string;
}

export interface CompleteOptions {
  method: PaymentMethod;
  verified: boolean;
  bankRef?: string;
  bankGateway?: string;
  completedAt?: Date;
}

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly events: FinanceEventsService,
    private readonly mail: MailService,
  ) {}

  // ---------------------------------------------------------------- Bước 1-2
  /** Tạo giao dịch chờ thanh toán + sinh mã VietQR động (số tiền cố định). */
  async create(input: CreatePaymentInput) {
    const target = await this.resolveTarget(input);

    for (let attempt = 0; attempt < 5; attempt++) {
      const code = generateCode(input.purpose);
      try {
        const tx = await this.prisma.paymentTransaction.create({
          data: {
            code,
            purpose: input.purpose,
            payerType: target.payerType,
            payerName: input.payerName,
            payerEmail: input.payerEmail,
            payerPhone: input.payerPhone,
            isAnonymous: input.isAnonymous,
            note: input.note,
            amount: BigInt(target.amount),
            status: 'PENDING',
            method: 'VIETQR',
            expiresAt: new Date(Date.now() + env.PAYMENT_TTL_MINUTES * 60_000),
            campaignId: target.campaignId,
            unitId: target.unitId,
            obligationId: target.obligationId,
          },
        });
        return toPaymentDto(tx);
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') continue; // trùng mã, thử lại
        throw e;
      }
    }
    throw new InternalServerErrorException('Không tạo được mã giao dịch, vui lòng thử lại');
  }

  private async resolveTarget(input: CreatePaymentInput): Promise<ResolvedTarget> {
    switch (input.purpose) {
      case 'CHARITY_DONATION': {
        if (!input.campaignSlug) throw new BadRequestException('Thiếu campaignSlug (chiến dịch thiện nguyện)');
        if (!input.amount) throw new BadRequestException('Thiếu số tiền đóng góp');
        const campaign = await this.prisma.campaign.findUnique({ where: { slug: input.campaignSlug } });
        if (!campaign || campaign.status !== 'ACTIVE') {
          throw new NotFoundException('Chiến dịch không tồn tại hoặc đã kết thúc');
        }
        return { amount: input.amount, payerType: input.payerType, campaignId: campaign.id };
      }

      case 'ANNUAL_MEMBERSHIP_FEE': {
        // Hội viên cá nhân
        if (!input.unitCode) {
          if (!input.amount) throw new BadRequestException('Thiếu số tiền hội phí');
          return { amount: input.amount, payerType: 'INDIVIDUAL' };
        }
        // Chi hội / Viện / Doanh nghiệp: gán chính xác mã đơn vị + số tiền còn nợ
        const unit = await this.prisma.feeUnit.findUnique({ where: { code: input.unitCode } });
        if (!unit || !unit.active) throw new NotFoundException(`Không tìm thấy đơn vị ${input.unitCode}`);

        const year = input.year ?? new Date().getFullYear();
        const ob = await this.prisma.feeObligation.findUnique({
          where: { unitId_year: { unitId: unit.id, year } },
        });
        if (!ob) throw new NotFoundException(`Đơn vị chưa có nghĩa vụ hội phí năm ${year}`);

        const remaining = Number(ob.amountDue - ob.amountPaid);
        if (ob.status === 'PAID' || ob.status === 'WAIVED' || remaining <= 0) {
          throw new ConflictException(`Đơn vị đã hoàn thành hội phí năm ${year}`);
        }
        const amount = input.amount ?? remaining;
        if (amount > remaining) {
          throw new BadRequestException(`Số tiền vượt quá số còn nợ (${remaining} đ)`);
        }
        return { amount, payerType: 'ORGANIZATION', unitId: unit.id, obligationId: ob.id };
      }

      case 'ESTABLISHMENT_FEE': {
        if (!input.amount) throw new BadRequestException('Thiếu số tiền phí');
        if (input.feeScheduleCode) {
          const schedule = await this.prisma.feeSchedule.findUnique({ where: { code: input.feeScheduleCode } });
          if (!schedule || !schedule.active) throw new NotFoundException('Không tìm thấy biểu mức phí');
          if (schedule.minAmount != null && BigInt(input.amount) < schedule.minAmount) {
            throw new BadRequestException(`Số tiền thấp hơn mức quy định (${schedule.minAmount} đ)`);
          }
          if (schedule.maxAmount != null && BigInt(input.amount) > schedule.maxAmount) {
            throw new BadRequestException(`Số tiền cao hơn mức quy định (${schedule.maxAmount} đ)`);
          }
        }
        let unitId: string | undefined;
        if (input.unitCode) {
          const unit = await this.prisma.feeUnit.findUnique({ where: { code: input.unitCode } });
          if (!unit) throw new NotFoundException(`Không tìm thấy đơn vị ${input.unitCode}`);
          unitId = unit.id;
        }
        return { amount: input.amount, payerType: input.payerType, unitId };
      }
    }
  }

  // ---------------------------------------------------------------- Trạng thái
  async getStatus(code: string) {
    const tx = await this.prisma.paymentTransaction.findUnique({ where: { code } });
    if (!tx) throw new NotFoundException('Không tìm thấy giao dịch');
    return toPaymentDto(tx);
  }

  /** SSE: đẩy sự kiện "completed" / "expired" ngay khi webhook ngân hàng khớp giao dịch. */
  streamStatus(code: string): Observable<MessageEvent> {
    return new Observable<MessageEvent>((subscriber) => {
      let closed = false;

      const offDone = this.events.on('payment:completed', (row) => {
        if (row.code !== code) return;
        subscriber.next({ type: 'completed', data: row });
        subscriber.complete();
      });
      const offExpired = this.events.on('payment:expired', (e) => {
        if (e.code !== code) return;
        subscriber.next({ type: 'expired', data: e });
        subscriber.complete();
      });

      this.getStatus(code)
        .then((status) => {
          if (closed) return;
          subscriber.next({ type: 'status', data: status });
          if (status.status !== 'PENDING') subscriber.complete();
        })
        .catch((err) => subscriber.error(err));

      const heartbeat = setInterval(() => subscriber.next({ type: 'ping', data: { t: Date.now() } }), 25_000);

      return () => {
        closed = true;
        clearInterval(heartbeat);
        offDone();
        offExpired();
      };
    });
  }

  // ---------------------------------------------------------------- Bước 3-5
  /**
   * Chốt giao dịch đã thu tiền (idempotent):
   * cập nhật nghĩa vụ hội phí, phát sự kiện real-time lên sao kê, gửi email biên lai.
   * Trả null nếu giao dịch đã được xử lý trước đó.
   */
  async completePayment(txId: string, opts: CompleteOptions) {
    const done = await this.prisma.$transaction(async (db) => {
      const claimed = await db.paymentTransaction.updateMany({
        where: { id: txId, status: { in: ['PENDING', 'EXPIRED'] } },
        data: {
          status: 'COMPLETED',
          completedAt: opts.completedAt ?? new Date(),
          method: opts.method,
          verified: opts.verified,
          bankRef: opts.bankRef,
          bankGateway: opts.bankGateway,
        },
      });
      if (claimed.count === 0) return null;

      const tx = await db.paymentTransaction.findUniqueOrThrow({
        where: { id: txId },
        include: statementInclude,
      });

      if (tx.obligationId) {
        const ob = await db.feeObligation.update({
          where: { id: tx.obligationId },
          data: { amountPaid: { increment: tx.amount } },
        });
        const fullyPaid = ob.amountPaid >= ob.amountDue;
        await db.feeObligation.update({
          where: { id: ob.id },
          data: { status: fullyPaid ? 'PAID' : 'PARTIAL', paidAt: fullyPaid ? new Date() : null },
        });
      }
      return tx;
    });

    if (!done) return null;

    this.events.emit('payment:completed', toStatementRow(done));
    void this.sendReceiptEmail(done.code).catch((e) =>
      this.logger.error(`Gửi email biên lai ${done.code} thất bại: ${e instanceof Error ? e.message : e}`),
    );
    return done;
  }

  /** Biên lai điện tử (hiển thị tại chỗ, in, tải). */
  async getReceipt(code: string) {
    const tx = await this.prisma.paymentTransaction.findUnique({
      where: { code },
      include: statementInclude,
    });
    if (!tx) throw new NotFoundException('Không tìm thấy giao dịch');
    if (tx.status !== 'COMPLETED' || !tx.completedAt) {
      throw new ConflictException('Giao dịch chưa thanh toán thành công');
    }
    return {
      receiptNo: `BL-${tx.code}`,
      issuer: 'TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM',
      stamp: 'HỆ THỐNG ĐÃ THU TIỀN VÀO TÀI KHOẢN TRUNG ƯƠNG HỘI',
      code: tx.code,
      payerName: tx.payerName,
      amount: Number(tx.amount),
      purpose: tx.purpose,
      purposeLabel: PURPOSE_LABEL[tx.purpose],
      campaign: tx.campaign,
      unit: tx.unit,
      bankGateway: tx.bankGateway,
      completedAt: tx.completedAt,
    };
  }

  private async sendReceiptEmail(code: string): Promise<void> {
    const tx = await this.prisma.paymentTransaction.findUnique({ where: { code }, include: statementInclude });
    if (!tx || !tx.payerEmail || !tx.completedAt || tx.receiptEmailSentAt) return;

    const html = renderReceiptHtml({
      receiptNo: `BL-${tx.code}`,
      code: tx.code,
      payerName: tx.payerName,
      amount: Number(tx.amount),
      purposeLabel: PURPOSE_LABEL[tx.purpose],
      targetName: tx.campaign?.name ?? tx.unit?.name ?? null,
      bankGateway: tx.bankGateway,
      completedAt: tx.completedAt,
    });
    const sent = await this.mail.send(tx.payerEmail, `Biên lai điện tử ${tx.code} - Hội GDCSSKCĐ VN`, html);
    if (sent) {
      await this.prisma.paymentTransaction.update({ where: { id: tx.id }, data: { receiptEmailSentAt: new Date() } });
    }
  }

  // ---------------------------------------------------------------- Hết hạn
  /** Chuyển các giao dịch quá hạn (mặc định 10 phút) sang EXPIRED. */
  async expirePending(): Promise<void> {
    const due = await this.prisma.paymentTransaction.findMany({
      where: { status: 'PENDING', expiresAt: { lt: new Date() } },
      select: { id: true, code: true },
    });
    if (due.length === 0) return;

    await this.prisma.paymentTransaction.updateMany({
      where: { id: { in: due.map((d) => d.id) }, status: 'PENDING' },
      data: { status: 'EXPIRED' },
    });
    for (const d of due) this.events.emit('payment:expired', { code: d.code });
  }

  // ---------------------------------------------------------------- Quản trị
  async adminConfirm(code: string, input: ConfirmPaymentInput) {
    const tx = await this.prisma.paymentTransaction.findUnique({ where: { code } });
    if (!tx) throw new NotFoundException('Không tìm thấy giao dịch');
    if (tx.status === 'COMPLETED') throw new ConflictException('Giao dịch đã được xác nhận trước đó');

    const done = await this.completePayment(tx.id, {
      method: input.method,
      verified: false, // xác nhận thủ công, chưa đối soát tự động
      bankRef: input.bankRef,
    });
    if (!done) throw new ConflictException('Giao dịch đã được xử lý');
    return toStatementRow(done);
  }

  async adminList(q: AdminPaymentsQuery) {
    const where: Prisma.PaymentTransactionWhereInput = q.status ? { status: q.status } : {};
    const [total, rows] = await this.prisma.$transaction([
      this.prisma.paymentTransaction.count({ where }),
      this.prisma.paymentTransaction.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (q.page - 1) * q.limit,
        take: q.limit,
        include: statementInclude,
      }),
    ]);
    return {
      page: q.page,
      limit: q.limit,
      total,
      items: rows.map((tx) => ({
        ...toStatementRow(tx),
        status: tx.status,
        payerName: tx.payerName,
        payerEmail: tx.payerEmail,
        bankRef: tx.bankRef,
        createdAt: tx.createdAt,
      })),
    };
  }
}

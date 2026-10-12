import { BadRequestException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Prisma, WebhookResult } from '@prisma/client';
import { env } from '../../config/env';
import { safeEqual } from '../../common/safe-equal';
import { PrismaService } from '../../prisma/prisma.service';
import { extractCode } from '../lib/codes';
import { PaymentsService } from '../payments/payments.service';
import { bankWebhookSchema } from './bank-webhook.schemas';

function parseVietnamTime(value?: string): Date {
  if (!value) return new Date();
  const d = new Date(`${value.replace(' ', 'T')}+07:00`);
  return Number.isNaN(d.getTime()) ? new Date() : d;
}

@Injectable()
export class BankWebhookService {
  private readonly logger = new Logger(BankWebhookService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly payments: PaymentsService,
  ) {}

  /**
   * Nhận biến động số dư từ ngân hàng/cổng trung gian (SePay, Casso...).
   * Khớp mã giao dịch trong nội dung chuyển khoản -> tự động chốt giao dịch.
   */
  async handle(authHeader: string | undefined, body: unknown) {
    if (!safeEqual(authHeader ?? '', `Apikey ${env.WEBHOOK_API_KEY}`)) {
      throw new UnauthorizedException('Sai khóa webhook');
    }

    const parsed = bankWebhookSchema.safeParse(body);
    if (!parsed.success) throw new BadRequestException('Payload webhook không hợp lệ');
    const p = parsed.data;

    const externalId = p.id != null ? String(p.id) : (p.referenceCode ?? null);

    // Chống xử lý trùng khi ngân hàng gửi lại webhook
    if (externalId) {
      const seen = await this.prisma.webhookLog.findUnique({
        where: { provider_externalId: { provider: 'BANK', externalId } },
      });
      if (seen) return { success: true, note: 'duplicate' };
    }

    const log = (result: WebhookResult, transactionCode?: string, note?: string) =>
      this.writeLog(externalId, body, result, transactionCode, note);

    if (p.transferType && p.transferType.toLowerCase() !== 'in') {
      await log('IGNORED', undefined, 'Không phải giao dịch tiền vào');
      return { success: true };
    }

    const code = extractCode(p.content, p.code);
    if (!code) {
      await log('NO_MATCH', undefined, 'Không tìm thấy mã giao dịch VACHE trong nội dung');
      return { success: true };
    }

    const tx = await this.prisma.paymentTransaction.findUnique({ where: { code } });
    if (!tx) {
      await log('NO_MATCH', code, 'Mã giao dịch không tồn tại');
      return { success: true };
    }
    if (tx.status === 'COMPLETED') {
      await log('DUPLICATE', code, 'Giao dịch đã hoàn tất trước đó');
      return { success: true };
    }
    if (BigInt(Math.round(p.transferAmount)) !== tx.amount) {
      await log('AMOUNT_MISMATCH', code, `Cần ${tx.amount}, nhận ${p.transferAmount}`);
      this.logger.warn(`Sai số tiền giao dịch ${code}: cần ${tx.amount}, nhận ${p.transferAmount}`);
      return { success: true };
    }

    await this.payments.completePayment(tx.id, {
      method: 'VIETQR',
      verified: true,
      bankRef: externalId ?? undefined,
      bankGateway: p.gateway,
      completedAt: parseVietnamTime(p.transactionDate),
    });
    await log('MATCHED', code);
    return { success: true };
  }

  private async writeLog(
    externalId: string | null,
    payload: unknown,
    result: WebhookResult,
    transactionCode?: string,
    note?: string,
  ) {
    try {
      await this.prisma.webhookLog.create({
        data: {
          provider: 'BANK',
          externalId,
          payload: payload as Prisma.InputJsonValue,
          result,
          transactionCode,
          note,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === 'P2002') return; // webhook gửi trùng song song
      throw e;
    }
  }
}

import { Body, Controller, Get, MessageEvent, Param, Post, Sse, HttpCode } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Observable } from 'rxjs';
import { ZodValidationPipe } from '../../common/zod-validation.pipe';
import { CreatePaymentInput, createPaymentSchema } from './payments.schemas';
import { PaymentsService } from './payments.service';
import { env } from '../../config/env';

/** Cổng thanh toán tự động: tạo mã -> chờ -> bắt giao dịch -> biên lai. */
@Controller('finance/payments')
export class PaymentsController {
  constructor(private readonly payments: PaymentsService) {}

  // Bước 1-2: tạo mã VietQR
  @Post()
  @Throttle({ default: { limit: 10, ttl: 60_000 } })
  create(@Body(new ZodValidationPipe(createPaymentSchema)) body: CreatePaymentInput) {
    return this.payments.create(body);
  }

  @Get(':code')
  status(@Param('code') code: string) {
    return this.payments.getStatus(code);
  }

  // Bước 3: client mở EventSource để nhận "GIAO DỊCH THÀNH CÔNG" ngay lập tức
  @Sse(':code/stream')
  stream(@Param('code') code: string): Observable<MessageEvent> {
    return this.payments.streamStatus(code);
  }

  // Bước 4: biên lai điện tử
  @Get(':code/receipt')
  receipt(@Param('code') code: string) {
    return this.payments.getReceipt(code);
  }

  /**
   * [DEV ONLY] Giả lập webhook ngân hàng đã xác nhận giao dịch.
   * Chỉ hoạt động khi NODE_ENV !== 'production'.
   * Dùng để test toàn bộ luồng thanh toán mà không cần SePay.
   */
  @Post(':code/simulate-confirm')
  @HttpCode(200)
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  async simulateConfirm(@Param('code') code: string) {
    if (env.NODE_ENV === 'production') {
      return {
        success: false,
        message: 'Endpoint này chỉ khả dụng ở môi trường development',
      };
    }

    try {
      const result = await this.payments.adminConfirm(code, {
        method: 'BANK_TRANSFER',
        bankRef: `SIMULATED-${Date.now()}`,
        note: 'Xác nhận giả lập từ frontend (dev mode)',
      });
      return { success: true, data: result };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }
}
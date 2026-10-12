import { Body, Controller, Get, MessageEvent, Param, Post, Sse } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Observable } from 'rxjs';
import { ZodValidationPipe } from '../../common/zod-validation.pipe';
import { CreatePaymentInput, createPaymentSchema } from './payments.schemas';
import { PaymentsService } from './payments.service';

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
}

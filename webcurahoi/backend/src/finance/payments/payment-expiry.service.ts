import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PaymentsService } from './payments.service';

/** Quét giao dịch quá hạn mỗi 30 giây. */
@Injectable()
export class PaymentExpiryService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PaymentExpiryService.name);
  private timer?: NodeJS.Timeout;

  constructor(private readonly payments: PaymentsService) {}

  onModuleInit() {
    this.timer = setInterval(() => {
      this.payments.expirePending().catch((e) => this.logger.error(`Quét hết hạn lỗi: ${e instanceof Error ? e.message : e}`));
    }, 30_000);
  }

  onModuleDestroy() {
    if (this.timer) clearInterval(this.timer);
  }
}

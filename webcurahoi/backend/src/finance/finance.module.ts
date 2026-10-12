import { Module } from '@nestjs/common';
import { AdminController } from './admin/admin.controller';
import { CampaignsController } from './campaigns/campaigns.controller';
import { CampaignsService } from './campaigns/campaigns.service';
import { FinanceEventsService } from './events/finance-events.service';
import { FeesController } from './fees/fees.controller';
import { FeesService } from './fees/fees.service';
import { MailService } from './mail/mail.service';
import { PaymentExpiryService } from './payments/payment-expiry.service';
import { PaymentsController } from './payments/payments.controller';
import { PaymentsService } from './payments/payments.service';
import { StatementController } from './statement/statement.controller';
import { StatementService } from './statement/statement.service';
import { BankWebhookController } from './webhooks/bank-webhook.controller';
import { BankWebhookService } from './webhooks/bank-webhook.service';

/** Phân hệ: Quỹ thiện nguyện và Phí (Mảng V - Quản trị Tài chính của Hội). */
@Module({
  controllers: [
    PaymentsController,
    CampaignsController,
    FeesController,
    StatementController,
    BankWebhookController,
    AdminController,
  ],
  providers: [
    FinanceEventsService,
    MailService,
    PaymentsService,
    PaymentExpiryService,
    CampaignsService,
    FeesService,
    StatementService,
    BankWebhookService,
  ],
})
export class FinanceModule {}

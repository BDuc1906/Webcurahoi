import { Body, Controller, Headers, HttpCode, Post } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { BankWebhookService } from './bank-webhook.service';

@Controller('webhooks')
export class BankWebhookController {
  constructor(private readonly webhook: BankWebhookService) {}

  // Cấu hình URL này ở SePay/Casso: POST /api/webhooks/bank
  // Header: Authorization: Apikey <WEBHOOK_API_KEY>
  @Post('bank')
  @HttpCode(200)
  @SkipThrottle()
  handle(@Headers('authorization') authorization: string | undefined, @Body() body: unknown) {
    return this.webhook.handle(authorization, body);
  }
}

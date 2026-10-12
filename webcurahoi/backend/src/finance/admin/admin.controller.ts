import { Body, Controller, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AdminApiKeyGuard } from '../../common/admin-api-key.guard';
import { ZodValidationPipe } from '../../common/zod-validation.pipe';
import {
  CreateCampaignInput,
  createCampaignSchema,
  CreateDisbursementInput,
  createDisbursementSchema,
  UpdateCampaignInput,
  updateCampaignSchema,
} from '../campaigns/campaigns.schemas';
import { CampaignsService } from '../campaigns/campaigns.service';
import {
  CreateDocumentInput,
  createDocumentSchema,
  GenerateObligationsInput,
  generateObligationsSchema,
  IssueCertificateInput,
  issueCertificateSchema,
  UpsertFeeScheduleInput,
  upsertFeeScheduleSchema,
  UpsertObligationInput,
  upsertObligationSchema,
  UpsertUnitInput,
  upsertUnitSchema,
} from '../fees/fees.schemas';
import { FeesService } from '../fees/fees.service';
import {
  AdminPaymentsQuery,
  adminPaymentsQuerySchema,
  ConfirmPaymentInput,
  confirmPaymentSchema,
} from '../payments/payments.schemas';
import { PaymentsService } from '../payments/payments.service';

/**
 * API quản trị phân hệ Quỹ thiện nguyện & Phí.
 * Tạm bảo vệ bằng header x-api-key, sau này đổi sang JWT của module đăng nhập.
 */
@Controller('finance/admin')
@UseGuards(AdminApiKeyGuard)
export class AdminController {
  constructor(
    private readonly campaigns: CampaignsService,
    private readonly fees: FeesService,
    private readonly payments: PaymentsService,
  ) {}

  // ---- Chiến dịch thiện nguyện + giải ngân
  @Post('campaigns')
  createCampaign(@Body(new ZodValidationPipe(createCampaignSchema)) body: CreateCampaignInput) {
    return this.campaigns.create(body);
  }

  @Patch('campaigns/:slug')
  updateCampaign(
    @Param('slug') slug: string,
    @Body(new ZodValidationPipe(updateCampaignSchema)) body: UpdateCampaignInput,
  ) {
    return this.campaigns.update(slug, body);
  }

  @Post('campaigns/:slug/disbursements')
  addDisbursement(
    @Param('slug') slug: string,
    @Body(new ZodValidationPipe(createDisbursementSchema)) body: CreateDisbursementInput,
  ) {
    return this.campaigns.addDisbursement(slug, body);
  }

  // ---- Biểu mức phí + văn bản
  @Put('fee-schedules/:code')
  upsertSchedule(
    @Param('code') code: string,
    @Body(new ZodValidationPipe(upsertFeeScheduleSchema)) body: UpsertFeeScheduleInput,
  ) {
    return this.fees.upsertSchedule(code, body);
  }

  @Post('documents')
  createDocument(@Body(new ZodValidationPipe(createDocumentSchema)) body: CreateDocumentInput) {
    return this.fees.createDocument(body);
  }

  // ---- Đơn vị nộp phí + nghĩa vụ hội phí
  @Put('units/:code')
  upsertUnit(@Param('code') code: string, @Body(new ZodValidationPipe(upsertUnitSchema)) body: UpsertUnitInput) {
    return this.fees.upsertUnit(code.toUpperCase(), body);
  }

  @Put('units/:code/obligations')
  upsertObligation(
    @Param('code') code: string,
    @Body(new ZodValidationPipe(upsertObligationSchema)) body: UpsertObligationInput,
  ) {
    return this.fees.upsertObligation(code, body);
  }

  @Post('obligations/generate')
  generateObligations(@Body(new ZodValidationPipe(generateObligationsSchema)) body: GenerateObligationsInput) {
    return this.fees.generateObligations(body.year);
  }

  @Post('units/:code/certificates')
  issueCertificate(
    @Param('code') code: string,
    @Body(new ZodValidationPipe(issueCertificateSchema)) body: IssueCertificateInput,
  ) {
    return this.fees.issueCertificate(code, body.year, body.issuedBy);
  }

  // ---- Giao dịch
  @Get('payments')
  listPayments(@Query(new ZodValidationPipe(adminPaymentsQuerySchema)) query: AdminPaymentsQuery) {
    return this.payments.adminList(query);
  }

  @Post('payments/:code/confirm')
  confirmPayment(
    @Param('code') code: string,
    @Body(new ZodValidationPipe(confirmPaymentSchema)) body: ConfirmPaymentInput,
  ) {
    return this.payments.adminConfirm(code, body);
  }
}

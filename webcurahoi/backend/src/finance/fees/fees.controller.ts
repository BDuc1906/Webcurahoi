import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { FeesService } from './fees.service';

@Controller('finance')
export class FeesController {
  constructor(private readonly fees: FeesService) {}

  // [TAB 1] Văn bản & biểu mức quy định phí
  @Get('fee-schedules')
  schedules() {
    return this.fees.listSchedules();
  }

  @Get('documents')
  documents() {
    return this.fees.listDocuments();
  }

  // [TAB 2] Cổng nộp phí Chi hội & pháp nhân
  @Get('units/:code')
  unitStatus(@Param('code') code: string) {
    return this.fees.getUnitStatus(code);
  }

  @Get('units/:code/payments')
  unitPayments(@Param('code') code: string) {
    return this.fees.getUnitPayments(code);
  }

  @Get('units/:code/certificates/:year')
  certificate(@Param('code') code: string, @Param('year', ParseIntPipe) year: number) {
    return this.fees.getCertificate(code, year);
  }

  @Get('certificates/verify/:verifyCode')
  verify(@Param('verifyCode') verifyCode: string) {
    return this.fees.verifyCertificate(verifyCode);
  }

  /**
   * Cấp chứng nhận hoàn thành nghĩa vụ (idempotent — nếu đã có thì trả về cái cũ).
   * Chỉ thành công khi đơn vị đã nộp đủ niên liễm năm đó.
   */
  @Post('units/:code/certificates/:year/issue')
  issueCertificate(
    @Param('code') code: string,
    @Param('year', ParseIntPipe) year: number,
  ) {
    return this.fees.issueCertificate(code, year, 'Hệ thống tự động');
  }
}
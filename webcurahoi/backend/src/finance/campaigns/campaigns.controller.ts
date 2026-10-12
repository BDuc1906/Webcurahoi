import { Controller, Get, Param } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';

@Controller('finance/campaigns')
export class CampaignsController {
  constructor(private readonly campaigns: CampaignsService) {}

  @Get()
  list() {
    return this.campaigns.list();
  }

  @Get(':slug')
  detail(@Param('slug') slug: string) {
    return this.campaigns.getBySlug(slug);
  }

  @Get(':slug/disbursements')
  disbursements(@Param('slug') slug: string) {
    return this.campaigns.listDisbursements(slug);
  }
}

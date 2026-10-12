import { Injectable, NotFoundException } from '@nestjs/common';
import { Campaign } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCampaignInput, CreateDisbursementInput, UpdateCampaignInput } from './campaigns.schemas';

interface Totals {
  raised: number;
  donations: number;
  disbursed: number;
}

@Injectable()
export class CampaignsService {
  constructor(private readonly prisma: PrismaService) {}

  private toDto(c: Campaign, t: Totals) {
    const target = Number(c.targetAmount);
    return {
      id: c.id,
      slug: c.slug,
      name: c.name,
      description: c.description,
      status: c.status,
      coverImageUrl: c.coverImageUrl,
      startDate: c.startDate,
      endDate: c.endDate,
      targetAmount: target,
      raisedAmount: t.raised,
      donationCount: t.donations,
      disbursedAmount: t.disbursed,
      progressPercent: target > 0 ? Math.round((t.raised / target) * 1000) / 10 : 0,
    };
  }

  /** Danh sách chiến dịch + tiến độ quyên góp (%). */
  async list() {
    const campaigns = await this.prisma.campaign.findMany({
      where: { status: { not: 'DRAFT' } },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });

    const [raised, disbursed] = await Promise.all([
      this.prisma.paymentTransaction.groupBy({
        by: ['campaignId'],
        where: { status: 'COMPLETED', campaignId: { not: null } },
        _sum: { amount: true },
        _count: { _all: true },
      }),
      this.prisma.disbursement.groupBy({ by: ['campaignId'], _sum: { amount: true } }),
    ]);

    return campaigns.map((c) => {
      const r = raised.find((x) => x.campaignId === c.id);
      const d = disbursed.find((x) => x.campaignId === c.id);
      return this.toDto(c, {
        raised: Number(r?._sum.amount ?? 0),
        donations: r?._count._all ?? 0,
        disbursed: Number(d?._sum.amount ?? 0),
      });
    });
  }

  async getBySlug(slug: string) {
    const campaign = await this.prisma.campaign.findUnique({ where: { slug } });
    if (!campaign || campaign.status === 'DRAFT') throw new NotFoundException('Không tìm thấy chiến dịch');

    const [raised, disbursed] = await Promise.all([
      this.prisma.paymentTransaction.aggregate({
        where: { campaignId: campaign.id, status: 'COMPLETED' },
        _sum: { amount: true },
        _count: { _all: true },
      }),
      this.prisma.disbursement.aggregate({ where: { campaignId: campaign.id }, _sum: { amount: true } }),
    ]);

    return this.toDto(campaign, {
      raised: Number(raised._sum.amount ?? 0),
      donations: raised._count._all,
      disbursed: Number(disbursed._sum.amount ?? 0),
    });
  }

  /** Tab "Báo cáo Chi / Giải ngân thực tế". */
  async listDisbursements(slug: string) {
    const campaign = await this.prisma.campaign.findUnique({ where: { slug } });
    if (!campaign || campaign.status === 'DRAFT') throw new NotFoundException('Không tìm thấy chiến dịch');

    const rows = await this.prisma.disbursement.findMany({
      where: { campaignId: campaign.id },
      orderBy: { disbursedAt: 'desc' },
    });
    return rows.map((d) => ({
      id: d.id,
      disbursedAt: d.disbursedAt,
      item: d.item,
      amount: Number(d.amount),
      beneficiary: d.beneficiary,
      description: d.description,
      photoUrls: d.photoUrls,
      minutesFileUrl: d.minutesFileUrl,
    }));
  }

  // ------------------------------------------------------------- Quản trị
  async create(input: CreateCampaignInput) {
    const c = await this.prisma.campaign.create({
      data: { ...input, targetAmount: BigInt(input.targetAmount) },
    });
    return this.toDto(c, { raised: 0, donations: 0, disbursed: 0 });
  }

  async update(slug: string, input: UpdateCampaignInput) {
    const exists = await this.prisma.campaign.findUnique({ where: { slug } });
    if (!exists) throw new NotFoundException('Không tìm thấy chiến dịch');
    const { targetAmount, ...rest } = input;
    await this.prisma.campaign.update({
      where: { slug },
      data: { ...rest, ...(targetAmount !== undefined ? { targetAmount: BigInt(targetAmount) } : {}) },
    });
    return this.getBySlugAny(slug);
  }

  private async getBySlugAny(slug: string) {
    const c = await this.prisma.campaign.findUniqueOrThrow({ where: { slug } });
    const [raised, disbursed] = await Promise.all([
      this.prisma.paymentTransaction.aggregate({
        where: { campaignId: c.id, status: 'COMPLETED' },
        _sum: { amount: true },
        _count: { _all: true },
      }),
      this.prisma.disbursement.aggregate({ where: { campaignId: c.id }, _sum: { amount: true } }),
    ]);
    return this.toDto(c, {
      raised: Number(raised._sum.amount ?? 0),
      donations: raised._count._all,
      disbursed: Number(disbursed._sum.amount ?? 0),
    });
  }

  async addDisbursement(slug: string, input: CreateDisbursementInput) {
    const campaign = await this.prisma.campaign.findUnique({ where: { slug } });
    if (!campaign) throw new NotFoundException('Không tìm thấy chiến dịch');
    const d = await this.prisma.disbursement.create({
      data: { ...input, amount: BigInt(input.amount), campaignId: campaign.id },
    });
    return { id: d.id, amount: Number(d.amount) };
  }
}

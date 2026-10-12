import { CampaignStatus } from '@prisma/client';
import { z } from 'zod';

export const createCampaignSchema = z.object({
  slug: z.string().trim().toLowerCase().regex(/^[a-z0-9-]+$/, 'slug chỉ gồm a-z, 0-9 và dấu gạch'),
  name: z.string().trim().min(3).max(200),
  description: z.string().trim().max(2000).optional(),
  targetAmount: z.coerce.number().int().min(0),
  status: z.nativeEnum(CampaignStatus).default('ACTIVE'),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  coverImageUrl: z.string().url().optional(),
  sortOrder: z.coerce.number().int().default(0),
});
export type CreateCampaignInput = z.infer<typeof createCampaignSchema>;

export const updateCampaignSchema = createCampaignSchema.omit({ slug: true }).partial();
export type UpdateCampaignInput = z.infer<typeof updateCampaignSchema>;

export const createDisbursementSchema = z.object({
  disbursedAt: z.coerce.date(),
  item: z.string().trim().min(2).max(200),
  amount: z.coerce.number().int().min(1),
  beneficiary: z.string().trim().min(2).max(200),
  description: z.string().trim().max(2000).optional(),
  photoUrls: z.array(z.string().url()).default([]),
  minutesFileUrl: z.string().url().optional(),
});
export type CreateDisbursementInput = z.infer<typeof createDisbursementSchema>;

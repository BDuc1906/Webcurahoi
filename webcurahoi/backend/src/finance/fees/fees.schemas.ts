import { FeeTargetGroup, FeeUnitType, ObligationStatus, PaymentPurpose } from '@prisma/client';
import { z } from 'zod';

export const upsertFeeScheduleSchema = z.object({
  name: z.string().trim().min(3).max(200),
  category: z.enum([PaymentPurpose.ANNUAL_MEMBERSHIP_FEE, PaymentPurpose.ESTABLISHMENT_FEE]),
  targetGroup: z.nativeEnum(FeeTargetGroup).optional(),
  minAmount: z.coerce.number().int().min(0).optional(),
  maxAmount: z.coerce.number().int().min(0).optional(),
  note: z.string().trim().max(1000).optional(),
  effectiveFrom: z.coerce.date().optional(),
  active: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});
export type UpsertFeeScheduleInput = z.infer<typeof upsertFeeScheduleSchema>;

export const createDocumentSchema = z.object({
  code: z.string().trim().max(100).optional(),
  title: z.string().trim().min(3).max(300),
  docType: z.string().trim().max(50).optional(),
  issuedDate: z.coerce.date().optional(),
  fileUrl: z.string().url().optional(),
  isPublic: z.boolean().default(true),
});
export type CreateDocumentInput = z.infer<typeof createDocumentSchema>;

export const upsertUnitSchema = z.object({
  name: z.string().trim().min(2).max(200),
  unitType: z.nativeEnum(FeeUnitType),
  province: z.string().trim().max(100).optional(),
  contactEmail: z.string().email().optional(),
  annualFee: z.coerce.number().int().min(0).optional(),
  externalOrgId: z.string().trim().optional(),
  active: z.boolean().default(true),
});
export type UpsertUnitInput = z.infer<typeof upsertUnitSchema>;

export const upsertObligationSchema = z.object({
  year: z.coerce.number().int().min(2020).max(2100),
  amountDue: z.coerce.number().int().min(0),
  status: z.nativeEnum(ObligationStatus).optional(),
});
export type UpsertObligationInput = z.infer<typeof upsertObligationSchema>;

export const generateObligationsSchema = z.object({
  year: z.coerce.number().int().min(2020).max(2100),
});
export type GenerateObligationsInput = z.infer<typeof generateObligationsSchema>;

export const issueCertificateSchema = z.object({
  year: z.coerce.number().int().min(2020).max(2100),
  issuedBy: z.string().trim().max(120).optional(),
});
export type IssueCertificateInput = z.infer<typeof issueCertificateSchema>;

import { PaymentPurpose } from '@prisma/client';
import { z } from 'zod';

export const statementQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  purpose: z.nativeEnum(PaymentPurpose).optional(),
  campaign: z.string().trim().optional(),
  q: z.string().trim().max(100).optional(),
});
export type StatementQuery = z.infer<typeof statementQuerySchema>;

export const honorRollQuerySchema = z.object({
  period: z.enum(['quarter', 'year', 'all']).default('year'),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});
export type HonorRollQuery = z.infer<typeof honorRollQuerySchema>;

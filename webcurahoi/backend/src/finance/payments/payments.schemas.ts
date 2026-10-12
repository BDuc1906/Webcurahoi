import { PayerType, PaymentMethod, PaymentPurpose } from '@prisma/client';
import { z } from 'zod';

const optionalEmail = z
  .union([z.string().trim().email(), z.literal('')])
  .optional()
  .transform((v) => v || undefined);

export const createPaymentSchema = z.object({
  purpose: z.nativeEnum(PaymentPurpose),
  payerName: z.string().trim().min(2).max(120),
  payerEmail: optionalEmail,
  payerPhone: z.string().trim().max(20).optional(),
  payerType: z.nativeEnum(PayerType).default('INDIVIDUAL'),
  // Bắt buộc với thiện nguyện / phí cá nhân / phí thành lập.
  // Hội phí đơn vị: bỏ trống = nộp đủ số còn nợ.
  amount: z.coerce.number().int().min(10_000).max(2_000_000_000).optional(),
  campaignSlug: z.string().trim().optional(),
  unitCode: z.string().trim().toUpperCase().optional(),
  year: z.coerce.number().int().min(2020).max(2100).optional(),
  feeScheduleCode: z.string().trim().optional(),
  isAnonymous: z.boolean().default(false),
  note: z.string().trim().max(200).optional(),
});
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;

export const confirmPaymentSchema = z.object({
  method: z.nativeEnum(PaymentMethod).default('BANK_TRANSFER'),
  bankRef: z.string().trim().max(100).optional(),
  note: z.string().trim().max(200).optional(),
});
export type ConfirmPaymentInput = z.infer<typeof confirmPaymentSchema>;

export const adminPaymentsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  status: z.enum(['PENDING', 'COMPLETED', 'EXPIRED', 'CANCELLED']).optional(),
});
export type AdminPaymentsQuery = z.infer<typeof adminPaymentsQuerySchema>;

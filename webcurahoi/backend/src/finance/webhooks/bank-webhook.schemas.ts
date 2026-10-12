import { z } from 'zod';

/** Định dạng webhook theo kiểu SePay / Casso (tiền vào tài khoản). */
export const bankWebhookSchema = z
  .object({
    id: z.union([z.string(), z.number()]).optional(),
    gateway: z.string().optional(),
    transactionDate: z.string().optional(), // "2026-10-12 10:30:00" (giờ Việt Nam)
    accountNumber: z.string().optional(),
    content: z.string().optional(),
    code: z.string().nullish(),
    transferType: z.string().optional(), // "in" | "out"
    transferAmount: z.coerce.number(),
    referenceCode: z.string().optional(),
  })
  .passthrough();
export type BankWebhookPayload = z.infer<typeof bankWebhookSchema>;

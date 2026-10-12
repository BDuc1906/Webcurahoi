import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1, 'Thiếu DATABASE_URL'),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  WEB_BASE_URL: z.string().default('http://localhost:3000'),

  ADMIN_API_KEY: z.string().min(16, 'ADMIN_API_KEY phải dài từ 16 ký tự'),
  WEBHOOK_API_KEY: z.string().min(16, 'WEBHOOK_API_KEY phải dài từ 16 ký tự'),

  BANK_BIN_CODE: z.string().default('MB'),
  BANK_NAME: z.string().default('MB Bank (Ngân hàng TMCP Quân Đội)'),
  BANK_ACCOUNT_NO: z.string().min(6),
  BANK_ACCOUNT_NAME: z.string().min(2),

  PAYMENT_TTL_MINUTES: z.coerce.number().int().min(1).default(10),
  SETTLEMENT_DEADLINE: z.string().regex(/^\d{2}-\d{2}$/, 'Định dạng MM-DD').default('12-31'),

  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  MAIL_FROM: z.string().default('Hội GDCSSKCĐ VN <no-reply@vache.org.vn>'),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  console.error('Cấu hình .env không hợp lệ:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const env = parsed.data;

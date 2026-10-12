import { randomInt } from 'crypto';
import { PaymentPurpose } from '@prisma/client';

const PREFIX: Record<PaymentPurpose, string> = {
  CHARITY_DONATION: 'TN',
  ANNUAL_MEMBERSHIP_FEE: 'HP',
  ESTABLISHMENT_FEE: 'TL',
};

/** Mã giao dịch hiển thị, VD: VACHE-TN-883920 */
export function generateCode(purpose: PaymentPurpose): string {
  return `VACHE-${PREFIX[purpose]}-${randomInt(100000, 1000000)}`;
}

/**
 * Nội dung chuyển khoản gắn trong mã QR. Bỏ dấu gạch vì nhiều ngân hàng
 * tự xóa ký tự đặc biệt: VACHE-TN-883920 -> VACHETN883920
 */
export function transferContent(code: string): string {
  return code.replace(/-/g, '');
}

/**
 * Tìm mã giao dịch trong nội dung chuyển khoản do ngân hàng gửi về
 * (chịu được khoảng trắng, chữ thường, dấu gạch...).
 */
export function extractCode(...texts: Array<string | null | undefined>): string | null {
  const normalized = texts
    .filter(Boolean)
    .join(' ')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '');
  const m = normalized.match(/VACHE(TN|HP|TL)(\d{6})/);
  return m ? `VACHE-${m[1]}-${m[2]}` : null;
}

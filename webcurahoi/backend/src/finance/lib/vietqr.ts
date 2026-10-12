import { env } from '../../config/env';

/** Ảnh VietQR động, số tiền và nội dung đã được gán sẵn (người nộp không phải nhập tay). */
export function buildQrImageUrl(amount: number, addInfo: string): string {
  const base = `https://img.vietqr.io/image/${env.BANK_BIN_CODE}-${env.BANK_ACCOUNT_NO}-compact2.png`;
  const query = new URLSearchParams({
    amount: String(amount),
    addInfo,
    accountName: env.BANK_ACCOUNT_NAME,
  });
  return `${base}?${query.toString()}`;
}

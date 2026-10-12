/** Thông tin tài khoản chuyên thu của Trung ương Hội */
export const VACHE_BANK = {
  bin: "MB",
  accountNumber: "190820088888",
  accountName: "TRUNG UONG HOI GDCSSKCD VN",
  displayName: "MB Bank (Ngân hàng TMCP Quân Đội)",
  shortName: "MB Bank",
} as const;

/** Sinh URL ảnh VietQR động, số tiền và cú pháp đã gán cứng */
export function buildQrImageUrl(amount: number, addInfo: string): string {
  const base = `https://img.vietqr.io/image/${VACHE_BANK.bin}-${VACHE_BANK.accountNumber}-compact2.png`;
  const q = new URLSearchParams({
    amount: String(amount),
    addInfo,
    accountName: VACHE_BANK.accountName,
  });
  return `${base}?${q.toString()}`;
}
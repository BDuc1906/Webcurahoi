const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

const vnd = (n: number) => `${new Intl.NumberFormat('vi-VN').format(n)} đ`;

export interface ReceiptData {
  receiptNo: string;
  code: string;
  payerName: string;
  amount: number;
  purposeLabel: string;
  targetName: string | null;
  bankGateway: string | null;
  completedAt: Date;
}

/** HTML biên lai điện tử gửi qua email. */
export function renderReceiptHtml(r: ReceiptData): string {
  const time = r.completedAt.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 0;color:#475569">${esc(label)}</td><td style="padding:6px 0;text-align:right;font-weight:600">${esc(value)}</td></tr>`;

  return `<!doctype html>
<html lang="vi"><body style="font-family:Arial,sans-serif;background:#f8fafc;padding:24px">
  <div style="max-width:520px;margin:auto;background:#fff;border:1px solid #e2e8f0;padding:24px">
    <p style="margin:0;text-align:center;font-size:11px;font-weight:bold">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br/>Độc lập - Tự do - Hạnh phúc</p>
    <h2 style="text-align:center;color:#991b1b;margin:16px 0 4px">BIÊN LAI THU TIỀN ĐIỆN TỬ</h2>
    <p style="text-align:center;margin:0 0 16px;font-size:13px">Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam</p>
    <p style="text-align:center;color:#991b1b;border:2px solid #991b1b;padding:6px;font-weight:bold;font-size:12px">HỆ THỐNG ĐÃ THU TIỀN VÀO TÀI KHOẢN TRUNG ƯƠNG HỘI</p>
    <table style="width:100%;font-size:14px;border-collapse:collapse;margin-top:12px">
      ${row('Số biên lai', r.receiptNo)}
      ${row('Mã giao dịch', r.code)}
      ${row('Người nộp', r.payerName)}
      ${row('Nội dung', r.purposeLabel)}
      ${r.targetName ? row('Chương trình / Đơn vị', r.targetName) : ''}
      ${row('Số tiền', vnd(r.amount))}
      ${row('Ngân hàng', r.bankGateway ?? 'Chuyển khoản ngân hàng')}
      ${row('Thời gian', time)}
    </table>
    <p style="font-size:13px;color:#475569;margin-top:20px">Trân trọng cảm ơn sự đóng góp của quý vị. Mọi giao dịch được công khai trên Bảng sao kê của Hội.</p>
  </div>
</body></html>`;
}

# Backend - Quỹ thiện nguyện và Phí (Hội GDCSSKCĐ VN)

Phân hệ tài chính (Mảng V) theo file `duc.txt`. NestJS + Prisma + PostgreSQL (Neon).
Chỉ gồm: văn bản và biểu mức phí, nộp hội phí Chi hội/pháp nhân, chiến dịch thiện nguyện,
cổng thanh toán VietQR tự động, sao kê minh bạch. Không có bảng/API của mảng khác.
Mọi bảng có tiền tố `fin_` để khi gộp CSDL chung không trùng tên.

## Chạy lần đầu

```bash
cd backend
npm install
cp .env.example .env        # Windows PowerShell: Copy-Item .env.example .env
```

Mở `.env` và điền:

- `DATABASE_URL`: Neon Dashboard > project `vache-hoid` > **Connect** > chọn *Pooled connection*.
- `DIRECT_URL`: cùng chỗ đó, bỏ chọn Pooled (*Direct connection*, host không có `-pooler`).
- `ADMIN_API_KEY`, `WEBHOOK_API_KEY`: chuỗi ngẫu nhiên dài.
- `BANK_*`: tài khoản nhận tiền (mặc định là MB Bank như trên giao diện).

> Không commit `.env` và không dán chuỗi kết nối Neon vào chat/nhóm. `.env` đã nằm trong `.gitignore`.

```bash
npx prisma migrate dev --name init   # tạo bảng trên Neon
npm run db:seed                      # dữ liệu mẫu (3 chiến dịch, biểu phí, 3 đơn vị)
npm run dev                          # http://localhost:4000/api
```

Xóa giao dịch mẫu trước khi chạy thật: `DELETE FROM fin_transactions WHERE note = 'SEED_DEMO';`

## Luồng cổng thanh toán 4.0

1. `POST /api/finance/payments` -> trả mã `VACHE-TN-xxxxxx`, `qrImageUrl` (số tiền cố định), `expiresAt`, `secondsLeft` (đếm ngược 10 phút).
2. Frontend mở `EventSource('/api/finance/payments/:code/stream')` để chờ.
3. Ngân hàng/SePay/Casso gọi `POST /api/webhooks/bank` -> backend khớp mã trong nội dung chuyển khoản, kiểm tra đúng số tiền, chốt giao dịch.
4. Stream phát sự kiện `completed` -> hiện "GIAO DỊCH THÀNH CÔNG"; gọi `GET /payments/:code/receipt` lấy biên lai; backend tự gửi email biên lai (nếu cấu hình SMTP).
5. Cùng lúc đó `GET /api/finance/statement/stream` đẩy dòng mới lên đầu bảng sao kê (sự kiện `payment`); tổng quỹ lấy từ `statement/summary`.

## API công khai (prefix `/api`)

| Method | Đường dẫn | Mục đích |
|---|---|---|
| GET | `/finance/fee-schedules` | Biểu mức phí/hội phí (Tab 1) |
| GET | `/finance/documents` | Kho văn bản pháp quy tài chính (Tab 1) |
| GET | `/finance/units/:code` | Tra cứu hội phí theo mã đơn vị + thông báo nhắc nợ (Tab 2) |
| GET | `/finance/units/:code/payments` | Lịch sử đóng phí của đơn vị |
| GET | `/finance/units/:code/certificates/:year` | Giấy chứng nhận hoàn thành nghĩa vụ |
| GET | `/finance/certificates/verify/:verifyCode` | Xác thực chứng nhận (quét QR) |
| GET | `/finance/campaigns` | Các chiến dịch + tiến độ % (Tab 3) |
| GET | `/finance/campaigns/:slug` | Chi tiết chiến dịch |
| GET | `/finance/campaigns/:slug/disbursements` | Báo cáo chi / giải ngân |
| POST | `/finance/payments` | Tạo mã VietQR (thiện nguyện / hội phí / phí thành lập) |
| GET | `/finance/payments/:code` | Trạng thái giao dịch |
| GET (SSE) | `/finance/payments/:code/stream` | Chờ kết quả thanh toán real-time |
| GET | `/finance/payments/:code/receipt` | Biên lai điện tử |
| GET | `/finance/statement?page&limit&purpose&campaign&q` | Bảng sao kê công khai |
| GET | `/finance/statement/summary` | Tổng quỹ, tổng hội phí, số lượt giao dịch |
| GET (SSE) | `/finance/statement/stream` | Dòng giao dịch mới real-time |
| GET | `/finance/honor-roll?period=quarter\|year\|all&limit` | Bảng vàng nhà hảo tâm |
| POST | `/webhooks/bank` | Webhook ngân hàng (header `Authorization: Apikey <WEBHOOK_API_KEY>`) |

Ví dụ tạo mã thiện nguyện:

```json
POST /api/finance/payments
{ "purpose": "CHARITY_DONATION", "campaignSlug": "anh-sang-cong-dong",
  "payerName": "Nguyễn Văn An", "payerEmail": "an@example.com", "amount": 500000 }
```

Ví dụ nộp hội phí Chi hội (không cần nhập tiền, tự lấy số còn nợ):

```json
{ "purpose": "ANNUAL_MEMBERSHIP_FEE", "unitCode": "CH-DANANG", "payerName": "Chi hội Đà Nẵng" }
```

## API quản trị (header `x-api-key: <ADMIN_API_KEY>`)

`POST /finance/admin/campaigns`, `PATCH /finance/admin/campaigns/:slug`,
`POST /finance/admin/campaigns/:slug/disbursements`,
`PUT /finance/admin/fee-schedules/:code`, `POST /finance/admin/documents`,
`PUT /finance/admin/units/:code`, `PUT /finance/admin/units/:code/obligations`,
`POST /finance/admin/obligations/generate` (tạo nghĩa vụ hội phí cả năm),
`POST /finance/admin/units/:code/certificates`,
`GET /finance/admin/payments`, `POST /finance/admin/payments/:code/confirm` (xác nhận tay tiền mặt/chuyển khoản).

## Thử webhook trên máy local (giả lập ngân hàng)

Tạo giao dịch, lấy `code` và `amount`, rồi:

```bash
curl -X POST http://localhost:4000/api/webhooks/bank \
  -H "Authorization: Apikey <WEBHOOK_API_KEY>" -H "Content-Type: application/json" \
  -d '{"id": 1001, "gateway": "MBBank", "transactionDate": "2026-10-12 10:30:00",
       "content": "VACHETN883920 chuyen tien", "transferType": "in",
       "transferAmount": 500000, "referenceCode": "FT26285001"}'
```

Chạy thật cần: URL public (deploy hoặc ngrok) và một dịch vụ báo biến động số dư
(SePay, Casso...) trỏ webhook về `/api/webhooks/bank`. Payload đang theo kiểu SePay; nếu dùng
dịch vụ khác, chỉ sửa `webhooks/bank-webhook.schemas.ts`.

## Ghép với phần của các bạn khác

- `FeeUnit.externalOrgId`: điền id của bảng Organization (mảng Tổ chức) để nối đơn vị nộp phí với tổ chức thật.
- Khi có đăng nhập/phân quyền, thay `AdminApiKeyGuard` (`src/common`) bằng guard JWT chung.
- Frontend gọi qua `NEXT_PUBLIC_API_URL=http://localhost:4000/api`. CORS cấu hình ở `CORS_ORIGIN`.

## Chưa làm / lưu ý

- Chữ ký số trên giấy chứng nhận và xuất PDF: hiện chỉ có bản ghi + mã xác thực; frontend dựng trang in từ JSON.
- SSE dùng bus trong bộ nhớ, chỉ đúng khi chạy 1 instance (scale nhiều instance cần Redis/LISTEN-NOTIFY).
- Chưa chạy `npm install`/build thử trong môi trường tạo file này (không có mạng) - nếu báo lỗi kiểu khi `npm run dev`, gửi lỗi để sửa.

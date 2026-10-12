"use client";

import React, { useState } from "react";
import { HeartHandshake, CreditCard, QrCode } from "lucide-react";
import CurrencyInput from "@/components/common/CurrencyInput";
import type { Purpose } from "@/hooks/usePaymentFlow";

interface Props {
  onSubmit: (input: {
    purpose: Purpose;
    amount: number;
    payerName: string;
    payerEmail: string;
  }) => void;
}

const DONATION_PRESETS = [100000, 200000, 500000, 1000000, 2000000, 5000000];
const FEE_PRESETS = [120000, 500000, 1000000, 3000000, 5000000, 15000000];

export default function PaymentFormStep({ onSubmit }: Props) {
  const [purpose, setPurpose] = useState<Purpose>("DONATION");
  const [amount, setAmount] = useState<number>(500000);
  const [donorName, setDonorName] = useState("Nguyễn Văn An");
  const [email, setEmail] = useState("an.nguyen@example.com");

  const presets = purpose === "DONATION" ? DONATION_PRESETS : FEE_PRESETS;

  function handleSubmit() {
    onSubmit({
      purpose,
      amount,
      payerName: donorName.trim() || "Khách",
      payerEmail: email.trim(),
    });
  }

  return (
    <section id="cong-chuyen-khoan" className="space-y-6">
      <div className="flex border-b border-slate-300 gap-2 sm:gap-4 text-xs font-bold">
        <button
          onClick={() => setPurpose("DONATION")}
          className={`pb-2.5 px-1 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            purpose === "DONATION"
              ? "border-[#991b1b] text-[#991b1b]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <HeartHandshake className="w-4 h-4" /> Ủng Hộ Thiện Nguyện
        </button>
        <button
          onClick={() => setPurpose("MEMBERSHIP_FEE")}
          className={`pb-2.5 px-1 flex items-center gap-1.5 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            purpose === "MEMBERSHIP_FEE"
              ? "border-[#991b1b] text-[#991b1b]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          <CreditCard className="w-4 h-4" /> Nộp Hội Phí
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        <div className="bg-white p-6 rounded-xs border border-slate-300 shadow-2xs space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">
              {purpose === "DONATION"
                ? "Họ tên cá nhân / Đơn vị hảo tâm:"
                : "Tên Chi hội / Hội viên:"}
            </label>
            <input
              type="text"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full border border-slate-300 p-2.5 rounded-xs focus:ring-1 focus:ring-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Email nhận biên lai:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-300 p-2.5 rounded-xs focus:ring-1 focus:ring-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">
              Số tiền (VNĐ):
            </label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {presets.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setAmount(v)}
                  className={`p-2 rounded-xs border font-mono font-bold text-[11px] cursor-pointer ${
                    amount === v
                      ? "border-[#991b1b] bg-red-50 text-[#991b1b]"
                      : "border-slate-300 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {new Intl.NumberFormat("vi-VN").format(v)} đ
                </button>
              ))}
            </div>
            <CurrencyInput
              value={amount}
              onChange={setAmount}
              min={10000}
              max={2000000000}
              placeholder="Hoặc nhập số tiền khác..."
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs font-bold text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <QrCode className="w-4 h-4" /> TẠO MÃ THANH TOÁN QR
          </button>

          <p className="text-[11px] text-slate-500 italic text-center">
            Nếu backend chưa chạy, hệ thống sẽ sinh mã demo — bấm nút &quot;Giả
            lập thanh toán thành công&quot; để xem luồng.
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-300 rounded-xs p-6 text-xs space-y-2">
          <h3 className="font-bold text-slate-900 text-sm font-serif">
            Hướng dẫn 5 bước tự động
          </h3>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-700 leading-relaxed">
            <li>
              Nhập thông tin và bấm <strong>Tạo mã thanh toán QR</strong>
            </li>
            <li>
              Quét mã VietQR bằng App ngân hàng, số tiền đã được gán cứng
            </li>
            <li>
              Hệ thống <strong>tự động phát hiện</strong> giao dịch qua webhook
              Napas
            </li>
            <li>Biên lai điện tử xuất hiện ngay + gửi về email</li>
            <li>
              Dòng tiền mới <strong>tự động chèn lên đầu Bảng sao kê</strong>{" "}
              toàn quốc
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
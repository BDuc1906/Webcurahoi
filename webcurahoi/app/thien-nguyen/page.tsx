"use client";

import React, { useState } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import PublicFinanceStatement from "@/components/finance/PublicFinanceStatement";
import {
  HeartHandshake,
  QrCode,
  CreditCard,
  CheckCircle,
  Copy,
  Users,
  ShieldCheck,
  Building2,
  Calendar,
  ArrowRight,
  Search,
  FileSpreadsheet,
  Check,
} from "lucide-react";

export default function CharityAndFeesPage() {
  const [activeTab, setActiveTab] = useState<"DONATION" | "MEMBERSHIP_FEE">("DONATION");
  const [amount, setAmount] = useState("500000");
  const [donorName, setDonorName] = useState("Nguyễn Văn An");
  const [copied, setCopied] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const accountNumber = "190820088888";

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <>
      <PublicHeader />

      <main className="max-w-7xl mx-auto px-4 py-10 flex-1 space-y-12 font-gov">
        {/* =========================================================
            1. TIÊU ĐỀ TRANG TRỌNG & ĐIỀU HƯỚNG NHANH
        ========================================================= */}
        <div className="border-b-2 border-[#991b1b] pb-6 flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#991b1b] rounded-full inline-block" />
              <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider block">
                Tài Chính Công Khai - Xã Hội Hóa Y Tế & Chăm Sóc Sức Khỏe
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif">
              QUỸ THIỆN NGUYỆN & BẢN SAO KÊ MINH BẠCH TÀI CHÍNH
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Thực hiện công khai, minh bạch 100% các nguồn thu thiện nguyện xã hội hóa và hội phí, niên liễm toàn quốc theo Nghị định 93/2019/NĐ-CP và Thông tư 41/2022/TT-BTC. Tích hợp cổng chuyển khoản tự động VietQR Napas 24/7.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href="#cong-chuyen-khoan"
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xs border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <QrCode className="w-4 h-4 text-[#991b1b]" /> Cổng Chuyển Khoản VietQR
            </a>
            <a
              href="#sao-ke-minh-bach"
              className="px-3.5 py-2 bg-[#991b1b] hover:bg-red-800 text-white text-xs font-bold rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs"
            >
              <Search className="w-4 h-4 text-amber-300" /> Tra Cứu Sao Kê Ngay
            </a>
          </div>
        </div>

        {/* =========================================================
            2. KHỐI TẠO MÃ CHUYỂN KHOẢN VIETQR THEO MỤC
        ========================================================= */}
        <section id="cong-chuyen-khoan" className="space-y-6">
          {/* Tabs chuyển đổi: Ủng hộ từ thiện vs Đóng niên liễm */}
          <div className="flex border-b border-slate-300 gap-2 sm:gap-4 text-xs font-bold overflow-x-auto scrollbar-none pb-0.5">
            <button
              onClick={() => setActiveTab("DONATION")}
              className={`pb-2.5 sm:pb-3 px-1 flex items-center gap-1.5 sm:gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "DONATION"
                  ? "border-[#991b1b] text-[#991b1b]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <HeartHandshake className="w-4 h-4 shrink-0" />
              <span>1. Ủng Hộ Quỹ Thiện Nguyện Y Tế</span>
            </button>
            <button
              onClick={() => setActiveTab("MEMBERSHIP_FEE")}
              className={`pb-2.5 sm:pb-3 px-1 flex items-center gap-1.5 sm:gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "MEMBERSHIP_FEE"
                  ? "border-[#991b1b] text-[#991b1b]"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              }`}
            >
              <CreditCard className="w-4 h-4 shrink-0" />
              <span>2. Nộp Niên Liễm Hội Phí Hằng Năm</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cột trái: Form thiết lập thông tin chuyển khoản */}
            <div className="lg:col-span-7 bg-white p-4 sm:p-8 rounded-xs border border-slate-300 shadow-2xs space-y-5">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                  {activeTab === "DONATION"
                    ? "Thông Tin Đóng Góp Quỹ Thiện Nguyện Y Tế"
                    : "Thông Tin Thu Nộp Niên Liễm Hội Phí 2026"}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeTab === "DONATION"
                    ? "Tài trợ các chương trình: Mổ mắt Phaco cho người nghèo, Ánh sáng học đường & Trái tim cho em."
                    : "Đóng niên liễm điều lệ: Chi hội tỉnh/thành (5-15 triệu), Tổ chức (3-5 triệu), Hội viên cá nhân (120.000đ/năm)."}
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    {activeTab === "DONATION"
                      ? "Họ tên cá nhân / Đơn vị hảo tâm:"
                      : "Tên Chi hội / Đơn vị / Họ tên Hội viên:"}
                  </label>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Nhập tên người gửi hoặc đơn vị..."
                    className="w-full border border-slate-300 p-2.5 rounded-xs focus:ring-1 focus:ring-red-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Số tiền đóng góp / nộp phí (VNĐ):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-1.5 sm:gap-2 mb-2">
                    {(activeTab === "DONATION"
                      ? ["100000", "200000", "500000", "1000000", "2000000", "5000000"]
                      : ["120000", "500000", "1000000", "3000000", "5000000", "15000000"]
                    ).map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAmount(val)}
                        className={`p-2 rounded-xs border font-mono font-bold transition-all text-[11px] sm:text-xs cursor-pointer truncate ${
                          amount === val
                            ? "border-[#991b1b] bg-red-50 text-[#991b1b]"
                            : "border-slate-300 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        {new Intl.NumberFormat("vi-VN").format(parseInt(val))} đ
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Hoặc nhập số tiền khác..."
                    className="w-full border border-slate-300 p-2.5 rounded-xs focus:ring-1 focus:ring-red-600 focus:outline-none font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Cú pháp nội dung chuyển khoản tự động:
                  </label>
                  <div className="p-3 bg-slate-50 border border-slate-300 rounded-xs font-mono text-xs text-slate-800 flex justify-between items-center">
                    <span className="font-bold text-[#991b1b]">
                      {activeTab === "DONATION"
                        ? `THIENNGUYEN ${donorName.replace(/\s+/g, "")}`
                        : `HOIPHI2026 ${donorName.replace(/\s+/g, "")}`}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          activeTab === "DONATION"
                            ? `THIENNGUYEN ${donorName}`
                            : `HOIPHI2026 ${donorName}`
                        )
                      }
                      className="text-[#991b1b] hover:underline flex items-center gap-1 font-sans font-bold cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" /> {copied ? "Đã chép" : "Sao chép"}
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xs text-slate-700 text-xs flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>
                    Hệ thống hạch toán thời gian thực: Sau khi chuyển khoản thành công từ 1-3 giây, hệ thống ngân hàng Napas sẽ tự động ghi nhận món tiền vào bảng sao kê đối soát bên dưới.
                  </span>
                </div>
              </div>
            </div>

            {/* Cột phải: Mã Chuẩn VietQR & Tài khoản chuyên thu */}
            <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-xs border border-slate-300 shadow-2xs flex flex-col items-center text-center space-y-4">
              <span className="px-3 py-1 bg-red-50 text-[#991b1b] border border-red-200 rounded-xs text-xs font-bold uppercase tracking-wide">
                Mã Chuẩn VietQR Napas 24/7
              </span>

              <div className="w-56 h-56 bg-slate-50 border-2 border-[#991b1b] rounded-xs p-4 flex flex-col items-center justify-center shadow-inner relative">
                <QrCode className="w-40 h-40 text-slate-900" />
                <div className="absolute inset-x-0 bottom-2 text-center text-[10px] font-mono text-[#991b1b] font-bold">
                  {new Intl.NumberFormat("vi-VN").format(parseInt(amount) || 0)} VNĐ
                </div>
              </div>

              <div className="w-full text-left bg-slate-50 p-4 rounded-xs text-xs space-y-2 border border-slate-200">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Đơn vị thụ hưởng:</span>
                  <span className="font-bold text-slate-900">TRUNG ƯƠNG HỘI GDCSSKCĐ VN</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Số tài khoản:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono font-bold text-[#991b1b] text-sm">
                      1908.2008.8888
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="text-slate-500 hover:text-slate-800"
                      title="Sao chép số tài khoản"
                    >
                      {copiedAccount ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Ngân hàng thụ hưởng:</span>
                  <span className="font-bold text-slate-900">MB Bank (Ngân hàng TMCP Quân Đội)</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Cú pháp chuẩn:</span>
                  <span className="font-mono text-slate-900 font-bold">
                    {activeTab === "DONATION" ? "THIENNGUYEN" : "HOIPHI2026"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            3. TOÀN BỘ BẢN SAO KÊ MINH BẠCH & CÔNG CỤ ĐỐI SOÁT
        ========================================================= */}
        <section id="sao-ke-minh-bach" className="space-y-4 pt-4">
          <div className="border-b-2 border-slate-800 pb-2 flex flex-col sm:flex-row justify-between sm:items-end gap-2">
            <div>
              <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider block">
                Minh Bạch Tài Chính Thời Gian Thực
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
                BẢN SAO KÊ CÔNG KHAI CÁC GIAO DỊCH TOÀN QUỐC
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Dữ liệu tự động cập nhật liên tục qua liên minh Napas & MB Bank
            </p>
          </div>

          {/* Component Bảng Sao Kê Chuyên Nghiệp */}
          <PublicFinanceStatement />
        </section>
      </main>

      <PublicFooter />
    </>
  );
}

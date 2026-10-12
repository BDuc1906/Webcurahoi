"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  CreditCard,
  QrCode,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Building2,
  TrendingUp,
  Receipt,
  Sparkles,
  Lock,
} from "lucide-react";

export default function CharityAndFeeSection() {
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [activeTab, setActiveTab] = useState<"ALL" | "DONATION" | "FEE">("ALL");

  const accountNumber = "1908.2008.8888";

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(accountNumber.replace(/\./g, ""));
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  return (
    <section className="bg-white border-y border-slate-300 py-12 font-gov">
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        {/* 1. TIÊU ĐỀ KHỐI TRANG TRỌNG */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b-2 border-[#991b1b] pb-2.5 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#991b1b] rounded-full inline-block" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#991b1b]">
                Tài Chính Công Khai & Xã Hội Hóa Y Tế
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold text-slate-900 font-serif mt-0.5">
              QUỸ THIỆN NGUYỆN VÀ CỔNG THU HỘI PHÍ TRỰC TUYẾN
            </h2>
          </div>

          <Link
            href="/thien-nguyen#sao-ke-minh-bach"
            className="text-xs font-bold text-[#991b1b] hover:underline flex items-center gap-1 shrink-0"
          >
            Tra cứu sổ sao kê & đối soát minh bạch (113 lượt) &raquo;
          </Link>
        </div>

        {/* 2. BỐ CỤC 3 CỘT ĐỒNG BỘ: TIẾN ĐỘ THIỆN NGUYỆN | NỘP NIÊN LIỄM | THẺ VIETQR */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* CỘT 1 (4 CỘT): CHIẾN DỊCH THIỆN NGUYỆN VÌ SỨC KHỎE CỘNG ĐỒNG */}
          <div className="lg:col-span-4 bg-[#f8fafc] border border-slate-300 rounded-xs p-5 sm:p-6 flex flex-col justify-between shadow-2xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-red-100 text-[#991b1b] rounded-xs border border-red-200">
                  Chiến dịch 2026
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> Đạt 70%
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 font-serif leading-snug">
                  Chương Trình Khám Sàng Lọc & Mổ Mắt Miễn Phí Cho Người Cao Tuổi
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hỗ trợ chi phí phẫu thuật Phaco và cấp phát thuốc bổ miễn phí cho người nghèo, cựu chiến binh và gia đình chính sách.
                </p>
              </div>

              {/* Thanh tiến trình gây quỹ */}
              <div className="bg-white border border-slate-200 p-3 rounded-xs space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-500">Đã vận động:</span>
                  <strong className="text-[#991b1b]">350.000.000 đ</strong>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-[#991b1b] h-full w-[70%]" />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Mục tiêu: 500.000.000 đ</span>
                  <span>1.850+ Lượt ủng hộ</span>
                </div>
              </div>

              {/* Minh chứng minh bạch */}
              <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                <p className="flex items-center gap-1.5 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Sao kê tự động liên ngân hàng
                </p>
                <p className="text-slate-500">Mọi khoản tiền đều vào tài khoản chuyên thu duy nhất của Hội.</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200">
              <Link
                href="/thien-nguyen"
                className="w-full py-2.5 bg-[#991b1b] hover:bg-red-900 text-white rounded-xs font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <HeartHandshake className="w-4 h-4" /> Ủng Hộ Quỹ Thiện Nguyện
              </Link>
            </div>
          </div>

          {/* CỘT 2 (4 CỘT): CỔNG THU HỘI PHÍ NIÊN LIỄM HỘI VIÊN */}
          <div className="lg:col-span-4 bg-[#f8fafc] border border-slate-300 rounded-xs p-5 sm:p-6 flex flex-col justify-between shadow-2xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-amber-100 text-amber-900 rounded-xs border border-amber-300">
                  Hội viên & Đơn vị
                </span>
                <span className="text-xs font-mono text-slate-500">Nhiệm kỳ IV</span>
              </div>

              <div className="space-y-1.5">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 font-serif leading-snug">
                  Thu Nộp Niên Liễm & Hội Phí Thường Niên Năm 2026
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thực hiện nghĩa vụ hội viên theo Điều lệ Hội được Bộ Nội vụ phê duyệt. Hệ thống tự động ghi nhận và xuất biên lai điện tử.
                </p>
              </div>

              {/* Mức thu theo quy chế */}
              <div className="bg-white border border-slate-200 p-3 rounded-xs space-y-2 text-xs">
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Hội viên cá nhân:</span>
                  <strong className="text-slate-900 font-mono">120.000 đ / năm</strong>
                </div>
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-100">
                  <span className="text-slate-600">Chi hội / Đơn vị trực thuộc:</span>
                  <strong className="text-slate-900 font-mono">Theo quy chế Hội</strong>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 pt-0.5">
                  <Receipt className="w-3.5 h-3.5 text-[#991b1b]" />
                  <span>Cấp Thẻ hội viên điện tử & Biên lai số</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 space-y-1 pt-1">
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-700" /> Quản trị minh bạch trên CSDL quốc gia
                </p>
                <p className="text-slate-500">Cán bộ, hội viên có thể tra cứu lịch sử đóng phí bất kỳ lúc nào.</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200 flex gap-2">
              <Link
                href="/thien-nguyen"
                className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xs font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
              >
                <CreditCard className="w-4 h-4" /> Nộp Hội Phí
              </Link>
              <Link
                href="/dang-ky-hoi-vien"
                className="px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-xs font-bold text-xs flex items-center justify-center transition-colors"
                title="Gia nhập hội viên mới"
              >
                Đăng Ký
              </Link>
            </div>
          </div>

          {/* CỘT 3 (4 CỘT): THẺ TÀI KHOẢN CÔNG VỤ VIETQR LIÊN NGÂN HÀNG NAPAS */}
          <div className="lg:col-span-4 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white rounded-xs p-5 sm:p-6 flex flex-col justify-between shadow-md border border-slate-800 relative overflow-hidden">
            {/* Dải chỉ vàng kim công vụ */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500" />

            <div className="space-y-3.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-xs border border-amber-400/30">
                  Chuẩn VietQR Napas 24/7
                </span>
                <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" /> Tự Động
                </span>
              </div>

              {/* Khối quét mã QR sắc nét */}
              <div className="bg-white rounded-xs p-3 flex flex-col items-center justify-center text-slate-900 shadow-sm border border-slate-200">
                <div className="w-28 h-28 bg-slate-50 rounded p-1 flex items-center justify-center border border-slate-200">
                  <QrCode className="w-24 h-24 text-slate-900" />
                </div>
                <div className="mt-2 text-center">
                  <span className="text-[9.5px] font-mono font-bold text-[#991b1b] block uppercase">
                    Cú pháp: HOIPHI2026 hoặc THIENNGUYEN
                  </span>
                  <span className="text-[9px] text-slate-500 block">
                    (Quét bằng mọi ứng dụng Ngân hàng & Ví điện tử)
                  </span>
                </div>
              </div>

              {/* Thông tin tài khoản thụ hưởng có nút Copy */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-xs p-3 space-y-1.5 text-xs font-gov">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase tracking-wide">
                    Tài khoản chuyên thu duy nhất:
                  </span>
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <strong className="text-base font-mono text-amber-300 tracking-wider">
                      {accountNumber}
                    </strong>
                    <button
                      type="button"
                      onClick={handleCopyAccount}
                      className="px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-xs text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedAccount ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" /> Đã chép
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> Sao chép
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-1 border-t border-slate-700/60 text-[11px] space-y-0.5">
                  <p className="text-slate-300">
                    <span className="text-slate-400">Ngân hàng:</span> <strong>MB Bank (Ngân hàng TMCP Quân Đội)</strong>
                  </p>
                  <p className="text-slate-300 line-clamp-1">
                    <span className="text-slate-400">Chủ TK:</span> TRUNG ƯƠNG HỘI GDCSSKCĐ VIỆT NAM
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-[10px]">
              <span className="text-slate-400 italic">
                * Tự động sao kê minh bạch 100%
              </span>
              <Link
                href="/thien-nguyen#sao-ke-minh-bach"
                className="text-amber-300 hover:underline font-bold flex items-center gap-0.5"
              >
                Tra cứu người nộp &raquo;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { Search, X, CheckCircle2, Info } from "lucide-react";

interface Props {
  searchQuery: string;
  bankFilter: string;
  amountRange: string;
  resultCount: number;
  onChangeSearch: (v: string) => void;
  onChangeBank: (v: string) => void;
  onChangeAmount: (v: string) => void;
  onReset: () => void;
}

const QUICK_KEYWORDS = [
  "Công ty Ao Vua",
  "Dược Nam Hà",
  "Bác sĩ Hùng",
  "Phạm Minh Đức",
  "Chi hội Hải Phòng",
  "LCH TP.HCM",
  "Nam Định",
];

const BANKS = [
  "Vietcombank",
  "MB Bank",
  "Techcombank",
  "BIDV",
  "VietinBank",
  "Agribank",
  "VPBank",
  "ACB",
  "TPBank",
];

const AMOUNT_RANGES = [
  { v: "UNDER_500K", label: "Dưới 500.000 đ" },
  { v: "500K_2M", label: "500.000 đ - 2.000.000 đ" },
  { v: "2M_10M", label: "2.000.000 đ - 10.000.000 đ" },
  { v: "OVER_10M", label: "Trên 10.000.000 đ" },
];

export default function StatementSearchBar({
  searchQuery,
  bankFilter,
  amountRange,
  resultCount,
  onChangeSearch,
  onChangeBank,
  onChangeAmount,
  onReset,
}: Props) {
  const hasFilter =
    searchQuery.trim() !== "" || bankFilter !== "ALL" || amountRange !== "ALL";

  return (
    <section className="bg-white border-2 border-slate-300 rounded-xs p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#991b1b]" />
            <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif">
              CÔNG CỤ TRA CỨU & ĐỐI SOÁT SAO KÊ MINH BẠCH
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-0.5">
            Dành cho Nhà hảo tâm, Chi hội cơ sở và Hội viên tìm kiếm xác nhận món tiền
            chuyển khoản của mình đã vào tài khoản Trung ương Hội.
          </p>
        </div>
        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 self-start sm:self-auto">
          Hạch toán tự động: 1-3 giây
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onChangeSearch(e.target.value)}
            placeholder="Nhập tên nhà hảo tâm, mã GD (VD: VACHE-QR-...), nội dung CK..."
            className="w-full pl-9 pr-8 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-red-600 focus:outline-none bg-slate-50/50"
          />
          {searchQuery && (
            <button
              onClick={() => onChangeSearch("")}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="sm:col-span-3">
          <select
            value={bankFilter}
            onChange={(e) => onChangeBank(e.target.value)}
            className="w-full py-2 px-3 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-red-600 focus:outline-none bg-white font-gov"
          >
            <option value="ALL">Tất cả ngân hàng gửi</option>
            {BANKS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={amountRange}
            onChange={(e) => onChangeAmount(e.target.value)}
            className="w-full py-2 px-3 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-red-600 focus:outline-none bg-white font-gov"
          >
            <option value="ALL">Mọi mức tiền đóng góp</option>
            {AMOUNT_RANGES.map((r) => (
              <option key={r.v} value={r.v}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 pt-1">
        <span className="font-bold text-slate-700">Gợi ý tra cứu nhanh:</span>
        {QUICK_KEYWORDS.map((kw) => (
          <button
            key={kw}
            type="button"
            onClick={() => onChangeSearch(kw)}
            className="px-2 py-0.5 bg-slate-100 hover:bg-red-50 hover:text-[#991b1b] border border-slate-200 rounded-xs text-[10.5px] transition-colors cursor-pointer"
          >
            {kw}
          </button>
        ))}
        {hasFilter && (
          <button
            type="button"
            onClick={onReset}
            className="text-red-700 font-bold hover:underline ml-2 cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        )}
      </div>

      {searchQuery.trim() !== "" && (
        <div>
          {resultCount > 0 ? (
            <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xs text-xs text-emerald-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">
                  XÁC THỰC THÀNH CÔNG: Đã tìm thấy {resultCount} giao dịch khớp với
                  từ khóa &ldquo;{searchQuery}&rdquo;.
                </span>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Toàn bộ số tiền đã được khớp lệnh tự động vào Tài khoản Chuyên thu
                  của Trung ương Hội (MB Bank - 1908.2008.8888).
                </p>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xs text-xs text-amber-900 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">
                  Chưa tìm thấy giao dịch nào khớp với &ldquo;{searchQuery}&rdquo;.
                </span>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Thử tìm theo Họ tên không dấu hoặc Mã giao dịch trên App Ngân hàng.
                  Nếu vừa giao dịch, liên hệ Kế toán TW Hội (024.3783.5678).
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
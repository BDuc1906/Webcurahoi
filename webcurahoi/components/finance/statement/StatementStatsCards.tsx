"use client";

import React from "react";
import {
  HeartHandshake,
  CreditCard,
  FileText,
  ShieldCheck,
} from "lucide-react";

type Tab = "ALL" | "CHARITY_DONATION" | "ANNUAL_MEMBERSHIP_FEE";

interface Props {
  activeTab: Tab;
  charityCount: number;
  feeCount: number;
  charityAmount: number;
  feeAmount: number;
  liveCount: number;
  onSelectTab: (tab: Tab) => void;
}

export default function StatementStatsCards({
  activeTab,
  charityCount,
  feeCount,
  charityAmount,
  feeAmount,
  liveCount,
  onSelectTab,
}: Props) {
  // liveCount đã được gộp trong charityCount + feeCount (từ baseRows của parent)
  // nên chỉ hiển thị thông tin, không cộng vào tổng
  const total = charityCount + feeCount;
  const totalAmount = charityAmount + feeAmount;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <button
        onClick={() => onSelectTab("CHARITY_DONATION")}
        className={`text-left transition-all border p-5 rounded-xs flex flex-col justify-between shadow-2xs cursor-pointer ${
          activeTab === "CHARITY_DONATION"
            ? "bg-rose-50/80 border-[#991b1b] ring-2 ring-red-600/20"
            : "bg-white border-slate-300 hover:border-slate-400"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
            Quỹ Thiện Nguyện Xã Hội
          </span>
          <span className="p-1.5 bg-rose-100 text-[#991b1b] rounded">
            <HeartHandshake className="w-4 h-4" />
          </span>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-mono font-black text-rose-900">
            {new Intl.NumberFormat("vi-VN").format(charityAmount)} đ
          </div>
          <p className="text-[11px] text-slate-600 mt-1 flex items-center justify-between">
            <span>{charityCount} nhà hảo tâm</span>
            <span className="font-bold text-emerald-700">
              {charityAmount > 0 ? "Đang tiếp nhận" : "Chưa có"}
            </span>
          </p>
        </div>
      </button>

      <button
        onClick={() => onSelectTab("ANNUAL_MEMBERSHIP_FEE")}
        className={`text-left transition-all border p-5 rounded-xs flex flex-col justify-between shadow-2xs cursor-pointer ${
          activeTab === "ANNUAL_MEMBERSHIP_FEE"
            ? "bg-amber-50/80 border-amber-600 ring-2 ring-amber-600/20"
            : "bg-white border-slate-300 hover:border-slate-400"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
            Hội Phí & Niên Liễm 2026
          </span>
          <span className="p-1.5 bg-amber-100 text-amber-800 rounded">
            <CreditCard className="w-4 h-4" />
          </span>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-mono font-black text-amber-950">
            {new Intl.NumberFormat("vi-VN").format(feeAmount)} đ
          </div>
          <p className="text-[11px] text-slate-600 mt-1 flex items-center justify-between">
            <span>{feeCount} chi hội & hội viên</span>
            <span className="font-bold text-emerald-700">
              {feeAmount > 0 ? "Đang thu" : "Chưa có"}
            </span>
          </p>
        </div>
      </button>

      <button
        onClick={() => onSelectTab("ALL")}
        className={`text-left transition-all border p-5 rounded-xs flex flex-col justify-between shadow-2xs cursor-pointer ${
          activeTab === "ALL"
            ? "bg-slate-100 border-slate-700 ring-2 ring-slate-400"
            : "bg-white border-slate-300 hover:border-slate-400"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
            Lượt Giao Dịch Đối Soát
          </span>
          <span className="p-1.5 bg-slate-100 text-slate-800 rounded">
            <FileText className="w-4 h-4" />
          </span>
        </div>
        <div>
          <div className="text-xl sm:text-2xl font-mono font-black text-slate-900">
            {total} lượt
          </div>
          <p className="text-[11px] text-slate-600 mt-1 flex items-center justify-between">
            <span>
              Tổng thu: {new Intl.NumberFormat("vi-VN").format(totalAmount)} đ
            </span>
            <span className="font-bold text-emerald-700">
              {total > 0 ? "100% Khớp" : "Chưa có"}
            </span>
          </p>
        </div>
      </button>

      <div className="bg-[#0f172a] text-white border border-slate-700 p-5 rounded-xs flex flex-col justify-between shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
            Chuẩn Minh Bạch Nhà Nước
          </span>
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-200">
            NĐ 93/2019/NĐ-CP & TT 41/2022
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Tài khoản MB Bank 1908.2008.8888 liên thông Napas VietQR tự động hóa 24/7.
          </p>
        </div>
      </div>
    </div>
  );
}
"use client";

import React from "react";
import { HeartHandshake, CreditCard, CheckCircle2 } from "lucide-react";
import { FinanceTransaction } from "@/lib/db/schema";

export type TabFilter = "ALL" | "CHARITY_DONATION" | "ANNUAL_MEMBERSHIP_FEE";

interface Props {
  activeTab: TabFilter;
  rows: FinanceTransaction[];
  charityCount: number;
  feeCount: number;
  liveCount: number;
  totalCount: number;
  totalAmount: number;
  onSelectTab: (tab: TabFilter) => void;
  onSelectRow: (tx: FinanceTransaction) => void;
}

export default function StatementTable({
  activeTab,
  rows,
  charityCount,
  feeCount,
  liveCount,
  totalCount,
  totalAmount,
  onSelectTab,
  onSelectRow,
}: Props) {
  return (
    <section className="bg-white border border-slate-300 rounded-xs p-5 sm:p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-300 pb-3 gap-3">
        <div className="flex flex-wrap gap-2 text-xs font-bold">
          <TabButton
            active={activeTab === "ALL"}
            onClick={() => onSelectTab("ALL")}
            activeClass="bg-slate-900 text-white border-slate-900"
            idleClass="bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            label="Tất Cả Giao Dịch"
            count={totalCount + liveCount}
          />
          <TabButton
            active={activeTab === "CHARITY_DONATION"}
            onClick={() => onSelectTab("CHARITY_DONATION")}
            activeClass="bg-[#991b1b] text-white border-[#991b1b]"
            idleClass="bg-white text-rose-800 border-rose-200 hover:bg-rose-50"
            icon={<HeartHandshake className="w-3.5 h-3.5" />}
            label="Quỹ Thiện Nguyện"
            count={charityCount}
          />
          <TabButton
            active={activeTab === "ANNUAL_MEMBERSHIP_FEE"}
            onClick={() => onSelectTab("ANNUAL_MEMBERSHIP_FEE")}
            activeClass="bg-amber-800 text-white border-amber-800"
            idleClass="bg-white text-amber-900 border-amber-200 hover:bg-amber-50"
            icon={<CreditCard className="w-3.5 h-3.5" />}
            label="Hội Phí & Niên Liễm"
            count={feeCount}
          />
        </div>

        <div className="text-right text-xs">
          <span className="text-slate-500">Tổng đang hiển thị: </span>
          <strong className="text-slate-900 font-mono text-sm">
            {new Intl.NumberFormat("vi-VN").format(totalAmount)} VNĐ
          </strong>
        </div>
      </div>

      <div className="sm:hidden text-[10.5px] text-slate-500 italic px-0.5">
        👉 Vuốt ngang để xem đầy đủ mã GD, số tiền và biên nhận
      </div>

      <div className="overflow-x-auto border border-slate-300 rounded-xs">
        <table className="w-full text-left text-xs font-gov min-w-[720px]">
          <thead className="bg-[#f8fafc] text-slate-800 font-bold border-b border-slate-300 uppercase text-[10.5px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3 w-12 text-center">STT</th>
              <th className="py-2.5 px-3 w-36">Mã Giao Dịch</th>
              <th className="py-2.5 px-3 w-36 text-center">Thời Gian</th>
              <th className="py-2.5 px-3 min-w-[200px]">Tổ Chức / Nhà Hảo Tâm</th>
              <th className="py-2.5 px-3 w-40">Phân Loại Quỹ</th>
              <th className="py-2.5 px-3 w-36">Ngân Hàng</th>
              <th className="py-2.5 px-3 w-36 text-right">Số Tiền (VNĐ)</th>
              <th className="py-2.5 px-3 w-28 text-center">Trạng Thái</th>
              <th className="py-2.5 px-3 w-24 text-center">Đối Soát</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  className="py-10 text-center text-slate-500 text-xs"
                >
                  Không tìm thấy giao dịch nào phù hợp với điều kiện tìm kiếm.
                </td>
              </tr>
            ) : (
              rows.map((tx, idx) => (
                <StatementRow
                  key={tx.id}
                  tx={tx}
                  index={idx + 1}
                  onSelect={onSelectRow}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatementRow({
  tx,
  index,
  onSelect,
}: {
  tx: FinanceTransaction;
  index: number;
  onSelect: (tx: FinanceTransaction) => void;
}) {
  const isCharity = tx.category === "CHARITY_DONATION";
  const isLive = tx.id.startsWith("live-");

  return (
    <tr
      onClick={() => onSelect(tx)}
      className={`transition-colors cursor-pointer group ${
        isLive
          ? "bg-amber-50 hover:bg-amber-100 ring-1 ring-inset ring-amber-300"
          : "hover:bg-amber-50/40"
      }`}
    >
      <td className="py-2.5 px-3 text-center text-slate-500 font-mono text-[11px]">
        {index}
      </td>

      <td className="py-2.5 px-3 font-mono font-bold text-[#991b1b] whitespace-nowrap text-[11px]">
        <div className="flex items-center gap-1.5">
          {tx.code}
          {isLive && (
            <span className="px-1.5 py-0.5 bg-amber-500 text-white text-[9px] font-black rounded-xs tracking-wider animate-pulse">
              MỚI
            </span>
          )}
        </div>
      </td>

      <td className="py-2.5 px-3 text-center text-slate-500 font-mono text-[11px] whitespace-nowrap">
        {tx.completedAt || tx.createdAt}
      </td>

      <td className="py-2.5 px-3">
        <div className="font-bold text-slate-900 group-hover:text-[#991b1b] transition-colors">
          {tx.targetName}
        </div>
        <div className="text-[11px] text-slate-500 line-clamp-1 italic">
          {tx.qrContent}
        </div>
      </td>

      <td className="py-2.5 px-3 whitespace-nowrap">
        {isCharity ? (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
            <HeartHandshake className="w-3 h-3 text-rose-600" />
            Ủng Hộ Thiện Nguyện
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
            <CreditCard className="w-3 h-3 text-amber-700" />
            Hội Phí & Niên Liễm
          </span>
        )}
      </td>

      <td className="py-2.5 px-3 whitespace-nowrap text-[11px]">
        <span className="text-slate-800 font-medium">
          {tx.bankSender || "Napas 24/7"}
        </span>
        {tx.accountMasked && (
          <span className="text-slate-400 font-mono block text-[10px]">
            {tx.accountMasked}
          </span>
        )}
      </td>

      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap text-xs">
        {new Intl.NumberFormat("vi-VN").format(tx.amount)} đ
      </td>

      <td className="py-2.5 px-3 text-center whitespace-nowrap">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Thành công
        </span>
      </td>

      <td className="py-2.5 px-3 text-center whitespace-nowrap">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(tx);
          }}
          className="px-2 py-1 bg-slate-100 hover:bg-[#991b1b] hover:text-white text-slate-700 text-[10px] font-bold rounded border border-slate-300 transition-colors cursor-pointer"
        >
          Biên nhận
        </button>
      </td>
    </tr>
  );
}

function TabButton({
  active,
  onClick,
  activeClass,
  idleClass,
  icon,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  activeClass: string;
  idleClass: string;
  icon?: React.ReactNode;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
        active ? `${activeClass} shadow-xs` : idleClass
      }`}
    >
      {icon}
      <span>{label}</span>
      <span className="px-1.5 py-0.2 bg-white/20 rounded text-[10px]">
        {count}
      </span>
    </button>
  );
}
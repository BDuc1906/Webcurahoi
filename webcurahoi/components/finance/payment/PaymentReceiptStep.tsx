"use client";

import React from "react";
import {
  CheckCircle,
  Mail,
  Printer,
  Download,
  Plus,
  ArrowDown,
} from "lucide-react";
import { VACHE_BANK } from "@/lib/vietqr";
import type { TxState } from "@/hooks/usePaymentFlow";

interface Props {
  tx: TxState;
  onReset: () => void;
}

export default function PaymentReceiptStep({ tx, onReset }: Props) {
  return (
    <section className="space-y-6">
      <div className="bg-white border-2 border-slate-400 rounded-xs shadow-2xl overflow-hidden max-w-2xl mx-auto">
        <ReceiptHeader code={tx.code} />
        <ReceiptBody tx={tx} />
        <ReceiptActions onReset={onReset} />
      </div>

      <div className="max-w-2xl mx-auto">
        <a
          href="#sao-ke-minh-bach"
          className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xs font-bold text-xs flex items-center justify-center gap-2 shadow-md"
        >
          <ArrowDown className="w-4 h-4 animate-bounce" />
          XEM DÒNG TIỀN VỪA NẠP TRÊN BẢNG SAO KÊ CÔNG KHAI
        </a>
      </div>
    </section>
  );
}

function ReceiptHeader({ code }: { code: string }) {
  return (
    <div className="bg-[#991b1b] text-white px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-amber-300" />
        <span className="font-bold text-xs uppercase tracking-wider">
          Biên Lai Điện Tử · Trung Ương Hội VACHE
        </span>
      </div>
      <span className="font-mono text-xs text-amber-200">{code}</span>
    </div>
  );
}

function ReceiptBody({ tx }: { tx: TxState }) {
  return (
    <div className="p-6 sm:p-8 space-y-5 text-xs">
      <div className="text-center space-y-0.5 border-b border-dashed border-slate-300 pb-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
        </p>
        <p className="text-[10px] italic text-slate-600">
          Độc lập - Tự do - Hạnh phúc
        </p>
        <div className="w-20 h-px bg-slate-400 mx-auto my-1" />
        <p className="text-[11px] font-bold uppercase text-[#991b1b]">
          TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
        </p>
        <h3 className="text-lg font-black text-slate-900 font-serif pt-2">
          BIÊN LAI THU TIỀN ĐIỆN TỬ
        </h3>
      </div>

      <div className="flex justify-center">
        <div className="border-4 border-[#991b1b] text-[#991b1b] font-black text-xs px-4 py-2 rotate-[-4deg] rounded-xs text-center tracking-wider shadow-xs">
          HỆ THỐNG ĐÃ THU TIỀN
          <br />
          VÀO TÀI KHOẢN TRUNG ƯƠNG HỘI
        </div>
      </div>

      <div className="space-y-2 bg-slate-50 p-4 rounded-xs border border-slate-200">
        <BillRow label="Mã giao dịch" value={tx.code} mono />
        <BillRow label="Người nộp" value={tx.payerName} bold />
        <BillRow
          label="Mục đích"
          value={
            tx.purpose === "DONATION"
              ? "Ủng hộ Quỹ Thiện nguyện Y tế"
              : "Nộp Niên liễm Hội phí"
          }
        />
        <BillRow
          label="Số tiền"
          value={`${new Intl.NumberFormat("vi-VN").format(tx.amount)} VNĐ`}
          mono
          bold
          highlight
        />
        <BillRow
          label="Ngân hàng ghi nhận"
          value={tx.bankGateway ?? VACHE_BANK.displayName}
        />
        <BillRow
          label="Thời gian"
          value={(tx.completedAt ?? new Date()).toLocaleString("vi-VN")}
          mono
        />
        <BillRow
          label="Tài khoản thụ hưởng"
          value={`${VACHE_BANK.accountNumber} · ${VACHE_BANK.displayName}`}
          mono
        />
      </div>

      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xs text-emerald-900 flex items-center gap-2">
        <Mail className="w-4 h-4 text-emerald-700 shrink-0" />
        <span className="text-[11px]">
          Biên lai đã được tự động gửi tới{" "}
          <strong className="font-mono">{tx.payerEmail}</strong>
        </span>
      </div>

      {tx.isDemo && (
        <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xs text-[11px] text-amber-900 text-center">
          ⚠️ Biên lai này được tạo từ chế độ <strong>DEMO</strong> — không có
          giao dịch ngân hàng thực tế nào xảy ra.
        </div>
      )}
    </div>
  );
}

function ReceiptActions({ onReset }: { onReset: () => void }) {
  return (
    <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-wrap gap-2 justify-end">
      <button
        onClick={() => window.print()}
        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xs font-bold text-xs flex items-center gap-1.5 border border-slate-300 cursor-pointer"
      >
        <Printer className="w-3.5 h-3.5" /> In biên lai
      </button>
      <button
        onClick={() => window.print()}
        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xs font-bold text-xs flex items-center gap-1.5 border border-slate-300 cursor-pointer"
      >
        <Download className="w-3.5 h-3.5" /> Tải PDF
      </button>
      <button
        onClick={onReset}
        className="px-4 py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs font-bold text-xs flex items-center gap-1.5 cursor-pointer"
      >
        <Plus className="w-3.5 h-3.5" /> Giao dịch mới
      </button>
    </div>
  );
}

function BillRow({
  label,
  value,
  mono,
  bold,
  highlight,
}: {
  label: string;
  value: string;
  mono?: boolean;
  bold?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between items-start gap-3 text-xs">
      <span className="text-slate-500 shrink-0">{label}:</span>
      <span
        className={`text-right ${mono ? "font-mono" : ""} ${
          bold ? "font-bold" : ""
        } ${highlight ? "text-[#991b1b] text-sm" : "text-slate-900"}`}
      >
        {value}
      </span>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  X,
  Copy,
  Check,
  Printer,
  CheckCircle2,
} from "lucide-react";
import { FinanceTransaction } from "@/lib/db/schema";
import { amountToVietnameseWords } from "@/lib/amount-to-words";

interface Props {
  tx: FinanceTransaction | null;
  onClose: () => void;
}

export default function StatementReceiptModal({ tx, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  if (!tx) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(tx.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white max-w-xl w-full rounded-xs border-2 border-slate-400 shadow-2xl overflow-hidden font-gov max-h-[92vh] flex flex-col">
        <div className="bg-[#991b1b] text-white px-4 sm:px-5 py-3 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-300" />
            <span className="font-bold text-xs uppercase tracking-wider">
              Chứng Thư Điện Tử Đối Soát Sao Kê Công Khai
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 text-slate-800 text-xs overflow-y-auto flex-1">
          <ReceiptHeader code={tx.code} />
          <ReceiptBody tx={tx} />
          <ReceiptFooter />
          <ReceiptActions
            copied={copied}
            onCopy={handleCopy}
            onClose={onClose}
          />
        </div>
      </div>
    </div>
  );
}

function ReceiptHeader({ code }: { code: string }) {
  return (
    <div className="text-center space-y-0.5 border-b border-slate-200 pb-3">
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
        CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
      </p>
      <p className="text-[9.5px] italic text-slate-600">
        Độc lập - Tự do - Hạnh phúc
      </p>
      <div className="w-20 h-px bg-slate-400 mx-auto my-1" />
      <p className="text-[10.5px] font-bold uppercase text-[#991b1b]">
        TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
      </p>
      <h4 className="text-base font-bold text-slate-900 font-serif pt-1">
        BIÊN NHẬN ĐIỆN TỬ GIAO DỊCH TÀI CHÍNH
      </h4>
      <p className="text-[10px] font-mono text-slate-500">
        Mã chứng từ: <span className="font-bold text-slate-800">{code}</span>
      </p>
    </div>
  );
}

function ReceiptBody({ tx }: { tx: FinanceTransaction }) {
  return (
    <div className="bg-slate-50 p-4 rounded-xs border border-slate-200 space-y-2.5">
      <Row label="Người nộp / Tổ chức">
        <span className="font-bold text-slate-900 text-right max-w-[280px]">
          {tx.targetName}
        </span>
      </Row>

      <Row label="Mục đích hạch toán">
        {tx.category === "CHARITY_DONATION" ? (
          <span className="text-rose-800 font-bold">
            Ủng hộ Quỹ Thiện nguyện Xã hội
          </span>
        ) : (
          <span className="text-amber-900 font-bold">
            Nộp Niên liễm Hội phí 2026
          </span>
        )}
      </Row>

      {tx.campaignName && (
        <Row label="Chương trình / Khoản mục">
          <span className="text-slate-800 text-right max-w-[280px]">
            {tx.campaignName}
          </span>
        </Row>
      )}

      <div className="flex justify-between items-center border-t border-slate-200 pt-2">
        <span className="text-slate-600 font-bold">Số tiền ghi nhận:</span>
        <span className="text-base font-mono font-black text-[#991b1b]">
          {new Intl.NumberFormat("vi-VN").format(tx.amount)} VNĐ
        </span>
      </div>

      <div className="text-[11px] text-slate-600 italic">
        (Bằng chữ: <strong>{amountToVietnameseWords(tx.amount)}</strong>)
      </div>

      <div className="border-t border-slate-200 pt-2 space-y-1 text-[11px]">
        <Row label="Tài khoản thụ hưởng">
          <span className="font-bold text-slate-800">1908.2008.8888 (MB Bank)</span>
        </Row>
        <Row label="Chủ tài khoản">
          <span className="font-bold text-slate-800">
            TRUNG ƯƠNG HỘI GDCSSKCĐ VN
          </span>
        </Row>
        <Row label="Ngân hàng gửi đối soát">
          <span className="text-slate-800">
            {tx.bankSender || "Hệ thống liên ngân hàng Napas"}
            {tx.accountMasked ? ` (${tx.accountMasked})` : ""}
          </span>
        </Row>
        <Row label="Thời gian khớp lệnh">
          <span className="font-mono text-slate-800">
            {tx.completedAt || tx.createdAt}
          </span>
        </Row>
        <Row label="Cú pháp chuyển khoản">
          <span className="font-mono text-[#991b1b] font-bold">
            {tx.qrContent}
          </span>
        </Row>
      </div>
    </div>
  );
}

function ReceiptFooter() {
  return (
    <div className="flex justify-between items-center border border-emerald-300 bg-emerald-50/60 p-3 rounded-xs">
      <div className="space-y-0.5">
        <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ĐÃ KHỚP NỐI SAO KÊ NGÂN HÀNG (100% MINH BẠCH)
        </div>
        <p className="text-[10px] text-emerald-800">
          Giao dịch đã được ghi nhận vào sổ cái tài chính công khai của Trung ương Hội.
        </p>
      </div>
      <div className="border border-emerald-500 px-2.5 py-1 rounded text-center shrink-0">
        <span className="text-[9px] uppercase font-bold text-emerald-800 block">
          Dấu kiểm toán
        </span>
        <span className="text-[8px] font-mono text-emerald-700 block">
          VACHE-AUDIT-OK
        </span>
      </div>
    </div>
  );
}

function ReceiptActions({
  copied,
  onCopy,
  onClose,
}: {
  copied: boolean;
  onCopy: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex justify-between items-center pt-2">
      <button
        type="button"
        onClick={onCopy}
        className="text-xs text-slate-700 hover:text-slate-900 flex items-center gap-1 font-bold cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã sao chép mã
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" /> Sao chép mã GD
          </>
        )}
      </button>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => window.print()}
          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xs flex items-center gap-1 border border-slate-300 transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" /> In biên nhận
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-1.5 bg-[#991b1b] hover:bg-red-800 text-white text-xs font-bold rounded-xs transition-colors cursor-pointer"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-between items-start gap-3">
      <span className="text-slate-500 shrink-0">{label}:</span>
      <span className="text-right">{children}</span>
    </div>
  );
}
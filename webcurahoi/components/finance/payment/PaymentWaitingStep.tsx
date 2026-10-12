"use client";

import React from "react";
import {
  Radar,
  Clock,
  CheckCircle,
  X,
  FlaskConical,
  Sparkles,
} from "lucide-react";
import { buildQrImageUrl, VACHE_BANK } from "@/lib/vietqr";
import type { TxState } from "@/hooks/usePaymentFlow";

interface Props {
  tx: TxState;
  secondsFormatted: string;
  onSimulate: () => void;
  onCancel: () => void;
}

export default function PaymentWaitingStep({
  tx,
  secondsFormatted,
  onSimulate,
  onCancel,
}: Props) {
  const addInfo =
    tx.purpose === "DONATION"
      ? `THIENNGUYEN ${tx.payerName.replace(/\s+/g, "")}`
      : `HOIPHI2026 ${tx.payerName.replace(/\s+/g, "")}`;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <div className="bg-white p-6 rounded-xs border-2 border-[#991b1b] shadow-md space-y-4">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#991b1b] border border-red-200 rounded-xs text-xs font-bold">
            <Radar
              className="w-4 h-4 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            ĐANG CHỜ TÍN HIỆU THANH TOÁN...
          </div>

          <div className="relative w-64 h-64 mx-auto bg-slate-50 border-2 border-[#991b1b] rounded-xs p-3 flex items-center justify-center">
            <img
              src={buildQrImageUrl(tx.amount, addInfo)}
              alt="Mã VietQR"
              className="w-full h-full object-contain"
            />
            <span className="absolute inset-0 rounded-xs pointer-events-none">
              <span className="absolute inset-0 rounded-xs border-2 border-[#991b1b]/40 animate-ping" />
            </span>
          </div>

          <div className="font-mono text-3xl font-black text-[#991b1b]">
            {secondsFormatted}
          </div>
          <p className="text-[11px] text-slate-500">
            Thời gian hiệu lực còn lại của mã giao dịch
          </p>
        </div>

        {tx.isDemo && (
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-xs space-y-2">
            <p className="text-[11px] text-amber-900 font-bold flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5" />
              Chế độ DEMO — backend chưa chạy
            </p>
            <p className="text-[10.5px] text-amber-800 leading-snug">
              Không có webhook ngân hàng nào tới. Bấm nút bên dưới để mô phỏng
              kịch bản ngân hàng báo có tiền.
            </p>
            <button
              onClick={onSimulate}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xs font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              GIẢ LẬP THANH TOÁN THÀNH CÔNG
            </button>
          </div>
        )}

        <button
          onClick={onCancel}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xs font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <X className="w-4 h-4" /> Hủy giao dịch
        </button>
      </div>

      <div className="bg-white p-6 rounded-xs border border-slate-300 shadow-2xs space-y-4 text-xs">
        <h3 className="font-bold text-sm text-slate-900 font-serif">
          Chi Tiết Giao Dịch Chờ
        </h3>
        <div className="space-y-2.5">
          <Row label="Mã giao dịch">
            <span className="font-mono font-bold text-[#991b1b]">
              {tx.code}
            </span>
          </Row>
          <Row label="Người nộp">
            <span className="font-bold">{tx.payerName}</span>
          </Row>
          <Row label="Số tiền">
            <span className="font-mono font-bold">
              {new Intl.NumberFormat("vi-VN").format(tx.amount)} đ
            </span>
          </Row>
          <Row label="Ngân hàng thụ hưởng">
            <span className="font-bold">{VACHE_BANK.displayName}</span>
          </Row>
          <Row label="Số tài khoản">
            <span className="font-mono">{VACHE_BANK.accountNumber}</span>
          </Row>
          <Row label="Nội dung CK">
            <span className="font-mono text-[11px]">{addInfo}</span>
          </Row>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xs text-[11px] text-amber-900 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            Sau khi chuyển khoản thành công, hệ thống sẽ tự động phát hiện trong
            1-3 giây qua webhook ngân hàng và chuyển sang bước tiếp theo.
          </span>
        </div>
      </div>
    </section>
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
    <div className="flex justify-between items-center gap-3">
      <span className="text-slate-500">{label}:</span>
      <span className="text-slate-900 text-right">{children}</span>
    </div>
  );
}
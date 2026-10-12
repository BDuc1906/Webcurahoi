"use client";

import React from "react";
import { CheckCircle, Clock } from "lucide-react";
import type { TxState } from "@/hooks/usePaymentFlow";

interface Props {
  tx: TxState;
}

export default function PaymentSuccessStep({ tx }: Props) {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 border-2 border-emerald-500 rounded-xs p-10 sm:p-16 text-center space-y-6 shadow-lg">
      <div className="relative w-32 h-32 mx-auto">
        <span className="absolute inset-0 rounded-full bg-emerald-200 animate-ping opacity-60" />
        <span className="absolute inset-0 rounded-full bg-emerald-500 flex items-center justify-center shadow-xl">
          <CheckCircle className="w-16 h-16 text-white" strokeWidth={3} />
        </span>
      </div>

      <h2 className="text-3xl sm:text-4xl font-black text-emerald-700 font-serif uppercase tracking-tight animate-bounce">
        GIAO DỊCH THÀNH CÔNG!
      </h2>

      <p className="text-sm text-slate-700 max-w-lg mx-auto">
        Hệ thống đã ghi nhận{" "}
        <strong className="font-mono text-emerald-700">
          {new Intl.NumberFormat("vi-VN").format(tx.amount)} đ
        </strong>{" "}
        từ <strong>{tx.payerName}</strong> vào Tài khoản Chuyên thu của Trung
        ương Hội.
      </p>

      <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-emerald-300 rounded-xs text-xs font-mono text-emerald-800">
        <Clock className="w-4 h-4" /> Đang xuất biên lai điện tử...
      </div>
    </section>
  );
}
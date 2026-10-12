"use client";

import React from "react";
import type { FlowStep } from "@/hooks/usePaymentFlow";

const STEPS = [
  { n: 1, label: "Tạo mã" },
  { n: 2, label: "Chờ thanh toán" },
  { n: 3, label: "Bắt giao dịch" },
  { n: 4, label: "Xuất biên lai" },
  { n: 5, label: "Đẩy sao kê" },
];

export default function PaymentStepProgress({ step }: { step: FlowStep }) {
  return (
    <div className="bg-white border border-slate-300 rounded-xs p-4">
      <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto text-[10.5px] sm:text-xs font-bold">
        {STEPS.map((s) => {
          const current =
            (step === "FORM" && s.n === 1) ||
            (step === "WAITING" && s.n === 2) ||
            (step === "SUCCESS" && s.n === 3) ||
            (step === "RECEIPT" && (s.n === 4 || s.n === 5));

          const done =
            (step === "WAITING" && s.n === 1) ||
            (step === "SUCCESS" && s.n <= 2) ||
            (step === "RECEIPT" && s.n <= 4);

          return (
            <div
              key={s.n}
              className={`flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                current
                  ? "text-[#991b1b]"
                  : done
                  ? "text-emerald-700"
                  : "text-slate-400"
              }`}
            >
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 ${
                  current
                    ? "border-[#991b1b] bg-red-50"
                    : done
                    ? "border-emerald-600 bg-emerald-50"
                    : "border-slate-300 bg-slate-50"
                }`}
              >
                {done ? "✓" : s.n}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
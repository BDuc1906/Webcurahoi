"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPayment } from "@/lib/api-client";
import { realtimeBus } from "@/lib/realtime-bus";
import { playDing } from "@/lib/sound";
import { FinanceTransaction } from "@/lib/db/schema";
import { formatMmSs, useCountdown } from "./useCountdown";

export type Purpose = "DONATION" | "MEMBERSHIP_FEE";
export type FlowStep = "FORM" | "WAITING" | "SUCCESS" | "RECEIPT";

export interface TxState {
  code: string;
  amount: number;
  payerName: string;
  payerEmail: string;
  purpose: Purpose;
  isDemo: boolean;
  bankGateway?: string;
  completedAt?: Date;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
const DEFAULT_TTL_SEC = 600;

export function usePaymentFlow() {
  const [step, setStep] = useState<FlowStep>("FORM");
  const [tx, setTx] = useState<TxState | null>(null);
  const [ttl, setTtl] = useState(DEFAULT_TTL_SEC);

  const sseRef = useRef<EventSource | null>(null);

  // -------------------------------------------------------------------
  // Đếm ngược khi đang WAITING
  // -------------------------------------------------------------------
  const handleExpire = useCallback(() => {
    if (sseRef.current) sseRef.current.close();
    setStep("FORM");
    setTx(null);
  }, []);

  const secondsLeft = useCountdown({
    seconds: ttl,
    active: step === "WAITING",
    onExpire: handleExpire,
  });

  // -------------------------------------------------------------------
  // Cleanup
  // -------------------------------------------------------------------
  useEffect(() => {
    return () => {
      if (sseRef.current) sseRef.current.close();
    };
  }, []);

  // -------------------------------------------------------------------
  // Đẩy dòng mới lên bus khi RECEIPT (Bước 5)
  // -------------------------------------------------------------------
  useEffect(() => {
    if (step !== "RECEIPT" || !tx) return;

    const row: FinanceTransaction = {
      id: `live-${tx.code}`,
      code: tx.code,
      targetType: tx.purpose === "DONATION" ? "DONOR" : "MEMBER",
      targetName: tx.payerName,
      category:
        tx.purpose === "DONATION"
          ? "CHARITY_DONATION"
          : "ANNUAL_MEMBERSHIP_FEE",
      amount: tx.amount,
      paymentMethod: "VIETQR",
      status: "COMPLETED",
      qrContent:
        tx.purpose === "DONATION"
          ? `THIENNGUYEN ${tx.payerName.replace(/\s+/g, "")}`
          : `HOIPHI2026 ${tx.payerName.replace(/\s+/g, "")}`,
      bankSender: tx.bankGateway ?? "MB Bank",
      accountMasked: "1908****8888",
      campaignName:
        tx.purpose === "DONATION"
          ? "Ủng hộ Quỹ Thiện nguyện"
          : "Nộp Niên liễm Hội phí",
      province: "Hà Nội",
      verified: true,
      createdAt: new Date().toLocaleString("vi-VN"),
      completedAt: (tx.completedAt ?? new Date()).toLocaleString("vi-VN"),
    };
    realtimeBus.emit(row);
  }, [step, tx?.code]);

  // -------------------------------------------------------------------
  // Tạo giao dịch
  // -------------------------------------------------------------------
  async function startPayment(input: {
    purpose: Purpose;
    amount: number;
    payerName: string;
    payerEmail: string;
  }) {
    if (input.amount < 10000) {
      alert("Số tiền tối thiểu 10.000 đ");
      return;
    }

    const purposeEnum =
      input.purpose === "DONATION"
        ? "CHARITY_DONATION"
        : "ANNUAL_MEMBERSHIP_FEE";

    // 1) Thử backend thật
    const res = await createPayment({
      purpose: purposeEnum,
      payerName: input.payerName,
      payerEmail: input.payerEmail,
      amount: input.amount,
      campaignSlug:
        input.purpose === "DONATION" ? "anh-sang-cong-dong" : undefined,
    });

    if (res && res.code) {
      setTtl(res.secondsLeft ?? DEFAULT_TTL_SEC);
      setTx({
        code: res.code,
        amount: res.amount ?? input.amount,
        payerName: input.payerName,
        payerEmail: input.payerEmail,
        purpose: input.purpose,
        isDemo: false,
      });
      setStep("WAITING");
      startSSE(res.code);
      return;
    }

    // 2) Fallback demo
    setTtl(DEFAULT_TTL_SEC);
    setTx({
      code: `VACHE-${input.purpose === "DONATION" ? "TN" : "HP"}-${Math.floor(
        100000 + Math.random() * 900000
      )}`,
      amount: input.amount,
      payerName: input.payerName,
      payerEmail: input.payerEmail,
      purpose: input.purpose,
      isDemo: true,
    });
    setStep("WAITING");
  }

  // -------------------------------------------------------------------
  // SSE lắng nghe webhook thật
  // -------------------------------------------------------------------
  function startSSE(code: string) {
    try {
      const es = new EventSource(
        `${API_URL}/finance/payments/${code}/stream`
      );
      sseRef.current = es;
      es.addEventListener("completed", (ev: MessageEvent) => {
        let gateway = "MB Bank";
        try {
          const data = JSON.parse(ev.data);
          gateway = data.bankGateway ?? gateway;
        } catch {
          /* noop */
        }
        finalizeSuccess(gateway, false);
        es.close();
      });
    } catch {
      /* noop */
    }
  }

  // -------------------------------------------------------------------
  // Chuyển sang SUCCESS → RECEIPT
  // -------------------------------------------------------------------
  const finalizeSuccess = useCallback(
    (gateway: string, isDemo: boolean) => {
      playDing();
      setTx((prev) =>
        prev
          ? {
              ...prev,
              bankGateway: gateway,
              completedAt: new Date(),
              isDemo,
            }
          : prev
      );
      setStep("SUCCESS");
      setTimeout(() => setStep("RECEIPT"), 2200);
    },
    []
  );

  /** Nút GIẢ LẬP — chỉ dùng cho demo */
  function simulateSuccess() {
    finalizeSuccess("MB Bank (demo)", true);
  }

  // -------------------------------------------------------------------
  // Reset
  // -------------------------------------------------------------------
  function reset() {
    if (sseRef.current) sseRef.current.close();
    setTx(null);
    setStep("FORM");
    setTtl(DEFAULT_TTL_SEC);
  }

  return {
    step,
    tx,
    secondsLeft,
    secondsFormatted: formatMmSs(secondsLeft),
    startPayment,
    simulateSuccess,
    reset,
  };
}
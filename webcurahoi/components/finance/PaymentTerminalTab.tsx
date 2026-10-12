"use client";

import React from "react";
import PublicFinanceStatement from "@/components/finance/PublicFinanceStatement";
import CampaignCards from "./campaign/CampaignCards";
import DisbursementsSection from "./campaign/DisbursementsSection";
import HonorRoll from "./campaign/HonorRoll";
import { usePaymentFlow } from "@/hooks/usePaymentFlow";
import { usePaymentPrefill } from "@/hooks/usePaymentPrefill";
import PaymentStepProgress from "./payment/PaymentStepProgress";
import PaymentFormStep from "./payment/PaymentFormStep";
import PaymentWaitingStep from "./payment/PaymentWaitingStep";
import PaymentSuccessStep from "./payment/PaymentSuccessStep";
import PaymentReceiptStep from "./payment/PaymentReceiptStep";

export default function PaymentTerminalTab() {
  const {
    step,
    tx,
    secondsFormatted,
    startPayment,
    simulateSuccess,
    reset,
  } = usePaymentFlow();

  const { prefill, setPrefill } = usePaymentPrefill();

  return (
    <div className="space-y-12">
      {/* ============================================================
          KHỐI CHIẾN DỊCH THIỆN NGUYỆN (Trụ cột 3 — đầu trang)
      ============================================================ */}
      <CampaignCards />

      {/* ============================================================
          THANH TIẾN TRÌNH 5 BƯỚC CỦA CỔNG THANH TOÁN
      ============================================================ */}
      <PaymentStepProgress step={step} />

      {/* ============================================================
          BƯỚC 1: FORM NHẬP THÔNG TIN
      ============================================================ */}
      {step === "FORM" && (
        <PaymentFormStep
          onSubmit={(input) => {
            // Xóa prefill sau khi dùng để tránh dính lại lần sau
            setPrefill(null);
            startPayment(input);
          }}
          initialPurpose={prefill?.purpose}
          initialAmount={prefill?.amount}
          initialName={prefill?.payerName}
        />
      )}

      {/* ============================================================
          BƯỚC 2: CHỜ THANH TOÁN — QR + RADAR + ĐẾM NGƯỢC
      ============================================================ */}
      {step === "WAITING" && tx && (
        <PaymentWaitingStep
          tx={tx}
          secondsFormatted={secondsFormatted}
          onSimulate={simulateSuccess}
          onCancel={reset}
        />
      )}

      {/* ============================================================
          BƯỚC 3: NỔ MÀN HÌNH THÀNH CÔNG
      ============================================================ */}
      {step === "SUCCESS" && tx && <PaymentSuccessStep tx={tx} />}

      {/* ============================================================
          BƯỚC 4 + 5: BIÊN LAI ĐIỆN TỬ + CTA ĐẨY LÊN SAO KÊ
      ============================================================ */}
      {step === "RECEIPT" && tx && (
        <PaymentReceiptStep tx={tx} onReset={reset} />
      )}

      {/* ============================================================
          BẢNG SAO KÊ CÔNG KHAI (dòng thu vào realtime)
      ============================================================ */}
      <section id="sao-ke-minh-bach" className="space-y-4 pt-4">
        <div className="border-b-2 border-slate-800 pb-2 flex flex-col sm:flex-row justify-between sm:items-end gap-2">
          <div>
            <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider block">
              Minh Bạch Tài Chính Thời Gian Thực
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
              BẢN SAO KÊ CÔNG KHAI CÁC GIAO DỊCH TOÀN QUỐC
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Dữ liệu tự động cập nhật liên tục qua liên minh Napas & MB Bank
          </p>
        </div>

        <PublicFinanceStatement />
      </section>

      {/* ============================================================
          BÁO CÁO GIẢI NGÂN CHI RA (Minh bạch hai chiều)
      ============================================================ */}
      <DisbursementsSection />

      {/* ============================================================
          BẢNG VÀNG TRI ÂN NHÀ HẢO TÂM
      ============================================================ */}
      <HonorRoll />
    </div>
  );
}
"use client";

import React, { useState } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import FeeScheduleTab from "@/components/finance/FeeScheduleTab";
import UnitFeeLookupTab from "@/components/finance/UnitFeeLookupTab";
import PaymentTerminalTab from "@/components/finance/PaymentTerminalTab";
import {
  PaymentPrefillProvider,
  usePaymentPrefill,
  PaymentPrefill,
} from "@/hooks/usePaymentPrefill";
import { FileText, Building2, CreditCard } from "lucide-react";

type TabKey = "FEE_SCHEDULE" | "UNIT_LOOKUP" | "PAYMENT_TERMINAL";

function CharityAndFeesContent() {
  const [activeTab, setActiveTab] = useState<TabKey>("PAYMENT_TERMINAL");
  const { setPrefill } = usePaymentPrefill();

  const tabs: { key: TabKey; label: string; icon: any; hint: string }[] = [
    {
      key: "FEE_SCHEDULE",
      label: "Văn Bản & Biểu Mức Phí",
      icon: FileText,
      hint: "Quy chế tài chính & định mức hội phí",
    },
    {
      key: "UNIT_LOOKUP",
      label: "Cổng Nộp Phí Chi Hội",
      icon: Building2,
      hint: "Tra cứu nghĩa vụ hội phí theo mã đơn vị",
    },
    {
      key: "PAYMENT_TERMINAL",
      label: "Thanh Toán Auto & Sao Kê",
      icon: CreditCard,
      hint: "VietQR Napas 24/7 · Minh bạch thời gian thực",
    },
  ];

  /** Tab 2 gọi callback này để nhảy sang Tab 3 với dữ liệu đã điền sẵn */
  const handleGoToPayment = (prefill: PaymentPrefill) => {
    setPrefill(prefill);
    setActiveTab("PAYMENT_TERMINAL");
    // Cuộn lên đầu trang để thấy form thanh toán
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <PublicHeader />

      <main className="max-w-7xl mx-auto px-4 py-10 flex-1 space-y-8 font-gov">
        <div className="border-b-2 border-[#991b1b] pb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#991b1b] rounded-full inline-block" />
            <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider block">
              Mảng V — Quản Trị Tài Chính Của Hội
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif">
            QUỸ THIỆN NGUYỆN · HỘI PHÍ · BẢN SAO KÊ MINH BẠCH
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-4xl leading-relaxed">
            Hệ thống công khai, minh bạch 100% nguồn thu theo Nghị định
            93/2019/NĐ-CP và Thông tư 41/2022/TT-BTC. Tích hợp cổng thanh toán
            VietQR Napas 24/7, tự động xuất biên lai và liên thông sao kê toàn
            quốc theo thời gian thực.
          </p>
        </div>

        <nav className="bg-white border border-slate-300 rounded-xs shadow-2xs overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`relative px-4 py-4 text-left transition-all cursor-pointer flex items-start gap-3 ${
                    active ? "bg-red-50/60" : "bg-white hover:bg-slate-50"
                  }`}
                >
                  {active && (
                    <span className="absolute top-0 left-0 right-0 h-1 bg-[#991b1b]" />
                  )}
                  <div
                    className={`w-10 h-10 rounded-xs flex items-center justify-center shrink-0 border ${
                      active
                        ? "bg-[#991b1b] text-white border-[#991b1b]"
                        : "bg-slate-100 text-slate-600 border-slate-200"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`text-xs font-bold uppercase tracking-wide ${
                        active ? "text-[#991b1b]" : "text-slate-900"
                      }`}
                    >
                      {t.label}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                      {t.hint}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        <section className="pt-2">
          {activeTab === "FEE_SCHEDULE" && <FeeScheduleTab />}
          {activeTab === "UNIT_LOOKUP" && (
            <UnitFeeLookupTab onGoToPayment={handleGoToPayment} />
          )}
          {activeTab === "PAYMENT_TERMINAL" && <PaymentTerminalTab />}
        </section>
      </main>

      <PublicFooter />
    </>
  );
}

export default function CharityAndFeesPage() {
  return (
    <PaymentPrefillProvider>
      <CharityAndFeesContent />
    </PaymentPrefillProvider>
  );
}
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface PaymentPrefill {
  purpose: "DONATION" | "MEMBERSHIP_FEE";
  amount: number;
  payerName: string;
  unitCode?: string;
}

interface PrefillContextType {
  prefill: PaymentPrefill | null;
  setPrefill: (p: PaymentPrefill | null) => void;
}

const PrefillContext = createContext<PrefillContextType | null>(null);

export function PaymentPrefillProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<PaymentPrefill | null>(null);
  return (
    <PrefillContext.Provider value={{ prefill, setPrefill }}>
      {children}
    </PrefillContext.Provider>
  );
}

export function usePaymentPrefill() {
  const ctx = useContext(PrefillContext);
  if (!ctx)
    throw new Error(
      "usePaymentPrefill must be used inside PaymentPrefillProvider"
    );
  return ctx;
}
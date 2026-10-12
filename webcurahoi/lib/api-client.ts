/**
 * API client gọi backend NestJS (Mảng V - Quản trị Tài chính).
 * Fallback về null khi backend chưa chạy.
 */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

async function getJson<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export interface FeeScheduleItem {
  code: string;
  name: string;
  category: "ANNUAL_MEMBERSHIP_FEE" | "ESTABLISHMENT_FEE";
  targetGroup?: "ORGANIZATION" | "INDIVIDUAL" | null;
  minAmount: number | null;
  maxAmount: number | null;
  note?: string | null;
  effectiveFrom?: string | null;
}

export interface FinanceDocumentItem {
  id: string;
  code?: string | null;
  title: string;
  docType?: string | null;
  issuedDate?: string | null;
  fileUrl?: string | null;
}

export interface UnitObligation {
  year: number;
  status: "UNPAID" | "PARTIAL" | "PAID" | "WAIVED";
  amountDue: number;
  amountPaid: number;
  amountRemaining: number;
  dueDate: string;
  paidAt?: string | null;
}

export interface UnitReminder {
  year: number;
  deadline: string;
  daysLeft: number;
  overdue: boolean;
  amountRemaining: number;
  message: string;
}

export interface UnitStatusResponse {
  unit: {
    code: string;
    name: string;
    unitType: string;
    province?: string | null;
  };
  status: "COMPLETED" | "INCOMPLETE";
  statusLabel: string;
  paidYears: number[];
  outstanding: UnitObligation[];
  totalOutstanding: number;
  reminder: UnitReminder | null;
  obligations: UnitObligation[];
}

export interface UnitPaymentRow {
  code: string;
  purpose: string;
  amount: number;
  method: string;
  bankGateway?: string | null;
  completedAt: string;
}

export interface CertificateResponse {
  code: string;
  verifyCode: string;
  verifyUrl: string;
  title: string;
  unit: { code: string; name: string };
  year: number;
  issuedAt: string;
  issuedBy?: string | null;
}

export interface FinanceSummary {
  totalCharity: number;
  totalMembershipFees: number;
  totalEstablishmentFees: number;
  totalFees: number;
  totalDisbursed: number;
  totalTransactions: number;
  charityCount: number;
  lastTransactionAt: string | null;
}

export const financeApi = {
  // ---- TAB 1
  feeSchedules: () => getJson<FeeScheduleItem[]>("/finance/fee-schedules"),
  documents: () => getJson<FinanceDocumentItem[]>("/finance/documents"),

  // ---- TAB 2
  unitStatus: (code: string) =>
    getJson<UnitStatusResponse>(`/finance/units/${code}`),
  unitPayments: (code: string) =>
    getJson<UnitPaymentRow[]>(`/finance/units/${code}/payments`),
  unitCertificate: (code: string, year: number) =>
    getJson<CertificateResponse>(
      `/finance/units/${code}/certificates/${year}`
    ),

  // ---- TAB 3
  summary: () => getJson<FinanceSummary>("/finance/statement/summary"),
  statement: (page = 1, limit = 20) =>
    getJson<any>(`/finance/statement?page=${page}&limit=${limit}`),
  campaigns: () => getJson<any[]>("/finance/campaigns"),
  honorRoll: (period: "quarter" | "year" | "all" = "year") =>
    getJson<any[]>(`/finance/honor-roll?period=${period}`),
};

/** Tạo giao dịch mới (POST) — dùng cho TAB 3 Payment Terminal */
export async function createPayment(payload: {
  purpose:
    | "CHARITY_DONATION"
    | "ANNUAL_MEMBERSHIP_FEE"
    | "ESTABLISHMENT_FEE";
  payerName: string;
  payerEmail?: string;
  amount?: number;
  campaignSlug?: string;
  unitCode?: string;
  year?: number;
  isAnonymous?: boolean;
}) {
  try {
    const res = await fetch(`${API_URL}/finance/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
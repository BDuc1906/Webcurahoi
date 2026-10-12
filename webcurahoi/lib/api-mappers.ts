import { FinanceTransaction } from "./db/schema";

/** Format ISO datetime → "dd/mm/yyyy hh:mm:ss" */
function formatDateTime(iso?: string | null): string {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hh}:${mm}:${ss}`;
  } catch {
    return "";
  }
}

/** 1 dòng API /finance/statement → FinanceTransaction hiển thị */
export function mapStatementItem(item: any): FinanceTransaction {
  const isCharity = item.purpose === "CHARITY_DONATION";
  return {
    id: item.code,
    code: item.code,
    targetType:
      item.payerType === "ORGANIZATION"
        ? "ORGANIZATION"
        : isCharity
        ? "DONOR"
        : "MEMBER",
    targetName: item.displayName ?? "Không rõ",
    category: isCharity ? "CHARITY_DONATION" : "ANNUAL_MEMBERSHIP_FEE",
    amount: Number(item.amount ?? 0),
    paymentMethod: "VIETQR",
    status: "COMPLETED",
    qrContent:
      item.campaign?.name ??
      item.unit?.name ??
      item.purposeLabel ??
      "",
    bankSender: item.bankGateway ?? "Napas 24/7",
    accountMasked: undefined,
    campaignName: item.campaign?.name ?? item.unit?.name,
    province: undefined,
    verified: Boolean(item.verified),
    createdAt: formatDateTime(item.completedAt),
    completedAt: formatDateTime(item.completedAt),
  };
}

/** Data API /finance/campaigns → shape CampaignCards */
export function mapCampaign(raw: any) {
  return {
    slug: raw.slug,
    name: raw.name,
    description: raw.description ?? "",
    targetAmount: Number(raw.targetAmount ?? 0),
    raisedAmount: Number(raw.raisedAmount ?? 0),
    donationCount: Number(raw.donationCount ?? 0),
    disbursedAmount: Number(raw.disbursedAmount ?? 0),
    progressPercent: Number(raw.progressPercent ?? 0),
    coverImageUrl: raw.coverImageUrl,
    status: (raw.status ?? "ACTIVE") as "ACTIVE" | "CLOSED" | "DRAFT",
  };
}

/** Data API /finance/campaigns/:slug/disbursements → shape DisbursementsSection */
export function mapDisbursement(raw: any, campaignSlug: string) {
  return {
    id: raw.id,
    campaignSlug,
    disbursedAt: formatDateTime(raw.disbursedAt).split(" ")[0] || "",
    item: raw.item,
    amount: Number(raw.amount ?? 0),
    beneficiary: raw.beneficiary,
    description: raw.description,
    photoUrls: raw.photoUrls,
  };
}

/** Data API /finance/honor-roll → shape HonorRoll */
export function mapHonorRoll(raw: any) {
  return {
    rank: raw.rank,
    name: raw.name,
    payerType: raw.payerType as "INDIVIDUAL" | "ORGANIZATION",
    totalAmount: Number(raw.totalAmount ?? 0),
    donations: Number(raw.donations ?? 0),
  };
}
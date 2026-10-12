/* ==========================================================================
   MOCK DATA — Trụ cột 3: Chiến dịch thiện nguyện, Giải ngân, Bảng vàng
   (Khớp cấu trúc seed.ts của backend NestJS)
   ========================================================================== */

export interface Campaign {
  slug: string;
  name: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  donationCount: number;
  disbursedAmount: number;
  progressPercent: number;
  coverImageUrl?: string;
  status: "ACTIVE" | "CLOSED" | "DRAFT";
}

export interface Disbursement {
  id: string;
  campaignSlug: string;
  disbursedAt: string;
  item: string;
  amount: number;
  beneficiary: string;
  description?: string;
  photoUrls?: string[];
}

export interface HonorRollEntry {
  rank: number;
  name: string;
  payerType: "INDIVIDUAL" | "ORGANIZATION";
  totalAmount: number;
  donations: number;
}

/* ---------------- 3 Chiến dịch trọng điểm ---------------- */
export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    slug: "anh-sang-cong-dong",
    name: "Ánh sáng Cộng đồng — Mổ mắt Phaco cho người cao tuổi nghèo",
    description:
      "Quỹ hỗ trợ phẫu thuật đục thủy tinh thể bằng phương pháp Phaco cho người cao tuổi có hoàn cảnh khó khăn trên toàn quốc.",
    targetAmount: 500_000_000,
    raisedAmount: 350_000_000,
    donationCount: 78,
    disbursedAmount: 220_000_000,
    progressPercent: 70,
    status: "ACTIVE",
  },
  {
    slug: "trai-tim-khoe-manh",
    name: "Trái tim khỏe mạnh cho em — Tầm soát tim bẩm sinh học đường",
    description:
      "Tầm soát và hỗ trợ điều trị tim bẩm sinh cho học sinh tiểu học và THCS tại các tỉnh miền núi, vùng sâu.",
    targetAmount: 300_000_000,
    raisedAmount: 210_000_000,
    donationCount: 47,
    disbursedAmount: 130_000_000,
    progressPercent: 70,
    status: "ACTIVE",
  },
  {
    slug: "tu-thuoc-ban-lang",
    name: "Tủ thuốc Y tế Bản làng & Khám bệnh vùng cao biên giới",
    description:
      "Trang bị tủ thuốc và tổ chức các đợt khám bệnh miễn phí cho bản làng vùng cao biên giới phía Bắc.",
    targetAmount: 200_000_000,
    raisedAmount: 15_000_000,
    donationCount: 12,
    disbursedAmount: 0,
    progressPercent: 7.5,
    status: "ACTIVE",
  },
];

/* ---------------- Giải ngân thực tế ---------------- */
export const MOCK_DISBURSEMENTS: Disbursement[] = [
  {
    id: "disb-01",
    campaignSlug: "anh-sang-cong-dong",
    disbursedAt: "2026-03-15",
    item: "Phẫu thuật Phaco đợt 1",
    amount: 120_000_000,
    beneficiary: "Bệnh viện Mắt Trung ương",
    description:
      "Hỗ trợ 240 ca mổ mắt cho người cao tuổi tại Hà Nội và các tỉnh phía Bắc.",
  },
  {
    id: "disb-02",
    campaignSlug: "anh-sang-cong-dong",
    disbursedAt: "2026-06-20",
    item: "Phẫu thuật Phaco đợt 2",
    amount: 100_000_000,
    beneficiary: "Bệnh viện Mắt TP. Hồ Chí Minh",
    description:
      "Hỗ trợ 200 ca mổ mắt cho người cao tuổi tại TP.HCM và Đồng bằng Sông Cửu Long.",
  },
  {
    id: "disb-03",
    campaignSlug: "trai-tim-khoe-manh",
    disbursedAt: "2026-04-10",
    item: "Tầm soát tim bẩm sinh học đường đợt 1",
    amount: 80_000_000,
    beneficiary: "Bệnh viện Nhi Trung ương",
    description:
      "Khám sàng lọc cho 4.000 học sinh tiểu học tại Hà Giang và Lào Cai.",
  },
  {
    id: "disb-04",
    campaignSlug: "trai-tim-khoe-manh",
    disbursedAt: "2026-08-05",
    item: "Hỗ trợ phẫu thuật tim cho 5 em nhỏ",
    amount: 50_000_000,
    beneficiary: "Trung tâm Tim mạch — Bệnh viện E",
    description:
      "Chi trả chi phí phẫu thuật tim hở cho 5 bệnh nhi có hoàn cảnh đặc biệt khó khăn.",
  },
];

/* ---------------- Bảng vàng nhà hảo tâm ---------------- */
export const MOCK_HONOR_ROLL_YEAR: HonorRollEntry[] = [
  {
    rank: 1,
    name: "Công ty Cổ phần Ao Vua",
    payerType: "ORGANIZATION",
    totalAmount: 100_000_000,
    donations: 1,
  },
  {
    rank: 2,
    name: "Tập đoàn Dược liệu và Sức khỏe Việt",
    payerType: "ORGANIZATION",
    totalAmount: 50_000_000,
    donations: 1,
  },
  {
    rank: 3,
    name: "Công ty Cổ phần Dược phẩm Nam Hà",
    payerType: "ORGANIZATION",
    totalAmount: 25_000_000,
    donations: 1,
  },
  {
    rank: 4,
    name: "Bác sĩ Phạm Minh Đức & Gia đình",
    payerType: "INDIVIDUAL",
    totalAmount: 20_000_000,
    donations: 1,
  },
  {
    rank: 5,
    name: "Công ty TNHH Thiết bị Y tế Tân Bình",
    payerType: "ORGANIZATION",
    totalAmount: 20_000_000,
    donations: 1,
  },
  {
    rank: 6,
    name: "Quỹ Khuyến học & Nhân đạo Tâm Đức",
    payerType: "ORGANIZATION",
    totalAmount: 15_000_000,
    donations: 1,
  },
  {
    rank: 7,
    name: "Gia đình Cố Bác sĩ Nguyễn Văn Kính",
    payerType: "INDIVIDUAL",
    totalAmount: 10_000_000,
    donations: 1,
  },
  {
    rank: 8,
    name: "Nhà hảo tâm Ẩn danh (Phật tử TP.HCM)",
    payerType: "INDIVIDUAL",
    totalAmount: 10_000_000,
    donations: 1,
  },
  {
    rank: 9,
    name: "Nhà thuốc Nhân Dân An Khang",
    payerType: "ORGANIZATION",
    totalAmount: 10_000_000,
    donations: 1,
  },
  {
    rank: 10,
    name: "Nhóm cựu sinh viên Đại học Y Hà Nội (K105)",
    payerType: "ORGANIZATION",
    totalAmount: 6_000_000,
    donations: 1,
  },
];

export const MOCK_HONOR_ROLL_QUARTER: HonorRollEntry[] = [
  {
    rank: 1,
    name: "Công ty TNHH Thảo Dược Sapa Organic",
    payerType: "ORGANIZATION",
    totalAmount: 5_000_000,
    donations: 1,
  },
  {
    rank: 2,
    name: "BS.CKII Nguyễn Thu Hà",
    payerType: "INDIVIDUAL",
    totalAmount: 5_000_000,
    donations: 1,
  },
  {
    rank: 3,
    name: "Dược sĩ Trần Hoàng Nam",
    payerType: "INDIVIDUAL",
    totalAmount: 5_000_000,
    donations: 1,
  },
  {
    rank: 4,
    name: "Lê Văn Tuấn & Gia đình",
    payerType: "INDIVIDUAL",
    totalAmount: 3_000_000,
    donations: 1,
  },
  {
    rank: 5,
    name: "Hoàng Trọng Nghĩa",
    payerType: "INDIVIDUAL",
    totalAmount: 3_000_000,
    donations: 1,
  },
  {
    rank: 6,
    name: "Vũ Thị Bích",
    payerType: "INDIVIDUAL",
    totalAmount: 3_000_000,
    donations: 1,
  },
  {
    rank: 7,
    name: "Phạm Thu Trang",
    payerType: "INDIVIDUAL",
    totalAmount: 2_000_000,
    donations: 1,
  },
  {
    rank: 8,
    name: "Ngô Minh Trí",
    payerType: "INDIVIDUAL",
    totalAmount: 2_000_000,
    donations: 1,
  },
  {
    rank: 9,
    name: "Đỗ Thị Thu Hường",
    payerType: "INDIVIDUAL",
    totalAmount: 2_000_000,
    donations: 1,
  },
  {
    rank: 10,
    name: "Nguyễn Văn An",
    payerType: "INDIVIDUAL",
    totalAmount: 1_000_000,
    donations: 1,
  },
];
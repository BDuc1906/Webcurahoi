/**
 * SCHEMA CƠ SỞ DỮ LIỆU CHUẨN CHO HỆ THỐNG HỘI GDCSSKCĐ VN (VACHE)
 * Tuân thủ đầy đủ 5 mảng nội dung trong tài liệu thiết kế.
 */

export interface Organization {
  id: string;
  code: string; // VD: CH-HN01, VIEN-01
  name: string; // Tên đầy đủ
  shortName?: string;
  unitType:
    | "CENTRAL_OFFICE"      // Cơ quan TW Hội & Văn phòng
    | "SPECIALIZED_BOARD"   // Ban chuyên môn TW
    | "UNION_BRANCH"        // Liên chi hội
    | "BRANCH"              // Chi hội
    | "INSTITUTE"           // Viện nghiên cứu KH&CN
    | "CENTER"              // Trung tâm hoạt động KH&CN
    | "REP_OFFICE"          // Văn phòng đại diện
    | "ENTERPRISE";         // Doanh nghiệp hội viên
  parentId?: string;        // ID đơn vị cấp trên trực tiếp (nếu có)
  decisionNumber: string;   // Số QĐ thành lập / Giấy phép KH&CN
  decisionDate: string;     // Ngày ký quyết định
  decisionFileUrl?: string; // File PDF quyết định thành lập
  address: string;          // Trụ sở
  provinceCity: string;     // Tỉnh/Thành phố
  phone: string;
  email: string;
  website?: string;
  leaderId?: string;        // Người đứng đầu (Trưởng ban, Viện trưởng, Chi hội trưởng)
  taxCode?: string;         // Mã số thuế
  status: "ACTIVE" | "SUSPENDED" | "DISSOLVED";
  createdAt: string;
}

export interface Personnel {
  id: string;
  fullName: string;
  avatarUrl?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dob: string;              // Ngày sinh
  citizenId: string;        // Số CCCD
  phone: string;
  email: string;
  address: string;
  organizationId: string;   // Thuộc Đơn vị nào
  position: string;         // Chức vụ
  isBch: boolean;           // Thành viên BCH TW Hội
  isBtv: boolean;           // Thành viên Ban Thường vụ TW Hội
  academicTitle?: string;   // Học hàm, học vị (GS, PGS, TS, BSCKII...)
  memberType: "INDIVIDUAL" | "ORGANIZATION" | "HONORARY";
  joinDate: string;         // Ngày gia nhập
  admissionDecision?: string; // Số QĐ kết nạp
  status: "ACTIVE" | "INACTIVE" | "TRANSFERRED" | "EXPELLED";
}

export interface Report {
  id: string;
  organizationId: string;
  organizationName: string;
  title: string;
  period: "MONTHLY" | "QUARTER_1" | "QUARTER_2" | "QUARTER_3" | "QUARTER_4" | "ANNUAL" | "AD_HOC";
  year: number;
  reportType: "ONLINE" | "OFFLINE_SCAN";
  attachments: { name: string; url: string; size: string }[];
  summary: string;
  submittedAt: string;
  status: "PENDING" | "REVIEWING" | "APPROVED" | "REVISION_REQUESTED";
  feedback?: string;
  reviewedBy?: string;
}

export interface LegalDocument {
  id: string;
  code: string;             // Số hiệu văn bản
  title: string;            // Trích yếu
  documentType: "CHARTER" | "ESTABLISHMENT_DECISION" | "BCH_RESOLUTION" | "BTV_DECISION" | "REGULATION" | "NOTICE";
  issuer: string;           // Cơ quan ban hành (TW Hội, Ban Thường vụ, BCH)
  signer: string;           // Người ký
  issuedDate: string;       // Ngày ban hành
  effectiveDate: string;    // Ngày có hiệu lực
  fileUrl: string;          // Đường dẫn file PDF
  isPublic: boolean;        // Công khai hay nội bộ
}

export interface FinanceTransaction {
  id: string;
  code: string;             // Mã giao dịch VietQR / Napas Ref
  targetType: "ORGANIZATION" | "MEMBER" | "DONOR";
  targetName: string;
  targetId?: string;
  category: "ESTABLISHMENT_FEE" | "ANNUAL_MEMBERSHIP_FEE" | "CHARITY_DONATION";
  amount: number;
  paymentMethod: "VIETQR" | "BANK_TRANSFER" | "CASH";
  status: "PENDING" | "COMPLETED" | "EXPIRED";
  qrContent: string;        // Cú pháp nội dung chuyển khoản
  bankSender?: string;      // Ngân hàng gửi đối soát (Vietcombank, MB Bank, Techcombank, ...)
  accountMasked?: string;   // Số tài khoản ẩn danh
  campaignName?: string;    // Tên chiến dịch thiện nguyện hoặc mục thu phí
  verified?: boolean;       // Đã khớp đối soát ngân hàng
  province?: string;        // Tỉnh / thành phố
  receiptUrl?: string;
  createdAt: string;
  completedAt?: string;
}


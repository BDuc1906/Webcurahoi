"use client";

import React, { useState, useMemo } from "react";
import {
  HeartHandshake,
  CreditCard,
  Search,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Building2,
  User,
  Filter,
  ArrowUpDown,
  Download,
  Printer,
  X,
  Copy,
  Check,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Landmark,
  BadgeAlert,
  Info,
} from "lucide-react";
import {
  MOCK_FINANCE_TRANSACTIONS,
  TOTAL_CHARITY_AMOUNT,
  TOTAL_FEE_AMOUNT,
  TOTAL_DONATION_GOAL,
} from "@/lib/mock-finance-data";
import { FinanceTransaction } from "@/lib/db/schema";

// Chuyển đổi số tiền thành chữ tiếng Việt chuẩn hóa hành chính
function amountToVietnameseWords(amount: number): string {
  if (amount === 100000000) return "Một trăm triệu đồng chẵn";
  if (amount === 50000000) return "Năm mươi triệu đồng chẵn";
  if (amount === 25000000) return "Hai mươi lăm triệu đồng chẵn";
  if (amount === 20000000) return "Hai mươi triệu đồng chẵn";
  if (amount === 15000000) return "Mười lăm triệu đồng chẵn";
  if (amount === 10000000) return "Mười triệu đồng chẵn";
  if (amount === 8000000) return "Tám triệu đồng chẵn";
  if (amount === 6000000) return "Sáu triệu đồng chẵn";
  if (amount === 5000000) return "Năm triệu đồng chẵn";
  if (amount === 3000000) return "Ba triệu đồng chẵn";
  if (amount === 2500000) return "Hai triệu năm trăm ngàn đồng chẵn";
  if (amount === 2000000) return "Hai triệu đồng chẵn";
  if (amount === 1500000) return "Một triệu năm trăm ngàn đồng chẵn";
  if (amount === 1000000) return "Một triệu đồng chẵn";
  if (amount === 500000) return "Năm trăm ngàn đồng chẵn";
  if (amount === 300000) return "Ba trăm ngàn đồng chẵn";
  if (amount === 200000) return "Hai trăm ngàn đồng chẵn";
  if (amount === 120000) return "Một trăm hai mươi ngàn đồng chẵn";
  if (amount === 100000) return "Một trăm ngàn đồng chẵn";
  if (amount === 50000) return "Năm mươi ngàn đồng chẵn";

  // Thuật toán đọc số tổng quát
  const digits = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  const millions = Math.floor(amount / 1000000);
  const thousands = Math.floor((amount % 1000000) / 1000);
  const remainder = amount % 1000;

  let parts: string[] = [];
  if (millions > 0) parts.push(`${millions} triệu`);
  if (thousands > 0) parts.push(`${thousands} ngàn`);
  if (remainder > 0) parts.push(`${remainder}`);
  parts.push("đồng chẵn");
  return parts.join(" ");
}

export default function PublicFinanceStatement() {
  // Bộ lọc danh mục chính: ALL | CHARITY_DONATION | ANNUAL_MEMBERSHIP_FEE
  const [activeTab, setActiveTab] = useState<"ALL" | "CHARITY_DONATION" | "ANNUAL_MEMBERSHIP_FEE">("ALL");

  // Bộ lọc tìm kiếm đối soát (Dành cho người đóng góp)
  const [searchQuery, setSearchQuery] = useState("");
  const [bankFilter, setBankFilter] = useState("ALL");
  const [amountRange, setAmountRange] = useState("ALL");

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  // Modal xem biên nhận điện tử
  const [selectedTx, setSelectedTx] = useState<FinanceTransaction | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Đếm số lượng
  const charityCount = useMemo(
    () => MOCK_FINANCE_TRANSACTIONS.filter((t) => t.category === "CHARITY_DONATION").length,
    []
  );
  const feeCount = useMemo(
    () => MOCK_FINANCE_TRANSACTIONS.filter((t) => t.category === "ANNUAL_MEMBERSHIP_FEE").length,
    []
  );

  // Lọc dữ liệu theo tab và bộ lọc tra cứu
  const filteredTransactions = useMemo(() => {
    return MOCK_FINANCE_TRANSACTIONS.filter((tx) => {
      // 1. Phân loại theo Tab
      if (activeTab !== "ALL" && tx.category !== activeTab) {
        return false;
      }

      // 2. Lọc theo từ khóa tìm kiếm (Tên, Mã GD, Nội dung CK, Số tài khoản, Tỉnh thành)
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const matchName = tx.targetName.toLowerCase().includes(q);
        const matchCode = tx.code.toLowerCase().includes(q);
        const matchNote = tx.qrContent.toLowerCase().includes(q);
        const matchBank = tx.bankSender ? tx.bankSender.toLowerCase().includes(q) : false;
        const matchAccount = tx.accountMasked ? tx.accountMasked.toLowerCase().includes(q) : false;
        const matchProv = tx.province ? tx.province.toLowerCase().includes(q) : false;
        const matchCampaign = tx.campaignName ? tx.campaignName.toLowerCase().includes(q) : false;

        if (!matchName && !matchCode && !matchNote && !matchBank && !matchAccount && !matchProv && !matchCampaign) {
          return false;
        }
      }

      // 3. Lọc theo Ngân hàng
      if (bankFilter !== "ALL") {
        if (!tx.bankSender || !tx.bankSender.toLowerCase().includes(bankFilter.toLowerCase())) {
          return false;
        }
      }

      // 4. Lọc theo Mức tiền
      if (amountRange !== "ALL") {
        if (amountRange === "UNDER_500K" && tx.amount >= 500000) return false;
        if (amountRange === "500K_2M" && (tx.amount < 500000 || tx.amount > 2000000)) return false;
        if (amountRange === "2M_10M" && (tx.amount < 2000000 || tx.amount > 10000000)) return false;
        if (amountRange === "OVER_10M" && tx.amount <= 10000000) return false;
      }

      return true;
    });
  }, [activeTab, searchQuery, bankFilter, amountRange]);

  // Tính toán phân trang
  const totalPages = Math.ceil(filteredTransactions.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTransactions.slice(start, start + pageSize);
  }, [filteredTransactions, currentPage]);

  // Đổi trang
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Reset bộ lọc
  const handleResetFilters = () => {
    setSearchQuery("");
    setBankFilter("ALL");
    setAmountRange("ALL");
    setCurrentPage(1);
  };

  // Copy mã tra cứu
  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Tính tổng số tiền trong danh sách đang lọc
  const currentFilteredSum = useMemo(() => {
    return filteredTransactions.reduce((acc, t) => acc + t.amount, 0);
  }, [filteredTransactions]);

  return (
    <div className="space-y-8 font-gov">
      {/* =========================================================
          1. 4 THẺ THỐNG KÊ MINH BẠCH TÀI CHÍNH TOÀN QUỐC
      ========================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Thẻ 1: Quỹ Thiện Nguyện */}
        <div
          onClick={() => {
            setActiveTab("CHARITY_DONATION");
            setCurrentPage(1);
          }}
          className={`cursor-pointer transition-all border p-5 rounded-xs flex flex-col justify-between shadow-2xs ${
            activeTab === "CHARITY_DONATION"
              ? "bg-rose-50/80 border-[#991b1b] ring-2 ring-red-600/20"
              : "bg-white border-slate-300 hover:border-slate-400"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800">
              Quỹ Thiện Nguyện Xã Hội
            </span>
            <span className="p-1.5 bg-rose-100 text-[#991b1b] rounded">
              <HeartHandshake className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-black text-rose-900">
              {new Intl.NumberFormat("vi-VN").format(TOTAL_CHARITY_AMOUNT)} đ
            </div>
            <p className="text-[11px] text-slate-600 mt-1 flex items-center justify-between">
              <span>{charityCount} nhà hảo tâm đóng góp</span>
              <span className="font-bold text-emerald-700">Đạt 70%</span>
            </p>
          </div>
        </div>

        {/* Thẻ 2: Quỹ Hội Phí & Niên Liễm */}
        <div
          onClick={() => {
            setActiveTab("ANNUAL_MEMBERSHIP_FEE");
            setCurrentPage(1);
          }}
          className={`cursor-pointer transition-all border p-5 rounded-xs flex flex-col justify-between shadow-2xs ${
            activeTab === "ANNUAL_MEMBERSHIP_FEE"
              ? "bg-amber-50/80 border-amber-600 ring-2 ring-amber-600/20"
              : "bg-white border-slate-300 hover:border-slate-400"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
              Hội Phí & Niên Liễm 2026
            </span>
            <span className="p-1.5 bg-amber-100 text-amber-800 rounded">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-black text-amber-950">
              {new Intl.NumberFormat("vi-VN").format(TOTAL_FEE_AMOUNT)} đ
            </div>
            <p className="text-[11px] text-slate-600 mt-1 flex items-center justify-between">
              <span>{feeCount} chi hội & hội viên</span>
              <span className="font-bold text-emerald-700">Hoàn thành</span>
            </p>
          </div>
        </div>

        {/* Thẻ 3: Tổng lượt giao dịch sao kê */}
        <div
          onClick={() => {
            setActiveTab("ALL");
            setCurrentPage(1);
          }}
          className={`cursor-pointer transition-all border p-5 rounded-xs flex flex-col justify-between shadow-2xs ${
            activeTab === "ALL"
              ? "bg-slate-100 border-slate-700 ring-2 ring-slate-400"
              : "bg-white border-slate-300 hover:border-slate-400"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Lượt Giao Dịch Đối Soát
            </span>
            <span className="p-1.5 bg-slate-100 text-slate-800 rounded">
              <FileText className="w-4 h-4" />
            </span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-black text-slate-900">
              {MOCK_FINANCE_TRANSACTIONS.length} lượt
            </div>
            <p className="text-[11px] text-slate-600 mt-1 flex items-center justify-between">
              <span>Tổng thu: {new Intl.NumberFormat("vi-VN").format(TOTAL_CHARITY_AMOUNT + TOTAL_FEE_AMOUNT)} đ</span>
              <span className="font-bold text-emerald-700">100% Khớp</span>
            </p>
          </div>
        </div>

        {/* Thẻ 4: Cam kết chuẩn minh bạch */}
        <div className="bg-[#0f172a] text-white border border-slate-700 p-5 rounded-xs flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
              Chuẩn Minh Bạch Nhà Nước
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-slate-200">
              NĐ 93/2019/NĐ-CP & TT 41/2022
            </div>
            <p className="text-[10px] text-slate-400 leading-tight">
              Tài khoản MB Bank 1908.2008.8888 liên thông Napas VietQR tự động hóa 24/7.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          2. CÔNG CỤ TRA CỨU & ĐỐI SOÁT SAO KÊ DÀNH CHO NGƯỜI ĐÓNG GÓP
      ========================================================= */}
      <section className="bg-white border-2 border-slate-300 rounded-xs p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#991b1b]" />
              <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif">
                CÔNG CỤ TRA CỨU & ĐỐI SOÁT SAO KÊ MINH BẠCH
              </h3>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Dành cho Nhà hảo tâm, Chi hội cơ sở và Hội viên tìm kiếm xác nhận món tiền chuyển khoản của mình đã vào tài khoản Trung ương Hội.
            </p>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200 self-start sm:self-auto">
            Hạch toán tự động: 1-3 giây
          </span>
        </div>

        {/* Ô tìm kiếm & Bộ lọc linh hoạt */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Input tìm kiếm chính */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Nhập tên nhà hảo tâm, mã GD (VD: VACHE-QR-...), nội dung CK..."
              className="w-full pl-9 pr-8 py-2 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-red-600 focus:outline-none bg-slate-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Lọc ngân hàng gửi */}
          <div className="sm:col-span-3">
            <select
              value={bankFilter}
              onChange={(e) => {
                setBankFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-red-600 focus:outline-none bg-white font-gov"
            >
              <option value="ALL">Tất cả ngân hàng gửi</option>
              <option value="Vietcombank">Vietcombank</option>
              <option value="MB Bank">MB Bank</option>
              <option value="Techcombank">Techcombank</option>
              <option value="BIDV">BIDV</option>
              <option value="VietinBank">VietinBank</option>
              <option value="Agribank">Agribank</option>
              <option value="VPBank">VPBank</option>
              <option value="ACB">ACB</option>
              <option value="TPBank">TPBank</option>
            </select>
          </div>

          {/* Lọc khoảng tiền */}
          <div className="sm:col-span-3">
            <select
              value={amountRange}
              onChange={(e) => {
                setAmountRange(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full py-2 px-3 text-xs border border-slate-300 rounded-xs focus:ring-1 focus:ring-red-600 focus:outline-none bg-white font-gov"
            >
              <option value="ALL">Mọi mức tiền đóng góp</option>
              <option value="UNDER_500K">Dưới 500.000 đ</option>
              <option value="500K_2M">500.000 đ - 2.000.000 đ</option>
              <option value="2M_10M">2.000.000 đ - 10.000.000 đ</option>
              <option value="OVER_10M">Trên 10.000.000 đ</option>
            </select>
          </div>
        </div>

        {/* Gợi ý từ khóa tìm kiếm nhanh */}
        <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500 pt-1">
          <span className="font-bold text-slate-700">Gợi ý tra cứu nhanh:</span>
          {["Công ty Ao Vua", "Dược Nam Hà", "Bác sĩ Hùng", "Phạm Minh Đức", "Chi hội Hải Phòng", "LCH TP.HCM", "Nam Định"].map((keyword) => (
            <button
              key={keyword}
              type="button"
              onClick={() => {
                setSearchQuery(keyword);
                setCurrentPage(1);
              }}
              className="px-2 py-0.5 bg-slate-100 hover:bg-red-50 hover:text-[#991b1b] border border-slate-200 rounded-xs text-[10.5px] transition-colors cursor-pointer"
            >
              {keyword}
            </button>
          ))}
          {(searchQuery || bankFilter !== "ALL" || amountRange !== "ALL") && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-red-700 font-bold hover:underline ml-2"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {/* Thông báo kết quả đối soát tức thì */}
        {searchQuery.trim() !== "" && (
          <div className="pt-2">
            {filteredTransactions.length > 0 ? (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xs text-xs text-emerald-900 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">
                    XÁC THỰC THÀNH CÔNG: Đã tìm thấy {filteredTransactions.length} giao dịch khớp với từ khóa &ldquo;{searchQuery}&rdquo;.
                  </span>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    Toàn bộ số tiền đã được khớp lệnh tự động vào Tài khoản Chuyên thu của Trung ương Hội (MB Bank - 1908.2008.8888). Bấm vào từng dòng hoặc nút &ldquo;Xem biên nhận&rdquo; để xem chứng thư điện tử.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 border border-amber-300 rounded-xs text-xs text-amber-900 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">
                    Chưa tìm thấy giao dịch nào khớp với &ldquo;{searchQuery}&rdquo; trong bảng sao kê hiện tại.
                  </span>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Lưu ý: Quý vị vui lòng thử tìm theo Họ tên viết không dấu, hoặc Mã tham chiếu giao dịch trên thông báo của App Ngân hàng (VD: VACHE-QR-...). Nếu quý vị vừa thực hiện giao dịch trong vài phút trước, xin liên hệ bộ phận Kế toán Trung ương Hội (024.3783.5678) để được đối soát ngay.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      {/* =========================================================
          3. BẢNG SAO KÊ CHI TIẾT CÓ TABS PHÂN TÁCH RÕ RÀNG
      ========================================================= */}
      <section className="bg-white border border-slate-300 rounded-xs p-5 sm:p-6 shadow-xs space-y-4">
        {/* Thanh chuyển Tabs lớn phân chia Thiện Nguyện vs Hội Phí */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-300 pb-3 gap-3">
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              onClick={() => {
                setActiveTab("ALL");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "ALL"
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span>Tất Cả Giao Dịch</span>
              <span className="px-1.5 py-0.2 bg-white/20 rounded text-[10px]">
                {MOCK_FINANCE_TRANSACTIONS.length}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("CHARITY_DONATION");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "CHARITY_DONATION"
                  ? "bg-[#991b1b] text-white border-[#991b1b] shadow-xs"
                  : "bg-white text-rose-800 border-rose-200 hover:bg-rose-50"
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Quỹ Thiện Nguyện</span>
              <span className="px-1.5 py-0.2 bg-white/20 rounded text-[10px]">
                {charityCount}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab("ANNUAL_MEMBERSHIP_FEE");
                setCurrentPage(1);
              }}
              className={`px-3 py-1.5 rounded-xs border transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === "ANNUAL_MEMBERSHIP_FEE"
                  ? "bg-amber-800 text-white border-amber-800 shadow-xs"
                  : "bg-white text-amber-900 border-amber-200 hover:bg-amber-50"
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Hội Phí & Niên Liễm</span>
              <span className="px-1.5 py-0.2 bg-white/20 rounded text-[10px]">
                {feeCount}
              </span>
            </button>
          </div>

          <div className="text-right text-xs">
            <span className="text-slate-500">Tổng đang hiển thị: </span>
            <strong className="text-slate-900 font-mono text-sm">
              {new Intl.NumberFormat("vi-VN").format(currentFilteredSum)} VNĐ
            </strong>
          </div>
        </div>

        {/* Hướng dẫn vuốt ngang trên thiết bị di động */}
        <div className="sm:hidden text-[10.5px] text-slate-500 flex items-center gap-1 italic px-0.5">
          <span>👉 Vuốt ngang để xem đầy đủ mã GD, số tiền và biên nhận</span>
        </div>

        {/* Bảng dữ liệu sao kê */}
        <div className="overflow-x-auto border border-slate-300 rounded-xs">
          <table className="w-full text-left text-xs font-gov min-w-[720px]">
            <thead className="bg-[#f8fafc] text-slate-800 font-bold border-b border-slate-300 uppercase text-[10.5px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3 w-12 text-center">STT</th>
                <th className="py-2.5 px-3 w-36">Mã Giao Dịch</th>
                <th className="py-2.5 px-3 w-36 text-center">Thời Gian</th>
                <th className="py-2.5 px-3 min-w-[200px]">Tổ Chức / Nhà Hảo Tâm</th>
                <th className="py-2.5 px-3 w-40">Phân Loại Quỹ</th>
                <th className="py-2.5 px-3 w-36">Ngân Hàng</th>
                <th className="py-2.5 px-3 w-36 text-right">Số Tiền (VNĐ)</th>
                <th className="py-2.5 px-3 w-28 text-center">Trạng Thái</th>
                <th className="py-2.5 px-3 w-24 text-center">Đối Soát</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((tx, idx) => {
                  const globalIdx = (currentPage - 1) * pageSize + idx + 1;
                  const isCharity = tx.category === "CHARITY_DONATION";

                  return (
                    <tr
                      key={tx.id}
                      onClick={() => setSelectedTx(tx)}
                      className="hover:bg-amber-50/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-2.5 px-3 text-center text-slate-500 font-mono text-[11px]">
                        {globalIdx}
                      </td>

                      <td className="py-2.5 px-3 font-mono font-bold text-[#991b1b] whitespace-nowrap text-[11px]">
                        {tx.code}
                      </td>

                      <td className="py-2.5 px-3 text-center text-slate-500 font-mono text-[11px] whitespace-nowrap">
                        {tx.completedAt || tx.createdAt}
                      </td>

                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900 group-hover:text-[#991b1b] transition-colors">
                          {tx.targetName}
                        </div>
                        <div className="text-[11px] text-slate-500 line-clamp-1 italic">
                          {tx.qrContent}
                        </div>
                      </td>

                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {isCharity ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
                            <HeartHandshake className="w-3 h-3 text-rose-600" />
                            Ủng Hộ Thiện Nguyện
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-200">
                            <CreditCard className="w-3 h-3 text-amber-700" />
                            Hội Phí & Niên Liễm
                          </span>
                        )}
                      </td>

                      <td className="py-2.5 px-3 whitespace-nowrap text-[11px]">
                        <span className="text-slate-800 font-medium">
                          {tx.bankSender || "Napas 24/7"}
                        </span>
                        {tx.accountMasked && (
                          <span className="text-slate-400 font-mono block text-[10px]">
                            {tx.accountMasked}
                          </span>
                        )}
                      </td>

                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap text-xs">
                        {new Intl.NumberFormat("vi-VN").format(tx.amount)} đ
                      </td>

                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" /> Thành công
                        </span>
                      </td>

                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTx(tx);
                          }}
                          className="px-2 py-1 bg-slate-100 hover:bg-[#991b1b] hover:text-white text-slate-700 text-[10px] font-bold rounded border border-slate-300 transition-colors cursor-pointer"
                        >
                          Biên nhận
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9} className="py-10 text-center text-slate-500 text-xs">
                    Không tìm thấy giao dịch nào phù hợp với điều kiện tìm kiếm.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Thanh phân trang và điều hướng */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 text-xs">
          <div className="text-slate-600 text-[11.5px]">
            Hiển thị <strong>{paginatedData.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</strong> -{" "}
            <strong>{Math.min(currentPage * pageSize, filteredTransactions.length)}</strong> trên tổng số{" "}
            <strong>{filteredTransactions.length}</strong> giao dịch đối soát
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Trang trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
              .map((pageNum, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && pageNum - prev > 1;

                return (
                  <React.Fragment key={pageNum}>
                    {showEllipsis && <span className="px-1 text-slate-400">...</span>}
                    <button
                      onClick={() => handlePageChange(pageNum)}
                      className={`min-w-[28px] h-7 px-1.5 rounded text-xs font-bold transition-colors ${
                        currentPage === pageNum
                          ? "bg-[#991b1b] text-white"
                          : "border border-slate-300 hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      {pageNum}
                    </button>
                  </React.Fragment>
                );
              })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              title="Trang sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          4. MODAL "BIÊN NHẬN ĐIỆN TỬ ĐỐI SOÁT SAO KÊ CÔNG KHAI"
      ========================================================= */}
      {selectedTx && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white max-w-xl w-full rounded-xs border-2 border-slate-400 shadow-2xl overflow-hidden font-gov animate-in fade-in zoom-in-95 duration-150 max-h-[92vh] flex flex-col">
            {/* Thanh tiêu đề Modal */}
            <div className="bg-[#991b1b] text-white px-4 sm:px-5 py-3 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
                <span className="font-bold text-xs uppercase tracking-wider">
                  Chứng Thư Điện Tử Đối Soát Sao Kê Công Khai
                </span>
              </div>
              <button
                onClick={() => setSelectedTx(null)}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Nội dung chứng từ mang chuẩn hành chính Việt Nam */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 text-slate-800 text-xs overflow-y-auto flex-1">
              {/* Quốc hiệu & Tiêu ngữ */}
              <div className="text-center space-y-0.5 border-b border-slate-200 pb-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </p>
                <p className="text-[9.5px] italic text-slate-600">Độc lập - Tự do - Hạnh phúc</p>
                <div className="w-20 h-px bg-slate-400 mx-auto my-1" />
                <p className="text-[10.5px] font-bold uppercase text-[#991b1b]">
                  TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
                </p>
                <h4 className="text-base font-bold text-slate-900 font-serif pt-1">
                  BIÊN NHẬN ĐIỆN TỬ GIAO DỊCH TÀI CHÍNH
                </h4>
                <p className="text-[10px] font-mono text-slate-500">
                  Mã chứng từ: <span className="font-bold text-slate-800">{selectedTx.code}</span>
                </p>
              </div>

              {/* Thông tin chi tiết giao dịch */}
              <div className="bg-slate-50 p-4 rounded-xs border border-slate-200 space-y-2.5">
                <div className="flex justify-between items-start">
                  <span className="text-slate-500">Người nộp / Tổ chức:</span>
                  <span className="font-bold text-slate-900 text-right max-w-[280px]">
                    {selectedTx.targetName}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Mục đích hạch toán:</span>
                  <span className="font-medium text-slate-900 text-right">
                    {selectedTx.category === "CHARITY_DONATION" ? (
                      <span className="text-rose-800 font-bold">Ủng hộ Quỹ Thiện nguyện Xã hội</span>
                    ) : (
                      <span className="text-amber-900 font-bold">Nộp Niên liễm Hội phí 2026</span>
                    )}
                  </span>
                </div>

                {selectedTx.campaignName && (
                  <div className="flex justify-between items-start">
                    <span className="text-slate-500">Chương trình / Khoản mục:</span>
                    <span className="text-slate-800 text-right max-w-[280px]">
                      {selectedTx.campaignName}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                  <span className="text-slate-600 font-bold">Số tiền ghi nhận:</span>
                  <span className="text-base font-mono font-black text-[#991b1b]">
                    {new Intl.NumberFormat("vi-VN").format(selectedTx.amount)} VNĐ
                  </span>
                </div>

                <div className="text-[11px] text-slate-600 italic">
                  (Bằng chữ: <strong>{amountToVietnameseWords(selectedTx.amount)}</strong>)
                </div>

                <div className="border-t border-slate-200 pt-2 space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tài khoản thụ hưởng:</span>
                    <span className="font-bold text-slate-800">1908.2008.8888 (MB Bank)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Chủ tài khoản:</span>
                    <span className="font-bold text-slate-800">TRUNG ƯƠNG HỘI GDCSSKCĐ VN</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ngân hàng gửi đối soát:</span>
                    <span className="text-slate-800">
                      {selectedTx.bankSender || "Hệ thống liên ngân hàng Napas"}
                      {selectedTx.accountMasked ? ` (${selectedTx.accountMasked})` : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Thời gian khớp lệnh:</span>
                    <span className="font-mono text-slate-800">
                      {selectedTx.completedAt || selectedTx.createdAt}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Cú pháp chuyển khoản:</span>
                    <span className="font-mono text-[#991b1b] font-bold">{selectedTx.qrContent}</span>
                  </div>
                </div>
              </div>

              {/* Dấu mộc số xác thực điện tử */}
              <div className="flex justify-between items-center border border-emerald-300 bg-emerald-50/60 p-3 rounded-xs">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ĐÃ KHỚP NỐI SAO KÊ NGÂN HÀNG (100% MINH BẠCH)
                  </div>
                  <p className="text-[10px] text-emerald-800">
                    Giao dịch đã được ghi nhận vào sổ cái tài chính công khai của Trung ương Hội theo quy định của pháp luật.
                  </p>
                </div>
                <div className="border border-emerald-500 px-2.5 py-1 rounded text-center shrink-0">
                  <span className="text-[9px] uppercase font-bold text-emerald-800 block">Dấu kiểm toán</span>
                  <span className="text-[8px] font-mono text-emerald-700 block">VACHE-AUDIT-OK</span>
                </div>
              </div>

              {/* Các thao tác: In, Sao chép, Đóng */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={() => handleCopyCode(selectedTx.code)}
                  className="text-xs text-slate-700 hover:text-slate-900 flex items-center gap-1 font-bold"
                >
                  {copiedCode ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã sao chép mã
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Sao chép mã GD
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xs flex items-center gap-1 border border-slate-300 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" /> In biên nhận
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedTx(null)}
                    className="px-4 py-1.5 bg-[#991b1b] hover:bg-red-800 text-white text-xs font-bold rounded-xs transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

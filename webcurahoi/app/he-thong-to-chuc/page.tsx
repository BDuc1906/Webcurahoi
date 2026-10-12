"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { MOCK_ORGANIZATIONS, MOCK_LEADERSHIP } from "@/lib/mock-data";
import { Organization, Personnel } from "@/lib/db/schema";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Search,
  Filter,
  CheckCircle,
  FileText,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Compass,
  Layers,
  Globe,
  Share2,
  ExternalLink,
  Printer,
  Copy,
  Check,
  X,
  List,
  Table as TableIcon,
  GitFork,
  ArrowRight,
  UserCheck,
  Award,
  Calendar,
  Sparkles,
} from "lucide-react";

// Định nghĩa vùng miền cho bộ lọc
const REGIONS: Record<string, string[]> = {
  BAC: [
    "Thành phố Hà Nội",
    "Thành phố Hải Phòng",
    "Tỉnh Quảng Ninh",
    "Tỉnh Phú Thọ",
    "Tỉnh Bắc Giang",
    "Tỉnh Bắc Ninh",
  ],
  TRUNG_TAYNGUYEN: [
    "Thành phố Đà Nẵng",
    "Tỉnh Thừa Thiên Huế",
    "Tỉnh Nghệ An",
    "Tỉnh Khánh Hòa",
    "Tỉnh Đắk Lắk",
    "Tỉnh Lâm Đồng",
  ],
  NAM: [
    "Thành phố Hồ Chí Minh",
    "Thành phố Cần Thơ",
    "Tỉnh Đồng Nai",
    "Tỉnh Bình Dương",
    "Tỉnh Kiên Giang",
  ],
};

function OrganizationsDirectoryContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const viewParam = searchParams.get("view");

  // State bộ lọc và tìm kiếm
  const [selectedType, setSelectedType] = useState<string>(() => typeParam || "ALL");
  const [selectedRegion, setSelectedRegion] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"rows" | "table" | "tree">(() => {
    if (viewParam === "tree") return "tree";
    if (viewParam === "table") return "table";
    return "rows";
  });

  // State hàng đang mở rộng (Accordion) trong chế độ Rows
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);

  // State Modal xem chi tiết hồ sơ đơn vị
  const [selectedOrgForModal, setSelectedOrgForModal] = useState<Organization | null>(null);

  // State sao chép thông tin
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Cập nhật khi URL param thay đổi
  useEffect(() => {
    if (typeParam) {
      setSelectedType(typeParam);
    }
  }, [typeParam]);

  useEffect(() => {
    if (viewParam === "tree") {
      setViewMode("tree");
    } else if (viewParam === "table") {
      setViewMode("table");
    } else if (viewParam === "rows") {
      setViewMode("rows");
    }
  }, [viewParam]);

  // Tạo map tìm kiếm nhanh thông tin lãnh đạo
  const leadersMap = useMemo(() => {
    const map = new Map<string, Personnel>();
    MOCK_LEADERSHIP.forEach((p) => {
      map.set(p.id, p);
    });
    return map;
  }, []);

  // Tạo map tìm kiếm đơn vị cha
  const orgsMap = useMemo(() => {
    const map = new Map<string, Organization>();
    MOCK_ORGANIZATIONS.forEach((o) => {
      map.set(o.id, o);
    });
    return map;
  }, []);

  // Các loại hình bộ lọc
  const types = [
    { id: "ALL", name: "Tất cả đơn vị", count: MOCK_ORGANIZATIONS.length },
    {
      id: "CENTRAL_OFFICE",
      name: "Cơ quan TW & Các ban",
      count: MOCK_ORGANIZATIONS.filter(
        (o) => o.unitType === "CENTRAL_OFFICE" || o.unitType === "SPECIALIZED_BOARD"
      ).length,
    },
    {
      id: "REP_OFFICE",
      name: "VP Đại diện các khu vực",
      count: MOCK_ORGANIZATIONS.filter((o) => o.unitType === "REP_OFFICE").length,
    },
    {
      id: "BRANCH",
      name: "Liên Chi hội & Chi hội 63 tỉnh",
      count: MOCK_ORGANIZATIONS.filter(
        (o) => o.unitType === "BRANCH" || o.unitType === "UNION_BRANCH"
      ).length,
    },
    {
      id: "INSTITUTE",
      name: "Viện & Trung tâm KH&CN",
      count: MOCK_ORGANIZATIONS.filter(
        (o) => o.unitType === "INSTITUTE" || o.unitType === "CENTER"
      ).length,
    },
    {
      id: "ENTERPRISE",
      name: "Đơn vị thành viên & Doanh nghiệp",
      count: MOCK_ORGANIZATIONS.filter((o) => o.unitType === "ENTERPRISE").length,
    },
  ];

  // Helper lấy badge và nhãn loại đơn vị
  const getUnitTypeConfig = (unitType: string) => {
    switch (unitType) {
      case "CENTRAL_OFFICE":
        return {
          label: "Cơ Quan Trung Ương",
          badgeColor: "bg-red-800 text-white border-red-900",
          lightBg: "bg-red-50 text-red-800",
        };
      case "SPECIALIZED_BOARD":
        return {
          label: "Ban Chuyên Môn TW",
          badgeColor: "bg-amber-700 text-white border-amber-800",
          lightBg: "bg-amber-50 text-amber-900",
        };
      case "REP_OFFICE":
        return {
          label: "Cơ Quan Đại Diện Miền",
          badgeColor: "bg-blue-800 text-white border-blue-900",
          lightBg: "bg-blue-50 text-blue-900",
        };
      case "UNION_BRANCH":
        return {
          label: "Liên Chi Hội Tỉnh/TP",
          badgeColor: "bg-indigo-800 text-white border-indigo-900",
          lightBg: "bg-indigo-50 text-indigo-900",
        };
      case "BRANCH":
        return {
          label: "Chi Hội Cơ Sở",
          badgeColor: "bg-slate-700 text-white border-slate-800",
          lightBg: "bg-slate-100 text-slate-800",
        };
      case "INSTITUTE":
        return {
          label: "Viện Nghiên Cứu KH&CN",
          badgeColor: "bg-emerald-800 text-white border-emerald-900",
          lightBg: "bg-emerald-50 text-emerald-900",
        };
      case "CENTER":
        return {
          label: "Trung Tâm Hoạt Động KH&CN",
          badgeColor: "bg-teal-800 text-white border-teal-900",
          lightBg: "bg-teal-50 text-teal-900",
        };
      case "ENTERPRISE":
        return {
          label: "Doanh Nghiệp Thành Viên",
          badgeColor: "bg-amber-800 text-white border-amber-900",
          lightBg: "bg-amber-50 text-amber-900",
        };
      default:
        return {
          label: "Đơn Vị Trực Thuộc",
          badgeColor: "bg-slate-700 text-white border-slate-800",
          lightBg: "bg-slate-100 text-slate-800",
        };
    }
  };

  // Lọc dữ liệu tổ chức
  const filtered = useMemo(() => {
    return MOCK_ORGANIZATIONS.filter((org) => {
      // 1. Lọc theo Loại hình
      let matchType = false;
      if (selectedType === "ALL") {
        matchType = true;
      } else if (selectedType === "CENTRAL_OFFICE") {
        matchType = org.unitType === "CENTRAL_OFFICE" || org.unitType === "SPECIALIZED_BOARD";
      } else if (selectedType === "REP_OFFICE") {
        matchType = org.unitType === "REP_OFFICE";
      } else if (selectedType === "BRANCH") {
        matchType = org.unitType === "BRANCH" || org.unitType === "UNION_BRANCH";
      } else if (selectedType === "INSTITUTE") {
        matchType = org.unitType === "INSTITUTE" || org.unitType === "CENTER";
      } else if (selectedType === "ENTERPRISE") {
        matchType = org.unitType === "ENTERPRISE";
      } else {
        matchType = org.unitType === selectedType;
      }

      // 2. Lọc theo Vùng miền
      let matchRegion = true;
      if (selectedRegion !== "ALL") {
        const provinceList = REGIONS[selectedRegion] || [];
        matchRegion = provinceList.some(
          (p) =>
            (org.provinceCity && org.provinceCity.includes(p)) ||
            (org.address && org.address.includes(p))
        );
      }

      // 3. Lọc theo từ khóa tìm kiếm (tên, mã, địa chỉ, người đứng đầu, quyết định)
      const leader = org.leaderId ? leadersMap.get(org.leaderId) : null;
      const leaderName = leader ? leader.fullName.toLowerCase() : "";
      const term = searchTerm.trim().toLowerCase();

      const matchSearch =
        term === "" ||
        org.name.toLowerCase().includes(term) ||
        (org.shortName && org.shortName.toLowerCase().includes(term)) ||
        org.address.toLowerCase().includes(term) ||
        org.code.toLowerCase().includes(term) ||
        (org.provinceCity && org.provinceCity.toLowerCase().includes(term)) ||
        org.decisionNumber.toLowerCase().includes(term) ||
        leaderName.includes(term);

      return matchType && matchRegion && matchSearch;
    });
  }, [selectedType, selectedRegion, searchTerm, leadersMap]);

  // Xử lý sao chép thông tin
  const handleCopyInfo = (org: Organization) => {
    const leader = org.leaderId ? leadersMap.get(org.leaderId) : null;
    const textToCopy = `${org.name}\n- Mã đơn vị: ${org.code}\n- Trụ sở: ${org.address}\n- Điện thoại: ${org.phone}\n- Email: ${org.email}\n- Căn cứ pháp lý: ${org.decisionNumber} (${org.decisionDate})${leader ? `\n- Lãnh đạo phụ trách: ${leader.fullName} (${leader.position})` : ""}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(org.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12 flex-1 space-y-8 font-gov">
      {/* 1. TIÊU ĐỀ CHÍNH LUẬN VÀ BREADCRUMB */}
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-[#991b1b] uppercase tracking-wider">
            Mảng III: Quản Trị Tổ Chức Của Hội
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-500 font-medium">Cơ sở dữ liệu mạng lưới toàn quốc</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 font-serif leading-tight">
          DANH BẠ MẠNG LƯỚI HỆ THỐNG TỔ CHỨC
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-4xl leading-relaxed">
          Cơ sở dữ liệu điện tử chính thức được cập nhật thường xuyên về Cơ quan Trung ương Hội, các Ban chuyên môn,
          Cơ quan đại diện các miền, Hệ thống Liên Chi hội & Chi hội 63 tỉnh thành, các Viện nghiên cứu,
          Trung tâm KH&CN và Doanh nghiệp trực thuộc Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam.
        </p>
      </div>

      {/* 2. DẢI THỐNG KÊ MẠNG LƯỚI (KPI METRICS STRIP) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-300 p-3.5 rounded-xs shadow-2xs hover:border-red-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Tổng Đơn Vị</span>
            <Building2 className="w-4 h-4 text-[#991b1b]" />
          </div>
          <div className="text-2xl font-black text-slate-900 font-mono">
            {MOCK_ORGANIZATIONS.length}
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">Mạng lưới 63 tỉnh thành</span>
        </div>

        <div className="bg-white border border-slate-300 p-3.5 rounded-xs shadow-2xs hover:border-red-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Cơ Quan TW</span>
            <ShieldCheck className="w-4 h-4 text-red-700" />
          </div>
          <div className="text-2xl font-black text-[#991b1b] font-mono">05</div>
          <span className="text-[10px] text-slate-500 block mt-0.5">Văn phòng & các Ban</span>
        </div>

        <div className="bg-white border border-slate-300 p-3.5 rounded-xs shadow-2xs hover:border-red-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">VP Đại Diện</span>
            <Compass className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl font-black text-blue-800 font-mono">04</div>
          <span className="text-[10px] text-slate-500 block mt-0.5">Bắc - Trung - Nam - Tây Nguyên</span>
        </div>

        <div className="bg-white border border-slate-300 p-3.5 rounded-xs shadow-2xs hover:border-red-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Hệ Thống Chi Hội</span>
            <Globe className="w-4 h-4 text-amber-700" />
          </div>
          <div className="text-2xl font-black text-amber-800 font-mono">14+</div>
          <span className="text-[10px] text-slate-500 block mt-0.5">Liên Chi hội & Chi hội</span>
        </div>

        <div className="bg-white border border-slate-300 p-3.5 rounded-xs shadow-2xs hover:border-red-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Viện & Trung Tâm</span>
            <Layers className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-emerald-800 font-mono">06</div>
          <span className="text-[10px] text-slate-500 block mt-0.5">Khoa học & Ứng dụng</span>
        </div>

        <div className="bg-white border border-slate-300 p-3.5 rounded-xs shadow-2xs hover:border-red-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pháp Nhân</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">100%</div>
          <span className="text-[10px] text-slate-500 block mt-0.5">Có QĐ phê duyệt</span>
        </div>
      </div>

      {/* 3. KHỐI QUY CHẾ VĂN BẢN VÀ CHẾ ĐỘ BÁO CÁO (ĐÁP ỨNG MỤC III.1 ĐẾN III.6 TRONG TÀI LIỆU) */}
      <div className="bg-slate-50 border border-slate-300 rounded-xs p-5 text-xs text-slate-700 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 shadow-2xs">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#991b1b] shrink-0" />
            <span className="font-bold text-[#991b1b] text-sm font-serif">
              Quy chế thành lập, giải thể và chế độ báo cáo công tác định kỳ của đơn vị trực thuộc
            </span>
          </div>
          <p className="text-slate-600 text-xs leading-relaxed">
            Quy chuẩn thẩm quyền phê duyệt của Ban Thường vụ Trung ương Hội đối với Chi hội, Liên Chi hội, Ban chuyên môn,
            Viện nghiên cứu và Doanh nghiệp trực thuộc; chế độ gửi báo cáo công tác định kỳ (tháng, quý, năm) theo Điều lệ Hội.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="px-3 py-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5"
            title="In trang danh bạ hiện tại"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" /> In Danh Bạ
          </button>
          <Link
            href="/van-ban"
            className="px-3.5 py-2 bg-white hover:bg-slate-100 text-[#991b1b] border border-red-300 rounded-xs font-bold shadow-2xs transition-colors flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5 text-[#991b1b]" /> Xem Văn Bản Pháp Quy
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Cổng Báo Cáo Định Kỳ</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 4. THANH ĐIỀU KHIỂN: BỘ LỌC, TÌM KIẾM VÀ CHUYỂN ĐỔI CHẾ ĐỘ XEM (VIEW MODE) */}
      <div className="bg-white border border-slate-300 rounded-xs p-4 shadow-xs space-y-4">
        {/* Dòng 1: Tabs phân loại đơn vị */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          <div className="flex gap-1.5 flex-nowrap">
            {types.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-xs font-bold text-xs shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                  selectedType === t.id
                    ? "bg-[#991b1b] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span>{t.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    selectedType === t.id
                      ? "bg-red-950 text-white"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dòng 2: Bộ lọc vùng miền, Tìm kiếm & Nút chuyển chế độ xem (Rows / Table / Tree) */}
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 text-xs">
          {/* Lọc theo vùng miền & tìm kiếm */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1">
            {/* Lọc vùng miền */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-slate-500 font-semibold whitespace-nowrap hidden md:inline">
                Khu vực:
              </span>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="border border-slate-300 rounded-xs px-2.5 py-1.5 bg-white text-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-red-600 font-gov w-full sm:w-auto"
              >
                <option value="ALL">Toàn quốc (63 tỉnh thành)</option>
                <option value="BAC">Khu vực Miền Bắc</option>
                <option value="TRUNG_TAYNGUYEN">Miền Trung & Tây Nguyên</option>
                <option value="NAM">Khu vực Miền Nam</option>
              </select>
            </div>

            {/* Ô tìm kiếm */}
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Tìm theo tên đơn vị, mã, địa chỉ, người đứng đầu, số quyết định..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-xs focus:outline-none focus:ring-1 focus:ring-red-600 text-xs font-gov"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Bộ nút chuyển đổi View Mode: Dạng Hàng (Rows) / Dạng Bảng (Table) / Dạng Cây (Tree) */}
          <div className="flex items-center justify-end gap-1 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <span className="text-slate-400 text-[11px] font-medium mr-1 hidden lg:inline">
              Chế độ hiển thị:
            </span>
            <div className="inline-flex rounded-xs border border-slate-300 p-0.5 bg-slate-100">
              <button
                onClick={() => setViewMode("rows")}
                className={`px-2.5 py-1 rounded-xs font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === "rows"
                    ? "bg-white text-[#991b1b] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Hiển thị dạng hàng chi tiết"
              >
                <List className="w-3.5 h-3.5" />
                <span>Dạng Hàng</span>
              </button>

              <button
                onClick={() => setViewMode("table")}
                className={`px-2.5 py-1 rounded-xs font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === "table"
                    ? "bg-white text-[#991b1b] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Hiển thị dạng bảng công vụ"
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Dạng Bảng</span>
              </button>

              <button
                onClick={() => setViewMode("tree")}
                className={`px-2.5 py-1 rounded-xs font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === "tree"
                    ? "bg-white text-[#991b1b] shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Hiển thị sơ đồ cây phân cấp"
              >
                <GitFork className="w-3.5 h-3.5" />
                <span>Sơ Đồ Cây</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KẾT QUẢ TÌM KIẾM TÓM TẮT */}
      <div className="flex justify-between items-center text-xs text-slate-500 px-1">
        <div>
          Tìm thấy <strong className="text-slate-900 font-mono">{filtered.length}</strong> đơn vị
          {searchTerm && <span> với từ khóa &ldquo;{searchTerm}&rdquo;</span>}
          {selectedRegion !== "ALL" && (
            <span>
              {" "}
              tại khu vực {selectedRegion === "BAC" ? "Miền Bắc" : selectedRegion === "TRUNG_TAYNGUYEN" ? "Miền Trung & Tây Nguyên" : "Miền Nam"}
            </span>
          )}
        </div>
        <div className="text-[11px] text-slate-400">
          Nhấp vào hàng hoặc nút &ldquo;Xem Hồ Sơ&rdquo; để mở trích lục chi tiết
        </div>
      </div>

      {/* 5. KHỐI HIỂN THỊ DỮ LIỆU CHÍNH (THEO VIEW MODE) */}

      {/* ---------------- CHẾ ĐỘ 1: DẠNG HÀNG DANH BẠ CHI TIẾT (ROWS VIEW) ---------------- */}
      {viewMode === "rows" && (
        <div className="space-y-3">
          {filtered.map((org, index) => {
            const leader = org.leaderId ? leadersMap.get(org.leaderId) : null;
            const parentOrg = org.parentId ? orgsMap.get(org.parentId) : null;
            const config = getUnitTypeConfig(org.unitType);
            const isExpanded = expandedRowId === org.id;

            return (
              <div
                key={org.id}
                className={`bg-white border rounded-xs transition-all duration-150 overflow-hidden shadow-2xs ${
                  isExpanded
                    ? "border-red-400 ring-1 ring-red-300"
                    : "border-slate-300 hover:border-slate-400"
                }`}
              >
                {/* Hàng thông tin chính (Horizontal Main Row) */}
                <div className="p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                  {/* Cột 1: Thông tin phân loại & Tên đơn vị */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[11px] text-slate-400 font-bold">
                        #{index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-xs text-[10px] font-bold uppercase border ${config.badgeColor}`}
                      >
                        {config.label}
                      </span>
                      <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded-xs font-semibold">
                        {org.code}
                      </span>
                      {parentOrg && (
                        <span className="text-[11px] text-slate-500 hidden sm:inline">
                          • Trực thuộc: <strong>{parentOrg.shortName || parentOrg.name}</strong>
                        </span>
                      )}
                    </div>

                    <div>
                      <h3
                        onClick={() => setSelectedOrgForModal(org)}
                        className="font-bold text-base sm:text-lg text-slate-900 font-serif leading-snug hover:text-[#991b1b] cursor-pointer transition-colors"
                      >
                        {org.name}
                      </h3>
                      {org.shortName && (
                        <p className="text-xs text-slate-500 font-serif italic mt-0.5">
                          Tên gọi thường dùng: {org.shortName}
                        </p>
                      )}
                    </div>

                    {/* Dòng căn cứ quyết định & Người phụ trách */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1.5 font-mono text-[11.5px] text-[#991b1b] font-medium">
                        <FileText className="w-3.5 h-3.5 shrink-0" />
                        <span>QĐ: {org.decisionNumber}</span>
                        {org.decisionDate && (
                          <span className="text-slate-500">({org.decisionDate})</span>
                        )}
                      </span>

                      {leader && (
                        <span className="flex items-center gap-1.5 text-slate-700">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>
                            Người đứng đầu:{" "}
                            <strong className="text-slate-900">{leader.fullName}</strong>
                            <span className="text-slate-500 text-[11px]"> ({leader.position})</span>
                          </span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cột 2: Trụ sở & Liên hệ hành chính (Hiển thị gọn gàng trên cùng hàng) */}
                  <div className="lg:w-80 shrink-0 space-y-1.5 text-xs text-slate-600 border-t lg:border-t-0 lg:border-l border-slate-200 pt-3 lg:pt-0 lg:pl-5 font-gov">
                    <p className="flex items-start gap-2 leading-relaxed">
                      <MapPin className="w-3.5 h-3.5 text-[#991b1b] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{org.address}</span>
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
                      <p className="flex items-center gap-1.5 font-mono text-slate-800">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{org.phone}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-slate-600 truncate max-w-[170px]">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{org.email}</span>
                      </p>
                    </div>
                  </div>

                  {/* Cột 3: Tác vụ & Nút bấm xem nhanh */}
                  <div className="lg:w-48 shrink-0 flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-center gap-2 border-t lg:border-t-0 border-slate-100 pt-3 lg:pt-0">
                    <div className="flex items-center gap-1 text-emerald-700 text-[11px] font-bold">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Pháp nhân hợp lệ</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setSelectedOrgForModal(org)}
                        className="px-2.5 py-1.5 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs font-bold text-xs shadow-2xs transition-colors flex items-center gap-1"
                      >
                        <span>Hồ Sơ</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => handleCopyInfo(org)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xs border border-slate-200 transition-colors"
                        title="Sao chép thông tin liên hệ"
                      >
                        {copiedId === org.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                        )}
                      </button>

                      <button
                        onClick={() =>
                          setExpandedRowId(isExpanded ? null : org.id)
                        }
                        className={`p-1.5 rounded-xs border transition-colors ${
                          isExpanded
                            ? "bg-red-100 text-[#991b1b] border-red-300"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"
                        }`}
                        title={isExpanded ? "Thu gọn dòng" : "Mở rộng chi tiết dòng"}
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Phần Accordion mở rộng chi tiết khi bấm vào nút xem thêm */}
                {isExpanded && (
                  <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 text-xs text-slate-700 space-y-3 font-gov">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Cột chi tiết 1 */}
                      <div className="space-y-1.5">
                        <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">
                          Căn Cứ Pháp Lý & Thẩm Quyền
                        </span>
                        <p>
                          <span className="text-slate-500">Số quyết định:</span>{" "}
                          <strong className="text-[#991b1b] font-mono">{org.decisionNumber}</strong>
                        </p>
                        <p>
                          <span className="text-slate-500">Ngày ký ban hành:</span>{" "}
                          <span className="font-mono">{org.decisionDate}</span>
                        </p>
                        <p>
                          <span className="text-slate-500">Cơ quan phê duyệt:</span>{" "}
                          <span>Ban Thường vụ Trung ương Hội</span>
                        </p>
                      </div>

                      {/* Cột chi tiết 2 */}
                      <div className="space-y-1.5">
                        <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">
                          Lãnh Đạo Phụ Trách Đơn Vị
                        </span>
                        {leader ? (
                          <>
                            <p>
                              <span className="text-slate-500">Họ và tên:</span>{" "}
                              <strong className="text-slate-900">{leader.fullName}</strong>
                            </p>
                            <p>
                              <span className="text-slate-500">Chức vụ công tác:</span>{" "}
                              <span className="text-[#991b1b] font-medium">{leader.position}</span>
                            </p>
                            {leader.academicTitle && (
                              <p>
                                <span className="text-slate-500">Học hàm / Học vị:</span>{" "}
                                <span>{leader.academicTitle}</span>
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="text-slate-500 italic">Đang cập nhật nhân sự phụ trách</p>
                        )}
                      </div>

                      {/* Cột chi tiết 3 */}
                      <div className="space-y-1.5">
                        <span className="font-bold text-slate-900 block uppercase tracking-wider text-[11px]">
                          Chế Độ Báo Cáo & Liên Hệ
                        </span>
                        <p>
                          <span className="text-slate-500">Kênh báo cáo:</span>{" "}
                          <span className="font-medium text-emerald-800">
                            Hệ thống Cổng Báo Cáo Trực Tuyến
                          </span>
                        </p>
                        <p>
                          <span className="text-slate-500">Kỳ hạn nộp:</span>{" "}
                          <span>Định kỳ Quý / Năm theo Điều lệ</span>
                        </p>
                        <div className="pt-1 flex gap-2">
                          <Link
                            href="/login"
                            className="text-[#991b1b] font-bold hover:underline inline-flex items-center gap-1"
                          >
                            Đăng nhập gửi báo cáo &raquo;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------- CHẾ ĐỘ 2: DẠNG BẢNG HÀNH CHÍNH CÔNG VỤ (DATA TABLE VIEW) ---------------- */}
      {viewMode === "table" && (
        <div className="bg-white rounded-xs border border-slate-300 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-gov min-w-[760px]">
              <thead className="bg-[#f1f5f9] text-slate-800 font-bold border-b border-slate-300 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-3 w-14 text-center">STT</th>
                  <th className="py-3 px-3 w-32">Mã Đơn Vị</th>
                  <th className="py-3 px-4 min-w-[240px]">Tên Đơn Vị / Phân Loại</th>
                  <th className="py-3 px-3 w-44">Người Đứng Đầu</th>
                  <th className="py-3 px-3 w-40">Căn Cứ Quyết Định</th>
                  <th className="py-3 px-3 min-w-[200px]">Trụ Sở / Địa Bàn</th>
                  <th className="py-3 px-3 w-28 text-center">Tác Vụ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((org, index) => {
                  const leader = org.leaderId ? leadersMap.get(org.leaderId) : null;
                  const config = getUnitTypeConfig(org.unitType);

                  return (
                    <tr
                      key={org.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      {/* STT */}
                      <td className="py-3 px-3 text-center font-mono text-slate-400 align-top">
                        {index + 1}
                      </td>

                      {/* Mã đơn vị */}
                      <td className="py-3 px-3 font-mono font-bold text-slate-700 align-top">
                        <div>{org.code}</div>
                        <span
                          className={`inline-block mt-1 text-[9.5px] px-1.5 py-0.2 rounded-xs uppercase ${config.lightBg}`}
                        >
                          {config.label}
                        </span>
                      </td>

                      {/* Tên đơn vị */}
                      <td className="py-3 px-4 align-top">
                        <button
                          onClick={() => setSelectedOrgForModal(org)}
                          className="font-bold text-slate-900 font-serif hover:text-[#991b1b] text-left leading-snug cursor-pointer"
                        >
                          {org.name}
                        </button>
                        {org.shortName && (
                          <div className="text-[11px] text-slate-500 font-serif italic mt-0.5">
                            ({org.shortName})
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 mt-1 font-mono">
                          <Phone className="w-3 h-3 text-slate-400" /> {org.phone} |{" "}
                          <Mail className="w-3 h-3 text-slate-400" /> {org.email}
                        </div>
                      </td>

                      {/* Người đứng đầu */}
                      <td className="py-3 px-3 align-top">
                        {leader ? (
                          <div>
                            <strong className="text-slate-900 block">{leader.fullName}</strong>
                            <span className="text-[11px] text-[#991b1b] block">{leader.position}</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Đang cập nhật</span>
                        )}
                      </td>

                      {/* Quyết định thành lập */}
                      <td className="py-3 px-3 font-mono text-[11px] text-[#991b1b] align-top">
                        <div className="font-semibold">{org.decisionNumber}</div>
                        {org.decisionDate && (
                          <div className="text-slate-500 text-[10px] mt-0.5">{org.decisionDate}</div>
                        )}
                      </td>

                      {/* Địa bàn / Trụ sở */}
                      <td className="py-3 px-3 text-slate-600 align-top">
                        <div className="flex items-start gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{org.address}</span>
                        </div>
                        {org.provinceCity && (
                          <span className="inline-block mt-1 font-semibold text-[10.5px] text-slate-700 bg-slate-100 px-1.5 py-0.2 rounded-xs">
                            {org.provinceCity}
                          </span>
                        )}
                      </td>

                      {/* Nút tác vụ */}
                      <td className="py-3 px-3 text-center align-top whitespace-nowrap">
                        <button
                          onClick={() => setSelectedOrgForModal(org)}
                          className="px-2.5 py-1 bg-red-50 text-[#991b1b] hover:bg-red-100 rounded-xs border border-red-200 font-bold text-xs transition-colors"
                        >
                          Chi Tiết
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ---------------- CHẾ ĐỘ 3: SƠ ĐỒ CÂY CƠ CẤU THỨ BẬC (HIERARCHICAL TREE VIEW) ---------------- */}
      {viewMode === "tree" && (
        <div className="bg-white border border-slate-300 rounded-xs p-6 shadow-xs space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase text-[#991b1b] tracking-wider block">
              Sơ Đồ Phân Cấp Thứ Bậc
            </span>
            <h2 className="text-xl font-bold font-serif text-slate-900 mt-1">
              CƠ CẤU HỆ THỐNG TỔ CHỨC TRUNG ƯƠNG HỘI VÀ CÁC ĐƠN VỊ TRỰC THUỘC
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Mô hình trực quan thể hiện mối quan hệ điều hành từ Cơ quan Trung ương Hội đến các Ban chuyên môn,
              Cơ quan Đại diện vùng, Hệ thống Chi hội 63 tỉnh thành, Khối Viện nghiên cứu & Doanh nghiệp.
            </p>
          </div>

          {/* Gốc cấp 0: TRUNG ƯƠNG HỘI */}
          <div className="space-y-6">
            <div className="bg-red-900 text-white p-4 rounded-xs border-2 border-red-950 shadow-md max-w-2xl mx-auto text-center space-y-1">
              <span className="text-[10px] font-bold tracking-widest text-amber-300 uppercase block font-mono">
                CẤP ĐIỀU HÀNH TỐI CAO TOÀN QUỐC
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-white uppercase">
                TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
              </h3>
              <p className="text-xs text-slate-200">
                Thành lập theo Quyết định số 128/QĐ-BNV của Bộ Nội vụ • Chủ tịch: Đ/c Nguyễn Hồng Quân
              </p>
            </div>

            {/* Đường nối nhánh */}
            <div className="w-0.5 h-6 bg-red-900 mx-auto" />

            {/* 4 Nhánh Cấp 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Nhánh 1: Cơ quan TW & Các ban */}
              <div className="bg-slate-50 border border-slate-300 rounded-xs p-4 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <ShieldCheck className="w-4 h-4 text-[#991b1b]" />
                    <h4 className="font-bold text-xs uppercase text-[#991b1b] font-serif">
                      Cơ Quan TW & Các Ban (05)
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Văn phòng Trung ương và các ban chuyên môn tham mưu trực tiếp.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
                    {MOCK_ORGANIZATIONS.filter(
                      (o) =>
                        o.unitType === "CENTRAL_OFFICE" || o.unitType === "SPECIALIZED_BOARD"
                    ).map((o) => (
                      <li
                        key={o.id}
                        onClick={() => setSelectedOrgForModal(o)}
                        className="p-1.5 bg-white rounded-xs border border-slate-200 hover:border-red-400 hover:text-[#991b1b] cursor-pointer transition-colors text-[11.5px] font-medium leading-snug"
                      >
                        • {o.shortName || o.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Nhánh 2: Cơ quan Đại diện các khu vực */}
              <div className="bg-slate-50 border border-slate-300 rounded-xs p-4 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <Compass className="w-4 h-4 text-blue-700" />
                    <h4 className="font-bold text-xs uppercase text-blue-800 font-serif">
                      VP Đại Diện Khu Vực (04)
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Thường trực theo dõi địa bàn vùng Bắc - Trung - Nam - Tây Nguyên.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
                    {MOCK_ORGANIZATIONS.filter((o) => o.unitType === "REP_OFFICE").map((o) => (
                      <li
                        key={o.id}
                        onClick={() => setSelectedOrgForModal(o)}
                        className="p-1.5 bg-white rounded-xs border border-slate-200 hover:border-blue-400 hover:text-blue-800 cursor-pointer transition-colors text-[11.5px] font-medium leading-snug"
                      >
                        • {o.shortName || o.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Nhánh 3: Hệ thống Liên Chi hội & Chi hội */}
              <div className="bg-slate-50 border border-slate-300 rounded-xs p-4 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <Globe className="w-4 h-4 text-amber-700" />
                    <h4 className="font-bold text-xs uppercase text-amber-800 font-serif">
                      Chi Hội 63 Tỉnh Thành (14+)
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Mạng lưới tổ chức cơ sở trực thuộc gắn liền với nhân dân địa phương.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-1 max-h-56 overflow-y-auto scrollbar-thin">
                    {MOCK_ORGANIZATIONS.filter(
                      (o) => o.unitType === "BRANCH" || o.unitType === "UNION_BRANCH"
                    ).map((o) => (
                      <li
                        key={o.id}
                        onClick={() => setSelectedOrgForModal(o)}
                        className="p-1.5 bg-white rounded-xs border border-slate-200 hover:border-amber-400 hover:text-amber-800 cursor-pointer transition-colors text-[11.5px] font-medium leading-snug"
                      >
                        • {o.shortName || o.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Nhánh 4: Viện & Doanh nghiệp KH&CN */}
              <div className="bg-slate-50 border border-slate-300 rounded-xs p-4 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <Layers className="w-4 h-4 text-emerald-700" />
                    <h4 className="font-bold text-xs uppercase text-emerald-800 font-serif">
                      Viện & Doanh Nghiệp (09)
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Các đơn vị sự nghiệp khoa học công nghệ, trung tâm và pháp nhân trực thuộc.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-700 pt-1 max-h-56 overflow-y-auto scrollbar-thin">
                    {MOCK_ORGANIZATIONS.filter(
                      (o) =>
                        o.unitType === "INSTITUTE" ||
                        o.unitType === "CENTER" ||
                        o.unitType === "ENTERPRISE"
                    ).map((o) => (
                      <li
                        key={o.id}
                        onClick={() => setSelectedOrgForModal(o)}
                        className="p-1.5 bg-white rounded-xs border border-slate-200 hover:border-emerald-400 hover:text-emerald-800 cursor-pointer transition-colors text-[11.5px] font-medium leading-snug"
                      >
                        • {o.shortName || o.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* THÔNG BÁO KHÔNG CÓ KẾT QUẢ */}
      {filtered.length === 0 && (
        <div className="p-12 text-center bg-white border border-slate-300 rounded-xs text-slate-500 text-xs space-y-2">
          <p className="font-bold text-slate-700">Không tìm thấy đơn vị nào phù hợp với bộ lọc hiện tại.</p>
          <p>Vui lòng thử tìm với từ khóa khác hoặc bấm nút đặt lại bộ lọc bên dưới.</p>
          <button
            onClick={() => {
              setSelectedType("ALL");
              setSelectedRegion("ALL");
              setSearchTerm("");
            }}
            className="px-3.5 py-1.5 bg-[#991b1b] text-white rounded-xs font-bold text-xs shadow-xs"
          >
            Xem Tất Cả 34 Đơn Vị
          </button>
        </div>
      )}

      {/* 6. MODAL TRÍCH LỤC CHI TIẾT HỒ SƠ TỔ CHỨC (ORGANIZATION DOSSIER MODAL) */}
      {selectedOrgForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 font-gov overflow-y-auto">
          <div className="bg-white rounded-xs border border-slate-300 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header Modal */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex justify-between items-start gap-3 border-b-2 border-[#991b1b]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[9.5px] font-bold uppercase px-2 py-0.5 rounded-xs tracking-wider ${
                      getUnitTypeConfig(selectedOrgForModal.unitType).badgeColor
                    }`}
                  >
                    {getUnitTypeConfig(selectedOrgForModal.unitType).label}
                  </span>
                  <span className="font-mono text-xs text-amber-400 font-bold">
                    {selectedOrgForModal.code}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-serif text-white leading-snug">
                  {selectedOrgForModal.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrgForModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-xs transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nội dung chi tiết hồ sơ */}
            <div className="p-5 sm:p-6 space-y-5 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
              {/* Khối Căn cứ pháp lý */}
              <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xs space-y-2">
                <span className="font-bold text-[#991b1b] uppercase text-[11px] block tracking-wider">
                  1. Căn Cứ Pháp Lý & Thẩm Quyền Thành Lập
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Văn bản phê duyệt:</span>
                    <strong className="text-slate-900 font-mono">
                      {selectedOrgForModal.decisionNumber}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Ngày ký ban hành:</span>
                    <span className="font-mono text-slate-800">
                      {selectedOrgForModal.decisionDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Tư cách pháp nhân:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> Hợp lệ theo Điều lệ Hội
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Thẩm quyền ra quyết định:</span>
                    <span className="text-slate-800">Ban Thường vụ Trung ương Hội</span>
                  </div>
                </div>
              </div>

              {/* Khối Người đứng đầu */}
              <div className="border border-slate-200 p-3.5 rounded-xs space-y-2">
                <span className="font-bold text-slate-900 uppercase text-[11px] block tracking-wider">
                  2. Lãnh Đạo Phụ Trách Đơn Vị
                </span>
                {(() => {
                  const leader = selectedOrgForModal.leaderId
                    ? leadersMap.get(selectedOrgForModal.leaderId)
                    : null;
                  return leader ? (
                    <div className="flex items-start gap-3 pt-1">
                      {leader.avatarUrl ? (
                        <img
                          src={leader.avatarUrl}
                          alt={leader.fullName}
                          className="w-12 h-12 rounded-full object-cover border-2 border-red-800 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-red-100 text-[#991b1b] flex items-center justify-center font-bold text-sm shrink-0">
                          {leader.fullName.charAt(0)}
                        </div>
                      )}
                      <div className="space-y-0.5">
                        <strong className="text-slate-900 text-sm font-serif block">
                          {leader.fullName}
                        </strong>
                        <p className="text-[#991b1b] font-bold text-xs">{leader.position}</p>
                        {leader.academicTitle && (
                          <p className="text-[11px] text-slate-500">{leader.academicTitle}</p>
                        )}
                        <p className="text-[11px] text-slate-600 font-mono pt-1">
                          SĐT: {leader.phone} • Email: {leader.email}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-slate-500 italic">Đang cập nhật nhân sự phụ trách.</p>
                  );
                })()}
              </div>

              {/* Khối Địa chỉ và Liên hệ */}
              <div className="border border-slate-200 p-3.5 rounded-xs space-y-2">
                <span className="font-bold text-slate-900 uppercase text-[11px] block tracking-wider">
                  3. Trụ Sở Chính & Thông Tin Liên Hệ
                </span>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#991b1b] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block text-[11px]">Trụ sở chính thức:</span>
                      <span className="text-slate-900 font-medium leading-relaxed">
                        {selectedOrgForModal.address}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <div>
                        <span className="text-slate-500 block text-[10px]">Đường dây nóng:</span>
                        <strong className="text-slate-900 font-mono">
                          {selectedOrgForModal.phone}
                        </strong>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <div>
                        <span className="text-slate-500 block text-[10px]">Hòm thư điện tử:</span>
                        <span className="text-slate-800 font-mono truncate block">
                          {selectedOrgForModal.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedOrgForModal.website && (
                    <div className="pt-1">
                      <a
                        href={selectedOrgForModal.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                      >
                        <Globe className="w-3.5 h-3.5" /> {selectedOrgForModal.website}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Khối Chế độ nộp báo cáo định kỳ */}
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xs text-xs space-y-1.5 text-amber-900">
                <span className="font-bold uppercase text-[11px] block tracking-wider">
                  4. Chế Độ Báo Cáo Định Kỳ Của Đơn Vị
                </span>
                <p className="text-[11.5px] leading-relaxed">
                  Căn cứ quy chế hoạt động của Trung ương Hội, đơn vị có nghĩa vụ nộp báo cáo tình hình hoạt động định kỳ
                  (quý, năm hoặc đột xuất) qua Cổng Điều Hành Nội Bộ Trung ương Hội.
                </p>
              </div>
            </div>

            {/* Chân Modal */}
            <div className="bg-slate-50 border-t border-slate-200 p-4 flex flex-wrap justify-between items-center gap-2">
              <button
                onClick={() => handleCopyInfo(selectedOrgForModal)}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xs font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                {copiedId === selectedOrgForModal.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Đã Sao Chép!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Sao Chép Hồ Sơ</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3.5 py-1.5 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs font-bold text-xs shadow-2xs transition-colors flex items-center gap-1"
                >
                  <span>Cổng Báo Cáo</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
                <button
                  onClick={() => setSelectedOrgForModal(null)}
                  className="px-3.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xs font-bold text-xs transition-colors"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function OrganizationsDirectoryPage() {
  return (
    <>
      <PublicHeader />
      <Suspense
        fallback={
          <div className="p-16 text-center text-xs text-slate-500 font-gov">
            Đang tải dữ liệu danh bạ mạng lưới tổ chức...
          </div>
        }
      >
        <OrganizationsDirectoryContent />
      </Suspense>
      <PublicFooter />
    </>
  );
}

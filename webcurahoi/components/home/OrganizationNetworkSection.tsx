"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Globe,
  FileText,
  Layers,
  Award,
  Sparkles,
  Compass,
} from "lucide-react";

export default function OrganizationNetworkSection() {
  const [activeCategory, setActiveCategory] = useState<"CENTRAL" | "REGIONAL_REP" | "INSTITUTE" | "LOCAL_BRANCH">("CENTRAL");

  // Danh mục lọc đơn vị
  const centralUnits = MOCK_ORGANIZATIONS.filter(
    (o) => o.unitType === "CENTRAL_OFFICE" || o.unitType === "SPECIALIZED_BOARD"
  );
  const regionalRepUnits = MOCK_ORGANIZATIONS.filter((o) => o.unitType === "REP_OFFICE");
  const instituteUnits = MOCK_ORGANIZATIONS.filter(
    (o) => o.unitType === "INSTITUTE" || o.unitType === "CENTER"
  );
  const localBranchUnits = MOCK_ORGANIZATIONS.filter(
    (o) => o.unitType === "BRANCH" || o.unitType === "UNION_BRANCH"
  );

  // Danh sách đơn vị đang hiển thị theo category
  const currentUnits =
    activeCategory === "CENTRAL"
      ? centralUnits
      : activeCategory === "REGIONAL_REP"
      ? regionalRepUnits
      : activeCategory === "INSTITUTE"
      ? instituteUnits
      : localBranchUnits;

  // Đơn vị được chọn để xem chi tiết bên thẻ Spotlight trái
  const [selectedUnitId, setSelectedUnitId] = useState<string>(() => {
    return centralUnits[0]?.id || MOCK_ORGANIZATIONS[0].id;
  });

  const selectedUnit =
    MOCK_ORGANIZATIONS.find((o) => o.id === selectedUnitId) || currentUnits[0] || MOCK_ORGANIZATIONS[0];

  const handleCategoryChange = (cat: "CENTRAL" | "REGIONAL_REP" | "INSTITUTE" | "LOCAL_BRANCH") => {
    setActiveCategory(cat);
    const firstOfCat =
      cat === "CENTRAL"
        ? centralUnits[0]
        : cat === "REGIONAL_REP"
        ? regionalRepUnits[0]
        : cat === "INSTITUTE"
        ? instituteUnits[0]
        : localBranchUnits[0];
    if (firstOfCat) {
      setSelectedUnitId(firstOfCat.id);
    }
  };

  const getUnitTypeBadge = (type: string) => {
    switch (type) {
      case "CENTRAL_OFFICE":
        return { label: "Cơ Quan Trung Ương", color: "bg-red-700 text-white" };
      case "SPECIALIZED_BOARD":
        return { label: "Ban Chuyên Môn", color: "bg-amber-600 text-white" };
      case "REP_OFFICE":
        return { label: "Cơ Quan Đại Diện Vùng", color: "bg-blue-700 text-white" };
      case "INSTITUTE":
        return { label: "Viện Nghiên Cứu", color: "bg-emerald-700 text-white" };
      case "CENTER":
        return { label: "Trung Tâm Ứng Dụng", color: "bg-teal-700 text-white" };
      case "UNION_BRANCH":
        return { label: "Liên Chi Hội Tỉnh", color: "bg-indigo-700 text-white" };
      case "BRANCH":
        return { label: "Chi Hội Cơ Sở", color: "bg-slate-700 text-white" };
      default:
        return { label: "Đơn Vị Trực Thuộc", color: "bg-slate-800 text-white" };
    }
  };

  const selectedBadge = getUnitTypeBadge(selectedUnit.unitType);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12 space-y-6 font-gov">
      {/* 1. TIÊU ĐỀ KHỐI VÀ CHỈ SỐ MẠNG LƯỚI QUỐC GIA */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b-2 border-[#991b1b] pb-2.5 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#991b1b] rounded-full inline-block" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#991b1b]">
                Cơ Cấu Bộ Máy & Mạng Lưới Điều Hành
              </span>
            </div>
            <h2 className="text-base sm:text-xl font-bold text-slate-900 font-serif mt-0.5">
              HỆ THỐNG CÁC ĐƠN VỊ TRỰC THUỘC & CƠ QUAN ĐẠI DIỆN TOÀN QUỐC
            </h2>
          </div>

          <Link
            href="/he-thong-to-chuc"
            className="text-xs font-bold text-[#991b1b] hover:underline flex items-center gap-1 shrink-0"
          >
            Toàn bộ danh bạ 34+ đơn vị &raquo;
          </Link>
        </div>

        {/* Dải 4 chỉ số thống kê mạng lưới quốc gia */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
          <div className="bg-white border border-slate-300 p-2.5 sm:p-3.5 rounded-xs flex items-center gap-2 sm:gap-3 shadow-2xs">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xs bg-red-50 border border-red-200 text-[#991b1b] flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block leading-tight">
                34+
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight block truncate">
                Đơn vị & Chi hội
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-300 p-2.5 sm:p-3.5 rounded-xs flex items-center gap-2 sm:gap-3 shadow-2xs">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xs bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block leading-tight">
                05
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight block truncate">
                Đại diện vùng
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-300 p-2.5 sm:p-3.5 rounded-xs flex items-center gap-2 sm:gap-3 shadow-2xs">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xs bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block leading-tight">
                08
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight block truncate">
                Viện & Trung tâm
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-300 p-2.5 sm:p-3.5 rounded-xs flex items-center gap-2 sm:gap-3 shadow-2xs">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xs bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
              <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <span className="text-base sm:text-lg font-black text-slate-900 font-mono block leading-tight">
                63
              </span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight block truncate">
                Tỉnh thành
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. BỐ CỤC TỔ HỢP 2 CỘT TƯƠNG TÁC (SPOTLIGHT CARD 40% & DIRECTORY LIST 60%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* CỘT TRÁI (40%): THẺ TIÊU ĐIỂM ĐƠN VỊ ĐƯỢC CHỌN (SPOTLIGHT CARD) */}
        <div className="lg:col-span-5 bg-[#0f172a] text-white rounded-xs border border-slate-800 shadow-md p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden">
          {/* Viền đỏ trên cùng */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#991b1b] via-[#dc2626] to-[#b45309]" />

          <div className="space-y-4">
            <div className="flex justify-between items-start gap-2">
              <span
                className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-xs tracking-wider shadow-2xs ${selectedBadge.color}`}
              >
                {selectedBadge.label}
              </span>
              <span className="font-mono text-slate-400 text-xs font-semibold">
                {selectedUnit.code}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-amber-400 font-mono uppercase block">
                HỒ SƠ TỔ CHỨC CƠ SỞ
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-white leading-snug">
                {selectedUnit.name}
              </h3>
            </div>

            {/* Chi tiết liên hệ hành chính */}
            <div className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-slate-800/80 font-gov">
              <div className="flex items-start gap-2.5">
                <FileText className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Căn cứ thành lập & Quyết định:</span>
                  <span className="font-semibold text-white">{selectedUnit.decisionNumber}</span>
                  {selectedUnit.decisionDate && (
                    <span className="text-slate-400 text-[11px] block"> (Ban hành: {selectedUnit.decisionDate})</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ef4444] shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Trụ sở chính thức:</span>
                  <span className="leading-relaxed">{selectedUnit.address}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Đường dây nóng:</span>
                    <strong className="text-white font-mono">{selectedUnit.phone}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Thư điện tử:</span>
                    <span className="text-slate-200 text-[11px] truncate block max-w-[130px]">{selectedUnit.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chân thẻ tiêu điểm */}
          <div className="pt-5 mt-6 border-t border-slate-800 flex justify-between items-center text-xs">
            <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Tư cách pháp nhân hợp lệ
            </span>

            <Link
              href={`/he-thong-to-chuc?type=${selectedUnit.unitType}`}
              className="text-amber-400 hover:text-amber-300 font-bold text-xs inline-flex items-center gap-1"
            >
              Xem chi tiết hồ sơ &raquo;
            </Link>
          </div>
        </div>

        {/* CỘT PHẢI (60%): BỘ DANH BẠ TƯƠNG TÁC PHÂN NHÓM (INTERACTIVE CLUSTER DIRECTORY) */}
        <div className="lg:col-span-7 bg-white border border-slate-300 rounded-xs shadow-xs flex flex-col justify-between overflow-hidden">
          {/* Thanh Tab chọn nhóm đơn vị */}
          <div className="grid grid-cols-2 sm:grid-cols-4 border-b border-slate-300 bg-[#f8fafc] text-xs font-bold divide-x divide-slate-200">
            <button
              onClick={() => handleCategoryChange("CENTRAL")}
              className={`p-3 text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                activeCategory === "CENTRAL"
                  ? "bg-white text-[#991b1b] border-b-2 border-[#991b1b] shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Building2 className="w-4 h-4 text-[#991b1b]" />
              <span>Cơ Quan & Ban</span>
            </button>

            <button
              onClick={() => handleCategoryChange("REGIONAL_REP")}
              className={`p-3 text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                activeCategory === "REGIONAL_REP"
                  ? "bg-white text-[#991b1b] border-b-2 border-[#991b1b] shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Compass className="w-4 h-4 text-blue-700" />
              <span>VP Đại Diện Miền</span>
            </button>

            <button
              onClick={() => handleCategoryChange("INSTITUTE")}
              className={`p-3 text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                activeCategory === "INSTITUTE"
                  ? "bg-white text-[#991b1b] border-b-2 border-[#991b1b] shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Viện & Trung Tâm</span>
            </button>

            <button
              onClick={() => handleCategoryChange("LOCAL_BRANCH")}
              className={`p-3 text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                activeCategory === "LOCAL_BRANCH"
                  ? "bg-white text-[#991b1b] border-b-2 border-[#991b1b] shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Globe className="w-4 h-4 text-amber-700" />
              <span>Chi Hội 63 Tỉnh</span>
            </button>
          </div>

          {/* Danh sách các đơn vị trong nhóm (dạng hàng thông minh, bấm để đổi thẻ tiêu điểm bên trái) */}
          <div className="p-3 divide-y divide-slate-100 flex-1 space-y-1">
            {currentUnits.slice(0, 5).map((org) => {
              const isSelected = org.id === selectedUnit.id;
              const badge = getUnitTypeBadge(org.unitType);

              return (
                <div
                  key={org.id}
                  onClick={() => setSelectedUnitId(org.id)}
                  className={`p-3 rounded-xs cursor-pointer transition-all flex items-center justify-between gap-3 group ${
                    isSelected
                      ? "bg-red-50/80 border border-red-200 shadow-2xs"
                      : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9.5px] font-bold px-1.5 py-0.2 rounded-xs uppercase ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span className="font-mono text-[10px] text-slate-400 font-semibold truncate">
                        {org.code}
                      </span>
                    </div>

                    <h4
                      className={`text-xs sm:text-[13px] font-bold font-serif leading-snug truncate transition-colors ${
                        isSelected ? "text-[#991b1b]" : "text-slate-900 group-hover:text-[#991b1b]"
                      }`}
                    >
                      {org.name}
                    </h4>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-[11px] text-slate-500 font-gov">
                      <span className="flex items-center gap-1 truncate max-w-[260px]">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" /> {org.address}
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[#991b1b] font-semibold">
                        <Phone className="w-3 h-3 text-slate-400 shrink-0" /> {org.phone}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-1 text-slate-400 group-hover:text-[#991b1b] transition-colors">
                    <span className="text-[10px] font-bold hidden sm:inline">
                      {isSelected ? "Đang xem" : "Xem nhanh"}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? "text-[#991b1b] translate-x-0.5" : ""
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dải chân điều hướng toàn quốc */}
          <div className="bg-[#f8fafc] border-t border-slate-200 p-3 px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
            <span className="text-slate-500 text-[11px]">
              Hiển thị đơn vị tiêu biểu thuộc {currentUnits.length} đơn vị trong phân nhóm
            </span>

            <Link
              href="/he-thong-to-chuc"
              className="inline-flex items-center gap-1 font-bold text-[#991b1b] hover:underline text-xs"
            >
              <span>Xem toàn bộ danh bạ mạng lưới toàn quốc ({MOCK_ORGANIZATIONS.length} đơn vị)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

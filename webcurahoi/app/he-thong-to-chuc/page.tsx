"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data";
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
  ShieldCheck,
} from "lucide-react";

function OrganizationsDirectoryContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [selectedType, setSelectedType] = useState(() => typeParam || "ALL");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (typeParam) {
      setSelectedType(typeParam);
    } else {
      setSelectedType("ALL");
    }
  }, [typeParam]);

  const types = [
    { id: "ALL", name: "Tất cả đơn vị" },
    { id: "CENTRAL_OFFICE", name: "Cơ quan Trung ương & Các ban" },
    { id: "BRANCH", name: "Hệ thống Chi hội tỉnh thành" },
    { id: "INSTITUTE", name: "Viện & Trung tâm trực thuộc" },
    { id: "ENTERPRISE", name: "Đơn vị thành viên & Doanh nghiệp" },
  ];

  const filtered = MOCK_ORGANIZATIONS.filter((org) => {
    let matchType = false;
    if (selectedType === "ALL") {
      matchType = true;
    } else if (selectedType === "CENTRAL_OFFICE") {
      matchType = org.unitType === "CENTRAL_OFFICE" || org.unitType === "SPECIALIZED_BOARD";
    } else if (selectedType === "BRANCH") {
      matchType = org.unitType === "BRANCH" || org.unitType === "UNION_BRANCH";
    } else if (selectedType === "INSTITUTE") {
      matchType = org.unitType === "INSTITUTE" || org.unitType === "CENTER";
    } else if (selectedType === "ENTERPRISE") {
      matchType = org.unitType === "ENTERPRISE" || org.unitType === "REP_OFFICE";
    } else {
      matchType = org.unitType === selectedType;
    }

    const matchSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (org.provinceCity && org.provinceCity.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 flex-1 space-y-8 font-gov">
      <div>
        <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider block">
          Mảng III: Quản Trị Hệ Thống Tổ Chức Của Hội
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif">
          DANH BẠ MẠNG LƯỚI HỆ THỐNG TỔ CHỨC
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Cơ sở dữ liệu cập nhật về Cơ quan Trung ương Hội, các Ban chuyên môn, Liên Chi hội, Chi hội 63 tỉnh thành, Viện nghiên cứu và Doanh nghiệp thành viên.
        </p>
      </div>

      {/* Khối Quy định Văn bản thành lập/giải thể */}
      <div className="bg-slate-50 border border-slate-300 rounded-xs p-5 text-xs text-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <span className="font-bold text-[#991b1b] flex items-center gap-1.5 text-sm">
            <ShieldCheck className="w-4 h-4 text-[#991b1b]" /> Quy chế về thành lập, giải thể và quản lý đơn vị trực thuộc
          </span>
          <p className="text-slate-600">
            Quy chuẩn hồ sơ, thẩm quyền phê duyệt của Ban Thường vụ Trung ương Hội đối với Chi hội, Liên Chi hội, Ban chuyên môn và Đơn vị pháp nhân trực thuộc.
          </p>
        </div>
        <Link
          href="/van-ban"
          className="px-4 py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs font-bold shrink-0 shadow-xs transition-colors"
        >
          Xem Kho Văn Bản Chỉ Đạo
        </Link>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white p-3 sm:p-4 rounded-xs border border-slate-300 shadow-xs text-xs">
        <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 sm:flex-wrap sm:pb-0">
          {types.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-3 py-1.5 rounded-xs font-bold shrink-0 transition-all ${
                selectedType === t.id
                  ? "bg-[#991b1b] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64 shrink-0">
          <input
            type="text"
            placeholder="Tìm theo tên hoặc mã đơn vị..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-xs focus:outline-none focus:ring-1 focus:ring-red-600 text-xs font-gov"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
        </div>
      </div>

      {/* Organizations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((org) => (
          <div
            key={org.id}
            className="bg-white border border-slate-300 rounded-xs shadow-xs hover:border-red-400 transition-colors p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded-xs bg-slate-100 text-slate-800 text-[10px] font-bold border border-slate-200 uppercase">
                  {org.unitType}
                </span>
                <span className="font-mono text-xs text-slate-400 font-semibold">{org.code}</span>
              </div>

              <h3 className="font-bold text-base text-slate-900 leading-snug font-serif">
                {org.name}
              </h3>

              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{org.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{org.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{org.email}</span>
                </p>
                <p className="flex items-center gap-2 pt-1 font-mono text-[11px] text-[#991b1b]">
                  <FileText className="w-3.5 h-3.5" /> Quyết định: {org.decisionNumber} ({org.decisionDate})
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                <CheckCircle className="w-3.5 h-3.5" /> Pháp nhân hợp lệ
              </span>
              <Link
                href="/login"
                className="text-[#991b1b] font-bold hover:underline flex items-center gap-0.5"
              >
                Cổng Báo Cáo &raquo;
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-8 text-center bg-white border border-slate-300 rounded-xs text-slate-500 text-xs">
          Không tìm thấy đơn vị nào phù hợp với bộ lọc hiện tại.
        </div>
      )}
    </main>
  );
}

export default function OrganizationsDirectoryPage() {
  return (
    <>
      <PublicHeader />
      <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500 font-gov">Đang tải danh bạ tổ chức...</div>}>
        <OrganizationsDirectoryContent />
      </Suspense>
      <PublicFooter />
    </>
  );
}

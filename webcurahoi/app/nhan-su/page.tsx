"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { MOCK_LEADERSHIP } from "@/lib/mock-data";
import {
  Users,
  ShieldCheck,
  UserCheck,
  Award,
  Search,
  Filter,
  ArrowRight,
  FileText,
} from "lucide-react";

function PersonnelContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");

  const [roleFilter, setRoleFilter] = useState<"ALL" | "BTV" | "BCH">(() => {
    if (roleParam === "BCH") return "BCH";
    if (roleParam === "BTV") return "BTV";
    return "ALL";
  });

  useEffect(() => {
    if (roleParam === "BCH") setRoleFilter("BCH");
    else if (roleParam === "BTV") setRoleFilter("BTV");
    else setRoleFilter("ALL");
  }, [roleParam]);

  const [searchTerm, setSearchTerm] = useState("");

  const filtered = MOCK_LEADERSHIP.filter((p) => {
    let matchRole = true;
    if (roleFilter === "BTV") matchRole = p.isBtv;
    if (roleFilter === "BCH") matchRole = p.isBch;

    const matchSearch =
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.academicTitle && p.academicTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchRole && matchSearch;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 flex-1 space-y-8 font-gov">
      <div>
        <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider block">
          Mảng IV: Quản Trị Nhân Sự Của Hội
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif">
          DANH SÁCH BAN CHẤP HÀNH VÀ BAN THƯỜNG VỤ TRUNG ƯƠNG HỘI
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Cơ sở dữ liệu cập nhật về đội ngũ lãnh đạo chủ chốt, Ban Chấp hành Trung ương Hội nhiệm kỳ IV (2021 - 2026).
        </p>
      </div>

      {/* Khối Quy định kết nạp & Bổ nhiệm */}
      <div className="bg-slate-50 border border-slate-300 rounded-xs p-5 text-xs text-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <span className="font-bold text-[#991b1b] flex items-center gap-1.5 text-sm">
            <Award className="w-4 h-4 text-[#991b1b]" /> Quy chế về kết nạp hội viên và kiện toàn nhân sự lãnh đạo
          </span>
          <p className="text-slate-600">
            Quy chuẩn kết nạp hội viên cá nhân, tập thể; quy chế bầu cử Ban Chấp hành chi hội và bổ nhiệm lãnh đạo các đơn vị trực thuộc.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link
            href="/dang-ky-hoi-vien"
            className="px-4 py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs font-bold shadow-xs transition-colors"
          >
            Đăng Ký Gia Nhập Hội Viên
          </Link>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 border-b border-slate-300 pb-2 text-xs">
        <div className="flex gap-4 font-bold overflow-x-auto whitespace-nowrap scrollbar-none pb-1 w-full sm:w-auto">
          <button
            onClick={() => setRoleFilter("ALL")}
            className={`pb-2 flex items-center gap-1.5 border-b-2 shrink-0 transition-all ${
              roleFilter === "ALL"
                ? "border-[#991b1b] text-[#991b1b]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="w-4 h-4" /> Tất Cả Lãnh Đạo
          </button>
          <button
            onClick={() => setRoleFilter("BTV")}
            className={`pb-2 flex items-center gap-1.5 border-b-2 shrink-0 transition-all ${
              roleFilter === "BTV"
                ? "border-[#991b1b] text-[#991b1b]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Award className="w-4 h-4" /> Ban Thường Vụ Trung Ương
          </button>
          <button
            onClick={() => setRoleFilter("BCH")}
            className={`pb-2 flex items-center gap-1.5 border-b-2 shrink-0 transition-all ${
              roleFilter === "BCH"
                ? "border-[#991b1b] text-[#991b1b]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="w-4 h-4" /> Ban Chấp Hành Trung Ương
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Tìm theo họ tên, chức vụ, tỉnh thành..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-xs focus:outline-none focus:ring-1 focus:ring-red-600 text-xs font-gov"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
        </div>
      </div>

      {/* Personnel Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((person) => (
          <div
            key={person.id}
            className="bg-white border border-slate-300 rounded-xs shadow-xs hover:border-red-400 transition-colors p-6 text-center space-y-4"
          >
            <img
              src={person.avatarUrl}
              alt={person.fullName}
              className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-[#991b1b] shadow-sm"
            />
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-900 font-serif">{person.fullName}</h3>
              <p className="text-xs font-bold text-[#991b1b]">{person.position}</p>
              <p className="text-[11px] text-slate-500">{person.academicTitle}</p>
            </div>

            <div className="text-xs text-slate-600 pt-3 border-t border-slate-100 space-y-1 text-left bg-slate-50 p-3 rounded-xs font-gov">
              <p><strong>Ngày sinh:</strong> {person.dob}</p>
              <p><strong>Điện thoại:</strong> {person.phone}</p>
              <p><strong>Thư điện tử:</strong> {person.email}</p>
              <p><strong>Ngày gia nhập Hội:</strong> {person.joinDate}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function PersonnelPage() {
  return (
    <>
      <PublicHeader />
      <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500 font-gov">Đang tải danh sách nhân sự...</div>}>
        <PersonnelContent />
      </Suspense>
      <PublicFooter />
    </>
  );
}

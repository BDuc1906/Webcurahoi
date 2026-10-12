"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  FileText,
  Download,
  Search,
  Filter,
  AlertCircle,
  Building2,
  User,
  Receipt,
} from "lucide-react";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";
import { financeApi, FeeScheduleItem } from "@/lib/api-client";

const FALLBACK_SCHEDULES: FeeScheduleItem[] = [
  {
    code: "HP-TAPTHE",
    name: "Hội phí hội viên tập thể / đơn vị pháp nhân",
    category: "ANNUAL_MEMBERSHIP_FEE",
    targetGroup: "ORGANIZATION",
    minAmount: 2000000,
    maxAmount: 5000000,
    note: "Doanh nghiệp, bệnh viện, viện nghiên cứu, phòng khám thành viên. Mức thu tùy quy mô.",
  },
  {
    code: "HP-CANHAN",
    name: "Hội phí hội viên cá nhân",
    category: "ANNUAL_MEMBERSHIP_FEE",
    targetGroup: "INDIVIDUAL",
    minAmount: 200000,
    maxAmount: 500000,
    note: "Bác sĩ, dược sĩ, y sĩ, lương y, cán bộ y tế cộng đồng. Miễn giảm cho sinh viên y khoa, hội viên cao tuổi, hoàn cảnh khó khăn.",
  },
  {
    code: "TL-VIEN-TT",
    name: "Phí thẩm định, cấp quyết định thành lập Viện, Trung tâm",
    category: "ESTABLISHMENT_FEE",
    minAmount: null,
    maxAmount: null,
    note: "Cập nhật theo quyết định của Trung ương Hội.",
  },
  {
    code: "TL-CHIHOI",
    name: "Phí thành lập Liên Chi hội, Chi hội, Ban chuyên môn",
    category: "ESTABLISHMENT_FEE",
    minAmount: null,
    maxAmount: null,
    note: "Cập nhật theo quyết định của Trung ương Hội.",
  },
  {
    code: "TL-DONVI-VPDD",
    name: "Phí thẩm định hồ sơ đơn vị thành viên, văn phòng đại diện",
    category: "ESTABLISHMENT_FEE",
    minAmount: null,
    maxAmount: null,
    note: "Cập nhật theo quyết định của Trung ương Hội.",
  },
];

function formatVnd(n: number | null): string {
  if (n == null) return "Theo QĐ Trung ương Hội";
  return new Intl.NumberFormat("vi-VN").format(n) + " đ";
}

function formatRange(min: number | null, max: number | null): string {
  if (min == null && max == null) return "Đang cập nhật";
  if (min != null && max != null && min !== max) {
    return `${formatVnd(min)} – ${formatVnd(max)}`;
  }
  return formatVnd(min ?? max);
}

export default function FeeScheduleTab() {
  const [schedules, setSchedules] = useState<FeeScheduleItem[]>(FALLBACK_SCHEDULES);
  const [documents, setDocuments] = useState<any[]>(MOCK_DOCUMENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<
    "ALL" | "ANNUAL_MEMBERSHIP_FEE" | "ESTABLISHMENT_FEE"
  >("ALL");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [s, d] = await Promise.all([
        financeApi.feeSchedules(),
        financeApi.documents(),
      ]);
      if (!cancelled && s && s.length > 0) setSchedules(s);
      if (!cancelled && d && d.length > 0) {
        setDocuments(
          d.map((x) => ({
            id: x.id,
            code: x.code ?? "",
            title: x.title,
            documentType: x.docType ?? "REGULATION",
            issuedDate: x.issuedDate ?? "",
            fileUrl: x.fileUrl ?? "#",
          }))
        );
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredSchedules = useMemo(() => {
    return schedules.filter((s) => {
      const matchCat = categoryFilter === "ALL" || s.category === categoryFilter;
      const q = searchTerm.trim().toLowerCase();
      const matchSearch =
        q === "" ||
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [schedules, categoryFilter, searchTerm]);

  return (
    <div className="space-y-12">
      {/* 1. BIỂU MỨC PHÍ */}
      <section className="space-y-4">
        <div className="border-b-2 border-[#991b1b] pb-2 flex flex-col sm:flex-row justify-between sm:items-end gap-2">
          <div>
            <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider block">
              Trụ Cột 1 — Đáp ứng Mục 1 Nghiệp Vụ Mảng V
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
              BIỂU MỨC PHÍ THÀNH LẬP & HỘI PHÍ NIÊN LIỄM
            </h2>
          </div>
          <span className="text-xs text-slate-500">Nhiệm kỳ 2021 – 2026</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center bg-white p-3 rounded-xs border border-slate-300 text-xs">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm theo tên hoặc mã biểu phí..."
              className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-xs focus:outline-none focus:ring-1 focus:ring-red-600"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value as any)}
              className="border border-slate-300 rounded-xs px-3 py-2 bg-white text-slate-700 focus:outline-none"
            >
              <option value="ALL">Tất cả loại phí</option>
              <option value="ANNUAL_MEMBERSHIP_FEE">Hội phí niên liễm</option>
              <option value="ESTABLISHMENT_FEE">Phí thành lập đơn vị</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto border border-slate-300 rounded-xs bg-white">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead className="bg-[#f8fafc] text-slate-800 font-bold border-b border-slate-300 uppercase text-[10.5px] tracking-wider">
              <tr>
                <th className="py-2.5 px-3 w-32">Mã</th>
                <th className="py-2.5 px-3">Tên loại phí / hội phí</th>
                <th className="py-2.5 px-3 w-40">Đối tượng</th>
                <th className="py-2.5 px-3 w-60 text-right">Định mức</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredSchedules.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500">
                    Không có biểu phí nào phù hợp bộ lọc.
                  </td>
                </tr>
              )}
              {filteredSchedules.map((s) => (
                <tr key={s.code} className="hover:bg-slate-50">
                  <td className="py-3 px-3 font-mono font-bold text-[#991b1b] whitespace-nowrap">
                    {s.code}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 font-serif">
                      {s.name}
                    </div>
                    {s.note && (
                      <div className="text-[11px] text-slate-500 italic mt-0.5 leading-snug">
                        {s.note}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    {s.targetGroup === "ORGANIZATION" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                        <Building2 className="w-3 h-3" /> Tập thể
                      </span>
                    ) : s.targetGroup === "INDIVIDUAL" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <User className="w-3 h-3" /> Cá nhân
                      </span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                    {s.category === "ESTABLISHMENT_FEE"
                      ? formatVnd(s.minAmount ?? s.maxAmount)
                      : formatRange(s.minAmount, s.maxAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded-xs p-3 text-[11px] text-amber-900 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            Mức thu nêu trên được quy định tại Nghị quyết Ban Chấp hành Trung ương Hội
            nhiệm kỳ 2021 – 2026. Chính sách miễn giảm áp dụng cho sinh viên y khoa,
            hội viên cao tuổi và hoàn cảnh đặc biệt khó khăn.
          </span>
        </div>
      </section>

      {/* 2. KHO VĂN BẢN */}
      <section className="space-y-4">
        <div className="border-b-2 border-slate-800 pb-2">
          <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider block">
            Kho Văn Bản Pháp Quy Chính Thức
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
            QUY CHẾ & NGHỊ QUYẾT VỀ QUẢN LÝ TÀI CHÍNH
          </h2>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 bg-white rounded-xs border border-slate-300 flex flex-col sm:flex-row justify-between sm:items-center gap-3 hover:border-red-400 transition-colors"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xs bg-red-50 border border-red-200 text-[#991b1b] flex items-center justify-center shrink-0">
                  <Receipt className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  {doc.code && (
                    <span className="font-mono text-[11px] font-bold text-[#991b1b] block">
                      Số: {doc.code}
                    </span>
                  )}
                  <h4 className="font-bold text-sm text-slate-900 font-serif leading-snug">
                    {doc.title}
                  </h4>
                  {doc.issuedDate && (
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                      Ngày ban hành: {doc.issuedDate}
                    </p>
                  )}
                </div>
              </div>
              <a
                href={doc.fileUrl || "#"}
                className="shrink-0 self-start sm:self-auto px-3 py-1.5 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> Tải PDF
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
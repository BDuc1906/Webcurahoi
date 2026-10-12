"use client";

import React from "react";
import Link from "next/link";
import {
  Building2,
  Users,
  FileCheck2,
  CreditCard,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { MOCK_ORGANIZATIONS, MOCK_REPORTS } from "@/lib/mock-data";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900">
          TỔNG QUAN HỆ THỐNG ĐIỀU HÀNH
        </h1>
        <p className="text-xs text-slate-500">
          Số liệu thống kê thời gian thực phục vụ công tác chỉ đạo của Trung ương Hội.
        </p>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tổ chức */}
        <div className="bg-white p-5 rounded-xl border shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Đơn Vị Trực Thuộc</span>
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">128</div>
          <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +6 đơn vị thành lập mới năm 2026
          </p>
        </div>

        {/* Card 2: Hội viên */}
        <div className="bg-white p-5 rounded-xl border shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng Số Hội Viên</span>
            <div className="p-2 bg-sky-50 text-sky-700 rounded-lg">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">25.480</div>
          <p className="text-[11px] text-sky-600 font-medium flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +1.200 kết nạp đợt gần nhất
          </p>
        </div>

        {/* Card 3: Báo cáo online */}
        <div className="bg-white p-5 rounded-xl border shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Báo Cáo Đã Tiếp Nhận</span>
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <FileCheck2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">92 / 128</div>
          <p className="text-[11px] text-amber-600 font-medium flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 36 đơn vị chưa nộp kỳ Q1
          </p>
        </div>

        {/* Card 4: Hội phí thu */}
        <div className="bg-white p-5 rounded-xl border shadow-sm space-y-2">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Hội Phí Đã Thu (2026)</span>
            <div className="p-2 bg-rose-50 text-rose-700 rounded-lg">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">840.000.000 đ</div>
          <p className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> Đối soát VietQR tự động 85%
          </p>
        </div>
      </div>

      {/* Grid 2 Cột: Báo cáo gần đây & Đơn vị mới */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Cột trái (70%): Báo cáo mới nhận cần duyệt */}
        <div className="lg:col-span-8 bg-white rounded-xl border shadow-sm p-5 space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <h3 className="font-bold text-sm text-slate-900">
              Báo Cáo Trực Tuyến Đang Chờ Duyệt (Kỳ mới nhất)
            </h3>
            <Link
              href="/admin/bao-cao"
              className="text-xs font-semibold text-emerald-700 hover:underline flex items-center gap-1"
            >
              Xem tất cả <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b">
                <tr>
                  <th className="py-2.5 px-3">Đơn vị gửi</th>
                  <th className="py-2.5 px-3">Tiêu đề báo cáo</th>
                  <th className="py-2.5 px-3">Kỳ báo cáo</th>
                  <th className="py-2.5 px-3">Trạng thái</th>
                  <th className="py-2.5 px-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MOCK_REPORTS.map((rep) => (
                  <tr key={rep.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-slate-900">
                      {rep.organizationName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700 max-w-xs truncate">
                      {rep.title}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono">
                      {rep.period} - {rep.year}
                    </td>
                    <td className="py-2.5 px-3">
                      {rep.status === "APPROVED" ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          Đã Duyệt
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                          Chờ Tiếp Nhận
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <Link
                        href="/admin/bao-cao"
                        className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded hover:bg-emerald-100 font-semibold"
                      >
                        Thẩm định
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cột phải (30%): Nhắc nhở nghiệp vụ */}
        <div className="lg:col-span-4 bg-white rounded-xl border shadow-sm p-5 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 border-b pb-3">
            Thông Báo Nghiệp Vụ Trung ương Hội
          </h3>
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" /> Hạn nộp Báo cáo Quý I:
              </p>
              <p className="text-[11px] text-rose-700">
                Hạn chót ngày 15/10/2026. Còn 36 Chi hội chưa gửi báo cáo về Văn phòng Trung ương Hội.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Đối soát Hội phí tự động:
              </p>
              <p className="text-[11px] text-emerald-700">
                18 giao dịch VietQR đóng niên liễm đã được tự động khớp lệnh thành công sáng nay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

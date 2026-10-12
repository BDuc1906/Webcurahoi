"use client";

import React, { useState } from "react";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { MOCK_DOCUMENTS } from "@/lib/mock-data";
import { Search, Download, Filter, FileText } from "lucide-react";

export default function DocumentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const filtered = MOCK_DOCUMENTS.filter((doc) => {
    const matchSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = typeFilter === "ALL" || doc.documentType === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <>
      <PublicHeader />

      <main className="max-w-7xl mx-auto px-4 py-12 flex-1 space-y-8 font-gov">
        <div>
          <span className="text-xs font-bold text-red-700 uppercase tracking-wider block">
            Hệ Thống Pháp Lý và Điều Hành
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif">
            KHO VĂN BẢN QUAN TRỌNG CỦA TRUNG ƯƠNG HỘI
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Điều lệ Hội, Quyết định thành lập, Nghị quyết Ban Chấp hành, Quyết định của Ban Thường vụ Trung ương Hội.
          </p>
        </div>

        {/* Filter and Search */}
        <div className="bg-white p-4 rounded-xs border border-slate-300 shadow-xs flex flex-col sm:flex-row gap-3 justify-between items-stretch sm:items-center text-xs">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Tìm theo số hiệu văn bản hoặc từ khóa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-xs focus:outline-none focus:ring-1 focus:ring-red-500 font-gov text-xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="border border-slate-300 rounded-xs px-3 py-2 bg-white text-slate-700 focus:outline-none w-full sm:w-auto text-xs"
            >
              <option value="ALL">Tất cả loại văn bản</option>
              <option value="CHARTER">Điều lệ Hội</option>
              <option value="ESTABLISHMENT_DECISION">Quyết định thành lập</option>
              <option value="BCH_RESOLUTION">Nghị quyết Ban Chấp hành</option>
              <option value="REGULATION">Quy định và Quy chế</option>
              <option value="NOTICE">Thông báo</option>
            </select>
          </div>
        </div>

        {/* Documents Table */}
        <div className="bg-white rounded-xs border border-slate-300 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-gov min-w-[340px]">
              <thead className="bg-[#f1f5f9] text-slate-800 font-bold border-b border-slate-300 text-[11px] uppercase">
                <tr>
                  <th className="py-3 px-3 sm:px-4 w-32 sm:w-44">Số / Ký hiệu</th>
                  <th className="py-3 px-3 sm:px-4">Trích yếu nội dung văn bản</th>
                  <th className="py-3 px-4 w-52 hidden md:table-cell">Cơ quan ban hành</th>
                  <th className="py-3 px-4 w-40 hidden lg:table-cell">Người ký</th>
                  <th className="py-3 px-4 w-32 hidden sm:table-cell">Ngày ban hành</th>
                  <th className="py-3 px-3 sm:px-4 text-center w-20 sm:w-28">Tải file</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 sm:px-4 font-mono font-bold text-red-800 align-top sm:align-middle">
                      <div>{doc.code}</div>
                      <div className="text-[10px] text-slate-500 font-mono font-normal sm:hidden mt-0.5">{doc.issuedDate}</div>
                    </td>
                    <td className="py-3 px-3 sm:px-4 font-medium text-slate-900 font-serif">
                      <div>{doc.title}</div>
                      <div className="text-[11px] text-slate-500 font-sans md:hidden mt-1">
                        <span className="font-semibold text-slate-600">CQ:</span> {doc.issuer}
                        {doc.signer && <span className="ml-2 lg:hidden"><span className="font-semibold text-slate-600">• Ký:</span> {doc.signer}</span>}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap hidden md:table-cell">
                      {doc.issuer}
                    </td>
                    <td className="py-3 px-4 text-slate-600 whitespace-nowrap hidden lg:table-cell">
                      {doc.signer}
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap font-mono hidden sm:table-cell">
                      {doc.issuedDate}
                    </td>
                    <td className="py-3 px-3 sm:px-4 text-center whitespace-nowrap align-top sm:align-middle">
                      <a
                        href={doc.fileUrl}
                        className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded-xs border border-red-200 font-bold transition-colors text-xs"
                      >
                        <Download className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Tải về</span><span className="sm:hidden">Tải</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}

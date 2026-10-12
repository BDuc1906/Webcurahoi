"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  visibleCount: number;
  onChangePage: (page: number) => void;
}

export default function StatementPagination({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  visibleCount,
  onChangePage,
}: Props) {
  const from = visibleCount > 0 ? (currentPage - 1) * pageSize + 1 : 0;
  const to = Math.min(currentPage * pageSize, totalItems);

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2
  );

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2 text-xs">
      <div className="text-slate-600 text-[11.5px]">
        Hiển thị <strong>{from}</strong> - <strong>{to}</strong> trên tổng số{" "}
        <strong>{totalItems}</strong> giao dịch đối soát
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onChangePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          title="Trang trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pageNumbers.map((pageNum, idx, arr) => {
          const prev = arr[idx - 1];
          const showEllipsis = prev && pageNum - prev > 1;

          return (
            <React.Fragment key={pageNum}>
              {showEllipsis && <span className="px-1 text-slate-400">...</span>}
              <button
                onClick={() => onChangePage(pageNum)}
                className={`min-w-[28px] h-7 px-1.5 rounded text-xs font-bold transition-colors cursor-pointer ${
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
          onClick={() => onChangePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          title="Trang sau"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
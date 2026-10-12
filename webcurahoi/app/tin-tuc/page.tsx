"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { MOCK_NEWS } from "@/lib/mock-data";
import { Calendar, Search, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

function NewsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const categories = [
    { id: "ALL", name: `Tất cả tin tức (${MOCK_NEWS.length} bài)` },
    { id: "Sự kiện Trung ương Hội", name: "Sự kiện Trung ương Hội" },
    { id: "Thời sự 24/7", name: "Thời sự 24/7" },
    { id: "Hoạt động Địa phương", name: "Hoạt động Địa phương" },
    { id: "Viện - Trường Đào tạo", name: "Viện - Trường & Học đường" },
    { id: "Chính sách & Pháp luật", name: "Chính sách & Pháp luật" },
    { id: "Thiện nguyện vì sức khỏe", name: "Thiện nguyện vì sức khỏe" },
  ];

  const [selectedCat, setSelectedCat] = useState(() => {
    if (!categoryParam) return "ALL";
    const decoded = decodeURIComponent(categoryParam);
    const matched = categories.find(
      (c) =>
        c.id.toLowerCase() === decoded.toLowerCase() ||
        c.name.toLowerCase() === decoded.toLowerCase() ||
        decoded.toLowerCase().includes(c.id.toLowerCase())
    );
    return matched ? matched.id : decoded;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    if (categoryParam) {
      const decodedParam = decodeURIComponent(categoryParam);
      const matched = categories.find(
        (c) =>
          c.id.toLowerCase() === decodedParam.toLowerCase() ||
          c.name.toLowerCase() === decodedParam.toLowerCase() ||
          decodedParam.toLowerCase().includes(c.id.toLowerCase())
      );
      if (matched) {
        setSelectedCat(matched.id);
      } else {
        setSelectedCat(decodedParam);
      }
    } else {
      setSelectedCat("ALL");
    }
    setCurrentPage(1);
  }, [categoryParam]);

  // Reset page on search or category change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCat, searchTerm]);

  const filtered = MOCK_NEWS.filter((item) => {
    const matchCat =
      selectedCat === "ALL" ||
      item.category.toLowerCase() === selectedCat.toLowerCase() ||
      (selectedCat.includes("Chính sách") && item.category.includes("Chính sách")) ||
      (selectedCat.includes("Thời sự") && item.category.includes("Thời sự")) ||
      (selectedCat.includes("Viện") && item.category.includes("Viện"));

    const matchSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 flex-1 space-y-8 font-gov">
      <div>
        <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider block">
          Mảng II: Thông Tin - Truyền Thông Y Tế
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif">
          TIN TỨC, THỜI SỰ 24/7 & HOẠT ĐỘNG TOÀN QUỐC
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-gov">
          Cơ sở dữ liệu thông tin gồm {MOCK_NEWS.length} bài viết cập nhật hoạt động của Trung ương Hội, 63 tỉnh thành, các Viện - Trường đào tạo và phong trào thiện nguyện.
        </p>
      </div>

      {/* Bộ lọc danh mục & Ô tìm kiếm */}
      <div className="space-y-3 bg-white p-3 sm:p-4 rounded-xs border border-slate-300 shadow-xs text-xs">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 sm:flex-wrap sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                className={`px-3 py-1.5 rounded-xs font-bold shrink-0 transition-all cursor-pointer ${
                  selectedCat === cat.id
                    ? "bg-[#991b1b] text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72 shrink-0">
            <input
              type="text"
              placeholder="Tìm kiếm tin tức, địa phương..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#991b1b] font-gov text-xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between items-center">
          <span>
            Tìm thấy <strong>{filtered.length}</strong> bài viết (Trang {currentPage} / {totalPages})
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-[#991b1b] hover:underline cursor-pointer"
            >
              Xóa từ khóa tìm kiếm
            </button>
          )}
        </div>
      </div>

      {/* Grid danh sách bài viết */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedItems.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 bg-white border border-slate-200 rounded-xs text-sm">
            Không tìm thấy bài viết nào phù hợp với danh mục hoặc từ khóa tìm kiếm.
          </div>
        ) : (
          paginatedItems.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xs border border-slate-200 shadow-xs hover:border-[#991b1b] hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="aspect-[16/10] relative overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#991b1b]/95 backdrop-blur-xs text-white rounded-xs text-[10px] font-bold">
                    {item.category}
                  </span>
                  {item.featured && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-amber-400 text-amber-950 rounded-xs text-[10px] font-bold shadow-xs">
                      Tiêu điểm
                    </span>
                  )}
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#991b1b]" /> {item.date}
                  </span>
                  <h3 className="font-bold text-sm sm:text-[15px] text-slate-900 group-hover:text-[#991b1b] transition-colors line-clamp-2 leading-snug font-serif">
                    <Link href={`/tin-tuc/${item.id}`}>{item.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-gov">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <Link
                  href={`/tin-tuc/${item.id}`}
                  className="text-[#991b1b] font-bold hover:underline flex items-center gap-1 font-gov text-xs"
                >
                  Đọc toàn văn <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[10px] text-slate-400 font-mono">VACHE</span>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Phân trang (Pagination) */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className={`px-2.5 sm:px-3 py-2 border rounded-xs text-xs font-bold flex items-center gap-1 ${
              currentPage === 1
                ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-4 h-4" /> <span className="hidden sm:inline">Trang Trước</span>
          </button>

          <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none scrollbar-none py-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xs text-xs font-bold transition-colors cursor-pointer ${
                  currentPage === page
                    ? "bg-[#991b1b] text-white shadow-xs"
                    : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className={`px-2.5 sm:px-3 py-2 border rounded-xs text-xs font-bold flex items-center gap-1 ${
              currentPage === totalPages
                ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
            }`}
          >
            <span className="hidden sm:inline">Trang Sau</span> <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </main>
  );
}

export default function NewsIndexPage() {
  return (
    <>
      <PublicHeader />
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center text-slate-500 font-gov">
            Đang tải dữ liệu tin tức toàn quốc...
          </div>
        }
      >
        <NewsContent />
      </Suspense>
      <PublicFooter />
    </>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { MOCK_NEWS, MOCK_SCHEDULE } from "@/lib/mock-data";
import {
  OFFICIAL_NEWS_GROUPS,
  getNewsGroupById,
  getNewsGroup,
  getArticleViews,
  getArticleReads,
  getArticleReadTime,
} from "@/lib/news-helper";
import {
  Calendar,
  Search,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Eye,
  Clock,
  Sparkles,
  FileText,
  CalendarCheck,
  TrendingUp,
  Tag,
  BookOpen,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

interface CategoryNewsViewProps {
  groupId: string;
}

export default function CategoryNewsView({ groupId }: CategoryNewsViewProps) {
  const group = getNewsGroupById(groupId) || OFFICIAL_NEWS_GROUPS[0];

  // Lọc tất cả bài viết thuộc chuyên mục này
  const categoryArticles = useMemo(() => {
    return MOCK_NEWS.filter((item) => getNewsGroup(item.category).id === group.id);
  }, [group.id]);

  // Bài tiêu điểm của chuyên mục (ưu tiên featured, hoặc bài đầu tiên)
  const spotlightArticle = useMemo(() => {
    return categoryArticles.find((item) => item.featured) || categoryArticles[0];
  }, [categoryArticles]);

  // 2 bài tiêu điểm phụ
  const secondaryArticles = useMemo(() => {
    return categoryArticles
      .filter((item) => item.id !== spotlightArticle?.id)
      .slice(0, 2);
  }, [categoryArticles, spotlightArticle]);

  // Bộ lọc tìm kiếm và sắp xếp
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "views">("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Lọc và sắp xếp danh sách bài viết
  const filteredArticles = useMemo(() => {
    let result = categoryArticles.filter((item) => {
      if (!searchTerm.trim()) return true;
      const term = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term)
      );
    });

    if (sortBy === "views") {
      result = [...result].sort((a, b) => getArticleViews(b) - getArticleViews(a));
    }

    return result;
  }, [categoryArticles, searchTerm, sortBy]);

  // Phân trang
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  // Tổng số lượt đọc trong chuyên mục
  const totalReads = useMemo(() => {
    return categoryArticles.reduce((acc, cur) => acc + getArticleReads(cur), 0);
  }, [categoryArticles]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-gov text-slate-800">
      <PublicHeader />

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <nav className="flex items-center text-xs text-slate-600 gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-[#991b1b] transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/tin-tuc" className="hover:text-[#991b1b] transition-colors">
              Tin tức - Sự kiện
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-[#991b1b]">
              Chuyên mục {group.docOrder}: {group.shortName}
            </span>
          </nav>
        </div>
      </div>

      {/* Category Header Banner */}
      <section className="bg-gradient-to-r from-red-950 via-[#801414] to-red-900 text-white py-8 border-b-4 border-amber-500 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-xs text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                MẢNG II • CHUYÊN MỤC 0{group.docOrder}/04
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-amber-50 leading-tight">
                {group.name}
              </h1>

              <p className="text-sm text-red-100/90 leading-relaxed font-gov">
                {group.description}
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="flex sm:flex-col gap-3 shrink-0 bg-red-900/60 p-4 rounded-xs border border-red-700/60 backdrop-blur-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4 text-amber-300" />
                </div>
                <div>
                  <div className="text-[11px] text-red-200">Tổng bài lưu trữ</div>
                  <div className="text-lg font-bold text-amber-300 font-serif">
                    {categoryArticles.length} bài viết
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 sm:border-t sm:border-red-800/80">
                <div className="w-9 h-9 rounded-full bg-red-500/20 border border-red-400/30 flex items-center justify-center shrink-0">
                  <Eye className="w-4 h-4 text-red-200" />
                </div>
                <div>
                  <div className="text-[11px] text-red-200">Tổng lượt quan tâm</div>
                  <div className="text-lg font-bold text-white font-serif">
                    {totalReads.toLocaleString("vi-VN")} lượt
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Chuyên Mục Shortcuts Sub-Nav Tabs */}
      <section className="bg-white border-b border-slate-200 shadow-2xs sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center gap-1.5 shrink-0 text-xs font-semibold py-1">
              <span className="text-slate-400 font-bold px-2 text-[11px] uppercase tracking-wider hidden sm:inline">
                Chuyển mục:
              </span>

              {OFFICIAL_NEWS_GROUPS.map((item) => {
                const isActive = item.id === group.id;
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={`px-3 py-2 rounded-xs transition-all whitespace-nowrap flex items-center gap-1.5 text-xs ${
                      isActive
                        ? "bg-[#991b1b] text-white shadow-xs font-bold border-b-2 border-amber-400"
                        : "text-slate-700 hover:bg-red-50 hover:text-[#991b1b] font-medium"
                    }`}
                  >
                    {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
                    <span>{item.shortName}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-red-950 text-amber-200"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {MOCK_NEWS.filter((n) => getNewsGroup(n.category).id === item.id).length}
                    </span>
                  </Link>
                );
              })}

              <Link
                href="/tin-tuc"
                className="px-3 py-2 rounded-xs text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors whitespace-nowrap border-l border-slate-200 ml-1"
              >
                Tất cả tin tức (100) →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Spotlight Article of this category */}
            {spotlightArticle && (
              <section className="bg-white rounded-xs border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-red-50/70 border-b border-red-100 px-4 py-2 flex items-center justify-between text-xs font-bold text-[#991b1b]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    TIÊU ĐIỂM CHUYÊN ĐỀ
                  </span>
                  <span className="text-slate-500 font-normal">Cập nhật hôm nay</span>
                </div>

                <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-6 relative group overflow-hidden rounded-xs bg-slate-100 min-h-[220px]">
                    <Link href={`/tin-tuc/${spotlightArticle.id}`} className="block w-full h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={spotlightArticle.image}
                        alt={spotlightArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 min-h-[220px] max-h-[300px]"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-[#991b1b] text-white text-[11px] font-bold px-2 py-0.5 rounded-xs shadow-xs">
                        {spotlightArticle.category}
                      </span>
                    </Link>
                  </div>

                  <div className="md:col-span-6 flex flex-col justify-between space-y-3">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {spotlightArticle.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          {getArticleViews(spotlightArticle).toLocaleString("vi-VN")} xem
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-amber-700 font-medium">
                          <Clock className="w-3.5 h-3.5" />
                          {getArticleReadTime(spotlightArticle)}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-bold font-serif text-slate-900 leading-snug hover:text-[#991b1b] transition-colors">
                        <Link href={`/tin-tuc/${spotlightArticle.id}`}>
                          {spotlightArticle.title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {spotlightArticle.excerpt}
                      </p>
                    </div>

                    <div className="pt-2">
                      <Link
                        href={`/tin-tuc/${spotlightArticle.id}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#991b1b] hover:text-red-700 group transition-colors"
                      >
                        Đọc toàn văn bài viết
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* 2 Tin tiêu điểm phụ */}
                {secondaryArticles.length > 0 && (
                  <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {secondaryArticles.map((sub) => (
                      <div key={sub.id} className="flex gap-3 group">
                        <Link
                          href={`/tin-tuc/${sub.id}`}
                          className="w-24 h-20 shrink-0 rounded-xs overflow-hidden bg-slate-200 block"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={sub.image}
                            alt={sub.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </Link>
                        <div className="flex-1 space-y-1">
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {sub.date}
                          </div>
                          <h3 className="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-[#991b1b] transition-colors leading-snug">
                            <Link href={`/tin-tuc/${sub.id}`}>{sub.title}</Link>
                          </h3>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Filter and Search Bar for Category */}
            <div className="bg-white p-4 rounded-xs border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder={`Tìm trong chuyên mục ${group.shortName}...`}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xs pl-8 pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#991b1b] focus:border-[#991b1b]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-xs text-slate-500">
                  Có <strong>{filteredArticles.length}</strong> bài viết
                </span>

                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xs text-xs">
                  <button
                    onClick={() => setSortBy("latest")}
                    className={`px-2.5 py-1 rounded-xs transition-colors font-medium ${
                      sortBy === "latest" ? "bg-white text-[#991b1b] shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Mới nhất
                  </button>
                  <button
                    onClick={() => setSortBy("views")}
                    className={`px-2.5 py-1 rounded-xs transition-colors font-medium ${
                      sortBy === "views" ? "bg-white text-[#991b1b] shadow-2xs font-bold" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Xem nhiều
                  </button>
                </div>
              </div>
            </div>

            {/* Articles List / Grid */}
            {paginatedArticles.length === 0 ? (
              <div className="bg-white p-12 rounded-xs border border-slate-200 text-center space-y-3">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-700">
                  Không tìm thấy bài viết phù hợp
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Không có bài viết nào khớp với từ khóa &quot;{searchTerm}&quot; trong chuyên mục này. Vui lòng thử từ khóa khác hoặc xóa bộ lọc.
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-xs text-[#991b1b] font-bold underline"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedArticles.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white rounded-xs border border-slate-200 shadow-2xs overflow-hidden flex flex-col hover:border-red-300 hover:shadow-md transition-all group"
                  >
                    <div className="relative aspect-video overflow-hidden bg-slate-100">
                      <Link href={`/tin-tuc/${item.id}`} className="block w-full h-full">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 bg-[#991b1b]/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-2xs">
                          {item.category}
                        </span>
                      </Link>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-slate-400" />
                            {item.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3 text-slate-400" />
                            {getArticleViews(item).toLocaleString("vi-VN")}
                          </span>
                        </div>

                        <h3 className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#991b1b] transition-colors">
                          <Link href={`/tin-tuc/${item.id}`}>{item.title}</Link>
                        </h3>

                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                          {item.excerpt}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {getArticleReadTime(item)}
                        </span>
                        <Link
                          href={`/tin-tuc/${item.id}`}
                          className="font-bold text-[#991b1b] hover:text-red-700 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform"
                        >
                          Chi tiết <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-xs rounded-xs border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Trang trước
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const pageNumber = idx + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => setCurrentPage(pageNumber)}
                        className={`w-8 h-8 text-xs font-bold rounded-xs transition-colors ${
                          currentPage === pageNumber
                            ? "bg-[#991b1b] text-white"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-xs rounded-xs border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 font-medium"
                >
                  Trang sau <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Box 1: Điều hướng các chuyên mục còn lại */}
            <div className="bg-white rounded-xs border border-slate-200 shadow-2xs overflow-hidden">
              <div className="bg-gradient-to-r from-red-900 to-red-800 text-white px-4 py-3 flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wide flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-300" />
                  Hệ Thống Chuyên Mục Tin Tức
                </h3>
              </div>

              <div className="p-3 divide-y divide-slate-100 text-xs">
                {OFFICIAL_NEWS_GROUPS.map((item) => {
                  const isCurrent = item.id === group.id;
                  const count = MOCK_NEWS.filter((n) => getNewsGroup(n.category).id === item.id).length;
                  return (
                    <Link
                      key={item.id}
                      href={item.path}
                      className={`p-3 block rounded-xs transition-colors ${
                        isCurrent
                          ? "bg-red-50 text-[#991b1b] font-bold border-l-4 border-[#991b1b]"
                          : "text-slate-700 hover:bg-slate-50 hover:text-[#991b1b]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">
                          Mục {item.docOrder}: {item.shortName}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-full font-medium">
                          {count} bài
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-normal line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Box 2: Sự kiện sắp diễn ra */}
            <div className="bg-white rounded-xs border border-slate-200 shadow-2xs overflow-hidden">
              <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wide flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-amber-400" />
                  Lịch Hoạt Động & Sự Kiện
                </h3>
                <span className="text-[10px] text-slate-400">Tháng 10/2026</span>
              </div>

              <div className="p-3 divide-y divide-slate-100">
                {MOCK_SCHEDULE.slice(0, 4).map((sch, idx) => (
                  <div key={idx} className="py-2.5 first:pt-1 last:pb-1 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-[#991b1b] flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {sch.date} ({sch.time})
                      </span>
                      {sch.location && (
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded-xs">
                          {sch.location}
                        </span>
                      )}
                    </div>
                    <div className="font-medium text-slate-800 line-clamp-2 leading-snug">
                      {sch.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Box 3: Tra cứu văn bản pháp quy */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-xs p-4 text-xs space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <FileText className="w-4 h-4 text-amber-700" />
                VĂN BẢN & CHỈ ĐẠO CỦA HỘI
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Hệ thống lưu trữ các Nghị quyết BCH, Quyết định bổ nhiệm, Điều lệ và thông tri hướng dẫn mới nhất của Trung ương Hội.
              </p>
              <Link
                href="/van-ban"
                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#991b1b] hover:underline"
              >
                Truy cập kho văn bản pháp quy →
              </Link>
            </div>

            {/* Box 4: Tòa soạn & Đường dây nóng */}
            <div className="bg-white rounded-xs border border-slate-200 p-4 text-xs space-y-3">
              <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider border-b border-slate-100 pb-2">
                BAN BIÊN TẬP & TRUYỀN THÔNG
              </h4>
              <div className="space-y-1.5 text-slate-600 text-[11px]">
                <p>
                  <strong className="text-slate-800">Cơ quan:</strong> Cổng thông tin Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam
                </p>
                <p>
                  <strong className="text-slate-800">Trụ sở:</strong> Cung Trí thức TP. Hà Nội, Số 1 Tôn Thất Thuyết, Cầu Giấy, Hà Nội
                </p>
                <p>
                  <strong className="text-slate-800">Điện thoại:</strong> 024.3792.0088 / 0912.345.678
                </p>
                <p>
                  <strong className="text-slate-800">Email:</strong> bbt@vache.org.vn
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
}

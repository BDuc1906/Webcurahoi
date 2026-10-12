"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { MOCK_NEWS, MOCK_SCHEDULE } from "@/lib/mock-data";
import {
  OFFICIAL_NEWS_GROUPS,
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
  TrendingUp,
  Users,
  Activity,
  FileText,
  Sparkles,
  Award,
  PhoneCall,
  CalendarCheck,
} from "lucide-react";

function NewsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const groupParam = searchParams.get("group");

  // Bộ lọc danh mục theo 4 nhóm chính trong văn bản của Hội + các phân loại chi tiết
  const filterTabs = [
    { id: "ALL", label: `Tất cả (${MOCK_NEWS.length})`, count: MOCK_NEWS.length },
    {
      id: "GROUP_1",
      label: "1. Chính sách & Pháp luật",
      desc: "Chính sách, chiến lược y tế nhân dân",
      match: (item: (typeof MOCK_NEWS)[0]) => getNewsGroup(item.category).id === "GROUP_1_CHINH_SACH",
    },
    {
      id: "GROUP_2",
      label: "2. Sự kiện lớn Trung ương Hội",
      desc: "Đại hội, BCH, Thường vụ, Tọa đàm",
      match: (item: (typeof MOCK_NEWS)[0]) => getNewsGroup(item.category).id === "GROUP_2_SU_KIEN_TW",
    },
    {
      id: "GROUP_3",
      label: "3. Hoạt động Đơn vị thuộc Hội",
      desc: "Chi hội 63 tỉnh thành, Viện - Trường",
      match: (item: (typeof MOCK_NEWS)[0]) => getNewsGroup(item.category).id === "GROUP_3_DON_VI",
    },
    {
      id: "GROUP_4",
      label: "4. Hoạt động liên quan khác",
      desc: "Thời sự 24/7, Phong trào thiện nguyện",
      match: (item: (typeof MOCK_NEWS)[0]) => getNewsGroup(item.category).id === "GROUP_4_LIEN_QUAN",
    },
    {
      id: "SUB_THOI_SU",
      label: "Thời sự 24/7",
      desc: "Tin y tế thường thức",
      match: (item: (typeof MOCK_NEWS)[0]) => item.category.toLowerCase().includes("thời sự"),
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "views" | "featured">("latest");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Xử lý tham số URL khi chuyển trang từ thanh menu: tự động chuyển hướng sang trang chuyên đề độc lập
  useEffect(() => {
    if (groupParam) {
      if (groupParam === "GROUP_1_CHINH_SACH") {
        window.location.replace("/tin-tuc/chinh-sach-phap-luat");
        return;
      }
      if (groupParam === "GROUP_2_SU_KIEN_TW") {
        window.location.replace("/tin-tuc/su-kien-trung-uong");
        return;
      }
      if (groupParam === "GROUP_3_DON_VI") {
        window.location.replace("/tin-tuc/hoat-dong-don-vi");
        return;
      }
      if (groupParam === "GROUP_4_LIEN_QUAN") {
        window.location.replace("/tin-tuc/hoat-dong-khac");
        return;
      }
    } else if (categoryParam) {
      const decoded = decodeURIComponent(categoryParam).toLowerCase();
      if (decoded.includes("chính sách") || decoded.includes("pháp luật")) setActiveTab("GROUP_1");
      else if (decoded.includes("trung ương") || decoded.includes("bch")) setActiveTab("GROUP_2");
      else if (decoded.includes("địa phương") || decoded.includes("viện")) setActiveTab("GROUP_3");
      else if (decoded.includes("thời sự")) setActiveTab("SUB_THOI_SU");
      else if (decoded.includes("thiện nguyện")) setActiveTab("GROUP_4");
      else setActiveTab("ALL");
    } else {
      setActiveTab("ALL");
    }
    setCurrentPage(1);
  }, [categoryParam, groupParam]);

  // Lọc và sắp xếp bài viết
  const filteredAndSorted = useMemo(() => {
    let list = MOCK_NEWS.filter((item) => {
      // 1. Lọc theo tab
      let matchTab = true;
      if (activeTab === "GROUP_1") matchTab = getNewsGroup(item.category).id === "GROUP_1_CHINH_SACH";
      else if (activeTab === "GROUP_2") matchTab = getNewsGroup(item.category).id === "GROUP_2_SU_KIEN_TW";
      else if (activeTab === "GROUP_3") matchTab = getNewsGroup(item.category).id === "GROUP_3_DON_VI";
      else if (activeTab === "GROUP_4") matchTab = getNewsGroup(item.category).id === "GROUP_4_LIEN_QUAN";
      else if (activeTab === "SUB_THOI_SU") matchTab = item.category.toLowerCase().includes("thời sự");

      // 2. Lọc theo tìm kiếm
      const term = searchTerm.trim().toLowerCase();
      const matchSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.excerpt.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);

      return matchTab && matchSearch;
    });

    // Sắp xếp
    if (sortBy === "views") {
      list = [...list].sort((a, b) => getArticleViews(b) - getArticleViews(a));
    } else if (sortBy === "featured") {
      list = [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [activeTab, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredAndSorted.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredAndSorted.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Tin tiêu điểm chính và phụ (Hero Spotlight)
  const spotlightMain = MOCK_NEWS[0]; // news-001 (Bài trong ảnh mẫu Word)
  const spotlightSubs = [MOCK_NEWS[1], MOCK_NEWS[2]];

  // Top 5 tin đọc nhiều nhất toàn cổng
  const topReadNews = useMemo(() => {
    return [...MOCK_NEWS]
      .sort((a, b) => getArticleViews(b) - getArticleViews(a))
      .slice(0, 5);
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8 flex-1 space-y-8 font-gov">
      {/* 1. HEADER TRANG & BANNER THỐNG KÊ TRUY CẬP */}
      <div className="bg-gradient-to-r from-red-950 via-[#991b1b] to-red-900 rounded-xs p-6 sm:p-8 text-white shadow-md border-b-4 border-amber-500">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-red-900/80 border border-red-700/80 rounded-xs text-[11px] font-bold text-amber-300 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Mảng II: Thông Tin - Truyền Thông Y Tế
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-serif leading-tight">
              TIN TỨC, THỜI SỰ 24/7 & HOẠT ĐỘNG TOÀN QUỐC
            </h1>
            <p className="text-xs sm:text-sm text-red-100 font-gov leading-relaxed">
              Cơ sở dữ liệu thông tin gồm 100 bài viết cập nhật hoạt động của Trung ương Hội, 63 tỉnh thành, các Viện - Trường đào tạo và phong trào thiện nguyện chăm sóc sức khỏe nhân dân.
            </p>
          </div>

          {/* Hộp Thống kê bạn đọc & Truy cập Cổng Thông tin điện tử */}
          <div className="bg-black/35 backdrop-blur-md rounded-xs border border-white/15 p-4 sm:p-5 shrink-0 grid grid-cols-2 gap-3 sm:gap-4 min-w-[280px]">
            <div className="space-y-1">
              <span className="text-[11px] text-red-200 flex items-center gap-1.5 font-gov">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Đang trực tuyến
              </span>
              <p className="text-lg sm:text-xl font-bold font-mono text-emerald-300">148 bạn đọc</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-red-200 flex items-center gap-1.5 font-gov">
                <Activity className="w-3.5 h-3.5 text-amber-300" /> Đọc hôm nay
              </span>
              <p className="text-lg sm:text-xl font-bold font-mono text-amber-300">4,210 lượt</p>
            </div>

            <div className="col-span-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-200">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-blue-300" /> Tổng lượt truy cập:
              </span>
              <strong className="font-mono text-white text-xs">1,428,950</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 4 LỐI TẮT CHUYÊN MỤC QUY CHUẨN */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {OFFICIAL_NEWS_GROUPS.map((grp) => {
          const count = MOCK_NEWS.filter((n) => getNewsGroup(n.category).id === grp.id).length;
          return (
            <Link
              key={grp.id}
              href={grp.path}
              className="bg-white p-3.5 rounded-xs border border-slate-200 hover:border-[#991b1b] shadow-2xs hover:shadow-sm transition-all group flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-[#991b1b]">Chuyên mục 0{grp.docOrder}</span>
                  <span className="text-[10px] bg-red-50 text-[#991b1b] px-1.5 py-0.5 rounded-full font-bold">
                    {count} bài viết
                  </span>
                </div>
                <h3 className="font-bold text-xs text-slate-800 group-hover:text-[#991b1b] transition-colors leading-snug">
                  {grp.shortName}
                </h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-gov">
                  {grp.description}
                </p>
              </div>
              <div className="pt-2 text-[11px] font-bold text-[#991b1b] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Xem chuyên mục riêng <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* 2. KHỐI TIN TIÊU ĐIỂM NỔI BẬT (SPOTLIGHT HERO) */}
      <section className="bg-white border border-slate-300 rounded-xs shadow-xs overflow-hidden">
        <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#991b1b] rounded-full"></span>
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wide text-slate-800 font-serif">
              TIÊU ĐIỂM HOẠT ĐỘNG TRUNG ƯƠNG HỘI
            </h2>
          </div>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">Cập nhật 24/7</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* Tin Tiêu điểm chính (Left - 7 cols) */}
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between group">
            <div className="space-y-3">
              <Link
                href={`/tin-tuc/${spotlightMain.id}`}
                className="aspect-[16/9] relative overflow-hidden rounded-xs bg-slate-100 block cursor-pointer"
              >
                <img
                  src={spotlightMain.image}
                  alt={spotlightMain.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#991b1b] text-white text-[10px] font-bold rounded-xs uppercase tracking-wider shadow-sm">
                  {spotlightMain.category}
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 bg-amber-400 text-amber-950 text-[10px] font-bold rounded-xs flex items-center gap-1 shadow-xs">
                  <Award className="w-3 h-3" /> Tiêu điểm đặc biệt
                </span>
              </Link>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
                <span className="flex items-center gap-1 text-[#991b1b] font-bold">
                  <Calendar className="w-3.5 h-3.5" /> {spotlightMain.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Eye className="w-3.5 h-3.5 text-slate-400" /> {getArticleViews(spotlightMain).toLocaleString("vi-VN")} lượt đọc
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {getArticleReadTime(spotlightMain)}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-[#991b1b] transition-colors font-serif leading-snug">
                <Link href={`/tin-tuc/${spotlightMain.id}`}>{spotlightMain.title}</Link>
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-gov">
                {spotlightMain.excerpt}
              </p>
            </div>

            <div className="pt-4 mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
              <Link
                href={`/tin-tuc/${spotlightMain.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs text-xs font-bold transition-colors font-gov"
              >
                Đọc toàn văn bài viết <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-[11px] text-slate-400 font-mono">Nguồn: Văn phòng TW Hội</span>
                <span className="text-slate-300">•</span>
                <a
                  href="https://suckhoecongdong.net.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-blue-700 hover:underline flex items-center gap-0.5"
                  title="Mở trang báo Tạp chí Sức Khỏe Cộng Đồng"
                >
                  Tạp chí SKCĐ ↗
                </a>
              </div>
            </div>
          </div>

          {/* 2 Tin Tiêu điểm phụ (Right - 5 cols) */}
          <div className="lg:col-span-5 p-4 sm:p-6 flex flex-col justify-between space-y-4">
            {spotlightSubs.map((sub, idx) => (
              <div
                key={sub.id}
                className={`flex gap-3 sm:gap-4 group ${
                  idx > 0 ? "pt-4 border-t border-slate-200" : ""
                }`}
              >
                <Link
                  href={`/tin-tuc/${sub.id}`}
                  className="w-32 sm:w-36 aspect-[4/3] shrink-0 rounded-xs overflow-hidden bg-slate-100 relative block cursor-pointer"
                >
                  <img
                    src={sub.image}
                    alt={sub.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-black/70 text-white text-[9px] font-bold rounded-2xs">
                    {sub.category}
                  </span>
                </Link>

                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span>{sub.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-0.5 text-slate-600">
                      <Eye className="w-3 h-3 text-slate-400" /> {getArticleViews(sub).toLocaleString("vi-VN")}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#991b1b] transition-colors line-clamp-2 leading-snug font-serif">
                    <Link href={`/tin-tuc/${sub.id}`}>{sub.title}</Link>
                  </h4>

                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed font-gov hidden sm:block">
                    {sub.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-0.5 text-xs">
                    <Link
                      href={`/tin-tuc/${sub.id}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#991b1b] hover:underline"
                    >
                      Chi tiết <ArrowRight className="w-3 h-3" />
                    </Link>
                    <a
                      href="https://suckhoecongdong.net.vn"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-slate-500 hover:text-blue-700 flex items-center gap-0.5 font-gov"
                    >
                      Báo gốc ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BỘ LỌC DANH MỤC THEO 4 NHÓM QUY CHUẨN & Ô TÌM KIẾM */}
      <div className="space-y-3 bg-white p-4 rounded-xs border border-slate-300 shadow-xs">
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center gap-3">
          {/* Danh sách tabs danh mục */}
          <div className="flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none pb-1 lg:flex-wrap lg:pb-0">
            {filterTabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xs font-bold text-xs shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#991b1b] text-white shadow-xs"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                  title={tab.desc}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Ô tìm kiếm & Sắp xếp */}
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64 shrink-0">
              <input
                type="text"
                placeholder="Tìm bài viết, địa phương..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#991b1b] font-gov text-xs"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-1.5 px-2.5 border border-slate-300 rounded-xs text-xs font-gov bg-white text-slate-700 focus:outline-none"
            >
              <option value="latest">Mới nhất</option>
              <option value="views">Đọc nhiều nhất</option>
              <option value="featured">Tiêu điểm</option>
            </select>
          </div>
        </div>

        {/* Thông tin kết quả tìm kiếm */}
        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 flex justify-between items-center">
          <span>
            Tìm thấy <strong>{filteredAndSorted.length}</strong> bài viết phù hợp (Trang {currentPage} / {totalPages})
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-[#991b1b] font-semibold hover:underline cursor-pointer"
            >
              Xóa từ khóa tìm kiếm
            </button>
          )}
        </div>
      </div>

      {/* 4. BỐ CỤC CHÍNH: 8 PHẦN TIN TỨC + 4 PHẦN SIDEBAR THỐNG KÊ & BÁO CHÍ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CỘT CHÍNH (8/12) - DANH SÁCH BÀI VIẾT */}
        <div className="lg:col-span-8 space-y-6">
          {paginatedItems.length === 0 ? (
            <div className="py-16 text-center text-slate-500 bg-white border border-slate-200 rounded-xs text-sm">
              <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              Không tìm thấy bài viết nào phù hợp với danh mục hoặc từ khóa tìm kiếm.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedItems.map((item) => {
                const views = getArticleViews(item);
                const readTime = getArticleReadTime(item);

                return (
                  <article
                    key={item.id}
                    className="bg-white rounded-xs border border-slate-200 shadow-xs hover:border-[#991b1b] hover:shadow-md transition-all overflow-hidden flex flex-col justify-between group"
                  >
                    <div>
                      {/* Ảnh bài viết */}
                      <Link
                        href={`/tin-tuc/${item.id}`}
                        className="aspect-[16/10] relative overflow-hidden bg-slate-100 block cursor-pointer"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#991b1b]/95 text-white rounded-xs text-[10px] font-bold shadow-xs">
                          {item.category}
                        </span>
                        {item.featured && (
                          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-amber-400 text-amber-950 rounded-xs text-[10px] font-bold shadow-xs">
                            Tiêu điểm
                          </span>
                        )}
                      </Link>

                      {/* Nội dung tóm tắt */}
                      <div className="p-4 space-y-2">
                        {/* Dòng lượt đọc và ngày tháng */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                          <span className="flex items-center gap-1 text-[#991b1b] font-bold">
                            <Calendar className="w-3 h-3" /> {item.date}
                          </span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <Eye className="w-3 h-3 text-slate-400" /> {views.toLocaleString("vi-VN")} đọc
                          </span>
                        </div>

                        {/* Tiêu đề */}
                        <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#991b1b] transition-colors line-clamp-2 leading-snug font-serif">
                          <Link href={`/tin-tuc/${item.id}`}>{item.title}</Link>
                        </h3>

                        {/* Sapo */}
                        <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-gov">
                          {item.excerpt}
                        </p>
                      </div>
                    </div>

                    {/* Chân thẻ bài viết */}
                    <div className="px-4 py-2.5 border-t border-slate-100 flex justify-between items-center text-xs bg-slate-50/50">
                      <Link
                        href={`/tin-tuc/${item.id}`}
                        className="text-[#991b1b] font-bold hover:underline flex items-center gap-1 text-xs"
                      >
                        Đọc toàn văn <ArrowRight className="w-3 h-3" />
                      </Link>
                      <div className="flex items-center gap-2">
                        <a
                          href={
                            item.category.includes("Chính sách")
                              ? "https://baochinhphu.vn"
                              : item.category.includes("Thời sự")
                              ? "https://suckhoedoisong.vn"
                              : "https://suckhoecongdong.net.vn"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-slate-500 hover:text-blue-700 flex items-center gap-0.5 font-gov"
                          title="Mở bài viết trên trang báo chính thức"
                        >
                          Báo gốc ↗
                        </a>
                        <span className="text-[10px] text-slate-400 font-mono">{readTime}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Phân trang (Pagination) */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 pt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-2 border rounded-xs text-xs font-bold flex items-center gap-1 ${
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
                className={`px-3 py-2 border rounded-xs text-xs font-bold flex items-center gap-1 ${
                  currentPage === totalPages
                    ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                    : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
                }`}
              >
                <span className="hidden sm:inline">Trang Sau</span> <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* CỘT PHỤ SIDEBAR (4/12) - BẢO ĐẢM BỐ CỤC CHUẨN BÁO ĐIỆN TỬ NHÀ NƯỚC */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Widget 1: Hộp Thống kê bạn đọc & Truy cập chi tiết */}
          <div className="bg-white rounded-xs border border-slate-300 shadow-xs overflow-hidden">
            <div className="bg-[#991b1b] text-white px-4 py-2.5 font-bold text-xs uppercase font-serif flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-300" />
              THỐNG KÊ BẠN ĐỌC & TRUY CẬP
            </div>
            <div className="p-4 space-y-3 text-xs divide-y divide-slate-100">
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-600 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Đang trực tuyến:
                </span>
                <strong className="font-mono text-emerald-700 font-bold">148 người</strong>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-blue-500" />
                  Lượt xem trong ngày:
                </span>
                <strong className="font-mono text-slate-800">4,210 lượt</strong>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
                  Lượt xem tháng này:
                </span>
                <strong className="font-mono text-slate-800">89,450 lượt</strong>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-600 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-red-600" />
                  Tổng lượt truy cập tích lũy:
                </span>
                <strong className="font-mono text-[#991b1b] font-bold text-sm">1,428,950</strong>
              </div>
            </div>
          </div>

          {/* Widget 2: Top 5 Tin Đọc Nhiều Nhất (Trending) */}
          <div className="bg-white rounded-xs border border-slate-300 shadow-xs overflow-hidden">
            <div className="bg-slate-100 border-b border-slate-300 px-4 py-2.5 font-bold text-xs uppercase font-serif text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#991b1b]" />
              TIN ĐỌC NHIỀU NHẤT TUẦN NÀY
            </div>
            <div className="divide-y divide-slate-100 p-2">
              {topReadNews.map((item, index) => {
                const views = getArticleViews(item);
                return (
                  <Link
                    key={item.id}
                    href={`/tin-tuc/${item.id}`}
                    className="p-2.5 flex items-start gap-3 hover:bg-slate-50 transition-colors group block"
                  >
                    <span
                      className={`w-6 h-6 shrink-0 rounded-xs flex items-center justify-center font-bold text-xs font-mono ${
                        index === 0
                          ? "bg-red-700 text-white"
                          : index === 1
                          ? "bg-amber-600 text-white"
                          : index === 2
                          ? "bg-amber-500 text-white"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="space-y-1 flex-1">
                      <h4 className="font-bold text-xs text-slate-900 group-hover:text-[#991b1b] transition-colors line-clamp-2 leading-snug font-serif">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10.5px] text-slate-400 font-mono">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span className="text-red-700 font-semibold">{views.toLocaleString("vi-VN")} đọc</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Widget 3: Lịch công tác Ban Thường trực Tuần này */}
          <div className="bg-white rounded-xs border border-slate-300 shadow-xs overflow-hidden">
            <div className="bg-slate-100 border-b border-slate-300 px-4 py-2.5 font-bold text-xs uppercase font-serif text-slate-800 flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-[#991b1b]" />
              LỊCH CÔNG TÁC LÃNH ĐẠO HỘI
            </div>
            <div className="p-3 space-y-2.5 divide-y divide-slate-100">
              {MOCK_SCHEDULE.slice(0, 3).map((sc, i) => (
                <div key={i} className={`text-xs space-y-1 ${i > 0 ? "pt-2.5" : ""}`}>
                  <div className="flex items-center justify-between text-[11px] text-[#991b1b] font-bold font-mono">
                    <span>{sc.date}</span>
                    <span>{sc.time}</span>
                  </div>
                  <p className="text-slate-800 font-serif leading-snug text-xs font-semibold">
                    {sc.content}
                  </p>
                  <p className="text-[11px] text-slate-500 font-gov">
                    Chủ trì: <strong className="text-slate-700">{sc.chairperson}</strong>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Widget 4: Thông tin Ban Biên tập & Đường dây nóng */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xs p-4 space-y-2 text-xs border border-slate-700">
            <div className="flex items-center gap-2 text-amber-400 font-bold uppercase font-serif">
              <PhoneCall className="w-4 h-4" /> ĐƯỜNG DÂY NÓNG TÒA SOẠN
            </div>
            <p className="text-slate-300 text-[11.5px] leading-relaxed">
              Tiếp nhận thông tin hoạt động từ các Chi hội, Viện nghiên cứu và bạn đọc trên toàn quốc:
            </p>
            <div className="pt-1 font-mono text-amber-300 text-sm font-bold">
              024.3782.3556 / 0912.345.678
            </div>
            <p className="text-slate-400 text-[10.5px]">
              Email: toasoan@suckhoecongdong.net.vn | banbientap@vache.org.vn
            </p>
          </div>
        </aside>
      </div>
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

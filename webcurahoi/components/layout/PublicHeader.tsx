"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import {
  Phone,
  Mail,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  UserCheck,
  LogIn,
  Calendar,
  Globe,
} from "lucide-react";

export default function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-slate-300 shadow-xs sticky top-0 z-50">
      {/* 1. DÒNG THÔNG TIN ĐẦU TRANG */}
      <div className="bg-[#0f172a] text-slate-300 text-[10.5px] sm:text-[11px] py-1.5 px-3 sm:px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5 text-slate-200">
              <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Thứ Bảy, 10/10/2026</span>
              <span className="hidden sm:inline">&nbsp;|&nbsp; Ngày 01 tháng 09 Âm lịch</span>
            </span>
            <span className="hidden md:flex items-center gap-1 text-slate-300">
              <Phone className="w-3 h-3 text-emerald-400" /> Đường dây nóng: <strong className="text-white">024.3782.3556</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px]">
            <a
              href="https://suckhoecongdong.net.vn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold"
            >
              <Globe className="w-3 h-3 shrink-0" />
              <span className="hidden xs:inline">Tạp chí </span>Sức Khỏe Cộng Đồng
            </a>
            <span className="text-slate-600">|</span>
            <div className="flex items-center gap-1">
              <span className="bg-red-700 text-white font-bold px-1.5 py-0.5 rounded-xs">VN</span>
              <span className="text-slate-400 hover:text-white cursor-pointer px-1">EN</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. KHỐI LOGO VÀ TÊN TRUNG ƯƠNG HỘI */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">
        <Logo size="lg" variant="full" />

        {/* Nút tác vụ công vụ */}
        <div className="hidden lg:flex items-center gap-2.5">
          <Link
            href="/dang-ky-hoi-vien"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xs text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300 hover:bg-amber-100 transition-colors shadow-xs font-gov"
          >
            <UserCheck className="w-3.5 h-3.5 text-amber-700" />
            ĐĂNG KÝ HỘI VIÊN
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xs text-xs font-bold bg-[#0f172a] text-white hover:bg-slate-800 transition-colors shadow-xs font-gov"
          >
            <LogIn className="w-3.5 h-3.5" />
            CỔNG ĐIỀU HÀNH NỘI BỘ
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded text-slate-700 hover:bg-slate-100 border"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* 3. THANH ĐIỀU HƯỚNG MÀU ĐỎ ĐÔ - VIẾT ĐẦY ĐỦ KHÔNG VIẾT TẮT */}
      <nav className="bg-[#991b1b] text-white border-y border-red-950 shadow-sm hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <ul className="flex items-center text-[12px] font-bold tracking-normal uppercase font-gov">
            <li>
              <Link
                href="/"
                className="inline-block py-2.5 px-3 hover:bg-red-900 border-r border-red-800/80 transition-colors"
              >
                Trang Chủ
              </Link>
            </li>

            {/* Mục 1: Giới Thiệu */}
            <li className="relative group">
              <Link
                href="/gioi-thieu"
                className="flex items-center gap-1 py-2.5 px-3 hover:bg-red-900 border-r border-red-800/80 transition-colors"
              >
                Giới Thiệu <ChevronDown className="w-3 h-3 opacity-70" />
              </Link>
              <div className="absolute left-0 top-full hidden group-hover:block w-72 bg-white text-slate-800 shadow-xl border border-slate-200 z-50 rounded-xs divide-y divide-slate-100 overflow-hidden font-gov normal-case">
                <Link
                  href="/gioi-thieu?tab=INTRO"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Tôn chỉ & Mục đích</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
                <Link
                  href="/gioi-thieu?tab=LEADERS"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Lãnh đạo Trung ương Hội</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
                <Link
                  href="/gioi-thieu?tab=CHARTER"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Điều lệ hoạt động</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
              </div>
            </li>

            {/* Mục 2: Tin Tức - Sự Kiện */}
            <li className="relative group">
              <Link
                href="/tin-tuc"
                className="flex items-center gap-1 py-2.5 px-3 hover:bg-red-900 border-r border-red-800/80 transition-colors"
              >
                Tin Tức - Sự Kiện <ChevronDown className="w-3 h-3 opacity-70" />
              </Link>
              <div className="absolute left-0 top-full hidden group-hover:block w-72 bg-white text-slate-800 shadow-xl border border-slate-200 z-50 rounded-xs divide-y divide-slate-100 overflow-hidden font-gov normal-case">
                <Link
                  href="/tin-tuc?category=Sự kiện Trung ương Hội"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Sự kiện lớn Trung ương Hội</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
                <Link
                  href="/tin-tuc?category=Thời sự 24/7"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Thời sự Y tế 24/7</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
                <Link
                  href="/tin-tuc?category=Viện - Trường Đào tạo"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Viện - Trường & Sức khỏe Học đường</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
                <Link
                  href="/tin-tuc?category=Chính sách %26 Pháp luật"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Chính sách & Pháp luật</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
                <Link
                  href="/tin-tuc?category=Thiện nguyện vì sức khỏe"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Hoạt động Đơn vị & Thiện nguyện</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
              </div>
            </li>

            {/* Mục 3: Hệ Thống Tổ Chức */}
            <li className="relative group">
              <Link
                href="/he-thong-to-chuc"
                className="flex items-center gap-1 py-2.5 px-3 hover:bg-red-900 border-r border-red-800/80 transition-colors"
              >
                Hệ Thống Tổ Chức <ChevronDown className="w-3 h-3 opacity-70" />
              </Link>
              <div className="absolute left-0 top-full hidden group-hover:block w-72 bg-white text-slate-800 shadow-xl border border-slate-200 z-50 rounded-xs divide-y divide-slate-100 overflow-hidden font-gov normal-case">
                <Link
                  href="/he-thong-to-chuc?type=CENTRAL_OFFICE"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Cơ quan Trung ương & Các ban</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
                <Link
                  href="/he-thong-to-chuc?type=BRANCH"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Hệ thống Chi hội tỉnh thành</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
                <Link
                  href="/he-thong-to-chuc?type=INSTITUTE"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Viện & Trung tâm trực thuộc</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
                <Link
                  href="/he-thong-to-chuc?type=ENTERPRISE"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Đơn vị thành viên & Doanh nghiệp</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
              </div>
            </li>

            {/* Mục 4: Nhân Sự và Hội Viên */}
            <li className="relative group">
              <Link
                href="/nhan-su"
                className="flex items-center gap-1 py-2.5 px-3 hover:bg-red-900 border-r border-red-800/80 transition-colors"
              >
                Nhân Sự và Hội Viên <ChevronDown className="w-3 h-3 opacity-70" />
              </Link>
              <div className="absolute left-0 top-full hidden group-hover:block w-72 bg-white text-slate-800 shadow-xl border border-slate-200 z-50 rounded-xs divide-y divide-slate-100 overflow-hidden font-gov normal-case">
                <Link
                  href="/nhan-su?role=BCH"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Ban Chấp hành Trung ương</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
                <Link
                  href="/nhan-su?role=BTV"
                  className="h-11 px-4 flex items-center justify-between text-xs font-medium text-slate-700 hover:bg-red-50 hover:text-[#991b1b] transition-colors group/item"
                >
                  <span>Ban Thường vụ Trung ương</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/item:text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
                <Link
                  href="/dang-ky-hoi-vien"
                  className="h-11 px-4 flex items-center justify-between text-xs font-bold text-[#991b1b] bg-amber-50/50 hover:bg-amber-100/70 transition-colors group/item"
                >
                  <span>Đăng ký gia nhập Hội viên</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#991b1b] group-hover/item:translate-x-0.5 transition-all shrink-0" />
                </Link>
              </div>
            </li>

            <li>
              <Link
                href="/van-ban"
                className="inline-block py-2.5 px-3 hover:bg-red-900 border-r border-red-800/80 transition-colors"
              >
                Kho Văn Bản
              </Link>
            </li>

            <li>
              <Link
                href="/thien-nguyen"
                className="inline-block py-2.5 px-3 hover:bg-red-900 transition-colors text-amber-300 font-bold"
              >
                Quỹ Thiện Nguyện và Phí
              </Link>
            </li>
          </ul>

          {/* Ô tìm kiếm */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm văn bản, tin tức..."
              className="bg-red-950/80 text-white placeholder-red-300 text-xs rounded-xs pl-7 pr-3 py-1 focus:outline-none focus:ring-1 focus:ring-amber-400 w-48 border border-red-800 font-gov"
            />
            <Search className="w-3.5 h-3.5 text-red-300 absolute left-2 top-1.5" />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white p-4 space-y-3 text-xs font-semibold font-gov border-t border-slate-800 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Mobile Search Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const input = form.elements.namedItem("q") as HTMLInputElement;
              if (input && input.value.trim()) {
                window.location.href = `/tin-tuc?q=${encodeURIComponent(input.value.trim())}`;
                setMobileMenuOpen(false);
              }
            }}
            className="relative"
          >
            <input
              type="text"
              name="q"
              placeholder="Tìm kiếm tin tức, văn bản..."
              className="w-full bg-slate-800 text-white placeholder-slate-400 text-xs rounded-xs pl-8 pr-3 py-2 border border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-400 font-gov"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </form>

          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-2 rounded-xs border-b border-slate-800/80 hover:bg-slate-800"
          >
            <span>TRANG CHỦ</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <div className="py-1 border-b border-slate-800/80">
            <Link
              href="/gioi-thieu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-2 text-white font-bold hover:bg-slate-800 rounded-xs"
            >
              <span>GIỚI THIỆU VỀ HỘI</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>
            <div className="pl-4 space-y-1 text-slate-300 text-[11px] pt-1">
              <Link href="/gioi-thieu?tab=INTRO" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Tôn chỉ & Mục đích
              </Link>
              <Link href="/gioi-thieu?tab=LEADERS" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Lãnh đạo Trung ương Hội
              </Link>
              <Link href="/gioi-thieu?tab=CHARTER" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Điều lệ hoạt động
              </Link>
            </div>
          </div>

          <div className="py-1 border-b border-slate-800/80">
            <Link
              href="/tin-tuc"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-2 text-white font-bold hover:bg-slate-800 rounded-xs"
            >
              <span>TIN TỨC - THỜI SỰ 24/7</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>
            <div className="pl-4 space-y-1 text-slate-300 text-[11px] pt-1">
              <Link href="/tin-tuc?category=Sự kiện Trung ương Hội" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Sự kiện lớn Trung ương Hội
              </Link>
              <Link href="/tin-tuc?category=Thời sự 24/7" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Thời sự Y tế 24/7
              </Link>
              <Link href="/tin-tuc?category=Viện - Trường Đào tạo" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Viện - Trường & Học đường
              </Link>
              <Link href="/tin-tuc?category=Chính sách %26 Pháp luật" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Chính sách & Pháp luật
              </Link>
              <Link href="/tin-tuc?category=Thiện nguyện vì sức khỏe" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Hoạt động Đơn vị & Thiện nguyện
              </Link>
            </div>
          </div>

          <div className="py-1 border-b border-slate-800/80">
            <Link
              href="/he-thong-to-chuc"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-2 text-white font-bold hover:bg-slate-800 rounded-xs"
            >
              <span>HỆ THỐNG TỔ CHỨC CƠ SỞ</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>
            <div className="pl-4 space-y-1 text-slate-300 text-[11px] pt-1">
              <Link href="/he-thong-to-chuc?type=CENTRAL_OFFICE" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Cơ quan Trung ương & Các ban
              </Link>
              <Link href="/he-thong-to-chuc?type=BRANCH" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Hệ thống Chi hội tỉnh thành
              </Link>
              <Link href="/he-thong-to-chuc?type=INSTITUTE" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Viện & Trung tâm trực thuộc
              </Link>
              <Link href="/he-thong-to-chuc?type=ENTERPRISE" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Đơn vị thành viên & Doanh nghiệp
              </Link>
            </div>
          </div>

          <div className="py-1 border-b border-slate-800/80">
            <Link
              href="/nhan-su"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-2 text-white font-bold hover:bg-slate-800 rounded-xs"
            >
              <span>NHÂN SỰ & HỘI VIÊN</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            </Link>
            <div className="pl-4 space-y-1 text-slate-300 text-[11px] pt-1">
              <Link href="/nhan-su?role=BCH" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Ban Chấp hành Trung ương
              </Link>
              <Link href="/nhan-su?role=BTV" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-white">
                • Ban Thường vụ Trung ương
              </Link>
              <Link href="/dang-ky-hoi-vien" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 text-amber-300 font-bold hover:text-white">
                • Đăng ký gia nhập Hội viên trực tuyến
              </Link>
            </div>
          </div>

          <Link
            href="/van-ban"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-2 rounded-xs border-b border-slate-800/80 hover:bg-slate-800"
          >
            <span>KHO VĂN BẢN QUAN TRỌNG</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>

          <Link
            href="/thien-nguyen"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between py-2.5 px-2 rounded-xs border-b border-slate-800/80 text-amber-300 font-bold hover:bg-slate-800"
          >
            <span>QUỸ THIỆN NGUYỆN & SAO KÊ</span>
            <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>

          <div className="pt-2 flex flex-col sm:flex-row gap-2">
            <Link
              href="/dang-ky-hoi-vien"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-amber-600 hover:bg-amber-700 text-center rounded-xs text-white font-bold flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <UserCheck className="w-4 h-4" /> ĐĂNG KÝ HỘI VIÊN
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 bg-red-700 hover:bg-red-800 text-center rounded-xs text-white font-bold flex items-center justify-center gap-1.5 shadow-2xs"
            >
              <LogIn className="w-4 h-4" /> CỔNG ĐIỀU HÀNH NỘI BỘ
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import HeroNewsSlider from "@/components/home/HeroNewsSlider";
import NewsStreamAndSchedule from "@/components/home/NewsStreamAndSchedule";
import QuickActionStrip from "@/components/home/QuickActionStrip";
import RegionalNewsCarousel from "@/components/home/RegionalNewsCarousel";
import OrganizationNetworkSection from "@/components/home/OrganizationNetworkSection";
import CharityAndFeeSection from "@/components/home/CharityAndFeeSection";
import {
  MOCK_LEADERSHIP,
  MOCK_ORGANIZATIONS,
  MOCK_DOCUMENTS,
  MOCK_NEWS,
} from "@/lib/mock-data";
import {
  FileText,
  Building2,
  Users,
  HeartHandshake,
  ArrowRight,
  Download,
  Calendar,
  CheckCircle2,
  QrCode,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
  Bell,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";


export default function HomePage() {

  return (
    <>
      <PublicHeader />

      <main className="flex-1 bg-[#f8fafc]">
        {/* =========================================================
            1. TICKER: DÒNG TIN CHỈ ĐẠO ĐIỀU HÀNH CHÍNH THỨC
        ========================================================= */}
        <div className="bg-[#fffbeb] border-b border-amber-200 py-2 px-4 text-xs overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <span className="bg-[#991b1b] text-white font-bold px-2.5 py-0.5 rounded-xs text-[11px] uppercase shrink-0 flex items-center gap-1 font-gov shadow-xs">
              <Bell className="w-3.5 h-3.5 text-amber-300" /> THÔNG BÁO TRUNG ƯƠNG
            </span>
            <div className="overflow-hidden whitespace-nowrap flex-1">
              <div className="animate-marquee text-slate-800 text-[12px] font-medium font-gov">
                • Triệu tập Hội nghị Ban Chấp hành Trung ương Hội nhiệm kỳ IV nhằm sơ kết công tác 9 tháng đầu năm 2026 &nbsp;&nbsp;&nbsp;&nbsp;
                • Ban hành Thông báo số 89/Thông báo-Trung ương về chế độ báo cáo trực tuyến và thu nộp niên liễm hội phí năm 2026 &nbsp;&nbsp;&nbsp;&nbsp;
                • Phát động phong trào "Mỗi hội viên - Một hành động vì sức khỏe gia đình và cộng đồng"
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================
            2. KHỐI BÁO CHÍ & TIÊU ĐIỂM CHÍNH (HERO SECTION - TỶ LỆ VÀNG 68/32)
        ========================================================= */}
        <section className="max-w-7xl mx-auto px-4 pt-6 pb-2">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Cột trái (68%): Slider Tin Tiêu Điểm với hiệu ứng lướt sang phải */}
            <div className="lg:col-span-8 flex flex-col">
              <HeroNewsSlider />
            </div>

            {/* Cột phải (32%): Dòng Thời Sự 24/7 & Lịch Công Tác Thường Trực */}
            <div className="lg:col-span-4 flex flex-col">
              <NewsStreamAndSchedule />
            </div>
          </div>
        </section>

        {/* =========================================================
            3. DẢI TIỆN ÍCH CÔNG VỤ 1 CHẠM (QUICK ACTION STRIP - 4 CỘT)
        ========================================================= */}
        <div className="py-2 sm:py-4">
          <QuickActionStrip />
        </div>

        {/* =========================================================
            4. CAROUSEL DÒNG SỰ KIỆN 63 TỈNH THÀNH (LƯỚT NGANG SANG PHẢI)
        ========================================================= */}
        <div className="py-2 sm:py-4">
          <RegionalNewsCarousel />
        </div>

        {/* =========================================================
            THÔNG ĐIỆP CHỦ TỊCH TRUNG ƯƠNG HỘI (TOÀN CHIỀU RỘNG TRANG TRỌNG)
        ========================================================= */}
        <section className="bg-gradient-to-r from-[#fefbf6] via-[#fffdf9] to-[#fefbf6] border-y border-amber-200/80 py-10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white border border-amber-300/80 rounded-xs p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
              {/* Dải chỉ đỏ trang trọng phía trên */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#991b1b] via-[#b45309] to-[#991b1b]" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Cột trái: Ảnh chân dung Chủ tịch và Danh xưng đầy đủ */}
                <div className="lg:col-span-4 flex flex-col items-center text-center sm:flex-row sm:items-center sm:text-left lg:flex-col lg:items-center lg:text-center gap-5 border-b sm:border-b-0 lg:border-r border-amber-200/70 pb-6 sm:pb-0 lg:pr-8">
                  <div className="relative shrink-0">
                    <img
                      src="/images/lanh-dao-nguyen-hong-quan.jpg"
                      alt="Đồng chí Nguyễn Hồng Quân - Chủ tịch Trung ương Hội"
                      className="w-36 h-36 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-[#991b1b] shadow-md"
                    />
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#991b1b] text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap shadow-xs font-gov">
                      Thường Trực Hội
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif leading-tight">
                      Đồng chí Nguyễn Hồng Quân
                    </h3>
                    <p className="text-xs sm:text-sm font-semibold text-[#991b1b] font-gov">
                      Chủ tịch Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam
                    </p>
                    <p className="text-xs text-slate-600 font-gov leading-relaxed max-w-xs">
                      Nguyên Ủy viên Ban Chấp hành Trung ương Đảng, Nguyên Bộ trưởng Bộ Xây dựng
                    </p>
                  </div>
                </div>

                {/* Cột phải: Lời huấn thị và định hướng phát triển */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-1 bg-[#991b1b]" />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#991b1b] font-gov">
                      Thông Điệp Thường Trực Đoàn Chủ Tịch
                    </span>
                  </div>

                  <div className="relative pl-6 sm:pl-8 border-l-2 border-[#b45309]/50">
                    <span className="absolute -top-3 -left-3 text-4xl sm:text-5xl text-[#b45309]/30 font-serif select-none pointer-events-none leading-none">
                      “
                    </span>
                    <blockquote className="space-y-3 font-serif text-slate-800 text-sm sm:text-base lg:text-[17px] leading-relaxed text-left">
                      <p>
                        Chăm sóc, bảo vệ và nâng cao sức khỏe nhân dân là nhiệm vụ thiêng liêng, cao cả và là trách nhiệm chung của toàn xã hội. Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam luôn là nhịp cầu gắn kết sức mạnh nhân dân, lấy y tế dự phòng và giáo dục truyền thông sức khỏe làm nền tảng cho sự nghiệp bồi dưỡng thể lực, trí lực và nòi giống Việt Nam bền vững.
                      </p>
                      <p className="text-slate-700 text-xs sm:text-sm lg:text-[15px]">
                        Mỗi cán bộ, hội viên, y bác sĩ và tình nguyện viên từ Trung ương Hội tới các Liên Chi hội, Chi hội địa phương cần nêu cao tinh thần tâm huyết, phụng sự cộng đồng, đồng lòng cùng ngành y tế xây dựng phong trào tự chăm sóc sức khỏe lan tỏa sâu rộng trong mọi gia đình và toàn xã hội.
                      </p>
                    </blockquote>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-amber-200/60 font-gov">
                    <span className="text-slate-500 italic">
                      — Trích phát biểu chỉ đạo của Đồng chí Chủ tịch tại Hội nghị Thường vụ Trung ương Hội
                    </span>
                    <Link
                      href="/gioi-thieu"
                      className="inline-flex items-center gap-1 font-bold text-[#991b1b] hover:underline hover:text-red-800"
                    >
                      Xem toàn văn tôn chỉ mục đích và cơ cấu Hội &raquo;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* =========================================================
            3. KHỐI CÔNG BÁO & VĂN BẢN QUAN TRỌNG (MẢNG I)
        ========================================================= */}
        <section className="bg-white border-y border-slate-300 py-10">
          <div className="max-w-7xl mx-auto px-4 space-y-5">
            <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b-2 border-[#991b1b] pb-2.5 gap-2">
              <div className="section-header-gov text-base sm:text-lg">
                VĂN BẢN CHỈ ĐẠO CỦA TRUNG ƯƠNG HỘI
              </div>

              <Link
                href="/van-ban"
                className="text-xs font-bold text-[#991b1b] hover:underline flex items-center gap-1 shrink-0 font-gov"
              >
                Toàn bộ kho văn bản &raquo;
              </Link>
            </div>

            <div className="border border-slate-300 rounded-xs overflow-x-auto">
              <table className="w-full text-left text-xs font-gov min-w-[500px] sm:min-w-full">
                <thead className="bg-[#f1f5f9] text-slate-800 font-bold border-b border-slate-300 uppercase text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 w-44">Số / Ký Hiệu</th>
                    <th className="py-2.5 px-3">Trích Yếu Nội Dung Văn Bản</th>
                    <th className="py-2.5 px-3 w-52 hidden md:table-cell">Cơ Quan Ban Hành</th>
                    <th className="py-2.5 px-3 w-32 hidden sm:table-cell">Ngày Ban Hành</th>
                    <th className="py-2.5 px-3 text-center w-28">Tải Về</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {MOCK_DOCUMENTS.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#991b1b] whitespace-nowrap">
                        {doc.code}
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-900 font-serif">
                        <Link href="/van-ban" className="hover:text-[#991b1b] transition-colors">
                          {doc.title}
                        </Link>
                      </td>
                      <td className="py-3 px-3 text-slate-600 hidden md:table-cell whitespace-nowrap">
                        {doc.issuer}
                      </td>
                      <td className="py-3 px-3 text-slate-500 font-mono hidden sm:table-cell whitespace-nowrap">
                        {doc.issuedDate}
                      </td>
                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <Link
                          href="/van-ban"
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-[#991b1b] hover:bg-red-100 rounded-xs font-bold border border-red-200"
                        >
                          <Download className="w-3 h-3" /> PDF
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* =========================================================
            4. HỆ THỐNG TỔ CHỨC & BẢN ĐỒ MẠNG LƯỚI QUỐC GIA (MẢNG III)
        ========================================================= */}
        <OrganizationNetworkSection />


        {/* =========================================================
            5. QUỸ THIỆN NGUYỆN & HỘI PHÍ VIETQR CHUẨN NGÂN HÀNG (MẢNG V)
        ========================================================= */}
        <CharityAndFeeSection />

      </main>

      <PublicFooter />
    </>
  );
}

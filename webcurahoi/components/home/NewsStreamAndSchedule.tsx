"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_NEWS, MOCK_SCHEDULE } from "@/lib/mock-data";
import {
  Clock,
  Calendar,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  UserCheck,
  Building2,
  Sparkles,
} from "lucide-react";

export default function NewsStreamAndSchedule() {
  const [activeTab, setActiveTab] = useState<"NEWS_STREAM" | "SCHEDULE" | "TRAINING" | "CONTACT">("NEWS_STREAM");

  // Dòng thời sự 24/7: Lấy các bài viết thời sự & sự kiện mới nhất
  const newsStream = MOCK_NEWS.filter(
    (n) => n.category === "Thời sự 24/7" || n.category === "Sự kiện Trung ương Hội"
  ).slice(0, 5);

  // Lịch công tác tuần: Lấy từ MOCK_SCHEDULE
  const scheduleItems = MOCK_SCHEDULE.slice(0, 5);

  // Khối Viện - Trường Đào tạo & Y tế học đường
  const trainingNews = MOCK_NEWS.filter((n) => n.category === "Viện - Trường Đào tạo").slice(0, 5);

  return (
    <div className="bg-white border border-slate-300 rounded-xs shadow-xs flex flex-col font-gov h-full">
      {/* 1. THANH TAB ĐIỀU HƯỚNG CÔNG VỤ (4 PHÂN HỆ RÕ RÀNG) */}
      <div className="flex border-b border-slate-300 bg-[#f8fafc] text-[10.5px] sm:text-xs font-bold divide-x divide-slate-200">
        <button
          onClick={() => setActiveTab("NEWS_STREAM")}
          className={`flex-1 py-2.5 sm:py-3 px-1 sm:px-1.5 text-center border-b-2 transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === "NEWS_STREAM"
              ? "border-[#991b1b] text-[#991b1b] bg-white shadow-xs font-bold"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="hidden sm:inline">Thời Sự 24/7</span>
          <span className="sm:hidden">Thời Sự</span>
        </button>

        <button
          onClick={() => setActiveTab("SCHEDULE")}
          className={`flex-1 py-2.5 sm:py-3 px-1 sm:px-1.5 text-center border-b-2 transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === "SCHEDULE"
              ? "border-[#991b1b] text-[#991b1b] bg-white shadow-xs font-bold"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="hidden sm:inline">Lịch Công Tác</span>
          <span className="sm:hidden">Lịch Tuần</span>
        </button>

        <button
          onClick={() => setActiveTab("TRAINING")}
          className={`flex-1 py-2.5 sm:py-3 px-1 sm:px-1.5 text-center border-b-2 transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === "TRAINING"
              ? "border-[#991b1b] text-[#991b1b] bg-white shadow-xs font-bold"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
        >
          <GraduationCap className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="hidden sm:inline">Viện - Trường</span>
          <span className="sm:hidden">Đào Tạo</span>
        </button>

        <button
          onClick={() => setActiveTab("CONTACT")}
          className={`py-2.5 sm:py-3 px-2 sm:px-2.5 text-center border-b-2 transition-all flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === "CONTACT"
              ? "border-[#991b1b] text-[#991b1b] bg-white shadow-xs font-bold"
              : "border-transparent text-slate-600 hover:text-slate-900"
          }`}
          title="Thông tin cơ quan thường trực"
        >
          <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="hidden xs:inline">Thường Trực</span>
        </button>
      </div>

      {/* 2. NỘI DUNG THEO TỪNG TAB */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* TAB 1: DÒNG THỜI SỰ 24/7 */}
        {activeTab === "NEWS_STREAM" && (
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="divide-y divide-slate-100 space-y-2.5">
              {newsStream.map((news) => (
                <article key={news.id} className="pt-2.5 first:pt-0 group">
                  <div className="flex items-center gap-2 text-[10.5px] font-mono text-slate-400 mb-1">
                    <span className="text-[#991b1b] font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {news.date}
                    </span>
                    <span>•</span>
                    <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded-xs font-sans text-[10px] font-medium">
                      {news.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 group-hover:text-[#991b1b] transition-colors leading-snug line-clamp-2 font-serif">
                    <Link href={`/tin-tuc/${news.id}`}>{news.title}</Link>
                  </h3>
                </article>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs">
              <Link
                href="/tin-tuc?category=Thời sự 24/7"
                className="text-[#991b1b] font-bold hover:underline flex items-center justify-between"
              >
                <span>Xem toàn bộ dòng tin thời sự 24/7</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 2: LỊCH CÔNG TÁC THƯỜNG TRỰC */}
        {activeTab === "SCHEDULE" && (
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="space-y-2.5 divide-y divide-slate-100">
              {scheduleItems.map((sch, i) => (
                <div key={i} className="pt-2.5 first:pt-0 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-mono text-[10.5px]">
                    <span className="font-bold text-[#991b1b]">{sch.date}</span>
                    <span className="bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded-xs font-bold">
                      {sch.time}
                    </span>
                  </div>
                  <p className="font-medium text-slate-800 leading-snug font-serif">
                    {sch.content}
                  </p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 italic">
                    <span>Chủ trì: {sch.chairperson}</span>
                    {sch.location && <span className="font-sans not-italic text-[10px] text-slate-400 truncate max-w-[140px]">{sch.location}</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 text-[11px] text-slate-500 italic flex justify-between items-center">
              <span>* Lịch tuần của Thường trực Trung ương Hội</span>
              <span className="text-[#991b1b] font-semibold not-italic text-[11px] font-gov">Nhiệm kỳ IV</span>
            </div>
          </div>
        )}

        {/* TAB 3: KHỐI VIỆN - TRƯỜNG ĐÀO TẠO & Y TẾ HỌC ĐƯỜNG */}
        {activeTab === "TRAINING" && (
          <div className="space-y-3 flex-1 flex flex-col justify-between">
            <div className="divide-y divide-slate-100 space-y-2.5">
              {trainingNews.map((news) => (
                <article key={news.id} className="pt-2.5 first:pt-0 group">
                  <div className="flex items-center gap-2 text-[10.5px] font-mono text-slate-400 mb-1">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <GraduationCap className="w-3 h-3" /> Đào tạo
                    </span>
                    <span>•</span>
                    <span className="text-slate-500">{news.date}</span>
                  </div>
                  <h3 className="font-bold text-xs text-slate-900 group-hover:text-[#991b1b] transition-colors leading-snug line-clamp-2 font-serif">
                    <Link href={`/tin-tuc/${news.id}`}>{news.title}</Link>
                  </h3>
                </article>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 text-xs">
              <Link
                href="/tin-tuc?category=Viện - Trường Đào tạo"
                className="text-[#991b1b] font-bold hover:underline flex items-center justify-between"
              >
                <span>Xem chuyên đề Viện - Trường & Học đường</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* TAB 4: CƠ QUAN THƯỜNG TRỰC & LIÊN HỆ */}
        {activeTab === "CONTACT" && (
          <div className="space-y-3.5 flex-1 flex flex-col justify-between text-xs text-slate-700">
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-2">
                <span className="font-bold text-[#991b1b] text-xs block uppercase">
                  Văn Phòng Trung Ương Hội
                </span>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#991b1b] shrink-0 mt-0.5" />
                  <span>Tầng 5, Cung Trí Thức Hà Nội, Số 1 Tôn Thất Thuyết, Cầu Giấy, Hà Nội</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#991b1b] shrink-0" />
                  <span>Đường dây nóng: <strong className="text-slate-900 font-mono">024.3782.3556</strong></span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#991b1b] shrink-0" />
                  <span>Email: <strong className="text-slate-900">vanphong@vache.org.vn</strong></span>
                </p>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xs space-y-2">
                <span className="font-bold text-[#991b1b] text-xs block uppercase">
                  Cơ Quan Đại Diện Phía Nam
                </span>
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#991b1b] shrink-0 mt-0.5" />
                  <span>Số 67 Bình Lợi, Phường Thạnh Mỹ Tây, Quận Bình Thạnh, TP. Hồ Chí Minh</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#991b1b] shrink-0" />
                  <span>Điện thoại: <strong className="text-slate-900 font-mono">028.3925.8899</strong></span>
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <Link
                href="/dang-ky-hoi-vien"
                className="w-full py-2.5 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5" /> Đăng Ký Gia Nhập Hội Viên
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

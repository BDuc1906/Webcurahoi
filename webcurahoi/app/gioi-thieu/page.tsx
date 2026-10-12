"use client";

import React, { useState, useEffect, Suspense } from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { MOCK_LEADERSHIP } from "@/lib/mock-data";
import {
  ShieldCheck,
  Award,
  BookOpen,
  Calendar,
  FileText,
  Users,
  CheckCircle2,
  ChevronRight,
  Download,
} from "lucide-react";

function AboutPageContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [activeTab, setActiveTab] = useState<"INTRO" | "LEADERS" | "CHARTER">(() => {
    if (tabParam === "LEADERS") return "LEADERS";
    if (tabParam === "CHARTER") return "CHARTER";
    return "INTRO";
  });

  useEffect(() => {
    if (tabParam === "LEADERS") setActiveTab("LEADERS");
    else if (tabParam === "CHARTER") setActiveTab("CHARTER");
    else if (tabParam === "INTRO") setActiveTab("INTRO");
  }, [tabParam]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-12 flex-1 space-y-8 font-gov">
        {/* Header Breadcrumb & Title */}
        <div>
          <span className="text-xs font-bold text-red-700 uppercase tracking-wider block">
            Mảng I: Thông Tin Chung Về Hội
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-serif">
            GIỚI THIỆU TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Tôn chỉ mục đích, Thường trực Ban Lãnh đạo Hội, Quyết định thành lập và Điều lệ Hội được Bộ trưởng Bộ Nội vụ phê duyệt.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-300 gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab("INTRO")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "INTRO"
                ? "border-red-700 text-red-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" /> 1. Giới Thiệu Chung và Quá Trình Phát Triển
          </button>
          <button
            onClick={() => setActiveTab("LEADERS")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "LEADERS"
                ? "border-red-700 text-red-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="w-4 h-4" /> 2. Ban Thường Trực Lãnh Đạo Trung Ương Hội
          </button>
          <button
            onClick={() => setActiveTab("CHARTER")}
            className={`pb-3 flex items-center gap-2 border-b-2 transition-all ${
              activeTab === "CHARTER"
                ? "border-red-700 text-red-800"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileText className="w-4 h-4" /> 3. Điều Lệ và Quyết Định Thành Lập
          </button>
        </div>

        {/* TAB 1: GIỚI THIỆU CHUNG */}
        {activeTab === "INTRO" && (
          <div className="bg-white rounded-xs border border-slate-300 shadow-xs p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex items-center gap-2 font-serif">
                <ShieldCheck className="w-5 h-5 text-red-700" /> Tôn Chỉ và Mục Đích Hoạt Động
              </h3>
              <p className="text-left leading-relaxed font-serif text-slate-800 text-[15px]">
                <strong>Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam</strong> là tổ chức xã hội - nghề nghiệp của các tổ chức, cá nhân Việt Nam tự nguyện thành lập, nhằm mục đích tập hợp, đoàn kết hội viên, bảo vệ quyền, lợi ích hợp pháp của hội viên; hỗ trợ nhau hoạt động có hiệu quả trong việc giáo dục nâng cao nhận thức và chăm sóc sức khỏe cộng đồng, góp phần vào sự nghiệp chăm sóc, bảo vệ và nâng cao sức khỏe nhân dân.
              </p>
              <p className="text-left leading-relaxed text-slate-700 text-sm">
                Hội hoạt động trên phạm vi cả nước, theo Điều lệ Hội được Bộ trưởng Bộ Nội vụ phê duyệt, tuân thủ quy định của pháp luật Việt Nam, chịu sự quản lý nhà nước của Bộ Nội vụ, sự quản lý về lĩnh vực hoạt động chính của Bộ Y tế và các Bộ, ngành có liên quan.
              </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
              <div className="p-4 bg-slate-50 rounded-xs border border-slate-200 space-y-2">
                <div className="text-red-700 font-bold text-sm flex items-center gap-2 font-gov">
                  <Award className="w-4 h-4" /> Sứ Mệnh Cao Cả
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Lan tỏa kiến thức y tế dự phòng, dinh dưỡng hợp lý, rèn luyện thể chất đến từng gia đình, trường học và khu dân cư trên toàn quốc.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xs border border-slate-200 space-y-2">
                <div className="text-red-700 font-bold text-sm flex items-center gap-2 font-gov">
                  <Users className="w-4 h-4" /> Mạng Lưới Rộng Khắp
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Quy tụ đông đảo đội ngũ giáo sư, tiến sĩ, thầy thuốc ưu tú, cán bộ y tế và hàng vạn hội viên tâm huyết vì sự nghiệp sức khỏe toàn dân.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xs border border-slate-200 space-y-2">
                <div className="text-red-700 font-bold text-sm flex items-center gap-2 font-gov">
                  <CheckCircle2 className="w-4 h-4" /> Trọng Tâm Hành Động
                </div>
                <p className="text-xs text-slate-600 leading-normal">
                  Chăm sóc sức khỏe người cao tuổi, phụ nữ, trẻ em; phát triển y học cổ truyền kết hợp y học hiện đại và ứng dụng khoa học công nghệ.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BAN THƯỜNG TRỰC LÃNH ĐẠO */}
        {activeTab === "LEADERS" && (
          <div className="space-y-6">
            <div className="bg-white rounded-xs border border-slate-300 shadow-xs p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-slate-200 pb-3 mb-6 gap-2">
                <h3 className="font-bold text-base sm:text-lg text-slate-900 font-serif">
                  Thường Trực Ban Lãnh Đạo & Ban Thường Vụ Trung Ương Hội (Nhiệm kỳ IV)
                </h3>
                <Link
                  href="/nhan-su"
                  className="text-xs font-bold text-[#991b1b] hover:underline flex items-center gap-1 font-gov"
                >
                  Xem toàn bộ Ban Chấp hành 63 tỉnh thành &raquo;
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_LEADERSHIP.filter(l => l.isBtv).map((leader) => (
                  <div
                    key={leader.id}
                    className="bg-slate-50 rounded-xs p-5 border border-slate-200 text-center space-y-3 hover:border-red-400 transition-colors shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <img
                        src={leader.avatarUrl}
                        alt={leader.fullName}
                        className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-[#991b1b] shadow-sm"
                      />
                      <div>
                        <h4 className="font-bold text-base text-slate-900 font-serif">{leader.fullName}</h4>
                        <p className="text-xs text-[#991b1b] font-bold mt-0.5">{leader.position}</p>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{leader.academicTitle}</p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500 space-y-1 font-gov">
                      <p>Điện thoại: {leader.phone}</p>
                      <p>Email: {leader.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ĐIỀU LỆ VÀ QUYẾT ĐỊNH THÀNH LẬP */}
        {activeTab === "CHARTER" && (
          <div className="bg-white rounded-xs border border-slate-300 shadow-xs p-6 sm:p-8 space-y-6 text-xs text-slate-700">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3 font-serif">
              Văn Bản Pháp Lý Nền Tảng Của Hội
            </h3>

            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-xs border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div className="space-y-1">
                  <span className="font-mono text-red-700 font-bold">Số: 128/Quyết định-Bộ Nội vụ (25/12/2008)</span>
                  <h4 className="font-bold text-sm text-slate-900 font-serif">
                    Quyết định cho phép thành lập Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam
                  </h4>
                  <p className="text-slate-500">Cơ quan ban hành: Bộ Nội vụ • Ký bởi: Bộ trưởng Bộ Nội vụ</p>
                </div>
                <button className="px-3 py-1.5 bg-red-700 text-white rounded-xs font-bold hover:bg-red-800 flex items-center gap-1.5 self-start sm:self-auto shrink-0">
                  <Download className="w-3.5 h-3.5" /> Xem PDF
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-xs border border-slate-200 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div className="space-y-1">
                  <span className="font-mono text-red-700 font-bold">Số: 01/Điều lệ-Trung ương (2021)</span>
                  <h4 className="font-bold text-sm text-slate-900 font-serif">
                    Điều lệ Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam (Đại hội khóa IV thông qua)
                  </h4>
                  <p className="text-slate-500">Gồm 8 Chương và 28 Điều quy định chức năng, nhiệm vụ, quyền hạn và nghĩa vụ hội viên</p>
                </div>
                <button className="px-3 py-1.5 bg-red-700 text-white rounded-xs font-bold hover:bg-red-800 flex items-center gap-1.5 self-start sm:self-auto shrink-0">
                  <Download className="w-3.5 h-3.5" /> Xem PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
  );
}

export default function AboutPage() {
  return (
    <>
      <PublicHeader />
      <Suspense fallback={<div className="p-12 text-center text-xs text-slate-500 font-gov">Đang tải trang giới thiệu...</div>}>
        <AboutPageContent />
      </Suspense>
      <PublicFooter />
    </>
  );
}


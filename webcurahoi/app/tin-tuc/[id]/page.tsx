"use client";

import React, { use } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import { MOCK_NEWS } from "@/lib/mock-data";
import { Calendar, ChevronLeft, Share2, User } from "lucide-react";

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const article = MOCK_NEWS.find((n) => n.id === resolvedParams.id) || MOCK_NEWS[0];

  return (
    <>
      <PublicHeader />

      <main className="max-w-4xl mx-auto px-4 py-12 flex-1 space-y-6 font-gov">
        <Link
          href="/tin-tuc"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#991b1b] hover:underline"
        >
          <ChevronLeft className="w-4 h-4" /> Quay lại Danh sách Tin tức & Sự kiện
        </Link>

        <article className="bg-white rounded-xs border border-slate-300 shadow-xs p-4 sm:p-10 space-y-6">
          <div className="space-y-3 border-b border-slate-200 pb-4">
            <span className="inline-block px-3 py-1 bg-red-50 text-[#991b1b] rounded-xs text-xs font-bold border border-red-200 uppercase font-gov">
              {article.category}
            </span>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 leading-snug font-serif">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1 text-[#991b1b] font-bold">
                <Calendar className="w-3.5 h-3.5" /> {article.date}
              </span>
              <span className="hidden sm:inline">|</span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" /> Ban Biên Tập Cổng TTĐT
              </span>
            </div>
          </div>

          <div className="rounded-xs overflow-hidden shadow-xs border border-slate-200">
            <img src={article.image} alt={article.title} className="w-full object-cover max-h-[420px]" />
          </div>

          <div className="font-semibold text-slate-800 text-sm sm:text-base leading-relaxed bg-amber-50/50 p-4 rounded-xs border-l-4 border-[#991b1b] font-serif">
            {article.excerpt}
          </div>

          <div className="space-y-4 text-sm text-slate-800 leading-relaxed font-serif text-justify">
            <p>
              Nhằm đẩy mạnh việc thực hiện chủ trương xã hội hóa công tác y tế, giáo dục nâng cao nhận thức của người dân về tự bảo vệ và chăm sóc sức khỏe, Ban Thường trực Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam đã chủ trì phối hợp cùng các bộ, ban ngành liên quan triển khai chuỗi chương trình hành động thiết thực trên phạm vi toàn quốc.
            </p>
            <p>
              Tại các diễn đàn và hội nghị cơ sở, đại diện lãnh đạo các Chi hội địa phương đã nhất trí cao với phương hướng hoạt động trong giai đoạn tới, tập trung vào việc kiện toàn bộ máy tổ chức các Chi hội địa phương, phát triển các Viện nghiên cứu ứng dụng khoa học công nghệ y sinh học và tăng cường truyền thông kiến thức phòng chống các bệnh không lây nhiễm như tim mạch, tiểu đường, xương khớp trong cộng đồng.
            </p>
            <p>
              Bên cạnh đó, phong trào "Mỗi hội viên là một tuyên truyền viên giáo dục sức khỏe tại gia đình và cộng đồng" đang tiếp tục được nhân rộng, đưa các kiến thức dưỡng sinh cổ truyền, bảo tồn cây thuốc nam và rèn luyện thể chất lan tỏa sâu rộng trong đời sống nhân dân.
            </p>
            <p>
              Hội cũng kêu gọi toàn thể hội viên cá nhân và các doanh nghiệp hội viên tiếp tục đồng hành, đóng góp nguồn lực cho các quỹ thiện nguyện y tế, hướng đến mục tiêu nâng cao chất lượng nòi giống và thể trạng của người dân Việt Nam.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-wrap justify-between items-center gap-3 text-xs text-slate-500 font-gov">
            <span>Nguồn: <strong>Văn phòng Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam</strong></span>
            <button
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Đã sao chép liên kết bài viết!");
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-xs font-semibold text-slate-700 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-[#991b1b]" /> Chia sẻ bài viết
            </button>
          </div>
        </article>
      </main>

      <PublicFooter />
    </>
  );
}

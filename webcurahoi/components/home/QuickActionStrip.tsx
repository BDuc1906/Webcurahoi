"use client";

import React from "react";
import Link from "next/link";
import { Users, FileText, Building2, HeartHandshake, ChevronRight } from "lucide-react";

export default function QuickActionStrip() {
  const actions = [
    {
      icon: Users,
      title: "Ban Chấp Hành Toàn Quốc",
      description: "Tra cứu danh sách lãnh đạo & ủy viên 63 tỉnh thành",
      link: "/nhan-su",
      badge: "Nhiệm kỳ IV",
    },
    {
      icon: FileText,
      title: "Kho Văn Bản Pháp Quy",
      description: "Điều lệ phê duyệt, Quyết định thành lập & Nghị quyết Hội",
      link: "/van-ban",
      badge: "Pháp lý",
    },
    {
      icon: Building2,
      title: "Cổng Báo Cáo Trực Tuyến",
      description: "Số hóa quy trình nộp báo cáo định kỳ cho các Chi hội",
      link: "/login",
      badge: "Nội bộ",
    },
    {
      icon: HeartHandshake,
      title: "Quỹ Thiện Nguyện & Hội Phí",
      description: "Nộp niên liễm & đóng góp từ thiện chuẩn VietQR Napas",
      link: "/thien-nguyen",
      badge: "Tự động 24/7",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 font-gov">
      <div className="bg-white border border-slate-300 rounded-xs shadow-xs p-3 sm:p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
          {actions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <Link
                key={idx}
                href={act.link}
                className="pt-3 sm:pt-0 sm:px-4 first:pt-0 first:px-0 flex items-start gap-3.5 group hover:text-[#991b1b] transition-colors"
              >
                <div className="w-10 h-10 rounded-xs bg-red-50 border border-red-200 group-hover:bg-[#991b1b] text-[#991b1b] group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-xs sm:text-[13px] text-slate-900 group-hover:text-[#991b1b] transition-colors truncate">
                      {act.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {act.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#991b1b] group-hover:translate-x-0.5 transition-all shrink-0 mt-2 hidden sm:block" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

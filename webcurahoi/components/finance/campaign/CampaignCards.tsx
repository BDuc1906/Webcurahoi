"use client";

import React from "react";
import {
  Target,
  TrendingUp,
  Users,
  ArrowRight,
  HeartHandshake,
  Inbox,
} from "lucide-react";
import { Campaign } from "@/lib/mock-campaigns-data";
import { useCampaigns } from "@/hooks/useCampaigns";

export default function CampaignCards() {
  const { campaigns, loading } = useCampaigns();

  return (
    <section className="space-y-4">
      <div className="border-b-2 border-[#991b1b] pb-2 flex flex-col sm:flex-row justify-between sm:items-end gap-2">
        <div>
          <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider block">
            Trụ Cột 3 — Chiến Dịch Thiện Nguyện Y Tế Trọng Điểm
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif">
            CÁC QUỸ ĐANG VẬN ĐỘNG & TIẾN ĐỘ QUYÊN GÓP
          </h2>
        </div>
      </div>

      {loading ? (
        <div className="p-10 text-center text-slate-400 text-sm bg-white border border-slate-300 rounded-xs">
          Đang tải danh sách chiến dịch...
        </div>
      ) : campaigns.length === 0 ? (
        <div className="p-10 text-center bg-white border border-dashed border-slate-300 rounded-xs">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="font-bold text-slate-600 text-sm">
            Chưa có chiến dịch thiện nguyện nào
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Ban Tài chính & Quỹ chưa tạo chiến dịch trong hệ thống.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {campaigns.map((c) => (
            <CampaignCard key={c.slug} campaign={c} />
          ))}
        </div>
      )}
    </section>
  );
}

function CampaignCard({ campaign }: { campaign: Campaign }) {
  const {
    name,
    description,
    targetAmount,
    raisedAmount,
    donationCount,
    disbursedAmount,
    progressPercent,
    status,
  } = campaign;

  const isActive = status === "ACTIVE";

  return (
    <article className="bg-white border border-slate-300 rounded-xs shadow-2xs hover:border-[#991b1b] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-xs border ${
              isActive
                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                : "bg-slate-100 text-slate-700 border-slate-300"
            }`}
          >
            {isActive ? "Đang vận động" : "Đã kết thúc"}
          </span>
          <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
            <Users className="w-3 h-3" /> {donationCount} lượt
          </span>
        </div>

        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <HeartHandshake className="w-4 h-4 text-[#991b1b] shrink-0 mt-0.5" />
            <h3 className="font-bold text-sm text-slate-900 font-serif leading-snug">
              {name}
            </h3>
          </div>
          <p className="text-[11px] text-slate-600 leading-snug line-clamp-3">
            {description}
          </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xs p-3 space-y-2">
          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-500 flex items-center gap-1">
              <Target className="w-3 h-3" /> Mục tiêu:
            </span>
            <strong className="text-slate-800">
              {new Intl.NumberFormat("vi-VN").format(targetAmount)} đ
            </strong>
          </div>

          <div className="flex justify-between text-[11px] font-mono">
            <span className="text-slate-500 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-[#991b1b]" /> Đã vận động:
            </span>
            <strong className="text-[#991b1b]">
              {new Intl.NumberFormat("vi-VN").format(raisedAmount)} đ
            </strong>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-[#991b1b] h-full transition-all"
              style={{ width: `${Math.min(progressPercent, 100)}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Tiến độ đạt {progressPercent}%</span>
            <span className="font-mono">
              Đã chi: {new Intl.NumberFormat("vi-VN").format(disbursedAmount)} đ
            </span>
          </div>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-slate-100 flex justify-between items-center text-xs">
        <a
          href="#cong-chuyen-khoan"
          className="text-[#991b1b] font-bold hover:underline flex items-center gap-1"
        >
          Ủng hộ chiến dịch <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <span className="text-[10px] text-slate-400 font-mono uppercase">
          VACHE
        </span>
      </div>
    </article>
  );
}
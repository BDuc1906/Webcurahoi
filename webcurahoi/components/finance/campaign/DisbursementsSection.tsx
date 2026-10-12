"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Receipt,
  Wallet,
  Building2,
  Calendar,
  Filter,
  CheckCircle2,
} from "lucide-react";
import {
  MOCK_DISBURSEMENTS,
  MOCK_CAMPAIGNS,
  Disbursement,
} from "@/lib/mock-campaigns-data";

export default function DisbursementsSection() {
  const [disbursements, setDisbursements] =
    useState<Disbursement[]>(MOCK_DISBURSEMENTS);
  const [campaignFilter, setCampaignFilter] = useState<string>("ALL");

  useEffect(() => {
    setDisbursements(MOCK_DISBURSEMENTS);
  }, []);

  const filtered = useMemo(() => {
    if (campaignFilter === "ALL") return disbursements;
    return disbursements.filter((d) => d.campaignSlug === campaignFilter);
  }, [disbursements, campaignFilter]);

  const totalDisbursed = useMemo(
    () => filtered.reduce((acc, d) => acc + d.amount, 0),
    [filtered]
  );

  return (
    <section className="bg-white border border-slate-300 rounded-xs shadow-2xs overflow-hidden">
      <div className="p-5 border-b border-slate-200 bg-slate-50">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xs bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider block">
                Minh Bạch Hai Chiều — Báo Cáo Chi Tiền
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                BÁO CÁO GIẢI NGÂN THỰC TẾ
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Công khai mọi khoản chi tiền cứu trợ y tế tới đúng đối tượng thụ
                hưởng
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">
              Tổng đã chi:
            </span>
            <span className="font-mono font-black text-emerald-700 text-lg">
              {new Intl.NumberFormat("vi-VN").format(totalDisbursed)} đ
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-slate-200">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-[11px] font-bold text-slate-700">
            Lọc theo chiến dịch:
          </span>
          <button
            onClick={() => setCampaignFilter("ALL")}
            className={`px-2.5 py-1 rounded-xs text-[11px] font-bold border transition-colors cursor-pointer ${
              campaignFilter === "ALL"
                ? "bg-emerald-700 text-white border-emerald-700"
                : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
            }`}
          >
            Tất cả ({disbursements.length})
          </button>
          {MOCK_CAMPAIGNS.map((c) => {
            const count = disbursements.filter(
              (d) => d.campaignSlug === c.slug
            ).length;
            return (
              <button
                key={c.slug}
                onClick={() => setCampaignFilter(c.slug)}
                className={`px-2.5 py-1 rounded-xs text-[11px] font-bold border transition-colors cursor-pointer truncate max-w-[220px] ${
                  campaignFilter === c.slug
                    ? "bg-emerald-700 text-white border-emerald-700"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
                title={c.name}
              >
                {c.name.split("—")[0].trim()} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-gov min-w-[720px]">
          <thead className="bg-[#f8fafc] text-slate-800 font-bold border-b border-slate-300 uppercase text-[10.5px] tracking-wider">
            <tr>
              <th className="py-2.5 px-3 w-32 text-center">Ngày chi</th>
              <th className="py-2.5 px-3 min-w-[220px]">Hạng mục chi</th>
              <th className="py-2.5 px-3 min-w-[200px]">Đơn vị thụ hưởng</th>
              <th className="py-2.5 px-3 w-36 text-right">Số tiền</th>
              <th className="py-2.5 px-3 w-24 text-center">Chứng từ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-slate-500 text-xs"
                >
                  Chiến dịch này chưa có đợt giải ngân nào.
                </td>
              </tr>
            ) : (
              filtered.map((d) => (
                <tr
                  key={d.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="py-2.5 px-3 text-center font-mono text-[11px] text-slate-600 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      {d.disbursedAt}
                    </span>
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="font-bold text-slate-900">{d.item}</div>
                    {d.description && (
                      <div className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                        {d.description}
                      </div>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      {d.beneficiary}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-mono font-bold text-emerald-700 whitespace-nowrap">
                    {new Intl.NumberFormat("vi-VN").format(d.amount)} đ
                  </td>
                  <td className="py-2.5 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Đã chi
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="p-3 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 italic flex items-center gap-1.5">
        <Receipt className="w-3.5 h-3.5 text-slate-400" />
        Mọi chứng từ gốc, biên bản nghiệm thu và hình ảnh trao tặng được lưu tại
        Văn phòng Trung ương Hội để phục vụ thanh tra, kiểm toán.
      </div>
    </section>
  );
}
"use client";

import React, { useState } from "react";
import {
  Trophy,
  Building2,
  User,
  Medal,
  Crown,
  Star,
  Inbox,
} from "lucide-react";
import { useHonorRoll } from "@/hooks/useHonorRoll";

type Period = "quarter" | "year";

export default function HonorRoll() {
  const [period, setPeriod] = useState<Period>("year");

  const { entries, loading } = useHonorRoll(period);

  const totalAmount = entries.reduce((acc, e) => acc + e.totalAmount, 0);

  return (
    <section className="bg-gradient-to-br from-amber-50 via-white to-amber-50 border-2 border-amber-300 rounded-xs shadow-md overflow-hidden">
      <div className="p-5 bg-gradient-to-r from-[#7a0c0c] via-[#991b1b] to-[#7a0c0c] text-white">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-amber-400 text-amber-950 flex items-center justify-center shrink-0 border-2 border-amber-200 shadow-inner">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest block">
                Bảng Vàng Danh Dự
              </span>
              <h2 className="text-lg sm:text-xl font-black font-serif">
                TRI ÂN NHÀ HẢO TÂM TIÊU BIỂU
              </h2>
              <p className="text-[11px] text-amber-100/90 mt-0.5">
                Vinh danh các Doanh nghiệp, Chi hội và Cá nhân có đóng góp thiện
                nguyện tích cực nhất
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-black/30 rounded-xs p-1 shrink-0 self-start sm:self-auto">
            <button
              onClick={() => setPeriod("quarter")}
              className={`px-3 py-1.5 rounded-xs text-[11px] font-bold transition-colors cursor-pointer ${
                period === "quarter"
                  ? "bg-amber-400 text-amber-950"
                  : "text-amber-100 hover:bg-white/10"
              }`}
            >
              Quý này
            </button>
            <button
              onClick={() => setPeriod("year")}
              className={`px-3 py-1.5 rounded-xs text-[11px] font-bold transition-colors cursor-pointer ${
                period === "year"
                  ? "bg-amber-400 text-amber-950"
                  : "text-amber-100 hover:bg-white/10"
              }`}
            >
              Cả năm 2026
            </button>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-amber-300/30 flex justify-between items-center text-[11px]">
          <span className="text-amber-100/90">
            Top {entries.length} nhà hảo tâm xuất sắc nhất
          </span>
          <span className="font-mono font-bold text-amber-200">
            Tổng: {new Intl.NumberFormat("vi-VN").format(totalAmount)} đ
          </span>
        </div>
      </div>

      {loading ? (
        <div className="p-10 text-center text-slate-500 text-sm">
          Đang tải bảng vàng...
        </div>
      ) : entries.length === 0 ? (
        <div className="p-10 text-center">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="font-bold text-slate-600 text-sm">
            Chưa có giao dịch thiện nguyện nào trong kỳ này
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Bảng vàng sẽ cập nhật khi có nhà hảo tâm đóng góp.
          </p>
        </div>
      ) : (
        <>
          <div className="px-5 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {entries.slice(0, 3).map((entry, idx) => {
              const medals = [Crown, Medal, Star];
              const medalColors = [
                "text-amber-500",
                "text-slate-400",
                "text-orange-700",
              ];
              const bgColors = [
                "from-amber-50 to-amber-100 border-amber-300",
                "from-slate-50 to-slate-100 border-slate-300",
                "from-orange-50 to-orange-100 border-orange-300",
              ];
              const MedalIcon = medals[idx];

              return (
                <div
                  key={entry.name}
                  className={`p-4 rounded-xs border-2 bg-gradient-to-br ${bgColors[idx]} flex flex-col items-center text-center space-y-2 relative`}
                >
                  <MedalIcon
                    className={`w-8 h-8 ${medalColors[idx]} absolute -top-3 bg-white rounded-full p-1 border-2 border-current`}
                  />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 mt-2">
                    Hạng {entry.rank}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {entry.payerType === "ORGANIZATION" ? (
                      <Building2 className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    ) : (
                      <User className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                    )}
                    <span className="font-bold text-xs text-slate-900 leading-snug line-clamp-2 min-h-[2.5em]">
                      {entry.name}
                    </span>
                  </div>
                  <div className="font-mono font-black text-[#991b1b] text-base">
                    {new Intl.NumberFormat("vi-VN").format(entry.totalAmount)} đ
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-5">
            <div className="overflow-x-auto border border-amber-200 rounded-xs bg-white">
              <table className="w-full text-left text-xs font-gov min-w-[560px]">
                <thead className="bg-amber-50 text-amber-900 font-bold border-b border-amber-200 text-[10.5px] uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3 w-16 text-center">Hạng</th>
                    <th className="py-2.5 px-3">Tên nhà hảo tâm</th>
                    <th className="py-2.5 px-3 w-32 text-center">Loại</th>
                    <th className="py-2.5 px-3 w-36 text-right">
                      Tổng đóng góp
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-amber-100">
                  {entries.slice(3).map((entry) => (
                    <tr
                      key={entry.name}
                      className="hover:bg-amber-50/40 transition-colors"
                    >
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-500">
                        #{entry.rank}
                      </td>
                      <td className="py-2.5 px-3 font-medium text-slate-800">
                        {entry.name}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {entry.payerType === "ORGANIZATION" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                            <Building2 className="w-3 h-3" /> Tổ chức
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <User className="w-3 h-3" /> Cá nhân
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-[#991b1b]">
                        {new Intl.NumberFormat("vi-VN").format(
                          entry.totalAmount
                        )}{" "}
                        đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
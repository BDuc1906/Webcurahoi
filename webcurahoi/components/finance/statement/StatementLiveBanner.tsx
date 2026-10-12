"use client";

import React from "react";
import { Sparkles } from "lucide-react";

interface Props {
  count: number;
}

export default function StatementLiveBanner({ count }: Props) {
  if (count <= 0) return null;

  return (
    <div className="p-3 bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-300 rounded-xs text-xs text-amber-900 flex items-start gap-2.5">
      <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 animate-pulse" />
      <span>
        <strong>Có {count} giao dịch MỚI</strong> vừa được ghi nhận trực tiếp từ cổng
        thanh toán. Dòng mới nhất đang được đánh dấu vàng ở đầu bảng sao kê.
      </span>
    </div>
  );
}
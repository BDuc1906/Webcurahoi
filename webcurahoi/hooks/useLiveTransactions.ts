"use client";

import { useEffect, useState } from "react";
import { realtimeBus } from "@/lib/realtime-bus";
import { FinanceTransaction } from "@/lib/db/schema";

/**
 * Lắng nghe bus realtime, trả về mảng giao dịch mới (chống trùng theo code).
 * Dùng ở PublicFinanceStatement để đẩy dòng mới lên đầu bảng sao kê.
 */
export function useLiveTransactions(): FinanceTransaction[] {
  const [rows, setRows] = useState<FinanceTransaction[]>([]);

  useEffect(() => {
    const off = realtimeBus.on((tx) => {
      setRows((prev) => {
        if (prev.some((r) => r.code === tx.code)) return prev;
        return [tx, ...prev];
      });
    });
    return off;
  }, []);

  return rows;
}
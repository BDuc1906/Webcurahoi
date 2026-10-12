"use client";

import { useEffect, useState } from "react";
import { financeApi } from "@/lib/api-client";
import { mapStatementItem } from "@/lib/api-mappers";
import { FinanceTransaction } from "@/lib/db/schema";

interface Result {
  rows: FinanceTransaction[];
  total: number;
  loading: boolean;
  source: "api" | "mock";
}

export function useStatement(limit = 200): Result {
  const [rows, setRows] = useState<FinanceTransaction[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "mock">("mock");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await financeApi.statement(1, limit);
      if (cancelled) return;
      if (data?.items?.length > 0) {
        setRows(data.items.map(mapStatementItem));
        setTotal(Number(data.total ?? data.items.length));
        setSource("api");
      } else {
        setRows([]);
        setTotal(0);
        setSource("mock");
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [limit]);

  return { rows, total, loading, source };
}
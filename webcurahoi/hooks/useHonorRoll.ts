"use client";

import { useEffect, useState } from "react";
import { financeApi } from "@/lib/api-client";
import { mapHonorRoll } from "@/lib/api-mappers";
import { HonorRollEntry } from "@/lib/mock-campaigns-data";

type Period = "quarter" | "year";

interface Result {
  entries: HonorRollEntry[];
  loading: boolean;
  source: "api" | "mock";
}

export function useHonorRoll(
  period: Period,
  fallback: HonorRollEntry[]
): Result {
  const [entries, setEntries] = useState<HonorRollEntry[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "mock">("mock");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await financeApi.honorRoll(period);
      if (cancelled) return;
      if (Array.isArray(data) && data.length > 0) {
        setEntries(data.map(mapHonorRoll));
        setSource("api");
      } else {
        setEntries(fallback);
        setSource("mock");
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  return { entries, loading, source };
}
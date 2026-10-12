"use client";

import { useEffect, useState } from "react";
import { mapDisbursement } from "@/lib/api-mappers";
import { Disbursement } from "@/lib/mock-campaigns-data";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

async function fetchJson(path: string) {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

interface Result {
  disbursements: Disbursement[];
  loading: boolean;
  source: "api" | "empty";
}

/**
 * Chỉ lấy data từ backend. Không fallback mock.
 * @param campaignSlugs Danh sách slug chiến dịch cần fetch
 */
export function useDisbursements(campaignSlugs: string[]): Result {
  const [disbursements, setDisbursements] = useState<Disbursement[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "empty">("empty");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const all: Disbursement[] = [];
      for (const slug of campaignSlugs) {
        const data = await fetchJson(
          `/finance/campaigns/${slug}/disbursements`
        );
        if (Array.isArray(data) && data.length > 0) {
          data.forEach((d: any) => all.push(mapDisbursement(d, slug)));
        }
      }
      if (cancelled) return;
      if (all.length > 0) {
        all.sort((a, b) =>
          (b.disbursedAt || "").localeCompare(a.disbursedAt || "")
        );
        setDisbursements(all);
        setSource("api");
      } else {
        setDisbursements([]);
        setSource("empty");
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignSlugs.join(",")]);

  return { disbursements, loading, source };
}
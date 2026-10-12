"use client";

import { useEffect, useState } from "react";
import { financeApi } from "@/lib/api-client";
import { mapCampaign } from "@/lib/api-mappers";
import { Campaign } from "@/lib/mock-campaigns-data";

interface Result {
  campaigns: Campaign[];
  loading: boolean;
  source: "api" | "empty";
}

/**
 * Chỉ lấy data từ backend. Không dùng fallback mock.
 * DB trống → campaigns = [] → component hiển thị empty state.
 */
export function useCampaigns(): Result {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "empty">("empty");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await financeApi.campaigns();
      if (cancelled) return;
      if (Array.isArray(data) && data.length > 0) {
        setCampaigns(data.map(mapCampaign));
        setSource("api");
      } else {
        setCampaigns([]);
        setSource("empty");
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { campaigns, loading, source };
}
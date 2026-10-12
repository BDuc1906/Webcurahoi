"use client";

import { useEffect, useState } from "react";
import { financeApi } from "@/lib/api-client";
import { mapCampaign } from "@/lib/api-mappers";
import { Campaign } from "@/lib/mock-campaigns-data";

interface Result {
  campaigns: Campaign[];
  loading: boolean;
  source: "api" | "mock";
}

export function useCampaigns(fallback: Campaign[]): Result {
  const [campaigns, setCampaigns] = useState<Campaign[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"api" | "mock">("mock");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await financeApi.campaigns();
      if (cancelled) return;
      if (Array.isArray(data) && data.length > 0) {
        setCampaigns(data.map(mapCampaign));
        setSource("api");
      } else {
        setCampaigns(fallback);
        setSource("mock");
      }
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { campaigns, loading, source };
}
"use client";

import { useEffect, useRef, useState } from "react";

interface Options {
  seconds: number;
  active: boolean;
  onExpire?: () => void;
}

/**
 * Đếm ngược giây từ `seconds` xuống 0 khi `active = true`.
 * Reset khi `seconds` đổi.
 */
export function useCountdown({ seconds, active, onExpire }: Options) {
  const [remaining, setRemaining] = useState(seconds);
  const onExpireRef = useRef(onExpire);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cập nhật ref để không đóng băng callback
  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  // Reset khi seconds đổi
  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (!active) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setRemaining((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 0) {
          if (timerRef.current) clearInterval(timerRef.current);
          onExpireRef.current?.();
        }
        return next;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active]);

  return remaining;
}

/** Format 600 → "10:00" */
export function formatMmSs(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
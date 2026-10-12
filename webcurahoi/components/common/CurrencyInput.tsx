"use client";

import React, { useState, useEffect, useRef } from "react";

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  className?: string;
  autoFocus?: boolean;
  disabled?: boolean;
}

export default function CurrencyInput({
  value,
  onChange,
  placeholder = "Nhập số tiền...",
  min = 0,
  max = 2_000_000_000,
  className = "",
  autoFocus = false,
  disabled = false,
}: CurrencyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [display, setDisplay] = useState<string>(formatVnd(value));

  useEffect(() => {
    setDisplay(formatVnd(value));
  }, [value]);

  function formatVnd(n: number): string {
    if (!n || n <= 0) return "";
    return new Intl.NumberFormat("vi-VN").format(n);
  }

  function parseVnd(s: string): number {
    const digits = s.replace(/\D/g, "");
    if (!digits) return 0;
    return Math.min(Math.max(parseInt(digits, 10), 0), max);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    const num = parseVnd(raw);
    setDisplay(num > 0 ? formatVnd(num) : "");
    onChange(num);
  }

  function handleBlur() {
    if (value > 0 && value < min) {
      onChange(min);
      setDisplay(formatVnd(min));
    }
  }

  return (
    <div className={`relative ${className}`}>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        autoFocus={autoFocus}
        disabled={disabled}
        value={display}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full border border-slate-300 p-2.5 pr-12 rounded-xs focus:ring-1 focus:ring-[#991b1b] focus:border-[#991b1b] focus:outline-none font-mono font-bold text-slate-900 disabled:bg-slate-100 disabled:cursor-not-allowed"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 pointer-events-none">
        VNĐ
      </span>
    </div>
  );
}
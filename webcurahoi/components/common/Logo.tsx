"use client";

import React from "react";
import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "footer";
  showSubtitle?: boolean;
  className?: string;
  useOfficialImage?: boolean;
}

/**
 * Biểu tượng tối giản (Minimalist Emblem) cho Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam
 * Biểu trưng: Trái tim đỏ y tế + Đôi bàn tay nâng đỡ cộng đồng + Ngôi sao vàng & Chữ thập bảo vệ sự sống
 */
export function LogoIcon({
  size = 48,
  useOfficialImage = false,
  className = "",
}: {
  size?: number;
  useOfficialImage?: boolean;
  className?: string;
}) {
  if (useOfficialImage) {
    return (
      <div
        className={`relative rounded-full overflow-hidden shrink-0 border-2 border-[#991b1b] shadow-xs bg-white ${className}`}
        style={{ width: size, height: size }}
      >
        <img
          src="/images/logo-vache-official.png"
          alt="Huy hiệu Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam"
          className="w-full h-full object-contain p-0.5"
        />
      </div>
    );
  }

  // Vector SVG tối giản tuyệt đối (Minimalist Geometric Vector)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Logo Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam"
    >
      {/* Vòng tròn nền trắng tinh khôi */}
      <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#991b1b" strokeWidth="3" />
      
      {/* Vòng chỉ viền vàng kim thanh lịch */}
      <circle cx="50" cy="50" r="44.5" fill="none" stroke="#b45309" strokeWidth="1" strokeDasharray="3 2" />

      {/* Đôi bàn tay nâng đỡ tối giản (Stylized Supporting Hands / Laurel) */}
      <path
        d="M26 63C32 75 42 79 50 79C58 79 68 75 74 63C70 69 60 74 50 74C40 74 30 69 26 63Z"
        fill="#b45309"
      />
      
      {/* Trái tim đỏ thắm y tế (Healthcare Heart) */}
      <path
        d="M50 70C50 70 28 55 28 40C28 32.5 33.5 27 40.5 27C44.8 27 48.2 29.2 50 32.5C51.8 29.2 55.2 27 59.5 27C66.5 27 72 32.5 72 40C72 55 50 70 50 70Z"
        fill="#991b1b"
      />

      {/* Chữ thập y tế tối giản màu trắng bên trong trái tim */}
      <rect x="47" y="38" width="6" height="18" rx="1.5" fill="#ffffff" />
      <rect x="41" y="44" width="18" height="6" rx="1.5" fill="#ffffff" />

      {/* Ngôi sao vàng nhỏ phía trên đỉnh - Biểu trưng Quốc gia */}
      <path
        d="M50 20L51.5 23.5L55 23.8L52.3 26.2L53.1 29.8L50 28L46.9 29.8L47.7 26.2L45 23.8L48.5 23.5L50 20Z"
        fill="#b45309"
      />
    </svg>
  );
}

export default function Logo({
  size = "md",
  variant = "full",
  showSubtitle = true,
  className = "",
  useOfficialImage = true, // Sử dụng huy hiệu chính thức của Hội được tối ưu sắc nét
}: LogoProps) {
  const pixelSizes = {
    sm: 36,
    md: 48,
    lg: 56,
    xl: 72,
  };

  const iconSize = pixelSizes[size];

  if (variant === "icon") {
    return (
      <Link href="/" className={`inline-flex items-center group ${className}`}>
        <LogoIcon size={iconSize} useOfficialImage={useOfficialImage} />
      </Link>
    );
  }

  if (variant === "footer") {
    return (
      <Link href="/" className={`flex items-center gap-3 group ${className}`}>
        <LogoIcon size={iconSize} useOfficialImage={useOfficialImage} className="border-amber-400" />
        <div className="space-y-0.5">
          <div className="text-[10px] font-bold text-amber-400 tracking-wider uppercase font-gov">
            TRUNG ƯƠNG HỘI
          </div>
          <h2 className="text-sm font-bold text-white tracking-tight uppercase leading-snug font-gov">
            GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
          </h2>
          {showSubtitle && (
            <p className="text-[11px] text-amber-200/90 font-serif italic">
              Vietnam Association for Community Health Education • VACHE
            </p>
          )}
        </div>
      </Link>
    );
  }

  // Biến thể đầy đủ chuẩn Header (variant === "full")
  return (
    <Link href="/" className={`flex items-center gap-2 sm:gap-3.5 group select-none min-w-0 ${className}`}>
      <div className="shrink-0 scale-90 sm:scale-100 origin-left">
        <LogoIcon
          size={iconSize}
          useOfficialImage={useOfficialImage}
          className="group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <div className="min-w-0">
        <div className="text-[9.5px] sm:text-[11px] font-bold text-[#991b1b] uppercase tracking-wider sm:tracking-widest font-gov flex items-center gap-1 sm:gap-1.5 leading-none mb-0.5">
          <span>TRUNG ƯƠNG HỘI</span>
          <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-amber-600 inline-block" />
          <span className="text-slate-500 font-medium">VACHE</span>
        </div>
        <h1 className="text-[12px] sm:text-base md:text-xl font-black text-slate-900 tracking-tight leading-tight uppercase font-gov group-hover:text-[#991b1b] transition-colors line-clamp-2 sm:line-clamp-none">
          GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
        </h1>
        {showSubtitle && (
          <p className="text-[11.5px] text-slate-600 hidden sm:block italic font-serif">
            Quyết định thành lập số 128/QĐ-BNV của Bộ trưởng Bộ Nội vụ
          </p>
        )}
      </div>
    </Link>
  );
}

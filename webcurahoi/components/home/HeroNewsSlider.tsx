"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MOCK_NEWS } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight, Calendar, ArrowRight, Pause, Play, Sparkles } from "lucide-react";

export default function HeroNewsSlider() {
  // Lấy đúng 10 tin tức tiêu điểm nổi bật và mới nhất theo yêu cầu
  const slides = MOCK_NEWS.slice(0, 10);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Thời gian chuyển slide: 3.5 giây tự động chuyển
  const SLIDE_DURATION = 3500;
  const PROGRESS_TICK = 50;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Quản lý thanh tiến trình và tự động chuyển slide
  useEffect(() => {
    if (isPaused) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (PROGRESS_TICK / SLIDE_DURATION) * 100;
      });
    }, PROGRESS_TICK);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, isPaused, slides.length]);

  return (
    <div
      className="bg-white border border-slate-300 rounded-xs shadow-xs overflow-hidden flex flex-col font-gov group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. KHU VỰC SLIDE CHÍNH VỚI HIỆU ỨNG TRƯỢT SANG PHẢI */}
      <div className="relative overflow-hidden aspect-[16/9] sm:aspect-[16/9] bg-slate-900">
        {/* Track trượt ngang mượt mà (Slide track translateX) */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((item) => (
            <Link
              key={item.id}
              href={`/tin-tuc/${item.id}`}
              className="w-full h-full shrink-0 relative block cursor-pointer group/slide"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover/slide:scale-105 transition-transform duration-700"
              />
              {/* Gradient phủ nhẹ để văn bản luôn rõ nét */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

              {/* Tag Chuyên Mục & Badge Tiêu Điểm Mới Nhất */}
              <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5 sm:gap-2">
                <span className="bg-[#991b1b] text-white text-[9.5px] sm:text-[11px] font-bold uppercase px-2 py-0.5 sm:px-3 sm:py-1 rounded-xs shadow-md font-gov flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-300" />
                  {item.category}
                </span>
                <span className="bg-black/60 backdrop-blur-xs text-amber-300 text-[9.5px] sm:text-[10.5px] font-bold px-1.5 py-0.5 sm:px-2 sm:py-0.5 rounded-xs border border-amber-300/30">
                  Mới nhất
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Nút Điều Hướng Trái / Phải (Next / Prev Arrows) */}
        <button
          onClick={prevSlide}
          aria-label="Tin trước đó"
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-[#991b1b] text-white flex items-center justify-center backdrop-blur-xs transition-colors shadow-md z-10 opacity-80 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Tin tiếp theo"
          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-black/50 hover:bg-[#991b1b] text-white flex items-center justify-center backdrop-blur-xs transition-colors shadow-md z-10 opacity-80 group-hover:opacity-100 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Chỉ số Slide & Nút Tạm dừng / Tiếp tục */}
        <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex items-center gap-1.5 sm:gap-2 bg-black/75 backdrop-blur-xs px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs text-white text-[10px] sm:text-xs font-mono z-10 border border-white/10 shadow-md">
          <button
            onClick={() => setIsPaused(!isPaused)}
            aria-label={isPaused ? "Tiếp tục chạy" : "Tạm dừng"}
            className="text-amber-300 hover:text-white cursor-pointer"
          >
            {isPaused ? <Play className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <Pause className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
          </button>
          <span>
            <strong className="text-amber-400">
              {String(currentIndex + 1).padStart(2, "0")}
            </strong>{" "}
            / {String(slides.length).padStart(2, "0")}
          </span>
        </div>

        {/* Thanh Tiến Trình Tự Động Chạy (Progress Bar) */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20 z-10">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-[#991b1b] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 2. KHU VỰC THÔNG TIN TIÊU ĐIỂM CỦA BÀI VIẾT ĐANG CHẠY */}
      <div className="p-4 sm:p-6 space-y-2.5 sm:space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2 sm:space-y-2.5">
          <div className="flex items-center gap-2 text-[10.5px] sm:text-[11px] text-slate-500 font-mono">
            <span className="text-[#991b1b] font-bold flex items-center gap-1">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {slides[currentIndex].date}
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Ban Biên Tập Cổng Thông Tin Trung Ương Hội</span>
          </div>

          <h2 className="text-base sm:text-xl lg:text-[23px] font-bold text-[#0f172a] leading-snug hover:text-[#991b1b] transition-colors font-serif">
            <Link href={`/tin-tuc/${slides[currentIndex].id}`}>
              {slides[currentIndex].title}
            </Link>
          </h2>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif text-justify line-clamp-2 sm:line-clamp-3">
            {slides[currentIndex].excerpt}
          </p>
        </div>

        <div className="pt-2.5 sm:pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
          <Link
            href={`/tin-tuc/${slides[currentIndex].id}`}
            className="text-[#991b1b] font-bold hover:underline flex items-center gap-1 font-gov text-xs"
          >
            Đọc toàn văn <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-[10.5px] sm:text-[11px] text-slate-400 font-gov">Tin tức Trung ương Hội</span>
        </div>
      </div>

      {/* 3. DẢI 10 THUMBNAIL CHỌN BÀI LƯỚT NHANH (10 TIÊU ĐIỂM) */}
      <div className="bg-[#f8fafc] border-t border-slate-200 overflow-x-auto scrollbar-none flex divide-x divide-slate-200 text-xs">
        {slides.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => goToSlide(idx)}
            className={`p-2 sm:p-2.5 min-w-[115px] sm:min-w-[150px] flex-1 text-left transition-all flex flex-col justify-between space-y-1 cursor-pointer shrink-0 ${
              currentIndex === idx
                ? "bg-white border-t-2 border-[#991b1b] shadow-xs text-[#991b1b]"
                : "hover:bg-slate-100 text-slate-600"
            }`}
          >
            <span className="font-mono text-[9px] sm:text-[9.5px] font-bold uppercase block text-slate-400">
              Tiêu điểm {String(idx + 1).padStart(2, "0")}
            </span>
            <p className="font-semibold text-[10px] sm:text-[10.5px] line-clamp-2 leading-tight font-gov">
              {item.title}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

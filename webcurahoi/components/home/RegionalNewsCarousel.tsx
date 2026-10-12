"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { MOCK_NEWS } from "@/lib/mock-data";
import { ChevronLeft, ChevronRight, Calendar, MapPin, ArrowRight } from "lucide-react";

export default function RegionalNewsCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Lấy các bài viết hoạt động địa phương và thiện nguyện các tỉnh thành
  const regionalItems = MOCK_NEWS.filter(
    (n) => n.category === "Hoạt động Địa phương" || n.category === "Thiện nguyện vì sức khỏe"
  );

  // Helper hàm tách tên địa phương từ tiêu đề hoặc gán nhãn
  const getProvinceLabel = (title: string, category: string) => {
    if (title.includes("Hải Phòng")) return "Hải Phòng";
    if (title.includes("TP. Hồ Chí Minh") || title.includes("Đông Nam Bộ")) return "TP. Hồ Chí Minh";
    if (title.includes("Đà Nẵng")) return "Đà Nẵng";
    if (title.includes("Đắk Lắk") || title.includes("Tây Nguyên")) return "Đắk Lắk";
    if (title.includes("Cần Thơ") || title.includes("Mekong") || title.includes("Miền Tây")) return "Cần Thơ";
    if (title.includes("Nghệ An") || title.includes("Diễn Châu")) return "Nghệ An";
    if (title.includes("Phú Thọ")) return "Phú Thọ";
    if (title.includes("Kiên Giang") || title.includes("Phú Quốc")) return "Kiên Giang";
    if (title.includes("Quảng Ninh")) return "Quảng Ninh";
    if (title.includes("Lâm Đồng") || title.includes("Đà Lạt")) return "Lâm Đồng";
    if (title.includes("Thừa Thiên Huế") || title.includes("Huế")) return "Thừa Thiên Huế";
    if (title.includes("Bình Dương")) return "Bình Dương";
    if (title.includes("Đồng Nai")) return "Đồng Nai";
    if (title.includes("Thái Nguyên")) return "Thái Nguyên";
    if (title.includes("Lào Cai") || title.includes("Sa Pa")) return "Lào Cai";
    if (title.includes("Hà Tĩnh")) return "Hà Tĩnh";
    if (title.includes("Quảng Nam")) return "Quảng Nam";
    if (title.includes("An Giang")) return "An Giang";
    if (title.includes("Sơn La") || title.includes("Mộc Châu")) return "Sơn La";
    if (title.includes("Bà Rịa - Vũng Tàu")) return "Vũng Tàu";
    if (title.includes("Nam Định")) return "Nam Định";
    if (title.includes("Khánh Hòa")) return "Khánh Hòa";
    if (title.includes("Gia Lai") || title.includes("Pleiku")) return "Gia Lai";
    if (title.includes("Cà Mau") || title.includes("Đất Mũi")) return "Cà Mau";
    if (title.includes("Tiền Giang") || title.includes("Mỹ Tho")) return "Tiền Giang";
    if (title.includes("Hà Giang") || title.includes("Mèo Vạc")) return "Hà Giang";
    if (title.includes("Quảng Trị")) return "Quảng Trị";
    if (title.includes("Yên Bái") || title.includes("Mù Cang Chải")) return "Yên Bái";
    if (title.includes("Điện Biên")) return "Điện Biên";
    if (title.includes("Vĩnh Long")) return "Vĩnh Long";
    return "Địa phương";
  };

  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320; // width of card + gap
      scrollContainerRef.current.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = 320;
      scrollContainerRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => el.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 font-gov space-y-4">
      {/* Tiêu đề mục & Nút điều khiển trượt sang phải */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b-2 border-[#991b1b] pb-2.5 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#991b1b] rounded-full inline-block" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#991b1b]">
              Hoạt Động Cơ Sở & Điểm Nóng Sức Khỏe
            </span>
          </div>
          <h2 className="text-base sm:text-xl font-bold text-slate-900 font-serif mt-0.5">
            DÒNG SỰ KIỆN CHĂM SÓC SỨC KHỎE CÁC TỈNH THÀNH TRÊN TOÀN QUỐC
          </h2>
        </div>

        {/* Cụm nút mũi tên bấm lướt sang phải / trái */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Lướt sang trái"
            className={`w-8 h-8 rounded-xs border flex items-center justify-center transition-all ${
              canScrollLeft
                ? "bg-white border-slate-300 text-slate-800 hover:bg-[#991b1b] hover:text-white hover:border-[#991b1b] shadow-xs cursor-pointer"
                : "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Lướt sang phải"
            className={`w-8 h-8 rounded-xs border flex items-center justify-center transition-all ${
              canScrollRight
                ? "bg-white border-slate-300 text-slate-800 hover:bg-[#991b1b] hover:text-white hover:border-[#991b1b] shadow-xs cursor-pointer"
                : "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <Link
            href="/tin-tuc"
            className="text-xs font-bold text-[#991b1b] hover:underline pl-2 hidden md:inline-flex items-center gap-1"
          >
            Xem tất cả &raquo;
          </Link>
        </div>
      </div>

      {/* Dải Carousel Cuộn Ngang Mượt Mà */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-300 -mx-1 px-1"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {regionalItems.map((item) => {
          const province = getProvinceLabel(item.title, item.category);
          return (
            <article
              key={item.id}
              style={{ scrollSnapAlign: "start" }}
              className="min-w-[270px] sm:min-w-[300px] max-w-[300px] bg-white border border-slate-300 rounded-xs overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#991b1b] hover:shadow-md transition-all group shrink-0"
            >
              <div className="space-y-2.5">
                {/* Ảnh bài viết */}
                <Link
                  href={`/tin-tuc/${item.id}`}
                  className="aspect-[16/10] relative overflow-hidden bg-slate-900 block cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badge Tỉnh/Thành phố nổi bật */}
                  <span className="absolute top-2.5 left-2.5 bg-[#991b1b] text-white text-[10px] font-bold px-2 py-0.5 rounded-xs shadow-sm uppercase font-gov flex items-center gap-1">
                    <MapPin className="w-2.5 h-2.5" /> {province}
                  </span>
                </Link>

                {/* Nội dung tóm tắt */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10.5px] text-slate-500 font-mono">
                    <Calendar className="w-3 h-3 text-[#991b1b]" /> {item.date}
                  </div>

                  <h3 className="font-bold text-xs sm:text-[13px] text-slate-900 leading-snug group-hover:text-[#991b1b] transition-colors font-serif line-clamp-2">
                    <Link href={`/tin-tuc/${item.id}`}>{item.title}</Link>
                  </h3>

                  <p className="text-[11.5px] text-slate-600 line-clamp-2 leading-relaxed font-gov">
                    {item.excerpt}
                  </p>
                </div>
              </div>

              {/* Chân thẻ */}
              <div className="px-4 pb-3 pt-2 border-t border-slate-100 flex justify-between items-center text-xs">
                <Link
                  href={`/tin-tuc/${item.id}`}
                  className="text-[#991b1b] font-bold hover:underline flex items-center gap-0.5 text-[11px]"
                >
                  Xem chi tiết <ArrowRight className="w-3 h-3" />
                </Link>
                <span className="text-[10px] text-slate-400 font-mono">VACHE</span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

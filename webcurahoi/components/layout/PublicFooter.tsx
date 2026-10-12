import React from "react";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import { MapPin, Phone, Mail, Globe, ExternalLink, ChevronRight, ShieldCheck, HeartHandshake } from "lucide-react";

export default function PublicFooter() {
  return (
    <footer className="mt-16 border-t-4 border-amber-500 font-gov shadow-xl">
      {/* 1. DẢI CÔNG BỐ CƠ QUAN CHỦ QUẢN & QUYẾT ĐỊNH THÀNH LẬP */}
      <div className="bg-[#5c0808] text-red-100 py-3 border-b border-red-900/60">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5 font-bold tracking-wide text-white">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              CƠ QUAN CHỦ QUẢN: TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
            </span>
            <span className="hidden lg:inline text-amber-300/80">•</span>
            <span className="text-amber-200/90 text-[11.5px]">
              Quyết định số 128/QĐ-BNV do Bộ trưởng Bộ Nội vụ ban hành • Quản lý chuyên môn: <strong>Bộ Y tế</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11.5px] font-medium text-amber-100">
            <Link href="/van-ban" className="hover:text-amber-300 transition-colors">
              Điều lệ Hội
            </Link>
            <span className="text-red-300/60">•</span>
            <Link href="/he-thong-to-chuc" className="hover:text-amber-300 transition-colors">
              Hệ thống Chi hội
            </Link>
            <span className="text-red-300/60">•</span>
            <Link href="/thien-nguyen" className="hover:text-amber-300 transition-colors">
              Minh bạch tài chính
            </Link>
            <span className="text-red-300/60">•</span>
            <Link href="/login" className="hover:text-amber-300 transition-colors">
              Cổng nội bộ
            </Link>
          </div>
        </div>
      </div>

      {/* 2. NỘI DUNG FOOTER CHÍNH (ĐỎ ĐÔ UY NGHIÊM KẾT HỢP CHỈ VÀNG KIM) */}
      <div className="bg-gradient-to-b from-[#7a0c0c] via-[#6f0a0a] to-[#540606] text-red-50 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
            {/* Cột 1: Thông tin Trung ương Hội & Trụ sở hành chính (5/12) */}
            <div className="md:col-span-12 lg:col-span-6 space-y-4">
              <Logo size="lg" variant="footer" />

              <p className="text-red-100/90 leading-relaxed text-xs text-justify pt-1 border-t border-red-800/80">
                Tổ chức xã hội - nghề nghiệp tự nguyện hoạt động trên phạm vi cả nước theo Điều lệ được Bộ trưởng Bộ Nội vụ phê duyệt; chịu sự quản lý nhà nước của Bộ Nội vụ và sự quản lý chuyên ngành về y tế của Bộ Y tế; hoạt động vì sự nghiệp bảo vệ, chăm sóc và nâng cao sức khỏe nhân dân.
              </p>

              <div className="space-y-2 text-xs pt-2">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-3 h-3 text-amber-400" />
                  </div>
                  <div>
                    <strong className="text-white">Trụ sở Trung ương:</strong>{" "}
                    <span className="text-red-100/90">
                      Tầng 5, Cung Trí Thức Thành phố Hà Nội, Số 1 Tôn Thất Thuyết, Phường Dịch Vọng Hậu, Quận Cầu Giấy, TP. Hà Nội
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                    <Phone className="w-3 h-3 text-amber-400" />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>
                      <strong className="text-white">Văn phòng TW:</strong> (024) 3782.3556
                    </span>
                    <span className="text-amber-300/80">•</span>
                    <span>
                      <strong className="text-white">Đường dây nóng:</strong> 0912.345.678
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0">
                    <Mail className="w-3 h-3 text-amber-400" />
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>
                      <strong className="text-white">Hộp thư:</strong> vanphong@vache.org.vn
                    </span>
                    <span className="text-amber-300/80">•</span>
                    <span>bantruyenthong@vache.org.vn</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột 2: Cơ cấu bộ máy và chức năng chuyên môn (3.5/12) */}
            <div className="md:col-span-6 lg:col-span-3 space-y-3">
              <div className="border-b-2 border-amber-400/60 pb-2">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-3.5 bg-amber-400 inline-block rounded-2xs" />
                  Cơ Cấu & Nghiệp Vụ Hội
                </h5>
              </div>

              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/gioi-thieu"
                    className="hover:text-amber-300 text-red-100 flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400/80 group-hover:translate-x-0.5 transition-transform" />
                    Thường trực Ban Lãnh đạo Trung ương
                  </Link>
                </li>
                <li>
                  <Link
                    href="/nhan-su"
                    className="hover:text-amber-300 text-red-100 flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400/80 group-hover:translate-x-0.5 transition-transform" />
                    Ban Chấp hành & Ban Thường vụ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/he-thong-to-chuc"
                    className="hover:text-amber-300 text-red-100 flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400/80 group-hover:translate-x-0.5 transition-transform" />
                    Liên Chi hội & Chi hội 63 tỉnh thành
                  </Link>
                </li>
                <li>
                  <Link
                    href="/he-thong-to-chuc?type=INSTITUTE"
                    className="hover:text-amber-300 text-red-100 flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400/80 group-hover:translate-x-0.5 transition-transform" />
                    Viện & Trung tâm Khoa học trực thuộc
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dang-ky-hoi-vien"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-amber-500/20 border border-amber-400/50 text-amber-200 hover:text-white hover:bg-amber-500/30 font-bold transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                    Đăng ký kết nạp Hội viên mới
                    <span className="text-[10px] bg-amber-400 text-red-950 px-1 py-0.2 rounded-2xs font-extrabold uppercase ml-1">
                      Online
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/thien-nguyen"
                    className="hover:text-amber-300 text-red-100 flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400/80 group-hover:translate-x-0.5 transition-transform" />
                    Bản sao kê tài chính & Thiện nguyện
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-amber-300 text-red-100 flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-400/80 group-hover:translate-x-0.5 transition-transform" />
                    Cổng nộp báo cáo Trung ương Hội
                  </Link>
                </li>
              </ul>
            </div>

            {/* Cột 3: Cơ quan truyền thông và báo chí chính thức (3.5/12) */}
            <div className="md:col-span-6 lg:col-span-3 space-y-3">
              <div className="border-b-2 border-amber-400/60 pb-2">
                <h5 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-3.5 bg-amber-400 inline-block rounded-2xs" />
                  Cơ Quan Báo Chí & Truyền Thông
                </h5>
              </div>

              {/* Hộp ấn phẩm Tạp chí Sức Khỏe Cộng Đồng sang trọng */}
              <div className="p-4 bg-[#500606] rounded-xs border border-amber-500/40 shadow-inner space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-black text-amber-300 text-sm tracking-wide">
                    Tạp chí Sức Khỏe Cộng Đồng
                  </span>
                </div>
                <p className="text-[11.5px] text-red-100/90 leading-relaxed">
                  Cơ quan ngôn luận chính thức của Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam.
                </p>
                <div className="pt-1">
                  <a
                    href="https://suckhoecongdong.net.vn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-red-950 font-bold rounded-xs text-xs shadow-xs transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>suckhoecongdong.net.vn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="text-[11px] text-amber-200/80 pt-1 leading-relaxed">
                Cổng thông tin điện tử vận hành theo quy chuẩn xuất bản thông tin của Nhà nước. Ghi rõ nguồn <strong>"VACHE"</strong> khi phát hành lại thông tin từ Cổng.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DẢI BẢN QUYỀN CHÂN TRANG */}
      <div className="bg-[#420404] py-3.5 border-t border-red-950/80 text-[11px] text-red-200/80">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div>
            © 2008 - 2026 <strong>TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM (VACHE)</strong>. Mọi quyền được bảo lưu.
          </div>
          <div className="text-amber-300/80 font-medium">
            Chung tay vì sức khỏe nhân dân và hạnh phúc của mọi gia đình Việt Nam
          </div>
        </div>
      </div>
    </footer>
  );
}

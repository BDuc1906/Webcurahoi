"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo, { LogoIcon } from "@/components/common/Logo";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Building2,
  User,
  ArrowRight,
  Lock,
  Mail,
  CheckCircle2,
  ChevronLeft,
  Phone,
  MapPin,
  FileText,
  CreditCard,
  FileCheck2,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<"SUPER_ADMIN" | "UNIT_ADMIN" | "MEMBER">("SUPER_ADMIN");
  const [username, setUsername] = useState("admin@vache.org.vn");
  const [password, setPassword] = useState("••••••••");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleRoleChange = (newRole: "SUPER_ADMIN" | "UNIT_ADMIN" | "MEMBER") => {
    setRole(newRole);
    if (newRole === "SUPER_ADMIN") {
      setUsername("admin@vache.org.vn");
    } else if (newRole === "UNIT_ADMIN") {
      setUsername("chihoi.danang@vache.org.vn");
    } else {
      setUsername("hoivien01@vache.org.vn");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/admin");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] flex flex-col justify-between font-gov text-slate-800">
      {/* 1. THANH TIÊU ĐỀ ĐẦU TRANG CHUẨN CÔNG VỤ */}
      <header className="bg-white border-b border-slate-300 shadow-2xs py-3 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <LogoIcon size={38} useOfficialImage={true} />
            <div>
              <span className="text-[10px] font-bold text-[#991b1b] uppercase tracking-wider block">
                TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
              </span>
              <span className="text-xs sm:text-sm font-black text-slate-900 uppercase font-gov">
                CỔNG ĐIỀU HÀNH & DỊCH VỤ CÔNG NỘI BỘ (VACHE PORTAL)
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-xs">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs border border-slate-300 hover:border-[#991b1b] hover:text-[#991b1b] font-semibold text-slate-700 bg-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Về Trang Chủ
            </Link>
            <span className="hidden md:inline text-slate-400">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-slate-600 font-mono text-xs">
              <Phone className="w-3.5 h-3.5 text-[#991b1b]" />
              <span>Hỗ trợ kỹ thuật: <strong>024.3782.3556</strong></span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. KHU VỰC CHÍNH: KHỐI CARD ĐÔI 2 CỘT HIỆN ĐẠI & UY NGHIÊM */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl bg-white rounded-xs shadow-xl border border-slate-300 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* CỘT TRÁI (5/12): NHẬN DIỆN CƠ QUAN TRUNG ƯƠNG & GIỚI THIỆU CHỨC NĂNG */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#800a0a] via-[#700a0a] to-[#540606] text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-amber-500/30 relative overflow-hidden">
            {/* Họa tiết nền sang trọng */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-red-400/10 blur-2xl pointer-events-none" />

            <div className="relative space-y-6">
              {/* Huy hiệu & Tiêu đề cơ quan */}
              <div className="space-y-3">
                <div className="inline-block p-1 bg-white/10 rounded-full border border-amber-400/50">
                  <LogoIcon size={56} useOfficialImage={true} className="border-amber-400" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-amber-300 tracking-widest uppercase block">
                    CƠ QUAN CHỦ QUẢN
                  </span>
                  <h1 className="text-base sm:text-lg font-black text-white uppercase tracking-tight font-gov leading-snug">
                    TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
                  </h1>
                  <p className="text-[11px] text-amber-200/90 font-serif italic mt-0.5">
                    Vietnam Association for Community Health Education • VACHE
                  </p>
                </div>
              </div>

              {/* Tôn chỉ hoạt động */}
              <p className="text-xs text-red-100/90 leading-relaxed text-justify border-t border-red-800/80 pt-3">
                Hệ thống xác thực tập trung phục vụ công tác lãnh đạo, điều hành của Thường trực Ban Lãnh đạo Trung ương Hội; quản trị danh bạ tổ chức 63 tỉnh thành và giải quyết nghiệp vụ số hóa toàn quốc.
              </p>

              {/* 4 Trụ cột nghiệp vụ */}
              <div className="space-y-3 text-xs pt-1">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5">
                    <FileCheck2 className="w-3 h-3 text-amber-300" />
                  </div>
                  <div>
                    <strong className="text-amber-200">Chế độ Báo cáo định kỳ:</strong>
                    <p className="text-[11px] text-red-100/80">Nộp báo cáo hoạt động tháng, quý, năm trực tuyến từ các Chi hội tỉnh thành.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3 h-3 text-amber-300" />
                  </div>
                  <div>
                    <strong className="text-amber-200">Quản trị Hội viên & Thẻ điện tử:</strong>
                    <p className="text-[11px] text-red-100/80">Số hóa hồ sơ cán bộ, kết nạp hội viên mới và tra cứu danh bạ BCH toàn quốc.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center shrink-0 mt-0.5">
                    <CreditCard className="w-3 h-3 text-amber-300" />
                  </div>
                  <div>
                    <strong className="text-amber-200">Quản lý Tài chính & Phí:</strong>
                    <p className="text-[11px] text-red-100/80">Đối soát niên liễm, thu nộp hội phí và đối soát sao kê quỹ thiện nguyện minh bạch.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin hỗ trợ hành chính */}
            <div className="relative text-[11px] text-red-200/80 border-t border-red-800/80 pt-4 mt-6 space-y-1">
              <p className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Cung Trí Thức, Số 1 Tôn Thất Thuyết, Cầu Giấy, Hà Nội</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Đường dây nóng: 0912.345.678 • vanphong@vache.org.vn</span>
              </p>
            </div>
          </div>

          {/* CỘT PHẢI (7/12): FORM ĐĂNG NHẬP CÔNG VỤ */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Tiêu đề Form */}
              <div className="border-b border-slate-200 pb-4">
                <span className="text-[11px] font-bold text-[#991b1b] uppercase tracking-wider block">
                  Hệ Thống Đăng Nhập Một Cửa (SSO)
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 uppercase font-gov mt-0.5">
                  ĐĂNG NHẬP HỆ THỐNG ĐIỀU HÀNH
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Vui lòng chọn đúng cấp độ phân quyền công tác để truy cập các phân hệ được ủy quyền.
                </p>
              </div>

              {/* Bộ chọn phân quyền 3 cấp (Roles Selector) */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 block">
                  Chọn Cấp Độ Phân Quyền Công Tác:
                </label>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <button
                    type="button"
                    onClick={() => handleRoleChange("SUPER_ADMIN")}
                    className={`p-3 rounded-xs border flex flex-col items-center gap-1 font-bold transition-all cursor-pointer ${
                      role === "SUPER_ADMIN"
                        ? "border-[#991b1b] bg-red-50 text-[#991b1b] shadow-xs"
                        : "border-slate-300 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-[#991b1b]" />
                    <span className="text-xs">Trung Ương Hội</span>
                    <span className="text-[10px] text-slate-500 font-normal hidden sm:inline">Ban Lãnh đạo TW</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange("UNIT_ADMIN")}
                    className={`p-3 rounded-xs border flex flex-col items-center gap-1 font-bold transition-all cursor-pointer ${
                      role === "UNIT_ADMIN"
                        ? "border-[#991b1b] bg-red-50 text-[#991b1b] shadow-xs"
                        : "border-slate-300 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#991b1b]" />
                    <span className="text-xs">Chi Hội & Viện</span>
                    <span className="text-[10px] text-slate-500 font-normal hidden sm:inline">63 Tỉnh Thành</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange("MEMBER")}
                    className={`p-3 rounded-xs border flex flex-col items-center gap-1 font-bold transition-all cursor-pointer ${
                      role === "MEMBER"
                        ? "border-[#991b1b] bg-red-50 text-[#991b1b] shadow-xs"
                        : "border-slate-300 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <User className="w-4 h-4 text-[#991b1b]" />
                    <span className="text-xs">Hội Viên</span>
                    <span className="text-[10px] text-slate-500 font-normal hidden sm:inline">Cá nhân / Tập thể</span>
                  </button>
                </div>
              </div>

              {/* Thông báo quyền hạn tương ứng */}
              <div className="p-3 bg-amber-50/70 border border-amber-300 rounded-xs text-xs text-amber-950 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="leading-snug">
                  {role === "SUPER_ADMIN" && (
                    <span>
                      <strong>Quyền hạn Quản trị TW:</strong> Toàn quyền kiểm duyệt báo cáo tỉnh thành, chỉ đạo văn bản và quản trị tài chính toàn quốc.
                    </span>
                  )}
                  {role === "UNIT_ADMIN" && (
                    <span>
                      <strong>Quyền hạn Chi hội & Viện:</strong> Nộp báo cáo định kỳ trực tuyến, cập nhật danh sách cán bộ chi hội và nộp hội phí.
                    </span>
                  )}
                  {role === "MEMBER" && (
                    <span>
                      <strong>Quyền hạn Hội viên:</strong> Tra cứu mã định danh, tải thẻ hội viên điện tử và đối soát lịch sử đóng niên liễm.
                    </span>
                  )}
                </div>
              </div>

              {/* Form đăng nhập */}
              <form onSubmit={handleLogin} className="space-y-4 text-xs font-gov">
                <div>
                  <label className="font-bold text-slate-800 block mb-1">
                    Tên đăng nhập hoặc Thư điện tử công vụ:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder="vd: canbo@vache.org.vn"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xs border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#991b1b] focus:border-[#991b1b] text-slate-900 font-medium text-xs"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-slate-800">Mật khẩu bảo mật:</label>
                    <a href="#" className="text-[#991b1b] hover:underline text-[11px] font-semibold">
                      Quên mật khẩu?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Nhập mật khẩu..."
                      className="w-full pl-9 pr-3 py-2.5 rounded-xs border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#991b1b] focus:border-[#991b1b] text-slate-900 text-xs"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-[#991b1b] rounded-2xs border-slate-300 focus:ring-[#991b1b]"
                    />
                    <span>Ghi nhớ phiên đăng nhập</span>
                  </label>
                  <span className="text-[11px] text-slate-500">Mã hóa chuẩn SSL 256-bit</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#991b1b] hover:bg-red-800 text-white font-bold rounded-xs shadow-xs transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-60 cursor-pointer"
                >
                  {loading ? "Đang xác thực hệ thống..." : "ĐĂNG NHẬP VÀO HỆ THỐNG ĐIỀU HÀNH"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Chân form */}
            <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-600 space-y-2">
              <div>
                Chưa có tài khoản công vụ hoặc hội viên?{" "}
                <Link href="/dang-ky-hoi-vien" className="text-[#991b1b] font-bold hover:underline">
                  Đăng ký gia nhập trực tuyến
                </Link>
              </div>
              <div className="text-[11px] text-slate-400">
                Mọi hành vi truy cập trái phép vào hệ thống của Trung ương Hội sẽ bị xử lý theo quy định của pháp luật.
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. CHÂN TRANG BẢN QUYỀN */}
      <footer className="bg-white border-t border-slate-300 py-3 px-4 text-center text-[11px] text-slate-500 font-gov">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>
            © 2008 - 2026 <strong>TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM (VACHE)</strong>.
          </span>
          <span className="text-slate-400">
            Hệ thống Một cửa điện tử phục vụ quản trị và điều hành toàn quốc.
          </span>
        </div>
      </footer>
    </div>
  );
}

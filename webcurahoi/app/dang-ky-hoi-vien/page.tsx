"use client";

import React, { useState } from "react";
import Link from "next/link";
import PublicHeader from "@/components/layout/PublicHeader";
import PublicFooter from "@/components/layout/PublicFooter";
import {
  FileText,
  Printer,
  Download,
  CheckCircle2,
  AlertCircle,
  Building2,
  User,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
} from "lucide-react";

export default function MemberRegistrationPage() {
  const [memberType, setMemberType] = useState<"INDIVIDUAL" | "ORGANIZATION">("INDIVIDUAL");
  const [submitted, setSubmitted] = useState(false);
  const [docketNumber, setDocketNumber] = useState("");
  const [submissionTime, setSubmissionTime] = useState("");

  // Form State: Cá nhân
  const [formDataIndividual, setFormDataIndividual] = useState({
    fullName: "",
    gender: "Nam",
    dob: "",
    nationality: "Việt Nam",
    ethnicGroup: "Kinh",
    citizenId: "",
    citizenIdDate: "",
    citizenIdPlace: "Cục Cảnh sát Quản lý hành chính về trật tự xã hội",
    educationLevel: "Đại học",
    academicTitle: "Bác sĩ Chuyên khoa I",
    specialty: "Y học Dự phòng & Y học Gia đình",
    workplace: "Bệnh viện Đa khoa / Trung tâm Y tế",
    position: "Bác sĩ điều trị",
    permanentAddress: "",
    currentAddress: "",
    phone: "",
    email: "",
    targetChapter: "Văn phòng Trung ương Hội (Hà Nội)",
    interestScreening: true,
    interestResearch: false,
    interestEducation: true,
    interestCharity: true,
    experienceNotes: "",
    confirmationAgreed: true,
  });

  // Form State: Tổ chức
  const [formDataOrg, setFormDataOrg] = useState({
    orgName: "",
    orgShortName: "",
    businessLicense: "",
    licenseDate: "",
    licensePlace: "Sở Kế hoạch và Đầu tư",
    headquartersAddress: "",
    representativeName: "",
    representativePosition: "Chủ tịch Hội đồng Quản trị / Giám đốc",
    representativeCitizenId: "",
    representativePhone: "",
    orgPhone: "",
    orgEmail: "",
    orgWebsite: "",
    staffCount: "50-100 người",
    operatingScope: "Sản xuất, phân phối dược liệu và dịch vụ chăm sóc sức khỏe cộng đồng",
    targetChapter: "Văn phòng Trung ương Hội (Hà Nội)",
    confirmationAgreed: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `HS-DKHV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setDocketNumber(randomCode);
    const now = new Date();
    setSubmissionTime(
      `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")} ngày ${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${now.getFullYear()}`
    );
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <PublicHeader />

      <main className="min-h-screen bg-[#f1f5f9] py-8 sm:py-12 font-gov text-slate-800">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          {/* Thanh breadcrumb & Công cụ hỗ trợ hành chính */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-300 pb-3">
            <div className="flex items-center gap-1.5 text-slate-600">
              <Link href="/" className="hover:text-[#991b1b]">
                Trang Chủ
              </Link>
              <span>/</span>
              <Link href="/nhan-su" className="hover:text-[#991b1b]">
                Nhân Sự & Hội Viên
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-bold">
                Tờ Khai Đăng Ký Hội Viên Trực Tuyến
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xs shadow-2xs transition-colors"
                title="In tờ khai này"
              >
                <Printer className="w-3.5 h-3.5 text-slate-500" /> <span className="hidden sm:inline">In Tờ Khai (Ctrl+P)</span><span className="sm:hidden">In</span>
              </button>
              <a
                href="/van-ban"
                className="inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 text-[#991b1b] font-semibold rounded-xs shadow-2xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Xem Điều Lệ Hội</span><span className="sm:hidden">Điều Lệ</span>
              </a>
            </div>
          </div>

          {submitted ? (
            /* =========================================================
               BIÊN NHẬN HỒ SƠ ĐIỆN TỬ CHUẨN CÔNG VỤ
            ========================================================= */
            <div className="bg-white border border-slate-300 rounded-xs shadow-sm p-4 sm:p-10 space-y-6">
              {/* Header biên nhận */}
              <div className="border-b-2 border-[#991b1b] pb-6 text-center space-y-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-start text-[10px] sm:text-[11px] text-slate-600 font-serif border-b border-slate-200 pb-3 mb-3 gap-2">
                  <div className="text-left">
                    <p className="font-bold uppercase text-slate-800">
                      HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE
                      <br />
                      CỘNG ĐỒNG VIỆT NAM
                    </p>
                    <p className="text-[10px] text-slate-500">
                      BAN TỔ CHỨC & QUẢN TRỊ HỘI VIÊN
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-bold uppercase text-slate-900">
                      CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                    </p>
                    <p className="italic text-slate-700">Độc lập - Tự do - Hạnh phúc</p>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-300 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif uppercase tracking-tight">
                  GIẤY BIÊN NHẬN HỒ SƠ ĐĂNG KÝ HỘI VIÊN ĐIỆN TỬ
                </h1>
                <p className="text-xs text-slate-600 font-serif">
                  Hệ thống Một cửa Điện tử Văn phòng Trung ương Hội đã tiếp nhận thành công tờ khai
                </p>
              </div>

              {/* Thông tin hồ sơ */}
              <div className="bg-slate-50 border border-slate-200 rounded-xs p-5 space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-slate-500 block">Mã số hồ sơ tiếp nhận:</span>
                    <strong className="text-base text-[#991b1b] font-mono">
                      {docketNumber}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Thời gian tiếp nhận vào hệ thống:</span>
                    <strong className="text-slate-800 font-mono">{submissionTime}</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 block">Đối tượng đăng ký:</span>
                    <span className="font-bold text-slate-800">
                      {memberType === "INDIVIDUAL"
                        ? "Hội viên Cá nhân (Mẫu số 01A/ĐK-HV)"
                        : "Hội viên Tập thể / Tổ chức (Mẫu số 01B/ĐK-HV)"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Người / Đơn vị làm đơn:</span>
                    <span className="font-bold text-slate-900 uppercase">
                      {memberType === "INDIVIDUAL"
                        ? formDataIndividual.fullName || "Đồng chí đăng ký"
                        : formDataOrg.orgName || "Tổ chức đăng ký"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Số điện thoại liên hệ:</span>
                    <span className="font-mono text-slate-800">
                      {memberType === "INDIVIDUAL"
                        ? formDataIndividual.phone
                        : formDataOrg.orgPhone}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Hộp thư điện tử (Email):</span>
                    <span className="font-mono text-slate-800">
                      {memberType === "INDIVIDUAL"
                        ? formDataIndividual.email
                        : formDataOrg.orgEmail}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tiến trình xử lý theo quy định */}
              <div className="border border-amber-200 bg-amber-50/60 p-4 rounded-xs space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-amber-900">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  Quy trình thẩm định và cấp Thẻ Hội viên theo Điều lệ:
                </div>
                <ol className="list-decimal pl-5 space-y-1 text-slate-700 text-[11px] leading-relaxed">
                  <li>
                    <strong>Bước 1 (1 - 2 ngày làm việc):</strong> Văn phòng Trung ương Hội tiếp nhận hồ sơ, kiểm tra điều kiện tiêu chuẩn hội viên và đối chiếu thông tin pháp lý.
                  </li>
                  <li>
                    <strong>Bước 2:</strong> Ban Tổ chức và Ban Thường trực Hội thẩm định trình Thường trực Ban Thường vụ ký Quyết định kết nạp theo đợt.
                  </li>
                  <li>
                    <strong>Bước 3:</strong> Cấp mã định danh số và Thẻ Hội viên điện tử qua ứng dụng/email, đồng thời hướng dẫn phương thức đóng hội phí thường niên theo quy định.
                  </li>
                </ol>
              </div>

              {/* Tác vụ */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xs flex items-center gap-1.5 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" /> In Giấy Biên Nhận Này
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xs"
                  >
                    Kê Khai Hồ Sơ Khác
                  </button>
                  <Link
                    href="/"
                    className="px-5 py-2 bg-[#991b1b] hover:bg-red-900 text-white font-bold text-xs rounded-xs flex items-center gap-1 shadow-2xs"
                  >
                    Trở Về Trang Chủ <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================
               TỜ KHAI HÀNH CHÍNH A4 CHÍNH THỨC
            ========================================================= */
            <div className="bg-white border border-slate-300 rounded-xs shadow-sm">
              {/* Lựa chọn loại mẫu đơn hành chính (Tabs công vụ phẳng, nghiêm cẩn) */}
              <div className="bg-slate-50 border-b border-slate-300 p-2 sm:p-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setMemberType("INDIVIDUAL")}
                    className={`px-4 py-3 rounded-xs border text-left flex items-start gap-3 transition-colors ${
                      memberType === "INDIVIDUAL"
                        ? "bg-white border-[#991b1b] text-[#991b1b] shadow-xs font-bold"
                        : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-white"
                    }`}
                  >
                    <User className="w-5 h-5 text-[#991b1b] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs uppercase tracking-wide">
                        MẪU 01A: HỘI VIÊN CÁ NHÂN
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                        Dành cho Bác sĩ, Dược sĩ, Y sĩ, Lương y, Cán bộ y tế & Công dân
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMemberType("ORGANIZATION")}
                    className={`px-4 py-3 rounded-xs border text-left flex items-start gap-3 transition-colors ${
                      memberType === "ORGANIZATION"
                        ? "bg-white border-[#991b1b] text-[#991b1b] shadow-xs font-bold"
                        : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-white"
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-[#991b1b] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs uppercase tracking-wide">
                        MẪU 01B: HỘI VIÊN TẬP THỂ / TỔ CHỨC
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                        Dành cho Doanh nghiệp, Bệnh viện, Viện nghiên cứu, Cơ sở y tế
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Nội dung Tờ khai chuẩn thể thức văn bản A4 */}
              <div className="p-4 sm:p-8 lg:p-12 space-y-8">
                {/* 1. Header Quốc hiệu & Đơn vị chủ quản theo chuẩn Nghị định 30/2020/NĐ-CP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-300 text-center sm:text-left font-serif">
                  {/* Bên trái: Cơ quan Hội */}
                  <div className="space-y-1">
                    <p className="text-[11px] font-bold text-slate-800 uppercase tracking-tight">
                      HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE
                      <br />
                      CỘNG ĐỒNG VIỆT NAM
                    </p>
                    <p className="text-[10px] text-slate-500 font-mono">
                      Số: ....../ĐK-HV
                    </p>
                  </div>

                  {/* Bên phải: Quốc hiệu, Tiêu ngữ */}
                  <div className="sm:text-center space-y-1">
                    <p className="text-[11px] font-bold text-slate-900 uppercase tracking-tight">
                      CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                    </p>
                    <p className="text-xs font-semibold text-slate-800 italic">
                      Độc lập - Tự do - Hạnh phúc
                    </p>
                    <div className="w-24 h-[1px] bg-slate-400 mx-auto mt-1" />
                  </div>
                </div>

                {/* Tiêu đề chính thức của đơn */}
                <div className="text-center space-y-2">
                  <div className="inline-block text-[10px] font-mono font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-xs border border-slate-200">
                    {memberType === "INDIVIDUAL"
                      ? "MẪU SỐ 01A/ĐK-HV (Ban hành kèm theo Quyết định số 48/QĐ-TWH)"
                      : "MẪU SỐ 01B/ĐK-HV (Ban hành kèm theo Quyết định số 48/QĐ-TWH)"}
                  </div>

                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif uppercase tracking-tight">
                    ĐƠN XIN GIA NHẬP HỘI
                  </h1>
                  <p className="text-xs sm:text-sm font-bold text-[#991b1b] uppercase font-serif">
                    HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
                  </p>

                  <div className="max-w-md mx-auto pt-3 text-xs font-serif text-slate-700 italic space-y-0.5 text-left sm:text-center">
                    <p>
                      <strong>Kính gửi:</strong> - Ban Thường vụ Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam;
                    </p>
                    <p className="pl-16 sm:pl-0">
                      - Ban Chấp hành Chi hội / Đơn vị tiếp nhận hồ sơ.
                    </p>
                  </div>
                </div>

                {/* =========================================================
                    FORM NHẬP LIỆU CHUẨN TỜ KHAI HÀNH CHÍNH
                ========================================================= */}
                <form onSubmit={handleSubmit} className="space-y-8 text-xs font-gov">
                  {memberType === "INDIVIDUAL" ? (
                    /* -----------------------------------------------------
                       MẪU 01A: THÔNG TIN DÀNH CHO CÁ NHÂN
                    ----------------------------------------------------- */
                    <>
                      {/* PHẦN I: THÔNG TIN BẢN THÂN */}
                      <fieldset className="border border-slate-300 p-4 sm:p-5 rounded-xs space-y-4">
                        <legend className="px-2 font-bold text-slate-900 uppercase text-xs font-serif flex items-center gap-1.5 text-[#991b1b]">
                          <span className="w-1.5 h-3.5 bg-[#991b1b] inline-block" />
                          I. Thông tin nhân thân người làm đơn
                        </legend>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                          <div className="sm:col-span-6">
                            <label className="font-bold text-slate-800 block mb-1">
                              Họ và tên (chữ in hoa theo CCCD) <span className="text-red-600">*</span>:
                            </label>
                            <input
                              type="text"
                              required
                              value={formDataIndividual.fullName}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  fullName: e.target.value.toUpperCase(),
                                })
                              }
                              placeholder="VÍ DỤ: NGUYỄN VĂN AN"
                              className="w-full uppercase font-bold border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] focus:ring-1 focus:ring-[#991b1b] bg-white text-slate-900"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="font-bold text-slate-800 block mb-1">
                              Giới tính <span className="text-red-600">*</span>:
                            </label>
                            <select
                              value={formDataIndividual.gender}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  gender: e.target.value,
                                })
                              }
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white text-slate-900"
                            >
                              <option value="Nam">Nam</option>
                              <option value="Nữ">Nữ</option>
                              <option value="Khác">Khác</option>
                            </select>
                          </div>

                          <div className="sm:col-span-3">
                            <label className="font-bold text-slate-800 block mb-1">
                              Ngày sinh <span className="text-red-600">*</span>:
                            </label>
                            <input
                              type="date"
                              required
                              value={formDataIndividual.dob}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  dob: e.target.value,
                                })
                              }
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white text-slate-900"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                          <div className="sm:col-span-3">
                            <label className="font-bold text-slate-800 block mb-1">
                              Dân tộc:
                            </label>
                            <input
                              type="text"
                              value={formDataIndividual.ethnicGroup}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  ethnicGroup: e.target.value,
                                })
                              }
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="font-bold text-slate-800 block mb-1">
                              Quốc tịch:
                            </label>
                            <input
                              type="text"
                              value={formDataIndividual.nationality}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  nationality: e.target.value,
                                })
                              }
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-slate-50"
                              readOnly
                            />
                          </div>

                          <div className="sm:col-span-6">
                            <label className="font-bold text-slate-800 block mb-1">
                              Số Căn cước công dân (12 chữ số) <span className="text-red-600">*</span>:
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={12}
                              value={formDataIndividual.citizenId}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  citizenId: e.target.value,
                                })
                              }
                              placeholder="Nhập 12 chữ số theo CCCD gắn chip..."
                              className="w-full font-mono border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white text-slate-900"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                          <div className="sm:col-span-4">
                            <label className="font-bold text-slate-800 block mb-1">
                              Ngày cấp CCCD:
                            </label>
                            <input
                              type="date"
                              value={formDataIndividual.citizenIdDate}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  citizenIdDate: e.target.value,
                                })
                              }
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>

                          <div className="sm:col-span-8">
                            <label className="font-bold text-slate-800 block mb-1">
                              Nơi cấp CCCD:
                            </label>
                            <input
                              type="text"
                              value={formDataIndividual.citizenIdPlace}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  citizenIdPlace: e.target.value,
                                })
                              }
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>
                        </div>
                      </fieldset>

                      {/* PHẦN II: TRÌNH ĐỘ CHUYÊN MÔN & ĐƠN VỊ CÔNG TÁC */}
                      <fieldset className="border border-slate-300 p-4 sm:p-5 rounded-xs space-y-4">
                        <legend className="px-2 font-bold text-slate-900 uppercase text-xs font-serif flex items-center gap-1.5 text-[#991b1b]">
                          <span className="w-1.5 h-3.5 bg-[#991b1b] inline-block" />
                          II. Trình độ chuyên môn & Đơn vị công tác
                        </legend>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-slate-800 block mb-1">
                              Học hàm / Học vị / Bằng cấp chuyên môn:
                            </label>
                            <input
                              type="text"
                              value={formDataIndividual.academicTitle}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  academicTitle: e.target.value,
                                })
                              }
                              placeholder="Bác sĩ CKI, Tiến sĩ Y khoa, Dược sĩ, Cử nhân y tế..."
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-800 block mb-1">
                              Chuyên ngành đào tạo chính:
                            </label>
                            <input
                              type="text"
                              value={formDataIndividual.specialty}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  specialty: e.target.value,
                                })
                              }
                              placeholder="Y học cổ truyền, Y học dự phòng, Dược học..."
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-slate-800 block mb-1">
                              Đơn vị / Cơ quan công tác hiện nay:
                            </label>
                            <input
                              type="text"
                              value={formDataIndividual.workplace}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  workplace: e.target.value,
                                })
                              }
                              placeholder="Tên Bệnh viện, Viện nghiên cứu, Phòng khám..."
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-800 block mb-1">
                              Chức vụ chuyên môn / hành chính:
                            </label>
                            <input
                              type="text"
                              value={formDataIndividual.position}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  position: e.target.value,
                                })
                              }
                              placeholder="Trưởng khoa, Bác sĩ điều trị, Cán bộ chuyên trách..."
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>
                        </div>
                      </fieldset>

                      {/* PHẦN III: HỘ KHẨU & LIÊN LẠC */}
                      <fieldset className="border border-slate-300 p-4 sm:p-5 rounded-xs space-y-4">
                        <legend className="px-2 font-bold text-slate-900 uppercase text-xs font-serif flex items-center gap-1.5 text-[#991b1b]">
                          <span className="w-1.5 h-3.5 bg-[#991b1b] inline-block" />
                          III. Địa chỉ cư trú & Thông tin liên lạc chính thức
                        </legend>

                        <div>
                          <label className="font-bold text-slate-800 block mb-1">
                            Hộ khẩu thường trú (ghi theo CCCD) <span className="text-red-600">*</span>:
                          </label>
                          <input
                            type="text"
                            required
                            value={formDataIndividual.permanentAddress}
                            onChange={(e) =>
                                setFormDataIndividual({
                                ...formDataIndividual,
                                permanentAddress: e.target.value,
                              })
                            }
                            placeholder="Số nhà, đường/phố, xã/phường, quận/huyện, tỉnh/thành phố..."
                            className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                          />
                        </div>

                        <div>
                          <label className="font-bold text-slate-800 block mb-1">
                            Nơi ở / Địa chỉ liên lạc hiện nay (nơi nhận thông báo và Thẻ Hội viên):
                          </label>
                          <input
                            type="text"
                            value={formDataIndividual.currentAddress}
                            onChange={(e) =>
                              setFormDataIndividual({
                                ...formDataIndividual,
                                currentAddress: e.target.value,
                              })
                            }
                            placeholder="Nếu trùng với hộ khẩu thường trú thì để trống hoặc ghi 'Như trên'..."
                            className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-slate-800 block mb-1">
                              Số điện thoại liên lạc chính thức <span className="text-red-600">*</span>:
                            </label>
                            <input
                              type="tel"
                              required
                              value={formDataIndividual.phone}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  phone: e.target.value,
                                })
                              }
                              placeholder="Số điện thoại di động cá nhân..."
                              className="w-full font-mono border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-800 block mb-1">
                              Thư điện tử (Email nhận thông báo kết nạp) <span className="text-red-600">*</span>:
                            </label>
                            <input
                              type="email"
                              required
                              value={formDataIndividual.email}
                              onChange={(e) =>
                                setFormDataIndividual({
                                  ...formDataIndividual,
                                  email: e.target.value,
                                })
                              }
                              placeholder="diachi@email.com..."
                              className="w-full font-mono border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>
                        </div>
                      </fieldset>

                      {/* PHẦN IV: ĐĂNG KÝ NƠI SINH HOẠT & NGUYỆN VỌNG */}
                      <fieldset className="border border-slate-300 p-4 sm:p-5 rounded-xs space-y-4">
                        <legend className="px-2 font-bold text-slate-900 uppercase text-xs font-serif flex items-center gap-1.5 text-[#991b1b]">
                          <span className="w-1.5 h-3.5 bg-[#991b1b] inline-block" />
                          IV. Đăng ký nơi sinh hoạt Hội & Nguyện vọng tham gia
                        </legend>

                        <div>
                          <label className="font-bold text-slate-800 block mb-1">
                            Đăng ký sinh hoạt tại Đơn vị / Chi hội trực thuộc <span className="text-red-600">*</span>:
                          </label>
                          <select
                            value={formDataIndividual.targetChapter}
                            onChange={(e) =>
                              setFormDataIndividual({
                                ...formDataIndividual,
                                targetChapter: e.target.value,
                              })
                            }
                            className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white text-slate-900 font-medium"
                          >
                            <option value="Văn phòng Trung ương Hội (Hà Nội)">
                              Cơ quan Văn phòng Trung ương Hội (Số 1 Tôn Thất Thuyết, Cầu Giấy, Hà Nội)
                            </option>
                            <option value="Cơ quan đại diện Trung ương Hội phía Nam (TP.HCM)">
                              Cơ quan đại diện Trung ương Hội phía Nam (Quận 3, Thành phố Hồ Chí Minh)
                            </option>
                            <option value="Cơ quan đại diện khu vực Miền Trung (Đà Nẵng)">
                              Cơ quan đại diện khu vực Miền Trung (Quận Hải Châu, Đà Nẵng)
                            </option>
                            <option value="Cơ quan đại diện khu vực Tây Nguyên (Đắk Lắk)">
                              Cơ quan đại diện khu vực Tây Nguyên (Thành phố Buôn Ma Thuột)
                            </option>
                            <option value="Cơ quan đại diện Đồng bằng Sông Cửu Long (Cần Thơ)">
                              Cơ quan đại diện Đồng bằng Sông Cửu Long (Quận Ninh Kiều, Cần Thơ)
                            </option>
                            <option value="Chi hội Giáo dục Chăm sóc Sức khỏe Thành phố Hà Nội">
                              Chi hội Thành phố Hà Nội
                            </option>
                            <option value="Chi hội Thành phố Hồ Chí Minh">
                              Chi hội Thành phố Hồ Chí Minh
                            </option>
                            <option value="Chi hội Thành phố Hải Phòng">
                              Chi hội Thành phố Hải Phòng
                            </option>
                            <option value="Chi hội Tỉnh Nghệ An">
                              Chi hội Tỉnh Nghệ An
                            </option>
                            <option value="Chi hội Tỉnh Đắk Lắk">
                              Chi hội Tỉnh Đắk Lắk
                            </option>
                            <option value="Chi hội Thành phố Cần Thơ">
                              Chi hội Thành phố Cần Thơ
                            </option>
                            <option value="Chi hội Tỉnh Kiên Giang & TP. Phú Quốc">
                              Chi hội Tỉnh Kiên Giang & TP. Phú Quốc
                            </option>
                            <option value="Viện Nghiên cứu Chăm sóc Sức khỏe Cộng đồng (ICHC)">
                              Viện Nghiên cứu Chăm sóc Sức khỏe Cộng đồng (ICHC)
                            </option>
                            <option value="Viện Nghiên cứu và Ứng dụng Nấm Dược liệu">
                              Viện Nghiên cứu và Ứng dụng Nấm Dược liệu
                            </option>
                          </select>
                        </div>

                        <div>
                          <label className="font-bold text-slate-800 block mb-2">
                            Lĩnh vực chuyên môn mong muốn tham gia đóng góp cho phong trào Hội:
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <label className="flex items-start gap-2 cursor-pointer p-2 bg-slate-50 border border-slate-200 rounded-xs hover:bg-white">
                              <input
                                type="checkbox"
                                checked={formDataIndividual.interestScreening}
                                onChange={(e) =>
                                  setFormDataIndividual({
                                    ...formDataIndividual,
                                    interestScreening: e.target.checked,
                                  })
                                }
                                className="mt-0.5 rounded text-[#991b1b] focus:ring-[#991b1b]"
                              />
                              <span>Tham gia đoàn khám bệnh, sàng lọc và tư vấn sức khỏe miễn phí cho nhân dân</span>
                            </label>

                            <label className="flex items-start gap-2 cursor-pointer p-2 bg-slate-50 border border-slate-200 rounded-xs hover:bg-white">
                              <input
                                type="checkbox"
                                checked={formDataIndividual.interestResearch}
                                onChange={(e) =>
                                  setFormDataIndividual({
                                    ...formDataIndividual,
                                    interestResearch: e.target.checked,
                                  })
                                }
                                className="mt-0.5 rounded text-[#991b1b] focus:ring-[#991b1b]"
                              />
                              <span>Nghiên cứu khoa học y sinh, ứng dụng y học cổ truyền & thảo dược</span>
                            </label>

                            <label className="flex items-start gap-2 cursor-pointer p-2 bg-slate-50 border border-slate-200 rounded-xs hover:bg-white">
                              <input
                                type="checkbox"
                                checked={formDataIndividual.interestEducation}
                                onChange={(e) =>
                                  setFormDataIndividual({
                                    ...formDataIndividual,
                                    interestEducation: e.target.checked,
                                  })
                                }
                                className="mt-0.5 rounded text-[#991b1b] focus:ring-[#991b1b]"
                              />
                              <span>Tuyên truyền, phổ biến kiến thức giáo dục tự phòng bệnh trong cộng đồng</span>
                            </label>

                            <label className="flex items-start gap-2 cursor-pointer p-2 bg-slate-50 border border-slate-200 rounded-xs hover:bg-white">
                              <input
                                type="checkbox"
                                checked={formDataIndividual.interestCharity}
                                onChange={(e) =>
                                  setFormDataIndividual({
                                    ...formDataIndividual,
                                    interestCharity: e.target.checked,
                                  })
                                }
                                className="mt-0.5 rounded text-[#991b1b] focus:ring-[#991b1b]"
                              />
                              <span>Công tác thiện nguyện xã hội, hỗ trợ người yếu thế và bệnh nhân nghèo</span>
                            </label>
                          </div>
                        </div>

                        <div>
                          <label className="font-bold text-slate-800 block mb-1">
                            Tóm tắt quá trình hoạt động y tế / Lý do và nguyện vọng gia nhập Hội:
                          </label>
                          <textarea
                            rows={3}
                            value={formDataIndividual.experienceNotes}
                            onChange={(e) =>
                              setFormDataIndividual({
                                ...formDataIndividual,
                                experienceNotes: e.target.value,
                              })
                            }
                            placeholder="Kính mong được đóng góp kiến thức chuyên môn y khoa vào các chương trình nâng cao thể chất, phòng chống dịch bệnh của Hội..."
                            className="w-full border border-slate-300 p-2.5 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white font-serif leading-relaxed"
                          />
                        </div>
                      </fieldset>
                    </>
                  ) : (
                    /* -----------------------------------------------------
                       MẪU 01B: THÔNG TIN DÀNH CHO TỔ CHỨC / PHÁP NHÂN
                    ----------------------------------------------------- */
                    <>
                      {/* PHẦN I: THÔNG TIN TỔ CHỨC */}
                      <fieldset className="border border-slate-300 p-4 sm:p-5 rounded-xs space-y-4">
                        <legend className="px-2 font-bold text-slate-900 uppercase text-xs font-serif flex items-center gap-1.5 text-[#991b1b]">
                          <span className="w-1.5 h-3.5 bg-[#991b1b] inline-block" />
                          I. Thông tin pháp nhân đăng ký gia nhập
                        </legend>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                          <div className="sm:col-span-8">
                            <label className="font-bold text-slate-800 block mb-1">
                              Tên đầy đủ của Tổ chức / Doanh nghiệp <span className="text-red-600">*</span>:
                            </label>
                            <input
                              type="text"
                              required
                              value={formDataOrg.orgName}
                              onChange={(e) =>
                                setFormDataOrg({
                                  ...formDataOrg,
                                  orgName: e.target.value.toUpperCase(),
                                })
                              }
                              placeholder="VÍ DỤ: CÔNG TY CỔ PHẦN DƯỢC LIỆU VÀ Y HỌC CỘNG ĐỒNG..."
                              className="w-full uppercase font-bold border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <label className="font-bold text-slate-800 block mb-1">
                              Tên viết tắt / Tên giao dịch:
                            </label>
                            <input
                              type="text"
                              value={formDataOrg.orgShortName}
                              onChange={(e) =>
                                setFormDataOrg({
                                  ...formDataOrg,
                                  orgShortName: e.target.value,
                                })
                              }
                              placeholder="VD: MEDI-COMMUNITY VN..."
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                          <div className="sm:col-span-4">
                            <label className="font-bold text-slate-800 block mb-1">
                              Mã số doanh nghiệp / MST <span className="text-red-600">*</span>:
                            </label>
                            <input
                              type="text"
                              required
                              value={formDataOrg.businessLicense}
                              onChange={(e) =>
                                setFormDataOrg({
                                  ...formDataOrg,
                                  businessLicense: e.target.value,
                                })
                              }
                              placeholder="Nhập mã số thuế doanh nghiệp..."
                              className="w-full font-mono border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <label className="font-bold text-slate-800 block mb-1">
                              Ngày cấp phép ĐKKD:
                            </label>
                            <input
                              type="date"
                              value={formDataOrg.licenseDate}
                              onChange={(e) =>
                                setFormDataOrg({
                                  ...formDataOrg,
                                  licenseDate: e.target.value,
                                })
                              }
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>

                          <div className="sm:col-span-4">
                            <label className="font-bold text-slate-800 block mb-1">
                              Nơi cấp giấy phép:
                            </label>
                            <input
                              type="text"
                              value={formDataOrg.licensePlace}
                              onChange={(e) =>
                                setFormDataOrg({
                                  ...formDataOrg,
                                  licensePlace: e.target.value,
                                })
                              }
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="font-bold text-slate-800 block mb-1">
                            Địa chỉ trụ sở chính (theo Giấy chứng nhận ĐKKD) <span className="text-red-600">*</span>:
                          </label>
                          <input
                            type="text"
                            required
                            value={formDataOrg.headquartersAddress}
                            onChange={(e) =>
                              setFormDataOrg({
                                ...formDataOrg,
                                headquartersAddress: e.target.value,
                              })
                            }
                            placeholder="Số nhà, đường/phố, quận/huyện, tỉnh/thành phố..."
                            className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                          />
                        </div>
                      </fieldset>

                      {/* PHẦN II: NGƯỜI ĐẠI DIỆN PHÁP LUẬT */}
                      <fieldset className="border border-slate-300 p-4 sm:p-5 rounded-xs space-y-4">
                        <legend className="px-2 font-bold text-slate-900 uppercase text-xs font-serif flex items-center gap-1.5 text-[#991b1b]">
                          <span className="w-1.5 h-3.5 bg-[#991b1b] inline-block" />
                          II. Thông tin Người đại diện theo pháp luật
                        </legend>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="font-bold text-slate-800 block mb-1">
                              Họ và tên người đại diện pháp luật <span className="text-red-600">*</span>:
                            </label>
                            <input
                              type="text"
                              required
                              value={formDataOrg.representativeName}
                              onChange={(e) =>
                                setFormDataOrg({
                                  ...formDataOrg,
                                  representativeName: e.target.value.toUpperCase(),
                                })
                              }
                              placeholder="HỌ VÀ TÊN VIẾT HOA..."
                              className="w-full uppercase font-bold border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-800 block mb-1">
                              Chức danh trong đơn vị:
                            </label>
                            <input
                              type="text"
                              value={formDataOrg.representativePosition}
                              onChange={(e) =>
                                setFormDataOrg({
                                  ...formDataOrg,
                                  representativePosition: e.target.value,
                                })
                              }
                              className="w-full border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="font-bold text-slate-800 block mb-1">
                              Số CCCD Người đại diện:
                            </label>
                            <input
                              type="text"
                              maxLength={12}
                              value={formDataOrg.representativeCitizenId}
                              onChange={(e) =>
                                setFormDataOrg({
                                  ...formDataOrg,
                                  representativeCitizenId: e.target.value,
                                })
                              }
                              placeholder="12 chữ số..."
                              className="w-full font-mono border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-800 block mb-1">
                              Điện thoại cơ quan <span className="text-red-600">*</span>:
                            </label>
                            <input
                              type="tel"
                              required
                              value={formDataOrg.orgPhone}
                              onChange={(e) =>
                                setFormDataOrg({
                                  ...formDataOrg,
                                  orgPhone: e.target.value,
                                })
                              }
                              placeholder="024.... / 028...."
                              className="w-full font-mono border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>

                          <div>
                            <label className="font-bold text-slate-800 block mb-1">
                              Thư điện tử cơ quan (Email) <span className="text-red-600">*</span>:
                            </label>
                            <input
                              type="email"
                              required
                              value={formDataOrg.orgEmail}
                              onChange={(e) =>
                                setFormDataOrg({
                                  ...formDataOrg,
                                  orgEmail: e.target.value,
                                })
                              }
                              placeholder="vanphong@tochuc.vn"
                              className="w-full font-mono border border-slate-300 px-3 py-2 rounded-xs focus:outline-none focus:border-[#991b1b] bg-white"
                            />
                          </div>
                        </div>
                      </fieldset>
                    </>
                  )}

                  {/* =========================================================
                      PHẦN V: LỜI CAM ĐOAN CỦA NGƯỜI LÀM ĐƠN
                  ========================================================= */}
                  <div className="border-2 border-slate-300 bg-slate-50/80 p-5 rounded-xs space-y-3 font-serif">
                    <h3 className="font-bold text-xs uppercase text-slate-900 border-b border-slate-300 pb-2">
                      V. Lời cam đoan của người làm đơn xin gia nhập Hội
                    </h3>

                    <div className="text-xs text-slate-700 leading-relaxed space-y-2 text-justify">
                      <p>
                        Sau khi nghiên cứu Điều lệ Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam, tôi (chúng tôi) nhận thấy tôn chỉ mục đích hoạt động của Hội hoàn toàn phù hợp với nguyện vọng, khả năng đóng góp của bản thân (đơn vị). Tôi (chúng tôi) tự nguyện làm đơn này kính đề nghị Ban Thường vụ Trung ương Hội và Chi hội cơ sở xem xét, quyết định kết nạp vào Hội.
                      </p>
                      <p className="font-semibold text-slate-800">
                        Nếu được Ban Thường vụ Trung ương Hội đồng ý kết nạp, tôi (chúng tôi) xin cam đoan:
                      </p>
                      <ul className="list-disc pl-5 space-y-1 text-[11px] text-slate-800">
                        <li>
                          Tuyệt đối chấp hành nghiêm chỉnh Cương lĩnh, Điều lệ Hội và các Nghị quyết của Ban Chấp hành Trung ương Hội;
                        </li>
                        <li>
                          Tích cực tham gia các phong trào, hoạt động giáo dục và chăm sóc sức khỏe ban đầu cho nhân dân;
                        </li>
                        <li>
                          Hoàn thành đầy đủ nghĩa vụ hội phí thường niên theo đúng quy định của Điều lệ;
                        </li>
                        <li>
                          Chịu hoàn toàn trách nhiệm trước pháp luật và Ban Chấp hành Hội về tính chính xác, trung thực của các thông tin đã kê khai trong tờ khai này.
                        </li>
                      </ul>
                    </div>

                    <div className="pt-2 border-t border-slate-300">
                      <label className="flex items-center gap-2 cursor-pointer font-gov text-xs font-bold text-slate-900">
                        <input
                          type="checkbox"
                          required
                          checked={
                            memberType === "INDIVIDUAL"
                              ? formDataIndividual.confirmationAgreed
                              : formDataOrg.confirmationAgreed
                          }
                          onChange={(e) => {
                            if (memberType === "INDIVIDUAL") {
                              setFormDataIndividual({
                                ...formDataIndividual,
                                confirmationAgreed: e.target.checked,
                              })
                            } else {
                              setFormDataOrg({
                                ...formDataOrg,
                                confirmationAgreed: e.target.checked,
                              })
                            }
                          }}
                          className="rounded text-[#991b1b] focus:ring-[#991b1b] w-4 h-4"
                        />
                        <span>
                          Tôi xác nhận đã đọc kỹ Điều lệ và cam đoan mọi thông tin kê khai trên là hoàn toàn chính xác.
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* PHẦN KÝ TÊN VÀ NỘI DUNG VĂN BẢN HÀNH CHÍNH */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 font-serif text-center">
                    <div className="border border-dashed border-slate-300 p-4 rounded-xs text-xs space-y-2 bg-slate-50/50">
                      <p className="font-bold uppercase text-slate-700">
                        Ý KIẾN CỦA CHI HỘI / ĐƠN VỊ TIẾP NHẬN
                      </p>
                      <p className="text-[11px] text-slate-500 italic">
                        (Dành cho Chi hội cơ sở thẩm định, ký duyệt sau khi tiếp nhận hồ sơ)
                      </p>
                      <div className="h-16 flex items-center justify-center text-slate-400 italic text-[11px]">
                        [Khu vực ký duyệt điện tử nội bộ]
                      </div>
                    </div>

                    <div className="p-4 rounded-xs text-xs space-y-1">
                      <p className="italic text-slate-600 text-[11px]">
                        Lập tại Việt Nam, ngày {new Date().getDate()} tháng {new Date().getMonth() + 1} năm {new Date().getFullYear()}
                      </p>
                      <p className="font-bold uppercase text-slate-900">
                        {memberType === "INDIVIDUAL" ? "NGƯỜI LÀM ĐƠN" : "ĐẠI DIỆN TỔ CHỨC LÀM ĐƠN"}
                      </p>
                      <p className="text-[10px] text-slate-500 italic">
                        (Ký điện tử bằng cách nhấn nút gửi tờ khai bên dưới)
                      </p>
                      <div className="pt-4 font-mono font-bold text-slate-800 uppercase">
                        {memberType === "INDIVIDUAL"
                          ? formDataIndividual.fullName || "[Họ và tên người làm đơn]"
                          : formDataOrg.representativeName || "[Họ và tên người đại diện]"}
                      </div>
                    </div>
                  </div>

                  {/* NÚT THAO TÁC HÀNH CHÍNH */}
                  <div className="pt-6 border-t border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-slate-500 text-[11px] flex items-center gap-1.5 font-serif italic">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                      Tờ khai được mã hóa bảo mật và lưu trữ chính thức tại Trung ương Hội.
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={handlePrint}
                        className="flex-1 sm:flex-none px-4 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold rounded-xs text-xs transition-colors shadow-2xs flex items-center justify-center gap-1.5"
                      >
                        <Printer className="w-4 h-4 text-slate-500" /> In Xem Trước
                      </button>

                      <button
                        type="submit"
                        className="flex-1 sm:flex-none px-6 py-3 bg-[#991b1b] hover:bg-red-900 text-white font-bold rounded-xs text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center justify-center gap-2"
                      >
                        NỘP TỜ KHAI ĐIỆN TỬ <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Hộp chỉ dẫn pháp lý & Hotline Văn phòng Hội */}
          <div className="bg-slate-200/80 border border-slate-300 p-4 rounded-xs text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div className="space-y-0.5 text-slate-700">
              <p className="font-bold text-slate-900">
                Văn phòng Thường trực Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam
              </p>
              <p className="text-[11px]">
                Địa chỉ: Tầng 5, Cung Trí Thức Hà Nội, Số 1 Tôn Thất Thuyết, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs shrink-0">
              <Phone className="w-3.5 h-3.5 text-[#991b1b]" />
              <span>Hỗ trợ kết nạp hội viên: <strong className="text-slate-900 font-mono">024.3782.3556</strong></span>
            </div>
          </div>
        </div>
      </main>

      <PublicFooter />
    </>
  );
}

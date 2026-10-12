"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  X,
  Printer,
  Download,
  QrCode,
  Award,
  CheckCircle2,
} from "lucide-react";

interface CertificateData {
  code: string;
  verifyCode: string;
  verifyUrl: string;
  title: string;
  unit: { code: string; name: string };
  year: number;
  issuedAt: string;
  issuedBy?: string | null;
}

interface Props {
  data: CertificateData;
  onClose: () => void;
}

export default function CertificateModal({ data, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyVerify = () => {
    navigator.clipboard.writeText(data.verifyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const issuedDate = new Date(data.issuedAt).toLocaleDateString("vi-VN");

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 print:bg-white print:p-0">
      <div className="bg-white max-w-3xl w-full rounded-xs border-2 border-slate-400 shadow-2xl overflow-hidden font-gov max-h-[95vh] flex flex-col print:border-0 print:shadow-none print:max-h-none">
        {/* Header */}
        <div className="bg-[#991b1b] text-white px-5 py-3 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-300" />
            <span className="font-bold text-xs uppercase tracking-wider">
              Giấy Chứng Nhận Hoàn Thành Nghĩa Vụ Hội Viên
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body chứng nhận */}
        <div className="p-8 sm:p-12 space-y-6 overflow-y-auto flex-1">
          {/* Quốc hiệu */}
          <div className="text-center space-y-1 border-b-2 border-dashed border-slate-300 pb-5">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-700">
              CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
            </p>
            <p className="text-[10.5px] italic text-slate-600">
              Độc lập - Tự do - Hạnh phúc
            </p>
            <div className="w-32 h-px bg-slate-400 mx-auto my-2" />
            <p className="text-[12px] font-bold uppercase text-[#991b1b]">
              TRUNG ƯƠNG HỘI GIÁO DỤC CHĂM SÓC SỨC KHỎE CỘNG ĐỒNG VIỆT NAM
            </p>
          </div>

          {/* Tiêu đề chứng nhận */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 border-2 border-amber-400 rounded-full">
              <Award className="w-5 h-5 text-amber-700" />
              <span className="text-xs font-black uppercase text-amber-900 tracking-wider">
                Giấy Chứng Nhận
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif pt-2">
              HOÀN THÀNH NGHĨA VỤ HỘI VIÊN
            </h1>
            <p className="text-sm text-slate-600 italic">
              Năm tài chính {data.year}
            </p>
          </div>

          {/* Nội dung chứng nhận */}
          <div className="text-center space-y-3 py-4">
            <p className="text-xs text-slate-600 uppercase tracking-wide">
              Trung ương Hội trân trọng chứng nhận
            </p>
            <div className="space-y-1">
              <p className="font-mono text-xs text-slate-500">
                Mã số đơn vị: {data.unit.code}
              </p>
              <h2 className="text-lg sm:text-xl font-bold text-[#991b1b] font-serif leading-tight">
                {data.unit.name}
              </h2>
            </div>
            <p className="text-xs text-slate-700 max-w-xl mx-auto leading-relaxed">
              Đã hoàn thành đầy đủ nghĩa vụ hội phí niên liễm năm{" "}
              <strong>{data.year}</strong> theo quy định của Điều lệ Hội Giáo
              dục Chăm sóc Sức khỏe Cộng đồng Việt Nam và Nghị quyết Ban Chấp
              hành Trung ương Hội nhiệm kỳ 2021 - 2026.
            </p>
          </div>

          {/* Thông tin chứng nhận */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xs border border-slate-200 text-xs">
            <div className="space-y-1">
              <span className="text-slate-500 block text-[10.5px] uppercase tracking-wide">
                Số chứng nhận:
              </span>
              <strong className="font-mono text-slate-900">{data.code}</strong>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 block text-[10.5px] uppercase tracking-wide">
                Ngày cấp:
              </span>
              <strong className="font-mono text-slate-900">{issuedDate}</strong>
            </div>
            <div className="space-y-1 sm:col-span-2">
              <span className="text-slate-500 block text-[10.5px] uppercase tracking-wide">
                Đơn vị cấp:
              </span>
              <strong className="text-slate-900">
                {data.issuedBy ?? "Ban Thường vụ Trung ương Hội"}
              </strong>
            </div>
          </div>

          {/* Khu vực ký + QR */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            {/* QR xác thực */}
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-[10.5px] uppercase tracking-widest text-slate-500 font-bold">
                Mã QR Xác Thực
              </span>
              <div className="w-32 h-32 border-2 border-slate-300 rounded-xs p-2 flex items-center justify-center bg-white">
                <QrCode className="w-24 h-24 text-slate-900" />
              </div>
              <p className="text-[10px] text-slate-500 font-mono leading-tight max-w-[180px]">
                Quét mã hoặc truy cập:
                <br />
                <button
                  onClick={handleCopyVerify}
                  className="text-[#991b1b] hover:underline break-all cursor-pointer font-bold"
                >
                  {data.verifyUrl}
                </button>
                {copied && (
                  <span className="block text-emerald-700 mt-1 font-bold">
                    ✓ Đã sao chép
                  </span>
                )}
              </p>
            </div>

            {/* Chữ ký số */}
            <div className="flex flex-col items-center text-center space-y-2">
              <span className="text-[10.5px] uppercase tracking-widest text-slate-500 font-bold">
                Chữ Ký Số Điện Tử
              </span>
              <div className="h-32 flex flex-col items-center justify-center gap-2 border-2 border-emerald-300 bg-emerald-50 rounded-xs px-4">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Đã Ký Số Bởi
                </span>
                <span className="text-[10px] font-mono text-emerald-700 text-center leading-tight">
                  TW HỘI GDCSSKCĐ VN
                  <br />
                  {data.issuedAt}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center text-[10.5px] text-slate-400 italic pt-2 border-t border-slate-200">
            Chứng nhận điện tử có giá trị pháp lý khi tra cứu mã xác thực trên hệ thống
            chính thức của Trung ương Hội.
          </div>
        </div>

        {/* Actions */}
        <div className="bg-slate-50 px-5 py-4 border-t border-slate-200 flex flex-wrap gap-2 justify-end print:hidden">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xs font-bold text-xs flex items-center gap-1.5 border border-slate-300 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> In / Tải PDF
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs font-bold text-xs cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
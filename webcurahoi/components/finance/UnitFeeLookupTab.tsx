"use client";

import React, { useState } from "react";
import {
  Search,
  Building2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Receipt,
  QrCode,
  FileText,
  Download,
} from "lucide-react";
import {
  financeApi,
  UnitStatusResponse,
  UnitPaymentRow,
} from "@/lib/api-client";
import CertificateModal from "./certificate/CertificateModal";
import { PaymentPrefill } from "@/hooks/usePaymentPrefill";

interface Props {
  onGoToPayment?: (prefill: PaymentPrefill) => void;
}

export default function UnitFeeLookupTab({ onGoToPayment }: Props) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<UnitStatusResponse | null>(null);
  const [payments, setPayments] = useState<UnitPaymentRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [certificate, setCertificate] = useState<any | null>(null);
  const [issuingCert, setIssuingCert] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (!clean) return;

    setLoading(true);
    setError(null);
    setStatus(null);
    setPayments([]);

    const [s, p] = await Promise.all([
      financeApi.unitStatus(clean),
      financeApi.unitPayments(clean),
    ]);

    setLoading(false);

    if (!s) {
      setError(
        `Không tìm thấy đơn vị có mã "${clean}". Vui lòng kiểm tra lại hoặc liên hệ Văn phòng Trung ương Hội.`
      );
      return;
    }

    setStatus(s);
    setPayments(p ?? []);
  };

  const handleQuickFill = (sampleCode: string) => {
    setCode(sampleCode);
  };

  /** Mở chứng nhận PDF của năm tương ứng */
  async function handleOpenCertificate(year: number) {
    if (!status) return;
    setIssuingCert(true);
    try {
      const API =
        process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

      // 1. Thử lấy chứng nhận đã có
      let res = await fetch(
        `${API}/finance/units/${status.unit.code}/certificates/${year}`
      );

      // 2. Nếu chưa có → cấp mới
      if (!res.ok) {
        res = await fetch(
          `${API}/finance/units/${status.unit.code}/certificates/${year}/issue`,
          { method: "POST" }
        );
      }

      if (!res.ok) throw new Error("Không thể lấy chứng nhận");
      const data = await res.json();
      setCertificate(data);
    } catch (e: any) {
      alert(`Lỗi: ${e.message}`);
    } finally {
      setIssuingCert(false);
    }
  }

  /** Bấm "Tạo QR nộp ngay" → nhảy sang Tab 3 với dữ liệu điền sẵn */
  function handleGoToPayment() {
    if (!status || !status.reminder || !onGoToPayment) {
      // Fallback nếu không có callback
      window.location.hash = "cong-chuyen-khoan";
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    onGoToPayment({
      purpose: "MEMBERSHIP_FEE",
      amount: status.reminder.amountRemaining,
      payerName: status.unit.name,
      unitCode: status.unit.code,
    });
  }

  return (
    <div className="space-y-8">
      {/* KHỐI TRA CỨU */}
      <section className="bg-white border border-slate-300 rounded-xs shadow-2xs p-5 sm:p-6 space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <span className="text-xs font-bold text-[#991b1b] uppercase tracking-wider block">
            Trụ Cột 2 — Đáp ứng Mục 2 Nghiệp Vụ Mảng V
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif mt-0.5">
            TRA CỨU TÌNH TRẠNG HỘI PHÍ THEO MÃ ĐƠN VỊ
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dành cho Chi hội, Liên Chi hội, Viện, Trung tâm và Doanh nghiệp hội
            viên. Nhập mã đơn vị để xem trạng thái đóng niên liễm và lịch sử
            giao dịch.
          </p>
        </div>

        <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="VD: CH-DANANG, VIEN-YSH01, DN-AOVUA..."
              className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xs focus:outline-none focus:ring-1 focus:ring-[#991b1b] font-mono text-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>
          <button
            type="submit"
            disabled={loading || !code.trim()}
            className="px-6 py-2.5 bg-[#991b1b] hover:bg-red-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xs font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
          >
            {loading ? (
              <>
                <Clock className="w-4 h-4 animate-spin" /> Đang tra cứu...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" /> Tra cứu ngay
              </>
            )}
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          <span className="font-bold text-slate-700">Mã mẫu thử:</span>
          {["CH-DANANG", "VIEN-YSH01", "DN-AOVUA"].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => handleQuickFill(c)}
              className="px-2 py-0.5 bg-slate-100 hover:bg-red-50 hover:text-[#991b1b] border border-slate-200 rounded-xs font-mono font-bold transition-colors cursor-pointer"
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* LỖI */}
      {error && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-xs text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
          <div>
            <strong>Không tra cứu được:</strong>
            <p className="mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* KẾT QUẢ */}
      {status && (
        <div className="space-y-6">
          <section className="bg-white border border-slate-300 rounded-xs shadow-2xs overflow-hidden">
            <div className="p-5 bg-slate-50 border-b border-slate-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xs bg-[#991b1b] text-white flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-mono text-xs font-bold text-[#991b1b] block">
                  {status.unit.code}
                </span>
                <h3 className="font-bold text-base text-slate-900 font-serif leading-snug">
                  {status.unit.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {status.unit.province && <>Địa bàn: {status.unit.province}</>}
                </p>
              </div>
            </div>

            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-slate-500 block text-[11px] uppercase tracking-wide font-bold">
                  Trạng thái
                </span>
                {status.status === "COMPLETED" ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-emerald-50 text-emerald-800 text-sm font-bold border border-emerald-300">
                    <CheckCircle2 className="w-4 h-4" /> Đã hoàn thành
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xs bg-amber-50 text-amber-900 text-sm font-bold border border-amber-300">
                    <AlertCircle className="w-4 h-4" /> Chưa hoàn thành
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 block text-[11px] uppercase tracking-wide font-bold">
                  Các năm đã đóng đủ
                </span>
                <span className="font-mono text-sm text-slate-900">
                  {status.paidYears.length > 0
                    ? status.paidYears.sort((a, b) => a - b).join(", ")
                    : "—"}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 block text-[11px] uppercase tracking-wide font-bold">
                  Tổng còn nợ
                </span>
                <span
                  className={`font-mono text-base font-black ${
                    status.totalOutstanding > 0
                      ? "text-[#991b1b]"
                      : "text-emerald-700"
                  }`}
                >
                  {new Intl.NumberFormat("vi-VN").format(
                    status.totalOutstanding
                  )}{" "}
                  đ
                </span>
              </div>
            </div>

            {status.reminder && (
              <div
                className={`p-4 border-t text-xs flex items-start gap-2.5 ${
                  status.reminder.overdue
                    ? "bg-red-50 border-red-200 text-red-900"
                    : "bg-amber-50 border-amber-200 text-amber-900"
                }`}
              >
                {status.reminder.overdue ? (
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-700" />
                ) : (
                  <Clock className="w-5 h-5 shrink-0 text-amber-700" />
                )}
                <div className="flex-1">
                  <p className="font-bold">{status.reminder.message}</p>
                  <p className="text-[11px] mt-0.5 opacity-90">
                    Số tiền cần nộp còn lại:{" "}
                    <strong className="font-mono">
                      {new Intl.NumberFormat("vi-VN").format(
                        status.reminder.amountRemaining
                      )}{" "}
                      đ
                    </strong>
                  </p>
                </div>
                <button
                  onClick={handleGoToPayment}
                  className="shrink-0 self-start px-4 py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-xs font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <QrCode className="w-4 h-4" /> Tạo QR nộp ngay
                </button>
              </div>
            )}
          </section>

          <section className="bg-white border border-slate-300 rounded-xs shadow-2xs overflow-hidden">
            <div className="p-4 border-b border-slate-200 text-xs font-bold text-slate-800">
              Bảng Nghĩa Vụ Hội Phí Theo Năm
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[640px]">
                <thead className="bg-[#f8fafc] text-slate-700 font-bold border-b border-slate-300 uppercase text-[10.5px]">
                  <tr>
                    <th className="py-2.5 px-3 text-left w-24">Năm</th>
                    <th className="py-2.5 px-3 text-right">Phải nộp</th>
                    <th className="py-2.5 px-3 text-right">Đã nộp</th>
                    <th className="py-2.5 px-3 text-right">Còn lại</th>
                    <th className="py-2.5 px-3 text-center w-40">Trạng thái</th>
                    <th className="py-2.5 px-3 text-center w-32">Chứng nhận</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {status.obligations.map((o) => (
                    <tr key={o.year} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-900">
                        {o.year}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-800">
                        {new Intl.NumberFormat("vi-VN").format(o.amountDue)} đ
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-emerald-700 font-bold">
                        {new Intl.NumberFormat("vi-VN").format(o.amountPaid)} đ
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-[#991b1b] font-bold">
                        {new Intl.NumberFormat("vi-VN").format(
                          o.amountRemaining
                        )}{" "}
                        đ
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {o.status === "PAID" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
                            <CheckCircle2 className="w-3 h-3" /> Đã đóng đủ
                          </span>
                        ) : o.status === "PARTIAL" ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                            Đóng một phần
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300">
                            <AlertCircle className="w-3 h-3" /> Chưa đóng
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {o.status === "PAID" ? (
                          <button
                            onClick={() => handleOpenCertificate(o.year)}
                            disabled={issuingCert}
                            className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 hover:bg-red-100 disabled:bg-slate-100 text-[#991b1b] rounded-xs text-[10px] font-bold border border-red-200 transition-colors cursor-pointer disabled:cursor-wait"
                          >
                            <Download className="w-3 h-3" />{" "}
                            {issuingCert ? "Đang xử lý..." : "PDF"}
                          </button>
                        ) : (
                          <span className="text-slate-300 text-[10px]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {payments.length > 0 && (
            <section className="bg-white border border-slate-300 rounded-xs shadow-2xs overflow-hidden">
              <div className="p-4 border-b border-slate-200 text-xs font-bold text-slate-800 flex items-center gap-2">
                <Receipt className="w-4 h-4 text-[#991b1b]" /> Lịch Sử Giao
                Dịch Đã Hoàn Tất
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[640px]">
                  <thead className="bg-[#f8fafc] text-slate-700 font-bold border-b border-slate-300 uppercase text-[10.5px]">
                    <tr>
                      <th className="py-2.5 px-3 text-left w-40">Mã giao dịch</th>
                      <th className="py-2.5 px-3 text-left">Mục đích</th>
                      <th className="py-2.5 px-3 text-right w-32">Số tiền</th>
                      <th className="py-2.5 px-3 text-center w-32">Ngân hàng</th>
                      <th className="py-2.5 px-3 text-center w-40">Thời gian</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {payments.map((p) => (
                      <tr key={p.code} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-bold text-[#991b1b]">
                          {p.code}
                        </td>
                        <td className="py-2.5 px-3 text-slate-700">
                          {p.purpose}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                          {new Intl.NumberFormat("vi-VN").format(p.amount)} đ
                        </td>
                        <td className="py-2.5 px-3 text-center text-slate-600">
                          {p.bankGateway ?? "—"}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-[11px] text-slate-500">
                          {new Date(p.completedAt).toLocaleString("vi-VN")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      )}

      {!status && !error && !loading && (
        <section className="bg-slate-50 border border-dashed border-slate-300 rounded-xs p-8 text-center">
          <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="font-bold text-sm text-slate-700">
            Nhập mã đơn vị để bắt đầu tra cứu
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Hệ thống sẽ hiển thị tình trạng đóng niên liễm các năm, số tiền còn
            nợ, nhắc nhở hạn quyết toán và lịch sử giao dịch chi tiết.
          </p>
        </section>
      )}

      {certificate && (
        <CertificateModal
          data={certificate}
          onClose={() => setCertificate(null)}
        />
      )}
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { MOCK_REPORTS } from "@/lib/mock-data";
import { Report } from "@/lib/db/schema";
import {
  FileCheck2,
  Upload,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Search,
  MessageSquare,
} from "lucide-react";

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // New report form state
  const [newReport, setNewReport] = useState({
    title: "",
    period: "QUARTER_1",
    year: 2026,
    summary: "",
    organizationName: "Chi hội Đà Nẵng",
  });

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Report = {
      id: "rep-" + Date.now(),
      organizationId: "org-ch-01",
      organizationName: newReport.organizationName,
      title: newReport.title,
      period: newReport.period as any,
      year: newReport.year,
      reportType: "ONLINE",
      attachments: [{ name: "BaoCao_DinhKem.pdf", url: "#", size: "1.5 MB" }],
      summary: newReport.summary,
      submittedAt: new Date().toISOString().split("T")[0],
      status: "PENDING",
    };
    setReports([created, ...reports]);
    setShowSubmitModal(false);
  };

  const handleApprove = (id: string) => {
    setReports(
      reports.map((r) =>
        r.id === id
          ? { ...r, status: "APPROVED", feedback: "Văn phòng Trung ương Hội đã thẩm định đạt yêu cầu." }
          : r
      )
    );
    if (selectedReport && selectedReport.id === id) {
      setSelectedReport({
        ...selectedReport,
        status: "APPROVED",
        feedback: "Văn phòng Trung ương Hội đã thẩm định đạt yêu cầu.",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            HỆ THỐNG NỘP & DUYỆT BÁO CÁO TRỰC TUYẾN
          </h1>
          <p className="text-xs text-slate-500">
            Thực hiện chế độ báo cáo định kỳ/đột xuất của các Chi hội, Viện, Trung tâm trực thuộc về Trung ương Hội.
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1.5 transition-colors"
        >
          <Upload className="w-4 h-4" /> Nộp Báo Cáo Mới (Online)
        </button>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center text-xs">
          <span className="font-bold text-slate-700">Danh Sách Báo Cáo Đã Tiếp Nhận</span>
          <span className="text-slate-500">Tổng số: {reports.length} báo cáo</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4">Đơn vị gửi</th>
                <th className="py-3 px-4">Tiêu đề báo cáo</th>
                <th className="py-3 px-4">Kỳ báo cáo</th>
                <th className="py-3 px-4">Tệp đính kèm</th>
                <th className="py-3 px-4">Ngày nộp</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((rep) => (
                <tr key={rep.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                    {rep.organizationName}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-800 max-w-sm">
                    {rep.title}
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                    {rep.period} - {rep.year}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {rep.attachments.map((file, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-100 rounded text-[11px] text-slate-700"
                      >
                        <FileText className="w-3 h-3 text-red-500" /> {file.name}
                      </span>
                    ))}
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {rep.submittedAt}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {rep.status === "APPROVED" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        <CheckCircle className="w-3 h-3" /> Đã Phê Duyệt
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                        <Clock className="w-3 h-3" /> Chờ Thẩm Định
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                    <button
                      onClick={() => setSelectedReport(rep)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-semibold"
                    >
                      Chi tiết
                    </button>
                    {rep.status !== "APPROVED" && (
                      <button
                        onClick={() => handleApprove(rep.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-semibold"
                      >
                        Duyệt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Nộp Báo Cáo Mới */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                Nộp Báo Cáo Định Kỳ Trực Tuyến Lên Trung ương Hội
              </h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">Đơn vị gửi báo cáo:</label>
                <input
                  type="text"
                  readOnly
                  value={newReport.organizationName}
                  className="w-full border p-2 rounded bg-slate-50 text-slate-600"
                />
              </div>

              <div>
                <label className="font-bold block mb-1">Tiêu đề báo cáo:</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Báo cáo kết quả hoạt động chăm sóc sức khỏe Quý I/2026"
                  value={newReport.title}
                  onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                  className="w-full border p-2 rounded focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Kỳ báo cáo:</label>
                  <select
                    value={newReport.period}
                    onChange={(e) => setNewReport({ ...newReport, period: e.target.value })}
                    className="w-full border p-2 rounded bg-white"
                  >
                    <option value="MONTHLY">Báo cáo Tháng</option>
                    <option value="QUARTER_1">Quý I</option>
                    <option value="QUARTER_2">Quý II</option>
                    <option value="QUARTER_3">Quý III</option>
                    <option value="QUARTER_4">Quý IV</option>
                    <option value="ANNUAL">Báo cáo Năm (Tổng kết)</option>
                    <option value="AD_HOC">Đột xuất / Chuyên đề</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">Năm báo cáo:</label>
                  <input
                    type="number"
                    value={newReport.year}
                    onChange={(e) => setNewReport({ ...newReport, year: parseInt(e.target.value) })}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Tóm tắt nội dung chính:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Các hoạt động trọng tâm đã thực hiện, số liệu hội viên, khó khăn vướng mắc..."
                  value={newReport.summary}
                  onChange={(e) => setNewReport({ ...newReport, summary: e.target.value })}
                  className="w-full border p-2 rounded focus:ring-1 focus:ring-emerald-500"
                ></textarea>
              </div>

              <div>
                <label className="font-bold block mb-1">Tệp đính kèm (Word / PDF / Scan):</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center bg-slate-50">
                  <Upload className="w-5 h-5 mx-auto text-slate-400 mb-1" />
                  <span className="text-[11px] text-slate-500">
                    Bấm để chọn file hoặc kéo thả tệp báo cáo vào đây
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-100"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-700"
                >
                  Gửi Báo Cáo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Chi tiết & Thẩm định */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                Chi Tiết Báo Cáo & Ý Kiến Phản Hồi Của Trung ương Hội
              </h3>
              <button
                onClick={() => setSelectedReport(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              <p><strong>Đơn vị:</strong> {selectedReport.organizationName}</p>
              <p><strong>Tiêu đề:</strong> {selectedReport.title}</p>
              <p><strong>Kỳ báo cáo:</strong> {selectedReport.period} - {selectedReport.year}</p>
              <p><strong>Ngày gửi:</strong> {selectedReport.submittedAt}</p>
              <div className="p-3 bg-slate-50 rounded border">
                <strong>Nội dung tóm tắt:</strong>
                <p className="mt-1 text-slate-700">{selectedReport.summary}</p>
              </div>

              {selectedReport.feedback && (
                <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-800">
                  <strong className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5" /> Ý kiến từ Văn phòng Trung ương Hội:
                  </strong>
                  <p className="mt-1">{selectedReport.feedback}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t flex justify-end gap-2">
              <button
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-100"
              >
                Đóng
              </button>
              {selectedReport.status !== "APPROVED" && (
                <button
                  onClick={() => handleApprove(selectedReport.id)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-700"
                >
                  Phê Duyệt Đạt Yêu Cầu
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

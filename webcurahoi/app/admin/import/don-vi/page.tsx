"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Upload,
  CheckCircle2,
  XCircle,
  Loader2,
  Download,
  ArrowLeft,
  Users,
  RotateCcw,
  Building2,
} from "lucide-react";

interface ParsedUnit {
  code: string;
  name: string;
  unitType: string;
  province?: string;
  contactEmail?: string;
  annualFee?: number;
}

interface ImportResult {
  code: string;
  name: string;
  success: boolean;
  error?: string;
}

const UNIT_TYPES = [
  "BRANCH",
  "UNION_BRANCH",
  "INSTITUTE",
  "CENTER",
  "SPECIALIZED_BOARD",
  "REP_OFFICE",
  "ENTERPRISE",
];

export default function ImportUnitsPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>("");
  const [parsed, setParsed] = useState<ParsedUnit[]>([]);
  const [parseError, setParseError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [results, setResults] = useState<ImportResult[] | null>(null);
  const [summary, setSummary] = useState<{
    total: number;
    ok: number;
    fail: number;
    obligations?: any;
  } | null>(null);

  function parseCsv(text: string): ParsedUnit[] {
    const clean = text.replace(/^\uFEFF/, "");
    const lines = clean.split(/\r?\n/).filter((l) => l.trim());
    if (lines.length < 2) throw new Error("File CSV cần có ít nhất 1 dòng dữ liệu");

    const header = lines[0].split(",").map((s) => s.trim());
    const idx = {
      code: header.indexOf("code"),
      name: header.indexOf("name"),
      unitType: header.indexOf("unitType"),
      province: header.indexOf("province"),
      contactEmail: header.indexOf("contactEmail"),
      annualFee: header.indexOf("annualFee"),
    };

    if (idx.code < 0 || idx.name < 0 || idx.unitType < 0) {
      throw new Error(
        'File CSV phải có 3 cột bắt buộc: "code", "name", "unitType". Các cột khác tùy chọn.'
      );
    }

    const rows: ParsedUnit[] = [];
    for (let i = 1; i < lines.length; i++) {
      const cells = lines[i].split(",").map((s) => s.trim());
      const code = (cells[idx.code] ?? "").toUpperCase();
      const name = cells[idx.name] ?? "";
      const unitType = (cells[idx.unitType] ?? "BRANCH").toUpperCase();

      if (!code || !name) continue;

      if (!UNIT_TYPES.includes(unitType)) {
        throw new Error(
          `Dòng ${i + 1}: unitType "${unitType}" không hợp lệ. Phải là: ${UNIT_TYPES.join(", ")}`
        );
      }

      rows.push({
        code,
        name,
        unitType,
        province: cells[idx.province] ?? "",
        contactEmail: cells[idx.contactEmail] ?? "",
        annualFee: parseInt(cells[idx.annualFee] ?? "0", 10) || 0,
      });
    }

    if (rows.length === 0) throw new Error("Không có dòng dữ liệu hợp lệ");
    return rows;
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setResults(null);
    setSummary(null);
    setParseError(null);
    setParsed([]);

    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string;
        const rows = parseCsv(text);
        setParsed(rows);
      } catch (err: any) {
        setParseError(err.message);
      }
    };
    reader.readAsText(file, "UTF-8");
  }

  async function handleImport() {
    if (parsed.length === 0) return;
    setImporting(true);
    setResults(null);
    setSummary(null);

    try {
      const res = await fetch("/api/import-units", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ units: parsed }),
      });
      const data = await res.json();

      if (data.success) {
        setResults(data.results);
        setSummary({
          total: data.total,
          ok: data.ok,
          fail: data.fail,
          obligations: data.obligations,
        });
      } else {
        alert(`Lỗi: ${data.message}`);
      }
    } catch (e: any) {
      alert(`Lỗi kết nối: ${e.message}`);
    } finally {
      setImporting(false);
    }
  }

  function handleReset() {
    if (fileRef.current) fileRef.current.value = "";
    setFileName("");
    setParsed([]);
    setParseError(null);
    setResults(null);
    setSummary(null);
  }

  function handleDownloadSample() {
    const sample = `code,name,unitType,province,contactEmail,annualFee
CH-DANANG,Chi hội Đà Nẵng,BRANCH,Đà Nẵng,ch.danang@vache.org.vn,5000000
LCH-HANOI,Liên Chi hội TP. Hà Nội,UNION_BRANCH,Hà Nội,lch.hanoi@vache.org.vn,15000000
VIEN-ICHC,Viện Nghiên cứu Chăm sóc Sức khỏe Cộng đồng,INSTITUTE,Hà Nội,vien.ichc@vache.org.vn,10000000
DN-MEDIPHAR,Công ty CP Dược phẩm MediPhar,ENTERPRISE,TP. Hồ Chí Minh,contact@mediphar.vn,3000000`;
    const blob = new Blob(["\uFEFF" + sample], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mau-don-vi.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/hoi-phi"
              className="inline-flex items-center gap-1 text-xs text-[#991b1b] hover:underline font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Về Quản trị Tài chính
            </Link>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#991b1b]" />
            IMPORT DANH SÁCH ĐƠN VỊ
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload file CSV để nhập hàng loạt Chi hội, Viện, Trung tâm, Doanh
            nghiệp vào CSDL
          </p>
        </div>
        <button
          onClick={handleDownloadSample}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer"
        >
          <Download className="w-4 h-4" /> Tải file CSV mẫu
        </button>
      </div>

      {/* Bước 1: Upload */}
      <section className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3 border-b pb-3">
          <span className="w-8 h-8 rounded-full bg-[#991b1b] text-white flex items-center justify-center font-bold text-sm">
            1
          </span>
          <h2 className="font-bold text-base text-slate-900">Chọn file CSV</h2>
        </div>

        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-[#991b1b] rounded-lg p-8 text-center cursor-pointer transition-colors bg-slate-50 hover:bg-red-50/30"
        >
          <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-800 mb-1">
            {fileName || "Bấm để chọn file CSV"}
          </p>
          <p className="text-xs text-slate-500">
            Hoặc kéo thả file vào ô này · Chỉ chấp nhận file .csv định dạng UTF-8
          </p>
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {parseError && (
          <div className="p-3 bg-red-50 border border-red-300 rounded-lg text-xs text-red-900 flex items-start gap-2">
            <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <strong>Lỗi đọc file:</strong>
              <p className="mt-0.5">{parseError}</p>
            </div>
          </div>
        )}
      </section>

      {/* Bước 2: Preview */}
      {parsed.length > 0 && !results && (
        <section className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 border-b pb-3">
            <span className="w-8 h-8 rounded-full bg-[#991b1b] text-white flex items-center justify-center font-bold text-sm">
              2
            </span>
            <h2 className="font-bold text-base text-slate-900">
              Xem trước dữ liệu
            </h2>
            <span className="ml-auto px-3 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold">
              {parsed.length} đơn vị
            </span>
          </div>

          <div className="overflow-x-auto border rounded-lg max-h-[400px]">
            <table className="w-full text-xs min-w-[700px]">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b sticky top-0">
                <tr>
                  <th className="py-2.5 px-3 text-left w-12">#</th>
                  <th className="py-2.5 px-3 text-left">Mã</th>
                  <th className="py-2.5 px-3 text-left">Tên đơn vị</th>
                  <th className="py-2.5 px-3 text-left w-32">Loại</th>
                  <th className="py-2.5 px-3 text-left w-32">Tỉnh</th>
                  <th className="py-2.5 px-3 text-right w-32">Niên liễm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {parsed.map((u, i) => (
                  <tr key={u.code} className="hover:bg-slate-50">
                    <td className="py-2 px-3 text-slate-400 font-mono">
                      {i + 1}
                    </td>
                    <td className="py-2 px-3 font-mono font-bold text-[#991b1b]">
                      {u.code}
                    </td>
                    <td className="py-2 px-3 text-slate-900 font-medium">
                      {u.name}
                    </td>
                    <td className="py-2 px-3">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">
                        {u.unitType}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-600">
                      {u.province || "—"}
                    </td>
                    <td className="py-2 px-3 text-right font-mono text-slate-800">
                      {new Intl.NumberFormat("vi-VN").format(u.annualFee ?? 0)} đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Chọn file khác
            </button>
            <button
              onClick={handleImport}
              disabled={importing}
              className="px-6 py-2.5 bg-[#991b1b] hover:bg-red-800 disabled:bg-slate-400 text-white rounded-lg font-bold text-xs flex items-center gap-2 shadow cursor-pointer"
            >
              {importing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Đang import...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" /> XÁC NHẬN IMPORT {parsed.length} ĐƠN VỊ
                </>
              )}
            </button>
          </div>
        </section>
      )}

      {/* Bước 3: Kết quả */}
      {results && summary && (
        <section className="bg-white rounded-xl border shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-3 border-b pb-3">
            <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              3
            </span>
            <h2 className="font-bold text-base text-slate-900">
              Kết quả Import
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 bg-slate-50 border rounded-lg text-center">
              <div className="text-2xl font-black text-slate-900 font-mono">
                {summary.total}
              </div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold mt-1">
                Tổng số
              </div>
            </div>
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-lg text-center">
              <div className="text-2xl font-black text-emerald-700 font-mono">
                {summary.ok}
              </div>
              <div className="text-[11px] text-emerald-700 uppercase tracking-wider font-bold mt-1">
                Thành công
              </div>
            </div>
            <div
              className={`p-4 border rounded-lg text-center ${
                summary.fail > 0
                  ? "bg-red-50 border-red-300"
                  : "bg-slate-50 border"
              }`}
            >
              <div
                className={`text-2xl font-black font-mono ${
                  summary.fail > 0 ? "text-red-700" : "text-slate-400"
                }`}
              >
                {summary.fail}
              </div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold mt-1">
                Thất bại
              </div>
            </div>
          </div>

          {summary.obligations && (
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-center gap-2">
              <Users className="w-4 h-4 shrink-0" />
              <span>
                Đã tạo <strong>{summary.obligations.created}</strong> nghĩa vụ
                hội phí cho năm <strong>{summary.obligations.year}</strong>.
              </span>
            </div>
          )}

          <div className="overflow-x-auto border rounded-lg max-h-[400px]">
            <table className="w-full text-xs min-w-[600px]">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b sticky top-0">
                <tr>
                  <th className="py-2.5 px-3 text-left w-16">KQ</th>
                  <th className="py-2.5 px-3 text-left w-40">Mã</th>
                  <th className="py-2.5 px-3 text-left">Tên đơn vị</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {results.map((r) => (
                  <tr key={r.code}>
                    <td className="py-2 px-3">
                      {r.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </td>
                    <td className="py-2 px-3 font-mono font-bold text-slate-800">
                      {r.code}
                    </td>
                    <td className="py-2 px-3">
                      <div className="text-slate-900">{r.name}</div>
                      {r.error && (
                        <div className="text-[10.5px] text-red-600 mt-0.5 font-mono">
                          {r.error}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Import lô khác
            </button>
            <Link
              href="/admin/hoi-phi"
              className="px-5 py-2 bg-[#991b1b] hover:bg-red-800 text-white rounded-lg font-bold text-xs cursor-pointer"
            >
              Về Quản trị Tài chính →
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
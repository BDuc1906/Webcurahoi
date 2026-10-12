"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  QrCode,
  CheckCircle,
  Clock,
  Search,
  Filter,
  Download,
  Upload,
} from "lucide-react";

export default function AdminFinancePage() {
  const [transactions, setTransactions] = useState([
    {
      id: "tx-01",
      code: "HOIPHI2026_LCH_HCM",
      targetName: "Liên Chi hội TP. Hồ Chí Minh",
      category: "Hội phí niên liễm đơn vị",
      amount: 15000000,
      paymentMethod: "VietQR Napas",
      status: "COMPLETED",
      paidAt: "10/10/2026 08:30",
    },
    {
      id: "tx-02",
      code: "HOIPHI2026_CH_DN",
      targetName: "Chi hội Đà Nẵng",
      category: "Hội phí niên liễm đơn vị",
      amount: 5000000,
      paymentMethod: "VietQR Napas",
      status: "COMPLETED",
      paidAt: "09/10/2026 14:15",
    },
    {
      id: "tx-03",
      code: "THIENNGUYEN_098",
      targetName: "Bác sĩ Trần Đức Toàn",
      category: "Ủng hộ Quỹ Chăm sóc Sức khỏe người cao tuổi",
      amount: 2000000,
      paymentMethod: "VietQR Napas",
      status: "COMPLETED",
      paidAt: "09/10/2026 10:05",
    },
    {
      id: "tx-04",
      code: "HOIPHI2026_VIEN_01",
      targetName: "Viện Nghiên cứu & Ứng dụng Chăm sóc Sức khỏe",
      category: "Hội phí niên liễm đơn vị",
      amount: 20000000,
      paymentMethod: "Chờ thanh toán",
      status: "PENDING",
      paidAt: "—",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            QUẢN TRỊ TÀI CHÍNH & ĐỐI SOÁT HỘI PHÍ VIETQR
          </h1>
          <p className="text-xs text-slate-500">
            Theo dõi dòng tiền thu hội phí niên liễm, phí thành lập đơn vị và
            các khoản đóng góp từ thiện.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/admin/import/don-vi"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer"
          >
            <Upload className="w-4 h-4" /> Import Đơn Vị (CSV)
          </Link>
          <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1.5 cursor-pointer">
            <Download className="w-4 h-4" /> Xuất Sổ Kế Toán (Excel)
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">
            Tổng Thu Hội Phí (2026)
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            840.000.000 đ
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            Đạt 84% chỉ tiêu kế hoạch
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">
            Quỹ Thiện Nguyện Tiếp Nhận
          </span>
          <div className="text-2xl font-black text-rose-600 mt-1">
            350.000.000 đ
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            142 lượt ủng hộ trực tuyến
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border shadow-sm">
          <span className="text-xs font-bold text-slate-500 uppercase">
            Đối Soát Tự Động VietQR
          </span>
          <div className="text-2xl font-black text-sky-600 mt-1">98.5%</div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            Khớp lệnh tự động qua Webhook
          </p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="p-4 border-b text-xs font-bold text-slate-800">
          Lịch Sử Giao Dịch & Đối Soát Thời Gian Thực
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4">Mã Giao Dịch</th>
                <th className="py-3 px-4">Đơn Vị / Người Đóng</th>
                <th className="py-3 px-4">Khoản Thu</th>
                <th className="py-3 px-4">Số Tiền (VND)</th>
                <th className="py-3 px-4">Phương Thức</th>
                <th className="py-3 px-4">Thời Gian</th>
                <th className="py-3 px-4">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-700 whitespace-nowrap">
                    {tx.code}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                    {tx.targetName}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {tx.category}
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-slate-800 whitespace-nowrap">
                    {new Intl.NumberFormat("vi-VN").format(tx.amount)} đ
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    {tx.paymentMethod}
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                    {tx.paidAt}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    {tx.status === "COMPLETED" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        <CheckCircle className="w-3 h-3" /> Thành công
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                        <Clock className="w-3 h-3" /> Đang chờ
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState } from "react";
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data";
import { Organization } from "@/lib/db/schema";
import {
  Building2,
  Plus,
  Search,
  Filter,
  Download,
  CheckCircle,
  FileText,
  Phone,
  MapPin,
} from "lucide-react";

export default function AdminOrganizationsPage() {
  const [organizations, setOrganizations] = useState<Organization[]>(MOCK_ORGANIZATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [unitFilter, setUnitFilter] = useState("ALL");
  const [showAddModal, setShowAddModal] = useState(false);

  // New org form state
  const [newOrg, setNewOrg] = useState({
    code: "",
    name: "",
    unitType: "BRANCH",
    decisionNumber: "",
    decisionDate: "",
    address: "",
    provinceCity: "",
    phone: "",
    email: "",
  });

  const handleAddOrg = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Organization = {
      id: "org-" + Date.now(),
      code: newOrg.code,
      name: newOrg.name,
      unitType: newOrg.unitType as any,
      decisionNumber: newOrg.decisionNumber,
      decisionDate: newOrg.decisionDate,
      address: newOrg.address,
      provinceCity: newOrg.provinceCity,
      phone: newOrg.phone,
      email: newOrg.email,
      status: "ACTIVE",
      createdAt: new Date().toISOString().split("T")[0],
    };
    setOrganizations([created, ...organizations]);
    setShowAddModal(false);
  };

  const filtered = organizations.filter((org) => {
    const matchSearch =
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = unitFilter === "ALL" || org.unitType === unitFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Title & Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            QUẢN TRỊ CSDL HỆ THỐNG TỔ CHỨC
          </h1>
          <p className="text-xs text-slate-500">
            Quản lý hồ sơ pháp lý, quyết định thành lập của các Chi hội, Liên Chi hội, Viện và Trung tâm.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm Mới Đơn Vị
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col sm:flex-row gap-3 justify-between items-center text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Tìm theo tên đơn vị hoặc mã số..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={unitFilter}
            onChange={(e) => setUnitFilter(e.target.value)}
            className="border rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none"
          >
            <option value="ALL">Tất cả loại hình</option>
            <option value="UNION_BRANCH">Liên Chi hội</option>
            <option value="BRANCH">Chi hội</option>
            <option value="INSTITUTE">Viện Khoa học</option>
            <option value="CENTER">Trung tâm</option>
            <option value="CENTRAL_OFFICE">Cơ quan Trung ương Hội</option>
          </select>
        </div>
      </div>

      {/* Organizations Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4">Mã Đơn vị</th>
                <th className="py-3 px-4">Tên Đơn vị & Cơ quan</th>
                <th className="py-3 px-4">Loại hình</th>
                <th className="py-3 px-4">Số QĐ Thành lập</th>
                <th className="py-3 px-4">Trụ sở / Địa bàn</th>
                <th className="py-3 px-4">Liên hệ</th>
                <th className="py-3 px-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((org) => (
                <tr key={org.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-700 whitespace-nowrap">
                    {org.code}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900 max-w-xs">
                    {org.name}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {org.unitType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    <span className="font-medium">{org.decisionNumber}</span>
                    <span className="text-[10px] text-slate-400 block">{org.decisionDate}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                    {org.address}
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    <div>{org.phone}</div>
                    <div className="text-[10px] text-slate-400">{org.email}</div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                      <CheckCircle className="w-3.5 h-3.5" /> Hoạt động
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Thêm Mới Đơn Vị */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                Thêm Mới Đơn Vị Trực Thuộc Vào CSDL
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddOrg} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Mã đơn vị:</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: CH-HP01"
                    value={newOrg.code}
                    onChange={(e) => setNewOrg({ ...newOrg, code: e.target.value })}
                    className="w-full border p-2 rounded focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Loại hình:</label>
                  <select
                    value={newOrg.unitType}
                    onChange={(e) => setNewOrg({ ...newOrg, unitType: e.target.value })}
                    className="w-full border p-2 rounded focus:ring-1 focus:ring-emerald-500 bg-white"
                  >
                    <option value="BRANCH">Chi hội</option>
                    <option value="UNION_BRANCH">Liên Chi hội</option>
                    <option value="INSTITUTE">Viện KH&CN</option>
                    <option value="CENTER">Trung tâm</option>
                    <option value="REP_OFFICE">Văn phòng đại diện</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Tên đầy đủ của Đơn vị:</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Chi hội Giáo dục Chăm sóc Sức khỏe Cộng đồng TP. Hải Phòng"
                  value={newOrg.name}
                  onChange={(e) => setNewOrg({ ...newOrg, name: e.target.value })}
                  className="w-full border p-2 rounded focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Số Quyết định thành lập:</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: 55/QĐ-Trung ương Hội"
                    value={newOrg.decisionNumber}
                    onChange={(e) => setNewOrg({ ...newOrg, decisionNumber: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Ngày ký quyết định:</label>
                  <input
                    type="date"
                    required
                    value={newOrg.decisionDate}
                    onChange={(e) => setNewOrg({ ...newOrg, decisionDate: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">Địa chỉ trụ sở:</label>
                <input
                  type="text"
                  required
                  placeholder="Số nhà, đường, quận/huyện, tỉnh thành..."
                  value={newOrg.address}
                  onChange={(e) => setNewOrg({ ...newOrg, address: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Điện thoại liên hệ:</label>
                  <input
                    type="text"
                    required
                    placeholder="0225.xxxx..."
                    value={newOrg.phone}
                    onChange={(e) => setNewOrg({ ...newOrg, phone: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Email chính thức:</label>
                  <input
                    type="email"
                    required
                    placeholder="chihoi.haiphong@vache.org.vn"
                    value={newOrg.email}
                    onChange={(e) => setNewOrg({ ...newOrg, email: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded text-slate-600 hover:bg-slate-100"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-700"
                >
                  Lưu vào CSDL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

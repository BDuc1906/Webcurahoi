"use client";

import React, { useState } from "react";
import { MOCK_LEADERSHIP } from "@/lib/mock-data";
import { Personnel } from "@/lib/db/schema";
import { Users, Plus, Search, Filter, CheckCircle, ShieldCheck } from "lucide-react";

export default function AdminPersonnelPage() {
  const [personnel, setPersonnel] = useState<Personnel[]>(MOCK_LEADERSHIP);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [newPerson, setNewPerson] = useState({
    fullName: "",
    gender: "MALE",
    dob: "",
    citizenId: "",
    phone: "",
    email: "",
    position: "",
    academicTitle: "",
  });

  const handleAddPerson = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Personnel = {
      id: "ns-" + Date.now(),
      fullName: newPerson.fullName,
      gender: newPerson.gender as any,
      dob: newPerson.dob,
      citizenId: newPerson.citizenId,
      phone: newPerson.phone,
      email: newPerson.email,
      address: "Việt Nam",
      organizationId: "org-tw-01",
      position: newPerson.position,
      isBch: true,
      isBtv: false,
      academicTitle: newPerson.academicTitle,
      memberType: "INDIVIDUAL",
      joinDate: new Date().toISOString().split("T")[0],
      status: "ACTIVE",
    };
    setPersonnel([created, ...personnel]);
    setShowAddModal(false);
  };

  const filtered = personnel.filter(
    (p) =>
      p.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900">
            QUẢN TRỊ CSDL NHÂN SỰ & HỘI VIÊN
          </h1>
          <p className="text-xs text-slate-500">
            Hồ sơ nhân sự Ban Chấp hành Trung ương Hội, Ban Thường vụ và Lãnh đạo các Chi hội, Viện trực thuộc.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Thêm Cán Bộ / Nhân Sự
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl border shadow-sm flex gap-3 text-xs">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            placeholder="Tìm theo họ tên hoặc chức vụ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b text-[11px] uppercase">
              <tr>
                <th className="py-3 px-4">Họ và Tên</th>
                <th className="py-3 px-4">Chức vụ trong Hội</th>
                <th className="py-3 px-4">Học hàm / Học vị</th>
                <th className="py-3 px-4">Liên hệ</th>
                <th className="py-3 px-4">Ngày sinh</th>
                <th className="py-3 px-4">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                      {p.fullName.charAt(0)}
                    </div>
                    {p.fullName}
                  </td>
                  <td className="py-3 px-4 font-semibold text-emerald-700 whitespace-nowrap">
                    {p.position}
                  </td>
                  <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                    {p.academicTitle || "—"}
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    <div>{p.phone}</div>
                    <div className="text-[10px] text-slate-400">{p.email}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap font-mono">{p.dob}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                      <CheckCircle className="w-3.5 h-3.5" /> Đang công tác
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add Person */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-sm text-slate-900">
                Thêm Mới Cán Bộ / Nhân Sự Vào CSDL
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleAddPerson} className="space-y-3">
              <div>
                <label className="font-bold block mb-1">Họ và tên cán bộ:</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Nguyễn Văn B"
                  value={newPerson.fullName}
                  onChange={(e) => setNewPerson({ ...newPerson, fullName: e.target.value })}
                  className="w-full border p-2 rounded focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Chức vụ trong Hội:</label>
                  <input
                    type="text"
                    required
                    placeholder="VD: Ủy viên BCH Trung ương Hội"
                    value={newPerson.position}
                    onChange={(e) => setNewPerson({ ...newPerson, position: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Học hàm / Học vị:</label>
                  <input
                    type="text"
                    placeholder="VD: Tiến sĩ Y khoa"
                    value={newPerson.academicTitle}
                    onChange={(e) => setNewPerson({ ...newPerson, academicTitle: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Số CCCD:</label>
                  <input
                    type="text"
                    required
                    placeholder="12 chữ số"
                    value={newPerson.citizenId}
                    onChange={(e) => setNewPerson({ ...newPerson, citizenId: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Ngày sinh:</label>
                  <input
                    type="date"
                    required
                    value={newPerson.dob}
                    onChange={(e) => setNewPerson({ ...newPerson, dob: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Điện thoại:</label>
                  <input
                    type="tel"
                    required
                    value={newPerson.phone}
                    onChange={(e) => setNewPerson({ ...newPerson, phone: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Email:</label>
                  <input
                    type="email"
                    required
                    value={newPerson.email}
                    onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                    className="w-full border p-2 rounded"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border rounded"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-700"
                >
                  Lưu Nhân Sự
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

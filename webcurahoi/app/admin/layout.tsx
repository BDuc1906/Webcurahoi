"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoIcon } from "@/components/common/Logo";

import {
  LayoutDashboard,
  Building2,
  Users,
  FileCheck2,
  CreditCard,
  FileText,
  LogOut,
  Bell,
  Search,
  Menu,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: "Tổng quan Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Quản trị Hệ thống Tổ chức", href: "/admin/to-chuc", icon: Building2 },
    { name: "Quản trị Nhân sự & Ban Chấp hành", href: "/admin/nhan-su", icon: Users },
    { name: "Chế độ Báo cáo Online", href: "/admin/bao-cao", icon: FileCheck2 },
    { name: "Quản trị Tài chính & Phí", href: "/admin/hoi-phi", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen flex bg-slate-100 text-slate-800">
      {/* 1. SIDEBAR */}
      <aside
        className={`bg-slate-900 text-slate-300 w-64 flex flex-col justify-between shrink-0 transition-all z-30 ${
          sidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <div>
          {/* Logo Brand */}
          <div className="p-4 border-b border-slate-800 flex items-center gap-3">
            <LogoIcon size={36} useOfficialImage={true} />
            <div>
              <span className="text-[10px] text-amber-400 font-bold uppercase block tracking-wider font-gov">
                Hệ Thống Điều Hành
              </span>
              <span className="font-bold text-white text-xs block font-gov">TRUNG ƯƠNG HỘI VACHE</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 text-xs font-semibold font-gov">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#991b1b] text-white shadow-xs font-bold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-3 border-t border-slate-800 space-y-2 text-xs font-gov">
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Xem Cổng Thông Tin</span>
          </Link>
          <div className="p-2.5 bg-slate-800/80 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <LogoIcon size={28} useOfficialImage={true} />
              <div>
                <p className="font-bold text-white text-[11px]">Văn phòng Trung ương Hội</p>
                <p className="text-[10px] text-amber-400 font-semibold">Cán bộ Quản trị Hệ thống</p>
              </div>
            </div>
            <Link href="/login" className="text-slate-400 hover:text-rose-400">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="bg-white border-b h-14 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-slate-800 text-xs sm:text-sm">
              Cổng Quản Trị CSDL & Báo Cáo
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Tra cứu nhanh CSDL..."
                className="pl-8 pr-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-700 w-52"
              />

              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
            </div>

            <button className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5"></span>
            </button>
          </div>
        </header>

        {/* Main Body */}
        <main className="p-4 sm:p-6 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

import React from "react";
import { Metadata } from "next";
import CategoryNewsView from "@/components/news/CategoryNewsView";

export const metadata: Metadata = {
  title: "1. Chính sách, chiến lược, luật pháp sức khỏe nhân dân | Cổng thông tin VACHE",
  description: "Các chính sách, chiến lược, luật pháp về bảo vệ, chăm sóc, nâng cao sức khỏe nhân dân theo quy chuẩn Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam.",
};

export default function ChinhSachPhapLuatPage() {
  return <CategoryNewsView groupId="GROUP_1_CHINH_SACH" />;
}

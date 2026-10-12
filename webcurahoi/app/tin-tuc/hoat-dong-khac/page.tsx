import React from "react";
import { Metadata } from "next";
import CategoryNewsView from "@/components/news/CategoryNewsView";

export const metadata: Metadata = {
  title: "4. Các hoạt động liên quan khác | Cổng thông tin VACHE",
  description: "Các hoạt động liên quan khác: Phong trào thiện nguyện, Thể thao - Văn nghệ, Thông tin thời sự y tế 24/7 của Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam.",
};

export default function HoatDongKhacPage() {
  return <CategoryNewsView groupId="GROUP_4_LIEN_QUAN" />;
}

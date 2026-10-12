import React from "react";
import { Metadata } from "next";
import CategoryNewsView from "@/components/news/CategoryNewsView";

export const metadata: Metadata = {
  title: "2. Các sự kiện lớn của Hội | Cổng thông tin VACHE",
  description: "Các sự kiện lớn của Hội: Đại Hội; Hội nghị BCH, Ban Thường vụ, Ban Thường trực; Hội thảo, Tọa đàm khoa học cấp Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam.",
};

export default function SuKienTrungUongPage() {
  return <CategoryNewsView groupId="GROUP_2_SU_KIEN_TW" />;
}

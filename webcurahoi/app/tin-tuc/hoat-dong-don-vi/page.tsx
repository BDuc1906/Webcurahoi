import React from "react";
import { Metadata } from "next";
import CategoryNewsView from "@/components/news/CategoryNewsView";

export const metadata: Metadata = {
  title: "3. Các hoạt động đơn vị thuộc Hội | Cổng thông tin VACHE",
  description: "Các hoạt động quan trọng của các đơn vị thuộc Hội: Thành lập mới, các sự kiện, Viện - Trường, Hệ thống Chi hội 63 tỉnh thành thuộc Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam.",
};

export default function HoatDongDonViPage() {
  return <CategoryNewsView groupId="GROUP_3_DON_VI" />;
}

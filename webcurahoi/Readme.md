<!-- ============================================================
     BANNER & BADGES
     ============================================================ -->

<div align="center">

# 🏛️ Cổng Thông Tin & Hệ Thống Quản Trị Điều Hành Số Hóa
### Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam (VACHE)

*Nền tảng số hóa toàn diện công tác quản trị tổ chức, nhân sự, tài chính và truyền thông của Trung ương Hội.*

[![Next.js](https://img.shields.io/badge/Next.js-15.1.7-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![NestJS](https://img.shields.io/badge/NestJS-11-E0234E?logo=nestjs&logoColor=white)](https://nestjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)](https://neon.tech)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

[![CI](https://img.shields.io/badge/CI-passing-success?logo=githubactions&logoColor=white)](https://github.com/BDuc1906/Webcurahoi/actions)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://webcurahoi.vercel.app)
[![Railway](https://img.shields.io/badge/Deploy-Railway-0B0D0E?logo=railway&logoColor=white)](https://railway.app)
[![License](https://img.shields.io/badge/License-Internal-red.svg)]()

[Demo trực tuyến](https://webcurahoi.vercel.app) · [Báo lỗi](https://github.com/BDuc1906/Webcurahoi/issues) · [Đề xuất tính năng](https://github.com/BDuc1906/Webcurahoi/issues)

</div>

---

## 📖 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng chính](#-tính-năng-chính)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt & Chạy Local](#-cài-đặt--chạy-local)
- [Biến môi trường](#-biến-môi-trường)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [API Documentation](#-api-documentation)
- [Triển khai Production](#-triển-khai-production)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Đóng góp](#-đóng-góp)
- [Giấy phép](#-giấy-phép)
- [Liên hệ](#-liên-hệ)

---

## 🌟 Giới thiệu

**Webcurahoi** là hệ thống thông tin tích hợp được xây dựng cho **Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam (VACHE)** — một tổ chức xã hội - nghề nghiệp hoạt động trên phạm vi cả nước theo Quyết định số 128/QĐ-BNV của Bộ Nội vụ.

Hệ thống bao phủ **5 mảng nội dung nghiệp vụ** theo đặc tả chính thức:

| # | Mảng nghiệp vụ | Mô tả |
|---|----------------|-------|
| **I** | 📚 **Thông tin chung về Hội** | Giới thiệu, Ban Lãnh đạo, Kho văn bản pháp quy |
| **II** | 📰 **Tin tức & Sự kiện** | Bản tin thời sự, hoạt động 63 tỉnh thành |
| **III** | 🏢 **Quản trị Tổ chức** | Chi hội, Liên Chi hội, Viện, Trung tâm, Doanh nghiệp |
| **IV** | 👥 **Quản trị Nhân sự** | Ban Chấp hành, Ban Thường vụ, kết nạp Hội viên |
| **V** | 💰 **Quản trị Tài chính** | Biểu phí, hội phí trực tuyến, Quỹ thiện nguyện |

> **Điểm nổi bật:** Tích hợp **cổng thanh toán VietQR Napas 24/7** tự động, **sao kê tài chính công khai thời gian thực**, tuân thủ Nghị định 93/2019/NĐ-CP và Thông tư 41/2022/TT-BTC.

---

## ✨ Tính năng chính

### 🎨 Giao diện Công vụ (Public Portal)
- **Trang chủ** với slider tin tức, dòng thời sự 24/7, ticker thông báo chỉ đạo
- **Menu đa cấp** theo phong cách Cổng thông tin điện tử Chính phủ
- **Tối ưu SEO** với metadata động, Open Graph
- **Responsive** hoàn hảo trên mobile, tablet, desktop
- **Chuẩn typography** Nghị định 30/2020/NĐ-CP (phông serif cho tiêu đề, sans-serif cho nội dung)

### 📰 Truyền thông & Tin tức
- 100+ bài viết mẫu trải đều 5 chuyên mục
- Phân trang, tìm kiếm, lọc theo danh mục
- Xem chi tiết bài viết với chia sẻ link
- Lịch công tác tuần của Ban Thường trực

### 🏛️ Quản trị Tổ chức
- **Danh bạ 34+ đơn vị** trực thuộc (Cơ quan TW, VP Đại diện, Chi hội, Viện, Trung tâm)
- **Sơ đồ cây phân cấp** trực quan hóa bộ máy
- **3 chế độ hiển thị**: Dạng hàng, Dạng bảng, Sơ đồ cây
- **Modal hồ sơ chi tiết** với thông tin pháp lý đầy đủ

### 👥 Quản trị Nhân sự
- **Danh sách Ban Chấp hành** + Ban Thường vụ nhiệm kỳ IV
- **Hồ sơ nhân sự** với học hàm, học vị, chức vụ
- **Tờ khai Đăng ký Hội viên trực tuyến** theo Mẫu 01A/01B (chuẩn công vụ)

### 💰 Quản trị Tài chính (Điểm nhấn)
- **Cổng tra cứu hội phí** theo mã đơn vị (VD: `CH-DANANG`)
- **VietQR động** — số tiền gắn cứng, chống chuyển sai
- **Đếm ngược 10 phút** + radar quét chờ thanh toán
- **Auto-detect giao dịch** qua webhook ngân hàng (SePay/Casso)
- **Biên lai điện tử** + gửi email tự động
- **Sao kê công khai** real-time qua SSE
- **Báo cáo giải ngân** minh bạch 2 chiều
- **Bảng vàng** vinh danh nhà hảo tâm
- **Giấy chứng nhận điện tử** với QR xác thực

### 🔐 Cổng Quản trị (Admin)
- Dashboard với KPI thời gian thực
- Quản lý tổ chức, nhân sự, báo cáo, tài chính
- **Import CSV** hàng loạt đơn vị vào CSDL
- Xuất sổ kế toán Excel

---

## 🏗️ Kiến trúc hệ thống

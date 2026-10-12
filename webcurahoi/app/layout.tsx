import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam",
  description: "Cổng thông tin điện tử và Hệ thống quản trị điều hành của Trung ương Hội Giáo dục Chăm sóc Sức khỏe Cộng đồng Việt Nam",
  icons: {
    icon: "/images/logo-vache-official.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&subset=vietnamese&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="antialiased min-h-screen flex flex-col bg-[#f8fafc] text-[#0f172a]">
        {children}
      </body>
    </html>
  );
}


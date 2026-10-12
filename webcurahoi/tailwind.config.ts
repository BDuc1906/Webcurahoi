import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Be Vietnam Pro", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        serif: ["Noto Serif", "Times New Roman", "Georgia", "serif"],
        gov: ["Inter", "Be Vietnam Pro", "Arial", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#991b1b", // Đỏ đô trang trọng
          hover: "#7f1d1d",
          light: "#fef2f2",
          border: "#fecaca",
        },
        gold: {
          DEFAULT: "#b45309", // Vàng đồng huy hiệu
          hover: "#92400e",
          light: "#fffbeb",
        },
        page: "#f8fafc",      // Nền trang
        card: "#ffffff",      // Nền thẻ
        line: "#e2e8f0",      // Viền kẻ
        ink: {
          DEFAULT: "#0f172a", // Chữ chính
          muted: "#475569",   // Chữ phụ
          subtle: "#94a3b8",  // Chữ nhạt
        },
      },

    },
  },
  plugins: [],
} satisfies Config;

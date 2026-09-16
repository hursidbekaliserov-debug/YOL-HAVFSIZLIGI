import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

export const metadata: Metadata = {
  title: "Road Safety AI — Yoʻl Xavfsizligi Ekotizimi",
  description: "Sun'iy intellekt orqali yo'l muammolarini aniqlash, monitoring qilish va bartaraf etish platformasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body className="antialiased bg-[#090D16] text-slate-100">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
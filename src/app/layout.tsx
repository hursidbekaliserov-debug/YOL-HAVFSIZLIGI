import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import TelegramChatWidget from "../components/TelegramChatWidget";

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
      <body className="antialiased bg-[#F8F9FA] text-[#1A1D20] font-sans selection:bg-[#16C79A] selection:text-white">
        <LanguageProvider>
          {children}
          <TelegramChatWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
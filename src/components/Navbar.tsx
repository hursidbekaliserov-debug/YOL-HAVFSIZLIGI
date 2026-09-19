'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage, Language } from '../context/LanguageContext';

interface NavbarProps {
  onOpenSos?: () => void;
}

export default function Navbar({ onOpenSos }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(true);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/map', label: t('nav_map') },
    { href: '/news', label: t('nav_news') },
    { href: '/statistics', label: t('nav_stats') },
    { href: '/about', label: t('nav_about') },
  ];

  const langs: { code: Language; label: string }[] = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full transition-all">
      {/* iCORP-Style Top Announcement Banner */}
      {bannerVisible && (
        <div className="bg-gradient-to-r from-[#0E9F79] via-[#16C79A] to-[#00B090] text-white text-xs font-semibold px-4 py-2 flex items-center justify-between shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 w-full text-center">
            <span className="hidden sm:inline-block bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
              24/7 Monitoring
            </span>
            <span className="truncate">
              ⚡ O&apos;zbekiston Milliy Yo&apos;l Xavfsizligi AI Tizimi — Nosozliklarni sun&apos;iy intellekt orqali aniqlash va tezkor bartaraf etish
            </span>
            <Link
              href="/map"
              className="hidden md:inline-flex items-center gap-1 bg-white text-[#0E9F79] px-3 py-1 rounded-full text-[11px] font-bold hover:bg-gray-100 transition-colors shrink-0 shadow-sm"
            >
              Ariza qoldirish →
            </Link>
          </div>
          <button
            onClick={() => setBannerVisible(false)}
            className="text-white/80 hover:text-white p-1 text-sm font-bold leading-none ml-2 transition-opacity"
            aria-label="Yopish"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Crisp White Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-[0_2px_15px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo in iCORP tech style */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[#111827] to-[#1F2937] border-2 border-[#16C79A] rounded-xl flex items-center justify-center shadow-md shadow-teal-500/10 group-hover:scale-105 transition-transform duration-300">
                <span className="text-white font-black text-lg tracking-wider">RS</span>
              </div>
              <div>
                <div className="text-lg font-black tracking-tight text-[#111827] group-hover:text-[#16C79A] transition-colors leading-tight uppercase">
                  ROAD SAFETY <span className="text-[#16C79A]">AI</span>
                </div>
                <div className="text-[10px] text-gray-500 font-bold tracking-widest uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16C79A] inline-block animate-pulse"></span>
                  {t('sub_brand')}
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8">
              <div className="flex items-center gap-7 text-xs font-bold uppercase tracking-wider">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`transition-colors py-2 relative ${
                        isActive
                          ? 'text-[#16C79A] font-extrabold'
                          : 'text-[#374151] hover:text-[#16C79A]'
                      }`}
                    >
                      {link.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#16C79A] rounded-full" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Action Items: Contact, Languages, SOS, and Teal Pill CTA */}
            <div className="hidden md:flex items-center gap-3.5">
              {/* Phone Helpline */}
              <a
                href="tel:102"
                className="hidden xl:flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-[#16C79A] px-3 py-1.5 rounded-full border border-gray-200 hover:border-[#16C79A] transition-all bg-gray-50"
              >
                <span className="text-sm">📞</span>
                <span>102 / Qaynoq Liniya</span>
              </a>

              {/* Language Switcher Pill */}
              <div className="bg-gray-100 p-1 rounded-full flex items-center text-xs font-bold text-gray-600 border border-gray-200/80">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-3 py-1 rounded-full transition-all text-[11px] font-bold ${
                      language === l.code
                        ? 'bg-[#16C79A] text-white shadow-sm'
                        : 'hover:text-[#111827]'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* SOS Emergency Button */}
              {onOpenSos && (
                <button
                  onClick={onOpenSos}
                  className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3.5 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
                >
                  <span>🚨</span>
                  <span>{t('nav_sos')}</span>
                </button>
              )}

              {/* iCORP Style Solid Teal Pill Button */}
              <Link
                href="/map"
                className="bg-[#16C79A] hover:bg-[#12a37d] text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all shadow-md shadow-teal-500/20 active:scale-95 flex items-center gap-2 tracking-wide uppercase"
              >
                <span>+ {t('nav_report')}</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Language Switcher */}
              <div className="flex items-center bg-gray-100 p-0.5 rounded-full text-xs font-bold border border-gray-200">
                {langs.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`px-2 py-0.5 rounded-full text-[10px] ${
                      language === l.code ? 'bg-[#16C79A] text-white font-bold' : 'text-gray-600'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {onOpenSos && (
                <button
                  onClick={onOpenSos}
                  className="bg-red-50 text-red-600 border border-red-200 px-2.5 py-1.5 rounded-full text-xs font-bold"
                >
                  🚨 SOS
                </button>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 bg-gray-100 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-200 transition-colors"
                aria-label="Menyu"
              >
                <span className="text-base font-bold">{mobileMenuOpen ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-5 border-t border-gray-200 space-y-4 animate-in slide-in-from-top-2 duration-200 bg-white">
              <div className="flex flex-col gap-1 text-sm font-semibold">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-teal-50 text-[#16C79A] font-bold border border-teal-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-gray-200 flex flex-col gap-2">
                <a
                  href="tel:102"
                  className="text-center py-2 text-xs font-bold text-gray-700 bg-gray-50 rounded-xl border border-gray-200"
                >
                  📞 102 — Tezkor Liniya
                </a>
                <Link
                  href="/map"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-[#16C79A] text-white px-4 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-md shadow-teal-500/20"
                >
                  + {t('nav_report')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

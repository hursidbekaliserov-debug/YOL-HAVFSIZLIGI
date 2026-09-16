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
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: t('nav_home') },
    { href: '/map', label: t('nav_map') },
    { href: '/statistics', label: t('nav_stats') },
    { href: '/about', label: t('nav_about') },
  ];

  const langs: { code: Language; label: string }[] = [
    { code: 'uz', label: 'UZ' },
    { code: 'ru', label: 'RU' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <nav className="bg-[#090D16]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/20">
              <span className="text-2xl">🛡️</span>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-purple-300 transition-colors block leading-tight">
                Road Safety <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase block">
                {t('sub_brand')}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            <div className="flex items-center gap-6 text-sm font-semibold">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`transition-colors py-1 relative ${
                      isActive
                        ? 'text-purple-400 font-bold'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Action Buttons: Language Switcher + SOS + Report */}
          <div className="hidden md:flex items-center gap-3">
            {/* UZ RU EN Language Switcher */}
            <div className="bg-slate-950/80 border border-white/10 rounded-xl p-1 flex items-center text-xs font-bold text-slate-400">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    language === l.code
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md shadow-purple-500/20'
                      : 'hover:text-white hover:bg-white/5'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* SOS Button */}
            {onOpenSos && (
              <button
                onClick={onOpenSos}
                className="bg-red-500/15 hover:bg-red-500/25 text-red-400 border border-red-500/30 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span>🚨</span>
                <span>{t('nav_sos')}</span>
              </button>
            )}

            {/* Direct Map CTA */}
            <Link
              href="/map"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-purple-500/20 active:scale-95 flex items-center gap-1.5"
            >
              <span>{t('nav_report')}</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Switcher */}
            <div className="flex items-center gap-0.5 bg-slate-950/80 border border-white/10 rounded-lg p-0.5 text-xs font-bold">
              {langs.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-1.5 py-1 rounded-md text-[11px] ${
                    language === l.code ? 'bg-purple-600 text-white' : 'text-slate-400'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {onOpenSos && (
              <button
                onClick={onOpenSos}
                className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-1.5 rounded-lg text-xs font-bold"
              >
                🚨 SOS
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
              aria-label="Menyu"
            >
              <span className="text-base">{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-5 border-t border-white/10 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2 text-base font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-3 py-2 rounded-xl transition-colors ${
                      isActive
                        ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30 font-bold'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <Link
                href="/map"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 rounded-xl text-xs font-bold"
              >
                {t('nav_report')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

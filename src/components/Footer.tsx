'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  const labels = {
    uz: {
      desc: 'O\'zbekiston bo\'ylab yo\'l infratuzilmasi xavfsizligini ta\'minlash, nosozliklarni sun\'iy intellekt orqali aniqlash va bartaraf etishning yagona ochiq milliy ekotizimi.',
      nav: 'Navigatsiya',
      partners: 'Hamkorlik',
      apps: 'Mobil ilovalar',
      app_hint: 'Yo\'lda muammoni suratga oling va darhol xabar bering.',
      p1: 'IIV JXX YHXBB',
      p2: 'Avtomobil Yo\'llari Qo\'mitasi',
      p3: 'Raqamli Texnologiyalar Vazirligi',
      p4: 'Toshkent shahar hokimligi',
      rights: 'Road Safety AI O\'zbekiston. Barcha huquqlar himoyalangan.',
      privacy: 'Maxfiylik siyosati',
      terms: 'Foydalanish shartlari',
      open: 'Ochiq ma\'lumotlar',
    },
    ru: {
      desc: 'Единая национальная открытая экосистема для обеспечения безопасности дорог в Узбекистане, обнаружения и устранения проблем с помощью искусственного интеллекта.',
      nav: 'Навигация',
      partners: 'Партнеры',
      apps: 'Мобильные приложения',
      app_hint: 'Сфотографируйте проблему на дороге и отправьте мгновенно.',
      p1: 'ГУБДД ДОБ МВД РУз',
      p2: 'Комитет по Автомобильным Дорогам',
      p3: 'Министерство Цифровых Технологий',
      p4: 'Хокимият города Ташкента',
      rights: 'Road Safety AI Узбекистан. Все права защищены.',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия использования',
      open: 'Открытые данные',
    },
    en: {
      desc: 'Unified national open ecosystem for monitoring urban road infrastructure safety, identifying defects with AI, and coordinating rapid civic resolutions.',
      nav: 'Navigation',
      partners: 'Partners',
      apps: 'Mobile Applications',
      app_hint: 'Take a photo of a road defect and report instantly.',
      p1: 'Traffic Safety Department (MoIA)',
      p2: 'State Committee for Roads',
      p3: 'Ministry of Digital Technologies',
      p4: 'Tashkent City Administration',
      rights: 'Road Safety AI Uzbekistan. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      open: 'Open Data',
    },
  };

  const l = labels[language] || labels.uz;

  return (
    <footer className="border-t border-white/10 bg-[#060910] text-slate-400 text-sm relative z-10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-xl shadow-lg shadow-purple-500/25">
                🛡️
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                Road Safety <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI</span>
              </span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              {l.desc}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white text-base transition-colors"
              >
                ✈️
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white text-base transition-colors"
              >
                📷
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-white text-base transition-colors"
              >
                ▶️
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{l.nav}</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-purple-400 transition-colors">{t('nav_home')}</Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-purple-400 transition-colors">{t('nav_map')}</Link>
              </li>
              <li>
                <Link href="/statistics" className="hover:text-purple-400 transition-colors">{t('nav_stats')}</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-purple-400 transition-colors">{t('nav_about')}</Link>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{l.partners}</h4>
            <ul className="space-y-2 text-xs">
              <li><span className="text-slate-300">{l.p1}</span></li>
              <li><span className="text-slate-300">{l.p2}</span></li>
              <li><span className="text-slate-300">{l.p3}</span></li>
              <li><span className="text-slate-300">{l.p4}</span></li>
            </ul>
          </div>

          {/* Mobile Apps */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">{l.apps}</h4>
            <p className="text-[11px] text-slate-500">
              {l.app_hint}
            </p>
            <div className="space-y-2">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-xl">🍏</span>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase leading-none">{t('app_download')}</div>
                  <div className="text-xs font-bold text-white">App Store</div>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-xl">🤖</span>
                <div>
                  <div className="text-[9px] text-slate-400 uppercase leading-none">{t('app_download')}</div>
                  <div className="text-xs font-bold text-white">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {l.rights}
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">{l.privacy}</a>
            <a href="#" className="hover:text-slate-400 transition-colors">{l.terms}</a>
            <a href="#" className="hover:text-slate-400 transition-colors">{l.open}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

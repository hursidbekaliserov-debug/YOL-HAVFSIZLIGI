'use client';

import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  const labels = {
    uz: {
      desc: 'O\'zbekiston bo\'ylab yo\'l infratuzilmasi xavfsizligini ta\'minlash, nosozliklarni sun\'iy intellekt orqali aniqlash va bartaraf etishning yagona ochiq milliy ekotizimi.',
      nav: 'Navigatsiya',
      partners: 'Davlat Hamkorlari',
      apps: 'Mobil Ilovalar',
      contact: 'Bog\'lanish va Aloqa',
      app_hint: 'Yo\'ldagi muammoni smartfon kamerasi orqali suratga oling va darhol yuboring.',
      p1: 'IIV JXX YHXBB',
      p2: 'Avtomobil Yo\'llari Qo\'mitasi',
      p3: 'Raqamli Texnologiyalar Vazirligi',
      p4: 'Toshkent shahar hokimligi',
      address: 'Toshkent sh., Amir Temur shoh ko\'chasi, 107-A',
      phone: '+998 (71) 200-00-00 / 102',
      email: 'info@roadsafety.uz',
      rights: 'Road Safety AI O\'zbekiston. Barcha huquqlar himoyalangan.',
      privacy: 'Maxfiylik siyosati',
      terms: 'Foydalanish shartlari',
      open: 'Ochiq ma\'lumotlar portali',
      resident: 'Raqamli Texnologiyalar Vazirligi va IT Park Rezidenti',
    },
    ru: {
      desc: 'Единая национальная открытая экосистема для мониторинга безопасности дорог в Узбекистане, обнаружения и устранения проблем с помощью искусственного интеллекта.',
      nav: 'Навигация',
      partners: 'Государственные Партнеры',
      apps: 'Мобильные Приложения',
      contact: 'Контакты и Приемная',
      app_hint: 'Сфотографируйте дефект на дороге и отправьте заявку за пару секунд.',
      p1: 'ГУБДД ДОБ МВД РУз',
      p2: 'Комитет по Автомобильным Дорогам',
      p3: 'Министерство Цифровых Технологий',
      p4: 'Хокимият города Ташкента',
      address: 'г. Ташкент, пр-т Амира Темура, 107-А',
      phone: '+998 (71) 200-00-00 / 102',
      email: 'info@roadsafety.uz',
      rights: 'Road Safety AI Узбекистан. Все права защищены.',
      privacy: 'Политика конфиденциальности',
      terms: 'Условия использования',
      open: 'Открытые данные',
      resident: 'Резидент IT Park и партнер Министерства Цифровых Технологий',
    },
    en: {
      desc: 'Unified national open ecosystem for monitoring urban road infrastructure safety, identifying defects with AI, and coordinating rapid municipal resolutions.',
      nav: 'Navigation',
      partners: 'State Partners',
      apps: 'Mobile Applications',
      contact: 'Contact & Support',
      app_hint: 'Capture road hazards using your mobile camera and report instantly.',
      p1: 'Traffic Safety Department (MoIA)',
      p2: 'State Committee for Roads',
      p3: 'Ministry of Digital Technologies',
      p4: 'Tashkent City Administration',
      address: 'Tashkent, Amir Temur Ave, 107-A',
      phone: '+998 (71) 200-00-00 / 102',
      email: 'info@roadsafety.uz',
      rights: 'Road Safety AI Uzbekistan. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      open: 'Open Data Portal',
      resident: 'IT Park Resident & Digital Technologies Ministry Partner',
    },
  };

  const l = labels[language] || labels.uz;

  return (
    <footer className="bg-[#0B0F19] text-gray-400 text-sm border-t border-gray-800 relative z-10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand Info & Resident Badge */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#111827] to-[#1F2937] border-2 border-[#16C79A] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-base tracking-wider">RS</span>
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight uppercase">
                  ROAD SAFETY <span className="text-[#16C79A]">AI</span>
                </span>
              </div>
            </Link>

            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              {l.desc}
            </p>

            {/* iCORP-style Resident Badge */}
            <div className="inline-flex items-center gap-2.5 bg-gray-900/90 border border-gray-800 px-3.5 py-2 rounded-xl text-xs text-gray-300">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16C79A] inline-block animate-pulse"></span>
              <span className="text-[11px] font-semibold tracking-wide">
                {l.resident}
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://t.me/xavfsiz_yollar_bot"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram Bot"
                title="Telegram Bot: @xavfsiz_yollar_bot"
                className="w-10 h-10 rounded-full bg-gray-900 hover:bg-[#16C79A] hover:text-white border border-gray-800 flex items-center justify-center text-gray-300 text-base transition-all"
              >
                ✈️
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-gray-900 hover:bg-[#16C79A] hover:text-white border border-gray-800 flex items-center justify-center text-gray-300 text-base transition-all"
              >
                📷
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-gray-900 hover:bg-[#16C79A] hover:text-white border border-gray-800 flex items-center justify-center text-gray-300 text-base transition-all"
              >
                ▶️
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-800 pb-2">
              {l.nav}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-[#16C79A] transition-colors flex items-center gap-1.5">
                  <span className="text-[#16C79A]">›</span> {t('nav_home')}
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-[#16C79A] transition-colors flex items-center gap-1.5">
                  <span className="text-[#16C79A]">›</span> {t('nav_map')}
                </Link>
              </li>
              <li>
                <Link href="/statistics" className="hover:text-[#16C79A] transition-colors flex items-center gap-1.5">
                  <span className="text-[#16C79A]">›</span> {t('nav_stats')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-[#16C79A] transition-colors flex items-center gap-1.5">
                  <span className="text-[#16C79A]">›</span> {t('nav_news')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#16C79A] transition-colors flex items-center gap-1.5">
                  <span className="text-[#16C79A]">›</span> {t('nav_about')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Partners */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-800 pb-2">
              {l.partners}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="text-gray-400 hover:text-gray-200">{l.p1}</li>
              <li className="text-gray-400 hover:text-gray-200">{l.p2}</li>
              <li className="text-gray-400 hover:text-gray-200">{l.p3}</li>
              <li className="text-gray-400 hover:text-gray-200">{l.p4}</li>
            </ul>
          </div>

          {/* Contact Information & Apps */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-gray-800 pb-2">
              {l.contact}
            </h4>
            <div className="space-y-2 text-xs">
              <div className="text-gray-400">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Manzil:</span>
                {l.address}
              </div>
              <div className="text-gray-400">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Telefon:</span>
                <a href="tel:102" className="text-[#16C79A] font-bold hover:underline">
                  {l.phone}
                </a>
              </div>
              <div className="text-gray-400">
                <span className="text-gray-500 block text-[10px] uppercase font-bold">Elektron pochta:</span>
                <a href="mailto:info@roadsafety.uz" className="hover:text-white">
                  {l.email}
                </a>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <div className="p-2 rounded-xl bg-gray-900 border border-gray-800 flex items-center gap-2 hover:border-[#16C79A] transition-colors cursor-pointer flex-1">
                <span className="text-base">🍏</span>
                <div>
                  <div className="text-[8px] text-gray-500 uppercase leading-none">Yuklab olish</div>
                  <div className="text-[11px] font-bold text-white">App Store</div>
                </div>
              </div>
              <div className="p-2 rounded-xl bg-gray-900 border border-gray-800 flex items-center gap-2 hover:border-[#16C79A] transition-colors cursor-pointer flex-1">
                <span className="text-base">🤖</span>
                <div>
                  <div className="text-[8px] text-gray-500 uppercase leading-none">Yuklab olish</div>
                  <div className="text-[11px] font-bold text-white">Google Play</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-8 border-t border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} {l.rights}
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#" className="hover:text-[#16C79A] transition-colors">{l.privacy}</a>
            <a href="#" className="hover:text-[#16C79A] transition-colors">{l.terms}</a>
            <a href="#" className="hover:text-[#16C79A] transition-colors">{l.open}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

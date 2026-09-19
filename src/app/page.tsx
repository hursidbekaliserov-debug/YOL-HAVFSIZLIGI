'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SosModal from '../components/SosModal';
import AiVisionDemo from '../components/AiVisionDemo';
import BrakingCalculator from '../components/BrakingCalculator';
import SafetyQuiz from '../components/SafetyQuiz';
import RoadWeatherPasses from '../components/RoadWeatherPasses';
import LatestNewsSection from '../components/LatestNewsSection';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { language, t } = useLanguage();
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Tezkor murojaat formasi state
  const [quickStreet, setQuickStreet] = useState('');
  const [quickType, setQuickType] = useState('chuqurlik');
  const [quickSent, setQuickSent] = useState(false);

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickStreet.trim()) return;
    setQuickSent(true);
    setTimeout(() => {
      setQuickStreet('');
      setQuickSent(false);
    }, 3500);
  };

  const localizedData = {
    uz: {
      features: [
        {
          title: 'Real-time AI Aniqlash',
          desc: 'Yo\'l kameralari va fuqarolar fotosuratlari orqali chuqurchalar, nosoz svetoforlar va xavfli nuqtalarni 98.4% aniqlik bilan avtomatik qayd etish.',
          icon: '🧠',
          tag: 'Computer Vision',
          time: 'Real-time',
        },
        {
          title: 'Interaktiv Geoportal Xarita',
          desc: 'O\'zbekistonning barcha hududlari bo\'yicha xavfli zonalarni klasterlash, filtrlash va jonli radar orqali kuzatish tizimi.',
          icon: '🗺️',
          tag: 'GIS & Leaflet',
          time: 'Jonli monitoring',
        },
        {
          title: 'Jamoatchilik Nazorati',
          desc: 'Har bir fuqaro yo\'ldagi nosozlikni suratga olib, 1 daqiqada yuborishi va mas\'ul tashkilotlar ishini kuzatishi mumkin.',
          icon: '📱',
          tag: 'Crowdsourcing',
          time: 'Tezkor ariza',
        },
        {
          title: 'Xavfsiz Maktab Zonalari',
          desc: 'Maktablar va bog\'chalar atrofidagi piyodalar yo\'laklari, tezlik cheklovlari va sun\'iy notekisliklar doimiy nazoratda.',
          icon: '🎒',
          tag: 'Bolalar Xavfsizligi',
          time: '1-darajali ustuvor',
        },
        {
          title: 'Operativ Xizmatlar Integratsiyasi',
          desc: 'IIV YHXBB va Yo\'l xo\'jaligi boshqarmalari bilan to\'g\'ridan-to\'g\'ri aloqa — xavfli nuqsonlar zudlik bilan bartaraf etiladi.',
          icon: '⚡',
          tag: 'Tezkor Reaksiya',
          time: '24/7 aloqa',
        },
        {
          title: 'Tahliliy Dashboard & Indeks',
          desc: 'Shahar va tumanlar bo\'yicha infratuzilma sifati reytingi, ta\'mirlash dinamikasi va xavfsizlik hisobotlari.',
          icon: '📊',
          tag: 'Big Data',
          time: 'Oylik hisobot',
        },
      ],
      liveFeeds: [
        {
          id: 1,
          city: 'Toshkent sh., Yunusobod tumani',
          text: 'Ahmad Donish ko\'chasidagi chuqurlik to\'liq ta\'mirlandi va yangi asfalt yotqizildi.',
          time: '3 daqiqa oldin',
          status: 'fixed',
          icon: '✅',
        },
        {
          id: 2,
          city: 'Samarqand sh., Dahbed ko\'chasi',
          text: 'Chorraha svetofori fazasi optimallashtirildi, transport harakati me\'yorga keltirildi.',
          time: '18 daqiqa oldin',
          status: 'fixed',
          icon: '✅',
        },
        {
          id: 3,
          city: 'Farg\'ona sh., Sayilgoh ko\'chasi',
          text: 'Maktab oldidagi piyodalar o\'tish joyida yangi termoplastik chiziqlar tortilmoqda.',
          time: '35 daqiqa oldin',
          status: 'in_progress',
          icon: '⚠️',
        },
        {
          id: 4,
          city: 'Buxoro sh., G\'ijduvon ko\'chasi',
          text: 'Tungi yoritish tizimidagi nosozlik bo\'yicha tuman elektr tarmoqlariga topshiriq yuborildi.',
          time: '1 soat oldin',
          status: 'in_progress',
          icon: '⚠️',
        },
      ],
      regions: [
        { name: 'Toshkent shahri', pct: 92 },
        { name: 'Samarqand viloyati', pct: 86 },
        { name: 'Farg\'ona vodiysi', pct: 81 },
        { name: 'Buxoro viloyati', pct: 78 },
        { name: 'Navoiy viloyati', pct: 75 },
      ],
      guardians: [
        { name: 'Alisher Qodirov', reports: 48, resolved: 44, badge: 'Oltin Nazoratchi', avatar: '🥇' },
        { name: 'Dilnoza Karimova', reports: 37, resolved: 32, badge: 'Kumush Nazoratchi', avatar: '🥈' },
        { name: 'Jasur Rahimov', reports: 29, resolved: 25, badge: 'Bronza Nazoratchi', avatar: '🥉' },
        { name: 'Bobur Mirzayev', reports: 24, resolved: 21, badge: 'Faol Haydovchi', avatar: '⭐' },
      ],
      faqs: [
        {
          q: 'Yo\'ldagi nosozlik haqida qanday qilib xabar bersam bo\'ladi?',
          a: 'Siz saytdagi "Interaktiv Xarita" bo\'limiga o\'tib, "+ Muammo haqida xabar berish" tugmasini bosasiz. Telefon kamerasi orqali nosozlikni suratga olasiz yoki rasm yuklaysiz. Geolokatsiya avtomatik belgilanadi.',
        },
        {
          q: 'Mening xabarim qancha vaqt ichida ko\'rib chiqiladi?',
          a: 'Sun\'iy intellekt xabarni darhol tekshiradi va 5 daqiqa ichida mas\'ul tuman yo\'l xo\'jaligi bo\'limiga yo\'naltiradi. O\'rtacha chora ko\'rish vaqti 24 soatdan 72 soatgacha tashkil etadi.',
        },
        {
          q: 'Murojaat qilish uchun ro\'yxatdan o\'tish shartmi?',
          a: 'Yo\'q, murojaat qilish mutlaqo bepul va ochiq. Siz tezkorlik bilan anonim tarzda yoki o\'z kontaktlaringizni qoldirgan holda xabar yuborishingiz mumkin.',
        },
        {
          q: 'AI yo\'l nuqsonlarini qanday ajratadi?',
          a: 'Tizimimiz chuqur o\'rganish (Deep Learning) modellariga asoslangan. U fotosuratlardan chuqurlik o\'lchami, yo\'l chiziqlarining o\'chishi, yorug\'lik darajasi va yo\'l belgilarining holatini aniq taniy oladi.',
        },
      ],
      regional_title: 'Hududlar Xavfsizlik Indeksi',
      regional_sub: 'Yo\'llar sifati va bartaraf etish darajasi',
      view_all_stats: 'To\'liq tahliliy hisobotni ko\'rish →',
    },
    ru: {
      features: [
        {
          title: 'Распознавание ИИ в Реальном Времени',
          desc: 'Автоматическое выявление ям, неработающих светофоров и опасных зон с точностью 98.4% по дорожным камерам и снимкам горожан.',
          icon: '🧠',
          tag: 'Computer Vision',
          time: 'Real-time',
        },
        {
          title: 'Интерактивная Геокарта',
          desc: 'Кластеризация, удобная фильтрация и живой мониторинг опасных участков по всем регионам Узбекистана.',
          icon: '🗺️',
          tag: 'GIS & Leaflet',
          time: 'Онлайн мониторинг',
        },
        {
          title: 'Гражданский Контроль',
          desc: 'Каждый житель может сфотографировать дефект дорожного полотна, отправить за 1 минуту и отслеживать статус исправления.',
          icon: '📱',
          tag: 'Crowdsourcing',
          time: 'Быстрая подача',
        },
        {
          title: 'Безопасные Школьные Зоны',
          desc: 'Приоритетный контроль пешеходных переходов, лежачих полицейских и освещения вокруг школ и детских садов.',
          icon: '🎒',
          tag: 'Детская Безопасность',
          time: 'Приоритет №1',
        },
        {
          title: 'Интеграция с Госслужбами',
          desc: 'Прямой обмен данными с УБДД и службами дорожного хозяйства для максимально оперативного устранения угроз.',
          icon: '⚡',
          tag: 'Быстрая Реакция',
          time: 'Связь 24/7',
        },
        {
          title: 'Аналитический Дашборд & Индекс',
          desc: 'Рейтинг качества инфраструктуры городов и районов, графики динамики устранения и подробные отчеты.',
          icon: '📊',
          tag: 'Big Data',
          time: 'Ежемесячно',
        },
      ],
      liveFeeds: [
        {
          id: 1,
          city: 'г. Ташкент, Юнусабадский район',
          text: 'Опасная яма на ул. Ахмада Дониша полностью заасфальтирована и устранена.',
          time: '3 минуты назад',
          status: 'fixed',
          icon: '✅',
        },
        {
          id: 2,
          city: 'г. Самарканд, ул. Дагбитская',
          text: 'Отрегулированы фазы перекрестного светофора, поток нормализован.',
          time: '18 минут назад',
          status: 'fixed',
          icon: '✅',
        },
        {
          id: 3,
          city: 'г. Фергана, ул. Сайилгох',
          text: 'Наносится свежая термопластиковая разметка перед школьным переходом.',
          time: '35 минут назад',
          status: 'in_progress',
          icon: '⚠️',
        },
        {
          id: 4,
          city: 'г. Бухара, ул. Гиждуванская',
          text: 'Заявка по неисправной опоре уличного освещения передана в городские электросети.',
          time: '1 час назад',
          status: 'in_progress',
          icon: '⚠️',
        },
      ],
      regions: [
        { name: 'город Ташкент', pct: 92 },
        { name: 'Самаркандская область', pct: 86 },
        { name: 'Ферганская долина', pct: 81 },
        { name: 'Бухарская область', pct: 78 },
        { name: 'Навоийская область', pct: 75 },
      ],
      guardians: [
        { name: 'Алишер Кадыров', reports: 48, resolved: 44, badge: 'Золотой Контролер', avatar: '🥇' },
        { name: 'Дильноза Каримова', reports: 37, resolved: 32, badge: 'Серебряный Контролер', avatar: '🥈' },
        { name: 'Жасур Рахимов', reports: 29, resolved: 25, badge: 'Бронзовый Контролер', avatar: '🥉' },
        { name: 'Бобур Мирзаев', reports: 24, resolved: 21, badge: 'Активный Водитель', avatar: '⭐' },
      ],
      faqs: [
        {
          q: 'Как отправить сообщение о дефекте на дороге?',
          a: 'Перейдите в раздел "Интерактивная Карта" и нажмите кнопку "+ Сообщить о проблеме". Сделайте фото на камеру телефона или загрузите изображение. Геолокация определится автоматически.',
        },
        {
          q: 'В какие сроки рассматривается обращение?',
          a: 'Искусственный интеллект проверяет снимок мгновенно и в течение 5 минут передает ответственным службам. Среднее время устранения проблемы составляет от 24 до 72 часов.',
        },
        {
          q: 'Обязательно ли регистрироваться для отправки заявки?',
          a: 'Нет, подача сообщений полностью бесплатна и открыта. Вы можете отправить заявку как анонимно, так и указав свои контакты.',
        },
        {
          q: 'Как нейросеть распознает дефекты?',
          a: 'Система обучена на десятках тысяч снимков дорожной обстановки. Она измеряет глубину ям, фиксирует стертую разметку и неработающие сигналы.',
        },
      ],
      regional_title: 'Региональный Индекс Безопасности',
      regional_sub: 'Качество дорог и уровень ликвидации дефектов',
      view_all_stats: 'Смотреть подробный аналитический отчет →',
    },
    en: {
      features: [
        {
          title: 'Real-time AI Detection',
          desc: 'Automated computer vision detection of potholes, dysfunctional traffic lights, and road hazards with 98.4% precision.',
          icon: '🧠',
          tag: 'Computer Vision',
          time: 'Real-time',
        },
        {
          title: 'Interactive Geoportal Map',
          desc: 'Dynamic clustering, geo-filtering, and live safety radar mapping across all provinces of Uzbekistan.',
          icon: '🗺️',
          tag: 'GIS & Leaflet',
          time: 'Live Radar',
        },
        {
          title: 'Crowdsourced Civic Control',
          desc: 'Every citizen can report a road defect within 60 seconds with automatic GPS geotagging and transparent resolution tracking.',
          icon: '📱',
          tag: 'Crowdsourcing',
          time: 'Instant Report',
        },
        {
          title: 'Safe School Zones',
          desc: 'Priority safety surveillance of pedestrian crossings, speed humps, and lighting surrounding schools and kindergartens.',
          icon: '🎒',
          tag: 'Child Safety',
          time: 'Top Priority',
        },
        {
          title: 'Municipal & Police Integration',
          desc: 'Direct data exchange with the Traffic Safety Department and road maintenance authorities for rapid remediation.',
          icon: '⚡',
          tag: 'Rapid Response',
          time: '24/7 Channel',
        },
        {
          title: 'Analytical Dashboard & Index',
          desc: 'Infrastructure quality ranking across provinces, repair velocity velocity charts, and comprehensive civic analytics.',
          icon: '📊',
          tag: 'Big Data',
          time: 'Monthly Audit',
        },
      ],
      liveFeeds: [
        {
          id: 1,
          city: 'Tashkent City, Yunusabad district',
          text: 'Pothole on Ahmad Donish street has been fully asphalted and restored.',
          time: '3 minutes ago',
          status: 'fixed',
          icon: '✅',
        },
        {
          id: 2,
          city: 'Samarkand City, Dahbed street',
          text: 'Traffic signal phase optimized; traffic flow restored to normal.',
          time: '18 minutes ago',
          status: 'fixed',
          icon: '✅',
        },
        {
          id: 3,
          city: 'Fergana City, Sayilgoh street',
          text: 'Thermoplastic pedestrian crossing markings being reapplied near school.',
          time: '35 minutes ago',
          status: 'in_progress',
          icon: '⚠️',
        },
        {
          id: 4,
          city: 'Bukhara City, Gijduvan street',
          text: 'Malfunctioning streetlight pole ticket assigned to local electrical utilities.',
          time: '1 hour ago',
          status: 'in_progress',
          icon: '⚠️',
        },
      ],
      regions: [
        { name: 'Tashkent City', pct: 92 },
        { name: 'Samarkand Region', pct: 86 },
        { name: 'Fergana Valley', pct: 81 },
        { name: 'Bukhara Region', pct: 78 },
        { name: 'Navoiy Region', pct: 75 },
      ],
      guardians: [
        { name: 'Alisher Kadyrov', reports: 48, resolved: 44, badge: 'Gold Guardian', avatar: '🥇' },
        { name: 'Dilnoza Karimova', reports: 37, resolved: 32, badge: 'Silver Guardian', avatar: '🥈' },
        { name: 'Jasur Rakhimov', reports: 29, resolved: 25, badge: 'Bronze Guardian', avatar: '🥉' },
        { name: 'Bobur Mirzayev', reports: 24, resolved: 21, badge: 'Active Driver', avatar: '⭐' },
      ],
      faqs: [
        {
          q: 'How can I report a road hazard?',
          a: 'Visit the "Interactive Map" page and click "+ Report Hazard". Capture a live photo via your mobile camera or upload from files. Geolocation is tracked automatically.',
        },
        {
          q: 'How fast are reports reviewed?',
          a: 'Our AI model verifies the snapshot immediately and routes it to the municipal department within 5 minutes. The average fix time is 24 to 72 hours.',
        },
        {
          q: 'Is registration required to submit a report?',
          a: 'No, citizen reporting is completely open and free. You can report anonymously or share your contact for progress notifications.',
        },
        {
          q: 'How does the AI identify road damage?',
          a: 'Our deep learning vision models analyze surface depth, crack severity, worn pavement markings, and lighting conditions in milliseconds.',
        },
      ],
      regional_title: 'Regional Safety Index',
      regional_sub: 'Road quality and fix velocity rate',
      view_all_stats: 'View Complete Analytics Report →',
    },
  };

  const curData = localizedData[language] || localizedData.uz;

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#1A1D20] font-sans selection:bg-[#16C79A] selection:text-white relative">
      {/* Universal Sticky Navbar */}
      <Navbar onOpenSos={() => setIsSosOpen(true)} />

      {/* HERO SECTION in iCORP STYLE */}
      <section className="relative pt-16 pb-20 overflow-hidden bg-gradient-to-b from-white via-[#F8F9FA] to-[#F8F9FA] border-b border-gray-200/80">
        {/* Subtle Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Top Category Badge with Green Dot (like iCORP) */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-teal-50 border border-teal-200/80 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#16C79A] animate-pulse" />
            <span>ROAD SAFETY AI ● {t('hero_badge_ai')}</span>
          </div>

          {/* Hero Headline with Teal Highlight */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#111827] tracking-tight leading-[1.12] max-w-5xl mx-auto mb-6">
            {t('hero_title_1')}{' '}
            <span className="text-[#16C79A] underline decoration-teal-300/40 decoration-wavy">
              {t('hero_title_ai')}
            </span>{' '}
            {t('hero_title_2')}
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-base sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            {t('hero_subtitle')}
          </p>

          {/* Pill CTA Buttons (iCORP style) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              href="/map"
              className="w-full sm:w-auto bg-[#16C79A] hover:bg-[#12a37d] text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg shadow-teal-500/25 active:scale-95 text-sm uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>{t('hero_cta_map')}</span>
              <span>→</span>
            </Link>

            <Link
              href="/statistics"
              className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 px-8 py-4 rounded-full font-bold transition-all border-2 border-gray-300 hover:border-gray-800 text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            >
              <span>{t('hero_cta_stats')}</span>
            </Link>

            <button
              onClick={() => setIsSosOpen(true)}
              className="w-full sm:w-auto bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-7 py-4 rounded-full font-bold transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm active:scale-95"
            >
              <span>🚨 {t('hero_cta_sos')}</span>
            </button>
          </div>

          {/* QUICK HAZARD REPORT CARD in iCORP Clean White Style */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xl shadow-gray-200/50 text-left">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center text-sm font-bold text-[#0E9F79]">
                  ⚡
                </span>
                <div>
                  <h3 className="text-base font-black text-[#111827]">{t('quick_title')}</h3>
                  <p className="text-xs text-gray-500">1 daqiqada nosozlikni xabar qiling, AI ko&apos;rib chiqadi</p>
                </div>
              </div>
              <span className="text-xs text-[#0E9F79] font-bold hidden sm:inline bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                {t('quick_hint')}
              </span>
            </div>

            {quickSent ? (
              <div className="bg-teal-50 border border-teal-300 rounded-2xl p-5 text-[#0E9F79] text-sm font-bold text-center animate-in zoom-in-95">
                ✓ {t('quick_success')}
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder={t('quick_placeholder')}
                  value={quickStreet}
                  onChange={(e) => setQuickStreet(e.target.value)}
                  required
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3.5 text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#16C79A] focus:bg-white transition-all shadow-inner"
                />
                <select
                  value={quickType}
                  onChange={(e) => setQuickType(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-full px-5 py-3.5 text-sm text-[#111827] focus:outline-none focus:border-[#16C79A] focus:bg-white transition-all"
                >
                  <option value="chuqurlik">{t('quick_pothole')}</option>
                  <option value="svetofor">{t('quick_traffic')}</option>
                  <option value="belgi">{t('quick_sign')}</option>
                  <option value="yoritgich">{t('quick_light')}</option>
                </select>
                <button
                  type="submit"
                  className="bg-[#16C79A] hover:bg-[#12a37d] text-white font-bold px-7 py-3.5 rounded-full text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-500/20 active:scale-95 whitespace-nowrap"
                >
                  {t('quick_send')}
                </button>
              </form>
            )}
          </div>

          {/* URGENT ROAD ALERTS TICKER (Link to /news) */}
          <div className="max-w-4xl mx-auto mt-6 bg-gradient-to-r from-red-600 via-amber-600 to-emerald-600 p-[1.5px] rounded-2xl shadow-lg shadow-gray-200/50">
            <Link
              href="/news"
              className="bg-white hover:bg-gray-50 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left transition-colors"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <span className="bg-red-500 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full animate-pulse shrink-0">
                  ⚡ TEZKOR
                </span>
                <p className="text-xs font-bold text-gray-800 line-clamp-1">
                  Qamchiq dovonida qor yog&apos;ishi kuzatilmoqda | Toshkentda 25 ta yangi aqlli svetofor ishga tushirildi
                </p>
              </div>
              <span className="text-xs font-bold text-[#16C79A] shrink-0 flex items-center gap-1">
                Barcha yangiliklar →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* LIVE STATS COUNTER TICKER (Clean White Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: t('stat_fixed'), val: '14,820+', icon: '✅', tag: 'Bajarildi' },
            { label: t('stat_ai_acc'), val: '98.4%', icon: '🎯', tag: 'Aniqlik' },
            { label: t('stat_regions'), val: '14 ta', icon: '📍', tag: 'Qamrov' },
            { label: t('stat_avg_time'), val: '48 soat', icon: '⏱️', tag: 'O\'rtacha' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-md shadow-gray-200/40 hover:shadow-xl hover:border-[#16C79A] transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#0E9F79] bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                  {item.tag}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight mb-1 group-hover:text-[#16C79A] transition-colors">
                {item.val}
              </div>
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI VISION DEMO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <AiVisionDemo />
      </section>

      {/* LATEST ROAD SAFETY NEWS & ADVISORIES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <LatestNewsSection />
      </section>

      {/* CORE FEATURES / SERVICES GRID (like iCORP service catalog) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-3">
            ● {t('feat_badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight mb-4">
            Bizning <span className="text-[#16C79A]">Xizmatlarimiz va Imkoniyatlarimiz</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            {t('feat_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curData.features.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-gray-200/90 shadow-md shadow-gray-200/30 hover:shadow-xl hover:border-[#16C79A] transition-all hover:-translate-y-1.5 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl border border-gray-200 group-hover:scale-110 group-hover:border-[#16C79A] transition-all">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#0E9F79] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    {item.time}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#111827] mb-3 tracking-tight group-hover:text-[#16C79A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-mono font-semibold text-gray-400 uppercase">
                  {item.tag}
                </span>
                <Link
                  href="/about"
                  className="text-xs font-bold text-[#16C79A] group-hover:translate-x-1 transition-transform flex items-center gap-1"
                >
                  Batafsil →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BRAKING DISTANCE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <BrakingCalculator />
      </section>

      {/* LIVE MOUNTAIN PASSES & HIGHWAY WEATHER STATUS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <RoadWeatherPasses />
      </section>

      {/* LIVE COMMUNITY ACTIVITY FEED & REGIONAL INDEX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Live Incident Stream */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xl shadow-gray-200/40">
            <div className="flex items-center justify-between pb-5 border-b border-gray-200 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16C79A] animate-ping" />
                  <h3 className="text-xl font-black text-[#111827] tracking-tight">
                    {t('feed_title')}
                  </h3>
                </div>
                <p className="text-xs text-gray-500">{t('feed_subtitle')}</p>
              </div>
              <Link
                href="/map"
                className="text-xs font-bold text-[#16C79A] hover:underline flex items-center gap-1 uppercase"
              >
                {t('feed_all')}
              </Link>
            </div>

            <div className="space-y-4">
              {curData.liveFeeds.map((feed) => (
                <div
                  key={feed.id}
                  className="p-4 rounded-2xl bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200 transition-all flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-lg shrink-0 mt-0.5">
                    {feed.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-[#111827]">{feed.city}</span>
                      <span className="text-[11px] text-gray-400 font-mono">{feed.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed mb-2">{feed.text}</p>
                    <span
                      className={`inline-flex text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        feed.status === 'fixed'
                          ? 'bg-teal-50 text-[#0E9F79] border border-teal-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {feed.status === 'fixed' ? t('feed_fixed_badge') : t('feed_progress_badge')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Safety Index */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-8 shadow-xl shadow-gray-200/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-gray-200 mb-6">
                <div>
                  <h3 className="text-xl font-black text-[#111827] tracking-tight">
                    {curData.regional_title}
                  </h3>
                  <p className="text-xs text-gray-500">{curData.regional_sub}</p>
                </div>
                <span className="text-xs font-bold text-[#0E9F79] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                  Top 2026
                </span>
              </div>

              <div className="space-y-4">
                {curData.regions.map((reg, i) => (
                  <div key={i} className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200">
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-gray-800">{reg.name}</span>
                      <span className="text-[#16C79A] font-mono font-black">{reg.pct}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-full bg-[#16C79A] rounded-full transition-all duration-700"
                        style={{ width: `${reg.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <Link
                href="/statistics"
                className="w-full block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-colors border border-gray-300"
              >
                {curData.view_all_stats}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY QUIZ INTERACTIVE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <SafetyQuiz />
      </section>

      {/* TOP ROAD GUARDIANS (CITIZEN LEADERBOARD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-xs font-bold uppercase tracking-wider mb-3">
            ● {t('lead_badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight mb-2">
            {t('lead_title')}
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm max-w-xl mx-auto">
            {t('lead_subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {curData.guardians.map((g, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-gray-200/90 shadow-md hover:shadow-xl hover:border-[#16C79A] transition-all hover:-translate-y-1 text-center group"
            >
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-gray-200 group-hover:scale-110 transition-transform">
                {g.avatar}
              </div>
              <h4 className="text-base font-bold text-[#111827] mb-1">{g.name}</h4>
              <span className="inline-block text-[10px] font-bold text-[#0E9F79] bg-teal-50 border border-teal-200 px-3 py-0.5 rounded-full mb-4">
                {g.badge}
              </span>
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 text-xs">
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200/60">
                  <span className="text-gray-400 text-[10px] block uppercase font-bold">{t('lead_reports')}</span>
                  <span className="text-[#111827] font-black text-sm">{g.reports}</span>
                </div>
                <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200/60">
                  <span className="text-gray-400 text-[10px] block uppercase font-bold">{t('lead_resolved')}</span>
                  <span className="text-[#16C79A] font-black text-sm">{g.resolved}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HIGH-IMPACT CONTRAST SECTION (like iCORP's videoblog & dark tech showcase) */}
      <section className="bg-[#111827] text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 border border-teal-400/30 rounded-full text-teal-300 text-xs font-bold uppercase tracking-wider">
                ● {t('app_badge')}
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {t('app_title')}
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {t('app_desc')}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                <div className="px-6 py-3.5 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex items-center gap-3 cursor-pointer transition-all active:scale-95 shadow-md">
                  <span className="text-2xl">🍏</span>
                  <div className="text-left">
                    <div className="text-[9px] text-gray-400 leading-none uppercase font-bold">{t('app_download')}</div>
                    <div className="text-sm font-bold text-white">Apple App Store</div>
                  </div>
                </div>
                <div className="px-6 py-3.5 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-700 flex items-center gap-3 cursor-pointer transition-all active:scale-95 shadow-md">
                  <span className="text-2xl">🤖</span>
                  <div className="text-left">
                    <div className="text-[9px] text-gray-400 leading-none uppercase font-bold">{t('app_download')}</div>
                    <div className="text-sm font-bold text-white">Google Play Market</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-64 h-[420px] rounded-[44px] bg-[#0B0F19] border-4 border-gray-700 shadow-2xl p-4 flex flex-col justify-between relative overflow-hidden ring-2 ring-teal-500/40">
                <div className="w-24 h-4 bg-gray-800 rounded-full mx-auto mb-2" />
                <div className="flex-1 bg-gradient-to-b from-gray-900 to-[#111827] rounded-2xl p-4 flex flex-col justify-between text-center border border-gray-800">
                  <span className="text-4xl mt-6">🛡️</span>
                  <div>
                    <div className="text-sm font-black text-white">Road Safety AI</div>
                    <div className="text-[11px] text-[#16C79A] font-bold mt-1">Radar: Faol (0 Nosozlik)</div>
                  </div>
                  <div className="bg-[#16C79A] text-white text-xs font-bold py-2.5 rounded-full shadow-md">
                    Scan Camera AI
                  </div>
                </div>
                <div className="w-12 h-1 bg-gray-700 rounded-full mx-auto mt-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION (Clean White Accordions) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-3">
            ● {t('faq_badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#111827] tracking-tight mb-2">
            {t('faq_title')}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">
            {t('faq_subtitle')}
          </p>
        </div>

        <div className="space-y-3">
          {curData.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-gray-200/90 shadow-sm overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-[#111827] flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="w-7 h-7 rounded-full bg-teal-50 text-[#0E9F79] flex items-center justify-center font-bold text-base shrink-0">
                  {openFaq === idx ? '−' : '+'}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION (iCORP Style Corporate Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20 text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-[#0E9F79] via-[#16C79A] to-[#00B090] text-white shadow-2xl shadow-teal-500/20">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 text-white">
            {t('final_title')}
          </h2>
          <p className="text-teal-50 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed font-normal">
            {t('final_desc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/map"
              className="w-full sm:w-auto bg-white text-[#0E9F79] hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all shadow-lg active:scale-95 text-xs uppercase tracking-wider"
            >
              {t('final_btn')}
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold transition-all border-2 border-white text-xs uppercase tracking-wider"
            >
              {t('final_about_btn')}
            </Link>
          </div>
        </div>
      </section>

      {/* Universal Footer */}
      <Footer />

      {/* SOS Modal */}
      <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
    </main>
  );
}
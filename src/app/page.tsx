'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SosModal from '../components/SosModal';
import AiVisionDemo from '../components/AiVisionDemo';
import BrakingCalculator from '../components/BrakingCalculator';
import SafetyQuiz from '../components/SafetyQuiz';
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
        },
        {
          title: 'Interaktiv Geoportal Xarita',
          desc: 'O\'zbekistonning barcha hududlari bo\'yicha xavfli zonalarni klasterlash, filtrlash va jonli radar orqali kuzatish tizimi.',
          icon: '🗺️',
          tag: 'GIS & Leaflet',
        },
        {
          title: 'Jamoatchilik Nazorati',
          desc: 'Har bir fuqaro yo\'ldagi nosozlikni suratga olib, 1 daqiqada yuborishi va mas\'ul tashkilotlar ishini kuzatishi mumkin.',
          icon: '📱',
          tag: 'Crowdsourcing',
        },
        {
          title: 'Xavfsiz Maktab Zonalari',
          desc: 'Maktablar va bog\'chalar atrofidagi piyodalar yo\'laklari, tezlik cheklovlari va sun\'iy notekisliklar doimiy nazoratda.',
          icon: '🎒',
          tag: 'Bolalar Xavfsizligi',
        },
        {
          title: 'Operativ Xizmatlar Integratsiyasi',
          desc: 'IIV YHXBB va Yo\'l xo\'jaligi boshqarmalari bilan to\'g\'ridan-to\'g\'ri aloqa — xavfli nuqsonlar zudlik bilan bartaraf etiladi.',
          icon: '⚡',
          tag: 'Tezkor Reaksiya',
        },
        {
          title: 'Tahliliy Dashboard & Indeks',
          desc: 'Shahar va tumanlar bo\'yicha infratuzilma sifati reytingi, ta\'mirlash dinamikasi va xavfsizlik hisobotlari.',
          icon: '📊',
          tag: 'Big Data',
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
        { name: 'Toshkent shahri', pct: 92, color: 'from-purple-500 to-pink-500' },
        { name: 'Samarqand viloyati', pct: 86, color: 'from-blue-500 to-cyan-400' },
        { name: 'Farg\'ona vodiysi', pct: 81, color: 'from-indigo-500 to-purple-500' },
        { name: 'Buxoro viloyati', pct: 78, color: 'from-pink-500 to-rose-400' },
        { name: 'Navoiy viloyati', pct: 75, color: 'from-emerald-500 to-teal-400' },
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
        },
        {
          title: 'Интерактивная Геокарта',
          desc: 'Кластеризация, удобная фильтрация и живой мониторинг опасных участков по всем регионам Узбекистана.',
          icon: '🗺️',
          tag: 'GIS & Leaflet',
        },
        {
          title: 'Гражданский Контроль',
          desc: 'Каждый житель может сфотографировать дефект дорожного полотна, отправить за 1 минуту и отслеживать статус исправления.',
          icon: '📱',
          tag: 'Crowdsourcing',
        },
        {
          title: 'Безопасные Школьные Зоны',
          desc: 'Приоритетный контроль пешеходных переходов, лежачих полицейских и освещения вокруг школ и детских садов.',
          icon: '🎒',
          tag: 'Детская Безопасность',
        },
        {
          title: 'Интеграция с Госслужбами',
          desc: 'Прямой обмен данными с УБДД и службами дорожного хозяйства для максимально оперативного устранения угроз.',
          icon: '⚡',
          tag: 'Быстрая Реакция',
        },
        {
          title: 'Аналитический Дашборд & Индекс',
          desc: 'Рейтинг качества инфраструктуры городов и районов, графики динамики устранения и подробные отчеты.',
          icon: '📊',
          tag: 'Big Data',
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
        { name: 'город Ташкент', pct: 92, color: 'from-purple-500 to-pink-500' },
        { name: 'Самаркандская область', pct: 86, color: 'from-blue-500 to-cyan-400' },
        { name: 'Ферганская долина', pct: 81, color: 'from-indigo-500 to-purple-500' },
        { name: 'Бухарская область', pct: 78, color: 'from-pink-500 to-rose-400' },
        { name: 'Навоийская область', pct: 75, color: 'from-emerald-500 to-teal-400' },
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
        },
        {
          title: 'Interactive Geoportal Map',
          desc: 'Dynamic clustering, geo-filtering, and live safety radar mapping across all provinces of Uzbekistan.',
          icon: '🗺️',
          tag: 'GIS & Leaflet',
        },
        {
          title: 'Community Watch & Crowdsourcing',
          desc: 'Any citizen can capture a road defect, report in 60 seconds, and verify governmental repairs.',
          icon: '📱',
          tag: 'Crowdsourcing',
        },
        {
          title: 'Safe School Zones',
          desc: 'Special monitoring zone around kindergartens and schools for pedestrian crossings and speed bumps.',
          icon: '🎒',
          tag: 'Child Safety',
        },
        {
          title: 'Municipal Services Integration',
          desc: 'Direct bridge with traffic police and municipal road management agencies for rapid intervention.',
          icon: '⚡',
          tag: 'Rapid Response',
        },
        {
          title: 'Analytical Dashboard & Index',
          desc: 'District road performance metrics, resolution velocity analytics, and municipal transparency rankings.',
          icon: '📊',
          tag: 'Big Data',
        },
      ],
      liveFeeds: [
        {
          id: 1,
          city: 'Tashkent, Yunusabad district',
          text: 'Major pothole on Ahmad Donish street has been fully asphalted and paved.',
          time: '3 mins ago',
          status: 'fixed',
          icon: '✅',
        },
        {
          id: 2,
          city: 'Samarkand, Dahbed street',
          text: 'Traffic light signal interval optimized, smooth vehicle flow restored.',
          time: '18 mins ago',
          status: 'fixed',
          icon: '✅',
        },
        {
          id: 3,
          city: 'Fergana, Sayilgoh street',
          text: 'Fresh thermoplastic pedestrian road markings currently being painted.',
          time: '35 mins ago',
          status: 'in_progress',
          icon: '⚠️',
        },
        {
          id: 4,
          city: 'Bukhara, Gijduvan street',
          text: 'Street light repair ticket dispatched to regional electrical utility network.',
          time: '1 hour ago',
          status: 'in_progress',
          icon: '⚠️',
        },
      ],
      regions: [
        { name: 'Tashkent City', pct: 92, color: 'from-purple-500 to-pink-500' },
        { name: 'Samarkand Region', pct: 86, color: 'from-blue-500 to-cyan-400' },
        { name: 'Fergana Valley', pct: 81, color: 'from-indigo-500 to-purple-500' },
        { name: 'Bukhara Region', pct: 78, color: 'from-pink-500 to-rose-400' },
        { name: 'Navoiy Region', pct: 75, color: 'from-emerald-500 to-teal-400' },
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
    <main className="min-h-screen bg-[#090D16] text-slate-100 relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-purple-600/15 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute top-[800px] -right-[200px] w-[700px] h-[700px] bg-pink-600/10 blur-[200px] pointer-events-none rounded-full" />
      <div className="absolute top-[1800px] -left-[200px] w-[800px] h-[800px] bg-blue-600/10 blur-[190px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[900px] h-[500px] bg-purple-900/10 blur-[180px] pointer-events-none rounded-full" />

      {/* Universal Navigation */}
      <Navbar onOpenSos={() => setIsSosOpen(true)} />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-20 relative z-10">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/25 rounded-full text-purple-300 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            {t('hero_badge_ai')}
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-emerald-300 text-xs font-bold">
            <span>{t('hero_badge_fixed')}</span>
          </div>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight text-center leading-[1.15] max-w-5xl mx-auto mb-6">
          {t('hero_title_1')}{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">
            {t('hero_title_ai')}
          </span>{' '}
          {t('hero_title_2')}
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-base sm:text-xl max-w-3xl mx-auto text-center mb-10 leading-relaxed">
          {t('hero_subtitle')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/map"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 hover:from-purple-500 hover:via-pink-400 hover:to-rose-300 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-purple-500/25 active:scale-95 text-base flex items-center justify-center gap-2"
          >
            <span>{t('hero_cta_map')}</span>
            <span>→</span>
          </Link>
          <Link
            href="/statistics"
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold transition-all border border-white/10 text-base flex items-center justify-center gap-2"
          >
            <span>{t('hero_cta_stats')}</span>
          </Link>
          <button
            onClick={() => setIsSosOpen(true)}
            className="w-full sm:w-auto bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-4 rounded-2xl font-bold transition-all text-base flex items-center justify-center gap-2"
          >
            <span>{t('hero_cta_sos')}</span>
          </button>
        </div>

        {/* QUICK HAZARD REPORT BAR */}
        <div className="max-w-4xl mx-auto bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/15 p-5 sm:p-7 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="text-sm font-bold text-white">{t('quick_title')}</span>
            </div>
            <span className="text-xs text-purple-400 font-semibold hidden sm:inline">
              {t('quick_hint')}
            </span>
          </div>

          {quickSent ? (
            <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-4 text-emerald-300 text-sm font-bold text-center animate-in zoom-in-95">
              {t('quick_success')}
            </div>
          ) : (
            <form onSubmit={handleQuickSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder={t('quick_placeholder')}
                value={quickStreet}
                onChange={(e) => setQuickStreet(e.target.value)}
                required
                className="flex-1 bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <select
                value={quickType}
                onChange={(e) => setQuickType(e.target.value)}
                className="bg-slate-950/80 border border-white/10 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="chuqurlik">{t('quick_pothole')}</option>
                <option value="svetofor">{t('quick_traffic')}</option>
                <option value="belgi">{t('quick_sign')}</option>
                <option value="yoritgich">{t('quick_light')}</option>
              </select>
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-purple-500/20 active:scale-95 whitespace-nowrap"
              >
                {t('quick_send')}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* LIVE STATS COUNTER TICKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: t('stat_fixed'), val: '14,820+', icon: '✅', color: 'from-emerald-400 to-teal-400' },
            { label: t('stat_ai_acc'), val: '98.4%', icon: '🎯', color: 'from-purple-400 to-pink-400' },
            { label: t('stat_regions'), val: '14 ta', icon: '📍', color: 'from-blue-400 to-cyan-400' },
            { label: t('stat_avg_time'), val: '48 soat', icon: '⏱️', color: 'from-amber-400 to-orange-400' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/50 border border-white/10 backdrop-blur-xl hover:border-purple-500/30 transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-white/5 px-2.5 py-1 rounded-full">
                  {t('stat_realtime')}
                </span>
              </div>
              <div className={`text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r ${item.color} tracking-tight mb-1`}>
                {item.val}
              </div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI VISION DEMO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <AiVisionDemo />
      </section>

      {/* CORE FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            {t('feat_badge')}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            {t('feat_title')}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
            {t('feat_subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curData.features.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl hover:border-purple-500/40 transition-all hover:-translate-y-1.5 group hover:shadow-xl hover:shadow-purple-500/10 relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl border border-white/5 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {item.tag}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-purple-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRAKING DISTANCE CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <BrakingCalculator />
      </section>

      {/* LIVE COMMUNITY ACTIVITY FEED & REGIONAL INDEX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Live Incident Stream */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <h3 className="text-xl font-extrabold text-white tracking-tight">
                    {t('feed_title')}
                  </h3>
                </div>
                <p className="text-xs text-slate-400">{t('feed_subtitle')}</p>
              </div>
              <Link
                href="/map"
                className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1"
              >
                {t('feed_all')}
              </Link>
            </div>

            <div className="space-y-4">
              {curData.liveFeeds.map((feed) => (
                <div
                  key={feed.id}
                  className="p-4 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-all flex items-start gap-3.5"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-lg shrink-0 mt-0.5">
                    {feed.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-white">{feed.city}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{feed.time}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">{feed.text}</p>
                    <span
                      className={`inline-flex text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        feed.status === 'fixed'
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/15 text-amber-400 border border-amber-500/20'
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
          <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight">
                    {curData.regional_title}
                  </h3>
                  <p className="text-xs text-slate-400">{curData.regional_sub}</p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Top 2026
                </span>
              </div>

              <div className="space-y-4">
                {curData.regions.map((reg, i) => (
                  <div key={i} className="bg-slate-950/40 p-3 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-center text-xs font-semibold mb-1.5">
                      <span className="text-slate-300">{reg.name}</span>
                      <span className="text-white font-mono font-bold">{reg.pct}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${reg.color} rounded-full transition-all duration-700`}
                        style={{ width: `${reg.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <Link
                href="/statistics"
                className="w-full block text-center bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-semibold text-xs transition-colors border border-white/10"
              >
                {curData.view_all_stats}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SAFETY QUIZ INTERACTIVE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        <SafetyQuiz />
      </section>

      {/* TOP ROAD GUARDIANS (CITIZEN LEADERBOARD) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            {t('lead_badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            {t('lead_title')}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto">
            {t('lead_subtitle')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {curData.guardians.map((g, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl hover:border-purple-500/30 transition-all hover:-translate-y-1 text-center group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 border border-white/5 group-hover:scale-110 transition-transform">
                {g.avatar}
              </div>
              <h4 className="text-base font-bold text-white mb-1">{g.name}</h4>
              <span className="inline-block text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-0.5 rounded-full mb-4">
                {g.badge}
              </span>
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/5 text-xs">
                <div className="bg-slate-950/60 p-2 rounded-xl">
                  <span className="text-slate-500 text-[10px] block uppercase">{t('lead_reports')}</span>
                  <span className="text-white font-bold">{g.reports}</span>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-xl">
                  <span className="text-slate-500 text-[10px] block uppercase">{t('lead_resolved')}</span>
                  <span className="text-emerald-400 font-bold">{g.resolved}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MOBILE APP PROMO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-purple-950/60 via-slate-900/90 to-pink-950/50 border border-purple-500/30 p-8 sm:p-14 shadow-2xl relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/15 rounded-lg text-white text-xs font-semibold uppercase tracking-wider">
                {t('app_badge')}
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                {t('app_title')}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                {t('app_desc')}
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
                <div className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center gap-3 cursor-pointer transition-all active:scale-95">
                  <span className="text-2xl">🍏</span>
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 leading-none">{t('app_download')}</div>
                    <div className="text-sm font-bold text-white">Apple App Store</div>
                  </div>
                </div>
                <div className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 flex items-center gap-3 cursor-pointer transition-all active:scale-95">
                  <span className="text-2xl">🤖</span>
                  <div className="text-left">
                    <div className="text-[10px] text-slate-400 leading-none">{t('app_download')}</div>
                    <div className="text-sm font-bold text-white">Google Play Market</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-56 h-96 rounded-[40px] bg-slate-950 border-4 border-slate-700 shadow-2xl p-3 flex flex-col justify-between relative overflow-hidden ring-1 ring-purple-500/50">
                <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2" />
                <div className="flex-1 bg-gradient-to-b from-purple-900/40 to-slate-900 rounded-2xl p-3 flex flex-col justify-between text-center">
                  <span className="text-3xl mt-4">🛡️</span>
                  <div>
                    <div className="text-xs font-bold text-white">Road Safety AI</div>
                    <div className="text-[10px] text-emerald-400 mt-1">Radar: Active (0 Hazards)</div>
                  </div>
                  <div className="bg-purple-600 text-white text-[11px] font-bold py-2 rounded-xl">
                    Scan Camera
                  </div>
                </div>
                <div className="w-10 h-1 bg-slate-700 rounded-full mx-auto mt-2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION (ACCORDION) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            {t('faq_badge')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
            {t('faq_title')}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            {t('faq_subtitle')}
          </p>
        </div>

        <div className="space-y-4">
          {curData.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/50 border border-white/10 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-purple-400 text-lg">{openFaq === idx ? '−' : '+'}</span>
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION (CTA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 relative z-10 text-center">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-rose-600/20 border border-purple-500/30">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            {t('final_title')}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('final_desc')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/map"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 hover:from-purple-500 hover:via-pink-400 hover:to-rose-300 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-purple-500/25 active:scale-95 text-base"
            >
              {t('final_btn')}
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold transition-all border border-white/10 text-base"
            >
              {t('final_about_btn')}
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/998901234567"
          target="_blank"
          rel="noopener noreferrer"
          title="Tezkor savol berish"
          className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all ring-2 ring-white/20"
        >
          <span className="text-2xl">💬</span>
        </a>
      </div>

      {/* Universal Footer */}
      <Footer />

      {/* SOS Modal */}
      <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
    </main>
  );
}
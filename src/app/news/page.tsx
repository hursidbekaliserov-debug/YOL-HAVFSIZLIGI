'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SosModal from '../../components/SosModal';
import RoadWeatherPasses from '../../components/RoadWeatherPasses';
import TrafficFinesGuide from '../../components/TrafficFinesGuide';
import { useLanguage } from '../../context/LanguageContext';
import { newsArticles, NewsArticle } from '../../data/newsData';

export default function NewsPage() {
  const { language, t } = useLanguage();
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'news' | 'passes' | 'fines'>('news');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loc = {
    uz: {
      badge: 'YHXBB & FVV RASMIY AXBOROT PORTALI',
      title: 'Yo\'l Xavfsizligi Yangiliklari va Ogohlantirishlari',
      sub: 'Respublika bo\'ylab yo\'l harakati qoidalaridagi o\'zgarishlar, ob-havo xavflari, dovonlar holati va yangi infratuzilma yangiliklari.',
      breaking_label: 'TEZKOR OGOHLANTIRISH:',
      breaking_text: 'Qamchiq dovonida qor yog\'moqda — barcha haydovchilardan qishki shinalar bilan harakatlanish va oraliq masofani saqlash so\'raladi!',
      tab_news: '📰 Barcha Yangiliklar',
      tab_passes: '⛰️ Dovonlar & Ob-havo',
      tab_fines: '⚖️ YHQ Jarimalar Ma\'lumotnomasi',
      search_placeholder: 'Yangiliklar bo\'yicha qidiruv (masalan: dovon, svetofor, tezlik, radar)...',
      all: 'Barchasi',
      weather: 'Ob-havo & Xavf',
      tech: 'AI & Texnologiya',
      rules: 'YHQ & Qoidalar',
      repairs: 'Yo\'l Ta\'miri',
      safety: 'Bolalar Xavfsizligi',
      read_more: 'Batafsil o\'qish',
      read_time: 'O\'qish vaqti:',
      source: 'Rasmiy manba:',
      tips_heading: 'Haydovchi va yo\'lovchilar uchun tavsiyalar:',
      share: 'Ulashish',
      copied: 'Havola nusxalandi!',
      close: 'Yopish',
      no_results: 'Sizning so\'rovingiz bo\'yicha hech qanday yangilik topilmadi.',
      quick_report_prompt: 'Yo\'ldagi nosozlikni ko\'rdingizmi? Xaritada 1 daqiqada belgilang va bartaraf etilishiga hissa qo\'shing!',
      quick_report_btn: '+ Muammoni xaritada belgilash',
    },
    ru: {
      badge: 'ОФИЦИАЛЬНЫЙ ИНФОРМАЦИОННЫЙ ПОРТАЛ ГУБДД И МЧС',
      title: 'Новости и Оповещения Безопасности Дорог',
      subtitle: 'Оперативные изменения ПДД, предупреждения о погодных угрозах, состояние перевалов и дорожная инфраструктура Узбекистана.',
      breaking_label: 'СРОЧНОЕ ОПОВЕЩЕНИЕ:',
      breaking_text: 'На перевале Камчик снегопад — просим водителей соблюдать осторожность, дистанцию и использовать зимнюю резину!',
      tab_news: '📰 Все Новости',
      tab_passes: '⛰️ Перевалы & Трассы',
      tab_fines: '⚖️ Справочник Штрафов ПДД',
      search_placeholder: 'Поиск по новостям (напр.: перевал, светофор, скорость, радары)...',
      all: 'Все',
      weather: 'Погода & Риски',
      tech: 'ИИ & Технологии',
      rules: 'ПДД & Законы',
      repairs: 'Ремонт дорог',
      safety: 'Безопасность детей',
      read_more: 'Подробнее',
      read_time: 'Время чтения:',
      source: 'Источник:',
      tips_heading: 'Рекомендации для водителей и пешеходов:',
      share: 'Поделиться',
      copied: 'Ссылка скопирована!',
      close: 'Закрыть',
      no_results: 'По вашему запросу новостей не найдено.',
      quick_report_prompt: 'Заметили яму или неисправный светофор? Нанесите на карту за 1 минуту!',
      quick_report_btn: '+ Сообщить о дефекте на карте',
    },
    en: {
      badge: 'OFFICIAL ROAD SAFETY & EMERGENCY DISPATCH',
      title: 'Road Safety News & Real-Time Advisories',
      subtitle: 'National traffic rule updates, weather and avalanche warnings, mountain pass conditions, and infrastructure reports.',
      breaking_label: 'URGENT ROAD ADVISORY:',
      breaking_text: 'Snowfall on Kamchik Pass — winter tires mandatory; drivers are urged to maintain safe following distances!',
      tab_news: '📰 All News & Releases',
      tab_passes: '⛰️ Mountain Passes Live',
      tab_fines: '⚖️ Traffic Fines Guide',
      search_placeholder: 'Search traffic news (e.g., Kamchik, speed cameras, repairs, winter)...',
      all: 'All',
      weather: 'Weather & Hazards',
      tech: 'AI & Smart Tech',
      rules: 'Regulations & Laws',
      repairs: 'Road Reconstruction',
      safety: 'Pedestrian Safety',
      read_more: 'Read Full Article',
      read_time: 'Read time:',
      source: 'Official Source:',
      tips_heading: 'Key safety directives for motorists:',
      share: 'Share Link',
      copied: 'Link copied!',
      close: 'Close',
      no_results: 'No matching news articles found.',
      quick_report_prompt: 'Encountered a hazardous road condition? Pin it to our live map in 60 seconds!',
      quick_report_btn: '+ Report Hazard on Live Map',
    },
  }[language] || {
    badge: 'YHXBB & FVV RASMIY AXBOROT PORTALI',
    title: 'Yo\'l Xavfsizligi Yangiliklari va Ogohlantirishlari',
    sub: 'Respublika bo\'ylab yo\'l harakati qoidalaridagi o\'zgarishlar, ob-havo xavflari, dovonlar holati va yangi infratuzilma yangiliklari.',
    breaking_label: 'TEZKOR OGOHLANTIRISH:',
    breaking_text: 'Qamchiq dovonida qor yog\'moqda — barcha haydovchilardan qishki shinalar bilan harakatlanish va oraliq masofani saqlash so\'raladi!',
    tab_news: '📰 Barcha Yangiliklar',
    tab_passes: '⛰️ Dovonlar & Ob-havo',
    tab_fines: '⚖️ YHQ Jarimalar Ma\'lumotnomasi',
    search_placeholder: 'Yangiliklar bo\'yicha qidiruv (masalan: dovon, svetofor, tezlik, radar)...',
    all: 'Barchasi',
    weather: 'Ob-havo & Xavf',
    tech: 'AI & Texnologiya',
    rules: 'YHQ & Qoidalar',
    repairs: 'Yo\'l Ta\'miri',
    safety: 'Bolalar Xavfsizligi',
    read_more: 'Batafsil o\'qish',
    read_time: 'O\'qish vaqti:',
    source: 'Rasmiy manba:',
    tips_heading: 'Haydovchi va yo\'lovchilar uchun tavsiyalar:',
    share: 'Ulashish',
    copied: 'Havola nusxalandi!',
    close: 'Yopish',
    no_results: 'Sizning so\'rovingiz bo\'yicha hech qanday yangilik topilmadi.',
    quick_report_prompt: 'Yo\'ldagi nosozlikni ko\'rdingizmi? Xaritada 1 daqiqada belgilang va bartaraf etilishiga hissa qo\'shing!',
    quick_report_btn: '+ Muammoni xaritada belgilash',
  };

  const filteredNews = newsArticles.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const titleStr = item.title[language] || item.title.uz;
    const summaryStr = item.summary[language] || item.summary.uz;
    const matchesSearch =
      titleStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      summaryStr.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleCopyLink = (id: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.origin + '/news#' + id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#1A1D20] font-sans selection:bg-[#16C79A] selection:text-white relative">
      {/* Universal Sticky Navbar */}
      <Navbar onOpenSos={() => setIsSosOpen(true)} />

      {/* High-Impact Breaking News Alert Bar */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-amber-600 text-white text-xs font-semibold px-4 py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <span className="bg-white text-red-600 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 animate-pulse">
              ⚡ {loc.breaking_label}
            </span>
            <p className="truncate font-medium">
              {loc.breaking_text}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('passes')}
            className="hidden sm:inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-[11px] font-bold shrink-0 transition-colors"
          >
            Dovonlar holati →
          </button>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="pt-14 pb-16 bg-gradient-to-b from-white to-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#16C79A] animate-pulse"></span>
            <span>● {loc.badge}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#111827] tracking-tight leading-[1.15] max-w-4xl mx-auto mb-4">
            Yo&apos;l Xavfsizligi <span className="text-[#16C79A]">Yangiliklari va Ogohlantirishlari</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed">
            {loc.sub}
          </p>

          {/* Tab Navigation Pill Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-10">
            <button
              onClick={() => setActiveTab('news')}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm ${
                activeTab === 'news'
                  ? 'bg-[#16C79A] text-white shadow-teal-500/25 shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {loc.tab_news}
            </button>
            <button
              onClick={() => setActiveTab('passes')}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm ${
                activeTab === 'passes'
                  ? 'bg-[#16C79A] text-white shadow-teal-500/25 shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {loc.tab_passes}
            </button>
            <button
              onClick={() => setActiveTab('fines')}
              className={`px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all shadow-sm ${
                activeTab === 'fines'
                  ? 'bg-[#16C79A] text-white shadow-teal-500/25 shadow-md scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              {loc.tab_fines}
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* TAB 1: ALL NEWS */}
        {activeTab === 'news' && (
          <div className="space-y-10">
            {/* Search & Category Filtering Bar */}
            <div className="bg-white rounded-3xl border border-gray-200/90 p-5 sm:p-7 shadow-sm space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base">🔍</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={loc.search_placeholder}
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-full text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#16C79A] focus:bg-white transition-all shadow-inner"
                />
              </div>

              {/* Category buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { id: 'all', label: loc.all },
                  { id: 'weather', label: loc.weather },
                  { id: 'tech', label: loc.tech },
                  { id: 'rules', label: loc.rules },
                  { id: 'repairs', label: loc.repairs },
                  { id: 'safety', label: loc.safety },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-[#16C79A] text-white shadow-md shadow-teal-500/20'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((article) => (
                <article
                  key={article.id}
                  id={article.id}
                  onClick={() => setActiveArticle(article)}
                  className="bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-7 shadow-md hover:shadow-xl hover:border-[#16C79A] transition-all hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
                >
                  {article.isUrgent && (
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-red-500 animate-pulse" />
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                          article.isUrgent
                            ? 'bg-red-50 text-red-700 border-red-200'
                            : 'bg-teal-50 text-[#0E9F79] border-teal-200'
                        }`}
                      >
                        {article.badge[language] || article.badge.uz}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">
                        {article.date}
                      </span>
                    </div>

                    <div className="text-3xl mb-3">{article.icon}</div>

                    <h3 className="text-xl font-bold text-[#111827] group-hover:text-[#16C79A] transition-colors leading-snug mb-3">
                      {article.title[language] || article.title.uz}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {article.summary[language] || article.summary.uz}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-400 font-medium">⏱️ {article.readTime}</span>
                    <span className="font-bold text-[#16C79A] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      {loc.read_more} →
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center text-gray-400 border border-gray-200">
                <span className="text-4xl block mb-3">🔍</span>
                <p className="text-sm font-semibold">{loc.no_results}</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: MOUNTAIN PASSES & HIGHWAY WEATHER */}
        {activeTab === 'passes' && (
          <div className="animate-in fade-in duration-300">
            <RoadWeatherPasses />
          </div>
        )}

        {/* TAB 3: FINES GUIDE & CALCULATOR */}
        {activeTab === 'fines' && (
          <div className="animate-in fade-in duration-300">
            <TrafficFinesGuide />
          </div>
        )}

        {/* Banner: Report a Hazard from news page */}
        <div className="mt-16 p-8 sm:p-12 bg-white rounded-3xl border border-gray-200/90 shadow-xl shadow-gray-200/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0E9F79] bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              ⚡ Jamoatchilik Hamkorligi
            </span>
            <h3 className="text-2xl font-black text-[#111827]">
              Siz ham yo&apos;ldagi yangilik va o&apos;zgarishlarni kuzatib boring
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-xl">
              {loc.quick_report_prompt}
            </p>
          </div>

          <Link
            href="/map"
            className="w-full md:w-auto px-8 py-4 bg-[#16C79A] hover:bg-[#12a37d] text-white font-bold text-xs uppercase tracking-wider rounded-full transition-all shadow-lg shadow-teal-500/25 active:scale-95 text-center shrink-0"
          >
            {loc.quick_report_btn} →
          </Link>
        </div>
      </div>

      {/* Full Article Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-gray-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveArticle(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-sm transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="mb-4">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                    activeArticle.isUrgent
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-teal-50 text-[#0E9F79] border-teal-200'
                  }`}
                >
                  {activeArticle.badge[language] || activeArticle.badge.uz}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {activeArticle.date}
                </span>
                <span className="text-xs text-gray-400">● ⏱️ {activeArticle.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#111827] leading-tight mb-3">
                {activeArticle.title[language] || activeArticle.title.uz}
              </h2>

              <div className="text-xs text-gray-500 font-semibold mb-4 bg-gray-50 p-2.5 rounded-xl border border-gray-200">
                {loc.source} {activeArticle.author[language] || activeArticle.author.uz}
              </div>
            </div>

            <div className="space-y-3.5 text-sm text-gray-700 leading-relaxed mb-6">
              {(activeArticle.content[language] || activeArticle.content.uz).map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {activeArticle.tips && (
              <div className="p-4 bg-teal-50/80 border border-teal-200 rounded-2xl mb-6">
                <h4 className="text-xs font-bold text-[#0E9F79] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span>🛡️</span>
                  <span>{loc.tips_heading}</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {(activeArticle.tips[language] || activeArticle.tips.uz).map((tip, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#16C79A] font-bold">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleCopyLink(activeArticle.id)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>🔗</span>
                <span>{copiedId === activeArticle.id ? loc.copied : loc.share}</span>
              </button>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-full sm:flex-1 py-2.5 bg-[#16C79A] hover:bg-[#12a37d] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                {loc.close}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Universal Footer */}
      <Footer />

      {/* Universal SOS Modal */}
      <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
    </main>
  );
}

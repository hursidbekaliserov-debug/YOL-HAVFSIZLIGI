'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import { newsArticles, NewsArticle } from '../data/newsData';

export default function LatestNewsSection() {
  const { language } = useLanguage();
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);

  const t = {
    uz: {
      badge: 'YANGILIKLAR & TEZKOR OGOHLANTIRISHLAR',
      title: 'So\'nggi Yo\'l Xavfsizligi Xabarlari',
      subtitle: 'Respublika yo\'llaridagi muhim o\'zgarishlar, ob-havo ogohlantirishlari va YHQ yangiliklari',
      viewAll: 'Barcha yangiliklarni ko\'rish →',
      readMore: 'To\'liq o\'qish',
      close: 'Yopish',
      authorLabel: 'Manba:',
      shareText: 'Ulashish',
      copied: 'Nusxalandi!',
    },
    ru: {
      badge: 'НОВОСТИ И СРОЧНЫЕ ОПОВЕЩЕНИЯ',
      title: 'Последние Новости Безопасности Дорог',
      subtitle: 'Важные изменения, погодные сводки и нововведения в ПДД Узбекистана',
      viewAll: 'Смотреть все новости →',
      readMore: 'Читать полностью',
      close: 'Закрыть',
      authorLabel: 'Источник:',
      shareText: 'Поделиться',
      copied: 'Скопировано!',
    },
    en: {
      badge: 'NEWS & URGENT ADVISORIES',
      title: 'Latest Road Safety & Traffic Updates',
      subtitle: 'Important national traffic regulations, weather warnings, and infrastructure developments',
      viewAll: 'View All News & Updates →',
      readMore: 'Read Full Story',
      close: 'Close',
      authorLabel: 'Source:',
      shareText: 'Share',
      copied: 'Copied!',
    },
  }[language] || {
    badge: 'YANGILIKLAR & TEZKOR OGOHLANTIRISHLAR',
    title: 'So\'nggi Yo\'l Xavfsizligi Xabarlari',
    subtitle: 'Respublika yo\'llaridagi muhim o\'zgarishlar, ob-havo ogohlantirishlari va YHQ yangiliklari',
    viewAll: 'Barcha yangiliklarni ko\'rish →',
    readMore: 'To\'liq o\'qish',
    close: 'Yopish',
    authorLabel: 'Manba:',
    shareText: 'Ulashish',
    copied: 'Nusxalandi!',
  };

  // Show top 3 articles on home page
  const featuredNews = newsArticles.slice(0, 3);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const handleCopy = (id: string) => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.origin + '/news#' + id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="w-full">
      {/* Header with Title & View All Link */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#16C79A] animate-pulse"></span>
            <span>● {t.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#111827] tracking-tight">
            {t.title}
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-xl">
            {t.subtitle}
          </p>
        </div>

        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0E9F79] hover:text-[#16C79A] bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 px-4 py-2 rounded-full transition-all uppercase tracking-wider shrink-0 shadow-sm"
        >
          <span>{t.viewAll}</span>
        </Link>
      </div>

      {/* Featured Cards Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {featuredNews.map((article) => (
          <article
            key={article.id}
            onClick={() => setActiveArticle(article)}
            className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-md hover:shadow-xl hover:border-[#16C79A] transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            {article.isUrgent && (
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 via-amber-500 to-red-500 animate-pulse" />
            )}

            <div>
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    article.isUrgent
                      ? 'bg-red-50 text-red-700 border-red-200'
                      : 'bg-teal-50 text-[#0E9F79] border-teal-200'
                  }`}
                >
                  {article.badge[language] || article.badge.uz}
                </span>
                <span className="text-[11px] text-gray-400 font-mono">
                  {article.date}
                </span>
              </div>

              <div className="text-3xl mb-3">{article.icon}</div>

              <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#16C79A] transition-colors leading-snug mb-2 line-clamp-2">
                {article.title[language] || article.title.uz}
              </h3>

              <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3">
                {article.summary[language] || article.summary.uz}
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-400 font-medium">⏱️ {article.readTime}</span>
              <span className="font-bold text-[#16C79A] group-hover:translate-x-1 transition-transform flex items-center gap-1">
                {t.readMore} →
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Reading Modal */}
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
                {t.authorLabel} {activeArticle.author[language] || activeArticle.author.uz}
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
                  <span>Xavfsizlik bo&apos;yicha muhim tavsiyalar:</span>
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
                onClick={() => handleCopy(activeArticle.id)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <span>🔗</span>
                <span>{copiedId === activeArticle.id ? t.copied : t.shareText}</span>
              </button>
              <button
                onClick={() => setActiveArticle(null)}
                className="w-full sm:flex-1 py-2.5 bg-[#16C79A] hover:bg-[#12a37d] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md"
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

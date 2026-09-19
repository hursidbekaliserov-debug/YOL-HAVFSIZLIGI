'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function TelegramChatWidget() {
  const { language } = useLanguage();
  const [showTooltip, setShowTooltip] = useState(false);

  const t = {
    uz: {
      btnTitle: 'Tezkor savol berish (Telegram Bot)',
      tooltipTitle: 'Tezkor savol berish',
      tooltipDesc: 'Telegram botimiz 24/7 rejimida xizmatda: @xavfsiz_yollar_bot',
      openBtn: 'Botni ochish 🚀',
      online: 'Online',
    },
    ru: {
      btnTitle: 'Задать быстрый вопрос (Телеграм-бот)',
      tooltipTitle: 'Быстрый вопрос',
      tooltipDesc: 'Наш Telegram-бот на связи 24/7: @xavfsiz_yollar_bot',
      openBtn: 'Открыть бота 🚀',
      online: 'В сети',
    },
    en: {
      btnTitle: 'Quick assistance (Telegram Bot)',
      tooltipTitle: 'Quick Question',
      tooltipDesc: 'Our Telegram bot is available 24/7: @xavfsiz_yollar_bot',
      openBtn: 'Open Bot 🚀',
      online: 'Live',
    },
  }[language] || {
    btnTitle: 'Tezkor savol berish (Telegram Bot)',
    tooltipTitle: 'Tezkor savol berish',
    tooltipDesc: 'Telegram botimiz 24/7 rejimida xizmatda: @xavfsiz_yollar_bot',
    openBtn: 'Botni ochish 🚀',
    online: 'Online',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Interactive Tooltip Card on Hover */}
      {showTooltip && (
        <div className="hidden sm:block bg-white/95 backdrop-blur-md border border-gray-200/90 p-4 rounded-2xl shadow-2xl max-w-xs animate-in fade-in slide-in-from-right-3 duration-200 text-left">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-xs font-black text-[#111827] flex items-center gap-1.5">
              <span>🤖</span>
              <span>{t.tooltipTitle}</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.online}
            </span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            {t.tooltipDesc}
          </p>
          <a
            href="https://t.me/xavfsiz_yollar_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center py-2 px-3 bg-[#16C79A] hover:bg-[#12a37d] text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wider"
          >
            {t.openBtn}
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href="https://t.me/xavfsiz_yollar_bot"
        target="_blank"
        rel="noopener noreferrer"
        title={t.btnTitle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative group w-14 h-14 bg-[#16C79A] hover:bg-[#12a37d] text-white rounded-full flex items-center justify-center shadow-2xl shadow-teal-500/50 hover:scale-110 active:scale-95 transition-all border-2 border-white cursor-pointer"
        aria-label={t.btnTitle}
      >
        <span className="text-2xl transition-transform group-hover:rotate-12">💬</span>
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 border-2 border-white animate-pulse" />
      </a>
    </div>
  );
}

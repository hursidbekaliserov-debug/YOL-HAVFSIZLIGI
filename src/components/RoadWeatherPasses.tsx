'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface PassStatus {
  id: string;
  name: { uz: string; ru: string; en: string };
  route: string;
  status: 'open' | 'caution' | 'closed';
  temp: string;
  condition: { uz: string; ru: string; en: string };
  visibility: { uz: string; ru: string; en: string };
  advisory: { uz: string; ru: string; en: string };
  lastUpdated: { uz: string; ru: string; en: string };
  restrictions: { uz: string; ru: string; en: string };
  emergencyPhone: string;
}

export const passData: PassStatus[] = [
  {
    id: 'qamchiq',
    name: {
      uz: 'Qamchiq dovoni',
      ru: 'Перевал Камчик',
      en: 'Kamchik Mountain Pass',
    },
    route: 'A-373 (Toshkent — O\'sh)',
    status: 'caution',
    temp: '-3°C',
    condition: {
      uz: 'Yengil qor, ayrim joylarda yaxmalak',
      ru: 'Слабый снег, местами гололедица',
      en: 'Light snow, patchy ice conditions',
    },
    visibility: {
      uz: '150-200 metr (Tuman)',
      ru: '150-200 метров (Туман)',
      en: '150-200 meters (Foggy)',
    },
    advisory: {
      uz: 'Qishki shinalar majburiy. Tezlikni 50 km/soatdan oshirmaslik va oraliq masofani saqlash tavsiya etiladi.',
      ru: 'Зимняя резина обязательна. Рекомендуется скорость до 50 км/ч и увеличенная дистанция.',
      en: 'Winter tires mandatory. Maintain speed below 50 km/h and keep extended braking distance.',
    },
    lastUpdated: {
      uz: '15 daqiqa oldin (YHXBB & FVV)',
      ru: '15 минут назад (ГУБДД и МЧС)',
      en: '15 mins ago (Police & EMERCOM)',
    },
    restrictions: {
      uz: 'Yuk mashinalari uchun zanjirli harakat tavsiya etiladi',
      ru: 'Грузовым автомобилям рекомендованы противобуксовочные цепи',
      en: 'Chains recommended for heavy freight vehicles',
    },
    emergencyPhone: '1050 (FVV)',
  },
  {
    id: 'taxtaqoracha',
    name: {
      uz: 'Taxtaqoracha dovoni',
      ru: 'Перевал Тахтакарача',
      en: 'Takhtakaracha Pass',
    },
    route: 'M-39 (Samarqand — Shahrisabz)',
    status: 'open',
    temp: '+1°C',
    condition: {
      uz: 'Yo\'l qoplamasi nam, yomg\'ir to\'xtagan',
      ru: 'Дорожное полотно влажное, осадки прекратились',
      en: 'Road surface damp, precipitation stopped',
    },
    visibility: {
      uz: 'Yaxshi (500+ metr)',
      ru: 'Хорошая (500+ метров)',
      en: 'Good (500+ meters)',
    },
    advisory: {
      uz: 'Tik burilishlarda va pasayish joylarida ehtiyotkor bo\'ling. Qat\'iy o\'z yo\'nalishida harakatlaning.',
      ru: 'Осторожно на крутых спусках и поворотах. Строго соблюдайте полосность движения.',
      en: 'Caution on steep descents and hairpin bends. Strictly adhere to lane boundaries.',
    },
    lastUpdated: {
      uz: '25 daqiqa oldin',
      ru: '25 минут назад',
      en: '25 mins ago',
    },
    restrictions: {
      uz: 'Barcha yengil va yo\'lovchi transportiga ochiq',
      ru: 'Открыто для всех видов легкового транспорта',
      en: 'Open for all passenger vehicles',
    },
    emergencyPhone: '102',
  },
  {
    id: 'm39_highway',
    name: {
      uz: 'M-39 Toshkent — Samarqand magistrali',
      ru: 'Трасса М-39 Ташкент — Самарканд',
      en: 'M-39 Tashkent — Samarkand Highway',
    },
    route: 'M-39 (Sirdaryo & Jizzax orqali)',
    status: 'open',
    temp: '+7°C',
    condition: {
      uz: 'Yo\'l quruq, ko\'rinish ochiq',
      ru: 'Сухой асфальт, видимость отличная',
      en: 'Dry asphalt, excellent visibility',
    },
    visibility: {
      uz: '1000+ metr (Ochiq havo)',
      ru: '1000+ метров (Ясно)',
      en: '1000+ meters (Clear)',
    },
    advisory: {
      uz: 'Jizzax aylanma yo\'lida ta\'mirlash ishlari bormoqda — belgilangan 70 km/soat tezlikka amal qiling.',
      ru: 'Ремонтные работы на объездной Джизака — соблюдайте ограничение 70 км/ч.',
      en: 'Pavement repairs on Jizzakh bypass — heed the 70 km/h reduced speed zone.',
    },
    lastUpdated: {
      uz: '10 daqiqa oldin',
      ru: '10 минут назад',
      en: '10 mins ago',
    },
    restrictions: {
      uz: 'Harakat me\'yorida, tirbandlik yo\'q',
      ru: 'Движение в штатном режиме, без заторов',
      en: 'Standard flow, no congestion',
    },
    emergencyPhone: '102',
  },
  {
    id: 'chorvoq',
    name: {
      uz: 'Toshkent — Bo\'stonliq (Chorvoq)',
      ru: 'Ташкент — Бостанлык (Чарвак)',
      en: 'Tashkent — Bostanlyk (Charvak)',
    },
    route: '4R-12 trassasi (Dam olish zonasi)',
    status: 'open',
    temp: '+3°C',
    condition: {
      uz: 'Quruq, ayrim soyali joylarda yengil namlik',
      ru: 'Сухо, легкая влажность на затененных участках',
      en: 'Dry, slight moisture in shaded areas',
    },
    visibility: {
      uz: '800+ metr',
      ru: '800+ метров',
      en: '800+ meters',
    },
    advisory: {
      uz: 'Chiqish va qaytish soatlarida yuqori transport oqimi kutilmoqda. Xavfsiz oraliqni saqlang.',
      ru: 'Ожидается плотный поток в часы пик. Держите дистанцию.',
      en: 'Heavy traffic expected during peak weekend hours. Maintain safe following gap.',
    },
    lastUpdated: {
      uz: '40 daqiqa oldin',
      ru: '40 минут назад',
      en: '40 mins ago',
    },
    restrictions: {
      uz: 'Harakat to\'liq ochiq',
      ru: 'Движение полностью открыто',
      en: 'Fully open for traffic',
    },
    emergencyPhone: '102 / 1050',
  },
];

export default function RoadWeatherPasses() {
  const { language } = useLanguage();
  const [selectedPass, setSelectedPass] = useState<PassStatus | null>(null);

  const t = {
    uz: {
      badge: 'JONLI MONITORING',
      title: 'Respublika Dovonlari va Asosiy Magistrallar Holati',
      subtitle: 'FVV va YHXBB rasmiy ma\'lumotlari asosida ob-havo, yo\'l qoplamasi va harakat cheklovlari',
      open: 'Harakat ochiq',
      caution: 'Ehtiyotkorlik zarur',
      closed: 'Harakat cheklangan',
      temp: 'Harorat',
      cond: 'Yo\'l holati',
      vis: 'Ko\'rish masofasi',
      adv: 'Tavsiya',
      restr: 'Cheklov / Eslatma',
      updated: 'Yangilandi',
      details: 'Batafsil ma\'lumot',
      close: 'Yopish',
      callHelp: 'Favqulodda aloqa',
    },
    ru: {
      badge: 'ОНЛАЙН МОНИТОРИНГ',
      title: 'Состояние Горных Перевалов и Магистралей',
      subtitle: 'Актуальные данные МЧС и ГУБДД по погодным условиям, дорожному полотну и ограничениям',
      open: 'Движение открыто',
      caution: 'Требуется осторожность',
      closed: 'Движение ограничено',
      temp: 'Температура',
      cond: 'Состояние дороги',
      vis: 'Видимость',
      adv: 'Рекомендация',
      restr: 'Ограничения',
      updated: 'Обновлено',
      details: 'Подробнее',
      close: 'Закрыть',
      callHelp: 'Экстренная связь',
    },
    en: {
      badge: 'LIVE MONITORING',
      title: 'Mountain Passes & Major Highways Live Status',
      subtitle: 'Official weather alerts, pavement conditions, and transit advisories from Police & EMERCOM',
      open: 'Road Open',
      caution: 'Caution Advised',
      closed: 'Transit Restricted',
      temp: 'Temperature',
      cond: 'Road Surface',
      vis: 'Visibility',
      adv: 'Safety Tip',
      restr: 'Restrictions',
      updated: 'Updated',
      details: 'View Details',
      close: 'Close',
      callHelp: 'Emergency Hotline',
    },
  }[language] || {
    badge: 'JONLI MONITORING',
    title: 'Respublika Dovonlari va Asosiy Magistrallar Holati',
    subtitle: 'FVV va YHXBB rasmiy ma\'lumotlari asosida ob-havo, yo\'l qoplamasi va harakat cheklovlari',
    open: 'Harakat ochiq',
    caution: 'Ehtiyotkorlik zarur',
    closed: 'Harakat cheklangan',
    temp: 'Harorat',
    cond: 'Yo\'l holati',
    vis: 'Ko\'rish masofasi',
    adv: 'Tavsiya',
    restr: 'Cheklov / Eslatma',
    updated: 'Yangilandi',
    details: 'Batafsil ma\'lumot',
    close: 'Yopish',
    callHelp: 'Favqulodda aloqa',
  };

  const getStatusBadge = (status: PassStatus['status']) => {
    switch (status) {
      case 'open':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {t.open}
          </span>
        );
      case 'caution':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            {t.caution}
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            {t.closed}
          </span>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#16C79A] animate-ping"></span>
          <span>● {t.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#111827] tracking-tight mb-3">
          {t.title}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Passes Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {passData.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedPass(item)}
            className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-md hover:shadow-xl hover:border-[#16C79A] transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0E9F79] to-[#16C79A]" />

            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-lg">
                  {item.route}
                </span>
                {getStatusBadge(item.status)}
              </div>

              <h3 className="text-lg font-black text-[#111827] group-hover:text-[#16C79A] transition-colors mb-2">
                {item.name[language] || item.name.uz}
              </h3>

              <div className="flex items-center gap-3 py-3 border-y border-gray-100 my-3">
                <div className="text-2xl font-black text-[#111827] flex items-center gap-1">
                  <span>🌡️</span>
                  <span>{item.temp}</span>
                </div>
                <div className="text-xs text-gray-500 leading-tight">
                  <span className="font-semibold text-gray-700 block">{t.cond}:</span>
                  <span className="line-clamp-1">{item.condition[language] || item.condition.uz}</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-600 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">{t.vis}:</span>
                  <span className="font-semibold text-gray-700">{item.visibility[language] || item.visibility.uz}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 font-medium">{t.updated}:</span>
                  <span className="text-emerald-700 font-mono font-bold text-[11px]">{item.lastUpdated[language] || item.lastUpdated.uz}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-2 py-2.5 px-4 bg-gray-50 group-hover:bg-teal-50 group-hover:text-[#0E9F79] text-gray-700 font-bold text-xs rounded-xl transition-colors border border-gray-200 group-hover:border-teal-200 flex items-center justify-center gap-1.5"
            >
              <span>{t.details}</span>
              <span>→</span>
            </button>
          </div>
        ))}
      </div>

      {/* Detailed Modal */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPass(null)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-sm transition-colors"
              aria-label="Close"
            >
              ✕
            </button>

            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold bg-teal-50 text-[#0E9F79] border border-teal-200 px-3 py-0.5 rounded-full">
                  {selectedPass.route}
                </span>
                {getStatusBadge(selectedPass.status)}
              </div>
              <h3 className="text-2xl font-black text-[#111827]">
                {selectedPass.name[language] || selectedPass.name.uz}
              </h3>
            </div>

            <div className="space-y-4 text-sm mb-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-xs text-gray-400 block font-semibold mb-0.5">{t.temp}</span>
                  <span className="text-2xl font-black text-[#111827]">🌡️ {selectedPass.temp}</span>
                </div>
                <div className="p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
                  <span className="text-xs text-gray-400 block font-semibold mb-0.5">{t.vis}</span>
                  <span className="text-sm font-bold text-gray-800">👁️ {selectedPass.visibility[language] || selectedPass.visibility.uz}</span>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
                <span className="text-xs text-gray-400 block font-bold uppercase tracking-wider mb-1">{t.cond}</span>
                <p className="text-gray-800 font-semibold">{selectedPass.condition[language] || selectedPass.condition.uz}</p>
              </div>

              <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl">
                <span className="text-xs text-[#0E9F79] block font-bold uppercase tracking-wider mb-1">
                  🛡️ {t.adv}
                </span>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {selectedPass.advisory[language] || selectedPass.advisory.uz}
                </p>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl">
                <span className="text-xs text-amber-800 block font-bold uppercase tracking-wider mb-1">
                  ⚠️ {t.restr}
                </span>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {selectedPass.restrictions[language] || selectedPass.restrictions.uz}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                <span>{t.updated}: {selectedPass.lastUpdated[language] || selectedPass.lastUpdated.uz}</span>
                <a
                  href={`tel:${selectedPass.emergencyPhone.replace(/\D/g, '')}`}
                  className="font-bold text-red-600 hover:underline flex items-center gap-1"
                >
                  🚨 {t.callHelp}: {selectedPass.emergencyPhone}
                </a>
              </div>
            </div>

            <button
              onClick={() => setSelectedPass(null)}
              className="w-full py-3.5 bg-[#16C79A] hover:bg-[#12a37d] text-white font-bold text-sm rounded-2xl transition-all shadow-md active:scale-95"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

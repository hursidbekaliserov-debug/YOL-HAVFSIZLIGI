'use client';

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export interface FineItem {
  id: string;
  category: 'speed' | 'light' | 'phone' | 'belt' | 'parking' | 'lane' | 'alcohol';
  article: string;
  title: { uz: string; ru: string; en: string };
  desc: { uz: string; ru: string; en: string };
  bhmMulti: number;
  points?: number;
}

export const CURRENT_BHM = 375000; // 375,000 so'm

export const finesData: FineItem[] = [
  {
    id: 'speed-20',
    category: 'speed',
    article: 'MJtK 128-3-modda 1-qism',
    title: {
      uz: 'Tezlikni 20 km/soatgacha oshirish',
      ru: 'Превышение скорости до 20 км/ч',
      en: 'Exceeding speed limit up to 20 km/h',
    },
    desc: {
      uz: 'Belgilangan harakat tezligini soatiga 20 kilometrdan oshmagan miqdorda oshirib haydash.',
      ru: 'Превышение установленной скорости движения на величину не более 20 км/ч.',
      en: 'Exceeding the designated legal speed limit by up to 20 km/h.',
    },
    bhmMulti: 1,
  },
  {
    id: 'speed-40',
    category: 'speed',
    article: 'MJtK 128-3-modda 2-qism',
    title: {
      uz: 'Tezlikni 20 dan 40 km/soatgacha oshirish',
      ru: 'Превышение скорости от 20 до 40 км/ч',
      en: 'Exceeding speed limit from 20 to 40 km/h',
    },
    desc: {
      uz: 'Belgilangan tezlikni soatiga 20 dan 40 kilometrgacha oshirib harakatlanish.',
      ru: 'Превышение установленной скорости движения от 20 до 40 км/ч.',
      en: 'Exceeding legal speed limit by 20 to 40 km/h.',
    },
    bhmMulti: 5,
  },
  {
    id: 'speed-40plus',
    category: 'speed',
    article: 'MJtK 128-3-modda 3-qism',
    title: {
      uz: 'Tezlikni 40 km/soatdan ortiq oshirish',
      ru: 'Превышение скорости более чем на 40 км/ч',
      en: 'Exceeding speed limit by more than 40 km/h',
    },
    desc: {
      uz: 'Belgilangan harakat tezligini soatiga 40 kilometrdan ortiq miqdorda oshirish.',
      ru: 'Превышение установленной скорости более чем на 40 км/ч.',
      en: 'Exceeding legal speed limit by over 40 km/h.',
    },
    bhmMulti: 9,
  },
  {
    id: 'red-light',
    category: 'light',
    article: 'MJtK 128-4-modda',
    title: {
      uz: 'Svetoforning qizil chirog\'ida o\'tish',
      ru: 'Проезд на запрещающий сигнал светофора',
      en: 'Running a red traffic light',
    },
    desc: {
      uz: 'Svetoforning taqiqlovchi ishorasiga yoki tartibga soluvchining ishorasiga bo\'ysunmasdan o\'tish.',
      ru: 'Проезд на запрещающий красный сигнал или запрещающий жест регулировщика.',
      en: 'Proceeding past a stop/red traffic light or contrary to traffic controller signs.',
    },
    bhmMulti: 2,
  },
  {
    id: 'seatbelt',
    category: 'belt',
    article: 'MJtK 125-modda 1-qism',
    title: {
      uz: 'Xavfsizlik kamarini taqmaslik',
      ru: 'Непристегнутый ремень безопасности',
      en: 'Failure to fasten seatbelt',
    },
    desc: {
      uz: 'Avtotransport vositasini xavfsizlik kamarini taqmasdan boshqarish.',
      ru: 'Управление транспортным средством без пристегнутого ремня безопасности.',
      en: 'Operating a motor vehicle without fastening mandatory safety seatbelt.',
    },
    bhmMulti: 0.5,
  },
  {
    id: 'phone-driving',
    category: 'phone',
    article: 'MJtK 128-1-modda',
    title: {
      uz: 'Haydash paytida telefondan foydalanish',
      ru: 'Пользование телефоном во время движения',
      en: 'Using phone while driving',
    },
    desc: {
      uz: 'Transport vositasini boshqarish paytida haydovchining telefondan qo\'l bilan foydalanishi.',
      ru: 'Использование телефона водителем во время движения транспортного средства.',
      en: 'Operating a handheld mobile device while navigating motor vehicle.',
    },
    bhmMulti: 3,
  },
  {
    id: 'contraflow',
    category: 'lane',
    article: 'MJtK 128-5-modda 2-qism',
    title: {
      uz: 'Qarama-qarshi yo\'nalishga chiqish',
      ru: 'Выезд на полосу встречного движения',
      en: 'Driving into oncoming traffic lane',
    },
    desc: {
      uz: 'Yo\'l harakati qoidalarini buzgan holda qarama-qarshi harakatlanish chizig\'iga chiqish.',
      ru: 'Выезд на сторону проезжей части, предназначенную для встречного движения.',
      en: 'Illegal overtaking into designated oncoming traffic lanes.',
    },
    bhmMulti: 10,
  },
  {
    id: 'parking-violation',
    category: 'parking',
    article: 'MJtK 128-6-modda',
    title: {
      uz: 'To\'xtash yoki to\'xtab turish qoidasini buzish',
      ru: 'Нарушение правил остановки и стоянки',
      en: 'Illegal stopping or parking',
    },
    desc: {
      uz: 'To\'xtash yoki to\'xtab turish taqiqlangan zonalarda avtomobil qoldirish.',
      ru: 'Остановка или стоянка транспортных средств в запрещенных местах.',
      en: 'Parking or stopping vehicle in marked restricted or prohibited zones.',
    },
    bhmMulti: 2,
  },
  {
    id: 'solid-line',
    category: 'lane',
    article: 'MJtK 128-modda 1-qism',
    title: {
      uz: 'Yaxlit chiziqni bosish (1.1 / 1.3 chiziqlar)',
      ru: 'Пересечение сплошной линии разметки',
      en: 'Crossing solid road markings',
    },
    desc: {
      uz: 'Yo\'l chiziqlari (yaxlit oq chiziq) talablariga rioya etmasdan burilish yoki yo\'nalishni o\'zgartirish.',
      ru: 'Несоблюдение требований сплошной дорожной разметки при маневрировании.',
      en: 'Violating solid dividing lines during maneuvers or turns.',
    },
    bhmMulti: 0.5,
  },
];

export default function TrafficFinesGuide() {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [applyDiscount, setApplyDiscount] = useState(true);

  const t = {
    uz: {
      badge: 'YHQ QONUNCHILIGI VA JARIMALAR',
      title: 'Yo\'l Harakati Qoidabuzarliklari & Jarimalar Kalkulyatori',
      subtitle: '2025/2026 amaldagi Bazaviy Hisoblash Miqdori (BHM = 375,000 so\'m) va 50% chegirmali to\'lov hisobi',
      search_placeholder: 'Qoidabuzarlikni qidiring (masalan: tezlik, qizil, telefon)...',
      all: 'Barchasi',
      speed: 'Tezlik',
      light: 'Svetofor',
      phone: 'Telefon',
      belt: 'Kamar',
      parking: 'To\'xtash',
      lane: 'Chiziq & Oqim',
      bhm_val: 'Amaldagi BHM:',
      discount_toggle: '15 kunlik 50% chegirma bilan hisoblash',
      discount_active: '50% chegirma qo\'llandi (15 kun ichida to\'lansa)',
      standard_fine: 'Asl jarima:',
      discount_fine: 'Chegirma bilan to\'lov:',
      you_save: 'Tejashingiz:',
      base_amount: 'BHM karraligi:',
      no_results: 'Hech qanday qoidabuzarlik topilmadi.',
      caution_note: 'Eslatma: Qoidabuzarlik sodir etilgandan boshlab 15 kun ichida to\'langanida jarimaning 50 foizi to\'lanadi (MJtK 332-1-moddasi).',
    },
    ru: {
      badge: 'ЗАКОНОДАТЕЛЬСТВО ПДД И ШТРАФЫ',
      title: 'Справочник и Калькулятор Дорожных Штрафов',
      subtitle: 'Актуальный размер БРВ (375 000 сум) и расчет 50% скидки при своевременной оплате',
      search_placeholder: 'Поиск нарушения (напр.: скорость, светофор, телефон)...',
      all: 'Все',
      speed: 'Скорость',
      light: 'Светофор',
      phone: 'Телефон',
      belt: 'Ремень',
      parking: 'Парковка',
      lane: 'Полосы & Разметка',
      bhm_val: 'Текущий БРВ:',
      discount_toggle: 'Расчет со скидкой 50% (в течение 15 дней)',
      discount_active: 'Применена 50% скидка при оплате в 15 дней',
      standard_fine: 'Полный штраф:',
      discount_fine: 'К оплате со скидкой:',
      you_save: 'Вы экономите:',
      base_amount: 'Кратность БРВ:',
      no_results: 'Ничего не найдено.',
      caution_note: 'Примечание: При оплате штрафа в течение 15 дней действует скидка 50% (Статья 332-1 КоАО РУз).',
    },
    en: {
      badge: 'TRAFFIC FINES & LEGISLATION',
      title: 'Traffic Violations & Fine Calculator Guide',
      subtitle: 'Based on current Base Calculation Amount (BHM = 375,000 UZS) with prompt 50% early payment discount',
      search_placeholder: 'Search violations (e.g., speed, red light, phone)...',
      all: 'All',
      speed: 'Speed',
      light: 'Red Light',
      phone: 'Phone',
      belt: 'Seatbelt',
      parking: 'Parking',
      lane: 'Lane Markings',
      bhm_val: 'Current BHM:',
      discount_toggle: 'Apply 50% discount (paid within 15 days)',
      discount_active: '50% early payment discount applied',
      standard_fine: 'Full Fine:',
      discount_fine: 'Payable Amount:',
      you_save: 'You Save:',
      base_amount: 'Multiplier:',
      no_results: 'No matching violations found.',
      caution_note: 'Note: Paying within 15 calendar days from the penalty notice grants a 50% discount under law.',
    },
  }[language] || {
    badge: 'YHQ QONUNCHILIGI VA JARIMALAR',
    title: 'Yo\'l Harakati Qoidabuzarliklari & Jarimalar Kalkulyatori',
    subtitle: '2025/2026 amaldagi Bazaviy Hisoblash Miqdori (BHM = 375,000 so\'m) va 50% chegirmali to\'lov hisobi',
    search_placeholder: 'Qoidabuzarlikni qidiring (masalan: tezlik, qizil, telefon)...',
    all: 'Barchasi',
    speed: 'Tezlik',
    light: 'Svetofor',
    phone: 'Telefon',
    belt: 'Kamar',
    parking: 'To\'xtash',
    lane: 'Chiziq & Oqim',
    bhm_val: 'Amaldagi BHM:',
    discount_toggle: '15 kunlik 50% chegirma bilan hisoblash',
    discount_active: '50% chegirma qo\'llandi (15 kun ichida to\'lansa)',
    standard_fine: 'Asl jarima:',
    discount_fine: 'Chegirma bilan to\'lov:',
    you_save: 'Tejashingiz:',
    base_amount: 'BHM karraligi:',
    no_results: 'Hech qanday qoidabuzarlik topilmadi.',
    caution_note: 'Eslatma: Qoidabuzarlik sodir etilgandan boshlab 15 kun ichida to\'langanida jarimaning 50 foizi to\'lanadi (MJtK 332-1-moddasi).',
  };

  const filtered = finesData.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const titleText = item.title[language] || item.title.uz;
    const descText = item.desc[language] || item.desc.uz;
    const matchesQuery =
      titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      descText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.article.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const formatSum = (amount: number) => {
    return amount.toLocaleString('uz-UZ') + ' so\'m';
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-gray-200/90 p-6 sm:p-10 shadow-xl shadow-gray-200/40">
      {/* Top Header */}
      <div className="text-center max-w-3xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
          <span>⚖️ {t.badge}</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-[#111827] tracking-tight mb-3">
          {t.title}
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* Controls: Search, Categories, and Discount Switch */}
      <div className="space-y-4 mb-8">
        {/* Search & Discount row */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.search_placeholder}
              className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full text-sm text-[#111827] placeholder:text-gray-400 focus:outline-none focus:border-[#16C79A] focus:bg-white transition-all shadow-inner"
            />
          </div>

          <label className="inline-flex items-center gap-3 bg-teal-50/70 border border-teal-200/80 px-4 py-3 rounded-full cursor-pointer select-none shrink-0 transition-all hover:bg-teal-50">
            <input
              type="checkbox"
              checked={applyDiscount}
              onChange={(e) => setApplyDiscount(e.target.checked)}
              className="w-4 h-4 text-[#16C79A] rounded border-gray-300 focus:ring-[#16C79A] cursor-pointer"
            />
            <span className="text-xs font-bold text-[#0E9F79]">
              ✨ {t.discount_toggle}
            </span>
          </label>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[
            { id: 'all', label: t.all },
            { id: 'speed', label: t.speed },
            { id: 'light', label: t.light },
            { id: 'phone', label: t.phone },
            { id: 'belt', label: t.belt },
            { id: 'parking', label: t.parking },
            { id: 'lane', label: t.lane },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#16C79A] text-white shadow-md shadow-teal-500/20'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {filtered.map((item) => {
          const originalAmount = item.bhmMulti * CURRENT_BHM;
          const finalAmount = applyDiscount ? originalAmount * 0.5 : originalAmount;
          const savings = originalAmount - finalAmount;

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200/90 p-5 bg-gray-50/50 hover:bg-white hover:border-[#16C79A] hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-gray-500 bg-white border border-gray-200 px-2.5 py-0.5 rounded-md">
                    {item.article}
                  </span>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    {item.bhmMulti} BHM
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#111827] mb-2 leading-snug">
                  {item.title[language] || item.title.uz}
                </h4>

                <p className="text-xs text-gray-500 leading-relaxed mb-4">
                  {item.desc[language] || item.desc.uz}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200">
                {applyDiscount ? (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{t.standard_fine}</span>
                      <span className="line-through">{formatSum(originalAmount)}</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-xs font-bold text-emerald-700">{t.discount_fine}</span>
                      <span className="text-lg font-black text-[#0E9F79]">
                        {formatSum(finalAmount)}
                      </span>
                    </div>
                    <div className="text-[11px] text-emerald-600 font-semibold text-right">
                      {t.you_save}: {formatSum(savings)}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-bold text-gray-700">{t.standard_fine}</span>
                    <span className="text-lg font-black text-[#111827]">
                      {formatSum(originalAmount)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">
          {t.no_results}
        </div>
      )}

      {/* Caution Note Banner */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-medium leading-relaxed flex items-start gap-2.5">
        <span className="text-lg shrink-0 mt-0.5">ℹ️</span>
        <p>{t.caution_note}</p>
      </div>
    </div>
  );
}

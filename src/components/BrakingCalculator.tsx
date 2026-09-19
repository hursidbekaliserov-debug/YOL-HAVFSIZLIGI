'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function BrakingCalculator() {
  const { language, t } = useLanguage();
  const [speed, setSpeed] = useState<number>(60);
  const [weather, setWeather] = useState<'dry' | 'wet' | 'ice'>('dry');

  // Fizik hisob-kitoblar
  const speedInMps = speed / 3.6; // m/s
  const reactionTime = 1.0; // Inson o'rtacha reaksiya vaqti
  const reactionDistance = Math.round(speedInMps * reactionTime);

  const frictionMap = {
    dry: 0.75,
    wet: 0.42,
    ice: 0.15,
  };
  const g = 9.81;
  const mu = frictionMap[weather];
  const brakingDistance = Math.round(Math.pow(speedInMps, 2) / (2 * mu * g));
  const totalDistance = reactionDistance + brakingDistance;

  const weatherLabels = {
    uz: {
      dry: '☀️ Quruq asfalt',
      wet: '🌧️ Nam / Yomg\'ir',
      ice: '❄️ Muzlama / Qor',
      unit: 'km/soat',
      meter: 'metr',
    },
    ru: {
      dry: '☀️ Сухой асфальт',
      wet: '🌧️ Мокрый / Дождь',
      ice: '❄️ Гололед / Снег',
      unit: 'км/ч',
      meter: 'метров',
    },
    en: {
      dry: '☀️ Dry Asphalt',
      wet: '🌧️ Wet / Rain',
      ice: '❄️ Ice / Snow',
      unit: 'km/h',
      meter: 'meters',
    },
  };

  const w = weatherLabels[language] || weatherLabels.uz;

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 p-6 md:p-8 shadow-xl shadow-gray-100/80">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-2">
            ● {t('calc_badge')}
          </div>
          <h3 className="text-2xl font-black text-[#111827] tracking-tight">
            {t('calc_title')}
          </h3>
          <p className="text-gray-500 text-xs mt-1">
            {t('calc_subtitle')}
          </p>
        </div>
        <div className="bg-teal-50 border border-teal-200 px-4 py-2.5 rounded-2xl flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div>
            <div className="text-[10px] text-[#0E9F79] uppercase font-bold">{t('calc_rec_dist')}</div>
            <div className="text-xl font-black text-[#111827]">{totalDistance + 10} {w.meter}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Controls: Speed & Weather */}
        <div className="lg:col-span-5 space-y-6">
          {/* Speed Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-[#111827] flex items-center gap-2">
                <span>🚗 {t('calc_speed_label')}</span>
              </label>
              <span className="text-2xl font-black text-[#16C79A]">
                {speed} <span className="text-xs text-gray-500 font-normal">{w.unit}</span>
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="140"
              step="5"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#16C79A]"
            />
            <div className="flex justify-between text-[11px] text-gray-400 mt-1 font-mono">
              <span>20 {w.unit}</span>
              <span>60 {w.unit}</span>
              <span>100 {w.unit}</span>
              <span>140 {w.unit}</span>
            </div>
          </div>

          {/* Road Condition Tabs */}
          <div>
            <label className="text-sm font-bold text-[#111827] block mb-2.5">
              {t('calc_road_cond')}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => setWeather('dry')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  weather === 'dry'
                    ? 'bg-teal-50 border-[#16C79A] text-[#0E9F79] font-bold shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="text-xs font-bold leading-tight">{w.dry}</div>
              </button>
              <button
                onClick={() => setWeather('wet')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  weather === 'wet'
                    ? 'bg-teal-50 border-[#16C79A] text-[#0E9F79] font-bold shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="text-xs font-bold leading-tight">{w.wet}</div>
              </button>
              <button
                onClick={() => setWeather('ice')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  weather === 'ice'
                    ? 'bg-teal-50 border-[#16C79A] text-[#0E9F79] font-bold shadow-sm'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                <div className="text-xs font-bold leading-tight">{w.ice}</div>
              </button>
            </div>
          </div>
        </div>

        {/* Results Visualization */}
        <div className="lg:col-span-7 bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-[11px] text-gray-500 uppercase font-bold mb-1">
                {t('calc_reaction')}
              </div>
              <div className="text-2xl font-black text-gray-800">
                {reactionDistance} <span className="text-xs font-normal text-gray-500">{w.meter}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-[11px] text-gray-500 uppercase font-bold mb-1">
                {t('calc_braking')}
              </div>
              <div className="text-2xl font-black text-[#16C79A]">
                {brakingDistance} <span className="text-xs font-normal text-gray-500">{w.meter}</span>
              </div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <div className="text-[11px] text-gray-500 uppercase font-bold mb-1">
                {t('calc_total')}
              </div>
              <div className="text-2xl font-black text-rose-600">
                {totalDistance} <span className="text-xs font-normal text-gray-500">{w.meter}</span>
              </div>
            </div>
          </div>

          {/* Graphical Distance Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600 font-semibold">
              <span>0 m</span>
              <span>{totalDistance} {w.meter} (To&apos;liq to&apos;xtash)</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${(reactionDistance / totalDistance) * 100}%` }}
                className="bg-amber-400 h-full"
                title="Reaksiya masofasi"
              />
              <div
                style={{ width: `${(brakingDistance / totalDistance) * 100}%` }}
                className="bg-[#16C79A] h-full"
                title="Tormozlanish masofasi"
              />
            </div>
            <div className="flex items-center gap-4 text-[11px] text-gray-500 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-400"></span>
                <span>Reaksiya</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-[#16C79A]"></span>
                <span>Tormozlanish</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">
            {t('calc_badge')}
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            {t('calc_title')}
          </h3>
          <p className="text-slate-400 text-xs mt-1">
            {t('calc_subtitle')}
          </p>
        </div>
        <div className="bg-purple-950/40 border border-purple-500/30 px-4 py-2 rounded-2xl flex items-center gap-3">
          <span className="text-2xl">⚡</span>
          <div>
            <div className="text-[10px] text-purple-300 uppercase font-semibold">{t('calc_rec_dist')}</div>
            <div className="text-lg font-extrabold text-white">{totalDistance + 10} {w.meter}</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Controls: Speed & Weather */}
        <div className="lg:col-span-5 space-y-6">
          {/* Speed Slider */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-bold text-white flex items-center gap-2">
                <span>🚗 {t('calc_speed_label')}</span>
              </label>
              <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {speed} <span className="text-xs text-slate-400 font-normal">{w.unit}</span>
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="140"
              step="5"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-mono">
              <span>20 {w.unit}</span>
              <span>60 {w.unit}</span>
              <span>100 {w.unit}</span>
              <span>140 {w.unit}</span>
            </div>
          </div>

          {/* Road Condition */}
          <div>
            <label className="text-sm font-bold text-white block mb-2.5">
              {t('calc_road_cond')}
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              <button
                onClick={() => setWeather('dry')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  weather === 'dry'
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold leading-tight">{w.dry}</div>
              </button>
              <button
                onClick={() => setWeather('wet')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  weather === 'wet'
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold leading-tight">{w.wet}</div>
              </button>
              <button
                onClick={() => setWeather('ice')}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  weather === 'ice'
                    ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-bold leading-tight">{w.ice}</div>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-white/5">
              <span className="text-slate-400 text-xs block">{t('calc_reaction')}</span>
              <span className="text-xl font-bold text-amber-400 mt-0.5 block">{reactionDistance} {w.meter}</span>
            </div>
            <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-white/5">
              <span className="text-slate-400 text-xs block">{t('calc_braking')}</span>
              <span className="text-xl font-bold text-red-400 mt-0.5 block">{brakingDistance} {w.meter}</span>
            </div>
          </div>
        </div>

        {/* Visual Road Simulation */}
        <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold text-slate-300">{t('calc_total')}</span>
            <span className="text-xs font-black text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
              {totalDistance} {w.meter}
            </span>
          </div>

          {/* Visual Track */}
          <div className="space-y-4 my-4">
            {/* Reaction bar */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>{t('calc_reaction')}</span>
                <span className="text-amber-400 font-bold">{reactionDistance} {w.meter}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (reactionDistance / totalDistance) * 100)}%` }}
                />
              </div>
            </div>

            {/* Braking bar */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>{t('calc_braking')}</span>
                <span className="text-rose-500 font-bold">{brakingDistance} {w.meter}</span>
              </div>
              <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-red-500 to-rose-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (brakingDistance / totalDistance) * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Warning Message Box */}
          <div className="mt-4 p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 flex items-start gap-2.5">
            <span className="text-base">💡</span>
            <p className="leading-relaxed">
              <strong>{speed} {w.unit}</strong> = <strong>{speedInMps.toFixed(1)} {w.meter}/soniya!</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

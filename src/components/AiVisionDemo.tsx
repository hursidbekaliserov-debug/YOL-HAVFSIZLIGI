'use client';

import { useState, useEffect } from 'react';

export default function AiVisionDemo() {
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const [scanPulse, setScanPulse] = useState<number>(0);

  const scenarios = [
    {
      id: 0,
      title: 'Toshkent, Amir Temur shoh ko\'chasi',
      sub: 'Yo\'l qoplamasidagi chuqurcha va yoriqlar',
      time: '14:23:19',
      hazards: [
        {
          label: 'Chuqurcha (Pothole)',
          confidence: '98.4%',
          severity: 'Yuqori xavf',
          depth: '~14 sm',
          x: '38%',
          y: '58%',
          w: '180px',
          h: '110px',
          color: 'border-rose-500 bg-rose-500/10 text-rose-600',
        },
        {
          label: 'O\'chgan yo\'l chizig\'i',
          confidence: '94.1%',
          severity: 'O\'rta xavf',
          depth: 'Ko\'rinuvchanlik 30%',
          x: '68%',
          y: '45%',
          w: '130px',
          h: '90px',
          color: 'border-amber-500 bg-amber-500/10 text-amber-700',
        },
      ],
      imgGradient: 'from-slate-900 via-slate-800 to-teal-950/40',
      roadSvgType: 'pothole',
    },
    {
      id: 1,
      title: 'Samarqand, Registon chorrahasi',
      sub: 'Nosoz svetofor va piyodalar xavfi',
      time: '18:45:02',
      hazards: [
        {
          label: 'Svetofor qizil chirog\'i o\'chgan',
          confidence: '99.1%',
          severity: 'Kritik xavf',
          depth: 'Qizil faza ishlamayapti',
          x: '48%',
          y: '22%',
          w: '160px',
          h: '120px',
          color: 'border-rose-500 bg-rose-500/10 text-rose-600',
        },
        {
          label: 'Piyodalar o\'tish joyi to\'silgan',
          confidence: '96.8%',
          severity: 'O\'rta xavf',
          depth: 'Ko\'rish masofasi cheklangan',
          x: '20%',
          y: '62%',
          w: '190px',
          h: '100px',
          color: 'border-amber-500 bg-amber-500/10 text-amber-700',
        },
      ],
      imgGradient: 'from-slate-900 via-gray-800 to-slate-900',
      roadSvgType: 'traffic',
    },
    {
      id: 2,
      title: 'Farg\'ona halqa yo\'li (Tungi rejim)',
      sub: 'Yoritilmagan to\'siq va yo\'l nosozligi',
      time: '22:11:40',
      hazards: [
        {
          label: 'Yo\'l chetidagi xavfli to\'siq',
          confidence: '97.6%',
          severity: 'Yuqori xavf',
          depth: 'Yoritish 0 lux',
          x: '28%',
          y: '50%',
          w: '200px',
          h: '130px',
          color: 'border-orange-500 bg-orange-500/10 text-orange-600',
        },
      ],
      imgGradient: 'from-black via-slate-900 to-teal-950',
      roadSvgType: 'obstacle',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setScanPulse((p) => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const cur = scenarios[activeScenario];

  return (
    <div className="bg-white rounded-3xl border border-gray-200/90 p-6 md:p-8 shadow-xl shadow-gray-100/80 overflow-hidden relative">
      {/* Top Bar with Status and Scenario Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16C79A] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16C79A]"></span>
            </span>
            <span className="text-[11px] font-bold text-[#16C79A] uppercase tracking-wider">
              ● Jonli Kompyuter Ko&apos;rishi (Computer Vision AI)
            </span>
          </div>
          <h3 className="text-2xl font-black text-[#111827] tracking-tight">
            Sun&apos;iy Intellekt Infratuzilma Skaneri
          </h3>
          <p className="text-gray-500 text-xs mt-0.5">
            Yo&apos;l kameralari va fuqarolar fotosuratlaridan nuqsonlarni avtomatlashtirilgan aniqlash
          </p>
        </div>

        {/* Scenarios Tabs in iCORP pill style */}
        <div className="flex flex-wrap items-center gap-2 bg-gray-100 p-1.5 rounded-full border border-gray-200">
          {scenarios.map((scen, idx) => (
            <button
              key={scen.id}
              onClick={() => setActiveScenario(idx)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeScenario === idx
                  ? 'bg-[#16C79A] text-white shadow-md shadow-teal-500/20'
                  : 'text-gray-600 hover:text-[#111827]'
              }`}
            >
              {scen.id === 0 && '📍 Toshkent'}
              {scen.id === 1 && '📍 Samarqand'}
              {scen.id === 2 && '📍 Farg\'ona'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Scanner Viewport */}
      <div className="grid lg:grid-cols-12 gap-6 items-center">
        {/* Visual Camera Feed Display */}
        <div className="lg:col-span-8">
          <div
            className={`relative w-full h-72 sm:h-96 rounded-2xl bg-gradient-to-br ${cur.imgGradient} overflow-hidden border border-gray-800 shadow-inner flex flex-col justify-between p-4`}
          >
            {/* Tech HUD Top Overlay */}
            <div className="flex items-center justify-between z-20 text-[11px] font-mono text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#16C79A] animate-pulse"></span>
                <span className="font-bold text-[#16C79A]">REC [AI-STREAM]</span>
                <span className="text-gray-300">| {cur.title}</span>
              </div>
              <div>{cur.time} • 60 FPS</div>
            </div>

            {/* Road graphic simulation */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
              <div className="w-full h-full relative">
                {/* Road Perspective Lines */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-32 h-full border-x-2 border-dashed border-white/20"></div>
              </div>
            </div>

            {/* Glowing Laser Scan Beam in iCORP Teal */}
            <div
              className="absolute left-0 right-0 h-1 bg-[#16C79A] shadow-[0_0_20px_#16C79A] pointer-events-none z-10 transition-all duration-75"
              style={{
                top: `${scanPulse}%`,
              }}
            />

            {/* Detected Hazard Bounding Boxes */}
            {cur.hazards.map((h, i) => (
              <div
                key={i}
                style={{
                  top: h.y,
                  left: h.x,
                  width: h.w,
                  height: h.h,
                }}
                className={`absolute rounded-xl border-2 ${h.color} backdrop-blur-[2px] p-2 flex flex-col justify-between z-20 animate-pulse transition-all`}
              >
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="bg-black/80 px-1.5 py-0.5 rounded text-white">{h.label}</span>
                  <span className="bg-[#16C79A] text-white px-1.5 py-0.5 rounded">{h.confidence}</span>
                </div>
                <div className="text-[9px] font-mono bg-black/70 text-gray-200 px-1.5 py-0.5 rounded self-start">
                  {h.depth}
                </div>
              </div>
            ))}

            {/* Tech HUD Bottom Overlay */}
            <div className="flex items-center justify-between z-20 text-[10px] font-mono text-gray-400 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <div>MODEL: YOLOV9-SAFETY-UZ</div>
              <div className="text-[#16C79A] font-bold">DETECTIONS: {cur.hazards.length} TA OB&apos;YEKT</div>
            </div>
          </div>
        </div>

        {/* Telemetry and Action Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
              Joriy Skaner Telemetriyasi
            </h4>
            <div className="text-base font-bold text-[#111827] mb-1">{cur.title}</div>
            <p className="text-xs text-gray-600 mb-4">{cur.sub}</p>

            <div className="space-y-3 text-xs">
              {cur.hazards.map((hazard, idx) => (
                <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#111827]">{hazard.label}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-[#0E9F79] border border-teal-200">
                      {hazard.confidence}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>Xavf darajasi:</span>
                    <span className="font-semibold text-rose-600">{hazard.severity}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-500">
                    <span>O&apos;lcham:</span>
                    <span className="font-mono">{hazard.depth}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => alert(`Yo'l xo'jaligi inspeksiyasiga zudlik bilan yo'naltirildi: ${cur.title}`)}
              className="w-full mt-4 bg-[#16C79A] hover:bg-[#12a37d] text-white py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-teal-500/20 active:scale-95"
            >
              Mas&apos;ullarga yo&apos;naltirish →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

export default function AiVisionDemo() {
  const [activeScenario, setActiveScenario] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(true);
  const [scanPulse, setScanPulse] = useState<number>(0);

  const scenarios = [
    {
      id: 0,
      title: 'Toshkent, Amir Temur ko\'chasi',
      sub: 'Yo\'l qoplamasidagi jiddiy chuqurcha',
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
          color: 'border-red-500 bg-red-500/20 text-red-300',
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
          color: 'border-amber-500 bg-amber-500/20 text-amber-300',
        },
      ],
      imgGradient: 'from-slate-900 via-indigo-950/60 to-purple-950/40',
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
          color: 'border-rose-500 bg-rose-500/20 text-rose-300',
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
          color: 'border-yellow-500 bg-yellow-500/20 text-yellow-300',
        },
      ],
      imgGradient: 'from-slate-900 via-purple-950/60 to-pink-950/40',
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
          color: 'border-orange-500 bg-orange-500/20 text-orange-300',
        },
      ],
      imgGradient: 'from-black via-slate-950 to-blue-950/40',
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
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl overflow-hidden relative">
      {/* Top Bar with Status and Scenario Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Jonli AI Kompyuter Ko'rishi (Computer Vision)
            </span>
          </div>
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Sun'iy Intellekt Infratuzilma Skaneri
          </h3>
          <p className="text-slate-400 text-xs mt-0.5">
            Real vaqtda yo'l videokameralari va dron tasvirlaridan nuqsonlarni avtomatik aniqlash
          </p>
        </div>

        {/* Scenarios Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-white/5">
          {scenarios.map((scen, idx) => (
            <button
              key={scen.id}
              onClick={() => setActiveScenario(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeScenario === idx
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Ssenariy {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Vision Screen */}
      <div className="relative rounded-2xl overflow-hidden border border-purple-500/30 bg-slate-950 h-[380px] sm:h-[420px] shadow-inner">
        {/* Synthetic Road Background Art */}
        <div className={`absolute inset-0 bg-gradient-to-b ${cur.imgGradient} flex items-center justify-center`}>
          {/* Road Visual Graphics */}
          <div className="absolute inset-0 opacity-40">
            {/* Road Perspective Lines */}
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="gridGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {/* Perspective grid lines */}
              <line x1="50%" y1="35%" x2="10%" y2="100%" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 6" opacity="0.6" />
              <line x1="50%" y1="35%" x2="90%" y2="100%" stroke="#a855f7" strokeWidth="2" strokeDasharray="6 6" opacity="0.6" />
              <line x1="50%" y1="35%" x2="50%" y2="100%" stroke="#ffffff" strokeWidth="3" strokeDasharray="14 12" opacity="0.7" />
              
              {/* Horizon line */}
              <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#6366f1" strokeWidth="1" opacity="0.4" />
            </svg>
          </div>

          {/* Road Scene Icons / Simulating Road Defect */}
          <div className="absolute top-[52%] left-[42%] text-6xl opacity-80 filter drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            🕳️
          </div>
          {cur.roadSvgType === 'traffic' && (
            <div className="absolute top-[26%] left-[51%] text-5xl opacity-85 filter drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]">
              🚦
            </div>
          )}
          {cur.roadSvgType === 'obstacle' && (
            <div className="absolute top-[54%] left-[32%] text-5xl opacity-85 filter drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]">
              🚧
            </div>
          )}
        </div>

        {/* Laser Scanning Line */}
        {isScanning && (
          <div
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent shadow-[0_0_20px_#a855f7] z-20 pointer-events-none transition-all duration-75"
            style={{ top: `${(scanPulse * 4) % 100}%` }}
          >
            <div className="w-full text-center -mt-3 text-[10px] font-mono tracking-widest text-purple-300 opacity-80">
              SCANNING INFRASTRUCTURE MATRIX...
            </div>
          </div>
        )}

        {/* Live HUD Overlay Elements */}
        <div className="absolute top-4 left-4 z-20 flex flex-col gap-1 font-mono text-[11px] text-purple-300/90 bg-slate-950/70 p-3 rounded-xl border border-white/10 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-white font-bold">MODEL: YOLO-v11 RoadGov-Uz</span>
          </div>
          <div>JOY: {cur.title}</div>
          <div>FPS: 59.8 | PING: 11ms | RESOLUTION: 4K UHD</div>
          <div>SENSOR: Optical + LiDAR Fusion</div>
        </div>

        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => setIsScanning(!isScanning)}
            className="bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-semibold px-3 py-1.5 rounded-xl backdrop-blur-md transition-all border border-purple-400/30"
          >
            {isScanning ? '⏸️ To\'xtatish' : '▶️ Skanerlash'}
          </button>
        </div>

        {/* Bounding Boxes for Hazards */}
        {cur.hazards.map((h, i) => (
          <div
            key={i}
            className={`absolute z-20 rounded-xl border-2 p-2.5 backdrop-blur-sm transition-all duration-500 animate-in zoom-in-95 ${h.color}`}
            style={{
              left: h.x,
              top: h.y,
              minWidth: h.w,
            }}
          >
            {/* Corner Markers */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-white" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-white" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-white" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-white" />

            <div className="flex items-center justify-between gap-2 text-[11px] font-extrabold mb-1">
              <span>{h.label}</span>
              <span className="bg-black/60 px-1.5 py-0.5 rounded text-[10px] text-white">
                {h.confidence}
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] text-white/90">
              <span>{h.severity}</span>
              <span className="font-mono">{h.depth}</span>
            </div>
          </div>
        ))}

        {/* Bottom Status Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="text-purple-400 font-bold">Aniqlangan holat:</span>
            <span>{cur.sub}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
            <span>Vaqt: {cur.time}</span>
            <span className="text-emerald-400 font-bold">Avtomatik bayonnoma tuzildi ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

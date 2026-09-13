'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const features = [
    {
      title: 'Real-time AI Detection',
      desc: 'Automatic visual recognition for road infrastructure damage, potholes, and hazards.',
      icon: '🧠',
    },
    {
      title: 'Interactive Live Map',
      desc: 'Geospatial clustering and status tracking across all urban road networks.',
      icon: '🗺️',
    },
    {
      title: 'Crowdsourced Telemetry',
      desc: 'Community-driven hazard submission with image verification and status tracking.',
      icon: '🚀',
    },
    {
      title: 'Analytical Dashboard',
      desc: 'Regional resolution metrics and performance analytics for municipal authorities.',
      icon: '📊',
    },
  ];

  return (
    <main className="min-h-screen bg-[#090D16] text-slate-100 relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      {/* Ambient Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/15 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-[600px] -right-[200px] w-[600px] h-[600px] bg-pink-600/10 blur-[180px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[400px] bg-rose-600/10 blur-[160px] pointer-events-none rounded-full" />

      {/* Sticky Glassmorphism Header */}
      <nav className="bg-[#090D16]/70 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/20">
                <span className="text-2xl">🗺️</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                Road Safety <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 text-sm font-semibold text-slate-300">
                <Link href="/" className="text-purple-400">Home</Link>
                <Link href="/map" className="hover:text-purple-400 transition-colors">Map</Link>
                <Link href="/statistics" className="hover:text-purple-400 transition-colors">Statistics</Link>
                <Link href="/about" className="hover:text-purple-400 transition-colors">About</Link>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-colors"
            >
              <span className="text-lg">{mobileMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-6 border-t border-white/10 animate-in slide-in-from-top duration-200">
              <div className="flex flex-col gap-4 text-base font-medium">
                <Link href="/" className="text-purple-400">Home</Link>
                <Link href="/map" className="hover:text-purple-400 transition-colors">Map</Link>
                <Link href="/statistics" className="hover:text-purple-400 transition-colors">Statistics</Link>
                <Link href="/about" className="hover:text-purple-400 transition-colors">About</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-semibold uppercase tracking-wider mb-8">
          ✨ Next-Generation Safety Monitoring
        </div>
        
        {/* Bold Title with Gradient */}
        <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
          AI-Powered Infrastructure <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">Intelligence</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Detect road anomalies, monitor safety hazardous points, and resolve infrastructure issues with real-time AI geospatial analytics.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/map"
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-500 to-rose-400 hover:from-purple-500 hover:via-pink-400 hover:to-rose-300 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-purple-500/25 active:scale-95 text-base"
          >
            Explore Interactive Map →
          </Link>
          <Link
            href="/statistics"
            className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-semibold transition-all border border-white/10 text-base"
          >
            View Analytics
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="p-8 rounded-3xl bg-slate-900/40 border border-white/10 backdrop-blur-xl hover:border-purple-500/30 transition-all hover:-translate-y-1 group hover:shadow-lg hover:shadow-purple-500/20"
            >
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl mb-6 border border-white/5 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/40 hover:scale-110 active:scale-95 transition-all ring-2 ring-white/20"
        >
          <span className="text-2xl">💬</span>
        </a>
      </div>
    </main>
  );
}
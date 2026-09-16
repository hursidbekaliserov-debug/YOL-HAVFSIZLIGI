'use client';

import { useState } from 'react';
import Link from 'next/link';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SosModal from '../../components/SosModal';

export default function AboutPage() {
  const [isSosOpen, setIsSosOpen] = useState(false);

  const team = [
    { name: 'AI Research Team', role: 'Computer Vision & ML', icon: '🧠' },
    { name: 'Urban Planning', role: 'Infrastructure Analysis', icon: '🏙️' },
    { name: 'Data Science', role: 'Geospatial Analytics', icon: '📊' },
    { name: 'Community', role: 'User Experience', icon: '👥' },
  ];

  const values = [
    { title: 'Innovation', desc: 'Cutting-edge AI technology for road safety', icon: '🚀' },
    { title: 'Community', desc: 'Crowdsourced data collection and validation', icon: '🤝' },
    { title: 'Transparency', desc: 'Open data and real-time problem tracking', icon: '🔍' },
    { title: 'Impact', desc: 'Measurable improvements in urban infrastructure', icon: '💡' },
  ];

  return (
    <main className="min-h-screen bg-[#090D16] text-slate-100 relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[600px] -right-[100px] w-[500px] h-[500px] bg-pink-600/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Universal Navbar */}
      <Navbar onOpenSos={() => setIsSosOpen(true)} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-xs font-semibold uppercase tracking-wider mb-8">
            ✨ About Our Mission
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
            Transforming Urban <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400">Infrastructure</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            We're revolutionizing road safety through AI-powered detection, crowdsourced data, and real-time analytics to create smarter, safer cities.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12 mb-16 shadow-2xl shadow-black/40">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 tracking-tight">Our Mission</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Road Safety AI was founded with a simple yet powerful vision: to leverage artificial intelligence and community engagement to identify and resolve road infrastructure problems before they cause accidents.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Our platform combines cutting-edge computer vision, geospatial analytics, and crowdsourced reporting to create a comprehensive ecosystem for urban safety monitoring. By empowering citizens and providing municipalities with actionable insights, we're making cities safer, one road at a time.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-500/20">
                <div className="text-6xl mb-4">🎯</div>
                <div className="text-2xl font-bold text-white mb-2">10K+</div>
                <div className="text-slate-400">Issues Resolved</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight text-center">Our Expertise</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl hover:border-purple-500/30 transition-all hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-white/5 group-hover:scale-110 transition-transform">
                  {member.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{member.name}</h3>
                <p className="text-slate-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 tracking-tight text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-xl hover:border-purple-500/30 transition-all hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">{value.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-3xl border border-purple-500/20 p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Join Our Mission</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Together, we can create safer roads and smarter cities. Join our community of innovators, urban planners, and safety advocates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-xl shadow-purple-500/25 active:scale-95"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/998901234567"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-tr from-purple-600 via-pink-500 to-rose-400 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/40 hover:scale-110 active:scale-95 transition-all ring-2 ring-white/20"
        >
          <span className="text-2xl">💬</span>
        </a>
      </div>

      {/* Universal Footer */}
      <Footer />

      {/* SOS Modal */}
      <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
    </main>
  );
}
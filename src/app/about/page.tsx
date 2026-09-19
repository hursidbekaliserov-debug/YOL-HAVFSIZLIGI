'use client';

import { useState } from 'react';
import Link from 'next/link';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SosModal from '../../components/SosModal';

export default function AboutPage() {
  const [isSosOpen, setIsSosOpen] = useState(false);

  const team = [
    { name: 'AI & Kompyuter Ko\'rishi', role: 'Computer Vision & Deep Learning', icon: '🧠' },
    { name: 'Shahar Infratuzilmasi', role: 'Urban GIS & Traffic Engineering', icon: '🏙️' },
    { name: 'Geofazoviy Tahlil', role: 'Spatial Analytics & Big Data', icon: '📊' },
    { name: 'Jamoatchilik Nazorati', role: 'Civic Engagement & UX', icon: '👥' },
  ];

  const values = [
    { title: 'Innovatsiya', desc: 'Yo\'l xavfsizligida ilg\'or AI neyron tarmoqlari va kompyuter ko\'rishi.', icon: '🚀' },
    { title: 'Jamoatchilik', desc: 'Fuqarolar orqali ochiq ma\'lumotlar to\'plash va tezkor monitoring.', icon: '🤝' },
    { title: 'Shaffoflik', desc: 'Har bir muammoning ochiq yechimi va holatini real vaqtda kuzatish.', icon: '🔍' },
    { title: 'Natija va Ta\'sir', desc: 'O\'zbekiston yo\'llarida avariyalarni oldini olish va infratuzilmani yangilash.', icon: '💡' },
  ];

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#1A1D20] font-sans selection:bg-[#16C79A] selection:text-white relative">
      {/* Universal Sticky Navbar */}
      <Navbar onOpenSos={() => setIsSosOpen(true)} />

      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-b from-white to-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#16C79A] animate-pulse"></span>
            <span>● BIZNING MISSIYAMIZ VA MAQSADIMIZ</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[#111827] tracking-tight leading-[1.12] max-w-4xl mx-auto mb-6">
            O&apos;zbekiston Yo&apos;llarini <span className="text-[#16C79A]">Sun&apos;iy Intellekt Bilan</span> Yangilash
          </h1>
          <p className="text-gray-600 text-base sm:text-xl max-w-3xl mx-auto mb-6 leading-relaxed">
            Biz sun&apos;iy intellekt, fuqarolik nazorati va zamonaviy tahliliy vositalar orqali yo&apos;l infratuzilmasi muammolarini erta aniqlash va bartaraf etishning milliy ekotizimini barpo etmoqdamiz.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Mission Section */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-8 md:p-12 mb-16 shadow-xl shadow-gray-200/50">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#0E9F79] mb-2">
                ● RIVOJLANISH STRATEGIYASI
              </div>
              <h2 className="text-3xl font-black text-[#111827] mb-6 tracking-tight">
                Bizning Missiyamiz
              </h2>
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                Road Safety AI ekotizimi O&apos;zbekiston Respublikasida yo&apos;l-transport hodisalarini kamaytirish, xavfli nuqsonlarni avtomatik aniqlash va mas&apos;ul idoralarga zudlik bilan yo&apos;naltirish uchun ishlab chiqilgan.
              </p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Ilg&apos;or kompyuter ko&apos;rishi algoritmlari orqali fotosuratlar va videokuzatuv oqimlari real vaqtda qayta ishlanib, geolokatsiyali ochiq ma&apos;lumotlar bazasiga kiritiladi.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-3xl font-black text-[#16C79A] mb-1">14,800+</div>
                <div className="text-xs font-bold text-gray-500 uppercase">Hal etilgan nuqsonlar</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-3xl font-black text-[#111827] mb-1">98.4%</div>
                <div className="text-xs font-bold text-gray-500 uppercase">AI Aniqligi</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                <div className="text-4xl mb-2">📍</div>
                <div className="text-3xl font-black text-[#111827] mb-1">14 ta</div>
                <div className="text-xs font-bold text-gray-500 uppercase">Hududlar qamrovi</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 text-center">
                <div className="text-4xl mb-2">👥</div>
                <div className="text-3xl font-black text-[#16C79A] mb-1">24/7</div>
                <div className="text-xs font-bold text-gray-500 uppercase">Doimiy nazorat</div>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-2">
              ● JAMOAMIZ VA MUTAXASSISLAR
            </div>
            <h2 className="text-3xl font-black text-[#111827] tracking-tight">Yo&apos;nalishlar va Ekspertiza</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-md hover:shadow-xl hover:border-[#16C79A] transition-all hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-gray-200 group-hover:scale-110 transition-transform">
                  {member.icon}
                </div>
                <h3 className="text-base font-bold text-[#111827] mb-1 tracking-tight">{member.name}</h3>
                <p className="text-gray-500 text-xs">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-2">
              ● TAMOYILLARIMIZ
            </div>
            <h2 className="text-3xl font-black text-[#111827] tracking-tight">Bizning Qadriyatlarimiz</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-md hover:shadow-xl hover:border-[#16C79A] transition-all hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center text-3xl mb-4 border border-teal-200 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-base font-bold text-[#111827] mb-2 tracking-tight">{value.title}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate CTA Banner */}
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-[#0E9F79] via-[#16C79A] to-[#00B090] text-white text-center shadow-xl shadow-teal-500/20">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
            Ekotizimimizga Qo&apos;shiling
          </h2>
          <p className="text-teal-50 mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Biz bilan hamkorlik qiling va O&apos;zbekiston yo&apos;llarini birgalikda xavfsizroq va qulayroq qilaylik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/map"
              className="bg-white text-[#0E9F79] hover:bg-gray-100 px-8 py-3.5 rounded-full font-bold transition-all shadow-lg active:scale-95 text-xs uppercase tracking-wider"
            >
              Interaktiv Xarita →
            </Link>
            <a
              href="tel:102"
              className="bg-transparent hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-bold transition-all border-2 border-white text-xs uppercase tracking-wider"
            >
              📞 102 / Qaynoq Liniya
            </a>
          </div>
        </div>
      </div>

      {/* Universal Footer */}
      <Footer />

      {/* SOS Modal */}
      <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
    </main>
  );
}
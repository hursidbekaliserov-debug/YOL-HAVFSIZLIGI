'use client';

import { useState } from 'react';
import Link from 'next/link';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SosModal from '../../components/SosModal';

export default function StatisticsPage() {
  const [isSosOpen, setIsSosOpen] = useState(false);

  const statistics = [
    { title: 'Jami Qayd Etilgan', value: '14,820+', change: '+12%', icon: '📊' },
    { title: 'To\'liq Bartaraf Etildi', value: '12,450', change: '+18%', icon: '✅' },
    { title: 'Jarayondagi Murojaatlar', value: '2,370', change: '-5%', icon: '⚠️' },
    { title: 'Faol Fuqarolar', value: '48,920', change: '+24%', icon: '👥' },
  ];

  const districtData = [
    { name: 'Toshkent shahri', total: 4245, solved: 3890, inProgress: 355 },
    { name: 'Samarqand viloyati', total: 2890, solved: 2420, inProgress: 470 },
    { name: 'Farg\'ona vodiysi', total: 3167, solved: 2710, inProgress: 457 },
    { name: 'Buxoro viloyati', total: 1934, solved: 1650, inProgress: 284 },
  ];

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-[#1A1D20] font-sans selection:bg-[#16C79A] selection:text-white relative">
      {/* Universal Sticky Navbar */}
      <Navbar onOpenSos={() => setIsSosOpen(true)} />

      {/* Header Section */}
      <section className="pt-16 pb-16 bg-gradient-to-b from-white to-[#F8F9FA] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#16C79A] animate-pulse"></span>
            <span>● MILLIY MONITORING VA TAHLIL</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-[#111827] tracking-tight leading-[1.15] max-w-4xl mx-auto mb-4">
            AI Tahliliy <span className="text-[#16C79A]">Dashboard va Indeks</span>
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Respublika bo&apos;ylab yo&apos;l infratuzilmasi sifati, ta&apos;mirlash dinamikasi va real vaqtdagi statistik hisobotlar.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        {/* Overview Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white border border-gray-200/90 shadow-md hover:shadow-xl hover:border-[#16C79A] transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl group-hover:scale-110 transition-transform">{stat.icon}</span>
                <span className="text-xs font-bold text-[#0E9F79] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-black text-[#111827] tracking-tight mb-1 group-hover:text-[#16C79A] transition-colors">
                {stat.value}
              </div>
              <div className="text-gray-500 text-xs uppercase font-bold tracking-wider">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* District Statistics */}
        <div className="bg-white rounded-3xl border border-gray-200/90 p-6 md:p-8 mb-10 shadow-xl shadow-gray-200/50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200 mb-8">
            <div>
              <h2 className="text-2xl font-black text-[#111827] tracking-tight">Hududiy Ko&apos;rsatkichlar</h2>
              <p className="text-gray-500 text-xs mt-0.5">Viloyatlar va shaharlar bo&apos;yicha bartaraf etish darajasi</p>
            </div>
            <Link
              href="/map"
              className="bg-[#16C79A] hover:bg-[#12a37d] text-white px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-teal-500/20 active:scale-95 self-start sm:self-auto"
            >
              Xaritada ko&apos;rish →
            </Link>
          </div>

          <div className="grid gap-6">
            {districtData.map((district, index) => (
              <div
                key={index}
                className="bg-gray-50/80 hover:bg-gray-100/80 p-6 rounded-2xl border border-gray-200 transition-all"
              >
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 bg-[#16C79A] text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-sm">
                      0{index + 1}
                    </span>
                    <span className="font-bold text-[#111827] text-lg tracking-tight">{district.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#111827] tracking-tight">{district.total}</span>
                    <span className="text-gray-500 text-xs block font-bold uppercase tracking-wider">Jami murojaatlar</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-gray-600">Bartaraf etilgan</span>
                      <span className="text-[#0E9F79] font-black">{district.solved}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-[#16C79A] h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${(district.solved / district.total) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-gray-200 shadow-sm">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-gray-600">Jarayonda</span>
                      <span className="text-amber-600 font-black">{district.inProgress}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-2.5 rounded-full transition-all duration-700"
                        style={{ width: `${(district.inProgress / district.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Charts Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Trends */}
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 md:p-8 shadow-xl shadow-gray-200/40">
            <h3 className="text-xl font-black text-[#111827] mb-1 tracking-tight">Oylik Ta&apos;mirlash Dinamikasi</h3>
            <p className="text-gray-500 text-xs mb-6">Murojaatlarning oylar kesimidagi ijobiy yechimi</p>

            <div className="space-y-5">
              {[
                { month: 'Yanvar', solved: 450, total: 520 },
                { month: 'Fevral', solved: 620, total: 710 },
                { month: 'Mart', solved: 880, total: 950 },
                { month: 'Aprel', solved: 1150, total: 1210 },
              ].map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-20 text-gray-700 text-xs font-bold">{data.month}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-[#16C79A] h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(data.solved / data.total) * 100}%` }}
                    />
                  </div>
                  <div className="text-[#111827] text-xs font-mono font-bold w-20 text-right">
                    {data.solved}/{data.total}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 md:p-8 shadow-xl shadow-gray-200/40">
            <h3 className="text-xl font-black text-[#111827] mb-1 tracking-tight">Nuqson Turlari Bo&apos;yicha Taqsimot</h3>
            <p className="text-gray-500 text-xs mb-6">Eng ko&apos;p qayd etiladigan yo&apos;l muammolari</p>

            <div className="space-y-4">
              {[
                { type: 'Yo\'l qoplamasidagi chuqurliklar', count: 5420, percentage: 38 },
                { type: 'Nosoz svetoforlar va datchiklar', count: 3120, percentage: 22 },
                { type: 'O\'chgan piyodalar chiziqlari', count: 2840, percentage: 20 },
                { type: 'Yoritgichlar va tunda ko\'rinuvchanlik', count: 1980, percentage: 14 },
                { type: 'Boshqa xavfli to\'siqlar', count: 860, percentage: 6 },
              ].map((data, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs font-bold mb-1.5">
                    <span className="text-gray-800">{data.type}</span>
                    <span className="text-[#111827] font-black">{data.count} <span className="text-[#16C79A] font-bold">({data.percentage}%)</span></span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-[#16C79A] h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
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
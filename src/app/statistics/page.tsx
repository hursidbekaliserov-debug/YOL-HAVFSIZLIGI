'use client';

import { useState } from 'react';
import Link from 'next/link';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SosModal from '../../components/SosModal';

export default function StatisticsPage() {
  const [isSosOpen, setIsSosOpen] = useState(false);

  const statistics = [
    { title: 'Total Issues', value: '1,234', change: '+12%', icon: '📊' },
    { title: 'Issues Resolved', value: '856', change: '+8%', icon: '✅' },
    { title: 'In Progress', value: '378', change: '+5%', icon: '⚠️' },
    { title: 'Active Users', value: '5,432', change: '+15%', icon: '👥' },
  ];

  const districtData = [
    { name: 'Tashkent', total: 245, solved: 198, inProgress: 47, color: 'from-purple-500 to-pink-500' },
    { name: 'Samarkand', total: 189, solved: 142, inProgress: 47, color: 'from-blue-500 to-cyan-400' },
    { name: 'Fergana', total: 167, solved: 121, inProgress: 46, color: 'from-indigo-500 to-purple-500' },
    { name: 'Bukhara', total: 134, solved: 98, inProgress: 36, color: 'from-pink-500 to-rose-400' },
  ];

  return (
    <main className="min-h-screen bg-[#090D16] text-slate-100 relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[500px] -right-[100px] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Universal Navbar */}
      <Navbar onOpenSos={() => setIsSosOpen(true)} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Analytical Engine
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
            AI Analytics Dashboard
          </h1>
          <p className="text-slate-400 text-base max-w-xl">
            Real-time metrics, performance insights and regional infrastructure telemetry.
          </p>
        </div>

        {/* Overview Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {statistics.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-900/40 border border-white/10 backdrop-blur-md hover:border-purple-500/30 transition-all hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl group-hover:scale-110 transition-transform">{stat.icon}</span>
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-extrabold text-white tracking-tight mb-1">{stat.value}</div>
              <div className="text-slate-400 text-xs uppercase font-medium tracking-wider">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* District Statistics */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 mb-10 shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">District Performance</h2>
              <p className="text-slate-400 text-sm mt-0.5">Problem resolution metrics split by region</p>
            </div>
          </div>

          <div className="grid gap-6">
            {districtData.map((district, index) => (
              <div
                key={index}
                className="bg-white/[0.02] hover:bg-white/[0.04] p-6 rounded-2xl border border-white/5 transition-all"
              >
                <div className="flex justify-between items-center mb-5">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shadow-purple-500/20">
                      0{index + 1}
                    </span>
                    <span className="font-bold text-white text-lg tracking-tight">{district.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-white tracking-tight">{district.total}</span>
                    <span className="text-slate-400 text-xs block font-medium uppercase tracking-wider">Total Issues</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/5">
                    <div className="flex justify-between text-xs font-medium mb-2">
                      <span className="text-slate-400">Resolved</span>
                      <span className="text-emerald-400 font-bold">{district.solved}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-700"
                        style={{ width: `${(district.solved / district.total) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/5">
                    <div className="flex justify-between text-xs font-medium mb-2">
                      <span className="text-slate-400">In Progress</span>
                      <span className="text-amber-400 font-bold">{district.inProgress}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-700"
                        style={{ width: `${(district.inProgress / district.total) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Overall Progress */}
                <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/5">
                  <div
                    className={`bg-gradient-to-r ${district.color} h-1.5 rounded-full transition-all duration-700`}
                    style={{ width: `${(district.solved / district.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Charts Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Trends */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Resolution Trends</h3>
            <p className="text-slate-400 text-xs mb-6">Monthly resolution capacity progress</p>

            <div className="space-y-5">
              {[
                { month: 'January', solved: 45, total: 60 },
                { month: 'February', solved: 52, total: 70 },
                { month: 'March', solved: 68, total: 85 },
                { month: 'April', solved: 75, total: 90 },
              ].map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-20 text-slate-400 text-xs font-medium">{data.month}</div>
                  <div className="flex-1 bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(data.solved / data.total) * 100}%` }}
                    />
                  </div>
                  <div className="text-white text-xs font-bold w-12 text-right">
                    {data.solved}/{data.total}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8">
            <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Issue Categories</h3>
            <p className="text-slate-400 text-xs mb-6">Percentage breakdown of detected issues</p>

            <div className="space-y-5">
              {[
                { type: 'Potholes', count: 423, percentage: 34 },
                { type: 'Traffic Lights', count: 312, percentage: 25 },
                { type: 'Road Signs', count: 245, percentage: 20 },
                { type: 'Pedestrian Crossings', count: 198, percentage: 16 },
                { type: 'Other', count: 56, percentage: 5 },
              ].map((data, index) => (
                <div key={index}>
                  <div className="flex justify-between text-xs font-medium mb-1.5">
                    <span className="text-slate-300">{data.type}</span>
                    <span className="text-white font-bold">{data.count} <span className="text-slate-500 text-[10px]">({data.percentage}%)</span></span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${data.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button (WhatsApp) */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href="https://wa.me/998901234567"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all ring-2 ring-white/20"
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
'use client';

import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SosModal({ isOpen, onClose }: SosModalProps) {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const { language, t } = useLanguage();

  if (!isOpen) return null;

  const emergencyContacts = {
    uz: [
      {
        title: 'Yo\'l-patrul xizmati (YHXBB)',
        number: '102',
        desc: 'Yo\'l-transport hodisalari va xavfli qoidabuzarliklar',
        icon: '👮‍♂️',
        color: 'from-blue-600 to-indigo-600',
      },
      {
        title: 'Tez tibbiy yordam',
        number: '103',
        desc: 'Jarohatlanganlarga shoshilinch tibbiy yordam ko\'rsatish',
        icon: '🚑',
        color: 'from-rose-600 to-red-600',
      },
      {
        title: 'Favqulodda vaziyatlar (FVV)',
        number: '101',
        desc: 'Yong\'in, bloklanish va qutqaruv operatsiyalari',
        icon: '🚒',
        color: 'from-amber-600 to-orange-600',
      },
      {
        title: 'Respublika Avto-Evakuator',
        number: '+998 71 200 00 00',
        desc: 'Nosoz transport vositasini xavfsiz evakuatsiya qilish',
        icon: '🚛',
        color: 'from-purple-600 to-pink-600',
      },
      {
        title: 'Yo\'l xo\'jaligi ishonch telefoni',
        number: '1299',
        desc: 'Xavfli chuqurchalar, to\'siqlar va yo\'l o\'pirilishlari',
        icon: '🚧',
        color: 'from-teal-600 to-emerald-600',
      },
    ],
    ru: [
      {
        title: 'Дорожно-патрульная служба (УБДД)',
        number: '102',
        desc: 'Дорожно-транспортные происшествия и опасные нарушения',
        icon: '👮‍♂️',
        color: 'from-blue-600 to-indigo-600',
      },
      {
        title: 'Скорая медицинская помощь',
        number: '103',
        desc: 'Экстренная медицинская помощь пострадавшим',
        icon: '🚑',
        color: 'from-rose-600 to-red-600',
      },
      {
        title: 'Служба спасения (МЧС)',
        number: '101',
        desc: 'Пожары, блокировка движения и спасательные работы',
        icon: '🚒',
        color: 'from-amber-600 to-orange-600',
      },
      {
        title: 'Республиканский Авто-Эвакуатор',
        number: '+998 71 200 00 00',
        desc: 'Безопасная эвакуация неисправного транспорта',
        icon: '🚛',
        color: 'from-purple-600 to-pink-600',
      },
      {
        title: 'Горячая линия дорожного хозяйства',
        number: '1299',
        desc: 'Опасные ямы, препятствия и повреждения полотна',
        icon: '🚧',
        color: 'from-teal-600 to-emerald-600',
      },
    ],
    en: [
      {
        title: 'Traffic Patrol Police',
        number: '102',
        desc: 'Road accidents and high-risk traffic violations',
        icon: '👮‍♂️',
        color: 'from-blue-600 to-indigo-600',
      },
      {
        title: 'Ambulance & Emergency Care',
        number: '103',
        desc: 'Urgent medical assistance for the injured',
        icon: '🚑',
        color: 'from-rose-600 to-red-600',
      },
      {
        title: 'Emergency Situations (Rescue)',
        number: '101',
        desc: 'Fire rescue, entrapment and road clearance',
        icon: '🚒',
        color: 'from-amber-600 to-orange-600',
      },
      {
        title: 'National Towing & Evacuation',
        number: '+998 71 200 00 00',
        desc: 'Safe towing service for broken down vehicles',
        icon: '🚛',
        color: 'from-purple-600 to-pink-600',
      },
      {
        title: 'Road Infrastructure Hotline',
        number: '1299',
        desc: 'Hazardous potholes, road collapses and obstacles',
        icon: '🚧',
        color: 'from-teal-600 to-emerald-600',
      },
    ],
  };

  const contacts = emergencyContacts[language] || emergencyContacts.uz;

  const handleCopy = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-[#0B101D] border border-red-500/30 rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl shadow-red-500/10 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px] pointer-events-none rounded-full" />

        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-500/20 border border-red-500/40 rounded-2xl flex items-center justify-center text-2xl animate-pulse">
              🚨
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                {t('sos_title')}
              </h2>
              <p className="text-xs text-slate-400">{t('sos_subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl flex items-center justify-center text-base transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Contacts List */}
        <div className="space-y-3.5 max-h-[55vh] overflow-y-auto pr-1">
          {contacts.map((contact, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-900/70 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-11 h-11 bg-gradient-to-tr ${contact.color} rounded-xl flex items-center justify-center text-xl shadow-md`}
                >
                  {contact.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{contact.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{contact.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${contact.number.replace(/\s+/g, '')}`}
                  className="bg-red-500 hover:bg-red-600 text-white font-extrabold text-xs px-3.5 py-2.5 rounded-xl transition-transform active:scale-95 shadow-md shadow-red-500/20 flex items-center gap-1.5"
                >
                  <span>📞</span>
                  <span>{contact.number}</span>
                </a>
                <button
                  onClick={() => handleCopy(contact.number)}
                  title="Copy"
                  className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-slate-400 hover:text-white text-xs transition-colors"
                >
                  {copiedNumber === contact.number ? '✓' : '📋'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* First Aid Road Tip */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3">
          <span className="text-xl">⚠️</span>
          <div className="text-xs text-amber-200/90 leading-relaxed">
            <span className="font-bold text-amber-300">{t('sos_tip_title')} </span> 
            {t('sos_tip_desc')}
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-semibold text-sm transition-all border border-white/10"
          >
            {t('sos_close')}
          </button>
        </div>
      </div>
    </div>
  );
}

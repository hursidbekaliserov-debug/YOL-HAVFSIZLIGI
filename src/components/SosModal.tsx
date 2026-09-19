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
      },
      {
        title: 'Tez tibbiy yordam',
        number: '103',
        desc: 'Jarohatlanganlarga shoshilinch tibbiy yordam ko\'rsatish',
        icon: '🚑',
      },
      {
        title: 'Favqulodda vaziyatlar (FVV)',
        number: '101',
        desc: 'Yong\'in, bloklanish va qutqaruv operatsiyalari',
        icon: '🚒',
      },
      {
        title: 'Respublika Avto-Evakuator',
        number: '+998 71 200 00 00',
        desc: 'Nosoz transport vositasini xavfsiz evakuatsiya qilish',
        icon: '🚛',
      },
      {
        title: 'Yo\'l xo\'jaligi ishonch telefoni',
        number: '1299',
        desc: 'Xavfli chuqurchalar, to\'siqlar va yo\'l o\'pirilishlari',
        icon: '🚧',
      },
    ],
    ru: [
      {
        title: 'Дорожно-патрульная служба (УБДД)',
        number: '102',
        desc: 'Дорожно-транспортные происшествия и опасные нарушения',
        icon: '👮‍♂️',
      },
      {
        title: 'Скорая медицинская помощь',
        number: '103',
        desc: 'Экстренная медицинская помощь пострадавшим',
        icon: '🚑',
      },
      {
        title: 'Служба спасения (МЧС)',
        number: '101',
        desc: 'Пожары, завалы и спасательные операции на трассах',
        icon: '🚒',
      },
      {
        title: 'Городская служба эвакуации',
        number: '+998 71 200 00 00',
        desc: 'Круглосуточная буксировка и транспортировка авто',
        icon: '🚛',
      },
      {
        title: 'Горячая линия дорожных служб',
        number: '1299',
        desc: 'Опасные ямы, обвалы асфальта и повреждения полотна',
        icon: '🚧',
      },
    ],
    en: [
      {
        title: 'Traffic Police Department',
        number: '102',
        desc: 'Traffic collisions and hazardous driving incidents',
        icon: '👮‍♂️',
      },
      {
        title: 'Emergency Medical Service',
        number: '103',
        desc: 'Urgent medical assistance for injured persons',
        icon: '🚑',
      },
      {
        title: 'Rescue & Fire Service',
        number: '101',
        desc: 'Fire hazards, road blockage, and rescue ops',
        icon: '🚒',
      },
      {
        title: 'National Roadside Assistance',
        number: '+998 71 200 00 00',
        desc: '24/7 towing and vehicle emergency recovery',
        icon: '🚛',
      },
      {
        title: 'Roadway Hotline Support',
        number: '1299',
        desc: 'Severe potholes, cave-ins, and infrastructure failures',
        icon: '🚧',
      },
    ],
  };

  const list = emergencyContacts[language] || emergencyContacts.uz;

  const copyToClipboard = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-gray-200 w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🚨</span>
            <div>
              <h3 className="text-xl font-black">{t('sos_title')}</h3>
              <p className="text-xs text-red-100">{t('sos_subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Numbers list */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-gray-50 border border-gray-200 hover:border-gray-300 transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center text-2xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#111827]">{item.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-snug">{item.desc}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`tel:${item.number.replace(/\s+/g, '')}`}
                  className="bg-[#16C79A] hover:bg-[#12a37d] text-white px-3.5 py-2 rounded-full text-xs font-bold transition-all shadow-sm"
                >
                  {item.number}
                </a>
                <button
                  onClick={() => copyToClipboard(item.number)}
                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 text-xs transition-colors"
                  title="Nusxa olish"
                >
                  {copiedNumber === item.number ? '✓' : '📋'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="p-4 bg-gray-100 border-t border-gray-200 text-center text-[11px] text-gray-500">
          Favqulodda vaziyatlarda 102 va 103 raqamlari barcha mobil operatorlar uchun bepul ishlaydi.
        </div>
      </div>
    </div>
  );
}

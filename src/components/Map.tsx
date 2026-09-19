'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export interface Issue {
  id: number;
  lat: number;
  lng: number;
  type: string;
  description: string;
  status: 'not_fixed' | 'in_progress' | 'fixed';
  votes: number;
  severity: 'high' | 'medium' | 'low';
  reportedDate: string;
  region?: string;
}

const customIcon = (status: string) => {
  const colors = {
    not_fixed: '#ef4444',
    in_progress: '#eab308',
    fixed: '#22c55e'
  };
  
  const shadows = {
    not_fixed: '0 0 25px rgba(239, 68, 68, 0.6)',
    in_progress: '0 0 25px rgba(234, 179, 8, 0.6)',
    fixed: '0 0 25px rgba(34, 197, 94, 0.6)'
  };
  
  const emojis = {
    not_fixed: '🚨',
    in_progress: '⚠️',
    fixed: '✅'
  };
  
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background: ${colors[status as keyof typeof colors]};
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 3px solid rgba(255,255,255,0.9);
      box-shadow: ${shadows[status as keyof typeof shadows]}, 0 6px 20px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      transition: transform 0.2s ease;
    ">${emojis[status as keyof typeof emojis]}</div>`,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
};

function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function Map({ setSelectedIssue }: { 
  selectedIssue?: Issue | null, 
  setSelectedIssue: (issue: Issue | null) => void 
}) {
  const [mounted, setMounted] = useState(false);

  const [issues] = useState<Issue[]>([
    { id: 1, lat: 41.2995, lng: 69.2401, region: 'Toshkent', type: 'chuqurlik', description: 'Amir Temur shox koʻchasida chuqurcha', status: 'not_fixed', votes: 24, severity: 'high', reportedDate: '2024-01-15' },
    { id: 2, lat: 41.3100, lng: 69.2500, region: 'Toshkent', type: 'svetofor', description: 'Chorrahada svetofor ishlamayapti', status: 'in_progress', votes: 12, severity: 'medium', reportedDate: '2024-01-14' },
    { id: 3, lat: 39.6542, lng: 66.9597, region: 'Samarqand', type: 'chuqurlik', description: 'Registon koʻchasi chorrahasida chuqur oʻra', status: 'not_fixed', votes: 19, severity: 'high', reportedDate: '2024-01-16' },
    { id: 4, lat: 39.6700, lng: 66.9400, region: 'Samarqand', type: 'yoritgich', description: 'Universitet bulvarida yoritgich ishlamayapti', status: 'fixed', votes: 31, severity: 'low', reportedDate: '2024-01-10' },
    { id: 5, lat: 40.9983, lng: 71.6726, region: 'Namangan', type: 'belgi', description: 'Uychi koʻchasida piyodalar oʻtish belgisi yoʻq', status: 'not_fixed', votes: 15, severity: 'medium', reportedDate: '2024-01-17' },
    { id: 6, lat: 40.7821, lng: 72.3442, region: 'Andijon', type: 'chuqurlik', description: 'Bobur shox koʻchasida yoʻl nosozligi', status: 'in_progress', votes: 27, severity: 'high', reportedDate: '2024-01-13' },
    { id: 7, lat: 40.3864, lng: 71.7864, region: 'Fargʻona', type: 'svetofor', description: 'Al-Fargʻoniy koʻchasida svetofor nosoz', status: 'not_fixed', votes: 9, severity: 'medium', reportedDate: '2024-01-18' },
    { id: 8, lat: 39.7747, lng: 64.4286, region: 'Buxoro', type: 'yoritgich', description: 'Mustaqillik koʻchasi yoritilmagan', status: 'in_progress', votes: 14, severity: 'high', reportedDate: '2024-01-12' },
    { id: 9, lat: 38.8605, lng: 65.7890, region: 'Qashqadaryo', type: 'chuqurlik', description: 'Mustaqillik maydoni yaqinida chuqurchalar', status: 'not_fixed', votes: 22, severity: 'high', reportedDate: '2024-01-11' },
    { id: 10, lat: 37.2242, lng: 67.2783, region: 'Surxondaryo', type: 'belgi', description: 'At-Termiziy koʻchasida yoʻl chizigʻi oʻchgan', status: 'fixed', votes: 18, severity: 'low', reportedDate: '2024-01-09' },
    { id: 11, lat: 41.5503, lng: 60.6317, region: 'Xorazm', type: 'chuqurlik', description: 'Al-Xorazmiy koʻchasida yoʻl oʻgʻirligi', status: 'not_fixed', votes: 11, severity: 'medium', reportedDate: '2024-01-14' },
    { id: 12, lat: 42.4603, lng: 59.6103, region: 'Qoraqalpogʻiston', type: 'svetofor', description: 'A.Dosnazarov koʻchasida svetofor oʻchgan', status: 'in_progress', votes: 16, severity: 'high', reportedDate: '2024-01-15' },
    { id: 13, lat: 40.0844, lng: 65.3792, region: 'Navoiy', type: 'yoritgich', description: 'Gʻalaba shox koʻchasida tungi yoritish muammosi', status: 'fixed', votes: 25, severity: 'low', reportedDate: '2024-01-08' },
    { id: 14, lat: 40.1158, lng: 67.8422, region: 'Jizzax', type: 'chuqurlik', description: 'Sh.Rashidov koʻchasida chuqur oʻra', status: 'not_fixed', votes: 13, severity: 'medium', reportedDate: '2024-01-16' },
    { id: 15, lat: 40.4897, lng: 68.7842, region: 'Sirdaryo', type: 'belgi', description: 'Oʻzbekiston koʻchasida toʻxtash belgisi yoʻq', status: 'in_progress', votes: 8, severity: 'low', reportedDate: '2024-01-17' },
  ]);

  const [mapCenter] = useState<[number, number]>([41.0000, 64.5000]);
  const [zoomLevel] = useState<number>(6);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const statusLabels = {
    not_fixed: '🔴 Hal etilmadi',
    in_progress: '🟡 Jarayonda',
    fixed: '🟢 Hal etildi'
  };

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-400">
        Xarita yuklanmoqda...
      </div>
    );
  }

  return (
    <MapContainer 
      center={mapCenter} 
      zoom={zoomLevel} 
      style={{ height: '100%', width: '100%' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={mapCenter} zoom={zoomLevel} />
      
      {issues.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.lat, issue.lng]}
          icon={customIcon(issue.status)}
          eventHandlers={{
            click: () => setSelectedIssue(issue)
          }}
        >
          <Popup>
            <div className="p-3.5 min-w-[220px] bg-white text-[#111827] rounded-2xl border border-gray-200 shadow-xl font-sans">
              <div className="text-[10px] font-black tracking-wider text-[#0E9F79] uppercase mb-1">
                📍 {issue.region || 'Viloyat'}
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{issue.status === 'not_fixed' ? '🚨' : issue.status === 'in_progress' ? '⚠️' : '✅'}</span>
                <h3 className="font-bold text-xs text-[#111827] leading-snug">{issue.description}</h3>
              </div>
              <p className="text-[11px] font-semibold text-gray-500 mb-2">{statusLabels[issue.status]}</p>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] text-gray-500 flex items-center gap-1">
                  <span>👍</span>
                  <span className="font-bold text-[#111827]">{issue.votes} ta ovoz</span>
                </p>
              </div>
              <button 
                className="w-full bg-[#16C79A] hover:bg-[#12a37d] text-white text-xs px-3 py-2 rounded-full font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
                onClick={() => {
                  issue.votes += 1;
                  setSelectedIssue({...issue});
                }}
              >
                ❤️ Ovoz berish
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
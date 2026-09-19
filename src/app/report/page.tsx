'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const LocationPickerMap = dynamic(() => import('../../components/LocationPickerMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-xs font-bold">
      Xarita yuklanmoqda...
    </div>
  ),
});

interface TelegramUser {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string;
}

interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  sendData: (data: string) => void;
  initDataUnsafe?: {
    user?: TelegramUser;
  };
  MainButton?: {
    text: string;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    onClick: (fn: () => void) => void;
  };
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: TelegramWebApp;
    };
  }
}

export default function TelegramReportPage() {
  const [telegramUser, setTelegramUser] = useState<TelegramUser | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 41.2995, lng: 69.2401 });
  const [type, setType] = useState('chuqurlik');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');

  // Camera state
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [cameraError, setCameraError] = useState<string | null>(null);

  // Submission state
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);

  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize Telegram WebApp
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();

      if (tg.initDataUnsafe?.user) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTelegramUser(tg.initDataUnsafe.user);
      }
    }
  }, []);

  // Fetch initial GPS if possible
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => {
          // fallback to default
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    }
  }, []);

  // Camera handling
  const startCamera = async (mode: 'environment' | 'user' = facingMode) => {
    setCameraError(null);
    setCameraActive(true);

    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
      }

      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
      }

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((e) => console.error(e));
        };
      }
    } catch (err: unknown) {
      console.error('Camera error:', err);
      setCameraError('Kamerani ishga tushirib bo\'lmadi. Brauzer yoki Telegram ruxsatlarini tekshiring.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const width = video.videoWidth || 640;
      const height = video.videoHeight || 480;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setPhoto(dataUrl);
        stopCamera();
      }
    }
  };

  const toggleCamera = () => {
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    startCamera(newMode);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // GPS Location button
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolokatsiya ushbu qurilmada qo\'llab-quvvatlanmaydi');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setGpsLoading(false);
      },
      (err) => {
        console.error(err);
        alert('Geolokatsiyani aniqlab bo\'lmadi. GPS yoqilganligini tekshiring.');
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Submit report
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photo) {
      alert('Iltimos, avval kamera orqali yo\'l nosozligini suratga oling yoki rasm yuklang!');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          photo,
          lat: coords.lat,
          lng: coords.lng,
          type,
          description,
          address,
          telegramUser,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
        setReportId(data.reportId);

        // Notify Telegram WebApp
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.sendData(
            JSON.stringify({
              reportId: data.reportId,
              status: 'submitted',
              type,
              coords,
            })
          );
        }
      } else {
        alert(data.error || 'Xatolik yuz berdi');
      }
    } catch (err: unknown) {
      console.error(err);
      alert('Serverga ulanishda xatolik yuz berdi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />

      <main className="min-h-screen bg-[#F8F9FA] text-[#1A1D20] font-sans pb-12">
        {/* Top Mini Header */}
        <header className="bg-white border-b border-gray-200/90 px-4 py-3 sticky top-0 z-30 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#111827] border border-[#16C79A] flex items-center justify-center text-white font-black text-xs">
              RS
            </div>
            <div>
              <div className="text-xs font-black uppercase text-[#111827] leading-none">
                ROAD SAFETY <span className="text-[#16C79A]">AI</span>
              </div>
              <div className="text-[10px] text-gray-500 font-bold">
                {telegramUser ? `Salom, ${telegramUser.first_name || 'Fuqaro'}!` : 'Telegram Mini App'}
              </div>
            </div>
          </div>

          <Link
            href="/"
            className="text-[11px] font-bold text-[#16C79A] bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200"
          >
            Bosh sahifa
          </Link>
        </header>

        {submitted ? (
          /* Success Screen */
          <div className="max-w-md mx-auto p-6 mt-8 text-center space-y-5 animate-in zoom-in-95">
            <div className="w-20 h-20 rounded-full bg-teal-50 border-2 border-[#16C79A] text-4xl flex items-center justify-center mx-auto shadow-md">
              ✓
            </div>
            <h2 className="text-2xl font-black text-[#111827]">
              Murojaat Qabul Qilindi!
            </h2>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 text-left text-xs space-y-2 shadow-sm">
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Murojaat ID:</span>
                <span className="font-mono font-bold text-[#16C79A]">{reportId}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Koordinatalar:</span>
                <span className="font-mono font-bold">{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</span>
              </div>
              <div className="flex justify-between border-b border-gray-100 pb-2">
                <span className="text-gray-500">Xabar:</span>
                <span className="font-bold text-emerald-600">Telegram botga yuborildi</span>
              </div>
              <p className="text-[11px] text-gray-500 pt-1">
                Sun&apos;iy intellekt fotosuratni tekshirdi va mas&apos;ul yo&apos;l xizmati bo&apos;limiga yo&apos;naltirdi.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.close) {
                    window.Telegram.WebApp.close();
                  } else {
                    router.push('/');
                  }
                }}
                className="w-full bg-[#16C79A] hover:bg-[#12a37d] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md shadow-teal-500/20"
              >
                Panelni Yopish
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setPhoto(null);
                  setDescription('');
                }}
                className="w-full bg-white hover:bg-gray-100 text-gray-700 py-3 rounded-full font-bold text-xs border border-gray-200 uppercase tracking-wider"
              >
                Yana Muammo Qo&apos;shish
              </button>
            </div>
          </div>
        ) : (
          /* Report Form */
          <div className="max-w-xl mx-auto p-4 sm:p-6 space-y-6">
            <div className="text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-[11px] font-bold uppercase tracking-wider mb-2">
                ● KAMERA & XARITA ORQALI
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#111827] tracking-tight">
                Yo&apos;l Muammosini Yuborish
              </h1>
              <p className="text-xs text-gray-500 mt-1">
                Kamera bilan rasmga oling, xaritada joyini belgilang va yuboring
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* STEP 1: CAMERA PHOTO */}
              <div className="bg-white rounded-3xl border border-gray-200/90 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#16C79A] text-white text-xs font-black flex items-center justify-center">
                      1
                    </span>
                    <h3 className="text-sm font-black text-[#111827]">
                      Kamera bilan rasmga oling
                    </h3>
                  </div>
                  {photo && (
                    <span className="text-[10px] font-bold text-[#0E9F79] bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      ✓ Rasm tayyor
                    </span>
                  )}
                </div>

                {photo ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo} alt="Olingan yo'l rasmi" className="w-full h-64 object-cover" />
                    <div className="absolute top-2 right-2 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setPhoto(null)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md"
                      >
                        Qaytadan olish
                      </button>
                    </div>
                    <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[10px] font-mono border border-white/10">
                      AI: Yo&apos;l nuqsoni qayd etildi
                    </div>
                  </div>
                ) : cameraActive ? (
                  <div className="relative bg-black rounded-2xl overflow-hidden border border-gray-300 h-72 flex items-center justify-center">
                    {cameraError ? (
                      <div className="p-4 text-center text-red-400 text-xs">{cameraError}</div>
                    ) : (
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full h-full object-cover"
                      />
                    )}

                    {/* Camera controls overlay */}
                    <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-4 z-20">
                      <button
                        type="button"
                        onClick={toggleCamera}
                        title="Kamerani almashtirish"
                        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center text-base"
                      >
                        🔄
                      </button>
                      <button
                        type="button"
                        onClick={capturePhoto}
                        title="Suratga olish"
                        className="w-16 h-16 rounded-full bg-white border-4 border-[#16C79A] shadow-xl active:scale-95 transition-transform flex items-center justify-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-[#16C79A]" />
                      </button>
                      <button
                        type="button"
                        onClick={stopCamera}
                        title="Kamerani yopish"
                        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-md flex items-center justify-center text-sm font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => startCamera()}
                      className="w-full bg-[#16C79A] hover:bg-[#12a37d] text-white py-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-teal-500/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                      <span className="text-lg">📷</span>
                      <span>Kamerani Ochish va Suratga Olish</span>
                    </button>

                    <div className="border-2 border-dashed border-gray-300 hover:border-[#16C79A] rounded-2xl p-4 text-center transition-colors bg-gray-50/80 cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        id="camera-file-input"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="camera-file-input" className="cursor-pointer block">
                        <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">🖼️</div>
                        <p className="text-xs font-bold text-gray-700">Yoki galereyadan rasm tanlang</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">JPG, PNG formatlarida</p>
                      </label>
                    </div>
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* STEP 2: MAP LOCATION PICKER */}
              <div className="bg-white rounded-3xl border border-gray-200/90 p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#16C79A] text-white text-xs font-black flex items-center justify-center">
                      2
                    </span>
                    <h3 className="text-sm font-black text-[#111827]">
                      Xaritadan joyini belgilang
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={handleGetLocation}
                    disabled={gpsLoading}
                    className="text-[11px] font-bold text-[#0E9F79] bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1 rounded-full flex items-center gap-1 active:scale-95"
                  >
                    <span>{gpsLoading ? '⏳' : '📍'}</span>
                    <span>{gpsLoading ? 'Aniqlanmoqda...' : 'Mening joylashuvim'}</span>
                  </button>
                </div>

                <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-gray-200 shadow-inner relative">
                  <LocationPickerMap
                    lat={coords.lat}
                    lng={coords.lng}
                    onChange={(newCoords) => setCoords(newCoords)}
                  />
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold text-gray-700 shadow-sm border border-gray-200 z-10">
                    📍 {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Manzil yoki mo'ljal (Masalan: Yunusobod 14-mavze, 23-uy oldida)"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs text-[#111827] focus:outline-none focus:border-[#16C79A]"
                  />
                </div>
              </div>

              {/* STEP 3: DETAILS */}
              <div className="bg-white rounded-3xl border border-gray-200/90 p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#16C79A] text-white text-xs font-black flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-sm font-black text-[#111827]">
                    Muammo turi va tavsif
                  </h3>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      Muammo turi
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-[#111827] focus:outline-none focus:border-[#16C79A]"
                    >
                      <option value="chuqurlik">🕳️ Yo&apos;l chuqurchasi (Pothole)</option>
                      <option value="svetofor">🚦 Nosoz svetofor yoki datchik</option>
                      <option value="belgi">🛑 Yo&apos;l belgisi shikastlangan / yo&apos;q</option>
                      <option value="chiziq">〰️ O&apos;chgan piyodalar o&apos;tish chizig&apos;i</option>
                      <option value="yoritgich">💡 Tungi yoritish nosozligi</option>
                      <option value="boshqa">⚠️ Boshqa xavfli yo&apos;l nuqsoni</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                      Qisqacha izoh (Ixtiyoriy)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Muammo haqida qo'shimcha ma'lumot yozing..."
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs text-[#111827] focus:outline-none focus:border-[#16C79A] resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#16C79A] hover:bg-[#12a37d] disabled:opacity-50 text-white py-4 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>⏳ Yuborilmoqda...</span>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Muammoni Telegram Botga Yuborish</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </main>
    </>
  );
}

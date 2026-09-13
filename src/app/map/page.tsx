'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { Issue } from '../../components/Map';
import Link from 'next/link';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

export default function MapPage() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    setCameraError(null);
    setShowCamera(true);

    try {
      let stream: MediaStream;
      // Avval orqa kameraga harakat qilamiz, o'xshamasa har qanday qulay kamerani olamiz
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
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
        // Chromium brauzerlarida avtomatik o'ynatishni ta'minlash uchun
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((e) => console.error('Play error:', e));
        };
      }
    } catch (err: any) {
      console.error('Kameraga kirishda xato:', err);
      setCameraError('Kamerani ochib bo\'lmadi. Ruxsat berilganini yoki kamera mavjudligini tekshiring.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setShowCamera(false);
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
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#090D16] text-slate-100 relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/3 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/15 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-[600px] -right-[100px] w-[500px] h-[500px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      {/* Navigation Header */}
      <nav className="bg-[#090D16]/70 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-105 transition-transform duration-300 ring-1 ring-white/20">
                <span className="text-2xl">🗺️</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-purple-300 transition-colors">
                Road Safety <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">AI</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 text-sm font-semibold text-slate-300">
                <Link href="/" className="hover:text-purple-400 transition-colors">Bosh sahifa</Link>
                <Link href="/map" className="text-purple-400">Xarita</Link>
                <Link href="/statistics" className="hover:text-purple-400 transition-colors">Statistika</Link>
                <Link href="/about" className="hover:text-purple-400 transition-colors">Loyiha haqida</Link>
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
                <Link href="/" className="hover:text-purple-400 transition-colors">Bosh sahifa</Link>
                <Link href="/map" className="text-purple-400">Xarita</Link>
                <Link href="/statistics" className="hover:text-purple-400 transition-colors">Statistika</Link>
                <Link href="/about" className="hover:text-purple-400 transition-colors">Loyiha haqida</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Map Container */}
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Jonli monitoring (Real-time)
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-2">
            Interaktiv xavfsizlik xaritasi
          </h1>
          <p className="text-slate-400 text-base max-w-xl">
            Yo'l infratuzilmasidagi muammolarni real vaqt rejimida aniqlash va vizual tahlil qilish.
          </p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden mb-8 shadow-2xl shadow-black/50">
          <div className="p-6 md:p-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">AI Aniqlash Tizimi</h2>
              <p className="text-slate-400 text-sm mt-1">Jonli monitoring va muammolarni tezkor yuborish</p>
            </div>
            <button
              onClick={() => setShowReportModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/25 active:scale-95 text-sm"
            >
              + Muammo haqida xabar berish
            </button>
          </div>
          <div className="h-[600px] relative w-full bg-slate-950">
            <Map selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue} />
          </div>
        </div>

        {selectedIssue && (
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                Tanlangan muammo
              </span>
              <button 
                onClick={() => setSelectedIssue(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕ Yopish
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedIssue.description}</h3>
                <div className="flex gap-4 text-xs font-semibold text-slate-400">
                  <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                    Holati: <span className="text-emerald-400">{selectedIssue.status}</span>
                  </span>
                  <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
                    Ovozlar: <span className="text-purple-400">{selectedIssue.votes}</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/20 active:scale-95 text-sm">
                  Qo'llab-quvvatlash
                </button>
                <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-semibold transition-all border border-white/10 text-sm">
                  Ulashish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-[#0D1322] rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-white/10">
            <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-white tracking-tight">Muammo haqida xabar bering</h2>
                <p className="text-slate-400 text-xs mt-1">AI xaritasiga kiritish uchun rasm yuboring</p>
              </div>
              <button
                onClick={() => {
                  stopCamera();
                  setShowReportModal(false);
                }}
                className="w-9 h-9 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                stopCamera();
                setShowReportModal(false);
              }}
              className="p-6 md:p-8 space-y-5"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Muammo turi
                </label>
                <select className="w-full bg-slate-900 border border-white/10 rounded-xl p-3.5 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm">
                  <option className="bg-[#090D16]">Yo'l o'ng'irligi (Chuqurchalar)</option>
                  <option className="bg-[#090D16]">Svetofor ishida xatolik</option>
                  <option className="bg-[#090D16]">Yo'l belgisi yo'qligi</option>
                  <option className="bg-[#090D16]">Yoritilmagan piyodalar o'tish joyi</option>
                  <option className="bg-[#090D16]">Boshqa</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Tavsif (Batafsil)
                </label>
                <textarea
                  className="w-full bg-slate-900 border border-white/10 rounded-xl p-3.5 h-28 text-white focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none placeholder:text-slate-600"
                  placeholder="Muammo joylashuvi va tafsilotlarini yozing..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Rasm dalil
                </label>

                {capturedImage ? (
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                    <img src={capturedImage} alt="Olingan rasm" className="w-full h-56 object-cover" />
                    <button
                      type="button"
                      onClick={() => setCapturedImage(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-600 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ) : showCamera ? (
                  <div className="relative bg-black rounded-xl overflow-hidden border border-white/10 h-64 flex items-center justify-center">
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                      <div className="flex gap-2">
                        {!cameraError && (
                          <button
                            type="button"
                            onClick={capturePhoto}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg font-semibold text-sm active:scale-95 transition-transform"
                          >
                            📷 Rasmga olish
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={stopCamera}
                          className="w-10 h-10 bg-white/10 text-white rounded-lg flex items-center justify-center text-sm hover:bg-white/20 transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/25 text-sm flex items-center justify-center gap-2"
                    >
                      📷 Kamerani ochish
                    </button>
                    <div className="border-2 border-dashed border-white/10 hover:border-purple-500/50 rounded-2xl p-4 text-center transition-colors bg-slate-900/50 cursor-pointer group">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        id="image-upload" 
                        onChange={handleFileUpload} 
                      />
                      <label htmlFor="image-upload" className="cursor-pointer block">
                        <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">📁</div>
                        <p className="text-xs font-semibold text-slate-300">Yoki qurilmadan yuklang</p>
                        <p className="text-[10px] text-slate-500 mt-1">PNG, JPG yoki WEBP (MAKS. 10MB)</p>
                      </label>
                    </div>
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-purple-500/25 active:scale-95 text-sm"
                >
                  Yuborish
                </button>
                <button
                  type="button"
                  onClick={() => {
                    stopCamera();
                    setShowReportModal(false);
                  }}
                  className="flex-1 bg-white/5 hover:bg-white/10 text-white py-3.5 rounded-xl font-semibold transition-all border border-white/10 text-sm"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
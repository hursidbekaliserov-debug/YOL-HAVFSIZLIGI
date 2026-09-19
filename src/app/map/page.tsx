/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { Issue } from '../../components/Map';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import SosModal from '../../components/SosModal';

const Map = dynamic(() => import('../../components/Map'), { ssr: false });

export default function MapPage() {
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isSosOpen, setIsSosOpen] = useState(false);
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
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play().catch((e) => console.error('Play error:', e));
        };
      }
    } catch (err: unknown) {
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
    <main className="min-h-screen bg-[#F8F9FA] text-[#1A1D20] font-sans selection:bg-[#16C79A] selection:text-white relative">
      {/* Universal Sticky Navbar */}
      <Navbar onOpenSos={() => setIsSosOpen(true)} />

      {/* Main Map Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-teal-50 border border-teal-200 rounded-full text-[#0E9F79] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="w-2 h-2 rounded-full bg-[#16C79A] animate-pulse"></span>
            <span>● JONLI MONITORING VA RADAR</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight mb-2">
            Interaktiv Xavfsizlik Xaritasi
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl">
            Yo&apos;l infratuzilmasidagi nosozliklarni real vaqt rejimida kuzatish, tahlil qilish va yangi muammolarni yuborish.
          </p>
        </div>

        {/* Map Card */}
        <div className="bg-white rounded-3xl border border-gray-200/90 overflow-hidden mb-8 shadow-xl shadow-gray-200/50">
          <div className="p-6 md:p-8 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black text-[#111827] tracking-tight">O&apos;zbekiston Yo&apos;l Holati Geoportali</h2>
              <p className="text-gray-500 text-xs mt-0.5">Xaritadagi nuqtalarni bosing yoki yangi muammo qo&apos;shing</p>
            </div>
            <button
              onClick={() => setShowReportModal(true)}
              className="bg-[#16C79A] hover:bg-[#12a37d] text-white px-6 py-3 rounded-full font-bold transition-all shadow-md shadow-teal-500/20 active:scale-95 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <span>+ Muammo haqida xabar berish</span>
            </button>
          </div>
          <div className="h-[600px] relative w-full bg-gray-100">
            <Map selectedIssue={selectedIssue} setSelectedIssue={setSelectedIssue} />
          </div>
        </div>

        {/* Selected Issue Card */}
        {selectedIssue && (
          <div className="bg-white rounded-3xl border border-gray-200/90 p-6 md:p-8 shadow-xl shadow-gray-200/40 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0E9F79] bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
                ● Tanlangan Yo&apos;l Muammosi
              </span>
              <button 
                onClick={() => setSelectedIssue(null)}
                className="text-gray-400 hover:text-gray-800 text-sm font-bold"
              >
                ✕ Yopish
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-black text-[#111827] mb-2">{selectedIssue.description}</h3>
                <div className="flex flex-wrap gap-3 text-xs font-semibold text-gray-600">
                  <span className="bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl">
                    Holati: <span className="text-[#0E9F79] font-bold">{selectedIssue.status}</span>
                  </span>
                  <span className="bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl">
                    Ovozlar: <span className="text-[#16C79A] font-bold">{selectedIssue.votes}</span>
                  </span>
                  <span className="bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-xl">
                    Sana: <span className="text-gray-700">{selectedIssue.reportedDate}</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => alert('Ovozingiz qabul qilindi! Rahmat.')}
                  className="flex-1 bg-[#16C79A] hover:bg-[#12a37d] text-white py-3 rounded-full font-bold transition-all shadow-md shadow-teal-500/20 active:scale-95 text-xs uppercase tracking-wider"
                >
                  👍 Qo&apos;llab-quvvatlash
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Havola nusxalandi!');
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-full font-bold transition-all border border-gray-300 text-xs uppercase tracking-wider"
                >
                  🔗 Ulashish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-200">
            <div className="p-6 md:p-8 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-[#111827] tracking-tight">Muammo Haqida Xabar Bering</h2>
                <p className="text-gray-500 text-xs mt-0.5">AI xaritasiga kiritish uchun fotosurat va manzilni yuboring</p>
              </div>
              <button
                onClick={() => {
                  stopCamera();
                  setShowReportModal(false);
                }}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 transition-colors font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                stopCamera();
                setShowReportModal(false);
                alert('Arizangiz muvaffaqiyatli qabul qilindi! AI tekshiruvidan so\'ng xaritaga qo\'shiladi.');
              }}
              className="p-6 md:p-8 space-y-5"
            >
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Muammo turi
                </label>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-[#111827] focus:outline-none focus:border-[#16C79A] transition-colors text-sm">
                  <option>Yo&apos;l qoplamasidagi chuqurliklar (Potholes)</option>
                  <option>Nosoz svetofor yoki datchik</option>
                  <option>Yo&apos;l belgisi yo&apos;qligi yoki shikastlanganligi</option>
                  <option>Yoritilmagan piyodalar o&apos;tish joyi</option>
                  <option>Boshqa xavfli to&apos;siq</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Tavsif va Aniq Manzil
                </label>
                <textarea
                  className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3.5 h-28 text-[#111827] focus:outline-none focus:border-[#16C79A] transition-colors text-sm resize-none placeholder:text-gray-400"
                  placeholder="Muammo joylashuvi va tafsilotlarini yozing..."
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Fotosurat (Dalil)
                </label>

                {capturedImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                    <img src={capturedImage} alt="Olingan rasm" className="w-full h-52 object-cover" />
                    <button
                      type="button"
                      onClick={() => setCapturedImage(null)}
                      className="absolute top-2 right-2 w-8 h-8 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition-colors text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ) : showCamera ? (
                  <div className="relative bg-black rounded-2xl overflow-hidden border border-gray-200 h-64 flex items-center justify-center">
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
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex gap-2">
                        {!cameraError && (
                          <button
                            type="button"
                            onClick={capturePhoto}
                            className="flex-1 bg-[#16C79A] text-white py-2.5 rounded-full font-bold text-xs uppercase tracking-wider active:scale-95 transition-transform"
                          >
                            📷 Rasmga olish
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={stopCamera}
                          className="w-10 h-10 bg-white/20 text-white rounded-full flex items-center justify-center text-sm hover:bg-white/30 transition-colors"
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
                      className="w-full bg-[#16C79A] hover:bg-[#12a37d] text-white py-3 rounded-full font-bold transition-all shadow-md shadow-teal-500/20 text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                    >
                      📷 Kamerani ochish
                    </button>
                    <div className="border-2 border-dashed border-gray-300 hover:border-[#16C79A] rounded-2xl p-4 text-center transition-colors bg-gray-50 cursor-pointer group">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        id="image-upload" 
                        onChange={handleFileUpload} 
                      />
                      <label htmlFor="image-upload" className="cursor-pointer block">
                        <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">📁</div>
                        <p className="text-xs font-bold text-gray-700">Yoki fayllardan yuklang</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG yoki WEBP (MAKS. 10MB)</p>
                      </label>
                    </div>
                  </div>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#16C79A] hover:bg-[#12a37d] text-white py-3.5 rounded-full font-bold transition-all shadow-md shadow-teal-500/20 active:scale-95 text-xs uppercase tracking-wider"
                >
                  Yuborish
                </button>
                <button
                  type="button"
                  onClick={() => {
                    stopCamera();
                    setShowReportModal(false);
                  }}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-full font-bold transition-all border border-gray-300 text-xs uppercase tracking-wider"
                >
                  Bekor qilish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Universal Footer */}
      <Footer />

      {/* SOS Modal */}
      <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />
    </main>
  );
}
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function AntennaLandingPage() {
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [currentReview, setCurrentReview] = useState(0);
  const [isReviewAutoplaying, setIsReviewAutoplaying] = useState(true);
  const totalReviews = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % totalReviews);
    setIsReviewAutoplaying(false);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + totalReviews) % totalReviews);
    setIsReviewAutoplaying(false);
  };

  useEffect(() => {
    if (!isReviewAutoplaying) return;
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % totalReviews);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentReview, isReviewAutoplaying]);

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-section').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCTA(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    document.getElementById('ordina')?.scrollIntoView({ behavior: 'smooth' });
  };

  const productImages = [
    '/images/dongle/1.jpg',
    '/images/dongle/2.png',
    '/images/dongle/3.png',
    '/images/dongle/4.png',
    '/images/dongle/5.png',
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Grazie per il tuo ordine! Ti contatteremo entro 24 ore per confermare la spedizione.');
  };

  return (
    <div className={`bg-white text-slate-800 overflow-x-hidden ${inter.className}`}>
      <style jsx>{`
        .beam-box-1 {
          background: linear-gradient(to bottom, rgba(30,64,175,0.05), rgba(30,64,175,0.9) 25%, rgba(30,64,175,0.9));
        }
        .beam-box-2 {
          background: linear-gradient(to bottom, rgba(234,88,12,0.05), rgba(234,88,12,0.9) 25%, rgba(234,88,12,0.9));
        }
        .beam-box-3 {
          background: linear-gradient(to bottom, rgba(22,163,74,0.05), rgba(22,163,74,0.9) 25%, rgba(22,163,74,0.9));
        }
        @media (min-width: 768px) {
          .beam-box-1 {
            background: linear-gradient(to right, rgba(30,64,175,0), rgba(30,64,175,0.45) 30%, rgba(30,64,175,0.45));
            mask: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
            -webkit-mask: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
          }
          .beam-box-2 {
            background: linear-gradient(to left, rgba(234,88,12,0), rgba(234,88,12,0.45) 30%, rgba(234,88,12,0.45));
            mask: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
            -webkit-mask: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
          }
          .beam-box-3 {
            background: linear-gradient(to right, rgba(22,163,74,0), rgba(22,163,74,0.45) 30%, rgba(22,163,74,0.45));
            mask: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
            -webkit-mask: linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%);
          }
        }
      `}</style>
      {/* TOP BAR - Fade */}
      <div className="bg-yellow-400 py-3 sticky top-0 z-50 shadow-md">
        <div className="relative h-6 flex items-center justify-center overflow-hidden">
          {[
            { text: '↩️ 30 GIORNI PER IL RESO' },
            { text: '💰 PAGAMENTO ALLA CONSEGNA' },
            { text: '🚚 SPEDIZIONE GRATUITA 24-48H' },
          ].map((item, i) => (
            <span
              key={i}
              className="absolute font-bold text-sm uppercase tracking-wide text-white animate-fade-text"
              style={{ animationDelay: `${i * 3}s` }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-800 via-blue-700 to-blue-600 text-white overflow-hidden pb-8">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/10 blur-3xl rounded-full pointer-events-none" />

        <div className="max-w-[1600px] mx-auto px-4 md:px-6 pt-6 md:pt-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

            {/* Hero Image / Product */}
            <div className="w-full lg:w-1/2 z-10 relative order-1 lg:order-2">
              {/* Product Image - Square */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-2xl bg-[conic-gradient(from_0deg,#3b82f6,#06b6d4,#8b5cf6,#a855f7,#22c55e,#10b981,#f59e0b,#f97316,#3b82f6)] p-[5px]">
              <div className="w-full h-full rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={productImages[currentSlide]}
                  alt="Antenna TV"
                  className="w-full h-full object-cover"
                />
                </div>
                {/* Badge */}
                <div className="absolute top-5 left-5 bg-red-600 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                  🔥 Offerta limitata Black Friday
                </div>
              </div>

              {/* Thumbnails - Outside the square */}
              <div className="flex gap-2 mt-4 justify-center">
                {productImages.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-16 h-16 rounded-lg border-2 transition-all overflow-hidden ${
                      currentSlide === idx ? 'border-blue-500' : 'border-slate-200'
                    } bg-white`}
                  >
                    <img src={src} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Text */}
            <div className="w-full lg:w-1/2 z-10 text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-yellow-400 text-slate-900 rounded-full px-4 py-1 text-sm font-extrabold mb-4 uppercase tracking-wider shadow-lg">
                ⭐ Antenna Smart TV Premium
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3">
                TV 4K <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Gratis</span>,{' '}
                <span className="text-white">Niente Cavo, Niente Abbonamenti</span>
              </h1>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center gap-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0"
              >
                <div className="flex gap-0.5 text-yellow-400">⭐⭐⭐⭐⭐</div>
                <span className="text-white font-semibold">4.8</span>
                <span className="text-slate-300 text-sm">(485 recensioni)</span>
              </button>

              <p className="text-slate-300 text-base mb-4 leading-relaxed">
                <strong>Liberati per sempre dalle bollette TV.</strong> Con questa antenna Smart TV ricevi canali nazionali e locali in 4K/Full HD: notizie, meteo, sport, film, serie e programmi per bambini <span className="text-yellow-400 font-bold">senza pagare un centesimo di abbonamento mensile</span>.
              </p>

              <p className="text-slate-300 mb-4 text-sm">
                Collega l'antenna, avvia la ricerca canali e… stai già guardando la TV gratis.
              </p>

              {/* Price Box */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-6">
                <div className="bg-white/20 p-3 rounded-lg border border-white/30 backdrop-blur-sm shadow-inner w-full sm:w-auto text-center sm:text-left">
                  <div className="text-white/70 line-through text-sm">Prezzo normale €89,99</div>
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <span className="text-5xl font-black text-white tracking-tight">€39,99</span>
                    <div className="flex flex-col items-start">
                      <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase animate-pulse">Offerta Flash</span>
                      <span className="text-green-400 text-xs font-bold">-55% Sconto</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <button
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-[#038218] to-[#05a31f] hover:from-[#02710f] hover:to-[#038218] text-white py-4 px-10 rounded-full shadow-xl shadow-[#038218]/50 transform transition hover:-translate-y-1 hover:scale-105 flex flex-col items-center justify-center cursor-pointer"
                >
                  <span className="text-xl font-black uppercase tracking-wide">ORDINA ORA</span>
                  <span className="text-sm font-medium opacity-90">Paghi alla Consegna</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl grid grid-cols-3 divide-x divide-white/30 overflow-hidden">
                <div className="p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-1">🚚</span>
                  <span className="text-white font-bold text-xs md:text-xs uppercase tracking-wide">Spedizione</span>
                  <span className="text-white/70 text-[11px] md:text-[11px]">Gratuita 24-48h</span>
                </div>
                <div className="p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-1">💰</span>
                  <span className="text-white font-bold text-xs md:text-xs uppercase tracking-wide">Pagamento</span>
                  <span className="text-white/70 text-[11px] md:text-[11px]">Alla Consegna</span>
                </div>
                <div className="p-3 md:p-4 flex flex-col items-center justify-center text-center">
                  <span className="text-2xl mb-1">🛡️</span>
                  <span className="text-white font-bold text-xs md:text-xs uppercase tracking-wide">Garanzia</span>
                  <span className="text-white/70 text-[11px] md:text-[11px]">30 Giorni</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section id="benefits" className={`fade-section py-16 bg-gradient-to-b from-slate-50 to-white transition-all duration-700 ${isVisible['benefits'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-sky-400 p-[2px] hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="relative h-full bg-white rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-sky-400/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform">
                    <span className="text-2xl">📡</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">Ricezione 360°</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Cattura il segnale da <span className="font-semibold text-blue-500">tutte le direzioni</span> per immagini sempre nitide.</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-violet-500 p-[2px] hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="relative h-full bg-white rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:rotate-6 transition-transform">
                    <span className="text-2xl">📺</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">Qualità 4K/HD</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Immagini <span className="font-semibold text-purple-600">cristalline</span>, giochi next-gen in 4K, colori vividi e nessun disturbo.</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 p-[2px] hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="relative h-full bg-white rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:rotate-6 transition-transform">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">Setup in 2 Min</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Parete, finestra o <span className="font-semibold text-green-600">base magnetica</span>. Nessun tecnico necessario.</p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 p-[2px] hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="relative h-full bg-white rounded-2xl p-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 mb-4 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/30 group-hover:rotate-6 transition-transform">
                    <span className="text-2xl">💸</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-900">Zero Bollette</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">Risparmia <span className="font-semibold text-amber-600">€500+ all'anno</span>. Niente abbonamenti, mai.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU CAN WATCH */}
      <section id="watch" className={`fade-section py-16 bg-white transition-all duration-700 ${isVisible['watch'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Cosa puoi guardare <span className="text-blue-500">ogni giorno</span>?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tutti i tuoi canali preferiti, <span className="font-bold">senza pagare nulla</span>.
            </p>
          </div>

          <div className="space-y-16">
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row items-center gap-0 md:gap-8 lg:gap-12 relative">
              {/* Light beam from image to text - Desktop */}
              <svg className="hidden md:block absolute left-[25%] top-0 bottom-0 w-[75%] h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="beamGrad1" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="rgba(30,64,175,0.7)" />
                    <stop offset="60%" stopColor="rgba(30,64,175,0.45)" />
                    <stop offset="100%" stopColor="rgba(30,64,175,0.15)" />
                  </linearGradient>
                  <filter id="blur1" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                  </filter>
                </defs>
                <polygon points="0,5 100,42 100,58 0,95" fill="url(#beamGrad1)" filter="url(#blur1)" />
              </svg>
                            <div className="w-full md:w-1/2 lg:w-2/5 relative z-10">
                <div className="aspect-square bg-slate-200 rounded-3xl md:rounded-3xl rounded-b-none flex items-center justify-center overflow-hidden md:shadow-2xl relative">
                  <img src="https://picsum.photos/800/800?random=1" alt="Film e Serie TV" className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-blue-800/50 to-transparent md:hidden"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-3/5 relative z-10">
                <div className="rounded-t-none rounded-b-3xl md:rounded-3xl p-8 lg:p-10 group hover:scale-[1.01] transition-transform duration-300 border-b-[6px] md:border-b-0 md:border-r-[6px] border-blue-700/80 beam-box-1">
                  <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-500 px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <span className="text-xl">🎬</span> Intrattenimento
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold mb-4 text-white">Film e Serie TV</h3>
                  <p className="text-white/90 mb-5 leading-relaxed text-lg">
                    Guarda <span className="font-bold">film, serie TV, documentari</span> sui canali nazionali in alta definizione. Rai, Mediaset, La7 e tanti altri.
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</span>
                    Tutto gratis, per sempre.
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="flex flex-col md:flex-row items-center gap-0 md:gap-8 lg:gap-12 relative">
              {/* Light beam from image to text (reversed) - Desktop */}
              <svg className="hidden md:block absolute right-[25%] top-0 bottom-0 w-[75%] h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="beamGrad2" x1="100%" y1="50%" x2="0%" y2="50%">
                    <stop offset="0%" stopColor="rgba(234,88,12,0.7)" />
                    <stop offset="60%" stopColor="rgba(234,88,12,0.45)" />
                    <stop offset="100%" stopColor="rgba(234,88,12,0.15)" />
                  </linearGradient>
                  <filter id="blur2" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                  </filter>
                </defs>
                <polygon points="100,5 0,42 0,58 100,95" fill="url(#beamGrad2)" filter="url(#blur2)" />
              </svg>
                            <div className="w-full md:w-1/2 lg:w-3/5 order-2 md:order-1 relative z-10">
                <div className="rounded-t-none rounded-b-3xl md:rounded-3xl p-8 lg:p-10 group hover:scale-[1.01] transition-transform duration-300 border-b-[6px] md:border-b-0 md:border-l-[6px] border-orange-700/80 beam-box-2">
                  <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <span className="text-xl">⚽</span> Sport Live
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold mb-4 text-white">Tutto lo Sport Mondiale</h3>
                  <p className="text-white/90 mb-5 leading-relaxed text-lg">
                    Segui <span className="font-bold">partite, eventi sportivi, motori</span> sui canali gratuiti. Non perderti nessuna emozione.
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</span>
                    Segnale stabile anche durante le partite.
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-2/5 order-1 md:order-2 relative z-10">
                <div className="aspect-square bg-slate-200 rounded-3xl md:rounded-3xl rounded-b-none flex items-center justify-center overflow-hidden md:shadow-2xl relative">
                  <img src="https://picsum.photos/800/800?random=2" alt="Tutto lo Sport Mondiale" className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-orange-700/50 to-transparent md:hidden"></div>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="flex flex-col md:flex-row items-center gap-0 md:gap-8 lg:gap-12 relative">
              {/* Light beam from image to text - Desktop */}
              <svg className="hidden md:block absolute left-[25%] top-0 bottom-0 w-[75%] h-full pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="beamGrad3" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="rgba(22,163,74,0.7)" />
                    <stop offset="60%" stopColor="rgba(22,163,74,0.45)" />
                    <stop offset="100%" stopColor="rgba(22,163,74,0.15)" />
                  </linearGradient>
                  <filter id="blur3" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" />
                  </filter>
                </defs>
                <polygon points="0,5 100,42 100,58 0,95" fill="url(#beamGrad3)" filter="url(#blur3)" />
              </svg>
                            <div className="w-full md:w-1/2 lg:w-2/5 relative z-10">
                <div className="aspect-square bg-slate-200 rounded-3xl md:rounded-3xl rounded-b-none flex items-center justify-center overflow-hidden md:shadow-2xl relative">
                  <img src="https://picsum.photos/800/800?random=3" alt="Giochi e Programmi per Bambini" className="w-full h-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-green-700/50 to-transparent md:hidden"></div>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-3/5 relative z-10">
                <div className="rounded-t-none rounded-b-3xl md:rounded-3xl p-8 lg:p-10 group hover:scale-[1.01] transition-transform duration-300 border-b-[6px] md:border-b-0 md:border-r-[6px] border-green-700/80 beam-box-3">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-bold mb-4">
                    <span className="text-xl">🎮</span> Per Tutta la Famiglia
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-extrabold mb-4 text-white">Giochi e Programmi per Bambini</h3>
                  <p className="text-white/90 mb-5 leading-relaxed text-lg">
                    Gioca ai tuoi <span className="font-bold">videogiochi preferiti</span> direttamente sulla TV e intrattieni i più piccoli con <span className="font-bold">cartoni animati e programmi educativi</span>.
                  </p>
                  <div className="flex items-center gap-2 text-white font-bold">
                    <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">✓</span>
                    Intrattenimento per tutta la famiglia.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="howto" className={`fade-section py-12 md:py-20 bg-slate-900 text-white transition-all duration-700 ${isVisible['howto'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="text-center mb-8 md:mb-16">
            <span className="text-yellow-400 font-bold uppercase tracking-widest text-xs mb-2 block">Semplicità Assoluta</span>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4">Installazione in 2 minuti</h2>
            <p className="text-slate-400 max-w-2xl mx-auto italic font-medium text-sm md:text-base">
              "Disimballa, collega, cerca i canali. Fine."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-12 relative">
            {/* Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-slate-700 via-yellow-500/50 to-slate-700 rounded-full" />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-row md:flex-col items-center text-left md:text-center group gap-4 md:gap-0">
              <div className="w-12 h-12 md:w-24 md:h-24 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center md:mb-6 shadow-lg group-hover:border-yellow-400 transition-all flex-shrink-0">
                <span className="text-xl md:text-4xl">📦</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-3">1. Apri la Confezione</h3>
                <p className="text-slate-400 text-sm max-w-xs">Trovi l'antenna, il cavo coassiale premium e le istruzioni.</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-row md:flex-col items-center text-left md:text-center group gap-4 md:gap-0">
              <div className="w-12 h-12 md:w-24 md:h-24 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center md:mb-6 shadow-lg group-hover:border-yellow-400 transition-all flex-shrink-0">
                <span className="text-xl md:text-4xl">🔌</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-3">2. Collega alla TV</h3>
                <p className="text-slate-400 text-sm max-w-xs">Attacca il cavo alla presa antenna della tua TV. Base magnetica o fissaggio a parete.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-row md:flex-col items-center text-left md:text-center group gap-4 md:gap-0">
              <div className="w-12 h-12 md:w-24 md:h-24 bg-slate-800 rounded-full border-4 border-slate-700 flex items-center justify-center md:mb-6 shadow-lg group-hover:border-yellow-400 transition-all flex-shrink-0">
                <span className="text-xl md:text-4xl">▶️</span>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-3">3. Cerca i Canali</h3>
                <p className="text-slate-400 text-sm max-w-xs">Avvia la ricerca automatica e goditi la TV gratis!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section id="specs" className={`fade-section py-16 bg-white transition-all duration-700 ${isVisible['specs'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-[2.5rem] font-extrabold text-center mb-8 md:mb-10 text-slate-900">
            Potenza massima, <span className="text-blue-500">zero complicazioni</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1260px] mx-auto">
            {/* Specs cards */}
            <div className="grid grid-cols-1 gap-4">
            {/* Row 1 - 3 cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6 text-center shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
                <div className="mb-2 flex justify-center">
                  <span className="text-3xl md:text-4xl">📡</span>
                </div>
                <div className="text-xl md:text-[1.75rem] font-bold text-blue-500 mb-1">360°</div>
                <div className="text-xs md:text-sm text-gray-500">Ricezione omnidirezionale</div>
              </div>
              <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6 text-center shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
                <div className="mb-2 flex justify-center">
                  <span className="text-3xl md:text-4xl">📏</span>
                </div>
                <div className="text-xl md:text-[1.75rem] font-bold text-blue-500 mb-1">400km</div>
                <div className="text-xs md:text-sm text-gray-500">Raggio massimo</div>
              </div>
              <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6 text-center shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
                <div className="mb-2 flex justify-center">
                  <span className="text-3xl md:text-4xl">📺</span>
                </div>
                <div className="text-xl md:text-[1.75rem] font-bold text-blue-500 mb-1">4K UHD</div>
                <div className="text-xs md:text-sm text-gray-500">Qualità video</div>
              </div>
            </div>

            {/* Row 2 - Mobile: single combined card / Desktop: 2 cards */}
            {/* Mobile combined card */}
            <div className="md:hidden bg-[#F5F5F5] rounded-xl p-4 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl">🔌</span>
                  <div>
                    <span className="text-sm font-semibold text-blue-500">Cavo Premium</span>
                    <p className="text-xs text-gray-500">Rame ad alta purezza, connettori placcati oro</p>
                  </div>
                </div>
                <div className="h-px w-full bg-gray-200"></div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">🎨</span>
                  <div>
                    <span className="text-sm font-semibold text-blue-500">Design Slim</span>
                    <p className="text-xs text-gray-500">Sottile, elegante, si mimetizza ovunque</p>
                  </div>
                </div>
                <div className="h-px w-full bg-gray-200"></div>
                <div className="flex items-start gap-3">
                  <span className="text-xl">💰</span>
                  <div>
                    <span className="text-sm font-semibold text-blue-500">€0 al mese</span>
                    <p className="text-xs text-gray-500">Nessun abbonamento, canali gratuiti per sempre</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop: 2 cards */}
            <div className="hidden md:grid grid-cols-[2fr_1fr] gap-4">
              <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🔌</span>
                  <h3 className="text-base md:text-lg font-semibold text-blue-500">Cavo Premium Incluso</h3>
                </div>
                <p className="text-gray-600 text-sm md:text-[0.9375rem] leading-relaxed">
                  <strong>Rame ad alta purezza</strong> per la minima perdita di segnale. Connettori placcati oro per una connessione stabile e duratura.
                </p>
              </div>
              <div className="bg-[#F5F5F5] rounded-xl p-4 md:p-6 text-center shadow-sm relative overflow-hidden flex flex-col justify-center">
                <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
                <div className="mb-2 flex justify-center">
                  <span className="text-3xl md:text-4xl">🎨</span>
                </div>
                <div className="text-xl md:text-[1.75rem] font-bold text-blue-500 mb-1">Slim</div>
                <div className="text-xs md:text-sm text-gray-500">Design moderno</div>
              </div>
            </div>

            {/* Row 3 - full width (desktop only) */}
            <div className="hidden md:block bg-[#F5F5F5] rounded-xl p-4 md:p-6 shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-400 to-blue-600 pointer-events-none" style={{ WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }}></div>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <div className="text-lg md:text-2xl font-bold text-blue-500">€0 al mese</div>
                <div className="h-6 w-px bg-gray-300 hidden md:block"></div>
                <div className="text-sm text-gray-500">Nessun abbonamento, nessun canone TV. Solo canali gratuiti per sempre.</div>
              </div>
            </div>
            </div>

            {/* Image box */}
            <div className="flex bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl overflow-hidden items-center justify-center min-h-[250px] lg:min-h-[400px] order-last lg:order-none">
              <img src="https://picsum.photos/600/500?random=10" alt="Specifiche Tecniche" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews-section" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #F0F7FF 10%, #F0F7FF 90%, #ffffff 100%)', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 id="reviews" style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.75rem', color: '#111827' }}>
            Recensioni Verificate
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '0.25rem', color: '#fbbf24' }}>⭐⭐⭐⭐⭐</div>
            <span style={{ fontWeight: 700, color: '#111827' }}>4.8</span>
            <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>(485 recensioni)</span>
          </div>

          <div className="relative max-w-[280px] md:max-w-[700px] mx-auto mb-8">
            <div style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <div style={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${currentReview * 100}%)` }}>
                {[
                    { t: 'Funziona davvero', d: 'Ero scettico ma devo dire che funziona.. ho tolto sky e ora guardo tutto gratis. qualità buona, non come prima ma ci sta', a: 'Marco R.', stars: 5 },
                    { t: 'facile da montare', d: 'mio figlio la montata in 5 minuti neanche. pensavo fosse piu difficile invece niente, attacchi il cavo e vai', a: 'Laura M.', stars: 5 },
                    { t: 'Prende bene', d: 'Abito al 3 piano e prendevo malissimo prima.. con questa prendo tutti i canali bene. anche rai 3 che non prendevo mai', a: 'Giuseppe T.', stars: 5 },
                    { t: 'per ora tutto ok', d: 'arrivata ieri, sembra funzionare bene ma voglio vedere col tempo come va. per adesso 4 stelle poi aggiorno', a: 'Anna P.', stars: 4 },
                    { t: 'Consegna veloce', d: 'Arrivato dopo 2 giorni, il corriere ha chiamato prima di venire. funziona bene guardo le partite senza pagare!!', a: 'Roberto S.', stars: 5 },
                    { t: 'finalmente', d: 'basta abbonamenti.. guardo quello che voglio senza spendere un euro. dovevo farlo prima', a: 'Francesca B.', stars: 5 },
                    { t: 'Non si nota', d: 'La messa dietro la tv e non si vede proprio. mia moglie contenta che non è brutta come le antenne vecchie', a: 'Luca D.', stars: 5 },
                    { t: 'meglio di quella sul tetto', d: 'avevo lantenna sul tetto che non andava piu.. questa la metti dentro e prende uguale se non meglio', a: 'Maria G.', stars: 5 },
                    { t: 'Pagato alla consegna', d: 'Mi fido poco a pagare online ma qui paghi quando arriva quindi perfetto. prodotto buono lo consiglio', a: 'Antonio C.', stars: 5 },
                    { t: 'contenta', d: 'avevo paura che era una fregatura invece no funziona. i bambini guardano i cartoni e io i programmi. bene cosi', a: 'Stefania L.', stars: 5 }
                ].map((review, i) => (
                    <div key={i} style={{ minWidth: '100%', background: 'linear-gradient(135deg, #FAFCFF, #F0F7FF)', padding: '1.5rem', boxShadow: '0 2px 8px rgba(59, 130, 246, 0.1)', border: '1px solid #DBEAFE', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem', color: '#fbbf24', fontSize: '1rem' }}>
                            {review.stars === 5 ? '⭐⭐⭐⭐⭐' : '⭐⭐⭐⭐'}
                        </div>
                        <p style={{ fontWeight: 600, color: '#111827', marginBottom: '0.5rem', fontSize: '1rem' }}>{review.t}</p>
                        <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{review.d}</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500 }}>{review.a}</p>
                    </div>
                ))}
              </div>
            </div>

            <button onClick={prevReview} className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-[50px] bg-white border border-gray-200 w-10 h-10 min-w-[40px] min-h-[40px] rounded-full cursor-pointer shadow-lg flex items-center justify-center z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', minWidth: '32px', minHeight: '32px' }}>
                <path d="M15 18l-6-6 6-6" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button onClick={nextReview} className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-[50px] bg-white border border-gray-200 w-10 h-10 min-w-[40px] min-h-[40px] rounded-full cursor-pointer shadow-lg flex items-center justify-center z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', minWidth: '32px', minHeight: '32px' }}>
                <path d="M9 18l6-6-6-6" stroke="#3B82F6" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              {Array.from({ length: totalReviews }).map((_, i) => (
                <span
                    key={i}
                    onClick={() => setCurrentReview(i)}
                    style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === currentReview ? '#3B82F6' : '#d1d5db', cursor: 'pointer', transition: 'all 0.3s' }}
                ></span>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Puoi leggere tutte le recensioni sul sito ufficiale di <strong style={{ color: '#3B82F6' }}>Feedaty</strong>.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button onClick={() => setIsModalOpen(true)} style={{ background: 'white', color: '#3B82F6', padding: '0.875rem 2rem', border: '2px solid #3B82F6', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}>
              Lascia una Recensione
            </button>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {isModalOpen && (
        <div style={{ display: 'flex', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsModalOpen(false)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', maxWidth: '500px', width: '90%', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative' }} onClick={e => e.stopPropagation()}>
                <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9ca3af', lineHeight: 1 }}>×</button>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: '#DBEAFE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem' }}>
                        ⚠️
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Solo Acquisti Verificati</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        Per garantire l'autenticità delle recensioni, solo i clienti che hanno acquistato il prodotto possono lasciare una recensione.
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
                        Dopo l'acquisto riceverai un'email con il link per lasciare la tua recensione verificata.
                    </p>
                    <button onClick={() => setIsModalOpen(false)} style={{ background: '#3B82F6', color: 'white', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
                        Ho capito
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* GUARANTEE */}
      <section className="py-10 bg-white border-t border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-8">Con QGClearSO sei coperto al 100%</h2>
          <div className="flex flex-row justify-center gap-4 md:gap-16">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 md:mb-3">
                <span className="text-lg md:text-xl">🛡️</span>
              </div>
              <h4 className="font-bold text-xs md:text-base">30 Giorni Rimborso</h4>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 md:mb-3">
                <span className="text-lg md:text-xl">🚚</span>
              </div>
              <h4 className="font-bold text-xs md:text-base">Spedizione Gratuita</h4>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-2 md:mb-3">
                <span className="text-lg md:text-xl">💬</span>
              </div>
              <h4 className="font-bold text-xs md:text-base">Supporto Dedicato</h4>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="ordina" style={{ background: '#1E293B', padding: '3rem 0.75rem', color: 'white', position: 'relative' }}>
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '300px', height: '300px', background: '#3B82F6', filter: 'blur(150px)', opacity: 0.1 }}></div>

        <div className="checkout-grid" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left: Product Summary */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Scorte Limitate</h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '2rem' }}>Approfitta dell'offerta del Black Friday prima che finisca</p>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <img src="https://picsum.photos/80/80?random=20" alt="Prod" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Antenna Smart TV Premium</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Include Cavo Premium + Kit Fissaggio</div>
                </div>
              </div>
              <ul style={{ color: '#cbd5e1', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Prezzo Listino</span> <span style={{ textDecoration: 'line-through' }}>€89,99</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Sconto Speciale</span> <span style={{ color: '#3B82F6' }}>-€50,00</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Spedizione</span> <span style={{ color: '#4ADE80' }}>GRATIS</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>
                  <span>Totale</span> <span>€39,99</span>
                </li>
              </ul>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', gap: '10px', alignItems: 'center' }}>
                 <span>🛡️ Garanzia 2 Anni inclusa</span>
              </div>
            </div>
          </div>

          {/* Right: Modern Form */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '1.25rem', color: '#1E293B' }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Checkout Sicuro</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Nessun pagamento anticipato richiesto.</p>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '1rem' }}>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>NOME E COGNOME</label>
                <input required type="text" placeholder="Mario Rossi" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>INDIRIZZO COMPLETO</label>
                <input required type="text" placeholder="Via Roma 123, 20100 Milano" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>CELLULARE</label>
                <input required type="tel" placeholder="+39 333 123 4567" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              {/* Garanzie e Sicurezza */}
              <div style={{ margin: '1rem 0', padding: '1.5rem', background: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: '12px' }}>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>Pagamento alla consegna</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>⚡</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>Spedizione gratuita in 24-48h</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>↺</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>30 giorni per il reso gratuito</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#F59E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>★</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>2 anni di garanzia inclusa</span>
                  </div>
                </div>
              </div>

              <button type="submit" style={{
                width: '100%', padding: '1.2rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
                color: 'white',
                boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
                transition: 'all 0.3s ease'
              }}>
                <span>Conferma Ordine</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`fade-section py-16 bg-slate-50 transition-all duration-700 ${isVisible['faq'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="max-w-3xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Domande Frequenti</h2>
          <div className="space-y-4">
            {[
              { q: "Funziona con tutte le TV?", a: "Sì, funziona con qualsiasi TV dotata di ingresso antenna coassiale (praticamente tutte)." },
              { q: "Devo pagare abbonamenti?", a: "Assolutamente no. Ricevi i canali del digitale terrestre che sono gratuiti per legge." },
              { q: "Quanto è difficile l'installazione?", a: "Facilissima! Basta collegare il cavo alla TV e avviare la ricerca canali. 2 minuti al massimo." },
              { q: "Cosa succede se non sono soddisfatto?", a: "Hai 30 giorni per restituire il prodotto e ricevere un rimborso completo, senza domande. Inoltre, il prodotto è coperto da 2 anni di garanzia." },
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-50"
                >
                  <span className="font-bold text-slate-800 text-lg pr-4">{item.q}</span>
                  <span className={`text-2xl transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}>⌄</span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-5 pt-0 text-slate-600">{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* STICKY CTA */}
      <div className={`fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 p-3 shadow-[0_-5px_20px_rgba(0,0,0,0.15)] z-50 flex items-center justify-between md:justify-center gap-6 transition-transform duration-300 ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="hidden md:block text-slate-900 font-bold text-lg">🔥 Offerta limitata - Solo €39,99!</div>
        <div className="md:hidden flex flex-col">
          <span className="text-xs text-slate-500 line-through">€89,99</span>
          <div className="flex items-baseline gap-1">
            <span className="font-black text-slate-900 text-xl">€39,99</span>
            <span className="text-xs font-bold text-blue-500 bg-blue-100 px-1 rounded">-55%</span>
          </div>
        </div>
        <button onClick={scrollToForm} className="bg-green-500 hover:bg-green-600 text-white font-black py-3 px-8 rounded-lg shadow-lg uppercase tracking-wide">
          ORDINA ORA
        </button>
      </div>

      {/* CSS for fade text animation */}
      <style jsx>{`
        @keyframes fadeText {
          0%, 20% { opacity: 1; }
          25%, 95% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-text {
          opacity: 0;
          animation: fadeText 9s infinite;
        }
      `}</style>
    </div>
  );
}

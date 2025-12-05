'use client';

import React, { useState, useRef, useEffect, ReactNode } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import {
  ArrowRight, CheckCircle2, Zap, Wind, ShieldCheck, Truck, CreditCard, Star,
  PlayCircle, ArrowDown, Moon, RefreshCw, Cpu, Package,
  Gift, ShoppingCart, Menu, Eye, Thermometer, Droplets, Smartphone, Settings,
  Fan, Leaf, Sparkles, UtensilsCrossed, Flower2, Shield, ScanEye, Flame,
  Trophy, Banknote, Timer, Lock, BadgeCheck, Radio, Wallet, MapPin,
  ClipboardEdit, PhoneCall, PackageCheck, Waves, Info
} from 'lucide-react';

// --- CONFIGURAZIONE E STILI INLINE (PER RENDERE IL FILE AUTONOMO) ---
const CustomStyles = () => (
  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;800&family=Syne:wght@400;600;700;800&display=swap');

    :root {
      --font-sans: 'Outfit', sans-serif;
      --font-display: 'Syne', sans-serif;
      --color-brand: #ff5e00;
    }

    body { font-family: var(--font-sans); background-color: #09090b; overflow-x: hidden; }
    h1, h2, h3, h4, .font-display { font-family: var(--font-display); }

    .animate-marquee { animation: marquee 15s linear infinite; }
    .animate-shimmer { animation: shimmer 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    .animate-blob { animation: blob 7s infinite; }
    .animate-scanline { animation: scanline 4s linear infinite; }

    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
    @keyframes blob {
      0% { transform: translate(0px, 0px) scale(1); }
      33% { transform: translate(30px, -50px) scale(1.1); }
      66% { transform: translate(-20px, 20px) scale(0.9); }
      100% { transform: translate(0px, 0px) scale(1); }
    }
    @keyframes scanline { 0% { transform: translateY(-100%); } 100% { transform: translateY(100%); } }

    .glass-panel { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }

    button, a, [role="button"], .cursor-pointer { cursor: pointer; }
  `}</style>
);

// --- COMPONENTI UI INTERNI ---

const ScrollReveal = ({ children, className = "", delay = 0 }: { children: ReactNode, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}>
      {children}
    </div>
  );
};


const CountdownTimer = () => (
  <div className="bg-orange-600 text-white text-xs md:text-sm font-bold py-2 text-center flex justify-center items-center gap-2 sticky top-0 z-50 shadow-lg">
    <Timer className="w-4 h-4 animate-pulse" />
    <span>OFERTA PREMIEROWA 2025: Cena wzrośnie za <span className="inline-block w-12 text-center bg-black/20 rounded ml-1 font-mono">04:12</span></span>
  </div>
);

// --- COMPONENTI PAGINA ---

const Header = ({ scrollToForm }: { scrollToForm: () => void }) => (
  <nav className="sticky top-[32px] z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-4 py-3 w-full shadow-sm">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white font-display font-black text-xl shadow-lg">O</div>
        <div className="flex flex-col leading-none">
           <span className="font-display font-bold text-xl text-zinc-950 tracking-tight">OmniClima<span className="text-orange-600">360</span></span>
           <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-[0.2em]">Technology</span>
        </div>
      </div>
      <button onClick={scrollToForm} className="bg-zinc-950 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5 text-sm font-bold">
        <ShoppingCart className="w-4 h-4" />
        <span className="hidden md:inline">ZAMÓW TERAZ</span>
        <span className="md:hidden">ZAMÓW</span>
      </button>
    </div>
  </nav>
);

const ReviewCard = ({ name, role, text, stars = 5 }: { name: string, role: string, text: string, stars?: number }) => (
  <div className="bg-zinc-900 border border-white/10 p-5 rounded-2xl">
    <div className="flex items-center gap-1 mb-3">
      {[...Array(stars)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />)}
    </div>
    <p className="text-zinc-300 text-sm mb-4 leading-relaxed">"{text}"</p>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-500 text-xs">{name.charAt(0)}</div>
      <div>
        <div className="text-white text-sm font-bold">{name}</div>
        <div className="text-zinc-500 text-xs flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500"/> {role}</div>
      </div>
    </div>
  </div>
);

const AccordionItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-4 flex justify-between items-center text-left hover:text-orange-500 transition-colors cursor-pointer">
        <span className="font-bold text-lg text-white">{question}</span>
        <ArrowDown className={`w-5 h-5 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mb-4' : 'max-h-0'}`}>
        <p className="text-zinc-400 text-sm leading-relaxed pr-4">{answer}</p>
      </div>
    </div>
  );
};

export default function OmniClimaPage() {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ fullName: '', fullAddress: '', phone: '' });
  const [submitted, setSubmitted] = useState(false);
  const [viewers, setViewers] = useState(124);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => Math.min(Math.max(prev + Math.floor(Math.random() * 7) - 3, 90), 200));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { fullName, fullAddress, phone } = formState;

    // Network API call
    try {
      const tmfpInput = e.currentTarget.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';

      const params = new URLSearchParams({
        uid: '019a913c-483e-7c52-ba2a-c2435daa4254',
        key: 'df01e23521627b9519a81f',
        offer: '528',
        lp: '528',
        name: fullName,
        tel: phone,
        'street-address': fullAddress,
        ua: navigator.userAgent,
        tmfp: tmfp,
      });

      // Add UTM parameters if present
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');
      const utmCampaign = urlParams.get('utm_campaign');
      const utmContent = urlParams.get('utm_content');
      const utmTerm = urlParams.get('utm_term');

      if (utmSource) params.append('utm_source', utmSource);
      if (utmMedium) params.append('utm_medium', utmMedium);
      if (utmCampaign) params.append('utm_campaign', utmCampaign);
      if (utmContent) params.append('utm_content', utmContent);
      if (utmTerm) params.append('utm_term', utmTerm);

      const response = await fetch('https://offers.supertrendaffiliateprogram.com/forms/api/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      console.log('[Network API] Response status:', response.status);

      router.push('/ty/ty-fb-climate-pl');
    } catch (error) {
      console.error('[Network API] Error:', error);
      router.push('/ty/ty-fb-climate-pl');
    }
  };

  return (
    <>
      {/* Fingerprint Script */}
      <Script
        src="https://offers.supertrendaffiliateprogram.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    <div className="min-h-screen bg-zinc-50 font-sans selection:bg-orange-500 selection:text-white w-full overflow-x-hidden">
      <CustomStyles />
      <CountdownTimer />
      <Header scrollToForm={scrollToForm} />

      {/* --- HERO SECTION --- */}
      <div className="relative bg-zinc-100 pb-12 md:pb-20 overflow-hidden">
        {/* Marquee Bar */}
        <div className="w-full bg-black py-2 overflow-hidden border-b border-zinc-800 relative z-10">
           <div className="flex animate-marquee whitespace-nowrap gap-12 text-xs font-bold text-white uppercase tracking-widest items-center">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Gwarancja Kasko 24 Miesiące</span>
              <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-500"/> Najlepsza Innowacja Tech 2025</span>
              <span className="flex items-center gap-2"><Truck className="w-4 h-4 text-orange-500"/> Darmowa Wysyłka z Warszawy</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> Gwarancja Kasko 24 Miesiące</span>
              <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-yellow-500"/> Najlepsza Innowacja Tech 2025</span>
           </div>
        </div>

        <section className="pt-8 md:pt-16 px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8 items-start">

            {/* COLUMN LEFT: Main Visuals */}
            <div className="md:col-span-7 relative">
                <div className="w-full h-[300px] md:h-[500px] rounded-2xl shadow-2xl bg-white overflow-hidden relative">
                  <Image
                    src="/images/climate/1.png"
                    alt="OmniClima 360 - Design Kosmiczny"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Live Viewers Widget */}
                <div className="mt-4 flex items-center justify-between bg-white border border-zinc-200 p-3 rounded-xl shadow-sm">
                   <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                         <Radio className="w-4 h-4 text-green-600 animate-pulse" />
                      </div>
                      <div>
                         <p className="font-bold text-zinc-900 text-sm"><span className="text-green-600 font-black">{viewers} Użytkowników</span> aktywnych</p>
                         <p className="text-zinc-500 text-xs">Rozważają zakup teraz</p>
                      </div>
                   </div>
                   <div className="bg-red-50 text-red-600 text-xs font-black px-3 py-1 rounded-full border border-red-100 flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-current" /> OSTATNIE SZTUKI
                   </div>
                </div>
            </div>

            {/* COLUMN RIGHT: Copy & Offer */}
            <div className="md:col-span-5 flex flex-col relative z-10">
                <div className="inline-block self-start bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-orange-200">
                  NOWOŚĆ ZIMA 2025
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-black text-zinc-900 mb-4 tracking-tight leading-[0.95]">
                  Definitywny Stop <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">Wysokim Rachunkom.</span>
                </h1>

                <p className="text-lg text-zinc-600 font-medium mb-8 leading-relaxed">
                   Pierwsza wieża klimatyczna <strong className="text-black bg-zinc-200 px-1 rounded">All-in-One z AI</strong>, która doprowadza Twój pokój do idealnej temperatury w 15 minut, zużywając tyle co żarówka.
                </p>

                {/* Feature Bullets */}
                <div className="space-y-3 mb-8">
                   <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-zinc-200">
                      <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <Waves className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-zinc-900">VortexFlow™ 360°</h4>
                         <p className="text-sm text-zinc-600">Technologia turbinowa eliminująca zimne strefy. Równomierne ciepło wszędzie.</p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-zinc-200">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-zinc-900">EcoSmart™ Procesor</h4>
                         <p className="text-sm text-zinc-600">Reguluje moc co milisekundę. Oszczędzasz do 60% na zużyciu.</p>
                      </div>
                   </div>

                   <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-white transition-colors border border-transparent hover:border-zinc-200">
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                         <h4 className="font-bold text-zinc-900">Aktywne Oczyszczanie HEPA</h4>
                         <p className="text-sm text-zinc-600">Usuwa kurz, alergeny i nieprzyjemne zapachy podczas ogrzewania.</p>
                      </div>
                   </div>
                </div>

                {/* OFFER CARD */}
                <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl overflow-hidden relative">
                  <div className="p-6 border-b border-zinc-100">
                    <div className="flex justify-between items-end mb-6">
                       <div>
                          <p className="text-xs font-bold text-zinc-400 uppercase mb-1">Cena Premierowa</p>
                          <div className="flex items-baseline gap-3">
                              <span className="text-6xl font-black text-zinc-900 tracking-tighter">299 zł</span>
                              <span className="text-xl text-zinc-400 line-through font-bold">399 zł</span>
                          </div>
                       </div>
                       <div className="bg-red-600 text-white text-sm font-black px-3 py-1 rounded-lg transform rotate-3 shadow-lg">
                          -50% RABAT
                       </div>
                    </div>

                    <button onClick={scrollToForm} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 text-xl group relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:animate-shimmer"></div>
                        <span>KUP TERAZ</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="text-center text-xs text-zinc-400 mt-3 font-medium flex justify-center items-center gap-1">
                       <Lock className="w-3 h-3" /> Bez przedpłaty. Płacisz przy odbiorze.
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </section>

        {/* Curve Separator */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-zinc-950 to-transparent pointer-events-none"></div>
      </div>

      {/* --- CONTENT SECTIONS (Dark Mode) --- */}
      <div className="bg-zinc-950 text-white relative">

        {/* SECTION 1: PROBLEMA SOLUZIONE */}
        <section className="py-20 px-4 max-w-7xl mx-auto border-b border-white/5">
           <ScrollReveal className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                 <div className="text-orange-600 font-display font-bold text-5xl opacity-20 mb-4 select-none">01</div>
                 <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Przestań marnować miejsce i pieniądze.</h2>
                 <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
                    Grzejnik, wentylator, oczyszczacz, osuszacz. Potrzebowałbyś 4 drogich i nieporęcznych urządzeń.
                    <strong className="text-white block mt-2">OmniClima 360 to definitywne rozwiązanie monolityczne.</strong>
                 </p>
                 <ul className="space-y-4">
                    <li className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
                      <Flame className="text-red-500 w-6 h-6" />
                      <div>
                        <strong className="block text-white">Ceramiczne Ogrzewanie PTC</strong>
                        <span className="text-sm text-zinc-500">Zima: Natychmiastowe ciepło w 3 sekundy.</span>
                      </div>
                    </li>
                    <li className="flex items-center gap-4 bg-white/5 p-4 rounded-lg border border-white/5">
                      <Wind className="text-blue-500 w-6 h-6" />
                      <div>
                        <strong className="block text-white">Wentylacja Vortex</strong>
                        <span className="text-sm text-zinc-500">Lato: Mocna i cicha świeża bryza.</span>
                      </div>
                    </li>
                 </ul>
              </div>
              <div className="w-full h-[400px] rounded-2xl bg-zinc-900/50 border border-orange-500/30 overflow-hidden relative">
                  <Image
                    src="/images/climate/2.png"
                    alt="Porównanie: 4 Urządzenia vs 1 OmniClima"
                    fill
                    className="object-contain"
                  />
                </div>
           </ScrollReveal>
        </section>

        {/* SECTION 2: TECNOLOGIA */}
        <section className="py-20 px-4 max-w-7xl mx-auto border-b border-white/5">
           <ScrollReveal delay={200} className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                 <div className="w-full h-[400px] rounded-2xl bg-zinc-900/50 border border-blue-500/30 overflow-hidden relative">
                  <Image
                    src="/images/climate/3.png"
                    alt="Wykres Przepływu Powietrza"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="order-1 md:order-2">
                 <div className="text-blue-600 font-display font-bold text-5xl opacity-20 mb-4 select-none">02</div>
                 <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Inteligentna Moc.</h2>
                 <p className="text-zinc-400 text-lg mb-8">
                    W przeciwieństwie do klasycznych grzejników, które "spalają" powietrze, OmniClima używa płyt z <strong className="text-blue-400">Kosmicznej Ceramiki PTC</strong>.
                    Ciepło jest miękkie, otulające i nie wysusza gardła.
                 </p>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-900/20 border border-blue-500/20 p-5 rounded-xl text-center">
                       <h3 className="text-3xl font-bold text-white mb-1">3s</h3>
                       <p className="text-xs text-blue-300 uppercase font-bold">Natychmiastowe Ogrzewanie</p>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-500/20 p-5 rounded-xl text-center">
                       <h3 className="text-3xl font-bold text-white mb-1">25dB</h3>
                       <p className="text-xs text-blue-300 uppercase font-bold">Ultra Cichy</p>
                    </div>
                 </div>
              </div>
           </ScrollReveal>
        </section>

        {/* SECTION 3: SALUTE E PURIFICAZIONE */}
        <section className="py-20 px-4 max-w-7xl mx-auto">
           <ScrollReveal delay={200} className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Czyste powietrze, <span className="text-green-500">zdrowe płuca.</span></h2>
              <p className="text-zinc-400 text-lg">
                 Zimowe domy są 5 razy bardziej zanieczyszczone niż na zewnątrz. Wbudowany filtr HEPA pracuje cicho, chroniąc Twoją rodzinę.
              </p>
           </ScrollReveal>

           <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-green-500/50 transition-all">
                 <Leaf className="w-10 h-10 text-green-500 mb-4" />
                 <h3 className="text-xl font-bold mb-2">Anty-Alergenowy</h3>
                 <p className="text-zinc-400 text-sm">Wyłapuje 99,9% pyłków, kurzu i roztoczy. Idealny dla alergików.</p>
              </div>
              <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-purple-500/50 transition-all">
                 <UtensilsCrossed className="w-10 h-10 text-purple-500 mb-4" />
                 <h3 className="text-xl font-bold mb-2">Stop Zapachom Kuchni</h3>
                 <p className="text-zinc-400 text-sm">Filtr węglowy neutralizuje zapachy smażenia i dymu w kilka minut.</p>
              </div>
              <div className="bg-zinc-900 border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-blue-500/50 transition-all">
                 <Droplets className="w-10 h-10 text-blue-500 mb-4" />
                 <h3 className="text-xl font-bold mb-2">Osusza</h3>
                 <p className="text-zinc-400 text-sm">Zapobiega powstawaniu pleśni i skraplaniu na oknach podczas ogrzewania.</p>
              </div>
           </div>
        </section>
      </div>

      {/* --- SOCIAL PROOF --- */}
      <section className="py-16 px-4 bg-black border-y border-white/10">
         <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Co mówią nasi klienci</h3>
            <div className="grid md:grid-cols-3 gap-6">
               <ReviewCard name="Marek K." role="Zweryfikowany Zakup" text="Byłem sceptyczny co do 'wszystko w jednym', ale ogrzewa mój 30m² salon w 10 minut. Bardzo cichy." />
               <ReviewCard name="Anna W." role="Zweryfikowany Zakup" text="Rachunek za gaz mnie przerażał. Z tym używam go tylko wieczorem tam, gdzie potrzebuję. Wyraźne oszczędności." />
               <ReviewCard name="Dr. Nowak" role="Klient Biznesowy" text="Kupiłem 3 do mojego gabinetu. Czyste powietrze i idealna temperatura dla pacjentów. Bardzo elegancki design." />
            </div>
         </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-16 px-4 bg-zinc-900">
         <div className="max-w-3xl mx-auto">
         <h3 className="text-3xl font-bold text-white mb-8 text-center">Najczęściej Zadawane Pytania</h3>
         <div className="space-y-2">
            <AccordionItem question="Ile naprawdę zużywa?" answer="Dzięki chipowi EcoSmart, po osiągnięciu temperatury (około 15 min), zużycie drastycznie spada do poziomu zwykłej żarówki na utrzymanie." />
            <AccordionItem question="Czy jest głośny w nocy?" answer="Absolutnie nie. Tryb 'Night' redukuje hałas poniżej 25dB i wyłącza wyświetlacz LED, żeby nie zakłócać snu." />
            <AccordionItem question="Jak działa płatność przy odbiorze?" answer="Prosto. Zamawiasz teraz wypełniając formularz. Nic nie płacisz online. Gdy kurier dotrze (w 24/48h), płacisz dokładną kwotę gotówką." />
            <AccordionItem question="Czy wymaga instalacji?" answer="Nie, OmniClima przychodzi gotowe do użycia. Wyjmujesz z pudełka, podłączasz do gniazdka i od razu działa." />
         </div>
         </div>
      </section>

      {/* --- ORDER FORM --- */}
      <section id="order-form" className="py-20 px-4 bg-zinc-950 relative overflow-hidden border-t border-white/10 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="text-center mb-10">
             <span className="bg-orange-600 text-white text-xs font-bold px-4 py-1.5 rounded-full animate-pulse">LIMITOWANA OFERTA</span>
             <h2 className="text-4xl md:text-5xl font-display font-bold text-white mt-4 mb-2">Zamów OmniClima 360</h2>
             <p className="text-zinc-400">Wypełnij formularz, aby otrzymać ofertę za 299 zł</p>
          </div>

          <div className="glass-panel p-6 md:p-10 rounded-3xl shadow-2xl">
             <div ref={formRef}></div>

             {submitted ? (
               <div className="text-center py-10">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Zamówienie Przyjęte!</h3>
                  <p className="text-zinc-300 mb-8">Dziękujemy. Nasz operator wkrótce zadzwoni, aby potwierdzić wysyłkę.</p>
                  <button onClick={() => window.location.reload()} className="text-orange-500 underline">Powrót na stronę główną</button>
               </div>
             ) : (
               <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Hidden fingerprint field */}
                  <input type="hidden" name="tmfp" id="tmfp" />

                  {/* Riepilogo */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 mb-6">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-white font-bold">OmniClima 360™ (Model 2025)</span>
                        <span className="text-orange-500 font-bold text-xl">299 zł</span>
                     </div>
                     <div className="text-xs text-zinc-500 flex flex-col gap-1">
                        <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-green-500"/> Ubezpieczona Wysyłka w Cenie</span>
                        <span className="flex items-center gap-1"><Gift className="w-3 h-3 text-purple-500"/> Dodatkowy Filtr HEPA Gratis</span>
                     </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Imię i Nazwisko</label>
                        <input name="fullName" required placeholder="Np: Jan Kowalski" onChange={handleInputChange} className="w-full bg-black/40 border border-zinc-700 rounded-xl px-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" />
                    </div>

                    <div>
                       <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Adres i Miasto</label>
                       <textarea name="fullAddress" required rows={2} placeholder="Np: ul. Warszawska 10, Kraków" onChange={handleInputChange} className="w-full bg-black/40 border border-zinc-700 rounded-xl px-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all resize-none" />
                    </div>

                    <div>
                       <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Numer Telefonu</label>
                       <input name="phone" type="tel" required placeholder="Np: +48 123 456 789" onChange={handleInputChange} className="w-full bg-black/40 border border-zinc-700 rounded-xl px-4 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" />
                       <p className="text-[10px] text-zinc-500 mt-1 ml-1">*Ważne dla kuriera</p>
                    </div>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex gap-3 items-center">
                     <Wallet className="w-6 h-6 text-yellow-500 shrink-0" />
                     <p className="text-sm text-zinc-300 leading-tight">Bezpieczna płatność <strong>gotówką przy odbiorze</strong>. Karta nie jest wymagana.</p>
                  </div>

                  <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-display font-bold py-5 rounded-xl text-xl shadow-lg shadow-orange-600/30 transition-all flex items-center justify-center gap-2 group">
                     POTWIERDŹ ZAMÓWIENIE
                     <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform"/>
                  </button>
               </form>
             )}
          </div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950 border-t border-white/10 p-4 pb-6 shadow-2xl">
         <button onClick={scrollToForm} className="w-full bg-white text-black font-bold py-3.5 rounded-xl flex justify-between items-center px-6 shadow-lg active:scale-95 transition-transform">
            <span className="flex flex-col text-left leading-none">
               <span className="text-sm">ZAMÓW TERAZ</span>
               <span className="text-[10px] text-zinc-500">Płacisz przy odbiorze</span>
            </span>
            <span className="bg-black text-white px-3 py-1 rounded text-lg font-bold">299 zł</span>
         </button>
      </div>
    </div>
    </>
  );
}

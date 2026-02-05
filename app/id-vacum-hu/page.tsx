'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { sendLeadToNetwork } from '@/app/lib/network/api';
import {
  Check,
  X,
  Star,
  ShieldCheck,
  MapPin,
  User,
  Smartphone,
  Package,
  ArrowDown,
  Zap,
  Feather,
  Smile,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// --- UTILS ---

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
};

// --- DATA ---
const PRODUCT_IMAGES = [
  "/images/vacum/1.jpg",
  "/images/vacum/2.jpg",
  "/images/vacum/3.jpg",
  "/images/vacum/4.jpg"
];

// --- COMPONENTS ---

// 1. TOP STRIP
const TopStrip = ({ timeLeft }: { timeLeft: number }) => (
  <div className="bg-red-700 text-white py-3 px-4 text-center sticky top-0 z-40 shadow-md">
    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 text-sm sm:text-base font-bold uppercase tracking-wide">
      <span className="animate-pulse text-yellow-300">KORLÁTOZOTT KÉSZLET</span>
      <span className="hidden sm:inline">|</span>
      <span>A KÜLÖNLEGES AJÁNLAT VÉGET ÉR: {formatTime(timeLeft)}</span>
    </div>
  </div>
);

// 2. STICKY ORDER BUTTON
const StickyOrderButton = ({ visible }: { visible: boolean }) => {
  const handleClick = () => {
    const target = document.getElementById('order-form-start');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-3 bg-white border-t-4 border-orange-500 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]"
      style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-md mx-auto flex items-center gap-3">
        <div className="flex-1">
          <button
            onClick={handleClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold text-xl py-3 rounded-lg shadow-lg uppercase tracking-wide flex flex-col items-center justify-center leading-none"
          >
            <span>KIPRÓBÁLOM (RENDELÉS)</span>
            <span className="text-[11px] mt-1 font-medium bg-green-800 px-3 py-0.5 rounded text-green-100">Készpénzzel fizet a futárnak - Kockázatmentes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. ORDER FORM SECTION
const OrderFormSection = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Kérjük, adja meg a nevét";
    if (!formData.address.trim()) newErrors.address = "A szállításhoz szükségünk van a címre";
    const phoneRegex = /^[\d\s+\-]{8,}$/;
    if (!formData.phone.match(phoneRegex)) newErrors.phone = "Adjon meg érvényes telefonszámot";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);

    // Get UTM params
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get('utm_source') || '';
    const utmMedium = urlParams.get('utm_medium') || '';
    const utmCampaign = urlParams.get('utm_campaign') || '';
    const utmContent = urlParams.get('utm_content') || '';
    const utmTerm = urlParams.get('utm_term') || '';

    // Build params object
    const params: Record<string, string> = {
      uid: '019be502-1631-773c-b833-f6153c79c2cb',
      key: 'cb7c9a2af5b95d10f17a18',
      offer: '1247',
      lp: '1286',
      name: formData.name,
      tel: formData.phone,
      'street-address': formData.address,
    };

    // Add UTM params if present
    if (utmSource) params.utm_source = utmSource;
    if (utmMedium) params.utm_medium = utmMedium;
    if (utmCampaign) params.utm_campaign = utmCampaign;
    if (utmContent) params.utm_content = utmContent;
    if (utmTerm) params.utm_term = utmTerm;

    // Send to network
    await sendLeadToNetwork('https://offers.italiadrop.com/forms/api/', params);

    setIsSubmitting(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  if (isSubmitted) {
    return (
      <div className="py-12 px-4 bg-slate-50 text-center">
        <div className="max-w-lg mx-auto bg-white rounded-xl shadow-xl p-8 border-4 border-green-500">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Köszönjük {formData.name}!</h2>
          <p className="text-xl text-slate-600 mb-6">
            Megkaptuk a kérését.<br/>
            Munkatársunk felhívja a <strong>{formData.phone}</strong> számon a részletek megerősítéséhez.
          </p>
          <button onClick={() => window.location.reload()} className="text-blue-600 font-bold underline text-lg">Vissza a főoldalra</button>
        </div>
      </div>
    );
  }

  return (
    <section id="order" className="py-12 px-4 bg-slate-100">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-slate-300">
          <div className="bg-orange-600 text-white p-4 text-center font-bold text-xl uppercase">
            Rögzítse az akciós árat
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-black text-center text-slate-900 mb-2">Töltse ki az alábbi űrlapot</h3>
            <p className="text-center text-slate-600 mb-6 font-medium text-lg">
              Most nem kérünk pénzt. <br/>
              Készpénzzel fizet közvetlenül a futárnak a csomag átvételekor.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div id="order-form-start" className="h-0 w-0 opacity-0 pointer-events-none scroll-mt-24"></div>

              <div>
                <label className="font-bold text-slate-800 ml-1">Teljes Név</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3.5 text-slate-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Pl. Kovács János"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 p-3 bg-slate-50 border-2 rounded-lg text-lg outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm font-bold mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="font-bold text-slate-800 ml-1">Telefonszám (megerősítéshez)</label>
                <div className="relative mt-1">
                  <Smartphone className="absolute left-3 top-3.5 text-slate-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Pl. +36 30 123 4567"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 p-3 bg-slate-50 border-2 rounded-lg text-lg outline-none focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm font-bold mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="font-bold text-slate-800 ml-1">Szállítási Cím</label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3.5 text-slate-400" size={20} />
                  <input
                    type="text"
                    name="address"
                    placeholder="Utca, Város, Irányítószám"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full pl-10 p-3 bg-slate-50 border-2 rounded-lg text-lg outline-none focus:border-blue-500 ${errors.address ? 'border-red-500' : 'border-slate-300'}`}
                  />
                </div>
                {errors.address && <p className="text-red-500 text-sm font-bold mt-1">{errors.address}</p>}
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-[6px] border-green-600 bg-white shrink-0"></div>
                <div>
                    <span className="font-bold text-slate-900 block">Fizetés átvételkor</span>
                    <span className="text-sm text-slate-600">Bankkártya nem szükséges.</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-4 shadow-lg border-b-4 border-orange-800 active:scale-95 transition-transform mt-4"
              >
                <span className="block text-2xl font-black uppercase">MEGRENDELEM</span>
                <span className="block text-orange-100 text-sm font-medium">Kattintson a cím megerősítéséhez</span>
              </button>

              <p className="text-sm text-center text-slate-500 mt-2 flex items-center justify-center gap-1">
                <ShieldCheck size={16} /> Az Ön adatai biztonságban vannak és nem kerülnek megosztásra.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(3600 * 2 + 15 * 60);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showStickyButton, setShowStickyButton] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const orderSection = document.getElementById('order');
    if (!orderSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyButton(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(orderSection);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('order-form-start');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
  };

  return (
    <>
      {/* Fingerprint Script */}
      <Script
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Click Pixel */}
      <img
        src="https://offers.italiadrop.com/forms/api/ck/?o=1247&uid=019be502-1631-773c-b833-f6153c79c2cb&lp=1286"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      <div className="bg-white font-sans text-slate-900 pb-40">

        {/* 1. TOP STRIP */}
        <TopStrip timeLeft={timeLeft} />

        {/* 2. HERO SECTION */}
        <section className="pt-8 pb-8 px-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-400">
              {[1,2,3,4,5].map(i => <Star key={i} size={22} fill="currentColor" />)}
            </div>
            <span className="font-bold text-slate-600 text-sm uppercase tracking-wide">Több mint 2000 elégedett vásárló</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-4 text-slate-900">
            Ne gyötrődjön többé a padló takarításával.
          </h1>
          <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
            Itt a könnyű porszívó, ami megkíméli a hátát. Vezeték nélküli, erős és egyszerűen kezelhető akár egy kézzel is.
          </p>

          {/* --- PRODUCT IMAGE SLIDER --- */}
          <div className="mb-8 overflow-hidden">
              <div className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                      src={PRODUCT_IMAGES[currentImageIndex]}
                      alt={`Porszívó nézet ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-300"
                  />

                  {/* Navigation Arrows */}
                  <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md backdrop-blur-sm transition-colors"
                      aria-label="Előző"
                  >
                      <ChevronLeft size={32} strokeWidth={2.5} />
                  </button>
                  <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md backdrop-blur-sm transition-colors"
                      aria-label="Következő"
                  >
                      <ChevronRight size={32} strokeWidth={2.5} />
                  </button>

                  {/* Counter Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                      {currentImageIndex + 1} / {PRODUCT_IMAGES.length}
                  </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide justify-center px-1">
                  {PRODUCT_IMAGES.map((img, idx) => (
                      <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                              currentImageIndex === idx ? 'border-orange-500 opacity-100 ring-2 ring-orange-200' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                      >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                  ))}
              </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div>
                  <p className="text-slate-500 font-bold uppercase text-sm mb-1">Eredeti ár: <span className="line-through text-red-500">39 900 Ft</span></p>
                  <p className="text-4xl sm:text-5xl font-black text-slate-900">26 500 Ft</p>
              </div>
              <div className="bg-yellow-300 text-yellow-900 font-bold px-4 py-2 rounded-lg uppercase text-sm shadow-sm">
                  Az ajánlat ma érvényes
              </div>
            </div>

            <ul className="space-y-4 mb-8 text-left">
              <li className="flex items-start gap-3 text-lg font-medium text-slate-800">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><Feather size={20} /></div>
                  <span><strong>Ultra könnyű:</strong> Olyan könnyű, mint egy vizes palack, nem fárasztja a karját.</span>
              </li>
              <li className="flex items-start gap-3 text-lg font-medium text-slate-800">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><Zap size={20} /></div>
                  <span><strong>Vezeték nélküli:</strong> Szabadon mozoghat anélkül, hogy belegabalyodna a kábelbe.</span>
              </li>
              <li className="flex items-start gap-3 text-lg font-medium text-slate-800">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><Check size={20} /></div>
                  <span><strong>Erős:</strong> Az első áthaladásra felszívja a morzsákat és a szőrt.</span>
              </li>
              <li className="flex items-start gap-3 text-lg font-medium text-slate-800">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><X size={20} /></div>
                  <span><strong>Higiénikus:</strong> A port kiürítheti anélkül, hogy kézzel hozzáérne.</span>
              </li>
            </ul>

            <button
              onClick={scrollToForm}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold text-2xl py-5 rounded-xl shadow-lg border-b-4 border-green-800 active:scale-95 transition-all uppercase"
            >
              KIPRÓBÁLOM
              <span className="block text-sm font-bold text-green-100 mt-1 uppercase">Előleg nélkül</span>
            </button>
          </div>
        </section>

        {/* 3. PROBLEM SECTION */}
        <section className="bg-slate-100 py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-6 text-slate-900 leading-tight">
              Miért szenvedne tovább?
            </h2>
            <p className="text-xl text-slate-600 mb-10 font-medium">
              A régi, nehéz porszívó használata rémálom a hátnak.
            </p>

            <div className="space-y-4 text-left">
              <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0"><ArrowDown size={24} /></div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Elég a súlyok cipelésből</h3>
                    <p className="text-slate-600">A nehéz porszívó szobáról szobára húzása nem tesz jót az egészségnek. Ezzel a porszívóval mindent egy kézzel elvégez.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0"><X size={24} /></div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Elég a kábelekből a lába alatt</h3>
                    <p className="text-slate-600">Hányszor kell konnektort váltania vagy kockáztatja, hogy megbotlik? Itt nincs kábel, ami zavarná.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0"><X size={24} /></div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">A takarítás nem kell, hogy kényelmetlen legyen</h3>
                    <p className="text-slate-600">Az ágy vagy a kanapé alá hajolni fárasztó. A mi porszívónk mindenhová beférkőzik erőfeszítés nélkül.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SOLUTION / BENEFITS */}
        <div className="space-y-4 max-w-2xl mx-auto px-4 py-12">

          <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Egyszerű megoldás a tiszta otthonhoz.</h2>
              <p className="text-lg text-slate-600">Eltávolítottunk mindent, ami zavar (súly, kábelek, zsákok) és csak az erőt hagytuk meg.</p>
          </div>

          <section className="py-8 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Feather size={28}/></div>
              <h3 className="text-2xl font-black text-slate-900">KÖNNYŰ (CSAK 1,5 KG)</h3>
            </div>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              Olyan könnyű, hogy észre sem veszi, hogy a kezében tartja. Takaríthat lépcsőn, függönyöket vagy eltávolíthatja a pókhálókat a plafonról anélkül, hogy öt perc után fájna a karja.
            </p>
          </section>

          <section className="py-8 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Zap size={28}/></div>
              <h3 className="text-2xl font-black text-slate-900">TELJES SZABADSÁG</h3>
            </div>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              Bekapcsolja és megy, ahova akar. A konyhából a nappaliba, a fürdőszobából a hálószobába. Az akkumulátor elég az egész ház nyugodt kitakarításához, anélkül, hogy aggódna, hogy lemerül.
            </p>
          </section>

          <section className="py-8 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Check size={28}/></div>
              <h3 className="text-2xl font-black text-slate-900">MÉLYTISZTÍTÁS</h3>
            </div>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              Bár könnyű, a motor erős. Egyetlen áthaladással felszívja a port, kenyérmorzsát és állatszőrt. Időt takarít meg, mert nem kell kétszer végigmenni.
            </p>
          </section>

        </div>

        {/* 5. HOW IT WORKS */}
        <section className="py-12 px-4 max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-xl mb-12">
          <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">Hogyan működik a gyakorlatban?</h3>
          <p className="text-lg text-slate-700 mb-6 text-center">
            Úgy tervezték, hogy bárki használhassa, bonyolult utasítások olvasása nélkül:
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="font-black text-slate-300 text-4xl leading-none">1</div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Kiveszi a dobozból</p>
                <p className="text-slate-600">Szinte használatra készen érkezik.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-black text-slate-300 text-4xl leading-none">2</div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Megnyomja a gombot</p>
                <p className="text-slate-600">Nem kell az ujjával lenyomva tartani. Egyetlen kattintás és már szív is.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-black text-slate-300 text-4xl leading-none">3</div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Egyetlen kattintással kiüríti</p>
                <p className="text-slate-600">Ha végzett, kinyitja a tartályt közvetlenül a szemétkosár felett. Nem piszkítja be a kezét.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. OFFER SUMMARY CARD */}
        <section className="px-4 mb-12 max-w-2xl mx-auto">
          <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">Villámajánlat</div>

            <h3 className="text-xl font-black text-slate-900 mb-6 uppercase flex items-center gap-2">
              <Package size={24}/> Mit kap haza:
            </h3>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 font-medium text-slate-800"><Check className="text-green-600"/> <strong>1x Vezeték nélküli Porszívó</strong></li>
              <li className="flex items-center gap-2 font-medium text-slate-800"><Check className="text-green-600"/> <strong>1x Hosszú élettartamú Akkumulátor</strong></li>
              <li className="flex items-center gap-2 font-medium text-slate-800"><Check className="text-green-600"/> <strong>1x Gyorstöltő</strong></li>
              <li className="flex items-center gap-2 font-medium text-slate-800"><Check className="text-green-600"/> <strong>1x Kiegészítő készlet (Ajándék)</strong></li>
            </ul>

            <div className="flex justify-between items-end border-t border-yellow-200 pt-4 mb-6">
              <span className="text-slate-500 font-bold uppercase text-sm">Végső Ár</span>
              <div className="text-right">
                <div className="text-red-500 font-bold line-through text-lg">39 900 Ft</div>
                <div className="text-3xl font-black text-slate-900">26 500 Ft</div>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl py-4 rounded-lg shadow uppercase"
            >
              Igen, kipróbálom &rarr;
            </button>
            <p className="text-center text-sm text-slate-600 mt-2">Fizetés átvételkor, kockázatmentes.</p>
          </div>
        </section>

        {/* 7. REVIEWS */}
        <section className="bg-slate-50 py-16 px-4">
          <h2 className="text-2xl font-black text-center mb-10 text-slate-900">Akik már kipróbálták</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              { n: "Kovács Mária, 62 éves", t: "Megmentő a hátamnak. A régi porszívó használhatatlanná vált. Ez szuper könnyű, minden nap használom akár csak a morzsákhoz is. Soha nem mennék vissza a régihez." },
              { n: "Nagy András, 55 éves", t: "Szkeptikus voltam, mert nem egy TV-ben reklámozott márka, de meglepett. Remekül szedi fel a kutyám szőrét és az akkumulátor sokáig bírja. Kiváló vétel." },
              { n: "Szabó Anna, 68 éves", t: "Két emeleten élve a kábeles porszívó cipelése rémálom volt. Ezzel pillanatok alatt megcsinálom a lépcsőt. Nagyon ajánlom." }
            ].map((rev, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[1,2,3,4,5].map(x => <Star key={x} size={18} fill="currentColor"/>)}
                </div>
                <p className="text-slate-700 italic mb-4 text-lg leading-relaxed">"{rev.t}"</p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 text-sm"><User size={20}/></div>
                    <div>
                      <p className="font-bold text-slate-900">{rev.n}</p>
                      <p className="text-xs text-green-600 font-bold flex items-center gap-1"><ShieldCheck size={12}/> Ellenőrzött Vásárlás</p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. GUARANTEE */}
        <section className="py-12 px-4 max-w-3xl mx-auto border-t border-slate-200">
          <h2 className="text-2xl font-black text-center mb-8">VÁSÁROLJON NYUGODTAN</h2>
          <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><ShieldCheck size={32}/></div>
                  <div>
                      <h3 className="font-bold text-lg text-slate-900">2 év Garancia</h3>
                      <p className="text-slate-600 text-sm">Ha elromlik, mi intézzük. Magyar nyelvű ügyfélszolgálatunk van.</p>
                  </div>
              </div>
              <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><Smile size={32}/></div>
                  <div>
                      <h3 className="font-bold text-lg text-slate-900">Elégedettség vagy Pénzvisszafizetés</h3>
                      <p className="text-slate-600 text-sm">30 napja van kipróbálni otthon. Ha nem elégedett, visszaadjuk a pénzét.</p>
                  </div>
              </div>
          </div>
        </section>

        {/* 9. HOW TO ORDER */}
        <section className="bg-slate-800 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-black mb-10">HOGYAN RENDELJEN?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-slate-700 p-6 rounded-xl border border-slate-600">
                      <div className="text-4xl font-black mb-3 text-slate-400">1</div>
                      <h3 className="font-bold text-lg mb-2">Töltse ki az űrlapot</h3>
                      <p className="text-slate-300 text-sm">Adja meg nevét és telefonszámát alább. Bankkártya nem szükséges.</p>
                  </div>
                  <div className="bg-slate-700 p-6 rounded-xl border border-slate-600">
                      <div className="text-4xl font-black mb-3 text-slate-400">2</div>
                      <h3 className="font-bold text-lg mb-2">Mi felhívjuk</h3>
                      <p className="text-slate-300 text-sm">Munkatársunk felveszi a kapcsolatot a szállítás megerősítéséhez és kérdések megválaszolásához.</p>
                  </div>
                  <div className="bg-slate-700 p-6 rounded-xl border border-slate-600">
                      <div className="text-4xl font-black mb-3 text-slate-400">3</div>
                      <h3 className="font-bold text-lg mb-2">Fizet a futárnak</h3>
                      <p className="text-slate-300 text-sm">Csak akkor fizet készpénzzel, amikor megkapja a csomagot otthon. Nulla kockázat.</p>
                  </div>
              </div>
          </div>
        </section>

        {/* 10. FORM SECTION */}
        <OrderFormSection />

        {/* 11. FAQ */}
        <section className="pt-8 pb-20 px-4 max-w-2xl mx-auto">
          <h2 className="text-xl font-black text-center mb-6 uppercase">Kételyei vagy kérdései vannak?</h2>
          <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-900 mb-2 text-lg">Vannak rejtett költségek vagy előfizetések?</p>
                <p className="text-slate-600">
                  Egyáltalán nem. Csak a porszívó árát (26 500 Ft) fizeti egyszer. A szállítás ingyenes. Soha nem fogunk több pénzt kérni.
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-900 mb-2 text-lg">Beszélhetek valakivel, ha problémám van?</p>
                <p className="text-slate-600">
                  Természetesen. Van ügyfélszolgálatunk, amely bármilyen kérdésben készen áll segíteni, a vásárlás után is.
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-900 mb-2 text-lg">Ha kitöltöm az űrlapot, kötelező megvennem?</p>
                <p className="text-slate-600">
                  Nem. Az űrlap kitöltése csak az ajánlat rögzítésére szolgál. Amikor felhívjuk, felteheti az összes kérdését és szabadon dönthet.
                </p>
              </div>
          </div>
        </section>

      </div>

      {/* STICKY BUTTON */}
      <StickyOrderButton visible={showStickyButton} />
    </>
  );
}

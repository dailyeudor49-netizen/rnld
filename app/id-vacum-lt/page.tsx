'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
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
  "/images/vacum/1.webp",
  "/images/vacum/2.webp",
  "/images/vacum/3.webp",
  "/images/vacum/4.webp"
];

// --- COMPONENTS ---

// 1. TOP STRIP
const TopStrip = ({ timeLeft }: { timeLeft: number }) => (
  <div className="bg-red-700 text-white py-3 px-4 text-center sticky top-0 z-40 shadow-md">
    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 text-sm sm:text-base font-bold uppercase tracking-wide">
      <span className="animate-pulse text-yellow-300">RIBOTAS KIEKIS</span>
      <span className="hidden sm:inline">|</span>
      <span>SPECIALUS PASIŪLYMAS BAIGIASI PO: {formatTime(timeLeft)}</span>
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
            <span>NORIU IŠBANDYTI (UŽSAKYTI)</span>
            <span className="text-[11px] mt-1 font-medium bg-green-800 px-3 py-0.5 rounded text-green-100">Mokate grynais kurjeriui - Be rizikos</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. ORDER FORM SECTION
const OrderFormSection = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Prašome įvesti savo vardą";
    if (!formData.address.trim()) newErrors.address = "Reikia adreso pristatymui";
    const phoneRegex = /^[\d\s+\-]{8,}$/;
    if (!formData.phone.match(phoneRegex)) newErrors.phone = "Įveskite teisingą telefono numerį";
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
      offer: '653',
      lp: '687',
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

    router.push('/ty/ty-id-vacum-lt');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <section id="order" className="py-12 px-4 bg-slate-100">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-slate-300">
          <div className="bg-orange-600 text-white p-4 text-center font-bold text-xl uppercase">
            Užfiksuokite akcijos kainą
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-black text-center text-slate-900 mb-2">Užpildykite formą žemiau</h3>
            <p className="text-center text-slate-600 mb-6 font-medium text-lg">
              Dabar pinigų neimame. <br/>
              Mokėsite grynais tiesiogiai kurjeriui pristatymo metu.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">

              <div id="order-form-start" className="h-0 w-0 opacity-0 pointer-events-none scroll-mt-24"></div>

              <div>
                <label className="font-bold text-slate-800 ml-1">Vardas ir Pavardė</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3.5 text-slate-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Pvz. Jonas Jonaitis"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 p-3 bg-slate-50 border-2 rounded-lg text-lg outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm font-bold mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="font-bold text-slate-800 ml-1">Telefonas (patvirtinimui)</label>
                <div className="relative mt-1">
                  <Smartphone className="absolute left-3 top-3.5 text-slate-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Pvz. +370 612 34567"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 p-3 bg-slate-50 border-2 rounded-lg text-lg outline-none focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm font-bold mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="font-bold text-slate-800 ml-1">Pristatymo Adresas</label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3.5 text-slate-400" size={20} />
                  <input
                    type="text"
                    name="address"
                    placeholder="Gatvė, Miestas, Pašto kodas"
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
                    <span className="font-bold text-slate-900 block">Mokėjimas pristatymo metu</span>
                    <span className="text-sm text-slate-600">Kredito kortelė nereikalinga.</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-4 shadow-lg border-b-4 border-orange-800 active:scale-95 transition-transform mt-4"
              >
                <span className="block text-2xl font-black uppercase">NORIU GAUTI</span>
                <span className="block text-orange-100 text-sm font-medium">Spustelėkite, kad patvirtintumėte adresą</span>
              </button>

              <p className="text-sm text-center text-slate-500 mt-2 flex items-center justify-center gap-1">
                <ShieldCheck size={16} /> Jūsų duomenys yra saugūs ir nebus dalijami.
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
        src="https://offers.italiadrop.com/forms/api/ck/?o=653&uid=019be502-1631-773c-b833-f6153c79c2cb&lp=687"
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
            <span className="font-bold text-slate-600 text-sm uppercase tracking-wide">Daugiau nei 2000 patenkintų klientų</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-4 text-slate-900">
            Nustokite vargti valydami grindis.
          </h1>
          <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
            Štai lengvas dulkių siurblys, kuris tausoja jūsų nugarą. Belaidis, galingas ir lengvai valdomas net viena ranka.
          </p>

          {/* --- PRODUCT IMAGE SLIDER --- */}
          <div className="mb-8 overflow-hidden">
              <div className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden shadow-lg border border-slate-200">
                  <img
                      src={PRODUCT_IMAGES[currentImageIndex]}
                      alt={`Dulkių siurblys vaizdas ${currentImageIndex + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-300"
                  />

                  {/* Navigation Arrows */}
                  <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md backdrop-blur-sm transition-colors"
                      aria-label="Ankstesnis"
                  >
                      <ChevronLeft size={32} strokeWidth={2.5} />
                  </button>
                  <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md backdrop-blur-sm transition-colors"
                      aria-label="Kitas"
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
                  <p className="text-slate-500 font-bold uppercase text-sm mb-1">Įprasta kaina: <span className="line-through text-red-500">219 €</span></p>
                  <p className="text-4xl sm:text-5xl font-black text-slate-900">89 €</p>
              </div>
              <div className="bg-yellow-300 text-yellow-900 font-bold px-4 py-2 rounded-lg uppercase text-sm shadow-sm">
                  Pasiūlymas galioja šiandien
              </div>
            </div>

            <ul className="space-y-4 mb-8 text-left">
              <li className="flex items-start gap-3 text-lg font-medium text-slate-800">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><Feather size={20} /></div>
                  <span><strong>Ultra lengvas:</strong> Sveria kaip vandens butelis, nevargina rankų.</span>
              </li>
              <li className="flex items-start gap-3 text-lg font-medium text-slate-800">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><Zap size={20} /></div>
                  <span><strong>Belaidis:</strong> Judėkite laisvai nesipainodami kabelyje.</span>
              </li>
              <li className="flex items-start gap-3 text-lg font-medium text-slate-800">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><Check size={20} /></div>
                  <span><strong>Galingas:</strong> Surenka trupinius ir plaukus pirmu praėjimu.</span>
              </li>
              <li className="flex items-start gap-3 text-lg font-medium text-slate-800">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><X size={20} /></div>
                  <span><strong>Higieniškas:</strong> Ištuštinate dulkes neliesdami jų rankomis.</span>
              </li>
            </ul>

            <button
              onClick={scrollToForm}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold text-2xl py-5 rounded-xl shadow-lg border-b-4 border-green-800 active:scale-95 transition-all uppercase"
            >
              NORIU IŠBANDYTI
              <span className="block text-sm font-bold text-green-100 mt-1 uppercase">Be išankstinio mokėjimo</span>
            </button>
          </div>
        </section>

        {/* 3. PROBLEM SECTION */}
        <section className="bg-slate-100 py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-6 text-slate-900 leading-tight">
              Kodėl toliau vargti?
            </h2>
            <p className="text-xl text-slate-600 mb-10 font-medium">
              Naudoti seną, sunkų dulkių siurblį - tai košmaras nugarai.
            </p>

            <div className="space-y-4 text-left">
              <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0"><ArrowDown size={24} /></div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Baigta tampyti svorius</h3>
                    <p className="text-slate-600">Tempti sunkų siurblį iš kambario į kambarį nėra gerai sveikatai. Su šiuo siurbliu viską darote viena ranka.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0"><X size={24} /></div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Baigta su kabeliais po kojomis</h3>
                    <p className="text-slate-600">Kiek kartų turite keisti rozetę ar rizikuojate užkliūti? Čia nėra jokio kabelio, kuris trukdytų.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0"><X size={24} /></div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Valymas neturi būti nepatogus</h3>
                    <p className="text-slate-600">Lenkiasi, kad išvalytumėte po lova ar sofa, yra varginantis. Mūsų siurblys patenka visur be pastangų.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SOLUTION / BENEFITS */}
        <div className="space-y-4 max-w-2xl mx-auto px-4 py-12">

          <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-4">Paprastas sprendimas švariam namui.</h2>
              <p className="text-lg text-slate-600">Pašalinome viską, kas trukdo (svorį, kabelius, maišelius) ir palikome tik galią.</p>
          </div>

          <section className="py-8 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Feather size={28}/></div>
              <h3 className="text-2xl font-black text-slate-900">LENGVAS (TIK 1,5 KG)</h3>
            </div>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              Jis toks lengvas, kad net nepastebėsite, jog laikote jį rankoje. Galite valyti laiptus, užuolaidas ar šalinti voratinklius nuo lubų be rankų skausmo po penkių minučių.
            </p>
          </section>

          <section className="py-8 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Zap size={28}/></div>
              <h3 className="text-2xl font-black text-slate-900">VISIŠKA LAISVĖ</h3>
            </div>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              Įjungiate ir einate kur norite. Iš virtuvės į svetainę, iš vonios į miegamąjį. Baterija pakanka išvalyti visus namus ramiai, be streso, kad išsijungs.
            </p>
          </section>

          <section className="py-8 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Check size={28}/></div>
              <h3 className="text-2xl font-black text-slate-900">GILUS VALYMAS</h3>
            </div>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              Nors jis lengvas, variklis galingas. Surenka dulkes, duonos trupinius ir gyvūnų plaukus vienu praėjimu. Taupote laiką, nes nereikia praeiti du kartus.
            </p>
          </section>

        </div>

        {/* 5. HOW IT WORKS */}
        <section className="py-12 px-4 max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-xl mb-12">
          <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">Kaip tai veikia praktiškai?</h3>
          <p className="text-lg text-slate-700 mb-6 text-center">
            Sukurtas naudoti bet kam, neskaitant sudėtingų instrukcijų:
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="font-black text-slate-300 text-4xl leading-none">1</div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Išimate iš dėžės</p>
                <p className="text-slate-600">Ateina beveik paruoštas naudoti.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-black text-slate-300 text-4xl leading-none">2</div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Paspaudžiate mygtuką</p>
                <p className="text-slate-600">Nereikia laikyti nuspaudus pirštu. Pakanka vieno paspaudimo ir jis siurbia.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-black text-slate-300 text-4xl leading-none">3</div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Ištuštinate vienu paspaudimu</p>
                <p className="text-slate-600">Baigę atidarote konteinerį tiesiai virš šiukšliadėžės. Nesusiteršiate rankų.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. OFFER SUMMARY CARD */}
        <section className="px-4 mb-12 max-w-2xl mx-auto">
          <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">Žaibo Pasiūlymas</div>

            <h3 className="text-xl font-black text-slate-900 mb-6 uppercase flex items-center gap-2">
              <Package size={24}/> Ką gausite į namus:
            </h3>

            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 font-medium text-slate-800"><Check className="text-green-600"/> <strong>1x Belaidis Dulkių Siurblys</strong></li>
              <li className="flex items-center gap-2 font-medium text-slate-800"><Check className="text-green-600"/> <strong>1x Ilgaamžė Baterija</strong></li>
              <li className="flex items-center gap-2 font-medium text-slate-800"><Check className="text-green-600"/> <strong>1x Greitas Kroviklis</strong></li>
              <li className="flex items-center gap-2 font-medium text-slate-800"><Check className="text-green-600"/> <strong>1x Priedų Rinkinys (Dovana)</strong></li>
            </ul>

            <div className="flex justify-between items-end border-t border-yellow-200 pt-4 mb-6">
              <span className="text-slate-500 font-bold uppercase text-sm">Galutinė Kaina</span>
              <div className="text-right">
                <div className="text-red-500 font-bold line-through text-lg">219 €</div>
                <div className="text-3xl font-black text-slate-900">89 €</div>
              </div>
            </div>

            <button
              onClick={scrollToForm}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl py-4 rounded-lg shadow uppercase"
            >
              Taip, noriu išbandyti &rarr;
            </button>
            <p className="text-center text-sm text-slate-600 mt-2">Mokėjimas pristatymo metu, be rizikos.</p>
          </div>
        </section>

        {/* 7. REVIEWS */}
        <section className="bg-slate-50 py-16 px-4">
          <h2 className="text-2xl font-black text-center mb-10 text-slate-900">Kas jau išbandė</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              { n: "Marija K., 62 metai", t: "Išsigelbėjimas mano nugarai. Senas siurblys tapo neįmanomas naudoti. Šitas super lengvas, naudoju kasdien net trupiniams surinkti. Niekada negrįžčiau prie senojo." },
              { n: "Andrius R., 55 metai", t: "Buvau skeptiškas, nes tai ne televizijos reklamos prekės ženklas, bet mane nustebino. Puikiai renka mano šuns plaukus, o baterija laiko ilgai. Puikus pirkinys." },
              { n: "Ona B., 68 metai", t: "Gyvendama dviejuose aukštuose, nešioti siurblį su laidu buvo košmaras. Su šiuo laiptus padarau akimirksniu. Labai rekomenduoju." }
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
                      <p className="text-xs text-green-600 font-bold flex items-center gap-1"><ShieldCheck size={12}/> Patvirtintas Pirkinys</p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. GUARANTEE */}
        <section className="py-12 px-4 max-w-3xl mx-auto border-t border-slate-200">
          <h2 className="text-2xl font-black text-center mb-8">PIRKITE BE RŪPESČIŲ</h2>
          <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><ShieldCheck size={32}/></div>
                  <div>
                      <h3 className="font-bold text-lg text-slate-900">2 metų Garantija</h3>
                      <p className="text-slate-600 text-sm">Jei sugenda, mes pasirūpinsime. Turime klientų aptarnavimą lietuvių kalba.</p>
                  </div>
              </div>
              <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><Smile size={32}/></div>
                  <div>
                      <h3 className="font-bold text-lg text-slate-900">Pasitenkinimas arba Pinigų Grąžinimas</h3>
                      <p className="text-slate-600 text-sm">Turite 30 dienų išbandyti namuose. Jei nebūsite patenkinti, grąžinsime pinigus.</p>
                  </div>
              </div>
          </div>
        </section>

        {/* 9. HOW TO ORDER */}
        <section className="bg-slate-800 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-black mb-10">KAIP UŽSAKYTI?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-slate-700 p-6 rounded-xl border border-slate-600">
                      <div className="text-4xl font-black mb-3 text-slate-400">1</div>
                      <h3 className="font-bold text-lg mb-2">Užpildykite formą</h3>
                      <p className="text-slate-300 text-sm">Įveskite savo vardą ir telefoną žemiau. Kredito kortelė nereikalinga.</p>
                  </div>
                  <div className="bg-slate-700 p-6 rounded-xl border border-slate-600">
                      <div className="text-4xl font-black mb-3 text-slate-400">2</div>
                      <h3 className="font-bold text-lg mb-2">Mes jums paskambinsime</h3>
                      <p className="text-slate-300 text-sm">Mūsų konsultantas susisieks, kad patvirtintų siuntimą ir atsakytų į klausimus.</p>
                  </div>
                  <div className="bg-slate-700 p-6 rounded-xl border border-slate-600">
                      <div className="text-4xl font-black mb-3 text-slate-400">3</div>
                      <h3 className="font-bold text-lg mb-2">Mokate kurjeriui</h3>
                      <p className="text-slate-300 text-sm">Mokate grynais tik gavę siuntinį namuose. Jokios rizikos.</p>
                  </div>
              </div>
          </div>
        </section>

        {/* 10. FORM SECTION */}
        <OrderFormSection />

        {/* 11. FAQ */}
        <section className="pt-8 pb-20 px-4 max-w-2xl mx-auto">
          <h2 className="text-xl font-black text-center mb-6 uppercase">Abejonės ar klausimai?</h2>
          <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-900 mb-2 text-lg">Ar yra paslėptų mokesčių ar prenumeratų?</p>
                <p className="text-slate-600">
                  Tikrai ne. Mokate tik dulkių siurblio kainą (89 €) vieną kartą. Siuntimas nemokamas. Niekada neprašysime papildomų pinigų.
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-900 mb-2 text-lg">Ar galiu pasikalbėti su kuo nors, jei turiu problemų?</p>
                <p className="text-slate-600">
                  Žinoma. Turime klientų aptarnavimą, pasiruošusį padėti bet kokiu klausimu, taip pat ir po pirkimo.
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-900 mb-2 text-lg">Ar užpildęs formą privalau pirkti?</p>
                <p className="text-slate-600">
                  Ne. Formos užpildymas skirtas tik pasiūlymo užfiksavimui. Kai paskambinsime, galite užduoti visus klausimus ir laisvai apsispręsti.
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

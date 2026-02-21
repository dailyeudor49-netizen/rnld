'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import {
  Star, CheckCircle, Shield, Zap, ChevronDown, ChevronLeft, ChevronRight,
  Timer, Truck, X, Wind, Battery, Navigation, Smartphone, Trash2, Droplets,
  Gauge, Volume2, Cpu, Wifi, Layers, Maximize, ShieldCheck, RefreshCw, ThumbsUp,
  Dog, Home, Clock, Sparkles
} from 'lucide-react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function RobotAspirapolvereProLanding() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [submitError, setSubmitError] = useState('');
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60);
  const [stockLeft] = useState(4);
  const [openFeature, setOpenFeature] = useState<number | null>(null);

  const slides = [
    '/images/robot-asp/1.webp',
    '/images/robot-asp/2.webp',
    '/images/robot-asp/3.webp',
    '/images/robot-asp/4.webp',
    '/images/robot-asp/5.webp',
    '/images/robot-asp/6.webp',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length, autoSlide]);

  const stopAutoSlide = () => setAutoSlide(false);

  const openOrderPopup = () => {
    document.getElementById('order-form-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!orderData.name.trim() || !orderData.phone.trim() || !orderData.address.trim()) {
      setSubmitError('Prosim, vyplnte vsechna pole!');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const tmfpInput = e.currentTarget.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';

      const params = new URLSearchParams({
        uid: '019be502-1631-773c-b833-f6153c79c2cb',
        key: 'cb7c9a2af5b95d10f17a18',
        offer: '2366',
        lp: '2405',
        name: orderData.name,
        tel: orderData.phone,
        'street-address': orderData.address,
        ua: navigator.userAgent,
        tmfp: tmfp,
      });

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

      console.log('[Network API] Sending params:', params.toString());

      const response = await fetch('https://offers.italiadrop.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      console.log('[Network API] Response status:', response.status);

      if (response.ok) {
        router.push('/ty/ty-id-robot-cs');
      } else {
        setSubmitError('Došlo k chybě. Zkuste to znovu.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('[Network API] Error:', error);
      setSubmitError('Došlo k chybě. Zkuste to znovu.');
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Vysavani + Mopovani", robot: "OBE FUNKCE V CENE", without: "Pouze vysavani" },
    { feature: "Vyprazdnovani", robot: "AUTOMATICKE 60 DNI", without: "Rucne kazdy den" },
    { feature: "Chlupy a vlasy", robot: "KARTAC PROTI ZAMOTANI", without: "Zamotaji se a zablokuji" },
    { feature: "Navigace", robot: "LIDAR LASER 360°", without: "Nahodna, narazi do vseho" },
    { feature: "Filtr na alergie", robot: "HEPA H13 CERTIFIKOVANY", without: "Zakladni filtr" },
    { feature: "Celkova cena", robot: "1970 Kc SE STANICI", without: "12 000+ Kc za stejne funkce" },
  ];

  const faqs = [
    {
      question: "Jak funguje platba?",
      answer: "Platite pri doruceni, v hotovosti kuryrovi. Nic nemusite platit predem. Vyplnite formular, zavolame vam na potvrzeni a balik dostanete do 24-48 hodin. Bez rizika."
    },
    {
      question: "Musim ho kazdy den vyprazdnovat?",
      answer: "Ne, stanice ho automaticky vyprazdni do 3-litroveho sacku. Sacek vymenite kazdych 2 mesice. Nikdy se nedotknete prachu."
    },
    {
      question: "Funguje se zvirecimi chlupy?",
      answer: "Ano, kartac proti zamotani je navrzen pro chlupy a dlouhe vlasy. Nikdy se nezablokuje. Vice nez 800 zakazniku s domacimi mazlicky to potvrzuje."
    },
    {
      question: "Co kdyz se mi nebude libit?",
      answer: "Mate 30 dni na vraceni. Plna refundace, bezplatne vraceni, bez otazek. Ale 96% zakazniku si ho nechava."
    }
  ];

  const reviews = [
    { nome: 'Martin K.', paese: 'Cesko', flag: '🇨🇿', testo: 'Tri velci psi. Vysavala jsem KAZDY DEN. S timto robotem vysavam jen jednou TYDNE rohy. 90% prace dela on. Nejlepsi nakup za poslednich 5 let.', stelle: 5, data: 'pred 5 dny', risposta: 'Martine, dekujeme! Majitele domacich mazlicku jsou nasi nejspokojenejsi zakaznici.' },
    { nome: 'Petra N.', paese: 'Cesko', flag: '🇨🇿', testo: 'Manzel byl skepticky. "Za tuto cenu to bude hracka". Po 2 tydnech se mi omluvil. Cisti LEPE nez nas stary Roomba za 15 000 Kc. Stanice se samovyprazdnovanim je genialni.', stelle: 5, data: 'pred 1 tydnem' },
    { nome: 'Tomas S.', paese: 'Cesko', flag: '🇨🇿', testo: 'Byt 85m² na dvou patrech. Nosim ho nahoru-dolu a vse udela sam. Baterie je nekonecna, nikdy jsem ho nemusel zastavit uprostred prace. Velmi tichy, zapinam ho behem prace z domova.', stelle: 5, data: 'pred 3 dny', risposta: 'Tomasi, presne tak! 5200mAh baterie zarucuje az 6 hodin!' },
    { nome: 'Marie L.', paese: 'Cesko', flag: '🇨🇿', testo: 'Je mi 68 let a mam problemy se zady. Uz nemohu vysavat. Tento robot mi zmenil zivot. Naprogramuji ho a on vse udela. Konecne si mohu uzivat cisty dum bez bolesti.', stelle: 5, data: 'pred 4 dny' },
    { nome: 'Jakub V.', paese: 'Cesko', flag: '🇨🇿', testo: 'Alergicky na roztoce od vzdy. Odkdy pouzivam tento robot s HEPA filtrem, probouzim se bez ucpaneho nosu. Rozdil je OBROVSKY. Mel jsem ho koupit pred lety.', stelle: 5, data: 'pred 2 tydny', risposta: 'Jakube, HEPA H13 filtr opravdu dela rozdil pro alergiky!' },
    { nome: 'Eva U.', paese: 'Nemecko', flag: '🇩🇪', testo: 'Porovnavala jsem to s Roborockem za 22 000 Kc u svagra. STEJNE FUNKCE. Nemohl tomu uverit. Ukazala jsem mu stanici, ktera vyprazdnuje a mopuje. Ted i on chce jeden.', stelle: 5, data: 'pred 1 tydnem' },
    { nome: 'Lucie M.', paese: 'Cesko', flag: '🇨🇿', testo: 'Dum se 3 kockami. Chlupy byly nocni mura. Ted robot jede 2x denne a dum je vzdy dokonaly. Hoste neveri, ze mam 3 kocky. NEJLEPSI DAREK, ktery jsem si dala.', stelle: 5, data: 'pred 6 dny' },
    { nome: 'Jan H.', paese: 'Cesko', flag: '🇨🇿', testo: 'Dlouha zima, dum stale zavreny. Prach se rychle hromadil. Ted robot cisti kazdy den, kdyz jsem v praci. Prijdu domu a dycham cisty vzduch. Stoji za kazdou korunu.', stelle: 5, data: 'pred 10 dny', risposta: 'Jane, presne tak! Perfektni pro ceske zimy.' },
    { nome: 'Katerina T.', paese: 'Cesko', flag: '🇨🇿', testo: 'Dlouhe vlasy vsude, byla to ma nocni mura. Tento robot nasaje VSECHNO bez zamotani. Kartac se nikdy nezablokuje. Zkousela jsem 3 roboty predtim, konecne jeden, ktery funguje!', stelle: 5, data: 'pred 8 dny' },
    { nome: 'Pavel B.', paese: 'Cesko', flag: '🇨🇿', testo: 'Pouzivam ho uz 2 mesice, kazdy den. Nula problemu. Kvalita je identicka s roboty za 25 000 Kc. Usetril jsem cely majetek a mam stale cisty dum. Doporucuji vsem.', stelle: 5, data: 'pred 12 dny', risposta: 'Pavle, dekujeme za duveru! Kvalita hovori sama za sebe.' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed">
      <Script
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <img
        src="https://offers.italiadrop.com/forms/api/ck/?o=2366&uid=019be502-1631-773c-b833-f6153c79c2cb&lp=2405"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-blue-600 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-red-600 font-bold text-sm animate-pulse">Uz jen {stockLeft}!</span>
            <span className="text-green-700 font-black text-xl">1970 Kc</span>
          </div>
          <button
            onClick={openOrderPopup}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-black text-lg hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>OBJEDNAT NYNI - PLATBA PRI DORUCENI</span>
          </button>
        </div>
      </div>

      <div className="bg-red-600 text-white py-2 text-center font-bold text-sm px-4">
        <div className="flex items-center justify-center gap-2">
          <Timer className="w-4 h-4 animate-pulse" />
          <span>BLESKOVA NABIDKA - Konci za: {formatTime(timeLeft)}</span>
        </div>
      </div>

      <section className="bg-gradient-to-b from-gray-900 to-gray-800 pt-6 pb-4 md:py-8 px-4 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-red-500 text-white text-sm md:text-base font-bold py-2 px-4 rounded-full inline-block mb-4 animate-pulse">
            TOTALNI VYPRODEJ — POSLEDNICH {stockLeft} KUSU
          </div>
          <h1 className="text-2xl md:text-4xl font-black mb-4 leading-tight tracking-tight">
            VYSAVA, MOPUJE A VYPRAZDNUJE SE<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">JEDNIM PRECHODEM</span>
          </h1>
          <p className="text-lg md:text-xl mb-4 text-gray-300">
            Zahodte mop, kyblik a kostak. <span className="font-bold text-white">On udela vse sam.</span>
          </p>
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 inline-block">
            <span className="line-through text-gray-400 text-xl">3990 Kc</span>
            <span className="text-4xl md:text-5xl font-black text-white ml-3">1970 Kc</span>
            <span className="block text-green-400 font-bold mt-1">Stanice na automaticke vyprazdnovani V CENE (hodnota 4990 Kc)</span>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 pt-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative border-2 border-gray-200">
              <img
                src={slides[currentSlide]}
                alt="Profesionalni roboticky vysavac se stanici"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg animate-bounce">
                STANICE V CENE!
              </div>
              <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-lg">
                -{Math.round((1 - 1970/3990) * 100)}%
              </div>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev + 1) % slides.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="flex justify-center gap-2 overflow-x-auto pb-2">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => { stopAutoSlide(); setCurrentSlide(i); }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer flex-shrink-0 ${
                    i === currentSlide ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={slide} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            <div className="bg-gray-50 rounded-xl p-5 text-left lg:hidden border border-gray-200">
              <h3 className="text-lg font-black text-gray-800 mb-3 text-center">Proc je jiny nez ostatni:</h3>
              <ul className="space-y-3 text-gray-700 text-base">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Vysava a mopuje naraz</strong> — Jeden prechod, dokonale podlahy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Trash2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Robot se sam vyprazdni do stanice</strong> — Sacek vymenite kazdych 2 mesice.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Dog className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Sbohem chlupy a vlasy</strong> — Kartac proti zamotani, nikdy se nezablokuje.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Cisty vzduch</strong> — HEPA filtr zachyti 99,97% alergenu.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Navigation className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Laserova navigace</strong> — Mapuje dum, nenarazi do nabytku.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-4 lg:self-start">
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 mb-6 shadow-xl relative overflow-hidden">
              <div className="absolute -top-1 -right-1 bg-red-600 text-white text-base font-black w-20 h-20 rounded-bl-3xl shadow-lg flex items-center justify-center text-center leading-tight transform rotate-0">
                -51%
              </div>

              <h2 className="text-xl font-black text-gray-900 mb-1">
                NovaClean X1 PRO + OMNI Stanice
              </h2>
              <p className="text-sm text-gray-500 mb-2">Profesionalni roboticky vysavac a cistic podlah</p>

              <div
                className="flex items-center space-x-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-bold">4.9/5</span>
                <span className="text-gray-500 text-sm underline">(1 248 hodnoceni)</span>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 line-through text-xl">3990 Kc</span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">USETRITE 2020 Kc</span>
                </div>
                <div className="text-center">
                  <span className="text-5xl font-black text-green-700">1970 Kc</span>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700">Doruceni:</span>
                  <span className="font-bold text-gray-900 ml-auto">24-48 hodin</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700">Platba:</span>
                  <span className="font-bold text-gray-900 ml-auto">Pri doruceni</span>
                </div>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl font-black text-lg transition-all cursor-pointer shadow-lg transform hover:scale-[1.02]"
              >
                OBJEDNAT NYNI — PLATBA PRI DORUCENI
              </button>

              <div className="flex items-center justify-center gap-2 mt-3 text-red-600 font-bold">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>Uz jen {stockLeft} kusu za tuto cenu!</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <span className="text-gray-700 font-medium">Zaruka 2 roky</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <RefreshCw className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <span className="text-gray-700 font-medium">Vraceni 30 dni</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <ThumbsUp className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <span className="text-gray-700 font-medium">Podpora 24/7</span>
                </div>
              </div>
            </div>

            <div className="hidden lg:block bg-gray-50 rounded-xl p-5 text-left border border-gray-200">
              <h3 className="text-lg font-black text-gray-800 mb-3 text-center">Proc je jiny nez ostatni:</h3>
              <ul className="space-y-3 text-gray-700 text-base">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Vysava a mopuje naraz</strong> — Jeden prechod, dokonale podlahy.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Trash2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Robot se sam vyprazdni do stanice</strong> — Sacek vymenite kazdych 2 mesice.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Dog className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Sbohem chlupy a vlasy</strong> — Kartac proti zamotani, nikdy se nezablokuje.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Cisty vzduch</strong> — HEPA filtr zachyti 99,97% alergenu.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Navigation className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Laserova navigace</strong> — Mapuje dum, nenarazi do nabytku.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <section className="py-10 md:py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-8 text-gray-900 tracking-tight">
            Zapomente na uklizeni.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🦴</div>
              <h4 className="font-black text-gray-900 mb-1">Sbohem Bolesti Zad</h4>
              <p className="text-gray-500 text-sm">Uz se neohybate. On jde vsude.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🧹</div>
              <h4 className="font-black text-gray-900 mb-1">Ruce Vzdy Ciste</h4>
              <p className="text-gray-500 text-sm">Robot se sam vyprazdni do stanice. Nikdy se nedotknete prachu.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🐕</div>
              <h4 className="font-black text-gray-900 mb-1">Zvireci Chlupy? Zmizely</h4>
              <p className="text-gray-500 text-sm">Kartac proti zamotani. Nikdy se nezablokuje.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">💨</div>
              <h4 className="font-black text-gray-900 mb-1">Konecne Cisty Vzduch</h4>
              <p className="text-gray-500 text-sm">HEPA filtr. Zachyti 99,97% alergenu.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-white text-center shadow-2xl">
            <p className="text-lg md:text-xl mb-4">
              <span className="text-blue-400 font-bold">1 847 objednavek</span> za poslednich 24 hodin
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">6000 Pa</div>
                <p className="text-xs text-gray-300">Silny saci vykon</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">6 hodin</div>
                <p className="text-xs text-gray-300">Nekonecna baterie</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">2 mesice</div>
                <p className="text-xs text-gray-300">Bez vyprazdnovani</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">4.9/5</div>
                <p className="text-xs text-gray-300">1 248 hodnoceni</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
              V CENE (HODNOTA 4990 Kc)
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900">
              STANICE, KTERA <span className="text-blue-600">ELIMINUJE VSECHNU VASI PRACI</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Robot se vrati do stanice, vyprazdni se, umyje mop, nabije se. Vase nova osobni uklizecka.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-start">
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 0 ? null : 0); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/svuota.webp" alt="Automaticke vyprazdnovani" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 0 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">ROBOT SE SAM VYPRAZDNI DO STANICE</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 0 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 0 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Vrati se do stanice a SAM se vyprazdni do 3-litroveho sacku. <strong>Sacek vymenite kazdych 2 mesice.</strong> Nikdy vic ruce v prachu. Nikdy vic kychani.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 0 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Sacek vymenite kazdych 2 mesice</p>
                  </div>
                </div>
              </div>
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">ROBOT SE SAM VYPRAZDNI DO STANICE</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 0 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 0 ? 'hidden' : 'mt-1'}`}>Sacek vymenite kazdych 2 mesice</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 0 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Vrati se do stanice a SAM se vyprazdni do 3-litroveho sacku. Sacek vymenite kazdych 2 mesice. Nikdy vic ruce v prachu.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 1 ? null : 1); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/mocio.webp" alt="Automaticke myti" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 1 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">MOP ROBOTA VZDY CISTY</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 1 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 1 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Po kazdem mopovani <strong>stanice umyje mop</strong> cistou vodou. Vy se nedotknete niceho. Podlahy vzdy dokonale.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 1 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Stanice ho umyje za vas</p>
                  </div>
                </div>
              </div>
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">MOP ROBOTA VZDY CISTY</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 1 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 1 ? 'hidden' : 'mt-1'}`}>Stanice ho umyje za vas</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 1 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Po kazdem mopovani stanice umyje mop cistou vodou. Vy se nedotknete niceho. Podlahy vzdy dokonale.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 2 ? null : 2); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/muffa.webp" alt="Suseni za tepla" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 2 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">SBOHEM ZAPACH A PLISEN</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 2 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 2 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Vysusi mop na <strong>45°C</strong> po kazdem mopovani. Bez bakterii, bez neprijemnych zapachu. <strong>SKUTECNA hygiena.</strong>
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 2 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Rychle suseni na 45°C</p>
                  </div>
                </div>
              </div>
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">SBOHEM ZAPACH A PLISEN</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 2 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 2 ? 'hidden' : 'mt-1'}`}>Rychle suseni na 45°C</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 2 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Vysusi mop na 45°C po kazdem mopovani. Bez bakterii, bez neprijemnych zapachu. SKUTECNA hygiena.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 3 ? null : 3); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/laser.webp" alt="LiDAR navigace" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 3 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">LASEROVA NAVIGACE</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 3 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 3 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Mapuje cely dum s milimetrovou presnosti. <strong>Vyhyba se prekazkam</strong>, nenarazi do nabytku. Vybita baterie? <strong>Nabije se a pokracuje sam.</strong>
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 3 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Mapuje, vyhyba se, nikdy nezastavi</p>
                  </div>
                </div>
              </div>
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">LASEROVA NAVIGACE</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 3 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 3 ? 'hidden' : 'mt-1'}`}>Mapuje, vyhyba se prekazkam</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 3 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Mapuje cely dum s milimetrovou presnosti. Vyhyba se prekazkam, nenarazi do nabytku. Nabije se a pokracuje sam.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 4 ? null : 4); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/6.webp" alt="Chlupy a vlasy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 4 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">SBOHEM CHLUPY A VLASY</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 4 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 4 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Kartac proti zamotani navrzen pro <strong>zvireci chlupy, dlouhe vlasy a tvrdohlavou spinu</strong>. Nikdy se nezablokuje. Nasaje vse pri prvnim prechodu.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 4 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Kartac proti zamotani, nikdy se nezablokuje</p>
                  </div>
                </div>
              </div>
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">SBOHEM CHLUPY A VLASY</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 4 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 4 ? 'hidden' : 'mt-1'}`}>Kartac proti zamotani</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 4 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Kartac proti zamotani pro zvireci chlupy, dlouhe vlasy a tvrdohlavou spinu. Nikdy se nezablokuje. Nasaje vse pri prvnim prechodu.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 5 ? null : 5); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/divano.webp" alt="Ovladani aplikaci" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 5 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">OVLADANI Z GAUCHE</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 5 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 5 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Dalkovy ovladac v cene. Aplikace volitelna. <strong>"Alexa, ukliď doma"</strong> a zacne. Vy ani nevstanete.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 5 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Aplikace, Alexa, dalkovy ovladac</p>
                  </div>
                </div>
              </div>
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">OVLADANI Z GAUCHE</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 5 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 5 ? 'hidden' : 'mt-1'}`}>Aplikace, Alexa, dalkovy ovladac</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 5 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Dalkovy ovladac v cene. Aplikace volitelna. "Alexa, ukliď doma" a zacne. Vy ani nevstanete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-gray-900">
            CISLA, KTERA MLUVI SAMA ZA SEBE
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Porovnejte ho s top modely: neni konkurence.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Gauge className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">6000 Pa</div>
              <p className="text-sm text-gray-500">Saci vykon</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Battery className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">5200 mAh</div>
              <p className="text-sm text-gray-500">Baterie (6 hodin)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Cpu className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">LiDAR 4.0</div>
              <p className="text-sm text-gray-500">Laserova navigace</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Volume2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">&lt;55 dB</div>
              <p className="text-sm text-gray-500">Super tichy</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Wifi className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">WiFi 5GHz</div>
              <p className="text-sm text-gray-500">App + Alexa/Google</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Layers className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">3L Stanice</div>
              <p className="text-sm text-gray-500">Sacek vydrzi 2 mesice</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Maximize className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">20 mm</div>
              <p className="text-sm text-gray-500">Prekonava prekazky</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <ShieldCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">HEPA H13</div>
              <p className="text-sm text-gray-500">99,97% alergenu</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-gray-900">
            NOVACLEAN X1 vs KONKURENCE
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Stejne funkce, 10 000 Kc mene. Spocitejte si sami.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg text-xs md:text-base">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left">Vlastnost</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center bg-green-600">NovaClean X1</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center">Jine roboty</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-2 md:px-4 py-2 md:py-3 font-bold text-gray-900">{row.feature}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-center font-bold text-green-700 bg-green-50">{row.robot}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-center text-gray-500">{row.without}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-red-600 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white text-xl font-black mb-3">
            Totalni vyprodej — Uz jen {stockLeft} kusu
          </p>
          <p className="text-white/80 mb-4">Kdyz dojdou, cena se vrati na 3990 Kc. Stanice v cene jen pro tyto posledni kusy.</p>
          <button
            onClick={openOrderPopup}
            className="bg-white text-red-600 hover:bg-gray-100 py-4 px-10 rounded-xl font-black text-xl transition-all cursor-pointer shadow-lg"
          >
            OBJEDNAT NYNI — 1970 Kc
          </button>
        </div>
      </section>

      <section id="reviews-section" className="py-12 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-2">
            1 248 SPOKOJENYCH ZAKAZNIKU
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <span className="text-white font-bold">4.9/5</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <div key={i} className={`bg-white rounded-xl p-5 shadow ${i >= visibleReviews ? 'hidden md:block' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">
                    {review.nome[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{review.nome}</p>
                    <p className="text-sm text-gray-500">{review.flag} {review.paese}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex text-yellow-400 mb-1">
                      {[...Array(review.stelle)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{review.data}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.testo}</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">Overeny nakup</span>
                {review.risposta && (
                  <div className="mt-3 bg-gray-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                    <p className="text-xs font-bold text-gray-600 mb-1">Odpoved prodejce:</p>
                    <p className="text-gray-600 text-sm">{review.risposta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {visibleReviews < reviews.length && (
            <div className="text-center mt-6 md:hidden">
              <button
                onClick={() => setVisibleReviews(prev => Math.min(prev + 4, reviews.length))}
                className="bg-white text-gray-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              >
                Zobrazit vice hodnoceni
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-green-50 border-y border-green-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-white border-4 border-green-500 rounded-full flex flex-col items-center justify-center shadow-xl">
                <span className="text-green-600 font-black text-4xl">30</span>
                <span className="text-gray-900 font-bold text-xs uppercase">Dni</span>
                <span className="text-green-600 font-bold text-sm">Zaruka</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                NELIBI SE VAM? VRATIME VAM VSE. KONEC.
              </h2>
              <p className="text-gray-700 mb-4 text-lg">
                Mate 30 dni na vyzkouseni. Pokud nejste NADSENI — z jakehokoli duvodu — zavolejte nam, posleme kuryra a vratime vam kazdou korunu. <strong>Vraceni ZDARMA. Bez otazek. Bez rizika pro vas.</strong> Ale 96% zakazniku si ho nechava.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="bg-white px-4 py-2 rounded-lg border border-green-200 font-bold text-gray-800 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> Bez rizika
                </span>
                <span className="bg-white px-4 py-2 rounded-lg border border-green-200 font-bold text-gray-800 text-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-green-500" /> Vraceni zdarma
                </span>
                <span className="bg-white px-4 py-2 rounded-lg border border-green-200 font-bold text-gray-800 text-sm flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-green-500" /> Zaruka 2 roky
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 text-center">
            JAK OBJEDNAT (3 JEDNODUCHE KROKY)
          </h2>
          <div className="flex flex-row items-start justify-center gap-2 md:gap-8">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg">1</div>
              <p className="text-gray-700 text-sm font-medium">Vyplnte formular s vasimi udaji</p>
            </div>
            <div className="text-gray-300 text-2xl mt-4">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg">2</div>
              <p className="text-gray-700 text-sm font-medium">Zavolame vam na potvrzeni</p>
            </div>
            <div className="text-gray-300 text-2xl mt-4">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg">3</div>
              <p className="text-gray-700 text-sm font-medium">Dostanete do 24-48 hodin a zaplatite KURYROVI!</p>
            </div>
          </div>
        </div>
      </section>

      <section id="order-form-section" className="bg-gray-900 py-12 pb-8">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-red-600 text-white font-bold text-center py-2 rounded-full mb-4 animate-pulse">
            Uz jen {stockLeft} kusu za tuto cenu
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 text-center">
            Objednejte Nyni
          </h2>
          <p className="text-gray-400 mb-6 text-center">
            Vyplnte formular. Platite az pri doruceni.
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-black text-gray-900">NovaClean X1 PRO</span>
                  <p className="text-sm text-gray-600">+ OMNI Stanice + Prislusenstvi</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">STANICE ZDARMA</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">DORUCENI ZDARMA</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm block">3990 Kc</span>
                  <span className="text-3xl font-black text-green-700">1970 Kc</span>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-center">
              <div className="flex items-center justify-center gap-2 text-red-700 font-bold">
                <Timer className="w-5 h-5" />
                <span>Nabidka konci za: {formatTime(timeLeft)}</span>
              </div>
            </div>

            {submitError && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                <p className="text-red-700 text-sm text-center">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input type="hidden" name="tmfp" />

              <div className="space-y-4 mb-5">
                <div>
                  <label className="block text-gray-800 font-bold mb-2">Jmeno a Prijmeni *</label>
                  <input
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg"
                    placeholder="Jan Novak"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-2">Telefon (pro kuryra) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg"
                    placeholder="+420 123 456 789"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-2">Uplna Adresa *</label>
                  <input
                    type="text"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg"
                    placeholder="Vaclavske namesti 1, 110 00 Praha"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="border-2 border-green-500 bg-green-50 rounded-xl p-4 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-4 border-green-500 bg-white"></div>
                  <span className="font-bold text-gray-800">Platba pri doruceni</span>
                </div>
                <span className="text-2xl">💶</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-4 rounded-xl font-black text-xl transition duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white cursor-pointer shadow-lg transform hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? 'ODESILAM...' : 'OBJEDNAT NYNI — PLATBA PRI DORUCENI'}
                {!isSubmitting && <Truck className="w-6 h-6" />}
              </button>

              <p className="text-center text-gray-400 text-xs mt-4">
                Vase udaje jsou chraneny a SSL sifrovany. Pouzivame je JEN na doruceni.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-10 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 text-gray-900">
            CASTO KLADENE OTAZKY
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-4">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

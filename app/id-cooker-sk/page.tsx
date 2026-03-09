'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { saveUserDataToStorage } from '@/app/lib/facebook/capi';
import { Star, CheckCircle, Shield, Zap, ChevronDown, ChevronLeft, ChevronRight, Flame, Timer, Gauge, Utensils, ChefHat, Soup, Truck, PhoneCall, Heart, Scale, RefreshCw, Wind, X, Check, PlayCircle } from 'lucide-react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function RobotCucinaLanding() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [submitError, setSubmitError] = useState('');

  const slides = [
    '/images/multicooker/1.webp',
    '/images/multicooker/2.webp',
    '/images/multicooker/3.webp',
    '/images/multicooker/4.webp',
    '/images/multicooker/5.webp',
  ];

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
      setSubmitError('Prosím, vyplňte všetky polia.');
      return;
    }

    const phoneDigits = orderData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 9) {
      setSubmitError('Zadané telefónne číslo sa nezdá byť správne.');
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
        offer: '2225',
        lp: '2264',
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

      const response = await fetch('https://offers.italiadrop.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (response.ok) {
        saveUserDataToStorage({
          nome: orderData.name || '',
          cognome: '',
          telefono: orderData.phone || '',
          indirizzo: orderData.address || '',
        });
        router.push('/ty/ty-id-cooker-sk');
      } else {
        setSubmitError('Vyskytla sa chyba. Skúste to znova.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitError('Vyskytla sa chyba. Skúste to znova.');
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Počet funkcií", robot: "12 v 1 kompletný", without: "Len 1-2 funkcie" },
    { feature: "Zaberaný priestor", robot: "Minimálny priestor", without: "Preplnená pracovná doska" },
    { feature: "Varenie", robot: "Automatické a presné", without: "Treba miešať ručne" },
    { feature: "Čistenie", robot: "Rýchle, nepriľnavé", without: "Ťažké a namáhavé" },
    { feature: "Celková cena", robot: "Len €79", without: "Viac ako €400 za viacero spotrebičov" },
  ];

  const faqs = [
    {
      question: "Aké spotrebiče tento robot nahrádza?",
      answer: "Tento robot je navrhnutý tak, aby bol vaším jediným pomocníkom v kuchyni. Nahrádza mixér, miesič cesta, sekáčik, parný hrniec, váhu a fritézu. S jedným spotrebičom môžete pripraviť akýkoľvek recept – od predjedál po dezerty."
    },
    {
      question: "Je ľahko použiteľný pre tých, ktorí nie sú technicky zdatní?",
      answer: "Absolútne áno. Navrhli sme veľmi jednoduchý a intuitívny ovládací panel. Stačí vybrať požadovanú funkciu a stlačiť štart. Je ideálny pre tých, ktorí hľadajú praktickosť bez komplikácií."
    },
    {
      question: "Je miska dostatočne veľká?",
      answer: "Áno, miska má kapacitu 6 litrov – ideálna na varenie pre celú rodinu alebo na prípravu jedál do zásoby."
    },
    {
      question: "Ako prebieha platba?",
      answer: "Pre vašu maximálnu bezpečnosť ponúkame platbu pri doručení. Zaplatíte €79 priamo kuriérovi, keď dostanete produkt domov."
    },
    {
      question: "Má produkt záruku?",
      answer: "Samozrejme. Produkt má 24-mesačnú záruku. Navyše máte 30 dní na vyskúšanie: ak nebudete spokojní, môžete ho vrátiť bez problémov."
    }
  ];

  const reviews = [
    { nome: 'Zuzana M.', testo: 'Prekvapila ma kvalita. Robí to isté čo oveľa drahšie roboty. Pripravujem rizotá a krémové polievky bez námahy. Skvelý pomocník pre tých, čo majú málo času alebo chcú variť zdravo.', stelle: 5, data: '18. december 2024' },
    { nome: 'Martin K.', testo: 'Nikdy som nebol dobrý kuchár, ale s týmto robotom je všetko jednoduché. Bolonská omáčka je chutná a nemusím ju neustále kontrolovať.', stelle: 5, data: '15. december 2024' },
    { nome: 'Jana R.', testo: 'Uvoľnila som veľa miesta v kuchyni. Predala som staré spotrebiče, pretože tento robí všetko. Integrovaná váha je veľmi praktická.', stelle: 5, data: '12. december 2024' },
    { nome: 'Peter D.', testo: 'Pevné materiály a výkonný motor. Seká dobre aj najtvrdšiu zeleninu. Za €79 to bol naozaj dobrý nákup.', stelle: 5, data: '8. december 2024' },
    { nome: 'Lucia B.', testo: 'Veľmi užitočné na detské príkrmy. Vložím všetko dnu a on to urobí. Čistí sa okamžite, čo je pre mňa zásadné.', stelle: 5, data: '3. december 2024' },
    { nome: 'Jozef L.', testo: 'Daroval som ho manželke a je veľmi šťastná. Doručenie bolo rýchle a zaplatil som pohodlne kuriérovi.', stelle: 5, data: '15. november 2024' },
  ];

  const funzioniDodici = [
    { title: "Seká", desc: "zeleninu, mäso, orechy", icon: <Zap className="w-6 h-6 text-orange-600" /> },
    { title: "Mixuje", desc: "krémové polievky, smoothie, kaše", icon: <Soup className="w-6 h-6 text-orange-600" /> },
    { title: "Miesi cesto", desc: "na chlieb, pizzu, dezerty", icon: <Utensils className="w-6 h-6 text-orange-600" /> },
    { title: "Šľahá", desc: "smotanu, bielka, krémy", icon: <ChefHat className="w-6 h-6 text-orange-600" /> },
    { title: "Varí", desc: "polievky, rizotá, omáčky", icon: <Flame className="w-6 h-6 text-orange-600" /> },
    { title: "Parí", desc: "zeleninu, ryby, mäso", icon: <Wind className="w-6 h-6 text-orange-600" /> },
    { title: "Automaticky mieša", desc: "nemusíte stáť pri sporáku", icon: <RefreshCw className="w-6 h-6 text-orange-600" /> },
    { title: "Automatické restovanie", desc: "bez pripálenia", icon: <Flame className="w-6 h-6 text-orange-600" /> },
    { title: "Ľahké vyprážanie", desc: "s málom alebo bez oleja", icon: <Zap className="w-6 h-6 text-orange-600" /> },
    { title: "Integrovaná váha", desc: "vážte počas varenia", icon: <Scale className="w-6 h-6 text-orange-600" /> },
    { title: "Časovač a regulácia teploty", desc: "varenie vždy pod kontrolou", icon: <Timer className="w-6 h-6 text-orange-600" /> },
    { title: "Automatické programy", desc: "vyberte a stlačte tlačidlo", icon: <CheckCircle className="w-6 h-6 text-orange-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed text-slate-800 pb-20 md:pb-0">
      <Script
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <img
        src="https://offers.italiadrop.com/forms/api/ck/?o=2225&uid=019be502-1631-773c-b833-f6153c79c2cb&lp=2264"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* Barra superiore fissa per urgenza soft */}
      <div className="bg-slate-900 text-white text-center py-2 text-sm font-medium">
        Špeciálna ponuka na obnovu skladu - Obmedzená dostupnosť
      </div>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl md:hidden">
        <div className="px-4 py-3">
          <button
            onClick={openOrderPopup}
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-transform"
          >
            <span>OBJEDNAŤ TERAZ ZA €79</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <header className="pt-8 pb-6 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
          Zjednodušte si kuchyňu s robotom <span className="text-orange-600">12 v 1</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium mb-6">
          <strong className="text-slate-900 font-bold">1200 integrovaných video receptov</strong>, ktoré vás vedú krok za krokom.
          Robot automaticky nastaví čas a teplotu: nemožno urobiť chybu!
        </p>
        <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm mb-4 border border-green-200">
          <CheckCircle className="w-4 h-4" />
          <span>Platba pri doručení</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden relative border border-slate-200 group">
              <img
                src={slides[currentSlide]}
                alt="Multifunkčný kuchynský robot"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md hover:bg-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev + 1) % slides.length); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-md hover:bg-white transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </div>
            <div className="flex justify-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { stopAutoSlide(); setCurrentSlide(i); }}
                  className={`w-3 h-3 rounded-full transition-all ${i === currentSlide ? 'bg-orange-600 w-8' : 'bg-slate-300'}`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-slate-500 text-sm font-medium">4 847 pozitívnych recenzií</span>
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-5xl md:text-6xl font-black text-orange-600" style={{ fontFamily: 'var(--font-montserrat)' }}>€79</span>
                <span className="text-xl text-slate-400 line-through">€199</span>
              </div>

              {/* Box Fiducia Rafforzato */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Bezpečný a garantovaný nákup
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Platba pri doručení
                  </li>
                  <li className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-blue-500" />
                    Telefonické potvrdenie objednávky
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-500" />
                    Doručenie za 2-4 dni
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    2-ročná záruka
                  </li>
                </ul>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 px-8 rounded-2xl font-black text-xl transition-all shadow-lg hover:shadow-orange-200 mb-4"
              >
                OBJEDNAŤ TERAZ - PLATÍTE PRI DORUČENÍ
              </button>

              <p className="text-center text-slate-500 text-sm">
                Ponuka platí do vypredania zásob.
              </p>
            </div>

            {/* Benefici principali semplificati */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Prečo si ho vybrať:</h3>
              <div className="grid grid-cols-1 gap-4">

                {/* NUOVA CARD VIDEO RICETTE */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><PlayCircle className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">1200 video receptov</h4>
                    <p className="text-sm text-slate-600">Neviete variť? Žiadny problém. Sledujte videá na displeji a robot urobí zvyšok.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Utensils className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Všetko pripraví za pár sekúnd</h4>
                    <p className="text-sm text-slate-600">Seká zeleninu, mäso a mixuje ovocie bez námahy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><ChefHat className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Miesi a šľahá ako profesionál</h4>
                    <p className="text-sm text-slate-600">Ideálny na domáci chlieb, pizzu a dezerty.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Flame className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Automatické a zdravé varenie</h4>
                    <p className="text-sm text-slate-600">Varí rizotá a polievky s automatickým miešaním alebo pomocou pary.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Nuova Sezione: Le 12 funzioni del robot */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-slate-900 mb-10">
            12 funkcií robota, jednoducho vysvetlených
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {funzioniDodici.map((funz, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start gap-4">
                <div className="bg-slate-50 p-3 rounded-xl flex-shrink-0">
                  {funz.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{funz.title}</h3>
                  <p className="text-slate-600 text-sm md:text-base leading-snug">{funz.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <p className="text-lg md:text-xl font-medium text-slate-700 bg-white inline-block px-8 py-4 rounded-2xl border border-slate-200 shadow-sm">
              <CheckCircle className="w-5 h-5 text-green-500 inline mr-2" />
              Nemusíte sa nič učiť: vyberte program a robot urobí všetko sám.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Vyhráva vo všetkých smeroch</h2>
             <p className="text-slate-500">Porovnajte si sami: tu je dôvod, prečo sa to oplatí.</p>
          </div>

          {/* Mobile: Stylized Cards */}
          <div className="md:hidden space-y-6">
            {comparisonData.map((row, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden relative">
                 <div className="p-6 pb-4">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{row.feature}</h3>
                 </div>
                 <div className="grid grid-cols-2 divide-x divide-slate-100 border-t border-slate-100">
                    <div className="p-4 bg-slate-50 flex flex-col items-center justify-center text-center gap-2">
                       <span className="text-xs uppercase font-bold text-slate-400">Klasický</span>
                       <X className="w-6 h-6 text-slate-300" />
                       <span className="text-sm font-medium text-slate-500 leading-tight">{row.without}</span>
                    </div>
                    <div className="p-4 bg-orange-50/50 flex flex-col items-center justify-center text-center gap-2">
                       <span className="text-xs uppercase font-bold text-orange-600">Robot 12v1</span>
                       <Check className="w-6 h-6 text-green-500" />
                       <span className="text-sm font-bold text-slate-900 leading-tight">{row.robot}</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>

          {/* Desktop: Highlight Table */}
          <div className="hidden md:block">
            <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden relative">
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-[35%] h-full bg-gradient-to-l from-orange-50/80 to-transparent -z-10" />

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-8 text-sm font-bold tracking-widest text-slate-400 uppercase w-1/3">Vlastnosť</th>
                    <th className="p-8 text-sm font-bold tracking-widest text-slate-400 uppercase text-center w-1/3">Tradičný spôsob</th>
                    <th className="w-1/3 p-0">
                       <div className="bg-orange-600 text-white py-6 text-center font-black text-xl rounded-tl-3xl shadow-lg relative z-10">
                          ROBOT 12v1
                       </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <tr key={i} className="group hover:bg-slate-50/50 transition-colors border-b border-slate-100 last:border-0">
                      <td className="p-8 text-lg font-bold text-slate-800 group-hover:text-orange-900 transition-colors">
                        {row.feature}
                      </td>
                      <td className="p-8 text-center">
                         <div className="flex flex-col items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                            <X className="w-6 h-6 text-slate-300" />
                            <span className="font-medium text-slate-500">{row.without}</span>
                         </div>
                      </td>
                      <td className="p-8 text-center relative">
                         {/* Highlight Column Background */}
                         <div className="absolute inset-y-0 right-0 w-full bg-orange-50/30 -z-10" />
                         <div className="flex flex-col items-center gap-2 transform group-hover:scale-105 transition-transform">
                            <div className="bg-green-100 p-2 rounded-full">
                               <Check className="w-6 h-6 text-green-600" />
                            </div>
                            <span className="font-black text-slate-900 text-lg">{row.robot}</span>
                         </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews-section" className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center text-slate-900 mb-12">Čo hovoria tí, ktorí ho už používajú</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(review.stelle)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-700 italic mb-6 leading-relaxed">"{review.testo}"</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <span className="font-bold text-slate-900">{review.nome}</span>
                  <span className="text-xs text-slate-400 font-medium">{review.data}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-form-section" className="py-20 bg-slate-900 text-white">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Dostante ho domov</h2>
            <p className="text-slate-400 text-lg">
              Vyplňte údaje nižšie, aby sme vás mohli telefonicky kontaktovať a potvrdiť doručenie.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-800">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
              <div>
                <span className="block font-bold text-slate-900 text-lg">Kuchynský robot 12 v 1</span>
                <span className="text-slate-500 text-sm">Doručenie za 2-4 pracovné dni</span>
              </div>
              <div className="text-right">
                <span className="block text-3xl font-black text-orange-600">€79</span>
                <span className="text-slate-400 line-through text-sm">€199</span>
              </div>
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="tmfp" />
              <div>
                <label className="block text-slate-700 font-bold mb-2">Meno a Priezvisko</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Napr. Ján Novák"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Telefónne číslo</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Napr. +421 912 345 678"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Adresa doručenia</label>
                <input
                  type="text"
                  name="address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Ulica, číslo, mesto"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 ${
                  isSubmitting
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isSubmitting ? 'ODOSIELAM...' : 'POTVRDIŤ OBJEDNÁVKU'}
              </button>

              <div className="flex items-center gap-2 justify-center text-slate-400 text-xs text-center mt-6">
                <Shield className="w-4 h-4" />
                <span>Rešpektujeme vaše súkromie. Údaje sú chránené a používané len na doručenie.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white pb-32">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center text-slate-900 mb-10">Často kladené otázky</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <h3 className="font-bold text-slate-900">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-slate-600 leading-relaxed text-sm md:text-base border-t border-slate-100 pt-4">
                    {faq.answer}
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

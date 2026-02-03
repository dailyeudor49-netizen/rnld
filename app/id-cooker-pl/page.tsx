'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
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
    '/images/multicooker/1.jpg',
    '/images/multicooker/2.jpg',
    '/images/multicooker/3.jpg',
    '/images/multicooker/4.jpg',
    '/images/multicooker/5.jpg',
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
      setSubmitError('Proszę wypełnić wszystkie pola.');
      return;
    }

    const phoneDigits = orderData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 9) {
      setSubmitError('Wprowadzony numer telefonu wydaje się nieprawidłowy.');
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
        offer: '2220',
        lp: '2259',
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

      await fetch('https://offers.italiadrop.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      router.push('/ty/ty-id-cooker-pl');
    } catch (error) {
      console.error(error);
      router.push('/ty/ty-id-cooker-pl');
    } finally {
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Liczba funkcji", robot: "12 w 1 kompletny", without: "Tylko 1-2 funkcje" },
    { feature: "Zajmowane miejsce", robot: "Minimalna przestrzeń", without: "Zatłoczony blat" },
    { feature: "Gotowanie", robot: "Automatyczne i precyzyjne", without: "Trzeba mieszać ręcznie" },
    { feature: "Czyszczenie", robot: "Szybkie, nieprzywierające", without: "Trudne i męczące" },
    { feature: "Całkowity koszt", robot: "Tylko 299 zł", without: "Ponad €400 za kilka urządzeń" },
  ];

  const faqs = [
    {
      question: "Jakie urządzenia zastępuje ten robot?",
      answer: "Ten robot został zaprojektowany, aby być Twoim jedynym pomocnikiem w kuchni. Zastępuje blender, mikser do ciasta, rozdrabniacz, parowar, wagę i frytkownicę. Za pomocą jednego urządzenia możesz przygotować każdy przepis – od przystawek po desery."
    },
    {
      question: "Czy jest łatwy w obsłudze dla osób nietechnicznych?",
      answer: "Zdecydowanie tak. Zaprojektowaliśmy bardzo prosty i intuicyjny panel sterowania. Wystarczy wybrać żądaną funkcję i nacisnąć start. Idealny dla tych, którzy szukają praktyczności bez komplikacji."
    },
    {
      question: "Czy miska jest wystarczająco duża?",
      answer: "Tak, miska ma pojemność 6 litrów – idealna do gotowania dla całej rodziny lub przygotowywania posiłków na zapas."
    },
    {
      question: "Jak przebiega płatność?",
      answer: "Dla Twojego maksymalnego bezpieczeństwa oferujemy płatność przy odbiorze. Zapłacisz 299 zł bezpośrednio kurierowi, gdy otrzymasz produkt do domu."
    },
    {
      question: "Czy produkt ma gwarancję?",
      answer: "Oczywiście. Produkt objęty jest 24-miesięczną gwarancją. Ponadto masz 30 dni na wypróbowanie: jeśli nie będziesz zadowolony, możesz go zwrócić bez problemu."
    }
  ];

  const reviews = [
    { nome: 'Agnieszka M.', testo: 'Zaskoczyła mnie jakość. Robi to samo co dużo droższe roboty. Przygotowuję risotto i kremowe zupy bez wysiłku. Świetny pomocnik dla tych, którzy mają mało czasu lub chcą gotować zdrowo.', stelle: 5, data: '18 grudnia 2024' },
    { nome: 'Tomasz K.', testo: 'Nigdy nie byłem dobrym kucharzem, ale z tym robotem wszystko stało się proste. Sos boloński wychodzi smaczny i nie muszę go ciągle pilnować.', stelle: 5, data: '15 grudnia 2024' },
    { nome: 'Katarzyna R.', testo: 'Zwolniłam dużo miejsca w kuchni. Sprzedałam stare urządzenia, bo ten robi wszystko. Wbudowana waga jest bardzo praktyczna.', stelle: 5, data: '12 grudnia 2024' },
    { nome: 'Piotr D.', testo: 'Solidne materiały i mocny silnik. Dobrze siekana nawet najtwardsze warzywa. Za 299 zł to był naprawdę dobry zakup.', stelle: 5, data: '8 grudnia 2024' },
    { nome: 'Anna B.', testo: 'Bardzo przydatny do papek dla dzieci. Wkładam wszystko i on robi. Czyści się błyskawicznie, co jest dla mnie kluczowe.', stelle: 5, data: '3 grudnia 2024' },
    { nome: 'Józef L.', testo: 'Podarowałem go żonie i jest bardzo szczęśliwa. Dostawa była szybka, zapłaciłem wygodnie kurierowi.', stelle: 5, data: '15 listopada 2024' },
  ];

  const funzioniDodici = [
    { title: "Siekanie", desc: "warzywa, mięso, orzechy", icon: <Zap className="w-6 h-6 text-orange-600" /> },
    { title: "Miksowanie", desc: "zupy kremowe, koktajle, kaszki", icon: <Soup className="w-6 h-6 text-orange-600" /> },
    { title: "Wyrabianie ciasta", desc: "na chleb, pizzę, desery", icon: <Utensils className="w-6 h-6 text-orange-600" /> },
    { title: "Ubijanie", desc: "śmietana, białka, kremy", icon: <ChefHat className="w-6 h-6 text-orange-600" /> },
    { title: "Gotowanie", desc: "zupy, risotto, sosy", icon: <Flame className="w-6 h-6 text-orange-600" /> },
    { title: "Gotowanie na parze", desc: "warzywa, ryby, mięso", icon: <Wind className="w-6 h-6 text-orange-600" /> },
    { title: "Automatyczne mieszanie", desc: "nie musisz stać przy kuchence", icon: <RefreshCw className="w-6 h-6 text-orange-600" /> },
    { title: "Automatyczne podsmażanie", desc: "bez przypalania", icon: <Flame className="w-6 h-6 text-orange-600" /> },
    { title: "Lekkie smażenie", desc: "z małą ilością lub bez oleju", icon: <Zap className="w-6 h-6 text-orange-600" /> },
    { title: "Wbudowana waga", desc: "ważysz podczas gotowania", icon: <Scale className="w-6 h-6 text-orange-600" /> },
    { title: "Timer i kontrola temperatury", desc: "gotowanie zawsze pod kontrolą", icon: <Timer className="w-6 h-6 text-orange-600" /> },
    { title: "Automatyczne programy", desc: "wybierz i naciśnij przycisk", icon: <CheckCircle className="w-6 h-6 text-orange-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed text-slate-800">
      <Script
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <img
        src="https://offers.italiadrop.com/forms/api/ck/?o=2220&uid=019be502-1631-773c-b833-f6153c79c2cb&lp=2259"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* Barra superiore fissa per urgenza soft */}
      <div className="bg-slate-900 text-white text-center py-2 text-sm font-medium">
        Oferta specjalna na odnowienie magazynu - Ograniczona dostępność
      </div>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl md:hidden">
        <div className="px-4 py-3">
          <button
            onClick={openOrderPopup}
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-transform"
          >
            <span>ZAMÓW TERAZ ZA 299 zł</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <header className="pt-8 pb-6 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
          Uprość swoją kuchnię z robotem <span className="text-orange-600">12 w 1</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium mb-6">
          <strong className="text-slate-900 font-bold">1200 zintegrowanych wideo-przepisów</strong>, które prowadzą Cię krok po kroku.
          Robot automatycznie ustawia czas i temperaturę: niemożliwe się pomylić!
        </p>
        <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm mb-4 border border-green-200">
          <CheckCircle className="w-4 h-4" />
          <span>Płatność przy odbiorze</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden relative border border-slate-200 group">
              <img
                src={slides[currentSlide]}
                alt="Wielofunkcyjny robot kuchenny"
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
                <span className="text-slate-500 text-sm font-medium">4 847 pozytywnych opinii</span>
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-5xl md:text-6xl font-black text-orange-600" style={{ fontFamily: 'var(--font-montserrat)' }}>299 zł</span>
                <span className="text-xl text-slate-400 line-through">599 zł</span>
              </div>

              {/* Box Fiducia Rafforzato */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Bezpieczny i gwarantowany zakup
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Płatność przy odbiorze
                  </li>
                  <li className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-blue-500" />
                    Telefoniczne potwierdzenie zamówienia
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-500" />
                    Dostawa w 2-4 dni
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    2-letnia gwarancja
                  </li>
                </ul>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 px-8 rounded-2xl font-black text-xl transition-all shadow-lg hover:shadow-orange-200 mb-4"
              >
                ZAMÓW TERAZ - PŁACISZ PRZY ODBIORZE
              </button>

              <p className="text-center text-slate-500 text-sm">
                Oferta ważna do wyczerpania zapasów.
              </p>
            </div>

            {/* Benefici principali semplificati */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Dlaczego warto go wybrać:</h3>
              <div className="grid grid-cols-1 gap-4">

                {/* NUOVA CARD VIDEO RICETTE */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><PlayCircle className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">1200 wideo-przepisów</h4>
                    <p className="text-sm text-slate-600">Nie umiesz gotować? Żaden problem. Obserwuj filmy na wyświetlaczu, a robot zrobi resztę.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Utensils className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Przygotuje wszystko w kilka sekund</h4>
                    <p className="text-sm text-slate-600">Siekanie warzyw, mięsa i miksowanie owoców bez wysiłku.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><ChefHat className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Wyrabia i ubija jak profesjonalista</h4>
                    <p className="text-sm text-slate-600">Idealny do domowego chleba, pizzy i deserów.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Flame className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Automatyczne i zdrowe gotowanie</h4>
                    <p className="text-sm text-slate-600">Gotuje risotto i zupy z automatycznym mieszaniem lub na parze.</p>
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
            12 funkcji robota, prosto wyjaśnionych
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
              Nie musisz się niczego uczyć: wybierz program, a robot zrobi wszystko sam.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Wygrywa pod każdym względem</h2>
             <p className="text-slate-500">Porównaj sam: oto dlaczego się opłaca.</p>
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
                       <span className="text-xs uppercase font-bold text-slate-400">Klasyczny</span>
                       <X className="w-6 h-6 text-slate-300" />
                       <span className="text-sm font-medium text-slate-500 leading-tight">{row.without}</span>
                    </div>
                    <div className="p-4 bg-orange-50/50 flex flex-col items-center justify-center text-center gap-2">
                       <span className="text-xs uppercase font-bold text-orange-600">Robot 12w1</span>
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
                    <th className="p-8 text-sm font-bold tracking-widest text-slate-400 uppercase w-1/3">Cecha</th>
                    <th className="p-8 text-sm font-bold tracking-widest text-slate-400 uppercase text-center w-1/3">Tradycyjny sposób</th>
                    <th className="w-1/3 p-0">
                       <div className="bg-orange-600 text-white py-6 text-center font-black text-xl rounded-tl-3xl shadow-lg relative z-10">
                          ROBOT 12w1
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
          <h2 className="text-3xl font-black text-center text-slate-900 mb-12">Co mówią ci, którzy już go używają</h2>
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
            <h2 className="text-3xl md:text-4xl font-black mb-4">Otrzymaj go do domu</h2>
            <p className="text-slate-400 text-lg">
              Wypełnij poniższe dane, abyśmy mogli skontaktować się z Tobą telefonicznie i potwierdzić dostawę.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-800">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
              <div>
                <span className="block font-bold text-slate-900 text-lg">Robot kuchenny 12 w 1</span>
                <span className="text-slate-500 text-sm">Dostawa w 2-4 dni robocze</span>
              </div>
              <div className="text-right">
                <span className="block text-3xl font-black text-orange-600">299 zł</span>
                <span className="text-slate-400 line-through text-sm">599 zł</span>
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
                <label className="block text-slate-700 font-bold mb-2">Imię i Nazwisko</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Np. Jan Kowalski"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Numer telefonu</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Np. +48 123 456 789"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Adres dostawy</label>
                <input
                  type="text"
                  name="address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Ulica, numer, miasto"
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
                {isSubmitting ? 'WYSYŁANIE...' : 'POTWIERDŹ ZAMÓWIENIE'}
              </button>

              <div className="flex items-center gap-2 justify-center text-slate-400 text-xs text-center mt-6">
                <Shield className="w-4 h-4" />
                <span>Szanujemy Twoją prywatność. Dane są chronione i używane tylko do dostawy.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white pb-32">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center text-slate-900 mb-10">Często zadawane pytania</h2>
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

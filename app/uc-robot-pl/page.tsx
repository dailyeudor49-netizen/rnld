'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { saveUserDataToStorage } from '@/app/lib/facebook/capi';
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

export default function RobotOdkurzaczLanding() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [submitError, setSubmitError] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  // Check for duplicate submissions (phone number)
  const checkDuplicatePhone = (phone: string): boolean => {
    const STORAGE_KEY = 'uc_robot_pl_submissions';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;

    try {
      const submissions: { phone: string; timestamp: number }[] = JSON.parse(stored);
      const normalizedPhone = phone.replace(/\D/g, '');
      return submissions.some(s => s.phone === normalizedPhone);
    } catch {
      return false;
    }
  };

  // Check if device has already submitted (any phone number)
  const checkDeviceSubmitted = (): boolean => {
    const DEVICE_KEY = 'uc_robot_pl_device_submitted';
    return localStorage.getItem(DEVICE_KEY) === 'true';
  };

  const saveSubmission = (phone: string) => {
    const STORAGE_KEY = 'uc_robot_pl_submissions';
    const DEVICE_KEY = 'uc_robot_pl_device_submitted';
    const normalizedPhone = phone.replace(/\D/g, '');
    const stored = localStorage.getItem(STORAGE_KEY);
    let submissions: { phone: string; timestamp: number }[] = [];

    try {
      if (stored) submissions = JSON.parse(stored);
    } catch {
      submissions = [];
    }

    submissions.push({ phone: normalizedPhone, timestamp: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    localStorage.setItem(DEVICE_KEY, 'true');
  };
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

  // Countdown timer
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

  // Auto-slide
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
      setSubmitError('Proszę wypełnić wszystkie pola!');
      return;
    }

    // Check for duplicate submission (phone or device)
    if (checkDuplicatePhone(orderData.phone)) {
      setIsDuplicate(true);
      setSubmitError('Ten numer telefonu jest już w naszym systemie. Wkrótce się z Tobą skontaktujemy!');
      return;
    }

    if (checkDeviceSubmitted()) {
      setIsDuplicate(true);
      setSubmitError('Z tego urządzenia zostało już złożone zamówienie. Wkrótce się z Tobą skontaktujemy!');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const tmfpInput = e.currentTarget.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';

      const params = new URLSearchParams({
        uid: '019a913a-422a-770d-8b80-6aa9c3b58776',
        key: 'e0b35b6504ae459988cf25',
        offer: '1257',
        lp: '1276',
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

      await fetch('https://offers.uncappednetwork.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      // Save submission to prevent duplicates
      saveSubmission(orderData.phone);

      saveUserDataToStorage({
        nome: orderData.name || '',
        cognome: '',
        telefono: orderData.phone || '',
        indirizzo: orderData.address || '',
      });
      router.push('/ty/ty-uc-robot-pl');
    } catch (error) {
      console.error(error);
      router.push('/ty/ty-uc-robot-pl');
    } finally {
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Odkurzanie + Mopowanie", robot: "OBA W JEDNYM", without: "Tylko odkurzanie" },
    { feature: "Opróżnianie", robot: "AUTOMATYCZNE 60 DNI", without: "Ręczne, codziennie" },
    { feature: "Sierść i włosy", robot: "SZCZOTKA ANTYSPLĄTUJĄCA", without: "Splątują się i blokują" },
    { feature: "Nawigacja", robot: "LIDAR LASER 360°", without: "Losowa, uderza w meble" },
    { feature: "Filtr antyalergiczny", robot: "HEPA H13 CERTYFIKOWANY", without: "Podstawowy filtr" },
    { feature: "Pełna cena", robot: "339 ZŁ ZE STACJĄ", without: "1500+ zł za to samo" },
  ];

  const faqs = [
    {
      question: "Jak działa płatność?",
      answer: "Płacisz przy odbiorze, gotówką kurierowi. Nie musisz nic płacić online. Wypełniasz formularz, dzwonimy w celu potwierdzenia i w ciągu 24-48 godzin otrzymujesz paczkę. Zero ryzyka."
    },
    {
      question: "Czy muszę codziennie opróżniać?",
      answer: "Nie, stacja automatycznie opróżnia do 3-litrowego worka. Worek wymieniasz co 2 miesiące. Nigdy nie dotykasz kurzu."
    },
    {
      question: "Czy działa z sierścią zwierząt?",
      answer: "Tak, szczotka antysplątująca została zaprojektowana do sierści i długich włosów. Nigdy się nie blokuje. Potwierdza to ponad 800 właścicieli zwierząt."
    },
    {
      question: "Co jeśli mi się nie spodoba?",
      answer: "Masz 30 dni na zwrot. Pełny zwrot pieniędzy, darmowa wysyłka zwrotna, bez pytań. Ale 96% klientów go zatrzymuje."
    }
  ];

  const reviews = [
    { nome: 'Tomasz K.', paese: 'Polska', flag: '🇵🇱', testo: 'Trzy duże psy. Odkurzałem CODZIENNIE. Z tym robotem odkurzam raz w TYGODNIU, tylko kąty. On robi 90% pracy. Najlepszy zakup ostatnich 5 lat.', stelle: 5, data: '5 dni temu', risposta: 'Tomasz, dziękujemy! Właściciele zwierząt to nasi najbardziej zadowoleni klienci.' },
    { nome: 'Katarzyna N.', paese: 'Polska', flag: '🇵🇱', testo: 'Mąż był sceptyczny. "Za tę cenę to będzie zabawka". Po 2 tygodniach przeprosił. Sprząta LEPIEJ niż nasz stary Roomba za 2000 zł. Stacja samoczyszcząca jest genialna.', stelle: 5, data: '1 tydzień temu' },
    { nome: 'Piotr S.', paese: 'Polska', flag: '🇵🇱', testo: 'Mieszkanie 85m² na dwóch poziomach. Noszę go na górę i dół i wszystko robi sam. Bateria nie do wyczerpania, nigdy nie musiałem przerywać. Cichy, włączam gdy pracuję z domu.', stelle: 5, data: '3 dni temu', risposta: 'Piotr, dokładnie! Bateria 5200mAh wytrzymuje nawet 6 godzin!' },
    { nome: 'Ewa L.', paese: 'Polska', flag: '🇵🇱', testo: 'Mam 68 lat i problemy z kręgosłupem. Nie mogę już odkurzać. Ten robot zmienił moje życie. Programuję go i on robi wszystko. Wreszcie mogę cieszyć się czystym domem bez bólu.', stelle: 5, data: '4 dni temu' },
    { nome: 'Grzegorz V.', paese: 'Polska', flag: '🇵🇱', testo: 'Całe życie alergia na roztocza. Odkąd używam tego robota z filtrem HEPA, budzę się bez zatkanego nosa. Różnica jest OGROMNA. Powinienem był kupić lata temu.', stelle: 5, data: '2 tygodnie temu', risposta: 'Grzegorz, filtr HEPA H13 naprawdę robi różnicę dla alergików!' },
    { nome: 'Zofia W.', paese: 'Polska', flag: '🇵🇱', testo: 'Porównałam go z Roborockiem szwagra za 3000 zł. TE SAME FUNKCJE. On nie mógł uwierzyć. Pokazałam mu stację samoczyszczącą i mopującą. Teraz też chce takiego.', stelle: 5, data: '1 tydzień temu' },
    { nome: 'Adam M.', paese: 'Polska', flag: '🇵🇱', testo: 'Dom z 3 kotami. Sierść była koszmarem. Teraz robot przejeżdża 2x dziennie i dom jest zawsze idealny. Goście nie wierzą, że mam 3 koty. NAJLEPSZY PREZENT, jaki sobie kiedykolwiek dałem.', stelle: 5, data: '6 dni temu' },
    { nome: 'Stanisław H.', paese: 'Polska', flag: '🇵🇱', testo: 'Długa zima, dom ciągle zamknięty. Kurz zbierał się szybko. Teraz robot sprząta codziennie gdy jestem w pracy. Wracam i oddycham czystym powietrzem. Wart każdej złotówki.', stelle: 5, data: '10 dni temu', risposta: 'Stanisław, dokładnie! Idealny na długie zimy.' },
    { nome: 'Justyna T.', paese: 'Polska', flag: '🇵🇱', testo: 'Długie włosy wszędzie, to był mój koszmar. Ten robot WSZYSTKO zbiera bez blokowania się. Szczotka nigdy się nie zatyka. Próbowałam 3 roboty wcześniej, wreszcie jeden, który działa!', stelle: 5, data: '8 dni temu' },
    { nome: 'Łukasz B.', paese: 'Polska', flag: '🇵🇱', testo: 'Używam od 2 miesięcy, codziennie. Zero problemów. Jakość jak w robotach za 3000 zł. Zaoszczędziłem mnóstwo pieniędzy i mam zawsze czysty dom. Polecam każdemu.', stelle: 5, data: '12 dni temu', risposta: 'Łukasz, dziękujemy za zaufanie! Jakość mówi sama za siebie.' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed">
      {/* Fingerprint Script */}
      <Script
        src="https://offers.uncappednetwork.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Click Pixel */}
      <img
        src="https://offers.uncappednetwork.com/forms/api/ck/?o=1257&uid=019a913a-422a-770d-8b80-6aa9c3b58776&lp=1276"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-blue-600 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-red-600 font-bold text-sm animate-pulse">Zostało tylko {stockLeft} sztuk!</span>
            <span className="text-green-700 font-black text-xl">339 zł</span>
          </div>
          <button
            onClick={openOrderPopup}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-black text-lg hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>ZAMÓW TERAZ — PŁATNOŚĆ PRZY ODBIORZE</span>
          </button>
        </div>
      </div>

      {/* URGENCY HEADER BAR */}
      <div className="bg-red-600 text-white py-2 text-center font-bold text-sm px-4">
        <div className="flex items-center justify-center gap-2">
          <Timer className="w-4 h-4 animate-pulse" />
          <span>BŁYSKAWICZNA PROMOCJA — Kończy się za: {formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Hero Title Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 pt-6 pb-4 md:py-8 px-4 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-red-500 text-white text-sm md:text-base font-bold py-2 px-4 rounded-full inline-block mb-4 animate-pulse">
            CAŁKOWITA WYPRZEDAŻ — OSTATNIE {stockLeft} SZTUKI
          </div>
          <h1 className="text-2xl md:text-4xl font-black mb-4 leading-tight tracking-tight">
            ODKURZA, MOPUJE I OPRÓŻNIA SIĘ<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">WSZYSTKO W JEDNYM PRZEJEŹDZIE</span>
          </h1>
          <p className="text-lg md:text-xl mb-4 text-gray-300">
            Wyrzuć mopa, wiadro i miotłę. <span className="font-bold text-white">On robi wszystko sam.</span>
          </p>
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 inline-block">
            <span className="line-through text-gray-400 text-xl">499 zł</span>
            <span className="text-4xl md:text-5xl font-black text-white ml-3">339 zł</span>
            <span className="block text-green-400 font-bold mt-1">Stacja automatyczna GRATIS (wartość 1999 zł)</span>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <main className="max-w-6xl mx-auto px-4 pt-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative border-2 border-gray-200">
              <img
                src={slides[currentSlide]}
                alt="Profesjonalny robot odkurzający ze stacją"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg animate-bounce">
                STACJA GRATIS!
              </div>
              <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-lg">
                -{Math.round((1 - 339/499) * 100)}%
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

            {/* Thumbnails */}
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

            {/* Key Features Mobile */}
            <div className="bg-gray-50 rounded-xl p-5 text-left lg:hidden border border-gray-200">
              <h3 className="text-lg font-black text-gray-800 mb-3 text-center">Dlaczego jest inny niż pozostałe:</h3>
              <ul className="space-y-3 text-gray-700 text-base">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Odkurza i mopuje jednocześnie</strong> — Jeden przejazd, idealna podłoga.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Trash2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Robot sam się opróżnia w stacji</strong> — Worek wymieniasz co 2 miesiące.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Dog className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Koniec z sierścią i włosami</strong> — Szczotka antysplątująca, nigdy się nie blokuje.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Czyste powietrze</strong> — Filtr HEPA wyłapuje 99,97% alergenów.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Navigation className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Nawigacja laserowa</strong> — Mapuje mieszkanie, nie uderza w meble.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {/* Price Box */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 mb-6 shadow-xl relative overflow-hidden">
              {/* Sconto Badge */}
              <div className="absolute -top-1 -right-1 bg-red-600 text-white text-base font-black w-20 h-20 rounded-bl-3xl shadow-lg flex items-center justify-center text-center leading-tight transform rotate-0">
                -32%
              </div>

              <h2 className="text-xl font-black text-gray-900 mb-1">
                NovaClean X1 PRO + Stacja OMNI
              </h2>
              <p className="text-sm text-gray-500 mb-2">Profesjonalny robot odkurzająco-mopujący</p>

              <div
                className="flex items-center space-x-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-bold">4,9/5</span>
                <span className="text-gray-500 text-sm underline">(1 248 opinii)</span>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 line-through text-xl">499 zł</span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">OSZCZĘDZASZ 160 ZŁ</span>
                </div>
                <div className="text-center">
                  <span className="text-5xl font-black text-green-700">339 zł</span>
                </div>
              </div>

              {/* Delivery & Payment */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700">Wysyłka:</span>
                  <span className="font-bold text-gray-900 ml-auto">24-48 godzin</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700">Płatność:</span>
                  <span className="font-bold text-gray-900 ml-auto">Przy odbiorze</span>
                </div>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl font-black text-lg transition-all cursor-pointer shadow-lg transform hover:scale-[1.02]"
              >
                ZAMÓW TERAZ — PŁATNOŚĆ PRZY ODBIORZE
              </button>

              {/* Urgency */}
              <div className="flex items-center justify-center gap-2 mt-3 text-red-600 font-bold">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>W tej cenie zostało tylko {stockLeft} sztuk!</span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <span className="text-gray-700 font-medium">2 lata gwarancji</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <RefreshCw className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <span className="text-gray-700 font-medium">30 dni na zwrot</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <ThumbsUp className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <span className="text-gray-700 font-medium">Wsparcie 24/7</span>
                </div>
              </div>
            </div>

            {/* Key Features Desktop */}
            <div className="hidden lg:block bg-gray-50 rounded-xl p-5 text-left border border-gray-200">
              <h3 className="text-lg font-black text-gray-800 mb-3 text-center">Dlaczego jest inny niż pozostałe:</h3>
              <ul className="space-y-3 text-gray-700 text-base">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Odkurza i mopuje jednocześnie</strong> — Jeden przejazd, idealna podłoga.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Trash2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Robot sam się opróżnia w stacji</strong> — Worek wymieniasz co 2 miesiące.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Dog className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Koniec z sierścią i włosami</strong> — Szczotka antysplątująca, nigdy się nie blokuje.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Czyste powietrze</strong> — Filtr HEPA wyłapuje 99,97% alergenów.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Navigation className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Nawigacja laserowa</strong> — Mapuje mieszkanie, nie uderza w meble.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* PROBLEMA / AGITAZIONE */}
      <section className="py-10 md:py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-8 text-gray-900 tracking-tight">
            Zapomnij o sprzątaniu.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🦴</div>
              <h4 className="font-black text-gray-900 mb-1">Koniec z bólem pleców</h4>
              <p className="text-gray-500 text-sm">Nie musisz się schylać. On wjeżdża wszędzie.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🧹</div>
              <h4 className="font-black text-gray-900 mb-1">Ręce zawsze czyste</h4>
              <p className="text-gray-500 text-sm">Robot sam się opróżnia w stacji. Nigdy nie dotykasz kurzu.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🐕</div>
              <h4 className="font-black text-gray-900 mb-1">Sierść zwierząt? Zniknęła</h4>
              <p className="text-gray-500 text-sm">Szczotka antysplątująca. Nigdy się nie blokuje.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">💨</div>
              <h4 className="font-black text-gray-900 mb-1">Wreszcie czyste powietrze</h4>
              <p className="text-gray-500 text-sm">Filtr HEPA. Wyłapuje 99,97% alergenów.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-white text-center shadow-2xl">
            <p className="text-lg md:text-xl mb-4">
              <span className="text-blue-400 font-bold">1 847 zamówień</span> w ciągu ostatnich 24 godzin
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">6000 Pa</div>
                <p className="text-xs text-gray-300">Mocne ssanie</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">6 godzin</div>
                <p className="text-xs text-gray-300">Nieograniczona bateria</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">2 miesiące</div>
                <p className="text-xs text-gray-300">Bez opróżniania</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">4,9/5</div>
                <p className="text-xs text-gray-300">1 248 opinii</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAZIONE FEATURE */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
              GRATIS W CENIE (WARTOŚĆ 1999 ZŁ)
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900">
              STACJA, KTÓRA <span className="text-blue-600">ROBI CAŁĄ ROBOTĘ ZA CIEBIE</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Robot wraca do bazy, opróżnia się, myje mopa, ładuje. On jest Twoim nowym osobistym asystentem.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-start">
            {/* Box 1 */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 0 ? null : 0); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/svuota.webp" alt="Automatyczne opróżnianie" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 0 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">ROBOT SAM SIĘ OPRÓŻNIA W STACJI</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 0 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 0 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Wraca do bazy i SAM się opróżnia do 3-litrowego worka. <strong>Worek wymieniasz co 2 miesiące.</strong> Nigdy więcej rąk w kurzu. Nigdy więcej kichania.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 0 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Worek wymieniasz co 2 miesiące</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">ROBOT SAM SIĘ OPRÓŻNIA W STACJI</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 0 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 0 ? 'hidden' : 'mt-1'}`}>Worek wymieniasz co 2 miesiące</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 0 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Wraca do bazy i SAM się opróżnia do 3-litrowego worka. Worek wymieniasz co 2 miesiące. Nigdy więcej rąk w kurzu.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2 */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 1 ? null : 1); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/mocio.webp" alt="Automatyczne mycie mopa" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 1 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">MOP ROBOTA ZAWSZE CZYSTY</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 1 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 1 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Po każdym mopowaniu <strong>stacja myje mopa</strong> czystą wodą. Nie dotykasz niczego. Podłoga zawsze idealna.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 1 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Stacja myje za Ciebie</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">MOP ROBOTA ZAWSZE CZYSTY</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 1 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 1 ? 'hidden' : 'mt-1'}`}>Stacja myje za Ciebie</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 1 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Po każdym mopowaniu stacja myje mopa czystą wodą. Nie dotykasz niczego. Podłoga zawsze idealna.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 2 ? null : 2); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/muffa.webp" alt="Suszenie gorącym powietrzem" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 2 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">KONIEC Z ZAPACHEM I PLEŚNIĄ</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 2 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 2 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Mopa suszy w <strong>45°C</strong> po każdym mopowaniu. Brak bakterii, brak nieprzyjemnego zapachu. <strong>PRAWDZIWA higiena.</strong>
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 2 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Szybkie suszenie w 45°C</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">KONIEC Z ZAPACHEM I PLEŚNIĄ</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 2 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 2 ? 'hidden' : 'mt-1'}`}>Szybkie suszenie w 45°C</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 2 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Mopa suszy w 45°C po każdym mopowaniu. Brak bakterii, brak nieprzyjemnego zapachu. PRAWDZIWA higiena.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 4 - Nawigacja + Bateria */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 3 ? null : 3); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/laser.webp" alt="Nawigacja LiDAR" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 3 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">NAWIGACJA LASEROWA</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 3 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 3 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Mapuje całe mieszkanie z milimetrową precyzją. <strong>Omija przeszkody</strong>, nie uderza w meble. Bateria się rozładowała? <strong>Ładuje i sam kontynuuje.</strong>
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 3 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Mapuje, omija, nigdy się nie zatrzymuje</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">NAWIGACJA LASEROWA</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 3 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 3 ? 'hidden' : 'mt-1'}`}>Mapuje, omija przeszkody</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 3 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Mapuje mieszkanie z milimetrową precyzją. Omija przeszkody, nie uderza w meble. Ładuje i sam kontynuuje.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 5 - Sierść i włosy */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 4 ? null : 4); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/6.webp" alt="Sierść i włosy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 4 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">KONIEC Z SIERŚCIĄ I WŁOSAMI</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 4 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 4 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Szczotka antysplątująca <strong>do sierści zwierząt, długich włosów i uporczywych zabrudzeń</strong>. Nigdy się nie blokuje. Zbiera wszystko za pierwszym przejazdem.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 4 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Szczotka antysplątująca, nigdy się nie blokuje</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">KONIEC Z SIERŚCIĄ I WŁOSAMI</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 4 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 4 ? 'hidden' : 'mt-1'}`}>Szczotka antysplątująca</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 4 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Szczotka antysplątująca do sierści zwierząt, długich włosów i uporczywych zabrudzeń. Nigdy się nie blokuje. Zbiera wszystko za pierwszym przejazdem.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 6 */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 5 ? null : 5); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/divano.webp" alt="Sterowanie przez aplikację" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 5 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">STEROWANIE Z KANAPY</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 5 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 5 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Pilot w zestawie. Aplikacja jeśli chcesz. <strong>"Alexa, posprzątaj"</strong> i rusza. Nie musisz nawet wstawać.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 5 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Aplikacja, Alexa, pilot</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">STEROWANIE Z KANAPY</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 5 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 5 ? 'hidden' : 'mt-1'}`}>Aplikacja, Alexa, pilot</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 5 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Pilot w zestawie. Aplikacja jeśli chcesz. "Alexa, posprzątaj" i rusza. Nie musisz nawet wstawać.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIFICHE TECNICHE */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-gray-900">
            LICZBY, KTÓRE MÓWIĄ SAME ZA SIEBIE
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Porównaj z modelami premium: nie ma konkurencji.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Gauge className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">6000 Pa</div>
              <p className="text-sm text-gray-500">Siła ssania</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Battery className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">5200 mAh</div>
              <p className="text-sm text-gray-500">Bateria (6 godzin)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Cpu className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">LiDAR 4.0</div>
              <p className="text-sm text-gray-500">Nawigacja laserowa</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Volume2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">&lt;55 dB</div>
              <p className="text-sm text-gray-500">Super cichy</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Wifi className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">WiFi 5GHz</div>
              <p className="text-sm text-gray-500">Aplikacja + Alexa/Google</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Layers className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">Stacja 3L</div>
              <p className="text-sm text-gray-500">Worek na 2 miesiące</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Maximize className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">20 mm</div>
              <p className="text-sm text-gray-500">Pokonuje przeszkody</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <ShieldCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">HEPA H13</div>
              <p className="text-sm text-gray-500">99,97% alergenów</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-gray-900">
            NOVACLEAN X1 vs KONKURENCJA
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Te same funkcje, 1000 zł mniej. Sam policz.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg text-xs md:text-base">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left">Funkcja</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center bg-green-600">NovaClean X1</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center">Inne roboty</th>
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

      {/* URGENCY STRIP */}
      <section className="bg-red-600 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white text-xl font-black mb-3">
            Całkowita wyprzedaż — Zostało tylko {stockLeft} sztuk
          </p>
          <p className="text-white/80 mb-4">Gdy się skończą, cena wraca do 499 zł. Stacja gratis tylko do tych ostatnich sztuk.</p>
          <button
            onClick={openOrderPopup}
            className="bg-white text-red-600 hover:bg-gray-100 py-4 px-10 rounded-xl font-black text-xl transition-all cursor-pointer shadow-lg"
          >
            ZAMÓW TERAZ — 339 ZŁ
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews-section" className="py-12 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-2">
            1 248 ZADOWOLONYCH KLIENTÓW
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <span className="text-white font-bold">4,9/5</span>
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
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">Zweryfikowany zakup</span>
                {review.risposta && (
                  <div className="mt-3 bg-gray-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                    <p className="text-xs font-bold text-gray-600 mb-1">Odpowiedź sprzedawcy:</p>
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
                Pokaż więcej opinii
              </button>
            </div>
          )}
        </div>
      </section>

      {/* GARANZIA */}
      <section className="py-12 bg-green-50 border-y border-green-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-white border-4 border-green-500 rounded-full flex flex-col items-center justify-center shadow-xl">
                <span className="text-green-600 font-black text-4xl">30</span>
                <span className="text-gray-900 font-bold text-xs uppercase">Dni</span>
                <span className="text-green-600 font-bold text-sm">Gwarancja</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                NIE PODOBA SIĘ? ZWRACAMY WSZYSTKIE PIENIĄDZE. KROPKA.
              </h2>
              <p className="text-gray-700 mb-4 text-lg">
                Masz 30 dni na przetestowanie. Jeśli nie będziesz ZACHWYCONY — z jakiegokolwiek powodu — zadzwoń, wyślemy kuriera po odbiór i zwrócimy każdą złotówkę. <strong>DARMOWY zwrot. Bez pytań. Zero ryzyka dla Ciebie.</strong> Ale 96% klientów go zatrzymuje.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="bg-white px-4 py-2 rounded-lg border border-green-200 font-bold text-gray-800 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> Zero ryzyka
                </span>
                <span className="bg-white px-4 py-2 rounded-lg border border-green-200 font-bold text-gray-800 text-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-green-500" /> Darmowy zwrot
                </span>
                <span className="bg-white px-4 py-2 rounded-lg border border-green-200 font-bold text-gray-800 text-sm flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-green-500" /> 2 lata gwarancji
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 text-center">
            JAK ZAMÓWIĆ (3 PROSTE KROKI)
          </h2>
          <div className="flex flex-row items-start justify-center gap-2 md:gap-8">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg">1</div>
              <p className="text-gray-700 text-sm font-medium">Wypełnij formularz swoimi danymi</p>
            </div>
            <div className="text-gray-300 text-2xl mt-4">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg">2</div>
              <p className="text-gray-700 text-sm font-medium">Dzwonimy w celu potwierdzenia</p>
            </div>
            <div className="text-gray-300 text-2xl mt-4">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg">3</div>
              <p className="text-gray-700 text-sm font-medium">W 24-48h dostajesz i płacisz KURIEROWI!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order-form-section" className="bg-gray-900 py-12 pb-8">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-red-600 text-white font-bold text-center py-2 rounded-full mb-4 animate-pulse">
            W tej cenie zostało tylko {stockLeft} sztuk
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 text-center">
            Zamów teraz
          </h2>
          <p className="text-gray-400 mb-6 text-center">
            Wypełnij formularz. Płacisz tylko przy odbiorze.
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            {/* Product Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-black text-gray-900">NovaClean X1 PRO</span>
                  <p className="text-sm text-gray-600">+ Stacja OMNI + Akcesoria</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">STACJA GRATIS</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">DARMOWA WYSYŁKA</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm block">499 zł</span>
                  <span className="text-3xl font-black text-green-700">339 zł</span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-center">
              <div className="flex items-center justify-center gap-2 text-red-700 font-bold">
                <Timer className="w-5 h-5" />
                <span>Oferta kończy się za: {formatTime(timeLeft)}</span>
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
                  <label className="block text-gray-800 font-bold mb-2">Imię i nazwisko *</label>
                  <input
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg"
                    placeholder="Jan Kowalski"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-2">Telefon (dla kuriera) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg"
                    placeholder="+48 123 456 789"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-2">Pełny adres *</label>
                  <input
                    type="text"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg"
                    placeholder="ul. Główna 10, 00-001 Warszawa"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="border-2 border-green-500 bg-green-50 rounded-xl p-4 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-4 border-green-500 bg-white"></div>
                  <span className="font-bold text-gray-800">Płatność przy odbiorze</span>
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
                {isSubmitting ? 'WYSYŁANIE...' : 'ZAMÓW TERAZ — PŁATNOŚĆ PRZY ODBIORZE'}
                {!isSubmitting && <Truck className="w-6 h-6" />}
              </button>

              <p className="text-center text-gray-400 text-xs mt-4">
                Twoje dane są chronione szyfrowanie SSL. Używamy ich WYŁĄCZNIE do wysyłki.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 py-10 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 text-gray-900">
            CZĘSTO ZADAWANE PYTANIA
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

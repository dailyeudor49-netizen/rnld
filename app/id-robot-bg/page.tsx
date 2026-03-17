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

export default function RobotAspirapolvereProLanding() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [submitError, setSubmitError] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);

  const checkDuplicatePhone = (phone: string): boolean => {
    const stored = localStorage.getItem('id_robot_bg_submissions');
    if (!stored) return false;
    try {
      const submissions: { phone: string }[] = JSON.parse(stored);
      return submissions.some(s => s.phone === phone.replace(/\D/g, ''));
    } catch { return false; }
  };

  const checkDeviceSubmitted = (): boolean => {
    return localStorage.getItem('id_robot_bg_device_submitted') === 'true';
  };

  const saveSubmission = (phone: string) => {
    const normalizedPhone = phone.replace(/\D/g, '');
    const stored = localStorage.getItem('id_robot_bg_submissions');
    let submissions: { phone: string; timestamp: number }[] = [];
    try { if (stored) submissions = JSON.parse(stored); } catch { submissions = []; }
    submissions.push({ phone: normalizedPhone, timestamp: Date.now() });
    localStorage.setItem('id_robot_bg_submissions', JSON.stringify(submissions));
    localStorage.setItem('id_robot_bg_device_submitted', 'true');
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
      setSubmitError('Моля, попълнете всички полета!');
      return;
    }

    if (checkDuplicatePhone(orderData.phone)) {
      setIsDuplicate(true);
      setSubmitError('Този телефонен номер вече е в нашата система. Скоро ще се свържем с вас!');
      return;
    }

    if (checkDeviceSubmitted()) {
      setIsDuplicate(true);
      setSubmitError('От това устройство вече е направена поръчка. Скоро ще се свържем с вас!');
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
        offer: '2370',
        lp: '2409',
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

      const responseText = await response.text();
      console.log('[Network API] Response status:', response.status);
      console.log('[Network API] Response body:', responseText);

      let responseOk = response.ok;
      try {
        const responseJson = JSON.parse(responseText);
        if (responseJson.status === 'error' || responseJson.error || responseJson.duplicate) {
          console.log('[Network API] Lead rejected by network:', responseJson);
          responseOk = false;
        }
      } catch { /* response is not JSON, use HTTP status */ }

      if (responseOk) {
        saveSubmission(orderData.phone);
        saveUserDataToStorage({
          nome: orderData.name || '',
          cognome: '',
          telefono: orderData.phone || '',
          indirizzo: orderData.address || '',
        });
        router.push('/ty/ty-id-robot-bg');
      } else {
        setSubmitError('Възникна грешка. Моля, опитайте отново.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('[Network API] Error:', error);
      setSubmitError('Възникна грешка. Моля, опитайте отново.');
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Прахосмукане + Миене", robot: "И ДВЕТЕ ВКЛЮЧЕНИ", without: "Само прахосмукане" },
    { feature: "Изпразване", robot: "АВТОМАТИЧНО 60 ДНИ", without: "Ръчно всеки ден" },
    { feature: "Косми и косa", robot: "ЧЕТКА ПРОТИВ ЗАПЛИТАНЕ", without: "Заплитат се и блокират" },
    { feature: "Навигация", robot: "LIDAR ЛАЗЕР 360°", without: "Случайна, удря навсякъде" },
    { feature: "Филтър за алергии", robot: "HEPA H13 СЕРТИФИЦИРАН", without: "Основен филтър" },
    { feature: "Обща цена", robot: "€79 СЪС СТАНЦИЯ", without: "€500+ за същите функции" },
  ];

  const faqs = [
    {
      question: "Как работи плащането?",
      answer: "Плащате при доставка, в брой на куриера. Не е нужно да плащате нищо онлайн. Попълнете формуляра, ще ви се обадим за потвърждение и ще получите пакета за 24-48 часа. Без риск."
    },
    {
      question: "Трябва ли да го изпразвам всеки ден?",
      answer: "Не, станцията го изпразва автоматично в торба от 3 литра. Сменяте торбата на всеки 2 месеца. Никога не докосвате праха."
    },
    {
      question: "Работи ли с косми от домашни любимци?",
      answer: "Да, четката против заплитане е проектирана за косми и дълга коса. Никога не се задръства. Над 800 клиенти с домашни любимци го потвърждават."
    },
    {
      question: "Ами ако не ми хареса?",
      answer: "Имате 30 дни за връщане. Пълно възстановяване на парите, безплатно връщане, без въпроси. Но 96% от клиентите го запазват."
    }
  ];

  const reviews = [
    { nome: 'Георги К.', paese: 'България', flag: '🇧🇬', testo: 'Три големи кучета. Прахосмукачках ВСЕКИ ДЕН. С този робот прахосмукачка веднъж СЕДМИЧНО за ъглите. 90% от работата я върши той. Най-добрата покупка от последните 5 години.', stelle: 5, data: 'преди 5 дни', risposta: 'Георги, благодаря! Собствениците на домашни любимци са нашите най-доволни клиенти.' },
    { nome: 'Мария Н.', paese: 'България', flag: '🇧🇬', testo: 'Мъжът ми беше скептичен. "На тази цена ще е играчка". След 2 седмици ми се извини. Чисти ПО-ДОБРЕ от стария ни Roomba за €600. Станцията, която се изпразва сама, е гениална.', stelle: 5, data: 'преди 1 седмица' },
    { nome: 'Иван С.', paese: 'България', flag: '🇧🇬', testo: 'Апартамент от 85кв.м на два етажа. Нося го нагоре-надолу и върши всичко сам. Батерията е безкрайна, никога не е трябвало да го спирам насред работа. Много тих, пускам го докато работя от вкъщи.', stelle: 5, data: 'преди 3 дни', risposta: 'Иван, точно така! Батерията от 5200mAh гарантира до 6 часа!' },
    { nome: 'Елена Л.', paese: 'България', flag: '🇧🇬', testo: 'На 68 години съм с проблеми с гърба. Не мога вече да прахосмукачкам. Този робот ми промени живота. Програмирам го и той върши всичко. Най-накрая мога да се наслаждавам на чист дом без болки.', stelle: 5, data: 'преди 4 дни' },
    { nome: 'Димитър В.', paese: 'България', flag: '🇧🇬', testo: 'Алергичен към акари от винаги. Откакто използвам този робот с HEPA филтър, събуждам се без запушен нос. Разликата е ОГРОМНА. Трябваше да го купя преди години.', stelle: 5, data: 'преди 2 седмици', risposta: 'Димитър, HEPA H13 филтърът наистина прави разлика за тези, които страдат от алергии!' },
    { nome: 'Петя У.', paese: 'Румъния', flag: '🇷🇴', testo: 'Сравних това с Roborock за €900 на шурея ми. СЪЩИТЕ ФУНКЦИИ. Той не можеше да повярва. Показах му станцията, която изпразва и мие. Сега и той иска един.', stelle: 5, data: 'преди 1 седмица' },
    { nome: 'Силвия М.', paese: 'България', flag: '🇧🇬', testo: 'Къща с 3 котки. Космите бяха кошмар. Сега роботът минава 2 пъти на ден и къщата е винаги перфектна. Гостите не вярват, че имам 3 котки. НАЙ-ДОБРИЯТ ПОДАРЪК, който съм си правила.', stelle: 5, data: 'преди 6 дни' },
    { nome: 'Николай Х.', paese: 'България', flag: '🇧🇬', testo: 'Дълга зима, къща винаги затворена. Прахът се натрупваше бързо. Сега роботът чисти всеки ден докато съм на работа. Връщам се вкъщи и дишам чист въздух. Струва си всяка стотинка.', stelle: 5, data: 'преди 10 дни', risposta: 'Николай, точно така! Перфектен за българските зими.' },
    { nome: 'Анна Т.', paese: 'България', flag: '🇧🇬', testo: 'Дълга коса навсякъде, беше ми кошмар. Този робот засмуква ВСИЧКО без да се заплита. Четката никога не се блокира. Пробвах 3 робота преди този, най-накрая един, който работи!', stelle: 5, data: 'преди 8 дни' },
    { nome: 'Стефан Б.', paese: 'България', flag: '🇧🇬', testo: 'Използвам го от 2 месеца, всеки ден. Нула проблеми. Качеството е идентично с роботи за €1000. Спестих цяло състояние и имам винаги чист дом. Препоръчвам на всички.', stelle: 5, data: 'преди 12 дни', risposta: 'Стефан, благодаря за доверието! Качеството говори само за себе си.' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed">
      {/* Fingerprint Script */}
      <Script
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Click Pixel */}
      <img
        src="https://offers.italiadrop.com/forms/api/ck/?o=2370&uid=019be502-1631-773c-b833-f6153c79c2cb&lp=2409"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-blue-600 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-red-600 font-bold text-sm animate-pulse">Само {stockLeft} останаха!</span>
            <span className="text-green-700 font-black text-xl">€79,00</span>
          </div>
          <button
            onClick={openOrderPopup}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-black text-lg hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>ПОРЪЧАЙ СЕГА - ПЛАЩАНЕ ПРИ ДОСТАВКА</span>
          </button>
        </div>
      </div>

      {/* URGENCY HEADER BAR */}
      <div className="bg-red-600 text-white py-2 text-center font-bold text-sm px-4">
        <div className="flex items-center justify-center gap-2">
          <Timer className="w-4 h-4 animate-pulse" />
          <span>СВЕТКАВИЧНА ОФЕРТА - Изтича след: {formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Hero Title Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 pt-6 pb-4 md:py-8 px-4 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-red-500 text-white text-sm md:text-base font-bold py-2 px-4 rounded-full inline-block mb-4 animate-pulse">
            ТОТАЛНА РАЗПРОДАЖБА — ПОСЛЕДНИ {stockLeft} БРОЯ
          </div>
          <h1 className="text-2xl md:text-4xl font-black mb-4 leading-tight tracking-tight">
            ВСМУКВА, МИЕ И СЕ ИЗПРАЗВА<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">С ЕДНО ПРЕМИНАВАНЕ</span>
          </h1>
          <p className="text-lg md:text-xl mb-4 text-gray-300">
            Изхвърлете мопа, кофата и метлата. <span className="font-bold text-white">Той върши всичко сам.</span>
          </p>
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 inline-block">
            <span className="line-through text-gray-400 text-xl">€199,90</span>
            <span className="text-4xl md:text-5xl font-black text-white ml-3">€79<span className="text-2xl">,00</span></span>
            <span className="block text-green-400 font-bold mt-1">Станция за автоматично изпразване ВКЛЮЧЕНА (на стойност €199)</span>
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
                alt="Професионална роботизирана прахосмукачка със станция"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg animate-bounce">
                СТАНЦИЯ ВКЛЮЧЕНА!
              </div>
              <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-lg">
                -{Math.round((1 - 79/199.90) * 100)}%
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
              <h3 className="text-lg font-black text-gray-800 mb-3 text-center">Защо е различен от другите:</h3>
              <ul className="space-y-3 text-gray-700 text-base">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Всмуква и мие заедно</strong> — Едно преминаване, перфектни подове.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Trash2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Роботът се изпразва сам в базата</strong> — Сменяте торбата на всеки 2 месеца.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Dog className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Довиждане косми и коса</strong> — Четка против заплитане, никога не се блокира.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Чист въздух</strong> — HEPA филтър улавя 99.97% алергени.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Navigation className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Лазерна навигация</strong> — Картографира дома, не удря в мебелите.</span>
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
                -60%
              </div>

              <h2 className="text-xl font-black text-gray-900 mb-1">
                NovaClean X1 PRO + OMNI Станция
              </h2>
              <p className="text-sm text-gray-500 mb-2">Професионална роботизирана прахосмукачка и миячка на подове</p>

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
                <span className="text-gray-500 text-sm underline">(1 248 отзива)</span>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 line-through text-xl">€199,90</span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">СПЕСТЯВАТЕ €120,90</span>
                </div>
                <div className="text-center">
                  <span className="text-5xl font-black text-green-700">€79<span className="text-2xl">,00</span></span>
                </div>
              </div>

              {/* Delivery & Payment */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700">Доставка:</span>
                  <span className="font-bold text-gray-900 ml-auto">24-48 часа</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700">Плащане:</span>
                  <span className="font-bold text-gray-900 ml-auto">При доставка</span>
                </div>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl font-black text-lg transition-all cursor-pointer shadow-lg transform hover:scale-[1.02]"
              >
                ПОРЪЧАЙ СЕГА — ПЛАЩАНЕ ПРИ ДОСТАВКА
              </button>

              {/* Urgency */}
              <div className="flex items-center justify-center gap-2 mt-3 text-red-600 font-bold">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>Само {stockLeft} броя останаха на тази цена!</span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <span className="text-gray-700 font-medium">Гаранция 2 години</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <RefreshCw className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <span className="text-gray-700 font-medium">Връщане 30 дни</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <ThumbsUp className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <span className="text-gray-700 font-medium">Поддръжка 24/7</span>
                </div>
              </div>
            </div>

            {/* Key Features Desktop */}
            <div className="hidden lg:block bg-gray-50 rounded-xl p-5 text-left border border-gray-200">
              <h3 className="text-lg font-black text-gray-800 mb-3 text-center">Защо е различен от другите:</h3>
              <ul className="space-y-3 text-gray-700 text-base">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Всмуква и мие заедно</strong> — Едно преминаване, перфектни подове.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Trash2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Роботът се изпразва сам в базата</strong> — Сменяте торбата на всеки 2 месеца.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Dog className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Довиждане косми и коса</strong> — Четка против заплитане, никога не се блокира.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Чист въздух</strong> — HEPA филтър улавя 99.97% алергени.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Navigation className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Лазерна навигация</strong> — Картографира дома, не удря в мебелите.</span>
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
            Забравете за почистването.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🦴</div>
              <h4 className="font-black text-gray-900 mb-1">Довиждане Болки в Гърба</h4>
              <p className="text-gray-500 text-sm">Не се навеждате вече. Той минава навсякъде.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🧹</div>
              <h4 className="font-black text-gray-900 mb-1">Ръце Винаги Чисти</h4>
              <p className="text-gray-500 text-sm">Роботът се изпразва сам в базата. Никога не докосвате праха.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🐕</div>
              <h4 className="font-black text-gray-900 mb-1">Косми от Животни? Изчезнаха</h4>
              <p className="text-gray-500 text-sm">Четка против заплитане. Никога не се задръства.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">💨</div>
              <h4 className="font-black text-gray-900 mb-1">Най-накрая Чист Въздух</h4>
              <p className="text-gray-500 text-sm">HEPA филтър. Улавя 99.97% алергени.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-white text-center shadow-2xl">
            <p className="text-lg md:text-xl mb-4">
              <span className="text-blue-400 font-bold">1 847 поръчки</span> през последните 24 часа
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">6000 Pa</div>
                <p className="text-xs text-gray-300">Мощно засмукване</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">6 часа</div>
                <p className="text-xs text-gray-300">Безкрайна батерия</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">2 месеца</div>
                <p className="text-xs text-gray-300">Без изпразване</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">4.9/5</div>
                <p className="text-xs text-gray-300">1 248 отзива</p>
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
              ВКЛЮЧЕНА В ЦЕНАТА (НА СТОЙНОСТ €199)
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900">
              СТАНЦИЯТА, КОЯТО <span className="text-blue-600">ЕЛИМИНИРА ВСЯКО ВАШЕ УСИЛИЕ</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Роботът се връща в базата, изпразва се, измива мопа, зарежда се. Вашата нова лична чистачка.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-start">
            {/* Box 1 */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 0 ? null : 0); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/svuota.webp" alt="Автоматично изпразване" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 0 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">РОБОТЪТ СЕ ИЗПРАЗВА САМ В БАЗАТА</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 0 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 0 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Връща се в базата и се изпразва САМ в торба от 3 литра. <strong>Сменяте торбата на всеки 2 месеца.</strong> Никога повече ръце в праха. Никога повече кихане.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 0 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Сменяте торбата на всеки 2 месеца</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">РОБОТЪТ СЕ ИЗПРАЗВА САМ В БАЗАТА</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 0 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 0 ? 'hidden' : 'mt-1'}`}>Сменяте торбата на всеки 2 месеца</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 0 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Връща се в базата и се изпразва САМ в торба от 3 литра. Сменяте торбата на всеки 2 месеца. Никога повече ръце в праха.
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
                <img src="/images/robot-asp/mocio.webp" alt="Автоматично измиване" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 1 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">МОПЪТ НА РОБОТА ВИНАГИ ЧИСТ</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 1 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 1 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        След всяко миене, <strong>станцията измива мопа</strong> с чиста вода. Вие не докосвате нищо. Подовете винаги перфектни.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 1 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Станцията го измива вместо вас</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">МОПЪТ НА РОБОТА ВИНАГИ ЧИСТ</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 1 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 1 ? 'hidden' : 'mt-1'}`}>Станцията го измива вместо вас</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 1 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    След всяко миене, станцията измива мопа с чиста вода. Вие не докосвате нищо. Подовете винаги перфектни.
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
                <img src="/images/robot-asp/muffa.webp" alt="Сушене на топло" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 2 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">ДОВИЖДАНЕ МИРИЗМА И МУХЪЛ</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 2 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 2 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Изсушава мопа на <strong>45°C</strong> след всяко миене. Без бактерии, без лоши миризми. <strong>ИСТИНСКА хигиена.</strong>
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 2 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Бързо сушене на 45°C</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">ДОВИЖДАНЕ МИРИЗМА И МУХЪЛ</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 2 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 2 ? 'hidden' : 'mt-1'}`}>Бързо сушене на 45°C</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 2 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Изсушава мопа на 45°C след всяко миене. Без бактерии, без лоши миризми. ИСТИНСКА хигиена.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 4 - Навигация + Батерия */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 3 ? null : 3); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/laser.webp" alt="LiDAR навигация" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 3 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">ЛАЗЕРНА НАВИГАЦИЯ</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 3 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 3 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Картографира целия дом с милиметрова точност. <strong>Избягва препятствия</strong>, не удря в мебелите. Изтощена батерия? <strong>Зарежда се и продължава сам.</strong>
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 3 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Картографира, избягва препятствия, никога не спира</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">ЛАЗЕРНА НАВИГАЦИЯ</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 3 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 3 ? 'hidden' : 'mt-1'}`}>Картографира, избягва препятствия</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 3 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Картографира целия дом с милиметрова точност. Избягва препятствия, не удря в мебелите. Зарежда се и продължава сам.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 5 - Косми и Коса */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 4 ? null : 4); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/6.webp" alt="Косми и коса" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 4 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">ДОВИЖДАНЕ КОСМИ И КОСА</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 4 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 4 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Четка против заплитане проектирана за <strong>косми от животни, дълга коса и упорита мръсотия</strong>. Никога не се задръства. Засмуква всичко от първото преминаване.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 4 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Четка против заплитане, никога не се блокира</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">ДОВИЖДАНЕ КОСМИ И КОСА</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 4 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 4 ? 'hidden' : 'mt-1'}`}>Четка против заплитане</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 4 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Четка против заплитане за косми от животни, дълга коса и упорита мръсотия. Никога не се задръства. Засмуква всичко от първото преминаване.
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
                <img src="/images/robot-asp/divano.webp" alt="Контрол чрез приложение" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 5 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">КОНТРОЛ ОТ ДИВАНА</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 5 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 5 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Дистанционно включено. Приложение ако желаете. <strong>"Alexa, почисти вкъщи"</strong> и той тръгва. Вие дори не ставате.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 5 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Приложение, Alexa, дистанционно</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">КОНТРОЛ ОТ ДИВАНА</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 5 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 5 ? 'hidden' : 'mt-1'}`}>Приложение, Alexa, дистанционно</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 5 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Дистанционно включено. Приложение ако желаете. "Alexa, почисти вкъщи" и той тръгва. Вие дори не ставате.
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
            ЧИСЛА, КОИТО ГОВОРЯТ САМИ ЗА СЕБЕ СИ
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Сравнете го с топ моделите: няма конкуренция.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Gauge className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">6000 Pa</div>
              <p className="text-sm text-gray-500">Мощност на засмукване</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Battery className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">5200 mAh</div>
              <p className="text-sm text-gray-500">Батерия (6 часа)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Cpu className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">LiDAR 4.0</div>
              <p className="text-sm text-gray-500">Лазерна навигация</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Volume2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">&lt;55 dB</div>
              <p className="text-sm text-gray-500">Супер тих</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Wifi className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">WiFi 5GHz</div>
              <p className="text-sm text-gray-500">App + Alexa/Google</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Layers className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">3L Станция</div>
              <p className="text-sm text-gray-500">Торба издържа 2 месеца</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Maximize className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">20 mm</div>
              <p className="text-sm text-gray-500">Преминава препятствия</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <ShieldCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">HEPA H13</div>
              <p className="text-sm text-gray-500">99.97% алергени</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-gray-900">
            NOVACLEAN X1 vs КОНКУРЕНЦИЯТА
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Същите функции, €400 по-малко. Пресметнете сами.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg text-xs md:text-base">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left">Характеристика</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center bg-green-600">NovaClean X1</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center">Други роботи</th>
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
            Тотална разпродажба — Само {stockLeft} броя останаха
          </p>
          <p className="text-white/80 mb-4">Когато свършат, цената се връща на €199,90. Станция включена само за тези последни бройки.</p>
          <button
            onClick={openOrderPopup}
            className="bg-white text-red-600 hover:bg-gray-100 py-4 px-10 rounded-xl font-black text-xl transition-all cursor-pointer shadow-lg"
          >
            ПОРЪЧАЙ СЕГА — €79,00
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews-section" className="py-12 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-2">
            1 248 ДОВОЛНИ КЛИЕНТИ
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
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">Потвърдена покупка</span>
                {review.risposta && (
                  <div className="mt-3 bg-gray-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                    <p className="text-xs font-bold text-gray-600 mb-1">Отговор от продавача:</p>
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
                Вижте още отзиви
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
                <span className="text-gray-900 font-bold text-xs uppercase">Дни</span>
                <span className="text-green-600 font-bold text-sm">Гаранция</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                НЕ ВИ ХАРЕСВА? ВРЪЩАМЕ ВИ ВСИЧКО. КРАЙ.
              </h2>
              <p className="text-gray-700 mb-4 text-lg">
                Имате 30 дни да го изпробвате. Ако не сте ВЪЗХИТЕНИ — по каквато и да е причина — обадете ни се, изпращаме куриер да го вземе и ви връщаме всяка стотинка. <strong>Връщане БЕЗПЛАТНО. Без въпроси. Без риск за вас.</strong> Но 96% от клиентите го запазват.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="bg-white px-4 py-2 rounded-lg border border-green-200 font-bold text-gray-800 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> Без риск
                </span>
                <span className="bg-white px-4 py-2 rounded-lg border border-green-200 font-bold text-gray-800 text-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-green-500" /> Безплатно връщане
                </span>
                <span className="bg-white px-4 py-2 rounded-lg border border-green-200 font-bold text-gray-800 text-sm flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-green-500" /> Гаранция 2 години
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
            КАК ДА ПОРЪЧАТЕ (3 ЛЕСНИ СТЪПКИ)
          </h2>
          <div className="flex flex-row items-start justify-center gap-2 md:gap-8">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg">1</div>
              <p className="text-gray-700 text-sm font-medium">Попълнете формуляра с вашите данни</p>
            </div>
            <div className="text-gray-300 text-2xl mt-4">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg">2</div>
              <p className="text-gray-700 text-sm font-medium">Ще ви се обадим за потвърждение</p>
            </div>
            <div className="text-gray-300 text-2xl mt-4">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg">3</div>
              <p className="text-gray-700 text-sm font-medium">Получавате за 24-48 часа и плащате на КУРИЕРА!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order-form-section" className="bg-gray-900 py-12 pb-8">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-red-600 text-white font-bold text-center py-2 rounded-full mb-4 animate-pulse">
            Само {stockLeft} броя останаха на тази цена
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 text-center">
            Поръчайте Сега
          </h2>
          <p className="text-gray-400 mb-6 text-center">
            Попълнете формуляра. Плащате само при доставка.
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            {/* Product Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-black text-gray-900">NovaClean X1 PRO</span>
                  <p className="text-sm text-gray-600">+ OMNI Станция + Аксесоари</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">СТАНЦИЯ БЕЗПЛАТНО</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">ДОСТАВКА БЕЗПЛАТНО</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm block">€199,90</span>
                  <span className="text-3xl font-black text-green-700">€79<span className="text-lg">,00</span></span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-center">
              <div className="flex items-center justify-center gap-2 text-red-700 font-bold">
                <Timer className="w-5 h-5" />
                <span>Офертата изтича след: {formatTime(timeLeft)}</span>
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
                  <label className="block text-gray-800 font-bold mb-2">Име и Фамилия *</label>
                  <input
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg"
                    placeholder="Иван Иванов"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-2">Телефон (за куриера) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg"
                    placeholder="+359 88 123 4567"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-2">Пълен Адрес *</label>
                  <input
                    type="text"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg"
                    placeholder="ул. Витоша 10, 1000 София"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="border-2 border-green-500 bg-green-50 rounded-xl p-4 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-4 border-green-500 bg-white"></div>
                  <span className="font-bold text-gray-800">Плащане при доставка</span>
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
                {isSubmitting ? 'ИЗПРАЩАНЕ...' : 'ПОРЪЧАЙ СЕГА — ПЛАЩАНЕ ПРИ ДОСТАВКА'}
                {!isSubmitting && <Truck className="w-6 h-6" />}
              </button>

              <p className="text-center text-gray-400 text-xs mt-4">
                Вашите данни са защитени и SSL криптирани. Използваме ги САМО за доставка.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 py-10 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 text-gray-900">
            ЧЕСТО ЗАДАВАНИ ВЪПРОСИ
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

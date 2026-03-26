'use client';

import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import {
  Star,
  Clock,
  Wind,
  Thermometer,
  Zap,
  CheckCircle2,
  Truck,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Eye,
  Gift,
  X
} from 'lucide-react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// --- Types ---
interface Testimonial {
  name: string;
  age: number;
  city: string;
  text: string;
  rating: number;
}

interface FaqItem {
  question: string;
  answer: string;
}

// --- Data ---
const TESTIMONIALS: Testimonial[] = [
  { name: "Katarzyna R.", age: 34, city: "Warszawa", text: "Pracuję przy komputerze 8 godzin dziennie. Wieczory były koszmarem. Ten masażer stał się moim świętym rytuałem. Skóra wygląda też bardziej wygładzona!", rating: 5 },
  { name: "Magdalena L.", age: 42, city: "Kraków", text: "Para jest bardzo delikatna, nie parzy, ale przyjemnie rozgrzewa. Prawie zawsze zasypiam podczas używania. Gorąco polecam.", rating: 5 },
  { name: "Anna B.", age: 29, city: "Wrocław", text: "Na początku byłam sceptyczna, ale po 15 minutach uczucie ciężkości znika. Świetna opcja płatności przy odbiorze.", rating: 4 },
  { name: "Zofia V.", age: 38, city: "Gdańsk", text: "Bardzo wygodny i lekki. Używam go nawet w przerwie obiadowej, żeby się odciąć na 10 minut. Bardzo szybka wysyłka.", rating: 5 },
  { name: "Joanna G.", age: 51, city: "Poznań", text: "Używam go przed nałożeniem kremu pod oczy. Ciepło bardzo pomaga w wchłanianiu kremu. Już nie wyobrażam sobie bez niego.", rating: 5 },
  { name: "Monika M.", age: 26, city: "Łódź", text: "Prezent dla mojej mamy, zakochała się w nim. Teraz zamawiam jeden też dla siebie ze zniżką ilościową.", rating: 5 },
];

const FAQS: FaqItem[] = [
  { question: "Jak długo trwa jedna sesja?", answer: "Standardowa sesja trwa 15 minut, po czym urządzenie automatycznie się wyłącza ze względów bezpieczeństwa i oszczędności energii." },
  { question: "Czy para jest delikatna?", answer: "Absolutnie tak. To ultra-drobna mgiełka zaprojektowana, aby zapewnić uczucie komfortu i nawilżenia powierzchniowego, bez podrażniania delikatnej skóry wokół oczu." },
  { question: "Czy można regulować ciepło i chłód?", answer: "Tak, urządzenie ma różne tryby, które naprzemiennie stosują komfortowe temperatury, aby zmaksymalizować uczucie dobrostanu." },
  { question: "Czy jest głośne?", answer: "Nie, silnik jest ultra-cichy (<45dB), aby zagwarantować maksymalny relaks podczas używania." },
  { question: "Czy można używać z okularami lub soczewkami?", answer: "Zalecamy zdjęcie okularów i soczewek kontaktowych przed użyciem, aby zapewnić maksymalny komfort i bezpieczeństwo." },
  { question: "Jak się czyści?", answer: "Część stykająca się z twarzą jest wykonana z hipoalergicznego silikonu lub tkaniny nadającej się do prania (w zależności od modelu), wystarczy wilgotna ściereczka z łagodnym detergentem." },
  { question: "Ile kosztuje dostawa?", answer: "Dostawa jest bezpłatna dla wszystkich zamówień złożonych dzisiaj." },
  { question: "Czy mogę zapłacić przy odbiorze?", answer: "Oczywiście! Oferujemy płatność gotówką kurierowi bez dodatkowych kosztów." },
  { question: "Czy pomaga przy napięciu czoła i oczu?", answer: "EyeSpa Pro to produkt wellness. Połączenie pary i masażu może pomóc rozluźnić okolice oczu i czoła oraz zmniejszyć uczucie napięcia po intensywnych dniach przed ekranami." },
];

const FEATURES_LIST = [
  { title: "Nawilżająca para", desc: "Mgiełka nano-mist dla miękkiej skóry.", icon: <Droplets className="w-6 h-6 text-blue-500" /> },
  { title: "Masaż 4D", desc: "Inteligentny nacisk na punkty napięcia.", icon: <Zap className="w-6 h-6 text-yellow-500" /> },
  { title: "Ciepło/Chłód", desc: "Termoterapia dla spersonalizowanego komfortu.", icon: <Thermometer className="w-6 h-6 text-red-500" /> },
  { title: "15 minut Smart", desc: "Inteligentny timer dla idealnego relaksu.", icon: <Clock className="w-6 h-6 text-emerald-500" /> },
];

// --- Components ---

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  fullWidth = false,
  type = 'button'
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) => {
  const baseStyle = "font-bold py-3 px-6 rounded-lg transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white border-b-4 border-emerald-800",
    secondary: "bg-rose-500 hover:bg-rose-600 text-white border-b-4 border-rose-700",
    outline: "bg-transparent border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="text-center mb-10 px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">{title}</h2>
    {subtitle && <p className="text-slate-600 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    <div className="w-24 h-1 bg-emerald-500 mx-auto mt-4 rounded-full"></div>
  </div>
);

const Accordion = ({ items }: { items: FaqItem[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {items.map((item, idx) => (
        <div key={idx} className="border border-slate-200 rounded-lg bg-white overflow-hidden">
          <button
            className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-800 hover:bg-slate-50"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
          >
            {item.question}
            {openIndex === idx ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </button>
          {openIndex === idx && (
            <div className="p-4 bg-slate-50 text-slate-600 border-t border-slate-100 animate-fadeIn">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// --- Main App Component ---

export default function EyeSpaLandingPL() {
  const [timeLeft, setTimeLeft] = useState(7200);
  const [stock, setStock] = useState(12);
  const [isFormInView, setIsFormInView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = ['/images/eye/1.webp', '/images/eye/2.webp', '/images/eye/3.webp', '/images/eye/5.webp', '/images/eye/6.webp'];
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressFull: ''
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setStock((prev) => {
        if (prev <= 3) return prev;
        return Math.random() > 0.7 ? prev - 1 : prev;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFormInView(entry.isIntersecting);
      },
      {
        threshold: 0.2,
      }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (formErrors[name as keyof typeof formData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<Record<keyof typeof formData, string>> = {};

    if (!formData.fullName) errors.fullName = "Imię i nazwisko jest wymagane";
    if (!formData.phone) errors.phone = "Telefon jest wymagany";
    if (!formData.addressFull) errors.addressFull = "Pełny adres jest wymagany";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const tmfpInput = document.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';

      const params = new URLSearchParams({
        uid: '019a913a-422a-770d-8b80-6aa9c3b58776',
        key: 'e0b35b6504ae459988cf25',
        offer: '754',
        lp: '768',
        name: formData.fullName,
        tel: formData.phone,
        'street-address': formData.addressFull,
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

      await fetch('https://offers.adricenetwork.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17104994752/eyespa',
          value: 179,
          currency: 'PLN',
        });
      }
      window.location.href = '/ty/ty-unc-eye-pl';
    } catch (error) {
      console.error(error);
      window.location.href = '/ty/ty-unc-eye-pl';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Script src="https://offers.adricenetwork.com/forms/tmfp/" crossOrigin="anonymous" strategy="afterInteractive" />
      <img src="https://offers.adricenetwork.com/forms/api/ck/?o=754&uid=019a913a-422a-770d-8b80-6aa9c3b58776&lp=768" style={{ width: '1px', height: '1px', display: 'none' }} alt="" />

      {/* 1. TOP BAR */}
      <div className="bg-slate-900 text-white text-xs md:text-sm py-2 px-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="flex gap-2 items-center">
          <span className="bg-red-600 px-2 py-0.5 rounded font-bold animate-pulse">OFERTA LIMITOWANA</span>
          <span className="hidden md:inline">Wysyłka 24/48h • Płatność przy odbiorze</span>
        </div>
        <div className="font-mono font-bold text-emerald-400 text-base">
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* 2. HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-emerald-50/30 pt-8 pb-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">

          <div className="space-y-6 z-10">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-3 py-1 shadow-sm">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-semibold text-slate-700">4.8/5 (1.200+ opinii)</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
              CIĘŻKA GŁOWA? ZMĘCZONY WZROK? SKÓRA ŚCIĄGA? <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                ODPRĘŻYJ SIĘ W 15 MINUT.
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              Chwila komfortu, którą poczujesz natychmiast.
            </p>

            <ul className="space-y-2">
              {[
                "Pomaga rozluźnić uczucie napięcia i ciężkości po pracy przy komputerze i telefonie",
                "Masaż 4D: pomaga rozluźnić napięcie oczu i czoła",
                "15 minut na pełną regenerację"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm max-w-sm">
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm line-through">479 zł</span>
                <span className="text-3xl font-bold text-slate-900">179 zł</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">-63% DZIŚ</span>
                 <span className="text-xs text-slate-500 mt-1">Pozostało sztuk: <b className="text-red-600">{stock}</b></span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic mt-2 mb-2">
              Jeśli pod koniec dnia czujesz ciężkie oczy i napięte czoło, to jest Twoja chwila wytchnienia.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button onClick={scrollToForm} className="w-full sm:w-auto text-lg px-8">
                ZAMÓW TERAZ - Płatność przy odbiorze
              </Button>
            </div>

            <div className="flex gap-4 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Gwarancja 2 lata</span>
              <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Szybka wysyłka</span>
            </div>
          </div>

          <div className="relative z-10 flex justify-center">
            <div className="w-full max-w-md aspect-square bg-white rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
              {heroImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`EyeSpa Pro ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}

              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur rounded-full p-2 shadow-md transition-all"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white backdrop-blur rounded-full p-2 shadow-md transition-all"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentSlide ? 'bg-emerald-500 w-6' : 'bg-white/70'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS GRID */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle title="Czym się wyróżnia?" subtitle="EyeSpa Pro to nie tylko wibracje. To kompletny rytuał." />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES_LIST.map((feat, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="bg-white w-14 h-14 rounded-full flex items-center justify-center shadow-sm mb-4">
                  {feat.icon}
                </div>
                <h3 className="font-bold text-xl mb-2 text-slate-800">{feat.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. STEAM POWER */}
      <section className="py-16 bg-blue-50 border-y border-blue-100">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
             <div className="w-full h-80 rounded-3xl shadow-inner relative overflow-hidden">
                <img src="/images/eye/4.webp" alt="Technologia pary EyeSpa Pro" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold text-blue-800 shadow-sm">
                  Technologia Nano-Mist
                </div>
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Gorąca para: <br/><span className="text-blue-600">chwila, która rozświetla spojrzenie</span></h2>
            <p className="text-slate-700 mb-6 text-lg">
              Gorąca para delikatnie otula okolice oczu, pomagając skórze natychmiast wyglądać na bardziej wygładzoną, rozświetloną i świeżą.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Wspiera mniej widoczny i bardziej wypoczęty wygląd okolic oczu.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Pomaga skórze wyglądać na bardziej gładką i jędrną.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Pomaga odzyskać wyraźnie jaśniejsze i świeższe spojrzenie.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Pozostawia skórę miękką i nawilżoną, redukując uczucie ściągania.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. MODES & HOW TO USE */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionTitle title="Jak używać?" subtitle="3 kroki do codziennego relaksu" />

          <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">1</div>
              <h4 className="font-bold mb-2">Załóż</h4>
              <p className="text-sm text-slate-500">Dopasuj elastyczną opaskę, aby idealnie pasowała do Twojej twarzy.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">2</div>
              <h4 className="font-bold mb-2">Wybierz tryb</h4>
              <p className="text-sm text-slate-500">Wybierz Energia, Relaks, Sen lub Przerwa dla oczu jednym kliknięciem.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">3</div>
              <h4 className="font-bold mb-2">Ciesz się 15 min</h4>
              <p className="text-sm text-slate-500">Zamknij oczy. Urządzenie wyłączy się automatycznie po zakończeniu.</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">4 ekskluzywne tryby</h3>
            <div className="space-y-4">
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-yellow-100 p-2 rounded-lg"><Zap className="text-yellow-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Tryb Energia:</strong> <span className="text-slate-600 text-sm">Rytmiczne wibracje + Energetyzująca muzyka. Idealny na rano.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-100 p-2 rounded-lg"><Wind className="text-blue-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Tryb Relaks:</strong> <span className="text-slate-600 text-sm">Gorąca para + Lekki masaż. Aby się odciąć po pracy.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-indigo-100 p-2 rounded-lg"><Clock className="text-indigo-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Tryb Sen:</strong> <span className="text-slate-600 text-sm">Tylko stałe ciepło + Cisza absolutna. Przygotowuje do odpoczynku.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-emerald-100 p-2 rounded-lg"><Eye className="text-emerald-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Tryb Przerwa dla oczu:</strong> <span className="text-slate-600 text-sm">Szybki cykl chłodu/ciepła, aby odświeżyć spojrzenie w 5 min.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle title="Ostateczne porównanie" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b-2 border-slate-100">Cecha</th>
                  <th className="p-4 border-b-2 border-emerald-500 bg-emerald-50 text-emerald-800 rounded-t-lg w-1/3 text-center">EyeSpa Pro</th>
                  <th className="p-4 border-b-2 border-slate-100 text-slate-400 text-center">Maska żelowa</th>
                  <th className="p-4 border-b-2 border-slate-100 text-slate-400 text-center">Masaż ręczny</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Stała para</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Termoterapia (Ciepło/Chłód)</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><span className="text-xs text-slate-400">Tylko jedno naraz</span></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Bez użycia rąk</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><CheckCircle2 className="w-6 h-6 text-slate-400 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Uczucie relaksu</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center font-bold text-emerald-700">Głęboki</td>
                  <td className="p-4 border-b border-slate-100 text-center text-slate-500">Powierzchowny</td>
                  <td className="p-4 border-b border-slate-100 text-center text-slate-500">Zmienny</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
             <Button onClick={scrollToForm} className="mx-auto">WYPRÓBUJ TERAZ</Button>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Co mówią nasi klienci" subtitle="Ponad 1.200 kobiet wybrało EyeSpa Pro" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-600 italic mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                      {t.name.charAt(0)}
                   </div>
                   <div>
                     <p className="font-bold text-sm text-slate-900">{t.name}</p>
                     <p className="text-xs text-slate-400">{t.age} lat, {t.city}</p>
                   </div>
                   <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto opacity-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionTitle title="Najczęściej zadawane pytania" />
          <Accordion items={FAQS} />
        </div>
      </section>

      {/* 9. ORDER FORM */}
      <section ref={formRef} className="py-16 bg-gradient-to-b from-slate-50 to-emerald-50">
        <div className="container mx-auto px-4">

          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                <div className="bg-slate-900 p-6 text-center text-white">
                  <h3 className="text-2xl font-bold mb-1">WYPEŁNIJ DANE, ABY ZAMÓWIĆ</h3>
                  <p className="text-emerald-400 text-sm font-medium">Szybka dostawa + Płatność przy odbiorze</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                  <input type="hidden" name="tmfp" />

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Imię i nazwisko *</label>
                    <input
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.fullName ? 'border-red-500' : 'border-slate-300'}`}
                      placeholder="Jan Kowalski"
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefon (dla kuriera) *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.phone ? 'border-red-500' : 'border-slate-300'}`}
                      placeholder="+48 512 345 678"
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pełny adres *</label>
                    <input
                      name="addressFull"
                      type="text"
                      value={formData.addressFull}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.addressFull ? 'border-red-500' : 'border-slate-300'}`}
                      placeholder="ul. Marszałkowska 10, 00-001 Warszawa"
                    />
                     {formErrors.addressFull && <p className="text-red-500 text-xs mt-1">{formErrors.addressFull}</p>}
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg flex items-center justify-between border border-emerald-100">
                     <span className="font-bold text-slate-800">Metoda płatności:</span>
                     <span className="flex items-center gap-2 font-bold text-emerald-700">
                       <Truck className="w-5 h-5" /> Gotówka przy odbiorze
                     </span>
                  </div>


                  <div>
                    <Button fullWidth type="submit" className="text-lg py-4 shadow-xl uppercase">
                      ZAMÓW TERAZ — PŁATNOŚĆ PRZY ODBIORZE
                    </Button>
                    <p className="text-center text-xs text-slate-400 mt-3">
                      Twoje dane są chronione i szyfrowane SSL. Używamy ich WYŁĄCZNIE do wysyłki.
                    </p>
                  </div>

                  <div className="flex justify-center gap-6 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> SSL Secure</span>
                    <span className="flex items-center gap-1"><Gift className="w-3 h-3" /> Gwarancja satysfakcji</span>
                  </div>

                </form>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <div className="bg-slate-100 text-slate-500 py-6 text-xs">
        <div className="container mx-auto px-4 text-center">
           <p className="max-w-3xl mx-auto italic leading-relaxed">
             Zastrzeżenie: EyeSpa Pro to urządzenie wellness zaprojektowane dla relaksu i komfortu. Nie jest urządzeniem medycznym.
             Nie jest przeznaczone do diagnozowania, leczenia, wyleczenia ani zapobiegania jakimkolwiek chorobom.
             Jeśli cierpisz na schorzenia oczu, infekcje lub problemy skórne, skonsultuj się z lekarzem przed użyciem.
             Wyniki mogą się różnić w zależności od osoby.
           </p>
        </div>
      </div>

      {/* STICKY CTA */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 transition-all duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden ${isFormInView ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <div className="flex justify-between items-center gap-4">
           <div className="flex flex-col">
              <span className="text-xs text-slate-500">Tylko dziś</span>
              <span className="font-bold text-xl text-slate-900">179 zł</span>
           </div>
           <Button onClick={scrollToForm} className="flex-1 py-3 text-sm shadow-none">
             ZAMÓW TERAZ
           </Button>
        </div>
      </div>

    </div>
  );
}

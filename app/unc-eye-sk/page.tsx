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
  { name: "Zuzana R.", age: 34, city: "Bratislava", text: "Pracujem za po\u010D\u00EDta\u010Dom 8 hod\u00EDn denne. Ve\u010Dery boli no\u010Dnou morou. Tento mas\u00E1\u017Eer sa stal mojim sv\u00E4t\u00FDm ritu\u00E1lom. Poko\u017Eka vyzer\u00E1 aj hladšie!", rating: 5 },
  { name: "Martina L.", age: 42, city: "Ko\u0161ice", text: "Para je ve\u013Emi jemn\u00E1, nep\u00E1li, ale hreje pr\u00E1ve tak akur\u00E1t. Takmer v\u017Edy pri \u0148om zasp\u00EDm. Ve\u013Emi odpor\u00FA\u010Dam.", rating: 5 },
  { name: "Elena B.", age: 29, city: "Pre\u0161ov", text: "Najprv som bola skeptick\u00E1, ale po 15 min\u00FAtach poc\u00EDt \u0165a\u017Eoby zmizne. Skvel\u00E9, \u017Ee sa d\u00E1 plati\u0165 pri prevzat\u00ED.", rating: 4 },
  { name: "Janka V.", age: 38, city: "\u017Dilina", text: "Ve\u013Emi pohodln\u00FD a \u013Eahk\u00FD. Pou\u017E\u00EDvam ho aj po\u010Das obednej prest\u00E1vky na 10 min\u00FAt relaxu. Ve\u013Emi r\u00FDchle doru\u010Denie.", rating: 5 },
  { name: "Danica G.", age: 51, city: "Nitra", text: "Pou\u017E\u00EDvam ho pred nan\u00E1\u0161an\u00EDm kr\u00E9mu na o\u010Dn\u00E9 okolie. Teplo ve\u013Emi pom\u00E1ha vstrebaniu kr\u00E9mu. U\u017E si ho nedok\u00E1\u017Eem predstavi\u0165 bez neho.", rating: 5 },
  { name: "Monika M.", age: 26, city: "Bansk\u00E1 Bystrica", text: "Dar\u010Dek pre mamu, bola z neho nads\u016Een\u00E1. Teraz objedn\u00E1vam jeden aj pre seba so z\u013Eavou na mno\u017Estvo.", rating: 5 },
];

const FAQS: FaqItem[] = [
  { question: "Ako dlho trv\u00E1 jedno sedenie?", answer: "\u0160tandardn\u00E9 sedenie trv\u00E1 15 min\u00FAt, potom sa zariadenie automaticky vypne z d\u00F4vodu bezpe\u010Dnosti a \u00FAspory energie." },
  { question: "Je para jemn\u00E1?", answer: "Absol\u00FAtne \u00E1no. Je to ultrajemn\u00E1 hmla, vytvoren\u00E1 pre pocit komfortu a povrchov\u00E9ho hydratovania bez podr\u00E1\u017Edenia citlivej poko\u017Eky okolo o\u010D\u00ED." },
  { question: "D\u00E1 sa regulova\u0165 teplo a chlad?", answer: "\u00C1no, zariadenie m\u00E1 r\u00F4zne re\u017Eimy, ktor\u00E9 menia komfortn\u00E9 teploty pre maxim\u00E1lny pocit pohody." },
  { question: "Je hlu\u010Dn\u00FD?", answer: "Nie, motor je ultratich\u00FD (<45dB), aby bol zabezpe\u010Den\u00FD maxim\u00E1lny relax po\u010Das pou\u017E\u00EDvania." },
  { question: "D\u00E1 sa pou\u017E\u00EDva\u0165 s okuliarmi alebo \u0161o\u0161ovkami?", answer: "Odpor\u00FA\u010Dame sn\u00EDma\u0165 okuliare a kontaktn\u00E9 \u0161o\u0161ovky pred pou\u017Eit\u00EDm, aby bol zabezpe\u010Den\u00FD maxim\u00E1lny komfort a bezpe\u010Dnos\u0165." },
  { question: "Ako sa \u010Dist\u00ED?", answer: "\u010Cas\u0165, ktor\u00E1 sa dot\u00FDka tv\u00E1re, je vyroben\u00E1 z hypoalerg\u00E9nneho silik\u00F3nu alebo prate\u013Enej l\u00E1tky (pod\u013Ea modelu), sta\u010D\u00ED vlhk\u00E1 utierka s jemn\u00FDm \u010Distiacim prostriedkom." },
  { question: "Ko\u013Eko stoj\u00ED doru\u010Denie?", answer: "Doru\u010Denie je zadarmo pre v\u0161etky dnes podan\u00E9 objedn\u00E1vky." },
  { question: "M\u00F4\u017Eem plati\u0165 pri prevzat\u00ED?", answer: "Samozrejme! Pon\u00FAkame platbu v hotovosti kuri\u00E9rovi bez dodato\u010Dn\u00FDch poplatkov." },
  { question: "Pom\u00E1ha proti nap\u00E4tiu \u010Dela a o\u010D\u00ED?", answer: "EyeSpa Pro je wellness produkt. Kombin\u00E1cia pary a mas\u00E1\u017Ee m\u00F4\u017Ee pom\u00F4c\u0165 uvo\u013Eni\u0165 oblas\u0165 o\u010D\u00ED a \u010Dela a zn\u00ED\u017Ei\u0165 pocit nap\u00E4tia po intenz\u00EDvnych d\u0148och pri obrazovk\u00E1ch." },
];

const FEATURES_LIST = [
  { title: "Hydrata\u010Dn\u00E1 para", desc: "Nano-mist hmla pre jemn\u00FA poko\u017Eku.", icon: <Droplets className="w-6 h-6 text-blue-500" /> },
  { title: "4D mas\u00E1\u017E", desc: "Inteligentn\u00FD tlak na body nap\u00E4tia.", icon: <Zap className="w-6 h-6 text-yellow-500" /> },
  { title: "Teplo/Chlad", desc: "Termoterapia pre individu\u00E1lny komfort.", icon: <Thermometer className="w-6 h-6 text-red-500" /> },
  { title: "15 min. Smart", desc: "Inteligentn\u00FD \u010Dasova\u010D pre dokonal\u00FD relax.", icon: <Clock className="w-6 h-6 text-emerald-500" /> },
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

export default function EyeSpaLandingSK() {
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

    if (!formData.fullName) errors.fullName = "Meno a priezvisko s\u00FA povinn\u00E9";
    if (!formData.phone) errors.phone = "Telef\u00F3n je povinn\u00FD";
    if (!formData.addressFull) errors.addressFull = "Pln\u00E1 adresa je povinn\u00E1";

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
        offer: '3454',
        lp: '3490',
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

      await fetch('https://offers.uncappednetwork.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'conversion', {
          send_to: 'AW-17104994752/eyespa',
          value: 59,
          currency: 'EUR',
        });
      }
      window.location.href = '/ty/ty-unc-eye-sk';
    } catch (error) {
      console.error(error);
      window.location.href = '/ty/ty-unc-eye-sk';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Script src="https://offers.uncappednetwork.com/forms/tmfp/" crossOrigin="anonymous" strategy="afterInteractive" />
      <img src="https://offers.uncappednetwork.com/forms/api/ck/?o=3454&uid=019a913a-422a-770d-8b80-6aa9c3b58776&lp=3490" style={{ width: '1px', height: '1px', display: 'none' }} alt="" />

      {/* 1. TOP BAR */}
      <div className="bg-slate-900 text-white text-xs md:text-sm py-2 px-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="flex gap-2 items-center">
          <span className="bg-red-600 px-2 py-0.5 rounded font-bold animate-pulse">LIMITOVAN\u00C1 PONUKA</span>
          <span className="hidden md:inline">Doru\u010Denie do 24/48 hod. \u2022 Platba pri prevzat\u00ED</span>
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
              <span className="text-sm font-semibold text-slate-700">4.8/5 (1 200+ hodnotení)</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
              \u0164A\u017DK\u00C1 HLAVA? UNAVEN\u00DD POH\u013EAD? POKO\u017DKA NAPÍNA? <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                ODDÝCHNITE SI ZA 15 MINÚT.
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              Komfortn\u00E1 prest\u00E1vka, ktor\u00FA poc\u00EDtite okam\u017Eite.
            </p>

            <ul className="space-y-2">
              {[
                "Pom\u00E1ha uvo\u013Eni\u0165 pocit tlaku a nap\u00E4tia po pr\u00E1ci za po\u010D\u00EDta\u010Dom a telef\u00F3nom",
                "4D mas\u00E1\u017E: pom\u00E1ha uvo\u013Eni\u0165 nap\u00E4tie o\u010D\u00ED a \u010Dela",
                "15 min\u00FAt pre \u00FApln\u00E9 obnoven\u00EDe"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm max-w-sm">
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm line-through">\u20AC149</span>
                <span className="text-3xl font-bold text-slate-900">\u20AC59</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">-60% DNES</span>
                 <span className="text-xs text-slate-500 mt-1">Zost\u00E1vaj\u00FAcich kusov: <b className="text-red-600">{stock}</b></span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic mt-2 mb-2">
              Ak na konci d\u0148a c\u00EDtite \u0165a\u017Ek\u00E9 o\u010Di a nap\u00E4t\u00E9 \u010Delo, toto je va\u0161a prest\u00E1vka.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button onClick={scrollToForm} className="w-full sm:w-auto text-lg px-8">
                OBJEDNA\u0164 TERAZ - Pla\u0165te pri prevzat\u00ED
              </Button>
            </div>

            <div className="flex gap-4 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> 2 roky z\u00E1ruka</span>
              <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> R\u00FDchle doru\u010Denie</span>
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
          <SectionTitle title="\u010C\u00EDm sa l\u00ED\u0161i od ostatn\u00FDch?" subtitle="EyeSpa Pro nie len vibruje. Je to kompletn\u00FD ritu\u00E1l." />

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
                <img src="/images/eye/4.webp" alt="EyeSpa Pro technol\u00F3gia pary" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold text-blue-800 shadow-sm">
                  Nano-Mist technol\u00F3gia
                </div>
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Hor\u00FAca para: <br/><span className="text-blue-600">prest\u00E1vka, ktor\u00E1 rozjasn\u00ED poh\u013Ead</span></h2>
            <p className="text-slate-700 mb-6 text-lg">
              Hor\u00FAca para jemne obal\u00ED oblas\u0165 okolo o\u010D\u00ED a pom\u00E1ha poko\u017Eke okam\u017Eite vyzera\u0165 hladšie, jasnejšie a sv\u00E1\u017Enejšie.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Pom\u00E1ha o\u010Dn\u00E9mu okoliu vyzera\u0165 menej v\u00FDrazne a viac oddýchnut\u00E9.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Prispieva k tomu, \u017Ee poko\u017Eka vyzer\u00E1 hladšie a pevnejšie.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Pom\u00E1ha z\u00EDska\u0165 vidite\u013Ene jasnejš\u00ED a sv\u00E1\u017Enejš\u00ED poh\u013Ead.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Zanech\u00E1va poko\u017Eku m\u00E4kk\u00FA a hydratovan\u00FA, zni\u017Euje pocit nap\u00EDnania.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. MODES & HOW TO USE */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionTitle title="Ako pou\u017E\u00EDva\u0165?" subtitle="3 kroky k ka\u017Edodenn\u00E9mu relaxu" />

          <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">1</div>
              <h4 className="font-bold mb-2">Nasad\u0165te si ho</h4>
              <p className="text-sm text-slate-500">Nastavte elastick\u00FD p\u00E1sik tak, aby dokonale sadol na v\u00E1\u0161u tv\u00E1r.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">2</div>
              <h4 className="font-bold mb-2">Zvo\u013Ete si re\u017Eim</h4>
              <p className="text-sm text-slate-500">Vyberte Energia, Relax, Sp\u00E1nok alebo O\u010Dn\u00E1 prest\u00E1vka jedn\u00FDm stla\u010Den\u00EDm.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">3</div>
              <h4 className="font-bold mb-2">U\u017E\u00EDvajte si 15 min.</h4>
              <p className="text-sm text-slate-500">Zatvorte o\u010Di. Zariadenie sa automaticky vypne na konci.</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">4 exkluz\u00EDvne re\u017Eimy</h3>
            <div className="space-y-4">
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-yellow-100 p-2 rounded-lg"><Zap className="text-yellow-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Re\u017Eim Energia:</strong> <span className="text-slate-600 text-sm">Rytmick\u00E1 vibr\u00E1cia + Energizuj\u00FAca hudba. Ide\u00E1lne na r\u00E1no.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-100 p-2 rounded-lg"><Wind className="text-blue-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Re\u017Eim Relax:</strong> <span className="text-slate-600 text-sm">Hor\u00FAca para + Jemn\u00E1 mas\u00E1\u017E. Na odpojenie po pr\u00E1ci.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-indigo-100 p-2 rounded-lg"><Clock className="text-indigo-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Re\u017Eim Sp\u00E1nok:</strong> <span className="text-slate-600 text-sm">Len st\u00E1le teplo + \u00DApln\u00E9 ticho. Priprav\u00ED v\u00E1s na odpo\u010Dinok.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-emerald-100 p-2 rounded-lg"><Eye className="text-emerald-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Re\u017Eim O\u010Dn\u00E1 prest\u00E1vka:</strong> <span className="text-slate-600 text-sm">R\u00FDchly cyklus chladu/tepla na osvieženie poh\u013Eadu za 5 min.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle title="Kone\u010Dn\u00E9 porovnanie" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b-2 border-slate-100">Vlastnos\u0165</th>
                  <th className="p-4 border-b-2 border-emerald-500 bg-emerald-50 text-emerald-800 rounded-t-lg w-1/3 text-center">EyeSpa Pro</th>
                  <th className="p-4 border-b-2 border-slate-100 text-slate-400 text-center">G\u00E9lov\u00E1 maska</th>
                  <th className="p-4 border-b-2 border-slate-100 text-slate-400 text-center">Ru\u010Dn\u00E1 mas\u00E1\u017E</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Neust\u00E1la para</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Termoterapia (Teplo/Chlad)</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><span className="text-xs text-slate-400">Len jedno naraz</span></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Vo\u013En\u00E9 ruky</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><CheckCircle2 className="w-6 h-6 text-slate-400 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Pocit relaxu</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center font-bold text-emerald-700">Hlbok\u00FD</td>
                  <td className="p-4 border-b border-slate-100 text-center text-slate-500">Povrchov\u00FD</td>
                  <td className="p-4 border-b border-slate-100 text-center text-slate-500">Premenliv\u00FD</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
             <Button onClick={scrollToForm} className="mx-auto">VYSK\u00DA\u0160AJTE TERAZ</Button>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="\u010Co hovoria na\u0161i z\u00E1kazn\u00EDci" subtitle="Viac ako 1 200 \u017Eien si vybralo EyeSpa Pro" />
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
                     <p className="text-xs text-slate-400">{t.age} r., {t.city}</p>
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
          <SectionTitle title="\u010Casto kladen\u00E9 ot\u00E1zky" />
          <Accordion items={FAQS} />
        </div>
      </section>

      {/* 9. ORDER FORM */}
      <section ref={formRef} className="py-16 bg-gradient-to-b from-slate-50 to-emerald-50">
        <div className="container mx-auto px-4">

          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                <div className="bg-slate-900 p-6 text-center text-white">
                  <h3 className="text-2xl font-bold mb-1">VYPL\u0147TE \u00DADAJE PRE OBJEDN\u00C1VKU</h3>
                  <p className="text-emerald-400 text-sm font-medium">R\u00FDchle doru\u010Denie + Platba pri prevzat\u00ED</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                  <input type="hidden" name="tmfp" />

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Meno a priezvisko *</label>
                    <input
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.fullName ? 'border-red-500' : 'border-slate-300'}`}
                      placeholder="J\u00E1n Nov\u00E1k"
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telef\u00F3n (pre kuri\u00E9ra) *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.phone ? 'border-red-500' : 'border-slate-300'}`}
                      placeholder="+421 912 345 678"
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Pln\u00E1 adresa *</label>
                    <input
                      name="addressFull"
                      type="text"
                      value={formData.addressFull}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.addressFull ? 'border-red-500' : 'border-slate-300'}`}
                      placeholder="Hlavn\u00E1 10, 811 01 Bratislava"
                    />
                     {formErrors.addressFull && <p className="text-red-500 text-xs mt-1">{formErrors.addressFull}</p>}
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg flex items-center justify-between border border-emerald-100">
                     <span className="font-bold text-slate-800">Sp\u00F4sob platby:</span>
                     <span className="flex items-center gap-2 font-bold text-emerald-700">
                       <Truck className="w-5 h-5" /> V hotovosti pri prevzat\u00ED
                     </span>
                  </div>


                  <div>
                    <Button fullWidth type="submit" className="text-lg py-4 shadow-xl uppercase">
                      OBJEDNA\u0164 TERAZ \u2014 PLATI\u0164 PRI PREVZAT\u00CD
                    </Button>
                    <p className="text-center text-xs text-slate-400 mt-3">
                      Va\u0161e \u00FAdaje s\u00FA chr\u00E1nen\u00E9 a \u0161ifrovan\u00E9 SSL. Pou\u017E\u00EDvame ich LEN na doru\u010Denie.
                    </p>
                  </div>

                  <div className="flex justify-center gap-6 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> SSL ochrana</span>
                    <span className="flex items-center gap-1"><Gift className="w-3 h-3" /> Z\u00E1ruka vr\u00E1tenia pe\u0148az\u00ED</span>
                  </div>

                </form>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <div className="bg-slate-100 text-slate-500 py-6 text-xs">
        <div className="container mx-auto px-4 text-center">
           <p className="max-w-3xl mx-auto italic leading-relaxed">
             Vyhl\u00E1senie o zodpovednosti: EyeSpa Pro je wellness zariadenie ur\u010Den\u00E9 na relax a komfort. Nie je to medic\u00EDnske zariadenie.
             Nie je ur\u010Den\u00E9 na diagnostikovanie, lie\u010Dbu, vylie\u010Denie ani prevenciu ak\u00E9hoko\u013Evek ochorenia.
             Ak m\u00E1te o\u010Dn\u00E9 ochorenia, infekcie alebo ko\u017En\u00E9 probl\u00E9my, pred pou\u017Eit\u00EDm sa pora\u010Fte s lek\u00E1rom.
             V\u00FDsledky sa m\u00F4\u017Eu l\u00ED\u0161i\u0165 v z\u00E1vislosti od jednotlivca.
           </p>
        </div>
      </div>

      {/* STICKY CTA */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 transition-all duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden ${isFormInView ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <div className="flex justify-between items-center gap-4">
           <div className="flex flex-col">
              <span className="text-xs text-slate-500">Len dnes</span>
              <span className="font-bold text-xl text-slate-900">\u20AC59</span>
           </div>
           <Button onClick={scrollToForm} className="flex-1 py-3 text-sm shadow-none">
             OBJEDNA\u0164 TERAZ
           </Button>
        </div>
      </div>

    </div>
  );
}

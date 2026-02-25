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
  { name: "Lucía R.", age: 34, city: "Madrid", text: "Trabajo frente al ordenador 8 horas al día. Las noches eran una pesadilla. Este masajeador se ha convertido en mi ritual sagrado. ¡La piel también parece más tersa!", rating: 5 },
  { name: "Carmen L.", age: 42, city: "Barcelona", text: "El vapor es delicadísimo, no quema pero calienta en el punto justo. Me quedo dormida casi siempre mientras lo uso. Lo recomiendo muchísimo.", rating: 5 },
  { name: "Elena B.", age: 29, city: "Valencia", text: "Al principio era escéptica, pero tras 15 minutos la sensación de pesadez desaparece. Excelente la opción de pago contra reembolso.", rating: 4 },
  { name: "Isabel V.", age: 38, city: "Sevilla", text: "Muy cómodo y ligero. Lo uso incluso en la pausa del almuerzo para desconectar 10 minutos. Envío rapidísimo.", rating: 5 },
  { name: "Marta G.", age: 51, city: "Bilbao", text: "Lo uso antes de aplicar la crema de contorno de ojos. El calor ayuda muchísimo a la absorción de la crema. No puedo vivir sin él.", rating: 5 },
  { name: "Paula M.", age: 26, city: "Málaga", text: "Regalo para mi madre, le encantó. Ahora voy a pedir uno para mí también con el descuento por cantidad.", rating: 5 },
];

const FAQS: FaqItem[] = [
  { question: "¿Cuánto dura una sesión?", answer: "Una sesión estándar dura 15 minutos, tras los cuales el dispositivo se apaga automáticamente por seguridad y ahorro de energía." },
  { question: "¿El vapor es suave?", answer: "Absolutamente sí. Es una nebulización finísima diseñada para ofrecer una sensación de confort e hidratación superficial, sin irritar la piel delicada del contorno de los ojos." },
  { question: "¿Se pueden regular el calor y el frío?", answer: "Sí, el dispositivo dispone de diferentes modos que alternan temperaturas de confort para maximizar la sensación de bienestar." },
  { question: "¿Es ruidoso?", answer: "No, el motor es ultra silencioso (<45dB) para garantizar la máxima relajación durante el uso." },
  { question: "¿Se puede usar con gafas o lentillas?", answer: "Recomendamos retirar las gafas y las lentillas antes del uso para garantizar la máxima comodidad y seguridad." },
  { question: "¿Cómo se limpia?", answer: "La parte en contacto con el rostro es de silicona hipoalergénica o tejido lavable (según el modelo), basta con un paño húmedo con detergente neutro." },
  { question: "¿Cuánto cuesta el envío?", answer: "El envío es gratuito para todos los pedidos realizados hoy." },
  { question: "¿Puedo pagar contra reembolso?", answer: "¡Por supuesto! Ofrecemos el pago en efectivo al repartidor sin costes adicionales." },
  { question: "¿Ayuda con la tensión en la frente y los ojos?", answer: "El EyeSpa Pro es un producto de bienestar. La combinación de vapor y masaje puede ayudar a relajar la zona de los ojos y la frente y a reducir la sensación de tensión tras días intensos frente a las pantallas." },
];

const FEATURES_LIST = [
  { title: "Vapor hidratante", desc: "Nebulización nano-mist para una piel suave.", icon: <Droplets className="w-6 h-6 text-blue-500" /> },
  { title: "Masaje 4D", desc: "Presión inteligente en los puntos de tensión.", icon: <Zap className="w-6 h-6 text-yellow-500" /> },
  { title: "Caliente/Frío", desc: "Termoterapia para un confort personalizado.", icon: <Thermometer className="w-6 h-6 text-red-500" /> },
  { title: "15 minutos Smart", desc: "Temporizador inteligente para la relajación perfecta.", icon: <Clock className="w-6 h-6 text-emerald-500" /> },
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

export default function EyeSpaLandingES() {
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

    if (!formData.fullName) errors.fullName = "El nombre completo es obligatorio";
    if (!formData.phone) errors.phone = "El teléfono es obligatorio";
    if (!formData.addressFull) errors.addressFull = "La dirección completa es obligatoria";

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
        offer: '3464',
        lp: '3500',
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
      window.location.href = '/ty/ty-unc-eye-es';
    } catch (error) {
      console.error(error);
      window.location.href = '/ty/ty-unc-eye-es';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Script src="https://offers.uncappednetwork.com/forms/tmfp/" crossOrigin="anonymous" strategy="afterInteractive" />
      <img src="https://offers.uncappednetwork.com/forms/api/ck/?o=3464&uid=019a913a-422a-770d-8b80-6aa9c3b58776&lp=3500" style={{ width: '1px', height: '1px', display: 'none' }} alt="" />

      {/* 1. TOP BAR */}
      <div className="bg-slate-900 text-white text-xs md:text-sm py-2 px-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="flex gap-2 items-center">
          <span className="bg-red-600 px-2 py-0.5 rounded font-bold animate-pulse">OFERTA LIMITADA</span>
          <span className="hidden md:inline">Envío 24/48h - Pago contra reembolso</span>
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
              <span className="text-sm font-semibold text-slate-700">4.8/5 (1.200+ valoraciones)</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
              ¿CABEZA PESADA? ¿MIRADA CANSADA? ¿PIEL TIRANTE? <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                LIBÉRALO TODO EN 15 MINUTOS.
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              Una pausa de confort que se siente de inmediato.
            </p>

            <ul className="space-y-2">
              {[
                "Ayuda a aliviar la sensación de presión y tensión tras el PC y el móvil",
                "Masaje 4D: ayuda a soltar la tensión en los ojos y la frente",
                "15 minutos para regenerarse por completo"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm max-w-sm">
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm line-through">€149</span>
                <span className="text-3xl font-bold text-slate-900">€59</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">-60% HOY</span>
                 <span className="text-xs text-slate-500 mt-1">Unidades restantes: <b className="text-red-600">{stock}</b></span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic mt-2 mb-2">
              Si al final del día sientes los ojos pesados y la frente tensa, esta es tu pausa.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button onClick={scrollToForm} className="w-full sm:w-auto text-lg px-8">
                PEDIR AHORA - Pago contra reembolso
              </Button>
            </div>

            <div className="flex gap-4 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Garantía 2 años</span>
              <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Envío rápido</span>
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
          <SectionTitle title="¿Por qué es diferente a los demás?" subtitle="El EyeSpa Pro no se limita a vibrar. Es un ritual completo." />

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
                <img src="/images/eye/4.webp" alt="Tecnología de vapor EyeSpa Pro" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold text-blue-800 shadow-sm">
                  Tecnología Nano-Mist
                </div>
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Vapor caliente: <br/><span className="text-blue-600">una pausa que ilumina la mirada</span></h2>
            <p className="text-slate-700 mb-6 text-lg">
              El vapor caliente envuelve delicadamente el contorno de los ojos, ayudando a que la piel parezca de inmediato más tersa, luminosa y fresca.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Ayuda a que las ojeras parezcan menos marcadas y el aspecto más descansado.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Contribuye a que la piel parezca más lisa y firme a la vista.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Ayuda a recuperar una mirada visiblemente más luminosa y fresca.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Deja la piel suave e hidratada, reduciendo la sensación de tirantez.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. MODES & HOW TO USE */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionTitle title="¿Cómo se usa?" subtitle="3 pasos para tu relajación diaria" />

          <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">1</div>
              <h4 className="font-bold mb-2">Colócalo</h4>
              <p className="text-sm text-slate-500">Ajusta la banda elástica para que se adapte perfectamente a tu rostro.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">2</div>
              <h4 className="font-bold mb-2">Elige el modo</h4>
              <p className="text-sm text-slate-500">Selecciona entre Energía, Relajación, Sueño o Pausa Ocular con un clic.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">3</div>
              <h4 className="font-bold mb-2">Disfruta 15 min</h4>
              <p className="text-sm text-slate-500">Cierra los ojos. El dispositivo se apaga solo al finalizar.</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">4 modos exclusivos</h3>
            <div className="space-y-4">
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-yellow-100 p-2 rounded-lg"><Zap className="text-yellow-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Modo Energía:</strong> <span className="text-slate-600 text-sm">Vibración rítmica + Música energizante. Ideal por la mañana.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-100 p-2 rounded-lg"><Wind className="text-blue-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Modo Relajación:</strong> <span className="text-slate-600 text-sm">Vapor caliente + Masaje suave. Para desconectar después del trabajo.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-indigo-100 p-2 rounded-lg"><Clock className="text-indigo-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Modo Sueño:</strong> <span className="text-slate-600 text-sm">Solo calor constante + Silencio absoluto. Prepara para el descanso.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-emerald-100 p-2 rounded-lg"><Eye className="text-emerald-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Modo Pausa Ocular:</strong> <span className="text-slate-600 text-sm">Ciclo rápido frío/caliente para revitalizar la mirada en 5 min.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle title="La comparación definitiva" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b-2 border-slate-100">Característica</th>
                  <th className="p-4 border-b-2 border-emerald-500 bg-emerald-50 text-emerald-800 rounded-t-lg w-1/3 text-center">EyeSpa Pro</th>
                  <th className="p-4 border-b-2 border-slate-100 text-slate-400 text-center">Máscara de gel</th>
                  <th className="p-4 border-b-2 border-slate-100 text-slate-400 text-center">Masaje manual</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Vapor constante</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Termoterapia (Caliente/Frío)</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><span className="text-xs text-slate-400">Solo uno a la vez</span></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Manos libres</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><CheckCircle2 className="w-6 h-6 text-slate-400 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Sensación de relajación</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center font-bold text-emerald-700">Profunda</td>
                  <td className="p-4 border-b border-slate-100 text-center text-slate-500">Superficial</td>
                  <td className="p-4 border-b border-slate-100 text-center text-slate-500">Variable</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
             <Button onClick={scrollToForm} className="mx-auto">PRUÉBALO AHORA</Button>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Lo que dicen nuestras clientas" subtitle="Más de 1.200 mujeres españolas han elegido el EyeSpa Pro" />
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
                     <p className="text-xs text-slate-400">{t.age} años, {t.city}</p>
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
          <SectionTitle title="Preguntas frecuentes" />
          <Accordion items={FAQS} />
        </div>
      </section>

      {/* 9. ORDER FORM */}
      <section ref={formRef} className="py-16 bg-gradient-to-b from-slate-50 to-emerald-50">
        <div className="container mx-auto px-4">

          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                <div className="bg-slate-900 p-6 text-center text-white">
                  <h3 className="text-2xl font-bold mb-1">RELLENA TUS DATOS PARA HACER EL PEDIDO</h3>
                  <p className="text-emerald-400 text-sm font-medium">Entrega rápida + Pago contra reembolso</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                  <input type="hidden" name="tmfp" />

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nombre completo *</label>
                    <input
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.fullName ? 'border-red-500' : 'border-slate-300'}`}
                      placeholder="María García"
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Teléfono (para el repartidor) *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.phone ? 'border-red-500' : 'border-slate-300'}`}
                      placeholder="+34 612 345 678"
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Dirección completa *</label>
                    <input
                      name="addressFull"
                      type="text"
                      value={formData.addressFull}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.addressFull ? 'border-red-500' : 'border-slate-300'}`}
                      placeholder="Calle Gran Vía 10, 28013 Madrid"
                    />
                     {formErrors.addressFull && <p className="text-red-500 text-xs mt-1">{formErrors.addressFull}</p>}
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg flex items-center justify-between border border-emerald-100">
                     <span className="font-bold text-slate-800">Método de pago:</span>
                     <span className="flex items-center gap-2 font-bold text-emerald-700">
                       <Truck className="w-5 h-5" /> Efectivo contra reembolso
                     </span>
                  </div>


                  <div>
                    <Button fullWidth type="submit" className="text-lg py-4 shadow-xl uppercase">
                      PEDIR AHORA — PAGO CONTRA REEMBOLSO
                    </Button>
                    <p className="text-center text-xs text-slate-400 mt-3">
                      Tus datos están protegidos y encriptados con SSL. Los utilizamos ÚNICAMENTE para el envío.
                    </p>
                  </div>

                  <div className="flex justify-center gap-6 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> SSL Seguro</span>
                    <span className="flex items-center gap-1"><Gift className="w-3 h-3" /> Satisfacción garantizada</span>
                  </div>

                </form>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <div className="bg-slate-100 text-slate-500 py-6 text-xs">
        <div className="container mx-auto px-4 text-center">
           <p className="max-w-3xl mx-auto italic leading-relaxed">
             Aviso: El EyeSpa Pro es un dispositivo de bienestar diseñado para relajación y confort. No es un dispositivo médico.
             No está destinado a diagnosticar, tratar, curar o prevenir ninguna enfermedad.
             Si padece patologías oculares, infecciones o problemas cutáneos, consulte a un médico antes de su uso.
             Los resultados pueden variar de una persona a otra.
           </p>
        </div>
      </div>

      {/* STICKY CTA */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 transition-all duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden ${isFormInView ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <div className="flex justify-between items-center gap-4">
           <div className="flex flex-col">
              <span className="text-xs text-slate-500">Solo hoy</span>
              <span className="font-bold text-xl text-slate-900">€59</span>
           </div>
           <Button onClick={scrollToForm} className="flex-1 py-3 text-sm shadow-none">
             PEDIR AHORA
           </Button>
        </div>
      </div>

    </div>
  );
}

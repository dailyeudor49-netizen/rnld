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
  { name: "Joana R.", age: 34, city: "Lisboa", text: "Trabalho ao computador 8 horas por dia. As noites eram um pesadelo. Este massajador tornou-se o meu ritual sagrado. A pele também parece mais distendida!", rating: 5 },
  { name: "Margarida L.", age: 42, city: "Porto", text: "O vapor é delicadíssimo, não queima mas aquece no ponto certo. Adormeço quase sempre enquanto o uso. Recomendo vivamente.", rating: 5 },
  { name: "Helena B.", age: 29, city: "Coimbra", text: "No início estava cética, mas após 15 minutos a sensação de peso desaparece. Excelente a opção de pagamento na entrega.", rating: 4 },
  { name: "Sofia V.", age: 38, city: "Braga", text: "Muito confortável e leve. Uso-o até na pausa do almoço para desligar 10 minutos. Envio rapidíssimo.", rating: 5 },
  { name: "Francisca G.", age: 51, city: "Faro", text: "Uso-o antes de aplicar o creme de contorno de olhos. O calor ajuda imenso a absorção do creme. Nunca mais sem ele.", rating: 5 },
  { name: "Clara M.", age: 26, city: "Aveiro", text: "Presente para a minha mãe, ficou apaixonada. Agora vou encomendar um para mim também com o desconto de quantidade.", rating: 5 },
];

const FAQS: FaqItem[] = [
  { question: "Quanto tempo dura uma sessão?", answer: "Uma sessão padrão dura 15 minutos, após os quais o dispositivo desliga-se automaticamente por segurança e poupança de energia." },
  { question: "O vapor é suave?", answer: "Absolutamente sim. É uma nebulização finíssima concebida para oferecer uma sensação de conforto e hidratação superficial, sem irritar a pele delicada do contorno dos olhos." },
  { question: "O quente e o frio podem ser regulados?", answer: "Sim, o dispositivo possui diferentes modos que alternam temperaturas de conforto para maximizar a sensação de bem-estar." },
  { question: "É ruidoso?", answer: "Não, o motor é ultra-silencioso (<45dB) para garantir o máximo relaxamento durante a utilização." },
  { question: "Pode ser usado com óculos ou lentes?", answer: "Recomendamos retirar os óculos e as lentes de contacto antes da utilização para garantir o máximo conforto e segurança." },
  { question: "Como se limpa?", answer: "A parte em contacto com o rosto é em silicone hipoalergénico ou tecido lavável (dependendo do modelo), basta um pano húmido com detergente neutro." },
  { question: "Quanto custa o envio?", answer: "O envio é gratuito para todas as encomendas realizadas hoje." },
  { question: "Posso pagar na entrega?", answer: "Certamente! Oferecemos o pagamento em numerário ao estafeta sem custos adicionais." },
  { question: "Ajuda com a tensão na testa e nos olhos?", answer: "O EyeSpa Pro é um produto de bem-estar. A combinação de vapor e massagem pode ajudar a relaxar a zona dos olhos e da testa e a reduzir a sensação de tensão após dias intensos em frente aos ecrãs." },
];

const FEATURES_LIST = [
  { title: "Vapor hidratante", desc: "Nebulização nano-mist para uma pele suave.", icon: <Droplets className="w-6 h-6 text-blue-500" /> },
  { title: "Massagem 4D", desc: "Pressão inteligente nos pontos de tensão.", icon: <Zap className="w-6 h-6 text-yellow-500" /> },
  { title: "Quente/Frio", desc: "Termoterapia para um conforto personalizado.", icon: <Thermometer className="w-6 h-6 text-red-500" /> },
  { title: "15 minutos Smart", desc: "Temporizador inteligente para o relaxamento perfeito.", icon: <Clock className="w-6 h-6 text-emerald-500" /> },
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

export default function EyeSpaLandingPT() {
  const [timeLeft, setTimeLeft] = useState(7200);
  const [stock, setStock] = useState(12);
  const [isFormInView, setIsFormInView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = ['/images/eye/1.webp', '/images/eye/2.webp', '/images/eye/3.webp', '/images/eye/5.webp', '/images/eye/6.webp'];
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressFull: '',
    privacy: false
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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name as keyof typeof formData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<Record<keyof typeof formData, string>> = {};

    if (!formData.fullName) errors.fullName = "Nome completo é obrigatório";
    if (!formData.phone) errors.phone = "Telefone é obrigatório";
    if (!formData.addressFull) errors.addressFull = "Morada completa é obrigatória";
    if (!formData.privacy) errors.privacy = "Deve aceitar a política de privacidade";

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
        offer: '3455',
        lp: '3491',
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
          value: 49.99,
          currency: 'EUR',
        });
      }
      window.location.href = '/ty/ty-unc-eye-pt';
    } catch (error) {
      console.error(error);
      window.location.href = '/ty/ty-unc-eye-pt';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Script src="https://offers.uncappednetwork.com/forms/tmfp/" crossOrigin="anonymous" strategy="afterInteractive" />
      <img src="https://offers.uncappednetwork.com/forms/api/ck/?o=3455&uid=019a913a-422a-770d-8b80-6aa9c3b58776&lp=3491" style={{ width: '1px', height: '1px', display: 'none' }} alt="" />

      {/* 1. TOP BAR */}
      <div className="bg-slate-900 text-white text-xs md:text-sm py-2 px-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="flex gap-2 items-center">
          <span className="bg-red-600 px-2 py-0.5 rounded font-bold animate-pulse">OFERTA LIMITADA</span>
          <span className="hidden md:inline">Envio 24/48h • Pagamento na entrega</span>
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
              <span className="text-sm font-semibold text-slate-700">4.8/5 (1.200+ avaliações)</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
              CABEÇA PESADA? OLHAR CANSADO? PELE REPUXADA? <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                DESCARREGUE TUDO EM 15 MINUTOS.
              </span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              Uma pausa de conforto que se sente de imediato.
            </p>

            <ul className="space-y-2">
              {[
                "Ajuda a aliviar a sensação de pressão e tensão após o PC e o telemóvel",
                "Massagem 4D: ajuda a soltar a tensão nos olhos e na testa",
                "15 minutos para se regenerar por completo"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm max-w-sm">
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm line-through">€99.90</span>
                <span className="text-3xl font-bold text-slate-900">€49.99</span>
              </div>
              <div className="flex flex-col">
                 <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">-50% HOJE</span>
                 <span className="text-xs text-slate-500 mt-1">Unidades restantes: <b className="text-red-600">{stock}</b></span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic mt-2 mb-2">
              Se ao final do dia sente os olhos pesados e a testa tensa, esta é a sua pausa.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button onClick={scrollToForm} className="w-full sm:w-auto text-lg px-8">
                ENCOMENDAR AGORA - Pague na entrega
              </Button>
            </div>

            <div className="flex gap-4 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Garantia 2 anos</span>
              <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Envio rápido</span>
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
          <SectionTitle title="Porque é diferente dos outros?" subtitle="O EyeSpa Pro não se limita a vibrar. É um ritual completo." />

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
                <img src="/images/eye/4.webp" alt="Tecnologia de vapor EyeSpa Pro" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold text-blue-800 shadow-sm">
                  Tecnologia Nano-Mist
                </div>
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Vapor quente: <br/><span className="text-blue-600">uma pausa que ilumina o olhar</span></h2>
            <p className="text-slate-700 mb-6 text-lg">
              O vapor quente envolve delicadamente o contorno dos olhos, ajudando a pele a parecer imediatamente mais distendida, luminosa e fresca.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Ajuda a que as olheiras pareçam menos marcadas e o aspeto mais descansado.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Contribui para que a pele pareça mais lisa e firme à vista.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Ajuda a recuperar um olhar visivelmente mais luminoso e fresco.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Deixa a pele suave e hidratada, reduzindo a sensação de repuxar.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. MODES & HOW TO USE */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionTitle title="Como se usa?" subtitle="3 passos para o seu relaxamento diário" />

          <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">1</div>
              <h4 className="font-bold mb-2">Coloque</h4>
              <p className="text-sm text-slate-500">Ajuste a banda elástica para se adaptar perfeitamente ao seu rosto.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">2</div>
              <h4 className="font-bold mb-2">Escolha o modo</h4>
              <p className="text-sm text-slate-500">Selecione entre Energia, Relaxamento, Sono ou Pausa Ocular com um clique.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">3</div>
              <h4 className="font-bold mb-2">Desfrute 15 min</h4>
              <p className="text-sm text-slate-500">Feche os olhos. O dispositivo desliga-se sozinho no final.</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">4 modos exclusivos</h3>
            <div className="space-y-4">
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-yellow-100 p-2 rounded-lg"><Zap className="text-yellow-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Modo Energia:</strong> <span className="text-slate-600 text-sm">Vibração rítmica + Música energizante. Ideal de manhã.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-100 p-2 rounded-lg"><Wind className="text-blue-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Modo Relaxamento:</strong> <span className="text-slate-600 text-sm">Vapor quente + Massagem suave. Para desligar após o trabalho.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-indigo-100 p-2 rounded-lg"><Clock className="text-indigo-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Modo Sono:</strong> <span className="text-slate-600 text-sm">Apenas calor constante + Silêncio absoluto. Prepara para o descanso.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-emerald-100 p-2 rounded-lg"><Eye className="text-emerald-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Modo Pausa Ocular:</strong> <span className="text-slate-600 text-sm">Ciclo rápido frio/quente para revigorar o olhar em 5 min.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle title="A comparação definitiva" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b-2 border-slate-100">Característica</th>
                  <th className="p-4 border-b-2 border-emerald-500 bg-emerald-50 text-emerald-800 rounded-t-lg w-1/3 text-center">EyeSpa Pro</th>
                  <th className="p-4 border-b-2 border-slate-100 text-slate-400 text-center">Máscara de gel</th>
                  <th className="p-4 border-b-2 border-slate-100 text-slate-400 text-center">Massagem manual</th>
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
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Termoterapia (Quente/Frio)</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><span className="text-xs text-slate-400">Apenas um de cada vez</span></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Mãos livres</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><CheckCircle2 className="w-6 h-6 text-slate-400 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Sensação de relaxamento</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center font-bold text-emerald-700">Profundo</td>
                  <td className="p-4 border-b border-slate-100 text-center text-slate-500">Superficial</td>
                  <td className="p-4 border-b border-slate-100 text-center text-slate-500">Variável</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
             <Button onClick={scrollToForm} className="mx-auto">EXPERIMENTE AGORA</Button>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="O que dizem os nossos clientes" subtitle="Mais de 1.200 mulheres portuguesas escolheram o EyeSpa Pro" />
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
                     <p className="text-xs text-slate-400">{t.age} anos, {t.city}</p>
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
          <SectionTitle title="Perguntas frequentes" />
          <Accordion items={FAQS} />
        </div>
      </section>

      {/* 9. ORDER FORM */}
      <section ref={formRef} className="py-16 bg-gradient-to-b from-slate-50 to-emerald-50">
        <div className="container mx-auto px-4">

          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                <div className="bg-slate-900 p-6 text-center text-white">
                  <h3 className="text-2xl font-bold mb-1">PREENCHA OS DADOS PARA ENCOMENDAR</h3>
                  <p className="text-emerald-400 text-sm font-medium">Entrega rápida + Pagamento na entrega</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                  <input type="hidden" name="tmfp" />

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo *</label>
                    <input
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.fullName ? 'border-red-500' : 'border-slate-300'}`}
                      placeholder="Maria Silva"
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefone (para o estafeta) *</label>
                    <input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.phone ? 'border-red-500' : 'border-slate-300'}`}
                      placeholder="+351 912 345 678"
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Morada completa *</label>
                    <input
                      name="addressFull"
                      type="text"
                      value={formData.addressFull}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.addressFull ? 'border-red-500' : 'border-slate-300'}`}
                      placeholder="Rua Augusta 10, 1100-053 Lisboa"
                    />
                     {formErrors.addressFull && <p className="text-red-500 text-xs mt-1">{formErrors.addressFull}</p>}
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg flex items-center justify-between border border-emerald-100">
                     <span className="font-bold text-slate-800">Método de pagamento:</span>
                     <span className="flex items-center gap-2 font-bold text-emerald-700">
                       <Truck className="w-5 h-5" /> Numerário na entrega
                     </span>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleInputChange}
                      className="mt-1 w-5 h-5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <span className={`text-sm ${formErrors.privacy ? 'text-red-500' : 'text-slate-600'}`}>
                      Li e aceito a Política de Privacidade e os Termos de Venda.
                    </span>
                  </label>

                  <div>
                    <Button fullWidth type="submit" className="text-lg py-4 shadow-xl uppercase">
                      ENCOMENDAR AGORA — PAGAR NA ENTREGA
                    </Button>
                    <p className="text-center text-xs text-slate-400 mt-3">
                      Os seus dados estão protegidos e encriptados por SSL. Utilizamo-los APENAS para o envio.
                    </p>
                  </div>

                  <div className="flex justify-center gap-6 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> SSL Seguro</span>
                    <span className="flex items-center gap-1"><Gift className="w-3 h-3" /> Satisfação garantida</span>
                  </div>

                </form>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <div className="bg-slate-100 text-slate-500 py-6 text-xs">
        <div className="container mx-auto px-4 text-center">
           <p className="max-w-3xl mx-auto italic leading-relaxed">
             Aviso: O EyeSpa Pro é um dispositivo de bem-estar concebido para relaxamento e conforto. Não é um dispositivo médico.
             Não se destina a diagnosticar, tratar, curar ou prevenir qualquer doença.
             Se sofre de patologias oculares, infeções ou problemas cutâneos, consulte um médico antes da utilização.
             Os resultados podem variar de pessoa para pessoa.
           </p>
        </div>
      </div>

      {/* STICKY CTA */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 transition-all duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden ${isFormInView ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <div className="flex justify-between items-center gap-4">
           <div className="flex flex-col">
              <span className="text-xs text-slate-500">Só hoje</span>
              <span className="font-bold text-xl text-slate-900">€49.99</span>
           </div>
           <Button onClick={scrollToForm} className="flex-1 py-3 text-sm shadow-none">
             ENCOMENDAR AGORA
           </Button>
        </div>
      </div>

    </div>
  );
}

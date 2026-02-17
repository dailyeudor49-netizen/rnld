'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  { name: "Giulia R.", age: 34, city: "Milano", text: "Lavoro al PC 8 ore al giorno. La sera era un incubo. Questo massaggiatore è diventato il mio rituale sacro. La pelle sembra anche più distesa!", rating: 5 },
  { name: "Martina L.", age: 42, city: "Roma", text: "Il vapore è delicatissimo, non brucia ma scalda al punto giusto. Mi addormento quasi sempre mentre lo uso. Consigliatissimo.", rating: 5 },
  { name: "Elena B.", age: 29, city: "Torino", text: "All'inizio ero scettica, ma dopo 15 minuti la sensazione di pesantezza sparisce. Ottimo il pagamento alla consegna.", rating: 4 },
  { name: "Sofia V.", age: 38, city: "Bologna", text: "Molto comodo e leggero. Lo uso anche in pausa pranzo per staccare 10 minuti. Spedizione velocissima.", rating: 5 },
  { name: "Francesca G.", age: 51, city: "Napoli", text: "Lo uso prima di mettere il contorno occhi. Il calore aiuta tantissimo l'assorbimento della crema. Mai più senza.", rating: 5 },
  { name: "Chiara M.", age: 26, city: "Firenze", text: "Regalo per mia mamma, se n'è innamorata. Ora ne ordino uno anche per me con lo sconto quantità.", rating: 5 },
];

const FAQS: FaqItem[] = [
  { question: "Quanto dura una sessione?", answer: "Una sessione standard dura 15 minuti, dopodiché il dispositivo si spegne automaticamente per sicurezza e risparmio energetico." },
  { question: "Il vapore è delicato?", answer: "Assolutamente sì. È una nebulizzazione finissima pensata per offrire una sensazione di comfort e idratazione superficiale, senza irritare la pelle delicata del contorno occhi." },
  { question: "Caldo e freddo si possono regolare?", answer: "Sì, il dispositivo ha diverse modalità che alternano temperature comfort per massimizzare la sensazione di benessere." },
  { question: "È rumoroso?", answer: "No, il motore è ultra-silenzioso (<45dB) per garantire il massimo relax durante l'utilizzo." },
  { question: "Si usa con occhiali o lenti?", answer: "Consigliamo di rimuovere occhiali e lenti a contatto prima dell'uso per garantire il massimo comfort e sicurezza." },
  { question: "Come si pulisce?", answer: "La parte a contatto con il viso è in silicone ipoallergenico o tessuto lavabile (a seconda del modello), basta un panno umido con detergente neutro." },
  { question: "Quanto costa la spedizione?", answer: "La spedizione è gratuita per tutti gli ordini effettuati oggi." },
  { question: "Posso pagare alla consegna?", answer: "Certamente! Offriamo il pagamento in contanti al corriere senza costi aggiuntivi." },
  { question: "Aiuta con la tensione alla fronte e agli occhi?", answer: "EyeSpa Pro è un prodotto wellness. La combinazione di vapore e massaggio può aiutare a rilassare la zona occhi e fronte e a ridurre la sensazione di tensione dopo giornate intense davanti agli schermi." },
];

const FEATURES_LIST = [
  { title: "Vapore Idratante", desc: "Nebulizzazione nano-mist per una pelle morbida.", icon: <Droplets className="w-6 h-6 text-blue-500" /> },
  { title: "Massaggio 4D", desc: "Pressione intelligente sui punti di tensione.", icon: <Zap className="w-6 h-6 text-yellow-500" /> },
  { title: "Caldo/Freddo", desc: "Termoterapia per un comfort personalizzato.", icon: <Thermometer className="w-6 h-6 text-red-500" /> },
  { title: "15 Minuti Smart", desc: "Timer intelligente per il relax perfetto.", icon: <Clock className="w-6 h-6 text-emerald-500" /> },
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

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [stock, setStock] = useState(12);
  const [isFormInView, setIsFormInView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroImages = ['/images/eye/1.webp', '/images/eye/2.webp', '/images/eye/3.webp', '/images/eye/5.webp', '/images/eye/6.webp'];
  const formRef = useRef<HTMLDivElement>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressFull: '',
    privacy: false
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Countdown Logic
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

  // Scarcity Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setStock((prev) => {
        if (prev <= 3) return prev;
        return Math.random() > 0.7 ? prev - 1 : prev;
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for Form Visibility
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

  // Form Handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error on change
    if (formErrors[name as keyof typeof formData]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<Record<keyof typeof formData, string>> = {};
    
    if (!formData.fullName) errors.fullName = "Nome e Cognome obbligatorio";
    if (!formData.phone) errors.phone = "Telefono obbligatorio";
    if (!formData.addressFull) errors.addressFull = "Indirizzo completo obbligatorio";
    if (!formData.privacy) errors.privacy = "Devi accettare la privacy";

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Simulate API submission
    setTimeout(() => {
      setIsSubmitted(true);
      window.scrollTo({ top: formRef.current?.offsetTop, behavior: 'smooth' });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      
      {/* 1. TOP BAR */}
      <div className="bg-slate-900 text-white text-xs md:text-sm py-2 px-4 sticky top-0 z-50 flex justify-between items-center shadow-md">
        <div className="flex gap-2 items-center">
          <span className="bg-red-600 px-2 py-0.5 rounded font-bold animate-pulse">OFFERTA LIMITATA</span>
          <span className="hidden md:inline">Spedizione 24/48h • Pagamento alla consegna</span>
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
              <span className="text-sm font-semibold text-slate-700">4.8/5 (1.200+ recensioni)</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
              TESTA PIENA? SGUARDO STANCO? PELLE CHE TIRA? <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                SCARICA TUTTO IN 15 MINUTI.
              </span>
            </h1>
            
            <p className="text-lg text-slate-600 leading-relaxed">
              Una pausa di comfort che si sente subito.
            </p>

            <ul className="space-y-2">
              {[
                "Aiuta a sciogliere la sensazione di pressione e tensione dopo PC e telefono",
                "Massaggio 4D: aiuta a sciogliere la tensione su occhi e fronte",
                "15 minuti per rigenerarti del tutto"
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
                 <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">-50% OGGI</span>
                 <span className="text-xs text-slate-500 mt-1">Pezzi rimasti: <b className="text-red-600">{stock}</b></span>
              </div>
            </div>

            <p className="text-xs text-slate-500 italic mt-2 mb-2">
              Se a fine giornata senti occhi pesanti e la fronte tesa, questa è la tua pausa.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button onClick={scrollToForm} className="w-full sm:w-auto text-lg px-8">
                ORDINA ORA - Paghi alla consegna
              </Button>
            </div>
            
            <div className="flex gap-4 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Garanzia 2 Anni</span>
              <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Spedizione Rapida</span>
            </div>
          </div>

          <div className="relative z-10 flex justify-center">
            {/* Image Carousel */}
            <div className="w-full max-w-md aspect-square bg-white rounded-3xl shadow-2xl border border-slate-100 relative overflow-hidden">
              {heroImages.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`EyeSpa Pro ${idx + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}

              {/* Arrows */}
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

              {/* Dots */}
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
          <SectionTitle title="Perché è diverso dagli altri?" subtitle="EyeSpa Pro non vibra e basta. È un rituale completo." />
          
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
                <img src="/images/eye/4.webp" alt="Tecnologia Vapore EyeSpa Pro" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur px-4 py-2 rounded-lg text-sm font-bold text-blue-800 shadow-sm">
                  Tecnologia Nano-Mist
                </div>
             </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Vapore caldo: <br/><span className="text-blue-600">una pausa che illumina lo sguardo</span></h2>
            <p className="text-slate-700 mb-6 text-lg">
              Il vapore caldo avvolge delicatamente il contorno occhi, aiutando la pelle ad apparire subito più distesa, luminosa e fresca.
            </p>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Supporta un aspetto delle occhiaie meno marcato e più riposato.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Contribuisce a rendere la pelle più liscia e compatta alla vista.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Aiuta a ritrovare uno sguardo visibilmente più luminoso e fresco.</span>
              </li>
              <li className="flex gap-3">
                <div className="bg-blue-100 p-1 rounded-full"><CheckCircle2 className="w-5 h-5 text-blue-600" /></div>
                <span className="text-slate-700">Lascia la pelle morbida e idratata, riducendo la sensazione che tira.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. MODES & HOW TO USE */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <SectionTitle title="Come si usa?" subtitle="3 step per il tuo relax quotidiano" />
          
          <div className="grid md:grid-cols-3 gap-8 mb-16 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-8 left-0 w-full h-0.5 bg-slate-200 -z-10"></div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">1</div>
              <h4 className="font-bold mb-2">Indossa</h4>
              <p className="text-sm text-slate-500">Regola la fascia elastica per adattarla perfettamente al tuo viso.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">2</div>
              <h4 className="font-bold mb-2">Scegli Modalità</h4>
              <p className="text-sm text-slate-500">Seleziona tra Energia, Relax, Sonno o Eye Break con un click.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 text-center shadow-sm">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600 font-bold text-2xl border-4 border-white">3</div>
              <h4 className="font-bold mb-2">Goditi 15 Min</h4>
              <p className="text-sm text-slate-500">Chiudi gli occhi. Il dispositivo si spegnerà da solo alla fine.</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">4 Modalità Esclusive</h3>
            <div className="space-y-4">
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-yellow-100 p-2 rounded-lg"><Zap className="text-yellow-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Modalità Energia:</strong> <span className="text-slate-600 text-sm">Vibrazione ritmica + Musica Energizzante. Ideale al mattino.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-blue-100 p-2 rounded-lg"><Wind className="text-blue-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Modalità Relax:</strong> <span className="text-slate-600 text-sm">Vapore caldo + Massaggio leggero. Per staccare dopo il lavoro.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-indigo-100 p-2 rounded-lg"><Clock className="text-indigo-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Modalità Sonno:</strong> <span className="text-slate-600 text-sm">Solo calore costante + Silenzio assoluto. Prepara al riposo.</span></div>
              </div>
              <div className="flex items-start md:items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                <div className="bg-emerald-100 p-2 rounded-lg"><Eye className="text-emerald-600 w-5 h-5"/></div>
                <div><strong className="text-slate-800 block md:inline mr-2">Modalità Eye Break:</strong> <span className="text-slate-600 text-sm">Ciclo rapido freddo/caldo per rinvigorire lo sguardo in 5 min.</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPARISON */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <SectionTitle title="Il confronto definitivo" />
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-4 border-b-2 border-slate-100">Caratteristica</th>
                  <th className="p-4 border-b-2 border-emerald-500 bg-emerald-50 text-emerald-800 rounded-t-lg w-1/3 text-center">EyeSpa Pro</th>
                  <th className="p-4 border-b-2 border-slate-100 text-slate-400 text-center">Maschera Gel</th>
                  <th className="p-4 border-b-2 border-slate-100 text-slate-400 text-center">Massaggio Manuale</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Vapore costante</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Termoterapia (Caldo/Freddo)</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><span className="text-xs text-slate-400">Solo uno alla volta</span></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Hands-Free (Senza mani)</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center"><CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><CheckCircle2 className="w-6 h-6 text-slate-400 mx-auto"/></td>
                  <td className="p-4 border-b border-slate-100 text-center"><X className="w-6 h-6 text-slate-300 mx-auto"/></td>
                </tr>
                <tr>
                  <td className="p-4 border-b border-slate-100 font-medium text-slate-700">Sensazione Relax</td>
                  <td className="p-4 border-b border-slate-100 bg-emerald-50/30 text-center font-bold text-emerald-700">Profondo</td>
                  <td className="p-4 border-b border-slate-100 text-center text-slate-500">Superficiale</td>
                  <td className="p-4 border-b border-slate-100 text-center text-slate-500">Variabile</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
             <Button onClick={scrollToForm} className="mx-auto">PROVALO ORA</Button>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <SectionTitle title="Cosa dicono i nostri clienti" subtitle="Più di 1.200 donne italiane hanno scelto EyeSpa Pro" />
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
                     <p className="text-xs text-slate-400">{t.age} anni, {t.city}</p>
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
          <SectionTitle title="Domande Frequenti" />
          <Accordion items={FAQS} />
        </div>
      </section>

      {/* 9. ORDER FORM */}
      <section ref={formRef} className="py-16 bg-gradient-to-b from-slate-50 to-emerald-50">
        <div className="container mx-auto px-4">
          
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            {isSubmitted ? (
               <div className="p-16 text-center animate-fadeIn">
                 <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                 </div>
                 <h2 className="text-3xl font-bold text-slate-900 mb-4">Ordine Ricevuto!</h2>
                 <p className="text-slate-600 text-lg">Grazie {formData.fullName}.<br/>Un nostro operatore ti contatterà a breve per confermare la spedizione.</p>
                 <div className="mt-8 p-4 bg-slate-50 rounded-lg text-sm text-slate-500">
                    Questa è una demo. Nessun dato è stato inviato.
                 </div>
               </div>
            ) : (
              <>
                <div className="bg-slate-900 p-6 text-center text-white">
                  <h3 className="text-2xl font-bold mb-1">COMPILA I DATI PER ORDINARE</h3>
                  <p className="text-emerald-400 text-sm font-medium">Consegna Rapida + Pagamento alla Consegna</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                  
                  {/* Quantity Selector Removed */}

                  {/* Inputs */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Nome e Cognome *</label>
                    <input 
                      name="fullName" 
                      type="text" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.fullName ? 'border-red-500' : 'border-slate-300'}`} 
                      placeholder="Mario Rossi" 
                    />
                    {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Telefono (per il corriere) *</label>
                    <input 
                      name="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.phone ? 'border-red-500' : 'border-slate-300'}`} 
                      placeholder="333 1234567" 
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Indirizzo Completo *</label>
                    <input 
                      name="addressFull" 
                      type="text" 
                      value={formData.addressFull}
                      onChange={handleInputChange}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${formErrors.addressFull ? 'border-red-500' : 'border-slate-300'}`} 
                      placeholder="Via Roma 10, 00100 Roma" 
                    />
                     {formErrors.addressFull && <p className="text-red-500 text-xs mt-1">{formErrors.addressFull}</p>}
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg flex items-center justify-between border border-emerald-100">
                     <span className="font-bold text-slate-800">Metodo di Pagamento:</span>
                     <span className="flex items-center gap-2 font-bold text-emerald-700">
                       <Truck className="w-5 h-5" /> Contanti alla Consegna
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
                      Ho letto e accetto la Privacy Policy e i Termini di Vendita.
                    </span>
                  </label>

                  <div>
                    <Button fullWidth type="submit" className="text-lg py-4 shadow-xl uppercase">
                      ORDINA ORA — PAGA ALLA CONSEGNA
                    </Button>
                    <p className="text-center text-xs text-slate-400 mt-3">
                      I tuoi dati sono protetti e criptografati SSL. Li usiamo SOLO per la spedizione.
                    </p>
                  </div>
                  
                  <div className="flex justify-center gap-6 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> SSL Secure</span>
                    <span className="flex items-center gap-1"><Gift className="w-3 h-3" /> Soddisfatti o Rimborsati</span>
                  </div>

                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <div className="bg-slate-100 text-slate-500 py-6 text-xs">
        <div className="container mx-auto px-4 text-center">
           <p className="max-w-3xl mx-auto italic leading-relaxed">
             Disclaimer: EyeSpa Pro è un dispositivo wellness progettato per il relax e il comfort. Non è un dispositivo medico.
             Non è destinato a diagnosticare, trattare, curare o prevenire alcuna malattia.
             Se soffri di patologie oculari, infezioni, o problemi cutanei, consulta un medico prima dell'uso.
             I risultati possono variare da persona a persona.
           </p>
        </div>
      </div>

      {/* STICKY CTA */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 z-50 transition-all duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden ${isFormInView ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
        <div className="flex justify-between items-center gap-4">
           <div className="flex flex-col">
              <span className="text-xs text-slate-500">Solo oggi</span>
              <span className="font-bold text-xl text-slate-900">€49.99</span>
           </div>
           <Button onClick={scrollToForm} className="flex-1 py-3 text-sm shadow-none">
             ORDINA ORA
           </Button>
        </div>
      </div>

    </div>
  );
}
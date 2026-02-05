'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import {
  Check, 
  X, 
  Star, 
  ShieldCheck, 
  Truck, 
  ThumbsUp, 
  Clock, 
  MapPin, 
  User, 
  Smartphone, 
  Package, 
  ShoppingBag,
  ArrowDown,
  Zap,
  Feather,
  Battery,
  Award,
  Smile,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// --- UTILS ---

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
};

// --- DATA ---
const PRODUCT_IMAGES = [
  "/images/vacum/1.jpg",
  "/images/vacum/2.jpg",
  "/images/vacum/3.jpg",
  "/images/vacum/4.jpg"
];

// --- COMPONENTS ---

// 1. TOP STRIP (Urgency - Softer tone)
const TopStrip = ({ timeLeft }: { timeLeft: number }) => (
  <div className="bg-red-700 text-white py-3 px-4 text-center sticky top-0 z-40 shadow-md">
    <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-4 text-sm sm:text-base font-bold uppercase tracking-wide">
      <span className="animate-pulse text-yellow-300">DISPONIBILITÀ LIMITATA</span>
      <span className="hidden sm:inline">|</span>
      <span>L'OFFERTA SPECIALE TERMINA TRA: {formatTime(timeLeft)}</span>
    </div>
  </div>
);

// 2. STICKY ORDER BUTTON (Reinforced reassurance)
const StickyOrderButton = ({ visible }: { visible: boolean }) => {
  const handleClick = () => {
    const target = document.getElementById('order-form-start');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-3 bg-white border-t-4 border-orange-500 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]"
      style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom))' }}
    >
      <div className="max-w-md mx-auto flex items-center gap-3">
        <div className="flex-1">
          <button
            onClick={handleClick}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold text-xl py-3 rounded-lg shadow-lg uppercase tracking-wide flex flex-col items-center justify-center leading-none"
          >
            <span>VOGLIO PROVARLO (ORDINA ORA)</span>
            <span className="text-[11px] mt-1 font-medium bg-green-800 px-3 py-0.5 rounded text-green-100">Paghi in contanti al corriere - Nessun rischio</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. ORDER FORM SECTION
const OrderFormSection = ({ timeLeft }: { timeLeft: number }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = "Per favore, scrivi il tuo nome";
    if (!formData.address.trim()) newErrors.address = "Serve l'indirizzo per la spedizione";
    const phoneRegex = /^[\d\s+\-]{8,}$/;
    if (!formData.phone.match(phoneRegex)) newErrors.phone = "Inserisci un numero di telefono valido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);

    router.push('/ty/ty-id-vacum-it');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <section id="order" className="py-12 px-4 bg-slate-100">
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-slate-300">
          <div className="bg-orange-600 text-white p-4 text-center font-bold text-xl uppercase">
            Blocca il prezzo in offerta
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-black text-center text-slate-900 mb-2">Compila il modulo qui sotto</h3>
            <p className="text-center text-slate-600 mb-6 font-medium text-lg">
              Non ti chiediamo soldi ora. <br/>
              Pagherai in contanti direttamente al corriere quando arriva il pacco.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div id="order-form-start" className="h-0 w-0 opacity-0 pointer-events-none scroll-mt-24"></div>

              <div>
                <label className="font-bold text-slate-800 ml-1">Nome e Cognome</label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3.5 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    name="name"
                    placeholder="Es. Maria Rossi" 
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full pl-10 p-3 bg-slate-50 border-2 rounded-lg text-lg outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                  />
                </div>
                {errors.name && <p className="text-red-500 text-sm font-bold mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="font-bold text-slate-800 ml-1">Telefono (per la conferma)</label>
                <div className="relative mt-1">
                  <Smartphone className="absolute left-3 top-3.5 text-slate-400" size={20} />
                  <input 
                    type="tel" 
                    name="phone"
                    placeholder="Es. 333 1234567" 
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full pl-10 p-3 bg-slate-50 border-2 rounded-lg text-lg outline-none focus:border-blue-500 ${errors.phone ? 'border-red-500' : 'border-slate-300'}`}
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm font-bold mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="font-bold text-slate-800 ml-1">Indirizzo di Spedizione</label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3.5 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    name="address"
                    placeholder="Via, Città, CAP" 
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full pl-10 p-3 bg-slate-50 border-2 rounded-lg text-lg outline-none focus:border-blue-500 ${errors.address ? 'border-red-500' : 'border-slate-300'}`}
                  />
                </div>
                {errors.address && <p className="text-red-500 text-sm font-bold mt-1">{errors.address}</p>}
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-[6px] border-green-600 bg-white shrink-0"></div>
                <div>
                    <span className="font-bold text-slate-900 block">Pagamento alla Consegna</span>
                    <span className="text-sm text-slate-600">Nessuna carta di credito richiesta.</span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-4 shadow-lg border-b-4 border-orange-800 active:scale-95 transition-transform mt-4"
              >
                <span className="block text-2xl font-black uppercase">VOGLIO RICEVERLO</span>
                <span className="block text-orange-100 text-sm font-medium">Clicca per confermare l'indirizzo</span>
              </button>
              
              <p className="text-sm text-center text-slate-500 mt-2 flex items-center justify-center gap-1">
                <ShieldCheck size={16} /> I tuoi dati sono al sicuro e non saranno condivisi.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function App() {
  const [timeLeft, setTimeLeft] = useState(3600 * 2 + 15 * 60);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showStickyButton, setShowStickyButton] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const orderSection = document.getElementById('order');
    if (!orderSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyButton(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(orderSection);
    return () => observer.disconnect();
  }, []);

  const scrollToForm = () => {
    const el = document.getElementById('order-form-start');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % PRODUCT_IMAGES.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + PRODUCT_IMAGES.length) % PRODUCT_IMAGES.length);
  };

  return (
    <>
      <div className="bg-white font-sans text-slate-900 pb-40">
        
        {/* 1. TOP STRIP */}
        <TopStrip timeLeft={timeLeft} />

        {/* 2. HERO SECTION */}
        <section className="pt-8 pb-8 px-4 max-w-2xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <div className="flex text-yellow-400">
              {[1,2,3,4,5].map(i => <Star key={i} size={22} fill="currentColor" />)}
            </div>
            <span className="font-bold text-slate-600 text-sm uppercase tracking-wide">Più di 2.000 clienti soddisfatti</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-4 text-slate-900">
            Smetti di fare fatica per pulire i pavimenti.
          </h1>
          <p className="text-xl text-slate-600 mb-8 font-medium leading-relaxed">
            Ecco l'aspirapolvere leggero che salva la tua schiena. Senza fili, potente e facile da usare anche con una mano sola.
          </p>

          {/* --- PRODUCT IMAGE SLIDER --- */}
          <div className="mb-8 overflow-hidden">
              <div className="relative aspect-square bg-slate-100 rounded-xl overflow-hidden shadow-lg border border-slate-200">
                  <img 
                      src={PRODUCT_IMAGES[currentImageIndex]} 
                      alt={`Aspirapolvere facile vista ${currentImageIndex + 1}`} 
                      className="w-full h-full object-cover transition-opacity duration-300"
                  />
                  
                  {/* Navigation Arrows */}
                  <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md backdrop-blur-sm transition-colors"
                      aria-label="Precedente"
                  >
                      <ChevronLeft size={32} strokeWidth={2.5} />
                  </button>
                  <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full shadow-md backdrop-blur-sm transition-colors"
                      aria-label="Successiva"
                  >
                      <ChevronRight size={32} strokeWidth={2.5} />
                  </button>

                  {/* Counter Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md">
                      {currentImageIndex + 1} / {PRODUCT_IMAGES.length}
                  </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide justify-center px-1">
                  {PRODUCT_IMAGES.map((img, idx) => (
                      <button 
                          key={idx} 
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`relative w-20 h-20 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                              currentImageIndex === idx ? 'border-orange-500 opacity-100 ring-2 ring-orange-200' : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                      >
                          <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                  ))}
              </div>
          </div>
          {/* --- END PRODUCT IMAGE SLIDER --- */}

          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 mb-8 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <div>
                  <p className="text-slate-500 font-bold uppercase text-sm mb-1">Prezzo normale: <span className="line-through text-red-500">€ 249,00</span></p>
                  <p className="text-4xl sm:text-5xl font-black text-slate-900">€ 129,00</p>
              </div>
              <div className="bg-yellow-300 text-yellow-900 font-bold px-4 py-2 rounded-lg uppercase text-sm shadow-sm">
                  Offerta valida oggi
              </div>
            </div>

            <ul className="space-y-4 mb-8 text-left">
              <li className="flex items-start gap-3 text-lg font-medium text-slate-800">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><Feather size={20} /></div>
                  <span><strong>Leggerissimo:</strong> Pesa come una bottiglia d'acqua, non stanca il braccio.</span>
              </li>
              <li className="flex items-start gap-3 text-lg font-medium text-slate-800">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><Zap size={20} /></div>
                  <span><strong>Senza fili:</strong> Ti muovi liberamente senza inciampare nel cavo.</span>
              </li>
              <li className="flex items-start gap-3 text-lg font-medium text-slate-800">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><Check size={20} /></div>
                  <span><strong>Potente:</strong> Aspira briciole e peli al primo passaggio.</span>
              </li>
              <li className="flex items-start gap-3 text-lg font-medium text-slate-800">
                  <div className="bg-green-100 p-1 rounded-full text-green-600 mt-0.5"><X size={20} /></div>
                  <span><strong>Igienico:</strong> Svuoti la polvere senza toccarla con le mani.</span>
              </li>
            </ul>

            <button 
              onClick={scrollToForm}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold text-2xl py-5 rounded-xl shadow-lg border-b-4 border-green-800 active:scale-95 transition-all uppercase"
            >
              VOGLIO PROVARLO
              <span className="block text-sm font-bold text-green-100 mt-1 uppercase">Nessun pagamento anticipato richiesto</span>
            </button>
          </div>
        </section>

        {/* 3. PROBLEM SECTION */}
        <section className="bg-slate-100 py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-black mb-6 text-slate-900 leading-tight">
              Perché continuare a faticare?
            </h2>
            <p className="text-xl text-slate-600 mb-10 font-medium">
              Usare un vecchio aspirapolvere pesante rende le pulizie un incubo per la schiena.
            </p>
            
            <div className="space-y-4 text-left">
              <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0"><ArrowDown size={24} /></div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Basta pesi da trascinare</h3>
                    <p className="text-slate-600">Spostare un bidone pesante da una stanza all'altra non fa bene alla salute. Con questo aspirapolvere, fai tutto con una mano.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0"><X size={24} /></div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Basta fili tra i piedi</h3>
                    <p className="text-slate-600">Quante volte devi cambiare presa o rischi di inciampare? Qui non hai nessun filo che ti disturba.</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm flex gap-4 items-start">
                <div className="bg-red-100 p-3 rounded-full text-red-600 shrink-0"><X size={24} /></div>
                <div>
                    <h3 className="font-bold text-slate-900 text-lg mb-1">Pulire non deve essere scomodo</h3>
                    <p className="text-slate-600">Piegarsi per pulire sotto il letto o il divano è faticoso. Il nostro aspirapolvere si infila dappertutto senza sforzo.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. SOLUTION / BENEFITS */}
        <div className="space-y-4 max-w-2xl mx-auto px-4 py-12">
          
          <div className="text-center mb-10">
              <h2 className="text-3xl font-black text-slate-900 mb-4">La soluzione semplice per la casa pulita.</h2>
              <p className="text-lg text-slate-600">Abbiamo tolto tutto quello che dà fastidio (peso, fili, sacchetti) e lasciato solo la potenza.</p>
          </div>

          <section className="py-8 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Feather size={28}/></div>
              <h3 className="text-2xl font-black text-slate-900">LEGGERO (SOLO 1.5 KG)</h3>
            </div>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              È così leggero che non ti accorgi nemmeno di averlo in mano. Puoi fare le scale, pulire le tende o togliere le ragnatele dal soffitto senza avere dolore alle braccia dopo cinque minuti.
            </p>
          </section>

          <section className="py-8 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Zap size={28}/></div>
              <h3 className="text-2xl font-black text-slate-900">LIBERTÀ TOTALE</h3>
            </div>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              Lo accendi e vai dove vuoi. Dalla cucina alla sala, dal bagno alla camera da letto. La batteria dura abbastanza per pulire tutta la casa con calma, senza l'ansia che si spenga.
            </p>
          </section>

          <section className="py-8 border-t border-slate-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600"><Check size={28}/></div>
              <h3 className="text-2xl font-black text-slate-900">PULIZIA PROFONDA</h3>
            </div>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              Nonostante sia leggero, il motore è potente. Aspira polvere, briciole di pane e peli di animali in una sola passata. Risparmi tempo perché non devi passare due volte.
            </p>
          </section>

        </div>

        {/* 5. NEW: HOW IT WORKS PRACTICALLY */}
        <section className="py-12 px-4 max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-xl mb-12">
          <h3 className="text-2xl font-black text-slate-900 mb-6 text-center">Come funziona, in pratica?</h3>
          <p className="text-lg text-slate-700 mb-6 text-center">
            È stato studiato per essere usato da chiunque, senza leggere istruzioni complicate:
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="font-black text-slate-300 text-4xl leading-none">1</div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Lo togli dalla scatola</p>
                <p className="text-slate-600">Arriva a casa tua già quasi pronto all'uso.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-black text-slate-300 text-4xl leading-none">2</div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Premi il pulsante</p>
                <p className="text-slate-600">Non devi tenerlo premuto col dito. Basta un click e lui aspira.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-black text-slate-300 text-4xl leading-none">3</div>
              <div>
                <p className="font-bold text-slate-900 text-lg">Svuoti con un click</p>
                <p className="text-slate-600">Quando hai finito, apri il contenitore direttamente sopra il cestino. Non ti sporchi le mani.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. OFFER SUMMARY CARD */}
        <section className="px-4 mb-12 max-w-2xl mx-auto">
          <div className="bg-yellow-50 border-2 border-yellow-400 p-6 rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-bl-lg uppercase">Offerta Lampo</div>
            
            <h3 className="text-xl font-black text-slate-900 mb-6 uppercase flex items-center gap-2">
              <Package size={24}/> Cosa ricevi a casa:
            </h3>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 font-medium text-slate-800"><Check className="text-green-600"/> <strong>1x Aspirapolvere Wireless</strong></li>
              <li className="flex items-center gap-2 font-medium text-slate-800"><Check className="text-green-600"/> <strong>1x Batteria Lunga Durata</strong></li>
              <li className="flex items-center gap-2 font-medium text-slate-800"><Check className="text-green-600"/> <strong>1x Caricabatterie Rapido</strong></li>
              <li className="flex items-center gap-2 font-medium text-slate-800"><Check className="text-green-600"/> <strong>1x Kit Accessori (In Regalo)</strong></li>
            </ul>

            <div className="flex justify-between items-end border-t border-yellow-200 pt-4 mb-6">
              <span className="text-slate-500 font-bold uppercase text-sm">Prezzo Finale</span>
              <div className="text-right">
                <div className="text-red-500 font-bold line-through text-lg">€ 249,00</div>
                <div className="text-3xl font-black text-slate-900">€ 129,00</div>
              </div>
            </div>

            <button 
              onClick={scrollToForm}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold text-xl py-4 rounded-lg shadow uppercase"
            >
              Sì, voglio provarlo &rarr;
            </button>
            <p className="text-center text-sm text-slate-600 mt-2">Pagamento alla consegna, nessun rischio.</p>
          </div>
        </section>

        {/* 7. REVIEWS */}
        <section className="bg-slate-50 py-16 px-4">
          <h2 className="text-2xl font-black text-center mb-10 text-slate-900">Chi lo ha già provato</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {[
              { n: "Maria T., 62 anni", t: "Una salvezza per la mia schiena. Il vecchio bidone aspiratutto era diventato impossibile da usare. Questo è leggerissimo, lo uso tutti i giorni anche solo per le briciole. Non tornerei mai indietro." },
              { n: "Luigi R., 55 anni", t: "Ero diffidente perché non è una marca che si vede in TV, ma mi ha sorpreso. Aspira benissimo i peli del mio cane e la batteria dura tanto. Ottimo acquisto." },
              { n: "Anna B., 68 anni", t: "Abitando su due piani, portare su e giù l'aspirapolvere col filo era un incubo. Con questo faccio le scale in un attimo. Consigliatissimo." }
            ].map((rev, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex gap-1 text-yellow-400 mb-3">
                  {[1,2,3,4,5].map(x => <Star key={x} size={18} fill="currentColor"/>)}
                </div>
                <p className="text-slate-700 italic mb-4 text-lg leading-relaxed">"{rev.t}"</p>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 text-sm"><User size={20}/></div>
                    <div>
                      <p className="font-bold text-slate-900">{rev.n}</p>
                      <p className="text-xs text-green-600 font-bold flex items-center gap-1"><ShieldCheck size={12}/> Acquisto Verificato</p>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. GUARANTEE */}
        <section className="py-12 px-4 max-w-3xl mx-auto border-t border-slate-200">
          <h2 className="text-2xl font-black text-center mb-8">ACQUISTA CON SERENITÀ</h2>
          <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><ShieldCheck size={32}/></div>
                  <div>
                      <h3 className="font-bold text-lg text-slate-900">Garanzia Italiana 2 Anni</h3>
                      <p className="text-slate-600 text-sm">Se dovesse guastarsi, ci pensiamo noi. Abbiamo un'assistenza clienti italiana.</p>
                  </div>
              </div>
              <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600"><Smile size={32}/></div>
                  <div>
                      <h3 className="font-bold text-lg text-slate-900">Soddisfatti o Rimborsati</h3>
                      <p className="text-slate-600 text-sm">Hai 30 giorni per provarlo a casa tua. Se non ti trovi bene, te lo rimborsiamo.</p>
                  </div>
              </div>
          </div>
        </section>

        {/* 9. HOW TO ORDER */}
        <section className="bg-slate-800 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-black mb-10">COME SI ORDINA?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-slate-700 p-6 rounded-xl border border-slate-600">
                      <div className="text-4xl font-black mb-3 text-slate-400">1</div>
                      <h3 className="font-bold text-lg mb-2">Compila il modulo</h3>
                      <p className="text-slate-300 text-sm">Inserisci il tuo nome e telefono qui sotto. Non serve la carta di credito.</p>
                  </div>
                  <div className="bg-slate-700 p-6 rounded-xl border border-slate-600">
                      <div className="text-4xl font-black mb-3 text-slate-400">2</div>
                      <h3 className="font-bold text-lg mb-2">Ti chiamiamo noi</h3>
                      <p className="text-slate-300 text-sm">Un nostro operatore ti contatterà per confermare la spedizione e rispondere alle tue domande.</p>
                  </div>
                  <div className="bg-slate-700 p-6 rounded-xl border border-slate-600">
                      <div className="text-4xl font-black mb-3 text-slate-400">3</div>
                      <h3 className="font-bold text-lg mb-2">Paghi al corriere</h3>
                      <p className="text-slate-300 text-sm">Paghi in contanti solo quando ricevi il pacco a casa. Zero rischi.</p>
                  </div>
              </div>
          </div>
        </section>

        {/* 10. FORM SECTION */}
        <OrderFormSection timeLeft={timeLeft} />

        {/* 11. UPDATED FAQ */}
        <section className="pt-8 pb-20 px-4 max-w-2xl mx-auto">
          <h2 className="text-xl font-black text-center mb-6 uppercase">Dubbi o domande?</h2>
          <div className="space-y-4">
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-900 mb-2 text-lg">Ci sono costi nascosti o abbonamenti?</p>
                <p className="text-slate-600">
                  Assolutamente no. Paghi solo il prezzo dell'aspirapolvere (€ 129,00) una volta sola. La spedizione è gratis. Non ti chiederemo mai altri soldi.
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-900 mb-2 text-lg">Posso parlare con qualcuno se ho problemi?</p>
                <p className="text-slate-600">
                  Certamente. Abbiamo un'assistenza clienti italiana pronta ad aiutarti per qualsiasi dubbio, anche dopo l'acquisto.
                </p>
              </div>
              <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
                <p className="font-bold text-slate-900 mb-2 text-lg">Se compilo il modulo devo per forza comprare?</p>
                <p className="text-slate-600">
                  No. Compilare il modulo serve solo a bloccare l'offerta. Quando ti chiamiamo per confermare, puoi farci tutte le domande che vuoi e decidere liberamente.
                </p>
              </div>
          </div>
        </section>

      </div>

      {/* STICKY BUTTON - fixed in basso */}
      <StickyOrderButton visible={showStickyButton} />
    </>
  );
}
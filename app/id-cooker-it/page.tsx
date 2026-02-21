'use client';
import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Shield, Zap, ChevronDown, ChevronLeft, ChevronRight, Flame, Timer, Gauge, Utensils, ChefHat, Soup, Truck, PhoneCall, Heart, Scale, RefreshCw, Wind, X, Check, PlayCircle } from 'lucide-react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function RobotCucinaLanding() {
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

  const handleSubmit = async () => {
    if (!orderData.name.trim() || !orderData.phone.trim() || !orderData.address.trim()) {
      setSubmitError('Per favore, compila tutti i campi per procedere.');
      return;
    }
    
    const phoneDigits = orderData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 9) {
      setSubmitError('Il numero di telefono inserito non sembra corretto.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch('https://ap.purchstar.com/api/networks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: orderData.name.split(' ')[0] || orderData.name,
          lastName: orderData.name.split(' ').slice(1).join(' ') || '',
          phone: orderData.phone,
          address: orderData.address,
          product: 'Robot Cucina Multifunzione 12in1',
          price: 69,
          source: 'robot-cucina',
        }),
      });

      if (response.ok) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-17104994752/robotcucina',
            value: 69,
            currency: 'EUR',
          });
        }
        window.location.href = '/ty/ty-robot-cucina';
      } else {
        setSubmitError('Si è verificato un errore. Riprova.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitError('Si è verificato un errore. Riprova.');
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Funzioni incluse", robot: "12 in 1 completo", without: "Solo 1-2 funzioni" },
    { feature: "Spazio occupato", robot: "Minimo ingombro", without: "Piano cucina affollato" },
    { feature: "Cottura", robot: "Automatica e precisa", without: "Bisogna mescolare a mano" },
    { feature: "Pulizia", robot: "Rapida, antiaderente", without: "Difficile e laboriosa" },
    { feature: "Costo totale", robot: "Solo €69", without: "Oltre €400 per più elettrodomestici" },
  ];

  const faqs = [
    {
      question: "Quali funzioni sostituisce questo robot?",
      answer: "Questo robot è progettato per essere il tuo unico alleato in cucina. Sostituisce frullatore, impastatrice, tritatutto, vaporiera, bilancia e friggitrice. Con un solo apparecchio puoi preparare ogni tipo di ricetta, dagli antipasti ai dolci."
    },
    {
      question: "È facile da usare per chi non è esperto di tecnologia?",
      answer: "Assolutamente sì. Abbiamo studiato un pannello comandi molto semplice e intuitivo. Basta selezionare la funzione desiderata e premere avvio. È ideale per chi cerca praticità senza complicazioni."
    },
    {
      question: "La ciotola è capiente?",
      answer: "Sì, la ciotola ha una capacità di 6 litri, ideale per cucinare per tutta la famiglia o per preparare pasti da conservare."
    },
    {
      question: "Come avviene il pagamento?",
      answer: "Per la tua massima sicurezza, offriamo il pagamento alla consegna. Pagherai l'importo di €69 direttamente al corriere quando riceverai il prodotto a casa."
    },
    {
      question: "C'è una garanzia sul prodotto?",
      answer: "Certamente. Il prodotto è coperto da una garanzia di 24 mesi. Inoltre, hai 30 giorni di tempo per provarlo: se non sarai soddisfatto, potrai restituirlo senza problemi."
    }
  ];

  const reviews = [
    { nome: 'Giuliana M.', testo: 'Sono rimasta sorpresa dalla qualità. Fa le stesse cose di robot molto più costosi. Preparo risotti e vellutate perfette senza fatica. Un ottimo aiuto per chi ha poco tempo o vuole cucinare sano.', stelle: 5, data: '18 Dicembre 2024' },
    { nome: 'Marco T.', testo: 'Non sono mai stato un bravo cuoco, ma con questo robot tutto diventa semplice. Il ragù viene saporito e non devo stare lì a controllare continuamente.', stelle: 5, data: '15 Dicembre 2024' },
    { nome: 'Francesca R.', testo: 'Ho liberato un sacco di spazio in cucina. Ho venduto i vecchi elettrodomestici perché questo fa tutto. La bilancia integrata poi è comodissima.', stelle: 5, data: '12 Dicembre 2024' },
    { nome: 'Antonio D.', testo: 'Materiali robusti e motore potente. Trita bene anche le verdure più dure. Per €69 è stato un acquisto davvero azzeccato.', stelle: 5, data: '8 Dicembre 2024' },
    { nome: 'Laura B.', testo: 'Utilissimo per le vellutate dei bambini. Metto tutto dentro e fa lui. Si pulisce in un attimo, cosa fondamentale per me.', stelle: 5, data: '3 Dicembre 2024' },
    { nome: 'Giuseppe L.', testo: 'L’ho regalato a mia moglie ed è felicissima. La spedizione è stata veloce e ho pagato comodamente al corriere.', stelle: 5, data: '15 Novembre 2024' },
  ];

  const funzioniDodici = [
    { title: "Trita", desc: "per verdure, carne, frutta secca", icon: <Zap className="w-6 h-6 text-orange-600" /> },
    { title: "Frulla", desc: "vellutate, smoothie, pappe", icon: <Soup className="w-6 h-6 text-orange-600" /> },
    { title: "Impasta", desc: "pane, pizza, dolci", icon: <Utensils className="w-6 h-6 text-orange-600" /> },
    { title: "Monta", desc: "panna, albumi, creme", icon: <ChefHat className="w-6 h-6 text-orange-600" /> },
    { title: "Cuoce", desc: "zuppe, risotti, sughi", icon: <Flame className="w-6 h-6 text-orange-600" /> },
    { title: "Cottura a vapore", desc: "verdure, pesce, carne", icon: <Wind className="w-6 h-6 text-orange-600" /> },
    { title: "Mescola automaticamente", desc: "non devi stare ai fornelli", icon: <RefreshCw className="w-6 h-6 text-orange-600" /> },
    { title: "Soffritto automatico", desc: "senza bruciare", icon: <Flame className="w-6 h-6 text-orange-600" /> },
    { title: "Frittura leggera", desc: "anche con pochissimo o senza olio", icon: <Zap className="w-6 h-6 text-orange-600" /> },
    { title: "Bilancia integrata", desc: "pesa mentre cucini", icon: <Scale className="w-6 h-6 text-orange-600" /> },
    { title: "Timer e controllo temperatura", desc: "cottura sempre sotto controllo", icon: <Timer className="w-6 h-6 text-orange-600" /> },
    { title: "Programmi automatici", desc: "scegli e premi un tasto", icon: <CheckCircle className="w-6 h-6 text-orange-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed text-slate-800 pb-20 md:pb-0">
      {/* Barra superiore fissa per urgenza soft */}
      <div className="bg-slate-900 text-white text-center py-2 text-sm font-medium">
        Offerta speciale per rinnovo magazzino - Disponibilità limitata
      </div>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl md:hidden">
        <div className="px-4 py-3">
          <button
            onClick={openOrderPopup}
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-transform"
          >
            <span>ORDINA ORA A €69</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <header className="pt-8 pb-6 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
          Semplifica la tua cucina con il Robot <span className="text-orange-600">12 in 1</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium mb-6">
          <strong className="text-slate-900 font-bold">1200 video-ricette integrate</strong> che ti guidano passo dopo passo. 
          Il robot imposta tempi e temperature in automatico: impossibile sbagliare!
        </p>
        <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm mb-4 border border-green-200">
          <CheckCircle className="w-4 h-4" />
          <span>Pagamento alla consegna incluso</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden relative border border-slate-200 group">
              <img
                src={slides[currentSlide]}
                alt="Robot Cucina Multifunzione"
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
                <span className="text-slate-500 text-sm font-medium">4.847 Recensioni positive</span>
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-5xl md:text-6xl font-black text-orange-600" style={{ fontFamily: 'var(--font-montserrat)' }}>€69</span>
                <span className="text-xl text-slate-400 line-through">€449</span>
              </div>

              {/* Box Fiducia Rafforzato */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Acquisto Sicuro e Garantito
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Pagamento alla consegna
                  </li>
                  <li className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-blue-500" />
                    Conferma ordine telefonica
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-500" />
                    Consegna in 2-4 giorni
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    Garanzia di 2 anni inclusa
                  </li>
                </ul>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 px-8 rounded-2xl font-black text-xl transition-all shadow-lg hover:shadow-orange-200 mb-4"
              >
                PRENOTA ORA - PAGHI ALLA CONSEGNA
              </button>
              
              <p className="text-center text-slate-500 text-sm">
                Offerta valida fino a esaurimento scorte di magazzino.
              </p>
            </div>

            {/* Benefici principali semplificati */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Perché sceglierlo:</h3>
              <div className="grid grid-cols-1 gap-4">
                
                {/* NUOVA CARD VIDEO RICETTE */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><PlayCircle className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">1200 Video Ricette Incluse</h4>
                    <p className="text-sm text-slate-600">Non sai cucinare? Nessun problema. Segui i video sul display e il robot fa il resto.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Utensils className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Prepara tutto in pochi secondi</h4>
                    <p className="text-sm text-slate-600">Trita le verdure, sminuzza la carne e frulla frutta senza sforzo.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><ChefHat className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Impasta e monta come un professionista</h4>
                    <p className="text-sm text-slate-600">Perfetto per pane, pizza e dolci fatti in casa.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Flame className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Cottura automatica e sana</h4>
                    <p className="text-sm text-slate-600">Cucina risotti e zuppe mescolando da solo, oppure usa il vapore.</p>
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
            Le 12 funzioni del robot, spiegate in modo semplice
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
              Non devi imparare nulla: scegli il programma e il robot fa tutto da solo.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Vince su ogni aspetto</h2>
             <p className="text-slate-500">Confronta tu stesso: ecco perché conviene.</p>
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
                       <span className="text-xs uppercase font-bold text-slate-400">Classico</span>
                       <X className="w-6 h-6 text-slate-300" />
                       <span className="text-sm font-medium text-slate-500 leading-tight">{row.without}</span>
                    </div>
                    <div className="p-4 bg-orange-50/50 flex flex-col items-center justify-center text-center gap-2">
                       <span className="text-xs uppercase font-bold text-orange-600">Robot 12in1</span>
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
                    <th className="p-8 text-sm font-bold tracking-widest text-slate-400 uppercase w-1/3">Caratteristica</th>
                    <th className="p-8 text-sm font-bold tracking-widest text-slate-400 uppercase text-center w-1/3">Metodo Tradizionale</th>
                    <th className="w-1/3 p-0">
                       <div className="bg-orange-600 text-white py-6 text-center font-black text-xl rounded-tl-3xl shadow-lg relative z-10">
                          ROBOT 12in1
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
          <h2 className="text-3xl font-black text-center text-slate-900 mb-12">Le opinioni di chi lo usa già</h2>
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
            <h2 className="text-3xl md:text-4xl font-black mb-4">Ricevilo a casa tua</h2>
            <p className="text-slate-400 text-lg">
              Compila i dati qui sotto per essere ricontattato telefonicamente e confermare la spedizione.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-800">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
              <div>
                <span className="block font-bold text-slate-900 text-lg">Robot Cucina 12 in 1</span>
                <span className="text-slate-500 text-sm">Consegna in 2-4 giorni lavorativi</span>
              </div>
              <div className="text-right">
                <span className="block text-3xl font-black text-orange-600">€69</span>
                <span className="text-slate-400 line-through text-sm">€449</span>
              </div>
            </div>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                {submitError}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <label className="block text-slate-700 font-bold mb-2">Nome e Cognome</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Es. Mario Rossi"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Numero di Telefono (Cellulare)</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Es. 333 1234567"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Indirizzo di Spedizione</label>
                <input
                  type="text"
                  name="address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Indirizzo, Civico, Città"
                  disabled={isSubmitting}
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 ${
                  isSubmitting
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isSubmitting ? 'INVIO IN CORSO...' : 'CONFERMA ORDINE'}
              </button>

              <div className="flex items-center gap-2 justify-center text-slate-400 text-xs text-center mt-6">
                <Shield className="w-4 h-4" />
                <span>Rispettiamo la tua privacy. I dati sono protetti e usati solo per la consegna.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white pb-32">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center text-slate-900 mb-10">Domande frequenti</h2>
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
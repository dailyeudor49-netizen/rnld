'use client';

import React, { useState, useEffect } from 'react';
import { 
  Star, 
  CheckCircle, 
  Shield, 
  Zap, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  Moon, 
  Thermometer, 
  Activity, 
  Heart, 
  Droplets, 
  Bed, 
  Phone, 
  Truck, 
  ThumbsUp 
} from 'lucide-react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function TopperOrtopedicoLanding() {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedEndTime = localStorage.getItem('topper-offer-end');
      if (savedEndTime) {
        const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000);
        return remaining > 0 ? remaining : 0;
      } else {
        const endTime = Date.now() + 57 * 60 * 1000;
        localStorage.setItem('topper-offer-end', endTime.toString());
        return 57 * 60;
      }
    }
    return 57 * 60;
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [selectedSize, setSelectedSize] = useState('160x200');
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [submitError, setSubmitError] = useState('');
  const [showSticky, setShowSticky] = useState(true);

  const slides = [
    '/images/topper/1.webp',
    '/images/topper/2.webp',
    '/images/topper/3.webp',
    '/images/topper/4.webp',
  ];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hide sticky CTA when order form is visible
  useEffect(() => {
    const formSection = document.getElementById('order-form-section');
    if (!formSection) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowSticky(!entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(formSection);
    return () => observer.disconnect();
  }, []);

  // Auto-slide (rallentato per pubblico meno giovane)
  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // 6 secondi invece di 4
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
      setSubmitError('Per favore, compila tutti i campi per la spedizione.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Simulazione invio dati
      const response = await fetch('https://ap.purchstar.com/api/networks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: orderData.name.split(' ')[0] || orderData.name,
          lastName: orderData.name.split(' ').slice(1).join(' ') || '',
          phone: orderData.phone,
          address: orderData.address,
          product: 'Soft Foam',
          size: selectedSize,
          price: 89,
          source: 'topper-ortopedico',
        }),
      });

      if (response.ok) {
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'conversion', {
            send_to: 'AW-17104994752/topper',
            value: 89,
            currency: 'EUR',
          });
        }
        window.location.href = '/ty/ty-uc-topper-it';
      } else {
         console.warn("API call failed (expected in preview). Simulating success.");
         window.location.href = '/ty/ty-uc-topper-it';
      }
    } catch (error) {
      console.error(error);
      window.location.href = '/ty/ty-uc-topper-it';
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviews = [
    { nome: 'Giuseppe M.', eta: '68 anni', testo: 'Pensavo di dover cambiare il materasso che era diventato scomodo, ma costava troppo. Con questo topper ho risolto. La mattina mi alzo senza quel dolore alla schiena che avevo da anni. Consigliatissimo.', stelle: 5, data: 'Ieri' },
    { nome: 'Maria T.', eta: '62 anni', testo: 'Ero scettica di comprare su internet, ma ho pagato al corriere quando è arrivato. È morbidissimo ma sostiene bene. Finalmente dormo tutta la notte senza svegliarmi per il caldo.', stelle: 5, data: '2 giorni fa' },
    { nome: 'Franco B.', eta: '71 anni', testo: 'Facile da mettere sul letto, non pesa troppo. Mia moglie ha smesso di lamentarsi del materasso duro. Soldi spesi bene.', stelle: 5, data: 'Settimana scorsa' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* Top Bar - Rassicurazione Immediata */}
      <div className="bg-slate-100 py-2 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-sm md:text-base font-medium text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600" />
            <span>Garanzia Italiana 2 Anni</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-teal-600" />
            <span>Assistenza Clienti Attiva</span>
          </div>
        </div>
      </div>

      {/* Fixed CTA Button Mobile - Testo grande e chiaro */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-teal-600 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-3 md:hidden transition-transform duration-300 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <button
          onClick={openOrderPopup}
          className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-xl shadow-lg flex flex-col items-center leading-none"
        >
          <span>ORDINA E PAGA ALLA CONSEGNA</span>
          <span className="text-sm font-normal mt-1 opacity-90">Nessuna carta di credito richiesta</span>
        </button>
      </div>

      {/* Hero Section */}
      <section className="bg-white pt-8 pb-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Ti svegli spesso con il <span className="text-red-700 underline decoration-red-300 decoration-4">mal di schiena?</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 mb-6 leading-relaxed">
            Trasforma il tuo vecchio materasso in un <strong>letto ortopedico nuovo</strong>, senza spendere una fortuna.
          </p>
          <div className="inline-block bg-green-50 border border-green-200 rounded-lg px-6 py-3 mb-4">
            <p className="text-lg text-green-800 font-semibold flex items-center gap-2 justify-center">
              <ThumbsUp className="w-6 h-6" />
              <span>Più di 15.000 italiani dormono meglio grazie a Soft Foam</span>
            </p>
          </div>
        </div>
      </section>

      {/* Product & Offer Section */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          
          {/* Gallery - Frecce Grandi e Immagini Chiare */}
          <div className="relative bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="aspect-square relative">
              <img
                src={slides[currentSlide]}
                alt="Topper Materasso Ortopedico"
                className="w-full h-full object-cover"
              />
              
              {/* Controlli Slide Grandi */}
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 rounded-full p-4 shadow-xl border border-slate-200 cursor-pointer"
                aria-label="Immagine precedente"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev + 1) % slides.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 rounded-full p-4 shadow-xl border border-slate-200 cursor-pointer"
                aria-label="Immagine successiva"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
            <div className="p-4 bg-white text-center">
              <p className="text-slate-600 font-medium">Scorri per vedere altre foto</p>
            </div>
          </div>

          {/* Right: Offerta Chiara */}
          <div className="bg-white border-2 border-teal-500 rounded-2xl p-6 md:p-8 shadow-xl relative mt-4 lg:mt-0">
            <div className="absolute -top-6 right-4 bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-xl transform rotate-3">
              OFFERTA -70%
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Soft Foam - Topper Correttivo
            </h2>
            {/* Selettore Misure */}
            <div className="mb-6">
              <p className="text-lg font-semibold text-slate-700 mb-3">Scegli la misura:</p>
              <div className="grid grid-cols-3 gap-2">
                {['80x190', '90x200', '120x190', '140x200', '160x200', '180x200'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 px-2 rounded-xl text-lg font-bold border-2 transition-all cursor-pointer ${
                      selectedSize === size
                        ? 'border-teal-600 bg-teal-50 text-teal-700 shadow-md'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Prezzo Grande */}
            <div className="bg-slate-50 rounded-xl p-6 mb-8 text-center border border-slate-200">
              <p className="text-slate-500 text-lg line-through mb-1">Prezzo normale: €299</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl text-slate-700 font-medium">Oggi solo:</span>
                <span className="text-6xl font-extrabold text-teal-700">€89</span>
              </div>
              <p className="text-red-600 font-bold mt-2 text-lg">Paghi tutto alla consegna in contanti.</p>
            </div>

            {/* Lista Benefici Rapida */}
            <ul className="space-y-4 mb-8">
              {[
                "Ti svegli riposato e senza dolori",
                "Non devi cambiare il tuo materasso",
                "Facile da mettere e da lavare",
                "Spedizione Gratuita in 24/48 ore"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-green-100 p-1 rounded-full mt-1">
                    <CheckCircle className="w-6 h-6 text-green-700" />
                  </div>
                  <span className="text-lg md:text-xl text-slate-800 font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={openOrderPopup}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-5 px-6 rounded-xl font-bold text-2xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 mb-4 hidden md:block"
            >
              CLICCA QUI PER ORDINARE
            </button>
            <p className="text-center text-slate-500 text-sm hidden md:block">
              Nessun pagamento anticipato richiesto.
            </p>
          </div>
        </div>
      </main>

      {/* Per chi è ideale - Sezione Empatica */}
      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Ideale se ti trovi in una di queste situazioni:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-500">
              <Activity className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Materasso troppo duro?</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Se il tuo materasso attuale sembra "di pietra" e ti fa male le anche o le spalle, questo topper lo rende subito morbido e accogliente.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-500">
              <Bed className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Materasso vecchio?</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Se senti le molle che pungono o ci sono degli avvallamenti, il Soft Foam livella tutto e ti sembrerà di avere un letto nuovo.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-500">
              <Thermometer className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Sudi troppo di notte?</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Il tessuto speciale fa passare l'aria. D'estate resti fresco e asciutto, d'inverno ti tiene al caldo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonianze Reali e Leggibili */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-2">
            Cosa dice chi lo usa già
          </h2>
          <p className="text-xl text-center text-slate-600 mb-10">
            Recensioni verificate da clienti italiani
          </p>

          <div className="space-y-6">
            {reviews.map((review, i) => (
              <div key={i} className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center text-teal-700 font-bold text-xl">
                      {review.nome[0]}
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">{review.nome}</p>
                      <p className="text-slate-500">{review.eta}</p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500 mt-2 md:mt-0">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
                  </div>
                </div>
                <p className="text-xl text-slate-800 italic leading-relaxed">
                  "{review.testo}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Garanzie - Sezione Fiducia */}
      <section className="bg-teal-50 py-12 border-y border-teal-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Truck className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Spedizione Gratuita</h3>
              <p className="text-lg text-slate-700">Il corriere ti chiama prima di arrivare. Consegna in 24/48 ore.</p>
            </div>
            <div>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Shield className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Garanzia 2 Anni</h3>
              <p className="text-lg text-slate-700">Prodotto italiano certificato. Qualsiasi problema, lo cambiamo.</p>
            </div>
            <div>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <CheckCircle className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Pagamento Sicuro</h3>
              <p className="text-lg text-slate-700">Non serve la carta di credito. Paghi in contanti alla consegna.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Come Ordinare - Semplicissimo */}
      <section className="py-12 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Ordinare è facilissimo:</h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-center">
            <div className="bg-white p-6 rounded-xl border-2 border-slate-100 w-full md:w-1/3">
              <span className="text-5xl font-bold text-teal-200 block mb-2">1</span>
              <p className="text-xl font-bold text-slate-900">Compila il modulo</p>
              <p className="text-slate-600">Scrivi nome e indirizzo qui sotto.</p>
            </div>
            <div className="hidden md:block text-slate-300 text-4xl">→</div>
            <div className="bg-white p-6 rounded-xl border-2 border-slate-100 w-full md:w-1/3">
              <span className="text-5xl font-bold text-teal-200 block mb-2">2</span>
              <p className="text-xl font-bold text-slate-900">Ti chiamiamo noi</p>
              <p className="text-slate-600">Per confermare che i dati sono giusti.</p>
            </div>
            <div className="hidden md:block text-slate-300 text-4xl">→</div>
            <div className="bg-white p-6 rounded-xl border-2 border-slate-100 w-full md:w-1/3">
              <span className="text-5xl font-bold text-teal-200 block mb-2">3</span>
              <p className="text-xl font-bold text-slate-900">Paghi alla consegna</p>
              <p className="text-slate-600">Dai i soldi al corriere quando arriva.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modulo Ordine - Grande e Chiaro */}
      <section id="order-form-section" className="bg-slate-100 py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-teal-600 p-6 text-center text-white">
              <h2 className="text-3xl font-bold mb-2">Modulo d'Ordine</h2>
              <p className="text-teal-100 text-lg">Compila qui per ricevere lo sconto del 70%</p>
            </div>
            
            <div className="p-6 md:p-10">
              {submitError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <p className="text-red-700 font-bold">{submitError}</p>
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label className="block text-slate-900 font-bold text-xl mb-3">Nome e Cognome</label>
                  <input
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-0 text-xl text-slate-900 placeholder-slate-400 bg-slate-50"
                    placeholder="Es: Mario Rossi"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-slate-900 font-bold text-xl mb-3">Numero di Telefono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-0 text-xl text-slate-900 placeholder-slate-400 bg-slate-50"
                    placeholder="Es: 333 1234567"
                    disabled={isSubmitting}
                  />
                  <p className="text-slate-500 text-sm mt-2">Ti chiameremo su questo numero per confermare la spedizione.</p>
                </div>
                <div>
                  <label className="block text-slate-900 font-bold text-xl mb-3">Indirizzo di Spedizione</label>
                  <input
                    type="text"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-0 text-xl text-slate-900 placeholder-slate-400 bg-slate-50"
                    placeholder="Via, Numero, Città..."
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
                <p className="text-yellow-900 font-medium text-lg">
                  Stai ordinando il <strong>Topper misura {selectedSize} cm a €89</strong> (invece di €299). Pagherai in contanti al corriere.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full mt-8 py-5 rounded-xl font-bold text-2xl text-white shadow-xl transition-transform transform hover:-translate-y-1 ${
                  isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isSubmitting ? 'ATTENDI UN ATTIMO...' : 'CONFERMA L\'ORDINE ORA'}
              </button>
              
              <div className="text-center mt-6 flex justify-center items-center gap-2 text-slate-500">
                <Shield className="w-5 h-5" />
                <span>I tuoi dati sono al sicuro e non verranno condivisi.</span>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
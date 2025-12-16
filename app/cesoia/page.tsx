'use client';
import React, { useState, useEffect } from 'react';
import { Star, Award, CheckCircle, Shield, Zap, Battery, ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Dichiarazioni TypeScript per Google Ads - CORRETTE
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export default function CesoiaElettricaLanding() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showOrderPopup, setShowOrderPopup] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(57 * 60); // 57 minuti in secondi
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [conversionTracked, setConversionTracked] = useState<boolean>(false);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState<number>(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState<boolean>(true);
  const [reviewsAutoScroll, setReviewsAutoScroll] = useState<boolean>(true);
  
  // Dati del modulo d'ordine
  const [orderData, setOrderData] = useState({
    name: '',
    phone: '',
    address: ''
  });

  // Array delle immagini del carosello
  const carouselImages = [
    '/images/cesoia/img_princ.png',
    '/images/cesoia/carosello_1.jpg',
    '/images/cesoia/carosello_2.jpg',
    '/images/cesoia/carosello_3.jpg',
    '/images/cesoia/carosello_4.jpg',
    '/images/cesoia/carosello_5.jpg',
    '/images/cesoia/carosello_6.jpg',
    '/images/cesoia/carosello_7.jpg',
    '/images/cesoia/carosello_8.jpg',
  ];

  // Carica Google Ads script quando il componente si monta
  useEffect(() => {
    // Evita doppio caricamento in sviluppo
    if (typeof window === 'undefined') return;
    
    // Verifica se lo script è già caricato
    const existingScript = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
    if (existingScript && window.gtag) return;

    // Carica Google Ads Global Site Tag
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=AW-17104994752';
    document.head.appendChild(gtagScript);

    // Inizializza gtag
    gtagScript.onload = () => {
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag(...args: any[]) {
          if (window.dataLayer) {
            window.dataLayer.push(args);
          }
        };
        
        if (window.gtag) {
          window.gtag('js', new Date());
          window.gtag('config', 'AW-17104994752');
        }
      }
    };

    return () => {
      // Cleanup script quando il componente si smonta
      const scriptToRemove = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  // Auto-scroll del carosello
  useEffect(() => {
    if (!autoScrollEnabled) return;

    const interval = setInterval(() => {
      setCurrentCarouselIndex((prevIndex) =>
        (prevIndex + 1) % carouselImages.length
      );
    }, 3000); // Cambia ogni 3 secondi

    return () => clearInterval(interval);
  }, [carouselImages.length, autoScrollEnabled]);

  // Auto-scroll delle recensioni
  useEffect(() => {
    if (!reviewsAutoScroll) return;

    const interval = setInterval(() => {
      const container = document.querySelector('.reviews-container') as HTMLElement;
      if (container) {
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;
        const scrollLeft = container.scrollLeft;
        const maxScroll = scrollWidth - clientWidth;

        console.log('scrollLeft:', scrollLeft, 'maxScroll:', maxScroll, 'diff:', maxScroll - scrollLeft);

        if (scrollLeft >= maxScroll - 100 || scrollLeft + clientWidth >= scrollWidth - 10) {
          console.log('RESET to start');
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [reviewsAutoScroll]);

  // Funzione per tracciare la conversione
  const trackConversion = () => {
    if (conversionTracked) {
      return;
    }

    if (typeof window !== 'undefined' && window.gtag) {
      try {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17104994752/jZlCPqKod4aEMCDptw',
          'value': 66.99,
          'currency': 'EUR',
          'transaction_id': `ORDER_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
        });
        
        setConversionTracked(true);
        console.log('✅ Conversione tracciata con successo');
      } catch (error) {
        console.error('❌ Errore nel tracciamento conversione:', error);
      }
    }
  };

  // Gestore del conto alla rovescia
  useEffect(() => {
    if (!showOrderPopup) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [showOrderPopup]);

  // Carica lo script per il fingerprint quando si apre il popup
  useEffect(() => {
    if (showOrderPopup && typeof window !== 'undefined') {
      // Verifica se lo script è già presente
      const existingScript = document.querySelector('script[src="https://offers.uncappednetwork.com/forms/tmfp/"]');
      if (existingScript) return;

      const script = document.createElement('script');
      script.src = 'https://offers.uncappednetwork.com/forms/tmfp/';
      script.crossOrigin = 'anonymous';
      script.defer = true;
      document.head.appendChild(script);
      
      return () => {
        // Cleanup: rimuovi lo script quando il popup si chiude
        const scriptToRemove = document.querySelector('script[src="https://offers.uncappednetwork.com/forms/tmfp/"]');
        if (scriptToRemove) {
          scriptToRemove.remove();
        }
      };
    }
  }, [showOrderPopup]);

  // Formatta il tempo in MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Validazione dei campi
  const validateForm = (): boolean => {
    if (!orderData.name.trim()) {
      setSubmitError('Il nome è obbligatorio');
      return false;
    }
    if (!orderData.phone.trim()) {
      setSubmitError('Il numero di telefono è obbligatorio');
      return false;
    }
    if (!orderData.address.trim()) {
      setSubmitError('L\'indirizzo è obbligatorio');
      return false;
    }
    
    // Validazione formato telefono (semplice)
    const phoneRegex = /^[\d\s\+\-\(\)]{8,}$/;
    if (!phoneRegex.test(orderData.phone.trim())) {
      setSubmitError('Inserisci un numero di telefono valido');
      return false;
    }
    
    setSubmitError('');
    return true;
  };

  // Gestisci l'invio del modulo
  const handleSubmitOrder = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Prepara i dati per l'API
      const params = new URLSearchParams();
      params.append('uid', '0191b25c-22d2-7f55-9d9b-79b67cebbff3');
      params.append('key', 'e0fe8e75c501eccab21f8d');
      params.append('offer', '678');
      params.append('lp', '692');
      params.append('name', orderData.name.trim());
      params.append('tel', orderData.phone.trim());
      params.append('street-address', orderData.address.trim());
      
      // Gestione fingerprint
      const tmfpElement = document.querySelector('input[name="tmfp"]') as HTMLInputElement;
      if (tmfpElement && tmfpElement.value) {
        params.append('tmfp', tmfpElement.value);
      } else if (typeof navigator !== 'undefined') {
        params.append('ua', navigator.userAgent);
      }

      console.log('=== DEBUG API CALL ===');
      console.log('Dati da inviare:', Object.fromEntries(params));

      // URL dell'API originale
      const apiUrl = 'https://offers.uncappednetwork.com/forms/api/';
      
      try {
        console.log('Tentativo chiamata API a:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
          },
          body: params.toString(),
          mode: 'cors',
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', Array.from(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('Response body:', responseText);

        if (response.ok || response.status === 200) {
          console.log('✅ API SUCCESS - Tracciamento conversione e redirect');
          
          // 🎯 TRACCIA LA CONVERSIONE PRIMA DEL REDIRECT
          trackConversion();
          
          // Attendi un momento per essere sicuri che il tracciamento venga inviato
          await new Promise(resolve => setTimeout(resolve, 500));
          
          // Reset form
          setOrderData({ name: '', phone: '', address: '' });
          setShowOrderPopup(false);
          
          // Redirect con parametro per evitare re-tracciamento
          const timestamp = Date.now();
          if (typeof window !== 'undefined') {
            window.location.href = `/ty-cesoia?converted=1&t=${timestamp}`;
          }
          return;
        }

        // MODALITÀ TEST: Per testare il tracciamento anche senza API funzionante
        if (response.status === 404 || !response.ok) {
          console.warn('⚠️ API Error - Attivo MODALITÀ TEST per testare il tracciamento');
          
          // 🧪 MODALITÀ TEST: Traccia la conversione anche in caso di errore API
          trackConversion();
          
          // Attendi per il tracciamento
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Reset form e redirect per test
          setOrderData({ name: '', phone: '', address: '' });
          setShowOrderPopup(false);
          
          const timestamp = Date.now();
          if (typeof window !== 'undefined') {
            window.location.href = `/ty-cesoia?converted=1&test=1&t=${timestamp}`;
          }
          return;
        }

        throw new Error(`HTTP ${response.status}: ${responseText}`);

      } catch (fetchError: any) {
        console.error('❌ Errore nella fetch:', fetchError);
        
        if (fetchError.name === 'TypeError') {
          setSubmitError('Errore di connessione. Verifica la connessione internet.');
        } else if (fetchError.message.includes('CORS')) {
          setSubmitError('Errore CORS. Il server non accetta richieste da questo dominio.');
        } else {
          setSubmitError(`Errore tecnico: ${fetchError.message}`);
        }
      }

    } catch (error: any) {
      console.error('❌ Errore generale:', error);
      setSubmitError('Errore imprevisto durante l\'invio dell\'ordine.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Gestisci le modifiche ai campi del modulo
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apri il modulo d'ordine e scrolla fino ad esso
  const openOrderForm = () => {
    setShowOrderPopup(true);
    // Scroll fino al modulo con un piccolo delay per permettere il rendering
    setTimeout(() => {
      const orderSection = document.getElementById('order-form-section');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  // Navigazione carosello
  const goToCarouselSlide = (index: number) => {
    setCurrentCarouselIndex(index);
  };

  const nextCarouselSlide = () => {
    setAutoScrollEnabled(false);
    setCurrentCarouselIndex((prevIndex) =>
      (prevIndex + 1) % carouselImages.length
    );
  };

  const prevCarouselSlide = () => {
    setAutoScrollEnabled(false);
    setCurrentCarouselIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const benefits = [
    {
      image: "/images/cesoia/carosello_2.jpg",
      title: "18 ore senza ricaricare",
      description: "2 batterie potentissime da 40V incluse nel prezzo. Lavori tutto il giorno senza fermarti. Quando una si scarica, metti l'altra e continui il lavoro."
    },
    {
      image: "/images/cesoia/carosello_4.jpg",
      title: "1.050W di pura potenza",
      description: "Un motore che non si ferma davanti a nulla. Taglia rami di 8cm come fossero grissini. Velocità regolabile per ogni tipo di lavoro."
    },
    {
      image: "/images/cesoia/carosello_5.jpg",
      title: "Leggera ma indistruttibile",
      description: "Pesa pochissimo ma è robustissima. Blocco di sicurezza per non farti mai male. La usi per ore senza stancarti, perfetta anche per chi è alle prime armi."
    },
    {
      image: "/images/cesoia/carosello_7.jpg",
      title: "Lame giapponesi che durano anni",
      description: "Acciaio SKS come i coltelli dei migliori chef. Restano affilate a lungo. E nel kit trovi anche 2 lame di ricambio gratis."
    }
  ];

  const faqs = [
    {
      question: "Non ho mai usato attrezzi elettrici, ce la faccio?",
      answer: "Certo, è facilissima. La prendi in mano, premi il grilletto e taglia. Ha il blocco di sicurezza quindi è impossibile farsi male. La usano tutti, anche chi non ha mai potato in vita sua."
    },
    {
      question: "Ma taglia davvero rami grossi?",
      answer: "Eccome. Rami di 8cm li taglia come fossero burro. Il motore da 1.050W è una bestia. E puoi regolare la velocità come preferisci."
    },
    {
      question: "Quanto dura la batteria?",
      answer: "Tantissimo. Una batteria dura 9 ore, e nel kit ce ne sono due. Totale: 18 ore di lavoro. Si ricaricano in soli 55 minuti, non resti mai a secco."
    },
    {
      question: "E se si rompe?",
      answer: "Nessun problema. Hai 3 anni di garanzia totale. Se si rompe per qualsiasi motivo, te la cambiamo gratis. Zero rischi per te."
    },
    {
      question: "Devo pagare subito?",
      answer: "No, paghi solo quando arriva a casa tua. Il corriere ti porta il pacco e paghi direttamente a lui. Zero rischi."
    }
  ];

  const comparisonData = [
    { feature: "Potenza Motore", cesoia: "1.050W", competitor1: "800W", competitor2: "450W" },
    { feature: "Batterie Incluse", cesoia: "2x 40V - 5.000mAh", competitor1: "1x18V - 2.000mAh", competitor2: "1x12V - 1.500mAh" },
    { feature: "Autonomia", cesoia: "18 ore", competitor1: "4 ore", competitor2: "2 ore" },
    { feature: "Diametro Taglio", cesoia: "8 cm", competitor1: "5 cm", competitor2: "3 cm" },
    { feature: "Kit Completo", cesoia: "✓", competitor1: "✗", competitor2: "✗" },
    { feature: "Garanzia", cesoia: "3 anni", competitor1: "1 anno", competitor2: "6 mesi" },
    { feature: "Prezzo", cesoia: "€66,99", competitor1: "€129,90", competitor2: "€89,90" }
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{`
        @keyframes slide {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .popup-content {
          background-color: white;
          border-radius: 12px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .carousel-container {
          scroll-snap-type: x mandatory;
        }
        .carousel-item {
          scroll-snap-align: center;
        }
      `}</style>
      
      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-green-500 shadow-2xl">
        <div className="max-w-md mx-auto p-4">
          <button
            onClick={openOrderForm}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>ORDINA ORA - €66,99</span>
            <span className="text-sm bg-white/20 px-2 py-1 rounded">💳 Paga alla consegna</span>
          </button>
        </div>
      </div>

      {/* Yellow Alert Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-2 text-center text-sm font-medium shadow-md">
        📦 Spedito in 48h – Pagamento alla Consegna
      </div>
      
      
      {/* Emotional Hero Title Section */}
      <section className="bg-[#035aa6] text-white pt-4 pb-2 md:py-6 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-3 leading-tight">
            TAGLIA RAMI FINO A 8CM COME IL BURRO
          </h1>
          <p className="text-base md:text-lg text-slate-300 mb-4">
            Basta spaccarti la schiena. Con Instant Cut Pro poti tutto il giardino <span className="text-green-400 font-bold">senza fatica</span> e <span className="text-green-400 font-bold">in metà del tempo</span>.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs md:text-sm">
            <span className="bg-slate-800 px-3 py-1 rounded-full">Zero fatica</span>
            <span className="bg-slate-800 px-3 py-1 rounded-full">Zero dolori</span>
            <span className="bg-slate-800 px-3 py-1 rounded-full">Risultati da professionista</span>
          </div>
        </div>
      </section>

      {/* Product Section - Mobile First, Desktop Side by Side */}
      <main className="max-w-6xl mx-auto px-4 pt-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image - GIF */}
            <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden">
              <img
                src="images/cesoia/cesoia_gif.gif"
                alt="Cesoia Elettrica in azione"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Mini Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentCarouselIndex * 50}%)` }}
                >
                  {carouselImages.map((image, index) => (
                    <div key={index} className="flex-shrink-0 w-1/2 px-1">
                      <div
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                          index === currentCarouselIndex ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => goToCarouselSlide(index)}
                      >
                        <img
                          src={image}
                          alt={`Cesoia Elettrica vista ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation Buttons */}
              <button
                onClick={prevCarouselSlide}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all duration-300 z-10 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextCarouselSlide}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all duration-300 z-10 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Carousel Indicators */}
              <div className="flex justify-center mt-3 space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToCarouselSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      index === currentCarouselIndex ? 'bg-green-500' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {/* Product Title & Rating */}
            <div className="text-left mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Instant Cut Pro - Cesoia Elettrica 1.050W
              </h1>
              <p className="text-lg text-gray-600 mb-3">2 Batterie 40V da 5.000mAh - 18 ore di autonomia</p>
              <a href="#recensioni" className="flex items-center justify-start space-x-2 cursor-pointer hover:opacity-80 transition-opacity mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">(1.924 recensioni)</span>
              </a>

              {/* Bullet Points Emotivi */}
              <div className="bg-[#035aa6] rounded-xl p-4 mb-4 text-left">
                <ul className="space-y-3 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Addio Braccia Distrutte:</strong> Rami di 8cm tagliati come burro. Zero sforzo, zero dolori il giorno dopo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Battery className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Batteria Infinita (18 Ore):</strong> Pota giardini interi. 2 batterie incluse, quando una finisce metti l'altra e vai.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Rami Grossi? Spariti:</strong> 1.050W di potenza bruta. Quello che prima ti prendeva ore, ora lo fai in minuti.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Award className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span><strong>Lame Giapponesi Affilatissime:</strong> Tagli netti e precisi che non rovinano le piante. Acciaio SKS che dura anni.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Price Box */}
            <div id="order-form-section" className="bg-white border-2 border-green-500 rounded-2xl p-5 mb-6 shadow-lg relative">
              {/* Bollino Sconto */}
              <div className="absolute -top-4 -right-4 bg-red-600 text-white text-base font-bold w-14 h-14 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.4)] transform rotate-12 flex items-center justify-center">
                -50%
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center">Instant Cut Pro</h3>
              <p className="text-gray-600 text-center mb-3">Cesoia Elettrica 1.050W</p>
              <div className="flex items-center justify-center space-x-3 mb-2">
                <span className="text-gray-400 line-through text-xl">€167,48</span>
                <span className="text-4xl font-bold text-green-600">€66,99</span>
              </div>
              <div className="flex justify-center mb-3">
                <span className="bg-red-800 text-white font-medium py-2 px-4 rounded-full shadow-md text-sm">Risparmi €100 - Offerta a tempo limitato</span>
              </div>

              {/* Kit Incluso */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-400 rounded-xl p-4 mb-4">
                <p className="font-bold text-amber-800 text-base mb-3 flex items-center justify-center gap-2">
                  🎁 Incluso nel prezzo (valore €100+)
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                  <span className="flex items-center gap-1"><span className="text-green-500">✓</span> 2 Batterie 40V</span>
                  <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Caricatore rapido</span>
                  <span className="flex items-center gap-1"><span className="text-green-500">✓</span> 2 Lame di ricambio</span>
                  <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Valigia trasporto</span>
                  <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Chiavi inglesi</span>
                  <span className="flex items-center gap-1"><span className="text-green-500">✓</span> Manuale istruzioni</span>
                </div>
              </div>

              <button
                onClick={() => setShowOrderPopup(!showOrderPopup)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-bold text-lg transition-all cursor-pointer shadow-lg"
              >
                {showOrderPopup ? 'Chiudi' : 'Ordina Ora - Paghi alla Consegna'}
              </button>

              {/* Form Inline */}
              {showOrderPopup && (
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                    <p className="text-red-700 font-medium text-center text-sm">
                      ⏱️ Offerta scade in: <span className="font-bold">{formatTime(timeLeft)}</span>
                    </p>
                  </div>

                  <input type="hidden" name="tmfp" />

                  {submitError && (
                    <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                      <p className="text-red-700 text-sm">{submitError}</p>
                    </div>
                  )}

                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm" htmlFor="name">
                        Nome e Cognome *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={orderData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Inserisci il tuo nome completo"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm" htmlFor="phone">
                        Numero di Telefono *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={orderData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Inserisci il tuo numero di telefono"
                        disabled={isSubmitting}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-medium mb-1 text-sm" htmlFor="address">
                        Indirizzo di Spedizione *
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={orderData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Inserisci il tuo indirizzo completo"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="bg-amber-100 border-2 border-amber-500 rounded-lg p-3 mb-4">
                    <p className="text-amber-800 font-bold text-sm text-center">
                      💳 Pagamento alla consegna - Nessun dato carta richiesto
                    </p>
                  </div>

                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-lg font-bold transition duration-300 ${
                      isSubmitting
                        ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                    }`}
                  >
                    {isSubmitting ? 'INVIO IN CORSO...' : 'CONFERMA ORDINE - €66,99'}
                  </button>

                  <p className="mt-3 text-center text-xs text-gray-500">
                    I tuoi dati personali sono protetti e sicuri.
                  </p>
                </div>
              )}
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <span className="text-gray-700">Garanzia 3 anni</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <CheckCircle className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <span className="text-gray-700">Reso entro 30 giorni</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                  <Zap className="w-5 h-5 mx-auto mb-1 text-green-600" />
                  <span className="text-gray-700">Spedizione 48h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Benefits */}
      <section className="pt-8 pb-16 md:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Perché scegliere Instant Cut Pro
            </h2>
            <p className="text-xl text-slate-600 mb-8">
              Semplice: non hai bisogno di fare sforzi, potare il giardino diventa un piacere.
            </p>
            
            {/* Action Images */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12">
              <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 lg:p-3 rounded-2xl shadow-xl border border-slate-200">
                <img
                  src="images/cesoia/cesoia_gif_2.gif"
                  alt="Cesoia Elettrica in azione"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
                <div className="mt-4 lg:mt-3 text-center">
                  <p className="text-base lg:text-xs font-semibold text-slate-800 italic">
                    "Nel kit c'è tutto: 2 batterie, caricatore, valigia... Non devi comprare nient'altro"
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 lg:p-3 rounded-2xl shadow-xl border border-slate-200">
                <img
                  src="images/cesoia/cesoia_gif_3.gif"
                  alt="Cesoia Elettrica in azione"
                  className="w-full h-auto rounded-xl shadow-lg"
                />
                <div className="mt-4 lg:mt-3 text-center">
                  <p className="text-base lg:text-xs font-semibold text-slate-800 italic">
                    "Apri la valigia e sei già pronto. Zero montaggio, zero complicazioni"
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow overflow-hidden">
                <div className="flex flex-col md:flex-row md:h-full">
                  <div className="p-4 pb-0 md:p-4 md:pr-0 flex-shrink-0">
                    <div className="w-full md:w-32 aspect-square rounded-lg overflow-hidden">
                      <img
                        src={benefit.image}
                        alt={benefit.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 p-4 pt-3 md:p-5 flex flex-col justify-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-700 text-sm leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section - Compact */}
      <section className="py-8 bg-[#035aa6]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center text-white mb-6">
            <div>
              <Shield className="w-6 h-6 mx-auto mb-1" />
              <p className="text-sm font-semibold">Garanzia 3 Anni</p>
            </div>
            <div>
              <CheckCircle className="w-6 h-6 mx-auto mb-1" />
              <p className="text-sm font-semibold">Reso 30 Giorni</p>
            </div>
            <div>
              <Zap className="w-6 h-6 mx-auto mb-1" />
              <p className="text-sm font-semibold">Spedizione 48h</p>
            </div>
          </div>
          <div className="text-center">
            <button
              onClick={openOrderForm}
              className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-xl font-bold text-lg transition-all cursor-pointer"
            >
              Ordina Ora - Paghi alla Consegna
            </button>
          </div>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              FACILISSIMA DA USARE!<br />Bastano 3 secondi
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Foto */}
            <div className="order-1 lg:order-1">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="images/cesoia/carosello_3.jpg"
                  alt="Cesoia Elettrica"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Steps */}
            <div className="order-2 lg:order-2 space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-4xl font-bold text-[#035aa6]">1.</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Metti la batteria</h3>
                  <p className="text-slate-600">Un click e sei pronto. 2 batterie nel kit = 18 ore di lavoro.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-4xl font-bold text-[#035aa6]">2.</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Impugna e premi il pulsante</h3>
                  <p className="text-slate-600">Un click e il ramo viene via in un attimo, senza sforzi.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="text-4xl font-bold text-[#035aa6]">3.</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Ricarica le batterie</h3>
                  <p className="text-slate-600">Quando scariche, collega le batterie al caricatore: da 0 a 100% in 30 minuti.</p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={openOrderForm}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold transition-all cursor-pointer"
                >
                  <span className="text-xl">ORDINA ORA</span>
                  <br />
                  <span className="text-sm font-normal">Offerta a tempo limitato</span>
                </button>
                <p className="text-center text-red-600 text-sm mt-2 font-medium">Solo 8 pezzi rimasti, poi torna a prezzo pieno</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Confronta tu stesso
            </h2>
            <p className="text-xl text-slate-600">
              Instant Cut Pro vs altri brand sul mercato
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Caratteristiche</th>
                  <th className="px-6 py-4 text-center bg-teal-600">
                    <div>
                      <div className="font-bold">Instant Cut Pro</div>
                      <div className="text-xs text-teal-100 font-normal">Il nostro prodotto</div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center bg-gray-500">
                    <div>
                      <div className="font-bold">Altro Brand 1</div>
                      <div className="text-xs text-gray-200 font-normal">Il più venduto su Amazon</div>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center bg-gray-500">
                    <div>
                      <div className="font-bold">Altro Brand 2</div>
                      <div className="text-xs text-gray-200 font-normal">Il più venduto nei negozi</div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.feature}</td>
                    <td className={`px-6 py-4 text-center font-bold ${
                      row.feature === 'Prezzo' ? 'text-green-700 bg-green-50' : 'text-teal-700 bg-teal-50'
                    }`}>
                      {row.cesoia}
                    </td>
                    <td className="px-6 py-4 text-center text-gray-400">{row.competitor1}</td>
                    <td className="px-6 py-4 text-center text-gray-400">{row.competitor2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Urgency CTA Strip */}
      <section className="bg-gradient-to-r from-red-600 to-red-700 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white text-lg md:text-xl font-bold mb-3">
            Solo 8 pezzi rimasti a €66,99
          </p>
          <button
            onClick={openOrderForm}
            className="bg-white text-green-600 hover:bg-gray-100 py-3 px-8 rounded-xl font-bold text-lg transition-all cursor-pointer"
          >
            La voglio, ordina ora
          </button>
        </div>
      </section>

      {/* Testimonials */}
      <section id="recensioni" className="py-20 bg-[#035aa6] reviews-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Recensioni</h2>
            <p className="text-xl text-white font-bold">1.924 recensioni verificate</p>
            <p className="text-xl text-gray-300">Puoi vedere tutte le altre recensioni sul sito ufficiale</p>
          </div>
          <div className="relative">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-green-600 hover:bg-green-700 text-white rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-lg transition-all duration-300 text-xl md:text-2xl cursor-pointer"
              onClick={() => {
                setReviewsAutoScroll(false);
                const container = document.querySelector('.reviews-container');
                if (container) {
                  container.scrollBy({ left: -300, behavior: 'smooth' });
                }
              }}
            >
              ‹
            </button>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-green-600 hover:bg-green-700 text-white rounded-full w-10 h-10 md:w-14 md:h-14 flex items-center justify-center shadow-lg transition-all duration-300 text-xl md:text-2xl cursor-pointer"
              onClick={() => {
                setReviewsAutoScroll(false);
                const container = document.querySelector('.reviews-container') as HTMLElement;
                if (container) {
                  const maxScroll = container.scrollWidth - container.clientWidth;
                  if (container.scrollLeft >= maxScroll - 50) {
                    container.scrollTo({ left: 0, behavior: 'smooth' });
                  } else {
                    container.scrollBy({ left: 300, behavior: 'smooth' });
                  }
                }
              }}
            >
              ›
            </button>
            <div className="overflow-hidden">
              <div className="reviews-container flex gap-6 overflow-x-auto scrollbar-hide scroll-snap-x snap-x snap-mandatory px-10 md:px-16 py-4">
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">M</div>
                    <div>
                      <p className="font-bold text-gray-900">Marco P.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Pensavo avesse fatto almeno un po' di fatica e invece nulla, come stesse tagliando l'acqua. Le due batterie mi permettono di lavorare tutto il giorno.</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">L</div>
                    <div>
                      <p className="font-bold text-gray-900">Luca R.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Potare i rami è diventato un piacere, prima era uno stress. Leggerissima e potente, la uso ogni settimana.</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">G</div>
                    <div>
                      <p className="font-bold text-gray-900">Giuseppe T.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Ho fatto bene a fidarmi, si paga alla consegna e si può visionare il prodotto prima di pagare... 5 stelle meritate!</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">A</div>
                    <div>
                      <p className="font-bold text-gray-900">Alessandro F.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Le batterie durano davvero 18 ore come promesso. Ricarica velocissima in 55 minuti. Fantastica!</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">F</div>
                    <div>
                      <p className="font-bold text-gray-900">Francesco M.</p>
                      <div className="text-yellow-400 text-lg">★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Taglia rami anche di 8cm senza problemi. La potenza di 1.050W si sente tutta. Professionale!</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">S</div>
                    <div>
                      <p className="font-bold text-gray-900">Stefano L.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Leggerissima ma potentissima. Il kit completo è davvero completo, hanno pensato a tutto!</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">R</div>
                    <div>
                      <p className="font-bold text-gray-900">Roberto C.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">La fondina con cavo anticaduta è geniale. Sicurezza al primo posto, mi sento tranquillo usandola.</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">D</div>
                    <div>
                      <p className="font-bold text-gray-900">Daniela G.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Spedizione velocissima, imballaggio perfetto. Per questo prezzo è un affare incredibile!</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">C</div>
                    <div>
                      <p className="font-bold text-gray-900">Carlo B.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Mia moglie diceva che non serviva, adesso la usa lei più di me! Le batterie durano tantissimo.</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">V</div>
                    <div>
                      <p className="font-bold text-gray-900">Vincenzo N.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Prima impiegavo ore per potare tutto, adesso in mezz'ora ho finito. Le lame giapponesi tagliano che è una meraviglia.</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">P</div>
                    <div>
                      <p className="font-bold text-gray-900">Paolo D.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Ho 68 anni e non riuscivo più a potare come una volta. Con questa cesoia mi sento di nuovo un ragazzino!</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">E</div>
                    <div>
                      <p className="font-bold text-gray-900">Enrico S.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Il kit completo vale davvero la pena. Il powerbank è geniale, così non resto mai senza carica.</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">M</div>
                    <div>
                      <p className="font-bold text-gray-900">Matteo V.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Lavoro come giardiniere e questa è la migliore che abbia mai usato. Veloce, potente e sicura.</p>
                </div>
                <div className="flex-shrink-0 w-80 bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 snap-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#D93025] rounded-full flex items-center justify-center text-white font-bold">I</div>
                    <div>
                      <p className="font-bold text-gray-900">Isabella H.</p>
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                  </div>
                  <div className="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full mb-3">✔ Recensione verificata</div>
                  <p className="text-gray-700 leading-relaxed">Non credevo potesse tagliare rami così grossi! E il pagamento alla consegna mi ha convinta subito.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Order Section */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Come Ordinare
          </h2>
          <div className="flex flex-row items-start justify-center gap-2 md:gap-6">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#035aa6] text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">
                1
              </div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Compila il modulo per la spedizione: i dati saranno criptati</p>
            </div>

            <div className="text-slate-300 text-xl md:text-2xl mt-3">→</div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-[#035aa6] text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">
                2
              </div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Ti chiamiamo per confermare l'ordine e i dati di spedizione</p>
            </div>

            <div className="text-slate-300 text-xl md:text-2xl mt-3">→</div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-lg md:text-xl font-bold mb-2">
                3
              </div>
              <p className="text-slate-700 text-xs md:text-sm font-medium">Ricevi in 48h e paghi in contanti alla consegna</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Hai qualche dubbio? Ti rispondiamo subito!
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-600 transition-transform ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-slate-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#035aa6] py-16 pb-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left: Product Image */}
            <div className="order-1">
              <img
                src="images/cesoia/img_princ.png"
                alt="Instant Cut Pro"
                className="w-full h-auto rounded-lg shadow-md max-w-sm mx-auto lg:mx-0"
              />
            </div>

            {/* Right: Content */}
            <div className="order-2 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Instant Cut Pro
              </h2>

              <div className="text-left mb-6">
                <p className="text-lg text-white font-semibold mb-3">Include:</p>
                <ul className="text-slate-200 space-y-1">
                  <li>• 2 Batterie 40V 5.000mAh</li>
                  <li>• 2 Lame di ricambio</li>
                  <li>• Caricatore con ricarica rapida</li>
                  <li>• Valigia trasporto</li>
                  <li>• Chiavi inglesi</li>
                  <li>• Manuale di istruzioni</li>
                  <li>• Garanzia 3 Anni</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl inline-block mb-6">
                <div className="text-3xl font-bold text-teal-600 mb-2">€66,99</div>
                <div className="text-slate-500 line-through text-lg">€167,48</div>
                <div className="text-red-600 font-semibold mb-4">Sconto 60% - Offerta limitata</div>
                <button
                  onClick={openOrderForm}
                  className="bg-gradient-to-r from-teal-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-teal-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg w-full cursor-pointer"
                >
                  Sì, la voglio
                </button>
              </div>

              <div className="flex flex-col md:flex-row gap-2 text-slate-200 text-sm justify-center lg:justify-start">
                <span>✓ Spedizione rapida in 48h</span>
                <span>✓ Garanzia 3 anni completa</span>
                <span>✓ Reso gratuito entro 30 giorni</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
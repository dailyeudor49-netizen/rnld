'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, CheckCircle, Lock, Smartphone, Clock, Star, Zap, Award, Phone, Camera, Bell, Users, ArrowRight, ChevronDown, Download, Settings, Radar, Battery, Circle, Wifi, ChevronLeft, ChevronRight, Quote, Plus } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Marco R.',
    source: 'Trustpilot',
    rating: 5,
    text: 'Installato in 10 minuti, funziona da dio. L\'app è semplicissima e le notifiche arrivano subito. Consigliatissimo!',
    gender: 'M'
  },
  {
    name: 'Giulia T.',
    source: 'Facebook',
    rating: 5,
    text: 'Finalmente dormo tranquilla! Abito da sola e avevo sempre paura. Ora se qualcuno si avvicina alla porta mi arriva subito la notifica con la foto. Top!',
    gender: 'F'
  },
  {
    name: 'Alessandro P.',
    source: 'Google',
    rating: 5,
    text: 'Rapporto qualità prezzo incredibile. Ho confrontato con altri sistemi da 500€+ e questo fa le stesse cose. Niente abbonamenti poi è un plus enorme.',
    gender: 'M'
  },
  {
    name: 'Francesca M.',
    source: 'Trustpilot',
    rating: 4,
    text: 'Bello e facile da usare. Unica cosa, avrei voluto più sensori nella confezione, ma tanto si possono comprare a parte e costano pochissimo. Per il prezzo va benissimo!',
    gender: 'F'
  },
  {
    name: 'Roberto C.',
    source: 'Feedaty',
    rating: 5,
    text: 'Mi hanno provato a entrare in casa 2 anni fa. Mai più senza allarme. Questo sistema è perfetto, la sirena è fortissima e l\'app funziona benissimo anche da lontano.',
    gender: 'M'
  },
  {
    name: 'Sara L.',
    source: 'Google',
    rating: 5,
    text: 'Lo uso da 3 mesi, zero problemi. Le telecamere sono piccole ma la qualità video è ottima, anche di notte!',
    gender: 'F'
  },
  {
    name: 'Davide B.',
    source: 'Facebook',
    rating: 5,
    text: 'Scettico all\'inizio, ora non posso farne a meno. La cosa che mi piace di più è che si disattiva automaticamente quando arrivo a casa.',
    gender: 'M'
  },
  {
    name: 'Valentina G.',
    source: 'Feedaty',
    rating: 5,
    text: 'Ho preso questo per la casa al mare. Installazione facilissima, lo controllo tutto dall\'app quando sono a casa in città. Ottimo acquisto!',
    gender: 'F'
  },
  {
    name: 'Luca F.',
    source: 'Google',
    rating: 5,
    text: 'Ottimo prodotto, fa quello che deve fare. L\'assistenza mi ha risposto subito quando avevo un dubbio sulla configurazione.',
    gender: 'M'
  },
  {
    name: 'Chiara D.',
    source: 'Trustpilot',
    rating: 5,
    text: 'I miei genitori anziani vivono soli e volevo stare tranquilla. Ora posso vedere cosa succede in casa loro in qualsiasi momento. Li ho convinti a prenderlo ed è stata la decisione migliore!',
    gender: 'F'
  }
];

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleManualNav = (callback: () => void) => {
    setAutoPlay(false);
    callback();
  };

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      nextTestimonial();
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <section id="testimonianze" className="py-10 md:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-8 md:px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">
            Cosa Dicono i Nostri Clienti
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 md:w-6 md:h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-base md:text-lg font-bold text-[#1a2744]">4.9</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span className="text-base md:text-lg text-gray-600">8.254 recensioni</span>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl p-6 md:p-10 min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center text-center will-change-transform"
              >
                <Quote className="w-10 h-10 text-blue-600 mb-4 opacity-50" />
                <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < testimonials[currentIndex].rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="font-bold text-[#1a2744]">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-gray-500 mt-1 italic">Tramite <span className="font-bold">{testimonials[currentIndex].source}</span></p>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => handleManualNav(prevTestimonial)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => handleManualNav(nextTestimonial)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAutoPlay(false);
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const InstallationGuide = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      step: 1,
      title: 'Installa telecamere e sensori',
      desc: 'Le telecamere e i sensori possono essere installati in diversi modi: con ventose, colla adesiva, viti oppure semplicemente appoggiati su una superficie. Scegli il metodo più adatto alla tua casa e posizionali nei punti strategici.',
      image: '/images/secure/conf1.jpg',
      imageAlt: 'Installazione telecamere e sensori'
    },
    {
      step: 2,
      title: 'Scarica l\'app e inserisci il codice',
      desc: 'Scarica l\'app gratuita dal tuo store (App Store o Google Play) e inserisci il codice univoco fornito insieme al prodotto. Lo trovi stampato sulla scatola e sul libretto di istruzioni incluso nella confezione.',
      image: '/images/secure/conf2.jpg',
      imageAlt: 'Download app e inserimento codice'
    },
    {
      step: 3,
      title: 'Configura emergenze e disattivazione',
      desc: 'Imposta i numeri di emergenza da chiamare in caso di allarme e scegli come disattivare il sistema: automaticamente quando il tuo telefono viene rilevato nelle vicinanze, oppure inserendo un codice sulla centralina all\'ingresso di casa.',
      image: '/images/secure/conf3.jpg',
      imageAlt: 'Configurazione sistema di sicurezza'
    }
  ];

  const toggleStep = (stepIndex: number) => {
    setActiveStep(activeStep === stepIndex ? null : stepIndex);
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">
            Guida all'Installazione
          </h2>
          <p className="text-xl text-gray-600">3 semplici passaggi per proteggere la tua casa in 5 minuti</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Steps accordion */}
          <div className="space-y-4">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="will-change-transform"
              >
                <button
                  onClick={() => toggleStep(index)}
                  className={`w-full text-left rounded-xl p-6 transition-all cursor-pointer ${
                    activeStep === index
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-50 hover:bg-gray-100 text-[#1a2744]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 min-w-12 min-h-12 rounded-full flex items-center justify-center text-xl font-bold flex-shrink-0 ${
                        activeStep === index ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
                      }`}>
                        {item.step}
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <ChevronDown
                      className={`transition-transform ${activeStep === index ? 'rotate-180' : ''}`}
                      size={24}
                    />
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: activeStep === index ? 'auto' : 0,
                      opacity: activeStep === index ? 1 : 0,
                      marginTop: activeStep === index ? 16 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className={`text-base leading-relaxed ${
                      activeStep === index ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      {item.desc}
                    </p>
                    {/* Immagine dentro il box su mobile */}
                    <div className="md:hidden mt-4 relative aspect-square rounded-xl overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Image section - su mobile mostra sempre conf0, su desktop cambia */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:sticky md:top-8 will-change-transform"
          >
            {/* Mobile: sempre conf0 */}
            <div className="md:hidden relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/secure/conf0.png"
                alt="Guida installazione sistema di sicurezza"
                fill
                className="object-cover"
              />
            </div>
            {/* Desktop: cambia in base allo step */}
            <div className="hidden md:block relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={activeStep !== null ? steps[activeStep].image : '/images/secure/conf0.png'}
                alt={activeStep !== null ? steps[activeStep].imageAlt : 'Guida installazione sistema di sicurezza'}
                fill
                className="object-cover transition-all duration-500"
              />
              {activeStep !== null && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              )}
              {activeStep !== null && (
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <p className="font-bold text-[#1a2744]">Step {steps[activeStep].step}</p>
                    <p className="text-sm text-gray-600">{steps[activeStep].title}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={scrollToOrderForm}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all uppercase shadow-lg cursor-pointer"
          >
            Inizia Subito
          </button>
        </div>
      </div>
    </section>
  );
};

const LeadForm = ({ variant = 'hero' }: { variant?: 'hero' | 'inline' }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [showAppMenu, setShowAppMenu] = useState(false);
  const [showTelecamere, setShowTelecamere] = useState(false);
  const [showSmartlock, setShowSmartlock] = useState(false);
  const [smartlockOpen, setSmartlockOpen] = useState(false);
  const [showVideoRegistrati, setShowVideoRegistrati] = useState(false);
  const [showImpostazioni, setShowImpostazioni] = useState(false);
  const [settingsToggles, setSettingsToggles] = useState({
    notifiche: true,
    programmazione: true,
    vacanza: false,
  });
  const [showIntervieni, setShowIntervieni] = useState(false);
  const [showCalling, setShowCalling] = useState(false);
  const [showAlarmNotification, setShowAlarmNotification] = useState(false);
  const [alarmActive, setAlarmActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('lead_submitted')) {
      setIsSubmitted(true);
    }
  }, []);

  useEffect(() => {
    const handleOpenForm = () => {
      setShowForm(true);
    };
    window.addEventListener('openOrderForm', handleOpenForm);
    return () => window.removeEventListener('openOrderForm', handleOpenForm);
  }, []);

  useEffect(() => {
    if (showDemo || showIntervieni || showAppMenu || showTelecamere) {
      const timer = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showDemo, showIntervieni, showAppMenu, showTelecamere]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const cameras = [
    { id: 1, name: 'CAM 01 - Giardino', status: 'secure', image: 'https://media-cdn.tripadvisor.com/media/photo-s/08/b8/33/89/la-casa-del-borgo.jpg' },
    { id: 2, name: 'CAM 02 - Sala', status: 'alert', image: 'https://www.sectoralarm.it/hs-fs/hubfs/SectorAlarm_December2024/Images/intelligence-and-protection-in-one-glance.webp?width=1157&height=1019&name=intelligence-and-protection-in-one-glance.webp' },
    { id: 3, name: 'CAM 03 - Garage', status: 'secure', image: 'https://preview.redd.it/what-camera-to-install-in-garage-v0-qm5b9z7mkehe1.png?format=png&auto=webp&s=82ba2f9a2fa8635254c09a2338a134b37fc3098e' },
    { id: 4, name: 'CAM 04 - Camera da Letto', status: 'secure', image: 'https://magazine.bimbostore.com/app/uploads/2023/03/Temperatura-della-camera-del-neonato.jpg' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('lead_submitted', 'true');
      }
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-2xl shadow-lg text-center border-2 border-blue-500"
      >
        <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} />
        </div>
        <h3 className="text-2xl font-bold text-[#1a2744] mb-2">Preventivo Richiesto!</h3>
        <p className="text-gray-600">Ti ricontatteremo entro 60 secondi per il tuo preventivo personalizzato gratuito.</p>
      </motion.div>
    );
  }

  const isHero = variant === 'hero';

  return (
    <motion.div
      id="order-form"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
    >
      {/* Immagine sempre in alto */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {showAppMenu ? (
            <motion.div
              key="appmenu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gradient-to-b from-blue-600 to-blue-700 rounded-t-2xl overflow-hidden border-4 border-yellow-400"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 text-[#1a2744] font-bold text-xs px-4 py-1 rounded-b-lg z-10">DEMO</div>
              {/* Header app */}
              <div className="p-4 border-b border-blue-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-white" />
                    <span className="text-white font-bold text-lg">BeSecure Pro</span>
                  </div>
                  <div className="text-right text-xs text-blue-100">
                    <div>{formatDate(currentTime)}</div>
                    <div>{formatTime(currentTime)}</div>
                  </div>
                </div>
              </div>

              {/* Status sistema */}
              <div className="p-4">
                <div className="bg-white/20 border border-white/30 rounded-xl p-3 flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">Sistema Attivo - Casa Protetta</span>
                </div>

                {/* Menu opzioni */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setShowAppMenu(false);
                      setShowTelecamere(true);
                    }}
                    className="bg-white hover:bg-blue-50 rounded-xl p-4 flex flex-col items-center gap-2 transition-all cursor-pointer relative shadow-lg"
                  >
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-blue-900 font-semibold text-sm">Telecamere</span>
                    <span className="text-blue-600 text-xs">4 attive</span>
                    <span className="text-red-500 text-[10px] font-semibold bg-red-50 border border-red-200 px-2 py-0.5 rounded-full animate-pulse">Movimento rilevato</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowAppMenu(false);
                      setShowSmartlock(true);
                    }}
                    className="bg-white hover:bg-blue-50 rounded-xl p-4 flex flex-col items-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-blue-900 font-semibold text-sm">Smartlock</span>
                    <span className={`text-xs ${smartlockOpen ? 'text-red-500' : 'text-emerald-500'}`}>{smartlockOpen ? 'Aperto' : 'Chiuso'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowAppMenu(false);
                      setShowVideoRegistrati(true);
                    }}
                    className="bg-white hover:bg-blue-50 rounded-xl p-4 flex flex-col items-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-blue-900 font-semibold text-sm">Video Registrati</span>
                    <span className="text-blue-600 text-xs">4 video</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowAppMenu(false);
                      setShowImpostazioni(true);
                    }}
                    className="bg-white hover:bg-blue-50 rounded-xl p-4 flex flex-col items-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Settings className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-blue-900 font-semibold text-sm">Impostazioni</span>
                    <span className="text-blue-600 text-xs">Configura</span>
                  </button>
                </div>
              </div>

              {/* Pulsante chiudi */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => setShowAppMenu(false)}
                  className="w-full px-4 py-2 bg-white/20 text-white font-semibold rounded-xl hover:bg-white/30 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Chiudi App
                </button>
              </div>
            </motion.div>
          ) : showSmartlock ? (
            <motion.div
              key="smartlock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gradient-to-b from-blue-900 to-blue-950 rounded-t-2xl overflow-hidden border-4 border-yellow-400"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 text-[#1a2744] font-bold text-xs px-4 py-1 rounded-b-lg z-10">DEMO</div>
              {/* Header */}
              <div className="p-4 border-b border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Lock className="w-6 h-6 text-blue-400" />
                    <span className="text-white font-bold text-lg">Smartlock</span>
                  </div>
                  <div className="text-right text-xs text-blue-300">
                    <div>{formatDate(currentTime)}</div>
                    <div>{formatTime(currentTime)}</div>
                  </div>
                </div>
              </div>

              {/* Contenuto */}
              <div className="p-6 flex flex-col items-center">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${smartlockOpen ? 'bg-red-500/20 border-2 border-red-500' : 'bg-emerald-500/20 border-2 border-emerald-500'}`}>
                  <Lock className={`w-12 h-12 ${smartlockOpen ? 'text-red-400' : 'text-emerald-400'}`} />
                </div>

                <h3 className="text-white text-xl font-bold mb-2">Porta di Casa</h3>
                <p className={`text-lg font-semibold mb-6 ${smartlockOpen ? 'text-red-400' : 'text-emerald-400'}`}>
                  {smartlockOpen ? 'Aperta' : 'Chiusa'}
                </p>

                <button
                  onClick={() => setSmartlockOpen(!smartlockOpen)}
                  className={`px-8 py-3 rounded-xl font-bold text-white transition-all cursor-pointer ${smartlockOpen ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  {smartlockOpen ? 'Chiudi Porta' : 'Apri Porta'}
                </button>
              </div>

              {/* Pulsante torna */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => {
                    setShowSmartlock(false);
                    setShowAppMenu(true);
                  }}
                  className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Torna al Menu
                </button>
              </div>
            </motion.div>
          ) : showVideoRegistrati ? (
            <motion.div
              key="videoregistrati"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gradient-to-b from-blue-900 to-blue-950 rounded-t-2xl overflow-hidden border-4 border-yellow-400"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 text-[#1a2744] font-bold text-xs px-4 py-1 rounded-b-lg z-10">DEMO</div>
              {/* Header */}
              <div className="p-4 border-b border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span className="text-white font-bold text-lg">Video Registrati</span>
                  </div>
                  <div className="text-right text-xs text-blue-300">
                    <div>{formatDate(currentTime)}</div>
                    <div>{formatTime(currentTime)}</div>
                  </div>
                </div>
              </div>

              {/* Grid video */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { cam: 'CAM 01', time: '14:32', image: cameras[0].image },
                    { cam: 'CAM 02', time: '12:15', image: cameras[1].image },
                    { cam: 'CAM 03', time: '09:45', image: cameras[2].image },
                    { cam: 'CAM 04', time: '08:20', image: cameras[3].image },
                  ].map((video, i) => (
                    <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-gray-800 cursor-pointer group">
                      <Image
                        src={video.image}
                        alt={video.cam}
                        fill
                        className="object-cover brightness-75 group-hover:brightness-100 transition-all"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/80 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
                        <span className="text-white text-xs font-semibold bg-black/50 px-2 py-0.5 rounded">{video.cam}</span>
                        <span className="text-white text-xs bg-black/50 px-2 py-0.5 rounded">{video.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pulsante torna */}
              <div className="p-4 pt-0">
                <button
                  onClick={() => {
                    setShowVideoRegistrati(false);
                    setShowAppMenu(true);
                  }}
                  className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Torna al Menu
                </button>
              </div>
            </motion.div>
          ) : showImpostazioni ? (
            <motion.div
              key="impostazioni"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gradient-to-b from-blue-900 to-blue-950 rounded-t-2xl overflow-hidden border-4 border-yellow-400"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 text-[#1a2744] font-bold text-xs px-4 py-1 rounded-b-lg z-10">DEMO</div>
              {/* Header */}
              <div className="p-4 border-b border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-6 h-6 text-blue-400" />
                    <span className="text-white font-bold text-lg">Impostazioni</span>
                  </div>
                </div>
              </div>

              {/* Opzioni */}
              <div className="p-4 space-y-3 max-h-[300px] overflow-y-auto">
                {[
                  { icon: <Bell className="w-5 h-5" />, title: 'Notifiche', desc: 'Gestisci avvisi e suoni', toggle: true, toggleKey: 'notifiche' as const },
                  { icon: <Camera className="w-5 h-5" />, title: 'Qualità Video', desc: 'HD 1080p', toggle: false },
                  { icon: <Wifi className="w-5 h-5" />, title: 'Connessione', desc: 'WiFi: Casa_5G', toggle: false },
                  { icon: <Phone className="w-5 h-5" />, title: 'Numeri Emergenza', desc: '112, +39 333...', toggle: false },
                  { icon: <Users className="w-5 h-5" />, title: 'Utenti Autorizzati', desc: '3 membri famiglia', toggle: false },
                  { icon: <Clock className="w-5 h-5" />, title: 'Programmazione', desc: 'Attivo 22:00 - 07:00', toggle: true, toggleKey: 'programmazione' as const },
                  { icon: <Shield className="w-5 h-5" />, title: 'Modalità Vacanza', desc: 'Protezione extra', toggle: true, toggleKey: 'vacanza' as const },
                  { icon: <Radar className="w-5 h-5" />, title: 'Sensibilità Sensori', desc: 'Media', toggle: false },
                  { icon: <Plus className="w-5 h-5" />, title: 'Nuovo Dispositivo', desc: 'Configura sensore/telecamera', toggle: false },
                  { icon: <Settings className="w-5 h-5" />, title: 'Impostazioni Avanzate', desc: 'Configurazione sistema', toggle: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between bg-blue-800/30 rounded-xl p-3 border border-blue-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-600/50 rounded-lg flex items-center justify-center text-blue-300">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{item.title}</p>
                        <p className="text-blue-300 text-xs">{item.desc}</p>
                      </div>
                    </div>
                    {item.toggle && item.toggleKey ? (
                      <div
                        onClick={() => setSettingsToggles(prev => ({ ...prev, [item.toggleKey!]: !prev[item.toggleKey!] }))}
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${settingsToggles[item.toggleKey] ? 'bg-emerald-500' : 'bg-gray-600'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${settingsToggles[item.toggleKey] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    ) : !item.toggle ? (
                      <ChevronRight className="w-5 h-5 text-blue-400" />
                    ) : null}
                  </div>
                ))}
              </div>

              {/* Pulsante torna */}
              <div className="p-4">
                <button
                  onClick={() => {
                    setShowImpostazioni(false);
                    setShowAppMenu(true);
                  }}
                  className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Torna al Menu
                </button>
              </div>
            </motion.div>
          ) : showTelecamere ? (
            <motion.div
              key="telecamere"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-900 rounded-t-2xl overflow-hidden border-4 border-yellow-400"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 text-[#1a2744] font-bold text-xs px-4 py-1 rounded-b-lg z-10">DEMO</div>
              <div className="aspect-[4/3] grid grid-cols-2 grid-rows-2 gap-0.5 p-0.5 bg-gray-800">
                {cameras.map((camera) => (
                  <div key={camera.id} className="relative overflow-hidden">
                    <Image
                      src={camera.image}
                      alt={camera.name}
                      fill
                      className={`object-cover ${camera.status === 'alert' ? 'brightness-110' : 'brightness-90'}`}
                    />
                    {/* Overlay scuro per effetto telecamera */}
                    <div className="absolute inset-0 bg-black/30"></div>

                    {/* Scanline effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]"></div>

                    {/* Header con data/ora e nome camera */}
                    <div className="absolute top-0 left-0 right-0 p-1.5 md:p-2 bg-gradient-to-b from-black/70 to-transparent">
                      <div className="flex justify-between items-start text-white text-[10px] md:text-xs font-mono">
                        <div className="bg-black/50 px-1.5 py-0.5 rounded">
                          <div className="text-[8px] md:text-xs">{camera.name}</div>
                          <div className="flex items-center gap-1 text-red-500 text-[8px] md:text-xs mt-0.5">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse"></span>
                            REC
                          </div>
                        </div>
                        <div className="text-right bg-black/50 px-1.5 py-0.5 rounded">
                          <div className="text-[8px] md:text-xs">{formatDate(currentTime)}</div>
                          <div className="text-emerald-400 text-[8px] md:text-xs">{formatTime(currentTime)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Status badge */}
                    <div className="absolute bottom-1.5 md:bottom-2 left-1.5 md:left-2 right-1.5 md:right-2">
                      {camera.status === 'secure' ? (
                        <div className="flex items-center gap-1.5 bg-emerald-500/90 text-white px-2 py-1 rounded-lg text-[10px] md:text-sm font-semibold">
                          <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-pulse"></span>
                          SICURO
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 bg-red-500/90 text-white px-2 py-1 rounded-lg text-[10px] md:text-sm font-semibold animate-pulse">
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full"></span>
                            ALLERTA MOVIMENTO
                          </div>
                          <button
                            onClick={() => {
                              setShowTelecamere(false);
                              setShowIntervieni(true);
                            }}
                            className="bg-white text-red-600 px-2 py-1 rounded-lg text-[10px] md:text-sm font-bold hover:bg-red-100 transition-colors cursor-pointer shadow-lg"
                          >
                            INTERVIENI
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pulsante per tornare indietro */}
              <div className="bg-gray-900 p-3 flex justify-center">
                <button
                  onClick={() => {
                    setShowTelecamere(false);
                    setShowAppMenu(true);
                  }}
                  className="px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 font-semibold rounded-xl hover:bg-white transition-all shadow-lg flex items-center gap-2 text-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Torna al Menu
                </button>
              </div>
            </motion.div>
          ) : showIntervieni ? (
            <motion.div
              key="intervieni"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-900 rounded-t-2xl overflow-hidden border-4 border-yellow-400"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 text-[#1a2744] font-bold text-xs px-4 py-1 rounded-b-lg z-10">DEMO</div>
              {/* Immagine singola della camera con allerta */}
              <div className="relative aspect-[4/3]">
                <Image
                  src={cameras.find(c => c.status === 'alert')?.image || ''}
                  alt="Camera con allerta"
                  fill
                  className="object-cover brightness-110"
                />
                {/* Overlay scuro per effetto telecamera */}
                <div className="absolute inset-0 bg-black/30"></div>

                {/* Scanline effect */}
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.3)_2px,rgba(0,0,0,0.3)_4px)]"></div>

                {/* Bordo rosso lampeggiante */}
                <div className="absolute inset-0 border-4 border-red-500 animate-pulse"></div>

                {/* Header con data/ora e nome camera */}
                <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/70 to-transparent">
                  <div className="flex justify-between items-start text-white font-mono">
                    <div className="bg-black/50 px-2 py-1 rounded">
                      <div className="text-sm md:text-base">{cameras.find(c => c.status === 'alert')?.name}</div>
                      <div className="flex items-center gap-1 text-red-500 text-xs md:text-sm mt-0.5">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        REC
                      </div>
                    </div>
                    <div className="text-right bg-black/50 px-2 py-1 rounded">
                      <div className="text-sm md:text-base">{formatDate(currentTime)}</div>
                      <div className="text-emerald-400 text-sm md:text-base">{formatTime(currentTime)}</div>
                    </div>
                  </div>
                </div>

                {/* Status badge allerta */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="flex items-center gap-2 bg-red-500/90 text-white px-3 py-2 rounded-lg text-sm md:text-base font-semibold animate-pulse">
                    <span className="w-2 h-2 bg-white rounded-full"></span>
                    ALLERTA MOVIMENTO RILEVATO
                  </div>
                </div>
              </div>

              {/* Notifica allarme sonoro */}
              <AnimatePresence>
                {showAlarmNotification && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 ${alarmActive ? 'bg-red-600' : 'bg-emerald-600'} text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3`}
                  >
                    <Bell className={`w-8 h-8 ${alarmActive ? 'animate-bounce' : ''}`} />
                    <span className="text-lg font-bold">{alarmActive ? 'Allarme sonoro attivato!' : 'Allarme sonoro disattivato!'}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Schermata chiamata */}
              <AnimatePresence>
                {showCalling && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-30 bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 border-4 border-yellow-400"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-yellow-400 text-[#1a2744] font-bold text-xs px-4 py-1 rounded-b-lg z-10">DEMO</div>
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-2">Chiamata in corso...</p>
                      <h2 className="text-white text-4xl md:text-5xl font-bold mb-2">112</h2>
                      <p className="text-gray-400 text-lg mb-8">Polizia</p>

                      {/* Animazione onde */}
                      <div className="relative w-20 h-20 mx-auto mb-8">
                        <div className="absolute inset-0 border-2 border-gray-500 rounded-full animate-ping opacity-30"></div>
                        <div className="absolute inset-2 border-2 border-gray-400 rounded-full animate-ping opacity-20" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute inset-4 border-2 border-gray-300 rounded-full animate-ping opacity-10" style={{ animationDelay: '1s' }}></div>
                      </div>

                      <p className="text-gray-400 text-sm mb-8 animate-pulse">Connessione in corso...</p>

                      {/* Pulsante termina */}
                      <button
                        onClick={() => setShowCalling(false)}
                        className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center mx-auto transition-all shadow-lg cursor-pointer"
                      >
                        <Phone className="w-8 h-8 text-white rotate-[135deg]" />
                      </button>
                      <p className="text-gray-400 text-sm mt-3">Termina</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pulsanti azione */}
              <div className="bg-gray-900 p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setShowCalling(true)}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg cursor-pointer text-sm md:text-base"
                  >
                    <Phone className="w-5 h-5" />
                    Chiama Polizia
                  </button>
                  <button
                    onClick={() => {
                      setAlarmActive(!alarmActive);
                      setShowAlarmNotification(true);
                      setTimeout(() => {
                        setShowAlarmNotification(false);
                      }, 4000);
                    }}
                    className={`flex items-center justify-center gap-2 ${alarmActive ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-red-600 hover:bg-red-700'} text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg cursor-pointer text-sm md:text-base`}
                  >
                    <Bell className="w-5 h-5" />
                    {alarmActive ? 'Disattiva Allarme' : 'Attiva Allarme'}
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowIntervieni(false);
                    setShowTelecamere(true);
                  }}
                  className="w-full px-4 py-2 bg-white/90 backdrop-blur-sm text-gray-800 font-semibold rounded-xl hover:bg-white transition-all shadow-lg flex items-center justify-center gap-2 text-sm cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Torna alle Telecamere
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <Image
                src="/images/secure/princ.png"
                alt="Sistema di sicurezza"
                width={800}
                height={450}
                quality={100}
                priority
                className="w-full h-auto object-contain"
              />

              {isHero && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Offerta fino al 23/12/2025
                </div>
              )}

              {/* Pulsante Demo */}
              <button
                onClick={() => setShowAppMenu(true)}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-[#1a2744] font-bold rounded-lg transition-all shadow-lg shadow-yellow-400/40 hover:shadow-xl hover:shadow-yellow-400/50 hover:scale-110 flex items-center justify-center gap-2 text-sm cursor-pointer whitespace-nowrap animate-bounce"
              >
                <Camera className="w-4 h-4 flex-shrink-0" />
                <span>Visualizza DEMO App</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <span className="inline-block bg-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-2">
          Black Friday
        </span>
        <h3 className="text-2xl font-bold text-white mb-2">
          Proteggi la tua Casa
        </h3>
        <div className="flex items-center gap-3 mb-2">
          <p className="text-3xl font-extrabold text-white">69,90€</p>
          <p className="text-lg text-blue-200 line-through">233,00€</p>
          <span className="bg-white text-red-600 border-2 border-red-600 text-xs font-bold px-2 py-1 rounded">-70%</span>
        </div>
        <div className="space-y-1 mb-4">
          <p className="text-blue-100 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" /> Pagamento in Contanti alla Consegna
          </p>
          <p className="text-blue-100 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" /> Spedizione Rapida Gratuita
          </p>
          <p className="text-blue-100 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" /> 30 Giorni di Reso
          </p>
          <p className="text-blue-100 text-sm flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" /> 2 Anni di Garanzia
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full bg-white hover:bg-gray-100 text-blue-600 font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
        >
          {showForm ? 'CHIUDI' : 'ORDINA ORA - PAGHI ALLA CONSEGNA'}
        </button>
      </div>

      {/* Form che si espande sotto */}
      <motion.div
        initial={false}
        animate={{
          height: showForm ? 'auto' : 0,
          opacity: showForm ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className={`${isHero ? 'p-8' : 'p-6'} bg-white`}>
          <div className="mb-6 text-center">
            <h3 className={`${isHero ? 'text-2xl' : 'text-xl'} font-bold text-[#1a2744] mb-1`}>
              Ordina Ora
            </h3>
            <p className="text-gray-600">Paghi in Contanti alla Consegna</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-[#1a2744] placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                placeholder="Nome e Cognome"
              />
            </div>
            <div>
              <input
                required
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-[#1a2744] placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                placeholder="Indirizzo per la spedizione"
              />
            </div>
            <div>
              <input
                required
                type="tel"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-[#1a2744] placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                placeholder="Numero di Telefono"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-base shadow-xl cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Invio...
                </>
              ) : (
                <>
                  PROCEDI CON L'ORDINE
                </>
              )}
            </button>
          </form>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
            <Lock size={10} />
            <span>Dati protetti SSL</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const scrollToOrderForm = () => {
  window.dispatchEvent(new Event('openOrderForm'));
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 100);
};

export default function SecurityLandingPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="min-h-screen bg-white font-inter text-[#1a2744] overflow-x-hidden">

      {/* Sticky Order Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600 to-green-700 shadow-2xl rounded-t-2xl">
        <div className="max-w-7xl mx-auto w-full px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <p className="text-white font-bold text-xl md:text-2xl">69,90€</p>
            <p className="text-green-200 text-sm md:text-sm line-through">233,00€</p>
            <span className="bg-yellow-400 text-[#1a2744] text-xs font-bold px-2 md:px-2 py-0.5 rounded">-70%</span>
          </div>
          <button
            onClick={scrollToOrderForm}
            className="bg-white hover:bg-gray-100 text-green-700 font-bold py-3 px-5 md:px-6 rounded-full text-sm md:text-base shadow-lg transition-all cursor-pointer whitespace-nowrap"
          >
            Ordina Ora
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-20">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Form Hero - prima su mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-first lg:order-last will-change-transform"
            >
              <LeadForm variant="hero" />
            </motion.div>

            <div className="order-last lg:order-first">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="will-change-transform"
              >
                <div className="inline-flex items-center gap-2 bg-yellow-400 text-[#1a2744] px-3 py-1.5 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6">
                  <Zap className="fill-current" size={14} />
                  BeSecure Pro
                </div>

                <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold mb-3 md:mb-4 leading-tight text-[#1a2744]">
                  Non aspettare che sia <span className="text-blue-600">troppo tardi</span>: Proteggi chi ami oggi stesso
                </h1>

                <a
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('testimonianze')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 mb-4 md:mb-6 hover:opacity-80 transition-opacity cursor-pointer">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm md:text-base font-bold text-[#1a2744]">4.9</span>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span className="text-sm md:text-base text-gray-600">8.254 recensioni</span>
                </a>

                <p className="text-base md:text-lg lg:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
                  5 microtelecamere HD, sensori, rilevatori di fumo, chiamata automatica alle forze dell'ordine, allarme assordante e notifiche istantanee sul tuo cellulare. Tutto senza abbonamenti mensili.
                </p>

                <div className="space-y-2 mb-4 md:mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={18} />
                    <span className="text-sm md:text-base text-gray-700">Allarme sonoro assordante + notifica</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={18} />
                    <span className="text-sm md:text-base text-gray-700">Non si attiva con animali domestici</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={18} />
                    <span className="text-sm md:text-base text-gray-700">Videocamere in tempo reale con audio</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="text-green-500" size={18} />
                    <span className="text-sm md:text-base text-gray-700">Rilevatore di fumo per incendi</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                    <CheckCircle className="text-blue-600" size={18} />
                    <span className="text-xs md:text-sm font-medium text-[#1a2744]">Zero abbonamenti mensili</span>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                    <CheckCircle className="text-blue-600" size={18} />
                    <span className="text-xs md:text-sm font-medium text-[#1a2744]">Installazione in 5 minuti</span>
                  </div>
                </div>

                </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1a2744] mb-3 md:mb-4">
              Cosa succede quando un estraneo entra in casa tua?
            </h2>
            <p className="text-base md:text-xl text-gray-600">3 livelli di protezione automatica che si attivano istantaneamente</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                step: '1',
                title: 'Allarme Assordante + Luci',
                desc: 'La <strong>sirena da 110dB</strong> si attiva insieme a luci stroboscopiche visibili da centinaia di metri. I ladri scappano immediatamente perché sanno di essere stati scoperti. La maggior parte abbandona il tentativo entro <strong>7 secondi</strong>.',
                image: '/images/secure/cosa_succede1.jpg',
                imageAlt: 'Allarme sonoro e visivo'
              },
              {
                step: '2',
                title: 'Notifica Istantanea',
                desc: 'Ricevi una <strong>chiamata automatica sul cellulare</strong> con le immagini live dalle 5 microcamere. Puoi vedere esattamente cosa sta succedendo in casa tua, ovunque tu sia. Nessun ritardo, nessuna attesa.',
                image: '/images/secure/cosa_succede2.jpg',
                imageAlt: 'Notifica sul cellulare'
              },
              {
                step: '3',
                title: 'Chiamata alle Autorità',
                desc: 'Il sistema <strong>chiama automaticamente le forze dell\'ordine</strong> e invia loro le registrazioni video. Non devi fare nulla. Mentre tu sei al sicuro, l\'aiuto è già in arrivo per proteggere la tua casa e i tuoi cari.',
                image: '/images/secure/cosa_succede3.jpg',
                imageAlt: 'Intervento forze dell\'ordine'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: isMobile ? 0.15 : 0.6 }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.4, ease: "easeOut" }}
                className="flex flex-col bg-white rounded-xl shadow-lg overflow-hidden will-change-transform"
              >
                <div className="relative w-full">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                  <div className="absolute top-4 left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                    {item.step}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl md:text-2xl font-bold text-[#1a2744] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-16">
            <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg md:rounded-xl px-4 py-3 md:px-6 md:py-4 shadow-lg">
              <p className="font-bold text-xs md:text-sm mb-1">⚠️ I ladri abbandonano il tentativo in media dopo</p>
              <p className="text-2xl md:text-3xl lg:text-4xl font-extrabold">7 secondi</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-4">
              Il Sistema Completo
            </h2>
            <p className="text-lg md:text-xl text-gray-600">Telecamere, sensori di movimento, rilevatori di fumo, allarmi e chiamate automatiche.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                icon: <Lock />,
                title: 'Smartlock',
                desc: 'Serratura intelligente con controllo remoto. Apri e chiudi la porta dal tuo smartphone ovunque tu sia.',
                image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80'
              },
              {
                icon: <Camera />,
                title: 'Telecamere HD',
                desc: 'Videosorveglianza ad alta risoluzione con visione notturna. Guarda cosa succede in tempo reale.',
                image: 'https://img.joomcdn.net/811f1d4330e279c0ae4aae1b93aed28278c714cf_original.jpeg'
              },
              {
                icon: <Radar />,
                title: 'Sensori di Movimento',
                desc: 'Rilevamento intelligente con fotocamera integrata. Distingue persone da animali domestici.',
                image: 'https://www.sevenitalia.it/data_files/product/PG8934.jpg'
              },
              {
                icon: <Phone />,
                title: 'Chiamata Automatica',
                desc: 'In caso di intrusione, il sistema chiama automaticamente le forze dell\'ordine.',
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTBY0jitNFt6lvBJXK174yUyu0QBUBCj0EzA&s'
              },
              {
                icon: <Smartphone />,
                title: 'App Mobile',
                desc: 'Controllo totale dal tuo smartphone. Attiva, disattiva e monitora in tempo reale.',
                image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80'
              },
              {
                icon: <Wifi />,
                title: 'Sirena 110dB',
                desc: 'Sirena ad alta intensità per scoraggiare i malintenzionati. Funziona anche senza corrente.',
                image: 'https://www.lookathome.it/media/catalog/product/cache/1/thumbnail/585x585/9df78eab33525d08d6e5fb8d27136e95/l/k/lkm1_1_1.jpg'
              },
              {
                icon: <Users />,
                title: 'Sensori Porta/Finestra',
                desc: 'Protezione perimetrale completa. Rileva aperture non autorizzate istantaneamente.',
                image: 'https://i0.wp.com/www.blogbisacchi.it/wp-content/uploads/2023/10/sensore-allarme-wireless.png?resize=300%2C293&ssl=1'
              },
              {
                icon: <div className="relative w-6 h-6"><Circle className="absolute inset-0 w-6 h-6" /><Circle className="absolute inset-1.5 w-3 h-3" /></div>,
                title: 'Rilevatore di Fumo',
                desc: 'Rileva fumo e incendi in tempo reale. Chiama automaticamente i pompieri.',
                image: 'https://www.elettronsicurezza.it/wp-content/uploads/2019/10/Rivelazione-Incendi-Fumo-400x400.jpg'
              }
            ].map((device, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group will-change-transform"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={device.image}
                    alt={device.title}
                    fill
                    loading="eager"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    {device.icon}
                  </div>
                </div>
                <div className="p-3 md:p-6">
                  <h3 className="text-base md:text-xl font-bold text-[#1a2744] mb-2">{device.title}</h3>
                  <p className="text-gray-600 text-sm">{device.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={scrollToOrderForm}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all uppercase shadow-lg cursor-pointer"
            >
              Ordina adesso
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] mb-6">
              Cosa Include la Promozione
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Nessun abbonamento mensile. Zero costi nascosti. Paghi una volta sola.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl p-4 md:p-12 shadow-xl border-2 border-blue-200 overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80"
                  alt="Casa moderna protetta"
                  fill
                  className="object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-blue-50/80"></div>
              </div>
              <div className="relative grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                {[
                  { icon: <Camera />, title: '5 Microcamere HD', desc: 'Nascoste ovunque in casa. Videosorveglianza 24/7 con registrazione continua' },
                  { icon: <Radar />, title: '10 Sensori di Movimento', desc: 'Rilevano intrusi ma ignorano animali domestici. Zero falsi allarmi' },
                  { icon: <div className="relative w-6 h-6"><Circle className="absolute inset-0 w-6 h-6" /><Circle className="absolute inset-1.5 w-3 h-3" /></div>, title: '5 Rilevatori di Fumo', desc: 'Rilevano incendi e chiamano automaticamente i pompieri.' },
                  { icon: <Smartphone />, title: 'Notifiche Istantanee', desc: 'Vedi tutto sul tuo cellulare in tempo reale, ovunque tu sia' },
                  { icon: <Phone />, title: 'Chiamata Automatica', desc: 'Il sistema allerta le forze dell\'ordine senza che tu debba fare nulla' },
                  { icon: <Battery />, title: 'Batterie e SIM Incluse', desc: 'Funziona anche senza corrente e senza WiFi. Sempre operativo.' },
                  { icon: <Lock />, title: 'Disattivazione Smart', desc: 'Si disattiva automaticamente quando rileva il tuo telefono o con codice' },
                  { icon: <CheckCircle />, title: 'Zero Abbonamenti', desc: 'Paghi solo una volta. Nessun costo mensile nascosto.' }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col md:flex-row items-start text-left bg-white rounded-xl p-4 md:gap-4 shadow-md will-change-transform"
                  >
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-3 md:mb-0 flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1a2744] mb-1 text-sm md:text-base">{item.title}</h3>
                      <p className="text-sm md:text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="relative text-center">
                <button
                  onClick={scrollToOrderForm}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all uppercase shadow-lg cursor-pointer"
                >
                  Richiedi la promozione oggi stesso
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <InstallationGuide />

      {/* Order Steps */}
      <section className="py-12 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 w-full">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-white text-center mb-10"
          >
            Come Ordinare
          </motion.h2>
          <div className="grid grid-cols-[1fr_0.3fr_1fr_0.3fr_1fr] md:grid-cols-5 items-center gap-1 md:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white text-[#1a2744] rounded-full flex items-center justify-center text-lg md:text-xl font-bold mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-125">
                1
              </div>
              <p className="text-white font-medium text-xs md:text-sm">Inserisci i dati<br />di spedizione</p>
            </motion.div>
            <div className="h-0.5 bg-white/30 self-center"></div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white text-[#1a2744] rounded-full flex items-center justify-center text-lg md:text-xl font-bold mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-125">
                2
              </div>
              <p className="text-white font-medium text-xs md:text-sm">Paga in contanti<br />alla consegna</p>
            </motion.div>
            <div className="h-0.5 bg-white/30 self-center"></div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-10 h-10 md:w-14 md:h-14 bg-white text-[#1a2744] rounded-full flex items-center justify-center text-lg md:text-xl font-bold mb-2 md:mb-3 transition-transform duration-300 group-hover:scale-125">
                3
              </div>
              <p className="text-white font-medium text-xs md:text-sm">Installa in<br />5 minuti</p>
            </motion.div>
          </div>
          <div className="text-center mt-10">
            <button
              onClick={scrollToOrderForm}
              className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-4 px-12 rounded-full text-lg transition-all uppercase shadow-lg cursor-pointer"
            >
              Ordina Ora
            </button>
          </div>
        </div>
      </section>

      <TestimonialsSlider />

    </main>
  );
}

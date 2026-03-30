"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import { Button } from '@/components/ui/Button';
import { Countdown } from '@/components/Countdown';
import { ComparisonTable } from '@/components/ComparisonTable';
import { ReviewCard } from '@/components/ReviewCard';
import { FAQ } from '@/components/FAQ';
import { TrustBadges } from '@/components/TrustBadges';
import { Check, Smartphone, MapPin, AlertTriangle, Settings, Plug, Camera, Moon, Truck, ShieldCheck, Gift } from 'lucide-react';

export default function Page() {
  const router = useRouter();
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', phone: '', addressFull: '' });
  const [formErrors, setFormErrors] = useState<Partial<Record<string, string>>>({});
  const [isDuplicate, setIsDuplicate] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const checkDuplicatePhone = (phone: string): boolean => {
    const STORAGE_KEY = 'specchio_submissions';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    try {
      const submissions: { phone: string; timestamp: number }[] = JSON.parse(stored);
      const normalizedPhone = phone.replace(/\D/g, '');
      return submissions.some(s => s.phone === normalizedPhone);
    } catch { return false; }
  };

  const checkDeviceSubmitted = (): boolean => {
    return localStorage.getItem('specchio_device_submitted') === 'true';
  };

  const saveSubmission = (phone: string) => {
    const STORAGE_KEY = 'specchio_submissions';
    const normalizedPhone = phone.replace(/\D/g, '');
    const stored = localStorage.getItem(STORAGE_KEY);
    let submissions: { phone: string; timestamp: number }[] = [];
    try { if (stored) submissions = JSON.parse(stored); } catch { submissions = []; }
    submissions.push({ phone: normalizedPhone, timestamp: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    localStorage.setItem('specchio_device_submitted', 'true');
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToOffer = () => {
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.fullName) errors.fullName = "Nome e cognome sono obbligatori";
    if (!formData.phone) errors.phone = "Il telefono è obbligatorio";
    if (!formData.addressFull) errors.addressFull = "L'indirizzo è obbligatorio";
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    if (checkDuplicatePhone(formData.phone)) {
      setIsDuplicate(true);
      setFormErrors({ phone: 'Questo numero di telefono è già registrato. Sarai contattato a breve!' });
      return;
    }
    if (checkDeviceSubmitted()) {
      setIsDuplicate(true);
      setFormErrors({ phone: 'Da questo dispositivo è già stato effettuato un ordine.' });
      return;
    }
    setIsSubmitting(true);
    try {
      const tmfpInput = document.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';
      const params = new URLSearchParams({
        uid: 'PLACEHOLDER_UID',
        key: 'PLACEHOLDER_KEY',
        offer: 'PLACEHOLDER_OFFER',
        lp: 'PLACEHOLDER_LP',
        name: formData.fullName,
        tel: formData.phone,
        'street-address': formData.addressFull,
        ua: navigator.userAgent,
        tmfp: tmfp,
      });
      const urlParams = new URLSearchParams(window.location.search);
      ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k => {
        const v = urlParams.get(k);
        if (v) params.append(k, v);
      });
      await fetch('https://offers.adricenetwork.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      saveSubmission(formData.phone);
      window.location.href = '/ty/ty-unc-specchio-sk';
    } catch (error) {
      console.error(error);
      window.location.href = '/ty/ty-unc-specchio-sk';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900 pb-20 md:pb-0">
      <Script src="https://offers.adricenetwork.com/forms/tmfp/" crossOrigin="anonymous" strategy="afterInteractive" />

      {/* 1) TOP BAR */}
      <div className="bg-slate-900 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest py-2 text-center px-4">
        <span className="mx-2">Spedizione gratuita in Italia</span>
        <span className="mx-2 opacity-50">|</span>
        <span className="mx-2">Reso 30 giorni</span>
        <span className="mx-2 opacity-50">|</span>
        <span className="mx-2">Pagamenti sicuri</span>
      </div>

      {/* 2) HERO SECTION */}
      <section className="relative pt-6 pb-8 px-4 md:pt-10 md:pb-12 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Text Content */}
          <div className="space-y-4 z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase rounded-sm animate-pulse">
                Offerta Lampo
              </span>
              <Countdown />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[0.95] tracking-tight text-slate-900">
              REGISTRA TUTTO.<br/>
              <span className="text-orange-600">DAVANTI E DIETRO.</span><br/>
              IN 4K.
            </h1>
            
            <p className="text-base md:text-lg text-slate-600 leading-snug font-medium max-w-sm">
              Uno specchietto che diventa la tua assicurazione: video nitidi, assistenza parcheggio e controllo dal telefono.
            </p>

            <div className="bg-white border border-slate-200 p-5 rounded-xl inline-block w-full md:w-auto text-left">
              <div className="flex flex-col items-start mb-3">
                <span className="text-slate-400 text-lg font-medium line-through mb-1">€219,99</span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wide mb-1">Oggi solo</span>
                <span className="text-4xl font-black text-slate-900 tracking-tight mb-2">€109,99</span>
                <div className="flex items-center gap-3">
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">
                    Risparmi €110
                  </span>
                  <span className="text-xs text-slate-400">Disponibilità limitata per questo prezzo.</span>
                </div>
              </div>

              <Button onClick={scrollToOffer} fullWidth className="md:w-full text-lg py-3 shadow-none mb-4">
                ORDINA ORA – SPEDIZIONE GRATIS
              </Button>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wide">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Spedizione 24-48h</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wide">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Reso facile 30 giorni</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wide">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Assistenza clienti Italia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-100/50 rounded-full blur-3xl opacity-50"></div>
            <img 
              src="/images/specchio/hero.webp" 
              alt="MirrorCam 4K Duo installata in auto" 
              className="relative rounded-2xl shadow-2xl border-4 border-white transform md:rotate-2 hover:rotate-0 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            
            {/* Floating Badge */}
            <div className="relative md:absolute mt-4 md:mt-0 md:bottom-10 md:-left-10 bg-white p-3 md:p-4 rounded-xl shadow-xl border border-slate-100 w-full md:w-auto md:max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full md:animate-pulse"></div>
                <span className="text-xs font-bold uppercase text-slate-500">Live Recording</span>
              </div>
              <p className="text-sm font-bold leading-tight">"Mi ha salvato da un concorso di colpa. Video chiarissimo."</p>
            </div>
          </div>
        </div>
      </section>

      <TrustBadges />

      {/* 3) WHY DIFFERENT */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 uppercase tracking-tight">
            Perché è diverso dagli altri
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "4K Davanti + 1080p Dietro", desc: "Dettagli chiari anche di notte, targhe leggibili." },
              { title: "Controllo da Smartphone", desc: "Scarichi e condividi i video in 1 minuto via Wi-Fi." },
              { title: "GPS Incluso", desc: "Percorso e velocità registrati automaticamente nel video." },
              { title: "Grandangolo 170°/140°", desc: "Meno angoli ciechi, vedi tutto quello che succede." },
              { title: "Modalità Parcheggio", desc: "Sorveglia la tua auto anche quando non ci sei. (Può richiedere kit cablaggio opzionale)" },
              { title: "Installazione Facile", desc: "Si aggancia allo specchietto esistente, non ingombra." },
              { title: "Funzioni Smart e Supporto App", desc: "Non solo una dashcam, ma uno specchietto intelligente." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600 flex-shrink-0">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-slate-600 text-sm leading-snug">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW SECTION: INSTALLAZIONE IN 3 STEP */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-tight">
            Installazione in 3 Step
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Settings, 
                step: "STEP 1", 
                title: "AGGANCIA ALLO SPECCHIO", 
                desc: "Si fissa sopra lo specchietto originale con le fasce." 
              },
              { 
                icon: Plug, 
                step: "STEP 2", 
                title: "COLLEGA L’ALIMENTAZIONE", 
                desc: "Puoi alimentarla tramite presa accendisigari inclusa, porta USB o USB-C dell’auto (se disponibile). Per la modalità parcheggio continua è possibile usare un kit cablaggio opzionale." 
              },
              { 
                icon: Camera, 
                step: "STEP 3", 
                title: "POSIZIONA LA RETROCAMERA", 
                desc: "Montala dietro e regola l’inquadratura." 
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
                <div className="bg-slate-900 text-white p-4 rounded-full mb-4">
                  <item.icon className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2">{item.step}</span>
                <h3 className="font-black text-lg uppercase mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4) BENEFIT CARDS */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: AlertTriangle, 
              title: "PROVE IN CASO DI INCIDENTE", 
              text: "Video 4K nitidi: targhe e dettagli più leggibili quando serve davvero.",
              img: "/images/specchio/benefit-incident.webp"
            },
            { 
              icon: MapPin, 
              title: "PARCHEGGIO SENZA STRESS", 
              text: "Retrocamera con linee guida: manovre più semplici e precise.",
              img: "/images/specchio/benefit-parking.webp"
            },
            { 
              icon: Smartphone, 
              title: "TUTTO SUL TELEFONO", 
              text: "Apri l’app, rivedi, salva e condividi i video senza PC e gestisci le funzioni smart dello specchietto.",
              img: "/images/specchio/benefit-apps.webp"
            },
            { 
              icon: Moon, 
              title: "NOTTE E GALLERIE", 
              text: "WDR + visione notturna per immagini più bilanciate e chiare.",
              img: "/images/specchio/benefit-night.webp"
            }
          ].map((card, i) => (
            <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={card.img} alt={card.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-orange-600">
                  <card.icon className="w-5 h-5" />
                  <span className="text-xs font-black uppercase tracking-widest">Benefit #{i+1}</span>
                </div>
                <h3 className="font-black text-xl leading-tight mb-3 uppercase">{card.title}</h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEW SECTION: APP E FUNZIONI SMART INTEGRATE */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black uppercase mb-4 tracking-tight">
              App e Funzioni Smart Integrate
            </h2>
            <p className="text-xl text-slate-600 font-medium mb-6">
              Uno specchietto che non si limita a registrare, ma integra funzioni intelligenti per la guida quotidiana.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Oltre alla doppia dashcam 4K, MirrorCam trasforma il tuo specchietto in un centro multimediale. Accedi alle tue app preferite come <strong>Google Maps</strong> e <strong>YouTube</strong>, e sfrutta l'integrazione con <strong>Apple CarPlay</strong> e <strong>Android Auto</strong>.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "Compatibile con Apple CarPlay e Android Auto",
                "Navigazione GPS in tempo reale con Google Maps",
                "Riproduzione video e intrattenimento su YouTube",
                "Musica, podcast e chiamate in vivavoce",
                "Interfaccia touch fluida e reattiva"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-orange-100 p-1 rounded-full text-orange-600 mt-0.5">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="font-bold text-slate-800">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-400 italic">
              Disponibilità e compatibilità dipendono da modello e smartphone.
            </p>
          </div>
          <div className="bg-slate-100 rounded-2xl p-8 flex items-center justify-center aspect-video shadow-inner">
             <img 
              src="/images/specchio/smart-display.webp" 
              alt="Interfaccia Smart MirrorCam" 
              className="rounded-xl shadow-lg border-4 border-white"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* 5) METRICS */}
      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black uppercase mb-16 tracking-tight">Numeri che parlano chiaro</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {[
              { val: "4K", label: "Risoluzione Anteriore" },
              { val: "1080p", label: "Retrocamera" },
              { val: "170°", label: "Grandangolo Front" },
              { val: "5 GHz", label: "Wi-Fi Smartphone" },
              { val: "GPS", label: "Antenna Inclusa" },
              { val: "Parking", label: "Modalità Parcheggio (kit opz.)" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-3xl md:text-4xl font-black text-orange-500 tracking-tighter">{stat.val}</span>
                <span className="text-xs md:text-sm font-bold uppercase text-slate-400 tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs mt-8">*La modalità parcheggio può richiedere kit cablaggio opzionale in base al veicolo.</p>
        </div>
      </section>

      {/* 6) COMPARISON */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10 uppercase">MirrorCam 4K vs Dashcam Classiche</h2>
          <ComparisonTable />
        </div>
      </section>

      {/* 7) WHATS IN THE BOX */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black uppercase mb-8 text-center">Cosa trovi nella confezione</h2>
          <ul className="space-y-4">
            {[
              "Specchietto Dashcam 4K",
              "Retrocamera 1080p Impermeabile",
              "Antenna GPS Esterna",
              "Supporta microSD (fino a 128GB)*",
              "Cavo alimentazione con vari attacchi (USB – Type-C – accendisigari)",
              "Fasce di fissaggio in gomma",
              "Manuale in Italiano"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {i + 1}
                </div>
                <span className="font-bold text-slate-800">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-400 mt-4 text-center">*microSD inclusa solo se previsto dall’offerta corrente.</p>
        </div>
      </section>

      {/* 8) REVIEWS */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 uppercase">Cosa dicono i nostri clienti</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ReviewCard 
              name="Marco R." 
              location="Milano" 
              text="Installata in 20 minuti. La qualità video è impressionante, si leggono le targhe anche di notte. L'app è veloce."
              date="gen 2026"
            />
            <ReviewCard 
              name="Luca B." 
              location="Roma" 
              text="Mi sento molto più sicuro. La funzione parcheggio funziona bene, ho beccato chi mi ha rigato il paraurti!"
              date="feb 2026"
            />
            <ReviewCard 
              name="Giulia T." 
              location="Torino" 
              text="Ottimo prodotto. Lo specchietto è grande e si vede benissimo. La retrocamera aiuta tantissimo nei parcheggi stretti."
              date="gen 2026"
            />
            <ReviewCard 
              name="Alessandro M." 
              location="Napoli" 
              text="Spedizione velocissima. Arrivato il giorno dopo. Tutto come da descrizione. Consigliato."
              date="feb 2026"
            />
            <ReviewCard 
              name="Roberto F." 
              location="Bologna" 
              text="Rapporto qualità prezzo incredibile. Ne ho provate tante, questa è la migliore per nitidezza."
              date="gen 2026"
            />
            <ReviewCard 
              name="Elena S." 
              location="Verona" 
              text="Facile da usare, non serve essere esperti. Basta accendere l'auto e fa tutto da sola."
              date="feb 2026"
            />
          </div>
        </div>
      </section>

      {/* 9) FAQ */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10 uppercase">Domande Frequenti</h2>
          <FAQ />
        </div>
      </section>

      {/* 10) ORDER FORM */}
      <section id="offer" ref={formRef} className="py-16 px-4 bg-gradient-to-b from-slate-50 to-orange-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-slate-900 p-6 text-center text-white">
              <h3 className="text-2xl font-bold mb-1">COMPILA I DATI PER ORDINARE</h3>
              <p className="text-orange-400 text-sm font-medium">Consegna rapida + Pagamento alla consegna</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <input type="hidden" name="tmfp" />

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-black text-slate-900">MirrorCam 4K Duo</span>
                    <p className="text-sm text-slate-600">+ Retrocamera + GPS + Accessori</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">SPEDIZIONE GRATIS</span>
                      <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">OFFERTA LIMITATA</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 line-through text-sm block">€219,99</span>
                    <span className="text-3xl font-black text-green-700">€109<span className="text-lg">,99</span></span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome e Cognome *</label>
                <input name="fullName" type="text" value={formData.fullName} onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${formErrors.fullName ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Mario Rossi" />
                {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefono (per il corriere) *</label>
                <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${formErrors.phone ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="+39 333 1234567" />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Indirizzo Completo *</label>
                <input name="addressFull" type="text" value={formData.addressFull} onChange={handleInputChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${formErrors.addressFull ? 'border-red-500' : 'border-slate-300'}`}
                  placeholder="Via Roma 10, 20100 Milano" />
                {formErrors.addressFull && <p className="text-red-500 text-xs mt-1">{formErrors.addressFull}</p>}
              </div>

              <div className="bg-orange-50 p-4 rounded-lg flex items-center justify-between border border-orange-100">
                <span className="font-bold text-slate-800">Metodo di pagamento:</span>
                <span className="flex items-center gap-2 font-bold text-orange-700">
                  <Truck className="w-5 h-5" /> Pagamento alla consegna
                </span>
              </div>

              <button type="submit" disabled={isSubmitting}
                className={`w-full py-4 px-4 rounded-xl font-black text-xl transition duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 text-white cursor-pointer shadow-lg transform hover:scale-[1.02]'
                }`}>
                {isSubmitting ? 'INVIO IN CORSO...' : 'ORDINA ORA — PAGA ALLA CONSEGNA'}
                {!isSubmitting && <Truck className="w-6 h-6" />}
              </button>

              <p className="text-center text-xs text-slate-400 mt-3">
                I tuoi dati sono protetti e crittografati SSL. Li usiamo SOLO per la spedizione.
              </p>

              <div className="flex justify-center gap-6 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> Protezione SSL</span>
                <span className="flex items-center gap-1"><Gift className="w-3 h-3" /> Garanzia soddisfatti</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 11) FINAL CTA */}
      <section className="py-20 px-4 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">
            Ultimi pezzi a questo prezzo
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 inline-block w-full md:w-auto">
             <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
                <div className="text-center md:text-right">
                  <p className="text-slate-400 text-lg font-bold line-through decoration-red-500 decoration-2">€219,99</p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Prezzo Listino</p>
                </div>
                <div className="text-6xl font-black text-white tracking-tighter">
                  €109,99
                </div>
             </div>
             
             <div className="flex justify-center mb-8">
               <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase animate-pulse flex items-center gap-2">
                 <AlertTriangle className="w-4 h-4" />
                 Solo 4 pezzi rimasti
               </div>
             </div>

             <Button variant="primary" fullWidth className="text-xl py-5 shadow-orange-500/50">
               ORDINA ORA - SPEDIZIONE GRATIS
             </Button>
             
             <p className="mt-4 text-xs text-slate-400 uppercase tracking-widest font-bold">
               Garanzia legale 24 mesi • Reso facile entro 30 giorni
             </p>
          </div>
        </div>
      </section>

      {/* STICKY BUY BAR (Responsive) */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 md:p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             <span className="font-bold text-slate-900 hidden md:inline text-lg">MirrorCam 4K Duo</span>
             <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
               <span className="text-xs text-slate-500 line-through">€219,99</span>
               <span className="text-xl font-black text-slate-900">€109,99</span>
             </div>
          </div>
          <Button onClick={scrollToOffer} className="py-2 px-6 text-sm md:text-base shadow-none">
            ORDINA ORA
          </Button>
        </div>
      </div>

    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
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

export default function TopperOrtopedicoLandingCS() {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedEndTime = localStorage.getItem('topper-offer-end-cs');
      if (savedEndTime) {
        const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000);
        return remaining > 0 ? remaining : 0;
      } else {
        const endTime = Date.now() + 57 * 60 * 1000;
        localStorage.setItem('topper-offer-end-cs', endTime.toString());
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
    '/images/topper/1.jpg',
    '/images/topper/2.jpg',
    '/images/topper/3.jpg',
    '/images/topper/4.png',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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

  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
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
      setSubmitError('Vyplňte prosím všechna pole pro doručení.');
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const tmfpInput = document.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';

      const params = new URLSearchParams({
        uid: '019a913a-422a-770d-8b80-6aa9c3b58776',
        key: 'e0b35b6504ae459988cf25',
        offer: '3044',
        lp: '3078',
        name: orderData.name,
        tel: orderData.phone,
        'street-address': orderData.address,
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
          send_to: 'AW-17104994752/topper',
          value: 2099,
          currency: 'CZK',
        });
      }
      window.location.href = '/ty/ty-uc-topper-cs';
    } catch (error) {
      console.error(error);
      window.location.href = '/ty/ty-uc-topper-cs';
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviews = [
    { nome: 'Jan M.', eta: '68 let', testo: 'Myslel jsem, že budu muset vyměnit matraci, která už byla nepohodlná, ale to by stálo moc peněz. Tenhle topper to vyřešil. Ráno vstávám bez bolesti zad, kterou jsem měl léta. Vřele doporučuji.', stelle: 5, data: 'Včera' },
    { nome: 'Hana T.', eta: '62 let', testo: 'Měla jsem obavy nakupovat přes internet, ale zaplatila jsem až kurýrovi při doručení. Je krásně měkký, ale skvěle podpírá. Konečně spím celou noc, aniž bych se budila kvůli horku.', stelle: 5, data: 'Před 2 dny' },
    { nome: 'Petr B.', eta: '71 let', testo: 'Snadno se dává na postel, není těžký. Moje žena si přestala stěžovat na tvrdou matraci. Dobře utracené peníze.', stelle: 5, data: 'Minulý týden' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Script src="https://offers.uncappednetwork.com/forms/tmfp/" crossOrigin="anonymous" strategy="afterInteractive" />
      <img src="https://offers.uncappednetwork.com/forms/api/ck/?o=3044&uid=019a913a-422a-770d-8b80-6aa9c3b58776&lp=3078" style={{ width: '1px', height: '1px', display: 'none' }} alt="" />

      <div className="bg-slate-100 py-2 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-sm md:text-base font-medium text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600" />
            <span>2letá záruka</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-teal-600" />
            <span>Zákaznická podpora</span>
          </div>
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-teal-600 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-3 md:hidden transition-transform duration-300 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <button
          onClick={openOrderPopup}
          className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-xl shadow-lg flex flex-col items-center leading-none"
        >
          <span>OBJEDNEJTE A PLAŤTE PŘI DORUČENÍ</span>
          <span className="text-sm font-normal mt-1 opacity-90">Kreditní karta není potřeba</span>
        </button>
      </div>

      <section className="bg-white pt-8 pb-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Budíte se často s <span className="text-red-700 underline decoration-red-300 decoration-4">bolestí zad?</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 mb-6 leading-relaxed">
            Proměňte svou starou matraci v <strong>novou ortopedickou postel</strong>, aniž byste utratili jmění.
          </p>
          <div className="inline-block bg-green-50 border border-green-200 rounded-lg px-6 py-3 mb-4">
            <p className="text-lg text-green-800 font-semibold flex items-center gap-2 justify-center">
              <ThumbsUp className="w-6 h-6" />
              <span>Více než 15 000 zákazníků spí lépe díky Soft Foam</span>
            </p>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          <div className="relative bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="aspect-square relative">
              <img
                src={slides[currentSlide]}
                alt="Ortopedický topper na matraci"
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 rounded-full p-4 shadow-xl border border-slate-200 cursor-pointer"
                aria-label="Předchozí obrázek"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev + 1) % slides.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 rounded-full p-4 shadow-xl border border-slate-200 cursor-pointer"
                aria-label="Další obrázek"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
            <div className="p-4 bg-white text-center">
              <p className="text-slate-600 font-medium">Posouvejte pro další fotografie</p>
            </div>
          </div>

          <div className="bg-white border-2 border-teal-500 rounded-2xl p-6 md:p-8 shadow-xl relative mt-4 lg:mt-0">
            <div className="absolute -top-6 right-4 bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-xl transform rotate-3">
              SLEVA -70%
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Soft Foam - Korekční topper
            </h2>
            <div className="mb-6">
              <p className="text-lg font-semibold text-slate-700 mb-3">Vyberte rozměr:</p>
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

            <div className="bg-slate-50 rounded-xl p-6 mb-8 text-center border border-slate-200">
              <p className="text-slate-500 text-lg line-through mb-1">Běžná cena: 3 999 Kč</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl text-slate-700 font-medium">Dnes pouze:</span>
                <span className="text-6xl font-extrabold text-teal-700">2 099 Kč</span>
              </div>
              <p className="text-red-600 font-bold mt-2 text-lg">Platíte vše při doručení v hotovosti.</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Vzbudíte se odpočatí a bez bolesti",
                "Nemusíte měnit svou matraci",
                "Snadné nasazení i praní",
                "Doprava zdarma do 24/48 hodin"
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
              KLIKNĚTE ZDE PRO OBJEDNÁNÍ
            </button>
            <p className="text-center text-slate-500 text-sm hidden md:block">
              Žádná platba předem není vyžadována.
            </p>
          </div>
        </div>
      </main>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Ideální, pokud se nacházíte v jedné z těchto situací:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-500">
              <Activity className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Příliš tvrdá matrace?</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Pokud vám stávající matrace připadá jako „kámen" a bolí vás z ní boky nebo ramena, tento topper ji okamžitě změkčí a zpříjemní.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-500">
              <Bed className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Stará matrace?</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Pokud cítíte pružiny nebo má matrace propadliny, Soft Foam vše vyrovná a budete mít pocit, že ležíte na nové posteli.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-500">
              <Thermometer className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Potíte se v noci?</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Speciální tkanina propouští vzduch. V létě zůstanete v suchu a svěžesti, v zimě vás příjemně zahřeje.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-2">
            Co říkají ti, kteří ho již používají
          </h2>
          <p className="text-xl text-center text-slate-600 mb-10">
            Ověřené recenze od českých zákazníků
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
                  &ldquo;{review.testo}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-50 py-12 border-y border-teal-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Truck className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Doprava zdarma</h3>
              <p className="text-lg text-slate-700">Kurýr vám zavolá před doručením. Doručení do 24/48 hodin.</p>
            </div>
            <div>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Shield className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2letá záruka</h3>
              <p className="text-lg text-slate-700">Certifikovaný produkt. Jakýkoli problém vyřešíme výměnou.</p>
            </div>
            <div>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <CheckCircle className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Bezpečná platba</h3>
              <p className="text-lg text-slate-700">Kreditní karta není potřeba. Platíte v hotovosti při doručení.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Objednání je velmi snadné:</h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-center">
            <div className="bg-white p-6 rounded-xl border-2 border-slate-100 w-full md:w-1/3">
              <span className="text-5xl font-bold text-teal-200 block mb-2">1</span>
              <p className="text-xl font-bold text-slate-900">Vyplňte formulář</p>
              <p className="text-slate-600">Zadejte své jméno a adresu níže.</p>
            </div>
            <div className="hidden md:block text-slate-300 text-4xl">&rarr;</div>
            <div className="bg-white p-6 rounded-xl border-2 border-slate-100 w-full md:w-1/3">
              <span className="text-5xl font-bold text-teal-200 block mb-2">2</span>
              <p className="text-xl font-bold text-slate-900">Zavoláme vám</p>
              <p className="text-slate-600">Ověříme, že jsou údaje správné.</p>
            </div>
            <div className="hidden md:block text-slate-300 text-4xl">&rarr;</div>
            <div className="bg-white p-6 rounded-xl border-2 border-slate-100 w-full md:w-1/3">
              <span className="text-5xl font-bold text-teal-200 block mb-2">3</span>
              <p className="text-xl font-bold text-slate-900">Zaplatíte při doručení</p>
              <p className="text-slate-600">Peníze předáte kurýrovi při převzetí.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="order-form-section" className="bg-slate-100 py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-teal-600 p-6 text-center text-white">
              <h2 className="text-3xl font-bold mb-2">Objednávkový formulář</h2>
              <p className="text-teal-100 text-lg">Vyplňte a získejte slevu 70 %</p>
            </div>

            <div className="p-6 md:p-10">
              {submitError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                  <p className="text-red-700 font-bold">{submitError}</p>
                </div>
              )}

              <input type="hidden" name="tmfp" />
              <div className="space-y-6">
                <div>
                  <label className="block text-slate-900 font-bold text-xl mb-3">Jméno a příjmení</label>
                  <input
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-0 text-xl text-slate-900 placeholder-slate-400 bg-slate-50"
                    placeholder="Např.: Jan Novák"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-slate-900 font-bold text-xl mb-3">Telefonní číslo</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-0 text-xl text-slate-900 placeholder-slate-400 bg-slate-50"
                    placeholder="Např.: +420 123 456 789"
                    disabled={isSubmitting}
                  />
                  <p className="text-slate-500 text-sm mt-2">Na toto číslo vám zavoláme pro potvrzení zásilky.</p>
                </div>
                <div>
                  <label className="block text-slate-900 font-bold text-xl mb-3">Doručovací adresa</label>
                  <input
                    type="text"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-0 text-xl text-slate-900 placeholder-slate-400 bg-slate-50"
                    placeholder="Ulice, číslo, město..."
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
                <p className="text-yellow-900 font-medium text-lg">
                  Objednáváte <strong>Topper rozměr {selectedSize} cm za 2 099 Kč</strong> (místo 3 999 Kč). Zaplatíte v hotovosti kurýrovi.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full mt-8 py-5 rounded-xl font-bold text-2xl text-white shadow-xl transition-transform transform hover:-translate-y-1 ${
                  isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isSubmitting ? 'MOMENT PROSÍM...' : 'POTVRDIT OBJEDNÁVKU'}
              </button>

              <div className="text-center mt-6 flex justify-center items-center gap-2 text-slate-500">
                <Shield className="w-5 h-5" />
                <span>Vaše údaje jsou v bezpečí a nebudou sdíleny.</span>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

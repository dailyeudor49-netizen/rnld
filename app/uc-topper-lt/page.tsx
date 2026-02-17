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

export default function TopperOrtopedicoLandingLT() {
  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedEndTime = localStorage.getItem('topper-offer-end-lt');
      if (savedEndTime) {
        const remaining = Math.floor((parseInt(savedEndTime) - Date.now()) / 1000);
        return remaining > 0 ? remaining : 0;
      } else {
        const endTime = Date.now() + 57 * 60 * 1000;
        localStorage.setItem('topper-offer-end-lt', endTime.toString());
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
      setSubmitError('Prašome užpildyti visus pristatymo laukus.');
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
        offer: '3041',
        lp: '3075',
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
          value: 69.99,
          currency: 'EUR',
        });
      }
      window.location.href = '/ty/ty-uc-topper-lt';
    } catch (error) {
      console.error(error);
      window.location.href = '/ty/ty-uc-topper-lt';
    } finally {
      setIsSubmitting(false);
    }
  };

  const reviews = [
    { nome: 'Jonas M.', eta: '68 m.', testo: 'Maniau, kad reikės keisti čiužinį, nes jis tapo labai nepatogus, bet tai per brangu. Su šiuo užtiesalu problema išsisprendė. Ryte keliuosi be nugaros skausmo, kuris kamavo daugelį metų. Labai rekomenduoju.', stelle: 5, data: 'Vakar' },
    { nome: 'Rasa T.', eta: '62 m.', testo: 'Abejojau, ar verta pirkti internetu, bet sumokėjau kurjeriui pristatymo metu. Labai minkštas, bet puikiai palaiko nugarą. Pagaliau miegu visą naktį ir nebepabundu nuo karščio.', stelle: 5, data: 'Prieš 2 dienas' },
    { nome: 'Vytautas B.', eta: '71 m.', testo: 'Lengva uždėti ant lovos, nesveria daug. Mano žmona nustojo skųstis kietu čiužiniu. Pinigai išleisti ne veltui.', stelle: 5, data: 'Praėjusią savaitę' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Script src="https://offers.uncappednetwork.com/forms/tmfp/" crossOrigin="anonymous" strategy="afterInteractive" />
      <img src="https://offers.uncappednetwork.com/forms/api/ck/?o=3041&uid=019a913a-422a-770d-8b80-6aa9c3b58776&lp=3075" style={{ width: '1px', height: '1px', display: 'none' }} alt="" />

      <div className="bg-slate-100 py-2 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center text-sm md:text-base font-medium text-slate-700">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-teal-600" />
            <span>2 metų garantija</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-teal-600" />
            <span>Klientų aptarnavimas</span>
          </div>
        </div>
      </div>

      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-teal-600 shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-3 md:hidden transition-transform duration-300 ${showSticky ? 'translate-y-0' : 'translate-y-full'}`}>
        <button
          onClick={openOrderPopup}
          className="w-full bg-teal-600 text-white py-4 rounded-xl font-bold text-xl shadow-lg flex flex-col items-center leading-none"
        >
          <span>UŽSAKYTI IR MOKĖTI PRISTATYMO METU</span>
          <span className="text-sm font-normal mt-1 opacity-90">Kredito kortelė nereikalinga</span>
        </button>
      </div>

      <section className="bg-white pt-8 pb-6 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
            Dažnai pabundate su <span className="text-red-700 underline decoration-red-300 decoration-4">nugaros skausmu?</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-700 mb-6 leading-relaxed">
            Paverskite seną čiužinį <strong>nauja ortopedine lova</strong> – be didelių išlaidų.
          </p>
          <div className="inline-block bg-green-50 border border-green-200 rounded-lg px-6 py-3 mb-4">
            <p className="text-lg text-green-800 font-semibold flex items-center gap-2 justify-center">
              <ThumbsUp className="w-6 h-6" />
              <span>Daugiau nei 15 000 klientų miega geriau su Soft Foam</span>
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
                alt="Ortopedinis čiužinio užtiesalas"
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 rounded-full p-4 shadow-xl border border-slate-200 cursor-pointer"
                aria-label="Ankstesnis paveikslėlis"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev + 1) % slides.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 rounded-full p-4 shadow-xl border border-slate-200 cursor-pointer"
                aria-label="Kitas paveikslėlis"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </div>
            <div className="p-4 bg-white text-center">
              <p className="text-slate-600 font-medium">Slinkite, kad pamatytumėte daugiau nuotraukų</p>
            </div>
          </div>

          <div className="bg-white border-2 border-teal-500 rounded-2xl p-6 md:p-8 shadow-xl relative mt-4 lg:mt-0">
            <div className="absolute -top-6 right-4 bg-red-600 text-white font-bold px-6 py-3 rounded-full shadow-lg text-xl transform rotate-3">
              NUOLAIDA -70%
            </div>

            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Soft Foam - Koreguojantis užtiesalas
            </h2>
            <div className="mb-6">
              <p className="text-lg font-semibold text-slate-700 mb-3">Pasirinkite dydį:</p>
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
              <p className="text-slate-500 text-lg line-through mb-1">Įprasta kaina: €149,99</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl text-slate-700 font-medium">Šiandien tik:</span>
                <span className="text-5xl md:text-6xl font-extrabold text-teal-700">€69,99</span>
              </div>
              <p className="text-red-600 font-bold mt-2 text-lg">Mokate grynaisiais pristatymo metu.</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Pabundate pailsėję ir be skausmo",
                "Nereikia keisti seno čiužinio",
                "Lengva uždėti ir skalbti",
                "Nemokamas pristatymas per 24/48 val."
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
              SPAUSKITE ČIA, KAD UŽSAKYTUMĖTE
            </button>
            <p className="text-center text-slate-500 text-sm hidden md:block">
              Išankstinis mokėjimas nereikalingas.
            </p>
          </div>
        </div>
      </main>

      <section className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
            Puikiai tinka, jei atpažįstate vieną iš šių situacijų:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-500">
              <Activity className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Čiužinys per kietas?</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Jei jūsų dabartinis čiužinys atrodo kaip akmuo ir skauda klubus ar pečius, šis užtiesalas iškart padarys jį minkštą ir patogų.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-500">
              <Bed className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Čiužinys senas?</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Jei jaučiate spyruokles arba atsiradusias įdubas, Soft Foam viską išlygina ir atrodys, kad turite naują lovą.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-teal-500">
              <Thermometer className="w-12 h-12 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Prakaituojate naktį?</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                Specialus audinys praleidžia orą. Vasarą lieka vėsu ir sausa, žiemą – šilta ir jauku.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-2">
            Ką sako tie, kurie jau naudoja
          </h2>
          <p className="text-xl text-center text-slate-600 mb-10">
            Patvirtinti atsiliepimai iš Lietuvos klientų
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
              <h3 className="text-xl font-bold text-slate-900 mb-2">Nemokamas pristatymas</h3>
              <p className="text-lg text-slate-700">Kurjeris paskambins prieš atvykdamas. Pristatymas per 24/48 val.</p>
            </div>
            <div>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <Shield className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2 metų garantija</h3>
              <p className="text-lg text-slate-700">Sertifikuotas produktas. Bet kokia problema – pakeisime.</p>
            </div>
            <div>
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <CheckCircle className="w-10 h-10 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Saugus atsiskaitymas</h3>
              <p className="text-lg text-slate-700">Kredito kortelė nereikalinga. Mokate grynaisiais pristatymo metu.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Užsakyti labai paprasta:</h2>
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-center">
            <div className="bg-white p-6 rounded-xl border-2 border-slate-100 w-full md:w-1/3">
              <span className="text-5xl font-bold text-teal-200 block mb-2">1</span>
              <p className="text-xl font-bold text-slate-900">Užpildykite formą</p>
              <p className="text-slate-600">Įrašykite vardą ir adresą žemiau.</p>
            </div>
            <div className="hidden md:block text-slate-300 text-4xl">&rarr;</div>
            <div className="bg-white p-6 rounded-xl border-2 border-slate-100 w-full md:w-1/3">
              <span className="text-5xl font-bold text-teal-200 block mb-2">2</span>
              <p className="text-xl font-bold text-slate-900">Mes jums paskambinsime</p>
              <p className="text-slate-600">Patvirtinsime, kad duomenys teisingi.</p>
            </div>
            <div className="hidden md:block text-slate-300 text-4xl">&rarr;</div>
            <div className="bg-white p-6 rounded-xl border-2 border-slate-100 w-full md:w-1/3">
              <span className="text-5xl font-bold text-teal-200 block mb-2">3</span>
              <p className="text-xl font-bold text-slate-900">Mokate pristatymo metu</p>
              <p className="text-slate-600">Atiduodate pinigus kurjeriui, kai jis atvyksta.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="order-form-section" className="bg-slate-100 py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
            <div className="bg-teal-600 p-6 text-center text-white">
              <h2 className="text-3xl font-bold mb-2">Užsakymo forma</h2>
              <p className="text-teal-100 text-lg">Užpildykite ir gaukite 70% nuolaidą</p>
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
                  <label className="block text-slate-900 font-bold text-xl mb-3">Vardas ir pavardė</label>
                  <input
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-0 text-xl text-slate-900 placeholder-slate-400 bg-slate-50"
                    placeholder="Pvz.: Jonas Kazlauskas"
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className="block text-slate-900 font-bold text-xl mb-3">Telefono numeris</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-0 text-xl text-slate-900 placeholder-slate-400 bg-slate-50"
                    placeholder="Pvz.: +370 612 34567"
                    disabled={isSubmitting}
                  />
                  <p className="text-slate-500 text-sm mt-2">Paskambinsime šiuo numeriu, kad patvirtintume pristatymą.</p>
                </div>
                <div>
                  <label className="block text-slate-900 font-bold text-xl mb-3">Pristatymo adresas</label>
                  <input
                    type="text"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 border-2 border-slate-300 rounded-xl focus:border-teal-500 focus:ring-0 text-xl text-slate-900 placeholder-slate-400 bg-slate-50"
                    placeholder="Gatvė, namo nr., miestas..."
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="mt-8 bg-yellow-50 p-4 rounded-xl border border-yellow-200 flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-1" />
                <p className="text-yellow-900 font-medium text-lg">
                  Užsakote <strong>užtiesalą {selectedSize} cm už €69,99</strong> (vietoj €149,99). Mokėsite grynaisiais kurjeriui.
                </p>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full mt-8 py-5 rounded-xl font-bold text-2xl text-white shadow-xl transition-transform transform hover:-translate-y-1 ${
                  isSubmitting ? 'bg-slate-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isSubmitting ? 'PALAUKITE...' : 'PATVIRTINTI UŽSAKYMĄ'}
              </button>

              <div className="text-center mt-6 flex justify-center items-center gap-2 text-slate-500">
                <Shield className="w-5 h-5" />
                <span>Jūsų duomenys saugūs ir nebus perduoti tretiesiems asmenims.</span>
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}

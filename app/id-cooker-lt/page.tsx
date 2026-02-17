'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { Star, CheckCircle, Shield, Zap, ChevronDown, ChevronLeft, ChevronRight, Flame, Timer, Gauge, Utensils, ChefHat, Soup, Truck, PhoneCall, Heart, Scale, RefreshCw, Wind, X, Check, PlayCircle } from 'lucide-react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function RobotCucinaLanding() {
  const router = useRouter();
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!orderData.name.trim() || !orderData.phone.trim() || !orderData.address.trim()) {
      setSubmitError('Prašome užpildyti visus laukus.');
      return;
    }

    const phoneDigits = orderData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 9) {
      setSubmitError('Įvestas telefono numeris atrodo neteisingas.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const tmfpInput = e.currentTarget.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const tmfp = tmfpInput?.value || '';

      const params = new URLSearchParams({
        uid: '019be502-1631-773c-b833-f6153c79c2cb',
        key: 'cb7c9a2af5b95d10f17a18',
        offer: '2221',
        lp: '2260',
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

      await fetch('https://offers.italiadrop.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      router.push('/ty/ty-id-cooker-lt');
    } catch (error) {
      console.error(error);
      router.push('/ty/ty-id-cooker-lt');
    } finally {
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Funkcijų skaičius", robot: "12 viename", without: "Tik 1-2 funkcijos" },
    { feature: "Užimama vieta", robot: "Minimalus plotas", without: "Perpildytas stalas" },
    { feature: "Gaminimas", robot: "Automatinis ir tikslus", without: "Reikia maišyti rankomis" },
    { feature: "Valymas", robot: "Greitas, nesvylantis", without: "Sunkus ir varginantis" },
    { feature: "Bendra kaina", robot: "Tik €69", without: "Daugiau nei €400 už kelis prietaisus" },
  ];

  const faqs = [
    {
      question: "Kokius prietaisus pakeičia šis robotas?",
      answer: "Šis robotas sukurtas būti jūsų vieninteliu pagalbininku virtuvėje. Jis pakeičia maišytuvą, tešlos maišyklę, smulkintuvą, garintuvą, svarstykles ir gruzdintuvę. Su vienu prietaisu galite paruošti bet kokį patiekalą – nuo užkandžių iki desertų."
    },
    {
      question: "Ar lengva naudoti tiems, kas nesusigaudo technologijose?",
      answer: "Taip, tikrai. Sukūrėme labai paprastą ir intuityvų valdymo skydelį. Tereikia pasirinkti norimą funkciją ir paspausti pradžios mygtuką. Idealiai tinka tiems, kurie ieško paprastumo be komplikacijų."
    },
    {
      question: "Ar dubuo pakankamai didelis?",
      answer: "Taip, dubuo yra 6 litrų talpos – idealus gaminimui visai šeimai arba patiekalų ruošimui atsargai."
    },
    {
      question: "Kaip vyksta apmokėjimas?",
      answer: "Jūsų maksimaliam saugumui siūlome apmokėjimą pristatymo metu. Sumokėsite €69 tiesiogiai kurjeriui, kai gausite produktą į namus."
    },
    {
      question: "Ar produktas turi garantiją?",
      answer: "Žinoma. Produktui suteikiama 24 mėnesių garantija. Be to, turite 30 dienų išbandyti: jei nebūsite patenkinti, galėsite grąžinti be jokių problemų."
    }
  ];

  const reviews = [
    { nome: 'Rasa M.', testo: 'Nustebino kokybė. Daro tą patį, ką ir daug brangesni robotai. Ruošiu rizoto ir tyreles be jokių pastangų. Puikus pagalbininkas tiems, kas turi mažai laiko arba nori sveikai maitintis.', stelle: 5, data: '2024 m. gruodžio 18 d.' },
    { nome: 'Tomas K.', testo: 'Niekada nebuvau geras virėjas, bet su šiuo robotu viskas tapo paprasta. Mėsos padažas gaunasi skanus, ir nereikia nuolat stebėti.', stelle: 5, data: '2024 m. gruodžio 15 d.' },
    { nome: 'Jurgita R.', testo: 'Atlaisvinau daug vietos virtuvėje. Pardaviau senus prietaisus, nes šis viską atlieka. Integruotos svarstyklės labai patogios.', stelle: 5, data: '2024 m. gruodžio 12 d.' },
    { nome: 'Andrius D.', testo: 'Tvirti materialai ir galingas variklis. Puikiai smulkina net kiečiausias daržoves. Už €69 tai buvo tikrai geras pirkinys.', stelle: 5, data: '2024 m. gruodžio 8 d.' },
    { nome: 'Laura B.', testo: 'Labai naudinga vaikų tyrelėms. Viską sudedu ir jis padaro. Išsivalo akimirksniu, kas man labai svarbu.', stelle: 5, data: '2024 m. gruodžio 3 d.' },
    { nome: 'Gintaras L.', testo: 'Padovanojau žmonai ir ji labai patenkinta. Pristatymas buvo greitas, sumokėjau patogiai kurjeriui.', stelle: 5, data: '2024 m. lapkričio 15 d.' },
  ];

  const funzioniDodici = [
    { title: "Smulkina", desc: "daržoves, mėsą, riešutus", icon: <Zap className="w-6 h-6 text-orange-600" /> },
    { title: "Maišo", desc: "tyreles, kokteilius, košes", icon: <Soup className="w-6 h-6 text-orange-600" /> },
    { title: "Minko tešlą", desc: "duonai, picai, desertams", icon: <Utensils className="w-6 h-6 text-orange-600" /> },
    { title: "Plaka", desc: "grietinėlę, baltymus, kremus", icon: <ChefHat className="w-6 h-6 text-orange-600" /> },
    { title: "Verda", desc: "sriubas, rizoto, padažus", icon: <Flame className="w-6 h-6 text-orange-600" /> },
    { title: "Garina", desc: "daržoves, žuvį, mėsą", icon: <Wind className="w-6 h-6 text-orange-600" /> },
    { title: "Automatiškai maišo", desc: "nereikia stovėti prie viryklės", icon: <RefreshCw className="w-6 h-6 text-orange-600" /> },
    { title: "Automatinis pakepinimas", desc: "be prisvylimo", icon: <Flame className="w-6 h-6 text-orange-600" /> },
    { title: "Lengvas kepimas", desc: "su mažai arba be aliejaus", icon: <Zap className="w-6 h-6 text-orange-600" /> },
    { title: "Integruotos svarstyklės", desc: "sveriate gaminimo metu", icon: <Scale className="w-6 h-6 text-orange-600" /> },
    { title: "Laikmatis ir temperatūros valdymas", desc: "gaminimas visada kontroliuojamas", icon: <Timer className="w-6 h-6 text-orange-600" /> },
    { title: "Automatinės programos", desc: "pasirinkite ir spauskite mygtuką", icon: <CheckCircle className="w-6 h-6 text-orange-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed text-slate-800 pb-20 md:pb-0">
      <Script
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <img
        src="https://offers.italiadrop.com/forms/api/ck/?o=2221&uid=019be502-1631-773c-b833-f6153c79c2cb&lp=2260"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* Barra superiore fissa per urgenza soft */}
      <div className="bg-slate-900 text-white text-center py-2 text-sm font-medium">
        Specialus pasiūlymas sandėlio atnaujinimui - Ribotas kiekis
      </div>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl md:hidden">
        <div className="px-4 py-3">
          <button
            onClick={openOrderPopup}
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-transform"
          >
            <span>UŽSAKYTI DABAR UŽ €69</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <header className="pt-8 pb-6 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
          Supaprastinkite savo virtuvę su <span className="text-orange-600">12 viename</span> robotu
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium mb-6">
          <strong className="text-slate-900 font-bold">1200 integruotų video receptų</strong>, kurie veda jus žingsnis po žingsnio.
          Robotas automatiškai nustato laiką ir temperatūrą: neįmanoma suklysti!
        </p>
        <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm mb-4 border border-green-200">
          <CheckCircle className="w-4 h-4" />
          <span>Apmokėjimas pristatymo metu</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden relative border border-slate-200 group">
              <img
                src={slides[currentSlide]}
                alt="Daugiafunkcis virtuvės robotas"
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
                <span className="text-slate-500 text-sm font-medium">4 847 teigiami atsiliepimai</span>
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-5xl md:text-6xl font-black text-orange-600" style={{ fontFamily: 'var(--font-montserrat)' }}>€69</span>
                <span className="text-xl text-slate-400 line-through">€449</span>
              </div>

              {/* Box Fiducia Rafforzato */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Saugus ir garantuotas pirkimas
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Apmokėjimas pristatymo metu
                  </li>
                  <li className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-blue-500" />
                    Užsakymo patvirtinimas telefonu
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-500" />
                    Pristatymas per 2-4 dienas
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    2 metų garantija
                  </li>
                </ul>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 px-8 rounded-2xl font-black text-xl transition-all shadow-lg hover:shadow-orange-200 mb-4"
              >
                UŽSAKYTI DABAR - MOKĖSITE PRISTATYMO METU
              </button>

              <p className="text-center text-slate-500 text-sm">
                Pasiūlymas galioja tik kol yra sandėlyje.
              </p>
            </div>

            {/* Benefici principali semplificati */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Kodėl verta rinktis:</h3>
              <div className="grid grid-cols-1 gap-4">

                {/* NUOVA CARD VIDEO RICETTE */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><PlayCircle className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">1200 video receptų</h4>
                    <p className="text-sm text-slate-600">Nemokate gaminti? Jokių problemų. Sekite vaizdo įrašus ekrane, o robotas padarys visa kita.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Utensils className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Viską paruošia per kelias sekundes</h4>
                    <p className="text-sm text-slate-600">Smulkina daržoves, mėsą ir trina vaisius be jokių pastangų.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><ChefHat className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Minko ir plaka kaip profesionalas</h4>
                    <p className="text-sm text-slate-600">Puikiai tinka naminiams duonos, picos ir desertų receptams.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Flame className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Automatinis ir sveikas gaminimas</h4>
                    <p className="text-sm text-slate-600">Gamina rizoto ir sriubas automatiškai maišydamas arba naudoja garą.</p>
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
            12 roboto funkcijų, paprastai paaiškintos
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
              Nereikia nieko mokytis: pasirinkite programą ir robotas viską padarys pats.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Laimi visais atžvilgiais</h2>
             <p className="text-slate-500">Palyginkite patys: štai kodėl tai apsimoka.</p>
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
                       <span className="text-xs uppercase font-bold text-slate-400">Tradicinis</span>
                       <X className="w-6 h-6 text-slate-300" />
                       <span className="text-sm font-medium text-slate-500 leading-tight">{row.without}</span>
                    </div>
                    <div className="p-4 bg-orange-50/50 flex flex-col items-center justify-center text-center gap-2">
                       <span className="text-xs uppercase font-bold text-orange-600">Robotas 12in1</span>
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
                    <th className="p-8 text-sm font-bold tracking-widest text-slate-400 uppercase w-1/3">Savybė</th>
                    <th className="p-8 text-sm font-bold tracking-widest text-slate-400 uppercase text-center w-1/3">Tradicinis būdas</th>
                    <th className="w-1/3 p-0">
                       <div className="bg-orange-600 text-white py-6 text-center font-black text-xl rounded-tl-3xl shadow-lg relative z-10">
                          ROBOTAS 12in1
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
          <h2 className="text-3xl font-black text-center text-slate-900 mb-12">Ką sako tie, kurie jau naudoja</h2>
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
            <h2 className="text-3xl md:text-4xl font-black mb-4">Gaukite į savo namus</h2>
            <p className="text-slate-400 text-lg">
              Užpildykite žemiau esančius duomenis, kad su jumis susisiektume telefonu ir patvirtintume pristatymą.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-800">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
              <div>
                <span className="block font-bold text-slate-900 text-lg">Virtuvės robotas 12 viename</span>
                <span className="text-slate-500 text-sm">Pristatymas per 2-4 darbo dienas</span>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="tmfp" />
              <div>
                <label className="block text-slate-700 font-bold mb-2">Vardas ir Pavardė</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Pvz. Jonas Jonaitis"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Telefono numeris</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Pvz. +370 612 34567"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Pristatymo adresas</label>
                <input
                  type="text"
                  name="address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Adresas, namo nr., miestas"
                  disabled={isSubmitting}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-5 rounded-2xl font-black text-xl transition-all shadow-xl flex items-center justify-center gap-3 ${
                  isSubmitting
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                }`}
              >
                {isSubmitting ? 'SIUNČIAMA...' : 'PATVIRTINTI UŽSAKYMĄ'}
              </button>

              <div className="flex items-center gap-2 justify-center text-slate-400 text-xs text-center mt-6">
                <Shield className="w-4 h-4" />
                <span>Gerbiame jūsų privatumą. Duomenys apsaugoti ir naudojami tik pristatymui.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white pb-32">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center text-slate-900 mb-10">Dažniausiai užduodami klausimai</h2>
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

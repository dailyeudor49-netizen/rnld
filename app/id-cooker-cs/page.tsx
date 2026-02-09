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

export default function RobotKuchynskyLanding() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [submitError, setSubmitError] = useState('');

  const slides = [
    '/images/multicooker/1.jpg',
    '/images/multicooker/2.jpg',
    '/images/multicooker/3.jpg',
    '/images/multicooker/4.jpg',
    '/images/multicooker/5.jpg',
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
      setSubmitError('Prosím vyplňte všechna pole.');
      return;
    }

    const phoneDigits = orderData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 9) {
      setSubmitError('Zadané telefonní číslo se zdá být neplatné.');
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
        offer: '2224',
        lp: '2263',
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

      router.push('/ty/ty-id-cooker-cs');
    } catch (error) {
      console.error(error);
      router.push('/ty/ty-id-cooker-cs');
    } finally {
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Počet funkcí", robot: "12 v 1 kompletní", without: "Pouze 1-2 funkce" },
    { feature: "Zabraný prostor", robot: "Minimální místo", without: "Přeplněná linka" },
    { feature: "Vaření", robot: "Automatické a přesné", without: "Musíte míchat ručně" },
    { feature: "Čištění", robot: "Rychlé, nepřilnavé", without: "Obtížné a únavné" },
    { feature: "Celková cena", robot: "Pouze 2 099 Kč", without: "Přes 10 000 Kč za více spotřebičů" },
  ];

  const faqs = [
    {
      question: "Jaké spotřebiče tento robot nahrazuje?",
      answer: "Tento robot byl navržen jako váš jediný pomocník v kuchyni. Nahrazuje mixér, hnětač těsta, sekáčku, parní hrnec, váhu a fritézu. S jedním spotřebičem připravíte jakýkoli recept – od předkrmů po dezerty."
    },
    {
      question: "Je snadný na ovládání i pro netechnické osoby?",
      answer: "Rozhodně ano. Navrhli jsme velmi jednoduchý a intuitivní ovládací panel. Stačí vybrat požadovanou funkci a stisknout start. Ideální pro ty, kteří hledají praktičnost bez komplikací."
    },
    {
      question: "Je mísa dostatečně velká?",
      answer: "Ano, mísa má kapacitu 6 litrů – ideální pro vaření pro celou rodinu nebo přípravu jídel do zásoby."
    },
    {
      question: "Jak probíhá platba?",
      answer: "Pro vaši maximální bezpečnost nabízíme platbu při převzetí. Zaplatíte 2 099 Kč přímo kurýrovi, když obdržíte produkt domů."
    },
    {
      question: "Má produkt záruku?",
      answer: "Samozřejmě. Produkt je krytý 24měsíční zárukou. Navíc máte 30 dní na vyzkoušení: pokud nebudete spokojeni, můžete ho bez problémů vrátit."
    }
  ];

  const reviews = [
    { nome: 'Jana M.', testo: 'Kvalita mě překvapila. Dělá to samé co mnohem dražší roboty. Připravuji rizoto a krémové polévky bez námahy. Skvělý pomocník pro ty, kdo mají málo času nebo chtějí vařit zdravě.', stelle: 5, data: '18. prosince 2024' },
    { nome: 'Tomáš K.', testo: 'Nikdy jsem nebyl dobrý kuchař, ale s tímto robotem se vše stalo jednoduchým. Boloňská omáčka vychází chutná a nemusím ji neustále hlídat.', stelle: 5, data: '15. prosince 2024' },
    { nome: 'Kateřina R.', testo: 'Uvolnila jsem hodně místa v kuchyni. Prodala jsem staré spotřebiče, protože tento dělá všechno. Vestavěná váha je velmi praktická.', stelle: 5, data: '12. prosince 2024' },
    { nome: 'Petr D.', testo: 'Solidní materiály a silný motor. Dobře seká i tu nejtvrdší zeleninu. Za 2 099 Kč to byl opravdu dobrý nákup.', stelle: 5, data: '8. prosince 2024' },
    { nome: 'Anna B.', testo: 'Velmi užitečný pro dětské příkrmy. Dám tam všechno a on to udělá. Čistí se bleskově, což je pro mě klíčové.', stelle: 5, data: '3. prosince 2024' },
    { nome: 'Josef L.', testo: 'Daroval jsem ho manželce a je velmi šťastná. Doručení bylo rychlé, pohodlně jsem zaplatil kurýrovi.', stelle: 5, data: '15. listopadu 2024' },
  ];

  const funzioniDodici = [
    { title: "Sekání", desc: "zelenina, maso, ořechy", icon: <Zap className="w-6 h-6 text-orange-600" /> },
    { title: "Mixování", desc: "krémové polévky, koktejly, kaše", icon: <Soup className="w-6 h-6 text-orange-600" /> },
    { title: "Hnětení těsta", desc: "na chléb, pizzu, dezerty", icon: <Utensils className="w-6 h-6 text-orange-600" /> },
    { title: "Šlehání", desc: "smetana, bílky, krémy", icon: <ChefHat className="w-6 h-6 text-orange-600" /> },
    { title: "Vaření", desc: "polévky, rizoto, omáčky", icon: <Flame className="w-6 h-6 text-orange-600" /> },
    { title: "Vaření v páře", desc: "zelenina, ryby, maso", icon: <Wind className="w-6 h-6 text-orange-600" /> },
    { title: "Automatické míchání", desc: "nemusíte stát u sporáku", icon: <RefreshCw className="w-6 h-6 text-orange-600" /> },
    { title: "Automatické opékání", desc: "bez připálení", icon: <Flame className="w-6 h-6 text-orange-600" /> },
    { title: "Lehké smažení", desc: "s malým množstvím nebo bez oleje", icon: <Zap className="w-6 h-6 text-orange-600" /> },
    { title: "Vestavěná váha", desc: "vážíte při vaření", icon: <Scale className="w-6 h-6 text-orange-600" /> },
    { title: "Časovač a regulace teploty", desc: "vaření vždy pod kontrolou", icon: <Timer className="w-6 h-6 text-orange-600" /> },
    { title: "Automatické programy", desc: "vyberte a stiskněte tlačítko", icon: <CheckCircle className="w-6 h-6 text-orange-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed text-slate-800 pb-20 md:pb-0">
      <Script
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <img
        src="https://offers.italiadrop.com/forms/api/ck/?o=2224&uid=019be502-1631-773c-b833-f6153c79c2cb&lp=2263"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      <div className="bg-slate-900 text-white text-center py-2 text-sm font-medium">
        Speciální nabídka na doplnění skladu - Omezená dostupnost
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl md:hidden">
        <div className="px-4 py-3">
          <button
            onClick={openOrderPopup}
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-transform"
          >
            <span>OBJEDNAT ZA 2 099 Kč</span>
          </button>
        </div>
      </div>

      <header className="pt-8 pb-6 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
          Zjednodušte si kuchyni s robotem <span className="text-orange-600">12 v 1</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium mb-6">
          <strong className="text-slate-900 font-bold">1200 integrovaných video receptů</strong>, které vás vedou krok za krokem.
          Robot automaticky nastaví čas a teplotu: nelze udělat chybu!
        </p>
        <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm mb-4 border border-green-200">
          <CheckCircle className="w-4 h-4" />
          <span>Platba při převzetí</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden relative border border-slate-200 group">
              <img
                src={slides[currentSlide]}
                alt="Multifunkční kuchyňský robot"
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

          <div className="space-y-6">
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <span className="text-slate-500 text-sm font-medium">4 847 pozitivních recenzí</span>
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-5xl md:text-6xl font-black text-orange-600" style={{ fontFamily: 'var(--font-montserrat)' }}>2 099 Kč</span>
                <span className="text-xl text-slate-400 line-through">4 199 Kč</span>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Bezpečný a garantovaný nákup
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Platba při převzetí
                  </li>
                  <li className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-blue-500" />
                    Telefonické potvrzení objednávky
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-500" />
                    Doručení za 2-4 dny
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    2letá záruka
                  </li>
                </ul>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 px-8 rounded-2xl font-black text-xl transition-all shadow-lg hover:shadow-orange-200 mb-4"
              >
                OBJEDNAT - PLATÍTE PŘI PŘEVZETÍ
              </button>

              <p className="text-center text-slate-500 text-sm">
                Nabídka platí do vyprodání zásob.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Proč si ho vybrat:</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><PlayCircle className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">1200 video receptů</h4>
                    <p className="text-sm text-slate-600">Neumíte vařit? Žádný problém. Sledujte videa na displeji a robot udělá zbytek.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Utensils className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Připraví vše během sekund</h4>
                    <p className="text-sm text-slate-600">Sekání zeleniny, masa a mixování ovoce bez námahy.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><ChefHat className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Hněte a šlehá jako profesionál</h4>
                    <p className="text-sm text-slate-600">Ideální pro domácí chléb, pizzu a dezerty.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Flame className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Automatické a zdravé vaření</h4>
                    <p className="text-sm text-slate-600">Vaří rizoto a polévky s automatickým mícháním nebo v páře.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center text-slate-900 mb-10">
            12 funkcí robota, jednoduše vysvětleno
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
              Nemusíte se nic učit: vyberte program a robot udělá vše sám.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Vyhrává ve všech směrech</h2>
             <p className="text-slate-500">Porovnejte sami: proto se to vyplatí.</p>
          </div>

          <div className="md:hidden space-y-6">
            {comparisonData.map((row, i) => (
              <div key={i} className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden relative">
                 <div className="p-6 pb-4">
                    <h3 className="text-lg font-bold text-slate-800 mb-1">{row.feature}</h3>
                 </div>
                 <div className="grid grid-cols-2 divide-x divide-slate-100 border-t border-slate-100">
                    <div className="p-4 bg-slate-50 flex flex-col items-center justify-center text-center gap-2">
                       <span className="text-xs uppercase font-bold text-slate-400">Klasický</span>
                       <X className="w-6 h-6 text-slate-300" />
                       <span className="text-sm font-medium text-slate-500 leading-tight">{row.without}</span>
                    </div>
                    <div className="p-4 bg-orange-50/50 flex flex-col items-center justify-center text-center gap-2">
                       <span className="text-xs uppercase font-bold text-orange-600">Robot 12v1</span>
                       <Check className="w-6 h-6 text-green-500" />
                       <span className="text-sm font-bold text-slate-900 leading-tight">{row.robot}</span>
                    </div>
                 </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-200 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-[35%] h-full bg-gradient-to-l from-orange-50/80 to-transparent -z-10" />
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="p-8 text-sm font-bold tracking-widest text-slate-400 uppercase w-1/3">Vlastnost</th>
                    <th className="p-8 text-sm font-bold tracking-widest text-slate-400 uppercase text-center w-1/3">Tradiční způsob</th>
                    <th className="w-1/3 p-0">
                       <div className="bg-orange-600 text-white py-6 text-center font-black text-xl rounded-tl-3xl shadow-lg relative z-10">
                          ROBOT 12v1
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

      <section id="reviews-section" className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center text-slate-900 mb-12">Co říkají ti, kteří ho již používají</h2>
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

      <section id="order-form-section" className="py-20 bg-slate-900 text-white">
        <div className="max-w-xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black mb-4">Získejte ho domů</h2>
            <p className="text-slate-400 text-lg">
              Vyplňte údaje níže, abychom vás mohli telefonicky kontaktovat a potvrdit doručení.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-800">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
              <div>
                <span className="block font-bold text-slate-900 text-lg">Kuchyňský robot 12 v 1</span>
                <span className="text-slate-500 text-sm">Doručení za 2-4 pracovní dny</span>
              </div>
              <div className="text-right">
                <span className="block text-3xl font-black text-orange-600">2 099 Kč</span>
                <span className="text-slate-400 line-through text-sm">4 199 Kč</span>
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
                <label className="block text-slate-700 font-bold mb-2">Jméno a příjmení</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Např. Jan Novák"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Telefonní číslo</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Např. +420 123 456 789"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Doručovací adresa</label>
                <input
                  type="text"
                  name="address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Ulice, číslo, město"
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
                {isSubmitting ? 'ODESÍLÁNÍ...' : 'POTVRDIT OBJEDNÁVKU'}
              </button>

              <div className="flex items-center gap-2 justify-center text-slate-400 text-xs text-center mt-6">
                <Shield className="w-4 h-4" />
                <span>Respektujeme vaše soukromí. Data jsou chráněna a používána pouze pro doručení.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white pb-32">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center text-slate-900 mb-10">Často kladené otázky</h2>
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

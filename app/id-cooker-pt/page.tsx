'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { saveUserDataToStorage } from '@/app/lib/facebook/capi';
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
      setSubmitError('Por favor, preencha todos os campos.');
      return;
    }

    const phoneDigits = orderData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 9) {
      setSubmitError('O número de telefone inserido parece inválido.');
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
        offer: '2219',
        lp: '2258',
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

      const response = await fetch('https://offers.italiadrop.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (response.ok) {
        saveUserDataToStorage({
          nome: orderData.name || '',
          cognome: '',
          telefono: orderData.phone || '',
          indirizzo: orderData.address || '',
        });
        router.push('/ty/ty-id-cooker-pt');
      } else {
        setSubmitError('Ocorreu um erro. Tente novamente.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitError('Ocorreu um erro. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Número de funções", robot: "12 em 1 completo", without: "Apenas 1-2 funções" },
    { feature: "Espaço ocupado", robot: "Espaço mínimo", without: "Bancada cheia" },
    { feature: "Cozinhar", robot: "Automático e preciso", without: "Precisa mexer manualmente" },
    { feature: "Limpeza", robot: "Rápida, antiaderente", without: "Difícil e cansativa" },
    { feature: "Custo total", robot: "Apenas 109€", without: "Mais de 400€ em vários aparelhos" },
  ];

  const faqs = [
    {
      question: "Que aparelhos este robô substitui?",
      answer: "Este robô foi projetado para ser o seu único ajudante na cozinha. Substitui liquidificador, batedeira, picador, panela a vapor, balança e fritadeira. Com um único aparelho, pode preparar qualquer receita – de entradas a sobremesas."
    },
    {
      question: "É fácil de usar para quem não percebe de tecnologia?",
      answer: "Com certeza. Projetámos um painel de controlo muito simples e intuitivo. Basta selecionar a função desejada e pressionar iniciar. Perfeito para quem procura praticidade sem complicações."
    },
    {
      question: "A tigela é suficientemente grande?",
      answer: "Sim, a tigela tem capacidade de 6 litros – ideal para cozinhar para toda a família ou preparar refeições com antecedência."
    },
    {
      question: "Como funciona o pagamento?",
      answer: "Para sua máxima segurança, oferecemos pagamento na entrega. Pagará 109€ diretamente ao estafeta quando receber o produto em casa."
    },
    {
      question: "O produto tem garantia?",
      answer: "Claro que sim. O produto está coberto por uma garantia de 24 meses. Além disso, tem 30 dias para experimentar: se não ficar satisfeito, pode devolvê-lo sem problemas."
    }
  ];

  const reviews = [
    { nome: 'Maria S.', testo: 'A qualidade surpreendeu-me. Faz o mesmo que robôs muito mais caros. Preparo risotto e sopas cremosas sem esforço. Excelente ajuda para quem tem pouco tempo ou quer cozinhar de forma saudável.', stelle: 5, data: '18 de dezembro de 2024' },
    { nome: 'João P.', testo: 'Nunca fui bom cozinheiro, mas com este robô tudo ficou simples. O molho bolonhesa fica delicioso e não preciso de estar sempre a vigiar.', stelle: 5, data: '15 de dezembro de 2024' },
    { nome: 'Ana R.', testo: 'Libertei muito espaço na cozinha. Vendi os aparelhos antigos porque este faz tudo. A balança integrada é muito prática.', stelle: 5, data: '12 de dezembro de 2024' },
    { nome: 'Pedro D.', testo: 'Materiais sólidos e motor potente. Pica bem até os legumes mais duros. Por 109€ foi uma compra muito boa.', stelle: 5, data: '8 de dezembro de 2024' },
    { nome: 'Sofia B.', testo: 'Muito útil para papas de bebé. Ponho tudo e ele faz. Limpa-se num instante, o que é fundamental para mim.', stelle: 5, data: '3 de dezembro de 2024' },
    { nome: 'António L.', testo: 'Ofereci à minha mulher e ela está muito feliz. A entrega foi rápida, paguei comodamente ao estafeta.', stelle: 5, data: '15 de novembro de 2024' },
  ];

  const funzioniDodici = [
    { title: "Picar", desc: "legumes, carne, frutos secos", icon: <Zap className="w-6 h-6 text-orange-600" /> },
    { title: "Misturar", desc: "sopas cremosas, batidos, papas", icon: <Soup className="w-6 h-6 text-orange-600" /> },
    { title: "Amassar", desc: "para pão, pizza, sobremesas", icon: <Utensils className="w-6 h-6 text-orange-600" /> },
    { title: "Bater", desc: "natas, claras, cremes", icon: <ChefHat className="w-6 h-6 text-orange-600" /> },
    { title: "Cozinhar", desc: "sopas, risotto, molhos", icon: <Flame className="w-6 h-6 text-orange-600" /> },
    { title: "Cozinhar a vapor", desc: "legumes, peixe, carne", icon: <Wind className="w-6 h-6 text-orange-600" /> },
    { title: "Mexer automático", desc: "não precisa de ficar junto ao fogão", icon: <RefreshCw className="w-6 h-6 text-orange-600" /> },
    { title: "Refogar automático", desc: "sem queimar", icon: <Flame className="w-6 h-6 text-orange-600" /> },
    { title: "Fritar levemente", desc: "com pouco ou sem óleo", icon: <Zap className="w-6 h-6 text-orange-600" /> },
    { title: "Balança integrada", desc: "pese enquanto cozinha", icon: <Scale className="w-6 h-6 text-orange-600" /> },
    { title: "Temporizador e controlo de temperatura", desc: "cozinha sempre sob controlo", icon: <Timer className="w-6 h-6 text-orange-600" /> },
    { title: "Programas automáticos", desc: "escolha e pressione o botão", icon: <CheckCircle className="w-6 h-6 text-orange-600" /> },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed text-slate-800 pb-20 md:pb-0">
      <Script
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <img
        src="https://offers.italiadrop.com/forms/api/ck/?o=2219&uid=019be502-1631-773c-b833-f6153c79c2cb&lp=2258"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* Barra superiore fissa per urgenza soft */}
      <div className="bg-slate-900 text-white text-center py-2 text-sm font-medium">
        Oferta especial de renovação de stock - Disponibilidade limitada
      </div>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl md:hidden">
        <div className="px-4 py-3">
          <button
            onClick={openOrderPopup}
            className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition-transform"
          >
            <span>ENCOMENDAR AGORA POR 109€</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <header className="pt-8 pb-6 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 leading-tight">
          Simplifique a sua cozinha com o robô <span className="text-orange-600">12 em 1</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 font-medium mb-6">
          <strong className="text-slate-900 font-bold">1200 vídeo-receitas integradas</strong> que o guiam passo a passo.
          O robô define automaticamente o tempo e a temperatura: impossível errar!
        </p>
        <div className="inline-flex items-center space-x-2 bg-green-50 text-green-700 px-4 py-2 rounded-full font-bold text-sm mb-4 border border-green-200">
          <CheckCircle className="w-4 h-4" />
          <span>Pagamento na entrega</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden relative border border-slate-200 group">
              <img
                src={slides[currentSlide]}
                alt="Robô de cozinha multifuncional"
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
                <span className="text-slate-500 text-sm font-medium">4.847 avaliações positivas</span>
              </div>

              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-5xl md:text-6xl font-black text-orange-600" style={{ fontFamily: 'var(--font-montserrat)' }}>109€</span>
                <span className="text-xl text-slate-400 line-through">219€</span>
              </div>

              {/* Box Fiducia Rafforzato */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 space-y-4">
                <h3 className="font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Compra segura e garantida
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-medium text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Pagamento na entrega
                  </li>
                  <li className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-blue-500" />
                    Confirmação telefónica
                  </li>
                  <li className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-orange-500" />
                    Entrega em 2-4 dias
                  </li>
                  <li className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-red-500" />
                    Garantia de 2 anos
                  </li>
                </ul>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 px-8 rounded-2xl font-black text-xl transition-all shadow-lg hover:shadow-orange-200 mb-4"
              >
                ENCOMENDAR AGORA - PAGUE NA ENTREGA
              </button>

              <p className="text-center text-slate-500 text-sm">
                Oferta válida até esgotar o stock.
              </p>
            </div>

            {/* Benefici principali semplificati */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Porquê escolhê-lo:</h3>
              <div className="grid grid-cols-1 gap-4">

                {/* NUOVA CARD VIDEO RICETTE */}
                <div className="flex items-start gap-4 p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><PlayCircle className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">1200 vídeo-receitas</h4>
                    <p className="text-sm text-slate-600">Não sabe cozinhar? Sem problema. Veja os vídeos no ecrã e o robô faz o resto.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Utensils className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Prepara tudo em segundos</h4>
                    <p className="text-sm text-slate-600">Picar legumes, carne e misturar fruta sem esforço.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><ChefHat className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Amassa e bate como um profissional</h4>
                    <p className="text-sm text-slate-600">Perfeito para pão caseiro, pizza e sobremesas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="bg-white p-2 rounded-lg shadow-sm"><Flame className="w-6 h-6 text-orange-600" /></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Cozinha automática e saudável</h4>
                    <p className="text-sm text-slate-600">Cozinha risotto e sopas com mexer automático ou a vapor.</p>
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
            12 funções do robô, explicadas simplesmente
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
              Não precisa aprender nada: escolha o programa e o robô faz tudo sozinho.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Vence em todos os aspetos</h2>
             <p className="text-slate-500">Compare você mesmo: eis porque vale a pena.</p>
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
                       <span className="text-xs uppercase font-bold text-slate-400">Clássico</span>
                       <X className="w-6 h-6 text-slate-300" />
                       <span className="text-sm font-medium text-slate-500 leading-tight">{row.without}</span>
                    </div>
                    <div className="p-4 bg-orange-50/50 flex flex-col items-center justify-center text-center gap-2">
                       <span className="text-xs uppercase font-bold text-orange-600">Robô 12em1</span>
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
                    <th className="p-8 text-sm font-bold tracking-widest text-slate-400 uppercase w-1/3">Característica</th>
                    <th className="p-8 text-sm font-bold tracking-widest text-slate-400 uppercase text-center w-1/3">Forma tradicional</th>
                    <th className="w-1/3 p-0">
                       <div className="bg-orange-600 text-white py-6 text-center font-black text-xl rounded-tl-3xl shadow-lg relative z-10">
                          ROBÔ 12em1
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
          <h2 className="text-3xl font-black text-center text-slate-900 mb-12">O que dizem quem já usa</h2>
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
            <h2 className="text-3xl md:text-4xl font-black mb-4">Receba em casa</h2>
            <p className="text-slate-400 text-lg">
              Preencha os dados abaixo para que possamos contactá-lo por telefone e confirmar a entrega.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl text-slate-800">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100">
              <div>
                <span className="block font-bold text-slate-900 text-lg">Robô de cozinha 12 em 1</span>
                <span className="text-slate-500 text-sm">Entrega em 2-4 dias úteis</span>
              </div>
              <div className="text-right">
                <span className="block text-3xl font-black text-orange-600">109€</span>
                <span className="text-slate-400 line-through text-sm">219€</span>
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
                <label className="block text-slate-700 font-bold mb-2">Nome completo</label>
                <input
                  type="text"
                  name="name"
                  value={orderData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Ex. João Silva"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Número de telefone</label>
                <input
                  type="tel"
                  name="phone"
                  value={orderData.phone}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Ex. +351 912 345 678"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Morada de entrega</label>
                <input
                  type="text"
                  name="address"
                  value={orderData.address}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                  placeholder="Rua, número, cidade"
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
                {isSubmitting ? 'A ENVIAR...' : 'CONFIRMAR ENCOMENDA'}
              </button>

              <div className="flex items-center gap-2 justify-center text-slate-400 text-xs text-center mt-6">
                <Shield className="w-4 h-4" />
                <span>Respeitamos a sua privacidade. Os dados são protegidos e usados apenas para a entrega.</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white pb-32">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-black text-center text-slate-900 mb-10">Perguntas frequentes</h2>
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

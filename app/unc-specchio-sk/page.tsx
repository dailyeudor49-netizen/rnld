"use client";

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { Check, Smartphone, MapPin, AlertTriangle, Settings, Plug, Camera, Moon, Truck, ShieldCheck, Gift } from 'lucide-react';
import { saveUserDataToStorage } from '@/app/lib/facebook/capi';

export default function Page() {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({ h: 2, m: 47, s: 33 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', phone: '', addressFull: '' });
  const [formErrors, setFormErrors] = useState<Partial<Record<string, string>>>({});
  const [isDuplicate, setIsDuplicate] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const checkDuplicatePhone = (phone: string): boolean => {
    const STORAGE_KEY = 'unc_specchio_sk_submissions';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    try {
      const submissions: { phone: string; timestamp: number }[] = JSON.parse(stored);
      const normalizedPhone = phone.replace(/\D/g, '');
      return submissions.some(s => s.phone === normalizedPhone);
    } catch { return false; }
  };

  const checkDeviceSubmitted = (): boolean => {
    return localStorage.getItem('unc_specchio_sk_device_submitted') === 'true';
  };

  const saveSubmission = (phone: string) => {
    const STORAGE_KEY = 'unc_specchio_sk_submissions';
    const normalizedPhone = phone.replace(/\D/g, '');
    const stored = localStorage.getItem(STORAGE_KEY);
    let submissions: { phone: string; timestamp: number }[] = [];
    try { if (stored) submissions = JSON.parse(stored); } catch { submissions = []; }
    submissions.push({ phone: normalizedPhone, timestamp: Date.now() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    localStorage.setItem('unc_specchio_sk_device_submitted', 'true');
  };

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 0; m = 0; s = 0; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');
  const scrollToOffer = () => document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!formData.fullName) errors.fullName = "Meno a priezvisko sú povinné";
    if (!formData.phone) errors.phone = "Telefón je povinný";
    if (!formData.addressFull) errors.addressFull = "Adresa je povinná";
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    if (checkDuplicatePhone(formData.phone)) {
      setIsDuplicate(true);
      setFormErrors({ phone: 'Toto telefónne číslo je už zaregistrované. Čoskoro vás budeme kontaktovať!' });
      return;
    }
    if (checkDeviceSubmitted()) {
      setIsDuplicate(true);
      setFormErrors({ phone: 'Z tohto zariadenia už bola odoslaná objednávka.' });
      return;
    }
    setIsSubmitting(true);
    try {
      const tmfpInput = document.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const params = new URLSearchParams({
        uid: '019a913a-422a-770d-8b80-6aa9c3b58776', key: 'e0b35b6504ae459988cf25', offer: '3847', lp: '3887',
        name: formData.fullName, tel: formData.phone, 'street-address': formData.addressFull,
        ua: navigator.userAgent, tmfp: tmfpInput?.value || '',
      });
      const urlParams = new URLSearchParams(window.location.search);
      ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k => { const v = urlParams.get(k); if (v) params.append(k, v); });
      await fetch('https://offers.adricenetwork.com/forms/api/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() });
      saveSubmission(formData.phone);
      saveUserDataToStorage({ nome: formData.fullName, cognome: '', telefono: formData.phone, indirizzo: formData.addressFull });
      window.location.href = '/ty/ty-unc-specchio-sk';
    } catch { saveUserDataToStorage({ nome: formData.fullName, cognome: '', telefono: formData.phone, indirizzo: formData.addressFull }); window.location.href = '/ty/ty-unc-specchio-sk'; }
    finally { setIsSubmitting(false); }
  };

  const faqs = [
    { q: "Dá sa namontovať na akékoľvek auto?", a: "Áno, pripevní sa na pôvodné spätné zrkadlo pomocou nastaviteľných gumových pásov. Kompatibilné s väčšinou vozidiel." },
    { q: "Potrebujem technika na inštaláciu?", a: "Nie, inštalácia je jednoduchá a trvá asi 15-20 minút. Stačí pripevniť, pripojiť napájací kábel a umiestniť zadnú kameru." },
    { q: "Ako sa napája?", a: "Pripojí sa k zásuvke zapaľovača cigariet alebo cez USB/USB-C port, ak je k dispozícii. Pre nepretržitý parkovací režim je možné použiť voliteľnú kabeláž." },
    { q: "Je nahrávanie nepretržité?", a: "Áno, nahráva v slučke a prepisuje najstaršie súbory, keď sa pamäť zaplní. Videá s nárazmi sú automaticky chránené G-senzorom." },
    { q: "Akú microSD kartu potrebujem?", a: "Podporuje microSD do 128GB. Pre 4K nahrávanie sa odporúča karta triedy U3 alebo vyššej." },
    { q: "Ako stiahnem videá?", a: "Cez špecializovanú aplikáciu cez Wi-Fi 5 GHz. Môžete tiež vybrať microSD a prečítať ju adaptérom." },
    { q: "Je záruka?", a: "Áno, zákonná záruka 24 mesiacov. Navyše ponúkame jednoduché vrátenie do 30 dní od doručenia." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900 pb-20 md:pb-0">
      <Script src="https://offers.adricenetwork.com/forms/tmfp/" crossOrigin="anonymous" strategy="afterInteractive" />

      <div className="bg-slate-900 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest py-2 text-center px-4">
        <span className="mx-2">Doprava zadarmo na Slovensko</span>
        <span className="mx-2 opacity-50">|</span>
        <span className="mx-2">Vrátenie do 30 dní</span>
        <span className="mx-2 opacity-50">|</span>
        <span className="mx-2">Bezpečné platby</span>
      </div>

      <section className="relative pt-6 pb-8 px-4 md:pt-10 md:pb-12 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase rounded-sm animate-pulse">Blesková ponuka</span>
              <div className="flex items-center gap-1 text-xs font-bold text-red-600">
                <span className="bg-red-100 px-1.5 py-0.5 rounded">{pad(countdown.h)}</span>:<span className="bg-red-100 px-1.5 py-0.5 rounded">{pad(countdown.m)}</span>:<span className="bg-red-100 px-1.5 py-0.5 rounded">{pad(countdown.s)}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[0.95] tracking-tight text-slate-900">
              NAHRÁVAJTE VŠETKO.<br/><span className="text-orange-600">SPREDU AJ ZOZADU.</span><br/>V 4K.
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-snug font-medium max-w-sm">
              Spätné zrkadlo, ktoré sa stane vaším poistením: ostré video, asistencia pri parkovaní a ovládanie z telefónu.
            </p>
            <div className="bg-white border border-slate-200 p-5 rounded-xl inline-block w-full md:w-auto text-left">
              <div className="flex flex-col items-start mb-3">
                <span className="text-slate-400 text-lg font-medium line-through mb-1">€149,90</span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wide mb-1">Dnes iba</span>
                <span className="text-4xl font-black text-slate-900 tracking-tight mb-2">€59,00</span>
                <div className="flex items-center gap-3">
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">Ušetríte €90,90</span>
                  <span className="text-xs text-slate-400">Obmedzená dostupnosť za túto cenu.</span>
                </div>
              </div>
              <button onClick={scrollToOffer} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wide rounded-xl transition-all duration-200 cursor-pointer px-8 text-lg py-3 mb-4">
                OBJEDNAŤ TERAZ – DOPRAVA ZADARMO
              </button>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wide"><Check className="w-4 h-4 text-green-500" /><span>Doručenie 24-48h</span></div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wide"><Check className="w-4 h-4 text-green-500" /><span>Jednoduché vrátenie do 30 dní</span></div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wide"><Check className="w-4 h-4 text-green-500" /><span>Zákaznícka podpora SK</span></div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-100/50 rounded-full blur-3xl opacity-50"></div>
            <img src="/images/specchio/hero.webp" alt="MirrorCam 4K Duo nainštalovaná v aute" className="relative rounded-2xl shadow-2xl border-4 border-white transform md:rotate-2 hover:rotate-0 transition-transform duration-500" referrerPolicy="no-referrer" />
            <div className="relative md:absolute mt-4 md:mt-0 md:bottom-10 md:-left-10 bg-white p-3 md:p-4 rounded-xl shadow-xl border border-slate-100 w-full md:w-auto md:max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full md:animate-pulse"></div>
                <span className="text-xs font-bold uppercase text-slate-500">Live Recording</span>
              </div>
              <p className="text-sm font-bold leading-tight">&quot;Zachránilo ma to pri zavinení nehody. Krištáľovo čisté video.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-orange-50 border-y border-orange-100 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {['Doprava Zadarmo', 'Vrátenie 30 Dní', 'Záruka 24 Mesiacov', 'Podpora SK'].map((b, i) => (
            <div key={i} className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-600 stroke-[3]" /><span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{b}</span></div>
          ))}
        </div>
      </div>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 uppercase tracking-tight">Prečo je iná ako ostatné</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "4K Spredu + 1080p Vzadu", desc: "Jasné detaily aj v noci, čitateľné ŠPZ." },
              { title: "Ovládanie zo smartfónu", desc: "Stiahnite a zdieľajte videá za 1 minútu cez Wi-Fi." },
              { title: "GPS v cene", desc: "Trasa a rýchlosť automaticky zaznamenané vo videu." },
              { title: "Širokouhlý záber 170°/140°", desc: "Menej mŕtvych uhlov, vidíte všetko čo sa deje." },
              { title: "Parkovací režim", desc: "Stráži vaše auto aj keď tam nie ste. (Môže vyžadovať voliteľnú kabeláž)" },
              { title: "Jednoduchá inštalácia", desc: "Pripevní sa na existujúce zrkadlo, nezavadzia." },
              { title: "Smart funkcie a podpora aplikácie", desc: "Nielen dashcam, ale inteligentné zrkadlo." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-5 rounded-xl shadow-sm border border-slate-100">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600 flex-shrink-0"><Check className="w-6 h-6 stroke-[3]" /></div>
                <div><h3 className="font-bold text-lg text-slate-900 mb-1">{item.title}</h3><p className="text-slate-600 text-sm leading-snug">{item.desc}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-tight">Inštalácia v 3 krokoch</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Settings, step: "KROK 1", title: "PRIPEVNITE NA ZRKADLO", desc: "Pripevní sa na pôvodné spätné zrkadlo pomocou pásov." },
              { icon: Plug, step: "KROK 2", title: "PRIPOJTE NAPÁJANIE", desc: "Napájanie cez zapaľovač cigariet, USB alebo USB-C (ak je k dispozícii). Pre parkovací režim je možné použiť voliteľnú kabeláž." },
              { icon: Camera, step: "KROK 3", title: "UMIESTNITE ZADNÚ KAMERU", desc: "Namontujte vzadu a nastavte uhol záberu." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center flex flex-col items-center">
                <div className="bg-slate-900 text-white p-4 rounded-full mb-4"><item.icon className="w-8 h-8" /></div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2">{item.step}</span>
                <h3 className="font-black text-lg uppercase mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: AlertTriangle, title: "DÔKAZY PRI NEHODE", text: "Ostré 4K videá: čitateľné ŠPZ a detaily, keď na tom naozaj záleží.", img: "/images/specchio/benefit-incident.webp" },
            { icon: MapPin, title: "PARKOVANIE BEZ STRESU", text: "Zadná kamera s vodiacimi čiarami: jednoduchšie a presnejšie manévrovanie.", img: "/images/specchio/benefit-parking.webp" },
            { icon: Smartphone, title: "VŠETKO V TELEFÓNE", text: "Otvorte aplikáciu, prezrite, uložte a zdieľajte videá bez PC.", img: "/images/specchio/benefit-apps.webp" },
            { icon: Moon, title: "NOC A TUNELY", text: "WDR + nočné videnie pre vyváženejšie a jasnejšie snímky.", img: "/images/specchio/benefit-night.webp" }
          ].map((card, i) => (
            <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={card.img} alt={card.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-orange-600"><card.icon className="w-5 h-5" /><span className="text-xs font-black uppercase tracking-widest">Výhoda #{i+1}</span></div>
                <h3 className="font-black text-xl leading-tight mb-3 uppercase">{card.title}</h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black uppercase mb-4 tracking-tight">Aplikácia a integrované smart funkcie</h2>
            <p className="text-xl text-slate-600 font-medium mb-6">Zrkadlo, ktoré nielen nahráva, ale integruje inteligentné funkcie pre každodennú jazdu.</p>
            <p className="text-slate-600 mb-6 leading-relaxed">Okrem duálnej 4K dashcam MirrorCam premení vaše zrkadlo na multimediálne centrum. Pristupujte k obľúbeným aplikáciám ako <strong>Google Maps</strong> a <strong>YouTube</strong>, a využívajte integráciu s <strong>Apple CarPlay</strong> a <strong>Android Auto</strong>.</p>
            <ul className="space-y-3 mb-6">
              {["Kompatibilné s Apple CarPlay a Android Auto", "GPS navigácia v reálnom čase s Google Maps", "Prehrávanie videa a zábava na YouTube", "Hudba, podcasty a hovory cez handsfree", "Plynulé a citlivé dotykové rozhranie"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><div className="bg-orange-100 p-1 rounded-full text-orange-600 mt-0.5"><Check className="w-4 h-4 stroke-[3]" /></div><span className="font-bold text-slate-800">{item}</span></li>
              ))}
            </ul>
            <p className="text-xs text-slate-400 italic">Dostupnosť a kompatibilita závisia od modelu a smartfónu.</p>
          </div>
          <div className="bg-slate-100 rounded-2xl p-8 flex items-center justify-center aspect-video shadow-inner">
            <img src="/images/specchio/smart-display.webp" alt="Smart rozhranie MirrorCam" className="rounded-xl shadow-lg border-4 border-white" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black uppercase mb-16 tracking-tight">Čísla hovoria jasne</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {[
              { val: "4K", label: "Predné rozlíšenie" },
              { val: "1080p", label: "Zadná kamera" },
              { val: "170°", label: "Širokouhlý záber" },
              { val: "5 GHz", label: "Wi-Fi smartfón" },
              { val: "GPS", label: "Anténa v cene" },
              { val: "Parking", label: "Parkovací režim (voliteľ.)" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-3xl md:text-4xl font-black text-orange-500 tracking-tighter">{stat.val}</span>
                <span className="text-xs md:text-sm font-bold uppercase text-slate-400 tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs mt-8">*Parkovací režim môže vyžadovať voliteľnú kabeláž v závislosti od vozidla.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10 uppercase">MirrorCam 4K vs Klasické dashcamy</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-900 text-white">
                <th className="text-left p-4 font-bold uppercase tracking-wide text-xs">Vlastnosť</th>
                <th className="p-4 font-bold uppercase tracking-wide text-xs text-center"><span className="text-orange-400">MirrorCam 4K</span></th>
                <th className="p-4 font-bold uppercase tracking-wide text-xs text-center">Klasická dashcam</th>
              </tr></thead>
              <tbody>
                {[
                  { f: "Predné rozlíšenie", m: "4K Ultra HD", c: "1080p" },
                  { f: "Zadná kamera v balení", m: true, c: false },
                  { f: "Vstavaný GPS", m: true, c: false },
                  { f: "Ovládanie cez aplikáciu", m: true, c: false },
                  { f: "Wi-Fi 5 GHz", m: true, c: false },
                  { f: "Parkovací režim", m: true, c: false },
                  { f: "Dotykový displej", m: "12 palcov", c: "Bez displeja" },
                  { f: "Inštalácia", m: "Pripevni a jazdí", c: "Prísavka + káble" },
                  { f: "Priemerná cena", m: "€59,00", c: "€80-150" }
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="p-4 font-medium text-slate-700">{row.f}</td>
                    <td className="p-4 text-center">{row.m === true ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : row.m === false ? <span className="text-red-400 font-bold">✕</span> : <span className="font-bold text-sm">{row.m}</span>}</td>
                    <td className="p-4 text-center">{row.c === true ? <Check className="w-5 h-5 text-green-600 mx-auto" /> : row.c === false ? <span className="text-red-400 font-bold">✕</span> : <span className="font-bold text-sm">{row.c}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black uppercase mb-8 text-center">Čo nájdete v balení</h2>
          <ul className="space-y-4">
            {["Zrkadlová dashcam 4K", "Zadná kamera 1080p vodotesná", "Externá GPS anténa", "Podpora microSD (do 128GB)*", "Napájací kábel s rôznymi koncovkami (USB – Type-C – zapaľovač)", "Gumové upínacie pásy", "Návod v slovenčine"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
                <span className="font-bold text-slate-800">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-400 mt-4 text-center">*microSD je súčasťou balenia len ak je to uvedené v aktuálnej ponuke.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 uppercase">Čo hovoria naši zákazníci</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Marek R.", loc: "Bratislava", text: "Nainštalovaná za 20 minút. Kvalita videa je ohromujúca, ŠPZ sa dajú čítať aj v noci. Appka je rýchla.", date: "jan 2026" },
              { name: "Lukáš B.", loc: "Košice", text: "Cítim sa oveľa bezpečnejšie. Parkovacia funkcia funguje skvele, prichytil som toho, kto mi poškriabal nárazník!", date: "feb 2026" },
              { name: "Jana T.", loc: "Žilina", text: "Skvelý produkt. Zrkadlo je veľké a vidno výborne. Zadná kamera veľmi pomáha pri tesných parkovaniach.", date: "jan 2026" },
              { name: "Peter M.", loc: "Banská Bystrica", text: "Blesková dodávka. Prišlo na druhý deň. Všetko podľa popisu. Odporúčam.", date: "feb 2026" },
              { name: "Róbert F.", loc: "Nitra", text: "Neuveriteľný pomer kvality a ceny. Vyskúšal som viacero, táto je najlepšia v ostrosti.", date: "jan 2026" },
              { name: "Elena S.", loc: "Trenčín", text: "Jednoduché na použitie, netreba byť odborník. Stačí naštartovať auto a všetko robí sama.", date: "feb 2026" }
            ].map((r, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-1 mb-3">{[...Array(5)].map((_, j) => <span key={j} className="text-orange-400 text-lg">★</span>)}</div>
                <p className="text-slate-700 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <div><p className="font-bold text-slate-900 text-sm">{r.name}</p><p className="text-slate-500 text-xs">{r.loc}</p></div>
                  <span className="text-xs text-slate-400">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10 uppercase">Často kladené otázky</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 transition-colors">
                  <span className="font-bold text-slate-900 text-sm pr-4">{faq.q}</span>
                  <span className="text-xl text-slate-400 flex-shrink-0">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="offer" ref={formRef} className="py-16 px-4 bg-gradient-to-b from-slate-50 to-orange-50">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <div className="bg-slate-900 p-6 text-center text-white">
              <h3 className="text-2xl font-bold mb-1">VYPLŇTE ÚDAJE PRE OBJEDNÁVKU</h3>
              <p className="text-orange-400 text-sm font-medium">Rýchle doručenie + Platba pri prevzatí</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <input type="hidden" name="tmfp" />
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-black text-slate-900">MirrorCam 4K Duo</span>
                    <p className="text-sm text-slate-600">+ Zadná kamera + GPS + Príslušenstvo</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">DOPRAVA ZADARMO</span>
                      <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">OBMEDZENÁ PONUKA</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 line-through text-sm block">€149,90</span>
                    <span className="text-3xl font-black text-green-700">€59<span className="text-lg">,00</span></span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Meno a priezvisko *</label>
                <input name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${formErrors.fullName ? 'border-red-500' : 'border-slate-300'}`} placeholder="Ján Novák" />
                {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefón (pre kuriéra) *</label>
                <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${formErrors.phone ? 'border-red-500' : 'border-slate-300'}`} placeholder="+421 912 345 678" />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Plná adresa *</label>
                <input name="addressFull" type="text" value={formData.addressFull} onChange={handleInputChange} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${formErrors.addressFull ? 'border-red-500' : 'border-slate-300'}`} placeholder="Hlavná 10, 811 01 Bratislava" />
                {formErrors.addressFull && <p className="text-red-500 text-xs mt-1">{formErrors.addressFull}</p>}
              </div>
              <div className="bg-orange-50 p-4 rounded-lg flex items-center justify-between border border-orange-100">
                <span className="font-bold text-slate-800">Spôsob platby:</span>
                <span className="flex items-center gap-2 font-bold text-orange-700"><Truck className="w-5 h-5" /> V hotovosti pri prevzatí</span>
              </div>
              <button type="submit" disabled={isSubmitting} className={`w-full py-4 px-4 rounded-xl font-black text-xl transition duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 text-white cursor-pointer shadow-lg transform hover:scale-[1.02]'}`}>
                {isSubmitting ? 'ODOSIELAM...' : 'OBJEDNAŤ TERAZ — PLATIŤ PRI PREVZATÍ'}
                {!isSubmitting && <Truck className="w-6 h-6" />}
              </button>
              <p className="text-center text-xs text-slate-400 mt-3">Vaše údaje sú chránené a šifrované SSL. Používame ich LEN na doručenie.</p>
              <div className="flex justify-center gap-6 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> SSL ochrana</span>
                <span className="flex items-center gap-1"><Gift className="w-3 h-3" /> Záruka vrátenia peňazí</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">Posledné kusy za túto cenu</h2>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 inline-block w-full md:w-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
              <div className="text-center md:text-right">
                <p className="text-slate-400 text-lg font-bold line-through decoration-red-500 decoration-2">€149,90</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Bežná cena</p>
              </div>
              <div className="text-6xl font-black text-white tracking-tighter">€59,00</div>
            </div>
            <div className="flex justify-center mb-8">
              <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase animate-pulse flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />Zostávajú len 4 kusy
              </div>
            </div>
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wide rounded-xl transition-all duration-200 cursor-pointer px-8 text-xl py-5">
              OBJEDNAŤ TERAZ – DOPRAVA ZADARMO
            </button>
            <p className="mt-4 text-xs text-slate-400 uppercase tracking-widest font-bold">Zákonná záruka 24 mesiacov • Jednoduché vrátenie do 30 dní</p>
          </div>
        </div>
      </section>

      <div className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 md:p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-bold text-slate-900 hidden md:inline text-lg">MirrorCam 4K Duo</span>
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
              <span className="text-xs text-slate-500 line-through">€149,90</span>
              <span className="text-xl font-black text-slate-900">€59,00</span>
            </div>
          </div>
          <button onClick={scrollToOffer} className="bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wide rounded-xl transition-all duration-200 cursor-pointer py-2 px-6 text-sm md:text-base">
            OBJEDNAŤ TERAZ
          </button>
        </div>
      </div>
    </div>
  );
}

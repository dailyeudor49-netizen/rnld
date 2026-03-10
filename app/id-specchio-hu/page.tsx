"use client";

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { saveUserDataToStorage } from '@/app/lib/facebook/capi';
import { Check, Smartphone, MapPin, AlertTriangle, Settings, Plug, Camera, Moon, Truck, ShieldCheck, Gift } from 'lucide-react';

export default function Page() {
  const router = useRouter();
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({ h: 2, m: 47, s: 33 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ fullName: '', phone: '', addressFull: '' });
  const [formErrors, setFormErrors] = useState<Partial<Record<string, string>>>({});
  const formRef = useRef<HTMLDivElement>(null);

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
    if (!formData.fullName) errors.fullName = "A név megadása kötelező";
    if (!formData.phone) errors.phone = "A telefonszám megadása kötelező";
    if (!formData.addressFull) errors.addressFull = "A cím megadása kötelező";
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setIsSubmitting(true);
    try {
      const tmfpInput = document.querySelector('input[name="tmfp"]') as HTMLInputElement;
      const params = new URLSearchParams({
        uid: '019be502-1631-773c-b833-f6153c79c2cb', key: 'cb7c9a2af5b95d10f17a18', offer: '1922', lp: '1961',
        name: formData.fullName, tel: formData.phone, 'street-address': formData.addressFull,
        ua: navigator.userAgent, tmfp: tmfpInput?.value || '',
      });
      const urlParams = new URLSearchParams(window.location.search);
      ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(k => { const v = urlParams.get(k); if (v) params.append(k, v); });
      await fetch('https://offers.italiadrop.com/forms/api/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: params.toString() });
      saveUserDataToStorage({
        nome: formData.fullName || '',
        cognome: '',
        telefono: formData.phone || '',
        indirizzo: formData.addressFull || '',
      });
      router.push('/ty/ty-id-specchio-hu');
    } catch {
      saveUserDataToStorage({
        nome: formData.fullName || '',
        cognome: '',
        telefono: formData.phone || '',
        indirizzo: formData.addressFull || '',
      });
      router.push('/ty/ty-id-specchio-hu');
    }
    finally { setIsSubmitting(false); }
  };

  const faqs = [
    { q: "Bármilyen autóra felszerelhető?", a: "Igen, az eredeti visszapillantó tükörre rögzíthető állítható gumiszíjakkal. A legtöbb járművel kompatibilis." },
    { q: "Kell hozzá szerelő?", a: "Nem, a felszerelés egyszerű, körülbelül 15-20 percet vesz igénybe. Csak rögzítse, csatlakoztassa a tápkábelt és helyezze el a hátsó kamerát." },
    { q: "Hogyan kap áramot?", a: "A szivargyújtó aljzathoz vagy USB/USB-C porthoz csatlakozik (ha van). A folyamatos parkolási módhoz opcionális kábelezés használható." },
    { q: "Folyamatos a felvétel?", a: "Igen, hurkolt felvételt készít, és felülírja a legrégebbi fájlokat, ha a memória megtelik. Az ütközéses videókat a G-szenzor automatikusan védi." },
    { q: "Milyen microSD kártyára van szükség?", a: "128 GB-os microSD-t támogat. 4K felvételhez U3 vagy magasabb osztályú kártya ajánlott." },
    { q: "Hogyan tölthetem le a videókat?", a: "A dedikált alkalmazáson keresztül 5 GHz-es Wi-Fi-n. A microSD kártyát is kiveheti és adapterrel olvashatja." },
    { q: "Van garancia?", a: "Igen, 24 hónapos törvényes garancia. Emellett a kézbesítéstől számított 30 napon belüli egyszerű visszaküldést kínálunk." }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900 pb-20 md:pb-0">
      <img src="https://offers.italiadrop.com/forms/api/ck/?o=1922&uid=019be502-1631-773c-b833-f6153c79c2cb&lp=1961" style={{ width: '1px', height: '1px', display: 'none' }} alt="" />
      <Script src="https://offers.italiadrop.com/forms/tmfp/" crossOrigin="anonymous" strategy="afterInteractive" />

      <div className="bg-slate-900 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest py-2 text-center px-4">
        <span className="mx-2">Ingyenes szállítás Magyarországon</span>
        <span className="mx-2 opacity-50">|</span>
        <span className="mx-2">30 napos visszaküldés</span>
        <span className="mx-2 opacity-50">|</span>
        <span className="mx-2">Biztonságos fizetés</span>
      </div>

      <section className="relative pt-6 pb-8 px-4 md:pt-10 md:pb-12 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 uppercase rounded-sm animate-pulse">Villámajánlat</span>
              <div className="flex items-center gap-1 text-xs font-bold text-red-600">
                <span className="bg-red-100 px-1.5 py-0.5 rounded">{pad(countdown.h)}</span>:<span className="bg-red-100 px-1.5 py-0.5 rounded">{pad(countdown.m)}</span>:<span className="bg-red-100 px-1.5 py-0.5 rounded">{pad(countdown.s)}</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[0.95] tracking-tight text-slate-900">
              RÖGZÍTSEN MINDENT.<br/><span className="text-orange-600">ELÖL ÉS HÁTUL.</span><br/>4K MINŐSÉGBEN.
            </h1>
            <p className="text-base md:text-lg text-slate-600 leading-snug font-medium max-w-sm">
              Visszapillantó tükör, ami a biztosítása lesz: éles videó, parkolási asszisztens és telefonos vezérlés.
            </p>
            <div className="bg-white border border-slate-200 p-5 rounded-xl inline-block w-full md:w-auto text-left">
              <div className="flex flex-col items-start mb-3">
                <span className="text-slate-400 text-lg font-medium line-through mb-1">42 999 Ft</span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wide mb-1">Ma csak</span>
                <span className="text-4xl font-black text-slate-900 tracking-tight mb-2">20 999 Ft</span>
                <div className="flex items-center gap-3">
                  <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2 py-1 rounded">Megtakarítás 22 000 Ft</span>
                  <span className="text-xs text-slate-400">Korlátozott elérhetőség ezen az áron.</span>
                </div>
              </div>
              <button onClick={scrollToOffer} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wide rounded-xl transition-all duration-200 cursor-pointer px-8 text-lg py-3 mb-4">
                MEGRENDELÉS – INGYENES SZÁLLÍTÁS
              </button>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wide"><Check className="w-4 h-4 text-green-500" /><span>Kiszállítás 24-48 óra</span></div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wide"><Check className="w-4 h-4 text-green-500" /><span>Egyszerű visszaküldés 30 napon belül</span></div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wide"><Check className="w-4 h-4 text-green-500" /><span>Magyar ügyfélszolgálat</span></div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-orange-100/50 rounded-full blur-3xl opacity-50"></div>
            <img src="/images/specchio/hero.webp" alt="MirrorCam 4K Duo autóba telepítve" className="relative rounded-2xl shadow-2xl border-4 border-white transform md:rotate-2 hover:rotate-0 transition-transform duration-500" referrerPolicy="no-referrer" />
            <div className="relative md:absolute mt-4 md:mt-0 md:bottom-10 md:-left-10 bg-white p-3 md:p-4 rounded-xl shadow-xl border border-slate-100 w-full md:w-auto md:max-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full md:animate-pulse"></div>
                <span className="text-xs font-bold uppercase text-slate-500">Live Recording</span>
              </div>
              <p className="text-sm font-bold leading-tight">&quot;Megmentett egy balesetkor. Kristálytiszta videó.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-orange-50 border-y border-orange-100 py-4 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {['Ingyenes Szállítás', 'Visszaküldés 30 Nap', '24 Hónapos Garancia', 'Magyar Támogatás'].map((b, i) => (
            <div key={i} className="flex items-center gap-2"><Check className="w-4 h-4 text-orange-600 stroke-[3]" /><span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{b}</span></div>
          ))}
        </div>
      </div>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-12 uppercase tracking-tight">Miért más, mint a többi</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "4K Elöl + 1080p Hátul", desc: "Éles részletek még éjszaka is, olvasható rendszámok." },
              { title: "Okostelefonos vezérlés", desc: "Töltse le és ossza meg a videókat 1 perc alatt Wi-Fi-n keresztül." },
              { title: "GPS az árban", desc: "Az útvonal és a sebesség automatikusan rögzítve a videóban." },
              { title: "170°/140° széles látószög", desc: "Kevesebb holttér, látja az összes eseményt." },
              { title: "Parkolási mód", desc: "Vigyáz az autójára, amikor Ön nincs ott. (Opcionális kábelezés szükséges lehet)" },
              { title: "Egyszerű telepítés", desc: "A meglévő tükörre rögzíthető, nem zavar." },
              { title: "Okos funkciók és alkalmazás-támogatás", desc: "Nem csak dashcam, hanem intelligens tükör." }
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
          <h2 className="text-3xl font-black text-center mb-12 uppercase tracking-tight">Telepítés 3 lépésben</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Settings, step: "1. LÉPÉS", title: "RÖGZÍTSE A TÜKÖRRE", desc: "Az eredeti visszapillantó tükörre rögzíthető pántokkal." },
              { icon: Plug, step: "2. LÉPÉS", title: "CSATLAKOZTASSA A TÁPOT", desc: "Tápellátás szivargyújtóról, USB-ről vagy USB-C-ről (ha elérhető). A parkolási módhoz opcionális kábelezés használható." },
              { icon: Camera, step: "3. LÉPÉS", title: "HELYEZZE EL A HÁTSÓ KAMERÁT", desc: "Szerelje fel hátulra és állítsa be a látószöget." }
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
            { icon: AlertTriangle, title: "BIZONYÍTÉK BALESETKOR", text: "Éles 4K videók: olvasható rendszámok és részletek, amikor igazán számít.", img: "/images/specchio/benefit-incident.webp" },
            { icon: MapPin, title: "STRESSZMENTES PARKOLÁS", text: "Hátsó kamera vezetővonalakkal: könnyebb és pontosabb manőverezés.", img: "/images/specchio/benefit-parking.webp" },
            { icon: Smartphone, title: "MINDEN A TELEFONBAN", text: "Nyissa meg az alkalmazást, nézze meg, mentse és ossza meg a videókat PC nélkül.", img: "/images/specchio/benefit-apps.webp" },
            { icon: Moon, title: "ÉJSZAKA ÉS ALAGUTAKBAN", text: "WDR + éjszakai látás a kiegyensúlyozottabb és tisztább képekért.", img: "/images/specchio/benefit-night.webp" }
          ].map((card, i) => (
            <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img src={card.img} alt={card.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-orange-600"><card.icon className="w-5 h-5" /><span className="text-xs font-black uppercase tracking-widest">Előny #{i+1}</span></div>
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
            <h2 className="text-3xl font-black uppercase mb-4 tracking-tight">Alkalmazás és beépített okos funkciók</h2>
            <p className="text-xl text-slate-600 font-medium mb-6">Egy tükör, amely nem csak rögzít, hanem intelligens funkciókat integrál a mindennapi vezetéshez.</p>
            <p className="text-slate-600 mb-6 leading-relaxed">A duális 4K dashcam mellett a MirrorCam multimédiás központtá alakítja a tükrét. Férjen hozzá kedvenc alkalmazásaihoz, mint a <strong>Google Maps</strong> és a <strong>YouTube</strong>, és használja az <strong>Apple CarPlay</strong> és <strong>Android Auto</strong> integrációt.</p>
            <ul className="space-y-3 mb-6">
              {["Kompatibilis az Apple CarPlay és Android Auto rendszerrel", "Valós idejű GPS navigáció a Google Maps-szel", "Videólejátszás és szórakozás a YouTube-on", "Zene, podcastok és kihangosított hívások", "Gördülékeny és érzékeny érintőképernyős kezelőfelület"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><div className="bg-orange-100 p-1 rounded-full text-orange-600 mt-0.5"><Check className="w-4 h-4 stroke-[3]" /></div><span className="font-bold text-slate-800">{item}</span></li>
              ))}
            </ul>
            <p className="text-xs text-slate-400 italic">Az elérhetőség és a kompatibilitás a modelltől és az okostelefontól függ.</p>
          </div>
          <div className="bg-slate-100 rounded-2xl p-8 flex items-center justify-center aspect-video shadow-inner">
            <img src="/images/specchio/smart-display.webp" alt="MirrorCam okos kezelőfelület" className="rounded-xl shadow-lg border-4 border-white" referrerPolicy="no-referrer" />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-3xl md:text-4xl font-black uppercase mb-16 tracking-tight">A számok magukért beszélnek</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
            {[
              { val: "4K", label: "Elülső felbontás" },
              { val: "1080p", label: "Hátsó kamera" },
              { val: "170°", label: "Széles látószög" },
              { val: "5 GHz", label: "Wi-Fi okostelefonhoz" },
              { val: "GPS", label: "Antenna az árban" },
              { val: "Parking", label: "Parkolási mód (opcionális)" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <span className="text-3xl md:text-4xl font-black text-orange-500 tracking-tighter">{stat.val}</span>
                <span className="text-xs md:text-sm font-bold uppercase text-slate-400 tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-500 text-xs mt-8">*A parkolási mód opcionális kábelezést igényelhet a járműtől függően.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-10 uppercase">MirrorCam 4K vs Hagyományos dashcamek</h2>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead><tr className="bg-slate-900 text-white">
                <th className="text-left p-4 font-bold uppercase tracking-wide text-xs">Jellemző</th>
                <th className="p-4 font-bold uppercase tracking-wide text-xs text-center"><span className="text-orange-400">MirrorCam 4K</span></th>
                <th className="p-4 font-bold uppercase tracking-wide text-xs text-center">Hagyományos dashcam</th>
              </tr></thead>
              <tbody>
                {[
                  { f: "Elülső felbontás", m: "4K Ultra HD", c: "1080p" },
                  { f: "Hátsó kamera a csomagban", m: true, c: false },
                  { f: "Beépített GPS", m: true, c: false },
                  { f: "Alkalmazásos vezérlés", m: true, c: false },
                  { f: "Wi-Fi 5 GHz", m: true, c: false },
                  { f: "Parkolási mód", m: true, c: false },
                  { f: "Érintőképernyő", m: "12 hüvelyk", c: "Kijelző nélkül" },
                  { f: "Telepítés", m: "Rögzítsd és menj", c: "Tapadókorong + kábelek" },
                  { f: "Átlagos ár", m: "20 999 Ft", c: "50 000-120 000 Ft" }
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
          <h2 className="text-3xl font-black uppercase mb-8 text-center">Mit tartalmaz a csomag</h2>
          <ul className="space-y-4">
            {["Tükrös dashcam 4K", "Hátsó kamera 1080p vízálló", "Külső GPS antenna", "MicroSD támogatás (max 128GB)*", "Tápkábel különböző csatlakozókkal (USB – Type-C – szivargyújtó)", "Gumi rögzítő pántok", "Magyar nyelvű útmutató"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="w-6 h-6 bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-bold">{i + 1}</div>
                <span className="font-bold text-slate-800">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-400 mt-4 text-center">*A microSD kártya csak akkor része a csomagnak, ha az aktuális ajánlatban feltüntetve.</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 uppercase">Vásárlóink véleménye</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Kovács Péter", loc: "Budapest", text: "20 perc alatt felszereltem. A videóminőség lenyűgöző, a rendszámok éjszaka is olvashatók. Az alkalmazás gyors.", date: "jan. 2026" },
              { name: "Nagy László", loc: "Debrecen", text: "Sokkal biztonságosabban érzem magam. A parkolási funkció kiválóan működik, elkapom azt, aki megkarcolta a lökhárítómat!", date: "feb. 2026" },
              { name: "Szabó Anna", loc: "Szeged", text: "Kiváló termék. A tükör nagy és jól látható. A hátsó kamera nagyon segít a szűk parkolásnál.", date: "jan. 2026" },
              { name: "Tóth Gábor", loc: "Miskolc", text: "Villámgyors szállítás. Másnap megérkezett. Minden a leírásnak megfelelő. Ajánlom.", date: "feb. 2026" },
              { name: "Horváth Róbert", loc: "Pécs", text: "Hihetetlen ár-érték arány. Többet kipróbáltam, ez a legjobb az élességben.", date: "jan. 2026" },
              { name: "Kiss Erzsébet", loc: "Győr", text: "Egyszerű a használata, nem kell szakértőnek lenni. Csak indítsa el az autót, és minden automatikusan működik.", date: "feb. 2026" }
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
          <h2 className="text-3xl font-black text-center mb-10 uppercase">Gyakran ismételt kérdések</h2>
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
              <h3 className="text-2xl font-bold mb-1">TÖLTSE KI A RENDELÉSI ADATOKAT</h3>
              <p className="text-orange-400 text-sm font-medium">Gyors kiszállítás + Utánvéttel fizetés</p>
            </div>
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
              <input type="hidden" name="tmfp" />
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-black text-slate-900">MirrorCam 4K Duo</span>
                    <p className="text-sm text-slate-600">+ Hátsó kamera + GPS + Tartozékok</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">INGYENES SZÁLLÍTÁS</span>
                      <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2 py-1 rounded">KORLÁTOZOTT AJÁNLAT</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 line-through text-sm block">42 999 Ft</span>
                    <span className="text-3xl font-black text-green-700">20 999<span className="text-lg"> Ft</span></span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Teljes név *</label>
                <input name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${formErrors.fullName ? 'border-red-500' : 'border-slate-300'}`} placeholder="Kovács János" />
                {formErrors.fullName && <p className="text-red-500 text-xs mt-1">{formErrors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Telefon (a futárnak) *</label>
                <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${formErrors.phone ? 'border-red-500' : 'border-slate-300'}`} placeholder="+36 30 123 4567" />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Teljes cím *</label>
                <input name="addressFull" type="text" value={formData.addressFull} onChange={handleInputChange} className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500 outline-none ${formErrors.addressFull ? 'border-red-500' : 'border-slate-300'}`} placeholder="Kossuth utca 10, 1054 Budapest" />
                {formErrors.addressFull && <p className="text-red-500 text-xs mt-1">{formErrors.addressFull}</p>}
              </div>
              <div className="bg-orange-50 p-4 rounded-lg flex items-center justify-between border border-orange-100">
                <span className="font-bold text-slate-800">Fizetési mód:</span>
                <span className="flex items-center gap-2 font-bold text-orange-700"><Truck className="w-5 h-5" /> Utánvéttel fizetés</span>
              </div>
              <button type="submit" disabled={isSubmitting} className={`w-full py-4 px-4 rounded-xl font-black text-xl transition duration-300 flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 text-white cursor-pointer shadow-lg transform hover:scale-[1.02]'}`}>
                {isSubmitting ? 'KÜLDÉS...' : 'MEGRENDELÉS – UTÁNVÉTTEL FIZETÉS'}
                {!isSubmitting && <Truck className="w-6 h-6" />}
              </button>
              <p className="text-center text-xs text-slate-400 mt-3">Az Ön adatait SSL titkosítással védjük. KIZÁRÓLAG a kiszállításhoz használjuk.</p>
              <div className="flex justify-center gap-6 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> SSL védelem</span>
                <span className="flex items-center gap-1"><Gift className="w-3 h-3" /> Pénzvisszafizetési garancia</span>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-900 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none">Utolsó darabok ezen az áron</h2>
          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/20 inline-block w-full md:w-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-6">
              <div className="text-center md:text-right">
                <p className="text-slate-400 text-lg font-bold line-through decoration-red-500 decoration-2">42 999 Ft</p>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Eredeti ár</p>
              </div>
              <div className="text-6xl font-black text-white tracking-tighter">20 999 Ft</div>
            </div>
            <div className="flex justify-center mb-8">
              <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase animate-pulse flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />Már csak 4 darab maradt
              </div>
            </div>
            <button onClick={scrollToOffer} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wide rounded-xl transition-all duration-200 cursor-pointer px-8 text-xl py-5">
              MEGRENDELÉS – INGYENES SZÁLLÍTÁS
            </button>
            <p className="mt-4 text-xs text-slate-400 uppercase tracking-widest font-bold">24 hónapos garancia • Egyszerű visszaküldés 30 napon belül</p>
          </div>
        </div>
      </section>

      <div className={`fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 md:p-4 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-bold text-slate-900 hidden md:inline text-lg">MirrorCam 4K Duo</span>
            <div className="flex flex-col md:flex-row md:items-baseline md:gap-2">
              <span className="text-xs text-slate-500 line-through">42 999 Ft</span>
              <span className="text-xl font-black text-slate-900">20 999 Ft</span>
            </div>
          </div>
          <button onClick={scrollToOffer} className="bg-orange-600 hover:bg-orange-700 text-white font-bold uppercase tracking-wide rounded-xl transition-all duration-200 cursor-pointer py-2 px-6 text-sm md:text-base">
            MEGRENDELÉS
          </button>
        </div>
      </div>
    </div>
  );
}

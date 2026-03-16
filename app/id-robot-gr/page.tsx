'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import { saveUserDataToStorage } from '@/app/lib/facebook/capi';
import {
  Star, CheckCircle, Shield, Zap, ChevronDown, ChevronLeft, ChevronRight,
  Timer, Truck, X, Wind, Battery, Navigation, Smartphone, Trash2, Droplets,
  Gauge, Volume2, Cpu, Wifi, Layers, Maximize, ShieldCheck, RefreshCw, ThumbsUp,
  Dog, Home, Clock, Sparkles
} from 'lucide-react';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default function RobotAspirapolvereProLanding() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [orderData, setOrderData] = useState({ name: '', phone: '', address: '' });
  const [submitError, setSubmitError] = useState('');
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60);
  const [stockLeft] = useState(4);
  const [openFeature, setOpenFeature] = useState<number | null>(null);

  const slides = [
    '/images/robot-asp/1.webp',
    '/images/robot-asp/2.webp',
    '/images/robot-asp/3.webp',
    '/images/robot-asp/4.webp',
    '/images/robot-asp/5.webp',
    '/images/robot-asp/6.webp',
  ];

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Auto-slide
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
      setSubmitError('Παρακαλώ συμπληρώστε όλα τα πεδία!');
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
        offer: '2371',
        lp: '2410',
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

      console.log('[Network API] Sending params:', params.toString());

      const response = await fetch('https://offers.italiadrop.com/forms/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      const responseText = await response.text();
      console.log('[Network API] Response status:', response.status);
      console.log('[Network API] Response body:', responseText);

      let responseOk = response.ok;
      try {
        const responseJson = JSON.parse(responseText);
        if (responseJson.status === 'error' || responseJson.error || responseJson.duplicate) {
          console.log('[Network API] Lead rejected by network:', responseJson);
          responseOk = false;
        }
      } catch { /* response is not JSON, use HTTP status */ }

      if (responseOk) {
        saveUserDataToStorage({
          nome: orderData.name || '',
          cognome: '',
          telefono: orderData.phone || '',
          indirizzo: orderData.address || '',
        });
        router.push('/ty/ty-id-robot-gr');
      } else {
        setSubmitError('Παρουσιάστηκε σφάλμα. Δοκιμάστε ξανά.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('[Network API] Error:', error);
      setSubmitError('Παρουσιάστηκε σφάλμα. Δοκιμάστε ξανά.');
      setIsSubmitting(false);
    }
  };

  const comparisonData = [
    { feature: "Σκούπισμα + Σφουγγάρισμα", robot: "ΚΑΙ ΤΑ ΔΥΟ ΠΕΡΙΛΑΜΒΑΝΟΝΤΑΙ", without: "Μόνο σκούπισμα" },
    { feature: "Άδειασμα", robot: "ΑΥΤΟΜΑΤΟ 60 ΗΜΕΡΕΣ", without: "Χειροκίνητο κάθε μέρα" },
    { feature: "Τρίχες & μαλλιά", robot: "ΒΟΥΡΤΣΑ ANTI-TANGLE", without: "Μπλέκονται και μπλοκάρουν" },
    { feature: "Πλοήγηση", robot: "LIDAR LASER 360°", without: "Τυχαία, χτυπάει παντού" },
    { feature: "Φίλτρο αλλεργιών", robot: "HEPA H13 ΠΙΣΤΟΠΟΙΗΜΕΝΟ", without: "Βασικό φίλτρο" },
    { feature: "Συνολική τιμή", robot: "€79 ΜΕ ΣΤΑΘΜΟ", without: "€500+ για τις ίδιες λειτουργίες" },
  ];

  const faqs = [
    {
      question: "Πώς λειτουργεί η πληρωμή;",
      answer: "Πληρώνετε κατά την παράδοση, μετρητά στον κούριερ. Δεν χρειάζεται να πληρώσετε τίποτα online. Συμπληρώστε τη φόρμα, θα σας καλέσουμε για επιβεβαίωση και θα λάβετε το πακέτο σε 24-48 ώρες. Χωρίς ρίσκο."
    },
    {
      question: "Πρέπει να το αδειάζω κάθε μέρα;",
      answer: "Όχι, ο σταθμός το αδειάζει αυτόματα σε σακούλα 3 λίτρων. Αλλάζετε τη σακούλα κάθε 2 μήνες. Δεν αγγίζετε ποτέ τη σκόνη."
    },
    {
      question: "Λειτουργεί με τρίχες κατοικίδιων;",
      answer: "Ναι, η βούρτσα anti-tangle είναι σχεδιασμένη για τρίχες και μακριά μαλλιά. Δεν κολλάει ποτέ. Πάνω από 800 πελάτες με κατοικίδια το επιβεβαιώνουν."
    },
    {
      question: "Τι γίνεται αν δεν μου αρέσει;",
      answer: "Έχετε 30 ημέρες για επιστροφή. Πλήρης επιστροφή χρημάτων, δωρεάν επιστροφή, χωρίς ερωτήσεις. Αλλά το 96% των πελατών το κρατάει."
    }
  ];

  const reviews = [
    { nome: 'Γιώργος Κ.', paese: 'Ελλάδα', flag: '🇬🇷', testo: 'Τρία μεγάλα σκυλιά. Σκούπιζα ΚΑΘΕ ΜΕΡΑ. Με αυτό το ρομπότ, σκουπίζω μια φορά την ΕΒΔΟΜΑΔΑ για τις γωνίες. Το 90% της δουλειάς το κάνει αυτό. Η καλύτερη αγορά των τελευταίων 5 χρόνων.', stelle: 5, data: 'πριν 5 μέρες', risposta: 'Γιώργο, ευχαριστούμε! Οι ιδιοκτήτες κατοικίδιων είναι οι πιο ικανοποιημένοι πελάτες μας.' },
    { nome: 'Μαρία Ν.', paese: 'Ελλάδα', flag: '🇬🇷', testo: 'Ο άντρας μου ήταν σκεπτικός. "Σε αυτή την τιμή θα είναι παιχνίδι". Μετά από 2 εβδομάδες μου ζήτησε συγγνώμη. Καθαρίζει ΚΑΛΥΤΕΡΑ από το παλιό μας Roomba των €600. Ο σταθμός που αδειάζει μόνος του είναι ιδιοφυής.', stelle: 5, data: 'πριν 1 εβδομάδα' },
    { nome: 'Νίκος Σ.', paese: 'Κύπρος', flag: '🇨🇾', testo: 'Διαμέρισμα 85τμ σε δύο επίπεδα. Το μεταφέρω πάνω-κάτω και κάνει τα πάντα μόνο του. Μπαταρία ατελείωτη, δεν χρειάστηκε ποτέ να το σταματήσω στη μέση. Πολύ αθόρυβο, το βάζω να δουλεύει ενώ δουλεύω από το σπίτι.', stelle: 5, data: 'πριν 3 μέρες', risposta: 'Νίκο, ακριβώς! Η μπαταρία 5200mAh εγγυάται έως 6 ώρες!' },
    { nome: 'Ελένη Λ.', paese: 'Ελλάδα', flag: '🇬🇷', testo: 'Είμαι 68 χρονών με προβλήματα στη μέση. Δεν μπορώ πια να σκουπίζω. Αυτό το ρομπότ μου άλλαξε τη ζωή. Το προγραμματίζω και κάνει τα πάντα. Επιτέλους μπορώ να απολαμβάνω καθαρό σπίτι χωρίς πόνους.', stelle: 5, data: 'πριν 4 μέρες' },
    { nome: 'Δημήτρης Β.', paese: 'Ελλάδα', flag: '🇬🇷', testo: 'Αλλεργικός στα ακάρεα από πάντα. Από τότε που χρησιμοποιώ αυτό το ρομπότ με φίλτρο HEPA, ξυπνάω χωρίς βουλωμένη μύτη. Η διαφορά είναι ΤΕΡΑΣΤΙΑ. Έπρεπε να το αγοράσω πριν χρόνια.', stelle: 5, data: 'πριν 2 εβδομάδες', risposta: 'Δημήτρη, το φίλτρο HEPA H13 κάνει πραγματικά τη διαφορά για όσους υποφέρουν από αλλεργίες!' },
    { nome: 'Κατερίνα Β.', paese: 'Ελλάδα', flag: '🇬🇷', testo: 'Σύγκρινα αυτό με το Roborock των €900 του κουνιάδου μου. ΙΔΙΕΣ ΛΕΙΤΟΥΡΓΙΕΣ. Δεν μπορούσε να το πιστέψει. Του έδειξα τον σταθμό που αδειάζει και πλένει. Τώρα θέλει κι αυτός ένα.', stelle: 5, data: 'πριν 1 εβδομάδα' },
    { nome: 'Σοφία Μ.', paese: 'Ελλάδα', flag: '🇬🇷', testo: 'Σπίτι με 3 γάτες. Οι τρίχες ήταν εφιάλτης. Τώρα το ρομπότ περνάει 2 φορές τη μέρα και το σπίτι είναι πάντα τέλειο. Οι επισκέπτες δεν πιστεύουν ότι έχω 3 γάτες. ΤΟ ΚΑΛΥΤΕΡΟ ΔΩΡΟ που έκανα ποτέ στον εαυτό μου.', stelle: 5, data: 'πριν 6 μέρες' },
    { nome: 'Αντώνης Χ.', paese: 'Ελλάδα', flag: '🇬🇷', testo: 'Μεγάλος χειμώνας, σπίτι πάντα κλειστό. Η σκόνη μαζευόταν γρήγορα. Τώρα το ρομπότ καθαρίζει κάθε μέρα ενώ είμαι στη δουλειά. Γυρνάω σπίτι και αναπνέω καθαρό αέρα. Αξίζει κάθε λεπτό.', stelle: 5, data: 'πριν 10 μέρες', risposta: 'Αντώνη, ακριβώς! Τέλειο για τους ελληνικούς χειμώνες.' },
    { nome: 'Χριστίνα Τ.', paese: 'Ελλάδα', flag: '🇬🇷', testo: 'Μακριά μαλλιά παντού, ήταν ο εφιάλτης μου. Αυτό το ρομπότ τα απορροφά ΟΛΑ χωρίς να μπλέκεται. Η βούρτσα δεν μπλοκάρει ποτέ. Δοκίμασα 3 ρομπότ πριν από αυτό, επιτέλους ένα που δουλεύει!', stelle: 5, data: 'πριν 8 μέρες' },
    { nome: 'Παναγιώτης Π.', paese: 'Ελλάδα', flag: '🇬🇷', testo: 'Το χρησιμοποιώ εδώ και 2 μήνες, κάθε μέρα. Μηδέν προβλήματα. Η ποιότητα είναι ίδια με ρομπότ των €1000. Εξοικονόμησα μια περιουσία και έχω πάντα καθαρό σπίτι. Το συνιστώ σε όλους.', stelle: 5, data: 'πριν 12 μέρες', risposta: 'Παναγιώτη, ευχαριστούμε για την εμπιστοσύνη! Η ποιότητα μιλάει από μόνη της.' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden font-sans leading-relaxed">
      {/* Fingerprint Script */}
      <Script
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* Click Pixel */}
      <img
        src="https://offers.italiadrop.com/forms/api/ck/?o=2371&uid=019be502-1631-773c-b833-f6153c79c2cb&lp=2410"
        style={{ width: '1px', height: '1px', display: 'none' }}
        alt=""
      />

      {/* Fixed CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t-2 border-blue-600 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-red-600 font-bold text-sm animate-pulse">Μόνο {stockLeft} απομένουν!</span>
            <span className="text-green-700 font-black text-xl">€79,00</span>
          </div>
          <button
            onClick={openOrderPopup}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 rounded-xl font-black text-lg hover:from-blue-700 hover:to-indigo-800 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>ΠΑΡΑΓΓΕΙΛΤΕ ΤΩΡΑ - ΠΛΗΡΩΜΗ ΚΑΤΑ ΤΗΝ ΠΑΡΑΔΟΣΗ</span>
          </button>
        </div>
      </div>

      {/* URGENCY HEADER BAR */}
      <div className="bg-red-600 text-white py-2 text-center font-bold text-sm px-4">
        <div className="flex items-center justify-center gap-2">
          <Timer className="w-4 h-4 animate-pulse" />
          <span>ΑΣΤΡΑΠΙΑΙΑ ΠΡΟΣΦΟΡΑ - Λήγει σε: {formatTime(timeLeft)}</span>
        </div>
      </div>

      {/* Hero Title Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 pt-6 pb-4 md:py-8 px-4 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-red-500 text-white text-sm md:text-base font-bold py-2 px-4 rounded-full inline-block mb-4 animate-pulse">
            ΟΛΙΚΗ ΕΚΚΑΘΑΡΙΣΗ — ΤΕΛΕΥΤΑΙΑ {stockLeft} ΤΕΜΑΧΙΑ
          </div>
          <h1 className="text-2xl md:text-4xl font-black mb-4 leading-tight tracking-tight">
            ΣΚΟΥΠΙΖΕΙ, ΣΦΟΥΓΓΑΡΙΖΕΙ ΚΑΙ ΑΔΕΙΑΖΕΙ<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">ΜΕ ΕΝΑ ΠΕΡΑΣΜΑ</span>
          </h1>
          <p className="text-lg md:text-xl mb-4 text-gray-300">
            Πετάξτε σφουγγαρίστρα, κουβά και σκούπα. <span className="font-bold text-white">Αυτός κάνει τα πάντα μόνος του.</span>
          </p>
          <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl p-4 inline-block">
            <span className="line-through text-gray-400 text-xl">€199,90</span>
            <span className="text-4xl md:text-5xl font-black text-white ml-3">€79<span className="text-2xl">,00</span></span>
            <span className="block text-green-400 font-bold mt-1">Σταθμός Αυτόματου Αδειάσματος ΠΕΡΙΛΑΜΒΑΝΕΤΑΙ (αξίας €199)</span>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <main className="max-w-6xl mx-auto px-4 pt-6 pb-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden relative border-2 border-gray-200">
              <img
                src={slides[currentSlide]}
                alt="Επαγγελματική Ρομποτική Σκούπα με Σταθμό"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-green-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg animate-bounce">
                ΣΤΑΘΜΟΣ ΠΕΡΙΛΑΜΒΑΝΕΤΑΙ!
              </div>
              <div className="absolute top-3 right-3 bg-red-600 text-white text-sm font-bold px-3 py-2 rounded-lg shadow-lg">
                -{Math.round((1 - 79/199.90) * 100)}%
              </div>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => { stopAutoSlide(); setCurrentSlide((prev) => (prev + 1) % slides.length); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow-lg transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex justify-center gap-2 overflow-x-auto pb-2">
              {slides.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => { stopAutoSlide(); setCurrentSlide(i); }}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 cursor-pointer flex-shrink-0 ${
                    i === currentSlide ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={slide} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Key Features Mobile */}
            <div className="bg-gray-50 rounded-xl p-5 text-left lg:hidden border border-gray-200">
              <h3 className="text-lg font-black text-gray-800 mb-3 text-center">Γιατί είναι διαφορετικό από τα άλλα:</h3>
              <ul className="space-y-3 text-gray-700 text-base">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Σκουπίζει και σφουγγαρίζει μαζί</strong> — Ένα πέρασμα, τέλεια πατώματα.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Trash2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Το ρομπότ αδειάζει μόνο του στη βάση</strong> — Αλλάζετε τη σακούλα κάθε 2 μήνες.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Dog className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Αντίο τρίχες και μαλλιά</strong> — Βούρτσα anti-tangle, δεν μπλοκάρει ποτέ.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Καθαρός αέρας</strong> — Φίλτρο HEPA πιάνει 99.97% αλλεργιογόνων.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Navigation className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Πλοήγηση λέιζερ</strong> — Χαρτογραφεί το σπίτι, δεν χτυπάει στα έπιπλα.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            {/* Price Box */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 mb-6 shadow-xl relative overflow-hidden">
              {/* Sconto Badge */}
              <div className="absolute -top-1 -right-1 bg-red-600 text-white text-base font-black w-20 h-20 rounded-bl-3xl shadow-lg flex items-center justify-center text-center leading-tight transform rotate-0">
                -60%
              </div>

              <h2 className="text-xl font-black text-gray-900 mb-1">
                NovaClean X1 PRO + Σταθμός OMNI
              </h2>
              <p className="text-sm text-gray-500 mb-2">Επαγγελματική Ρομποτική Σκούπα και Σφουγγαρίστρα</p>

              <div
                className="flex items-center space-x-2 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-bold">4.9/5</span>
                <span className="text-gray-500 text-sm underline">(1.248 κριτικές)</span>
              </div>

              {/* Price */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 line-through text-xl">€199,90</span>
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">ΕΞΟΙΚΟΝΟΜΕΙΤΕ €120,90</span>
                </div>
                <div className="text-center">
                  <span className="text-5xl font-black text-green-700">€79<span className="text-2xl">,00</span></span>
                </div>
              </div>

              {/* Delivery & Payment */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700">Παράδοση:</span>
                  <span className="font-bold text-gray-900 ml-auto">24-48 ώρες</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></span>
                  <span className="text-gray-700">Πληρωμή:</span>
                  <span className="font-bold text-gray-900 ml-auto">Κατά την παράδοση</span>
                </div>
              </div>

              <button
                onClick={openOrderPopup}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white py-4 px-6 rounded-xl font-black text-lg transition-all cursor-pointer shadow-lg transform hover:scale-[1.02]"
              >
                ΠΑΡΑΓΓΕΙΛΤΕ ΤΩΡΑ — ΠΛΗΡΩΜΗ ΚΑΤΑ ΤΗΝ ΠΑΡΑΔΟΣΗ
              </button>

              {/* Urgency */}
              <div className="flex items-center justify-center gap-2 mt-3 text-red-600 font-bold">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span>Μόνο {stockLeft} τεμάχια απομένουν σε αυτή την τιμή!</span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mt-4">
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <Shield className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <span className="text-gray-700 font-medium">Εγγύηση 2 έτη</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <RefreshCw className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <span className="text-gray-700 font-medium">Επιστροφή 30 ημέρες</span>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 border border-gray-100">
                  <ThumbsUp className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <span className="text-gray-700 font-medium">Υποστήριξη 24/7</span>
                </div>
              </div>
            </div>

            {/* Key Features Desktop */}
            <div className="hidden lg:block bg-gray-50 rounded-xl p-5 text-left border border-gray-200">
              <h3 className="text-lg font-black text-gray-800 mb-3 text-center">Γιατί είναι διαφορετικό από τα άλλα:</h3>
              <ul className="space-y-3 text-gray-700 text-base">
                <li className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Σκουπίζει και σφουγγαρίζει μαζί</strong> — Ένα πέρασμα, τέλεια πατώματα.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Trash2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Το ρομπότ αδειάζει μόνο του στη βάση</strong> — Αλλάζετε τη σακούλα κάθε 2 μήνες.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Dog className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Αντίο τρίχες και μαλλιά</strong> — Βούρτσα anti-tangle, δεν μπλοκάρει ποτέ.</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Καθαρός αέρας</strong> — Φίλτρο HEPA πιάνει 99.97% αλλεργιογόνων.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Navigation className="w-6 h-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-gray-800">Πλοήγηση λέιζερ</strong> — Χαρτογραφεί το σπίτι, δεν χτυπάει στα έπιπλα.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* PROBLEMA / AGITAZIONE */}
      <section className="py-10 md:py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-black text-center mb-8 text-gray-900 tracking-tight">
            Ξεχάστε το καθάρισμα.
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🦴</div>
              <h4 className="font-black text-gray-900 mb-1">Αντίο Πόνοι στη Μέση</h4>
              <p className="text-gray-500 text-sm">Δεν λυγίζετε πια. Αυτός περνάει παντού.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🧹</div>
              <h4 className="font-black text-gray-900 mb-1">Χέρια Πάντα Καθαρά</h4>
              <p className="text-gray-500 text-sm">Το ρομπότ αδειάζει μόνο του στη βάση. Δεν αγγίζετε ποτέ τη σκόνη.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">🐕</div>
              <h4 className="font-black text-gray-900 mb-1">Τρίχες Ζώων; Εξαφανίστηκαν</h4>
              <p className="text-gray-500 text-sm">Βούρτσα anti-tangle. Δεν κολλάει ποτέ.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-md text-center">
              <div className="text-3xl mb-2">💨</div>
              <h4 className="font-black text-gray-900 mb-1">Επιτέλους Καθαρός Αέρας</h4>
              <p className="text-gray-500 text-sm">Φίλτρο HEPA. Πιάνει 99.97% αλλεργιογόνων.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 text-white text-center shadow-2xl">
            <p className="text-lg md:text-xl mb-4">
              <span className="text-blue-400 font-bold">1.847 παραγγελίες</span> τις τελευταίες 24 ώρες
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">6000 Pa</div>
                <p className="text-xs text-gray-300">Ισχυρή αναρρόφηση</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">6 ώρες</div>
                <p className="text-xs text-gray-300">Ατελείωτη μπαταρία</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">2 μήνες</div>
                <p className="text-xs text-gray-300">Χωρίς άδειασμα</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">4.9/5</div>
                <p className="text-xs text-gray-300">1.248 κριτικές</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAZIONE FEATURE */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <div className="inline-block bg-blue-600 text-white text-sm font-bold px-4 py-1 rounded-full mb-4">
              ΠΕΡΙΛΑΜΒΑΝΕΤΑΙ ΣΤΗΝ ΤΙΜΗ (ΑΞΙΑΣ €199)
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-gray-900">
              Ο ΣΤΑΘΜΟΣ ΠΟΥ <span className="text-blue-600">ΕΞΑΛΕΙΦΕΙ ΚΑΘΕ ΚΟΠΟ ΣΑΣ</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Το ρομπότ επιστρέφει στη βάση, αδειάζει, πλένει τη σφουγγαρίστρα, φορτίζει. Η νέα σας προσωπική καθαρίστρια.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-start">
            {/* Box 1 */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 0 ? null : 0); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/svuota.webp" alt="Αυτόματο άδειασμα" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 0 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">ΤΟ ΡΟΜΠΟΤ ΑΔΕΙΑΖΕΙ ΜΟΝΟ ΤΟΥ ΣΤΗ ΒΑΣΗ</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 0 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 0 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Επιστρέφει στη βάση και αδειάζει ΜΟΝΟ ΤΟΥ σε σακούλα 3 λίτρων. <strong>Αλλάζετε τη σακούλα κάθε 2 μήνες.</strong> Ποτέ ξανά χέρια στη σκόνη. Ποτέ ξανά φτέρνισμα.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 0 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Αλλάζετε τη σακούλα κάθε 2 μήνες</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">ΤΟ ΡΟΜΠΟΤ ΑΔΕΙΑΖΕΙ ΜΟΝΟ ΤΟΥ ΣΤΗ ΒΑΣΗ</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 0 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 0 ? 'hidden' : 'mt-1'}`}>Αλλάζετε τη σακούλα κάθε 2 μήνες</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 0 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Επιστρέφει στη βάση και αδειάζει ΜΟΝΟ ΤΟΥ σε σακούλα 3 λίτρων. Αλλάζετε τη σακούλα κάθε 2 μήνες. Ποτέ ξανά χέρια στη σκόνη.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 2 */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 1 ? null : 1); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/mocio.webp" alt="Αυτόματο πλύσιμο" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 1 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">Η ΣΦΟΥΓΓΑΡΙΣΤΡΑ ΤΟΥ ΡΟΜΠΟΤ ΠΑΝΤΑ ΚΑΘΑΡΗ</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 1 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 1 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Μετά από κάθε σφουγγάρισμα, <strong>ο σταθμός πλένει τη σφουγγαρίστρα</strong> με καθαρό νερό. Εσείς δεν αγγίζετε τίποτα. Πατώματα πάντα τέλεια.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 1 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Ο σταθμός την πλένει για εσάς</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">Η ΣΦΟΥΓΓΑΡΙΣΤΡΑ ΤΟΥ ΡΟΜΠΟΤ ΠΑΝΤΑ ΚΑΘΑΡΗ</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 1 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 1 ? 'hidden' : 'mt-1'}`}>Ο σταθμός την πλένει για εσάς</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 1 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Μετά από κάθε σφουγγάρισμα, ο σταθμός πλένει τη σφουγγαρίστρα με καθαρό νερό. Εσείς δεν αγγίζετε τίποτα. Πατώματα πάντα τέλεια.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 2 ? null : 2); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/muffa.webp" alt="Στέγνωμα με ζέστη" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 2 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">ΑΝΤΙΟ ΜΥΡΩΔΙΑ ΚΑΙ ΜΟΥΧΛΑ</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 2 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 2 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Στεγνώνει τη σφουγγαρίστρα στους <strong>45°C</strong> μετά από κάθε πλύσιμο. Χωρίς βακτήρια, χωρίς κακές μυρωδιές. <strong>ΠΡΑΓΜΑΤΙΚΗ υγιεινή.</strong>
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 2 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Γρήγορο στέγνωμα στους 45°C</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">ΑΝΤΙΟ ΜΥΡΩΔΙΑ ΚΑΙ ΜΟΥΧΛΑ</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 2 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 2 ? 'hidden' : 'mt-1'}`}>Γρήγορο στέγνωμα στους 45°C</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 2 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Στεγνώνει τη σφουγγαρίστρα στους 45°C μετά από κάθε πλύσιμο. Χωρίς βακτήρια, χωρίς κακές μυρωδιές. ΠΡΑΓΜΑΤΙΚΗ υγιεινή.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 4 - Πλοήγηση + Μπαταρία */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 3 ? null : 3); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/laser.webp" alt="Πλοήγηση LiDAR" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 3 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">ΠΛΟΗΓΗΣΗ ΛΕΙΖΕΡ</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 3 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 3 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Χαρτογραφεί όλο το σπίτι με χιλιοστομετρική ακρίβεια. <strong>Αποφεύγει εμπόδια</strong>, δεν χτυπάει στα έπιπλα. Άδεια μπαταρία; <strong>Φορτίζει και συνεχίζει μόνος του.</strong>
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 3 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Χαρτογραφεί, αποφεύγει εμπόδια, δεν σταματάει ποτέ</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">ΠΛΟΗΓΗΣΗ ΛΕΙΖΕΡ</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 3 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 3 ? 'hidden' : 'mt-1'}`}>Χαρτογραφεί, αποφεύγει εμπόδια</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 3 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Χαρτογραφεί όλο το σπίτι με χιλιοστομετρική ακρίβεια. Αποφεύγει εμπόδια, δεν χτυπάει στα έπιπλα. Φορτίζει και συνεχίζει μόνος του.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 5 - Τρίχες και Μαλλιά */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 4 ? null : 4); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/6.webp" alt="Τρίχες και μαλλιά" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 4 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">ΑΝΤΙΟ ΤΡΙΧΕΣ ΚΑΙ ΜΑΛΛΙΑ</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 4 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 4 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Βούρτσα anti-tangle σχεδιασμένη για <strong>τρίχες ζώων, μακριά μαλλιά και επίμονη βρωμιά</strong>. Δεν κολλάει ποτέ. Απορροφά τα πάντα με το πρώτο πέρασμα.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 4 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Βούρτσα anti-tangle, δεν μπλοκάρει ποτέ</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">ΑΝΤΙΟ ΤΡΙΧΕΣ ΚΑΙ ΜΑΛΛΙΑ</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 4 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 4 ? 'hidden' : 'mt-1'}`}>Βούρτσα anti-tangle</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 4 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Βούρτσα anti-tangle για τρίχες ζώων, μακριά μαλλιά και επίμονη βρωμιά. Δεν κολλάει ποτέ. Απορροφά τα πάντα με το πρώτο πέρασμα.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 6 */}
            <div
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:border-blue-500 transition-all cursor-pointer group"
              onClick={(e) => { e.stopPropagation(); setOpenFeature(openFeature === 5 ? null : 5); }}
            >
              <div className="relative aspect-square overflow-hidden">
                <img src="/images/robot-asp/divano.webp" alt="Έλεγχος μέσω εφαρμογής" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                {/* Desktop overlay */}
                <div className={`hidden md:flex absolute inset-0 items-end transition-all duration-500 ${openFeature === 5 ? 'bg-black/85' : 'bg-gradient-to-t from-black/70 via-black/20 to-transparent'}`}>
                  <div className="p-4 text-white w-full">
                    <div className="flex items-center justify-between">
                      <p className="font-black text-xl leading-tight">ΕΛΕΓΧΟΣ ΑΠΟ ΤΟΝ ΚΑΝΑΠΕ</p>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFeature === 5 ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 5 ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-sm text-white/90 leading-relaxed">
                        Τηλεχειριστήριο περιλαμβάνεται. Εφαρμογή αν θέλετε. <strong>"Alexa, καθάρισε το σπίτι"</strong> και ξεκινάει. Εσείς δεν σηκώνεστε καν.
                      </p>
                    </div>
                    <p className={`text-sm text-white/80 transition-all duration-300 ${openFeature === 5 ? 'opacity-0 h-0' : 'opacity-100 mt-1'}`}>Εφαρμογή, Alexa, τηλεχειριστήριο</p>
                  </div>
                </div>
              </div>
              {/* Mobile text outside */}
              <div className="md:hidden p-3 bg-gradient-to-r from-blue-600 to-indigo-700">
                <div className="flex items-center justify-between">
                  <p className="font-black text-sm text-white leading-tight">ΕΛΕΓΧΟΣ ΑΠΟ ΤΟΝ ΚΑΝΑΠΕ</p>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${openFeature === 5 ? 'rotate-180' : ''}`} />
                </div>
                <p className={`text-sm text-blue-100 transition-all duration-300 ${openFeature === 5 ? 'hidden' : 'mt-1'}`}>Εφαρμογή, Alexa, τηλεχειριστήριο</p>
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openFeature === 5 ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Τηλεχειριστήριο περιλαμβάνεται. Εφαρμογή αν θέλετε. "Alexa, καθάρισε το σπίτι" και ξεκινάει. Εσείς δεν σηκώνεστε καν.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIFICHE TECNICHE */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-gray-900">
            ΑΡΙΘΜΟΙ ΠΟΥ ΜΙΛΟΥΝ ΜΟΝΟΙ ΤΟΥΣ
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Συγκρίνετέ το με τα κορυφαία μοντέλα: δεν έχει αντίπαλο.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Gauge className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">6000 Pa</div>
              <p className="text-sm text-gray-500">Ισχύς αναρρόφησης</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Battery className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">5200 mAh</div>
              <p className="text-sm text-gray-500">Μπαταρία (6 ώρες)</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Cpu className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">LiDAR 4.0</div>
              <p className="text-sm text-gray-500">Πλοήγηση λέιζερ</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Volume2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">&lt;55 dB</div>
              <p className="text-sm text-gray-500">Εξαιρετικά αθόρυβο</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Wifi className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">WiFi 5GHz</div>
              <p className="text-sm text-gray-500">App + Alexa/Google</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Layers className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">3L Σταθμός</div>
              <p className="text-sm text-gray-500">Σακούλα κρατάει 2 μήνες</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <Maximize className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">20 mm</div>
              <p className="text-sm text-gray-500">Ξεπερνάει εμπόδια</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-center">
              <ShieldCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-black text-gray-900">HEPA H13</div>
              <p className="text-sm text-gray-500">99.97% αλλεργιογόνων</p>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-2 text-gray-900">
            NOVACLEAN X1 vs ΑΝΤΑΓΩΝΙΣΜΟΣ
          </h2>
          <p className="text-lg text-gray-600 text-center mb-8">
            Ίδιες λειτουργίες, €400 λιγότερα. Κάντε τους υπολογισμούς.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl overflow-hidden shadow-lg text-xs md:text-base">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-left">Χαρακτηριστικό</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center bg-green-600">NovaClean X1</th>
                  <th className="px-2 md:px-4 py-2 md:py-3 text-center">Άλλα ρομπότ</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-2 md:px-4 py-2 md:py-3 font-bold text-gray-900">{row.feature}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-center font-bold text-green-700 bg-green-50">{row.robot}</td>
                    <td className="px-2 md:px-4 py-2 md:py-3 text-center text-gray-500">{row.without}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* URGENCY STRIP */}
      <section className="bg-red-600 py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-white text-xl font-black mb-3">
            Ολική Εκκαθάριση — Μόνο {stockLeft} τεμάχια απομένουν
          </p>
          <p className="text-white/80 mb-4">Όταν τελειώσουν, η τιμή επιστρέφει στα €199,90. Σταθμός περιλαμβάνεται μόνο για αυτά τα τελευταία κομμάτια.</p>
          <button
            onClick={openOrderPopup}
            className="bg-white text-red-600 hover:bg-gray-100 py-4 px-10 rounded-xl font-black text-xl transition-all cursor-pointer shadow-lg"
          >
            ΠΑΡΑΓΓΕΙΛΤΕ ΤΩΡΑ — €79,00
          </button>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews-section" className="py-12 bg-gray-800">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-2">
            1.248 ΙΚΑΝΟΠΟΙΗΜΕΝΟΙ ΠΕΛΑΤΕΣ
          </h2>
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-current" />)}
            </div>
            <span className="text-white font-bold">4.9/5</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, i) => (
              <div key={i} className={`bg-white rounded-xl p-5 shadow ${i >= visibleReviews ? 'hidden md:block' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg">
                    {review.nome[0]}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-900">{review.nome}</p>
                    <p className="text-sm text-gray-500">{review.flag} {review.paese}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex text-yellow-400 mb-1">
                      {[...Array(review.stelle)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{review.data}</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-2">{review.testo}</p>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">Επαληθευμένη αγορά</span>
                {review.risposta && (
                  <div className="mt-3 bg-gray-50 border-l-4 border-blue-500 p-3 rounded-r-lg">
                    <p className="text-xs font-bold text-gray-600 mb-1">Απάντηση πωλητή:</p>
                    <p className="text-gray-600 text-sm">{review.risposta}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {visibleReviews < reviews.length && (
            <div className="text-center mt-6 md:hidden">
              <button
                onClick={() => setVisibleReviews(prev => Math.min(prev + 4, reviews.length))}
                className="bg-white text-gray-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
              >
                Δείτε περισσότερες κριτικές
              </button>
            </div>
          )}
        </div>
      </section>

      {/* GARANZIA */}
      <section className="py-12 bg-green-50 border-y border-green-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-white border-4 border-green-500 rounded-full flex flex-col items-center justify-center shadow-xl">
                <span className="text-green-600 font-black text-4xl">30</span>
                <span className="text-gray-900 font-bold text-xs uppercase">Ημέρες</span>
                <span className="text-green-600 font-bold text-sm">Εγγύηση</span>
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
                ΔΕΝ ΣΑΣ ΑΡΕΣΕΙ; ΣΑΣ ΕΠΙΣΤΡΕΦΟΥΜΕ ΤΑ ΠΑΝΤΑ. ΤΕΛΟΣ.
              </h2>
              <p className="text-gray-700 mb-4 text-lg">
                Έχετε 30 ημέρες για να το δοκιμάσετε. Αν δεν είστε ΕΝΘΟΥΣΙΑΣΜΕΝΟΙ — για οποιονδήποτε λόγο — μας καλείτε, στέλνουμε κούριερ να το παραλάβει, και σας επιστρέφουμε κάθε σεντ. <strong>Επιστροφή ΔΩΡΕΑΝ. Χωρίς ερωτήσεις. Χωρίς ρίσκο για εσάς.</strong> Αλλά το 96% το κρατάει.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="bg-white px-4 py-2 rounded-lg border border-green-200 font-bold text-gray-800 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-green-500" /> Χωρίς ρίσκο
                </span>
                <span className="bg-white px-4 py-2 rounded-lg border border-green-200 font-bold text-gray-800 text-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-green-500" /> Δωρεάν επιστροφή
                </span>
                <span className="bg-white px-4 py-2 rounded-lg border border-green-200 font-bold text-gray-800 text-sm flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-green-500" /> Εγγύηση 2 έτη
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Order */}
      <section className="py-10 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 text-center">
            ΠΩΣ ΝΑ ΠΑΡΑΓΓΕΙΛΕΤΕ (3 ΑΠΛΑ ΒΗΜΑΤΑ)
          </h2>
          <div className="flex flex-row items-start justify-center gap-2 md:gap-8">
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg">1</div>
              <p className="text-gray-700 text-sm font-medium">Συμπληρώστε τη φόρμα με τα στοιχεία σας</p>
            </div>
            <div className="text-gray-300 text-2xl mt-4">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg">2</div>
              <p className="text-gray-700 text-sm font-medium">Θα σας καλέσουμε για επιβεβαίωση</p>
            </div>
            <div className="text-gray-300 text-2xl mt-4">→</div>
            <div className="flex flex-col items-center text-center flex-1">
              <div className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg">3</div>
              <p className="text-gray-700 text-sm font-medium">Παραλαμβάνετε σε 24-48 ώρες και πληρώνετε στον ΚΟΥΡΙΕΡ!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER FORM */}
      <section id="order-form-section" className="bg-gray-900 py-12 pb-8">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-red-600 text-white font-bold text-center py-2 rounded-full mb-4 animate-pulse">
            Μόνο {stockLeft} τεμάχια απομένουν σε αυτή την τιμή
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 text-center">
            Παραγγείλτε Τώρα
          </h2>
          <p className="text-gray-400 mb-6 text-center">
            Συμπληρώστε τη φόρμα. Πληρώνετε μόνο κατά την παράδοση.
          </p>

          <div className="bg-white rounded-2xl p-6 shadow-2xl">
            {/* Product Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-black text-gray-900">NovaClean X1 PRO</span>
                  <p className="text-sm text-gray-600">+ Σταθμός OMNI + Αξεσουάρ</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">ΣΤΑΘΜΟΣ ΔΩΡΕΑΝ</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded">ΑΠΟΣΤΟΛΗ ΔΩΡΕΑΝ</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-sm block">€199,90</span>
                  <span className="text-3xl font-black text-green-700">€79<span className="text-lg">,00</span></span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-5 text-center">
              <div className="flex items-center justify-center gap-2 text-red-700 font-bold">
                <Timer className="w-5 h-5" />
                <span>Η προσφορά λήγει σε: {formatTime(timeLeft)}</span>
              </div>
            </div>

            {submitError && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-3 mb-4">
                <p className="text-red-700 text-sm text-center">{submitError}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <input type="hidden" name="tmfp" />

              <div className="space-y-4 mb-5">
                <div>
                  <label className="block text-gray-800 font-bold mb-2">Ονοματεπώνυμο *</label>
                  <input
                    type="text"
                    name="name"
                    value={orderData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg"
                    placeholder="Γιώργος Παπαδόπουλος"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-2">Τηλέφωνο (για τον κούριερ) *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={orderData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg"
                    placeholder="+30 69x xxx xxxx"
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-800 font-bold mb-2">Πλήρης Διεύθυνση *</label>
                  <input
                    type="text"
                    name="address"
                    value={orderData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-lg"
                    placeholder="Ερμού 10, 10563 Αθήνα"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="border-2 border-green-500 bg-green-50 rounded-xl p-4 mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-4 border-green-500 bg-white"></div>
                  <span className="font-bold text-gray-800">Πληρωμή κατά την παράδοση</span>
                </div>
                <span className="text-2xl">💶</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-4 rounded-xl font-black text-xl transition duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white cursor-pointer shadow-lg transform hover:scale-[1.02]'
                }`}
              >
                {isSubmitting ? 'ΑΠΟΣΤΟΛΗ...' : 'ΠΑΡΑΓΓΕΙΛΤΕ ΤΩΡΑ — ΠΛΗΡΩΜΗ ΚΑΤΑ ΤΗΝ ΠΑΡΑΔΟΣΗ'}
                {!isSubmitting && <Truck className="w-6 h-6" />}
              </button>

              <p className="text-center text-gray-400 text-xs mt-4">
                Τα δεδομένα σας προστατεύονται και κρυπτογραφούνται με SSL. Τα χρησιμοποιούμε ΜΟΝΟ για την αποστολή.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-100 py-10 pb-32">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-8 text-gray-900">
            ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <h3 className="text-lg font-bold text-gray-900 pr-4">{faq.question}</h3>
                  <ChevronDown className={`w-5 h-5 text-gray-600 transition-transform flex-shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
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

'use client';

import React, { useState, useEffect, useRef } from 'react';
import './airwave.css';

export default function LandingPage() {
  // --- Main Product Slider State ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 6;
  const mainSliderRef = useRef<HTMLDivElement>(null);


  const changeSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // --- Sticky Scroll Logic (Shopify Style) ---
  const productImagesRef = useRef<HTMLDivElement>(null);
  const productSectionRef = useRef<HTMLElement>(null);
  const [placeholderHeight, setPlaceholderHeight] = useState(0);
  const [imagesStyle, setImagesStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleStickyScroll = () => {
      if (window.innerWidth < 1024) {
        setImagesStyle({});
        setPlaceholderHeight(0);
        return;
      }

      if (!productSectionRef.current || !productImagesRef.current) return;

      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const sectionRect = productSectionRef.current.getBoundingClientRect();
      const sectionTop = productSectionRef.current.offsetTop;
      const sectionHeight = productSectionRef.current.offsetHeight;
      const imagesHeight = productImagesRef.current.offsetHeight || 600; // fallback
      const headerOffset = 80;
      const sectionPaddingTop = 48; // 3rem

      const containerWidth = productSectionRef.current.offsetWidth;
      const imageWidth = (containerWidth - 64) / 2; // 64 = gap
      const imageLeft = productSectionRef.current.getBoundingClientRect().left + (window.pageXOffset || document.documentElement.scrollLeft);

      const sectionBottom = sectionTop + sectionHeight;
      const limitBottom = sectionBottom - imagesHeight - sectionPaddingTop;

      if (scrollTop >= sectionTop - headerOffset && scrollTop < limitBottom - headerOffset) {
        setImagesStyle({
          position: 'fixed',
          top: `${headerOffset + sectionPaddingTop}px`,
          left: `${imageLeft}px`,
          width: `${imageWidth}px`,
          zIndex: 20
        });
        setPlaceholderHeight(imagesHeight);
      } else if (scrollTop >= limitBottom - headerOffset) {
        setImagesStyle({
          position: 'absolute',
          top: `${limitBottom - sectionTop}px`,
          left: '0',
          width: `${imageWidth}px`,
          zIndex: 20
        });
        setPlaceholderHeight(imagesHeight);
      } else {
        setImagesStyle({
          position: 'relative',
          zIndex: 20
        });
        setPlaceholderHeight(0);
      }
    };

    window.addEventListener('scroll', handleStickyScroll, { passive: true });
    window.addEventListener('resize', handleStickyScroll);
    // Initial call
    handleStickyScroll();

    return () => {
      window.removeEventListener('scroll', handleStickyScroll);
      window.removeEventListener('resize', handleStickyScroll);
    };
  }, []);

  // --- Why Choose Slider State ---
  const [currentWhyChoose, setCurrentWhyChoose] = useState(0);
  const totalWhyChoose = 5;
  const [isWhyChooseSliding, setIsWhyChooseSliding] = useState(false);
  const [isWhyChooseAutoplaying, setIsWhyChooseAutoplaying] = useState(true);

  const nextWhyChoose = () => {
    if (isWhyChooseSliding) return;
    setIsWhyChooseSliding(true);
    setCurrentWhyChoose((prev) => (prev + 1) % totalWhyChoose);
    setTimeout(() => setIsWhyChooseSliding(false), 600);
    setIsWhyChooseAutoplaying(false);
  };

  const prevWhyChoose = () => {
    if (isWhyChooseSliding) return;
    setIsWhyChooseSliding(true);
    setCurrentWhyChoose((prev) => (prev - 1 + totalWhyChoose) % totalWhyChoose);
    setTimeout(() => setIsWhyChooseSliding(false), 600);
    setIsWhyChooseAutoplaying(false);
  };

  const goToWhyChooseSlide = (index: number) => {
    // Usa sempre transform, sia su mobile che desktop
    setCurrentWhyChoose(index);
    setIsWhyChooseAutoplaying(false);
  };

  useEffect(() => {
    if (!isWhyChooseAutoplaying) return;
    const interval = setInterval(() => {
      setCurrentWhyChoose((prev) => (prev + 1) % totalWhyChoose);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentWhyChoose, isWhyChooseAutoplaying]);

  // --- Reviews Slider State ---
  const [currentReview, setCurrentReview] = useState(0);
  const totalReviews = 10;
  const [isReviewAutoplaying, setIsReviewAutoplaying] = useState(true);

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % totalReviews);
    setIsReviewAutoplaying(false);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + totalReviews) % totalReviews);
    setIsReviewAutoplaying(false);
  };

  useEffect(() => {
    if (!isReviewAutoplaying) return;
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % totalReviews);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentReview, isReviewAutoplaying]);

  // --- Modal State ---
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- Form Handler ---
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert('Grazie per il tuo ordine! Ti contatteremo entro 24 ore per confermare la spedizione.');
    (event.target as HTMLFormElement).reset();
  };

  // --- Scroll To Form ---
  const scrollToForm = () => {
    const formSection = document.getElementById('ordina');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>

      {/* Product Section */}
      <section className="product-section" id="productSection" ref={productSectionRef}>
        <div className="product-container">
          
          {/* Placeholder for Sticky Scroll */}
          {placeholderHeight > 0 && <div style={{ height: placeholderHeight, width: '100%' }} />}

          {/* Product Images */}
          <div className="product-images" id="productImages" ref={productImagesRef} style={imagesStyle}>
            <div className="product-image-main">
              {/* Black Friday Ribbon */}
              <div className="black-friday-ribbon">
                <span>BLACK</span>
                <span>FRIDAY</span>
              </div>
              
              {/* Slider Container */}
              <div className="slider-container">
                <div className="slider-images" id="mainSlider" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                  {[
                    "/images/condizionatore/caldo-freddo.webp",
                    "/images/condizionatore/installazione.webp",
                    "/images/condizionatore/riscaldamento.webp",
                    "/images/condizionatore/risparmio.webp",
                    "/images/condizionatore/silenzioso.webp",
                    "/images/condizionatore/specifiche.webp"
                  ].map((src, index) => (
                    <div className="slider-image" key={index}>
                      <img src={src} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="thumbnails">
              {[
                 "/images/condizionatore/caldo-freddo.webp",
                 "/images/condizionatore/installazione.webp",
                 "/images/condizionatore/riscaldamento.webp",
                 "/images/condizionatore/risparmio.webp",
                 "/images/condizionatore/silenzioso.webp",
                 "/images/condizionatore/specifiche.webp"
              ].map((src, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${index === currentSlide ? 'active' : ''}`} 
                  onClick={() => changeSlide(index)}
                >
                  <img src={src} alt={`Thumbnail ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            {/* Black Friday Badge */}
            <div className="black-friday-badge" style={{ marginBottom: '0.75rem', marginTop: '0.5rem' }}>
              <span style={{
                display: 'inline-block',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                color: 'white',
                padding: '0.4rem 0.9rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textTransform: 'uppercase'
              }}>
                Black Friday
              </span>
            </div>

            {/* Header */}
            <div className="product-header">
              <h1 className="product-title">Climatizzatore 3 in 1 Air Wave Smart™ - Riscalda, Raffredda e Deumidifica</h1>
              <p className="product-subtitle">Riscalda, Raffredda e Deumidifica • Tecnologia ThermoPanel con Eliminazione CO2 • Senza Unità Esterna • 12.000 BTU • Ultrasilenzioso</p>
            </div>

            {/* Rating */}
            <div className="product-rating">
              <div className="stars">
                <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
              </div>
              <span className="rating-text">4.8 (247 recensioni)</span>
            </div>

            {/* Price */}
            <div className="product-price">
              <div className="price-row">
                <span className="price-current">69,99 €</span>
                <span className="price-original">174,98 €</span>
                <span className="price-save">-60%</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="product-cta">
              <button className="btn-add-to-cart btn-add-to-cart-mobile" onClick={scrollToForm}>
                <span style={{ display: 'block', fontWeight: 700 }} className="btn-text-main">
                  Ordina Ora
                </span>
                <span style={{ display: 'block', fontWeight: 400 }} className="btn-text-sub">
                  Pagamento alla Consegna - Spedizione Gratuita
                </span>
              </button>
              <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '1.5rem 0' }} />
            </div>

            {/* Description */}
            <div className="product-description">
              <h3>Caratteristiche Principali</h3>
              <ul>
                <li><span className="icon">✓</span><span><strong>12.000 BTU di potenza</strong> – Scalda, Rinfresca e Deumidifica rapidamente ambienti fino a 60 m²</span></li>
                <li><span className="icon">✓</span><span><strong>3 funzioni in 1</strong> – Riscaldamento d'inverno, raffrescamento d'estate e deumidificazione</span></li>
                <li><span className="icon">✓</span><span><strong>Controllo temperatura preciso 16-32°C</strong> – Termostato digitale per il massimo comfort</span></li>
                <li><span className="icon">✓</span><span><strong>Classe energetica A+++</strong> – Risparmi il 60% in bolletta rispetto agli impianti tradizionali</span></li>
                <li><span className="icon">✓</span><span><strong>Tecnologia ThermoPanel senza unità esterna</strong> – Ricicla l'aria interna eliminando CO2, nessun motore esterno</span></li>
                <li><span className="icon">✓</span><span><strong>Controllo da smartphone</strong> – App dedicata per iOS e Android, accendi il riscaldamento ovunque</span></li>
                <li><span className="icon">✓</span><span><strong>Controllo dell'umidità</strong> – Riduce artrite e muffe, ambiente salubre</span></li>
                <li><span className="icon">✓</span><span><strong>Installazione semplice</strong> – Fissaggio a parete o appoggio, nessun tecnico necessario</span></li>
                <li><span className="icon">✓</span><span><strong>Ultra-silenzioso</strong> – Perfetto anche per camera da letto</span></li>
              </ul>
            </div>

            {/* Trust Section */}
            <div className="trust-section">
              <h3 className="trust-title">Garanzie e Servizi</h3>
              <div className="trust-items">
                <div className="trust-item">
                  <div className="trust-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                  </div>
                  <div className="trust-content">
                    <h4>Spedizione GRATUITA in 48 Ore</h4>
                    <p>Consegna veloce con corriere espresso tracciabile. Nessun costo di spedizione.</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="trust-content">
                    <h4>Pagamento alla Consegna</h4>
                    <p>Nessun pagamento anticipato. Paghi solo quando ricevi il prodotto direttamente al corriere</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                    </svg>
                  </div>
                  <div className="trust-content">
                    <h4>Resi Gratuiti entro 30 Giorni</h4>
                    <p>Non sei soddisfatto? Puoi restituire il prodotto entro 30 giorni per un rimborso completo</p>
                  </div>
                </div>
                <div className="trust-item">
                  <div className="trust-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="trust-content">
                    <h4>Garanzia 2 Anni</h4>
                    <p>Copertura completa su difetti di fabbricazione per 24 mesi</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Boxes */}
            <div className="info-boxes">
              <div className="info-box">
                <span className="icon">⚡</span>
                <div className="info-box-content">
                  <p>Solo 0,80€ al giorno</p>
                  <span>Uso medio 4-5 ore in modalità Eco</span>
                </div>
              </div>
              <div className="info-box green">
                <span className="icon">🏠</span>
                <div className="info-box-content">
                  <p>Nessun Permesso Richiesto</p>
                  <span>Installazione senza vincoli condominiali</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perché ThermoPanel funziona Section - 3 box orizzontali */}
      <section id="whyItWorks" style={{ background: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '0.375rem', color: '#111827' }}>
            Perché <span style={{ color: '#FFB800' }}>Air Wave Smart™</span> funziona
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', maxWidth: '600px', margin: '0 auto 1.5rem', fontSize: '0.8125rem', lineHeight: 1.4 }}>
            La tecnologia che ti fa risparmiare mantenendo il comfort perfetto tutto l'anno
          </p>

          <div className="timeline-container" style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', padding: '2rem 0' }}>
            <div className="timeline-line" style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '3px', background: 'linear-gradient(to bottom, #FFB800, #FF8C00)', transform: 'translateX(-50%)' }}></div>

            {/* Item 1 */}
            <div className="timeline-item timeline-item-left" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center', marginBottom: '3rem', position: 'relative' }}>
              <div className="timeline-content timeline-content-left" style={{ textAlign: 'right' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#CC6600', marginBottom: '0.5rem' }}>Tecnologia ThermoPanel</h3>
                <p style={{ fontSize: '0.9375rem', color: '#995200', lineHeight: 1.6 }}>
                  Niente <strong style={{ color: '#663300' }}>motore esterno</strong>, niente permessi. Ricicla e purifica l'aria eliminando CO2 e impurità.
                </p>
              </div>
              <div className="timeline-circle" style={{ borderRadius: '50%', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', boxShadow: '0 4px 16px rgba(255, 140, 0, 0.4)', zIndex: 1, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 12C4 7.58172 7.58172 4 12 4C14.5264 4 16.7792 5.17108 18.2454 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 12C20 16.4183 16.4183 20 12 20C9.47362 20 7.22075 18.8289 5.75463 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 4L18 7L15 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M6 20L6 17L9 17" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="timeline-spacer"></div>
            </div>

            {/* Item 2 */}
            <div className="timeline-item timeline-item-right" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center', marginBottom: '3rem', position: 'relative' }}>
              <div className="timeline-spacer"></div>
              <div className="timeline-circle" style={{ borderRadius: '50%', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', boxShadow: '0 4px 16px rgba(255, 140, 0, 0.4)', zIndex: 1, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="timeline-content timeline-content-right" style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#CC6600', marginBottom: '0.5rem' }}>Risparmio Energetico Reale</h3>
                <p style={{ fontSize: '0.9375rem', color: '#995200', lineHeight: 1.6 }}>
                  <strong style={{ color: '#663300' }}>Termostato intelligente</strong> che regola la temperatura. <strong style={{ color: '#663300' }}>Risparmio fino al 60%</strong> in bolletta.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="timeline-item timeline-item-left timeline-item-last" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '2rem', alignItems: 'center', position: 'relative' }}>
              <div className="timeline-content timeline-content-left" style={{ textAlign: 'right' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#CC6600', marginBottom: '0.5rem' }}>3 Funzioni in Un Solo Dispositivo</h3>
                <p style={{ fontSize: '0.9375rem', color: '#995200', lineHeight: 1.6 }}>
                  <strong style={{ color: '#663300' }}>Riscalda</strong> d'inverno, <strong style={{ color: '#663300' }}>raffredda</strong> d'estate e <strong style={{ color: '#663300' }}>deumidifica</strong>. Comfort perfetto tutto l'anno.
                </p>
              </div>
              <div className="timeline-circle" style={{ borderRadius: '50%', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', boxShadow: '0 4px 16px rgba(255, 140, 0, 0.4)', zIndex: 1, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '120px', height: '120px' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="rotate(0 12 12)">
                    <path d="M12 5L12 11M12 5L10 7M12 5L14 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g transform="rotate(120 12 12)">
                    <path d="M12 5L12 11M12 5L10 7M12 5L14 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <g transform="rotate(240 12 12)">
                    <path d="M12 5L12 11M12 5L10 7M12 5L14 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
              </div>
              <div className="timeline-spacer"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section - Slider */}
      <section style={{ background: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '1rem', color: '#111827' }}>
            Perché Scegliere <span style={{ color: '#FF8C00' }}>Air Wave Smart™</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', maxWidth: '800px', margin: '0 auto 3rem', fontSize: '1rem' }}>
            Scalda casa tua in modo efficiente senza i problemi dei climatizzatori tradizionali
          </p>

          {/* Slider Container */}
          <div className="slider-container-why-choose" style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto 1rem', padding: '0 70px' }}>
            <div
              className="why-choose-slider-track"
              style={{
                borderRadius: '16px'
              }}
            >
              <div
                id="whyChooseSlider"
                style={{
                  display: 'flex',
                  transition: 'transform 0.5s ease',
                  transform: `translateX(-${currentWhyChoose * 100}%)`
                }}
              >

                {/* Slide 1 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Riscaldamento Potente ed Efficiente</h3>
                            <p>Tecnologia ThermoPanel che <strong>scalda rapidamente</strong> casa tua senza motore esterno. <strong>Calore costante</strong>, niente dispersioni, <strong>risparmio garantito</strong> in bolletta.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/riscaldamento.webp" alt="Riscaldamento" />
                        </div>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Con e Senza Installazione</h3>
                            <p><strong>Montaggio semplice</strong> a parete o appoggio. <strong>Nessun tecnico</strong> specializzato richiesto, <strong>plug and play</strong>. Inizia a utilizzarlo in pochi minuti.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/installazione.webp" alt="Installazione" />
                        </div>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Raffredda d'Estate, Scalda d'Inverno</h3>
                            <p><strong>3 funzioni in 1</strong>: riscaldamento potente per l'inverno, raffrescamento per l'estate, deumidificazione tutto l'anno. <strong>Nessun permesso</strong> condominiale richiesto.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/caldo-freddo.webp" alt="3 in 1" />
                        </div>
                    </div>
                </div>

                {/* Slide 4 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Risparmio fino al 60% in Bolletta</h3>
                            <p><strong>Efficienza A+++</strong> e termostato intelligente: consumi solo quello che serve. <strong>Nessuno spreco</strong>, <strong>massimo risparmio</strong> rispetto agli impianti a gas.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/risparmio.webp" alt="Risparmio" />
                        </div>
                    </div>
                </div>

                {/* Slide 5 */}
                <div className="why-choose-slide">
                    <div className="why-choose-slide-content">
                        <div className="why-choose-slide-text">
                            <h3>Ultra-Silenzioso: dormi sogni tranquilli</h3>
                            <p>Perfetto per <strong>camera da letto</strong>. Funzionamento <strong>estremamente silenzioso</strong>, nessun motore esterno rumoroso. Goditi il <strong>massimo comfort</strong> senza disturbi.</p>
                        </div>
                        <div className="why-choose-slide-image">
                            <img src="/images/condizionatore/silenzioso.webp" alt="Silenzioso" />
                        </div>
                    </div>
                </div>

              </div>
            </div>

            <button id="prevWhyChoose" onClick={prevWhyChoose} style={{ position: 'absolute', left: '-5px', top: '50%', transform: 'translateY(-50%)', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(255, 140, 0, 0.4)', zIndex: 9999, transition: 'all 0.3s' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', pointerEvents: 'none', minWidth: '32px', minHeight: '32px' }}>
                    <path d="M15 18l-6-6 6-6" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            <button id="nextWhyChoose" onClick={nextWhyChoose} style={{ position: 'absolute', right: '-5px', top: '50%', transform: 'translateY(-50%)', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', border: 'none', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(255, 140, 0, 0.4)', zIndex: 9999, transition: 'all 0.3s' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', pointerEvents: 'none', minWidth: '32px', minHeight: '32px' }}>
                    <path d="M9 18l6-6-6-6" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
          </div>

          {/* Indicatori con pallini e frecce integrate */}
          <div id="whyChooseIndicator" style={{ textAlign: 'center', marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
            {/* Freccia Sinistra */}
            <button
              className="indicator-prev"
              onClick={prevWhyChoose}
              style={{
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 140, 0, 0.4)',
                flexShrink: 0
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            {/* Container Pallini */}
            <div className="dots-container" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {Array.from({ length: totalWhyChoose }).map((_, i) => (
                <span
                  key={i}
                  className={`dot ${i === currentWhyChoose ? 'active' : ''}`}
                  onClick={() => goToWhyChooseSlide(i)}
                  style={{
                    width: i === currentWhyChoose ? '24px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: i === currentWhyChoose ? 'linear-gradient(135deg, #FFB800, #FF8C00)' : '#d1d5db',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    boxShadow: i === currentWhyChoose ? '0 2px 8px rgba(255, 140, 0, 0.4)' : 'none'
                  }}
                ></span>
              ))}
            </div>

            {/* Freccia Destra */}
            <button
              className="indicator-next"
              onClick={nextWhyChoose}
              style={{
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
                border: 'none',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(255, 140, 0, 0.4)',
                flexShrink: 0
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section style={{ background: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem', color: '#111827' }}>
            Specifiche Tecniche <span style={{ color: '#FF8C00' }}>Air Wave Smart™</span>
          </h2>

          <div className="tech-specs-container">
            {/* Desktop */}
            <div className="tech-specs-desktop" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
               <div className="tech-specs-row-3">
                    <div style={{ background: '#F5F5F5', border: '2px solid transparent', backgroundClip: 'padding-box', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 12H21" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 4V20" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.25rem' }}>60 m²</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Copertura massima</div>
                    </div>
                    <div style={{ background: '#F5F5F5', border: '2px solid transparent', backgroundClip: 'padding-box', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFB800" fillOpacity="0.2"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.25rem' }}>12.000</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>BTU potenza</div>
                    </div>
                    <div style={{ background: '#F5F5F5', border: '2px solid transparent', backgroundClip: 'padding-box', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L12 6M12 6C14.2091 6 16 7.79086 16 10V14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14V10C8 7.79086 9.79086 6 12 6Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 18V22" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 12H19" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5 12H8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.25rem' }}>16-32°C</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Range temperatura</div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                    <div style={{ background: '#F5F5F5', border: '2px solid transparent', backgroundClip: 'padding-box', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#FF8C00' }}>Risparmio Energetico</h3>
                        </div>
                        <p style={{ color: '#555555', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                            <strong>Fino al 60% di bollette più basse</strong> rispetto agli altri condizionatori e impianti a gas grazie alla tecnologia ThermoPanel e alla classe energetica A+++.
                        </p>
                    </div>
                    <div style={{ background: '#F5F5F5', border: '2px solid transparent', backgroundClip: 'padding-box', borderRadius: '12px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFB800"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.25rem' }}>A+++</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Classe energetica</div>
                    </div>
                </div>

                <div className="tech-cost-box" style={{ background: '#F5F5F5', borderRadius: '12px', padding: '1.5rem', border: '2px solid transparent', backgroundClip: 'padding-box', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00' }}>€0,80 al giorno</div>
                        <div style={{ height: '30px', width: '1px', background: '#cccccc' }}></div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Con uso medio di 4-5 ore in modalità Eco</div>
                    </div>
                </div>
            </div>

            {/* Mobile */}
            <div className="tech-specs-mobile" style={{ display: 'none', gridTemplateColumns: '1fr', gap: '1rem' }}>
                {/* Prima riga: 2 box affiancati */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div style={{ background: '#F5F5F5', border: '2px solid transparent', backgroundClip: 'padding-box', borderRadius: '12px', padding: '1rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6C3 4.89543 3.89543 4 5 4H19C20.1046 4 21 4.89543 21 6V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V6Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 12H21" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 4V20" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.125rem' }}>60 m²</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Copertura massima</div>
                    </div>
                    <div style={{ background: '#F5F5F5', border: '2px solid transparent', backgroundClip: 'padding-box', borderRadius: '12px', padding: '1rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFB800" fillOpacity="0.2"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.125rem' }}>12.000</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>BTU potenza</div>
                    </div>
                </div>

                {/* Seconda riga: 2 box affiancati */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div style={{ background: '#F5F5F5', border: '2px solid transparent', backgroundClip: 'padding-box', borderRadius: '12px', padding: '1rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L12 6M12 6C14.2091 6 16 7.79086 16 10V14C16 16.2091 14.2091 18 12 18C9.79086 18 8 16.2091 8 14V10C8 7.79086 9.79086 6 12 6Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 18V22" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 12H19" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5 12H8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.125rem' }}>16-32°C</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Range temperatura</div>
                    </div>
                    <div style={{ background: '#F5F5F5', border: '2px solid transparent', backgroundClip: 'padding-box', borderRadius: '12px', padding: '1rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', position: 'relative' }}>
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                        <div style={{ marginBottom: '0.25rem', display: 'flex', justifyContent: 'center' }}>
                          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#FF8C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="#FFB800"/>
                          </svg>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FF8C00', marginBottom: '0.125rem' }}>A+++</div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Classe energetica</div>
                    </div>
                </div>

                {/* Terza riga: Box largo risparmio energetico + costo */}
                <div style={{ background: '#F5F5F5', border: '2px solid transparent', backgroundClip: 'padding-box', borderRadius: '12px', padding: '1.25rem', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)', position: 'relative' }}>
                    <div style={{ position: 'absolute', inset: 0, borderRadius: '12px', padding: '2px', background: 'linear-gradient(135deg, #FFB800, #FF8C00)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#FFB800" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FF8C00', margin: 0 }}>Risparmio Energetico</h3>
                    </div>
                    <p style={{ color: '#555555', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                        <strong>Fino al 60% di bollette più basse</strong> rispetto agli altri condizionatori e impianti a gas grazie alla tecnologia ThermoPanel e alla classe energetica A+++.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#FF8C00' }}>€0,80 al giorno</div>
                        <div style={{ height: '20px', width: '1px', background: '#cccccc' }}></div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Uso medio 4-5 ore in modalità Eco</div>
                    </div>
                </div>
            </div>

            <div className="tech-specs-image" style={{ background: 'linear-gradient(135deg, #FFF8F0, #FFE8CC)', border: '2px solid #FFD966', borderRadius: '16px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
              <img src="/images/condizionatore/specifiche.webp" alt="Specifiche Tecniche" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section style={{ background: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem', color: '#111827' }}>
            Cosa Include <span style={{ color: '#FF8C00' }}>Air Wave Smart™</span>
          </h2>

          <div style={{ background: 'linear-gradient(135deg, #FFF4E6, #FFE8CC)', borderRadius: '16px', padding: '2rem', border: '1px solid #FFDAA3' }}>
            <div className="include-grid">
              <img src="/images/condizionatore/include.webp" alt="Cosa include" className="include-img" />
              <div className="include-list">
                 {[
                    "1× climatizzatore Air Wave Smart™ 12.000 BTU",
                    "1× Telecomando con batterie incluse",
                    "1× Kit di montaggio a parete",
                    "2× Filtri HEPA di ricambio (scorta per 2 anni)",
                    "Manuale utente + Garanzia 2 anni",
                    "Accesso gratuito all'App di controllo (iOS e Android)"
                 ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ color: '#CC7A00', fontSize: '1.25rem' }}>✓</div>
                        <span style={{ color: '#B86800', fontSize: '0.9375rem', fontWeight: 700 }}>{item}</span>
                    </div>
                 ))}
              </div>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button onClick={scrollToForm} style={{ background: '#16a34a', color: 'white', padding: '1rem 2.5rem', border: 'none', borderRadius: '12px', fontSize: '1.125rem', fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(22,163,74,0.3)', transition: 'all 0.3s' }}>
              Ordina Ora - €69,99
            </button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #FFFCF5 10%, #FFFCF5 90%, #ffffff 100%)', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem', color: '#111827' }}>
            Recensioni Verificate
          </h2>

          <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto 2rem' }}>
            <div id="reviewsSlider" style={{ overflow: 'hidden', borderRadius: '12px' }}>
              <div id="reviewsTrack" style={{ display: 'flex', transition: 'transform 0.5s ease', transform: `translateX(-${currentReview * 100}%)` }}>
                {[
                    { t: 'Finalmente risparmio davvero', d: 'Io lo uso da tipo 2 mesi e devo dire che la bolletta è calata parecchio.. prima con il vecchio condizionatore spendevo un botto, adesso molto meno. Scalda bene e va benissimo', a: 'Marco R.', stars: 5 },
                    { t: 'Arrivato veloce!', d: 'Ordinato lunedì e arrivato mercoledì, corriere anche gentile. Prodotto ottimo lo attaccato al muro da solo senza chiamare nessuno.. funziona bene e scalda subito la stanza', a: 'Giuseppe T.', stars: 5 },
                    { t: 'Perfetto per camera da letto', d: 'Lo messo in camera e non fa quasi rumore, si sente appena... con quello di prima non riuscivo a dormire invece questo va benissimo. Consuma anche poco', a: 'Laura M.', stars: 5 },
                    { t: 'Per ora va bene', d: 'Molto soddisfatta, scalda veloce e la casa resta calda. Non so come facevo prima con i termosifoni che ci mettevano ore...questo è tutta un altra cosa. Lascio 4 stelle per vedere come va poi magari cambio', a: 'Anna P.', stars: 4 },
                    { t: 'Facile da montare', d: 'Io e mio figlio lo montato in mezz ora, viene con le viti e tutto, basta attaccarlo e funziona subito. Non serve il tecnico e risparmi anche quei soldi li. Top', a: 'Roberto S.', stars: 5 },
                    { t: 'Spedizione super veloce', d: 'Arrivato in 2 giorni, imballato bene. Il corriere mi ha anche aiutato a portarlo su perché abito al terzo piano senza ascensore! Prodotto ottimo scalda benissimo e consuma poco rispetto a quello vecchio', a: 'Francesca B.', stars: 5 },
                    { t: 'Ottimo rapporto qualità prezzo', d: 'Per il prezzo che costa è davvero buono. Fa caldo e freddo, io lo uso soprattutto d inverno e la temperatura resta sempre quella che voglio io. Non torno più indietro', a: 'Luca D.', stars: 5 },
                    { t: 'Casa sempre calda', d: 'L ho preso per il soggiorno che è grande tipo 50 mq e scalda tutto. Anche quando fa freddo fuori in 10 minuti la casa è calda.. consuma molto meno del vecchio e la bolletta si vede eccome', a: 'Maria G.', stars: 5 },
                    { t: 'Consegna rapida e prodotto top', d: 'Ordinato martedì e ricevuto giovedì, corriere puntuale. Il prodotto è ottimo fa sia caldo che freddo io lo uso tutto l anno. Molto silenzioso e facile da usare anche per me che non sono pratico', a: 'Antonio C.', stars: 5 },
                    { t: 'Davvero contenta', d: 'Io avevo paura di ordinare online ma è arrivato tutto perfetto in pochi giorni. Funziona benissimo e consuma pochissimo rispetto al mio vecchio condizionatore.. la bolletta è calata di brutto. Contentissima', a: 'Stefania L.', stars: 5 }
                ].map((review, i) => (
                    <div key={i} className="review-slide" style={{ minWidth: '100%', background: 'linear-gradient(135deg, #FFFEFA, #FFF9F0)', padding: '1.5rem', boxShadow: '0 2px 8px rgba(255, 184, 0, 0.1)', border: '1px solid #FFE5D3', borderRadius: '12px' }}>
                        <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.75rem', color: '#fbbf24', fontSize: '1rem' }}>
                            {review.stars === 5 ? '⭐⭐⭐⭐⭐' : '⭐⭐⭐⭐'}
                        </div>
                        <p style={{ fontWeight: 600, color: '#111827', marginBottom: '0.5rem', fontSize: '1rem' }}>{review.t}</p>
                        <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>{review.d}</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: 500 }}>{review.a}</p>
                    </div>
                ))}
              </div>
            </div>

            <button id="prevReview" onClick={prevReview} style={{ position: 'absolute', left: '5px', top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid #e5e7eb', width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', minWidth: '32px', minHeight: '32px' }}>
                <path d="M15 18l-6-6 6-6" stroke="#FFB800" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button id="nextReview" onClick={nextReview} style={{ position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)', background: 'white', border: '1px solid #e5e7eb', width: '40px', height: '40px', minWidth: '40px', minHeight: '40px', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFB800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block', minWidth: '32px', minHeight: '32px' }}>
                <path d="M9 18l6-6-6-6" stroke="#FFB800" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div id="reviewDots" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
              {Array.from({ length: totalReviews }).map((_, i) => (
                <span 
                    key={i}
                    className="review-dot" 
                    onClick={() => setCurrentReview(i)}
                    style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === currentReview ? '#FFB800' : '#d1d5db', cursor: 'pointer', transition: 'all 0.3s' }}
                ></span>
              ))}
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              Puoi leggere tutte le recensioni sul sito ufficiale di <strong style={{ color: '#FFB800' }}>Feedaty</strong>.
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <button onClick={() => setIsModalOpen(true)} style={{ background: 'white', color: '#FFB800', padding: '0.875rem 2rem', border: '2px solid #FFB800', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s' }}>
              Lascia una Recensione
            </button>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {isModalOpen && (
        <div id="reviewModal" style={{ display: 'flex', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, alignItems: 'center', justifyContent: 'center' }} onClick={() => setIsModalOpen(false)}>
            <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', maxWidth: '500px', width: '90%', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', position: 'relative' }} onClick={e => e.stopPropagation()}>
                <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#9ca3af', lineHeight: 1 }}>×</button>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ width: '60px', height: '60px', background: '#fef3c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2rem' }}>
                        ⚠️
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '1rem' }}>Solo Acquisti Verificati</h3>
                    <p style={{ color: '#6b7280', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                        Per prevenire recensioni false, solo i clienti che hanno acquistato questo prodotto possono lasciare una recensione.
                    </p>
                    <button onClick={() => setIsModalOpen(false)} style={{ marginTop: '1.5rem', background: '#16a34a', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '10px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}>
                        Ho capito
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Order Form Section */}
      {/* OFFERTA / CHECKOUT SECTION */}
      <section id="ordina" style={{ background: '#1E293B', padding: '5rem 1.5rem', color: 'white', position: 'relative' }}>
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '300px', height: '300px', background: '#FFB800', filter: 'blur(150px)', opacity: 0.1 }}></div>

        <div className="checkout-grid" style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>

          {/* Left: Product Summary */}
          <div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>Scorte Limitate</h2>
            <p style={{ fontSize: '1rem', color: '#94a3b8', marginBottom: '2rem' }}>Approfitta dell'offerta del Black Friday prima che finiscano</p>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <img src="/images/condizionatore/specifiche.webp" alt="Prod" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Air Wave Smart™ Kit</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Include Telecomando + App</div>
                </div>
              </div>
              <ul style={{ color: '#cbd5e1', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Prezzo Listino</span> <span style={{ textDecoration: 'line-through' }}>€174,98</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Sconto Black Friday</span> <span style={{ color: '#FFB800' }}>-€104,99</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Spedizione</span> <span style={{ color: '#4ADE80' }}>GRATIS</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', fontSize: '1.25rem', fontWeight: 700, color: 'white' }}>
                  <span>Totale</span> <span>€69,99</span>
                </li>
              </ul>
              <div style={{ marginTop: '1rem', fontSize: '0.8rem', color: '#94a3b8', display: 'flex', gap: '10px', alignItems: 'center' }}>
                 <span>🛡️ Garanzia 2 Anni inclusa</span>
              </div>
            </div>
          </div>

          {/* Right: Modern Form */}
          <div style={{ background: 'white', borderRadius: '24px', padding: '2.5rem', color: '#1E293B' }}>
            <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Checkout Sicuro</h3>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Nessun pagamento anticipato richiesto.</p>
            </div>

            <form onSubmit={handleFormSubmit} style={{ display: 'grid', gap: '1rem' }}>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>NOME E COGNOME</label>
                <input required type="text" placeholder="Mario Rossi" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>INDIRIZZO COMPLETO</label>
                <input required type="text" placeholder="Via Roma 123, 20100 Milano" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>CELLULARE</label>
                <input required type="tel" placeholder="+39 333 123 4567" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              {/* Garanzie e Sicurezza */}
              <div style={{ margin: '1rem 0', padding: '1.5rem', background: '#F8FAFC', border: '2px solid #E2E8F0', borderRadius: '12px' }}>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>✓</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>Pagamento alla consegna</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FF8C00', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>⚡</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>Spedizione gratuita in 24-48h</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>↺</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>30 giorni per il reso gratuito</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#8B5CF6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', flexShrink: 0 }}>★</div>
                    <span style={{ fontSize: '0.9rem', color: '#1E293B', fontWeight: 600 }}>2 anni di garanzia inclusa</span>
                  </div>
                </div>
              </div>

              <button type="submit" style={{
                width: '100%', padding: '1.2rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: 'linear-gradient(135deg, #FFB800 0%, #FF7A00 100%)',
                color: 'white',
                boxShadow: '0 10px 25px -5px rgba(255, 122, 0, 0.4)',
                transition: 'all 0.3s ease'
              }}>
                <span>Conferma Ordine</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* Sticky Bottom Bar */}
      <div className="sticky-bottom-container" style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1400px',
        padding: '0 1rem',
        zIndex: 1000
      }}>
        <div className="sticky-bottom-bar" style={{
          background: 'linear-gradient(135deg, #FFB800, #FF8C00)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.2)',
          padding: '0.75rem 1.5rem',
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
          <div className="sticky-info" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flex: '1'
          }}>
            <div>
              <div style={{ fontSize: '0.95rem', color: 'white', fontWeight: 700, opacity: 0.95 }}>
                Air Wave Smart™
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#16a34a' }}>69,99 €</span>
                <span style={{ fontSize: '0.875rem', textDecoration: 'line-through', color: 'white', opacity: 0.8 }}>174,98 €</span>
              </div>
            </div>
          </div>
          <button
            className="sticky-button"
            onClick={scrollToForm}
            style={{
              background: '#16a34a',
              color: 'white',
              padding: '0.75rem 2rem',
              border: 'none',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(22, 163, 74, 0.4)',
              transition: 'all 0.3s',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            Acquista Ora
          </button>
        </div>
      </div>

    </>
  );
}
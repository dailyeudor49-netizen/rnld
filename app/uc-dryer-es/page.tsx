'use client';

import React, { useState, useEffect } from 'react';

const styles = `
  /* RESET & BASE STYLES */
  * { box-sizing: border-box; margin: 0; padding: 0; outline: none; -webkit-tap-highlight-color: transparent; }
  body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; line-height: 1.5; color: #333; background-color: #fff; padding-bottom: 80px; }
  img { max-width: 100%; height: auto; display: block; border-radius: 4px; }
  ul { list-style: none; }
  a { text-decoration: none; color: inherit; }
  strong { font-weight: 700; }

  /* UTILITIES */
  .container { width: 100%; max-width: 1100px; margin: 0 auto; padding: 0 15px; }
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .text-red { color: #d32f2f; }
  .text-green { color: #2e7d32; }
  .bg-gray { background-color: #f4f6f8; }
  .hidden-desktop { display: block; }
  .hidden-mobile { display: none; }
  .flex { display: flex; flex-wrap: wrap; }
  .items-center { align-items: center; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 1.5rem; }
  .mt-2 { margin-top: 1rem; }
  .gap-2 { gap: 0.5rem; }

  /* TYPOGRAPHY - INCREASED SIZES */
  h1 { font-size: 2rem; line-height: 1.2; font-weight: 800; margin-bottom: 10px; color: #111; }
  h2 { font-size: 1.7rem; font-weight: 700; margin-bottom: 15px; }
  h3 { font-size: 1.4rem; font-weight: 600; margin-bottom: 10px; }
  p { margin-bottom: 1rem; font-size: 1.1rem; color: #555; }
  .price-old { text-decoration: line-through; color: #777; font-size: 1.2rem; }
  .price-new { font-size: 2.4rem; font-weight: 800; color: #d32f2f; }
  .saving-badge { background: #d32f2f; color: white; padding: 3px 10px; border-radius: 4px; font-size: 0.9rem; font-weight: bold; display: inline-block; vertical-align: middle; margin-left: 5px; }

  /* BUTTONS */
  .btn { display: inline-block; width: 100%; background-color: #d32f2f; color: white; font-weight: 700; text-align: center; padding: 18px 24px; border-radius: 6px; font-size: 1.2rem; border: none; cursor: pointer; transition: background 0.2s; text-transform: uppercase; box-shadow: 0 4px 6px rgba(0,0,0,0.15); }
  .btn:hover { background-color: #b71c1c; }
  .btn-green { background-color: #2e7d32; }
  .btn-pulse { animation: pulse 2s infinite; }
  @keyframes pulse {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(211, 47, 47, 0.7); }
      70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(211, 47, 47, 0); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(211, 47, 47, 0); }
  }

  /* SECTIONS */
  .top-strip { background: #111; color: white; text-align: center; padding: 6px 10px; font-size: 0.75rem; margin-top: -8px; }
  .promo-strip { background: #fff3cd; color: #856404; text-align: center; padding: 10px 0; font-weight: 600; font-size: 1rem; border-bottom: 1px solid #ffeeba; margin-top: 20px; }
  .countdown-box { background: #d32f2f; color: white; padding: 5px 10px; font-weight: bold; margin-top: 5px; display: inline-block; border-radius: 4px; }

  .hero { padding: 40px 0; }
  .hero-badges span { display: inline-block; background: #e0e0e0; padding: 6px 10px; border-radius: 4px; font-size: 0.85rem; font-weight: 600; margin-right: 5px; margin-bottom: 5px; color: #333; }
  .check-list li { margin-bottom: 10px; position: relative; padding-left: 28px; font-weight: 500; font-size: 1.05rem; }
  .check-list li:before { content: '✔'; position: absolute; left: 0; color: #2e7d32; font-weight: bold; font-size: 1.2rem; }

  .trust-pills { display: flex; gap: 15px; justify-content: center; margin-top: 20px; font-size: 0.9rem; color: #666; }
  .trust-pills div { display: flex; align-items: center; }

  .hero-img-container { position: relative; margin-bottom: 20px; }
  .overlay-badge { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 8px 15px; border-radius: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); font-size: 0.8rem; font-weight: bold; color: #333; }

  .product-box { border: 2px solid #eee; border-radius: 8px; padding: 25px; margin: 25px 0; background: #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
  .rating-stars { color: #ffc107; font-size: 1.2rem; }

  .benefits-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 30px 0; }
  .benefit-card { background: #f9f9f9; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #eee; }
  .benefit-icon { font-size: 2.2rem; margin-bottom: 12px; display: block; }
  .benefit-card h4 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; line-height: 1.2; }

  .stats-bar { background: #222; color: #fff; padding: 30px 0; text-align: center; }
  .stats-grid { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 20px; }
  .stat-item { flex: 1; min-width: 100px; }
  .stat-val { font-size: 1.6rem; font-weight: 800; color: #fff; display: block; }
  .stat-label { font-size: 0.85rem; text-transform: uppercase; color: #aaa; letter-spacing: 1px; }

  .feature-row { padding: 50px 0; border-bottom: 1px solid #eee; }
  .feature-row:last-child { border-bottom: none; }
  .feature-img { width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); margin-bottom: 25px; }
  .feature-content h3 { color: #d32f2f; text-transform: uppercase; font-size: 1.2rem; letter-spacing: 0.5px; }
  .micro-bullets li { font-size: 1rem; margin-bottom: 6px; color: #555; padding-left: 18px; position: relative; }
  .micro-bullets li:before { content: '•'; position: absolute; left: 0; color: #d32f2f; font-size: 1.2rem; top: -2px; }

  .specs-table, .comp-table { width: 100%; border-collapse: collapse; margin: 25px 0; font-size: 1rem; }
  .specs-table td, .specs-table th { padding: 12px; border-bottom: 1px solid #ddd; }
  .specs-table tr:nth-child(even) { background: #f9f9f9; }
  .comp-table th, .comp-table td { border: 1px solid #ddd; padding: 12px 8px; text-align: center; vertical-align: middle; }
  .comp-table th { background: #f4f4f4; font-size: 0.9rem; }
  .comp-table .highlight-col { background: #fffbe6; border-color: #ffeeba; font-weight: bold; }
  .table-scroll-wrapper { overflow-x: auto; -webkit-overflow-scrolling: touch; margin: 0 -15px; padding: 0 15px; }
  .table-scroll-wrapper .comp-table { min-width: 500px; }
  .load-box { background: #e3f2fd; border: 1px solid #bbdefb; padding: 18px; border-radius: 6px; font-size: 1rem; color: #0d47a1; margin-top: 20px; }

  .urgency-box { background: #fff0f0; border: 2px solid #ffcdd2; padding: 30px 20px; border-radius: 8px; margin: 50px 0; text-align: center; }

  .review-card { background: white; border: 1px solid #eee; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
  .review-header { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 0.95rem; color: #777; }
  .verified-badge { color: #2e7d32; font-size: 0.85rem; display: flex; align-items: center; gap: 4px; font-weight: 600; margin-bottom: 8px; }
  .seller-reply { margin-top: 15px; padding: 12px; background: #f1f8e9; border-left: 3px solid #7cb342; font-size: 0.9rem; color: #33691e; border-radius: 0 4px 4px 0; }

  .steps-container { display: flex; justify-content: space-between; text-align: center; margin: 40px 0; position: relative; }
  .step-item { flex: 1; padding: 0 10px; }
  .step-num { width: 35px; height: 35px; background: #333; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-weight: bold; font-size: 1.1rem; }
  .step-title { font-weight: 700; font-size: 1rem; margin-bottom: 6px; }
  .step-desc { font-size: 0.9rem; color: #666; }

  .accordion-item { border-bottom: 1px solid #eee; }
  .accordion-header { padding: 18px 0; cursor: pointer; font-weight: 600; display: flex; justify-content: space-between; align-items: center; font-size: 1.1rem; }
  .accordion-header:after { content: '+'; font-size: 1.4rem; font-weight: 300; }
  .accordion-item.active .accordion-header:after { content: '-'; }
  .accordion-body { padding-bottom: 18px; font-size: 1.05rem; color: #555; }
  .calc-box { border: 1px dashed #999; padding: 12px; background: #fff; margin-top: 12px; font-family: monospace; font-size: 0.9rem; }

  .sticky-bar { position: fixed; bottom: 0; left: 0; width: 100%; background: white; padding: 15px; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); z-index: 1000; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
  .sticky-price { font-weight: 800; color: #d32f2f; font-size: 1.3rem; line-height: 1; }
  .sticky-sub { font-size: 0.8rem; color: #666; font-weight: normal; }
  .sticky-btn { flex: 1; font-size: 1rem; padding: 14px; }

  /* NEW ORDER FORM STYLES - KEPT MOSTLY SAME SIZE */
  .order-dark-section { background-color: #0f172a; padding: 60px 15px; color: white; margin-top: 50px; }
  .red-pill { background-color: #dc2626; color: white; text-align: center; padding: 12px 20px; font-weight: bold; font-size: 1.1rem; border-radius: 30px; margin: 0 auto 20px; max-width: 500px; box-shadow: 0 4px 10px rgba(220, 38, 38, 0.3); }
  .form-card { background: white; border-radius: 16px; padding: 25px; color: #333; max-width: 600px; margin: 0 auto; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
  .product-highlight { border: 1px solid #f3f4f6; border-radius: 12px; padding: 15px; margin-bottom: 20px; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
  .price-tag-red { color: #d32f2f; font-weight: 800; font-size: 2.2rem; float: right; }
  .tag-badge { display: inline-block; background: #dcfce7; color: #166534; padding: 5px 10px; border-radius: 6px; font-size: 0.75rem; font-weight: 800; margin-right: 5px; text-transform: uppercase; margin-top: 5px; }
  .tag-badge-blue { background: #dbeafe; color: #1e40af; }
  .timer-red-box { background: #fef2f2; border: 1px solid #fee2e2; color: #b91c1c; text-align: center; padding: 14px; border-radius: 8px; font-weight: 700; font-size: 1.1rem; margin-top: 15px; display: flex; align-items: center; justify-content: center; gap: 8px; }
  .input-label { display: block; font-weight: 700; margin-bottom: 8px; font-size: 0.95rem; color: #1f2937; }
  .input-field { width: 100%; padding: 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 1rem; margin-bottom: 20px; background: #fff; transition: all 0.2s; }
  .input-field:focus { border-color: #2563eb; outline: none; box-shadow: 0 0 0 3px rgba(37,99,235,0.1); }
  .payment-select { border: 2px solid #22c55e; background: #f0fdf4; padding: 15px 20px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; cursor: default; }
  .radio-group { display: flex; align-items: center; font-weight: 700; color: #14532d; font-size: 1.05rem; }
  .radio-circle { width: 24px; height: 24px; border: 2px solid #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; background: white; }
  .radio-inner { width: 12px; height: 12px; background: #22c55e; border-radius: 50%; }
  .red-btn { background-color: #d32f2f; color: white; width: 100%; padding: 20px; border-radius: 10px; font-weight: 800; font-size: 1.1rem; border: none; cursor: pointer; text-transform: uppercase; display: flex; align-items: center; justify-content: center; gap: 12px; transition: transform 0.1s, background 0.2s; box-shadow: 0 10px 20px rgba(211, 47, 47, 0.3); }
  .red-btn:hover { background-color: #b71c1c; transform: translateY(-2px); }
  .secure-note { text-align: center; font-size: 0.8rem; color: #9ca3af; margin-top: 20px; display: flex; align-items: center; justify-content: center; gap: 5px; }

  @media (min-width: 768px) {
      h1 { font-size: 2.5rem; }
      .hidden-mobile { display: block; }
      .hidden-desktop { display: none; }
      .hero .container { display: flex; align-items: center; gap: 40px; }
      .hero-content { flex: 1; order: 1; }
      .hero-visual { flex: 1; order: 2; }
      .benefits-grid { grid-template-columns: repeat(4, 1fr); }
      .feature-row { display: flex; align-items: center; gap: 40px; }
      .feature-row:nth-child(even) { flex-direction: row-reverse; }
      .feature-img, .feature-content { flex: 1; margin-bottom: 0; }
      .sticky-bar { display: none; }
      .steps-container { max-width: 800px; margin: 40px auto; }
  }
`;

export default function LandingPage() {
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds
  const [stock, setStock] = useState(12);
  const [qty, setQty] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 2 * 60 * 60;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Stock Decrement Effect
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const decrement = () => {
      if (Math.random() > 0.6 && stock > 3) {
        setStock(s => s - 1);
      }
      timeout = setTimeout(decrement, Math.random() * 20000 + 10000);
    };
    timeout = setTimeout(decrement, 10000);
    return () => clearTimeout(timeout);
  }, [stock]);

  const formatTime = (secs: number) => {
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = secs % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const scrollToOrder = () => {
    const el = document.getElementById('form-fields');
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const btn = (e.target as HTMLFormElement).querySelector('button');
    if (btn) {
      btn.innerText = "PROCESANDO...";
      btn.disabled = true;
    }
    setTimeout(() => {
      window.location.href = '/ty/ty-uc-dryer-es';
    }, 1500);
  };

  const basePrice = 79;
  const totalPrice = qty === 1 ? basePrice : (basePrice * 2) - 10;

  return (
    <>
      <style>{styles}</style>

      <div className="promo-strip">
        🔥 <strong>LIQUIDACIÓN DE STOCK:</strong> Solo quedan <span id="stock-count">{stock}</span> unidades
        <div style={{marginLeft: '10px'}} className="countdown-box">OFERTA FLASH: {formatTime(timeLeft)}</div>
      </div>

      {/* 2. HERO */}
      <section className="hero">
        <div className="container">
          <div className="hero-visual">
            <div className="hero-img-container">
              <img src="/images/dryer/1.jpg" alt="Secadora" width="600" height="600" />
              <div className="overlay-badge">⭐ 4,8/5</div>
            </div>
            <div className="hero-badges text-center">
              <span>⚡ 800W Potencia</span>
              <span>🌡️ Hasta 69°C</span>
              <span>🛑 Auto-Stop NTC</span>
              <span>🔩 Tambor Inox</span>
            </div>
          </div>

          <div className="hero-content">
            <h1>SECA Y SE DETIENE SOLA — SIN DESPERDICIOS</h1>
            <p className="mb-2">Potente (800W), Compacta e Inteligente. La secadora que cuida tu ropa y tu bolsillo gracias al sensor NTC.</p>

            <div className="mb-2">
              <span className="price-old">199,99€</span>
              <span className="price-new"> 79€</span>
              <span className="saving-badge">AHORRAS 120€</span>
              <div style={{fontSize: '0.9rem', color: '#2e7d32', marginTop: '5px'}}>🚚 Envío Gratuito (solo España peninsular)</div>
              <div style={{fontSize: '0.9rem', color: '#555'}}>🎁 Bonus: Conducto de escape incluido</div>
            </div>

            <ul className="check-list mb-3">
              <li><strong>Menos desperdicios:</strong> Sensor Auto-Stop cuando la ropa está seca</li>
              <li><strong>Práctica y Manejable:</strong> Pequeña y ligera, ideal para espacios reducidos</li>
              <li><strong>Higiene profunda:</strong> Temperatura hasta 69°C</li>
              <li><strong>Anti-enredos:</strong> Rotación bidireccional inteligente</li>
              <li><strong>Control total:</strong> 4 temperaturas + 6 temporizadores</li>
              <li><strong>Instalación 3-en-1:</strong> Pared, libre o apilada</li>
            </ul>

            <button onClick={scrollToOrder} className="btn btn-pulse">PEDIR AHORA — PAGO CONTRA REEMBOLSO</button>

            <div className="trust-pills">
              <div>📦 Envío Rápido</div>
              <div>🛡️ Garantía 2 Años</div>
              <div>🤝 Asistencia Dedicada</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT BOX */}
      <section className="container">
        <div className="product-box">
          <h3 className="text-center">RESUMEN DE LA OFERTA</h3>
          <div className="flex items-center justify-between mb-2">
            <div>
              <strong>Secadora Costway 800W</strong><br/>
              <span className="rating-stars">★★★★★</span> <small>(697 reseñas)</small>
            </div>
            <div className="text-right">
              <div className="price-new" style={{fontSize: '1.6rem'}}>79€</div>
              <div className="price-old">199,99€</div>
            </div>
          </div>
          <div style={{fontSize: '1rem', marginBottom: '15px', color: '#555', background: '#f4f6f8', padding: '12px', borderRadius: '4px'}}>
            ✅ Clase Energética C<br/>
            ✅ Dimensiones: 48 × 40 × 56 cm<br/>
            ✅ Pago cómodo contra reembolso
          </div>
          <button onClick={scrollToOrder} className="btn">QUIERO RECIBIRLA EN CASA</button>
          <p className="text-center mt-2" style={{fontSize: '0.9rem', color: '#d32f2f'}}>🔥 A este precio solo quedan pocas unidades</p>
        </div>
      </section>

      {/* 4. BENEFITS */}
      <section className="container">
        <h2 className="text-center mb-3">OLVÍDATE DEL PROBLEMA DE TENDER</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <span className="benefit-icon">🛑</span>
            <h4>MENOS DESPERDICIOS</h4>
            <p style={{fontSize:'1rem'}}>Gracias al sensor NTC, se detiene sola cuando la ropa está seca.</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">💰</span>
            <h4>PRECIO INTELIGENTE</h4>
            <p style={{fontSize:'1rem'}}>Prestaciones de alto nivel sin gastar 600€+ en máquinas voluminosas.</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">👕</span>
            <h4>MENOS ARRUGAS</h4>
            <p style={{fontSize:'1rem'}}>La rotación adelante/atrás reduce los enredos facilitando el planchado.</p>
          </div>
          <div className="benefit-card">
            <span className="benefit-icon">🎛️</span>
            <h4>CONTROL TOTAL</h4>
            <p style={{fontSize:'1rem'}}>4 modos de calor y 6 temporizadores para tratar cada tejido como merece.</p>
          </div>
        </div>
      </section>

      {/* 5. STATS */}
      <div className="stats-bar">
        <div className="container">
          <h3 style={{color:'white', marginBottom: '20px'}}>NÚMEROS QUE HABLAN</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-val">800W</span>
              <span className="stat-label">Potencia</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">69°C</span>
              <span className="stat-label">Temp Máx</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">4,8/5</span>
              <span className="stat-label">Valoración</span>
            </div>
            <div className="stat-item">
              <span className="stat-val">16kg</span>
              <span className="stat-label">Peso Neto</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. FEATURES */}
      <section className="container" style={{marginTop: '40px'}}>
        <div className="feature-row">
          <img src="/images/dryer/2.png" alt="Sensor NTC" className="feature-img" />
          <div className="feature-content">
            <h3>AUTO-STOP NTC: SE DETIENE CUANDO ESTÁ LISTO</h3>
            <p>Basta de desperdicios de energía. El chip inteligente detecta la humedad y detiene la máquina automáticamente cuando la ropa está seca.</p>
            <ul className="micro-bullets">
              <li>Protege los tejidos del calor excesivo</li>
              <li>Optimiza el consumo energético</li>
            </ul>
          </div>
        </div>

        <div className="feature-row">
          <img src="/images/dryer/3.png" alt="Temperatura 69 Grados" className="feature-img" />
          <div className="feature-content">
            <h3>HASTA 69°C + PTC CERÁMICO</h3>
            <p>El calentamiento cerámico rápido alcanza temperaturas que ofrecen una mayor sensación de higiene y suavidad en la ropa.</p>
            <ul className="micro-bullets">
              <li>Secado profundo y rápido</li>
              <li>Ideal para ropa interior y toallas</li>
            </ul>
          </div>
        </div>

        <div className="feature-row">
            <img src="/images/dryer/4.png" alt="Tambor Inox" className="feature-img" />
            <div className="feature-content">
                <h3>ANTI-ENREDOS: ROTACIÓN INTELIGENTE</h3>
                <p>El tambor de acero inoxidable no gira solo en un sentido. La rotación inversa periódica desenreda la ropa.</p>
                <ul className="micro-bullets">
                    <li>Ropa menos arrugada</li>
                    <li>Planchado mucho más fácil y rápido</li>
                </ul>
            </div>
        </div>

        <div className="feature-row">
            <img src="/images/dryer/5.png" alt="Ahorro Espacio" className="feature-img" />
            <div className="feature-content">
                <h3>NO TE QUITA ESPACIO. TE RESUELVE LA COLADA.</h3>
                <p>Si la única razón por la que aplazas la secadora es "no quiero un trasto enorme", esta es la solución inteligente.</p>
                <ul className="micro-bullets">
                    <li>Compactísima: cabe incluso en espacios "normales"</li>
                    <li>Instalación flexible: pared / apoyo / apilable</li>
                    <li>Practicidad total: pequeñas cargas cuando las necesitas, sin esperar</li>
                </ul>
            </div>
        </div>
      </section>

      {/* 7. SPECS */}
      <section className="container bg-gray" style={{padding: '30px', borderRadius: '8px', marginTop: '30px'}}>
        <h2 className="text-center">ESPECIFICACIONES TÉCNICAS</h2>
        <table className="specs-table">
            <tbody>
              <tr><td><strong>Dimensiones</strong></td><td>48 × 40 × 56 cm</td></tr>
              <tr><td><strong>Peso Neto</strong></td><td>16,4 kg</td></tr>
              <tr><td><strong>Capacidad</strong></td><td>Hasta 5 kg (Máx)</td></tr>
              <tr><td><strong>Potencia</strong></td><td>800 W</td></tr>
              <tr><td><strong>Voltaje/Frec.</strong></td><td>220–240V / 50–60Hz</td></tr>
              <tr><td><strong>Ruido</strong></td><td>Silenciosa (Estándar doméstico)</td></tr>
              <tr><td><strong>Contenido</strong></td><td>1 Secadora, 1 Escape, 1 Manual</td></tr>
            </tbody>
        </table>
      </section>

      {/* 8. COMPARISON */}
      <section className="container" style={{marginTop: '40px'}}>
        <h2 className="text-center">¿POR QUÉ CONVIENE?</h2>
        <div className="table-scroll-wrapper">
          <table className="comp-table">
              <thead>
                  <tr>
                      <th>Característica</th>
                      <th className="highlight-col">ESTA COMPACTA</th>
                      <th>Secadoras XXL</th>
                      <th>Tendedero en casa</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td>Inversión</td>
                      <td className="highlight-col">✅ 79€ (Bajo)</td>
                      <td>❌ 500€ - 900€</td>
                      <td>✅ 30€</td>
                  </tr>
                  <tr>
                      <td>Auto-Stop (Desperdicios)</td>
                      <td className="highlight-col">✅ Sí (Sensor NTC)</td>
                      <td>✅ Sí</td>
                      <td>❌ No (Humedad en casa)</td>
                  </tr>
                  <tr>
                      <td>Espacio</td>
                      <td className="highlight-col">✅ Mínimo</td>
                      <td>❌ Enorme</td>
                      <td>❌ Ocupa una habitación</td>
                  </tr>
                  <tr>
                      <td><strong>Precio Final</strong></td>
                      <td className="highlight-col text-red"><strong>79€</strong></td>
                      <td>Alto</td>
                      <td>Bajo (pero incómodo)</td>
                  </tr>
              </tbody>
          </table>
        </div>
      </section>

      {/* 9. URGENCY */}
      <section className="container">
          <div className="urgency-box">
              <h3>⚠️ ÚLTIMAS UNIDADES EN ALMACÉN</h3>
              <p>La demanda es altísima. Asegura tu unidad antes de que se agoten.</p>
              <div className="price-new mb-2">79€ <span className="price-old">199,99€</span></div>
              <p style={{fontSize: '0.9rem', color: '#555'}}>Cuando termine la promo, el precio volverá a 199,99€</p>
              <button onClick={scrollToOrder} className="btn btn-pulse" style={{maxWidth: '400px', margin: '10px auto'}}>BLOQUEA EL PRECIO AHORA</button>
          </div>
      </section>

      {/* 10. REVIEWS */}
      <section className="container">
        <h2 className="text-center mb-3">QUÉ DICEN LOS CLIENTES</h2>
        <p className="text-center mb-3">Valoración media: ⭐ 4,8/5 (697 reseñas)</p>

        <div className="review-card">
            <div className="review-header">
                <strong>María R. (Madrid)</strong>
                <span>Hace 5 días</span>
            </div>
            <div className="verified-badge">✅ Compra verificada</div>
            <p>"Vivo en un estudio y esta secadora me ha salvado la vida. Ya no tengo el tendedero en medio de la habitación. Seca bien, el sensor funciona de verdad: se para cuando la ropa está lista."</p>
        </div>

        <div className="review-card">
            <div className="review-header">
                <strong>Carlos T. (Barcelona)</strong>
                <span>Hace 1 semana</span>
            </div>
            <div className="verified-badge">✅ Compra verificada</div>
            <p>"Al principio era escéptico por el tamaño, pero es perfecta para mis necesidades. La ropa sale caliente y suave. Consume lo justo si se usa con inteligencia."</p>
            <div className="seller-reply">
                <strong>Respuesta del vendedor:</strong> ¡Gracias Carlos! Nos alegra que el producto cumpla tus expectativas.
            </div>
        </div>
      </section>

      {/* 12. STEPS */}
      <section className="container">
          <h2 className="text-center" style={{marginTop: '40px'}}>CÓMO PEDIR</h2>
          <div className="steps-container">
              <div className="step-item">
                  <div className="step-num">1</div>
                  <div className="step-title">Completa</div>
                  <div className="step-desc">Introduce tus datos en el formulario.</div>
              </div>
              <div className="step-item">
                  <div className="step-num">2</div>
                  <div className="step-title">Confirma</div>
                  <div className="step-desc">El pedido se procesa inmediatamente.</div>
              </div>
              <div className="step-item">
                  <div className="step-num">3</div>
                  <div className="step-title">Paga</div>
                  <div className="step-desc">Pagas en efectivo al mensajero.</div>
              </div>
          </div>
      </section>

      {/* 13. NEW ORDER FORM REDESIGN */}
      <section id="order-form" className="order-dark-section">
        <div className="container">
            <div className="red-pill">Solo quedan 4 unidades a este precio</div>
            <h1 className="text-center text-white mb-2" style={{color:'white', fontSize: '3rem'}}>Pide Ahora</h1>
            <p className="text-center mb-3" style={{color: '#9ca3af'}}>Completa el formulario. Pagas solo a la entrega.</p>

            <form className="form-card" onSubmit={handleOrderSubmit}>

                {/* Product Highlight Box */}
                <div className="product-highlight">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 style={{fontSize: '1.2rem', margin:0}}>Secadora Costway 800W</h3>
                            <div style={{color: '#6b7280', fontSize: '0.9rem'}}>+ Kit Escape + Manual</div>
                        </div>
                        <div style={{textAlign: 'right'}}>
                            <div className="price-old" style={{fontSize: '0.9rem'}}>€199,99</div>
                            <div className="price-tag-red">€{totalPrice.toFixed(2).replace('.', ',')}</div>
                        </div>
                    </div>
                    <div style={{marginTop: '10px'}}>
                        <span className="tag-badge">ENVÍO GRATIS</span>
                        <span className="tag-badge tag-badge-blue">GARANTÍA 2 AÑOS</span>
                    </div>

                    {/* Timer Red Box */}
                    <div className="timer-red-box">
                        <span style={{fontSize: '1.2rem'}}>⏱</span> Oferta expira en: {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Form Fields */}
                <div id="form-fields" className="form-group">
                    <label className="input-label">Nombre y Apellidos *</label>
                    <input type="text" className="input-field" required placeholder="Juan García" />
                </div>

                <div className="form-group">
                    <label className="input-label">Teléfono (para el mensajero) *</label>
                    <input type="tel" className="input-field" required placeholder="+34 612 345 678" />
                </div>

                <div className="form-group">
                    <label className="input-label">Dirección Completa *</label>
                    <input type="text" className="input-field" required placeholder="Calle Mayor 10, 28001 Madrid" />
                </div>

                {/* Payment Selection */}
                <div className="payment-select">
                    <div className="radio-group">
                        <div className="radio-circle">
                            <div className="radio-inner"></div>
                        </div>
                        Pago Contra Reembolso
                    </div>
                    <div style={{fontSize: '1.5rem'}}>💶</div>
                </div>

                <button type="submit" className="red-btn">
                    CONFIRMAR PEDIDO — PAGO AL RECIBIR <span style={{fontSize:'1.3rem'}}>🚚</span>
                </button>

                <div className="secure-note">
                    <span>🔒</span> Tus datos están protegidos y cifrados con SSL. Los usamos SOLO para el envío.
                </div>

            </form>
        </div>
      </section>

      {/* 14. FAQ */}
      <section className="container" style={{marginTop: '40px', marginBottom: '60px'}}>
        <h2 className="text-center mb-3">PREGUNTAS FRECUENTES</h2>

        {[
          {
            q: "¿Necesita un desagüe?",
            a: "No, no necesita una tubería de agua como la lavadora. Esta es una secadora de ventilación (venting). El aire húmedo se expulsa a través del conducto de escape (incluido)."
          },
          {
            q: "¿Cuánto consume realmente?",
            a: "La potencia es de 800W. Fórmula estimada: 0,8 kW × Horas. Si un ciclo dura 2 horas y la energía cuesta 0,30€/kWh, gastas aproximadamente 0,48€ por ciclo."
          },
          {
            q: "¿Es difícil de instalar?",
            a: "En absoluto. Llega ya montada. Solo tienes que conectar el enchufe y el tubo de escape en la parte trasera."
          },
          {
            q: "¿Cuánta ropa puedo meter?",
            a: "Capacidad máxima 5 kg (mojado). Ideal para secar camisetas, ropa interior, toallas y sábanas."
          }
        ].map((faq, i) => (
          <div key={i} className={`accordion-item ${openAccordion === i ? 'active' : ''}`}>
            <div className="accordion-header" onClick={() => setOpenAccordion(openAccordion === i ? null : i)}>{faq.q}</div>
            {openAccordion === i && <div className="accordion-body">{faq.a}</div>}
          </div>
        ))}

      </section>

      {/* STICKY BAR */}
      <div className="sticky-bar hidden-desktop">
        <div>
            <div className="sticky-price">79€</div>
            <div className="sticky-sub">Pago a la entrega</div>
        </div>
        <button onClick={scrollToOrder} className="btn sticky-btn">PEDIR AHORA</button>
      </div>
    </>
  );
}

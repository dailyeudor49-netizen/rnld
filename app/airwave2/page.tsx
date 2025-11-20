'use client';

import React, { useState, useEffect } from 'react';

/**
 * LANDING PAGE REBRANDING - AIR WAVE SMART™
 * Design Philosophy: "Modern, Curved, High-Trust"
 */

export default function LandingPage() {
  // --- STATE MANAGEMENT ---
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('riscaldamento');
  const [formStep, setFormStep] = useState(1); // Per animare il form se volessi farlo a step (qui semplificato)
  const [timeLeft, setTimeLeft] = useState({ m: 15, s: 0 }); // Fake scarcity timer

  // --- SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Timer countdown logic
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s === 0) {
          if (prev.m === 0) return prev;
          return { m: prev.m - 1, s: 59 };
        }
        return { ...prev, s: prev.s - 1 };
      });
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  // --- SMOOTH SCROLL ---
  const scrollToOrder = () => {
    const el = document.getElementById('order-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  // --- SUBMIT HANDLER ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Ordine ricevuto! Grazie per aver scelto Air Wave Smart.");
  };

  return (
    <div className="font-sans text-slate-800 antialiased selection:bg-orange-100 selection:text-orange-600" style={{ fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: '#F8FAFC', overflowX: 'hidden' }}>
      
      {/* --- STYLES INLINE (Per semplicità, ma ideale in CSS separato) --- */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 0 0 rgba(255, 136, 0, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(255, 136, 0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 136, 0, 0); }
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.5);
        }
        .gradient-text {
          background: linear-gradient(135deg, #FFB800 0%, #FF7A00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .btn-primary {
          background: linear-gradient(135deg, #FFB800 0%, #FF7A00 100%);
          color: white;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px -5px rgba(255, 122, 0, 0.4);
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(255, 122, 0, 0.5);
        }
        .feature-card {
          transition: all 0.3s ease;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          background: white;
          box-shadow: 0 20px 40px -5px rgba(0,0,0,0.05);
        }
      `}</style>

      {/* --- NAVBAR FLUTTUANTE --- */}
      <nav style={{ 
        position: 'fixed', top: scrolled ? '1rem' : '0', left: 0, right: 0, zIndex: 50,
        maxWidth: scrolled ? '90%' : '100%', margin: '0 auto',
        borderRadius: scrolled ? '100px' : '0',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        background: scrolled ? 'rgba(255,255,255,0.95)' : 'white',
        backdropFilter: 'blur(10px)',
        boxShadow: scrolled ? '0 10px 30px rgba(0,0,0,0.08)' : 'none',
        padding: '1rem 2rem', borderBottom: scrolled ? 'none' : '1px solid #f1f5f9'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ fontWeight: 800, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'linear-gradient(135deg, #FFB800, #FF7A00)' }}></div>
            <span>AirWave<span className="gradient-text">Smart™</span></span>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <span style={{ display: 'none', fontSize: '0.9rem', fontWeight: 500, color: '#64748b' }}>@media (min-width: 768px) {'{ display: block }'}</span> 
            {/* Nota: In React puro senza Tailwind le media query inline sono complesse, qui nascondo per brevità o uso classi CSS se presenti */}
            
            <button onClick={scrollToOrder} className="btn-primary" style={{ 
              padding: '0.75rem 1.5rem', borderRadius: '100px', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' 
            }}>
              Ordina Ora -50%
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION (Curva e Immersiva) --- */}
      <header style={{ 
        paddingTop: '140px', paddingBottom: '100px', position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(circle at 10% 20%, rgba(255, 184, 0, 0.05) 0%, transparent 40%)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          
          {/* Left Content */}
          <div style={{ zIndex: 2 }}>
            <div style={{ 
              display: 'inline-block', padding: '6px 16px', borderRadius: '100px', 
              background: '#FEF3C7', color: '#D97706', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1.5rem',
              border: '1px solid #FDE68A'
            }}>
              🚀 Best Seller Inverno 2024
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1, fontWeight: 800, color: '#0F172A', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
              Il clima perfetto.<br />
              <span className="gradient-text">Senza unità esterna.</span>
            </h1>
            <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '500px' }}>
              Riscalda, raffredda e purifica l'aria della tua casa in <strong>pochi minuti</strong>. 
              La tecnologia ThermoPanel™ ti fa risparmiare fino al 60% in bolletta.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <button onClick={scrollToOrder} className="btn-primary" style={{ 
                padding: '1rem 2.5rem', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 700, border: 'none', cursor: 'pointer', flex: 1, textAlign: 'center' 
              }}>
                Acquista a €69,99
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 1rem' }}>
                <div style={{ display: 'flex' }}>{'⭐⭐⭐⭐⭐'.split('').map((s,i) => <span key={i}>{s}</span>)}</div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#334155' }}>4.9/5</span>
              </div>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '1rem' }}>
              ⏳ Offerta valida fino ad esaurimento scorte
            </p>
          </div>

          {/* Right Image (Floating) */}
          <div style={{ position: 'relative', animation: 'float 6s ease-in-out infinite' }}>
            {/* Decorative Blobs behind image */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '120%', height: '120%', background: 'radial-gradient(circle, rgba(255, 184, 0, 0.2) 0%, transparent 70%)', zIndex: -1 }}></div>
            
            <div className="glass-panel" style={{ borderRadius: '32px', padding: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}>
               <img src="img/specifiche.webp" alt="Air Wave Smart" style={{ width: '100%', borderRadius: '20px', display: 'block' }} />
               
               {/* Floating Badge */}
               <div style={{ 
                 position: 'absolute', bottom: '40px', left: '-20px', background: 'white', 
                 padding: '1rem', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                 display: 'flex', alignItems: 'center', gap: '12px'
               }}>
                 <div style={{ background: '#DEF7EC', padding: '10px', borderRadius: '10px', color: '#059669' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                 </div>
                 <div>
                   <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Risparmio</div>
                   <div style={{ fontSize: '1.1rem', color: '#0F172A', fontWeight: 800 }}>-60% Bolletta</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- LOGO/TRUST STRIP --- */}
      <div style={{ background: 'white', padding: '2rem 0', borderTop: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Tecnologia approvata da</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', opacity: 0.5, filter: 'grayscale(100%)' }}>
             {/* Placeholder logos */}
             {['CasaFacile', 'TechHome', 'EcoEnergy', 'Focus'].map((logo, i) => (
               <span key={i} style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'serif' }}>{logo}</span>
             ))}
          </div>
        </div>
      </div>

      {/* --- INTERACTIVE FEATURE SELECTOR --- */}
      <section style={{ padding: '5rem 1.5rem', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem' }}>
            Non è solo un condizionatore.
          </h2>
          <p style={{ color: '#64748b', marginBottom: '3rem', fontSize: '1.1rem' }}>È il tuo sistema di climatizzazione completo 3-in-1.</p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            {['riscaldamento', 'raffrescamento', 'purificazione'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '0.75rem 2rem', borderRadius: '100px', border: 'none', cursor: 'pointer',
                  fontSize: '1rem', fontWeight: 600, textTransform: 'capitalize',
                  background: activeTab === tab ? '#0F172A' : 'white',
                  color: activeTab === tab ? 'white' : '#64748b',
                  boxShadow: activeTab === tab ? '0 10px 25px -5px rgba(15, 23, 42, 0.3)' : '0 2px 5px rgba(0,0,0,0.05)'
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="glass-panel" style={{ 
            borderRadius: '24px', padding: '3rem', textAlign: 'left', display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center',
            background: 'white'
          }}>
            <div style={{ order: 1 }}>
              {activeTab === 'riscaldamento' && (
                <>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#D97706', marginBottom: '1rem' }}>Caldo Avvolgente in 2 Minuti</h3>
                  <p style={{ color: '#475569', lineHeight: 1.6 }}>Grazie alla ceramica termica avanzata, Air Wave Smart riscalda stanze fino a 60mq senza seccare l'aria. Ideale per l'inverno rigido, sostituisce costosi termosifoni elettrici.</p>
                  <ul style={{ marginTop: '1.5rem', display: 'grid', gap: '0.75rem' }}>
                    <li style={{ display: 'flex', gap: '10px' }}><span>🔥</span> Termostato intelligente</li>
                    <li style={{ display: 'flex', gap: '10px' }}><span>⚡</span> Consumo ridotto (Modalità ECO)</li>
                  </ul>
                </>
              )}
              {activeTab === 'raffrescamento' && (
                <>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0284C7', marginBottom: '1rem' }}>Fresco Polare, Zero Unità Esterna</h3>
                  <p style={{ color: '#475569', lineHeight: 1.6 }}>Nessun bisogno di bucare la facciata del condominio. La tecnologia di ricircolo interno raffredda l'aria e rimuove l'umidità in eccesso per un comfort estivo perfetto.</p>
                </>
              )}
              {activeTab === 'purificazione' && (
                <>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#059669', marginBottom: '1rem' }}>Aria Pura, Vita Sana</h3>
                  <p style={{ color: '#475569', lineHeight: 1.6 }}>Il filtro integrato cattura polvere, allergeni e particelle sospese. Non stai solo climatizzando la tua casa, la stai rendendo un posto più sicuro per la tua famiglia.</p>
                </>
              )}
            </div>
            <div style={{ order: 2 }}>
              <img 
                src={`img/${activeTab === 'riscaldamento' ? 'riscaldamento.webp' : activeTab === 'raffrescamento' ? 'caldo-freddo.webp' : 'silenzioso.webp'}`} 
                alt="Feature" 
                style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- GRID BENEFITS (Carte arrotondate) --- */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { icon: "🔌", title: "Zero Installazione", text: "Lo attacchi alla presa ed è pronto. Include staffa a muro o piedini per appoggio." },
            { icon: "🔇", title: "Ultra Silenzioso", text: "Modalità notte a soli 20dB. Dormi sonni tranquilli senza ronzii." },
            { icon: "📱", title: "Smart WiFi", text: "Controllalo dallo smartphone. Trova la casa calda quando rientri da lavoro." },
            { icon: "💶", title: "Pagamento alla Consegna", text: "Ordini oggi, paghi solo quando il corriere ti consegna il pacco." },
          ].map((card, i) => (
            <div key={i} className="feature-card" style={{ padding: '2rem', borderRadius: '24px', background: '#F1F5F9', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{card.icon}</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.5rem' }}>{card.title}</h3>
              <p style={{ color: '#64748b', lineHeight: 1.5 }}>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- OFFERTA / CHECKOUT SECTION (Design professionale) --- */}
      <section id="order-section" style={{ background: '#1E293B', padding: '5rem 1.5rem', color: 'white', position: 'relative' }}>
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '300px', height: '300px', background: '#FFB800', filter: 'blur(150px)', opacity: 0.1 }}></div>
        
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'start' }}>
          
          {/* Left: Product Summary */}
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>L'offerta scade tra:</h2>
            <div style={{ display: 'inline-flex', gap: '1rem', fontSize: '2rem', fontWeight: 700, color: '#FFB800', fontFamily: 'monospace', marginBottom: '2rem' }}>
              <span>{timeLeft.m < 10 ? `0${timeLeft.m}` : timeLeft.m}m</span>
              <span>:</span>
              <span>{timeLeft.s < 10 ? `0${timeLeft.s}` : timeLeft.s}s</span>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
                <img src="img/specifiche.webp" alt="Prod" style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} />
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>Air Wave Smart™ Kit</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Include Telecomando + App</div>
                </div>
              </div>
              <ul style={{ space: 'y-2', color: '#cbd5e1' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Prezzo Listino</span> <span style={{ textDecoration: 'line-through' }}>€149,99</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span>Sconto Black Friday</span> <span style={{ color: '#FFB800' }}>-€80,00</span>
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

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>NOME</label>
                  <input required type="text" placeholder="Mario" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>COGNOME</label>
                  <input required type="text" placeholder="Rossi" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>INDIRIZZO DI SPEDIZIONE</label>
                <input required type="text" placeholder="Via Roma 123" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>CITTÀ</label>
                  <input required type="text" placeholder="Milano" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>CAP</label>
                  <input required type="text" placeholder="20100" style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', marginBottom: '4px', display: 'block' }}>TELEFONO (per corriere)</label>
                <input required type="tel" placeholder="+39 333..." style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: '#F8FAFC' }} />
              </div>

              <div style={{ margin: '1rem 0', padding: '1rem', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                 <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>✓</div>
                 <span style={{ fontSize: '0.9rem', color: '#166534', fontWeight: 600 }}>Spedizione Express Gratuita applicata</span>
              </div>

              <button type="submit" className="btn-primary" style={{ 
                width: '100%', padding: '1.2rem', borderRadius: '12px', fontSize: '1.1rem', fontWeight: 700, border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'
              }}>
                <span>Conferma Ordine</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </form>
          </div>

        </div>
      </section>
      
      <footer style={{ textAlign: 'center', padding: '2rem', color: '#64748b', fontSize: '0.9rem' }}>
        <p>&copy; 2024 Air Wave Smart. Tutti i diritti riservati.</p>
        <p style={{ marginTop: '0.5rem' }}>Privacy Policy • Termini e Condizioni • Contatti</p>
      </footer>

    </div>
  );
}
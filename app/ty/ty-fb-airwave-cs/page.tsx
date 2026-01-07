'use client';

import { useState, useEffect } from 'react';
import { retryFailedLeads, getLeadStatus, clearLeadStatus } from '@/app/lib/network/api';

type PopupState = 'none' | 'error' | 'success';

export default function ThankYouPage() {
  const [orderCode, setOrderCode] = useState('');
  const [popup, setPopup] = useState<PopupState>('none');

  useEffect(() => {
    const initPage = async () => {
      const status = getLeadStatus();

      if (status === 'failed') {
        setPopup('error');
        const retrySuccess = await retryFailedLeads();
        if (retrySuccess) {
          setPopup('success');
          clearLeadStatus();
        }
      } else if (status === 'success') {
        clearLeadStatus();
      } else {
        const retrySuccess = await retryFailedLeads();
        if (retrySuccess) {
          setPopup('success');
        }
      }

      const stored = sessionStorage.getItem('orderCode');
      if (stored) {
        setOrderCode(stored);
      } else {
        const newCode = 'AWS-' + Math.floor(100000 + Math.random() * 900000).toString();
        sessionStorage.setItem('orderCode', newCode);
        setOrderCode(newCode);
      }
    };

    initPage();
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #16a34a 0%, #15803d 50%, #166534 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      position: 'relative'
    }}>
      {/* Error Popup */}
      {popup === 'error' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#FEE2E2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem' }}>
              Vyskytl se problém
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Při potvrzení objednávky došlo k chybě. Prosím, obnovte stránku za chvíli, dokud se nezobrazí potvrzení.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                background: '#DC2626',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Obnovit stránku
            </button>
          </div>
        </div>
      )}

      {/* Success Popup */}
      {popup === 'success' && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            maxWidth: '400px',
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 25px 50px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: '#D1FAE5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', marginBottom: '0.75rem' }}>
              Objednávka potvrzena
            </h3>
            <p style={{ color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Omlouváme se za předchozí komplikace. Vaše objednávka byla úspěšně potvrzena.
            </p>
            <button
              onClick={() => setPopup('none')}
              style={{
                background: '#059669',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '2.5rem 2rem',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)'
      }}>
        {/* Animated check */}
        <div style={{
          width: '90px',
          height: '90px',
          background: '#16a34a',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 10px 30px rgba(22, 163, 74, 0.4)'
        }}>
          <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>

        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: '#111827',
          marginBottom: '0.5rem'
        }}>
          Objednávka Potvrzena!
        </h1>

        <p style={{
          color: '#6b7280',
          fontSize: '0.95rem',
          marginBottom: '1.5rem',
          lineHeight: 1.5
        }}>
          Vaše klimatizace Air Wave Smart™ se připravuje a brzy bude odeslána.
        </p>

        {/* Order code */}
        <div style={{
          background: '#F0FDF4',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          border: '2px solid #16a34a'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#166534', fontWeight: 600, marginBottom: '0.25rem' }}>ČÍSLO OBJEDNÁVKY</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16a34a', letterSpacing: '1px', fontFamily: 'monospace' }}>{orderCode}</div>
        </div>

        {/* Timeline */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '1rem' }}>📦 Další kroky:</div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>1</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Příprava objednávky</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Dnes</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>2</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Odeslání</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Do 24 hodin</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>3</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Doručení</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>2-3 pracovní dny</div>
            </div>
          </div>
        </div>

        {/* Payment reminder */}
        <div style={{
          background: '#FEF3C7',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textAlign: 'left'
        }}>
          <span style={{ fontSize: '1.5rem' }}>💰</span>
          <div>
            <div style={{ fontWeight: 600, color: '#92400e', fontSize: '0.9rem' }}>Platba na dobírku</div>
            <div style={{ color: '#a16207', fontSize: '0.8rem' }}>Připravte si přesnou částku pro kurýra</div>
          </div>
        </div>

        {/* Contact */}
        <div style={{
          fontSize: '0.85rem',
          color: '#64748b',
          marginBottom: '1.5rem'
        }}>
          Máte dotazy? Kontaktujte nás: <a href="mailto:info@ketronica.com" style={{ color: '#16a34a', fontWeight: 600, textDecoration: 'none' }}>info@ketronica.com</a>
        </div>

        <a href="/" style={{
          display: 'inline-block',
          background: '#16a34a',
          color: 'white',
          padding: '0.875rem 2rem',
          borderRadius: '10px',
          fontSize: '0.95rem',
          fontWeight: 600,
          textDecoration: 'none'
        }}>
          Zpět na Hlavní Stránku
        </a>
      </div>
    </div>
  );
}

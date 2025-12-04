'use client';

import React, { useState, useEffect } from 'react';

export default function ThankYouPage() {
  const [orderCode, setOrderCode] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('orderCode');
    if (stored) {
      setOrderCode(stored);
    } else {
      const newCode = 'OC360-' + Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem('orderCode', newCode);
      setOrderCode(newCode);
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #ea580c 0%, #c2410c 50%, #9a3412 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
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
          background: '#ea580c',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 10px 30px rgba(234, 88, 12, 0.4)'
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
          Váš OmniClima 360™ se připravuje a brzy bude odeslán.
        </p>

        {/* Order code */}
        <div style={{
          background: '#FFF7ED',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          border: '2px solid #ea580c'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#9a3412', fontWeight: 600, marginBottom: '0.25rem' }}>ČÍSLO OBJEDNÁVKY</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ea580c', letterSpacing: '1px', fontFamily: 'monospace' }}>{orderCode}</div>
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
            <div style={{ width: '24px', height: '24px', background: '#ea580c', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>1</div>
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
            <div style={{ color: '#a16207', fontSize: '0.8rem' }}>Připravte si přesnou částku (1 990 Kč) pro kurýra</div>
          </div>
        </div>

        {/* Contact */}
        <div style={{
          fontSize: '0.85rem',
          color: '#64748b',
          marginBottom: '1.5rem'
        }}>
          Máte dotazy? Napište nám: <a href="mailto:info@ketronica.com" style={{ color: '#ea580c', fontWeight: 600, textDecoration: 'none' }}>info@ketronica.com</a>
        </div>

        <a href="/" style={{
          display: 'inline-block',
          background: '#ea580c',
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

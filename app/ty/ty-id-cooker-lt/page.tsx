'use client';

import React, { useState, useEffect } from 'react';

export default function ThankYouPage() {
  const [orderCode, setOrderCode] = useState('');

  useEffect(() => {
    const stored = sessionStorage.getItem('orderCode');
    if (stored) {
      setOrderCode(stored);
    } else {
      const newCode = 'MC-' + Math.floor(100000 + Math.random() * 900000).toString();
      sessionStorage.setItem('orderCode', newCode);
      setOrderCode(newCode);
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #10b981 0%, #059669 50%, #047857 100%)',
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
        <div style={{
          width: '90px',
          height: '90px',
          background: '#10b981',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)'
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
          Užsakymas Patvirtintas!
        </h1>

        <p style={{
          color: '#6b7280',
          fontSize: '0.95rem',
          marginBottom: '1.5rem',
          lineHeight: 1.5
        }}>
          Jūsų Virtuvės Robotas 12 viename ruošiamas ir netrukus bus išsiųstas.
        </p>

        <div style={{
          background: '#ECFDF5',
          borderRadius: '12px',
          padding: '1rem',
          marginBottom: '1.5rem',
          border: '2px solid #10b981'
        }}>
          <div style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 600, marginBottom: '0.25rem' }}>UŽSAKYMO NUMERIS</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#10b981', letterSpacing: '1px', fontFamily: 'monospace' }}>{orderCode}</div>
        </div>

        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
          textAlign: 'left'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1E293B', marginBottom: '1rem' }}>📦 Tolesni žingsniai:</div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>1</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Užsakymo paruošimas</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Šiandien</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>2</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Išsiuntimas</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>Per 24 valandas</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{ width: '24px', height: '24px', background: '#94a3b8', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 700, flexShrink: 0 }}>3</div>
            <div>
              <div style={{ fontWeight: 600, color: '#1E293B', fontSize: '0.9rem' }}>Pristatymas</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>2-4 darbo dienos</div>
            </div>
          </div>
        </div>

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
            <div style={{ fontWeight: 600, color: '#92400e', fontSize: '0.9rem' }}>Apmokėjimas pristatymo metu</div>
            <div style={{ color: '#a16207', fontSize: '0.8rem' }}>Paruoškite tikslią sumą (€69,00) kurjeriui</div>
          </div>
        </div>

        <div style={{
          fontSize: '0.85rem',
          color: '#64748b',
          marginBottom: '1.5rem'
        }}>
          Turite klausimų? Rašykite mums: <a href="mailto:info@ketronica.com" style={{ color: '#10b981', fontWeight: 600, textDecoration: 'none' }}>info@ketronica.com</a>
        </div>

        <a href="/" style={{
          display: 'inline-block',
          background: '#10b981',
          color: 'white',
          padding: '0.875rem 2rem',
          borderRadius: '10px',
          fontSize: '0.95rem',
          fontWeight: 600,
          textDecoration: 'none'
        }}>
          Grįžti į Pagrindinį Puslapį
        </a>
      </div>
    </div>
  );
}

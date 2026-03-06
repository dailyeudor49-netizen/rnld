'use client';

import { useState } from 'react';

const faqs = [
  {
    q: "Si monta su qualsiasi auto?",
    a: "Sì, si aggancia allo specchietto retrovisore originale con fasce in gomma regolabili. Compatibile con la maggior parte dei veicoli."
  },
  {
    q: "Serve un tecnico per l'installazione?",
    a: "No, l'installazione è semplice e richiede circa 15-20 minuti. Basta agganciare, collegare il cavo di alimentazione e posizionare la retrocamera."
  },
  {
    q: "Come si alimenta?",
    a: "Si collega alla presa accendisigari, oppure tramite porta USB o USB-C se disponibile nel veicolo. Per la modalità parcheggio continua è possibile utilizzare un kit cablaggio opzionale."
  },
  {
    q: "La registrazione è continua?",
    a: "Sì, registra in loop sovrascrivendo i file più vecchi quando la memoria è piena. I video con impatti vengono protetti automaticamente tramite il sensore G."
  },
  {
    q: "Quale microSD serve?",
    a: "Supporta microSD fino a 128GB. Si consiglia una scheda di classe U3 o superiore per la registrazione 4K."
  },
  {
    q: "Come scarico i video?",
    a: "Tramite l'app dedicata via Wi-Fi 5 GHz. Puoi anche rimuovere la microSD e leggerla con un adattatore."
  },
  {
    q: "C'è la garanzia?",
    a: "Sì, garanzia legale di 24 mesi. Inoltre offriamo reso facile entro 30 giorni dalla consegna."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-slate-50 transition-colors"
          >
            <span className="font-bold text-slate-900 text-sm pr-4">{faq.q}</span>
            <span className="text-xl text-slate-400 flex-shrink-0">{openIndex === i ? '−' : '+'}</span>
          </button>
          {openIndex === i && (
            <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

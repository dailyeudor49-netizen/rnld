'use client';

import { Check } from 'lucide-react';

const badges = [
  'Spedizione Gratis',
  'Reso 30 Giorni',
  'Garanzia 24 Mesi',
  'Assistenza Italia',
];

export function TrustBadges() {
  return (
    <div className="bg-orange-50 border-y border-orange-100 py-4 px-4">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
        {badges.map((badge, i) => (
          <div key={i} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-orange-600 stroke-[3]" />
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{badge}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

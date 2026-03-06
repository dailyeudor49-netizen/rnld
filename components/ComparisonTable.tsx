'use client';

import { Check } from 'lucide-react';

const rows = [
  { feature: 'Risoluzione anteriore', mirror: '4K Ultra HD', classic: '1080p' },
  { feature: 'Retrocamera inclusa', mirror: true, classic: false },
  { feature: 'GPS integrato', mirror: true, classic: false },
  { feature: 'Controllo via App', mirror: true, classic: false },
  { feature: 'Wi-Fi 5 GHz', mirror: true, classic: false },
  { feature: 'Modalità Parcheggio', mirror: true, classic: false },
  { feature: 'Display touchscreen', mirror: '12 pollici', classic: 'No display' },
  { feature: 'Installazione', mirror: 'Aggancia e vai', classic: 'Ventosa + cavi' },
  { feature: 'Prezzo medio', mirror: '€109,99', classic: '€80-150' },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-5 h-5 text-green-600 mx-auto" />;
  if (value === false) return <span className="text-red-400 font-bold">✕</span>;
  return <span className="font-bold text-sm">{value}</span>;
}

export function ComparisonTable() {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-slate-900 text-white">
            <th className="text-left p-4 font-bold uppercase tracking-wide text-xs">Caratteristica</th>
            <th className="p-4 font-bold uppercase tracking-wide text-xs text-center">
              <span className="text-orange-400">MirrorCam 4K</span>
            </th>
            <th className="p-4 font-bold uppercase tracking-wide text-xs text-center">Dashcam Classica</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="p-4 font-medium text-slate-700">{row.feature}</td>
              <td className="p-4 text-center"><Cell value={row.mirror} /></td>
              <td className="p-4 text-center"><Cell value={row.classic} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

'use client';

interface ReviewCardProps {
  name: string;
  location: string;
  text: string;
  date: string;
}

export function ReviewCard({ name, location, text, date }: ReviewCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-orange-400 text-lg">★</span>
        ))}
      </div>
      <p className="text-slate-700 text-sm leading-relaxed mb-4">&ldquo;{text}&rdquo;</p>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-slate-900 text-sm">{name}</p>
          <p className="text-slate-500 text-xs">{location}</p>
        </div>
        <span className="text-xs text-slate-400">{date}</span>
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

export function Countdown() {
  const [time, setTime] = useState({ hours: 2, minutes: 47, seconds: 33 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 0; minutes = 0; seconds = 0; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-1 text-xs font-bold text-red-600">
      <span className="bg-red-100 px-1.5 py-0.5 rounded">{pad(time.hours)}</span>
      <span>:</span>
      <span className="bg-red-100 px-1.5 py-0.5 rounded">{pad(time.minutes)}</span>
      <span>:</span>
      <span className="bg-red-100 px-1.5 py-0.5 rounded">{pad(time.seconds)}</span>
    </div>
  );
}

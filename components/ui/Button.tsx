'use client';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function Button({ children, onClick, fullWidth, variant = 'primary', className = '' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${variant === 'primary' ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-slate-200 hover:bg-slate-300 text-slate-900'}
        font-bold uppercase tracking-wide rounded-xl transition-all duration-200 cursor-pointer
        px-8 py-3
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

import { Award, Sparkles } from 'lucide-react';
import React from 'react';

type Props = {
  className?: string;
  size?: 'sm' | 'md';
};

export function PartnerBadge({ className = '', size = 'sm' }: Props) {
  const padding = size === 'sm' ? 'px-2.5 py-1' : 'px-3.5 py-1.5';
  const text = size === 'sm' ? 'text-[10px]' : 'text-xs';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${padding} ${text} font-extrabold uppercase tracking-wider bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-900 border border-amber-600 shadow-md shadow-amber-200/50 ${className}`}
    >
      <span className="inline-flex items-center justify-center rounded-full bg-white/40 border border-amber-500">
        <Award className={`${iconSize} text-amber-800`} />
      </span>
      <span>Corretor Parceiro</span>
      <Sparkles className={`${iconSize} text-amber-800`} />
    </span>
  );
}

import { Building2, Star } from 'lucide-react';
import React from 'react';

type Props = {
  className?: string;
  size?: 'sm' | 'md';
};

export function AgencyPartnerBadge({ className = '', size = 'sm' }: Props) {
  const padding = size === 'sm' ? 'px-2.5 py-1' : 'px-3.5 py-1.5';
  const text = size === 'sm' ? 'text-[10px]' : 'text-xs';
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${padding} ${text} font-extrabold uppercase tracking-wider bg-gradient-to-r from-indigo-300 via-violet-400 to-indigo-500 text-slate-900 border border-indigo-600 shadow-none md:shadow md:shadow-indigo-200/40 lg:shadow-md lg:shadow-indigo-200/50 ${className}`}
    >
      <span className="inline-flex items-center justify-center rounded-full bg-white/40 border border-indigo-500">
        <Building2 className={`${iconSize} text-indigo-800`} />
      </span>
      <span>Imobiliária Parceira</span>
      <Star className={`${iconSize} text-indigo-800`} />
    </span>
  );
}

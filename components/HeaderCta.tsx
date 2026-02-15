import Link from 'next/link';
import { Megaphone } from 'lucide-react';
import type { ReactNode } from 'react';

type HeaderCtaProps = {
  variant: 'dark' | 'light';
  className?: string;
  onClick?: () => void;
  labelFull?: string;
  labelShort?: string;
  rightIcon?: ReactNode;
};

export function HeaderCta({
  variant,
  className,
  onClick,
  labelFull = 'Anuncie seu Imóvel',
  labelShort = 'Anunciar',
  rightIcon,
}: HeaderCtaProps) {
  const base =
    variant === 'dark'
      ? 'items-center gap-2 h-10 px-4 text-sm font-semibold text-white bg-white/10 rounded-full border border-white/15 backdrop-blur-sm hover:bg-white/20 hover:border-white/25 transition-colors shadow-sm'
      : 'flex items-center justify-center gap-2 h-10 px-4 text-sm font-semibold text-blue-700 bg-white rounded-full border border-slate-200 hover:bg-blue-50 transition-colors shadow-sm';

  const display = className ? `${base} ${className}` : base;

  return (
    <Link href="/anunciar" className={display} onClick={onClick} title={labelFull}>
      <Megaphone className="h-4 w-4" />
      <span className="hidden lg:inline">{labelFull}</span>
      <span className="lg:hidden">{labelShort}</span>
      {rightIcon ? <span className="ml-1">{rightIcon}</span> : null}
    </Link>
  );
}

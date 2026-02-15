import Link from 'next/link';
import { Megaphone } from 'lucide-react';

type HeaderCtaProps = {
  variant: 'dark' | 'light';
  className?: string;
  onClick?: () => void;
};

export function HeaderCta({ variant, className, onClick }: HeaderCtaProps) {
  const base =
    variant === 'dark'
      ? 'items-center gap-2 h-10 px-4 text-sm font-semibold text-white bg-white/10 rounded-full border border-white/15 backdrop-blur-sm hover:bg-white/20 hover:border-white/25 transition-colors shadow-sm'
      : 'flex items-center justify-center gap-2 h-10 px-4 text-sm font-semibold text-blue-700 bg-white rounded-full border border-slate-200 hover:bg-blue-50 transition-colors shadow-sm';

  const display = className ? `${className} ${base}` : base;

  return (
    <Link href="/anunciar" className={display} onClick={onClick} title="Anuncie seu Imóvel">
      <Megaphone className="h-4 w-4" />
      <span className="hidden lg:inline">Anuncie seu Imóvel</span>
      <span className="lg:hidden">Anunciar</span>
    </Link>
  );
}

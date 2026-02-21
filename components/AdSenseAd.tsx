'use client';
import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { hasMarketingConsent } from '@/context/CookieConsentContext';

type AdPlacement =
  | 'home_below_featured'
  | 'comprar_top'
  | 'alugar_top'
  | 'property_top'
  | 'divulgacao_body';

const ADSENSE_SLOTS: Record<AdPlacement, string> = {
  home_below_featured: '0000000000',
  comprar_top: '1111111111',
  alugar_top: '2222222222',
  property_top: '3333333333',
  divulgacao_body: '4444444444',
};

type AdSenseAdProps = {
  placement: AdPlacement;
  format?: string;
  responsive?: boolean;
  className?: string;
};

export function AdSenseAd({
  placement,
  format = 'auto',
  responsive = true,
  className,
}: AdSenseAdProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const allowMarketing = hasMarketingConsent();
  const slot = ADSENSE_SLOTS[placement];

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      if (!clientId) {
        console.info('[AdSenseAd] NEXT_PUBLIC_ADSENSE_CLIENT_ID ausente; anúncio não será renderizado.');
      }
      if (!allowMarketing) {
        console.info('[AdSenseAd] Consentimento de marketing indisponível; anúncio não será carregado.');
      }
    }

    if (!clientId) return;
    if (!slot) return;
    if (!allowMarketing) return;

    const existingScript = document.querySelector<HTMLScriptElement>('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      script.crossOrigin = 'anonymous';
      document.head.appendChild(script);
    }

    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
    }
  }, [clientId, slot, allowMarketing]);

  if (!clientId) return null;
  if (!slot) return null;
  if (!allowMarketing) return null;

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' } as CSSProperties}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}

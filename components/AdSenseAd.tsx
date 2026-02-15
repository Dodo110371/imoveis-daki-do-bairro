'use client';
import { useEffect } from 'react';
import type { CSSProperties } from 'react';
import { hasMarketingConsent } from '@/context/CookieConsentContext';

type AdSenseAdProps = {
  slot: string;
  format?: string;
  responsive?: boolean;
  className?: string;
};

export function AdSenseAd({
  slot,
  format = 'auto',
  responsive = true,
  className,
}: AdSenseAdProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const allowMarketing = hasMarketingConsent();

  useEffect(() => {
    if (!clientId) return;
    if (!allowMarketing) return;

    const existingScript = document.querySelector<HTMLScriptElement>('script[data-adsbygoogle-setup="true"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`;
      script.crossOrigin = 'anonymous';
      script.setAttribute('data-adsbygoogle-setup', 'true');
      document.head.appendChild(script);
    }

    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch {
    }
  }, [clientId, slot, allowMarketing]);

  if (!clientId) return null;
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


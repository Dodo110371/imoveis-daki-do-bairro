'use client';
import React from 'react';
import { hasAnalyticsConsent, hasMarketingConsent } from '@/context/CookieConsentContext';
import { trackAnalyticsEvent } from '@/lib/analytics/track';

type Channel = 'whatsapp' | 'email' | 'phone';

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
  propertyId?: string | null;
  channel: Channel;
  target?: string;
  rel?: string;
};

export function ContactEventLink({
  href,
  children,
  className,
  propertyId = null,
  channel,
  target,
  rel,
}: Props) {
  const proceed = () => {
    if (target === '_blank') {
      window.open(href, '_blank');
    } else {
      window.location.href = href;
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      e.preventDefault();
      const isWhatsapp = channel === 'whatsapp';
      const whatsappDigits = isWhatsapp ? href.replace(/\D/g, '') : null;

      if (hasMarketingConsent()) {
        trackAnalyticsEvent({ eventType: 'lead_contact', propertyId });
        if (isWhatsapp && propertyId) {
          trackAnalyticsEvent({
            eventType: 'lead_whatsapp',
            propertyId,
            contactChannel: 'whatsapp',
            contactValue: whatsappDigits,
          });
        }
      }

      if (hasAnalyticsConsent() && isWhatsapp && propertyId) {
        const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
        if (gtag) {
          let proceeded = false;
          const proceedOnce = () => {
            if (proceeded) return;
            proceeded = true;
            proceed();
          };

          gtag('event', 'lead_whatsapp', {
            event_category: 'lead',
            event_label: propertyId,
            event_callback: proceedOnce,
            event_timeout: 750,
          });

          window.setTimeout(proceedOnce, 900);
          return;
        }
      }
    } catch {
      // ignore analytics failures
    } finally {
      // Proceed to destination
      proceed();
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} target={target} rel={rel} data-channel={channel}>
      {children}
    </a>
  );
}

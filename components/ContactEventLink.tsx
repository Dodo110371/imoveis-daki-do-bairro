'use client';
import { createClient } from '@/lib/supabase/client';
import React from 'react';

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
  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      e.preventDefault();
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const path = typeof window !== 'undefined' ? window.location.pathname : undefined;
      await supabase.from('analytics_events').insert({
        event_type: 'lead_contact',
        user_id: user?.id || null,
        property_id: propertyId,
        path,
      });
    } catch {
      // ignore analytics failures
    } finally {
      // Proceed to destination
      if (target === '_blank') {
        window.open(href, '_blank');
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} target={target} rel={rel} data-channel={channel}>
      {children}
    </a>
  );
}

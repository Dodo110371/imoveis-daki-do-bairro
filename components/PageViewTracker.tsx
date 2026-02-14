'use client';
import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { hasAnalyticsConsent } from '@/context/CookieConsentContext';

type Props = {
  path?: string;
  propertyId?: string | null;
};

export function PageViewTracker({ path, propertyId = null }: Props) {
  useEffect(() => {
    const logPageView = async () => {
      if (!hasAnalyticsConsent()) return;
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      const safePath = path || (typeof window !== 'undefined' ? window.location.pathname : undefined);
      await supabase.from('analytics_events').insert({
        event_type: 'page_view',
        path: safePath,
        user_id: user?.id || null,
        property_id: propertyId,
      });
    };
    logPageView();
  }, [path, propertyId]);

  return null;
}

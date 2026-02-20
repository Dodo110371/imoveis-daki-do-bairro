'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

type ConsentCategories = {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
};

type CookieConsentContextType = {
  consent: ConsentCategories | null;
  decided: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  savePreferences: (prefs: ConsentCategories) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  isPreferencesOpen: boolean;
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const COOKIE_NAME = 'cookie_consent_v1';

function readConsentCookie(): { prefs: ConsentCategories | null; decided: boolean } {
  if (typeof document === 'undefined') return { prefs: null, decided: false };
  const entries = document.cookie.split(';').map(c => c.trim());
  const entry = entries.find(c => c.startsWith(`${COOKIE_NAME}=`));
  if (!entry) return { prefs: null, decided: false };
  try {
    const val = decodeURIComponent(entry.split('=')[1]);
    const data = JSON.parse(val);
    return { prefs: data?.preferences ?? null, decided: !!data?.decided };
  } catch {
    return { prefs: null, decided: false };
  }
}

function writeConsentCookie(preferences: ConsentCategories, decided = true) {
  if (typeof document === 'undefined') return;
  const data = {
    version: 1,
    decided,
    preferences,
    ts: Date.now(),
  };
  const val = encodeURIComponent(JSON.stringify(data));
  const oneYear = 365 * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${val}; Max-Age=${oneYear}; Path=/; SameSite=Lax`;
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const initial = readConsentCookie();
  const [consent, setConsent] = useState<ConsentCategories | null>(initial.prefs);
  const [decided, setDecided] = useState(initial.decided);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const acceptAll = () => {
    const prefs = { analytics: true, marketing: true, functional: true };
    setConsent(prefs);
    setDecided(true);
    writeConsentCookie(prefs, true);
    setIsPreferencesOpen(false);
  };

  const rejectNonEssential = () => {
    const prefs = { analytics: false, marketing: false, functional: true };
    setConsent(prefs);
    setDecided(true);
    writeConsentCookie(prefs, true);
    setIsPreferencesOpen(false);
  };

  const savePreferences = (prefs: ConsentCategories) => {
    setConsent(prefs);
    setDecided(true);
    writeConsentCookie(prefs, true);
    setIsPreferencesOpen(false);
  };

  const openPreferences = () => setIsPreferencesOpen(true);
  const closePreferences = () => setIsPreferencesOpen(false);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        decided,
        acceptAll,
        rejectNonEssential,
        savePreferences,
        openPreferences,
        closePreferences,
        isPreferencesOpen,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error('useCookieConsent must be used within CookieConsentProvider');
  return ctx;
}

export function hasAnalyticsConsent(): boolean {
  const { prefs } = readConsentCookie();
  return !!prefs?.analytics;
}

export function hasMarketingConsent(): boolean {
  const { prefs } = readConsentCookie();
  return !!prefs?.marketing;
}

'use client';
import React, { useEffect, useState } from 'react';
import { useCookieConsent } from '@/context/CookieConsentContext';
import Link from 'next/link';

export function CookieBanner() {
  const {
    consent,
    decided,
    acceptAll,
    rejectNonEssential,
    savePreferences,
    isPreferencesOpen,
    openPreferences,
    closePreferences,
  } = useCookieConsent();

  const [prefs, setPrefs] = useState({
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
    functional: consent?.functional ?? true,
  });

  useEffect(() => {
    setPrefs({
      analytics: consent?.analytics ?? false,
      marketing: consent?.marketing ?? false,
      functional: consent?.functional ?? true,
    });
  }, [consent]);

  if (decided && !isPreferencesOpen) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-[100] pointer-events-none">
      <div className="mx-auto max-w-5xl px-4">
        <div className="pointer-events-auto">
          {!isPreferencesOpen ? (
            <div className="px-4 py-2 rounded-full bg-slate-900/45 backdrop-blur-sm text-white/90 shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
              <p className="text-xs sm:text-sm leading-snug">
                Usamos cookies essenciais e, com sua autorização, cookies de análise. Você pode aceitar, recusar os não essenciais ou personalizar conforme a LGPD.{" "}
                <Link href="/politica-de-cookies" className="underline text-blue-200 hover:text-blue-100">
                  Política de Cookies
                </Link>
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={rejectNonEssential}
                  className="px-3 py-1 rounded-md border border-white/30 text-white/90 text-xs hover:bg-white/10"
                >
                  Recusar
                </button>
                <button
                  onClick={openPreferences}
                  className="px-3 py-1 rounded-md border border-blue-300/40 text-blue-100 text-xs hover:bg-blue-300/10"
                >
                  Personalizar
                </button>
                <button
                  onClick={acceptAll}
                  className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700"
                >
                  Aceitar
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-slate-900/60 backdrop-blur-md text-slate-50 p-4 md:p-6 shadow-lg">
              <h2 className="text-sm md:text-base font-semibold mb-2">Preferências de Cookies</h2>
              <p className="text-xs md:text-sm text-slate-200 mb-4">
                Selecione os tipos de cookies que deseja permitir. Você pode alterar suas preferências a qualquer momento.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg border border-white/20">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="mt-1 h-3 w-3"
                  />
                  <div>
                    <div className="font-semibold">Essenciais</div>
                    <div className="text-xs text-slate-200">Necessários para o funcionamento básico do site e segurança.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg border border-white/20">
                  <input
                    id="analytics"
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) => setPrefs(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="mt-1 h-3 w-3"
                  />
                  <div>
                    <label htmlFor="analytics" className="font-semibold">Desempenho e Análise</label>
                    <div className="text-xs text-slate-200">Ajuda a entender como você usa o site para melhorarmos a experiência.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg border border-white/20">
                  <input
                    id="functional"
                    type="checkbox"
                    checked={prefs.functional}
                    onChange={(e) => setPrefs(prev => ({ ...prev, functional: e.target.checked }))}
                    className="mt-1 h-3 w-3"
                  />
                  <div>
                    <label htmlFor="functional" className="font-semibold">Funcionalidade</label>
                    <div className="text-xs text-slate-200">Memoriza preferências para recursos adicionais.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg border border-white/20">
                  <input
                    id="marketing"
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={(e) => setPrefs(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="mt-1 h-3 w-3"
                  />
                  <div>
                    <label htmlFor="marketing" className="font-semibold">Marketing</label>
                    <div className="text-xs text-slate-200">Ajuda na personalização e medição de campanhas.</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={closePreferences}
                  className="px-3 py-1 rounded-md border border-white/30 text-white/90 text-xs hover:bg-white/10"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => savePreferences(prefs)}
                  className="px-3 py-1 rounded-md bg-blue-600 text-white text-xs hover:bg-blue-700"
                >
                  Salvar preferências
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

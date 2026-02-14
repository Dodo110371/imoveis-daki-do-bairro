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
    <div className="fixed bottom-0 left-0 right-0 z-[100]">
      <div className="mx-auto max-w-5xl">
        <div className="m-4 rounded-2xl shadow-lg border border-slate-200 bg-white">
          {!isPreferencesOpen ? (
            <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-slate-900">Gerenciamento de Cookies</h2>
                <p className="text-sm text-slate-600">
                  Usamos cookies essenciais para o funcionamento do site e, com sua autorização, cookies de análise para melhorar a experiência. 
                  Você pode aceitar todos, recusar os não essenciais ou personalizar suas preferências conforme a LGPD.
                </p>
                <Link href="/politica-de-cookies" className="text-sm text-blue-600 hover:text-blue-700">
                  Saiba mais na Política de Cookies
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={rejectNonEssential}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Recusar não essenciais
                </button>
                <button
                  onClick={openPreferences}
                  className="px-4 py-2 rounded-lg border border-blue-200 text-blue-700 hover:bg-blue-50"
                >
                  Personalizar
                </button>
                <button
                  onClick={acceptAll}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Aceitar todos
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 md:p-8">
              <h2 className="text-lg font-bold text-slate-900 mb-2">Preferências de Cookies</h2>
              <p className="text-sm text-slate-600 mb-4">
                Selecione os tipos de cookies que deseja permitir. Você pode alterar suas preferências a qualquer momento.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-200">
                  <input
                    type="checkbox"
                    checked
                    disabled
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">Essenciais</div>
                    <div className="text-sm text-slate-600">Necessários para o funcionamento básico do site e segurança.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-200">
                  <input
                    id="analytics"
                    type="checkbox"
                    checked={prefs.analytics}
                    onChange={(e) => setPrefs(prev => ({ ...prev, analytics: e.target.checked }))}
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="analytics" className="font-semibold text-slate-900">Desempenho e Análise</label>
                    <div className="text-sm text-slate-600">Ajuda a entender como você usa o site para melhorarmos a experiência.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-200">
                  <input
                    id="functional"
                    type="checkbox"
                    checked={prefs.functional}
                    onChange={(e) => setPrefs(prev => ({ ...prev, functional: e.target.checked }))}
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="functional" className="font-semibold text-slate-900">Funcionalidade</label>
                    <div className="text-sm text-slate-600">Memoriza preferências para recursos adicionais.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-200">
                  <input
                    id="marketing"
                    type="checkbox"
                    checked={prefs.marketing}
                    onChange={(e) => setPrefs(prev => ({ ...prev, marketing: e.target.checked }))}
                    className="mt-1"
                  />
                  <div>
                    <label htmlFor="marketing" className="font-semibold text-slate-900">Marketing</label>
                    <div className="text-sm text-slate-600">Ajuda na personalização e medição de campanhas.</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={closePreferences}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => savePreferences(prefs)}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
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

'use client';

import { useCookieConsent } from '@/context/CookieConsentContext';

export default function AdminTestToolsPage() {
  const { consent, acceptAll, rejectNonEssential, savePreferences } = useCookieConsent();

  const handleClearConsent = () => {
    if (typeof document === 'undefined') return;
    document.cookie = 'cookie_consent_v1=; Max-Age=0; Path=/; SameSite=Lax';
    window.location.reload();
  };

  const handleFunctionalOnly = () => {
    savePreferences({
      analytics: false,
      marketing: false,
      functional: true,
    });
  };

  const consentLabel = (value: boolean | undefined) => (value ? 'Ativo' : 'Desativado');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Ferramentas de Teste</h1>
        <p className="text-sm text-slate-500 mt-2">
          Painel exclusivo para administradores realizarem testes técnicos sem impactar a experiência comercial dos usuários.
        </p>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Cookies e LGPD</h2>
          <p className="text-sm text-slate-500">
            Gerencie rapidamente o consentimento de cookies para validar banner, anúncios e rastreamento.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
              <div className="text-slate-500 mb-1">Analytics</div>
              <div className={`font-semibold ${consent?.analytics ? 'text-green-600' : 'text-slate-700'}`}>
                {consentLabel(consent?.analytics)}
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
              <div className="text-slate-500 mb-1">Marketing</div>
              <div className={`font-semibold ${consent?.marketing ? 'text-green-600' : 'text-slate-700'}`}>
                {consentLabel(consent?.marketing)}
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
              <div className="text-slate-500 mb-1">Funcional</div>
              <div className={`font-semibold ${consent?.functional ? 'text-green-600' : 'text-slate-700'}`}>
                {consentLabel(consent?.functional)}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={acceptAll}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Aceitar todos os cookies
            </button>
            <button
              type="button"
              onClick={rejectNonEssential}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Recusar não essenciais
            </button>
            <button
              type="button"
              onClick={handleFunctionalOnly}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Somente funcionais
            </button>
            <button
              type="button"
              onClick={handleClearConsent}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium border border-red-300 text-red-700 hover:bg-red-50 transition-colors"
            >
              Limpar consentimento
            </button>
          </div>

          <p className="text-xs text-slate-400">
            Os anúncios do Google só são carregados quando o marketing está ativo. Use estas ações para validar o comportamento.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Fluxos especiais</h2>
          <p className="text-sm text-slate-500">
            Atalhos de teste sensíveis, como modos de anúncio sem login, estão desativados em produção para usuários comuns e só podem ser usados em ambiente de desenvolvimento.
          </p>
          <ul className="list-disc list-inside text-sm text-slate-600 space-y-2">
            <li>
              O atalho de anúncio <span className="font-semibold">“Continuar sem login (Modo de Teste)”</span> está disponível apenas em ambiente de desenvolvimento.
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Mocks e Dados Reais</h2>
          <p className="text-sm text-slate-500">
            Todos os dados de mock (CEPs fictícios, corretores de exemplo) foram removidos do sistema para garantir que apenas informações reais sejam exibidas aos usuários.
          </p>
          <div className="text-sm bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600">
             Os fallbacks de imagem agora utilizam ícones genéricos em vez de fotos de banco de imagens.
          </div>
        </div>
      </section>
    </div>
  );
}


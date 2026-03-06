'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight, Home, Sparkles, TrendingUp } from 'lucide-react';
import { Suspense } from 'react';

function SucessoContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const isEdit = mode === 'edit';

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Card de Sucesso */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {isEdit ? 'Anúncio Atualizado!' : 'Anúncio Criado com Sucesso!'}
          </h1>

          <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
            {isEdit
              ? 'As alterações foram salvas e seu imóvel está pendente de aprovação novamente.'
              : 'Seu imóvel foi cadastrado e agora está pendente de aprovação. Nossa equipe irá revisar as informações em breve.'
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/minha-conta"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Ir para Meus Imóveis
            </Link>
          </div>

          {/* Upsell Destaque Turbo */}
          <div className="border-t border-slate-100 pt-10">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                RECOMENDADO
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                  <Sparkles className="w-8 h-8 text-amber-600 animate-pulse" />
                </div>

                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    Quer vender muito mais rápido?
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Ative o <strong className="text-amber-700">Destaque Turbo</strong> e coloque seu imóvel no topo das buscas,
                    aumentando em até 5x as visualizações.
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-700">R$ 50,00 <span className="text-xs font-normal text-slate-500">pagamento único</span></span>
                    <Link
                      href="/pagamento?plano=destaque"
                      className="inline-flex items-center px-5 py-2.5 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors shadow-sm hover:shadow-amber-500/25"
                    >
                      Ativar Destaque
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SucessoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <SucessoContent />
    </Suspense>
  );
}

import Link from 'next/link';
import { CheckCircle2, Megaphone, TrendingUp, Users, ShieldCheck, DollarSign, Key, Sparkles } from 'lucide-react';
import { HeaderCta } from '@/components/HeaderCta';

export default function PlanosPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white pt-24 pb-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900 z-0 animate-gradient" />
        <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-900 opacity-20 z-0" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float delay-75" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float delay-500" />

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4 backdrop-blur-sm">
            <Megaphone className="w-4 h-4" />
            <span>A melhor vitrine para o seu imóvel</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
            Anuncie grátis e pague <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 animate-gradient bg-[length:200%_auto]">
              apenas no êxito
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Sem mensalidades ou taxas de adesão. Você só paga a taxa de publicidade quando vender ou alugar seu imóvel.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/anunciar"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 border border-transparent transition-all"
              title="Criar meu anúncio agora"
            >
              <Megaphone className="w-5 h-5 mr-2" />
              <span className="hidden sm:inline">Criar meu anúncio agora</span>
              <span className="sm:hidden">Anunciar</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Por que anunciar conosco */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Por que anunciar no Imóveis daki do Bairro?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Somos a plataforma que mais cresce na região, conectando proprietários a clientes qualificados de forma simples e direta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Máxima Visibilidade</h3>
              <p className="text-slate-600">
                Seu anúncio aparece para milhares de interessados segmentados por bairro e interesse, garantindo leads mais qualificados.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Conexão Direta</h3>
              <p className="text-slate-600">
                Receba contatos diretamente no seu WhatsApp ou e-mail. Sem intermediários, você negocia com total liberdade.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Segurança e Controle</h3>
              <p className="text-slate-600">
                Painel completo para gerenciar seus anúncios, visualizar estatísticas e editar informações a qualquer momento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Condições de Pagamento */}
      <section id="planos" className="py-20 px-4 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Transparência total para você</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Entenda como funciona a nossa Taxa de Publicidade. Você não paga nada para anunciar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch justify-center">

            {/* Venda */}
            <div className="flex flex-col rounded-2xl border-2 border-blue-200 overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all h-full bg-gradient-to-b from-blue-50 to-white">
              <div className="p-8 text-center border-b border-blue-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-2xl text-slate-900">Venda</h3>
                <div className="mt-4 text-4xl font-bold text-blue-700">1%</div>
                <p className="text-sm text-slate-600 mt-2 font-medium">do valor do imóvel</p>
                <div className="mt-2 inline-block bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full">
                  PAGUE SÓ SE VENDER
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <ul className="space-y-4 text-base text-slate-700 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span>Publicação ilimitada até a venda</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span>Fotos ilimitadas de alta qualidade</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span>Divulgação nas redes sociais</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <span>Suporte especializado</span>
                  </li>
                </ul>
                <HeaderCta
                  variant="dark"
                  className="w-full py-4 text-center justify-center"
                  labelFull="Anunciar Venda Agora"
                  labelShort="Anunciar Venda"
                />
              </div>
            </div>

            {/* Aluguel */}
            <div className="flex flex-col rounded-2xl border-2 border-teal-200 overflow-hidden hover:border-teal-400 hover:shadow-xl transition-all h-full bg-gradient-to-b from-teal-50 to-white">
              <div className="p-8 text-center border-b border-teal-100">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Key className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="font-bold text-2xl text-slate-900">Aluguel</h3>
                <div className="mt-4 text-4xl font-bold text-teal-700">40%</div>
                <p className="text-sm text-slate-600 mt-2 font-medium">do 1º aluguel</p>
                <div className="mt-2 inline-block bg-teal-100 text-teal-800 text-xs font-bold px-2 py-1 rounded-full">
                  PAGUE SÓ SE ALUGAR
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <ul className="space-y-4 text-base text-slate-700 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span>Publicação ilimitada até alugar</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span>Fotos ilimitadas de alta qualidade</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span>Divulgação nas redes sociais</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span>Suporte especializado</span>
                  </li>
                </ul>
                <HeaderCta
                  variant="dark"
                  className="w-full py-4 text-center justify-center bg-teal-600 hover:bg-teal-700 border-transparent"
                  labelFull="Anunciar Aluguel Agora"
                  labelShort="Anunciar Aluguel"
                />
              </div>
            </div>

            {/* Turbo */}
            <div className="flex flex-col rounded-2xl border-2 border-amber-200 overflow-hidden hover:border-amber-400 hover:shadow-xl transition-all h-full bg-gradient-to-b from-amber-50 to-white relative">
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10">
                 OPCIONAL
              </div>
              <div className="p-8 text-center border-b border-amber-100">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-bold text-2xl text-slate-900">Destaque Turbo</h3>
                <div className="mt-4 text-4xl font-bold text-amber-700">R$ 50</div>
                <p className="text-sm text-slate-600 mt-2 font-medium">pagamento único</p>
                <div className="mt-2 inline-block bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">
                  MAIS VISIBILIDADE
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <ul className="space-y-4 text-base text-slate-700 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Topo das buscas no site</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Destaque visual no anúncio</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Venda/Alugue muito mais rápido</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Pagamento via PIX</span>
                  </li>
                </ul>
                <div className="mt-auto pt-4 text-center text-sm text-slate-500 italic">
                  * Adicione esta opção ao criar seu anúncio
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para anunciar?</h2>
          <p className="text-lg text-slate-300 mb-8">
            Não perca tempo. Cadastre seu imóvel agora mesmo e comece a receber propostas.
          </p>
          <Link
            href="/anunciar"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95 border border-transparent transition-all"
          >
            Começar Agora
          </Link>
        </div>
      </section>
    </div>
  );
}

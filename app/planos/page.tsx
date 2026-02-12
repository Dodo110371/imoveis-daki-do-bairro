import Link from 'next/link';
import { CheckCircle2, Megaphone, Image as ImageIcon, CreditCard, MousePointerClick, TrendingUp, Users, ShieldCheck } from 'lucide-react';

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
            Venda ou alugue seu imóvel <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-purple-400 animate-gradient bg-[length:200%_auto]">
              muito mais rápido
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Milhares de compradores e inquilinos visitam o Imóveis do Bairro todos os dias.
            Escolha o plano ideal e destaque sua propriedade agora mesmo.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/anunciar"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-blue-600 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 active:scale-95"
            >
              Criar meu anúncio agora
            </Link>
            <a
              href="#planos"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 active:scale-95"
            >
              Ver planos disponíveis
            </a>
          </div>
        </div>
      </section>

      {/* Por que anunciar conosco */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Por que anunciar no Imóveis do Bairro?</h2>
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

      {/* Planos Section */}
      <section id="planos" className="py-20 px-4 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Escolha o plano ideal para você</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Opções flexíveis que se adaptam à sua necessidade, seja para uma venda rápida ou aluguel recorrente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">

            {/* Mensal */}
            <div className="flex flex-col rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-blue-300 hover:shadow-lg transition-all h-full bg-slate-50">
              <div className="p-6 text-center bg-white border-b border-slate-100">
                <h3 className="font-bold text-lg text-slate-900">Mensal</h3>
                <div className="mt-2 text-3xl font-bold text-slate-900">R$ 200<span className="text-sm font-normal text-slate-500">/mês</span></div>
                <p className="text-sm text-slate-500 mt-2">Para quem quer testar</p>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>Anúncio ativo por 30 dias</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>Até 15 fotos de alta qualidade</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>Renovação mensal automática</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                    <span>Sem fidelidade, cancele quando quiser</span>
                  </li>
                </ul>
                <Link href="/anunciar" className="w-full py-3 px-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors text-center">
                  Escolher Mensal
                </Link>
              </div>
            </div>

            {/* Trimestral */}
            <div className="relative flex flex-col rounded-2xl border-2 border-teal-500 shadow-lg overflow-hidden h-full bg-white transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-teal-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10">
                ECONOMIA
              </div>
              <div className="p-6 text-center bg-teal-50 border-b border-teal-100">
                <h3 className="font-bold text-lg text-teal-900">Trimestral</h3>
                <div className="mt-2 text-3xl font-bold text-teal-700">R$ 300<span className="text-sm font-normal text-teal-600">,00</span></div>
                <div className="text-sm font-medium text-teal-600 mt-1">ou 3x R$ 120,00</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                    <span><strong>90 dias</strong> de visibilidade</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                    <span>Até 20 fotos de alta qualidade</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                    <span>Destaque na busca por 7 dias</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0" />
                    <span>Suporte prioritário via chat</span>
                  </li>
                </ul>
                <Link href="/pagamento?plano=trimestral" className="w-full py-3 px-4 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors text-center shadow-lg shadow-teal-200">
                  Escolher Trimestral
                </Link>
              </div>
            </div>

            {/* Semestral */}
            <div className="relative flex flex-col rounded-2xl border-2 border-orange-500 shadow-lg overflow-hidden h-full bg-white transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10">
                MELHOR VALOR
              </div>
              <div className="p-6 text-center bg-orange-50 border-b border-orange-100">
                <h3 className="font-bold text-lg text-orange-900">Semestral</h3>
                <div className="mt-2 text-3xl font-bold text-orange-700">R$ 600<span className="text-sm font-normal text-orange-600">,00</span></div>
                <div className="text-sm font-medium text-orange-600 mt-1">ou 6x R$ 110,00</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                    <span><strong>180 dias</strong> de visibilidade</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                    <span>Até 30 fotos de alta qualidade</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                    <span>Destaque na busca por 15 dias</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0" />
                    <span>Relatório mensal de visitas</span>
                  </li>
                </ul>
                <Link href="/anunciar" className="w-full py-3 px-4 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors text-center shadow-lg shadow-orange-200">
                  Escolher Semestral
                </Link>
              </div>
            </div>

            {/* Até Vender */}
            <div className="relative flex flex-col rounded-2xl border-2 border-purple-600 shadow-xl overflow-hidden h-full bg-white scale-105 z-10">
              <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold py-1 text-center z-10">
                MAIS VENDIDO
              </div>
              <div className="p-6 pt-10 text-center bg-purple-50 border-b border-purple-100">
                <h3 className="font-bold text-lg text-purple-900">Até Vender</h3>
                <div className="mt-2 text-3xl font-bold text-purple-700">R$ 1.000<span className="text-sm font-normal text-purple-600">,00</span></div>
                <div className="text-sm font-medium text-purple-600 mt-1">ou 10x R$ 110,00</div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-4 text-sm text-slate-600 mb-8 flex-1">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span><strong>Sem prazo de validade</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Fotos ilimitadas + Vídeo Tour</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Destaque Premium Permanente</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Impulsionamento nas redes sociais</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 shrink-0" />
                    <span>Consultoria de preço de mercado</span>
                  </li>
                </ul>
                <Link href="/pagamento?plano=ate_vender" className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all text-center shadow-lg shadow-purple-300 transform hover:-translate-y-1">
                  Quero Vender Rápido
                </Link>
              </div>
            </div>

          </div>

          {/* Na Mira! Option */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-r from-red-600 to-rose-600 rounded-2xl p-1 shadow-xl transform hover:scale-[1.01] transition-transform duration-300">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-red-600 px-6 py-1 rounded-full font-bold shadow-md border-2 border-red-100 flex items-center gap-2 whitespace-nowrap z-20">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                OPÇÃO TURBO
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              </div>
              <div className="bg-white rounded-xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="flex-1 text-center md:text-left relative z-10">
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h3 className="text-3xl font-extrabold text-slate-900">Na Mira!</h3>
                    <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">Destaque</span>
                  </div>
                  <p className="text-slate-600 mb-6 text-lg">
                    Coloque seu imóvel no <strong>topo das buscas</strong> e multiplique suas chances de fechar negócio.
                    Ideal para quem tem pressa.
                  </p>
                  <ul className="space-y-3 mb-2 inline-block text-left bg-slate-50 p-4 rounded-lg border border-slate-100 w-full">
                    <li className="flex items-center gap-3 text-slate-700">
                      <div className="bg-red-100 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-red-600" /></div>
                      <span className="font-medium">Apareça antes dos outros anúncios</span>
                    </li>
                    <li className="flex items-center gap-3 text-slate-700">
                      <div className="bg-red-100 p-1 rounded-full"><CheckCircle2 className="w-4 h-4 text-red-600" /></div>
                      <span className="font-medium">Tag exclusiva "Na Mira" no card</span>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col items-center gap-4 relative z-10 min-w-[260px] border-l-0 md:border-l border-slate-100 md:pl-8">
                  <div className="text-center">
                    <div className="text-sm text-slate-500 font-medium mb-1">Investimento Único</div>
                    <div className="text-6xl font-black text-slate-900 tracking-tight flex items-start justify-center">
                      <span className="text-2xl mt-2 mr-1 font-bold text-slate-400">R$</span>
                      50
                      <span className="text-2xl mt-2 font-bold text-slate-400">,00</span>
                    </div>
                  </div>
                  <Link
                    href="/pagamento?plano=na_mira"
                    className="w-full py-4 px-6 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-700 hover:shadow-lg hover:shadow-red-200 transition-all text-center flex items-center justify-center gap-2 group"
                  >
                    Contratar Agora
                    <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <p className="text-xs text-slate-400 text-center">Válido por 15 dias de destaque</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Passo a Passo */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Como anunciar seu imóvel</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              É muito simples publicar sua propriedade no nosso site. Em poucos minutos seu anúncio estará no ar.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">

              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-blue-500 text-blue-600 flex items-center justify-center text-2xl font-bold shadow-sm mb-6">
                  <MousePointerClick className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">1. Inicie</h3>
                <p className="text-sm text-slate-600">
                  Clique em "Anunciar" no topo do site e crie sua conta gratuita em segundos.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-blue-500 text-blue-600 flex items-center justify-center text-2xl font-bold shadow-sm mb-6">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">2. Detalhes</h3>
                <p className="text-sm text-slate-600">
                  Preencha as informações do imóvel e faça upload das melhores fotos.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-blue-500 text-blue-600 flex items-center justify-center text-2xl font-bold shadow-sm mb-6">
                  <CreditCard className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">3. Plano</h3>
                <p className="text-sm text-slate-600">
                  Escolha o plano de divulgação que melhor se adapta aos seus objetivos.
                </p>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-green-500 text-green-600 flex items-center justify-center text-2xl font-bold shadow-sm mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">4. Pronto!</h3>
                <p className="text-sm text-slate-600">
                  Seu anúncio é revisado e publicado para milhares de compradores verem.
                </p>
              </div>

            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/anunciar"
              className="inline-flex items-center gap-2 px-8 py-4 text-lg font-bold text-white transition-all bg-green-600 rounded-full hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/25 active:scale-95"
            >
              Começar agora
              <TrendingUp className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

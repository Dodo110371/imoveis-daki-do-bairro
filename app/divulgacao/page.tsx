'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  Printer,
  Share2,
  MapPin,
  Home,
  Search,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  MousePointerClick,
  QrCode
} from 'lucide-react';

export default function FlyerPage() {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Imóveis daki do Bairro',
          text: 'Confira os melhores imóveis da região!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      alert('Link copiado para a área de transferência!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 print:p-0 print:bg-white">
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          header, footer, nav, aside, .no-print {
            display: none !important;
          }
          body {
            background-color: white !important;
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>

      {/* Toolbar - Hidden on Print */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between items-center no-print animate-in slide-in-from-top-4">
        <Link
          href="/"
          className="flex items-center text-slate-600 hover:text-blue-600 font-medium transition-colors"
        >
          <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
          Voltar para o site
        </Link>
        <div className="flex gap-3">
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors font-medium"
          >
            <Share2 className="w-4 h-4" />
            Compartilhar
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors font-bold"
          >
            <Printer className="w-4 h-4" />
            Imprimir Folheto
          </button>
        </div>
      </div>

      {/* Flyer Content - A4 Ratio Aspect */}
      <div className="max-w-[21cm] mx-auto bg-white shadow-2xl overflow-hidden print:shadow-none print:w-full print:max-w-none">

        {/* Header Section */}
        <div className="bg-slate-900 text-white p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05] z-0" />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl" />

          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none overflow-hidden">
            <Building2 className="w-[500px] h-[500px] text-white -rotate-12 transform" strokeWidth={0.5} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-center gap-8 mb-10">
              <div className="relative w-48 h-48 bg-white/10 rounded-3xl p-4 backdrop-blur-sm border border-white/20 shadow-2xl shrink-0">
                <Image
                  src="/Logo_imoveis_daki_do_bairro.png"
                  alt="Logo Imóveis daki do Bairro"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
              <h1 className="flex flex-col items-start text-left">
                <span className="font-sans font-extrabold text-6xl tracking-tight mb-2 leading-none drop-shadow-md">Imóveis</span>
                <span className="font-sans font-medium text-3xl text-blue-200 tracking-wide leading-none">daki do Bairro</span>
              </h1>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">
              Conectando você ao seu <br />
              próximo imóvel ideal
            </h2>

            <p className="text-blue-100 text-lg max-w-lg mx-auto">
              A plataforma imobiliária mais completa, rápida e segura da região.
            </p>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-12 space-y-12">

          {/* Value Proposition Grid */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-blue-600 pl-4">
                Para quem quer <span className="text-blue-600">Comprar ou Alugar</span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 text-blue-600">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Busca Inteligente</h4>
                    <p className="text-sm text-slate-600">Filtre por bairro, preço e características.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 text-blue-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Geolocalização</h4>
                    <p className="text-sm text-slate-600">Veja imóveis perto de você no mapa.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 text-blue-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Imóveis Verificados</h4>
                    <p className="text-sm text-slate-600">Segurança e transparência total.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 border-l-4 border-orange-500 pl-4">
                Para quem quer <span className="text-orange-600">Anunciar</span>
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0 text-orange-600">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">100% Digital</h4>
                    <p className="text-sm text-slate-600">Anuncie direto pelo celular ou computador.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0 text-orange-600">
                    <MousePointerClick className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Planos Flexíveis</h4>
                    <p className="text-sm text-slate-600">Opções mensais, trimestrais ou até vender.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center shrink-0 text-orange-600">
                    <Share2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">Alta Visibilidade</h4>
                    <p className="text-sm text-slate-600">Milhares de acessos todos os meses.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Highlight Section */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Por que escolher o Imóveis daki do Bairro?</h3>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Somos especialistas na região. Conhecemos cada rua e cada oportunidade.
              Nossa missão é facilitar o encontro entre quem quer vender e quem sonha em comprar.
            </p>
            <div className="flex justify-center gap-8 text-center flex-wrap">
              <div className="flex-1 min-w-[150px]">
                <div className="text-xl font-extrabold text-blue-600 mb-1">Foco Local</div>
                <div className="text-sm text-slate-500 font-medium">Especialistas na região e no que o bairro precisa</div>
              </div>
              <div className="flex-1 min-w-[150px]">
                <div className="text-xl font-extrabold text-blue-600 mb-1">Tecnologia</div>
                <div className="text-sm text-slate-500 font-medium">Plataforma rápida, moderna e fácil de usar</div>
              </div>
              <div className="flex-1 min-w-[150px]">
                <div className="text-3xl font-extrabold text-blue-600">24h</div>
                <div className="text-sm text-slate-500 font-medium">Suporte Online</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer / CTA Section */}
        <div className="bg-slate-900 text-white p-10 flex flex-col md:flex-row items-center justify-between gap-8 print:bg-slate-900 print:text-white">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">Comece agora mesmo!</h3>
            <p className="text-blue-200 mb-4">Acesse nosso site ou aponte a câmera para o QR Code.</p>
            <div className="inline-block bg-white text-slate-900 font-bold py-2 px-6 rounded-full text-lg">
              www.imoveisdakidobairro.com.br
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-lg">
            <div className="w-24 h-24 bg-slate-100 flex items-center justify-center rounded-lg border-2 border-slate-200">
              {/* QR Code Placeholder Simulation */}
              <QrCode className="w-16 h-16 text-slate-900" />
            </div>
            <div className="text-left text-slate-900">
              <div className="font-bold text-sm uppercase tracking-wider text-slate-500 mb-1">Escaneie</div>
              <div className="font-bold text-lg leading-tight">Para acessar<br />o site agora</div>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="bg-blue-600 text-white text-center py-2 text-xs font-medium print:bg-blue-600">
          Imóveis daki do Bairro © 2026 - Todos os direitos reservados
        </div>

      </div>
    </div>
  );
}
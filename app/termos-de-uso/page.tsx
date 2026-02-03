import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link 
          href="/" 
          className="inline-flex items-center text-slate-600 hover:text-slate-900 mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para o início
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8">
            Termos e Condições Gerais de Uso
          </h1>

          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="mb-6">
              Bem-vindo ao <strong>Imóveis daki do Bairro</strong>. Ao acessar ou utilizar nossa plataforma, você concorda em cumprir estes Termos e Condições Gerais de Uso. Por favor, leia-os atentamente.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Natureza da Plataforma</h2>
            <p className="mb-4">
              O <strong>Imóveis daki do Bairro</strong> é uma plataforma de classificados online (marketplace) destinada à divulgação de imóveis.
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Não somos imobiliária:</strong> Não atuamos como corretores, intermediários ou consultores imobiliários.</li>
              <li><strong>Contato Direto:</strong> A plataforma facilita o contato direto entre o anunciante (proprietário ou corretor externo) e o interessado.</li>
              <li><strong>Sem Intermediação:</strong> Não participamos, intermediamos ou interferimos nas negociações, visitas, propostas ou fechamento de negócios.</li>
              <li><strong>Sem Comissões:</strong> Não cobramos comissões sobre vendas ou aluguéis realizados através dos contatos iniciados na plataforma.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Responsabilidades do Usuário</h2>
            <p className="mb-4">
              Ao utilizar a plataforma, você declara e garante que:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Tem capacidade legal para contratar e utilizar os serviços.</li>
              <li>Todas as informações fornecidas no cadastro e nos anúncios são verdadeiras, precisas e atualizadas.</li>
              <li>Possui os direitos ou autorizações necessárias para anunciar os imóveis publicados.</li>
              <li>Não utilizará a plataforma para fins ilícitos, fraudulentos ou que violem direitos de terceiros.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Responsabilidade pelos Anúncios e Negociações</h2>
            <p className="mb-4">
              O usuário reconhece que:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Conteúdo:</strong> O anunciante é o único e exclusivo responsável pelo conteúdo, veracidade e legalidade dos anúncios publicados.</li>
              <li><strong>Negociações:</strong> Qualquer transação, visita ou acordo é realizado exclusivamente entre as partes (anunciante e interessado), sem qualquer envolvimento ou responsabilidade do <strong>Imóveis daki do Bairro</strong>.</li>
              <li><strong>Riscos:</strong> Cabe ao usuário verificar a idoneidade do anunciante, a existência e o estado do imóvel, e tomar as devidas precauções antes de fechar qualquer negócio ou realizar pagamentos.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Regras de Publicação</h2>
            <p className="mb-4">
              É proibido publicar anúncios que:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Contenham informações falsas, enganosas ou imprecisas.</li>
              <li>Violem leis, regulamentos ou direitos de propriedade intelectual.</li>
              <li>Tenham conteúdo discriminatório, ofensivo ou inapropriado.</li>
              <li>Não sejam relacionados à venda ou aluguel de imóveis.</li>
            </ul>
            <p className="mb-6">
              O <strong>Imóveis daki do Bairro</strong> reserva-se o direito de remover qualquer anúncio que viole estes termos, sem aviso prévio.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Limitação de Responsabilidade</h2>
            <p className="mb-6">
              Em nenhuma hipótese o <strong>Imóveis daki do Bairro</strong>, seus administradores ou colaboradores serão responsáveis por danos diretos, indiretos, incidentais ou consequenciais decorrentes do uso da plataforma, da confiança em qualquer informação nela contida ou das negociações realizadas entre usuários.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Alterações nos Termos</h2>
            <p className="mb-6">
              Podemos alterar estes Termos de Uso a qualquer momento. O uso continuado da plataforma após as alterações implica na aceitação dos novos termos.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">7. Foro</h2>
            <p>
              Fica eleito o foro da comarca de São Luís, Estado do Maranhão, para dirimir quaisquer dúvidas ou litígios oriundos destes Termos de Uso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

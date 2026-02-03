import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function QualityPolicyPage() {
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
            Política de Qualidade
          </h1>

          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="mb-6">
              O <strong>Imóveis daki do Bairro</strong> preza pela qualidade e confiabilidade das informações disponíveis em nossa plataforma. Esta Política de Qualidade estabelece diretrizes para garantir uma experiência excelente para quem busca e para quem anuncia imóveis.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Qualidade dos Anúncios</h2>
            <p className="mb-4">
              Todos os anúncios devem seguir padrões mínimos de qualidade para serem aceitos e mantidos na plataforma:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Fotos:</strong> As imagens devem ser reais, claras, com boa iluminação e resolução. Não são permitidas imagens genéricas, de internet, com marcas d'água intrusivas ou que não correspondam ao imóvel anunciado.</li>
              <li><strong>Descrição:</strong> O texto deve ser detalhado, claro e fiel à realidade do imóvel. Erros excessivos de português, uso exagerado de caixa alta (CAPS LOCK) ou informações confusas devem ser evitados.</li>
              <li><strong>Preço:</strong> O valor informado deve ser o valor real de venda ou locação. Anúncios com valores simbólicos (ex: R$ 1,00) ou enganosos serão removidos.</li>
              <li><strong>Localização:</strong> O endereço e a localização no mapa devem ser precisos.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Veracidade das Informações</h2>
            <p className="mb-6">
              O anunciante compromete-se a fornecer apenas dados verdadeiros. A tentativa de enganar usuários com características falsas do imóvel (metragem, número de quartos, vagas, etc.) resultará na exclusão do anúncio e possível bloqueio da conta.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Atualização dos Anúncios</h2>
            <p className="mb-6">
              É responsabilidade do anunciante manter seus anúncios atualizados. Imóveis que já foram vendidos ou alugados devem ser desativados imediatamente para não frustrar as expectativas dos usuários.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Conteúdo Proibido</h2>
            <p className="mb-4">
              Não será tolerado na plataforma:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Linguagem ofensiva, discriminatória ou de ódio.</li>
              <li>Anúncios duplicados (spam).</li>
              <li>Promoção de serviços não relacionados ao imóvel (ex: consórcios, pirâmides financeiras).</li>
              <li>Violação de direitos autorais (uso de fotos de terceiros sem autorização).</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Monitoramento e Denúncias</h2>
            <p className="mb-6">
              O <strong>Imóveis daki do Bairro</strong> monitora a plataforma e conta com a colaboração dos usuários. Caso encontre um anúncio que viole nossa Política de Qualidade, utilize os canais de contato para denunciar. Reservamo-nos o direito de remover qualquer conteúdo que não atenda aos nossos padrões de qualidade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

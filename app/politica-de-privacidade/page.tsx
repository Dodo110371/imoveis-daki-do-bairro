import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
            Política de Privacidade
          </h1>

          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="mb-6">
              A sua privacidade é importante para o <strong>Imóveis daki do Bairro</strong>. Esta Política de Privacidade explica como coletamos, usamos, compartilhamos e protegemos as suas informações pessoais ao utilizar nossa plataforma de anúncios imobiliários.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. Informações que Coletamos</h2>
            <p className="mb-4">
              Coletamos informações para fornecer melhores serviços a todos os nossos usuários. As informações coletadas incluem:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Informações de Cadastro:</strong> Nome, endereço de e-mail, número de telefone e senha ao criar uma conta.</li>
              <li><strong>Informações de Anúncios:</strong> Detalhes dos imóveis, fotos, descrições, localização e valores inseridos por você.</li>
              <li><strong>Informações de Uso:</strong> Dados sobre como você interage com nossos serviços, como buscas realizadas, páginas visitadas e tempo de permanência.</li>
              <li><strong>Comunicações:</strong> Mensagens trocadas entre usuários através da plataforma (quando disponível) ou registros de contato direto.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Como Usamos as Suas Informações</h2>
            <p className="mb-4">
              Utilizamos as informações coletadas para:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Permitir a publicação e a gestão dos seus anúncios de imóveis.</li>
              <li>Facilitar o contato direto entre interessados e anunciantes.</li>
              <li>Melhorar e personalizar a sua experiência na plataforma.</li>
              <li>Enviar comunicações importantes sobre sua conta ou alterações em nossos termos.</li>
              <li>Garantir a segurança e integridade da plataforma, prevenindo fraudes.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Compartilhamento de Informações</h2>
            <p className="mb-4">
              O <strong>Imóveis daki do Bairro</strong> atua como um classificado online. Portanto:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Informações Públicas:</strong> Dados do imóvel e informações de contato fornecidas nos anúncios são visíveis publicamente para permitir a negociação direta.</li>
              <li><strong>Não Vendemos Dados:</strong> Não vendemos suas informações pessoais para terceiros para fins de marketing.</li>
              <li><strong>Requisitos Legais:</strong> Podemos compartilhar informações se exigido por lei ou para proteger direitos legais.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Segurança dos Dados</h2>
            <p className="mb-6">
              Adotamos medidas de segurança técnicas e organizacionais adequadas para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela internet é 100% seguro.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Seus Direitos</h2>
            <p className="mb-4">
              Você tem o direito de:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Acessar, corrigir ou atualizar suas informações pessoais a qualquer momento através das configurações da sua conta.</li>
              <li>Solicitar a exclusão da sua conta e dos seus dados, ressalvadas as obrigações legais de retenção.</li>
              <li>Retirar seu consentimento para processamento de dados, quando aplicável.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">6. Alterações nesta Política</h2>
            <p className="mb-6">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações significativas através da plataforma ou por e-mail.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">7. Contato</h2>
            <p>
              Se tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através da nossa página de <Link href="/contato" className="text-blue-600 hover:underline">Contato</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

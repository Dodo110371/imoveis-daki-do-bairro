import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CookiesPolicyPage() {
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
            Política de Cookies
          </h1>

          <div className="prose prose-slate max-w-none text-slate-600">
            <p className="mb-6">
              Esta Política de Cookies explica o que são cookies, como o <strong>Imóveis daki do Bairro</strong> os utiliza e como você pode gerenciá-los.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">1. O que são Cookies?</h2>
            <p className="mb-6">
              Cookies são pequenos arquivos de texto que são armazenados no seu computador ou dispositivo móvel quando você visita um site. Eles são amplamente utilizados para fazer os sites funcionarem de maneira mais eficiente, bem como para fornecer informações aos proprietários do site.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">2. Como Utilizamos os Cookies</h2>
            <p className="mb-4">
              Utilizamos cookies para diversas finalidades, incluindo:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento da plataforma, permitindo que você navegue e use recursos como áreas seguras e login.</li>
              <li><strong>Cookies de Desempenho e Análise:</strong> Coletam informações sobre como os visitantes usam o site (quais páginas são mais visitadas, mensagens de erro, etc.) para que possamos melhorar a experiência do usuário.</li>
              <li><strong>Cookies de Funcionalidade:</strong> Permitem que o site lembre de escolhas que você fez (como seu nome de usuário, idioma ou região) para fornecer recursos aprimorados e mais pessoais.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">3. Cookies de Terceiros</h2>
            <p className="mb-6">
              Além dos nossos próprios cookies, também podemos usar cookies de terceiros confiáveis para reportar estatísticas de uso da plataforma e melhorar a performance dos anúncios.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">4. Gerenciamento de Cookies</h2>
            <p className="mb-6">
              A maioria dos navegadores web aceita cookies automaticamente, mas você pode modificar as configurações do seu navegador para recusar cookies, se preferir. No entanto, isso pode impedir que você aproveite totalmente os recursos da plataforma.
            </p>
            <p className="mb-6">
              Para saber mais sobre como gerenciar cookies nos navegadores mais populares:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Microsoft Edge</li>
              <li>Safari</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4">5. Alterações nesta Política</h2>
            <p className="mb-6">
              Podemos atualizar nossa Política de Cookies periodicamente. Recomendamos que você reveja esta página regularmente para se manter informado sobre o uso de cookies.
            </p>
            
            <p>
              Última atualização: {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

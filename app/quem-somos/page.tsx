import { Shield, Users, Search, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function QuemSomosPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-20">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Quem Somos</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Uma plataforma de divulgação local que conecta moradores, proprietários e imobiliárias do bairro.
          </p>
        </div>

        {/* O que somos */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Cadastro de Imóveis</h3>
            <p className="text-slate-600">
              Proprietários e imobiliárias cadastram seus imóveis de forma simples e direta para divulgação no bairro.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Busca Local</h3>
            <p className="text-slate-600">
              Visitantes encontram o imóvel ideal pesquisando por cidade, bairro e rua, com foco na nossa região.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Contato Direto</h3>
            <p className="text-slate-600">
              O interessado entra em contato diretamente com o anunciante através do botão "Entrar em contato".
            </p>
          </div>
        </div>

        {/* Política e Segurança */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-16">
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-14 bg-slate-900 text-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-6">Nossa Política</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-green-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Sem Intermediação</h4>
                    <p className="text-slate-300">
                      Não intermediamos negociações e não ajudamos a fechar negócios. Somos um classificado online.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-green-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Sem Comissões</h4>
                    <p className="text-slate-300">
                      Não cobramos percentual sobre vendas ou aluguéis. Não participamos dos valores transacionados.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-green-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">Sem Propostas no Sistema</h4>
                    <p className="text-slate-300">
                      Nosso sistema não possui campos para negociação de valores ou envio de propostas financeiras.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-10 md:p-14 bg-white flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Importante Saber</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                O site <strong>Imóveis daki do Bairro</strong> atua exclusivamente como uma vitrine virtual (marketplace). 
                Não exigimos CRECI para o cadastro no site pois não realizamos a atividade de corretagem.
              </p>
              
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex gap-3 mb-3">
                  <AlertCircle className="h-6 w-6 text-amber-600" />
                  <h4 className="font-bold text-amber-800">Atenção</h4>
                </div>
                <p className="text-sm text-amber-800/80">
                  Qualquer negociação é de inteira responsabilidade das partes envolvidas (anunciante e interessado). 
                  Recomendamos sempre verificar a documentação do imóvel e do proprietário antes de qualquer pagamento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-slate-600 mb-6">Tem alguma dúvida sobre como funciona?</p>
          <Link 
            href="/contato" 
            className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
          >
            Fale Conosco
          </Link>
        </div>

      </div>
    </div>
  );
}

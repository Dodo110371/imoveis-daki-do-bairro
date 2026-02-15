import { FAQAccordion } from "@/components/FAQAccordion";
import { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, FileText, Key, DollarSign, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Perguntas Frequentes | Imóveis daki do Bairro",
  description: "Tire suas dúvidas sobre aluguel, compra, venda e financiamento de imóveis.",
};

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Locação",
      items: [
        {
          question: "Quais documentos preciso para alugar um imóvel?",
          answer: (
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Pessoa Física:</strong> RG, CPF, Comprovante de Residência e Comprovante de Renda (3 últimos holerites ou Imposto de Renda).</li>
              <li><strong>Pessoa Jurídica:</strong> Contrato Social, Cartão CNPJ, RG e CPF dos sócios e Balanço Patrimonial.</li>
            </ul>
          ),
        },
        {
          question: "Quais são as garantias locatícias aceitas?",
          answer: "Trabalhamos com Fiador (imóvel quitado e registrado), Seguro Fiança (Porto Seguro, CredPago) e Título de Capitalização. Algumas opções dispensam fiador mediante análise de crédito.",
        },
        {
          question: "O que é preciso para visitar um imóvel?",
          answer: "Basta agendar pelo nosso site ou WhatsApp. Para retirada de chaves na imobiliária, é necessário deixar um documento original com foto.",
        },
      ],
    },
    {
      title: "Compra e Venda",
      items: [
        {
          question: "Como funciona o financiamento imobiliário?",
          answer: "O financiamento é feito diretamente com bancos. Geralmente exige-se entrada de 20% do valor do imóvel. Nossa equipe auxilia em todo o processo de aprovação de crédito e documentação.",
        },
        {
          question: "Posso usar meu FGTS na compra?",
          answer: "Sim! O FGTS pode ser utilizado para compra de imóveis residenciais de até R$ 1,5 milhão, desde que seja para moradia própria e você tenha pelo menos 3 anos de trabalho sob regime do FGTS.",
        },
        {
          question: "Quais taxas eu pago ao comprar um imóvel?",
          answer: (
            <>
              Além do valor do imóvel, o comprador deve reservar cerca de 4% a 5% para despesas com documentação:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>ITBI:</strong> Imposto de Transmissão de Bens Imóveis (varia por município).</li>
                <li><strong>Escritura:</strong> Cartório de Notas (para compras à vista).</li>
                <li><strong>Registro:</strong> Cartório de Registro de Imóveis.</li>
              </ul>
            </>
          ),
        },
      ],
    },
    {
      title: "Anúncios e Serviços",
      items: [
        {
          question: "Como faço para anunciar meu imóvel?",
          answer: (
            <>
              É muito simples! Acesse a página <Link href="/anunciar" className="text-blue-600 hover:text-blue-700 underline underline-offset-2 font-semibold">Anuncie seu Imóvel</Link>, preencha o formulário com os dados básicos e nossa equipe entrará em contato para agendar as fotos e validar as informações.
            </>
          ),
        },
        {
          question: "Quanto custa para anunciar?",
          answer: "O anúncio é gratuito! Cobramos apenas uma taxa de corretagem no êxito da venda ou o primeiro aluguel na locação, conforme tabela do CRECI.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header Section */}
      <section className="bg-blue-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-blue-400 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-800 rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-blue-200" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Como podemos ajudar?</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Reunimos as respostas para as dúvidas mais comuns de nossos clientes para agilizar seu atendimento.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-12 max-w-4xl mx-auto">
          {/* Quick Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 border-b border-slate-100 pb-12">
            <a href="#category-0" className="flex flex-col items-center p-4 rounded-xl hover:bg-blue-50 transition-colors group text-center">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-lg mb-3 group-hover:scale-110 transition-transform">
                <Key className="h-6 w-6" />
              </div>
              <span className="font-medium text-slate-700">Locação</span>
            </a>
            <a href="#category-1" className="flex flex-col items-center p-4 rounded-xl hover:bg-blue-50 transition-colors group text-center">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg mb-3 group-hover:scale-110 transition-transform">
                <DollarSign className="h-6 w-6" />
              </div>
              <span className="font-medium text-slate-700">Compra e Venda</span>
            </a>
            <a href="#category-2" className="flex flex-col items-center p-4 rounded-xl hover:bg-blue-50 transition-colors group text-center">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-lg mb-3 group-hover:scale-110 transition-transform">
                <FileText className="h-6 w-6" />
              </div>
              <span className="font-medium text-slate-700">Anúncios</span>
            </a>
            <Link href="/contato" className="flex flex-col items-center p-4 rounded-xl hover:bg-blue-50 transition-colors group text-center">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg mb-3 group-hover:scale-110 transition-transform">
                <HelpCircle className="h-6 w-6" />
              </div>
              <span className="font-medium text-slate-700">Outras Dúvidas</span>
            </Link>
          </div>

          <FAQAccordion categories={faqCategories} />

          <div className="mt-16 p-8 bg-slate-50 rounded-xl text-center border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Não encontrou o que procurava?</h3>
            <p className="text-slate-600 mb-6">Nossa equipe de especialistas está pronta para te atender.</p>
            <Link 
              href="/contato" 
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

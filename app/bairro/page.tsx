import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, School, ShoppingBag, Trees, Shield, Bus } from 'lucide-react';

export default function BairroPage() {
  const highlights = [
    {
      icon: <School className="h-8 w-8 text-blue-600" />,
      title: "Educação de Qualidade",
      description: "Ampla rede de escolas públicas e particulares, além de faculdades e cursos técnicos próximos."
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-blue-600" />,
      title: "Comércio Variado",
      description: "Supermercados, farmácias, padarias e feiras livres a poucos minutos de distância."
    },
    {
      icon: <Trees className="h-8 w-8 text-blue-600" />,
      title: "Áreas Verdes",
      description: "Praças arborizadas e parques para lazer e prática de exercícios ao ar livre."
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: "Segurança",
      description: "Bairros monitorados e com policiamento constante para a tranquilidade da sua família."
    },
    {
      icon: <Bus className="h-8 w-8 text-blue-600" />,
      title: "Mobilidade Urbana",
      description: "Fácil acesso às principais vias e transporte público eficiente para toda a região."
    },
    {
      icon: <MapPin className="h-8 w-8 text-blue-600" />,
      title: "Localização Estratégica",
      description: "Próximo a praias e com rápido acesso aos centros comerciais de São Luís."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          {/* Placeholder for a neighborhood image background if available, using pattern for now */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center" />
        </div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Viva Bem no Seu Bairro
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Conheça as vantagens de morar em uma região que une tranquilidade, conveniência e constante valorização.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-20">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Paço do Lumiar e Região
              </h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Nossa região tem se destacado como um dos principais vetores de crescimento da Grande Ilha. Com uma infraestrutura em constante evolução, o bairro oferece tudo o que você precisa para viver com conforto e praticidade.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Do tradicional Maiobão aos novos empreendimentos residenciais, aqui você encontra uma comunidade acolhedora e serviços completos. A proximidade com belas praias e o fácil acesso à capital tornam esta localização privilegiada para quem busca qualidade de vida sem abrir mão da conveniência urbana.
              </p>
              <div className="mt-8">
                <Link
                  href="/imoveis"
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-md"
                >
                  Ver Imóveis Disponíveis
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1449824913929-49aa7149c435?q=80&w=1000&auto=format&fit=crop"
                alt="Vista do bairro"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Por que escolher esta região?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlights.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                  <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">+10</div>
              <div className="text-slate-400 text-sm">Anos de Crescimento</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">15min</div>
              <div className="text-slate-400 text-sm">Das Praias</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">+50</div>
              <div className="text-slate-400 text-sm">Escolas na Região</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100%</div>
              <div className="text-slate-400 text-sm">Qualidade de Vida</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para mudar de vida?
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Encontre o imóvel perfeito para você e sua família em nossa seleção exclusiva.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/imoveis"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-lg"
            >
              Buscar Imóveis
            </Link>
            <Link
              href="/contato"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Falar com Consultor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

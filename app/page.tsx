import { PropertyCard } from "@/components/PropertyCard";
import { Search, MapPin, Home, Key, Map, Navigation, Building2 } from "lucide-react";
import Image from "next/image";

// Mock Data
const FEATURED_PROPERTIES = [
  {
    id: "1",
    title: "Apartamento com Vista para o Parque",
    price: "R$ 850.000",
    location: "Rua das Flores, 123",
    bedrooms: 3,
    bathrooms: 2,
    area: 98,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    type: "Venda" as const,
  },
  {
    id: "2",
    title: "Casa Charmosa em Vila Fechada",
    price: "R$ 1.200.000",
    location: "Travessa do Sol, 45",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800",
    type: "Venda" as const,
  },
  {
    id: "3",
    title: "Studio Moderno Perto do Metrô",
    price: "R$ 3.500/mês",
    location: "Av. Principal, 500",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    type: "Aluguel" as const,
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] md:min-h-[850px] w-full flex flex-col items-center justify-start pt-1 bg-slate-900">
        <div
          className="absolute inset-0 bg-[url('/bairro-hero.jpeg')] bg-cover bg-center opacity-40"
        />
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <div className="relative w-full max-w-[300px] h-[120px] md:max-w-none md:w-[800px] md:h-[320px] -mt-8 mb-4 md:-mb-24 drop-shadow-2xl">
            <Image
              src="/Logo_imoveis_daki_do_bairro.png"
              alt="Imóveis daki do Bairro Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg px-2">
            Viva o melhor do seu Bairro
          </h1>
          <p className="text-lg md:text-xl text-slate-100 mb-8 max-w-2xl drop-shadow-md px-4">
            Conhecemos cada rua, cada praça e cada oportunidade. Encontre seu novo lar com quem entende do assunto.
          </p>

          {/* Enhanced Search Card */}
          <div className="w-full max-w-4xl bg-white p-4 md:p-6 rounded-xl shadow-2xl backdrop-blur-sm bg-white/95 mx-4">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* City Selection */}
                <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-slate-50 hover:bg-white transition-colors group focus-within:ring-2 ring-slate-200">
                  <Building2 className="text-slate-400 group-focus-within:text-blue-600 h-5 w-5" />
                  <div className="flex-1">
                    <label className="block text-xs text-slate-500 font-semibold mb-0.5">Cidade</label>
                    <select className="w-full outline-none text-slate-700 bg-transparent text-sm font-medium">
                      <option value="">Selecione a cidade...</option>
                      <option value="sp">São Paulo</option>
                      <option value="rj">Rio de Janeiro</option>
                      <option value="bh">Belo Horizonte</option>
                    </select>
                  </div>
                </div>

                {/* Neighborhood Selection */}
                <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-slate-50 hover:bg-white transition-colors group focus-within:ring-2 ring-slate-200">
                  <Map className="text-slate-400 group-focus-within:text-blue-600 h-5 w-5" />
                  <div className="flex-1">
                    <label className="block text-xs text-slate-500 font-semibold mb-0.5">Bairro</label>
                    <select className="w-full outline-none text-slate-700 bg-transparent text-sm font-medium">
                      <option value="">Selecione o bairro...</option>
                      <option value="centro">Centro</option>
                      <option value="jardins">Jardins</option>
                      <option value="sul">Zona Sul</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                {/* Street Input */}
                <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-slate-50 hover:bg-white transition-colors group focus-within:ring-2 ring-slate-200">
                  <Navigation className="text-slate-400 group-focus-within:text-blue-600 h-5 w-5" />
                  <div className="flex-1">
                    <label className="block text-xs text-slate-500 font-semibold mb-0.5">Rua (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ex: Rua das Flores"
                      className="w-full outline-none text-slate-700 bg-transparent text-sm placeholder-slate-400"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-slate-50 hover:bg-white transition-colors group focus-within:ring-2 ring-slate-200">
                  <Home className="text-slate-400 group-focus-within:text-blue-600 h-5 w-5" />
                  <div className="flex-1">
                    <label className="block text-xs text-slate-500 font-semibold mb-0.5">Tipo</label>
                    <select className="w-full outline-none text-slate-700 bg-transparent text-sm font-medium">
                      <option value="todos">Todos</option>
                      <option value="apto">Apartamento</option>
                      <option value="casa">Casa</option>
                      <option value="comercial">Comercial</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-3 mt-2">
                <button className="flex-1 bg-slate-900 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  <Search className="h-5 w-5" />
                  Buscar Imóveis
                </button>
                <button className="md:w-auto px-6 py-3.5 rounded-lg border-2 border-slate-200 font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  Ver no Mapa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Destaques da Semana</h2>
          <a href="/imoveis" className="text-blue-600 font-semibold hover:underline">Ver todos</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROPERTIES.map((prop) => (
            <PropertyCard key={prop.id} {...prop} />
          ))}
        </div>
      </section>

      {/* Why Choose Us / Neighborhood Info */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Por que escolher o Bairro?</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Muito mais que metros quadrados. Valorizamos a história, a conveniência e o estilo de vida que só a nossa região oferece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Localização Privilegiada</h3>
              <p className="text-slate-600">Fácil acesso às principais vias, mas mantendo a tranquilidade de um bairro residencial.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Imóveis Selecionados</h3>
              <p className="text-slate-600">Curadoria rigorosa. Só trabalhamos com imóveis que compraríamos para nós mesmos.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Assessoria Completa</h3>
              <p className="text-slate-600">Do início ao fim. Cuidamos de toda a burocracia para você só se preocupar com a mudança.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

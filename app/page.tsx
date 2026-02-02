import { SearchForm } from "@/components/SearchForm";
import { PropertyCard } from "@/components/PropertyCard";
import { MapPin, Home, Key, Sparkles, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

// HomePage Component
export default async function HomePage() {
  const supabase = await createClient();

  // Fetch featured properties
  const { data: featuredData } = await supabase
    .from('properties')
    .select('*')
    .eq('featured', true)
    .limit(3);

  // Fetch new properties
  const { data: newData } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  // Helper to map DB to Card Props
  const mapProperty = (p: any) => ({
    id: p.id,
    title: p.title,
    price: p.type === 'Aluguel'
      ? `R$ ${p.price}/mês`
      : `R$ ${Number(p.price).toLocaleString('pt-BR')}`,
    location: p.location,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    imageUrl: p.images?.[0] || '/placeholder.jpg',
    type: p.type,
  });

  const featuredProperties = featuredData?.map(mapProperty) || [];
  const newProperties = newData?.map(mapProperty) || [];

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] md:min-h-[850px] w-full flex flex-col items-center justify-start pt-1 bg-slate-900">
        <div
          className="absolute inset-0 bg-[url('/bairro-hero.jpeg')] bg-cover bg-center opacity-40"
        />
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <div className="relative w-full max-w-[420px] h-[240px] md:max-w-none md:w-[800px] md:h-[320px] mt-28 md:-mt-8 mb-4 md:-mb-24 drop-shadow-2xl">
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
          <SearchForm />
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-100 p-2 rounded-full">
              <Sparkles className="h-6 w-6 text-yellow-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Imóveis em Destaque</h2>
          </div>
          <Link href="/imoveis" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
            Ver todos <span className="hidden sm:inline">os destaques</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((prop) => (
            <PropertyCard key={prop.id} {...prop} />
          ))}
        </div>
      </section>

      {/* New Releases Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Últimos Lançamentos</h2>
            </div>
            <Link href="/imoveis" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
              Ver novidades
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newProperties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us / Neighborhood Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Por que escolher o Bairro?</h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Muito mais que metros quadrados. Valorizamos a história, a conveniência e o estilo de vida que só a nossa região oferece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Localização Privilegiada</h3>
              <p className="text-slate-600">Fácil acesso às principais vias, mas mantendo a tranquilidade de um bairro residencial.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Imóveis Selecionados</h3>
              <p className="text-slate-600">Curadoria rigorosa. Só trabalhamos com imóveis que compraríamos para nós mesmos.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
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

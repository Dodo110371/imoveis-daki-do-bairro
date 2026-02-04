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
    <div className="flex flex-col gap-16 pb-16 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] md:min-h-[850px] w-full flex flex-col items-center justify-start pt-1 bg-slate-900 overflow-hidden">
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-slate-900/60 z-[1] mix-blend-overlay animate-gradient" />
        <div
          className="absolute inset-0 bg-[url('/bairro-hero.jpeg')] bg-cover bg-center opacity-50 z-0 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
        />
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-float delay-0" />
        <div className="absolute bottom-40 right-10 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl animate-float delay-1000" />

        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
          <div className="relative w-full max-w-[420px] h-[240px] md:max-w-none md:w-[800px] md:h-[320px] mt-28 md:-mt-8 mb-4 md:-mb-24 drop-shadow-2xl animate-in fade-in zoom-in duration-1000">
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
      <section className="container mx-auto px-4 relative">
        <div className="absolute -left-40 top-0 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl -z-10" />
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 p-3 rounded-2xl shadow-sm border border-orange-100">
              <Sparkles className="h-6 w-6 text-orange-600" />
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
      <section className="bg-slate-50 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-2xl shadow-sm border border-blue-100">
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
      <section className="py-20 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-50 to-purple-50 rounded-full blur-3xl -z-10 opacity-60" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Por que escolher o Bairro?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Muito mais que metros quadrados. Valorizamos a história, a conveniência e o estilo de vida que só a nossa região oferece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Localização Privilegiada</h3>
              <p className="text-slate-600 leading-relaxed">Fácil acesso às principais vias, mas mantendo a tranquilidade de um bairro residencial.</p>
            </div>
            <div className="group p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Home className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Imóveis Selecionados</h3>
              <p className="text-slate-600 leading-relaxed">Curadoria rigorosa. Só trabalhamos com imóveis que compraríamos para nós mesmos.</p>
            </div>
            <div className="group p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-purple-200 transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Key className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Assessoria Completa</h3>
              <p className="text-slate-600 leading-relaxed">Do início ao fim. Cuidamos de toda a burocracia para você só se preocupar com a mudança.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

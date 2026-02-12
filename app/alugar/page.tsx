import { PropertyCard } from "@/components/PropertyCard";
import { Search } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FilterSidebar } from "@/components/FilterSidebar";

interface AlugarPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AlugarPage({ searchParams }: AlugarPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Start building the query
  let query = supabase
    .from('properties')
    .select('*')
    .ilike('type', 'Aluguel')
    .eq('status', 'active');

  // Apply filters
  if (params.category) {
    const categoryMap: Record<string, string> = {
      'Apartamento': 'apto',
      'Casa': 'casa',
      'Comercial': 'comercial',
      'Terreno': 'terreno',
      'Sobrado': 'casa', // Fallback for Sobrado
      'Rural': 'terreno' // Fallback for Rural
    };
    const dbValue = categoryMap[params.category as string] || params.category;
    query = query.ilike('category', dbValue as string);
  }

  if (params.bedrooms) {
    query = query.gte('bedrooms', parseInt(params.bedrooms as string));
  }

  if (params.bathrooms) {
    query = query.gte('bathrooms', parseInt(params.bathrooms as string));
  }

  if (params.parking) {
    query = query.gte('parking', parseInt(params.parking as string));
  }

  if (params.minPrice) {
    query = query.gte('price', parseFloat(params.minPrice as string));
  }

  if (params.maxPrice) {
    query = query.lte('price', parseFloat(params.maxPrice as string));
  }

  if (params.minArea) {
    query = query.gte('area', parseFloat(params.minArea as string));
  }

  if (params.maxArea) {
    query = query.lte('area', parseFloat(params.maxArea as string));
  }

  const { data: propertiesData } = await query;

  // Helper to map DB to Card Props
  const mapProperty = (p: any) => ({
    id: p.id,
    title: p.title,
    price: `R$ ${p.price}/mês`,
    location: p.location,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    imageUrl: p.images?.[0] || '/placeholder.jpg',
    images: p.images || [],
    type: p.type,
  });

  const properties = propertiesData?.map(mapProperty) || [];

  return (
    <div className="min-h-screen bg-slate-50 py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl -z-10 animate-float delay-700" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Alugar Imóveis
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A liberdade de morar onde você quiser. Confira as melhores opções de locação.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop: Sticky, Mobile: Fixed overlay */}
          <div className="lg:w-72 flex-shrink-0">
            <FilterSidebar type="Aluguel" />
          </div>

          {/* Results Grid */}
          <div className="flex-grow">
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((prop) => (
                  <PropertyCard key={prop.id} {...prop} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-100 h-full flex flex-col items-center justify-center">
                <Search className="w-12 h-12 text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Nenhum imóvel encontrado</h3>
                <p className="text-slate-500 mb-6">Tente ajustar seus filtros para encontrar o que procura.</p>
                <Link
                  href="/alugar"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Limpar Filtros
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

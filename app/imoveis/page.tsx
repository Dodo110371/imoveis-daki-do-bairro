import { PropertyCard } from "@/components/PropertyCard";
import { Search, FilterX, Map as MapIcon, List } from "lucide-react";
import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";
import { createClient } from "@/lib/supabase/server";
import { CITIES } from "@/lib/cities";

interface SearchPageProps {
  searchParams: Promise<{
    city?: string;
    neighborhood?: string;
    street?: string;
    type?: string;
    view?: string;
    minPrice?: string;
    maxPrice?: string;
    bedrooms?: string;
    bathrooms?: string;
    minArea?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const { city, neighborhood, street, type, view, minPrice, maxPrice, bedrooms, bathrooms, minArea } = params;
  const supabase = await createClient();

  const isMapView = view === 'map';
  const cityData = city ? CITIES.find(c => c.slug === city) : CITIES.find(c => c.slug === 'sao-luis');
  const mapEmbedUrl = cityData?.mapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127504.60965359738!2d-44.302844549999995!3d-2.5387426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f685d0549c4fb9%3A0x7e59754329244093!2zU8OjbyBMdcOtcyAtIE1B!5e0!3m2!1spt-BR!2sbr!4v1707000000000!5m2!1spt-BR!2sbr";

  const toggleParams = new URLSearchParams();
  if (city) toggleParams.set('city', city);
  if (neighborhood) toggleParams.set('neighborhood', neighborhood);
  if (street) toggleParams.set('street', street);
  if (type) toggleParams.set('type', type);

  let query = supabase.from('properties').select('*');

  // Apply filters
  if (neighborhood) {
    // Search in location or description
    query = query.or(`location.ilike.%${neighborhood}%,description.ilike.%${neighborhood}%`);
  }

  if (street) {
    query = query.ilike('location', `%${street}%`);
  }

  // Filter only active properties
  query = query.eq('status', 'active');

  if (type && type !== 'todos') {
    const typeMap: Record<string, string> = {
      'apto': 'Apartamento',
      'casa': 'Casa',
      'comercial': 'Comercial'
    };

    const mappedType = typeMap[type] || type;

    // Check if it's Venda/Aluguel or a property characteristic
    if (['Venda', 'Aluguel'].includes(mappedType)) {
      query = query.eq('type', mappedType);
    } else {
      // Search in title, type column, or description
      query = query.or(`title.ilike.%${mappedType}%,type.ilike.%${mappedType}%,description.ilike.%${mappedType}%`);
    }
  }

  const { data: propertiesData } = await query;

  // Helper to map DB to Card Props (same as HomePage)
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
    images: p.images || [],
    imageUrl: p.images?.[0] || '/placeholder.jpg',
    type: p.type,
  });

  const filteredProperties = propertiesData?.map(mapProperty) || [];

  const hasFilters = city || neighborhood || street || type || minPrice || maxPrice || bedrooms || bathrooms || minArea;

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      {/* Header with Search */}
      <div className="bg-slate-900 pt-8 pb-12 px-4">
        <div className="container mx-auto flex flex-col items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            Encontre o imóvel ideal
          </h1>
          <div className="w-full flex justify-center">
            <div className="w-full max-w-4xl transform scale-90 md:scale-100 origin-top">
              <SearchForm />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        {/* Results Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              {filteredProperties.length} {filteredProperties.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
            </h2>
            {hasFilters && (
              <p className="text-slate-500 text-sm mt-1">
                Exibindo resultados para sua busca
              </p>
            )}
          </div>

          {hasFilters && (
            <Link
              href="/imoveis"
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 transition-colors"
            >
              <FilterX className="h-4 w-4" />
              Limpar Filtros
            </Link>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-6">
          <div className="bg-white p-1 rounded-lg border border-slate-200 flex items-center shadow-sm">
            <Link
              href={`/imoveis?${(() => { const p = new URLSearchParams(toggleParams); p.set('view', 'list'); return p.toString(); })()}`}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${!isMapView ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <List className="h-4 w-4" />
              Lista
            </Link>
            <Link
              href={`/imoveis?${(() => { const p = new URLSearchParams(toggleParams); p.set('view', 'map'); return p.toString(); })()}`}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${isMapView ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <MapIcon className="h-4 w-4" />
              Mapa
            </Link>
          </div>
        </div>

        {/* Results Content */}
        {filteredProperties.length > 0 ? (
          isMapView ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)] min-h-[600px]">
              {/* Property List Side */}
              <div className="lg:col-span-1 overflow-y-auto pr-2 space-y-4 h-full custom-scrollbar">
                {filteredProperties.map((prop) => (
                  <PropertyCard key={prop.id} {...prop} />
                ))}
              </div>

              {/* Map Side */}
              <div className="lg:col-span-2 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shadow-inner relative h-full">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-slate-100 max-w-xs z-10">
                  <p className="text-sm font-medium text-slate-800">
                    Visualizando imóveis em {cityData?.name || "São Luís"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((prop) => (
                <PropertyCard key={prop.id} {...prop} />
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center bg-white rounded-lg shadow-sm border border-slate-100">
            <div className="bg-slate-50 p-4 rounded-full mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Nenhum imóvel encontrado
            </h3>
            <p className="text-slate-500 max-w-md mx-auto mb-6">
              Não encontramos imóveis com as características selecionadas. Tente ajustar seus filtros ou buscar por outra região.
            </p>
            <Link
              href="/imoveis"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Ver todos os imóveis
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

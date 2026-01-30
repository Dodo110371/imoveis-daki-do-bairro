import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES } from "@/lib/properties";
import { Search, FilterX } from "lucide-react";
import Link from "next/link";
import { SearchForm } from "@/components/SearchForm";

interface SearchPageProps {
  searchParams: Promise<{
    city?: string;
    neighborhood?: string;
    street?: string;
    type?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const { city, neighborhood, street, type } = params;

  // Filter properties logic
  const filteredProperties = PROPERTIES.filter((property) => {
    // Note: Since mock data doesn't have city/neighborhood structure yet, 
    // we'll do basic string matching on location for now.
    // In a real app, you'd match against specific fields.

    if (city && !property.location.toLowerCase().includes(city.toLowerCase())) {
       // Ideally we would map "paco-do-lumiar" to "Paço do Lumiar" for better matching
       // For now, let's skip strict city check on mock data as it's limited
    }

    if (neighborhood && !property.location.toLowerCase().includes(neighborhood.toLowerCase())) {
       // Simple substring match for mock data
    }
    
    // For this mock implementation, we'll try to match terms against the location string
    // or description if available
    let matches = true;

    if (neighborhood) {
       matches = matches && (
         property.location.toLowerCase().includes(neighborhood.toLowerCase()) || 
         property.description.toLowerCase().includes(neighborhood.toLowerCase())
       );
    }

    if (street) {
      matches = matches && property.location.toLowerCase().includes(street.toLowerCase());
    }

    if (type && type !== 'todos') {
      // Basic type mapping
      const typeMap: Record<string, string> = {
        'apto': 'Apartamento',
        'casa': 'Casa',
        'comercial': 'Comercial'
      };
      
      const mappedType = typeMap[type];
      if (mappedType) {
        matches = matches && (
            property.title.toLowerCase().includes(mappedType.toLowerCase()) ||
            (property.type && property.type.toLowerCase().includes(mappedType.toLowerCase()))
        );
      }
    }

    return matches;
  });

  const hasFilters = city || neighborhood || street || type;

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

        {/* Results Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
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

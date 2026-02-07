'use client';

import { useComparison } from '@/context/ComparisonContext';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightLeft, Check, X, MapPin, Bed, Bath, Move, Building2 } from 'lucide-react';

export default function ComparePage() {
  const { compareList, removeFromCompare } = useComparison();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      if (compareList.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .in('id', compareList);

      if (data) {
        // Sort data to match order of compareList for consistency if needed, 
        // but just mapping them is fine.
        const mapped = data.map(p => ({
            id: p.id,
            title: p.title,
            price: p.type === 'Aluguel' ? `R$ ${p.price}/mês` : `R$ ${Number(p.price).toLocaleString('pt-BR')}`,
            rawPrice: p.price,
            location: p.location,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            area: p.area,
            imageUrl: p.images?.[0] || '/placeholder.jpg',
            type: p.type,
            features: p.features || [],
            description: p.description
        }));
        setProperties(mapped);
      }
      setLoading(false);
    }

    fetchProperties();
  }, [compareList]);

  if (loading) {
     return (
        <div className="min-h-screen bg-slate-50 py-12 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
     );
  }

  if (properties.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-4 text-center">
            <div className="bg-white p-12 rounded-2xl shadow-sm border border-slate-100 max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ArrowRightLeft size={40} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-4">
                    Comparador de Imóveis
                </h1>
                <p className="text-slate-600 mb-8 text-lg">
                    Adicione até 3 imóveis para comparar suas características lado a lado.
                </p>
                <div className="flex justify-center gap-4">
                    <Link href="/comprar" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Ver Imóveis
                    </Link>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // Get all unique features across all properties to list them
  const allFeatures = Array.from(new Set(properties.flatMap(p => p.features)));

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <ArrowRightLeft className="text-blue-600" />
          Comparação de Imóveis
        </h1>

        <div className="overflow-x-auto pb-6">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-4 gap-4">
              {/* Labels Column */}
              <div className="col-span-1 space-y-4 pt-64">
                <div className="h-12 flex items-center font-semibold text-slate-700 border-b border-slate-200">Preço</div>
                <div className="h-12 flex items-center font-semibold text-slate-700 border-b border-slate-200">Localização</div>
                <div className="h-12 flex items-center font-semibold text-slate-700 border-b border-slate-200">Tipo</div>
                <div className="h-12 flex items-center font-semibold text-slate-700 border-b border-slate-200">Área</div>
                <div className="h-12 flex items-center font-semibold text-slate-700 border-b border-slate-200">Quartos</div>
                <div className="h-12 flex items-center font-semibold text-slate-700 border-b border-slate-200">Banheiros</div>
                {allFeatures.map(feature => (
                  <div key={feature} className="h-12 flex items-center font-semibold text-slate-700 border-b border-slate-200 text-sm">
                    {feature}
                  </div>
                ))}
                <div className="h-12 flex items-center font-semibold text-slate-700">Ações</div>
              </div>

              {/* Property Columns */}
              {properties.map((property) => (
                <div key={property.id} className="col-span-1 relative bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <button 
                    onClick={() => removeFromCompare(property.id)}
                    className="absolute top-2 right-2 z-10 bg-white/90 p-1 rounded-full text-slate-500 hover:text-red-500 transition-colors shadow-sm"
                    title="Remover"
                  >
                    <X size={20} />
                  </button>
                  
                  {/* Header Image & Title */}
                  <div className="h-64 flex flex-col">
                    <div className="relative h-40 w-full">
                        <Image src={property.imageUrl} alt={property.title} fill className="object-cover" />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-center">
                        <Link href={`/imoveis/${property.id}`} className="font-bold text-slate-900 hover:text-blue-600 line-clamp-2 leading-tight">
                            {property.title}
                        </Link>
                    </div>
                  </div>

                  {/* Data Rows */}
                  <div className="px-4 pb-4 space-y-4">
                    <div className="h-12 flex items-center text-lg font-bold text-blue-600 border-b border-slate-100">
                        {property.price}
                    </div>
                    <div className="h-12 flex items-center text-slate-600 border-b border-slate-100 text-sm">
                        <MapPin size={16} className="mr-1 shrink-0" />
                        <span className="truncate" title={property.location}>{property.location}</span>
                    </div>
                    <div className="h-12 flex items-center text-slate-600 border-b border-slate-100">
                        <span className="bg-slate-100 px-2 py-1 rounded text-xs font-medium text-slate-700">
                            {property.type}
                        </span>
                    </div>
                    <div className="h-12 flex items-center text-slate-600 border-b border-slate-100">
                        <Move size={16} className="mr-1" /> {property.area} m²
                    </div>
                    <div className="h-12 flex items-center text-slate-600 border-b border-slate-100">
                        <Bed size={16} className="mr-1" /> {property.bedrooms}
                    </div>
                    <div className="h-12 flex items-center text-slate-600 border-b border-slate-100">
                        <Bath size={16} className="mr-1" /> {property.bathrooms}
                    </div>
                    {allFeatures.map(feature => (
                        <div key={`${property.id}-${feature}`} className="h-12 flex items-center justify-center border-b border-slate-100">
                            {property.features.includes(feature) ? (
                                <Check size={20} className="text-green-500" />
                            ) : (
                                <span className="text-slate-300">-</span>
                            )}
                        </div>
                    ))}
                    <div className="h-12 flex items-center justify-center pt-2">
                        <Link href={`/imoveis/${property.id}`} className="w-full text-center bg-slate-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-slate-800">
                            Ver Detalhes
                        </Link>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Empty Slots */}
              {[...Array(3 - properties.length)].map((_, i) => (
                <div key={`empty-${i}`} className="col-span-1 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 text-center h-full min-h-[600px] opacity-60">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                        <ArrowRightLeft size={24} />
                    </div>
                    <p className="text-slate-400 font-medium">Espaço disponível</p>
                    <Link href="/comprar" className="mt-4 text-sm text-blue-600 hover:underline">
                        Adicionar imóvel
                    </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

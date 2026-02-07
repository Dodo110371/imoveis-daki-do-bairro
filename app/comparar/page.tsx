'use client';

import { useComparison } from '@/context/ComparisonContext';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, X, MapPin, Bed, Bath, Car, Move, Trash2 } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: number;
  type: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  garage: number;
  area: number;
  images: string[];
  description?: string;
}

export default function ComparisonPage() {
  const { comparisonIds, removeFromComparison, clearComparison, isLoading: isContextLoading } = useComparison();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProperties() {
      if (comparisonIds.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .in('id', comparisonIds);

      if (data) {
        setProperties(data as Property[]);
      } else if (error) {
        console.error('Error fetching properties:', error);
      }
      setLoading(false);
    }

    if (!isContextLoading) {
      fetchProperties();
    }
  }, [comparisonIds, isContextLoading]);

  const formatPrice = (value: number, type: string) => {
    const formatted = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return type === 'Aluguel' ? `${formatted}/mês` : formatted;
  };

  if (isContextLoading || (loading && comparisonIds.length > 0)) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (comparisonIds.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Nenhum imóvel para comparar</h1>
          <p className="text-slate-600 mb-8">
            Adicione até 3 imóveis à lista de comparação para ver suas características lado a lado.
          </p>
          <Link
            href="/comprar"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Imóveis
          </Link>
        </div>
      </div>
    );
  }

  // Ensure properties are sorted in the same order as comparisonIds for consistency if needed, 
  // or just use the fetch order. Fetch order is usually arbitrary. 
  // Let's sort them by the order in comparisonIds to prevent jumping.
  const sortedProperties = comparisonIds
    .map(id => properties.find(p => p.id === id))
    .filter(Boolean) as Property[];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <Link href="/" className="text-blue-600 hover:underline text-sm mb-2 inline-block">&larr; Voltar</Link>
            <h1 className="text-3xl font-bold text-slate-900">Comparativo de Imóveis</h1>
          </div>
          <button
            onClick={clearComparison}
            className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 size={16} />
            Limpar Comparação
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left w-48 bg-slate-50 border-b border-slate-200">Característica</th>
                {sortedProperties.map(property => (
                  <th key={property.id} className="p-4 w-72 border-b border-slate-200 align-top relative group">
                    <button
                      onClick={() => removeFromComparison(property.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      title="Remover"
                    >
                      <X size={16} />
                    </button>
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-3">
                      <Image
                        src={property.images?.[0] || '/placeholder.jpg'}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-slate-900/80 text-white text-xs px-2 py-1 rounded">
                        {property.type}
                      </div>
                    </div>
                    <Link href={`/imoveis/${property.id}`} className="text-lg font-bold text-slate-900 hover:text-blue-600 block mb-1 line-clamp-2">
                      {property.title}
                    </Link>
                    <div className="text-xl font-bold text-blue-600">
                      {formatPrice(property.price, property.type)}
                    </div>
                  </th>
                ))}
                {/* Fill empty columns if less than 3 */}
                {Array.from({ length: 3 - sortedProperties.length }).map((_, i) => (
                  <th key={`empty-${i}`} className="p-4 w-72 border-b border-slate-200 bg-slate-50/50">
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 rounded-xl p-8">
                      <div className="mb-2">Espaço Vazio</div>
                      <Link href="/comprar" className="text-sm text-blue-600 hover:underline">
                        Adicionar imóvel
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Location */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-600 flex items-center gap-2">
                  <MapPin size={18} className="text-slate-400" />
                  Localização
                </td>
                {sortedProperties.map(property => (
                  <td key={property.id} className="p-4 text-center text-slate-700">
                    {property.location}
                  </td>
                ))}
                {Array.from({ length: 3 - sortedProperties.length }).map((_, i) => <td key={i} className="bg-slate-50/50"></td>)}
              </tr>

              {/* Area */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-600 flex items-center gap-2">
                  <Move size={18} className="text-slate-400" />
                  Área Útil
                </td>
                {sortedProperties.map(property => (
                  <td key={property.id} className="p-4 text-center text-slate-700 font-medium">
                    {property.area} m²
                  </td>
                ))}
                {Array.from({ length: 3 - sortedProperties.length }).map((_, i) => <td key={i} className="bg-slate-50/50"></td>)}
              </tr>

              {/* Bedrooms */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-600 flex items-center gap-2">
                  <Bed size={18} className="text-slate-400" />
                  Quartos
                </td>
                {sortedProperties.map(property => (
                  <td key={property.id} className="p-4 text-center text-slate-700">
                    {property.bedrooms}
                  </td>
                ))}
                {Array.from({ length: 3 - sortedProperties.length }).map((_, i) => <td key={i} className="bg-slate-50/50"></td>)}
              </tr>

              {/* Bathrooms */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-600 flex items-center gap-2">
                  <Bath size={18} className="text-slate-400" />
                  Banheiros
                </td>
                {sortedProperties.map(property => (
                  <td key={property.id} className="p-4 text-center text-slate-700">
                    {property.bathrooms}
                  </td>
                ))}
                {Array.from({ length: 3 - sortedProperties.length }).map((_, i) => <td key={i} className="bg-slate-50/50"></td>)}
              </tr>

              {/* Garage */}
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-medium text-slate-600 flex items-center gap-2">
                  <Car size={18} className="text-slate-400" />
                  Vagas
                </td>
                {sortedProperties.map(property => (
                  <td key={property.id} className="p-4 text-center text-slate-700">
                    {property.garage || 0}
                  </td>
                ))}
                {Array.from({ length: 3 - sortedProperties.length }).map((_, i) => <td key={i} className="bg-slate-50/50"></td>)}
              </tr>

              {/* Action Button */}
              <tr>
                <td className="p-4"></td>
                {sortedProperties.map(property => (
                  <td key={property.id} className="p-4 text-center">
                    <Link
                      href={`/imoveis/${property.id}`}
                      className="inline-block w-full py-2 px-4 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium text-sm"
                    >
                      Ver Detalhes
                    </Link>
                  </td>
                ))}
                {Array.from({ length: 3 - sortedProperties.length }).map((_, i) => <td key={i} className="bg-slate-50/50"></td>)}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useFavorites } from '@/context/FavoritesContext';
import { createClient } from '@/lib/supabase/client';
import { PropertyCard } from '@/components/PropertyCard';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Heart, Home } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, isLoading: isContextLoading } = useFavorites();
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      if (favorites.length === 0) {
        setProperties([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .in('id', favorites);

      if (data) {
        const mapped = data.map(p => ({
            id: p.id,
            title: p.title,
            price: p.type === 'Aluguel' ? `R$ ${p.price}/mês` : `R$ ${Number(p.price).toLocaleString('pt-BR')}`,
            location: p.location,
            bedrooms: p.bedrooms,
            bathrooms: p.bathrooms,
            area: p.area,
            imageUrl: p.images?.[0] || '/placeholder.jpg',
            type: p.type,
        }));
        setProperties(mapped);
      } else if (error) {
        console.error('Error fetching favorites:', error);
      }
      setLoading(false);
    }

    if (!isContextLoading) {
      fetchFavorites();
    }
  }, [favorites, isContextLoading]);

  if (isContextLoading || (loading && favorites.length > 0)) {
     return (
        <div className="min-h-screen bg-slate-50 py-12 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
            <Heart className="text-red-500 fill-current" />
            Meus Favoritos
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Aqui estão os imóveis que você salvou. Compare e escolha o seu preferido.
          </p>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-slate-100 shadow-sm max-w-2xl mx-auto">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-slate-300" />
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Você ainda não tem favoritos
            </h2>
            <p className="text-slate-500 mb-8 max-w-md mx-auto">
              Explore nossos imóveis e clique no ícone de coração para salvar os que você mais gostar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                href="/comprar"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                <Home className="w-4 h-4 mr-2" />
                Ver Imóveis à Venda
                </Link>
                <Link
                href="/alugar"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                Ver Imóveis para Alugar
                </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

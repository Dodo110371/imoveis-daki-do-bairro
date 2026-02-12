'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Building2,
  MapPin,
  BedDouble,
  Bath,
  Car,
  Ruler,
  Search,
  Filter,
  X
} from 'lucide-react';

interface FilterState {
  category: string;
  bedrooms: string;
  bathrooms: string;
  parking: string;
  minPrice: string;
  maxPrice: string;
  minArea: string;
  maxArea: string;
  type: string; // 'Aluguel' is fixed for this page, but good to have in state
}

interface FilterSidebarProps {
  type: 'Aluguel' | 'Venda';
}

export function FilterSidebar({ type }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false); // Mobile state

  const [filters, setFilters] = useState<FilterState>({
    category: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
    minPrice: '',
    maxPrice: '',
    minArea: '',
    maxArea: '',
    type: type
  });

  // Sync state with URL params on mount/update
  useEffect(() => {
    setFilters({
      category: searchParams.get('category') || '',
      bedrooms: searchParams.get('bedrooms') || '',
      bathrooms: searchParams.get('bathrooms') || '',
      parking: searchParams.get('parking') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      minArea: searchParams.get('minArea') || '',
      maxArea: searchParams.get('maxArea') || '',
      type: type
    });
  }, [searchParams, type]);

  const updateFilters = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const params = new URLSearchParams();

    // Always filter by the current page type
    params.set('type', type);

    if (filters.category) params.set('category', filters.category);
    if (filters.bedrooms) params.set('bedrooms', filters.bedrooms);
    if (filters.bathrooms) params.set('bathrooms', filters.bathrooms);
    if (filters.parking) params.set('parking', filters.parking);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minArea) params.set('minArea', filters.minArea);
    if (filters.maxArea) params.set('maxArea', filters.maxArea);

    const basePath = type === 'Aluguel' ? '/alugar' : '/comprar';
    router.push(`${basePath}?${params.toString()}`);
    setIsOpen(false); // Close mobile sidebar
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      bedrooms: '',
      bathrooms: '',
      parking: '',
      minPrice: '',
      maxPrice: '',
      minArea: '',
      maxArea: '',
      type: type
    });
    const basePath = type === 'Aluguel' ? '/alugar' : '/comprar';
    router.push(basePath);
    setIsOpen(false);
  };

  const categories = [
    { value: 'casa', label: 'Casa' },
    { value: 'apto', label: 'Apartamento' },
    { value: 'comercial', label: 'Comercial' },
    { value: 'terreno', label: 'Terreno' }
  ];

  const numberOptions = [1, 2, 3, 4, 5];

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center gap-2"
      >
        <Filter className="w-5 h-5" />
        Filtrar
      </button>

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:w-72 lg:shadow-none lg:block lg:h-fit lg:bg-transparent
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full overflow-y-auto p-6 lg:p-0">
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-bold text-slate-900">Filtros</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 rounded-full">
              <X className="w-6 h-6 text-slate-500" />
            </button>
          </div>

          <div className="space-y-6 bg-white lg:p-6 lg:rounded-2xl lg:shadow-sm lg:border lg:border-slate-200">
            {/* Tipo de Imóvel */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Tipo de Imóvel
              </label>
              <select
                value={filters.category}
                onChange={(e) => updateFilters('category', e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todos</option>
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Quartos */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <BedDouble className="w-4 h-4" />
                Quartos
              </label>
              <div className="flex gap-2">
                {numberOptions.map(num => (
                  <button
                    key={num}
                    onClick={() => updateFilters('bedrooms', filters.bedrooms === num.toString() ? '' : num.toString())}
                    className={`
                      w-10 h-10 rounded-lg border font-medium transition-colors
                      ${filters.bedrooms === num.toString()
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'}
                    `}
                  >
                    {num}+
                  </button>
                ))}
              </div>
            </div>

            {/* Banheiros */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Bath className="w-4 h-4" />
                Banheiros
              </label>
              <div className="flex gap-2">
                {numberOptions.map(num => (
                  <button
                    key={num}
                    onClick={() => updateFilters('bathrooms', filters.bathrooms === num.toString() ? '' : num.toString())}
                    className={`
                      w-10 h-10 rounded-lg border font-medium transition-colors
                      ${filters.bathrooms === num.toString()
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'}
                    `}
                  >
                    {num}+
                  </button>
                ))}
              </div>
            </div>

            {/* Vagas */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Car className="w-4 h-4" />
                Vagas
              </label>
              <div className="flex gap-2">
                {numberOptions.map(num => (
                  <button
                    key={num}
                    onClick={() => updateFilters('parking', filters.parking === num.toString() ? '' : num.toString())}
                    className={`
                      w-10 h-10 rounded-lg border font-medium transition-colors
                      ${filters.parking === num.toString()
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-blue-400'}
                    `}
                  >
                    {num}+
                  </button>
                ))}
              </div>
            </div>

            {/* Preço */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Preço (R$)</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Mínimo"
                  value={filters.minPrice}
                  onChange={(e) => updateFilters('minPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Máximo"
                  value={filters.maxPrice}
                  onChange={(e) => updateFilters('maxPrice', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Área */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                Área (m²)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="Mínimo"
                  value={filters.minArea}
                  onChange={(e) => updateFilters('minArea', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Máximo"
                  value={filters.maxArea}
                  onChange={(e) => updateFilters('maxArea', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <button
                onClick={applyFilters}
                className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Buscar Imóveis
              </button>
              <button
                onClick={clearFilters}
                className="w-full py-2.5 bg-slate-100 text-slate-600 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for Mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </div>
    </>
  );
}

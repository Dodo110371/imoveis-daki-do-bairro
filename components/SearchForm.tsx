'use client';

import { useState } from 'react';
import { Search, MapPin, Home, Navigation, Map, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { CITY_NEIGHBORHOODS } from '@/lib/constants';

export function SearchForm() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [propertyType, setPropertyType] = useState("todos");

  // Advanced Filters State
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [minArea, setMinArea] = useState("");

  const neighborhoods = selectedCity ? CITY_NEIGHBORHOODS[selectedCity as keyof typeof CITY_NEIGHBORHOODS] || [] : [];

  const getSearchParams = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.set('city', selectedCity);
    if (selectedNeighborhood) params.set('neighborhood', selectedNeighborhood);
    if (street) params.set('street', street);
    if (propertyType && propertyType !== 'todos') params.set('type', propertyType);

    // Advanced Filters
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (bathrooms) params.set('bathrooms', bathrooms);
    if (minArea) params.set('minArea', minArea);

    return params;
  };

  const handleSearch = () => {
    const params = getSearchParams();
    router.push(`/imoveis?${params.toString()}`);
  };

  const handleMapSearch = () => {
    const params = getSearchParams();
    params.set('view', 'map');
    router.push(`/imoveis?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl bg-white p-4 md:p-6 rounded-xl shadow-2xl backdrop-blur-sm bg-white/95 mx-4">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* City Selection */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-blue-50/50 border-blue-100 hover:bg-blue-50 transition-colors group focus-within:ring-2 ring-blue-200">
            <Building2 className="text-blue-400 group-focus-within:text-blue-600 h-5 w-5" />
            <div className="flex-1">
              <label className="block text-xs text-blue-600 font-semibold mb-0.5">Cidade</label>
              <select
                className="w-full outline-none text-slate-700 bg-transparent text-sm font-medium"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setSelectedNeighborhood(""); // Reset neighborhood when city changes
                }}
              >
                <option value="">Selecione a cidade...</option>
                <option value="paco-do-lumiar">Paço do Lumiar</option>
                <option value="sao-jose-de-ribamar">São José de Ribamar</option>
                <option value="sao-luis">São Luís</option>
              </select>
            </div>
          </div>

          {/* Neighborhood Selection */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-emerald-50/50 border-emerald-100 hover:bg-emerald-50 transition-colors group focus-within:ring-2 ring-emerald-200">
            <Map className="text-emerald-400 group-focus-within:text-emerald-600 h-5 w-5" />
            <div className="flex-1">
              <label className="block text-xs text-emerald-600 font-semibold mb-0.5">Bairro</label>
              <select
                className="w-full outline-none text-slate-700 bg-transparent text-sm font-medium"
                disabled={!selectedCity}
                value={selectedNeighborhood}
                onChange={(e) => setSelectedNeighborhood(e.target.value)}
              >
                <option value="">{selectedCity ? "Selecione o bairro..." : "Selecione uma cidade primeiro"}</option>
                {neighborhoods.map((neighborhood) => (
                  <option key={neighborhood} value={neighborhood}>
                    {neighborhood}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
          {/* Street Input */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-violet-50/50 border-violet-100 hover:bg-violet-50 transition-colors group focus-within:ring-2 ring-violet-200">
            <Navigation className="text-violet-400 group-focus-within:text-violet-600 h-5 w-5" />
            <div className="flex-1">
              <label className="block text-xs text-violet-600 font-semibold mb-0.5">Rua (Opcional)</label>
              <input
                type="text"
                placeholder="Ex: Rua das Flores"
                className="w-full outline-none text-slate-700 bg-transparent text-sm placeholder-violet-300"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-amber-50/50 border-amber-100 hover:bg-amber-50 transition-colors group focus-within:ring-2 ring-amber-200">
            <Home className="text-amber-400 group-focus-within:text-amber-600 h-5 w-5" />
            <div className="flex-1">
              <label className="block text-xs text-amber-600 font-semibold mb-0.5">Tipo</label>
              <select
                className="w-full outline-none text-slate-700 bg-transparent text-sm font-medium"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="todos">Todos</option>
                <option value="apto">Apartamento</option>
                <option value="casa">Casa</option>
                <option value="comercial">Comercial</option>
              </select>
            </div>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors"
          >
            {showAdvanced ? "Ocultar Filtros Avançados" : "Mostrar Filtros Avançados"}
          </button>
        </div>

        {/* Advanced Filters Section */}
        {showAdvanced && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Min Price */}
            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-medium">Preço Mínimo (R$)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            {/* Max Price */}
            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-medium">Preço Máximo (R$)</label>
              <input
                type="number"
                placeholder="Sem limite"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
            {/* Bedrooms */}
            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-medium">Quartos</label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-100 outline-none bg-white"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                <option value="">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
            {/* Bathrooms */}
            <div className="space-y-1">
              <label className="text-xs text-slate-500 font-medium">Banheiros</label>
              <select
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-100 outline-none bg-white"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              >
                <option value="">Qualquer</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>
            {/* Area */}
            <div className="space-y-1 md:col-span-4">
              <label className="text-xs text-slate-500 font-medium">Área Mínima (m²)</label>
              <input
                type="number"
                placeholder="0"
                className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                value={minArea}
                onChange={(e) => setMinArea(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 mt-2">
          <button
            onClick={handleSearch}
            className="flex-1 bg-slate-900 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Search className="h-5 w-5" />
            Buscar Imóveis
          </button>
          <button
            onClick={handleMapSearch}
            type="button"
            className="md:w-auto px-6 py-3.5 rounded-lg border-2 border-cyan-100 bg-cyan-50/50 font-semibold text-cyan-700 hover:bg-cyan-100 hover:border-cyan-200 transition-colors flex items-center justify-center gap-2"
          >
            <MapPin className="h-5 w-5 text-cyan-600" />
            Ver no Mapa
          </button>
        </div>
      </div>
    </div >
  );
}

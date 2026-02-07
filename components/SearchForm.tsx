'use client';

import { useState } from 'react';
import { Search, MapPin, Home, Navigation, Map, Building2, SlidersHorizontal, X } from 'lucide-react';
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
    <div className="w-full max-w-5xl mx-auto px-4 relative z-20">
      {/* Block 1: Main Search Bar */}
      <div className="bg-white p-3 rounded-2xl shadow-2xl flex flex-col lg:flex-row gap-3 items-center border border-slate-100/50 backdrop-blur-sm">

        {/* City & Neighborhood Group */}
        <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-3 border-r-0 md:border-r border-slate-100 rounded-lg md:rounded-none outline-none text-slate-700 bg-transparent text-sm font-medium focus:bg-slate-50 transition-colors cursor-pointer appearance-none"
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedNeighborhood("");
              }}
            >
              <option value="">Cidade</option>
              <option value="paco-do-lumiar">Paço do Lumiar</option>
              <option value="sao-jose-de-ribamar">São José de Ribamar</option>
              <option value="sao-luis">São Luís</option>
            </select>
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-3 outline-none text-slate-700 bg-transparent text-sm font-medium focus:bg-slate-50 transition-colors cursor-pointer appearance-none"
              disabled={!selectedCity}
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
            >
              <option value="">{selectedCity ? "Selecione o bairro" : "Selecione o bairro"}</option>
              {neighborhoods.map((neighborhood) => (
                <option key={neighborhood} value={neighborhood}>
                  {neighborhood}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="h-8 w-px bg-slate-200 hidden lg:block"></div>

        {/* Type Selection */}
        <div className="w-full lg:w-48 relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Home className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <select
            className="block w-full pl-10 pr-3 py-3 outline-none text-slate-700 bg-transparent text-sm font-medium focus:bg-slate-50 rounded-lg transition-colors cursor-pointer appearance-none"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="todos">Tipo de Imóvel</option>
            <option value="apto">Apartamento</option>
            <option value="casa">Casa</option>
            <option value="comercial">Comercial</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex gap-2 w-full lg:w-auto">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`p-3 rounded-xl border transition-all duration-200 flex items-center justify-center gap-2 ${showAdvanced ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-slate-100 hover:bg-slate-50 text-slate-600'}`}
            title="Filtros Avançados"
          >
            {showAdvanced ? <X size={20} /> : <SlidersHorizontal size={20} />}
            <span className="lg:hidden text-sm font-medium">Filtros</span>
          </button>

          <button
            onClick={handleSearch}
            className="flex-1 lg:flex-none bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Search className="h-5 w-5" />
            <span>Buscar</span>
          </button>
        </div>
      </div>

      {/* Block 2: Advanced Filters Panel */}
      {showAdvanced && (
        <div className="mt-2 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-200/50 animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Street Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Rua / Local</label>
              <div className="relative">
                <Navigation className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Ex: Rua das Flores"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Faixa de Preço</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Mín"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Máx"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Characteristics */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Características</label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                >
                  <option value="">Quartos</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
                <select
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                >
                  <option value="">Banheiros</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>
            </div>

            {/* Area */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Área Mínima</label>
              <div className="relative">
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">m²</span>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  value={minArea}
                  onChange={(e) => setMinArea(e.target.value)}
                />
              </div>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
            <button
              onClick={handleMapSearch}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Map size={18} />
              Buscar no Mapa
            </button>

            <button
              onClick={() => setShowAdvanced(false)}
              className="text-xs text-slate-400 hover:text-slate-600 font-medium px-4 py-2"
            >
              Fechar Filtros
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
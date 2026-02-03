'use client';

import { useState } from 'react';
import { Search, MapPin, Home, Navigation, Map, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CITY_NEIGHBORHOODS = {
  "paco-do-lumiar": [
    "Alto da Esperança", "Boa Vista", "Caranguejo", "Centro", "Conjunto Tambaú", 
    "Cumbique", "Eugênio Pereira", "Iguaíba", "Itapera", "Jardim das Mercês", 
    "Lima Verde", "Loteamento Jardim Paranã", "Loteamento Todos os Santos", 
    "Maioba", "Maiobão", "Mocajituba", "Nova Luz", "Nova Vida", "Novo Horizonte", 
    "Paranã I", "Paranã II", "Paranã III", "Parque Bob Kennedy", "Parque Copacabana", 
    "Parque Horizonte", "Parque Jaguarema", "Pau Deitado", "Pindoba", "Pirâmide", 
    "Porto de Mocajituba", "Recanto Maiobão", "Residencial Abdalla I", "Residencial Abdalla II", 
    "Residencial Araguaia", "Residencial Cidade Verde", "Residencial Orquídeas", "Residencial Safira", 
    "Roseana Sarney", "Sítio Grande", "Tendal Mirim", "Vila Cafeteira", "Vila do Povo", 
    "Vila Mercês", "Vila Nazaré", "Vila Nossa Senhora da Luz", "Vila São José I", "Vila São José II"
  ],
  "sao-jose-de-ribamar": [
    "Alto do Itapiracó", "Alto Turu", "Araçagy", "Área Rural", "Boa Viagem", "Boa Vista", "Campina",
    "Canavieira", "Caúra", "Centro", "Cidade Alta", "Cohatrac", "Cruzeiro", "Gambarrinha",
    "Itapary", "J. Câmara", "J. Lima", "Jaguarema", "Jararaí", "Jardim Tropical",
    "Jeniparana", "Maracajá", "Mata", "Matinha", "Miritíua", "Mojó", "Moropóia",
    "Mutirão", "Nova Terra", "Olho D'Água", "Outeiro", "Panaquatira", "Parque das Palmeiras",
    "Parque Jair", "Parque Vitória", "Pindaí", "Quinta", "Recanto da Paz",
    "Santana", "Santuário", "São Benedito", "São Brás e Macacos", "São José dos Índios",
    "São Raimundo", "Saramanta", "Sítio do Apicum", "Tijupá Queimado", "Ubatuba", "Vieira Barbosa",
    "Vila Alonso Costa", "Vila Cafeteira", "Vila Dr. Julinho", "Vila Flamengo", "Vila Kiola",
    "Vila Mestre Antônio", "Vila Operária", "Vila Roseana Sarney", "Vila Santa Teresinha",
    "Vila São José", "Vila São Luís", "Vila Sarnambi", "Vila Sarney Filho I", "Vila Sarney Filho II"
  ],
  "sao-luis": [
    "Centro", "Renascença", "Calhau", "Ponta d'Areia", "Cohama", "Cohafuma", "Vinhais", "Turu", "Anjo da Guarda", "Cidade Operária"
  ]
};

export function SearchForm() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [propertyType, setPropertyType] = useState("todos");

  const neighborhoods = selectedCity ? CITY_NEIGHBORHOODS[selectedCity as keyof typeof CITY_NEIGHBORHOODS] || [] : [];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCity) params.set('city', selectedCity);
    if (selectedNeighborhood) params.set('neighborhood', selectedNeighborhood);
    if (street) params.set('street', street);
    if (propertyType && propertyType !== 'todos') params.set('type', propertyType);

    router.push(`/imoveis?${params.toString()}`);
  };

  return (
    <div className="w-full max-w-4xl bg-white p-4 md:p-6 rounded-xl shadow-2xl backdrop-blur-sm bg-white/95 mx-4">
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* City Selection */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-slate-50 hover:bg-white transition-colors group focus-within:ring-2 ring-slate-200">
            <Building2 className="text-slate-400 group-focus-within:text-blue-600 h-5 w-5" />
            <div className="flex-1">
              <label className="block text-xs text-slate-500 font-semibold mb-0.5">Cidade</label>
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
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-slate-50 hover:bg-white transition-colors group focus-within:ring-2 ring-slate-200">
            <Map className="text-slate-400 group-focus-within:text-blue-600 h-5 w-5" />
            <div className="flex-1">
              <label className="block text-xs text-slate-500 font-semibold mb-0.5">Bairro</label>
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
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-slate-50 hover:bg-white transition-colors group focus-within:ring-2 ring-slate-200">
            <Navigation className="text-slate-400 group-focus-within:text-blue-600 h-5 w-5" />
            <div className="flex-1">
              <label className="block text-xs text-slate-500 font-semibold mb-0.5">Rua (Opcional)</label>
              <input
                type="text"
                placeholder="Ex: Rua das Flores"
                className="w-full outline-none text-slate-700 bg-transparent text-sm placeholder-slate-400"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="flex items-center gap-3 border rounded-lg px-4 py-3 bg-slate-50 hover:bg-white transition-colors group focus-within:ring-2 ring-slate-200">
            <Home className="text-slate-400 group-focus-within:text-blue-600 h-5 w-5" />
            <div className="flex-1">
              <label className="block text-xs text-slate-500 font-semibold mb-0.5">Tipo</label>
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

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-3 mt-2">
          <button
            onClick={handleSearch}
            className="flex-1 bg-slate-900 text-white px-8 py-3.5 rounded-lg font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Search className="h-5 w-5" />
            Buscar Imóveis
          </button>
          <button className="md:w-auto px-6 py-3.5 rounded-lg border-2 border-slate-200 font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            Ver no Mapa
          </button>
        </div>
      </div>
    </div>
  );
}

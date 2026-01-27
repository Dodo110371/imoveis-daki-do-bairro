import { Bed, Bath, Move, MapPin, Calendar, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Mock Data (simulating a database fetch)
const PROPERTY = {
  id: "1",
  title: "Apartamento com Vista para o Parque",
  price: "R$ 850.000",
  location: "Rua das Flores, 123",
  bedrooms: 3,
  bathrooms: 2,
  area: 98,
  description: `
    Este apartamento espetacular oferece a combinação perfeita de conforto e localização. 
    Situado em um dos pontos mais valorizados do bairro, você estará a poucos passos do parque principal.
    
    O imóvel conta com sala ampla para dois ambientes, varanda gourmet com vista livre, cozinha planejada e quartos espaçosos.
    O condomínio oferece lazer completo com piscina, academia e salão de festas.
  `,
  features: [
    "Varanda Gourmet", "Vista Livre", "Ar Condicionado", "Armários Embutidos", 
    "Piscina no Condomínio", "Academia", "2 Vagas de Garagem", "Portaria 24h"
  ],
  images: [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1502005229762-cf1afd3da504?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&q=80&w=1200"
  ]
};

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // In a real app, we would fetch data here using the id
  // const property = await getProperty(id);
  const property = PROPERTY; 

  return (
    <div className="pb-16">
      {/* Gallery Section - Simplified for MVP */}
      <div className="h-[50vh] w-full bg-slate-200 relative">
        <Image
          src={property.images[0]}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute bottom-4 right-4 bg-white/90 px-4 py-2 rounded-md text-sm font-medium">
          Ver todas as fotos (1/15)
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex flex-col gap-4 mb-8">
              <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">Venda</span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{property.title}</h1>
              <div className="flex items-center text-slate-600">
                <MapPin className="h-5 w-5 mr-2" />
                {property.location}
              </div>
            </div>

            <div className="flex gap-8 border-y py-6 mb-8">
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <Bed className="h-5 w-5" />
                  <span className="text-xl">{property.bedrooms}</span>
                </div>
                <span className="text-xs text-slate-500">Quartos</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <Bath className="h-5 w-5" />
                  <span className="text-xl">{property.bathrooms}</span>
                </div>
                <span className="text-xs text-slate-500">Banheiros</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <Move className="h-5 w-5" />
                  <span className="text-xl">{property.area}</span>
                </div>
                <span className="text-xs text-slate-500">m² úteis</span>
              </div>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Sobre o imóvel</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Diferenciais</h2>
              <div className="grid grid-cols-2 gap-4">
                {property.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-slate-700">
                    <Check className="h-5 w-5 text-green-600" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-[350px]">
            <div className="sticky top-24 rounded-xl border bg-white p-6 shadow-sm">
              <div className="mb-6">
                <span className="block text-sm text-slate-500 mb-1">Valor de Venda</span>
                <span className="text-3xl font-bold text-slate-900">{property.price}</span>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <Image src="/whatsapp-logo.png" alt="" width={20} height={20} className="hidden" /> {/* Placeholder icon */}
                  Agendar Visita
                </button>
                <button className="w-full border border-slate-300 text-slate-700 font-bold py-3 rounded-lg hover:bg-slate-50 transition-colors">
                  Solicitar Mais Informações
                </button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200" />
                  <div>
                    <p className="font-semibold text-slate-900">Corretor Responsável</p>
                    <p className="text-sm text-slate-500">Especialista no Bairro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

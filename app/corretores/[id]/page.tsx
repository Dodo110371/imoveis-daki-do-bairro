import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Phone, MessageCircle, User, ShieldCheck, Mail, ArrowLeft } from 'lucide-react';
import { MOCK_REALTORS } from '@/lib/mock-realtors';
import { PropertyCard } from '@/components/PropertyCard';

// Mock properties for demonstration
const MOCK_PROPERTIES = [
  {
    id: '101',
    title: 'Apartamento Moderno no Centro',
    price: 'R$ 450.000',
    location: 'Centro, São Paulo',
    bedrooms: 2,
    bathrooms: 2,
    area: 75,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop',
    type: 'Venda' as const,
  },
  {
    id: '102',
    title: 'Casa Espaçosa com Jardim',
    price: 'R$ 850.000',
    location: 'Jardins, São Paulo',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=600&auto=format&fit=crop',
    type: 'Venda' as const,
  },
  {
    id: '103',
    title: 'Studio Mobiliado Próximo ao Metrô',
    price: 'R$ 2.500/mês',
    location: 'Vila Madalena, São Paulo',
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=600&auto=format&fit=crop',
    type: 'Aluguel' as const,
  },
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RealtorProfilePage({ params }: PageProps) {
  // Await params correctly in Next.js 15+
  const { id } = await params;
  const realtor = MOCK_REALTORS.find((r) => r.id === id);

  if (!realtor) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header / Banner */}
      <div className="bg-slate-900 text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop"
            alt="City Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Link href="/corretores" className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para Corretores
          </Link>
          
          <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden border-4 border-white shadow-2xl shrink-0">
              <Image
                src={realtor.photo}
                alt={realtor.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left mb-2">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-bold">{realtor.name}</h1>
                <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Verificado
                </span>
              </div>
              <p className="text-slate-300 text-lg mb-4">CRECI: {realtor.creci}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <a 
                  href={`https://wa.me/${realtor.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a 
                  href={`tel:${realtor.phone.replace(/\D/g, '')}`} 
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Ligar
                </a>
                <a 
                  href={`mailto:${realtor.email}`} 
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  E-mail
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Bio and Properties */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Sobre {realtor.name.split(' ')[0]}</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                {realtor.bio}
              </p>
              
              <div className="mt-6 pt-6 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wider">Regiões de Atuação</h3>
                <div className="flex flex-wrap gap-2">
                  {realtor.regions.map((region) => (
                    <span key={region} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      <MapPin className="w-3 h-3" />
                      {region}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Properties Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Imóveis em Destaque</h2>
                <span className="text-slate-500 text-sm">{realtor.propertiesCount} imóveis encontrados</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MOCK_PROPERTIES.map((property) => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Fale com {realtor.name.split(' ')[0]}</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Seu Nome</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Nome completo"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Seu E-mail</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="exemplo@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Seu Telefone</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Mensagem</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder={`Olá, gostaria de saber mais sobre seus imóveis...`}
                  ></textarea>
                </div>
                <button 
                  type="button" 
                  className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors"
                >
                  Enviar Mensagem
                </button>
              </form>
              <p className="mt-4 text-xs text-slate-500 text-center">
                Ao enviar, você concorda com nossos Termos de Uso e Política de Privacidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

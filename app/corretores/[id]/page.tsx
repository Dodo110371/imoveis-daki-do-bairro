import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { MapPin, Phone, MessageCircle, User, ShieldCheck, Mail, ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { PropertyCard } from '@/components/PropertyCard';
import { ContactEventLink } from '@/components/ContactEventLink';
import { PartnerBadge } from '@/components/PartnerBadge';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RealtorProfilePage({ params }: PageProps) {
  // Await params correctly in Next.js 15+
  const { id } = await params;
  const supabase = await createClient();

  // Fetch realtor details
  const { data: realtorData } = await supabase
    .from('realtors')
    .select(`
      *,
      profiles (full_name, avatar_url, email, phone)
    `)
    .eq('id', id)
    .single();

  if (!realtorData) {
    notFound();
  }

  const realtor = {
    id: realtorData.id,
    name: realtorData.profiles?.full_name || 'Corretor',
    creci: realtorData.creci,
    photo: realtorData.profiles?.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    bio: realtorData.bio || '',
    regions: realtorData.regions || [],
    whatsapp: realtorData.whatsapp,
    email: realtorData.profiles?.email,
    phone: realtorData.profiles?.phone,
    isPartner: !!(realtorData.partner ?? realtorData.is_partner)
  };

  // Fetch realtor's properties
  const { data: propertiesData } = await supabase
    .from('properties')
    .select('*')
    .eq('owner_id', id);

  // Map properties to PropertyCard props
  const properties = propertiesData?.map((p: any) => ({
    id: p.id,
    title: p.title,
    price: `R$ ${p.price.toLocaleString('pt-BR')}`,
    location: p.location,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    imageUrl: p.images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop',
    images: p.images || [],
    type: p.type
  })) || [];

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
                {realtor.isPartner && (
                  <PartnerBadge />
                )}
              </div>
              <p className="text-slate-300 text-lg mb-4">CRECI: {realtor.creci}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                {realtor.whatsapp && (
                  <ContactEventLink
                    href={`https://wa.me/${realtor.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    channel="whatsapp"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </ContactEventLink>
                )}
                {realtor.phone && (
                  <ContactEventLink
                    href={`tel:${realtor.phone}`}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    channel="phone"
                  >
                    <Phone className="w-4 h-4" />
                    Ligar
                  </ContactEventLink>
                )}
                {realtor.email && (
                  <ContactEventLink
                    href={`mailto:${realtor.email}`}
                    className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    channel="email"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </ContactEventLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Sobre o Corretor</h2>
              <p className="text-slate-600 leading-relaxed">
                {realtor.bio || 'Este corretor ainda não adicionou uma biografia.'}
              </p>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Áreas de Atuação</h3>
                <div className="flex flex-wrap gap-2">
                  {realtor.regions && realtor.regions.length > 0 ? (
                    realtor.regions.map((region: string) => (
                      <span key={region} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {region}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">Nenhuma região especificada.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Listings Section */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <User className="w-6 h-6 text-blue-600" />
                Imóveis do Corretor
              </h2>

              {properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {properties.map((property: any) => (
                    <div key={property.id} className="space-y-2">
                      <PropertyCard {...property} />
                      {realtor.whatsapp && (
                        <ContactEventLink
                          href={`https://wa.me/${realtor.whatsapp}?text=Olá, vi o imóvel ${property.title} e gostaria de mais informações.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                          propertyId={property.id}
                          channel="whatsapp"
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp sobre este imóvel
                        </ContactEventLink>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-1">Nenhum imóvel encontrado</h3>
                  <p className="text-slate-500">Este corretor ainda não possui imóveis cadastrados.</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sticky top-24">
              <h3 className="font-bold text-slate-900 mb-4">Entre em Contato</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Seu Nome</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Digite seu nome" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Seu Email</label>
                  <input type="email" className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="seu@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Seu Telefone</label>
                  <input type="tel" className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="(00) 00000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mensagem</label>
                  <textarea rows={4} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Olá, gostaria de mais informações..."></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors">
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

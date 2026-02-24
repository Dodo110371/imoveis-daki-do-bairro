import { createClient } from "@/lib/supabase/server";
import { PropertyCard } from "@/components/PropertyCard";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, Mail, Building2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ContactEventLink } from "@/components/ContactEventLink";
import { AgencyPartnerBadge } from "@/components/AgencyPartnerBadge";

interface AgencyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AgencyPage({ params }: AgencyPageProps) {
  const { id } = await params;
  const agencyId = parseInt(id, 10);
  const supabase = await createClient();

  if (isNaN(agencyId)) {
    notFound();
  }

  // Fetch Agency
  const { data: agencyData } = await supabase
    .from('agencies')
    .select('*')
    .eq('id', agencyId)
    .single();

  if (!agencyData) {
    notFound();
  }

  // Fetch properties for this agency
  const { data: propertiesData } = await supabase
    .from('properties')
    .select('*')
    .eq('agency_id', agencyId);

  const agency = {
    ...agencyData,
    logo: agencyData.logo_url,
    isPartner: !!(agencyData.partner ?? agencyData.is_partner)
  };

  // Helper to map DB to Card Props
  const mapProperty = (p: any) => ({
    id: p.id,
    title: p.title,
    price: p.type === 'Aluguel' 
      ? `R$ ${p.price}/mês` 
      : `R$ ${Number(p.price).toLocaleString('pt-BR')}`,
    location: p.location,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    imageUrl: p.images?.[0] || null,
    images: p.images || [],
    type: p.type,
    agencyPartner: agency.isPartner,
  });

  const agencyProperties = propertiesData?.map(mapProperty) || [];

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* Header / Banner */}
      <div className="bg-slate-900 text-white pt-12 pb-24">
        <div className="container mx-auto px-4">
          <Link
            href="/imobiliarias"
            className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Imobiliárias
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="h-32 w-32 relative bg-white rounded-xl overflow-hidden shrink-0 border-4 border-white/10 flex items-center justify-center">
              {agency.logo ? (
                <Image
                  src={agency.logo}
                  alt={agency.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <Building2 className="w-12 h-12 text-slate-400" />
              )}
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold">{agency.name}</h1>
                {agency.isPartner && <AgencyPartnerBadge />}
              </div>
              <div className="flex flex-wrap gap-6 text-slate-300 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-400" />
                  <span>{agency.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-blue-400" />
                  <span>CRECI: {agency.creci}</span>
                </div>
              </div>
              <p className="text-lg text-slate-300 max-w-3xl leading-relaxed">
                {agency.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Properties List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center justify-between">
                <span>Portfólio de Imóveis</span>
                <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  {agencyProperties.length} imóveis
                </span>
              </h2>

              {agencyProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {agencyProperties.map((prop) => (
                    <div key={prop.id} className="space-y-2">
                      <PropertyCard {...prop} />
                      {agency.email ? (
                        <ContactEventLink
                          href={`mailto:${agency.email}`}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          channel="email"
                          propertyId={prop.id}
                        >
                          <Mail className="w-4 h-4" />
                          Email sobre este imóvel
                        </ContactEventLink>
                      ) : (
                        <ContactEventLink
                          href={`tel:${agency.phone.replace(/\D/g, '')}`}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg text-sm font-medium hover:bg-slate-600 transition-colors"
                          channel="phone"
                          propertyId={prop.id}
                        >
                          <Phone className="w-4 h-4" />
                          Ligar sobre este imóvel
                        </ContactEventLink>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-500">
                  Nenhum imóvel encontrado para esta imobiliária no momento.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Fale com a Imobiliária</h3>

              <div className="space-y-4">
                <ContactEventLink
                  href={`tel:${agency.phone.replace(/\D/g, '')}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
                  channel="phone"
                >
                  <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 font-medium uppercase">Telefone</div>
                    <div className="font-semibold text-slate-900">{agency.phone}</div>
                  </div>
                </ContactEventLink>

                <ContactEventLink
                  href={`mailto:${agency.email}`}
                  className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
                  channel="email"
                >
                  <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs text-slate-500 font-medium uppercase">Email</div>
                    <div className="font-semibold text-slate-900 truncate" title={agency.email}>{agency.email}</div>
                  </div>
                </ContactEventLink>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <button className="w-full bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-800 transition-colors">
                  Solicitar Contato
                </button>
                <p className="mt-4 text-xs text-center text-slate-500">
                  Ao entrar em contato, você concorda com nossos termos de uso e política de privacidade.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

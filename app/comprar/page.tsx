import { PropertyCard } from "@/components/PropertyCard";
import { Search } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FilterSidebar } from "@/components/FilterSidebar";
import { PageViewTracker } from "@/components/PageViewTracker";
import { ContactEventLink } from "@/components/ContactEventLink";

interface ComprarPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ComprarPage({ searchParams }: ComprarPageProps) {
  const params = await searchParams;
  const supabase = await createClient();

  // Start building the query
  let query = supabase
    .from('properties')
    .select('*')
    .ilike('type', 'Venda')
    .eq('status', 'active');

  // Apply filters
  if (params.category) {
    const categoryMap: Record<string, string> = {
      'Apartamento': 'apto',
      'Casa': 'casa',
      'Comercial': 'comercial',
      'Terreno': 'terreno',
      'Sobrado': 'casa', // Fallback for Sobrado
      'Rural': 'terreno' // Fallback for Rural
    };
    const dbValue = categoryMap[params.category as string] || params.category;
    query = query.ilike('category', dbValue as string);
  }

  if (params.bedrooms) {
    query = query.gte('bedrooms', parseInt(params.bedrooms as string));
  }

  if (params.bathrooms) {
    query = query.gte('bathrooms', parseInt(params.bathrooms as string));
  }

  if (params.parking) {
    query = query.gte('parking', parseInt(params.parking as string));
  }

  if (params.minPrice) {
    query = query.gte('price', parseFloat(params.minPrice as string));
  }

  if (params.maxPrice) {
    query = query.lte('price', parseFloat(params.maxPrice as string));
  }

  if (params.minArea) {
    query = query.gte('area', parseFloat(params.minArea as string));
  }

  if (params.maxArea) {
    query = query.lte('area', parseFloat(params.maxArea as string));
  }

  const { data: propertiesData } = await query;

  // Helper to map DB to Card Props
  const mapProperty = (p: any) => ({
    id: p.id,
    title: p.title,
    price: `R$ ${Number(p.price).toLocaleString('pt-BR')}`,
    location: p.location,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    imageUrl: p.images?.[0] || '/placeholder.jpg',
    images: p.images || [],
    type: p.type,
    contactWhatsapp: p.contact_whatsapp,
    contactPhone: p.contact_phone,
    contactEmail: p.contact_email,
  });

  // Fetch partner status for agencies referenced by properties (to display badge on cards)
  const agencyIds = Array.from(
    new Set((propertiesData || [])
      .map((p: any) => p.agency_id)
      .filter((id: any) => id != null))
  );
  let agenciesMap = new Map<number, boolean>();
  if (agencyIds.length > 0) {
    const { data: agenciesData } = await supabase
      .from('agencies')
      .select('id, partner, is_partner')
      .in('id', agencyIds);
    (agenciesData || []).forEach((a: any) => {
      const isPartner = !!(a.partner ?? a.is_partner);
      agenciesMap.set(a.id, isPartner);
    });
  }

  // Fetch partner status for realtors (owners) referenced by properties
  const ownerIds = Array.from(
    new Set((propertiesData || [])
      .map((p: any) => p.owner_id)
      .filter((id: any) => id != null))
  );
  let realtorsMap = new Map<string, boolean>();
  if (ownerIds.length > 0) {
    const { data: realtorsData } = await supabase
      .from('realtors')
      .select('id, partner, is_partner')
      .in('id', ownerIds);
    (realtorsData || []).forEach((r: any) => {
      const isPartner = !!(r.partner ?? r.is_partner);
      realtorsMap.set(r.id, isPartner);
    });
  }

  const properties = (propertiesData || []).map((p: any) => {
    const base = mapProperty(p);
    return {
      ...base,
      agencyPartner: agenciesMap.get(p.agency_id) || false,
      realtorPartner: realtorsMap.get(p.owner_id) || false,
    };
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12 relative overflow-hidden">
      <PageViewTracker />
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl -z-10 animate-float delay-700" />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Comprar Imóveis
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Encontre a casa ou apartamento dos seus sonhos no bairro mais charmoso da cidade.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop: Sticky, Mobile: Fixed overlay */}
          <div className="lg:w-72 flex-shrink-0">
            <FilterSidebar type="Venda" />
          </div>

          {/* Results Grid */}
          <div className="flex-grow">
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {properties.map((prop) => (
                  <div key={prop.id} className="space-y-2">
                    <PropertyCard {...prop} />
                    {(prop.contactWhatsapp || prop.contactPhone) ? (
                      <ContactEventLink
                        href={`https://wa.me/55${(prop.contactWhatsapp || prop.contactPhone || '').replace(/\D/g, '')}?text=Olá, vi o imóvel ${prop.title} e gostaria de mais informações.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        propertyId={prop.id}
                        channel="whatsapp"
                      >
                        Contato pelo WhatsApp
                      </ContactEventLink>
                    ) : prop.contactEmail ? (
                      <ContactEventLink
                        href={`mailto:${prop.contactEmail}`}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        propertyId={prop.id}
                        channel="email"
                      >
                        Contato por Email
                      </ContactEventLink>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-100 h-full flex flex-col items-center justify-center">
                <Search className="w-12 h-12 text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-900 mb-2">Nenhum imóvel encontrado</h3>
                <p className="text-slate-500 mb-6">Tente ajustar seus filtros para encontrar o que procura.</p>
                <Link
                  href="/comprar"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Limpar Filtros
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

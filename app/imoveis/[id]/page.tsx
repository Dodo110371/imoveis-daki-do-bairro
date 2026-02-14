import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Bed, Bath, Move, Check, ArrowLeft, Phone, Mail, Building2, FileEdit, MessageCircle } from "lucide-react";
import Link from "next/link";
import { FavoriteButton } from "@/components/FavoriteButton";
import { CompareButton } from "@/components/CompareButton";
import { ImageGallery } from "@/components/ImageGallery";
import { PageViewTracker } from "@/components/PageViewTracker";
import { ContactEventLink } from "@/components/ContactEventLink";
import { AgencyPartnerBadge } from "@/components/AgencyPartnerBadge";
import { PartnerBadge } from "@/components/PartnerBadge";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

import { MortgageCalculator } from "@/components/MortgageCalculator";

export default async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch property
  const { data: propertyData, error: propError } = await supabase
    .from('properties')
    .select('*')
    .eq('id', id)
    .single();

  if (propError || !propertyData) {
    notFound();
  }

  // Fetch agency
  const { data: agencyData } = await supabase
    .from('agencies')
    .select('*')
    .eq('id', propertyData.agency_id)
    .single();

  // Fetch realtor (owner)
  const { data: realtorData } = await supabase
    .from('realtors')
    .select(`
      *,
      profiles (full_name, avatar_url, email, phone)
    `)
    .eq('id', propertyData.owner_id)
    .single();

  // Get current user to check ownership
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isOwner = user && propertyData.owner_id === user.id;

  const property = {
    ...propertyData,
    images: propertyData.images || [],
    imageUrl: propertyData.images?.[0] || '/placeholder.jpg',
    price: propertyData.type === 'Aluguel'
      ? `R$ ${propertyData.price}/mês`
      : `R$ ${Number(propertyData.price).toLocaleString('pt-BR')}`,
    features: propertyData.features || [],
  };

  const agency = agencyData ? {
    ...agencyData,
    logo: agencyData.logo_url,
    isPartner: !!(agencyData.partner ?? agencyData.is_partner)
  } : null;

  const realtor = realtorData ? {
    ...realtorData,
    name: realtorData.profiles?.full_name || 'Corretor',
    photo: realtorData.profiles?.avatar_url || '/placeholder.jpg',
    email: realtorData.profiles?.email,
    phone: realtorData.profiles?.phone,
    isPartner: !!(realtorData.partner ?? realtorData.is_partner)
  } : null;

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <PageViewTracker propertyId={id} />
      <div className="relative group">
        <ImageGallery images={property.images} title={property.title} />
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          {agency?.isPartner && (
            <>
              <span className="md:hidden">
                <AgencyPartnerBadge size="sm" className="opacity-95 transition-opacity duration-200 group-hover:opacity-100" />
              </span>
              <span className="hidden md:inline-flex">
                <AgencyPartnerBadge size="md" className="opacity-95 transition-opacity duration-200 group-hover:opacity-100" />
              </span>
            </>
          )}
          {realtor?.isPartner && (
            <>
              <span className="md:hidden">
                <PartnerBadge size="sm" className="opacity-95 transition-opacity duration-200 group-hover:opacity-100" />
              </span>
              <span className="hidden md:inline-flex">
                <PartnerBadge size="md" className="opacity-95 transition-opacity duration-200 group-hover:opacity-100" />
              </span>
            </>
          )}
        </div>
      </div>

      {/* Property Info Overlay (Absolute positioned over the gallery in the component, 
          but here we have the title/info separately or we need to adjust structure.
          
          Wait, the previous design had the title overlaying the image. 
          The ImageGallery component I built has the image and the overlay gradient INSIDE it?
          Let's check ImageGallery.tsx again.
          
          Yes, ImageGallery has:
          <div className="relative ...">
             <Image ... />
             <div className="absolute inset-0 bg-gradient..." />
             <div className="absolute bottom-4 right-4 ... button" />
          </div>
          
          It DOES NOT include the title/price overlay that was present in the page.
          
          I should wrap the ImageGallery in a relative container OR pass the overlay content as children/props to ImageGallery?
          Or simply position the overlay content absolute ON TOP of the ImageGallery component here in the page.
      */}

      <div className="relative -mt-[240px] z-10 pointer-events-none">
        <div className="container mx-auto px-4 pb-8">
          <div className="flex justify-between items-center mb-4">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white pointer-events-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Home
            </Link>

            {isOwner && (
              <Link
                href={`/imoveis/${property.id}/editar`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-slate-900 rounded-lg font-bold transition-colors pointer-events-auto shadow-lg"
              >
                <FileEdit className="h-4 w-4" />
                Editar Anúncio
              </Link>
            )}
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="pointer-events-auto">
              <span className="mb-2 inline-block rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                {property.type}
              </span>
              <div className="flex items-center gap-4 flex-wrap group">
                <h1 className="text-3xl font-bold text-white md:text-5xl">{property.title}</h1>
                {agency?.isPartner && (
                  <>
                    <span className="md:hidden">
                      <AgencyPartnerBadge size="sm" className="opacity-95 transition-opacity duration-200 group-hover:opacity-100" />
                    </span>
                    <span className="hidden md:inline-flex">
                      <AgencyPartnerBadge size="md" className="opacity-95 transition-opacity duration-200 group-hover:opacity-100" />
                    </span>
                  </>
                )}
                {realtor?.isPartner && (
                  <>
                    <span className="md:hidden">
                      <PartnerBadge size="sm" className="opacity-95 transition-opacity duration-200 group-hover:opacity-100" />
                    </span>
                    <span className="hidden md:inline-flex">
                      <PartnerBadge size="md" className="opacity-95 transition-opacity duration-200 group-hover:opacity-100" />
                    </span>
                  </>
                )}
                <FavoriteButton propertyId={property.id} className="bg-white/10 hover:bg-white/20 text-white" iconSize={28} />
                <CompareButton propertyId={property.id} className="bg-white/10 hover:bg-white/20 text-white" iconSize={28} />
              </div>
              <div className="mt-2 flex items-center text-slate-200">
                <MapPin className="mr-2 h-5 w-5" />
                {property.location}
              </div>
            </div>
            <div className="text-3xl font-bold text-white md:text-4xl pointer-events-auto">
              {property.price}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-8 px-4">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Features */}
            <div className="grid grid-cols-3 gap-4 rounded-xl bg-white p-6 shadow-sm border border-slate-100">
              <div className="flex flex-col items-center justify-center gap-2 border-r border-slate-100 last:border-0">
                <Bed className="h-6 w-6 text-blue-600" />
                <span className="font-semibold text-slate-900">{property.bedrooms} Quartos</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 border-r border-slate-100 last:border-0">
                <Bath className="h-6 w-6 text-blue-600" />
                <span className="font-semibold text-slate-900">{property.bathrooms} Banheiros</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2">
                <Move className="h-6 w-6 text-blue-600" />
                <span className="font-semibold text-slate-900">{property.area} m²</span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Sobre o Imóvel</h2>
              <p className="text-slate-600 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Features List */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Características</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {property.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center text-slate-600">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-100 overflow-hidden">
              <h2 className="mb-4 text-xl font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                Localização
              </h2>
              <p className="mb-4 text-slate-600">{property.location}</p>
              <div className="w-full h-[400px] rounded-lg overflow-hidden bg-slate-100 relative">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight={0}
                  marginWidth={0}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0"
                  title="Mapa de Localização"
                ></iframe>
              </div>
            </div>

            {/* Mortgage Calculator (Only for Sales) */}
            {property.type === 'Venda' && (
              <MortgageCalculator propertyPrice={Number(property.price.replace(/[^0-9.-]+/g, ""))} />
            )}
          </div>

          {/* Sidebar / Contact */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm border border-slate-100">
              {agency ? (
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <h3 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-4">Anunciado por</h3>
                  <Link href={`/imobiliarias/${agency.id}`} className="flex items-center gap-4 group">
                    <div className="h-12 w-12 relative bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                      <Image
                        src={agency.logo}
                        alt={agency.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{agency.name}</h4>
                        {agency.isPartner && <AgencyPartnerBadge size="sm" />}
                      </div>
                      <p className="text-xs text-slate-500">CRECI: {agency.creci}</p>
                    </div>
                  </Link>
                </div>
              ) : realtor ? (
                <div className="mb-6 pb-6 border-b border-slate-100">
                  <h3 className="text-sm uppercase tracking-wide text-slate-500 font-semibold mb-4">Anunciado por</h3>
                  <Link href={`/corretores/${realtor.id}`} className="flex items-center gap-4 group">
                    <div className="h-12 w-12 relative bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                      <Image
                        src={realtor.photo}
                        alt={realtor.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{realtor.name}</h4>
                        {realtor.isPartner && <PartnerBadge size="sm" />}
                      </div>
                      {realtor.creci && <p className="text-xs text-slate-500">CRECI: {realtor.creci}</p>}
                    </div>
                  </Link>
                </div>
              ) : null}

              <h3 className="mb-6 text-lg font-bold text-slate-900">Interessou? Entre em contato</h3>

              <div className="space-y-4">
                {(agency?.whatsapp || realtor?.whatsapp || property.contact_whatsapp || agency?.phone || realtor?.phone || property.contact_phone) && (
                  <ContactEventLink
                    href={`https://wa.me/55${(agency?.whatsapp || realtor?.whatsapp || property.contact_whatsapp || agency?.phone || realtor?.phone || property.contact_phone || '').replace(/\D/g, '')}?text=Olá, vi seu imóvel ${property.title} no site Imóveis do Bairro e gostaria de mais informações.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                    propertyId={property.id}
                    channel="whatsapp"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chame no WhatsApp
                  </ContactEventLink>
                )}

                {(agency?.email || realtor?.email || property.contact_email) && (
                  <ContactEventLink
                    href={`mailto:${agency?.email || realtor?.email || property.contact_email}`}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                    propertyId={property.id}
                    channel="email"
                  >
                    <Mail className="h-5 w-5" />
                    Entrar em Contato
                  </ContactEventLink>
                )}
              </div>

              <div className="mt-6 text-center text-xs text-slate-500">
                Ao entrar em contato, você concorda com nossos termos de uso e política de privacidade.
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

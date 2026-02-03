import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Bed, Bath, Move, Check, ArrowLeft, Phone, Mail, Building2 } from "lucide-react";
import Link from "next/link";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

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

  const property = {
    ...propertyData,
    imageUrl: propertyData.images?.[0] || '/placeholder.jpg',
    price: propertyData.type === 'Aluguel'
      ? `R$ ${propertyData.price}/mês`
      : `R$ ${Number(propertyData.price).toLocaleString('pt-BR')}`,
    features: propertyData.features || [],
  };

  const agency = agencyData ? {
    ...agencyData,
    logo: agencyData.logo_url
  } : null;

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      {/* Header Image */}
      <div className="relative h-[400px] w-full md:h-[500px]">
        <Image
          src={property.imageUrl}
          alt={property.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="container mx-auto">
            <Link
              href="/"
              className="mb-4 inline-flex items-center text-sm font-medium text-white/80 hover:text-white"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para Home
            </Link>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="mb-2 inline-block rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold text-white">
                  {property.type}
                </span>
                <h1 className="text-3xl font-bold text-white md:text-5xl">{property.title}</h1>
                <div className="mt-2 flex items-center text-slate-200">
                  <MapPin className="mr-2 h-5 w-5" />
                  {property.location}
                </div>
              </div>
              <div className="text-3xl font-bold text-white md:text-4xl">
                {property.price}
              </div>
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
          </div>

          {/* Sidebar / Contact */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm border border-slate-100">
              {agency && (
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
                      <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{agency.name}</h4>
                      <p className="text-xs text-slate-500">CRECI: {agency.creci}</p>
                    </div>
                  </Link>
                </div>
              )}

              <h3 className="mb-6 text-lg font-bold text-slate-900">Interessou? Entre em contato</h3>

              <div className="space-y-4">
                <a
                  href={agency ? `tel:${agency.phone.replace(/\D/g, '')}` : '#'}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-green-700"
                >
                  <Phone className="h-5 w-5" />
                  Ligar Agora
                </a>
                <a
                  href={agency ? `mailto:${agency.email}` : '#'}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  <Mail className="h-5 w-5" />
                  Entrar em Contato
                </a>
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

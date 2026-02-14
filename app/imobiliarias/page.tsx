import { MapPin, Phone, Building2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/server';
import { PageViewTracker } from '@/components/PageViewTracker';
import { AgencyPartnerBadge } from '@/components/AgencyPartnerBadge';

export default async function ImobiliariasPage() {
  const supabase = await createClient();

  // Fetch agencies with property count
  // Note: 'properties(count)' might return count object depending on setup, 
  // but let's try standard approach or just fetch agencies first.
  // To keep it robust, we'll fetch agencies and then maybe count properties if needed,
  // or just use a placeholder if count is complex.
  // Actually, Supabase select with count:
  const { data: agenciesData } = await supabase
    .from('agencies')
    .select('*, properties(count)');

  const agencies = agenciesData?.map((agency: any) => ({
    ...agency,
    logo: agency.logo_url,
    propertiesCount: agency.properties?.[0]?.count || 0,
    isPartner: !!(agency.partner ?? agency.is_partner)
  })) || [];

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <PageViewTracker />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Imobiliárias Parceiras
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Conheça as imobiliárias que atuam na região e encontre o profissional ideal para ajudar você a comprar ou alugar seu imóvel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {agencies.map((imobiliaria) => (
            <div key={imobiliaria.id} className="bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 relative bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200">
                    <Image
                      src={imobiliaria.logo}
                      alt={imobiliaria.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">
                      {imobiliaria.name}
                    </h3>
                    {imobiliaria.isPartner && (
                      <div className="mt-1">
                        <AgencyPartnerBadge />
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                      <span className="font-medium text-slate-900">{imobiliaria.propertiesCount}</span> imóveis ativos
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-start gap-3 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
                    <span>{imobiliaria.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{imobiliaria.phone}</span>
                  </div>
                </div>

                <Link
                  href={`/imobiliarias/${imobiliaria.id}`}
                  className="w-full mt-auto block text-center bg-slate-900 text-white py-2.5 rounded-lg font-medium hover:bg-slate-800 transition-colors"
                >
                  Ver Imóveis
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            É proprietário de uma Imobiliária?
          </h2>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Junte-se a nós e anuncie seus imóveis para milhares de pessoas interessadas em morar no nosso bairro.
          </p>
          <Link
            href="/cadastro-imobiliaria"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Seja um Parceiro
          </Link>
        </div>
      </div>
    </div>
  );
}

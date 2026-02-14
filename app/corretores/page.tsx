import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, MessageCircle, User, ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { PageViewTracker } from '@/components/PageViewTracker';
import { ContactEventLink } from '@/components/ContactEventLink';
import { PartnerBadge } from '@/components/PartnerBadge';

export default async function CorretoresPage() {
  const supabase = await createClient();

  const { data: realtorsData } = await supabase
    .from('realtors')
    .select(`
      id,
      creci,
      bio,
      regions,
      partner,
      whatsapp,
      profiles (
        full_name,
        avatar_url
      )
    `);

  // Transform data to match UI needs
  const realtors = realtorsData?.map((r: any) => ({
    id: r.id,
    name: r.profiles?.full_name || 'Corretor',
    creci: r.creci,
    photo: r.profiles?.avatar_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop', // Fallback image
    bio: r.bio || 'Corretor parceiro Imóveis do Bairro.',
    regions: r.regions || [],
    whatsapp: r.whatsapp,
    isPartner: !!(r.partner ?? r.is_partner),
    propertiesCount: 0 // Placeholder until we implement count query
  })) || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <PageViewTracker />
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop"
            alt="Background"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-900/90" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Corretores Parceiros
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Encontre profissionais qualificados e credenciados pelo CRECI para te ajudar a realizar o melhor negócio com segurança e transparência.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        {realtors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {realtors.map((realtor) => (
              <div key={realtor.id} className="bg-white rounded-xl shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
                <div className="relative h-48 bg-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                  <Image
                    src={realtor.photo}
                    alt={realtor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                    <h3 className="text-xl font-bold">{realtor.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-200">
                      <ShieldCheck className="w-4 h-4 text-green-400" />
                      <span>CRECI: {realtor.creci}</span>
                    </div>
                    {realtor.isPartner && (
                      <div className="mt-2">
                        <PartnerBadge />
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-slate-600 mb-6 text-sm line-clamp-3 flex-grow">
                    {realtor.bio}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <MapPin className="h-4 w-4 text-blue-500 shrink-0" />
                      <span>{realtor.regions.join(', ') || 'Atende toda a região'}</span>
                    </div>
                    {/* 
                    <div className="flex items-center gap-3 text-sm text-slate-600">
                      <User className="h-4 w-4 text-blue-500 shrink-0" />
                      <span>{realtor.propertiesCount} imóveis ativos</span>
                    </div>
                    */}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    <Link
                      href={`/corretores/${realtor.id}`}
                      className="flex items-center justify-center px-4 py-2 border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
                    >
                      Ver Perfil
                    </Link>
                    {realtor.whatsapp && (
                      <ContactEventLink
                        href={`https://wa.me/${realtor.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                        channel="whatsapp"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </ContactEventLink>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-100">
            <User className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Nenhum corretor encontrado</h3>
            <p className="text-slate-500 mb-6">Seja o primeiro corretor parceiro a se cadastrar!</p>
            <Link href="/cadastro?redirect=/cadastro-corretor" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Cadastrar-se Agora
            </Link>
          </div>
        )}

        {/* CTA Section for Realtors */}
        <div className="mt-20 bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100">
          <div className="grid md:grid-cols-2">
            <div className="p-12 flex flex-col justify-center">
              <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6 w-fit">
                Para Corretores Autônomos
              </span>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Você é um corretor independente?
              </h2>
              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Junte-se à nossa rede de parceiros e aumente sua visibilidade. Tenha um perfil profissional, divulgue seus imóveis e receba leads qualificados diretamente no seu WhatsApp.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                  </div>
                  Página exclusiva de perfil profissional
                </li>
                <li className="flex items-center gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  Destaque para seus imóveis
                </li>
              </ul>
              <Link
                href="/cadastro?redirect=/cadastro-corretor"
                className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                Cadastre-se Gratuitamente
              </Link>
            </div>
            <div className="relative min-h-[400px] md:min-h-0">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
                alt="Corretor de sucesso"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent md:from-white md:via-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

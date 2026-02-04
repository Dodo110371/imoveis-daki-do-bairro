import { CITIES } from "@/lib/cities";
import { CityCarousel } from "@/components/CityCarousel";
import { MapPin, Music, PartyPopper, Building2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const city = CITIES.find((c) => c.slug === slug);
  if (!city) return { title: "Município não encontrado" };

  return {
    title: `${city.name} | Imóveis daki do Bairro`,
    description: city.shortDescription,
  };
}

// Helper to generate a consistent mock CEP based on string
function generateMockCEP(str: string, index: number) {
  // This is just for visual demonstration as requested
  const base = 65000 + index;
  return `${base}-000`;
}

export default async function CityPage({ params }: PageProps) {
  const { slug } = await params;
  const city = CITIES.find((c) => c.slug === slug);

  if (!city) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl -z-10 animate-float delay-700" />

      {/* Header/Hero */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Link
            href="/municipios"
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            {city.name}
          </h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 md:py-12 relative z-10">

        {/* Intro Section */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
          <div className="order-2 lg:order-1">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-4">
              Sobre a cidade
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">{city.shortDescription}</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {city.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Music className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Cultura</h3>
                <p className="text-sm text-slate-600">{city.culture}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <PartyPopper className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Entretenimento</h3>
                <p className="text-sm text-slate-600">{city.entertainment}</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <CityCarousel images={city.images} cityName={city.name} />
          </div>
        </div>

        {/* Map Section */}
        <section className="mb-16">
          <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 px-4 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-blue-600" />
              Localização
            </h2>
            <div className="w-full h-[400px] rounded-2xl overflow-hidden bg-slate-200 relative">
              <iframe
                src={city.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </section>

        {/* Neighborhoods Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              Bairros de {city.name}
            </h2>
            <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium">
              {city.neighborhoods.length} bairros cadastrados
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {city.neighborhoods.map((neighborhood, index) => (
              <Link
                href="#" // Placeholder link as requested "futuramente acrescentar informações"
                key={index}
                className="group bg-white p-4 rounded-xl border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all flex flex-col"
              >
                <span className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                  {neighborhood}
                </span>
                <span className="text-xs text-slate-400">
                  CEP: {generateMockCEP(neighborhood, index)}
                </span>
              </Link>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

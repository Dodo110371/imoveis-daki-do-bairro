import { CITIES } from "@/lib/cities";
import { MapPin, ArrowRight, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MunicipiosPage() {
  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl -z-10 animate-float delay-700" />

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-4">
            Região Metropolitana
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Sobre o Município
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Conheça as cidades onde atuamos. Explore a cultura, entretenimento e as melhores oportunidades de imóveis em cada região.
          </p>
        </div>
      </section>

      {/* Orientation Section */}
      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-600" />
            <div className="flex items-start gap-6">
              <div className="p-4 bg-blue-50 rounded-xl shrink-0 hidden md:block">
                <Info className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Como navegar</h3>
                <p className="text-slate-600 mb-4">
                  Selecione abaixo o município de seu interesse para ver informações detalhadas. 
                  Em cada página, você encontrará dados sobre cultura, lazer, um mapa interativo e a lista completa de bairros atendidos.
                </p>
                <p className="text-slate-600">
                  Utilize o mapa geral abaixo para se localizar na região metropolitana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-12 px-4 relative z-10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Escolha um Município</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CITIES.map((city) => (
              <Link 
                href={`/municipios/${city.slug}`} 
                key={city.slug}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-100 flex flex-col h-full transform hover:-translate-y-1"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image 
                    src={city.images[0]} 
                    alt={city.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      {city.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-slate-600 mb-6 flex-1">
                    {city.shortDescription}
                  </p>
                  <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                    Explorar cidade <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* General Map Section */}
      <section className="py-12 px-4 pb-24 relative z-10">
        <div className="container mx-auto">
          <div className="bg-white p-4 rounded-3xl shadow-lg border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 px-4">Localização Geral</h2>
            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-slate-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d255013.7909335551!2d-44.2238466!3d-2.5458316!3m2!1i1024!2i768!4f13.1!5e0!3m2!1spt-BR!2sbr!4v1707000000000!5m2!1spt-BR!2sbr" 
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
        </div>
      </section>
    </div>
  );
}

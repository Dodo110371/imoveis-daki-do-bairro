import Image from 'next/image';
import { MapPin, Coffee, School, TreePine } from 'lucide-react';

export default function NeighborhoodPage() {
  return (
    <div className="pb-16">
      {/* Hero */}
      <div className="relative h-[400px] w-full bg-slate-900">
        <div className="absolute inset-0 bg-slate-900/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Conheça o Bairro</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Um pouco de história</h2>
            <p className="text-lg text-slate-600 mb-4">
              Fundado em 1950, nosso bairro começou como uma pequena vila operária e se transformou em um dos polos mais desejados da cidade.
            </p>
            <p className="text-lg text-slate-600">
              Com ruas arborizadas e uma comunidade ativa, aqui você encontra o equilíbrio perfeito entre a vida urbana e a tranquilidade de uma cidade do interior.
            </p>
          </div>
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg bg-slate-200">
             {/* Placeholder for history image */}
             <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                Foto Histórica
             </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">O que você encontra aqui</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                <Coffee className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Gastronomia</h3>
            </div>
            <p className="text-slate-600">
              De padarias tradicionais a bistrôs modernos. O bairro conta com a famosa Rua dos Sabores.
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <School className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Educação</h3>
            </div>
            <p className="text-slate-600">
              Excelentes opções de ensino, desde o berçário até o ensino médio, além de escolas de idiomas.
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-full">
                <TreePine className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">Lazer e Verde</h3>
            </div>
            <p className="text-slate-600">
              Dois parques principais e diversas praças mantidas pela associação de moradores.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

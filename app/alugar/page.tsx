import { PropertyCard } from "@/components/PropertyCard";
import { PROPERTIES } from "@/lib/properties";
import { Search } from "lucide-react";
import Link from "next/link";

export default function AlugarPage() {
  const properties = PROPERTIES.filter(p => p.type === 'Aluguel');

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Alugar Imóveis
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A liberdade de morar onde você quiser. Confira as melhores opções de locação.
          </p>
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((prop) => (
              <PropertyCard key={prop.id} {...prop} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-100">
            <p className="text-slate-500 mb-4">Nenhum imóvel disponível para aluguel no momento.</p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              <Search className="h-4 w-4" />
              Voltar para o Início
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import { Check, X, MapPin, User, Calendar } from "lucide-react";
import { AdminPropertyActions } from "./actions";

export default async function AdminPropertiesPage() {
  const supabase = await createClient();

  const { data: properties, error } = await supabase
    .from('properties')
    .select(`
      *,
      profiles:owner_id (full_name, phone)
    `)
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Erro ao buscar imóveis:", error);
    return <div>Erro ao carregar imóveis: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Moderação de Imóveis</h1>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
          {properties?.length || 0} Pendentes
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {properties?.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
            <div className="relative w-full md:w-64 h-48 md:h-auto bg-slate-100 shrink-0">
              {property.images?.[0] ? (
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  Sem foto
                </div>
              )}
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{property.title}</h3>
                    <p className="text-slate-500 flex items-center gap-1 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-blue-600">
                      {property.type === 'Aluguel'
                        ? `R$ ${property.price}/mês`
                        : `R$ ${Number(property.price).toLocaleString('pt-BR')}`}
                    </p>
                    <p className="text-xs text-slate-400 capitalize">{property.type}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="truncate">{property.contact_name || property.profiles?.full_name || 'Sem nome'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(property.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3 justify-end">
                <AdminPropertyActions propertyId={property.id} />
              </div>
            </div>
          </div>
        ))}

        {(!properties || properties.length === 0) && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">Nenhum imóvel pendente de aprovação.</p>
          </div>
        )}
      </div>
    </div>
  );
}
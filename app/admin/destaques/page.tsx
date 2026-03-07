import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Check, X, MapPin, User, Calendar, ExternalLink, Sparkles, DollarSign, FileText } from "lucide-react";
import { AdminHighlightActions } from "./actions";
import { formatCurrency } from "@/lib/utils";

export default async function AdminHighlightsPage() {
  const supabase = await createClient();

  const { data: properties, error } = await supabase
    .from('properties')
    .select(`
      *,
      profiles:owner_id (full_name, phone)
    `)
    .eq('promotion_status', 'pending')
    .order('updated_at', { ascending: false });

  if (error) {
    console.error("Erro ao buscar solicitações de destaque:", error);
    return <div>Erro ao carregar solicitações: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Solicitações de Destaque</h1>
          <p className="text-slate-500 mt-1">Verifique os pagamentos e ative o Destaque Turbo</p>
        </div>
        <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          {properties?.length || 0} Pendentes
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {properties?.map((property) => (
          <div key={property.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row relative">
            <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10">
              SOLICITAÇÃO TURBO
            </div>

            <div className="relative w-full md:w-64 h-48 md:h-auto bg-slate-100 shrink-0 group">
              {property.images?.[0] ? (
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  Sem foto
                </div>
              )}
              <Link
                href={`/imoveis/${property.id}`}
                target="_blank"
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              >
                <span className="bg-white/90 text-slate-900 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2">
                  <ExternalLink className="w-4 h-4" /> Ver Anúncio
                </span>
              </Link>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{property.title}</h3>
                    <p className="text-slate-500 flex items-center gap-1 text-sm">
                      <MapPin className="w-4 h-4" />
                      {property.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-blue-600">
                      {property.type === 'Aluguel'
                        ? `${formatCurrency(Number(property.price))}/mês`
                        : formatCurrency(Number(property.price))}
                    </p>
                    <div className="mt-1 flex items-center justify-end gap-1 text-amber-600 text-sm font-medium">
                      <DollarSign className="w-4 h-4" />
                      Valor a receber: R$ 50,00
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  <div className="space-y-2">
                    <p className="font-medium text-slate-900 mb-1">Dados do Solicitante</p>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      <span className="truncate">{property.contact_name || property.profiles?.full_name || 'Sem nome'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-500">
                        {property.contact_email || 'Sem email'}
                      </span>
                    </div>
                    {property.promotion_receipt_url && (
                      <div className="mt-2">
                        <a
                          href={property.promotion_receipt_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          Ver Comprovante
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-slate-900 mb-1">Status do Imóvel</p>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize border ${property.status === 'active'
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-yellow-100 text-yellow-700 border-yellow-200'
                        }`}>
                        {property.status === 'active' ? 'Ativo' : 'Pendente de Moderação'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
                      <Calendar className="w-3 h-3" />
                      Solicitado em: {new Date(property.updated_at).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="text-sm text-slate-500">
                  Confirme o recebimento do PIX antes de ativar.
                </div>
                <AdminHighlightActions propertyId={property.id} />
              </div>
            </div>
          </div>
        ))}

        {(!properties || properties.length === 0) && (
          <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">Nenhuma solicitação pendente</h3>
            <p className="text-slate-500 mt-1">Todas as solicitações de destaque foram processadas.</p>
          </div>
        )}
      </div>
    </div>
  );
}

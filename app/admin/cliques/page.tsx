import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { MousePointerClick, MessageCircle } from "lucide-react";

type SearchParams = Promise<{ days?: string }>;

type AnalyticsRow = {
  id: string;
  event_type: string;
  property_id: string | null;
  contact_value: string | null;
  created_at: string;
};

type PropertyRow = {
  id: string;
  title: string;
  owner_id: string | null;
  contact_whatsapp: string | null;
  contact_phone: string | null;
};

function formatPhone(raw: string | null) {
  if (!raw) return "-";
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10) return digits;
  const d = digits.length === 13 && digits.startsWith("55") ? digits.slice(2) : digits;
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return digits;
}

export default async function AdminCliquesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const days = Number(params.days || "7");
  const safeDays = [7, 14, 30].includes(days) ? days : 7;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return null;

  const since = new Date(Date.now() - safeDays * 24 * 60 * 60 * 1000).toISOString();

  const { data: eventRows, error: eventError } = await supabase
    .from("analytics_events")
    .select("id, event_type, property_id, contact_value, created_at")
    .in("event_type", ["click_imovel", "lead_whatsapp"])
    .gte("created_at", since)
    .order("created_at", { ascending: false });

  if (eventError) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Cliques e Contatos</h1>
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
          <p className="text-slate-700 font-semibold">Não foi possível carregar os cliques.</p>
          <p className="text-slate-600 mt-2">
            A base de dados precisa do ajuste da tabela <span className="font-mono">analytics_events</span> para suportar os novos eventos.
          </p>
          <p className="text-slate-600 mt-2">
            Aplique o arquivo <span className="font-mono">supabase/migrations/add_analytics_click_events.sql</span> no Supabase SQL Editor.
          </p>
        </div>
      </div>
    );
  }

  const events = (eventRows || []) as AnalyticsRow[];
  const propertyIds = Array.from(new Set(events.map(e => e.property_id).filter((v): v is string => !!v)));

  const { data: propertyRows } = propertyIds.length > 0
    ? await supabase.from("properties").select("id, title, owner_id, contact_whatsapp, contact_phone").in("id", propertyIds)
    : { data: [] as PropertyRow[] };

  const propertiesMap = new Map<string, PropertyRow>();
  (propertyRows || []).forEach((p: PropertyRow) => propertiesMap.set(p.id, p));

  const clickByProperty = new Map<string, { count: number; lastAt: string }>();
  const whatsappByKey = new Map<string, { count: number; lastAt: string; propertyId: string | null; whatsapp: string | null }>();

  for (const ev of events) {
    if (ev.event_type === "click_imovel" && ev.property_id) {
      const prev = clickByProperty.get(ev.property_id);
      if (!prev) clickByProperty.set(ev.property_id, { count: 1, lastAt: ev.created_at });
      else clickByProperty.set(ev.property_id, { count: prev.count + 1, lastAt: prev.lastAt });
    }

    if (ev.event_type === "lead_whatsapp") {
      const key = `${ev.property_id || "none"}::${ev.contact_value || "none"}`;
      const prev = whatsappByKey.get(key);
      if (!prev) {
        whatsappByKey.set(key, { count: 1, lastAt: ev.created_at, propertyId: ev.property_id, whatsapp: ev.contact_value });
      } else {
        whatsappByKey.set(key, { count: prev.count + 1, lastAt: prev.lastAt, propertyId: prev.propertyId, whatsapp: prev.whatsapp });
      }
    }
  }

  const clicksTable = Array.from(clickByProperty.entries())
    .map(([propertyId, v]) => {
      const p = propertiesMap.get(propertyId);
      return { propertyId, title: p?.title || propertyId, ownerId: p?.owner_id || null, count: v.count, lastAt: v.lastAt };
    })
    .sort((a, b) => b.count - a.count);

  const whatsappTable = Array.from(whatsappByKey.values())
    .map((v) => {
      const p = v.propertyId ? propertiesMap.get(v.propertyId) : undefined;
      return {
        propertyId: v.propertyId,
        title: v.propertyId ? (p?.title || v.propertyId) : "-",
        ownerId: p?.owner_id || null,
        whatsapp: formatPhone(v.whatsapp),
        count: v.count,
        lastAt: v.lastAt,
      };
    })
    .sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900">Cliques e Contatos</h1>
      </div>

      <section className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100">
            <MousePointerClick className="h-5 w-5 text-blue-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Cliques nos Cards</h2>
            <p className="text-sm text-slate-600">Total: {clicksTable.reduce((acc, r) => acc + r.count, 0)}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-2 pr-4">Imóvel</th>
                <th className="py-2 pr-4">Cliques</th>
                <th className="py-2 pr-4">Dono</th>
                <th className="py-2 pr-4">Último</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clicksTable.map((row) => (
                <tr key={row.propertyId} className="text-slate-800">
                  <td className="py-3 pr-4">
                    <Link className="text-blue-700 hover:underline" href={`/imoveis/${row.propertyId}`}>
                      {row.title}
                    </Link>
                    <div className="text-xs text-slate-500">{row.propertyId}</div>
                  </td>
                  <td className="py-3 pr-4 font-bold">{row.count}</td>
                  <td className="py-3 pr-4 text-xs text-slate-600">{row.ownerId || "-"}</td>
                  <td className="py-3 pr-4 text-xs text-slate-600">{new Date(row.lastAt).toLocaleString("pt-BR")}</td>
                </tr>
              ))}
              {clicksTable.length === 0 ? (
                <tr>
                  <td className="py-6 text-slate-500" colSpan={4}>Nenhum clique no período.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-green-50 border border-green-100">
            <MessageCircle className="h-5 w-5 text-green-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Cliques no WhatsApp</h2>
            <p className="text-sm text-slate-600">Total: {whatsappTable.reduce((acc, r) => acc + r.count, 0)}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="py-2 pr-4">WhatsApp</th>
                <th className="py-2 pr-4">Imóvel</th>
                <th className="py-2 pr-4">Cliques</th>
                <th className="py-2 pr-4">Dono</th>
                <th className="py-2 pr-4">Último</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {whatsappTable.map((row, idx) => (
                <tr key={`${row.propertyId || "none"}-${row.whatsapp}-${idx}`} className="text-slate-800">
                  <td className="py-3 pr-4 font-semibold">{row.whatsapp}</td>
                  <td className="py-3 pr-4">
                    {row.propertyId ? (
                      <Link className="text-blue-700 hover:underline" href={`/imoveis/${row.propertyId}`}>
                        {row.title}
                      </Link>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                    {row.propertyId ? <div className="text-xs text-slate-500">{row.propertyId}</div> : null}
                  </td>
                  <td className="py-3 pr-4 font-bold">{row.count}</td>
                  <td className="py-3 pr-4 text-xs text-slate-600">{row.ownerId || "-"}</td>
                  <td className="py-3 pr-4 text-xs text-slate-600">{new Date(row.lastAt).toLocaleString("pt-BR")}</td>
                </tr>
              ))}
              {whatsappTable.length === 0 ? (
                <tr>
                  <td className="py-6 text-slate-500" colSpan={5}>Nenhum clique no período.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}


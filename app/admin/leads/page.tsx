import { createClient } from "@/lib/supabase/server";
import { BarChart3, Users, Eye, CheckCircle2, Calendar } from "lucide-react";

export default async function AdminLeadsPage() {
  const supabase = await createClient();

  // Security: ensure admin (layout already checks, this is defensive)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') {
    return null;
  }

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Visitors (page views in last 7 days)
  const { count: visitors7d } = await supabase
    .from('analytics_events')
    .select('*', { count: 'exact', head: true })
    .eq('event_type', 'page_view')
    .gte('created_at', sevenDaysAgo);

  // Registrations (profiles created in last 7 days)
  const { count: registrations7d } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo);

  // Closed deals (properties with status 'sold')
  const { count: dealsClosedTotal } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'sold');

  // Recent leads (optional, will display if exist)
  const { data: recentLeads } = await supabase
    .from('analytics_events')
    .select('id, event_type, path, user_id, property_id, created_at')
    .in('event_type', ['lead_contact', 'deal_closed'])
    .order('created_at', { ascending: false })
    .limit(10);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          Gestão de Leads
        </h1>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          Últimos 7 dias
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Visitantes</h3>
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Eye className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{visitors7d || 0}</p>
          <p className="text-xs text-slate-500 mt-1">Page views registrados</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Cadastros</h3>
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{registrations7d || 0}</p>
          <p className="text-xs text-slate-500 mt-1">Novos perfis</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Negócios Fechados</h3>
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{dealsClosedTotal || 0}</p>
          <p className="text-xs text-slate-500 mt-1">Total de imóveis vendidos</p>
        </div>
      </div>

      {/* Recent Leads / Activities */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Atividades Recentes</h2>
        {recentLeads && recentLeads.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {recentLeads.map((ev) => (
              <div key={ev.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 text-slate-700">
                    {ev.event_type}
                  </span>
                  <span className="text-slate-700 text-sm truncate max-w-[40ch]">{ev.path || '-'}</span>
                </div>
                <div className="text-xs text-slate-500">
                  {new Date(ev.created_at).toLocaleString('pt-BR')}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Nenhuma atividade de leads registrada ainda.</p>
        )}
      </div>
    </div>
  );
}

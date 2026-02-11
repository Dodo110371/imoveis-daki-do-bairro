import { createClient } from "@/lib/supabase/server";
import { Building2, Users, AlertCircle, CheckCircle2 } from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Stats
  const { count: pendingCount } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  const { count: activeCount } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');
    
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-slate-900">Visão Geral</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Imóveis Pendentes</h3>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{pendingCount || 0}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Imóveis Ativos</h3>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <p className="text-3xl font-bold text-slate-900">{activeCount || 0}</p>
        </div>
      </div>
    </div>
  );
}
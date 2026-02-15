import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { LayoutDashboard, Building2, LogOut, Home, Users, BarChart3, Calendar } from "lucide-react";
import { AdminMobileNav } from "@/components/AdminMobileNav";
import { AdminSidebarNav } from "@/components/AdminSidebarNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/minha-conta");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!profile || profile.role !== "admin") {
    redirect("/");
  }

  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const { count: pendingProperties } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  const { count: recentLeads } = await supabase
    .from("analytics_events")
    .select("*", { count: "exact", head: true })
    .in("event_type", ["lead_contact"])
    .gte("created_at", sevenDaysAgo);

  const { count: users7d } = await supabase
    .from("profiles")
    .select("*", { count: "exact", head: true })
    .gte("created_at", sevenDaysAgo);

  const counts = {
    pendingProperties: pendingProperties ?? 0,
    recentLeads: recentLeads ?? 0,
    users: users7d ?? 0,
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 bottom-0 z-50 hidden md:block">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-xs text-slate-400 mt-1">Imóveis do Bairro</p>
        </div>

        <nav className="p-4 space-y-2">
          <AdminSidebarNav counts={counts} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <AdminMobileNav counts={counts} />
        <div className="mb-6 flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">Período: últimos 7 dias</span>
        </div>
        {children}
      </main>
    </div>
  );
}

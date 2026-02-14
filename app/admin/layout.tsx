import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { LayoutDashboard, Building2, LogOut, Home, Users, BarChart3 } from "lucide-react";

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

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 bottom-0 z-50 hidden md:block">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-xs text-slate-400 mt-1">Imóveis do Bairro</p>
        </div>

        <nav className="p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>
          <Link href="/admin/imoveis" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Building2 className="w-5 h-5" />
            Moderação de Imóveis
          </Link>
          <Link href="/admin/leads" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <BarChart3 className="w-5 h-5" />
            Gestão de Leads
          </Link>
          <Link href="/admin/usuarios" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors">
            <Users className="w-5 h-5" />
            Usuários
          </Link>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors mt-8">
            <Home className="w-5 h-5" />
            Voltar ao Site
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        {/* Mobile admin navigation */}
        <nav className="md:hidden mb-6 bg-slate-900 text-white rounded-lg shadow-sm border border-slate-800 p-2 flex flex-wrap items-center gap-2">
          <Link href="/admin" className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
          <Link href="/admin/imoveis" className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            Imóveis
          </Link>
          <Link href="/admin/leads" className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Leads
          </Link>
          <Link href="/admin/usuarios" className="px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-2">
            <Users className="w-4 h-4" />
            Usuários
          </Link>
          <Link href="/" className="ml-auto px-3 py-2 text-sm bg-white/10 hover:bg-white/20 rounded-md transition-colors flex items-center gap-2">
            <Home className="w-4 h-4" />
            Site
          </Link>
        </nav>
        {children}
      </main>
    </div>
  );
}

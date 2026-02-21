'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, BarChart3, Users, Home, Wrench } from "lucide-react";

type Counts = {
  pendingProperties?: number;
  recentLeads?: number;
  users?: number;
};

export function AdminSidebarNav({ counts }: { counts?: Counts }) {
  const pathname = usePathname();
  const base = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";
  const inactive = "text-slate-300 hover:bg-slate-800 hover:text-white";
  const active = "bg-slate-800 text-white border border-slate-700";
  const badge = "ml-auto inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full";

  return (
    <>
      <Link href="/admin" className={`${base} ${pathname === "/admin" ? active : inactive}`}>
        <LayoutDashboard className="w-5 h-5" />
        Dashboard
      </Link>
      <Link href="/admin/imoveis" className={`${base} ${pathname === "/admin/imoveis" ? active : inactive}`}>
        <Building2 className="w-5 h-5" />
        Moderação de Imóveis
        {counts?.pendingProperties ? (
          <span className={`${badge} bg-indigo-600 text-white`}>{counts.pendingProperties}</span>
        ) : null}
      </Link>
      <Link href="/admin/leads" className={`${base} ${pathname === "/admin/leads" ? active : inactive}`}>
        <BarChart3 className="w-5 h-5" />
        Gestão de Leads
        {counts?.recentLeads ? (
          <span className={`${badge} bg-blue-600 text-white`}>{counts.recentLeads}</span>
        ) : null}
      </Link>
      <Link href="/admin/usuarios" className={`${base} ${pathname === "/admin/usuarios" ? active : inactive}`}>
        <Users className="w-5 h-5" />
        Usuários
        {counts?.users ? (
          <span className={`${badge} bg-slate-700 text-white`}>{counts.users}</span>
        ) : null}
      </Link>
      <Link href="/admin/ferramentas-teste" className={`${base} ${pathname === "/admin/ferramentas-teste" ? active : inactive}`}>
        <Wrench className="w-5 h-5" />
        Ferramentas de Teste
      </Link>
      <Link href="/" className={`${base} ${pathname === "/" ? active : inactive} mt-8`}>
        <Home className="w-5 h-5" />
        Voltar ao Site
      </Link>
    </>
  );
}

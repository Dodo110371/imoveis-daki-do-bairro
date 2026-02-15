"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Building2, BarChart3, Users, Home } from "lucide-react";

export function AdminSidebarNav() {
  const pathname = usePathname();
  const base = "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors";
  const inactive = "text-slate-300 hover:bg-slate-800 hover:text-white";
  const active = "bg-slate-800 text-white border border-slate-700";

  return (
    <>
      <Link href="/admin" className={`${base} ${pathname === "/admin" ? active : inactive}`}>
        <LayoutDashboard className="w-5 h-5" />
        Dashboard
      </Link>
      <Link href="/admin/imoveis" className={`${base} ${pathname === "/admin/imoveis" ? active : inactive}`}>
        <Building2 className="w-5 h-5" />
        Moderação de Imóveis
      </Link>
      <Link href="/admin/leads" className={`${base} ${pathname === "/admin/leads" ? active : inactive}`}>
        <BarChart3 className="w-5 h-5" />
        Gestão de Leads
      </Link>
      <Link href="/admin/usuarios" className={`${base} ${pathname === "/admin/usuarios" ? active : inactive}`}>
        <Users className="w-5 h-5" />
        Usuários
      </Link>
      <Link href="/" className={`${base} ${pathname === "/" ? active : inactive} mt-8`}>
        <Home className="w-5 h-5" />
        Voltar ao Site
      </Link>
    </>
  );
}

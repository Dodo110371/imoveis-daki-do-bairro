"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, LayoutDashboard, Building2, BarChart3, Users, Home } from "lucide-react";

export function AdminMobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden mb-4 flex items-center justify-between">
        <button
          onClick={() => setOpen(true)}
          className="p-2 text-white bg-slate-900 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors"
          aria-label="Abrir menu admin"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold text-slate-800">Admin</span>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Fechar menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
              <Link href="/admin" className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium" onClick={() => setOpen(false)}>
                <LayoutDashboard className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
              <Link href="/admin/imoveis" className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium" onClick={() => setOpen(false)}>
                <Building2 className="h-5 w-5 mr-2" />
                Imóveis
              </Link>
              <Link href="/admin/leads" className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium" onClick={() => setOpen(false)}>
                <BarChart3 className="h-5 w-5 mr-2" />
                Leads
              </Link>
              <Link href="/admin/usuarios" className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium" onClick={() => setOpen(false)}>
                <Users className="h-5 w-5 mr-2" />
                Usuários
              </Link>
              <Link href="/" className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors font-medium" onClick={() => setOpen(false)}>
                <Home className="h-5 w-5 mr-2" />
                Voltar ao Site
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}

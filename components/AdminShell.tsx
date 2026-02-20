"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Calendar } from "lucide-react";
import { AdminSidebarNav } from "@/components/AdminSidebarNav";
import { AdminMobileNav } from "@/components/AdminMobileNav";

type Counts = {
  pendingProperties: number;
  recentLeads: number;
  users: number;
};

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [counts, setCounts] = useState<Counts>({ pendingProperties: 0, recentLeads: 0, users: 0 });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const days = useMemo(() => {
    const d = Number(searchParams.get("days") || "7");
    return [7, 14, 30].includes(d) ? d : 7;
  }, [searchParams]);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("adminDays") : null;
    if (!searchParams.get("days") && saved) {
      const d = Number(saved);
      if ([7, 14, 30].includes(d)) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("days", String(d));
        router.replace(`${pathname}?${params.toString()}`);
      }
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/admin/api/counts?days=${days}`, { signal: controller.signal })
      .then((r) => r.ok ? r.json() : Promise.reject(r))
      .then((json) => setCounts(json))
      .catch(() => { });
    return () => controller.abort();
  }, [days]);

  const setDays = (val: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("days", String(val));
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("adminDays", String(days));
      }
    } catch { }
  }, [days]);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 bottom-0 z-50 hidden md:block">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <p className="text-xs text-slate-400 mt-1">Imóveis daki do Bairro</p>
        </div>
        <nav className="p-4 space-y-2">
          <AdminSidebarNav counts={counts} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-8">
        <AdminMobileNav counts={counts} />

        {/* Period banner + selector */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-100">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-medium">Período: últimos {days} dias</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-lg overflow-hidden border border-slate-200">
              {[7, 14, 30].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors ${days === d ? "bg-blue-600 text-white" : "bg-white text-slate-700 hover:bg-slate-50"}`}
                >
                  {d} dias
                </button>
              ))}
            </div>
            <button
              onClick={() => setDays(7)}
              className="px-3 py-1.5 text-sm font-medium rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Redefinir
            </button>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

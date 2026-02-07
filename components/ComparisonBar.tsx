'use client';

import { useComparison } from '@/context/ComparisonContext';
import Link from 'next/link';
import { ArrowRightLeft, X } from 'lucide-react';

export function ComparisonBar() {
  const { comparisonIds, clearComparison } = useComparison();

  if (comparisonIds.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-2xl transform transition-transform duration-300 ease-in-out animate-in slide-in-from-bottom-full print:hidden">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <ArrowRightLeft className="text-blue-600" />
            <span className="hidden sm:inline">Comparando</span>
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {comparisonIds.length} / 3
            </span>
          </div>

          <div className="flex gap-2">
            {/* Small preview dots or indicators could go here */}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={clearComparison}
            className="text-sm text-slate-500 hover:text-red-500 underline"
          >
            Limpar
          </button>

          <Link
            href="/comparar"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
          >
            Comparar Agora
          </Link>
        </div>
      </div>
    </div>
  );
}

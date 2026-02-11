'use client';

import { useState } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import { updatePropertyStatus } from './server-actions';

export function AdminPropertyActions({ propertyId }: { propertyId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (status: 'active' | 'rejected') => {
    if (!confirm(status === 'active' ? 'Aprovar este imóvel?' : 'Rejeitar este imóvel?')) return;
    
    setIsLoading(true);
    try {
      await updatePropertyStatus(propertyId, status);
    } catch (error) {
      alert('Erro ao atualizar status');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => handleAction('rejected')}
        disabled={isLoading}
        className="px-4 py-2 border border-red-200 text-red-700 rounded-lg hover:bg-red-50 font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
        Rejeitar
      </button>
      <button
        onClick={() => handleAction('active')}
        disabled={isLoading}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium flex items-center gap-2 transition-colors shadow-sm disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
        Aprovar
      </button>
    </>
  );
}
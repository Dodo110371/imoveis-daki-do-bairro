'use client';

import { useState } from 'react';
import { Check, X, Loader2, Sparkles } from 'lucide-react';
import { updatePromotionStatus } from './server-actions';

export function AdminHighlightActions({ propertyId }: { propertyId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (status: 'active' | 'rejected') => {
    const confirmMessage = status === 'active' 
      ? 'Confirmar pagamento e ativar destaque?' 
      : 'Rejeitar solicitação de destaque?';
      
    if (!confirm(confirmMessage)) return;
    
    setIsLoading(true);
    try {
      await updatePromotionStatus(propertyId, status);
    } catch (error) {
      alert('Erro ao atualizar status do destaque');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex gap-3">
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
        className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 font-medium flex items-center gap-2 transition-colors shadow-sm hover:shadow-amber-500/25 disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        Confirmar Pagamento
      </button>
    </div>
  );
}

"use client";

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setStatus('success');
    setEmail('');
    
    // Reset status after 3 seconds
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="w-full max-w-md">
      {status === 'success' ? (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg border border-green-100 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-5 w-5" />
          <span className="font-medium">Inscrição realizada com sucesso!</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-4 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder:text-slate-400 transition-all shadow-sm"
              disabled={status === 'loading'}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Inscrever</span>
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      )}
      <p className="mt-2 text-xs text-slate-500">
        Prometemos não enviar spam. Você pode cancelar a qualquer momento.
      </p>
    </div>
  );
}

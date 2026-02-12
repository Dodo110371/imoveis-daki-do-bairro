'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { ShieldCheck, MapPin, Phone, FileText } from 'lucide-react';

export default function CadastroCorretorPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    creci: '',
    whatsapp: '',
    bio: '',
    regions: ''
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/minha-conta?redirect=/cadastro-corretor');
    }
  }, [isLoading, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    const supabase = createClient();

    try {
      // Check if already registered
      const { data: existing } = await supabase
        .from('realtors')
        .select('id')
        .eq('id', user.id)
        .single();

      if (existing) {
        alert('Você já possui cadastro como corretor!');
        router.push('/corretores/' + user.id);
        return;
      }

      const { error } = await supabase.from('realtors').insert({
        id: user.id,
        creci: formData.creci,
        whatsapp: formData.whatsapp.replace(/\D/g, ''), // Remove non-digits
        bio: formData.bio,
        regions: formData.regions.split(',').map(r => r.trim()).filter(r => r)
      });

      if (error) throw error;

      alert('Cadastro de corretor realizado com sucesso!');
      router.push('/anunciar');
    } catch (error: any) {
      console.error('Error registering realtor:', error);
      alert('Erro ao cadastrar: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
        <div className="bg-slate-900 px-8 py-6 text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-green-400" />
            Cadastro de Corretor Parceiro
          </h1>
          <p className="text-slate-300 mt-2">
            Complete seu perfil profissional para aparecer em nossa lista de corretores e divulgar seus imóveis.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Número do CRECI
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ShieldCheck className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                required
                className="pl-10 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Ex: 12345-F"
                value={formData.creci}
                onChange={(e) => setFormData({ ...formData, creci: e.target.value })}
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Seu número de registro profissional é obrigatório.</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              WhatsApp para Contato
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="tel"
                required
                className="pl-10 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="(00) 00000-0000"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Regiões de Atuação
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="pl-10 block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                placeholder="Ex: Centro, Zona Sul, Jardins (separe por vírgula)"
                value={formData.regions}
                onChange={(e) => setFormData({ ...formData, regions: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Biografia Profissional
            </label>
            <div className="relative">
              <textarea
                rows={4}
                className="block w-full border border-slate-300 rounded-lg py-2.5 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                placeholder="Conte um pouco sobre sua experiência e especialidades..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {isSubmitting ? 'Cadastrando...' : 'Finalizar Cadastro de Corretor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

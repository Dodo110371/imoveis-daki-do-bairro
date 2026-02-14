'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Check, Building2, BadgeCheck, FileText, Upload, Shield } from 'lucide-react';
import Link from 'next/link';
import { registerAgency } from './actions';

const PLANS = [
  {
    id: 'bronze',
    name: 'Iniciante',
    price: 199.90,
    ads: 10,
    features: [
      '10 Anúncios Ativos',
      'Gestão Básica',
      'Suporte por Email',
      'Integração Manual'
    ],
    recommended: false
  },
  {
    id: 'silver',
    name: 'Profissional',
    price: 499.90,
    ads: 50,
    features: [
      '50 Anúncios Ativos',
      '5 Destaques Mensais',
      'Relatórios de Performance',
      'Suporte Prioritário',
      'Integração XML'
    ],
    recommended: true
  },
  {
    id: 'gold',
    name: 'Elite',
    price: 999.90,
    ads: 'Ilimitado',
    features: [
      'Anúncios Ilimitados',
      '20 Destaques Mensais',
      'Gestor de Conta Dedicado',
      'API Completa',
      'Consultoria de Marketing'
    ],
    recommended: false
  }
];

export default function CadastroImobiliariaPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    creci: '',
    email: '',
    phone: '',
    address: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setStep(2);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setIsSubmitting(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('creci', formData.creci);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('address', formData.address);
    data.append('description', formData.description);
    data.append('plan', selectedPlan);

    try {
      const result = await registerAgency(data);

      if (result.error) {
        alert(result.error);
        setIsSubmitting(false);
      } else {
        setStep(3);
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Ocorreu um erro ao processar seu cadastro. Tente novamente.');
      setIsSubmitting(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center space-y-6 animate-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Cadastro Recebido!</h2>
          <p className="text-slate-600">
            Sua solicitação para se tornar uma imobiliária parceira foi enviada com sucesso.
            Nossa equipe entrará em contato em breve para validar seus dados e ativar seu plano.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-block w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Parceria Imobiliária
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Potencialize seus negócios com a plataforma que mais cresce na região.
            Escolha o plano ideal e comece a anunciar hoje mesmo.
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-5xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl relative z-10">1</div>
            <h3 className="font-bold text-lg mb-2 relative z-10">Escolha seu Plano</h3>
            <p className="text-slate-500 text-sm relative z-10">Selecione o pacote que melhor atende ao volume de anúncios e necessidades da sua imobiliária.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl relative z-10">2</div>
            <h3 className="font-bold text-lg mb-2 relative z-10">Faça seu Cadastro</h3>
            <p className="text-slate-500 text-sm relative z-10">Preencha seus dados comerciais e CRECI para validação da nossa equipe de moderação.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-slate-100 relative overflow-hidden group hover:border-blue-200 transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-110" />
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 font-bold text-xl relative z-10">3</div>
            <h3 className="font-bold text-lg mb-2 relative z-10">Comece a Anunciar</h3>
            <p className="text-slate-500 text-sm relative z-10">Após a aprovação, você terá acesso imediato ao painel administrativo para gerenciar seus imóveis.</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>1</div>
            <div className={`h-1 w-16 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>2</div>
            <div className={`h-1 w-16 rounded-full ${step >= 3 ? 'bg-blue-600' : 'bg-slate-200'}`} />
            <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>3</div>
          </div>
        </div>

        {step === 1 ? (
          /* Step 1: Plan Selection */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-sm border-2 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col ${plan.recommended ? 'border-blue-600 scale-105 z-10' : 'border-slate-100 hover:border-blue-200'
                  }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 inset-x-0 bg-blue-600 text-white text-xs font-bold text-center py-1 uppercase tracking-wider">
                    Mais Popular
                  </div>
                )}

                <div className={`p-8 ${plan.recommended ? 'pt-10' : ''}`}>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-sm text-slate-500">R$</span>
                    <span className="text-4xl font-extrabold text-slate-900">{Math.floor(plan.price)}</span>
                    <span className="text-xl font-bold text-slate-900">,{plan.price.toFixed(2).split('.')[1]}</span>
                    <span className="text-slate-500">/mês</span>
                  </div>

                  <button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full py-3 rounded-xl font-bold transition-all ${plan.recommended
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    Selecionar Plano
                  </button>
                </div>

                <div className="bg-slate-50 p-8 border-t border-slate-100 flex-grow">
                  <ul className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check className="w-5 h-5 text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Step 2: Registration Form */
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-blue-600" />
                Dados da Imobiliária
              </h2>
              <p className="text-slate-500 mt-2">
                Preencha as informações abaixo para finalizar seu cadastro no plano <strong>{PLANS.find(p => p.id === selectedPlan)?.name}</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Razão Social / Nome Fantasia</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="Ex: Imobiliária Ideal"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">CRECI Jurídico</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.creci}
                      onChange={(e) => setFormData({ ...formData, creci: e.target.value })}
                      className="w-full p-3 pl-10 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                      placeholder="Ex: J-12345"
                    />
                    <BadgeCheck className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email Corporativo</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="contato@imobiliaria.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Telefone / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Endereço Completo</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="Rua, Número, Bairro, Cidade - UF"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Descrição da Imobiliária</label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Conte um pouco sobre a história e diferenciais da sua imobiliária..."
                />
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  Voltar aos Planos
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Confirmar Cadastro
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

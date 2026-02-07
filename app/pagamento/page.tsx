'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CreditCard, 
  QrCode, 
  Barcode, 
  CheckCircle2, 
  Lock, 
  ShieldCheck, 
  ArrowLeft,
  Loader2,
  Calendar,
  AlertCircle
} from 'lucide-react';

// Tipos de Plano para o Resumo
const PLAN_DETAILS: Record<string, { title: string; price: number; period: string; features: string[] }> = {
  mensal: {
    title: 'Plano Mensal',
    price: 200,
    period: 'mês',
    features: ['Anúncio ativo por 30 dias', '15 fotos', 'Renovação automática']
  },
  trimestral: {
    title: 'Plano Trimestral',
    price: 300,
    period: 'trimestre',
    features: ['Anúncio ativo por 90 dias', '20 fotos', 'Destaque por 7 dias']
  },
  semestral: {
    title: 'Plano Semestral',
    price: 600,
    period: 'semestre',
    features: ['Anúncio ativo por 180 dias', '30 fotos', 'Destaque por 15 dias']
  },
  ate_vender: {
    title: 'Até Vender',
    price: 1000,
    period: 'pagamento único',
    features: ['Sem prazo de validade', 'Fotos ilimitadas', 'Destaque Premium']
  }
};

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planKey = searchParams.get('plano') || 'mensal';
  const plan = PLAN_DETAILS[planKey] || PLAN_DETAILS['mensal'];

  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'pix' | 'boleto'>('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'details' | 'success'>('details');

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulação de processamento
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setStep('success');
    window.scrollTo(0, 0);
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Pagamento Confirmado!</h1>
          <p className="text-slate-600 mb-8">
            Seu anúncio do <strong>{plan.title}</strong> foi ativado com sucesso. Você receberá os detalhes por e-mail.
          </p>
          <div className="space-y-3">
            <Link 
              href="/minha-conta" 
              className="block w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors"
            >
              Acessar Painel
            </Link>
            <Link 
              href="/" 
              className="block w-full py-3 px-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              Voltar para Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Header Simplificado */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/planos" className="p-2 -ml-2 text-slate-400 hover:text-slate-700 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
               <ShieldCheck className="w-5 h-5 text-green-600" />
               <span className="font-semibold text-slate-700 text-sm md:text-base">Pagamento Seguro</span>
            </div>
          </div>
          <div className="text-xs md:text-sm text-slate-500">
            Ambiente Criptografado
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          
          {/* Coluna Esquerda: Formulário */}
          <div className="flex-1 space-y-6">
            
            {/* Seção 1: Dados Pessoais */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Dados do Responsável
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nome Completo</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" placeholder="Seu nome" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">CPF/CNPJ</label>
                  <input type="text" className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">E-mail</label>
                  <input type="email" className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Celular</label>
                  <input type="tel" className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" placeholder="(00) 00000-0000" />
                </div>
              </div>
            </div>

            {/* Seção 2: Pagamento */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Forma de Pagamento
              </h2>

              {/* Seletor de Método */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                <button 
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'credit_card' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-300 text-slate-600'}`}
                >
                  <CreditCard className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Cartão</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'pix' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-300 text-slate-600'}`}
                >
                  <QrCode className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">PIX</span>
                </button>
                <button 
                  onClick={() => setPaymentMethod('boleto')}
                  className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${paymentMethod === 'boleto' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-100 hover:border-slate-300 text-slate-600'}`}
                >
                  <Barcode className="w-6 h-6 mb-2" />
                  <span className="text-sm font-medium">Boleto</span>
                </button>
              </div>

              {/* Conteúdo Dinâmico do Método */}
              <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                {paymentMethod === 'credit_card' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Número do Cartão</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input type="text" className="w-full pl-10 p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" placeholder="0000 0000 0000 0000" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Validade</label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <input type="text" className="w-full pl-10 p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" placeholder="MM/AA" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">CVV</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                          <input type="text" className="w-full pl-10 p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" placeholder="123" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Nome no Cartão</label>
                      <input type="text" className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600" placeholder="Como impresso no cartão" />
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={32} height={20} className="h-5 w-auto opacity-70" />
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={32} height={20} className="h-5 w-auto opacity-70" />
                      <Image src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" width={32} height={20} className="h-5 w-auto opacity-70" />
                    </div>
                  </div>
                )}

                {paymentMethod === 'pix' && (
                  <div className="text-center p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-48 h-48 bg-white p-2 mx-auto mb-4 border border-slate-200 rounded-lg">
                      <div className="w-full h-full bg-slate-800 flex items-center justify-center text-white text-xs">
                        QR Code Simulado
                      </div>
                    </div>
                    <p className="font-medium text-slate-900 mb-2">Escaneie o QR Code para pagar</p>
                    <p className="text-sm text-slate-500 mb-4">A aprovação é imediata após o pagamento.</p>
                    <button className="text-blue-600 font-semibold hover:underline text-sm">
                      Copiar código PIX
                    </button>
                  </div>
                )}

                {paymentMethod === 'boleto' && (
                  <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">Atenção ao prazo</h4>
                        <p className="text-sm text-slate-600">
                          O boleto pode levar até <strong>3 dias úteis</strong> para ser compensado. Seu anúncio será ativado assim que recebermos a confirmação do banco.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full py-4 px-6 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-green-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Finalizar Pagamento
                </>
              )}
            </button>
            
            <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1">
              <Lock className="w-3 h-3" />
              Seus dados estão protegidos com criptografia de 256 bits.
            </p>

          </div>

          {/* Coluna Direita: Resumo (Sticky) */}
          <div className="lg:w-[380px] shrink-0">
            <div className="sticky top-24 space-y-4">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 p-6 text-white">
                  <h3 className="text-lg font-medium opacity-90">Resumo do Pedido</h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">R$ {plan.price}</span>
                    <span className="text-sm opacity-70">/{plan.period}</span>
                  </div>
                  <div className="mt-1 text-sm font-medium text-blue-300">{plan.title}</div>
                </div>
                
                <div className="p-6">
                  <ul className="space-y-4 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-slate-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>Subtotal</span>
                      <span>R$ {plan.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-600 font-medium">
                      <span>Desconto</span>
                      <span>R$ 0,00</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-slate-900 pt-2 border-t border-slate-100 mt-2">
                      <span>Total</span>
                      <span>R$ {plan.price.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-4 border-t border-slate-100 text-xs text-slate-500 text-center">
                   Renovação automática cancelável a qualquer momento.
                </div>
              </div>

              {/* Depoimento Rápido / Social Proof */}
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div className="flex gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-4 h-4 bg-yellow-400 rounded-sm clip-star" />)} 
                  {/* Star mockup with CSS or SVG would be better, using text for now */}
                  <span className="text-yellow-500 text-sm">★★★★★</span>
                </div>
                <p className="text-sm text-slate-700 italic">"Vendi meu imóvel em 2 semanas usando o plano trimestral. Vale muito a pena!"</p>
                <p className="text-xs font-bold text-slate-900 mt-2">- Roberto S., São Luís</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight, Home, Sparkles, Copy, X, Loader2, Upload, FileText } from 'lucide-react';
import { Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';

function SucessoContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode');
  const propertyId = searchParams.get('id');
  const isEdit = mode === 'edit';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [promotionStatus, setPromotionStatus] = useState<string | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);

  useEffect(() => {
    if (propertyId) {
      const supabase = createClient();
      supabase.from('properties')
        .select('promotion_status')
        .eq('id', propertyId)
        .single()
        .then(({ data }) => {
          if (data?.promotion_status) {
            setPromotionStatus(data.promotion_status);
            if (data.promotion_status === 'pending') {
              setRequestSent(true);
            }
          }
        });
    }
  }, [propertyId]);

  const handleActivateHighlight = async () => {
    if (!propertyId) return;
    if (!receiptFile) {
      alert('Por favor, anexe o comprovante de pagamento.');
      return;
    }

    setIsSubmitting(true);
    try {
      const supabase = createClient();

      // Upload receipt
      const fileExt = receiptFile.name.split('.').pop();
      const fileName = `${propertyId}/receipt-${Date.now()}.${fileExt}`;
      const { error: uploadError, data: uploadData } = await supabase.storage
        .from('properties')
        .upload(fileName, receiptFile);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('properties')
        .getPublicUrl(fileName);

      const { error } = await supabase
        .from('properties')
        .update({
          promotion_status: 'pending',
          promotion_receipt_url: publicUrl
        })
        .eq('id', propertyId);

      if (error) throw error;

      setRequestSent(true);
      setPromotionStatus('pending');
    } catch (error: any) {
      console.error('Error requesting highlight:', error);
      alert('Erro ao solicitar destaque: ' + (error.message || 'Erro desconhecido'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Card de Sucesso */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {isEdit ? 'Anúncio Atualizado!' : 'Anúncio Criado com Sucesso!'}
          </h1>

          <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
            {isEdit
              ? 'As alterações foram salvas e seu imóvel está pendente de aprovação novamente.'
              : 'Seu imóvel foi cadastrado e agora está pendente de aprovação. Nossa equipe irá revisar as informações em breve.'
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/minha-conta"
              className="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
            >
              <Home className="w-5 h-5 mr-2" />
              Ir para Meus Imóveis
            </Link>
          </div>

          {/* Upsell Destaque Turbo */}
          <div className="border-t border-slate-100 pt-10">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 relative overflow-hidden group hover:shadow-md transition-all">
              <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                RECOMENDADO
              </div>

              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                  <Sparkles className="w-8 h-8 text-amber-600 animate-pulse" />
                </div>

                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
                    Quer vender muito mais rápido?
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Ative o <strong className="text-amber-700">Destaque Turbo</strong> e coloque seu imóvel no topo das buscas,
                    aumentando em até 5x as visualizações.
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-700">R$ 50,00 <span className="text-xs font-normal text-slate-500">pagamento único</span></span>

                    {propertyId ? (
                      promotionStatus === 'active' ? (
                        <div className="inline-flex items-center px-5 py-2.5 bg-green-100 text-green-700 font-bold rounded-lg cursor-default">
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                          Destaque Ativo
                        </div>
                      ) : promotionStatus === 'pending' || requestSent ? (
                        <div className="inline-flex items-center px-5 py-2.5 bg-amber-100 text-amber-700 font-bold rounded-lg cursor-default">
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Análise Pendente
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="inline-flex items-center px-5 py-2.5 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition-colors shadow-sm hover:shadow-amber-500/25 cursor-pointer"
                        >
                          Ativar Destaque
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </button>
                      )
                    ) : (
                      <span className="text-sm text-amber-600 font-medium">
                        Disponível em "Meus Imóveis"
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {!requestSent ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-amber-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Ativar Destaque Turbo</h2>
                  <p className="text-slate-600 mt-2">
                    Para ativar o destaque, realize o pagamento via PIX e confirme abaixo.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 text-left">
                  <p className="text-sm text-slate-500 font-medium mb-2">Dados para Pagamento (PIX)</p>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-slate-500 block">Chave PIX (CPF)</span>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 bg-white p-2.5 rounded-lg border border-slate-200 font-mono text-slate-900 text-sm font-bold">
                          335.275.633-34
                        </code>
                        <button
                          onClick={() => navigator.clipboard.writeText('335.275.633-34')}
                          className="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors"
                          title="Copiar chave"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 text-sm">
                      <div>
                        <span className="text-xs text-slate-500 block">Beneficiário</span>
                        <span className="font-medium text-slate-900">Doriedson de Jesus Barros Serra</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block">Instituição</span>
                        <span className="font-medium text-slate-900">Banco do Brasil</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Comprovante de Pagamento</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-xl hover:border-amber-500 transition-colors bg-slate-50">
                    <div className="space-y-1 text-center">
                      {receiptFile ? (
                        <div className="flex flex-col items-center">
                          <FileText className="mx-auto h-12 w-12 text-amber-500" />
                          <div className="flex text-sm text-slate-600 mt-2">
                            <span className="font-medium text-slate-900 truncate max-w-[200px]">{receiptFile.name}</span>
                          </div>
                          <button
                            onClick={(e) => { e.preventDefault(); setReceiptFile(null); }}
                            className="text-xs text-red-500 mt-1 hover:text-red-700 font-medium"
                          >
                            Remover
                          </button>
                        </div>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-slate-400" />
                          <div className="flex text-sm text-slate-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-amber-600 hover:text-amber-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-amber-500"
                            >
                              <span>Upload do arquivo</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*,application/pdf"
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    setReceiptFile(e.target.files[0]);
                                  }
                                }}
                              />
                            </label>
                            <p className="pl-1">ou arraste e solte</p>
                          </div>
                          <p className="text-xs text-slate-500">
                            PNG, JPG, PDF até 5MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleActivateHighlight}
                  disabled={isSubmitting || !receiptFile}
                  className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Enviando...'
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Enviar Comprovante
                    </>
                  )}
                </button>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Solicitação Enviada!</h2>
                <p className="text-slate-600 mb-6">
                  Nossa equipe irá verificar seu pagamento e ativar o destaque em breve.
                  Você receberá uma notificação quando estiver ativo.
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors"
                >
                  Entendi
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SucessoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <SucessoContent />
    </Suspense>
  );
}

'use client';

import { siteConfig } from '@/lib/site-config';
import { Mail, Smartphone, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { submitContactForm } from '@/app/actions/contact';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    try {
      const result = await submitContactForm({ success: false, message: '' }, formData);

      if (result.success) {
        setIsSuccess(true);
        // Optional: reset form if needed, though we are hiding it
        e.currentTarget.reset();
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Ocorreu um erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-900 py-20 text-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-slate-900 z-0 animate-gradient" />
        <div className="absolute top-0 left-0 w-full h-full bg-grid-slate-900 opacity-20 z-0" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float delay-75" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-float delay-500" />
        
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Fale Conosco</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Quer anunciar ou tem dúvidas sobre a plataforma? Entre em contato conosco.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 -mt-10">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Contact Info Sidebar */}
            <div className="bg-slate-900 p-8 md:p-12 text-white flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-8">Informações de Contato</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <Smartphone className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">Telefones / WhatsApp</h4>
                      <div className="text-slate-300 mt-1 space-y-1">
                        <p>
                          <a
                            href={`https://wa.me/55${siteConfig.contact.phone.replace(/\\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:underline"
                          >
                            {siteConfig.contact.phone} (WhatsApp)
                          </a>
                        </p>
                        {siteConfig.contact.phone2 && (
                          <p>
                            <a
                              href={`https://wa.me/55${siteConfig.contact.phone2.replace(/\\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-400 hover:underline"
                            >
                              {siteConfig.contact.phone2} (WhatsApp)
                            </a>
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 mt-2">Seg a Sex, das 9h às 18h</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-lg">
                      <Mail className="h-6 w-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">E-mail</h4>
                      <p className="text-slate-300 mt-1">{siteConfig.contact.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative element to replace map */}
              <div className="mt-12 h-48 bg-slate-800/50 rounded-xl relative overflow-hidden flex items-center justify-center">
                <div className="text-slate-500 text-sm">
                  Estamos à disposição para atendê-lo.
                </div>
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="p-8 md:p-12 bg-white">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 animate-in fade-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Mensagem Enviada!</h3>
                  <p className="text-slate-600 mb-8">
                    Obrigado pelo contato. Nossa equipe retornará sua mensagem o mais breve possível.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Enviar nova mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Envie uma mensagem</h3>
                    <p className="text-slate-500 mb-6">Preencha o formulário abaixo e entraremos em contato.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nome Completo</label>
                      <input
                        required
                        name="name"
                        type="text"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="Seu nome"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Telefone</label>
                      <input
                        required
                        name="phone"
                        type="tel"
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">E-mail</label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Assunto</label>
                    <select name="subject" className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white">
                      <option value="Quero comprar um imóvel">Quero comprar um imóvel</option>
                      <option value="Quero alugar um imóvel">Quero alugar um imóvel</option>
                      <option value="Quero vender meu imóvel">Quero vender meu imóvel</option>
                      <option value="Outro assunto">Outro assunto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Mensagem</label>
                    <textarea
                      required
                      name="message"
                      rows={4}
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all resize-none"
                      placeholder="Como podemos ajudar?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Enviar Mensagem
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

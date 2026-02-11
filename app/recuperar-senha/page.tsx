"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPasswordForEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { error } = await resetPasswordForEmail(email);
      if (error) throw error;
      setIsSuccess(true);
    } catch (error: any) {
      console.error('Error sending reset email:', error);
      alert('Erro ao enviar email de recuperação. Verifique se o email está correto.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Recuperar Senha
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Digite seu email para receber o link de redefinição
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isSuccess ? (
            <div className="text-center space-y-4">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">Email Enviado!</h3>
              <p className="text-sm text-slate-500">
                Verifique sua caixa de entrada (e spam) para encontrar o link de redefinição de senha.
              </p>
              <div className="mt-6">
                <Link
                  href="/minha-conta"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100"
                >
                  Voltar para o Login
                </Link>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-3"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Link de Recuperação'}
                  {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                </button>
              </div>

              <div className="flex items-center justify-center">
                <Link href="/minha-conta" className="flex items-center text-sm font-medium text-slate-600 hover:text-slate-900">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar para o Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
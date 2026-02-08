"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, User, ArrowRight, Github, Chrome, LogOut, Heart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

function MinhaContaContent() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register, isLoading, user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';

  // If authenticated, show profile instead of login form
  if (isAuthenticated && !isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium">Minha Conta</h3>
                <p className="mt-1 max-w-2xl text-sm text-slate-300">Detalhes do seu perfil</p>
              </div>
              <div className="bg-white/10 p-2 rounded-full">
                <User className="h-6 w-6" />
              </div>
            </div>
            <div className="border-t border-slate-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-slate-200">
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-slate-500">Nome completo</dt>
                  <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{user?.name}</dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-slate-500">Endereço de e-mail</dt>
                  <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">{user?.email}</dd>
                </div>
              </dl>
            </div>
            <div className="px-4 py-5 sm:px-6 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-end gap-3">
              <button
                onClick={() => router.push('/favoritos')}
                className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Heart className="mr-2 h-4 w-4 text-slate-500" />
                Meus Favoritos
              </button>
              <button
                onClick={() => logout()}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair da conta
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await login(email, name || 'Usuário');
      } else {
        await register(email, name);
      }

      // Redirect after successful auth
      router.push(redirectUrl);
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Ocorreu um erro ao tentar autenticar. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Left Side - Image/Branding */}
      <div className="lg:w-1/2 bg-slate-900 relative hidden lg:flex flex-col justify-center px-12 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
            alt="Interior moderno"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />

        <div className="relative z-20 max-w-lg">
          <h2 className="text-4xl font-bold mb-6">
            {isLogin ? "Bem-vindo de volta!" : "Junte-se a nós"}
          </h2>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            {isLogin
              ? "Acesse sua conta para gerenciar seus imóveis favoritos e histórico de contatos."
              : "Crie sua conta gratuitamente e tenha acesso a recursos exclusivos para encontrar o imóvel dos seus sonhos."
            }
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                <User className="text-blue-400 h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Perfil Personalizado</h3>
                <p className="text-sm text-slate-400">Salve suas preferências de busca</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                <Lock className="text-blue-400 h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Segurança Total</h3>
                <p className="text-sm text-slate-400">Seus dados protegidos e criptografados</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-900">
              {isLogin ? "Acesse sua conta" : "Crie sua conta"}
            </h1>
            <p className="mt-2 text-slate-600">
              {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 font-medium text-blue-600 hover:text-blue-500 transition-colors"
              >
                {isLogin ? "Cadastre-se agora" : "Fazer login"}
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Nome Completo</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required={!isLogin}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white"
                    placeholder="Seu nome"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Senha</label>
                {isLogin && (
                  <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Esqueceu a senha?
                  </a>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Entrar" : "Criar Conta"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500">Ou continue com</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2.5 border border-slate-200 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Chrome className="h-5 w-5 mr-2 text-slate-900" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-2.5 border border-slate-200 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Github className="h-5 w-5 mr-2 text-slate-900" />
                GitHub
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function MinhaContaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    }>
      <MinhaContaContent />
    </Suspense>
  );
}

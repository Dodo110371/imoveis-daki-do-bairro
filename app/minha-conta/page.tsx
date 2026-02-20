"use client";

import React, { useState, useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Mail, Lock, User, ArrowRight, Chrome, LogOut, Heart, ShieldCheck,
  ExternalLink, Camera, MapPin, Phone, Trash2, Save, AlertTriangle, Eye, EyeOff, FileEdit
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { HeaderCta } from '@/components/HeaderCta';

function MinhaContaContent() {
  const [isLogin, setIsLogin] = useState(true);

  // Login/Register Form State
  const [authName, setAuthName] = useState('');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Profile Edit State
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Profile Form Data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: ''
  });

  const [isRealtor, setIsRealtor] = useState(false);
  const [myProperties, setMyProperties] = useState<any[]>([]);
  const { login, register, signInWithGoogle, isLoading, user, isAuthenticated, logout, updateProfile, deleteAccount } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/';
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zip_code: user.zip_code || ''
      });

      const checkRealtorStatus = async () => {
        const supabase = createClient();
        const { data } = await supabase
          .from('realtors')
          .select('id')
          .eq('id', user.id)
          .single();
        setIsRealtor(!!data);

        // Fetch user properties
        const { data: properties } = await supabase
          .from('properties')
          .select('*')
          .eq('owner_id', user.id)
          .order('created_at', { ascending: false });

        if (properties) setMyProperties(properties);
      };
      checkRealtorStatus();
    }
  }, [user]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const { error } = await login(authEmail, authPassword);
        if (error) throw error;
      } else {
        const { error } = await register(authEmail, authPassword, authName);
        if (error) throw error;
      }
      router.push(redirectUrl);
    } catch (error: any) {
      console.error('Authentication error:', error);
      alert(error.message || 'Não foi possível acessar sua conta. Confira os dados informados e tente novamente.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (error: any) {
      console.error('Google auth error:', error);
      alert('Não foi possível conectar com o Google. Tente novamente em alguns instantes.');
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await updateProfile(formData);
      if (error) throw error;
      setIsEditing(false);
      alert('Perfil atualizado com sucesso.');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      alert('Não foi possível atualizar seu perfil. Tente novamente.');
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;

    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    setIsUploading(true);
    const supabase = createClient();

    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      await updateProfile({ avatar_url: publicUrl });
    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      alert('Não foi possível enviar sua foto. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { error } = await deleteAccount();
      if (error) throw error;
      alert('Sua conta foi excluída permanentemente.');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      alert('Não foi possível excluir sua conta. Tente novamente.');
    }
  };

  // If authenticated, show full profile management
  if (isAuthenticated && !isLoading && user) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">

          {/* Header Profile Card */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="relative h-32 bg-slate-900">
              <div className="absolute -bottom-12 left-8">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-lg">
                    {user.avatar_url ? (
                      <Image
                        src={user.avatar_url}
                        alt={user.name}
                        width={96}
                        height={96}
                        className="object-cover h-full w-full"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-200 flex items-center justify-center">
                        <User className="h-10 w-10 text-slate-400" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full text-white shadow-sm hover:bg-blue-700 transition-colors"
                    title="Alterar foto"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
              </div>
            </div>
            <div className="pt-16 pb-6 px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
                <p className="text-slate-500 flex items-center gap-2">
                  <Mail className="h-4 w-4" /> {user.email}
                </p>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/favoritos"
                  className="inline-flex items-center px-4 py-2 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors"
                >
                  <Heart className="mr-2 h-4 w-4 text-red-500" />
                  Favoritos
                </Link>
                <button
                  onClick={() => logout()}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-800 transition-colors"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Left Column - Navigation/Status */}
            <div className="space-y-6">
              {/* Realtor Status Card */}
              <div className="bg-white shadow rounded-lg overflow-hidden border border-blue-100">
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-2">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                    Status da Conta
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {isRealtor
                      ? 'Você possui perfil de Corretor verificado.'
                      : 'Você é um usuário padrão.'}
                  </p>

                  {isRealtor ? (
                    <div className="space-y-2">
                      <Link
                        href={`/corretores/${user.id}`}
                        className="block w-full text-center px-4 py-2 border border-blue-200 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-50"
                      >
                        Ver Perfil Público
                      </Link>
                      {/* CTA padronizado para /anunciar */}
                      <div className="block w-full">
                        <HeaderCta
                          variant="light"
                          className="w-full justify-center bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 border-transparent"
                          labelFull="Gerenciar Anúncios"
                          labelShort="Anúncios"
                        />
                      </div>
                    </div>
                  ) : (
                    <Link
                      href="/cadastro-corretor"
                      className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
                    >
                      Virar Corretor Parceiro
                    </Link>
                  )}
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-white shadow rounded-lg overflow-hidden border border-red-100">
                <div className="p-5">
                  <h3 className="text-lg font-bold text-red-700 flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    Zona de Perigo
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    A exclusão da conta é irreversível e removerá todos os seus dados.
                  </p>
                  {!showDeleteConfirm ? (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="w-full flex items-center justify-center px-4 py-2 border border-red-200 text-red-700 rounded-md text-sm font-medium hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir Conta
                    </button>
                  ) : (
                    <div className="space-y-2 bg-red-50 p-3 rounded-md">
                      <p className="text-xs font-bold text-red-800 text-center">Tem certeza?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={handleDeleteAccount}
                          className="flex-1 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                        >
                          Sim, Excluir
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="flex-1 px-3 py-1 bg-white text-slate-700 text-xs rounded border border-slate-300 hover:bg-slate-50"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Edit Profile Form */}
            <div className="lg:col-span-2">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-slate-900">Dados Pessoais</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm text-blue-600 hover:text-blue-500 font-medium"
                  >
                    {isEditing ? 'Cancelar Edição' : 'Editar Dados'}
                  </button>
                </div>

                <form onSubmit={handleProfileUpdate} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">

                    {/* Name */}
                    <div className="sm:col-span-4">
                      <label className="block text-sm font-medium text-slate-700">Nome Completo</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md disabled:bg-slate-50 disabled:text-slate-500"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700">Telefone / WhatsApp</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md disabled:bg-slate-50 disabled:text-slate-500"
                          placeholder="(99) 99999-9999"
                        />
                      </div>
                    </div>

                    {/* Email (Read Only) */}
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium text-slate-700">E-mail</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="email"
                          disabled
                          value={user.email}
                          className="bg-slate-50 block w-full pl-10 sm:text-sm border-slate-300 rounded-md text-slate-500 cursor-not-allowed"
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-slate-400 text-xs italic">Não editável</span>
                        </div>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium text-slate-700">Endereço</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                          type="text"
                          disabled={!isEditing}
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md disabled:bg-slate-50 disabled:text-slate-500"
                        />
                      </div>
                    </div>

                    {/* City */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700">Cidade</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md disabled:bg-slate-50 disabled:text-slate-500"
                      />
                    </div>

                    {/* State */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700">Estado</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md disabled:bg-slate-50 disabled:text-slate-500"
                      />
                    </div>

                    {/* Zip Code */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-slate-700">CEP</label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={formData.zip_code}
                        onChange={(e) => setFormData({ ...formData, zip_code: e.target.value })}
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-slate-300 rounded-md disabled:bg-slate-50 disabled:text-slate-500"
                      />
                    </div>

                  </div>

                  {isEditing && (
                    <div className="flex justify-end pt-4 border-t border-slate-200">
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Alterações
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* My Properties Section */}
              <div className="bg-white shadow rounded-lg overflow-hidden mt-6">
                <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-slate-900">Meus Anúncios</h3>
                  <Link href="/anunciar" className="text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2 font-semibold">
                    + Novo Anúncio
                  </Link>
                </div>

                <div className="divide-y divide-slate-200">
                  {myProperties.length > 0 ? (
                    myProperties.map((property) => (
                      <div key={property.id} className="p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <div className="relative h-20 w-20 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                          {property.images?.[0] ? (
                            <Image
                              src={property.images[0]}
                              alt={property.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-slate-400">
                              <Camera className="h-8 w-8" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-bold text-slate-900 truncate">{property.title}</h4>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                              ${property.status === 'active' ? 'bg-green-100 text-green-800' :
                                property.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-slate-100 text-slate-800'}`}>
                              {property.status === 'active' ? 'Ativo' :
                                property.status === 'pending' ? 'Pendente' :
                                  property.status === 'sold' ? 'Vendido' : property.status}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 truncate">{property.location}</p>
                          <p className="text-sm font-medium text-slate-900 mt-1">
                            {property.type === 'Aluguel'
                              ? `R$ ${property.price}/mês`
                              : `R$ ${Number(property.price).toLocaleString('pt-BR')}`}
                          </p>
                        </div>

                        <div className="flex gap-2 shrink-0">
                          <Link
                            href={`/imoveis/${property.id}`}
                            className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                            title="Ver Anúncio"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </Link>
                          <Link
                            href={`/imoveis/${property.id}/editar`}
                            className="p-2 text-slate-400 hover:text-yellow-600 transition-colors"
                            title="Editar Anúncio"
                          >
                            <FileEdit className="h-5 w-5" />
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-slate-500">
                      Você ainda não possui imóveis cadastrados.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login/Register View (Unauthenticated)
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

          <form onSubmit={handleAuthSubmit} className="space-y-6">
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
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
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
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">Senha</label>
                {isLogin && (
                  <a href="/recuperar-senha" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                    Esqueceu a senha?
                  </a>
                )}
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-slate-50 hover:bg-white"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
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
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">Ou continue com</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
              >
                <Chrome className="h-5 w-5 text-slate-900" />
                Google
              </button>
            </div>
          </div>
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

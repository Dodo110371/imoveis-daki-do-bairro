'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Building2,
  MapPin,
  Home,
  ArrowRight,
  ArrowLeft,
  Camera,
  CheckCircle2,
  DollarSign,
  FileText,
  User,
  Loader2,
  LogIn,
  UserPlus,
  Info,
  CreditCard,
  X,
  Trash2,
  Briefcase,
  BadgeCheck
} from 'lucide-react';
import Image from 'next/image';
import { CITY_NEIGHBORHOODS } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

// Step definitions
const STEPS = [
  { id: 1, title: 'Identificação', icon: BadgeCheck },
  { id: 2, title: 'Tipo de Imóvel', icon: Home },
  { id: 3, title: 'Localização', icon: MapPin },
  { id: 4, title: 'Detalhes', icon: Building2 },
  { id: 5, title: 'Valores', icon: DollarSign },
  { id: 6, title: 'Fotos', icon: Camera },
  { id: 7, title: 'Contato', icon: User },
  { id: 8, title: 'Planos', icon: CreditCard },
];

interface AdvertiseFormData {
  advertiserType: 'imobiliaria' | 'corretor' | 'proprietario' | '';
  purpose: string;
  type: string;
  cep: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  area: string;
  price: string;
  condoPrice: string;
  iptuPrice: string;
  title: string;
  description: string;
  photos: string[];
  name: string;
  email: string;
  phone: string;
  cpfCnpj: string;
  whatsapp: string;
  advertiserAddressOption: 'same' | 'different';
  advertiserCep: string;
  advertiserCity: string;
  advertiserNeighborhood: string;
  advertiserStreet: string;
  advertiserNumber: string;
  advertiserComplement: string;
  paymentPlan: string;
  paymentMethod: string;
}

const INITIAL_FORM_DATA: AdvertiseFormData = {
  advertiserType: '',
  purpose: 'venda',
  type: 'casa',
  cep: '',
  city: '',
  neighborhood: '',
  street: '',
  number: '',
  complement: '',
  bedrooms: 2,
  bathrooms: 1,
  parking: 1,
  area: '',
  price: '',
  condoPrice: '',
  iptuPrice: '',
  title: '',
  description: '',
  photos: [],
  name: '',
  email: '',
  phone: '',
  cpfCnpj: '',
  whatsapp: '',
  advertiserAddressOption: 'same',
  advertiserCep: '',
  advertiserCity: '',
  advertiserNeighborhood: '',
  advertiserStreet: '',
  advertiserNumber: '',
  advertiserComplement: '',
  paymentPlan: '',
  paymentMethod: 'pix',
};

import { createClient } from '@/lib/supabase/client';

export default function AdvertisePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth();
  const [hasIdentified, setHasIdentified] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isLoadingAdvertiserCep, setIsLoadingAdvertiserCep] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setHasIdentified(true);
    }
  }, [isAuthenticated]);

  // Form State
  const [formData, setFormData] = useState<AdvertiseFormData>(INITIAL_FORM_DATA);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTypeSelection = (type: AdvertiseFormData['advertiserType']) => {
    setFormData(prev => ({ ...prev, advertiserType: type }));

    if (type === 'imobiliaria') {
      router.push('/cadastro-imobiliaria');
      return;
    }

    if (type === 'proprietario') {
      if (!isAuthenticated) {
        setShowLoginPrompt(true);
        return;
      }
    }

    // Default progression for logged in users or non-proprietario (if any)
    setCurrentStep(curr => curr + 1);
    window.scrollTo(0, 0);
  };

  const fetchAddressByCep = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        let cityKey = '';
        const cityName = data.localidade.toLowerCase();

        // Map API city to our keys
        if (cityName.includes('luís') || cityName.includes('luis')) cityKey = 'sao-luis';
        else if (cityName.includes('paço') || cityName.includes('paco')) cityKey = 'paco-do-lumiar';
        else if (cityName.includes('ribamar')) cityKey = 'sao-jose-de-ribamar';

        return {
          street: data.logradouro,
          city: cityKey,
          neighborhood: data.bairro,
          complement: data.complemento,
        };
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
    return null;
  };

  const handleCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length !== 8) return;

    setIsLoadingCep(true);
    const address = await fetchAddressByCep(cep);
    setIsLoadingCep(false);

    if (address) {
      setFormData(prev => ({
        ...prev,
        street: address.street || prev.street,
        city: address.city || prev.city,
        neighborhood: address.neighborhood || prev.neighborhood, // Might need manual adjustment if not in list
        complement: address.complement || prev.complement,
      }));
    }
  };

  const handleAdvertiserCepBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length !== 8) return;

    setIsLoadingAdvertiserCep(true);
    const address = await fetchAddressByCep(cep);
    setIsLoadingAdvertiserCep(false);

    if (address) {
      setFormData(prev => ({
        ...prev,
        advertiserStreet: address.street || prev.advertiserStreet,
        advertiserCity: address.city || prev.advertiserCity,
        advertiserNeighborhood: address.neighborhood || prev.advertiserNeighborhood,
        advertiserComplement: address.complement || prev.advertiserComplement,
      }));
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;

    setIsUploadingImages(true);
    const supabase = createClient();
    const files = Array.from(e.target.files);
    const newPhotos: string[] = [];

    try {
      for (const file of files) {
        // Validation: Size < 5MB, Type Image
        if (file.size > 5 * 1024 * 1024) {
          alert(`Arquivo ${file.name} é muito grande (máx 5MB).`);
          continue;
        }
        if (!file.type.startsWith('image/')) {
          alert(`Arquivo ${file.name} não é uma imagem.`);
          continue;
        }

        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('properties')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('properties')
          .getPublicUrl(fileName);

        newPhotos.push(publicUrl);
      }

      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newPhotos]
      }));

    } catch (error: any) {
      console.error('Error uploading photos:', error);
      alert('Erro ao fazer upload das imagens.');
    } finally {
      setIsUploadingImages(false);
      // Reset input
      e.target.value = '';
    }
  };

  const removePhoto = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove)
    }));
  };

  const nextStep = () => {
    // Validation for Step 1
    if (currentStep === 1 && !formData.advertiserType) {
      alert('Por favor, selecione uma opção de identificação para continuar.');
      return;
    }

    if (currentStep === 1 && formData.advertiserType === 'imobiliaria') {
      router.push('/cadastro-imobiliaria');
      return;
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(curr => curr + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(curr => curr - 1);
      window.scrollTo(0, 0);
    }
  };

  const resetForm = () => {
    if (window.confirm('Tem certeza que deseja reiniciar o processo? Todos os dados preenchidos serão perdidos.')) {
      setFormData(INITIAL_FORM_DATA);
      setCurrentStep(1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (!user) {
        alert('Você precisa estar logado para anunciar.');
        setIsSubmitting(false);
        return;
      }

      const supabase = createClient();

      const parseCurrency = (val: string) => {
        if (!val) return 0;
        return parseFloat(val.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
      };

      const price = parseCurrency(formData.price);
      const area = parseFloat(formData.area.replace(',', '.')) || 0;

      const { error } = await supabase.from('properties').insert({
        title: formData.title,
        description: formData.description,
        price: price,
        location: `${formData.street}, ${formData.number} - ${formData.neighborhood}, ${formData.city}`,
        bedrooms: formData.bedrooms,
        bathrooms: formData.bathrooms,
        parking: formData.parking,
        area: area,
        type: formData.purpose === 'venda' ? 'Venda' : 'Aluguel',
        category: formData.type,
        features: [], // Can be enhanced to include selected features
        images: formData.photos,
        owner_id: user.id,
        featured: false,
        contact_name: formData.name,
        contact_email: formData.email,
        contact_phone: formData.phone,
        contact_whatsapp: formData.whatsapp,
        status: 'pending' // Default status for new ads
      });

      if (error) {
        console.error('Error creating property:', error);
        alert('Erro ao criar anúncio: ' + error.message);
        setIsSubmitting(false);
        return;
      }

      // Redirect to payment page with selected plan
      const plan = formData.paymentPlan || 'mensal';
      router.push(`/pagamento?plano=${plan}`);

    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Ocorreu um erro inesperado.');
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center max-w-lg">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Anúncio Criado com Sucesso!</h2>
        <p className="text-slate-600 mb-8">
          Seu imóvel foi enviado para análise e em breve estará disponível em nossa plataforma.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/')}
            className="px-6 py-2 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-colors font-medium"
          >
            Voltar ao Início
          </button>
          <button
            onClick={() => {
              setIsSuccess(false);
              setCurrentStep(1);
              setFormData({
                advertiserType: '',
                purpose: 'venda',
                type: 'casa',
                cep: '',
                city: '',
                neighborhood: '',
                street: '',
                number: '',
                complement: '',
                bedrooms: 2,
                bathrooms: 1,
                parking: 1,
                area: '',
                price: '',
                condoPrice: '',
                iptuPrice: '',
                title: '',
                description: '',
                photos: [],
                name: '',
                email: '',
                phone: '',
                cpfCnpj: '',
                whatsapp: '',
                advertiserAddressOption: 'same',
                advertiserCep: '',
                advertiserCity: '',
                advertiserNeighborhood: '',
                advertiserStreet: '',
                advertiserNumber: '',
                advertiserComplement: '',
                paymentPlan: '',
                paymentMethod: 'pix',
              });
            }}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
          >
            Criar Novo Anúncio
          </button>
        </div>
      </div>
    );
  }

  if (showLoginPrompt) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Anuncie seu Imóvel
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Para garantir a segurança e qualidade dos anúncios, precisamos que você se identifique.
            Escolha uma das opções abaixo para continuar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Login Card */}
          <Link href="/minha-conta?redirect=/anunciar" className="group">
            <div className="bg-white p-8 rounded-xl border-2 border-slate-100 hover:border-blue-500 transition-all h-full shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <LogIn className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Já tenho conta</h3>
              <p className="text-slate-600 mb-6">
                Acesse sua conta para gerenciar seus anúncios e visualizar contatos.
              </p>
              <span className="text-blue-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Fazer Login <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>

          {/* Register Card */}
          <Link href="/cadastro?redirect=/anunciar" className="group">
            <div className="bg-white p-8 rounded-xl border-2 border-slate-100 hover:border-green-500 transition-all h-full shadow-sm hover:shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                <UserPlus className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Quero criar conta</h3>
              <p className="text-slate-600 mb-6">
                Cadastre-se gratuitamente para anunciar seus imóveis para milhares de pessoas.
              </p>
              <span className="text-green-600 font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
                Cadastre-se agora <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </div>

        {/* Bypass for demo purposes */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              setShowLoginPrompt(false);
              setCurrentStep(curr => curr + 1);
            }}
            className="text-sm text-slate-500 hover:text-slate-900 underline"
          >
            Continuar sem login (Modo de Teste)
          </button>
        </div>

        {/* Back Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowLoginPrompt(false)}
            className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para identificação
          </button>
        </div>
      </div>
    );
  }


  const neighborhoods = formData.city ? CITY_NEIGHBORHOODS[formData.city as keyof typeof CITY_NEIGHBORHOODS] || [] : [];
  const advertiserNeighborhoods = formData.advertiserCity ? CITY_NEIGHBORHOODS[formData.advertiserCity as keyof typeof CITY_NEIGHBORHOODS] || [] : [];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 overflow-x-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl -z-10 animate-float" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl -z-10 animate-float delay-700" />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-bold text-xl text-slate-900 flex items-center gap-2">
            <span className="p-1.5 bg-blue-600 rounded-lg text-white">
              <Building2 className="w-5 h-5" />
            </span>
            Anunciar Imóvel
          </h1>
          <div className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
            Passo {currentStep} de {STEPS.length}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 relative"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-purple-600 rounded-full shadow-[0_0_10px_rgba(147,51,234,0.5)]" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl relative z-10">
        {/* Steps Indicator */}
        <div className="hidden md:flex justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2" />
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = step.id < currentStep;

            return (
              <div key={step.id} className="flex flex-col items-center gap-2 bg-slate-50 px-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isActive ? 'bg-blue-600 text-white' :
                    isCompleted ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={`text-xs font-semibold ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">

          {/* STEP 1: IDENTIFICATION */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Como você se identifica?</h2>
                <p className="text-slate-500 mt-2">Escolha a opção que melhor descreve seu perfil</p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => handleTypeSelection('proprietario')}
                  className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-4 hover:shadow-md ${formData.advertiserType === 'proprietario'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-blue-300 text-slate-600'
                    }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${formData.advertiserType === 'proprietario' ? 'bg-blue-200' : 'bg-slate-100'
                    }`}>
                    <User className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-1">Proprietário</h3>
                    <p className="text-xs text-slate-500">Sou o dono do imóvel</p>
                  </div>
                </button>

                <button
                  onClick={() => handleTypeSelection('corretor')}
                  className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-4 hover:shadow-md ${formData.advertiserType === 'corretor'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-blue-300 text-slate-600'
                    }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${formData.advertiserType === 'corretor' ? 'bg-blue-200' : 'bg-slate-100'
                    }`}>
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-1">Corretor</h3>
                    <p className="text-xs text-slate-500">Profissional autônomo</p>
                  </div>
                </button>

                <button
                  onClick={() => handleTypeSelection('imobiliaria')}
                  className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-4 hover:shadow-md ${formData.advertiserType === 'imobiliaria'
                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-blue-300 text-slate-600'
                    }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${formData.advertiserType === 'imobiliaria' ? 'bg-blue-200' : 'bg-slate-100'
                    }`}>
                    <Building2 className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-1">Imobiliária</h3>
                    <p className="text-xs text-slate-500">Empresa / Gestão</p>
                  </div>
                </button>
              </div>

              {/* Orientation Box */}
              {formData.advertiserType && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-2">
                  <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-600" />
                    Como funciona para {
                      formData.advertiserType === 'proprietario' ? 'Proprietários' :
                        formData.advertiserType === 'corretor' ? 'Corretores' : 'Imobiliárias'
                    }:
                  </h4>

                  {formData.advertiserType === 'proprietario' && (
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">1</div>
                        <span>Preencha os detalhes do seu imóvel com atenção. Quanto mais informações, melhor.</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">2</div>
                        <span>Adicione fotos de alta qualidade. Imóveis com boas fotos recebem 5x mais visitas.</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">3</div>
                        <span>Escolha um plano de destaque para vender ou alugar mais rápido.</span>
                      </li>
                    </ul>
                  )}

                  {formData.advertiserType === 'corretor' && (
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">1</div>
                        <span>Cadastre os imóveis da sua carteira de forma organizada.</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">2</div>
                        <span>Use seu CRECI na descrição para passar mais credibilidade.</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">3</div>
                        <span>Gerencie seus leads diretamente pelo painel de controle.</span>
                      </li>
                    </ul>
                  )}

                  {formData.advertiserType === 'imobiliaria' && (
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">1</div>
                        <span>Centralize a gestão de todos os imóveis da imobiliária.</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">2</div>
                        <span>Destaque sua marca em todos os anúncios.</span>
                      </li>
                      <li className="flex items-start gap-3 text-slate-600 text-sm">
                        <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">3</div>
                        <span>Acesse relatórios de performance para otimizar suas vendas.</span>
                      </li>
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: TYPE */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">O que você deseja anunciar?</h2>
                <p className="text-slate-500 mt-2">Comece definindo o tipo de negociação</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleInputChange('purpose', 'venda')}
                  className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${formData.purpose === 'venda'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                >
                  <DollarSign className="h-8 w-8" />
                  <span className="font-bold text-lg">Venda</span>
                </button>
                <button
                  onClick={() => handleInputChange('purpose', 'aluguel')}
                  className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-3 ${formData.purpose === 'aluguel'
                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                    }`}
                >
                  <FileText className="h-8 w-8" />
                  <span className="font-bold text-lg">Aluguel</span>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Tipo do Imóvel</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['casa', 'apto', 'comercial', 'terreno'].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleInputChange('type', type)}
                      className={`py-3 px-4 rounded-lg border text-sm font-semibold capitalize transition-all ${formData.type === type
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                    >
                      {type === 'apto' ? 'Apartamento' : type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Onde fica o imóvel?</h2>
                <p className="text-slate-500 mt-2">A localização é fundamental para os interessados</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">CEP</label>
                <div className="grid md:grid-cols-[1fr_auto] gap-4 items-start">
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="00000-000"
                      maxLength={9}
                      value={formData.cep}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '');
                        if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, '$1-$2');
                        handleInputChange('cep', v);
                      }}
                      onBlur={handleCepBlur}
                      className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {isLoadingCep && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                      </div>
                    )}
                  </div>
                  <div className="hidden md:block bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm text-blue-700 max-w-xs">
                    <p className="flex items-start gap-2">
                      <Info className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>Digite o CEP correto para preencher o endereço automaticamente.</span>
                    </p>
                  </div>
                </div>
                {/* Mobile only info box */}
                <div className="md:hidden bg-blue-50 border border-blue-100 p-3 rounded-lg text-sm text-blue-700">
                  <p className="flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Digite o CEP correto para preencher o endereço automaticamente.</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Cidade</label>
                  <select
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Selecione...</option>
                    <option value="sao-luis">São Luís</option>
                    <option value="paco-do-lumiar">Paço do Lumiar</option>
                    <option value="sao-jose-de-ribamar">São José de Ribamar</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Bairro</label>
                  <select
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    disabled={!formData.city}
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    <option value="">Selecione...</option>
                    {neighborhoods.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Endereço</label>
                <input
                  type="text"
                  placeholder="Ex: Rua das Flores"
                  value={formData.street}
                  onChange={(e) => handleInputChange('street', e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Número</label>
                  <input
                    type="text"
                    placeholder="Ex: 123"
                    value={formData.number}
                    onChange={(e) => handleInputChange('number', e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Complemento</label>
                  <input
                    type="text"
                    placeholder="Ex: Apt 101"
                    value={formData.complement}
                    onChange={(e) => handleInputChange('complement', e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DETAILS */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Características</h2>
                <p className="text-slate-500 mt-2">Detalhe os ambientes e espaços do imóvel</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Quartos</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleInputChange('bedrooms', Math.max(0, formData.bedrooms - 1))}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-lg">{formData.bedrooms}</span>
                    <button
                      onClick={() => handleInputChange('bedrooms', formData.bedrooms + 1)}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Banheiros</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleInputChange('bathrooms', Math.max(0, formData.bathrooms - 1))}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-lg">{formData.bathrooms}</span>
                    <button
                      onClick={() => handleInputChange('bathrooms', formData.bathrooms + 1)}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Vagas na Garagem</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleInputChange('parking', Math.max(0, formData.parking - 1))}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-lg">{formData.parking}</span>
                    <button
                      onClick={() => handleInputChange('parking', formData.parking + 1)}
                      className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Área (m²)</label>
                  <input
                    type="number"
                    placeholder="Ex: 80"
                    value={formData.area}
                    onChange={(e) => handleInputChange('area', e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600 text-center font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: VALUES */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Valores e Descrição</h2>
                <p className="text-slate-500 mt-2">Defina o preço e descreva seu imóvel</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Valor de {formData.purpose === 'venda' ? 'Venda' : 'Aluguel'} (R$)
                  </label>
                  <input
                    type="text"
                    placeholder="0,00"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600 font-bold text-lg text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Condomínio (R$)</label>
                  <input
                    type="text"
                    placeholder="0,00"
                    value={formData.condoPrice}
                    onChange={(e) => handleInputChange('condoPrice', e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">IPTU (R$)</label>
                  <input
                    type="text"
                    placeholder="0,00"
                    value={formData.iptuPrice}
                    onChange={(e) => handleInputChange('iptuPrice', e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Título do Anúncio</label>
                <input
                  type="text"
                  placeholder="Ex: Apartamento reformado no Renascença"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Descrição Detalhada</label>
                <textarea
                  rows={5}
                  placeholder="Descreva os pontos fortes do imóvel, acabamentos, localização, etc."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600 resize-none"
                />
              </div>
            </div>
          )}

          {/* STEP 6: PHOTOS */}
          {currentStep === 6 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Fotos do Imóvel</h2>
                <p className="text-slate-500 mt-2">Boas fotos aumentam muito suas chances. A primeira foto será a capa do anúncio.</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Upload Button */}
                <label className={`aspect-square border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors ${isUploadingImages ? 'opacity-50 pointer-events-none' : ''}`}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  {isUploadingImages ? (
                    <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                  ) : (
                    <>
                      <Camera className="h-8 w-8 text-slate-400 mb-2" />
                      <span className="text-sm text-slate-500 font-medium">Adicionar Fotos</span>
                    </>
                  )}
                </label>

                {/* Photo Previews */}
                {formData.photos.map((photo, index) => (
                  <div key={index} className="group relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                    <Image
                      src={photo}
                      alt={`Foto ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => removePhoto(index)}
                        className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                        title="Remover foto"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    {index === 0 && (
                      <div className="absolute top-2 left-2 px-2 py-1 bg-blue-600 text-white text-xs font-bold rounded shadow-sm">
                        Capa
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {formData.photos.length === 0 && (
                <div className="text-center p-8 bg-slate-50 rounded-lg border border-slate-200 text-slate-500">
                  Nenhuma foto selecionada. Adicione pelo menos uma foto para continuar.
                </div>
              )}

              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100 text-blue-800 text-sm">
                <p>💡 Dica: Fotos bem iluminadas e horizontais funcionam melhor.</p>
              </div>
            </div>
          )}

          {/* STEP 7: CONTACT */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Seus Dados</h2>
                <p className="text-slate-500 mt-2">Como os interessados entrarão em contato?</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Nome Completo</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">CPF / CNPJ</label>
                    <input
                      type="text"
                      placeholder="000.000.000-00"
                      value={formData.cpfCnpj}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '');
                        if (v.length > 14) v = v.slice(0, 14);
                        if (v.length > 11) {
                          // CNPJ mask
                          v = v.replace(/^(\d{2})(\d)/, '$1.$2');
                          v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                          v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
                          v = v.replace(/(\d{4})(\d)/, '$1-$2');
                        } else {
                          // CPF mask
                          v = v.replace(/(\d{3})(\d)/, '$1.$2');
                          v = v.replace(/(\d{3})(\d)/, '$1.$2');
                          v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                        }
                        handleInputChange('cpfCnpj', v);
                      }}
                      className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">E-mail</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Telefone</label>
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '');
                        if (v.length > 11) v = v.slice(0, 11);
                        v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
                        v = v.replace(/(\d)(\d{4})$/, '$1-$2');
                        handleInputChange('phone', v);
                      }}
                      className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      value={formData.whatsapp}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, '');
                        if (v.length > 11) v = v.slice(0, 11);
                        v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
                        v = v.replace(/(\d)(\d{4})$/, '$1-$2');
                        handleInputChange('whatsapp', v);
                      }}
                      className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Endereço do Anunciante</h3>

                  <div className="flex gap-6 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="addressOption"
                        checked={formData.advertiserAddressOption === 'same'}
                        onChange={() => handleInputChange('advertiserAddressOption', 'same')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-slate-700">Usar mesmo endereço do imóvel</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="addressOption"
                        checked={formData.advertiserAddressOption === 'different'}
                        onChange={() => handleInputChange('advertiserAddressOption', 'different')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-slate-700">Usar outro endereço</span>
                    </label>
                  </div>

                  {formData.advertiserAddressOption === 'different' && (
                    <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">CEP</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="00000-000"
                            maxLength={9}
                            value={formData.advertiserCep}
                            onChange={(e) => {
                              let v = e.target.value.replace(/\D/g, '');
                              if (v.length > 5) v = v.replace(/^(\d{5})(\d)/, '$1-$2');
                              handleInputChange('advertiserCep', v);
                            }}
                            onBlur={handleAdvertiserCepBlur}
                            className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                          />
                          {isLoadingAdvertiserCep && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                              <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Cidade</label>
                          <select
                            value={formData.advertiserCity}
                            onChange={(e) => handleInputChange('advertiserCity', e.target.value)}
                            className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                          >
                            <option value="">Selecione...</option>
                            <option value="sao-luis">São Luís</option>
                            <option value="paco-do-lumiar">Paço do Lumiar</option>
                            <option value="sao-jose-de-ribamar">São José de Ribamar</option>
                          </select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Bairro</label>
                          <select
                            value={formData.advertiserNeighborhood}
                            onChange={(e) => handleInputChange('advertiserNeighborhood', e.target.value)}
                            disabled={!formData.advertiserCity}
                            className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600 disabled:bg-slate-100 disabled:text-slate-400"
                          >
                            <option value="">Selecione...</option>
                            {advertiserNeighborhoods.map((n) => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Endereço</label>
                        <input
                          type="text"
                          placeholder="Ex: Rua das Flores"
                          value={formData.advertiserStreet}
                          onChange={(e) => handleInputChange('advertiserStreet', e.target.value)}
                          className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Número</label>
                          <input
                            type="text"
                            placeholder="Ex: 123"
                            value={formData.advertiserNumber}
                            onChange={(e) => handleInputChange('advertiserNumber', e.target.value)}
                            className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Complemento</label>
                          <input
                            type="text"
                            placeholder="Ex: Apt 101"
                            value={formData.advertiserComplement}
                            onChange={(e) => handleInputChange('advertiserComplement', e.target.value)}
                            className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3 mt-6">
                <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-sm text-blue-800">
                  Ao publicar, você concorda com nossos Termos de Uso e Política de Privacidade.
                  Seus dados de contato ficarão visíveis para interessados.
                </p>
              </div>
            </div>
          )}

          {/* STEP 8: PAYMENT PLANS */}
          {currentStep === 8 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Escolha o plano ideal</h2>
                <p className="text-slate-500 mt-2">Selecione a melhor opção para anunciar seu imóvel</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                {/* Mensal */}
                <div
                  className={`relative flex flex-col rounded-2xl border-2 transition-all cursor-pointer overflow-hidden group ${formData.paymentPlan === 'mensal'
                    ? 'border-blue-500 shadow-lg ring-1 ring-blue-500'
                    : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  onClick={() => {
                    handleInputChange('paymentPlan', 'mensal');
                    handleInputChange('paymentMethod', 'pix');
                  }}
                >
                  <div className={`p-4 text-center ${formData.paymentPlan === 'mensal' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-900'}`}>
                    <h3 className="font-bold text-lg">Mensal</h3>
                    <div className="mt-1 text-2xl font-bold">R$ 200<span className="text-sm font-normal opacity-80">/mês</span></div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col items-center">
                    <ul className="space-y-3 text-sm text-slate-600 mb-6 text-center">
                      <li className="flex items-center gap-2 justify-center">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        Renovação mensal
                      </li>
                      <li className="flex items-center gap-2 justify-center">
                        <CheckCircle2 className="w-4 h-4 text-blue-500" />
                        Sem fidelidade
                      </li>
                    </ul>

                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-auto ${formData.paymentPlan === 'mensal' ? 'border-blue-600' : 'border-slate-300'
                      }`}>
                      {formData.paymentPlan === 'mensal' && <div className="w-3 h-3 bg-blue-600 rounded-full" />}
                    </div>
                  </div>
                </div>

                {/* Trimestral */}
                <div
                  className={`relative flex flex-col rounded-2xl border-2 transition-all cursor-pointer overflow-hidden group ${formData.paymentPlan === 'trimestral'
                    ? 'border-teal-500 shadow-lg ring-1 ring-teal-500'
                    : 'border-slate-200 hover:border-teal-300 hover:shadow-md'
                    }`}
                  onClick={() => handleInputChange('paymentPlan', 'trimestral')}
                >
                  <div className="absolute top-0 right-0 bg-teal-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                    ECONOMIA
                  </div>
                  <div className={`p-4 text-center ${formData.paymentPlan === 'trimestral' ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-900'}`}>
                    <h3 className="font-bold text-lg">Trimestral</h3>
                    <div className="mt-1 text-2xl font-bold">R$ 300,00</div>
                    <div className="text-sm font-medium opacity-90">ou 3x R$ 120,00</div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs text-center text-slate-500 mb-4">Plano econômico</p>

                    {formData.paymentPlan === 'trimestral' ? (
                      <div className="space-y-3 animate-in fade-in slide-in-from-top-2 text-sm">
                        <label className="flex items-center gap-2 p-2 rounded bg-teal-50 border border-teal-100 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'pix'}
                            onChange={() => handleInputChange('paymentMethod', 'pix')}
                            className="w-3 h-3 text-teal-600"
                          />
                          <span className="text-teal-900">R$ 300,00 (à vista)</span>
                        </label>
                        <label className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200 cursor-pointer hover:border-teal-200">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'installments'}
                            onChange={() => handleInputChange('paymentMethod', 'installments')}
                            className="w-3 h-3 text-teal-600"
                          />
                          <span className="text-slate-700">3x R$ 120,00</span>
                        </label>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-end">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentPlan === 'trimestral' ? 'border-teal-600' : 'border-slate-300'
                          }`}>
                          {formData.paymentPlan === 'trimestral' && <div className="w-3 h-3 bg-teal-600 rounded-full" />}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Semestral */}
                <div
                  className={`relative flex flex-col rounded-2xl border-2 transition-all cursor-pointer overflow-hidden group ${formData.paymentPlan === 'semestral'
                    ? 'border-orange-500 shadow-lg ring-1 ring-orange-500'
                    : 'border-slate-200 hover:border-orange-300 hover:shadow-md'
                    }`}
                  onClick={() => handleInputChange('paymentPlan', 'semestral')}
                >
                  <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10">
                    MELHOR VALOR
                  </div>
                  <div className={`p-4 text-center ${formData.paymentPlan === 'semestral' ? 'bg-orange-600 text-white' : 'bg-slate-50 text-slate-900'}`}>
                    <h3 className="font-bold text-lg">Semestral</h3>
                    <div className="mt-1 text-2xl font-bold">R$ 600,00</div>
                    <div className="text-sm font-medium opacity-90">ou 6x R$ 110,00</div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs text-center text-slate-500 mb-4">Melhor custo-benefício</p>

                    {formData.paymentPlan === 'semestral' ? (
                      <div className="space-y-3 animate-in fade-in slide-in-from-top-2 text-sm">
                        <label className="flex items-center gap-2 p-2 rounded bg-orange-50 border border-orange-100 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'pix'}
                            onChange={() => handleInputChange('paymentMethod', 'pix')}
                            className="w-3 h-3 text-orange-600"
                          />
                          <span className="text-orange-900">R$ 600,00 (à vista)</span>
                        </label>
                        <label className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200 cursor-pointer hover:border-orange-200">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'installments'}
                            onChange={() => handleInputChange('paymentMethod', 'installments')}
                            className="w-3 h-3 text-orange-600"
                          />
                          <span className="text-slate-700">6x R$ 110,00</span>
                        </label>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-end">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentPlan === 'semestral' ? 'border-orange-600' : 'border-slate-300'
                          }`}>
                          {formData.paymentPlan === 'semestral' && <div className="w-3 h-3 bg-orange-600 rounded-full" />}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Até Vender */}
                <div
                  className={`relative flex flex-col rounded-2xl border-2 transition-all cursor-pointer overflow-hidden group ${formData.paymentPlan === 'ate_vender'
                    ? 'border-purple-600 shadow-xl ring-1 ring-purple-600 scale-105 z-10'
                    : 'border-slate-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                  onClick={() => handleInputChange('paymentPlan', 'ate_vender')}
                >
                  <div className="absolute top-0 inset-x-0 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold py-1 text-center z-10">
                    MAIS VENDIDO
                  </div>
                  <div className={`p-4 pt-8 text-center ${formData.paymentPlan === 'ate_vender' ? 'bg-purple-50 text-purple-900' : 'bg-slate-50 text-slate-900'}`}>
                    <h3 className="font-bold text-lg">Até Vender</h3>
                    <div className="mt-1 text-2xl font-bold">R$ 1.000,00</div>
                    <div className="text-sm font-medium opacity-90">ou 10x R$ 110,00</div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs text-center text-slate-500 mb-4">Pagamento único, sem renovações</p>

                    {formData.paymentPlan === 'ate_vender' ? (
                      <div className="space-y-3 animate-in fade-in slide-in-from-top-2 text-sm">
                        <label className="flex items-center gap-2 p-2 rounded bg-purple-50 border border-purple-100 cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'pix'}
                            onChange={() => handleInputChange('paymentMethod', 'pix')}
                            className="w-3 h-3 text-purple-600"
                          />
                          <span className="text-purple-900">R$ 1.000,00 (à vista)</span>
                        </label>
                        <label className="flex items-center gap-2 p-2 rounded bg-white border border-slate-200 cursor-pointer hover:border-purple-200">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={formData.paymentMethod === 'installments'}
                            onChange={() => handleInputChange('paymentMethod', 'installments')}
                            className="w-3 h-3 text-purple-600"
                          />
                          <span className="text-slate-700">10x R$ 110,00</span>
                        </label>
                      </div>
                    ) : (
                      <div className="flex-1 flex flex-col items-center justify-end">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.paymentPlan === 'ate_vender' ? 'border-purple-600' : 'border-slate-300'
                          }`}>
                          {formData.paymentPlan === 'ate_vender' && <div className="w-3 h-3 bg-purple-600 rounded-full" />}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t">
            <div className="flex items-center gap-4">
              <button
                onClick={prevStep}
                disabled={currentStep === 1 || isSubmitting}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors ${currentStep === 1
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-100'
                  }`}
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </button>

              {currentStep > 1 && (
                <button
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="px-4 py-3 text-slate-400 hover:text-red-600 font-medium transition-colors text-sm"
                >
                  Reiniciar
                </button>
              )}
            </div>

            <button
              onClick={nextStep}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : currentStep === STEPS.length ? (
                'Publicar Anúncio'
              ) : (
                <>
                  Próximo
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

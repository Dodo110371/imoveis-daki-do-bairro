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
  CreditCard
} from 'lucide-react';
import { CITY_NEIGHBORHOODS } from '@/lib/constants';

// Step definitions
const STEPS = [
  { id: 1, title: 'Tipo de Imóvel', icon: Home },
  { id: 2, title: 'Localização', icon: MapPin },
  { id: 3, title: 'Detalhes', icon: Building2 },
  { id: 4, title: 'Valores', icon: DollarSign },
  { id: 5, title: 'Fotos', icon: Camera },
  { id: 6, title: 'Contato', icon: User },
  { id: 7, title: 'Planos', icon: CreditCard },
];

interface AdvertiseFormData {
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

export default function AdvertisePage() {
  const router = useRouter();
  const [hasIdentified, setHasIdentified] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isLoadingAdvertiserCep, setIsLoadingAdvertiserCep] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState<AdvertiseFormData>({
    // Step 1: Type
    purpose: 'venda', // venda | aluguel
    type: 'casa', // casa | apto | comercial | terreno

    // Step 2: Location
    cep: '',
    city: '',
    neighborhood: '',
    street: '',
    number: '',
    complement: '',

    // Step 3: Details
    bedrooms: 2,
    bathrooms: 1,
    parking: 1,
    area: '',

    // Step 4: Values & Description
    price: '',
    condoPrice: '',
    iptuPrice: '',
    title: '',
    description: '',

    // Step 5: Photos (Mock)
    photos: [] as string[],

    // Step 6: Contact
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

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const nextStep = () => {
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo(0, 0);
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

  if (!hasIdentified) {
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
          <Link href="/minha-conta" className="group">
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
          <Link href="/cadastro" className="group">
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
            onClick={() => setHasIdentified(true)}
            className="text-sm text-slate-500 hover:text-slate-900 underline"
          >
            Continuar sem login (Modo de Teste)
          </button>
        </div>
      </div>
    );
  }

  const neighborhoods = formData.city ? CITY_NEIGHBORHOODS[formData.city as keyof typeof CITY_NEIGHBORHOODS] || [] : [];
  const advertiserNeighborhoods = formData.advertiserCity ? CITY_NEIGHBORHOODS[formData.advertiserCity as keyof typeof CITY_NEIGHBORHOODS] || [] : [];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-bold text-xl text-slate-900">Anunciar Imóvel</h1>
          <div className="text-sm text-slate-500 font-medium">
            Passo {currentStep} de {STEPS.length}
          </div>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-100">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
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

          {/* STEP 1: TYPE */}
          {currentStep === 1 && (
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

          {/* STEP 2: LOCATION */}
          {currentStep === 2 && (
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

          {/* STEP 3: DETAILS */}
          {currentStep === 3 && (
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

          {/* STEP 4: VALUES */}
          {currentStep === 4 && (
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

          {/* STEP 5: PHOTOS (MOCK) */}
          {currentStep === 5 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Fotos do Imóvel</h2>
                <p className="text-slate-500 mt-2">Boas fotos aumentam muito suas chances</p>
              </div>

              <div className="border-2 border-dashed border-slate-300 rounded-xl p-12 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer group">
                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Camera className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 text-lg mb-1">Clique para adicionar fotos</h3>
                <p className="text-slate-500 text-sm">ou arraste e solte seus arquivos aqui</p>
                <p className="text-xs text-slate-400 mt-4">Formatos aceitos: JPG, PNG (Max 5MB)</p>
              </div>

              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100 text-yellow-800 text-sm">
                <p>⚠️ Para este protótipo, o upload de imagens é apenas ilustrativo.</p>
              </div>
            </div>
          )}

          {/* STEP 6: CONTACT */}
          {currentStep === 6 && (
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

          {/* STEP 7: PAYMENT PLANS */}
          {currentStep === 7 && (
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
                    <div className="mt-1 text-2xl font-bold">R$ 300<span className="text-sm font-normal opacity-80">/total</span></div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs text-center text-slate-500 mb-4">Equivalente a R$ 100/mês</p>
                    
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
                          <span className="text-teal-900">À vista (Pix)</span>
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
                    <div className="mt-1 text-2xl font-bold">R$ 600<span className="text-sm font-normal opacity-80">/total</span></div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-xs text-center text-slate-500 mb-4">Equivalente a R$ 100/mês</p>

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
                          <span className="text-orange-900">À vista (Pix)</span>
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
                    <div className="mt-1 text-2xl font-bold">R$ 1.000<span className="text-sm font-normal opacity-80">/único</span></div>
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
                          <span className="text-purple-900">À vista (Pix)</span>
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

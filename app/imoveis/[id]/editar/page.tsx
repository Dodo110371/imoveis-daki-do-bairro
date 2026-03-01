'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
  Info,
  Trash2,
  Check,
  Video
} from 'lucide-react';
import Image from 'next/image';
import { CITY_NEIGHBORHOODS } from '@/lib/constants';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import { formatCurrencyInput, parseCurrency } from '@/lib/utils';

// Step definitions - Removing "Planos" step for editing
const STEPS = [
  { id: 1, title: 'Tipo de Imóvel', icon: Home },
  { id: 2, title: 'Localização', icon: MapPin },
  { id: 3, title: 'Detalhes', icon: Building2 },
  { id: 4, title: 'Características', icon: Check },
  { id: 5, title: 'Valores', icon: DollarSign },
  { id: 6, title: 'Fotos', icon: Camera },
  { id: 7, title: 'Contato', icon: User },
];

const FEATURES_OPTIONS = [
  'Academia',
  'Aceita Animais',
  'Acessibilidade',
  'Ar Condicionado',
  'Área de Serviço',
  'Armário Embutido',
  'Armário na Cozinha',
  'Churrasqueira',
  'Cinema',
  'Closet',
  'Cozinha Americana',
  'Depósito',
  'Elevador',
  'Escritório',
  'Espaço Gourmet',
  'Garagem',
  'Gás Encanado',
  'Interfone',
  'Jardim',
  'Lareira',
  'Lavanderia',
  'Mobiliado',
  'Piscina',
  'Playground',
  'Portaria 24h',
  'Quadra Poliesportiva',
  'Quintal',
  'Salão de Festas',
  'Salão de Jogos',
  'Sauna',
  'Varanda',
  'Varanda Gourmet',
  'Vista para o Mar'
];

interface AdvertiseFormData {
  purpose: string;
  type: string;
  cep: string;
  city: string;
  state: string;
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
  features: string[];
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
  videoUrl?: string;
}

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth();

  const [isLoadingData, setIsLoadingData] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [isLoadingAdvertiserCep, setIsLoadingAdvertiserCep] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoInputType, setVideoInputType] = useState<'link' | 'upload'>('link');

  // Form State
  const [formData, setFormData] = useState<AdvertiseFormData>({
    purpose: 'venda',
    type: 'casa',
    cep: '',
    city: '',
    state: '',
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
    features: [],
    photos: [] as string[],
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

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      if (!params.id || !user) return;

      try {
        const supabase = createClient();
        const { data: property, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', params.id)
          .single();

        if (error) throw error;

        if (property.owner_id !== user.id) {
          alert('Você não tem permissão para editar este imóvel.');
          router.push('/minha-conta');
          return;
        }

        // Map database fields to form state
        // Parsing location string to extract address parts might be tricky if not stored separately.
        // Assuming location is stored as "Street, Number - Neighborhood, City"
        // If stored separately in DB columns, great. If not, we do best effort parsing.
        // Wait, the INSERT in AdvertisePage does: location: `${formData.street}, ${formData.number} - ${formData.neighborhood}, ${formData.city}`
        // This is lossy. Ideally we should have separate columns.
        // However, I see only one location column in the INSERT.
        // Let's check if we can parse it back or if we should just let user re-enter if parsing fails.
        // Actually, for editing, if we can't parse perfectly, it's better to leave blank or put the whole string in street?
        // Let's try to parse: "Rua X, 123 - Bairro Y, Cidade Z"

        let street = property.street || '';
        let number = property.number || '';
        let neighborhood = property.neighborhood || '';
        let city = property.city || '';
        let state = property.state || 'MA';
        let complement = property.complement || '';
        let cep = property.cep || '';

        // Fallback to location parsing if new fields are empty but location exists
        if ((!street || !city) && property.location) {
          const parts = property.location.split(' - ');
          if (parts.length >= 2) {
            const addressPart = parts[0]; // "Rua X, 123"
            const locPart = parts[1]; // "Bairro Y, Cidade Z"

            const addressSplit = addressPart.split(', ');
            if (addressSplit.length >= 2) {
              if (!number) number = addressSplit.pop() || '';
              if (!street) street = addressSplit.join(', ');
            } else {
              if (!street) street = addressPart;
            }

            const locSplit = locPart.split(', ');
            if (locSplit.length >= 2) {
              if (!city) city = locSplit.pop() || '';
              if (!neighborhood) neighborhood = locSplit.join(', ');
            } else {
              if (!neighborhood) neighborhood = locPart;
            }
          }
        }

        // Clean up city key for select
        let cityKey = city; // Default to raw city if no match logic applied yet
        const cityName = city.toLowerCase().trim();
        if (cityName.includes('luís') || cityName.includes('luis')) cityKey = 'sao-luis';
        else if (cityName.includes('paço') || cityName.includes('paco')) cityKey = 'paco-do-lumiar';
        else if (cityName.includes('ribamar')) cityKey = 'sao-jose-de-ribamar';

        setFormData(prev => ({
          ...prev,
          purpose: property.type === 'Aluguel' ? 'aluguel' : 'venda',
          type: property.category || 'casa', // Use category if available, default to casa

          title: property.title || '',
          description: property.description || '',
          price: property.price ? property.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '',
          condoPrice: property.condo_price ? property.condo_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '',
          iptuPrice: property.iptu_price ? property.iptu_price.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '',
          bedrooms: property.bedrooms || 0,
          bathrooms: property.bathrooms || 0,
          parking: property.parking || 0,
          area: property.area?.toString() || '',
          features: property.features || [],
          photos: property.images || [],
          cep,
          street,
          number,
          complement,
          neighborhood,
          city: cityKey,
          state,
          // Contact info
          // Contact info
          // Fix: use user.name instead of user.user_metadata.name to match User type
          name: property.contact_name || user.name || '',
          email: property.contact_email || user.email || '',
          phone: property.contact_phone || '',
          whatsapp: property.contact_whatsapp || '',
          videoUrl: property.video_url || '',
        }));

      } catch (error) {
        console.error('Error fetching property:', error);
        alert('Erro ao carregar dados do imóvel.');
        router.push('/minha-conta');
      } finally {
        setIsLoadingData(false);
      }
    };

    if (isAuthenticated && user) {
      fetchProperty();
    } else if (!isAuthLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isAuthLoading, user, params.id, router]);

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
        neighborhood: address.neighborhood || prev.neighborhood,
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
      e.target.value = '';
    }
  };

  const removePhoto = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !user) return;

    setIsUploadingVideo(true);
    const supabase = createClient();
    const file = e.target.files[0];

    try {
      if (file.size > 100 * 1024 * 1024) {
        alert(`O arquivo ${file.name} é muito grande. O limite é de 100MB.`);
        return;
      }
      if (!file.type.startsWith('video/')) {
        alert(`O arquivo ${file.name} não é um vídeo válido.`);
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}-video.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('properties')
        .upload(fileName, file, {
          upsert: false,
          contentType: file.type
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('properties')
        .getPublicUrl(fileName);

      setFormData(prev => ({
        ...prev,
        videoUrl: publicUrl
      }));

    } catch (error: any) {
      console.error('Error uploading video:', error);
      if (error.statusCode === '403' || error.message?.includes('policy') || error.message?.includes('permission')) {
        alert('Erro de permissão: Você não tem autorização para fazer upload de vídeo.');
      } else if (error.statusCode === '413' || error.message?.includes('too large')) {
        alert('O arquivo é muito grande. O limite é de 100MB.');
      } else {
        alert('Erro ao fazer upload do vídeo. Tente novamente.');
      }
    } finally {
      setIsUploadingVideo(false);
      if (e.target) e.target.value = '';
    }
  };

  const removeVideo = () => {
    setFormData(prev => ({
      ...prev,
      videoUrl: ''
    }));
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

    try {
      if (!user) {
        alert('Você precisa estar logado para editar.');
        setIsSubmitting(false);
        return;
      }

      const supabase = createClient();

      const price = parseCurrency(formData.price);
      const area = parseFloat(formData.area.replace(',', '.')) || 0;

      const { error } = await supabase
        .from('properties')
        .update({
          title: formData.title,
          description: formData.description,
          price: price,
          condo_price: parseCurrency(formData.condoPrice),
          iptu_price: parseCurrency(formData.iptuPrice),
          location: `${formData.street}, ${formData.number} - ${formData.neighborhood}, ${formData.city}`,
          cep: formData.cep,
          street: formData.street,
          number: formData.number,
          complement: formData.complement,
          neighborhood: formData.neighborhood,
          city: formData.city,
          state: formData.state || 'MA',
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          parking: formData.parking,
          area: area,
          features: formData.features,
          // Keeping existing logic for type/purpose
          type: formData.purpose === 'venda' ? 'Venda' : 'Aluguel',
          category: formData.type,
          images: formData.photos,
          contact_name: formData.name,
          contact_email: formData.email,
          contact_phone: formData.phone,
          contact_whatsapp: formData.whatsapp,
          video_url: formData.videoUrl,
          status: 'pending' // Reset status to pending for moderation
        })
        .eq('id', params.id);

      if (error) {
        console.error('Error updating property:', error);
        alert('Erro ao atualizar anúncio: ' + error.message);
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);

    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Ocorreu um erro inesperado.');
      setIsSubmitting(false);
    }
  };

  if (isLoadingData || isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center max-w-lg">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Anúncio Atualizado!</h2>
        <p className="text-slate-600 mb-8">
          As alterações foram salvas e seu imóvel está pendente de aprovação novamente.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => router.push('/minha-conta')}
            className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
          >
            Voltar para Meus Anúncios
          </button>
        </div>
      </div>
    );
  }

  const neighborhoods = formData.city ? CITY_NEIGHBORHOODS[formData.city as keyof typeof CITY_NEIGHBORHOODS] || [] : [];

  return (
    <div className="min-h-screen bg-slate-50 pb-20 overflow-x-hidden relative">
      <div className="absolute inset-0 bg-grid-slate-900/[0.04] pointer-events-none" />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="font-bold text-xl text-slate-900 flex items-center gap-2">
            <span className="p-1.5 bg-blue-600 rounded-lg text-white">
              <Building2 className="w-5 h-5" />
            </span>
            Editar Anúncio
          </h1>
          <div className="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full">
            Passo {currentStep} de {STEPS.length}
          </div>
        </div>
        <div className="w-full h-1 bg-slate-100">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 relative"
            style={{ width: `${(currentStep / STEPS.length) * 100}%` }}
          />
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
          {/* STEP 1: TYPE */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Tipo de Negociação</h2>
                <p className="text-slate-500 mt-2">Atualize o tipo de negociação se necessário</p>
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
                <h2 className="text-2xl font-bold text-slate-900">Localização</h2>
                <p className="text-slate-500 mt-2">Atualize o endereço se necessário</p>
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
                <p className="text-slate-500 mt-2">Atualize os detalhes do imóvel</p>
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
                  <label className="text-sm font-medium text-slate-700">Vagas</label>
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

          {/* STEP 4: FEATURES */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Características</h2>
                <p className="text-slate-500 mt-2">Selecione as características do imóvel</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {FEATURES_OPTIONS.map((feature) => (
                  <label
                    key={feature}
                    className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all ${formData.features.includes(feature)
                      ? 'bg-blue-50 border-blue-200 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.features.includes(feature)
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-slate-300 bg-white'
                        }`}
                    >
                      {formData.features.includes(feature) && (
                        <Check className="w-3.5 h-3.5 text-white" />
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={formData.features.includes(feature)}
                      onChange={() => {
                        setFormData((prev) => {
                          const newFeatures = prev.features.includes(feature)
                            ? prev.features.filter((f) => f !== feature)
                            : [...prev.features, feature];
                          return { ...prev, features: newFeatures };
                        });
                      }}
                    />
                    <span className={`text-sm font-medium ${formData.features.includes(feature) ? 'text-blue-700' : 'text-slate-600'
                      }`}>
                      {feature}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: VALUES */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Valores e Descrição</h2>
                <p className="text-slate-500 mt-2">Atualize o preço e a descrição</p>
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
                    onChange={(e) => handleInputChange('price', formatCurrencyInput(e.target.value))}
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600 font-bold text-lg text-slate-900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Condomínio (R$)</label>
                  <input
                    type="text"
                    placeholder="0,00"
                    value={formData.condoPrice}
                    onChange={(e) => handleInputChange('condoPrice', formatCurrencyInput(e.target.value))}
                    className="w-full p-3 rounded-lg border border-slate-300 outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">IPTU (R$)</label>
                  <input
                    type="text"
                    placeholder="0,00"
                    value={formData.iptuPrice}
                    onChange={(e) => handleInputChange('iptuPrice', formatCurrencyInput(e.target.value))}
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
                <p className="text-slate-500 mt-2">Gerencie as fotos do seu anúncio</p>
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

              <div className="mt-8 border-t border-slate-200 pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                    <Video className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Vídeo do Imóvel</h3>
                    <p className="text-sm text-slate-500">Adicione um vídeo para aumentar a visibilidade do seu anúncio</p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  {/* Tabs */}
                  <div className="flex gap-4 mb-6 border-b border-slate-200">
                    <button
                      type="button"
                      onClick={() => setVideoInputType('link')}
                      className={`pb-2 px-1 text-sm font-medium transition-colors relative ${videoInputType === 'link'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                      Link Externo (YouTube/Vimeo)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVideoInputType('upload')}
                      className={`pb-2 px-1 text-sm font-medium transition-colors relative ${videoInputType === 'upload'
                          ? 'text-blue-600 border-b-2 border-blue-600'
                          : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                      Upload de Arquivo
                    </button>
                  </div>

                  {videoInputType === 'link' ? (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Link do Vídeo
                      </label>
                      <div className="relative">
                        <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="url"
                          value={formData.videoUrl || ''}
                          onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                          placeholder="https://www.youtube.com/watch?v=..."
                          className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Upload de Vídeo (MP4, WebM)
                      </label>

                      <div className="w-full">
                        <label className={`w-full h-32 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-slate-100 transition-colors ${isUploadingVideo ? 'opacity-50 pointer-events-none' : ''}`}>
                          <input
                            type="file"
                            accept="video/mp4,video/webm,video/ogg"
                            onChange={handleVideoUpload}
                            className="hidden"
                          />
                          {isUploadingVideo ? (
                            <div className="flex flex-col items-center">
                              <Loader2 className="h-8 w-8 text-blue-600 animate-spin mb-2" />
                              <span className="text-sm text-slate-500">Enviando vídeo... (isso pode demorar)</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <Video className="h-8 w-8 text-slate-400 mb-2" />
                              <span className="text-sm text-slate-500 font-medium">Clique para selecionar o vídeo</span>
                              <span className="text-xs text-slate-400 mt-1">MP4, WebM (Máx. 100MB)</span>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Preview / Remove Button */}
                  {formData.videoUrl && (
                    <div className="mt-4 p-4 bg-white rounded-lg border border-slate-200 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-blue-100 rounded text-blue-600 shrink-0">
                          <Video className="h-5 w-5" />
                        </div>
                        <span className="text-sm text-slate-600 truncate max-w-[200px] md:max-w-md">{formData.videoUrl}</span>
                      </div>
                      <button
                        onClick={removeVideo}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Remover vídeo"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )}

                  <div className="mt-4 flex flex-col md:flex-row gap-4 text-sm text-slate-600">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Duração recomendada: 1 a 3 minutos</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Formato horizontal (16:9)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>Mostre todos os ambientes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 7: CONTACT */}
          {currentStep === 7 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Seus Dados</h2>
                <p className="text-slate-500 mt-2">Atualize seus dados de contato se necessário</p>
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
                          v = v.replace(/^(\d{2})(\d)/, '$1.$2');
                          v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                          v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
                          v = v.replace(/(\d{4})(\d)/, '$1-$2');
                        } else {
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
                  Salvando...
                </>
              ) : currentStep === STEPS.length ? (
                'Salvar Alterações'
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

export interface Realtor {
  id: string;
  name: string;
  creci: string;
  photo: string;
  phone: string;
  email: string;
  bio: string;
  regions: string[];
  propertiesCount: number;
  whatsapp?: string;
}

export const MOCK_REALTORS: Realtor[] = [
  {
    id: '1',
    name: 'Ana Silva',
    creci: '12345-F',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
    phone: '(11) 99999-1111',
    email: 'ana.silva@email.com',
    bio: 'Especialista em imóveis residenciais na zona sul, com mais de 10 anos de experiência no mercado. Foco em atendimento personalizado e transparente.',
    regions: ['Zona Sul', 'Centro'],
    propertiesCount: 12,
    whatsapp: '5511999991111'
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    creci: '23456-F',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop',
    phone: '(11) 98888-2222',
    email: 'carlos.mendes@email.com',
    bio: 'Corretor focado em imóveis comerciais e oportunidades de investimento. Consultoria completa para quem busca rentabilidade.',
    regions: ['Centro', 'Zona Oeste'],
    propertiesCount: 8,
    whatsapp: '5511988882222'
  },
  {
    id: '3',
    name: 'Mariana Costa',
    creci: '34567-F',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
    phone: '(11) 97777-3333',
    email: 'mariana.costa@email.com',
    bio: 'Apaixonada por encontrar o lar perfeito para famílias. Atendimento dedicado e acompanhamento em todas as etapas da compra.',
    regions: ['Zona Norte', 'Zona Leste'],
    propertiesCount: 15,
    whatsapp: '5511977773333'
  },
  {
    id: '4',
    name: 'Roberto Oliveira',
    creci: '45678-F',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=600&auto=format&fit=crop',
    phone: '(11) 96666-4444',
    email: 'roberto.oliveira@email.com',
    bio: 'Experiência em lançamentos e imóveis de alto padrão. Consultoria jurídica e financeira para garantir o melhor negócio.',
    regions: ['Zona Sul', 'Zona Oeste'],
    propertiesCount: 20,
    whatsapp: '5511966664444'
  },
  {
    id: '5',
    name: 'Fernanda Lima',
    creci: '56789-F',
    photo: 'https://images.unsplash.com/photo-1598550874175-4d7112ee7f1e?q=80&w=600&auto=format&fit=crop',
    phone: '(11) 95555-5555',
    email: 'fernanda.lima@email.com',
    bio: 'Foco em primeiro imóvel e programas de financiamento habitacional. Vamos realizar o sonho da casa própria juntos!',
    regions: ['Zona Leste', 'Centro'],
    propertiesCount: 10,
    whatsapp: '5511955555555'
  },
  {
    id: '6',
    name: 'Ricardo Santos',
    creci: '67890-F',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop',
    phone: '(11) 94444-6666',
    email: 'ricardo.santos@email.com',
    bio: 'Corretor avaliador. Perito em avaliação de imóveis urbanos e rurais. Laudos técnicos e pareceres de mercado.',
    regions: ['Todas as Regiões'],
    propertiesCount: 5,
    whatsapp: '5511944446666'
  }
];

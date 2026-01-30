export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  type: 'Venda' | 'Aluguel';
  description: string;
  features: string[];
  agencyId: number;
}

export const PROPERTIES: Property[] = [
  {
    id: "1",
    title: "Apartamento com Vista para o Parque",
    price: "R$ 850.000",
    location: "Rua das Flores, 123",
    bedrooms: 3,
    bathrooms: 2,
    area: 98,
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    type: "Venda",
    description: "Excelente apartamento com vista definitiva para o parque. Acabamento de alto padrão, varanda gourmet e condomínio com lazer completo. Localização privilegiada próxima a escolas e supermercados.",
    features: ["Varanda Gourmet", "Vista Panorâmica", "Piscina", "Academia", "2 Vagas"],
    agencyId: 1
  },
  {
    id: "2",
    title: "Casa Charmosa em Vila Fechada",
    price: "R$ 1.200.000",
    location: "Travessa do Sol, 45",
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800",
    type: "Venda",
    description: "Casa única em vila fechada com segurança 24h. Arquitetura moderna com toques rústicos, amplo jardim e área de churrasqueira privativa. Perfeito para famílias que buscam tranquilidade.",
    features: ["Vila Fechada", "Jardim", "Churrasqueira", "Lareira", "Escritório"],
    agencyId: 2
  },
  {
    id: "3",
    title: "Studio Moderno Perto do Metrô",
    price: "R$ 3.500/mês",
    location: "Av. Principal, 500",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    type: "Aluguel",
    description: "Studio mobiliado e decorado, pronto para morar. Prédio novo com coworking, lavanderia e rooftop. A apenas 5 minutos a pé da estação de metrô.",
    features: ["Mobiliado", "Próximo ao Metrô", "Coworking", "Lavanderia", "Rooftop"],
    agencyId: 3
  },
  {
    id: "4",
    title: "Cobertura Duplex com Piscina",
    price: "R$ 2.100.000",
    location: "Rua dos Nobres, 77",
    bedrooms: 4,
    bathrooms: 4,
    area: 250,
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
    type: "Venda",
    description: "Espetacular cobertura duplex com vista mar. Área de lazer privativa com piscina e churrasqueira. Acabamento de luxo em todos os ambientes.",
    features: ["Vista Mar", "Piscina Privativa", "Duplex", "4 Vagas", "Depósito"],
    agencyId: 1
  },
  {
    id: "5",
    title: "Apartamento Compacto no Centro",
    price: "R$ 1.800/mês",
    location: "Rua do Comércio, 320",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
    type: "Aluguel",
    description: "Praticidade e economia no coração da cidade. Próximo a todo tipo de comércio e serviço. Ideal para estudantes e solteiros.",
    features: ["Centro", "Portaria 24h", "Elevador", "Perto de Tudo"],
    agencyId: 2
  },
  {
    id: "6",
    title: "Casa de Condomínio com 5 Suítes",
    price: "R$ 3.200.000",
    location: "Alameda das Palmeiras, 10",
    bedrooms: 5,
    bathrooms: 6,
    area: 420,
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    type: "Venda",
    description: "Mansão em condomínio de luxo. Amplo terreno, área gourmet completa, piscina aquecida e cinema privativo. Segurança armada e clube exclusivo.",
    features: ["Alto Padrão", "Cinema", "Piscina Aquecida", "Segurança Armada", "Clube"],
    agencyId: 4
  }
];

export function getPropertyById(id: string): Property | undefined {
  return PROPERTIES.find(p => p.id === id);
}

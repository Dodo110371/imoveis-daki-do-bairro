export interface Agency {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  propertiesCount: number;
  logo: string;
  creci: string;
}

export const AGENCIES: Agency[] = [
  {
    id: 1,
    name: "Imobiliária Central do Bairro",
    address: "Av. Principal, 1234 - Centro Comercial",
    phone: "(11) 99999-1234",
    email: "contato@centraldobairro.com.br",
    description: "Há 20 anos realizando sonhos no bairro. Especialistas em imóveis residenciais e comerciais de alto padrão. Nossa equipe jurídica garante total segurança na sua negociação.",
    propertiesCount: 45,
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=200",
    creci: "12.345-J"
  },
  {
    id: 2,
    name: "Novo Lar Imóveis",
    address: "Rua das Flores, 567 - Sala 12",
    phone: "(11) 98888-5678",
    email: "atendimento@novolar.com.br",
    description: "Uma nova forma de morar. Focados em apartamentos compactos e studios modernos. Agilidade e tecnologia para quem não tem tempo a perder.",
    propertiesCount: 32,
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=200",
    creci: "23.456-J"
  },
  {
    id: 3,
    name: "Bairro Nobre Consultoria",
    address: "Praça da Matriz, 89 - Térreo",
    phone: "(11) 97777-9012",
    email: "consultoria@bairronobre.com.br",
    description: "Consultoria personalizada para investimentos imobiliários. Encontre as melhores oportunidades de valorização na região.",
    propertiesCount: 28,
    logo: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&q=80&w=200",
    creci: "34.567-J"
  },
  {
    id: 4,
    name: "Exclusiva Imóveis",
    address: "Av. dos Estados, 200 - Loja 4",
    phone: "(11) 96666-3456",
    email: "contato@exclusivaimoveis.com",
    description: "Imóveis exclusivos que você só encontra aqui. Atendimento VIP e sigilo absoluto para clientes exigentes.",
    propertiesCount: 15,
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
    creci: "45.678-J"
  }
];

export function getAgencyById(id: number): Agency | undefined {
  return AGENCIES.find(a => a.id === id);
}

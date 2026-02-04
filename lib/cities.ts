import { CITY_NEIGHBORHOODS } from "./constants";

export interface City {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  culture: string;
  entertainment: string;
  mapEmbedUrl: string;
  images: string[];
  neighborhoods: string[];
}

export const CITIES: City[] = [
  {
    slug: "sao-luis",
    name: "São Luís",
    shortDescription: "A capital histórica e cultural, conhecida como a Ilha do Amor e Patrimônio Mundial da UNESCO.",
    description: "São Luís, a capital do Maranhão, é uma ilha encantadora que mistura a herança colonial portuguesa com a cultura vibrante local. Seu Centro Histórico, com milhares de casarões azulejados, é Patrimônio Mundial da UNESCO. A cidade é cercada por praias e manguezais, oferecendo uma beleza natural única.",
    culture: "A cultura de São Luís é rica e diversificada, destacando-se pelo Bumba-meu-boi, uma das maiores manifestações folclóricas do Brasil, especialmente durante as festas juninas. O Tambor de Crioula e o Reggae (São Luís é conhecida como a 'Jamaica Brasileira') também são pilares culturais fundamentais. A culinária é marcada pelo arroz de cuxá, peixada maranhense e torta de camarão.",
    entertainment: "Para o entretenimento, a cidade oferece desde passeios históricos no Reviver até a vida noturna agitada na Lagoa da Jansen e na Avenida Litorânea. As praias do Calhau e Olho d'Água são pontos de encontro populares. Há também teatros, como o Arthur Azevedo, museus e shoppings modernos.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127504.60965359738!2d-44.302844549999995!3d-2.5387426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f685d0549c4fb9%3A0x7e59754329244093!2zU8OjbyBMdcOtcyAtIE1B!5e0!3m2!1spt-BR!2sbr!4v1707000000000!5m2!1spt-BR!2sbr",
    images: [
      "/S_Luis.jpg",
      "https://images.unsplash.com/photo-1596482806223-b67f4007908b?q=80&w=1920&auto=format&fit=crop", // Centro Histórico
      "https://images.unsplash.com/photo-1598977161835-64972d54e471?q=80&w=1920&auto=format&fit=crop"  // Litorânea
    ],
    neighborhoods: CITY_NEIGHBORHOODS["sao-luis"]
  },
  {
    slug: "sao-jose-de-ribamar",
    name: "São José de Ribamar",
    shortDescription: "Cidade santuário, conhecida por sua religiosidade e belas praias.",
    description: "São José de Ribamar é um dos municípios mais importantes da Grande Ilha, famoso por ser o destino de milhares de fiéis que visitam o santuário do padroeiro do Maranhão. A cidade combina a tranquilidade de uma cidade litorânea com o crescimento urbano acelerado.",
    culture: "A cultura local é fortemente influenciada pela religiosidade, com a Festa de São José de Ribamar sendo o ponto alto do calendário, atraindo romeiros de todo o estado. O município também preserva tradições de pesca artesanal e festas populares como o Carnaval e o Lava-Pratos.",
    entertainment: "Além do turismo religioso, Ribamar oferece belas praias como Panaquatira, conhecida por suas águas calmas e marés que recuam quilômetros. O município conta com parques, praças revitalizadas e uma gastronomia focada em frutos do mar frescos.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63753.86873105776!2d-44.0991666!3d-2.5513889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f69a6e60058925%3A0x8633333333333333!2zU8OjbyBKb3PDqSBkZSBSaWJhbWFyIC0gTUE!5e0!3m2!1spt-BR!2sbr!4v1707000000000!5m2!1spt-BR!2sbr",
    images: [
      "/S_J_Ribamar.jpg",
      "https://images.unsplash.com/photo-1628124971775-685c4a5d8986?q=80&w=1920&auto=format&fit=crop", // Praia
      "https://images.unsplash.com/photo-1563294698-c6f966023363?q=80&w=1920&auto=format&fit=crop"  // Igreja (Generic)
    ],
    neighborhoods: CITY_NEIGHBORHOODS["sao-jose-de-ribamar"]
  },
  {
    slug: "paco-do-lumiar",
    name: "Paço do Lumiar",
    shortDescription: "Município em crescimento, com forte agricultura familiar e tradições locais.",
    description: "Paço do Lumiar é um município vibrante da região metropolitana, conhecido por sua produção agrícola e áreas verdes. É uma cidade que mistura zonas rurais produtivas com áreas urbanas em rápida expansão, servindo como um importante polo residencial e comercial.",
    culture: "A cidade mantém vivas as tradições do Bumba-meu-boi, com sotaques únicos da região. A agricultura familiar também molda a cultura local, com feiras e eventos que celebram a produção rural. O artesanato e as festas comunitárias são pontos fortes da identidade luminense.",
    entertainment: "O entretenimento em Paço do Lumiar gira em torno de suas áreas de lazer, clubes e eventos locais. O Porto do Mocajituba é um local de destaque para quem gosta de natureza e pesca. A cidade também realiza eventos culturais sazonais que movimentam a população.",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63758.123456789!2d-44.1500000!3d-2.5166667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7f6900000000000%3A0x0!2zUGHDp28gZG8gTHVtaWFyIC0gTUE!5e0!3m2!1spt-BR!2sbr!4v1707000000000!5m2!1spt-BR!2sbr",
    images: [
      "/P_Lumiar.jpg",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920&auto=format&fit=crop", // Natureza/Campo
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1920&auto=format&fit=crop"  // Verde
    ],
    neighborhoods: CITY_NEIGHBORHOODS["paco-do-lumiar"]
  }
];

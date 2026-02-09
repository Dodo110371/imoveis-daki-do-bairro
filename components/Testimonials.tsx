import Image from 'next/image';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Ricardo Almeida',
    role: 'Comprou no Centro',
    content: 'Encontrei o apartamento dos meus sonhos em menos de duas semanas. A equipe foi super atenciosa e cuidou de toda a burocracia para mim. Recomendo demais!',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 2,
    name: 'Juliana Costa',
    role: 'Alugou na Zona Sul',
    content: 'O processo de locação foi muito rápido e transparente. O site é fácil de usar e o atendimento pelo WhatsApp funcionou perfeitamente quando tive dúvidas.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
  {
    id: 3,
    name: 'Marcos e Fernanda',
    role: 'Venderam Imóvel',
    content: 'Tentamos vender nosso imóvel por meses em outras plataformas sem sucesso. Aqui, em 30 dias já tínhamos uma proposta firme. Profissionalismo nota 10.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-60" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-blue-50 rounded-full mb-4">
            <Star className="h-5 w-5 text-blue-600 fill-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            O que dizem nossos clientes
          </h2>
          <p className="text-lg text-slate-600">
            Histórias reais de quem já realizou o sonho da casa nova com a gente.
            A sua satisfação é o nosso melhor cartão de visitas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-slate-50 rounded-2xl p-8 relative hover:shadow-lg transition-shadow duration-300 border border-slate-100"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-blue-100" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-orange-400 fill-orange-400" />
                ))}
              </div>

              <p className="text-slate-700 mb-8 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{testimonial.name}</h4>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

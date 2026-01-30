import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t bg-slate-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold text-slate-900">Imóveis daki do Bairro</span>
            <p className="text-sm text-slate-600">
              A imobiliária especialista no que realmente importa: viver bem no seu bairro.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-900">Navegação</h3>
            <Link href="/comprar" className="text-sm text-slate-600 hover:text-slate-900">Comprar</Link>
            <Link href="/alugar" className="text-sm text-slate-600 hover:text-slate-900">Alugar</Link>
            <Link href="/imobiliarias" className="text-sm text-slate-600 hover:text-slate-900">Imobiliárias</Link>
            <Link href="/bairro" className="text-sm text-slate-600 hover:text-slate-900">O Bairro</Link>
            <Link href="/contato" className="text-sm text-slate-600 hover:text-slate-900">Contato</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-900">Contato</h3>
            <span className="text-sm text-slate-600">contato@imoveisdakidobairro.com.br</span>
            <span className="text-sm text-slate-600">(11) 99999-9999</span>
            <span className="text-sm text-slate-600">Rua do Bairro, 123 - Sala 4</span>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-900">Social</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-slate-600 hover:text-slate-900">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-600 hover:text-slate-900">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-600 hover:text-slate-900">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Imóveis daki do Bairro. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

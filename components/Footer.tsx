import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Smartphone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="print:hidden w-full border-t bg-slate-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-bold text-slate-900">{siteConfig.name}</span>
            <p className="text-sm text-slate-600">
              A plataforma especialista no que realmente importa: viver bem no seu bairro.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-900">Navegação</h3>
            <Link href="/quem-somos" className="text-sm text-slate-600 hover:text-slate-900">Quem Somos</Link>
            <Link href="/comprar" className="text-sm text-slate-600 hover:text-slate-900">Comprar</Link>
            <Link href="/alugar" className="text-sm text-slate-600 hover:text-slate-900">Alugar</Link>
            <Link href="/imobiliarias" className="text-sm text-slate-600 hover:text-slate-900">Imobiliárias</Link>
            <Link href="/bairro" className="text-sm text-slate-600 hover:text-slate-900">O Bairro</Link>
            <Link href="/divulgacao" className="text-sm text-slate-600 hover:text-slate-900">Divulgação</Link>
            <Link href="/contato" className="text-sm text-slate-600 hover:text-slate-900">Contato</Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-slate-900">Contato</h3>
            <Link href="/contato" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
              <Mail className="h-4 w-4" />
              <span>{siteConfig.contact.email}</span>
            </Link>
            <Link href="/contato" className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors">
              <Smartphone className="h-4 w-4" />
              <span>{siteConfig.contact.phone}</span>
            </Link>

            <div className="flex gap-4 mt-2">
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

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold text-slate-900">Políticas</h3>
            <Link href="/termos-de-uso" className="text-sm text-slate-600 hover:text-slate-900">Termos de Uso</Link>
            <Link href="/politica-de-privacidade" className="text-sm text-slate-600 hover:text-slate-900">Política de Privacidade</Link>
            <Link href="/politica-de-cookies" className="text-sm text-slate-600 hover:text-slate-900">Política de Cookies</Link>
            <Link href="/politica-de-qualidade" className="text-sm text-slate-600 hover:text-slate-900">Política de Qualidade</Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Imóveis daki do Bairro. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

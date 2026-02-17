'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export default function BusinessCardPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center py-10 px-4 print:bg-white print:py-0">
      <style jsx global>{`
        @page {
          size: 90mm 50mm;
          margin: 0;
        }
        @media print {
          html,
          body {
            width: 90mm;
            height: 50mm;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .business-card {
            width: 90mm !important;
            height: 50mm !important;
            box-shadow: none !important;
            margin: 0 !important;
          }
        }
      `}</style>

      <div className="no-print mb-6 flex items-center justify-between w-full max-w-xl">
        <Link href="/" className="text-slate-600 hover:text-blue-600 font-medium">
          Voltar para o site
        </Link>
        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700"
        >
          Imprimir / Salvar em PDF
        </button>
      </div>

      <div className="business-card w-[360px] aspect-[90/50] bg-slate-50 rounded-2xl shadow-2xl overflow-hidden flex">
        <div className="flex-1 bg-white flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-[140px] max-h-[140px]">
            <Image
              src="/Logo_imoveis_daki_do_bairro.png"
              alt="Logo Imóveis daki do Bairro"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <div className="flex-[1.2] bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 text-white p-4 flex flex-col justify-between">
          <div>
            <p className="text-xs font-semibold text-yellow-300">
              Divulgue seus imóveis para milhares de compradores!
            </p>
            <p className="text-xs mt-1">
              Anuncie conosco e aumente suas vendas no seu bairro.
            </p>
          </div>
          <div className="mt-2 space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2">
              <Mail className="w-3 h-3 text-yellow-300" />
              <span>{siteConfig.contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3 h-3 text-yellow-300" />
              <span>{siteConfig.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3 h-3 text-green-300" />
              <span>{siteConfig.contact.phone2}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-semibold text-yellow-300">
                {siteConfig.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


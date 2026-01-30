"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="relative h-10 w-40 md:h-12 md:w-56">
                            <Image
                                src="/Logo_imoveis_daki_do_bairro.png"
                                alt="Imóveis daki do Bairro"
                                fill
                                className="object-contain object-left"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                    <Link href="/comprar" className="hover:text-slate-900 transition-colors">Comprar</Link>
                    <Link href="/alugar" className="hover:text-slate-900 transition-colors">Alugar</Link>
                    <Link href="/imobiliarias" className="hover:text-slate-900 transition-colors">Imobiliárias</Link>
                    <Link href="/bairro" className="hover:text-slate-900 transition-colors">O Bairro</Link>
                    <Link href="/contato" className="hover:text-slate-900 transition-colors">Contato</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors">
                        Anuncie seu Imóvel
                    </button>
                    <Link href="/minha-conta" className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
                        <User className="h-5 w-5" />
                        Minha Conta
                    </Link>
                    <button
                        className="md:hidden p-2 text-slate-600 hover:text-slate-900"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t bg-white animate-in slide-in-from-top-2 duration-200">
                    <nav className="flex flex-col p-4 gap-4 text-sm font-medium text-slate-600">
                        <Link href="/comprar" className="hover:text-slate-900 transition-colors py-2 border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Comprar</Link>
                        <Link href="/alugar" className="hover:text-slate-900 transition-colors py-2 border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Alugar</Link>
                        <Link href="/imobiliarias" className="hover:text-slate-900 transition-colors py-2 border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Imobiliárias</Link>
                        <Link href="/bairro" className="hover:text-slate-900 transition-colors py-2 border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>O Bairro</Link>
                        <Link href="/contato" className="hover:text-slate-900 transition-colors py-2 border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>Contato</Link>
                        <Link href="/minha-conta" className="flex items-center gap-2 hover:text-slate-900 transition-colors py-2 border-b border-slate-100" onClick={() => setIsMenuOpen(false)}>
                            <User className="h-5 w-5" />
                            Minha Conta
                        </Link>
                        <button className="flex items-center justify-center gap-2 px-4 py-3 mt-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors w-full">
                            Anuncie seu Imóvel
                        </button>
                    </nav>
                </div>
            )}
        </header>
    );
}

"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, User } from 'lucide-react';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 shadow-lg text-white">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="relative h-10 w-40 md:h-12 md:w-56 bg-white/10 rounded-lg p-1 backdrop-blur-sm">
                                <Image
                                    src="/Logo_imoveis_daki_do_bairro.png"
                                    alt="Imóveis daki do Bairro"
                                    fill
                                    className="object-contain object-left"
                                    priority
                                />
                            </div>
                        </Link>
                        
                        {/* Desktop Navigation - Only Most Relevant */}
                        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-blue-100">
                            <Link href="/comprar" className="hover:text-white transition-colors">Comprar</Link>
                            <Link href="/alugar" className="hover:text-white transition-colors">Alugar</Link>
                            <Link href="/municipios" className="hover:text-white transition-colors">Municípios</Link>
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="/anunciar" className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-900 bg-white rounded-full hover:bg-blue-50 transition-colors shadow-sm">
                            Anuncie seu Imóvel
                        </Link>
                        
                        <button
                            className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Abrir menu"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Sidebar Navigation Menu */}
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsMenuOpen(false)}
                    />
                    
                    {/* Drawer */}
                    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                        <div className="flex items-center justify-between p-4 border-b">
                            <span className="text-lg font-bold text-slate-800">Menu</span>
                            <button 
                                onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        
                        <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
                            <div className="mb-6 pb-6 border-b border-slate-100 space-y-2">
                                <Link 
                                    href="/anunciar" 
                                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md" 
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Anuncie seu Imóvel
                                </Link>
                                <Link 
                                    href="/minha-conta" 
                                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors" 
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <User className="h-4 w-4" />
                                    Minha Conta
                                </Link>
                            </div>

                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">Navegação</p>
                            
                            <Link href="/comprar" className="flex items-center px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Comprar
                            </Link>
                            <Link href="/alugar" className="flex items-center px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Alugar
                            </Link>
                            <Link href="/municipios" className="flex items-center px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Municípios
                            </Link>
                            <Link href="/imobiliarias" className="flex items-center px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Imobiliárias
                            </Link>
                            <Link href="/bairro" className="flex items-center px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                                O Bairro
                            </Link>
                            <Link href="/planos" className="flex items-center px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Nossos Planos
                            </Link>
                            
                            <div className="my-2 border-t border-slate-100" />
                            
                            <Link href="/quem-somos" className="flex items-center px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Quem Somos
                            </Link>
                            <Link href="/contato" className="flex items-center px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" onClick={() => setIsMenuOpen(false)}>
                                Contato
                            </Link>
                        </nav>
                        
                        <div className="p-4 border-t bg-slate-50">
                            <p className="text-xs text-center text-slate-400">
                                © {new Date().getFullYear()} Imóveis daki do Bairro
                            </p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}

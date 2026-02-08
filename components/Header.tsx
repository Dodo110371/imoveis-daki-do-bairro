"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, User, Heart } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { favorites } = useFavorites();

    return (
        <>
            <header className="print:hidden sticky top-0 z-40 w-full border-b border-white/10 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 shadow-lg text-white">
                <div className="container mx-auto flex h-20 items-center justify-between px-4">
                    {/* Logo Section - Left */}
                    <div className="flex-1 flex justify-start">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="flex items-center gap-3 bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm border border-white/5 hover:bg-white/20 transition-colors">
                                <div className="relative h-10 w-10 md:h-12 md:w-12 shrink-0">
                                    <Image
                                        src="/Logo_imoveis_daki_do_bairro.png"
                                        alt="Imóveis daki do Bairro"
                                        fill
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                                <div className="flex flex-col items-start justify-center">
                                    <span className="font-sans font-extrabold text-lg md:text-xl leading-none text-white tracking-tight">Imóveis</span>
                                    <span className="font-sans font-medium text-xs md:text-sm leading-none text-blue-200 tracking-wide">daki do Bairro</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation - Center */}
                    <nav className="hidden md:flex flex-1 items-center justify-center gap-8 text-base font-medium text-blue-100">
                        <Link href="/comprar" className="hover:text-white hover:scale-105 transition-all">Comprar</Link>
                        <Link href="/alugar" className="hover:text-white hover:scale-105 transition-all">Alugar</Link>
                        <Link href="/municipios" className="hover:text-white hover:scale-105 transition-all">Municípios</Link>
                        <Link href="/favoritos" className="flex items-center gap-1 hover:text-white hover:scale-105 transition-all">
                            Favoritos
                            {favorites.length > 0 && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                    {favorites.length}
                                </span>
                            )}
                        </Link>
                    </nav>

                    {/* Actions - Right */}
                    <div className="flex-1 flex items-center justify-end gap-4">
                        <Link href="/anunciar" className="hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-blue-900 bg-white rounded-full hover:bg-blue-50 hover:shadow-md transition-all shadow-sm">
                            Anuncie seu Imóvel
                        </Link>

                        <Link href="/minha-conta" className="flex items-center gap-2 text-blue-100 hover:text-white transition-colors group">
                            <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                <User className="h-5 w-5" />
                            </div>
                            <span className="hidden lg:inline font-medium">Minha Conta</span>
                        </Link>

                        <button
                            className="p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                            onClick={() => setIsMenuOpen(true)}
                            aria-label="Abrir menu"
                        >
                            <Menu className="h-7 w-7" />
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
                    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
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
                                    href="/favoritos"
                                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <Heart className="h-4 w-4" />
                                    Meus Favoritos
                                    {favorites.length > 0 && (
                                        <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                                            {favorites.length}
                                        </span>
                                    )}
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

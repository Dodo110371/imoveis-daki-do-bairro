import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ComparisonProvider } from "@/context/ComparisonContext";
import { AuthProvider } from "@/context/AuthContext";
import { ComparisonBar } from "@/components/ComparisonBar";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import { CookieBanner } from "@/components/CookieBanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imóveis daki do Bairro | Especialistas no seu bem-estar",
  description: "Encontre os melhores imóveis para comprar e alugar no seu bairro favorito. Atendimento personalizado e conhecimento local.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script src="/trusted-security-policy.js" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2306267959705956"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <CookieConsentProvider>
          <AuthProvider>
            <FavoritesProvider>
              <ComparisonProvider>
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <WhatsAppFloat />
                <ComparisonBar />
                <Footer />
                <CookieBanner />
              </ComparisonProvider>
            </FavoritesProvider>
          </AuthProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}

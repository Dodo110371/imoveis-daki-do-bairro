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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.trustedTypes && window.trustedTypes.createPolicy) {
                try {
                  window.trustedTypes.createPolicy('default', {
                    createHTML: (string) => string,
                    createScript: (string) => string,
                    createScriptURL: (string) => string,
                  });
                } catch (e) {
                  console.warn('TrustedTypes policy already exists');
                }
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
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
            </ComparisonProvider>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

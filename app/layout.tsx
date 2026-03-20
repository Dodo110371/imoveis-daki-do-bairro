import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
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
import { CanonicalLink } from "@/components/CanonicalLink";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imóveis daki do Bairro | Especialistas no seu bem-estar",
  description: "Encontre os melhores imóveis para comprar e alugar no seu bairro favorito. Atendimento personalizado e conhecimento local.",
  manifest: "/site.webmanifest",
  themeColor: "#0b4ea2",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script src="/trusted-security-policy.js" strategy="beforeInteractive" />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-85TDL3R8WZ" strategy="beforeInteractive" />
        <Script src="/ga-init.js" strategy="beforeInteractive" />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" type="image/png" href="/favicon-32x32.png?v=2" sizes="32x32" />
        <link rel="icon" type="image/png" href="/favicon-16x16.png?v=2" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest?v=2" />
        <meta name="theme-color" content="#0b4ea2" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <CanonicalLink />
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

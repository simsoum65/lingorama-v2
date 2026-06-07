import type { Metadata } from "next";
import { Cormorant, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const cormorant = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lingorama — Le rendez-vous du beau linge à prix d'usine depuis 1975",
  description:
    "Linge de maison de qualité à prix d'usine dégriffés. Draps-housses coton, percale 80 fils et satin 120 fils. Grandes marques (Blanc des Vosges, Tradilinge) — Magasins Nancy, Reims, Dijon.",
  keywords: [
    "linge de maison",
    "drap housse percale",
    "satin de coton 120 fils",
    "prix d'usine",
    "Blanc des Vosges",
    "Tradilinge",
    "Lingorama",
  ],
  openGraph: {
    title: "Lingorama — Le beau linge à prix d'usine depuis 1975",
    description:
      "Expert français du linge de maison. Qualité hôtelière à prix dégriffés.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-sans bg-bg text-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

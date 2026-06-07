"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "@/components/ui/Logo";

const NAV = [
  { label: "Linge de lit", href: "/linge-de-lit/draps-housses" },
  { label: "Couettes & Oreillers", href: "/linge-de-lit/draps-housses" },
  { label: "Protection literie", href: "/linge-de-lit/draps-housses" },
  { label: "Linge de bain", href: "/linge-de-lit/draps-housses" },
  { label: "Marques", href: "/linge-de-lit/draps-housses" },
  { label: "Notre histoire", href: "/notre-histoire" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Bandeau de réassurance — vrai ADN Lingorama */}
      <div className="bg-brand-marine text-white text-[11px] font-600 tracking-widest uppercase py-2 hidden md:block">
        <div className="container-prose flex items-center justify-between">
          <span>Livraison offerte dès 79€ · Retour 30 jours</span>
          <span className="flex items-center gap-6">
            <span>★ Prix d&apos;usine depuis 1975</span>
            <span>Magasins Nancy · Reims · Dijon</span>
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5"
            : "bg-white"
        }`}
      >
        <div className="container-prose flex items-center justify-between h-20">
          <Link href="/" className="flex-shrink-0 cursor-pointer">
            <Logo size="md" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-500 text-brand-marine hover:text-brand-turquoise transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/pro"
              className="hidden md:inline-flex text-xs font-700 tracking-widest uppercase text-brand-turquoise hover:text-brand-marine transition-colors cursor-pointer border-l border-black/10 pl-4"
            >
              Espace Pro
            </Link>
            <button
              aria-label="Rechercher"
              className="p-2 hover:text-brand-turquoise transition-colors cursor-pointer"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button
              aria-label="Compte"
              className="p-2 hover:text-brand-turquoise transition-colors cursor-pointer"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button
              aria-label="Panier"
              className="relative p-2 hover:text-brand-turquoise transition-colors cursor-pointer"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="absolute -top-0.5 -right-0.5 bg-brand-turquoise text-white text-[10px] font-700 rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </button>
            <button
              aria-label="Menu mobile"
              className="lg:hidden p-2 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <>
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t border-black/5 bg-white">
            <div className="container-prose py-4 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-500 text-brand-marine border-b border-black/5 cursor-pointer"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/pro"
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm font-700 uppercase tracking-widest text-brand-turquoise cursor-pointer"
              >
                Espace Pro
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

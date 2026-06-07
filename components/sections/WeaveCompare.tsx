"use client";

import { useState } from "react";
import clsx from "clsx";

const WEAVES = [
  {
    id: "57",
    fils: 57,
    name: "Coton Classique",
    badge: "Doux & Respirant",
    description:
      "Tissage croisé traditionnel, toucher moelleux et résistant. Le linge familial par excellence.",
    feel: ["Mat", "Moelleux", "Cocooning"],
    care: "Lavable 60°C",
    rating: { breathability: 4, longevity: 3, softness: 3 },
    priceFrom: 29,
    color: "#A88B53",
    bgColor: "#F5F0EB",
  },
  {
    id: "80",
    fils: 80,
    name: "Percale 80 Fils",
    badge: "Le plus choisi",
    description:
      "Tissage serré et précis. Effet crispy frais, idéal pour les nuits d'été et les peaux sensibles.",
    feel: ["Frais", "Net", "Précis"],
    care: "Lavable 60°C",
    rating: { breathability: 5, longevity: 4, softness: 4 },
    priceFrom: 49,
    color: "#00B5C8",
    bgColor: "#E5F7F9",
    featured: true,
  },
  {
    id: "120",
    fils: 120,
    name: "Satin de Coton",
    badge: "Le luxe absolu",
    description:
      "Tissage satin haute densité. Tombé soyeux et lumineux, digne des plus beaux hôtels.",
    feel: ["Soyeux", "Lumineux", "Tombé fluide"],
    care: "Lavable 40°C recommandé",
    rating: { breathability: 3, longevity: 5, softness: 5 },
    priceFrom: 79,
    color: "#2D3E50",
    bgColor: "#EAE5DD",
  },
];

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={clsx(
            "w-1.5 h-1.5 rounded-full",
            i < value ? "bg-brand-turquoise" : "bg-black/10"
          )}
        />
      ))}
    </div>
  );
}

export default function WeaveCompare() {
  const [active, setActive] = useState<string>("80");

  return (
    <section className="bg-white py-24">
      <div className="container-prose">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="label-eyebrow mb-3">Pédagogie textile</p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-marine mb-4">
            57, 80 ou 120 fils ? Le guide pour choisir juste.
          </h2>
          <p className="text-ink-muted font-300">
            Le nombre de fils au cm² détermine la densité du tissage — et donc la
            sensation au toucher, la respirabilité et la longévité de votre linge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {WEAVES.map((w) => (
            <button
              key={w.id}
              onClick={() => setActive(w.id)}
              className={clsx(
                "relative text-left p-8 transition-all duration-300 cursor-pointer",
                "border-2",
                active === w.id
                  ? "border-brand-turquoise shadow-2xl -translate-y-2"
                  : "border-black/10 hover:border-brand-turquoise/40"
              )}
              style={{ background: w.bgColor }}
            >
              {w.featured && (
                <div className="absolute -top-3 left-8 px-3 py-1 bg-brand-turquoise text-white text-[10px] font-700 tracking-widest uppercase rounded-full">
                  Bestseller
                </div>
              )}
              {/* Visuel tissage simulé */}
              <div
                className="w-14 h-14 mb-5 rounded-full flex items-center justify-center"
                style={{ background: w.color }}
              >
                <span className="text-white font-serif text-2xl font-700">{w.fils}</span>
              </div>

              <p
                className="label-eyebrow mb-2"
                style={{ color: w.color }}
              >
                {w.badge}
              </p>
              <h3 className="font-serif text-2xl text-brand-marine mb-3">{w.name}</h3>
              <p className="text-sm text-ink-muted font-300 mb-6 min-h-[60px]">
                {w.description}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-muted">Respirabilité</span>
                  <Stars value={w.rating.breathability} />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-muted">Longévité</span>
                  <Stars value={w.rating.longevity} />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-ink-muted">Douceur</span>
                  <Stars value={w.rating.softness} />
                </div>
              </div>

              <div className="flex items-end justify-between border-t border-black/10 pt-4">
                <div>
                  <p className="text-[10px] text-ink-muted uppercase tracking-widest">À partir de</p>
                  <p className="font-serif text-3xl text-brand-marine font-600">
                    {w.priceFrom}€
                  </p>
                </div>
                <span className="text-xs font-700 tracking-widest uppercase text-brand-turquoise">
                  Voir →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

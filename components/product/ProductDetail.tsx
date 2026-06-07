"use client";

import { useState } from "react";
import clsx from "clsx";
import type { Product } from "@/lib/products";

const WEAVE_INFO = {
  "57": { name: "Coton classique 57 fils", desc: "Doux & respirant", color: "#A88B53" },
  "80": { name: "Percale 80 fils", desc: "Frais & précis", color: "#00B5C8" },
  "120": { name: "Satin de coton 120 fils", desc: "Soyeux & lumineux", color: "#2D3E50" },
} as const;

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const [selectedBonnet, setSelectedBonnet] = useState(product.bonnets[Math.floor(product.bonnets.length / 2)] ?? 30);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.id);
  const [activeImage, setActiveImage] = useState(0);

  const weave = WEAVE_INFO[product.weave];
  const savings = product.publicPrice - product.lingoramaPrice;
  const savingsPercent = Math.round((savings / product.publicPrice) * 100);

  return (
    <div className="container-prose py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Galerie */}
        <div className="lg:col-span-7">
          <div className={`aspect-[4/5] bg-gradient-to-br ${product.thumbnail} relative overflow-hidden mb-3`}>
            <div className="absolute inset-x-6 bottom-6 top-12 bg-white/40 backdrop-blur-sm border border-white/40 rounded-sm" />
            <div
              className="absolute inset-x-10 bottom-10 top-20 rounded-sm transition-colors duration-300"
              style={{ background: selectedColor }}
            />
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-feedback-error text-white text-xs font-700 tracking-widest uppercase">
              -{savingsPercent}%
            </div>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-5 gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={clsx(
                  "aspect-square cursor-pointer transition-all border-2",
                  activeImage === i ? "border-brand-turquoise" : "border-transparent hover:border-black/20"
                )}
              >
                <div className={`w-full h-full bg-gradient-to-br ${product.thumbnail} opacity-${activeImage === i ? "100" : "60"}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Sticky info panel */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            {/* Brand */}
            <p className="label-eyebrow mb-2">
              <span style={{ color: weave.color }}>{product.brand}</span>
            </p>

            {/* Title + rating */}
            <h1 className="font-serif text-3xl md:text-4xl text-brand-marine leading-tight mb-3">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-6 text-sm">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? "#C9A96E" : "#E5E5E5"}>
                    <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
                  </svg>
                ))}
              </div>
              <span className="text-ink-muted">{product.rating} / 5</span>
              <span className="text-ink-muted">·</span>
              <a href="#avis" className="text-brand-turquoise underline cursor-pointer">
                {product.reviewsCount} avis
              </a>
            </div>

            {/* Prix */}
            <div className="mb-6 pb-6 border-b border-black/10">
              <div className="flex items-baseline gap-3">
                <p className="font-serif text-4xl text-brand-turquoise font-600">
                  {product.lingoramaPrice}€
                </p>
                <p className="text-base text-ink-muted line-through">{product.publicPrice}€</p>
                <span className="px-2 py-0.5 bg-feedback-success/10 text-feedback-success text-xs font-700 rounded">
                  Économie {savings}€
                </span>
              </div>
              <p className="text-xs text-ink-muted font-300 mt-2">
                Prix d&apos;usine Lingorama · TTC, hors livraison
              </p>
            </div>

            {/* Description */}
            <p className="text-sm text-ink leading-relaxed mb-8">{product.description}</p>

            {/* Tailles */}
            <div className="mb-6">
              <p className="label-eyebrow mb-3">Taille</p>
              <div className="grid grid-cols-3 gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={clsx(
                      "py-3 text-sm font-500 border-2 transition-all cursor-pointer",
                      selectedSize === s
                        ? "border-brand-turquoise bg-brand-turquoise/5 text-brand-marine"
                        : "border-black/15 hover:border-brand-turquoise/40"
                    )}
                  >
                    {s.replace("x", " × ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Bonnet */}
            {product.bonnets.length > 1 && (
              <div className="mb-6">
                <p className="label-eyebrow mb-3">Hauteur de bonnet</p>
                <div className="grid grid-cols-3 gap-2">
                  {product.bonnets.map((b) => (
                    <button
                      key={b}
                      onClick={() => setSelectedBonnet(b)}
                      className={clsx(
                        "py-3 text-sm font-500 border-2 transition-all cursor-pointer",
                        selectedBonnet === b
                          ? "border-brand-turquoise bg-brand-turquoise/5 text-brand-marine"
                          : "border-black/15 hover:border-brand-turquoise/40"
                      )}
                    >
                      {b} cm
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Couleurs */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="label-eyebrow">Couleur</p>
                <p className="text-xs text-ink-muted">
                  {product.colors.find((c) => c.id === selectedColor)?.name}
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c.id)}
                    className={clsx(
                      "w-10 h-10 rounded-full border-2 transition-all cursor-pointer relative",
                      selectedColor === c.id ? "border-brand-turquoise scale-110" : "border-black/15 hover:scale-105"
                    )}
                    style={{ background: c.id }}
                    aria-label={c.name}
                  >
                    {selectedColor === c.id && (
                      <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button className="btn-primary w-full text-base py-4 mb-3">
              Ajouter au panier · {product.lingoramaPrice}€
            </button>
            <button className="btn-secondary w-full">Ajouter à ma liste d&apos;envies</button>

            {/* Réassurance */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-xs text-ink-muted font-500">
              <div className="flex items-start gap-2">
                <svg width="18" height="18" fill="none" stroke="#00B5C8" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 18H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v11M14 18H9M19 18h2v-5l-3-4h-3v9M19 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
                </svg>
                <div>
                  <p className="text-brand-marine font-600">Livraison offerte</p>
                  <p>Dès 79€ d&apos;achat</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg width="18" height="18" fill="none" stroke="#00B5C8" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <path d="M9 22V12h6v10" />
                </svg>
                <div>
                  <p className="text-brand-marine font-600">Retour 30 jours</p>
                  <p>Sans frais ni questions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tableau comparatif tissages */}
      <section className="mt-24 pt-16 border-t border-black/10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="label-eyebrow mb-3">Pédagogie textile</p>
          <h2 className="font-serif text-3xl md:text-4xl text-brand-marine">
            Quel tissage vous correspond ?
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-brand-marine">
                <th className="p-4 text-left text-xs uppercase tracking-widest font-700 text-ink-muted">Critère</th>
                <th className="p-4 text-left">
                  <p className="label-eyebrow mb-1" style={{ color: "#A88B53" }}>57 fils</p>
                  <p className="font-serif text-lg text-brand-marine">Coton Classique</p>
                </th>
                <th className={`p-4 text-left ${product.weave === "80" ? "bg-brand-turquoise/5" : ""}`}>
                  <p className="label-eyebrow mb-1">80 fils</p>
                  <p className="font-serif text-lg text-brand-marine">Percale</p>
                </th>
                <th className="p-4 text-left">
                  <p className="label-eyebrow mb-1" style={{ color: "#2D3E50" }}>120 fils</p>
                  <p className="font-serif text-lg text-brand-marine">Satin de coton</p>
                </th>
              </tr>
            </thead>
            <tbody className="text-ink">
              {[
                ["Toucher", "Moelleux, mat", "Frais, crispy, net", "Soyeux, lumineux"],
                ["Idéal si...", "Vous aimez le cocooning", "Vous avez chaud la nuit", "Vous voulez le summum"],
                ["Respirabilité", "★★★★", "★★★★★", "★★★"],
                ["Longévité", "★★★", "★★★★", "★★★★★"],
                ["Lavage", "60°C", "60°C", "40°C recommandé"],
                ["Pour qui ?", "Familles, enfants", "Usage quotidien", "Cadeau, chambre d'hôte"],
                ["Prix à partir de", "29€", "49€", "79€"],
              ].map((row, i) => (
                <tr key={i} className="border-b border-black/5">
                  <td className="p-4 font-600 text-brand-marine">{row[0]}</td>
                  <td className="p-4 font-300">{row[1]}</td>
                  <td className={`p-4 font-300 ${product.weave === "80" ? "bg-brand-turquoise/5" : ""}`}>{row[2]}</td>
                  <td className="p-4 font-300">{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import type { Product } from "@/lib/products";

const WEAVE_LABEL = {
  "57": "Coton 57 fils",
  "80": "Percale 80 fils",
  "120": "Satin 120 fils",
} as const;

export default function ProductCard({ product }: { product: Product }) {
  const savings = Math.round(
    ((product.publicPrice - product.lingoramaPrice) / product.publicPrice) * 100
  );

  return (
    <Link
      href={`/produit/${product.slug}`}
      className="group block cursor-pointer"
    >
      {/* Thumbnail */}
      <div className={`relative aspect-[4/5] bg-gradient-to-br ${product.thumbnail} overflow-hidden mb-4`}>
        {/* Drap simulé */}
        <div className="absolute inset-x-4 bottom-4 top-12 bg-white/50 backdrop-blur-sm border border-white/40 rounded-sm" />
        <div
          className="absolute inset-x-6 bottom-6 top-16 rounded-sm"
          style={{ background: product.colors[0]?.id ?? "#FFFFFF" }}
        />
        {/* Badge prix dégriffé */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-feedback-error text-white text-[10px] font-700 tracking-widest uppercase rounded-sm">
          -{savings}%
        </div>
        {/* Hover : pastilles couleurs */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
          {product.colors.slice(0, 5).map((c) => (
            <span
              key={c.id}
              className="w-4 h-4 rounded-full ring-2 ring-white"
              style={{ background: c.id }}
            />
          ))}
          {product.colors.length > 5 && (
            <span className="text-xs text-ink font-600">+{product.colors.length - 5}</span>
          )}
        </div>
      </div>

      {/* Info */}
      <p className="text-[10px] tracking-widest uppercase font-700 text-brand-turquoise mb-1">
        {product.brand}
      </p>
      <h3 className="font-serif text-lg text-brand-marine leading-tight mb-1 group-hover:text-brand-turquoise transition-colors">
        {product.name}
      </h3>
      <p className="text-xs text-ink-muted font-300 mb-2">
        {WEAVE_LABEL[product.weave]} · {product.sizes.length} tailles
      </p>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={i < Math.round(product.rating) ? "#C9A96E" : "#E5E5E5"}>
              <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
            </svg>
          ))}
        </div>
        <span className="text-[11px] text-ink-muted">({product.reviewsCount})</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-xl text-brand-turquoise font-600">
          {product.lingoramaPrice}€
        </span>
        <span className="text-xs text-ink-muted line-through">{product.publicPrice}€</span>
      </div>
    </Link>
  );
}

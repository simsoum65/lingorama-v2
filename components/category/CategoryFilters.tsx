"use client";

import { useState } from "react";
import clsx from "clsx";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ui/ProductCard";

const WEAVES = [
  { id: "57", label: "Coton classique · 57 fils" },
  { id: "80", label: "Percale · 80 fils", popular: true },
  { id: "120", label: "Satin de coton · 120 fils" },
];

const SIZES = ["80x200", "90x200", "120x200", "140x190", "140x200", "160x200", "180x200", "200x200"];
const BONNETS = [25, 30, 35];
const BRANDS = ["Blanc des Vosges", "Tradilinge", "Anne de Solène", "Jalla"];

type Filters = {
  weaves: string[];
  sizes: string[];
  bonnets: number[];
  brands: string[];
};

export default function CategoryFilters() {
  const [f, setF] = useState<Filters>({ weaves: [], sizes: [], bonnets: [], brands: [] });
  const [sort, setSort] = useState<"popular" | "price-asc" | "price-desc" | "rating">("popular");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggle = <K extends keyof Filters>(key: K, value: Filters[K][number]) => {
    setF((prev) => {
      const arr = prev[key] as Array<typeof value>;
      const exists = arr.includes(value);
      return {
        ...prev,
        [key]: exists ? arr.filter((v) => v !== value) : [...arr, value],
      } as Filters;
    });
  };

  const clear = () => setF({ weaves: [], sizes: [], bonnets: [], brands: [] });

  let products = PRODUCTS.filter((p) => {
    if (f.weaves.length && !f.weaves.includes(p.weave)) return false;
    if (f.sizes.length && !p.sizes.some((s) => f.sizes.includes(s))) return false;
    if (f.bonnets.length && !p.bonnets.some((b) => f.bonnets.includes(b))) return false;
    if (f.brands.length && !f.brands.includes(p.brand)) return false;
    return true;
  });

  if (sort === "price-asc") products = [...products].sort((a, b) => a.lingoramaPrice - b.lingoramaPrice);
  if (sort === "price-desc") products = [...products].sort((a, b) => b.lingoramaPrice - a.lingoramaPrice);
  if (sort === "rating") products = [...products].sort((a, b) => b.rating - a.rating);

  const totalActive = f.weaves.length + f.sizes.length + f.bonnets.length + f.brands.length;

  const FiltersInner = (
    <div className="space-y-8">
      {totalActive > 0 && (
        <button onClick={clear} className="text-xs text-brand-turquoise underline font-600 cursor-pointer">
          Effacer tous les filtres ({totalActive})
        </button>
      )}

      <FilterGroup title="Tissage">
        {WEAVES.map((w) => (
          <FilterCheckbox
            key={w.id}
            checked={f.weaves.includes(w.id)}
            onChange={() => toggle("weaves", w.id)}
            label={w.label}
            badge={w.popular ? "Populaire" : undefined}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Taille">
        {SIZES.map((s) => (
          <FilterCheckbox
            key={s}
            checked={f.sizes.includes(s)}
            onChange={() => toggle("sizes", s)}
            label={s.replace("x", " × ") + " cm"}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Hauteur de bonnet">
        {BONNETS.map((b) => (
          <FilterCheckbox
            key={b}
            checked={f.bonnets.includes(b)}
            onChange={() => toggle("bonnets", b)}
            label={`${b} cm`}
            hint={b === 30 ? "Recommandé" : undefined}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Marque">
        {BRANDS.map((b) => (
          <FilterCheckbox
            key={b}
            checked={f.brands.includes(b)}
            onChange={() => toggle("brands", b)}
            label={b}
          />
        ))}
      </FilterGroup>
    </div>
  );

  return (
    <div className="container-prose grid grid-cols-1 lg:grid-cols-12 gap-8 py-10">
      {/* Sidebar desktop */}
      <aside className="hidden lg:block lg:col-span-3">
        <div className="sticky top-32">{FiltersInner}</div>
      </aside>

      {/* Mobile filters drawer */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 text-sm font-600 text-brand-marine px-4 py-2 border border-black/20 mb-4 self-start cursor-pointer"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 6h18M6 12h12M10 18h4" />
        </svg>
        Filtres {totalActive > 0 && `(${totalActive})`}
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl text-brand-marine">Filtres</h3>
              <button onClick={() => setMobileOpen(false)} className="cursor-pointer p-2">
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            {FiltersInner}
            <button onClick={() => setMobileOpen(false)} className="btn-primary w-full mt-8">
              Voir {products.length} produit{products.length > 1 ? "s" : ""}
            </button>
          </div>
        </div>
      )}

      {/* Grille produits */}
      <div className="lg:col-span-9">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-ink-muted font-500">
            <strong className="text-brand-marine">{products.length}</strong> produit{products.length > 1 ? "s" : ""}{" "}
            {totalActive > 0 && "trouvé(s) selon vos filtres"}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <label className="text-ink-muted">Trier&nbsp;:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="border-b border-black/20 bg-transparent py-1 text-brand-marine font-500 focus:outline-none focus:border-brand-turquoise cursor-pointer"
            >
              <option value="popular">Meilleures ventes</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="rating">Mieux notés</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <p className="text-ink-muted mb-4">Aucun produit ne correspond à vos critères.</p>
            <button onClick={clear} className="btn-secondary">
              Effacer les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="label-eyebrow mb-3 text-brand-marine" style={{ color: "#2D3E50" }}>
        {title}
      </h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function FilterCheckbox({
  checked,
  onChange,
  label,
  badge,
  hint,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  badge?: string;
  hint?: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <span
        className={clsx(
          "w-4 h-4 border-2 flex items-center justify-center transition-colors",
          checked ? "bg-brand-turquoise border-brand-turquoise" : "border-black/25 group-hover:border-brand-turquoise"
        )}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <span className="text-sm text-ink font-400 flex-1">{label}</span>
      {badge && (
        <span className="text-[9px] font-700 tracking-widest uppercase text-brand-turquoise">{badge}</span>
      )}
      {hint && (
        <span className="text-[10px] text-ink-muted italic">{hint}</span>
      )}
    </label>
  );
}

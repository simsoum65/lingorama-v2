"use client";

import { useState, useMemo } from "react";
import clsx from "clsx";

const SIZES = ["80x200", "90x200", "140x200", "160x200", "180x200"];

const PRODUCTS = {
  "Linge de lit": [
    { id: "drap-housse-80", name: "Drap-housse percale 80 fils", unit: 42 },
    { id: "housse-couette", name: "Housse de couette + 2 taies", unit: 65 },
    { id: "taie-paire", name: "Paire de taies d'oreiller", unit: 18 },
    { id: "protege-matelas", name: "Protège-matelas imperméable", unit: 28 },
  ],
  "Linge de bain": [
    { id: "serviette-50x100", name: "Serviette 50×100 500g/m²", unit: 9 },
    { id: "drap-bain-90x150", name: "Drap de bain 90×150", unit: 16 },
    { id: "tapis-bain", name: "Tapis de bain antidérapant", unit: 12 },
    { id: "peignoir", name: "Peignoir adulte unisexe", unit: 32 },
  ],
  "Linge de table": [
    { id: "nappe-rect", name: "Nappe rectangulaire 150×240", unit: 38 },
    { id: "serviette-table", name: "Serviette de table 50×50", unit: 5 },
    { id: "chemin-table", name: "Chemin de table 40×140", unit: 18 },
  ],
};

export default function ProOrderGrid() {
  const [selectedSize, setSelectedSize] = useState(SIZES[3]);
  const [qty, setQty] = useState<Record<string, number>>({});

  const totalItems = useMemo(
    () => Object.values(qty).reduce((a, b) => a + b, 0),
    [qty]
  );

  const totalPrice = useMemo(() => {
    let t = 0;
    Object.entries(qty).forEach(([id, q]) => {
      for (const cat of Object.values(PRODUCTS)) {
        const p = cat.find((x) => x.id === id);
        if (p) {
          // remise volume : -10% dès 10 pcs, -20% dès 50 pcs, -30% dès 100 pcs
          const discount = q >= 100 ? 0.7 : q >= 50 ? 0.8 : q >= 10 ? 0.9 : 1;
          t += p.unit * q * discount;
        }
      }
    });
    return Math.round(t);
  }, [qty]);

  const updateQty = (id: string, delta: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) + delta) }));

  return (
    <section className="bg-brand-marine-deep text-white py-20">
      <div className="container-prose">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="label-eyebrow mb-3 text-brand-turquoise">Commande express B2B</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-3">
            Composez votre devis<br />
            <span className="italic text-brand-turquoise">en 30 secondes.</span>
          </h2>
          <p className="text-white/70 font-300">
            Indiquez vos quantités — tarifs dégressifs automatiques dès 10 pièces.
          </p>
        </div>

        {/* Sélecteur taille global */}
        <div className="mb-10 flex flex-wrap items-center gap-3 justify-center">
          <span className="text-xs text-white/60 font-600 tracking-widest uppercase">
            Taille principale :
          </span>
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={clsx(
                "px-4 py-2 text-xs font-600 border transition-colors cursor-pointer",
                selectedSize === s
                  ? "bg-brand-turquoise border-brand-turquoise text-white"
                  : "border-white/25 text-white/70 hover:border-white/60"
              )}
            >
              {s.replace("x", " × ")}
            </button>
          ))}
        </div>

        {/* Grille produits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {Object.entries(PRODUCTS).map(([cat, items]) => (
            <div key={cat}>
              <h3 className="label-eyebrow mb-5" style={{ color: "#00B5C8" }}>{cat}</h3>
              <div className="space-y-1">
                {items.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between py-3 border-b border-white/10"
                  >
                    <div className="flex-1 min-w-0 pr-3">
                      <p className="text-sm text-white/90 font-500 truncate">{p.name}</p>
                      <p className="text-[10px] text-white/40 font-300">{p.unit}€ / unité (HT)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(p.id, -1)}
                        aria-label="Diminuer"
                        className="w-7 h-7 border border-white/25 text-white flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors"
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-600 text-sm">{qty[p.id] ?? 0}</span>
                      <button
                        onClick={() => updateQty(p.id, 1)}
                        aria-label="Augmenter"
                        className="w-7 h-7 border border-white/25 text-white flex items-center justify-center hover:bg-white/10 cursor-pointer transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Récap + CTA */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <p className="text-xs text-white/60 font-600 tracking-widest uppercase mb-1">
              {totalItems} article{totalItems > 1 ? "s" : ""} sélectionné{totalItems > 1 ? "s" : ""}
            </p>
            <p className="font-serif text-4xl text-brand-turquoise">
              ≈ {totalPrice}€ <span className="text-base text-white/60">HT</span>
            </p>
            <p className="text-xs text-white/50 font-300 mt-1">
              Tarif estimé avec remise volume · Devis officiel sous 48h
            </p>
          </div>
          <button
            disabled={totalItems === 0}
            className={clsx(
              "btn-primary",
              totalItems === 0 && "opacity-40 cursor-not-allowed"
            )}
          >
            Obtenir mon devis gratuit en 1 clic
          </button>
        </div>
      </div>
    </section>
  );
}

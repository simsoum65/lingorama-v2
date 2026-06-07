const BRANDS = [
  "BLANC DES VOSGES",
  "TRADILINGE",
  "ANNE DE SOLÈNE",
  "JALLA",
  "DESCAMPS",
  "GARNIER-THIEBAUT",
];

export default function Brands() {
  return (
    <section className="bg-white border-y border-black/5 py-12 overflow-hidden">
      <div className="container-prose mb-8">
        <p className="text-center text-xs text-ink-muted font-600 tracking-widest uppercase">
          Les plus grandes maisons françaises, à prix d&apos;usine
        </p>
      </div>
      <div className="flex items-center justify-around gap-12 flex-wrap px-6">
        {BRANDS.map((b) => (
          <div
            key={b}
            className="font-serif text-lg md:text-xl tracking-[0.2em] text-brand-marine/40 hover:text-brand-marine transition-colors duration-300"
          >
            {b}
          </div>
        ))}
      </div>
    </section>
  );
}

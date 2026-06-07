import Link from "next/link";

const CATEGORIES = [
  {
    title: "Draps-housses",
    subtitle: "57, 80 & 120 fils — toutes tailles, tous bonnets",
    href: "/linge-de-lit/draps-housses",
    accent: "from-brand-turquoise/40 to-brand-marine/60",
    pattern: "weave",
  },
  {
    title: "Parures de lit",
    subtitle: "Housses de couette & taies coordonnées",
    href: "/linge-de-lit/draps-housses",
    accent: "from-accent-gold/40 to-brand-marine/60",
    pattern: "satin",
  },
  {
    title: "Couettes & Oreillers",
    subtitle: "Été, hiver, 4 saisons — selon votre profil",
    href: "/linge-de-lit/draps-housses",
    accent: "from-brand-marine/60 to-brand-marine-deep/80",
    pattern: "dots",
  },
  {
    title: "Protection literie",
    subtitle: "Protège-matelas bonnets 25, 30 & 35 cm",
    href: "/linge-de-lit/draps-housses",
    accent: "from-feedback-success/40 to-brand-marine/60",
    pattern: "lines",
  },
  {
    title: "Linge de bain",
    subtitle: "Serviettes 500g/m² — qualité hôtelière",
    href: "/linge-de-lit/draps-housses",
    accent: "from-brand-turquoise/50 to-brand-turquoise-dark/70",
    pattern: "waves",
  },
  {
    title: "Linge de table",
    subtitle: "Nappes & serviettes en pur coton",
    href: "/linge-de-lit/draps-housses",
    accent: "from-accent-gold/50 to-accent-gold-dark/70",
    pattern: "grid",
  },
];

const SvgPattern = ({ kind }: { kind: string }) => {
  switch (kind) {
    case "weave":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="weave" width="6" height="6" patternUnits="userSpaceOnUse">
              <path d="M0 3 L6 3 M3 0 L3 6" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#weave)" />
        </svg>
      );
    case "satin":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="satin" x1="0" x2="1">
              <stop offset="0" stopColor="white" stopOpacity="0" />
              <stop offset="0.5" stopColor="white" stopOpacity="0.4" />
              <stop offset="1" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill="url(#satin)" />
        </svg>
      );
    case "waves":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 50 Q25 30 50 50 T100 50 V100 H0 Z" fill="white" opacity="0.4" />
          <path d="M0 70 Q25 50 50 70 T100 70 V100 H0 Z" fill="white" opacity="0.3" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Categories() {
  return (
    <section className="bg-bg-warm py-24">
      <div className="container-prose">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="label-eyebrow mb-3">Explorer la maison</p>
          <h2 className="font-serif text-4xl md:text-5xl text-brand-marine mb-4">
            Tout pour habiller votre intérieur, du sol au coucher.
          </h2>
          <p className="text-ink-muted font-300">
            Six univers, une seule promesse : la qualité des plus grandes maisons,
            au prix de l&apos;usine.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.title}
              href={cat.href}
              className={`group relative overflow-hidden aspect-[4/5] cursor-pointer bg-gradient-to-br ${cat.accent} ${
                i === 0 ? "lg:col-span-2 lg:row-span-2 lg:aspect-square" : ""
              }`}
            >
              <SvgPattern kind={cat.pattern} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white">
                <h3 className={`font-serif ${i === 0 ? "text-4xl md:text-6xl" : "text-2xl md:text-3xl"} mb-2 leading-tight`}>
                  {cat.title}
                </h3>
                <p className={`${i === 0 ? "text-base" : "text-xs"} font-300 text-white/85 mb-4 max-w-xs`}>
                  {cat.subtitle}
                </p>
                <span className="inline-flex items-center gap-2 text-xs font-700 tracking-widest uppercase text-brand-turquoise group-hover:gap-3 transition-all">
                  Découvrir
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

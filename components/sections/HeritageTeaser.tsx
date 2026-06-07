import Link from "next/link";

export default function HeritageTeaser() {
  return (
    <section className="bg-bg-warm py-24 overflow-hidden relative">
      <div className="container-prose grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 order-2 lg:order-1">
          <p className="label-eyebrow mb-4">Maison fondée en 1975</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-marine leading-[1.05] mb-6">
            Une histoire vosgienne,<br />
            <span className="italic">tissée à la main.</span>
          </h2>
          <p className="text-ink leading-relaxed mb-4 max-w-xl">
            Tout commence en 1975, dans les Vosges. <strong className="font-600">Guy Auplat</strong>,
            ingénieur textile et <strong className="font-600 text-brand-turquoise">Meilleur Ouvrier de France</strong>,
            connaît chaque manufacture, chaque tissage. Il imagine un concept inédit&nbsp;:
            offrir le linge des plus belles maisons à <strong>prix d&apos;usine dégriffés</strong>,
            sans intermédiaire.
          </p>
          <p className="text-ink-muted font-300 leading-relaxed mb-8 max-w-xl">
            Quarante ans plus tard, c&apos;est <strong className="text-brand-marine font-600">Laurent Auplat</strong> qui
            perpétue l&apos;héritage familial à Nancy. Même exigence, même promesse&nbsp;:
            la qualité hôtelière, accessible à tous.
          </p>

          <blockquote className="border-l-2 border-brand-turquoise pl-6 my-8 italic font-serif text-lg md:text-xl text-brand-marine max-w-xl">
            « Le beau linge n&apos;est pas un luxe, c&apos;est un héritage. »
            <footer className="mt-3 not-italic text-xs font-sans font-600 tracking-widest uppercase text-ink-muted">
              — Laurent Auplat, Directeur Général
            </footer>
          </blockquote>

          <Link href="/notre-histoire" className="btn-secondary">
            Lire notre histoire
          </Link>
        </div>

        {/* Composition visuelle */}
        <div className="lg:col-span-5 order-1 lg:order-2 relative">
          <div className="relative aspect-[4/5] bg-gradient-to-br from-brand-marine via-brand-marine-deep to-black overflow-hidden">
            {/* Texture lin */}
            <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="linen-pattern" width="4" height="4" patternUnits="userSpaceOnUse">
                  <path d="M0 2 L4 2 M2 0 L2 4" stroke="white" strokeWidth="0.3" />
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#linen-pattern)" />
            </svg>

            {/* Médaillon MOF */}
            <div className="absolute top-8 left-8 right-8 flex items-start gap-4 text-white">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="flex-shrink-0">
                <circle cx="30" cy="30" r="28" stroke="#00B5C8" strokeWidth="1.5" />
                <circle cx="30" cy="30" r="22" stroke="#00B5C8" strokeWidth="0.8" />
                <path d="M30 12 L33 22 L43 22 L35 28 L38 38 L30 32 L22 38 L25 28 L17 22 L27 22 Z" fill="#00B5C8" />
              </svg>
              <div>
                <p className="font-serif text-xl leading-tight">Meilleur Ouvrier<br />de France</p>
                <p className="text-xs text-white/60 mt-1 font-300">Guy Auplat, fondateur</p>
              </div>
            </div>

            {/* Chiffres-clés */}
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-4 text-white border-t border-white/20 pt-6">
              <div>
                <p className="font-serif text-3xl text-brand-turquoise">50</p>
                <p className="text-[10px] uppercase tracking-widest font-600 mt-1">Ans d&apos;expertise</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-brand-turquoise">3</p>
                <p className="text-[10px] uppercase tracking-widest font-600 mt-1">Showrooms</p>
              </div>
              <div>
                <p className="font-serif text-3xl text-brand-turquoise">-50%</p>
                <p className="text-[10px] uppercase tracking-widest font-600 mt-1">Prix moyen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

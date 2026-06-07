import Link from "next/link";

export default function ProTeaser() {
  return (
    <section className="bg-brand-marine py-20 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="dots-pro" width="3" height="3" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="0.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#dots-pro)" />
        </svg>
      </div>

      <div className="container-prose relative grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        <div>
          <p className="label-eyebrow mb-3 text-brand-turquoise">Lingorama Pro · B2B</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
            Équipez votre établissement<br />
            <span className="italic text-brand-turquoise">comme un 5 étoiles.</span>
          </h2>
          <p className="text-white/75 font-300 mb-8 max-w-lg">
            Gîtes, hôtels, chambres d&apos;hôtes, Airbnb&nbsp;: bénéficiez de
            <strong className="text-white"> tarifs dégressifs dès 10 pièces</strong>, d&apos;un
            commercial dédié et d&apos;un devis automatique en 1 clic.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/pro" className="btn-primary">
              Demander un devis
            </Link>
            <Link
              href="/pro"
              className="btn-secondary text-white border-white hover:bg-white hover:text-brand-marine"
            >
              Découvrir Lingorama Pro
            </Link>
          </div>
        </div>

        {/* Bloc bénéfices */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { n: "10+", label: "Pièces minimum, pas de MOQ prohibitif" },
            { n: "-40%", label: "Remise moyenne en volume" },
            { n: "48h", label: "Devis personnalisé renvoyé" },
            { n: "1✕", label: "Contact unique, commercial dédié" },
          ].map((b) => (
            <div key={b.n} className="border border-white/15 p-6 hover:border-brand-turquoise transition-colors">
              <p className="font-serif text-4xl text-brand-turquoise mb-1">{b.n}</p>
              <p className="text-xs text-white/70 font-300 leading-snug">{b.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

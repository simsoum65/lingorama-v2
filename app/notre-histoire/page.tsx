import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Notre Histoire — Lingorama, le linge de maison de qualité depuis 1975",
  description:
    "L'histoire vraie de Lingorama : fondée en 1975 par Guy Auplat, Meilleur Ouvrier de France, ingénieur textile vosgien. Une maison familiale du linge de maison à prix d'usine.",
};

const MILESTONES = [
  {
    year: "1975",
    title: "L'idée vosgienne",
    body: "Guy Auplat, ingénieur textile et Meilleur Ouvrier de France, imagine un concept inédit : offrir le linge des plus grandes maisons à prix d'usine dégriffés, sans intermédiaires.",
  },
  {
    year: "1982",
    title: "Premier showroom à Nancy",
    body: "Ouverture du premier magasin Lingorama à Nancy-Essey. Un espace de 600 m² où l'on peut toucher, comparer, et acheter au kilo les plus belles pièces des manufactures partenaires.",
  },
  {
    year: "1995",
    title: "Expansion régionale",
    body: "Reims puis Dijon rejoignent l'aventure. Les showrooms atteignent jusqu'à 1 000 m², avec une sélection toujours plus large de Blanc des Vosges, Tradilinge et Anne de Solène.",
  },
  {
    year: "2010",
    title: "La continuité familiale",
    body: "Laurent Auplat reprend les rênes. Même exigence, même promesse : le linge de qualité hôtelière, accessible. Lancement progressif de la vente en ligne.",
  },
  {
    year: "2025",
    title: "Lingorama, nouvelle génération",
    body: "Refonte complète de l'expérience numérique : configurateur 3D, diagnostic sommeil, livraison express. L'esprit de Guy Auplat, à l'ère digitale.",
  },
];

export default function Page() {
  return (
    <article className="bg-white">
      {/* Hero */}
      <section className="relative bg-brand-marine-deep text-white py-24 md:py-36 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="story-linen" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M0 2 L4 2 M2 0 L2 4" stroke="white" strokeWidth="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#story-linen)" />
        </svg>

        <div className="container-prose relative">
          <p className="label-eyebrow mb-4 text-brand-turquoise">Maison fondée en 1975</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl mb-6">
            Une histoire vosgienne,<br />
            <span className="italic text-brand-turquoise">tissée à la main.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-300 max-w-2xl leading-relaxed">
            Cinquante ans après son ouverture, l&apos;esprit de Guy&nbsp;Auplat — Meilleur Ouvrier
            de France, ingénieur textile dans les Vosges — guide encore chacune de nos
            sélections.
          </p>
        </div>
      </section>

      {/* Le fondateur */}
      <section className="py-24 md:py-32">
        <div className="container-prose grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <aside className="lg:col-span-5">
            <div className="sticky top-32">
              <p className="label-eyebrow mb-3">Le fondateur</p>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-marine leading-tight mb-6">
                Guy Auplat,<br />
                <span className="italic">l&apos;œil et la main.</span>
              </h2>
              <div className="aspect-[4/5] bg-gradient-to-br from-bg-warm to-brand-marine/20 relative overflow-hidden">
                {/* Médaillon MOF + chiffres */}
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="60" r="55" stroke="#C9A96E" strokeWidth="1.5" />
                    <circle cx="60" cy="60" r="45" stroke="#C9A96E" strokeWidth="0.8" />
                    <path d="M60 24 L66 44 L86 44 L70 56 L76 76 L60 64 L44 76 L50 56 L34 44 L54 44 Z" fill="#C9A96E" />
                    <text x="60" y="100" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#2D3E50" fontWeight="700">
                      MEILLEUR OUVRIER
                    </text>
                    <text x="60" y="110" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#2D3E50" fontWeight="700">
                      DE FRANCE
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-7 space-y-6 text-ink leading-relaxed text-lg">
            <p className="text-2xl font-serif text-brand-marine leading-relaxed italic">
              Tout commence dans les Vosges, en 1975.
            </p>
            <p>
              Guy Auplat, ingénieur textile de formation et fier{" "}
              <strong className="font-600 text-brand-turquoise">Meilleur Ouvrier de France</strong>,
              passe ses journées dans les ateliers des plus grandes manufactures vosgiennes —
              ces maisons d&apos;excellence qui tissent depuis des générations les plus beaux
              draps de France.
            </p>
            <p>
              Il connaît chaque fil, chaque armure, chaque finition. Il sait reconnaître,
              à la main, la douceur d&apos;un{" "}
              <strong className="font-600">satin de coton 120 fils</strong> et la fraîcheur
              caractéristique d&apos;une <strong className="font-600">percale 80 fils</strong>{" "}
              impeccablement tissée.
            </p>
            <p>
              Mais Guy Auplat a une conviction : ces trésors textiles, synonymes de grand
              confort et de longévité, ne devraient pas être réservés à une clientèle
              fortunée. Il imagine alors un concept novateur — un espace généreux,
              chaleureux, où les fins de séries, les dégriffés et les surplus des plus
              grandes manufactures seraient proposés à <strong className="font-600">
              prix d&apos;usine
              </strong>, sans intermédiaire, sans compromis sur la qualité.
            </p>
            <p className="font-serif text-3xl text-brand-marine">
              C&apos;est la naissance de <em className="text-brand-turquoise">Lingorama</em>.
            </p>

            <hr className="border-black/10 my-12" />

            <p>
              L&apos;enseigne, fondée à Nancy, grandit avec ses clients. Les showrooms
              s&apos;agrandissent — Nancy-Essey, Reims, Dijon — ces vastes espaces de 600 à
              1&nbsp;000 m² où l&apos;on vient toucher, comparer, choisir.
            </p>
            <p>
              Lingorama devient la référence régionale pour qui cherche du{" "}
              <strong className="font-600">linge de maison de qualité</strong> à prix
              raisonnable : <strong>Blanc des Vosges</strong>, <strong>Tradilinge</strong>,{" "}
              <strong>Anne de Solène</strong>, <strong>Jalla</strong> — les plus grandes
              maisons du secteur y côtoient des collections exclusives.
            </p>
            <p>
              Aujourd&apos;hui, c&apos;est{" "}
              <strong className="font-600 text-brand-turquoise">Laurent Auplat</strong> qui
              perpétue l&apos;héritage familial. Même exigence. Même authenticité. Même
              promesse&nbsp;: vous offrir le linge des palaces et des hôtels de luxe, à des
              prix que personne d&apos;autre ne peut égaler, parce que Lingorama achète au
              plus près de la production, dans les ateliers mêmes où tout est fabriqué.
            </p>

            <blockquote className="border-l-4 border-brand-turquoise pl-6 py-2 my-12 italic font-serif text-2xl text-brand-marine">
              « Mon père avait une phrase simple : le beau linge n&apos;est pas un luxe,
              c&apos;est un héritage. Chez Lingorama, nous le rendons accessible à tous. »
              <footer className="mt-4 not-italic text-xs font-sans font-700 tracking-widest uppercase text-ink-muted">
                — Laurent Auplat, Directeur Général
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Frise chronologique */}
      <section className="bg-bg-warm py-24 md:py-32">
        <div className="container-prose">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <p className="label-eyebrow mb-3">Cinquante ans de transmission</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-marine">
              Les étapes qui ont façonné la maison.
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-brand-turquoise/30 -translate-x-1/2" />
            {MILESTONES.map((m, i) => (
              <div
                key={m.year}
                className={`relative mb-12 md:mb-20 md:w-1/2 ${
                  i % 2 === 0 ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12"
                }`}
              >
                <div className={`absolute top-2 ${
                  i % 2 === 0
                    ? "left-8 md:left-auto md:right-0 md:translate-x-1/2"
                    : "left-8 md:left-0 md:-translate-x-1/2"
                } -translate-x-1/2 w-4 h-4 rounded-full bg-brand-turquoise ring-4 ring-bg-warm`} />
                <div className="ml-16 md:ml-0">
                  <p className="font-serif text-5xl text-brand-turquoise mb-1">{m.year}</p>
                  <h3 className="font-serif text-2xl text-brand-marine mb-2">{m.title}</h3>
                  <p className="text-ink-muted font-300 leading-relaxed">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA fin */}
      <section className="bg-white py-24">
        <div className="container-prose text-center max-w-2xl">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-marine mb-4 leading-tight">
            <span className="italic">Lingorama.</span><br />
            L&apos;expert de votre sommeil depuis 1975.
          </h2>
          <p className="text-ink-muted font-300 mb-10">
            Cinquante ans plus tard, notre promesse n&apos;a pas changé : vous offrir le
            beau linge à son juste prix.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/configurateur" className="btn-primary">
              Configurer mon lit
            </Link>
            <Link href="/diagnostic" className="btn-secondary">
              Diagnostic sommeil
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}

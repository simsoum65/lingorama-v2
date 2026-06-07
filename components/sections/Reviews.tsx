const REVIEWS = [
  {
    name: "Marie L.",
    location: "Nancy",
    rating: 5,
    title: "Comme dans un palace, à moitié prix",
    body: "J'ai craqué pour le satin 120 fils Tradilinge. Soyeux, parfaitement coupé, livré en 2 jours. Le service était au rendez-vous. Je ne vois plus mon lit pareil.",
  },
  {
    name: "Antoine D.",
    location: "Reims",
    rating: 5,
    title: "Le configurateur est un bijou",
    body: "Sceptique au départ, mais c'est ludique et clair. J'ai composé toute ma parure en 4 minutes, et l'addition est restée bien en dessous de ce que j'aurais payé ailleurs.",
  },
  {
    name: "Sophie M.",
    location: "Dijon",
    rating: 5,
    title: "Du linge qui dure",
    body: "Cliente depuis 12 ans. Les draps Blanc des Vosges tiennent lavage après lavage. Et le diagnostic m'a permis de comprendre pourquoi je transpirais la nuit (j'avais trop chaud sous mon ancienne couette).",
  },
];

function Stars({ value }: { value: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < value ? "#C9A96E" : "#E5E5E5"}>
          <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews() {
  return (
    <section className="bg-white py-24">
      <div className="container-prose">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-6">
          <div>
            <p className="label-eyebrow mb-3">Vous en parlez mieux que nous</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-marine">
              4,8 / 5 · plus de 12&nbsp;000 avis vérifiés.
            </h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-ink-muted">
            <Stars value={5} />
            <span>Avis Vérifiés certifiés</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="border border-black/10 p-8 hover:border-brand-turquoise/50 transition-colors duration-200 bg-white"
            >
              <Stars value={r.rating} />
              <h4 className="font-serif text-xl text-brand-marine mt-4 mb-3">
                {r.title}
              </h4>
              <p className="text-sm text-ink-muted font-300 leading-relaxed mb-6">
                « {r.body} »
              </p>
              <footer className="pt-4 border-t border-black/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-turquoise/15 flex items-center justify-center text-brand-turquoise font-700 text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-sm font-600 text-brand-marine">{r.name}</p>
                  <p className="text-xs text-ink-muted">{r.location} · Cliente vérifiée</p>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const USPS = [
  {
    title: "Prix d'usine depuis 1975",
    description: "Pas d'intermédiaires. Pas de marketing. Juste le linge — et son juste prix.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Meilleur Ouvrier de France",
    description: "L'expertise textile fondatrice de Guy Auplat, ingénieur vosgien et MOF.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
      </svg>
    ),
  },
  {
    title: "Grandes marques dégriffées",
    description: "Blanc des Vosges, Tradilinge, Anne de Solène, Jalla — jusqu'à -50%.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82" />
        <path d="M7 7h.01" />
      </svg>
    ),
  },
  {
    title: "Livraison & retour offerts",
    description: "Livraison gratuite dès 79€. Retours sous 30 jours, sans frais ni questions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M5 18H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v11M14 18H9M19 18h2v-5l-3-4h-3v9M19 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4M7 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
      </svg>
    ),
  },
];

export default function USPs() {
  return (
    <section className="bg-white border-b border-black/5">
      <div className="container-prose py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {USPS.map((u) => (
            <div key={u.title} className="flex flex-col items-start">
              <div className="w-12 h-12 mb-4 text-brand-turquoise">{u.icon}</div>
              <h3 className="font-serif text-xl md:text-2xl text-brand-marine mb-2 leading-tight">
                {u.title}
              </h3>
              <p className="text-sm text-ink-muted font-300 leading-relaxed">
                {u.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

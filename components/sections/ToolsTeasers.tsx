import Link from "next/link";

export default function ToolsTeasers() {
  return (
    <section className="bg-bg-warm py-24">
      <div className="container-prose">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configurateur */}
          <Link
            href="/configurateur"
            className="group relative overflow-hidden p-10 md:p-14 bg-brand-marine-deep text-white cursor-pointer"
          >
            <div className="absolute inset-0 opacity-30">
              <svg viewBox="0 0 400 400" className="absolute -right-20 -bottom-10 w-96 h-96" fill="none">
                <ellipse cx="200" cy="200" rx="180" ry="60" fill="#00B5C8" opacity="0.4" />
                <rect x="60" y="180" width="280" height="80" rx="6" fill="#FFFFFF" opacity="0.6" />
                <rect x="80" y="140" width="240" height="50" rx="8" fill="#00B5C8" />
                <rect x="100" y="160" width="60" height="30" rx="3" fill="#FAFAF9" />
                <rect x="170" y="160" width="60" height="30" rx="3" fill="#FAFAF9" />
              </svg>
            </div>
            <div className="relative">
              <p className="label-eyebrow mb-3 text-brand-turquoise">Outil exclusif</p>
              <h3 className="font-serif text-3xl md:text-4xl mb-4 leading-tight">
                Dessinez votre lit<br />en 3D temps réel.
              </h3>
              <p className="text-white/70 font-300 mb-8 max-w-md">
                Choisissez taille, tissage, couette, oreillers et parure — visualisez
                votre combinaison parfaite, et ajoutez-la d&apos;un clic.
              </p>
              <span className="inline-flex items-center gap-3 text-xs font-700 tracking-widest uppercase text-brand-turquoise group-hover:gap-4 transition-all">
                Lancer le configurateur
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Diagnostic */}
          <Link
            href="/diagnostic"
            className="group relative overflow-hidden p-10 md:p-14 bg-white border border-black/5 cursor-pointer"
          >
            <div className="absolute -top-20 -right-10 w-72 h-72 rounded-full bg-gradient-to-br from-brand-turquoise/20 to-transparent" />
            <div className="relative">
              <p className="label-eyebrow mb-3">Diagnostic personnalisé</p>
              <h3 className="font-serif text-3xl md:text-4xl text-brand-marine mb-4 leading-tight">
                Votre expert<br />sommeil en 3 questions.
              </h3>
              <p className="text-ink-muted font-300 mb-8 max-w-md">
                Frileux ou « j&apos;ai chaud » ? Côté, dos, ventre ? On vous compose
                en 90 secondes le pack qui vous correspond, déjà au prix Lingorama.
              </p>

              {/* Mini stepper visuel */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((n, i) => (
                  <div key={n} className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 ${i === 0 ? "bg-brand-turquoise text-white" : "bg-black/5 text-ink-muted"}`}>
                      {n}
                    </div>
                    {i < 2 && <div className="w-8 h-px bg-black/10" />}
                  </div>
                ))}
              </div>

              <span className="inline-flex items-center gap-3 text-xs font-700 tracking-widest uppercase text-brand-turquoise group-hover:gap-4 transition-all">
                Commencer mon diagnostic
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

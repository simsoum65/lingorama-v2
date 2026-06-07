import type { Metadata } from "next";
import ProOrderGrid from "@/components/pro/ProOrderGrid";

export const metadata: Metadata = {
  title: "Lingorama Pro — Linge de Maison pour Professionnels | Prix Volume",
  description:
    "Gîtes, hôtels, chambres d'hôtes, Airbnb : tarifs dégressifs dès 10 pièces, devis automatique en 1 clic, commercial dédié. Linge de lit, bain, table à prix d'usine.",
};

const ARGUMENTS = [
  {
    title: "Prix de gros sans MOQ prohibitif",
    body: "Tarifs dégressifs dès 10 pièces. Pas de quantité minimum à 500 ou 1000 pcs comme chez nos confrères.",
    icon: "💰",
  },
  {
    title: "Qualité hôtelière certifiée",
    body: "Le même linge que les établissements 3 et 4 étoiles. Blanc des Vosges, Tradilinge, qualité usine.",
    icon: "★",
  },
  {
    title: "Livraison professionnelle",
    body: "Palettes sur rendez-vous, étiquetage personnalisé disponible, factures pro avec TVA détaillée.",
    icon: "🚛",
  },
  {
    title: "Commercial dédié",
    body: "Un seul interlocuteur pour tous vos besoins. Réassort rapide, conseils sur mesure, devis sous 48h.",
    icon: "✎",
  },
];

const TESTIMONIALS = [
  {
    name: "Mathieu C.",
    role: "Hôtel 4★ · Strasbourg",
    body: "Depuis qu'on est passé chez Lingorama Pro, le linge de chambre coûte 35 % moins cher pour une qualité identique à notre ancien fournisseur. Le service est top.",
  },
  {
    name: "Camille R.",
    role: "Gîte rural · Vosges",
    body: "Pour mes 6 gîtes, j'ai trouvé enfin un fournisseur qui ne m'impose pas de palette entière. Devis reçu en 24 h, livraison une semaine plus tard.",
  },
  {
    name: "Sébastien M.",
    role: "Conciergerie Airbnb · Reims",
    body: "Le système de réassort est génial : un coup de fil, le commercial connaît mon parc, et c'est livré. Le linge tient parfaitement les 200 lavages/an.",
  },
];

export default function Page() {
  return (
    <article>
      {/* Hero */}
      <section className="relative bg-brand-marine py-24 md:py-36 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="pro-pattern" width="3" height="3" patternUnits="userSpaceOnUse">
                <path d="M0 1.5 L3 1.5 M1.5 0 L1.5 3" stroke="white" strokeWidth="0.2" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#pro-pattern)" />
          </svg>
        </div>
        <div className="container-prose relative">
          <p className="label-eyebrow mb-4 text-brand-turquoise">Lingorama Pro · B2B</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] mb-6 max-w-4xl">
            Équipez votre établissement<br />
            <span className="italic text-brand-turquoise">comme un 5 étoiles.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/75 font-300 max-w-2xl leading-relaxed mb-10">
            Gîtes, hôtels, chambres d&apos;hôtes, Airbnb, conciergerie&nbsp;: bénéficiez de
            tarifs négociés à l&apos;usine, d&apos;un commercial dédié et d&apos;un devis
            automatique en 1 clic.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#devis" className="btn-primary">Composer mon devis</a>
            <a href="#contact" className="btn-secondary text-white border-white hover:bg-white hover:text-brand-marine">
              Être recontacté
            </a>
          </div>
        </div>
      </section>

      {/* Arguments */}
      <section className="bg-white py-20 md:py-24">
        <div className="container-prose">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="label-eyebrow mb-3">Pourquoi choisir Lingorama Pro</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-marine">
              Quatre raisons concrètes.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ARGUMENTS.map((a) => (
              <div key={a.title} className="p-6 border border-black/10 hover:border-brand-turquoise transition-colors">
                <div className="text-3xl text-brand-turquoise mb-4">{a.icon}</div>
                <h3 className="font-serif text-xl text-brand-marine mb-2">{a.title}</h3>
                <p className="text-sm text-ink-muted font-300 leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volume order grid */}
      <div id="devis">
        <ProOrderGrid />
      </div>

      {/* Témoignages */}
      <section className="bg-bg-warm py-20 md:py-24">
        <div className="container-prose">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="label-eyebrow mb-3">Ils nous font confiance</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-marine">
              200+ professionnels équipés en France.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <article key={t.name} className="bg-white p-8 border border-black/10">
                <svg width="30" height="22" viewBox="0 0 30 22" fill="#00B5C8" className="mb-4 opacity-30">
                  <path d="M0 22V11C0 4.9 4.9 0 11 0v4c-3.9 0-7 3.1-7 7h7v11H0zM19 22V11C19 4.9 23.9 0 30 0v4c-3.9 0-7 3.1-7 7h7v11H19z" />
                </svg>
                <p className="text-sm text-ink leading-relaxed font-300 mb-6 italic">
                  « {t.body} »
                </p>
                <footer className="pt-4 border-t border-black/10">
                  <p className="font-600 text-brand-marine text-sm">{t.name}</p>
                  <p className="text-xs text-ink-muted">{t.role}</p>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire contact */}
      <section id="contact" className="bg-white py-20 md:py-24">
        <div className="container-prose max-w-3xl">
          <div className="text-center mb-12">
            <p className="label-eyebrow mb-3">Vous préférez en parler ?</p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-marine">
              Un commercial vous rappelle sous 24h.
            </h2>
          </div>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Nom de l'établissement *" type="text" required />
            <Field label="Votre nom *" type="text" required />
            <Field label="Email professionnel *" type="email" required />
            <Field label="Téléphone *" type="tel" required />
            <div className="md:col-span-2">
              <p className="label-eyebrow mb-2">Type d&apos;établissement</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {["Hôtel", "Gîte / B&B", "Airbnb", "Conciergerie", "Restaurant", "Spa", "Camping", "Autre"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className="py-2 text-xs font-500 border border-black/15 hover:border-brand-turquoise hover:text-brand-turquoise transition-colors cursor-pointer"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <p className="label-eyebrow mb-2">Votre message</p>
              <textarea
                rows={4}
                className="w-full border border-black/15 px-4 py-3 text-sm font-sans focus:border-brand-turquoise focus:outline-none transition-colors"
                placeholder="Décrivez votre besoin (nombre de lits, fréquence de réassort, type de linge...)"
              />
            </div>
            <div className="md:col-span-2 flex items-center justify-between flex-wrap gap-4">
              <p className="text-xs text-ink-muted font-300 max-w-md">
                Vos données restent confidentielles, utilisées uniquement pour vous recontacter dans le cadre de votre demande.
              </p>
              <button type="submit" className="btn-primary">
                Demander à être rappelé
              </button>
            </div>
          </form>
        </div>
      </section>
    </article>
  );
}

function Field({ label, type, required }: { label: string; type: string; required?: boolean }) {
  return (
    <div>
      <p className="label-eyebrow mb-2">{label}</p>
      <input
        type={type}
        required={required}
        className="w-full border-b-2 border-black/15 px-1 py-3 text-sm font-sans focus:border-brand-turquoise focus:outline-none transition-colors bg-transparent"
      />
    </div>
  );
}

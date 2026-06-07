import type { Metadata } from "next";
import Link from "next/link";
import CategoryFilters from "@/components/category/CategoryFilters";

export const metadata: Metadata = {
  title: "Draps-Housses | Coton 57 fils, Percale 80 fils, Satin 120 fils | Lingorama",
  description:
    "Découvrez notre sélection de draps-housses de qualité : coton 57 fils, percale 80 fils et satin de coton 120 fils. Toutes tailles, bonnets 25 à 35 cm, grandes marques dégriffées à prix d'usine. Livraison offerte dès 79€.",
  keywords: [
    "drap housse percale",
    "drap housse satin 120 fils",
    "drap housse coton",
    "drap housse 160x200",
    "drap housse bonnet 30",
    "prix usine",
  ],
};

export default function Page() {
  return (
    <article>
      {/* Breadcrumb + hero catégorie */}
      <header className="bg-bg-warm border-b border-black/5">
        <div className="container-prose py-10">
          <nav className="text-xs text-ink-muted mb-4">
            <Link href="/" className="hover:text-brand-turquoise cursor-pointer">Accueil</Link>
            <span className="mx-2">/</span>
            <Link href="/linge-de-lit/draps-housses" className="hover:text-brand-turquoise cursor-pointer">Linge de lit</Link>
            <span className="mx-2">/</span>
            <span className="text-brand-marine font-500">Draps-housses</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8">
              <p className="label-eyebrow mb-2">Catégorie reine — Linge de lit</p>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-marine leading-tight mb-4">
                Draps-housses de qualité<br className="hidden md:inline" /> à prix d&apos;usine.
              </h1>
              <p className="text-ink leading-relaxed max-w-2xl">
                Depuis 1975, <strong className="font-600">Lingorama</strong> sélectionne pour
                vous les meilleurs draps-housses des grandes manufactures françaises, proposés
                à <strong className="font-600">prix d&apos;usine dégriffés</strong> sans compromis
                sur la qualité. Notre catalogue réunit trois niveaux de tissage pour répondre
                à chaque profil de dormeur : le <strong>coton classique 57 fils</strong> pour
                un confort moelleux et respirant, la <strong>percale 80 fils</strong> pour une
                fraîcheur et une précision incomparables, et le{" "}
                <strong>satin de coton 120 fils</strong> pour une douceur digne des plus grands
                hôtels. Disponibles dans toutes les dimensions du marché — de 80&nbsp;×&nbsp;200&nbsp;cm
                à 200&nbsp;×&nbsp;200&nbsp;cm — et avec des bonnets profonds de 25 à 35&nbsp;cm pour
                s&apos;adapter à tous les matelas, nos draps-housses{" "}
                <strong>Blanc des Vosges</strong>, <strong>Tradilinge</strong> et{" "}
                <strong>Anne de Solène</strong> vous attendent à prix imbattables.
              </p>
            </div>

            <aside className="lg:col-span-4 bg-white p-6 border border-black/10">
              <p className="label-eyebrow mb-3">Besoin d&apos;aide pour choisir&nbsp;?</p>
              <p className="text-sm text-ink-muted font-300 mb-5">
                3 questions, 90 secondes, un pack expert composé sur mesure.
              </p>
              <Link href="/diagnostic" className="btn-primary w-full">
                Diagnostic sommeil
              </Link>
              <Link href="/configurateur" className="block text-center text-xs font-700 tracking-widest uppercase text-brand-turquoise mt-4 hover:underline cursor-pointer">
                Ou configurer mon lit en 3D →
              </Link>
            </aside>
          </div>
        </div>
      </header>

      <CategoryFilters />

      {/* Bloc pédagogique en pied de catégorie */}
      <section className="bg-white py-20 border-t border-black/5">
        <div className="container-prose grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Comment choisir la bonne taille ?",
              body: "Mesurez votre matelas en longueur, largeur et hauteur. Notre guide vous oriente vers les dimensions exactes du marché français.",
            },
            {
              title: "Quel bonnet pour mon matelas ?",
              body: "Bonnet 25 cm pour les matelas fins (<20 cm), 30 cm pour les standards (20-25 cm), 35 cm pour les épais (>25 cm).",
            },
            {
              title: "Percale ou satin ?",
              body: "Percale 80 fils pour la fraîcheur et la précision, satin 120 fils pour la douceur soyeuse et les reflets lumineux.",
            },
          ].map((b) => (
            <div key={b.title}>
              <h3 className="font-serif text-xl text-brand-marine mb-2">{b.title}</h3>
              <p className="text-sm text-ink-muted font-300 leading-relaxed">{b.body}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}

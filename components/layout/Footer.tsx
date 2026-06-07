import Link from "next/link";
import Logo from "@/components/ui/Logo";

const COLUMNS = [
  {
    title: "Boutique",
    links: [
      { label: "Draps-housses", href: "/linge-de-lit/draps-housses" },
      { label: "Housses de couette", href: "#" },
      { label: "Parures de lit", href: "#" },
      { label: "Couettes & Oreillers", href: "#" },
      { label: "Linge de bain", href: "#" },
      { label: "Linge de table", href: "#" },
    ],
  },
  {
    title: "Expertise",
    links: [
      { label: "Configurateur de lit", href: "/configurateur" },
      { label: "Diagnostic sommeil", href: "/diagnostic" },
      { label: "Guide du sommeil", href: "#" },
      { label: "Percale vs Satin", href: "#" },
      { label: "Hauteur de bonnet", href: "#" },
    ],
  },
  {
    title: "Maison Lingorama",
    links: [
      { label: "Notre histoire", href: "/notre-histoire" },
      { label: "Nos magasins", href: "#" },
      { label: "Lingorama Pro", href: "/pro" },
      { label: "Marques partenaires", href: "#" },
      { label: "Nous contacter", href: "#" },
    ],
  },
  {
    title: "Service Client",
    links: [
      { label: "Livraison & retours", href: "#" },
      { label: "Suivi de commande", href: "#" },
      { label: "Mentions légales", href: "#" },
      { label: "CGV", href: "#" },
      { label: "Confidentialité", href: "#" },
    ],
  },
];

const STORES = [
  { city: "Nancy-Essey", address: "Centre Commercial · 54270", hours: "Lun-Sam 10h-19h" },
  { city: "Reims", address: "Zone Cormontreuil · 51350", hours: "Lun-Sam 10h-19h" },
  { city: "Dijon", address: "Quétigny · 21800", hours: "Lun-Sam 10h-19h" },
];

export default function Footer() {
  return (
    <footer className="bg-brand-marine-deep text-white mt-32">
      {/* Bloc magasins */}
      <div className="border-b border-white/10">
        <div className="container-prose py-16">
          <p className="label-eyebrow mb-3" style={{ color: "#00B5C8" }}>
            Nos showrooms
          </p>
          <h3 className="font-serif text-3xl md:text-4xl mb-10">
            Venez toucher la qualité<span className="text-brand-turquoise">.</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STORES.map((s) => (
              <div key={s.city} className="border-l-2 border-brand-turquoise pl-5">
                <h4 className="font-serif text-2xl mb-1">{s.city}</h4>
                <p className="text-sm text-white/60 font-300">{s.address}</p>
                <p className="text-xs text-brand-turquoise mt-2 tracking-widest uppercase font-600">
                  {s.hours}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container-prose py-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-md">
            <p className="label-eyebrow mb-2">Lettre du linge</p>
            <h4 className="font-serif text-2xl">Recevez nos arrivages dégriffés en avant-première</h4>
          </div>
          <form className="flex gap-2 w-full md:w-auto md:min-w-[420px]">
            <input
              type="email"
              required
              placeholder="votre@email.fr"
              className="flex-1 bg-white/5 border border-white/20 px-4 py-3 text-sm font-sans text-white placeholder:text-white/40 focus:border-brand-turquoise focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-brand-turquoise text-white text-xs font-700 tracking-widest uppercase hover:bg-white hover:text-brand-marine transition-colors duration-200 cursor-pointer"
            >
              S&apos;inscrire
            </button>
          </form>
        </div>
      </div>

      {/* Navigation */}
      <div className="container-prose py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Logo variant="light" size="md" />
            <p className="mt-6 text-sm text-white/60 font-300 leading-relaxed">
              Le rendez-vous du beau linge à prix d&apos;usine, fondé par
              Guy&nbsp;Auplat, Meilleur Ouvrier de France, dans les Vosges en 1975.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h5 className="label-eyebrow mb-5">{col.title}</h5>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/70 hover:text-brand-turquoise transition-colors cursor-pointer"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Sous-pied */}
      <div className="border-t border-white/10">
        <div className="container-prose py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-xs text-white/50 font-300">
            © {new Date().getFullYear()} Lingorama — Maison fondée en 1975 ·
            Tissé en France, choisi avec exigence.
          </p>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <span>🇫🇷 Site français</span>
            <span>·</span>
            <span>Paiement sécurisé Stripe</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

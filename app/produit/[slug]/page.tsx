import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import ProductDetail from "@/components/product/ProductDetail";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = getProductBySlug(params.slug);
  if (!p) return { title: "Produit introuvable" };
  return {
    title: `${p.name} — ${p.brand} | ${p.lingoramaPrice}€ | Lingorama`,
    description: `${p.description} À partir de ${p.lingoramaPrice}€ chez Lingorama (prix public ${p.publicPrice}€).`,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <article>
      <nav className="bg-bg-warm border-b border-black/5">
        <div className="container-prose py-3 text-xs text-ink-muted">
          <Link href="/" className="hover:text-brand-turquoise cursor-pointer">Accueil</Link>
          <span className="mx-2">/</span>
          <Link href="/linge-de-lit/draps-housses" className="hover:text-brand-turquoise cursor-pointer">Linge de lit</Link>
          <span className="mx-2">/</span>
          <Link href="/linge-de-lit/draps-housses" className="hover:text-brand-turquoise cursor-pointer">Draps-housses</Link>
          <span className="mx-2">/</span>
          <span className="text-brand-marine font-500">{product.name}</span>
        </div>
      </nav>
      <ProductDetail product={product} />
    </article>
  );
}

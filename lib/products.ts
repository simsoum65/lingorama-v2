export type Product = {
  slug: string;
  name: string;
  brand: string;
  weave: "57" | "80" | "120";
  type: "drap-housse" | "housse-couette" | "parure";
  colors: { id: string; name: string }[];
  sizes: string[];
  bonnets: number[];
  publicPrice: number;
  lingoramaPrice: number;
  rating: number;
  reviewsCount: number;
  description: string;
  thumbnail: string; // gradient class
};

const COLORS_BASIC = [
  { id: "#FAFAF9", name: "Blanc" },
  { id: "#F5F0EB", name: "Écru" },
  { id: "#E8DCC8", name: "Sable" },
  { id: "#C9D6DC", name: "Bleu glacier" },
  { id: "#2D3E50", name: "Marine" },
  { id: "#7A8A6F", name: "Sauge" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "drap-housse-percale-blanc-des-vosges-essentiel",
    name: "Drap-housse Essentiel Percale",
    brand: "Blanc des Vosges",
    weave: "80",
    type: "drap-housse",
    colors: COLORS_BASIC,
    sizes: ["80x200", "90x200", "140x190", "140x200", "160x200", "180x200", "200x200"],
    bonnets: [25, 30, 35],
    publicPrice: 89,
    lingoramaPrice: 52,
    rating: 4.7,
    reviewsCount: 147,
    description: "Tissage percale 80 fils/cm² d'une finesse remarquable. Bonnet ajustable jusqu'à 35 cm.",
    thumbnail: "from-blue-50 to-slate-200",
  },
  {
    slug: "drap-housse-satin-tradilinge-luxe",
    name: "Drap-housse Satin Luxe",
    brand: "Tradilinge",
    weave: "120",
    type: "drap-housse",
    colors: COLORS_BASIC,
    sizes: ["140x200", "160x200", "180x200", "200x200"],
    bonnets: [30, 35],
    publicPrice: 149,
    lingoramaPrice: 89,
    rating: 4.9,
    reviewsCount: 232,
    description: "Satin de coton 120 fils, tombé fluide et lumineux digne des plus beaux palaces.",
    thumbnail: "from-amber-50 to-stone-300",
  },
  {
    slug: "drap-housse-coton-anne-de-solene-douceur",
    name: "Drap-housse Coton Douceur",
    brand: "Anne de Solène",
    weave: "57",
    type: "drap-housse",
    colors: COLORS_BASIC,
    sizes: ["80x200", "90x200", "140x190", "140x200", "160x200"],
    bonnets: [25, 30],
    publicPrice: 59,
    lingoramaPrice: 32,
    rating: 4.5,
    reviewsCount: 89,
    description: "Coton classique 57 fils tissé serré, doux et respirant. L'allié des familles.",
    thumbnail: "from-stone-100 to-amber-100",
  },
  {
    slug: "drap-housse-percale-jalla-marine",
    name: "Drap-housse Marine Percale",
    brand: "Jalla",
    weave: "80",
    type: "drap-housse",
    colors: COLORS_BASIC,
    sizes: ["140x200", "160x200", "180x200"],
    bonnets: [30, 35],
    publicPrice: 79,
    lingoramaPrice: 45,
    rating: 4.6,
    reviewsCount: 64,
    description: "Percale 80 fils teint dans la masse — couleur tenue lavage après lavage.",
    thumbnail: "from-slate-200 to-slate-700",
  },
  {
    slug: "drap-housse-satin-blanc-des-vosges-elegance",
    name: "Drap-housse Élégance Satin",
    brand: "Blanc des Vosges",
    weave: "120",
    type: "drap-housse",
    colors: COLORS_BASIC,
    sizes: ["160x200", "180x200", "200x200"],
    bonnets: [30, 35],
    publicPrice: 169,
    lingoramaPrice: 99,
    rating: 4.8,
    reviewsCount: 178,
    description: "Le summum du satin de coton vosgien. Tissage 120 fils, finition main.",
    thumbnail: "from-rose-50 to-stone-300",
  },
  {
    slug: "drap-housse-percale-tradilinge-quotidien",
    name: "Drap-housse Quotidien Percale",
    brand: "Tradilinge",
    weave: "80",
    type: "drap-housse",
    colors: COLORS_BASIC,
    sizes: ["80x200", "90x200", "120x200", "140x200", "160x200"],
    bonnets: [25, 30],
    publicPrice: 69,
    lingoramaPrice: 39,
    rating: 4.6,
    reviewsCount: 312,
    description: "Le best-seller. Percale 80 fils, qualité hôtelière, prix d'usine.",
    thumbnail: "from-emerald-50 to-stone-300",
  },
  {
    slug: "drap-housse-coton-jalla-essentiel",
    name: "Drap-housse Essentiel Coton",
    brand: "Jalla",
    weave: "57",
    type: "drap-housse",
    colors: COLORS_BASIC,
    sizes: ["80x200", "90x200", "140x190", "140x200"],
    bonnets: [25],
    publicPrice: 49,
    lingoramaPrice: 25,
    rating: 4.3,
    reviewsCount: 56,
    description: "Coton 57 fils traité anti-froissage. Idéal pour les chambres d'enfants.",
    thumbnail: "from-cyan-50 to-blue-100",
  },
  {
    slug: "drap-housse-satin-anne-de-solene-eclat",
    name: "Drap-housse Éclat Satin",
    brand: "Anne de Solène",
    weave: "120",
    type: "drap-housse",
    colors: COLORS_BASIC,
    sizes: ["160x200", "180x200", "200x200"],
    bonnets: [30, 35],
    publicPrice: 139,
    lingoramaPrice: 79,
    rating: 4.9,
    reviewsCount: 91,
    description: "Satin de coton mercerisé 120 fils. Reflets soyeux, exceptionnelle longévité.",
    thumbnail: "from-violet-50 to-stone-300",
  },
];

export function getProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

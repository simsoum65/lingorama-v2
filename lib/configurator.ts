export type WeaveType = "57" | "80" | "120";

export type ConfiguratorState = {
  size: string;
  protector: boolean;
  weave: WeaveType;
  sheetColor: string;
  duvet: "ete" | "tempere" | "hiver" | "4saisons" | null;
  pillows: number;
  pillowType: "ferme" | "souple" | "memoire";
  duvetCover: boolean;
  duvetCoverColor: string;
};

export const DEFAULT_STATE: ConfiguratorState = {
  size: "160x200",
  protector: true,
  weave: "80",
  sheetColor: "#FAFAF9",
  duvet: "tempere",
  pillows: 2,
  pillowType: "ferme",
  duvetCover: true,
  duvetCoverColor: "#E8DCC8",
};

export const MATTRESS_SIZES = [
  { id: "80x200",  label: "80 × 200 cm",  tag: "1 personne",     popular: false },
  { id: "90x200",  label: "90 × 200 cm",  tag: "1 personne",     popular: true  },
  { id: "120x200", label: "120 × 200 cm", tag: "Deux en un",     popular: false },
  { id: "140x190", label: "140 × 190 cm", tag: "2 personnes",    popular: false },
  { id: "140x200", label: "140 × 200 cm", tag: "2 personnes",    popular: true  },
  { id: "160x200", label: "160 × 200 cm", tag: "Confort plus",   popular: true  },
  { id: "180x200", label: "180 × 200 cm", tag: "Grand confort",  popular: false },
  { id: "200x200", label: "200 × 200 cm", tag: "XXL",            popular: false },
];

export const WEAVES = [
  {
    id: "57" as const,
    fils: 57,
    name: "Coton Classique",
    description: "Doux & respirant — l'allié des familles",
    priceFactor: 0.6,
    color: "#A88B53",
  },
  {
    id: "80" as const,
    fils: 80,
    name: "Percale 80 fils",
    description: "Frais & précis — le best-seller",
    priceFactor: 1.0,
    color: "#00B5C8",
    popular: true,
  },
  {
    id: "120" as const,
    fils: 120,
    name: "Satin de coton 120 fils",
    description: "Soyeux & lumineux — le summum",
    priceFactor: 1.6,
    color: "#2D3E50",
  },
];

export const SHEET_COLORS = [
  { id: "#FAFAF9", name: "Blanc" },
  { id: "#F5F0EB", name: "Écru" },
  { id: "#E8DCC8", name: "Sable" },
  { id: "#C9D6DC", name: "Bleu glacier" },
  { id: "#2D3E50", name: "Bleu marine" },
  { id: "#7A8A6F", name: "Vert sauge" },
  { id: "#B5907E", name: "Terracotta" },
  { id: "#3A3A3A", name: "Anthracite" },
];

export const DUVETS = [
  { id: "ete" as const,       label: "Été · 200 g/m²",    price: 59 },
  { id: "tempere" as const,   label: "Tempérée · 300 g/m²", price: 79 },
  { id: "hiver" as const,     label: "Hiver · 400 g/m²",  price: 99 },
  { id: "4saisons" as const,  label: "4 Saisons",          price: 139 },
];

export const PILLOW_TYPES = [
  { id: "ferme" as const,   label: "Ferme · pour dormeurs sur le côté", price: 29 },
  { id: "souple" as const,  label: "Souple · pour dormeurs sur le ventre", price: 25 },
  { id: "memoire" as const, label: "Mémoire de forme · ergonomique",   price: 49 },
];

// --- Prix de base pour drap-housse 160×200 percale ---
const BASE_PRICES = {
  protector: 39,
  sheet: 52,             // base 80 fils
  duvetCover: 79,        // base 80 fils
};

const SIZE_PRICE_FACTOR: Record<string, number> = {
  "80x200": 0.6,
  "90x200": 0.7,
  "120x200": 0.85,
  "140x190": 0.92,
  "140x200": 0.95,
  "160x200": 1.0,
  "180x200": 1.1,
  "200x200": 1.2,
};

export function calculatePrice(state: ConfiguratorState) {
  const sizeF = SIZE_PRICE_FACTOR[state.size] ?? 1;
  const weaveF =
    WEAVES.find((w) => w.id === state.weave)?.priceFactor ?? 1;

  let total = 0;

  if (state.protector) total += BASE_PRICES.protector * sizeF;

  // Drap-housse
  total += BASE_PRICES.sheet * sizeF * weaveF;

  // Couette
  if (state.duvet) {
    total += DUVETS.find((d) => d.id === state.duvet)?.price ?? 0;
  }

  // Oreillers
  const pillowPrice =
    PILLOW_TYPES.find((p) => p.id === state.pillowType)?.price ?? 0;
  total += pillowPrice * state.pillows;

  // Housse de couette + taies (parure)
  if (state.duvetCover) {
    total += BASE_PRICES.duvetCover * sizeF * weaveF;
  }

  const lingoramaPrice = Math.round(total);
  const publicPrice = Math.round(lingoramaPrice / 0.6); // ~40% remise moyenne
  const savings = publicPrice - lingoramaPrice;
  const savingsPercent = Math.round((savings / publicPrice) * 100);

  return { lingoramaPrice, publicPrice, savings, savingsPercent };
}

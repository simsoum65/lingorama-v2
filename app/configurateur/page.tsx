import type { Metadata } from "next";
import Configurator from "@/components/configurator/Configurator";

export const metadata: Metadata = {
  title: "Configurateur de Lit 3D — Dessinez votre parure | Lingorama",
  description:
    "Composez votre lit idéal en temps réel : taille, tissage (57, 80 ou 120 fils), couleur, couette, oreillers et parure. Prix d'usine Lingorama calculé instantanément.",
};

export default function Page() {
  return <Configurator />;
}

import type { Metadata } from "next";
import Diagnostic from "@/components/diagnostic/Diagnostic";

export const metadata: Metadata = {
  title: "Diagnostic Sommeil — Votre pack linge en 90 secondes | Lingorama",
  description:
    "Répondez à 3 questions sur votre nature thermique, votre matelas et votre position de couchage. Nos experts vous composent le pack linge de lit idéal.",
};

export default function Page() {
  return <Diagnostic />;
}

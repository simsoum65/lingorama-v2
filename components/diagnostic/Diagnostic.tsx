"use client";

import { useState } from "react";
import clsx from "clsx";

type Thermic = "frileux" | "normal" | "chaud" | "variable";
type Height = "fin" | "standard" | "epais" | "unknown";
type Position = "dos" | "cote" | "ventre" | "mixte";

type Answers = {
  thermic?: Thermic;
  size?: string;
  height?: Height;
  position?: Position;
};

const THERMIC_OPTIONS: { id: Thermic; label: string; desc: string; icon: string }[] = [
  { id: "frileux",  label: "Je suis frileux/se",     desc: "J'ai souvent froid la nuit", icon: "❄" },
  { id: "normal",   label: "Température normale",     desc: "Confort sans extrêmes",      icon: "○" },
  { id: "chaud",    label: "J'ai chaud la nuit",      desc: "Je transpire facilement",    icon: "☀" },
  { id: "variable", label: "Variable selon la saison", desc: "Solution 4 saisons",         icon: "⇆" },
];

const SIZE_OPTIONS = ["80x200", "90x200", "120x200", "140x190", "140x200", "160x200", "180x200", "200x200"];

const HEIGHT_OPTIONS: { id: Height; label: string; desc: string }[] = [
  { id: "fin",      label: "Fin",       desc: "Moins de 20 cm" },
  { id: "standard", label: "Standard",  desc: "Entre 20 et 25 cm" },
  { id: "epais",    label: "Épais",     desc: "Plus de 25 cm" },
  { id: "unknown",  label: "Je ne sais pas", desc: "On part sur du standard" },
];

const POSITION_OPTIONS: { id: Position; label: string; desc: string }[] = [
  { id: "dos",    label: "Sur le dos",       desc: "Oreiller ferme moyen" },
  { id: "cote",   label: "Sur le côté",      desc: "Oreiller ferme haut" },
  { id: "ventre", label: "Sur le ventre",    desc: "Oreiller souple plat" },
  { id: "mixte",  label: "Je change souvent", desc: "Oreiller mémoire de forme" },
];

function generateRecommendation(a: Required<Answers>) {
  const weaveMap: Record<Thermic, { weave: string; label: string }> = {
    frileux:  { weave: "57",  label: "Coton classique 57 fils" },
    normal:   { weave: "80",  label: "Percale 80 fils" },
    chaud:    { weave: "120", label: "Satin de coton 120 fils" },
    variable: { weave: "80",  label: "Percale 80 fils" },
  };
  const bonnetMap: Record<Height, number> = {
    fin: 25,
    standard: 30,
    epais: 35,
    unknown: 30,
  };
  const couetteMap: Record<Thermic, string> = {
    frileux:  "Couette Hiver 400 g/m²",
    normal:   "Couette Tempérée 300 g/m²",
    chaud:    "Couette Été 200 g/m²",
    variable: "Couette 4 Saisons",
  };
  const pillowMap: Record<Position, string> = {
    dos:    "Oreiller Ferme moyen",
    cote:   "Oreiller Ferme haute épaisseur",
    ventre: "Oreiller Souple plat",
    mixte:  "Oreiller Mémoire de forme",
  };

  return {
    sheet: {
      label: weaveMap[a.thermic].label,
      bonnet: `Bonnet ${bonnetMap[a.height]} cm`,
      size: a.size,
    },
    duvet:    couetteMap[a.thermic],
    pillow:   pillowMap[a.position],
    protector: `Protège-matelas bonnet ${bonnetMap[a.height]} cm`,
    estimatedPrice: 189,
    publicPrice: 320,
  };
}

export default function Diagnostic() {
  const [step, setStep] = useState(0); // 0 = intro, 1-3 = questions, 4 = result
  const [answers, setAnswers] = useState<Answers>({});

  const next = () => setStep((s) => s + 1);
  const reset = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-bg-warm flex flex-col">
      <div className="container-prose py-8 md:py-12">
        {step > 0 && step < 4 && (
          <>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] tracking-widest font-700 uppercase text-brand-turquoise">
                Étape {step}/3
              </p>
              <button onClick={reset} className="text-xs text-ink-muted hover:text-brand-marine cursor-pointer">
                Recommencer
              </button>
            </div>
            <div className="w-full h-1 bg-black/5">
              <div
                className="h-full bg-brand-turquoise transition-all duration-500"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-3xl">
          {step === 0 && <Intro onStart={next} />}
          {step === 1 && (
            <QuestionThermic
              answer={answers.thermic}
              onChoose={(v) => {
                setAnswers((a) => ({ ...a, thermic: v }));
                setTimeout(next, 250);
              }}
            />
          )}
          {step === 2 && (
            <QuestionSize
              size={answers.size}
              height={answers.height}
              onChooseSize={(v) => setAnswers((a) => ({ ...a, size: v }))}
              onChooseHeight={(v) => {
                setAnswers((a) => ({ ...a, height: v }));
                setTimeout(next, 250);
              }}
            />
          )}
          {step === 3 && (
            <QuestionPosition
              answer={answers.position}
              onChoose={(v) => {
                setAnswers((a) => ({ ...a, position: v }));
                setTimeout(next, 250);
              }}
            />
          )}
          {step === 4 && answers.thermic && answers.size && answers.height && answers.position && (
            <Result
              recommendation={generateRecommendation(answers as Required<Answers>)}
              onReset={reset}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SCREENS
// ============================================================

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="text-center animate-fade-up">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brand-turquoise/10 mb-6">
        <svg width="36" height="36" fill="none" stroke="#00B5C8" strokeWidth="1.5" viewBox="0 0 24 24">
          <path d="M12 2a10 10 0 1 0 10 10h-10z" />
          <path d="M12 2v10h10A10 10 0 0 0 12 2z" />
        </svg>
      </div>
      <p className="label-eyebrow mb-4">Diagnostic personnalisé · 90 secondes</p>
      <h1 className="font-serif text-4xl md:text-6xl text-brand-marine mb-4 leading-tight">
        Votre expert sommeil<br />
        <span className="italic text-brand-turquoise">en 3 questions.</span>
      </h1>
      <p className="text-ink-muted font-300 max-w-xl mx-auto mb-10">
        Nos experts ont conçu cet algorithme à partir de 50 ans d&apos;observations en
        magasin. À la fin, vous repartez avec un pack sur mesure, déjà au prix d&apos;usine.
      </p>
      <button onClick={onStart} className="btn-primary text-base">
        Commencer mon diagnostic
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

function QuestionThermic({
  answer,
  onChoose,
}: {
  answer?: Thermic;
  onChoose: (v: Thermic) => void;
}) {
  return (
    <div className="animate-fade-up">
      <h2 className="font-serif text-3xl md:text-5xl text-brand-marine mb-3 text-center">
        Quelle est votre nature thermique ?
      </h2>
      <p className="text-ink-muted font-300 text-center mb-10 max-w-lg mx-auto">
        Cela nous indique le bon tissage et le bon grammage de couette.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {THERMIC_OPTIONS.map((o) => (
          <button
            key={o.id}
            onClick={() => onChoose(o.id)}
            className={clsx(
              "p-6 text-left border-2 transition-all cursor-pointer hover:-translate-y-1 bg-white",
              answer === o.id
                ? "border-brand-turquoise"
                : "border-black/10 hover:border-brand-turquoise"
            )}
          >
            <div className="text-2xl mb-2 text-brand-turquoise">{o.icon}</div>
            <p className="font-serif text-xl text-brand-marine">{o.label}</p>
            <p className="text-sm text-ink-muted font-300 mt-1">{o.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function QuestionSize({
  size,
  height,
  onChooseSize,
  onChooseHeight,
}: {
  size?: string;
  height?: Height;
  onChooseSize: (v: string) => void;
  onChooseHeight: (v: Height) => void;
}) {
  return (
    <div className="animate-fade-up">
      <h2 className="font-serif text-3xl md:text-5xl text-brand-marine mb-3 text-center">
        Votre matelas, en chiffres.
      </h2>
      <p className="text-ink-muted font-300 text-center mb-10 max-w-lg mx-auto">
        Pour la bonne taille de drap et la bonne hauteur de bonnet.
      </p>

      <p className="label-eyebrow mb-3 text-center">Dimensions</p>
      <div className="grid grid-cols-4 gap-2 mb-8">
        {SIZE_OPTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onChooseSize(s)}
            className={clsx(
              "py-3 px-2 text-sm font-500 border-2 transition-all cursor-pointer bg-white",
              size === s
                ? "border-brand-turquoise bg-brand-turquoise/5 text-brand-marine"
                : "border-black/10 hover:border-brand-turquoise/40"
            )}
          >
            {s.replace("x", " × ")}
          </button>
        ))}
      </div>

      {size && (
        <div className="animate-fade-up">
          <p className="label-eyebrow mb-3 text-center">Hauteur du matelas</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {HEIGHT_OPTIONS.map((h) => (
              <button
                key={h.id}
                onClick={() => onChooseHeight(h.id)}
                className={clsx(
                  "p-4 text-center border-2 transition-all cursor-pointer hover:-translate-y-1 bg-white",
                  height === h.id
                    ? "border-brand-turquoise"
                    : "border-black/10 hover:border-brand-turquoise"
                )}
              >
                <p className="font-serif text-lg text-brand-marine">{h.label}</p>
                <p className="text-xs text-ink-muted font-300 mt-1">{h.desc}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionPosition({
  answer,
  onChoose,
}: {
  answer?: Position;
  onChoose: (v: Position) => void;
}) {
  return (
    <div className="animate-fade-up">
      <h2 className="font-serif text-3xl md:text-5xl text-brand-marine mb-3 text-center">
        Comment dormez-vous ?
      </h2>
      <p className="text-ink-muted font-300 text-center mb-10 max-w-lg mx-auto">
        La position de couchage détermine le bon oreiller.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {POSITION_OPTIONS.map((p) => (
          <button
            key={p.id}
            onClick={() => onChoose(p.id)}
            className={clsx(
              "p-6 text-left border-2 transition-all cursor-pointer hover:-translate-y-1 bg-white",
              answer === p.id
                ? "border-brand-turquoise"
                : "border-black/10 hover:border-brand-turquoise"
            )}
          >
            <p className="font-serif text-xl text-brand-marine">{p.label}</p>
            <p className="text-sm text-ink-muted font-300 mt-1">{p.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function Result({
  recommendation,
  onReset,
}: {
  recommendation: ReturnType<typeof generateRecommendation>;
  onReset: () => void;
}) {
  return (
    <div className="animate-fade-up">
      <div className="text-center mb-10">
        <p className="label-eyebrow mb-3">Notre recommandation pour vous</p>
        <h2 className="font-serif text-3xl md:text-5xl text-brand-marine mb-2">
          Votre pack expert.
        </h2>
        <p className="text-ink-muted font-300">
          Conçu à partir de votre profil, prêt à être commandé.
        </p>
      </div>

      <div className="bg-white border border-black/10 p-8 md:p-10">
        <ul className="space-y-4 mb-8">
          {[
            `Drap-housse ${recommendation.sheet.label} · ${recommendation.sheet.size}`,
            recommendation.sheet.bonnet + " · adapté à votre matelas",
            recommendation.duvet,
            recommendation.pillow + " × 2",
            recommendation.protector,
          ].map((line) => (
            <li key={line} className="flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00B5C8" strokeWidth="2.5" className="flex-shrink-0 mt-0.5">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="text-sm md:text-base text-ink">{line}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-black/10 pt-6 flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-[10px] tracking-widest font-700 uppercase text-ink-muted">
              Prix public estimé <span className="line-through">{recommendation.publicPrice}€</span>
            </p>
            <p className="font-serif text-5xl text-brand-turquoise font-600 leading-none my-2">
              {recommendation.estimatedPrice}€
            </p>
            <p className="text-sm text-feedback-success font-600">
              Vous économisez {recommendation.publicPrice - recommendation.estimatedPrice}€
            </p>
          </div>
          <button className="btn-primary text-base">Ajouter le pack au panier</button>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={onReset} className="text-sm text-ink-muted hover:text-brand-marine underline cursor-pointer">
          Recommencer le diagnostic
        </button>
      </div>
    </div>
  );
}

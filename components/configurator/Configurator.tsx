"use client";

import dynamic from "next/dynamic";
import { useState, useMemo } from "react";
import clsx from "clsx";
import {
  ConfiguratorState,
  DEFAULT_STATE,
  MATTRESS_SIZES,
  WEAVES,
  SHEET_COLORS,
  DUVETS,
  PILLOW_TYPES,
  calculatePrice,
} from "@/lib/configurator";

const Bed3D = dynamic(() => import("./Bed3D"), { ssr: false });

const STEPS = [
  { id: 1, label: "Taille" },
  { id: 2, label: "Protection" },
  { id: 3, label: "Drap-housse" },
  { id: 4, label: "Couette & Oreillers" },
  { id: 5, label: "Parure" },
];

export default function Configurator() {
  const [state, setState] = useState<ConfiguratorState>(DEFAULT_STATE);
  const [step, setStep] = useState(1);

  const price = useMemo(() => calculatePrice(state), [state]);

  const update = <K extends keyof ConfiguratorState>(
    key: K,
    value: ConfiguratorState[K]
  ) => setState((s) => ({ ...s, [key]: value }));

  return (
    <div className="min-h-screen bg-bg-warm">
      {/* Header de page */}
      <div className="bg-white border-b border-black/5">
        <div className="container-prose py-8">
          <p className="label-eyebrow mb-2">Outil exclusif Lingorama</p>
          <h1 className="font-serif text-3xl md:text-5xl text-brand-marine">
            Dessinez votre lit.
          </h1>
          <p className="text-ink-muted font-300 mt-2 max-w-xl">
            Composez votre parure idéale en temps réel — chaque choix met à jour la
            scène 3D et le prix Lingorama.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-80px)]">
        {/* 3D viewer (sticky on desktop) */}
        <div className="lg:col-span-7 relative lg:sticky lg:top-20 h-[50vh] lg:h-[calc(100vh-80px)] bg-bg-warm">
          <Bed3D state={state} />
          {/* Légende tissage */}
          <div className="absolute bottom-4 left-4 right-4 lg:right-auto bg-white/95 backdrop-blur-md px-4 py-3 shadow-lg max-w-sm">
            <p className="text-[10px] tracking-widest uppercase font-700 text-brand-turquoise mb-0.5">
              Aperçu temps réel
            </p>
            <p className="text-xs text-ink font-500">
              {MATTRESS_SIZES.find((s) => s.id === state.size)?.label} ·{" "}
              {WEAVES.find((w) => w.id === state.weave)?.name}
              {state.duvet && ` · ${DUVETS.find((d) => d.id === state.duvet)?.label}`}
            </p>
          </div>
        </div>

        {/* Panneau de configuration */}
        <div className="lg:col-span-5 bg-white p-6 md:p-10 flex flex-col">
          {/* Stepper */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className={clsx(
                  "flex items-center gap-2 cursor-pointer transition-colors",
                  step === s.id
                    ? "text-brand-turquoise"
                    : step > s.id
                    ? "text-brand-marine"
                    : "text-ink-light"
                )}
              >
                <span
                  className={clsx(
                    "w-7 h-7 rounded-full flex items-center justify-center text-xs font-700 transition-colors",
                    step === s.id
                      ? "bg-brand-turquoise text-white"
                      : step > s.id
                      ? "bg-brand-marine text-white"
                      : "bg-black/5"
                  )}
                >
                  {step > s.id ? "✓" : s.id}
                </span>
                <span className="text-[10px] font-700 tracking-widest uppercase hidden md:inline">
                  {s.label}
                </span>
                {i < STEPS.length - 1 && (
                  <span className="hidden md:block w-4 h-px bg-black/10" />
                )}
              </button>
            ))}
          </div>

          {/* Contenu de l'étape */}
          <div className="flex-1 overflow-y-auto pr-2">
            {step === 1 && <StepSize state={state} update={update} />}
            {step === 2 && <StepProtector state={state} update={update} />}
            {step === 3 && <StepSheet state={state} update={update} />}
            {step === 4 && <StepDuvetPillow state={state} update={update} />}
            {step === 5 && <StepDuvetCover state={state} update={update} />}
          </div>

          {/* Navigation + récap prix */}
          <div className="mt-6 pt-6 border-t border-black/10">
            <div className="flex items-end justify-between mb-5">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-ink-muted font-600">
                  Prix public estimé{" "}
                  <span className="line-through">{price.publicPrice}€</span>
                </p>
                <p className="font-serif text-4xl text-brand-turquoise font-600">
                  {price.lingoramaPrice}€
                </p>
                <p className="text-xs text-feedback-success font-600 mt-1">
                  Économie {price.savings}€ ({price.savingsPercent}%)
                </p>
              </div>
              <button className="btn-primary">
                Ajouter au panier
              </button>
            </div>
            <div className="flex gap-2">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 btn-secondary"
                >
                  Précédent
                </button>
              )}
              {step < STEPS.length && (
                <button
                  onClick={() => setStep(step + 1)}
                  className="flex-1 btn-primary"
                >
                  Étape suivante
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// STEPS
// ============================================================

type StepProps = {
  state: ConfiguratorState;
  update: <K extends keyof ConfiguratorState>(k: K, v: ConfiguratorState[K]) => void;
};

function StepHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 animate-fade-up">
      <h2 className="font-serif text-2xl text-brand-marine mb-1">{title}</h2>
      <p className="text-sm text-ink-muted font-300">{subtitle}</p>
    </div>
  );
}

function StepSize({ state, update }: StepProps) {
  return (
    <div>
      <StepHeader
        title="Quelle taille de matelas ?"
        subtitle="Toutes les tailles standards du marché français."
      />
      <div className="grid grid-cols-2 gap-3">
        {MATTRESS_SIZES.map((s) => (
          <button
            key={s.id}
            onClick={() => update("size", s.id)}
            className={clsx(
              "relative p-4 text-left border-2 transition-all duration-200 cursor-pointer",
              state.size === s.id
                ? "border-brand-turquoise bg-brand-turquoise/5"
                : "border-black/10 hover:border-brand-turquoise/40"
            )}
          >
            {s.popular && (
              <span className="absolute -top-2 right-3 px-2 py-0.5 text-[9px] font-700 tracking-widest uppercase bg-accent-gold text-white rounded-full">
                Populaire
              </span>
            )}
            <div className="font-600 text-brand-marine text-sm">{s.label}</div>
            <div className="text-xs text-ink-muted font-300 mt-0.5">{s.tag}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepProtector({ state, update }: StepProps) {
  return (
    <div>
      <StepHeader
        title="Un protège-matelas ?"
        subtitle="Imperméable, respirant — il prolonge la durée de vie de votre literie."
      />
      <div className="space-y-3">
        <button
          onClick={() => update("protector", true)}
          className={clsx(
            "w-full p-5 text-left border-2 transition-all cursor-pointer",
            state.protector
              ? "border-brand-turquoise bg-brand-turquoise/5"
              : "border-black/10 hover:border-brand-turquoise/40"
          )}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-600 text-brand-marine">Oui, je protège ma literie</p>
              <p className="text-xs text-ink-muted font-300 mt-1">
                Bonnet ajusté à la hauteur de votre matelas. Lavable 60°C.
              </p>
            </div>
            <span className="font-serif text-xl text-brand-turquoise">+39€</span>
          </div>
        </button>
        <button
          onClick={() => update("protector", false)}
          className={clsx(
            "w-full p-5 text-left border-2 transition-all cursor-pointer",
            !state.protector
              ? "border-brand-marine bg-bg-warm"
              : "border-black/10 hover:border-brand-marine/40"
          )}
        >
          <p className="font-600 text-brand-marine">Non merci, j&apos;en ai déjà un</p>
        </button>
      </div>
    </div>
  );
}

function StepSheet({ state, update }: StepProps) {
  return (
    <div>
      <StepHeader
        title="Tissage & couleur du drap-housse"
        subtitle="Le rendu 3D s'adapte en temps réel à votre choix."
      />
      <p className="label-eyebrow mb-3">Tissage</p>
      <div className="space-y-2 mb-6">
        {WEAVES.map((w) => (
          <button
            key={w.id}
            onClick={() => update("weave", w.id)}
            className={clsx(
              "w-full p-4 text-left border-2 flex items-center justify-between transition-all cursor-pointer",
              state.weave === w.id
                ? "border-brand-turquoise bg-brand-turquoise/5"
                : "border-black/10 hover:border-brand-turquoise/40"
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-serif text-sm font-700"
                style={{ background: w.color }}
              >
                {w.fils}
              </span>
              <div>
                <p className="font-600 text-brand-marine text-sm">{w.name}</p>
                <p className="text-xs text-ink-muted font-300">{w.description}</p>
              </div>
            </div>
            {w.popular && (
              <span className="text-[9px] font-700 tracking-widest uppercase text-brand-turquoise">
                Populaire
              </span>
            )}
          </button>
        ))}
      </div>

      <p className="label-eyebrow mb-3">Couleur</p>
      <div className="grid grid-cols-4 gap-3">
        {SHEET_COLORS.map((c) => (
          <button
            key={c.id}
            onClick={() => update("sheetColor", c.id)}
            className={clsx(
              "aspect-square rounded-full border-2 cursor-pointer transition-all relative",
              state.sheetColor === c.id
                ? "border-brand-turquoise scale-110"
                : "border-black/10 hover:scale-105"
            )}
            style={{ background: c.id }}
            title={c.name}
            aria-label={c.name}
          >
            {state.sheetColor === c.id && (
              <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDuvetPillow({ state, update }: StepProps) {
  return (
    <div>
      <StepHeader
        title="Couette & oreillers"
        subtitle="On vous conseille selon votre nature thermique et votre position de couchage."
      />
      <p className="label-eyebrow mb-3">Couette</p>
      <div className="space-y-2 mb-6">
        {DUVETS.map((d) => (
          <button
            key={d.id}
            onClick={() => update("duvet", d.id)}
            className={clsx(
              "w-full p-3 text-left border-2 flex items-center justify-between transition-all cursor-pointer",
              state.duvet === d.id
                ? "border-brand-turquoise bg-brand-turquoise/5"
                : "border-black/10 hover:border-brand-turquoise/40"
            )}
          >
            <span className="text-sm font-500 text-brand-marine">{d.label}</span>
            <span className="font-600 text-brand-turquoise">+{d.price}€</span>
          </button>
        ))}
      </div>

      <p className="label-eyebrow mb-3">Type d&apos;oreiller</p>
      <div className="space-y-2 mb-6">
        {PILLOW_TYPES.map((p) => (
          <button
            key={p.id}
            onClick={() => update("pillowType", p.id)}
            className={clsx(
              "w-full p-3 text-left border-2 flex items-center justify-between transition-all cursor-pointer",
              state.pillowType === p.id
                ? "border-brand-turquoise bg-brand-turquoise/5"
                : "border-black/10 hover:border-brand-turquoise/40"
            )}
          >
            <span className="text-sm font-500 text-brand-marine">{p.label}</span>
            <span className="font-600 text-brand-turquoise">+{p.price}€</span>
          </button>
        ))}
      </div>

      <p className="label-eyebrow mb-3">Quantité d&apos;oreillers</p>
      <div className="flex items-center gap-3">
        {[0, 1, 2, 3, 4].map((n) => (
          <button
            key={n}
            onClick={() => update("pillows", n)}
            className={clsx(
              "w-12 h-12 border-2 font-600 cursor-pointer transition-all",
              state.pillows === n
                ? "border-brand-turquoise bg-brand-turquoise text-white"
                : "border-black/10 hover:border-brand-turquoise/40"
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDuvetCover({ state, update }: StepProps) {
  return (
    <div>
      <StepHeader
        title="Parure complète : housse de couette & taies"
        subtitle="L'avantage Lingorama : -15 % sur la parure en complément de votre drap."
      />
      <div className="space-y-3 mb-6">
        <button
          onClick={() => update("duvetCover", true)}
          className={clsx(
            "w-full p-5 text-left border-2 transition-all cursor-pointer",
            state.duvetCover
              ? "border-brand-turquoise bg-brand-turquoise/5"
              : "border-black/10 hover:border-brand-turquoise/40"
          )}
        >
          <p className="font-600 text-brand-marine mb-1">Oui — parure assortie</p>
          <p className="text-xs text-ink-muted font-300">
            Housse de couette + 2 taies dans le tissage et la couleur de votre choix.
          </p>
        </button>
        <button
          onClick={() => update("duvetCover", false)}
          className={clsx(
            "w-full p-5 text-left border-2 transition-all cursor-pointer",
            !state.duvetCover
              ? "border-brand-marine bg-bg-warm"
              : "border-black/10 hover:border-brand-marine/40"
          )}
        >
          <p className="font-600 text-brand-marine">Non — j&apos;ai déjà ma parure</p>
        </button>
      </div>

      {state.duvetCover && (
        <>
          <p className="label-eyebrow mb-3">Couleur parure</p>
          <div className="grid grid-cols-4 gap-3">
            {SHEET_COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => update("duvetCoverColor", c.id)}
                className={clsx(
                  "aspect-square rounded-full border-2 cursor-pointer transition-all relative",
                  state.duvetCoverColor === c.id
                    ? "border-brand-turquoise scale-110"
                    : "border-black/10 hover:scale-105"
                )}
                style={{ background: c.id }}
                aria-label={c.name}
              >
                {state.duvetCoverColor === c.id && (
                  <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow">
                    ✓
                  </span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

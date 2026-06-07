"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Facade3D = dynamic(() => import("./Facade3D"), { ssr: false });

export default function FacadeHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const promiseRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Anime le scrollProgress en suivant le scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%",
        scrub: 1.2,
        pin: true,
        onUpdate: (self) => setProgress(self.progress),
      });

      // Apparition H1 : visible de 10 % à 65 %, puis disparaît
      gsap.fromTo(
        h1Ref.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=40%",
            scrub: true,
          },
        }
      );
      gsap.to(h1Ref.current, {
        opacity: 0,
        y: -30,
        ease: "power2.in",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "+=130%",
          end: "+=180%",
          scrub: true,
        },
      });

      // H2 sous-titre
      gsap.fromTo(
        h2Ref.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "+=20%",
            end: "+=70%",
            scrub: true,
          },
        }
      );

      // Promesse "Depuis 1975"
      gsap.fromTo(
        promiseRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "+=50%",
            end: "+=110%",
            scrub: true,
          },
        }
      );

      // CTA "Entrer dans le magasin"
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "+=30%",
            end: "+=80%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Indicateur "scrollez"
  const scrollHintVisible = progress < 0.05;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#E8DCC8]"
      aria-label="Façade 3D du magasin Lingorama"
    >
      <div className="absolute inset-0">
        <Facade3D scrollProgress={progress} />
      </div>

      {/* Overlay textuel — flotte au-dessus du canvas */}
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none flex flex-col items-center justify-end pb-24 px-6 z-10"
      >
        {/* Eyebrow */}
        <div
          ref={promiseRef}
          className="mb-4 flex items-center gap-3 text-xs font-700 tracking-widest uppercase text-brand-marine bg-white/90 backdrop-blur-md px-5 py-2 rounded-full opacity-0"
        >
          <span className="w-1.5 h-1.5 bg-brand-turquoise rounded-full" />
          Maison française · Depuis 1975
        </div>

        <h1
          ref={h1Ref}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-center leading-[1.05] text-white max-w-5xl opacity-0"
          style={{
            textShadow: "0 4px 40px rgba(0,0,0,0.4)",
            fontWeight: 600,
          }}
        >
          Le rendez-vous du beau linge
          <br />
          <span className="italic font-500" style={{ color: "#00B5C8" }}>
            à prix d&apos;usine.
          </span>
        </h1>

        <h2
          ref={h2Ref}
          className="mt-8 text-sm md:text-base font-sans font-500 tracking-widest uppercase text-white/90 text-center opacity-0"
          style={{ letterSpacing: "0.25em" }}
        >
          Percale · Satin de coton · Grandes marques dégriffées
        </h2>

        <div ref={ctaRef} className="mt-10 opacity-0 pointer-events-auto">
          <button
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight * 3,
                behavior: "smooth",
              });
            }}
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-brand-turquoise text-white text-xs font-700 tracking-widest uppercase rounded-sm hover:bg-white hover:text-brand-marine transition-all duration-300 cursor-pointer shadow-2xl"
          >
            Entrer dans le magasin
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Hint scroll initial */}
      {scrollHintVisible && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-fade-in pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-white/80 text-xs font-600 uppercase tracking-widest">
            <span>Faites défiler</span>
            <svg
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="animate-bounce"
            >
              <path d="M7 13l5 5 5-5" />
              <path d="M7 6l5 5 5-5" />
            </svg>
          </div>
        </div>
      )}

      {/* Barre de progression du parcours immersif */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/10 z-30">
        <div
          className="h-full bg-brand-turquoise transition-[width] duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </section>
  );
}

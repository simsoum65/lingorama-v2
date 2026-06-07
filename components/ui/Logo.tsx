import clsx from "clsx";

type LogoProps = {
  variant?: "default" | "light" | "mono-dark";
  size?: "sm" | "md" | "lg";
  withTagline?: boolean;
  className?: string;
};

const sizeMap = {
  sm: { box: 32, font: "text-xl", tag: "text-[8px]" },
  md: { box: 48, font: "text-3xl", tag: "text-[10px]" },
  lg: { box: 72, font: "text-5xl", tag: "text-xs" },
};

/**
 * Logo Lingorama — losange turquoise (linge plié) + lettrage marine + drapeau FR.
 * Reconstitué fidèlement à partir du visuel officiel envoyé.
 */
export default function Logo({
  variant = "default",
  size = "md",
  withTagline = true,
  className,
}: LogoProps) {
  const s = sizeMap[size];
  const inkColor =
    variant === "light"
      ? "#FFFFFF"
      : variant === "mono-dark"
      ? "#1A2332"
      : "#2D3E50";
  const accentColor = variant === "mono-dark" ? "#1A2332" : "#00B5C8";

  return (
    <div className={clsx("flex items-center gap-3", className)}>
      {/* Losange textile turquoise avec drapeau FR */}
      <svg
        width={s.box}
        height={s.box}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
      >
        {/* Ombre du losange */}
        <path
          d="M 18 32 L 58 14 L 82 58 L 38 86 Z"
          fill={inkColor}
          opacity="0.18"
          transform="translate(2, 3)"
        />
        {/* Losange principal — forme de tissu plié */}
        <path
          d="M 18 30 L 58 12 L 82 56 L 38 84 Z"
          fill={accentColor}
        />
        {/* Reflet supérieur */}
        <path
          d="M 18 30 L 58 12 L 70 35 L 28 50 Z"
          fill="#FFFFFF"
          opacity="0.18"
        />
        {/* Pli central */}
        <path
          d="M 28 48 L 72 30"
          stroke={inkColor}
          strokeWidth="1.2"
          opacity="0.25"
          strokeLinecap="round"
        />
        {/* Drapeau français miniature, coin inférieur droit */}
        <g transform="translate(56, 64)">
          <rect x="0" y="0" width="4" height="9" fill="#002395" />
          <rect x="4" y="0" width="4" height="9" fill="#FFFFFF" />
          <rect x="8" y="0" width="4" height="9" fill="#ED2939" />
        </g>
        {/* Bordure subtile */}
        <path
          d="M 18 30 L 58 12 L 82 56 L 38 84 Z"
          fill="none"
          stroke={inkColor}
          strokeWidth="1.5"
          opacity="0.4"
        />
      </svg>

      {/* Lettrage */}
      <div className="leading-none">
        <div
          className={clsx(
            "font-serif font-700 tracking-tight",
            s.font
          )}
          style={{ color: inkColor, fontWeight: 700 }}
        >
          Lingorama
        </div>
        {withTagline && (
          <div
            className={clsx("mt-1 font-sans font-600 tracking-widest", s.tag)}
            style={{ color: accentColor, letterSpacing: "0.25em" }}
          >
            LINGE DE MAISON
          </div>
        )}
      </div>
    </div>
  );
}

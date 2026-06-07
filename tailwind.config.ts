import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          turquoise: "#00B5C8",
          "turquoise-dark": "#0098AB",
          marine: "#2D3E50",
          "marine-deep": "#1A2332",
        },
        bg: {
          DEFAULT: "#FAFAF9",
          warm: "#F5F0EB",
          dark: "#1A2332",
        },
        ink: {
          DEFAULT: "#1A2332",
          muted: "#6B7A8D",
          light: "#A1AAB7",
        },
        accent: {
          gold: "#C9A96E",
          "gold-dark": "#A88B53",
        },
        feedback: {
          success: "#2A9D8F",
          error: "#E76F51",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

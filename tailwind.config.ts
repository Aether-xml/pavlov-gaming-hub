// tailwind.config.ts
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
        void: "#0a0a0a",
        "void-light": "#111111",
        "void-lighter": "#1a1a1a",
        "void-border": "#222222",
        electric: {
          purple: "#8B5CF6",
          "purple-bright": "#A78BFA",
          "purple-deep": "#6D28D9",
          cyan: "#06B6D4",
          "cyan-bright": "#22D3EE",
          "cyan-deep": "#0891B2",
        },
        neon: {
          green: "#39FF14",
          pink: "#FF10F0",
          orange: "#FF6600",
        },
        surface: {
          1: "#0f0f0f",
          2: "#141414",
          3: "#1a1a1a",
          4: "#242424",
        },
      },
      fontFamily: {
        grotesk: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        editorial: ["var(--font-editorial)", "Georgia", "serif"],
      },
      fontSize: {
        "fluid-xs": "clamp(0.7rem, 0.8vw, 0.85rem)",
        "fluid-sm": "clamp(0.8rem, 1vw, 0.95rem)",
        "fluid-base": "clamp(0.9rem, 1.1vw, 1.1rem)",
        "fluid-lg": "clamp(1.1rem, 1.5vw, 1.4rem)",
        "fluid-xl": "clamp(1.3rem, 2vw, 1.8rem)",
        "fluid-2xl": "clamp(1.8rem, 3vw, 2.8rem)",
        "fluid-3xl": "clamp(2.2rem, 4vw, 3.8rem)",
        "fluid-4xl": "clamp(3rem, 6vw, 5.5rem)",
        "fluid-5xl": "clamp(4rem, 8vw, 8rem)",
        "fluid-hero": "clamp(5rem, 12vw, 14rem)",
      },
      animation: {
        "scan-line": "scanLine 4s linear infinite",
        "glitch-1": "glitch1 2.5s infinite",
        "glitch-2": "glitch2 3s infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "slide-up": "slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        "fade-in": "fadeIn 0.8s ease-out",
        "border-flow": "borderFlow 3s linear infinite",
        marquee: "marquee 30s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        grain: "grain 0.5s steps(1) infinite",
      },
      keyframes: {
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch1: {
          "0%, 100%": { clipPath: "inset(0 0 0 0)" },
          "20%": { clipPath: "inset(20% 0 60% 0)" },
          "40%": { clipPath: "inset(40% 0 20% 0)" },
          "60%": { clipPath: "inset(60% 0 5% 0)" },
          "80%": { clipPath: "inset(10% 0 80% 0)" },
        },
        glitch2: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        borderFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundSize: {
        "grid-40": "40px 40px",
        "grid-60": "60px 60px",
      },
    },
  },
  plugins: [],
};

export default config;
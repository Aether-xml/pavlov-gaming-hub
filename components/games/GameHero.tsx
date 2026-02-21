// components/games/GameHero.tsx

"use client";

import { motion } from "framer-motion";
import GlitchText from "@/components/ui/GlitchText";
import MagneticButton from "@/components/ui/MagneticButton";

interface GameHeroProps {
  title: string;
  tagline: string;
  genre: string;
  description: string;
  color: "purple" | "cyan";
}

export default function GameHero({
  title,
  tagline,
  genre,
  description,
  color,
}: GameHeroProps) {
  const colorClasses = {
    purple: {
      accent: "text-electric-purple",
      accentDim: "text-electric-purple/50",
      border: "border-electric-purple/20",
      glow: "from-electric-purple/10",
      bg: "bg-electric-purple/5",
    },
    cyan: {
      accent: "text-electric-cyan",
      accentDim: "text-electric-cyan/50",
      border: "border-electric-cyan/20",
      glow: "from-electric-cyan/10",
      bg: "bg-electric-cyan/5",
    },
  };

  const c = colorClasses[color];

  return (
    <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial ${c.glow} to-transparent opacity-30`}
      />

      {/* Decorative large text */}
      <div className="absolute top-[10vh] right-0 overflow-hidden">
        <motion.span
          className="font-grotesk text-[20vw] font-bold text-white/[0.015] leading-none select-none block"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title.toUpperCase()}
        </motion.span>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className={`w-8 h-[1px] ${c.border.replace("border", "bg")}`} />
            <span
              className={`font-mono text-fluid-xs tracking-[0.3em] ${c.accentDim} uppercase`}
            >
              {genre}
            </span>
          </div>

          <h1 className="font-grotesk text-fluid-5xl font-light mb-2">
            <GlitchText
              text={title}
              as="span"
              className={`font-bold ${c.accent}`}
              glitchOnHover
            />
          </h1>
          <p className="font-editorial italic text-fluid-xl text-white/30 mb-6">
            {tagline}
          </p>
          <p className="font-grotesk text-fluid-sm text-white/20 max-w-xl leading-relaxed mb-10">
            {description}
          </p>

          <MagneticButton variant="primary">
            Oyna
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
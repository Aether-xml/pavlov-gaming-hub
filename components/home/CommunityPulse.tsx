// components/home/CommunityPulse.tsx

"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const stats = [
  { value: "24K+", label: "Topluluk Üyesi", accent: "text-electric-purple" },
  { value: "847K", label: "Oynanan Maç", accent: "text-electric-cyan" },
  { value: "1.2M", label: "YouTube İzlenme", accent: "text-neon-green" },
  { value: "99.9%", label: "Uptime", accent: "text-neon-orange" },
];

export default function CommunityPulse() {
  return (
    <section className="relative px-6 md:px-12 py-32">
      {/* Section Header */}
      <ScrollReveal>
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-[1px] bg-electric-cyan/30" />
          <span className="font-mono text-fluid-xs tracking-[0.3em] text-electric-cyan/50 uppercase">
            Topluluk
          </span>
        </div>
        <h2 className="font-grotesk text-fluid-3xl font-light text-white/90 mb-2">
          Topluluk{" "}
          <span className="font-editorial italic text-electric-cyan">Nabzı</span>
        </h2>
        <p className="font-grotesk text-fluid-sm text-white/20 max-w-lg">
          Pavlov topluluğu her geçen gün büyüyor. Sayılar kendisi için konuşuyor.
        </p>
      </ScrollReveal>

      {/* Stats Grid — Asymmetric Bento */}
      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-white/[0.03]">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 0.1}>
            <motion.div
              className="bg-void p-8 md:p-12 group cursor-default hover:bg-surface-1 transition-colors duration-500"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <span
                className={`font-mono text-fluid-2xl md:text-fluid-3xl font-bold ${stat.accent} block mb-2`}
              >
                {stat.value}
              </span>
              <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white/20 uppercase">
                {stat.label}
              </span>
              {/* Decorative line */}
              <div className="mt-6 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent transition-all duration-700" />
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
// components/home/GameShowcase.tsx

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

const games = [
  {
    slug: "pavroyale",
    title: "PavRoyale",
    tagline: "Son Kalan Kazanır",
    description:
      "100 oyunculu epik battle royale deneyimi. Haritayı keşfet, silahını bul, hayatta kal. Gerçek zamanlı liderlik tablosunda dünya ile yarış.",
    genre: "BATTLE ROYALE",
    color: "electric-purple",
    stats: [
      { label: "Aktif Oyuncu", value: "12.4K" },
      { label: "Toplam Maç", value: "847K" },
    ],
    features: [
      "100 Oyuncu",
      "Gerçek Zamanlı",
      "Sıralama Sistemi",
      "Sezonluk İçerik",
    ],
  },
  {
    slug: "pavometry",
    title: "Pavometry",
    tagline: "Ritim ve Refleks",
    description:
      "Geometri tabanlı ritim-aksiyon oyunu. Müzikle senkronize engelleri aş, becerini kanıtla. Her level bir sanat eseri.",
    genre: "RHYTHM ACTION",
    color: "electric-cyan",
    stats: [
      { label: "Level Sayısı", value: "200+" },
      { label: "Tamamlama", value: "3.2%" },
    ],
    features: [
      "Ritim Tabanlı",
      "200+ Level",
      "Level Editörü",
      "Müzik Senkron",
    ],
  },
];

export default function GameShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative py-32">
      {/* Section Divider — Decorative line */}
      <div className="px-6 md:px-12 mb-24">
        <div className="flex items-center gap-6">
          <span className="font-mono text-[0.55rem] tracking-[0.3em] text-white/10 uppercase writing-vertical h-16">
            Oyunlar
          </span>
          <div className="flex-1 h-[1px] bg-gradient-to-r from-electric-purple/20 via-electric-cyan/10 to-transparent" />
        </div>
      </div>

      {/* Games */}
      <div className="space-y-32">
        {games.map((game, index) => (
          <GameSection key={game.slug} game={game} index={index} />
        ))}
      </div>
    </section>
  );
}

function GameSection({
  game,
  index,
}: {
  game: (typeof games)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const isReversed = index % 2 !== 0;

  return (
    <div ref={ref} className="px-6 md:px-12">
      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center ${
          isReversed ? "md:direction-rtl" : ""
        }`}
      >
        {/* Visual Side */}
        <ScrollReveal
          className={`${isReversed ? "md:col-start-7 md:col-span-6" : "md:col-span-6"}`}
          direction={isReversed ? "right" : "left"}
        >
          <Link
            href={`/games/${game.slug}`}
            className="block group relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-white/[0.04] bg-surface-1">
              {/* Abstract game visual */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  game.color === "electric-purple"
                    ? "from-electric-purple/5 via-transparent to-electric-cyan/3"
                    : "from-electric-cyan/5 via-transparent to-electric-purple/3"
                }`}
              />

              {/* Geometric art */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className={`w-48 h-48 md:w-64 md:h-64 border ${
                    game.color === "electric-purple"
                      ? "border-electric-purple/15"
                      : "border-electric-cyan/15"
                  } group-hover:rotate-90 transition-transform duration-1000`}
                  style={{ y: parallaxY }}
                >
                  <div
                    className={`w-full h-full ${
                      game.color === "electric-purple"
                        ? "bg-electric-purple/[0.03]"
                        : "bg-electric-cyan/[0.03]"
                    } flex items-center justify-center`}
                  >
                    <span className="font-grotesk text-fluid-4xl font-bold text-white/[0.05]">
                      {game.title[0]}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Corner label */}
              <div className="absolute top-4 left-4 font-mono text-[0.55rem] tracking-[0.25em] text-white/20 uppercase">
                {String(index + 1).padStart(2, "0")} — {game.genre}
              </div>

              {/* Hover reveal */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span
                  className={`font-mono text-[0.6rem] tracking-[0.2em] uppercase ${
                    game.color === "electric-purple"
                      ? "text-electric-purple/60"
                      : "text-electric-cyan/60"
                  }`}
                >
                  Keşfet →
                </span>
              </div>
            </div>
          </Link>
        </ScrollReveal>

        {/* Content Side */}
        <div
          className={`${
            isReversed
              ? "md:col-start-1 md:col-span-5 md:row-start-1"
              : "md:col-start-8 md:col-span-5"
          } space-y-6`}
          style={{ direction: "ltr" }}
        >
          <ScrollReveal delay={0.2}>
            <span
              className={`font-mono text-fluid-xs tracking-[0.3em] uppercase ${
                game.color === "electric-purple"
                  ? "text-electric-purple/50"
                  : "text-electric-cyan/50"
              }`}
            >
              {game.genre}
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <h2 className="font-grotesk text-fluid-3xl font-light text-white/90">
              {game.title}
            </h2>
            <p className="font-editorial italic text-fluid-lg text-white/30 -mt-1">
              {game.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="font-grotesk text-fluid-sm text-white/25 leading-relaxed max-w-md">
              {game.description}
            </p>
          </ScrollReveal>

          {/* Stats */}
          <ScrollReveal delay={0.5}>
            <div className="flex gap-8 pt-4">
              {game.stats.map((stat) => (
                <div key={stat.label}>
                  <span
                    className={`font-mono text-fluid-xl font-bold ${
                      game.color === "electric-purple"
                        ? "text-electric-purple"
                        : "text-electric-cyan"
                    }`}
                  >
                    {stat.value}
                  </span>
                  <span className="block font-mono text-[0.55rem] tracking-[0.2em] text-white/20 uppercase mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Feature tags */}
          <ScrollReveal delay={0.6}>
            <div className="flex flex-wrap gap-2 pt-2">
              {game.features.map((feature) => (
                <span
                  key={feature}
                  className="font-mono text-[0.6rem] tracking-[0.15em] text-white/20 border border-white/[0.06] px-3 py-1.5 uppercase hover:border-electric-purple/20 hover:text-white/40 transition-all cursor-default"
                >
                  {feature}
                </span>
              ))}
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.7}>
            <Link
              href={`/games/${game.slug}`}
              className={`inline-flex items-center gap-3 font-mono text-fluid-xs tracking-[0.2em] uppercase group mt-4 ${
                game.color === "electric-purple"
                  ? "text-electric-purple/60 hover:text-electric-purple"
                  : "text-electric-cyan/60 hover:text-electric-cyan"
              } transition-colors`}
            >
              <span>Oynamaya Başla</span>
              <span className="w-8 h-[1px] bg-current group-hover:w-14 transition-all duration-300" />
            </Link>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
// components/home/HeroExperience.tsx

"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import GlitchText from "@/components/ui/GlitchText";
import MagneticButton from "@/components/ui/MagneticButton";

export default function HeroExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex flex-col justify-end overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial Glow */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          x: mousePos.x * 0.5,
          y: mousePos.y * 0.5,
        }}
      />

      {/* Floating geometric elements */}
      <motion.div
        className="absolute top-[15%] right-[8%] w-32 h-32 border border-electric-purple/10 rotate-45"
        style={{ y: y1 }}
        animate={{
          rotate: [45, 135, 225, 315, 405],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-[35%] left-[5%] w-2 h-2 bg-electric-cyan/30 rounded-full"
        style={{ y: y2 }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-[20%] right-[15%] w-20 h-[1px] bg-gradient-to-r from-electric-purple/30 to-transparent"
        style={{ y: y1 }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 md:px-12 pb-24"
        style={{ opacity, scale }}
      >
        {/* Top-left status label */}
        <motion.div
          className="absolute top-[15vh] left-6 md:left-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="writing-vertical font-mono text-[0.6rem] tracking-[0.3em] text-white/15 uppercase">
            Pavlov Gaming Hub — 2024
          </div>
        </motion.div>

        {/* Right side accent */}
        <motion.div
          className="absolute top-[20vh] right-6 md:right-12 text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <div className="font-mono text-[0.6rem] tracking-[0.25em] text-electric-purple/30 space-y-1">
            <p>LAT 41.0082°</p>
            <p>LNG 28.9784°</p>
            <p className="mt-4 text-white/10">FRAME: 60FPS</p>
          </div>
        </motion.div>

        {/* Main Hero Typography */}
        <div className="max-w-none mt-[30vh]">
          {/* Subtitle */}
          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="w-12 h-[1px] bg-electric-purple/40" />
            <span className="font-mono text-fluid-xs tracking-[0.3em] text-electric-purple/60 uppercase">
              @ytpavlov presents
            </span>
          </motion.div>

          {/* Giant Title — Asimetrik, editoryal */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-grotesk font-light leading-[0.85] tracking-tight">
                <span className="block text-fluid-hero text-white/[0.04] select-none">
                  PAVLOV
                </span>
                <span className="block text-fluid-5xl text-white -mt-[0.3em] ml-[5vw]">
                  <GlitchText
                    text="OYUN"
                    as="span"
                    className="font-bold text-gradient-purple"
                  />
                </span>
                <span className="block text-fluid-4xl text-white/80 ml-[12vw] font-editorial italic">
                  Dünyasına
                </span>
                <span className="block text-fluid-3xl text-white/40 ml-[3vw] mt-2">
                  Hoş Geldin
                  <span className="inline-block w-3 h-3 bg-electric-purple ml-4 animate-pulse-glow" />
                </span>
              </h1>
            </motion.div>

            {/* Floating game cards — overlapping */}
            <motion.div
              className="absolute -right-4 md:right-[5vw] top-0 md:-top-[5vh] z-20"
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 3 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{ y: y1 }}
            >
              <div className="relative">
                {/* PavRoyale Card */}
                <div className="w-48 md:w-64 h-64 md:h-80 border border-electric-purple/20 bg-surface-1/80 backdrop-blur-sm p-4 relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-purple/5 to-transparent" />
                  <div className="absolute top-3 left-3 font-mono text-[0.55rem] tracking-[0.2em] text-electric-purple/40 uppercase">
                    01 — Game
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-grotesk text-fluid-lg font-semibold text-white/90 mb-1">
                      PavRoyale
                    </h3>
                    <p className="font-mono text-[0.6rem] text-electric-cyan/50 tracking-wider">
                      BATTLE ROYALE
                    </p>
                    <div className="mt-3 w-full h-[1px] bg-electric-purple/20 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-1/3 bg-electric-purple/60 group-hover:w-full transition-all duration-700" />
                    </div>
                  </div>
                  {/* Abstract shape */}
                  <div className="absolute top-12 right-4 w-20 h-20 border border-electric-purple/10 rounded-full group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-16 right-8 w-10 h-10 bg-electric-purple/5 rounded-full" />
                </div>

                {/* Pavometry Card — Overlapping */}
                <div className="absolute -bottom-12 -left-8 md:-left-16 w-40 md:w-52 h-48 md:h-56 border border-electric-cyan/15 bg-surface-2/90 backdrop-blur-sm p-4 relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 to-transparent" />
                  <div className="absolute top-3 left-3 font-mono text-[0.55rem] tracking-[0.2em] text-electric-cyan/40 uppercase">
                    02 — Game
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-grotesk text-fluid-base font-semibold text-white/90 mb-1">
                      Pavometry
                    </h3>
                    <p className="font-mono text-[0.6rem] text-electric-purple/50 tracking-wider">
                      RHYTHM ACTION
                    </p>
                  </div>
                  {/* Triangle */}
                  <div
                    className="absolute top-10 right-3 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-electric-cyan/10 group-hover:border-b-electric-cyan/20 transition-colors duration-300"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTAs — Asimetrik */}
          <motion.div
            className="mt-16 md:mt-20 flex flex-col md:flex-row items-start gap-6 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <MagneticButton href="/games/pavroyale" variant="primary">
              Oynamaya Başla
            </MagneticButton>
            <MagneticButton
              href="https://youtube.com/@ytpavlov"
              variant="outline"
            >
              YouTube Kanalı →
            </MagneticButton>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="mt-20 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              className="w-[1px] h-12 bg-gradient-to-b from-electric-purple/40 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-[0.55rem] tracking-[0.3em] text-white/15 uppercase">
              Aşağı Kaydır
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
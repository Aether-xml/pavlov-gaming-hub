"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Ana Sayfa", href: "/", tag: "01" },
    { label: "PavRoyale", href: "/games/pavroyale", tag: "02" },
    { label: "Pavometry", href: "/games/pavometry", tag: "03" },
  ];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? "glass-heavy" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-electric-purple/20 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
              <span className="font-mono text-sm font-bold text-electric-purple relative z-10">P</span>
            </div>
            <div className="hidden md:block">
              <span className="font-mono text-fluid-xs tracking-[0.3em] text-white/40 block leading-none">@YTPAVLOV</span>
              <span className="font-grotesk text-sm font-semibold tracking-wider text-white/80">GAMING HUB</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 font-mono text-[0.65rem] tracking-[0.2em] text-white/25">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse-glow" />
              SİSTEM AKTİF
            </span>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="relative w-10 h-10 flex flex-col items-end justify-center gap-1.5 group"
          >
            <motion.span
              className="block h-[1px] bg-white/60 group-hover:bg-electric-purple"
              animate={{ width: 24, rotate: open ? 45 : 0, y: open ? 4 : 0 }}
            />
            <motion.span
              className="block h-[1px] bg-white/60"
              animate={{ width: open ? 0 : 16, opacity: open ? 0 : 1 }}
            />
            <motion.span
              className="block h-[1px] bg-white/60 group-hover:bg-electric-purple"
              animate={{ width: open ? 24 : 20, rotate: open ? -45 : 0, y: open ? -4 : 0 }}
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] bg-void/98 backdrop-blur-xl flex flex-col justify-center"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7 }}
          >
            <div className="px-12 md:px-24 space-y-2">
              {links.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-6 py-4 border-b border-white/5 hover:border-electric-purple/20"
                  >
                    <span className="font-mono text-fluid-xs text-electric-purple/40">{l.tag}</span>
                    <span className="font-grotesk text-fluid-4xl font-light text-white/80 group-hover:text-white group-hover:translate-x-4 transition-all duration-500">
                      {l.label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

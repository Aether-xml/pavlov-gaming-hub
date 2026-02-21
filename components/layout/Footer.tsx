// components/layout/Footer.tsx

"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer ref={ref} className="relative border-t border-white/[0.03] mt-32">
      {/* Marquee Band */}
      <div className="overflow-hidden border-b border-white/[0.03] py-6">
        <div className="marquee-track">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="font-grotesk text-fluid-3xl font-light text-white/[0.03] whitespace-nowrap mx-8 select-none"
            >
              PAVLOV GAMING HUB ✦ PLAY ✦ COMPETE ✦ DOMINATE ✦
            </span>
          ))}
        </div>
      </div>

      <div className="px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          {/* Brand */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-electric-purple/20 rotate-45 flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-electric-purple -rotate-45">
                  P
                </span>
              </div>
              <span className="font-mono text-xs tracking-[0.3em] text-white/30">
                PAVLOV GAMING HUB
              </span>
            </div>
            <p className="font-grotesk text-fluid-sm text-white/20 max-w-sm leading-relaxed">
              Dijital oyun evreninin sınırlarını zorluyoruz. Oyna, rekabet et,
              topluluğun parçası ol.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="floating-label block mb-4">Navigasyon</span>
            <div className="space-y-3">
              {[
                { label: "Ana Sayfa", href: "/" },
                { label: "PavRoyale", href: "/games/pavroyale" },
                { label: "Pavometry", href: "/games/pavometry" },
                { label: "Profil", href: "/profile" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block font-grotesk text-fluid-sm text-white/30 hover:text-electric-purple transition-colors duration-300 hover:translate-x-2 transform"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Social */}
          <motion.div
            className="md:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="floating-label block mb-4">Bağlan</span>
            <div className="space-y-3">
              <a
                href="https://youtube.com/@ytpavlov"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/30 hover:text-red-400 transition-colors group"
              >
                <span className="w-8 h-[1px] bg-current group-hover:w-12 transition-all" />
                <span className="font-mono text-fluid-xs tracking-widest uppercase">
                  YouTube
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-white/30 hover:text-indigo-400 transition-colors group"
              >
                <span className="w-8 h-[1px] bg-current group-hover:w-12 transition-all" />
                <span className="font-mono text-fluid-xs tracking-widest uppercase">
                  Discord
                </span>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 text-white/30 hover:text-sky-400 transition-colors group"
              >
                <span className="w-8 h-[1px] bg-current group-hover:w-12 transition-all" />
                <span className="font-mono text-fluid-xs tracking-widest uppercase">
                  Twitter / X
                </span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white/10 uppercase">
            © {new Date().getFullYear()} Pavlov Gaming Hub. Tüm haklar saklıdır.
          </span>
          <span className="font-mono text-[0.6rem] tracking-[0.2em] text-white/10 uppercase">
            Designed & Built with obsession
          </span>
        </div>
      </div>
    </footer>
  );
}
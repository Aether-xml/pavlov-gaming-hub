// components/layout/Navigation.tsx

"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { UserProfile } from "@/types";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  const navOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single();
        if (profile) setUser(profile);
      }
    };

    getUser();

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignIn = async (provider: "google" | "discord") => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  };

  const navLinks = [
    { label: "Oyunlar", href: "/games/pavroyale", tag: "01" },
    { label: "PavRoyale", href: "/games/pavroyale", tag: "02" },
    { label: "Pavometry", href: "/games/pavometry", tag: "03" },
  ];

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled ? "glass-heavy" : ""
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 bg-electric-purple/20 rotate-45 group-hover:rotate-[135deg] transition-transform duration-700" />
              <span className="font-mono text-sm font-bold text-electric-purple relative z-10">
                P
              </span>
            </div>
            <div className="hidden md:block">
              <span className="font-mono text-fluid-xs tracking-[0.3em] text-white/40 block leading-none">
                @YTPAVLOV
              </span>
              <span className="font-grotesk text-sm font-semibold tracking-wider text-white/80">
                GAMING HUB
              </span>
            </div>
          </Link>

          {/* Center — Time + Status (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 font-mono text-[0.65rem] tracking-[0.2em] text-white/25">
            <span>{new Date().toLocaleDateString("tr-TR")}</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse-glow" />
              SİSTEM AKTİF
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Auth Button */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/profile" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-full bg-electric-purple/20 border border-electric-purple/30 flex items-center justify-center overflow-hidden">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.display_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-mono text-xs text-electric-purple">
                        {user.display_name?.[0] || "P"}
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-fluid-xs text-white/50 group-hover:text-electric-purple transition-colors">
                    {user.username}
                  </span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="font-mono text-[0.6rem] tracking-[0.15em] text-white/20 hover:text-white/60 transition-colors uppercase"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => handleSignIn("google")}
                  className="magnetic-btn px-4 py-2 font-mono text-[0.65rem] tracking-[0.15em] text-white/50 border border-white/10 hover:border-electric-purple/30 hover:text-electric-purple uppercase transition-all"
                >
                  <span>Google</span>
                </button>
                <button
                  onClick={() => handleSignIn("discord")}
                  className="magnetic-btn px-4 py-2 font-mono text-[0.65rem] tracking-[0.15em] text-white/50 border border-white/10 hover:border-electric-cyan/30 hover:text-electric-cyan uppercase transition-all"
                >
                  <span>Discord</span>
                </button>
              </div>
            )}

            {/* Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative w-10 h-10 flex flex-col items-end justify-center gap-1.5 group"
              aria-label="Menu"
            >
              <motion.span
                className="block h-[1px] bg-white/60 group-hover:bg-electric-purple transition-colors"
                animate={{
                  width: isMenuOpen ? 24 : 24,
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 4 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-[1px] bg-white/60"
                animate={{
                  width: isMenuOpen ? 0 : 16,
                  opacity: isMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[1px] bg-white/60 group-hover:bg-electric-purple transition-colors"
                animate={{
                  width: isMenuOpen ? 24 : 20,
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -4 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] bg-void/98 backdrop-blur-xl flex flex-col justify-center"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-12 md:px-24">
              {/* Nav Links */}
              <div className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="group flex items-baseline gap-6 py-4 border-b border-white/5 hover:border-electric-purple/20 transition-colors"
                    >
                      <span className="font-mono text-fluid-xs text-electric-purple/40">
                        {link.tag}
                      </span>
                      <span className="font-grotesk text-fluid-4xl font-light text-white/80 group-hover:text-white transition-colors group-hover:translate-x-4 duration-500">
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer Info */}
              <motion.div
                className="mt-16 flex items-end justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="font-mono text-[0.6rem] tracking-[0.2em] text-white/15 space-y-1">
                  <p>© 2024 PAVLOV GAMING HUB</p>
                  <p>TÜM HAKLAR SAKLIDIR</p>
                </div>
                <div className="font-mono text-[0.6rem] tracking-[0.2em] text-white/15 text-right space-y-1">
                  <p>YOUTUBE / @YTPAVLOV</p>
                  <p>DISCORD / PAVLOV</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
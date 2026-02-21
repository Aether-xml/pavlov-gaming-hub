"use client";
import { motion } from "framer-motion";
import Navigation from "@/components/layout/Navigation";

export default function LoginPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <motion.div
          className="relative z-10 w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-electric-purple/20 rotate-45 flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-electric-purple -rotate-45">P</span>
              </div>
              <span className="font-mono text-[0.6rem] tracking-[0.3em] text-white/30 uppercase">Pavlov Gaming Hub</span>
            </div>
            <h1 className="font-grotesk text-fluid-2xl font-light text-white/90">
              Giris <span className="font-editorial italic text-electric-purple">Yap</span>
            </h1>
            <p className="font-grotesk text-fluid-sm text-white/25 mt-2">Skorlarini kaydet, liderlik tablosunda yerini al.</p>
          </div>

          <div className="space-y-3">
            <button className="w-full px-6 py-4 border border-white/[0.06] bg-surface-1/50 hover:bg-surface-2 transition-all font-grotesk text-fluid-sm text-white/60 hover:text-white/90 text-left">
              Google ile devam et
            </button>
            <button className="w-full px-6 py-4 border border-white/[0.06] bg-surface-1/50 hover:bg-surface-2 transition-all font-grotesk text-fluid-sm text-white/60 hover:text-white/90 text-left">
              Discord ile devam et
            </button>
          </div>

          <p className="font-mono text-[0.6rem] text-white/15 mt-8 text-center tracking-wider">
            Supabase baglandiktan sonra aktif olacak.
          </p>
        </motion.div>
      </main>
    </>
  );
}

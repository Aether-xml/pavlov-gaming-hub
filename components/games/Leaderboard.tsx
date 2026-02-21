"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { LeaderboardEntry } from "@/types";

const mock: LeaderboardEntry[] = [
  { rank: 1, user_id: "1", username: "shadow_king", display_name: "ShadowKing", avatar_url: "", score: 98750, level_reached: 47, played_at: new Date().toISOString() },
  { rank: 2, user_id: "2", username: "cyber_ninja", display_name: "CyberNinja", avatar_url: "", score: 87200, level_reached: 42, played_at: new Date().toISOString() },
  { rank: 3, user_id: "3", username: "pixel_storm", display_name: "PixelStorm", avatar_url: "", score: 76500, level_reached: 39, played_at: new Date().toISOString() },
  { rank: 4, user_id: "4", username: "neon_blade", display_name: "NeonBlade", avatar_url: "", score: 65100, level_reached: 35, played_at: new Date().toISOString() },
  { rank: 5, user_id: "5", username: "void_walker", display_name: "VoidWalker", avatar_url: "", score: 54800, level_reached: 31, played_at: new Date().toISOString() },
  { rank: 6, user_id: "6", username: "quantum_ace", display_name: "QuantumAce", avatar_url: "", score: 43200, level_reached: 28, played_at: new Date().toISOString() },
  { rank: 7, user_id: "7", username: "blaze_fury", display_name: "BlazeFury", avatar_url: "", score: 38900, level_reached: 25, played_at: new Date().toISOString() },
  { rank: 8, user_id: "8", username: "frost_byte", display_name: "FrostByte", avatar_url: "", score: 31400, level_reached: 22, played_at: new Date().toISOString() },
];

export default function Leaderboard({ gameSlug }: { gameSlug: "pavroyale" | "pavometry" }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => { setEntries(mock); setLoading(false); }, 800);
  }, [gameSlug]);

  const medal = (r: number) => r === 1 ? "🥇" : r === 2 ? "🥈" : r === 3 ? "🥉" : null;

  return (
    <section className="px-6 md:px-12 py-20">
      <ScrollReveal>
        <div className="flex items-center gap-4 mb-4">
          <span className="w-8 h-[1px] bg-electric-purple/30" />
          <span className="font-mono text-fluid-xs tracking-[0.3em] text-electric-purple/50 uppercase">Liderlik Tablosu</span>
        </div>
        <h2 className="font-grotesk text-fluid-2xl font-light text-white/90 mb-2">
          En Iyi <span className="font-editorial italic text-electric-purple">Oyuncular</span>
        </h2>
        <p className="font-mono text-fluid-xs text-white/20 mb-10">Gercek zamanli guncellenir</p>
      </ScrollReveal>

      <div className="border border-white/[0.04] bg-surface-1/50 overflow-hidden">
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.04] font-mono text-[0.6rem] tracking-[0.2em] text-white/20 uppercase">
          <span className="col-span-1">#</span>
          <span className="col-span-5 md:col-span-4">Oyuncu</span>
          <span className="col-span-3 text-right">Skor</span>
          <span className="hidden md:block col-span-2 text-right">Level</span>
          <span className="col-span-3 md:col-span-2 text-right">Tarih</span>
        </div>

        {loading && (
          <div className="py-20 text-center">
            <motion.div className="inline-block w-6 h-6 border border-electric-purple/30 border-t-electric-purple rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
            <p className="font-mono text-fluid-xs text-white/20 mt-4">Yukleniyor...</p>
          </div>
        )}

        <AnimatePresence>
          {entries.map((e, i) => (
            <motion.div key={e.user_id} className="leaderboard-row grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.02] items-center" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
              <span className="col-span-1 font-mono text-fluid-sm">{medal(e.rank) || <span className="text-white/30">{String(e.rank).padStart(2, "0")}</span>}</span>
              <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-electric-purple/10 border border-electric-purple/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-xs text-electric-purple/60">{e.display_name[0]}</span>
                </div>
                <div className="min-w-0">
                  <span className="block font-grotesk text-fluid-sm text-white/80 truncate">{e.display_name}</span>
                  <span className="block font-mono text-[0.55rem] text-white/20">@{e.username}</span>
                </div>
              </div>
              <span className={`col-span-3 text-right font-mono text-fluid-base font-bold ${e.rank <= 3 ? "text-electric-purple" : "text-white/60"}`}>{e.score.toLocaleString()}</span>
              <span className="hidden md:block col-span-2 text-right font-mono text-fluid-xs text-white/25">Lv.{e.level_reached}</span>
              <span className="col-span-3 md:col-span-2 text-right font-mono text-[0.6rem] text-white/15">{new Date(e.played_at).toLocaleDateString("tr-TR", { day: "2-digit", month: "short" })}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

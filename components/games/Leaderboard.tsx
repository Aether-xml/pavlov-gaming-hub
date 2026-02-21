// components/games/Leaderboard.tsx

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { LeaderboardEntry } from "@/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface LeaderboardProps {
  gameSlug: "pavroyale" | "pavometry";
}

export default function Leaderboard({ gameSlug }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const fetchLeaderboard = async () => {
      const { data, error } = await supabase.rpc("get_leaderboard", {
        p_game_slug: gameSlug,
        p_limit: 50,
      });

      if (!error && data) {
        setEntries(data);
      }
      setLoading(false);
    };

    fetchLeaderboard();

    // Real-time subscription
    const channel = supabase
      .channel("leaderboard-updates")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "scores",
          filter: `game_slug=eq.${gameSlug}`,
        },
        () => {
          // Re-fetch leaderboard on new score
          fetchLeaderboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameSlug]);

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return null;
  };

  return (
    <section className="px-6 md:px-12 py-20">
      <ScrollReveal>
        <div className="flex items-center gap-4 mb-4">
          <span className="w-8 h-[1px] bg-electric-purple/30" />
          <span className="font-mono text-fluid-xs tracking-[0.3em] text-electric-purple/50 uppercase">
            Liderlik Tablosu
          </span>
        </div>
        <h2 className="font-grotesk text-fluid-2xl font-light text-white/90 mb-2">
          En İyi{" "}
          <span className="font-editorial italic text-electric-purple">
            Oyuncular
          </span>
        </h2>
        <p className="font-mono text-fluid-xs text-white/20 mb-10">
          Gerçek zamanlı güncellenir — Skorlar sunucu tarafından doğrulanır
        </p>
      </ScrollReveal>

      {/* Table */}
      <div className="border border-white/[0.04] bg-surface-1/50 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.04] font-mono text-[0.6rem] tracking-[0.2em] text-white/20 uppercase">
          <span className="col-span-1">#</span>
          <span className="col-span-5 md:col-span-4">Oyuncu</span>
          <span className="col-span-3 md:col-span-3 text-right">Skor</span>
          <span className="hidden md:block col-span-2 text-right">Level</span>
          <span className="col-span-3 md:col-span-2 text-right">Tarih</span>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="py-20 text-center">
            <motion.div
              className="inline-block w-6 h-6 border border-electric-purple/30 border-t-electric-purple"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ borderRadius: "50%" }}
            />
            <p className="font-mono text-fluid-xs text-white/20 mt-4">
              Yükleniyor...
            </p>
          </div>
        )}

        {/* Empty state */}
        {!loading && entries.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-mono text-fluid-xs text-white/20">
              Henüz skor yok. İlk sen ol! 🚀
            </p>
          </div>
        )}

        {/* Entries */}
        <AnimatePresence>
          {entries.map((entry, i) => (
            <motion.div
              key={entry.user_id + entry.score}
              className="leaderboard-row grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.02] items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              layout
            >
              {/* Rank */}
              <span className="col-span-1 font-mono text-fluid-sm">
                {getMedalEmoji(entry.rank) || (
                  <span className="text-white/30">
                    {String(entry.rank).padStart(2, "0")}
                  </span>
                )}
              </span>

              {/* Player */}
              <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-electric-purple/10 border border-electric-purple/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {entry.avatar_url ? (
                    <img
                      src={entry.avatar_url}
                      alt={entry.display_name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="font-mono text-xs text-electric-purple/60">
                      {(entry.display_name || entry.username)?.[0]?.toUpperCase() || "?"}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <span className="block font-grotesk text-fluid-sm text-white/80 truncate">
                    {entry.display_name || entry.username}
                  </span>
                  <span className="block font-mono text-[0.55rem] text-white/20 truncate">
                    @{entry.username}
                  </span>
                </div>
              </div>

              {/* Score */}
              <span
                className={`col-span-3 md:col-span-3 text-right font-mono text-fluid-base font-bold ${
                  entry.rank <= 3 ? "text-electric-purple" : "text-white/60"
                }`}
              >
                {entry.score.toLocaleString("tr-TR")}
              </span>

              {/* Level */}
              <span className="hidden md:block col-span-2 text-right font-mono text-fluid-xs text-white/25">
                Lv.{entry.level_reached}
              </span>

              {/* Date */}
              <span className="col-span-3 md:col-span-2 text-right font-mono text-[0.6rem] text-white/15">
                {new Date(entry.played_at).toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "short",
                })}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
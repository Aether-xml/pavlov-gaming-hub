// app/profile/ProfileContent.tsx

"use client";

import { motion } from "framer-motion";
import type { UserProfile } from "@/types";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface ProfileContentProps {
  profile: UserProfile | null;
  scores: any[];
}

export default function ProfileContent({ profile, scores }: ProfileContentProps) {
  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <ScrollReveal>
        <div className="flex flex-col md:flex-row items-start gap-8 mb-16">
          {/* Avatar */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-electric-purple/20">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-electric-purple/10 flex items-center justify-center">
                  <span className="font-grotesk text-2xl text-electric-purple">
                    {profile.display_name?.[0]?.toUpperCase() || "P"}
                  </span>
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-neon-green rounded-full border-2 border-void" />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="font-grotesk text-fluid-2xl font-light text-white/90">
              {profile.display_name}
            </h1>
            <p className="font-mono text-fluid-xs text-electric-purple/50 tracking-wider mb-2">
              @{profile.username}
            </p>
            {profile.bio && (
              <p className="font-grotesk text-fluid-sm text-white/25 max-w-md">
                {profile.bio}
              </p>
            )}
            <div className="mt-4 font-mono text-[0.6rem] text-white/15 tracking-widest uppercase">
              Üyelik:{" "}
              {new Date(profile.member_since).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "long",
              })}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Scores */}
      <ScrollReveal delay={0.2}>
        <div className="flex items-center gap-4 mb-6">
          <span className="w-8 h-[1px] bg-electric-purple/30" />
          <span className="font-mono text-fluid-xs tracking-[0.3em] text-electric-purple/50 uppercase">
            Rekorlar
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-white/[0.03]">
          {scores.length > 0 ? (
            scores.map((score: any) => (
              <motion.div
                key={score.id}
                className="bg-void p-8 hover:bg-surface-1 transition-colors"
                whileHover={{ y: -2 }}
              >
                <span className="font-mono text-[0.55rem] tracking-[0.25em] text-white/20 uppercase block mb-2">
                  {score.game_slug === "pavroyale"
                    ? "PavRoyale"
                    : "Pavometry"}
                </span>
                <span className="font-mono text-fluid-2xl font-bold text-electric-purple block">
                  {score.score.toLocaleString("tr-TR")}
                </span>
                <span className="font-mono text-[0.6rem] text-white/15 mt-1 block">
                  Level {score.level_reached} —{" "}
                  {new Date(score.created_at).toLocaleDateString("tr-TR")}
                </span>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 bg-void p-12 text-center">
              <p className="font-mono text-fluid-xs text-white/20">
                Henüz rekorun yok. Hadi oyna! 🎮
              </p>
            </div>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}
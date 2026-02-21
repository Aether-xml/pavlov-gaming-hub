// app/page.tsx

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import HeroExperience from "@/components/home/HeroExperience";
import VideoGrid from "@/components/home/VideoGrid";
import GameShowcase from "@/components/home/GameShowcase";
import CommunityPulse from "@/components/home/CommunityPulse";
import AIChatBot from "@/components/chat/AIChatBot";
import CustomCursor from "@/components/ui/CustomCursor";
import { getLatestVideos } from "@/lib/youtube";

export const revalidate = 3600; // ISR: revalidate every hour

export default async function HomePage() {
  const videos = await getLatestVideos(4);

  return (
    <>
      <CustomCursor />
      <Navigation />

      <main className="relative">
        {/* Hero — Editoryal, asimetrik, deneysel */}
        <HeroExperience />

        {/* Divider — Marquee band */}
        <div className="overflow-hidden border-y border-white/[0.03] py-4">
          <div className="marquee-track">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="font-mono text-fluid-xs tracking-[0.5em] text-white/[0.04] whitespace-nowrap mx-8 uppercase select-none"
              >
                PavRoyale ✦ Pavometry ✦ @ytpavlov ✦ Gaming Hub ✦
              </span>
            ))}
          </div>
        </div>

        {/* YouTube Videos */}
        <VideoGrid videos={videos} />

        {/* Game Showcase */}
        <GameShowcase />

        {/* Community Stats */}
        <CommunityPulse />
      </main>

      <Footer />

      {/* AI Chat Bot */}
      <AIChatBot />
    </>
  );
}
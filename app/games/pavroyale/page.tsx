// app/games/pavroyale/page.tsx

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GameHero from "@/components/games/GameHero";
import Leaderboard from "@/components/games/Leaderboard";
import AIChatBot from "@/components/chat/AIChatBot";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata = {
  title: "PavRoyale — Pavlov Gaming Hub",
  description: "100 oyunculu epik battle royale deneyimi. Son kalan kazanır.",
};

export default function PavRoyalePage() {
  return (
    <>
      <CustomCursor />
      <Navigation />

      <main className="pt-20">
        <GameHero
          title="PavRoyale"
          tagline="Son Kalan Kazanır"
          genre="BATTLE ROYALE"
          description="100 oyunculu epik battle royale deneyimi. Haritayı keşfet, silahını bul, hayatta kal. Gerçek zamanlı liderlik tablosunda dünya ile yarış."
          color="purple"
        />

        <Leaderboard gameSlug="pavroyale" />
      </main>

      <Footer />
      <AIChatBot />
    </>
  );
}
// app/games/pavometry/page.tsx

import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import GameHero from "@/components/games/GameHero";
import Leaderboard from "@/components/games/Leaderboard";
import AIChatBot from "@/components/chat/AIChatBot";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata = {
  title: "Pavometry — Pavlov Gaming Hub",
  description:
    "Geometri tabanlı ritim-aksiyon oyunu. Müzikle senkronize engelleri aş.",
};

export default function PavometryPage() {
  return (
    <>
      <CustomCursor />
      <Navigation />

      <main className="pt-20">
        <GameHero
          title="Pavometry"
          tagline="Ritim ve Refleks"
          genre="RHYTHM ACTION"
          description="Geometri tabanlı ritim-aksiyon oyunu. Müzikle senkronize engelleri aş, becerini kanıtla. Her level bir sanat eseri."
          color="cyan"
        />

        <Leaderboard gameSlug="pavometry" />
      </main>

      <Footer />
      <AIChatBot />
    </>
  );
}
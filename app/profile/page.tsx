// app/profile/page.tsx

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import ProfileContent from "./ProfileContent";

export const metadata = {
  title: "Profil — Pavlov Gaming Hub",
};

export default async function ProfilePage() {
  const supabase = createServerSupabase();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: scores } = await supabase
    .from("personal_bests")
    .select("*")
    .eq("user_id", user.id);

  return (
    <>
      <Navigation />
      <main className="pt-32 min-h-screen px-6 md:px-12">
        <ProfileContent profile={profile} scores={scores || []} />
      </main>
      <Footer />
    </>
  );
}
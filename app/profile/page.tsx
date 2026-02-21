import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";

export default function ProfilePage() {
  return (
    <>
      <Navigation />
      <main className="pt-32 min-h-screen px-6 md:px-12 text-center">
        <h1 className="font-grotesk text-fluid-2xl text-white/90 mb-4">
          Profil <span className="font-editorial italic text-electric-purple">Sayfası</span>
        </h1>
        <p className="font-mono text-fluid-xs text-white/30">Supabase bağlandıktan sonra aktif olacak.</p>
      </main>
      <Footer />
    </>
  );
}

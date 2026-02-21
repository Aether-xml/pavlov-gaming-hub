// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pavlov Gaming Hub — @ytpavlov",
  description:
    "Pavlov'un dijital oyun evreni. PavRoyale, Pavometry ve daha fazlası. Oyna, rekabet et, topluluğa katıl.",
  keywords: ["pavlov", "gaming", "pavroyale", "pavometry", "oyun", "esports"],
  openGraph: {
    title: "Pavlov Gaming Hub",
    description: "Pavlov'un dijital oyun evreni",
    type: "website",
    siteName: "Pavlov Gaming Hub",
  },
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className="bg-void text-white antialiased">
        {/* Noise Overlay — Sanat yönetmenliği detayı */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Scan Line — CRT retro hissi */}
        <div className="scan-line" aria-hidden="true" />

        {/* Main Content */}
        {children}
      </body>
    </html>
  );
}
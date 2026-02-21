// components/ui/NoiseOverlay.tsx

"use client";

export default function NoiseOverlay() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <div className="scan-line" aria-hidden="true" />
    </>
  );
}
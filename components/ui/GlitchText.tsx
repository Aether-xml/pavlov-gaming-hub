// components/ui/GlitchText.tsx

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  glitchOnHover?: boolean;
}

export default function GlitchText({
  text,
  className = "",
  as: Tag = "h1",
  glitchOnHover = false,
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(!glitchOnHover);

  useEffect(() => {
    if (!glitchOnHover) {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [glitchOnHover]);

  return (
    <span
      className="glitch-wrapper inline-block"
      onMouseEnter={() => glitchOnHover && setIsGlitching(true)}
      onMouseLeave={() => glitchOnHover && setIsGlitching(false)}
    >
      <Tag
        className={`glitch-text ${isGlitching ? "" : "[&::before]:hidden [&::after]:hidden"} ${className}`}
        data-text={text}
      >
        {text}
      </Tag>
    </span>
  );
}
// components/ui/MagneticButton.tsx

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ReactNode, type MouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "outline" | "ghost";
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = (e.clientX - centerX) * 0.3;
    const distY = (e.clientY - centerY) * 0.3;
    x.set(distX);
    y.set(distY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles = {
    primary:
      "bg-electric-purple text-white border border-electric-purple/20 hover:border-electric-purple/60",
    outline:
      "bg-transparent text-electric-purple border border-electric-purple/30 hover:bg-electric-purple/10",
    ghost:
      "bg-transparent text-white/70 hover:text-white border border-transparent hover:border-white/10",
  };

  const Tag = href ? "a" : "button";
  const linkProps = href
    ? { href, target: href.startsWith("http") ? "_blank" : undefined, rel: "noopener" }
    : {};

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Tag
        {...linkProps}
        onClick={onClick}
        className={`
          magnetic-btn px-8 py-3 font-mono text-fluid-sm uppercase tracking-[0.15em]
          transition-all duration-300 relative
          ${baseStyles[variant]}
          ${className}
        `}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Tag>
    </motion.div>
  );
}
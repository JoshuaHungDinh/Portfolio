"use client";

import { motion, useReducedMotion } from "framer-motion";

interface AnimatedBorderLineProps {
  duration?: number;
  delay?: number;
  color?: string;
}

export default function AnimatedBorderLine({
  duration = 0.8,
  delay = 0,
  color = "var(--zinc-800)",
}: AnimatedBorderLineProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 1,
        background: color,
        transformOrigin: "0% 50%",
      }}
      initial={{ scaleX: prefersReducedMotion ? 1 : 0 }}
      animate={{ scaleX: 1 }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { duration, delay, ease: "easeInOut" }
      }
    />
  );
}

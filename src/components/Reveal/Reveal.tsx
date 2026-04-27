"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import styles from "./Reveal.module.scss";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
  style,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number;
    const check = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        el.classList.add(styles.visible);
        return;
      }
      rafId = requestAnimationFrame(check);
    };

    rafId = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${className}`}
      style={{ ...style, transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

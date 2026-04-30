"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";
import styles from "./MagneticButton.module.scss";

interface MagneticButtonProps {
  children: ReactNode;
  radius?: number;
  strength?: number;
  className?: string;
}

export default function MagneticButton({
  children,
  radius = 80,
  strength = 10,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useRef(true);

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        const pull = (1 - dist / radius) * strength;
        const angle = Math.atan2(dy, dx);
        el.style.transform = `translate(${Math.cos(angle) * pull}px, ${Math.sin(angle) * pull}px)`;
      } else {
        el.style.transform = "translate(0, 0)";
      }
    },
    [radius, strength]
  );

  const onMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0)";
    }
  }, []);

  useEffect(() => {
    isDesktop.current = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop.current) return;

    const el = ref.current;
    if (!el) return;

    const parent = el.parentElement;
    if (!parent) return;

    parent.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      parent.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [onMouseMove, onMouseLeave]);

  return (
    <div ref={ref} className={`${styles.magnetic} ${className || ""}`}>
      {children}
    </div>
  );
}

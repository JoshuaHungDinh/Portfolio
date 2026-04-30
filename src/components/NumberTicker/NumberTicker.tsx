"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./NumberTicker.module.scss";

interface NumberTickerProps {
  value: string;
  className?: string;
}

export default function NumberTicker({ value, className }: NumberTickerProps) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          observer.disconnect();

          const chars = value.split("");
          const locked: boolean[] = chars.map(() => false);
          let iteration = 0;
          const totalIterations = 10;

          const interval = setInterval(() => {
            iteration++;

            // Lock characters left-to-right after halfway
            if (iteration > totalIterations / 2) {
              const lockIndex = Math.floor(
                ((iteration - totalIterations / 2) / (totalIterations / 2)) * chars.length
              );
              for (let i = 0; i <= lockIndex && i < chars.length; i++) {
                locked[i] = true;
              }
            }

            setDisplay(
              chars
                .map((ch, i) => {
                  if (locked[i]) return ch;
                  if (!/\d/.test(ch)) return ch;
                  return String(Math.floor(Math.random() * 10));
                })
                .join("")
            );

            if (iteration >= totalIterations) {
              clearInterval(interval);
              setDisplay(value);
            }
          }, 50);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={`${styles.ticker} ${className || ""}`}>
      {display}
    </span>
  );
}

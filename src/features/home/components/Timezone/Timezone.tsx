"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Legend from "./Legend/Legend";

import styles from "./Timezone.module.scss";

const RotatingEarth = dynamic(
  () => import("./AnimatedGlobe"),
  { ssr: false },
);

export default function Timezone() {
  const [shouldMount, setShouldMount] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Start loading the globe once user scrolls past the first fold
  // (into the "Things I've shipped" section), giving it a head start
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        setShouldMount(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trigger text animations when section scrolls into view
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={contentRef}>
      <div className={styles.content}>
        <h2
          className={`${styles.displayHeading} ${revealed ? styles.blurIn : ""}`}
          style={{ opacity: revealed ? undefined : 0 }}
        >
          Working across timezones
        </h2>

        <p
          className={`${styles.subtitle} ${revealed ? styles.blurIn : ""}`}
          style={{ opacity: revealed ? undefined : 0, animationDelay: revealed ? "0.15s" : undefined }}
        >
          U.S. Citizen based in San Diego, comfortable collaborating from PST
          through JST.
        </p>

        <div
          className={`${styles.globeWrapper} ${revealed ? styles.globeFadeIn : ""}`}
          style={{ opacity: revealed ? undefined : 0, animationDelay: revealed ? "0.35s" : undefined }}
        >
          {shouldMount && <RotatingEarth width={600} height={600} />}
          <Legend />
        </div>
      </div>
    </section>
  );
}

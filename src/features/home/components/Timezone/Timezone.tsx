"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Legend from "@/features/GlobalRemote/components/Legend/Legend";

import styles from "./Timezone.module.scss";

const RotatingEarth = dynamic(
  () => import("@/features/GlobalRemote/components/AnimatedGlobe"),
  { ssr: false },
);

export default function Timezone() {
  const [shouldMount, setShouldMount] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Lazy mount the globe when close to viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
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
          ref={sectionRef}
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

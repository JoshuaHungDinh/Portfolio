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
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.displayHeading}>
          Working across timezones
        </h2>

        <p className={styles.subtitle}>
          U.S. Citizen based in San Diego, comfortable collaborating from PST
          through JST.
        </p>

        <div ref={sectionRef} className={styles.globeWrapper}>
          {shouldMount && <RotatingEarth width={600} height={600} />}
          <Legend />
        </div>
      </div>
    </section>
  );
}

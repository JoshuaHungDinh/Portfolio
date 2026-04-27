"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import Legend from "@/features/GlobalRemote/components/Legend/Legend";

import styles from "./Timezone.module.scss";

const RotatingEarth = dynamic(
  () => import("@/features/GlobalRemote/components/AnimatedGlobe"),
  { ssr: false },
);

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const noMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

export default function Timezone() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <motion.h2
          className={styles.displayHeading}
          variants={variants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          Working across timezones
        </motion.h2>

        <motion.p
          className={styles.subtitle}
          variants={variants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          U.S. Citizen based in San Diego, comfortable collaborating from PST
          through JST.
        </motion.p>

        <motion.div
          className={styles.globeWrapper}
          variants={variants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
        >
          <RotatingEarth width={600} height={600} />
          <Legend />
        </motion.div>
      </div>
    </section>
  );
}

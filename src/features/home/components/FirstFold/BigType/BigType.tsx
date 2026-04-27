"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedBorderLine from "../Hero/AnimatedBorderLine";
import styles from "./BigType.module.scss";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const noMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

export default function BigType() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <section className={styles.section}>
      <AnimatedBorderLine duration={0.8} delay={0.6} />

      <div className={styles.row}>
        <motion.h2
          className={styles.heading}
          variants={variants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.75, ease: "easeOut" }}
        >
          Engineer
          <sup className={styles.tm}>TM</sup>
        </motion.h2>
        <motion.a
          href="#resume"
          className={styles.resumeLink}
          variants={variants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.9, ease: "easeOut" }}
        >
          ↓ View Work
        </motion.a>
      </div>
    </section>
  );
}

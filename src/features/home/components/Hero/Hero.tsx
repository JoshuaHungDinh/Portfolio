"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedBorderLine from "./AnimatedBorderLine";
import styles from "./Hero.module.scss";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const noMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <section className={styles.section}>
      <AnimatedBorderLine duration={0.8} />

      {/* Left column */}
      <div className={styles.left}>
        <motion.h1
          className={styles.heading}
          variants={variants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          Building Systems that Ship Fast
          <br />
          and Scale 静かに.
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          variants={variants}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          └ Full-stack product engineer, expanding into cloud infrastructure
        </motion.p>
      </div>

      {/* Right column — featured card */}
      <motion.div
        className={styles.right}
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
      >
        <div className={styles.card}>
          <div />
          <div className={styles.cardCenter}>
            <div className={styles.iconBox}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                className={styles.icon}
              >
                <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                <circle cx="13" cy="8" r="1.5" fill="currentColor" />
                <circle cx="18" cy="8" r="1.5" fill="currentColor" />
                <rect
                  x="6"
                  y="15"
                  width="28"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="6"
                  y="21"
                  width="22"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="6"
                  y="27"
                  width="26"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="6"
                  y="33"
                  width="18"
                  height="2"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
          <p className={styles.featured}>FEATURED ↗</p>
        </div>
      </motion.div>
    </section>
  );
}

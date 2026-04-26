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
          <img
            src="/profile-image.jpeg"
            alt="Joshua Hung Dinh"
            className={styles.profileImage}
          />
        </div>
      </motion.div>
    </section>
  );
}

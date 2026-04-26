"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./Navbar.module.scss";

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

const noMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

export default function Navbar() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeIn;

  return (
    <nav className={styles.nav}>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
      >
        <p className={styles.label}>JoshuaHungDinh®</p>
        <p className={styles.sub}>v2026.04</p>
      </motion.div>
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
      >
        <p className={styles.label}>Index</p>
        <p className={styles.sub}>Work, Writing, Stack, Contact</p>
      </motion.div>
      <motion.div
        className={styles.right}
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
      >
        <p className={styles.label}>Based in San Diego ☀</p>
        <p className={styles.sub}>Software - Web Systems</p>
      </motion.div>
    </nav>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./BackLink.module.scss";

const fadeIn = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
};

const noMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

export default function BackLink() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeIn;

  return (
    <motion.a
      href="/"
      className={styles.link}
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>
      Back to home
    </motion.a>
  );
}

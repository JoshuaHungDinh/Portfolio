"use client";

import { motion, useReducedMotion } from "framer-motion";
import AnimatedBorderLine from "../Hero/AnimatedBorderLine";
import styles from "./FooterBar.module.scss";

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

const noMotion = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
};

export default function FooterBar() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeIn;

  return (
    <footer className={styles.footer}>
      <AnimatedBorderLine duration={0.8} delay={1.0} />

      <motion.p
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.4, delay: 1.1, ease: "easeOut" }}
      >
        © CRAFTED INTERFACES コード
      </motion.p>
      <motion.p
        className={styles.center}
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
      >
        (IDX® — 01)
      </motion.p>
      <motion.p
        className={styles.right}
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.4, delay: 1.3, ease: "easeOut" }}
      >
        FULL—STACK / INFRA
      </motion.p>
    </footer>
  );
}

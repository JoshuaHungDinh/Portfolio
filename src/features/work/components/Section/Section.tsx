"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./Section.module.scss";

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const noMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

interface SectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
  id?: string;
}

export default function Section({ number, title, children, id }: SectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <motion.section
      id={id}
      className={styles.section}
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
    >
      <div className={styles.border} />
      <div className={styles.header}>
        <span className={styles.number}>{number}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.content}>{children}</div>
    </motion.section>
  );
}

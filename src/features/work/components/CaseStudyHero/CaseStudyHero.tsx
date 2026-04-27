"use client";

import { motion, useReducedMotion } from "framer-motion";
import styles from "./CaseStudyHero.module.scss";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const noMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

interface CaseStudyHeroProps {
  index: string;
  category: string;
  name: string;
  trademark?: "TM" | "R" | "";
  subtitle: string;
  tags: string[];
  status: string;
  year: string;
}

export default function CaseStudyHero({
  index,
  category,
  name,
  trademark,
  subtitle,
  tags,
  status,
  year,
}: CaseStudyHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <header className={styles.hero}>
      <span className={styles.borderLine} />

      <motion.p
        className={styles.category}
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        ({index}) &mdash; {category}
      </motion.p>

      <motion.h1
        className={styles.name}
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        {name}
        {trademark && (
          <sup className={styles.trademark}>
            {trademark === "TM" ? "\u2122" : "\u00AE"}
          </sup>
        )}
      </motion.h1>

      <motion.p
        className={styles.subtitle}
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      >
        {subtitle}
      </motion.p>

      <motion.div
        className={styles.meta}
        variants={variants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      >
        <div className={styles.tags}>
          {tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className={styles.details}>
          <span className={styles.statusBadge}>
            <span className={styles.statusDot} />
            {status}
          </span>
          <span className={styles.year}>{year}</span>
        </div>
      </motion.div>
    </header>
  );
}

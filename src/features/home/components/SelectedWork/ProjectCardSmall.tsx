"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "./selectedWorkData";
import PlaceholderVisual from "./PlaceholderVisual";
import styles from "./SelectedWork.module.scss";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const noMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

interface ProjectCardSmallProps {
  project: Project;
  delay?: number;
}

export default function ProjectCardSmall({ project, delay = 0 }: ProjectCardSmallProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <motion.div
      className={styles.compactCard}
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <a href={project.href} className={styles.compactVisual}>
        <PlaceholderVisual variant={project.visual} />
        <span className={styles.cardLabel}>{project.label} &#x2197;</span>
      </a>
      <div className={styles.compactInfo}>
        <p className={styles.projectCategory}>
          ({project.index}) &mdash; {project.category}
        </p>
        <h3 className={styles.compactName}>{project.name}</h3>
        <p className={styles.projectDescription}>{project.description}</p>
      </div>
    </motion.div>
  );
}

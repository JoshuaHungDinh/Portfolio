"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "./selectedWorkData";
import PlaceholderVisual from "./PlaceholderVisual";
import TechTag from "./TechTag";
import styles from "./SelectedWork.module.scss";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const noMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};

interface ProjectCardProps {
  project: Project;
  reversed?: boolean;
}

export default function ProjectCard({ project, reversed }: ProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  return (
    <div className={`${styles.projectRow} ${reversed ? styles.projectRowReversed : ""}`}>
      <motion.div
        className={styles.projectInfo}
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        <p className={styles.projectCategory}>
          ({project.index}) &mdash; {project.category}
        </p>
        <h3 className={styles.projectName}>
          {project.name}
          {project.trademark && (
            <sup className={styles.trademark}>
              {project.trademark === "TM" ? "\u2122" : "\u00AE"}
            </sup>
          )}
        </h3>
        <p className={styles.projectDescription}>{project.description}</p>
        {project.tags.length > 0 && (
          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <TechTag key={tag} label={tag} />
            ))}
          </div>
        )}
      </motion.div>

      <motion.a
        href={project.href}
        className={styles.projectVisual}
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <PlaceholderVisual variant={project.visual} imageSrc={project.imageSrc} />
        <span className={styles.cardLabel}>{project.label} &#x2197;</span>
      </motion.a>
    </div>
  );
}

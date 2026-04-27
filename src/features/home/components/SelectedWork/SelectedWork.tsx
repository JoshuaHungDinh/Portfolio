"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import AnimatedBorderLine from "../FirstFold/Hero/AnimatedBorderLine";
import { projects } from "./selectedWorkData";
import ProjectCard from "./ProjectCard/ProjectCard";
import styles from "./SelectedWork.module.scss";

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

const noMotion = {
  initial: { opacity: 1, y: 0 },
  animate: { opacity: 1, y: 0 },
};


export default function SelectedWork() {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? noMotion : fadeInUp;

  const sentinelRef = useRef<HTMLDivElement>(null);
  const projectsReady = useInView(sentinelRef, {
    once: true,
    margin: "0px 0px -40% 0px",
  });

  return (
    <section className={styles.section}>
      {/* Sentinel: projects animate once the section top reaches the nav */}
      <div ref={sentinelRef} />

      <AnimatedBorderLine duration={0.8} />

      {/* Header row */}
      <motion.div
        className={styles.headerRow}
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
      >
        <span>Software Developer</span>
        <span className={styles.headerCenter}>April 2022 &mdash; Nov 2025</span>
        <span className={styles.headerRight}>Liquid Web Inc</span>
      </motion.div>

      {/* Title area */}
      <div className={styles.titleArea}>
        <motion.h2
          className={styles.displayHeading}
          variants={variants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          Things I&apos;ve
          <br />
          <span style={{ whiteSpace: "nowrap" }}>shipped<span className={styles.greenDot} /></span>
        </motion.h2>
        <motion.p
          className={styles.titleDescription}
          variants={variants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          A mix of side projects, open source, and production systems built at
          small teams and one very large one. Click any project to read the case
          study.
        </motion.p>
      </div>

      {/* Project entries */}
      {projects.map((project, i) => (
        <ProjectCard
          key={project.index}
          project={project}
          reversed={i % 2 === 1}
          animate={projectsReady}
        />
      ))}

      {/* Footer row */}
      <motion.div
        className={styles.footerRow}
        variants={variants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        <span className={styles.archiveLabel}>
          ARCHIVE / 14 EARLIER PROJECTS
        </span>
        <a href="/work" className={styles.viewAllButton}>
          View all work &rarr;
        </a>
      </motion.div>
    </section>
  );
}

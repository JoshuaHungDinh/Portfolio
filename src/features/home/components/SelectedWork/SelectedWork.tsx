"use client";

import { useEffect, useState } from "react";
import { projects } from "./selectedWorkData";
import ProjectCard from "./ProjectCard/ProjectCard";
import styles from "./SelectedWork.module.scss";

export default function SelectedWork() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > window.innerHeight * 0.7) {
        setRevealed(true);
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="work" className={styles.section}>
      <div className={styles.topBorder} />

      {/* Header row */}
      <div className={`${styles.headerRow} ${revealed ? styles.visible : styles.hidden}`}>
        <span>Software Developer</span>
        <span className={styles.headerCenter}>April 2022 &mdash; Nov 2025</span>
        <span className={styles.headerRight}>Liquid Web Inc</span>
      </div>

      {/* Title area */}
      <div className={styles.titleArea}>
        <div className={`${revealed ? styles.visible : styles.hidden}`} style={{ transitionDelay: "0.1s" }}>
          <h2 className={styles.displayHeading}>
            Things I&apos;ve
            <br />
            <span style={{ whiteSpace: "nowrap" }}>shipped<span className={styles.greenDot} /></span>
          </h2>
        </div>
        <div className={`${revealed ? styles.visible : styles.hidden}`} style={{ transitionDelay: "0.25s" }}>
          <p className={styles.titleDescription}>
            Production systems, open source, and side projects — built at small
            teams and one very large one. Each one written up in depth.
          </p>
        </div>
      </div>

      {/* Project entries */}
      {projects.map((project, i) => (
        <ProjectCard
          key={project.index}
          project={project}
          reversed={i % 2 === 1}
          revealed={i === 0 ? revealed : undefined}
        />
      ))}

    </section>
  );
}

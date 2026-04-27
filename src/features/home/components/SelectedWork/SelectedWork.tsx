import { projects } from "./selectedWorkData";
import ProjectCard from "./ProjectCard/ProjectCard";
import styles from "./SelectedWork.module.scss";

export default function SelectedWork() {
  return (
    <section className={styles.section}>
      <div className={styles.topBorder} />

      {/* Header row */}
      <div className={styles.headerRow}>
        <span>Software Developer</span>
        <span className={styles.headerCenter}>April 2022 &mdash; Nov 2025</span>
        <span className={styles.headerRight}>Liquid Web Inc</span>
      </div>

      {/* Title area */}
      <div className={styles.titleArea}>
        <h2 className={styles.displayHeading}>
          Things I&apos;ve
          <br />
          <span style={{ whiteSpace: "nowrap" }}>shipped<span className={styles.greenDot} /></span>
        </h2>
        <p className={styles.titleDescription}>
          A mix of side projects, open source, and production systems built at
          small teams and one very large one. Click any project to read the case
          study.
        </p>
      </div>

      {/* Project entries */}
      {projects.map((project, i) => (
        <ProjectCard
          key={project.index}
          project={project}
          reversed={i % 2 === 1}
          animate={true}
        />
      ))}

      {/* Footer row */}
      <div className={styles.footerRow}>
        <span className={styles.archiveLabel}>
          ARCHIVE / 14 EARLIER PROJECTS
        </span>
        <a href="/work" className={styles.viewAllButton}>
          View all work &rarr;
        </a>
      </div>
    </section>
  );
}

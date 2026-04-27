import type { Project } from "../selectedWorkData";
import PlaceholderVisual from "../PlaceholderVisual/PlaceholderVisual";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  project: Project;
  reversed?: boolean;
  animate?: boolean;
}

export default function ProjectCard({ project, reversed }: ProjectCardProps) {
  return (
    <div className={`${styles.projectRow} ${reversed ? styles.reversed : ""}`}>
      <div className={styles.textBlock}>
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
        <a href={project.href} className={styles.caseStudyLink}>
          Read case study <span className={styles.arrow}>&rarr;</span>
        </a>
      </div>

      <a href={project.href} className={styles.imageBlock}>
        <PlaceholderVisual variant={project.visual} imageSrc={project.imageSrc} />
        <span className={styles.cardLabel}>{project.label} &#x2197;</span>
      </a>
    </div>
  );
}

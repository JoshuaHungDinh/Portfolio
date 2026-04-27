import type { Project } from "../selectedWorkData";
import PlaceholderVisual from "../PlaceholderVisual/PlaceholderVisual";
import Reveal from "@/components/Reveal/Reveal";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  project: Project;
  reversed?: boolean;
  revealed?: boolean;
}

export default function ProjectCard({ project, reversed, revealed }: ProjectCardProps) {
  const useScrollReveal = revealed !== undefined;

  const textDelay = reversed ? 0.15 : 0;
  const imageDelay = reversed ? 0 : 0.15;

  // For the first card: use parent's scroll-based revealed state
  // For all other cards: use IntersectionObserver via Reveal
  if (useScrollReveal) {
    const revealClass = revealed ? styles.visible : styles.hidden;
    return (
      <div className={`${styles.projectRow} ${reversed ? styles.reversed : ""}`}>
        <div className={`${styles.textCol} ${revealClass}`} style={{ transitionDelay: `${0.4 + textDelay}s` }}>
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
        </div>

        <div className={`${styles.imageCol} ${revealClass}`} style={{ transitionDelay: `${0.4 + imageDelay}s` }}>
          <a href={project.href} className={styles.imageBlock}>
            <PlaceholderVisual variant={project.visual} imageSrc={project.imageSrc} />
            <span className={styles.cardLabel}>{project.label} &#x2197;</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.projectRow} ${reversed ? styles.reversed : ""}`}>
      <Reveal className={styles.textCol} delay={textDelay}>
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
      </Reveal>

      <Reveal className={styles.imageCol} delay={imageDelay}>
        <a href={project.href} className={styles.imageBlock}>
          <PlaceholderVisual variant={project.visual} imageSrc={project.imageSrc} />
          <span className={styles.cardLabel}>{project.label} &#x2197;</span>
        </a>
      </Reveal>
    </div>
  );
}

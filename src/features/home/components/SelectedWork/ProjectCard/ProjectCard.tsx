import type { Project } from "../selectedWorkData";
import PlaceholderVisual from "../PlaceholderVisual/PlaceholderVisual";
import Reveal from "@/components/Reveal/Reveal";
import MagneticButton from "@/components/MagneticButton/MagneticButton";
import NumberTicker from "@/components/NumberTicker/NumberTicker";
import { StaggeredSwap } from "@/components/StaggeredText/StaggeredText";
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

  const actions = (
    <div className={styles.actions}>
      {project.externalLink && (
        <MagneticButton>
          <a
            href={project.externalLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.externalLink}
          >
            {project.externalLink.label}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3.5 2.5h6v6M9.5 2.5L2.5 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </MagneticButton>
      )}
      <MagneticButton>
        <a href={project.href} className={styles.caseStudyLink}>
          Read case study <span className={styles.arrow}>&rarr;</span>
        </a>
      </MagneticButton>
    </div>
  );

  // For the first card: use parent's scroll-based revealed state
  // For all other cards: use IntersectionObserver via Reveal
  if (useScrollReveal) {
    const revealClass = revealed ? styles.visible : styles.hidden;
    return (
      <div className={`${styles.projectRow} ${reversed ? styles.reversed : ""}`} data-project-row>
        <div className={`${styles.textCol} ${revealClass}`} style={{ transitionDelay: `${0.4 + textDelay}s` }}>
          <div className={styles.textBlock}>
            <p className={styles.projectCategory}>
              (<NumberTicker value={project.index} />) &mdash; {project.category}
            </p>
            <h3 className={styles.projectName}>
              <StaggeredSwap outText={project.subtitle} inText={project.name} letterClassName={styles.projectLetter} />
              {project.trademark && (
                <sup className={styles.trademark}>
                  {project.trademark === "TM" ? "\u2122" : "\u00AE"}
                </sup>
              )}
            </h3>
            <p className={styles.projectDescription}>{project.description}</p>
            {actions}
          </div>
        </div>

        <div className={`${styles.imageCol} ${revealClass}`} style={{ transitionDelay: `${0.4 + imageDelay}s` }}>
          <a href={project.href} className={styles.imageBlock} data-project-image>
            <PlaceholderVisual variant={project.visual} imageSrc={project.imageSrc} />
            <span className={styles.cardLabel}>{project.label} &#x2197;</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.projectRow} ${reversed ? styles.reversed : ""}`} data-project-row>
      <Reveal className={styles.textCol} delay={textDelay}>
        <div className={styles.textBlock}>
          <p className={styles.projectCategory}>
            (<NumberTicker value={project.index} />) &mdash; {project.category}
          </p>
          <h3 className={styles.projectName}>
            <StaggeredSwap outText={project.subtitle} inText={project.name} letterClassName={styles.projectLetter} />
            {project.trademark && (
              <sup className={styles.trademark}>
                {project.trademark === "TM" ? "\u2122" : "\u00AE"}
              </sup>
            )}
          </h3>
          <p className={styles.projectDescription}>{project.description}</p>
          {actions}
        </div>
      </Reveal>

      <Reveal className={styles.imageCol} delay={imageDelay}>
        <a href={project.href} className={styles.imageBlock} data-project-image>
          <PlaceholderVisual variant={project.visual} imageSrc={project.imageSrc} />
          <span className={styles.cardLabel}>{project.label} &#x2197;</span>
        </a>
      </Reveal>
    </div>
  );
}

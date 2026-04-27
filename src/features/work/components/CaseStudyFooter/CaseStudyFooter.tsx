import styles from "./CaseStudyFooter.module.scss";

interface CaseStudyFooterProps {
  stack: string[];
  links: { label: string; href: string }[];
  updatedAt: string;
}

export default function CaseStudyFooter({ stack, links, updatedAt }: CaseStudyFooterProps) {
  return (
    <footer className={styles.footer}>
      <div className={styles.border} />

      <div className={styles.stackRow}>
        {stack.map((tech) => (
          <span key={tech} className={styles.pill}>
            {tech}
          </span>
        ))}
      </div>

      <div className={styles.linksRow}>
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={styles.link}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {link.label}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        ))}
      </div>

      <p className={styles.updated}>Last updated: {updatedAt}</p>
    </footer>
  );
}

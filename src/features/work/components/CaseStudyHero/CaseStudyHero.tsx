import styles from "./CaseStudyHero.module.scss";

interface CaseStudyLink {
  label: string;
  href: string;
}

interface CaseStudyHeroProps {
  index: string;
  category: string;
  name: string;
  trademark?: "TM" | "R" | "";
  subtitle: string;
  tags: string[];
  status: string;
  year: string;
  links?: CaseStudyLink[];
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
  links,
}: CaseStudyHeroProps) {
  return (
    <header className={styles.hero}>
      <span className={styles.borderLine} />

      <p className={styles.category}>
        ({index}) &mdash; {category}
      </p>

      <h1 className={styles.name}>
        {name}
        {trademark && (
          <sup className={styles.trademark}>
            {trademark === "TM" ? "\u2122" : "\u00AE"}
          </sup>
        )}
      </h1>

      <p className={styles.subtitle}>{subtitle}</p>

      {links && links.length > 0 && (
        <div className={styles.links}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {link.label}
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 2.5h6v6M9.5 2.5L2.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ))}
        </div>
      )}

      <div className={styles.meta}>
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
      </div>
    </header>
  );
}

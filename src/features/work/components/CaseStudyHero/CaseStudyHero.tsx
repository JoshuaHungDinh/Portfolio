import styles from "./CaseStudyHero.module.scss";

interface CaseStudyHeroProps {
  index: string;
  category: string;
  name: string;
  trademark?: "TM" | "R" | "";
  subtitle: string;
  tags: string[];
  status: string;
  year: string;
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

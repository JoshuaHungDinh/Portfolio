import styles from "./Section.module.scss";

interface SectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
  id?: string;
}

export default function Section({ number, title, children, id }: SectionProps) {
  return (
    <section id={id} className={styles.section}>
      <div className={styles.border} />
      <div className={styles.header}>
        <span className={styles.number}>{number}</span>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}

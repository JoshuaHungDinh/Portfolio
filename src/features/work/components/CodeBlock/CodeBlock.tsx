import styles from "./CodeBlock.module.scss";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

export default function CodeBlock({ code, language, filename }: CodeBlockProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.dots}>
          <span />
          <span />
          <span />
        </div>
        {filename && <span className={styles.filename}>{filename}</span>}
        <span className={styles.language}>{language}</span>
      </div>
      <pre className={styles.pre}>
        <code className={styles.code}>{code}</code>
      </pre>
    </div>
  );
}

"use client";

import styles from "./BigType.module.scss";

export default function BigType() {
  return (
    <section className={styles.section}>
      <span className={styles.borderLine} style={{ animationDelay: "0.9s" }} />

      <div className={styles.row}>
        <h2 className={styles.heading} style={{ animationDelay: "1.0s" }}>
          Engineer
          <sup className={styles.tm} style={{ animationDelay: "1.1s" }}>TM</sup>
        </h2>
        <a
          href="#work"
          className={styles.resumeLink}
          style={{ animationDelay: "1.2s" }}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          ↓ View Work
        </a>
      </div>
    </section>
  );
}

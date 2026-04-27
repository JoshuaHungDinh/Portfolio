"use client";

import styles from "./BigType.module.scss";

export default function BigType() {
  return (
    <section className={styles.section}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "var(--zinc-800)",
        }}
      />

      <div className={styles.row}>
        <h2 className={styles.heading}>
          Engineer
          <sup className={styles.tm}>TM</sup>
        </h2>
        <a
          href="#work"
          className={styles.resumeLink}
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

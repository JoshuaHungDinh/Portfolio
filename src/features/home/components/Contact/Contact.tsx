"use client";

import Reveal from "@/components/Reveal/Reveal";
import styles from "./Contact.module.scss";

export default function Contact() {
  return (
    <section className={styles.section}>
      <Reveal>
        <p className={styles.sectionLabel}>(04) &mdash; CONTACT</p>
      </Reveal>

      <Reveal delay={0.1}>
        <h2 className={styles.displayHeading}>
          Let&apos;s work
          <br />
          <span className={styles.gradientText}>together.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.2}>
        <p className={styles.subhead}>
          Software Engineer open to interesting work across any industry. Open
          to relocation &mdash; or remote, any timezone.
        </p>
      </Reveal>

      <Reveal delay={0.3}>
        <div className={styles.actions}>
          <a
            href="mailto:joshuahungdinh@gmail.com"
            className={`${styles.actionLink} ${styles.primary}`}
          >
            Email me <span className={styles.arrow}>&rarr;</span>
          </a>
          <a
            href="https://cal.com/joshua-hung-dinh"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLink}
          >
            Schedule a call <span className={styles.arrow}>&#x2197;</span>
          </a>
          <a
            href="https://www.linkedin.com/in/joshuahungdinh/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionLink}
          >
            LinkedIn <span className={styles.arrow}>&#x2197;</span>
          </a>
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <p className={styles.footer}>
          Based in San Diego &middot; Replies within 24 hours &middot;
          ありがとう
        </p>
      </Reveal>
    </section>
  );
}

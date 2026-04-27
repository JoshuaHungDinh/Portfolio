import Reveal from "@/components/Reveal/Reveal";
import styles from "./About.module.scss";

export default function About() {
  return (
    <section className={styles.section}>
      {/* Section label */}
      <Reveal>
        <p className={styles.sectionLabel}>(03) &mdash; ABOUT</p>
      </Reveal>

      {/* Large heading */}
      <Reveal delay={0.1}>
        <h2 className={styles.displayHeading}>Joshua.</h2>
      </Reveal>

      <Reveal delay={0.2}>
        <div className={styles.pills}>
          <span className={styles.pill}>Engineer</span>
          <span className={styles.pill}>Founder</span>
          <span className={styles.pill}>Sushi Enthusiast</span>
        </div>
      </Reveal>

      {/* Two-column bio */}
      <div className={styles.bioColumns}>
        <Reveal delay={0.1}>
          <p className={styles.bioText}>
            I build systems that move money. Started at Liquid Web shipping
            donation infrastructure for 100k+ nonprofits, now running
            YieldStream &mdash; an underwriting platform replacing gut-feel
            decisions with actual data in an industry that&apos;s somehow still
            allergic to spreadsheets.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className={styles.bioText}>
            The throughline across both: find the lever no one&apos;s pulling yet,
            pull it carefully. Family in Japan taught me that the best craft is
            the kind nobody notices &mdash; systems that age well, code that
            doesn&apos;t draw attention to itself, problems solved once instead of
            patched forever.
          </p>
        </Reveal>
      </div>

      {/* Philosophy */}
      <Reveal>
        <div className={styles.row}>
          <span className={styles.rowLabel}>PHILOSOPHY</span>
          <div className={styles.rowContent}>
            <p className={styles.philosophyHeading}>
              <span className={styles.gradientText}>静かに</span> <em className={styles.quietly}>&mdash; quietly.</em>
            </p>
            <p className={styles.rowSubtext}>
              The way I prefer to ship. The way I prefer to work.
            </p>
          </div>
        </div>
      </Reveal>

      {/* Currently */}
      <Reveal>
        <div className={styles.row}>
          <span className={styles.rowLabel}>CURRENTLY</span>
          <div className={styles.rowContent}>
            <p className={styles.currentlyHeading}>
              Open to collaboration. If you&apos;re building something serious
              and want a hand, talk to me.
            </p>
            <span className={styles.statusBadge}>
              <span className={styles.greenDot} />
              Selectively open to new work
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

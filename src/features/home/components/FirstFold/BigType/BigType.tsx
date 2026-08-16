"use client";

import { useScroll } from "framer-motion";
import { ScrollLetter } from "@/components/StaggeredText/StaggeredText";
import styles from "./BigType.module.scss";

const SOFTWARE = "Software".split("");
const ENGINEER = "Engineer".split("");

export default function BigType() {
  const { scrollY } = useScroll();

  return (
    <section className={styles.section}>
      <span className={styles.borderLine} style={{ animationDelay: "0.9s" }} />

      <div className={styles.row}>
        <h2 className={styles.heading} style={{ animationDelay: "1.0s" }}>
          <span className={styles.wordWrap}>
            <span className={styles.word}>
              {SOFTWARE.map((letter, i) => (
                <ScrollLetter
                  key={`s-${i}`}
                  letter={letter}
                  index={i}
                  direction="out"
                  scrollY={scrollY}
                  className={styles.letter}
                />
              ))}
            </span>
            <span className={styles.word}>
              {ENGINEER.map((letter, i) => (
                <ScrollLetter
                  key={`e-${i}`}
                  letter={letter}
                  index={i}
                  direction="in"
                  scrollY={scrollY}
                  className={styles.letter}
                />
              ))}
            </span>
          </span>
          <sup className={styles.tm} style={{ animationDelay: "1.1s" }}>TM</sup>
        </h2>
        <a
          href="#work"
          className={styles.resumeLink}
          style={{ animationDelay: "1.2s" }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
          }}
        >
          ↓ View Work
        </a>
      </div>
    </section>
  );
}

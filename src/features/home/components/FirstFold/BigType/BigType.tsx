"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./BigType.module.scss";

const SOFTWARE = "Software".split("");
const ENGINEER = "Engineer".split("");
const LETTER_OFFSET = 40; // px of scroll stagger between each letter

function ScrollLetter({
  letter,
  index,
  direction,
  scrollY,
}: {
  letter: string;
  index: number;
  direction: "out" | "in";
  scrollY: ReturnType<typeof useScroll>["scrollY"];
}) {
  const stagger = index * LETTER_OFFSET;

  const opacity =
    direction === "out"
      ? useTransform(scrollY, [0 + stagger, 200 + stagger], [1, 0])
      : useTransform(scrollY, [100 + stagger, 300 + stagger], [0, 1]);

  const y =
    direction === "out"
      ? useTransform(scrollY, [0 + stagger, 200 + stagger], [0, -30])
      : useTransform(scrollY, [100 + stagger, 300 + stagger], [30, 0]);

  return (
    <motion.span className={styles.letter} style={{ opacity, y }}>
      {letter}
    </motion.span>
  );
}

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

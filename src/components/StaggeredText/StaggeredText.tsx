"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import styles from "./StaggeredText.module.scss";

/* ── Scroll-driven letter (used by BigType hero) ── */

interface ScrollLetterProps {
  letter: string;
  index: number;
  direction: "out" | "in";
  scrollY: MotionValue<number>;
  offset?: number;
  className?: string;
}

const LETTER_OFFSET = 40;

export function ScrollLetter({
  letter,
  index,
  direction,
  scrollY,
  offset = LETTER_OFFSET,
  className = "",
}: ScrollLetterProps) {
  const stagger = index * offset;

  const opacity =
    direction === "out"
      ? useTransform(scrollY, [0 + stagger, 200 + stagger], [1, 0])
      : useTransform(scrollY, [100 + stagger, 300 + stagger], [0, 1]);

  const y =
    direction === "out"
      ? useTransform(scrollY, [0 + stagger, 200 + stagger], [0, -30])
      : useTransform(scrollY, [100 + stagger, 300 + stagger], [30, 0]);

  return (
    <motion.span className={`${styles.letter} ${className}`} style={{ opacity, y }}>
      {letter}
    </motion.span>
  );
}

/* ── Scroll-driven swap: "out" text fades away, "in" text fades in ── */

interface SwapLetterProps {
  letter: string;
  index: number;
  total: number;
  direction: "out" | "in";
  progress: MotionValue<number>;
  className?: string;
}

function SwapLetter({
  letter,
  index,
  total,
  direction,
  progress,
  className = "",
}: SwapLetterProps) {
  // Spread each letter's animation across a portion of the 0→1 progress
  const staggerSpan = 0.03;
  const start = index * staggerSpan;

  const opacity =
    direction === "out"
      ? useTransform(progress, [start, start + 0.3], [1, 0])
      : useTransform(progress, [start + 0.15, start + 0.45], [0, 1]);

  const y =
    direction === "out"
      ? useTransform(progress, [start, start + 0.3], [0, -30])
      : useTransform(progress, [start + 0.15, start + 0.45], [30, 0]);

  return (
    <motion.span className={`${styles.letter} ${className}`} style={{ opacity, y }}>
      {letter}
    </motion.span>
  );
}

interface StaggeredSwapProps {
  outText: string;
  inText: string;
  letterClassName?: string;
  className?: string;
}

export function StaggeredSwap({
  outText,
  inText,
  letterClassName = "",
  className = "",
}: StaggeredSwapProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "start 20%"],
  });

  const outLetters = outText.split("");
  const inLetters = inText.split("");

  return (
    <span ref={ref} className={`${styles.swapWrap} ${className}`}>
      <span className={styles.swapWord}>
        {outLetters.map((letter, i) => (
          <SwapLetter
            key={`out-${i}`}
            letter={letter}
            index={i}
            total={outLetters.length}
            direction="out"
            progress={scrollYProgress}
            className={letterClassName}
          />
        ))}
      </span>
      <span className={styles.swapWord}>
        {inLetters.map((letter, i) => (
          <SwapLetter
            key={`in-${i}`}
            letter={letter}
            index={i}
            total={inLetters.length}
            direction="in"
            progress={scrollYProgress}
            className={letterClassName}
          />
        ))}
      </span>
    </span>
  );
}

/* ── In-view staggered text (used by project titles) ── */

interface StaggeredTextProps {
  text: string;
  className?: string;
  letterClassName?: string;
  staggerDelay?: number;
  once?: boolean;
}

const containerVariants = {
  hidden: {},
  visible: (staggerDelay: number) => ({
    transition: { staggerChildren: staggerDelay },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function StaggeredText({
  text,
  className = "",
  letterClassName = "",
  staggerDelay = 0.035,
  once = true,
}: StaggeredTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-15% 0px" });

  return (
    <motion.span
      ref={ref}
      className={`${styles.wrapper} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={staggerDelay}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className={`${styles.letter} ${letterClassName}`}
          variants={letterVariants}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

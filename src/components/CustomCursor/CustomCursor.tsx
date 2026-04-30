"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CustomCursor.module.scss";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [hoveringProject, setHoveringProject] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const mouse = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const tick = () => {
      pos.x += (mouse.x - pos.x) * 0.2;
      pos.y += (mouse.y - pos.y) * 0.2;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const onEnterImage = () => setHoveringProject(true);
    const onLeaveImage = () => setHoveringProject(false);

    document.addEventListener("mousemove", onMouseMove);

    const observer = new MutationObserver(() => attachImageListeners());
    observer.observe(document.body, { childList: true, subtree: true });

    function attachImageListeners() {
      const images = document.querySelectorAll<HTMLElement>("[data-project-image]");
      images.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterImage);
        el.removeEventListener("mouseleave", onLeaveImage);
        el.addEventListener("mouseenter", onEnterImage);
        el.addEventListener("mouseleave", onLeaveImage);
      });
    }

    attachImageListeners();

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      const images = document.querySelectorAll<HTMLElement>("[data-project-image]");
      images.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterImage);
        el.removeEventListener("mouseleave", onLeaveImage);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${hoveringProject ? styles.expanded : ""}`}
    >
      <span ref={labelRef} className={styles.label}>View</span>
    </div>
  );
}

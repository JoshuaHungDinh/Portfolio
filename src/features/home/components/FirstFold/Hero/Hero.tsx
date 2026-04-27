import styles from "./Hero.module.scss";

export default function Hero() {
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

      {/* Left column */}
      <div className={styles.left}>
        <h1 className={styles.heading}>
          Building Systems that Ship Fast
          <br />
          and Scale 静かに.
        </h1>
        <p className={styles.subtitle}>
          └ Full-stack product engineer, expanding into cloud infrastructure
        </p>
      </div>

      {/* Right column — featured card */}
      <div className={styles.right}>
        <div className={styles.card}>
          <img
            src="/profile-image.jpeg"
            alt="Joshua Hung Dinh"
            className={styles.profileImage}
          />
        </div>
      </div>
    </section>
  );
}

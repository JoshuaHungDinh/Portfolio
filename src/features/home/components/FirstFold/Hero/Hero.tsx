import styles from "./Hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.section}>
      <span className={styles.gradientBar} style={{ animationDelay: "0.4s" }} />

      {/* Left column */}
      <div className={styles.left}>
        <h1 className={styles.heading}>
          <span className={styles.headingLine} style={{ animationDelay: "0.5s" }}>
            Building Systems that Ship Fast
          </span>
          <span className={styles.headingLine} style={{ animationDelay: "0.65s" }}>
            and Scale 静かに.
          </span>
        </h1>
        <p className={styles.subtitle} style={{ animationDelay: "0.8s" }}>
          └ Full-stack product engineer, expanding into cloud infrastructure
        </p>
      </div>

      {/* Right column — featured card */}
      <div className={styles.right}>
        <div className={styles.card} style={{ animationDelay: "0.6s" }}>
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

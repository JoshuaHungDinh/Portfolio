import styles from "./FooterBar.module.scss";

export default function FooterBar() {
  return (
    <footer className={styles.footer}>
      <span className={styles.borderLine} style={{ animationDelay: "1.3s" }} />

      <p className={styles.fadeIn} style={{ animationDelay: "1.4s" }}>© CRAFTED INTERFACES コード</p>
      <p className={`${styles.center} ${styles.fadeIn}`} style={{ animationDelay: "1.4s" }}>(IDX® — 01)</p>
      <p className={`${styles.right} ${styles.fadeIn}`} style={{ animationDelay: "1.4s" }}>FULL—STACK / INFRA</p>
    </footer>
  );
}

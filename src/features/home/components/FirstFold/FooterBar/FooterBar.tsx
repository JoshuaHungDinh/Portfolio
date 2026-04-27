import styles from "./FooterBar.module.scss";

export default function FooterBar() {
  return (
    <footer className={styles.footer}>
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

      <p>© CRAFTED INTERFACES コード</p>
      <p className={styles.center}>(IDX® — 01)</p>
      <p className={styles.right}>FULL—STACK / INFRA</p>
    </footer>
  );
}

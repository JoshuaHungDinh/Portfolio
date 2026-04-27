import styles from "./Legend.module.scss";

export default function Legend() {
  return (
    <div className={styles.legend}>
      <div className={`${styles.card} ${styles.cardBlue}`}>
        <div className={styles.cardHeader}>
          <span className={`${styles.dot} ${styles.dotBlue}`} />
          <span className={`${styles.label} ${styles.labelBlue}`}>
            OPEN TO RELOCATE
          </span>
        </div>
        <p className={styles.cardBody}>
          London, New York, Singapore, Sydney — and elsewhere.
        </p>
      </div>

      <div className={`${styles.card} ${styles.cardLavender}`}>
        <div className={styles.cardHeader}>
          <span className={`${styles.dot} ${styles.dotLavender}`} />
          <span className={`${styles.label} ${styles.labelLavender}`}>
            REMOTE IN JST/KST
          </span>
        </div>
        <p className={styles.cardBody}>
          Family in the region — happy to work remote from Japan, Korea, or nearby.
        </p>
      </div>
    </div>
  );
}

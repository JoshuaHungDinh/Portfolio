import styles from "./MetricCard.module.scss";

interface MetricCardProps {
  value: string;
  label: string;
  sublabel?: string;
}

export default function MetricCard({ value, label, sublabel }: MetricCardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
      {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
    </div>
  );
}

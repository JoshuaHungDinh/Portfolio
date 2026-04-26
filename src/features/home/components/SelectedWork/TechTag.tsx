import styles from "./SelectedWork.module.scss";

interface TechTagProps {
  label: string;
}

export default function TechTag({ label }: TechTagProps) {
  return <span className={styles.tag}>{label}</span>;
}

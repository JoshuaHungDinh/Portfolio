import { Navbar, Hero, BigType, FooterBar } from "@/features/home/components";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <div className={styles.bottom}>
        <BigType />
        <FooterBar />
      </div>
    </main>
  );
}

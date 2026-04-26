import { Navbar, Hero, BigType, FooterBar, SelectedWork } from "@/features/home/components";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles.fold}>
        <Navbar />
        <Hero />
        <div className={styles.bottom}>
          <BigType />
          <FooterBar />
        </div>
      </div>
      <SelectedWork />
    </main>
  );
}

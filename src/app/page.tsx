import { Navbar, Hero, BigType, FooterBar, SelectedWork, Timezone, About, Contact } from "@/features/home/components";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className={styles.revealContainer}>
        <div className={styles.fold}>
          <Hero />
          <div className={styles.bottom}>
            <BigType />
            <FooterBar />
          </div>
        </div>
        <div className={styles.revealBottom}>
          <SelectedWork />
          <Timezone />
          <About />
          <Contact />
        </div>
        <div className={styles.spacer} />
      </div>
    </main>
  );
}

"use client";

import styles from "./page.module.css";
import TableComponent from "./TableComponent";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>Test</p>

        
        <TableComponent />

      </main>

      <footer className={styles.footer}>
        <p>Made by Alexander</p>
      </footer>
    </div>
  );
}

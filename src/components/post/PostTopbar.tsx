import styles from "../../styles/components/PostTopbar.module.css";

export function PostTopbar() {
  return (
    <header className={styles.topbar}>
      <span className={styles.brand}>FIVAM</span>
      <span className={styles.welcome}>Post</span>
    </header>
  );
}

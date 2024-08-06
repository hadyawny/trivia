import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome To Movies Trivia</h1>
      <h2 className={styles.subheading}>Choose Difficulty</h2>
      <div className={styles.links}>
        <Link href="/questions/easy" className={styles.link}>
          Easy
        </Link>
        <Link href="/questions/medium" className={styles.link}>
          Medium
        </Link>
        <Link href="/questions/hard" className={styles.link}>
          Hard
        </Link>
      </div>
    </div>
  );
}

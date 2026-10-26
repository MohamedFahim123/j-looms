import styles from "../authStyles.module.css";

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h2 className={styles.cardTitle}>Create the school</h2>
      <p className={styles.cardLede}>The office account, in three steps.</p>
      {children}
    </>
  );
}

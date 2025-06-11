import styles from './page.module.scss';

export default function NotFoundPage () {
  return (
    <div className={styles.notFound}>
      <div className={styles._404}>404</div>
      <div className={styles.notFoundText}>Not found</div>
    </div>
  )
}
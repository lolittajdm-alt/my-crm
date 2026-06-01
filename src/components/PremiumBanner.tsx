import { IconDiamond } from './icons'
import styles from './PremiumBanner.module.css'

export function PremiumBanner() {
  return (
    <div className={styles.banner}>
      <IconDiamond className={styles.icon} />
      <div className={styles.text}>
        <p className={styles.title}>Расширенная аналитика?</p>
        <p className={styles.sub}>Отчёты, экспорт и интеграции</p>
      </div>
      <button type="button" className={styles.btn}>
        Подключить Pro
      </button>
    </div>
  )
}

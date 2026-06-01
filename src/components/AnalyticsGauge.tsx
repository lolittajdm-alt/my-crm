import { warehouseAnalytics } from '../data/mockData'
import { Card } from './Card'
import styles from './AnalyticsGauge.module.css'

export function AnalyticsGauge() {
  const { done, inProgress, todo } = warehouseAnalytics
  const total = done + inProgress + todo
  const doneDeg = (done / total) * 180
  const progressDeg = (inProgress / total) * 180

  return (
    <Card title="Аналитика склада">
      <div className={styles.wrap}>
        <div
          className={styles.gauge}
          style={{
            background: `conic-gradient(
              var(--accent-blue) 0deg ${doneDeg}deg,
              var(--accent-yellow) ${doneDeg}deg ${doneDeg + progressDeg}deg,
              #e0e0e0 ${doneDeg + progressDeg}deg 180deg
            )`,
          }}
        >
          <div className={styles.gaugeInner}>
            <span className={styles.percent}>{done}%</span>
            <span className={styles.label}>заполнено</span>
          </div>
        </div>
        <ul className={styles.legend}>
          <li>
            <span className={styles.dot} style={{ background: 'var(--accent-blue)' }} />
            Заполнено — {done}%
          </li>
          <li>
            <span className={styles.dot} style={{ background: 'var(--accent-yellow)' }} />
            В работе — {inProgress}%
          </li>
          <li>
            <span className={styles.dot} style={{ background: '#e0e0e0' }} />
            Свободно — {todo}%
          </li>
        </ul>
      </div>
    </Card>
  )
}

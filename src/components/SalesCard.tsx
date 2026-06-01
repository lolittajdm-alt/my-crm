import { salesAnalytics } from '../data/mockData'
import { Card } from './Card'
import styles from './SalesCard.module.css'

function formatMoney(n: number) {
  return new Intl.NumberFormat('ru-RU').format(n)
}

export function SalesCard() {
  const growth = Math.round(
    ((salesAnalytics.thisMonth - salesAnalytics.lastMonth) / salesAnalytics.lastMonth) * 100,
  )

  return (
    <Card title="Аналитика продаж">
      <div className={styles.stats}>
        <div>
          <p className={styles.mainValue}>{formatMoney(salesAnalytics.thisMonth)} ₽</p>
          <p className={styles.sub}>продажи за месяц</p>
        </div>
        <span className={styles.growth}>↑ {growth}%</span>
      </div>
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.metaVal}>{salesAnalytics.ordersCount}</span>
          <span className={styles.metaLabel}>заказов</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaVal}>{salesAnalytics.topCategory}</span>
          <span className={styles.metaLabel}>топ категория</span>
        </div>
      </div>
      <div className={styles.chart}>
        {[65, 45, 80, 55, 90, 70, 85].map((h, i) => (
          <div key={i} className={styles.chartBar} style={{ height: `${h}%` }} />
        ))}
      </div>
    </Card>
  )
}

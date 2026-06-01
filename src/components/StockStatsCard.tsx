import { stockStats } from '../data/mockData'
import { Card } from './Card'
import styles from './StockStatsCard.module.css'

function formatMoney(n: number) {
  return new Intl.NumberFormat('ru-RU').format(n)
}

export function StockStatsCard() {
  const maxBar = Math.max(...stockStats.monthlyBars.map((b) => b.value))
  const sparkMax = Math.max(...stockStats.sparkline)
  const sparkMin = Math.min(...stockStats.sparkline)
  const sparkRange = sparkMax - sparkMin || 1

  const sparkPoints = stockStats.sparkline
    .map((v, i) => {
      const x = (i / (stockStats.sparkline.length - 1)) * 100
      const y = 100 - ((v - sparkMin) / sparkRange) * 80 - 10
      return `${x},${y}`
    })
    .join(' ')

  return (
    <Card title="Стоимость запасов">
      <div className={styles.top}>
        <div>
          <p className={styles.value}>
            {formatMoney(stockStats.totalValue)}
            <span className={styles.currency}>{stockStats.currency}</span>
          </p>
          <span className={styles.badge}>↑ {stockStats.changePercent}%</span>
        </div>
        <svg className={styles.spark} viewBox="0 0 100 40" preserveAspectRatio="none">
          <polyline
            fill="none"
            stroke="var(--accent-blue)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={sparkPoints}
          />
        </svg>
      </div>
      <div className={styles.bars}>
        {stockStats.monthlyBars.map((b) => (
          <div key={b.month} className={styles.barCol}>
            <div
              className={styles.bar}
              style={{ height: `${(b.value / maxBar) * 100}%` }}
            />
            <span className={styles.barLabel}>{b.month}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

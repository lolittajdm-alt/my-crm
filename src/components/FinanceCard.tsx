import { financeSplit } from '../data/mockData'
import { Card } from './Card'
import styles from './FinanceCard.module.css'

function formatMoney(n: number) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(n)
}

export function FinanceCard() {
  return (
    <Card title="Доходы и расходы">
      <div className={styles.split}>
        <div className={styles.block}>
          <p className={styles.percent}>{financeSplit.income}%</p>
          <p className={styles.label}>Доходы</p>
          <p className={styles.amount}>{formatMoney(financeSplit.incomeAmount)}</p>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{ width: `${financeSplit.income}%`, background: 'var(--accent-blue)' }}
            />
          </div>
        </div>
        <div className={styles.block}>
          <p className={styles.percent}>{financeSplit.expenses}%</p>
          <p className={styles.label}>Расходы</p>
          <p className={styles.amount}>{formatMoney(financeSplit.expensesAmount)}</p>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{ width: `${financeSplit.expenses}%`, background: 'var(--accent-yellow)' }}
            />
          </div>
        </div>
      </div>
    </Card>
  )
}

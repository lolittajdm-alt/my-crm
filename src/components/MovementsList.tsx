import { recentMovements } from '../data/mockData'
import { Card } from './Card'
import styles from './MovementsList.module.css'

export function MovementsList() {
  return (
    <Card title="Последние движения" className={styles.card}>
      <ul className={styles.list}>
        {recentMovements.map((item) => (
          <li key={item.id} className={styles.row}>
            <span className={styles.icon}>{item.icon}</span>
            <div className={styles.info}>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.date}>{item.date}</p>
            </div>
            <span
              className={`${styles.amount} ${
                item.type === 'in' || item.type === 'sale'
                  ? styles.positive
                  : item.type === 'out' || item.type === 'expense'
                    ? styles.negative
                    : ''
              }`}
            >
              {item.amount}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

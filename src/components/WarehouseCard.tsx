import { warehouseCard } from '../data/mockData'
import { Card } from './Card'
import styles from './WarehouseCard.module.css'

export function WarehouseCard() {
  return (
    <Card title="Активный склад">
      <div className={styles.cardVisual}>
        <div className={styles.chip} />
        <p className={styles.bankName}>{warehouseCard.name}</p>
        <p className={styles.id}>{warehouseCard.warehouseId}</p>
        <p className={styles.location}>{warehouseCard.location}</p>
        <p className={styles.capacity}>{warehouseCard.capacity}</p>
        <div className={styles.waves} aria-hidden />
      </div>
    </Card>
  )
}

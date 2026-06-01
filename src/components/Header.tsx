import { currentUser, teamMembers } from '../data/mockData'
import { IconBell, IconChevronRight, IconSearch } from './icons'
import styles from './Header.module.css'

type Props = {
  subtitle?: string
}

export function Header({ subtitle = 'Учёт склада' }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>S</span>
        </div>
        <div>
          <p className={styles.brandLabel}>{subtitle}</p>
          <p className={styles.brandName}>StockHub</p>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.iconBtn} aria-label="Уведомления">
          <IconBell />
          <span className={styles.notifDot} />
        </button>
        <label className={styles.search}>
          <IconSearch />
          <input type="search" placeholder="Поиск товаров, задач..." />
        </label>
        <img
          className={styles.avatar}
          src={currentUser.avatar}
          alt={currentUser.name}
        />
      </div>

      <div className={styles.greeting}>
        <h1>
          Привет, <span className={styles.nameHighlight}>{currentUser.name}</span>
        </h1>
        <div className={styles.team}>
          {teamMembers.map((m) => (
            <img
              key={m.id}
              src={m.avatar}
              alt={m.name}
              title={m.name}
              className={styles.teamAvatar}
            />
          ))}
          <button type="button" className={styles.teamMore} aria-label="Все сотрудники">
            <IconChevronRight />
          </button>
        </div>
      </div>
    </header>
  )
}

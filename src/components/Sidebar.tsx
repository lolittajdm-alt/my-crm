import type { ReactNode } from 'react'
import type { NavId } from '../data/mockData'
import {
  IconChart,
  IconHelp,
  IconHistory,
  IconHome,
  IconLogout,
  IconSettings,
  IconUsers,
  IconWarehouse,
} from './icons'
import styles from './Sidebar.module.css'

const navItems: { id: NavId; icon: ReactNode; label: string }[] = [
  { id: 'dashboard', icon: <IconHome />, label: 'Главная' },
  { id: 'warehouse', icon: <IconWarehouse />, label: 'Склад' },
  { id: 'sales', icon: <IconChart />, label: 'Продажи' },
  { id: 'finance', icon: <IconHistory />, label: 'Финансы' },
  { id: 'tasks', icon: <IconUsers />, label: 'Задачи' },
]

type Props = {
  active: NavId
  onNavigate: (id: NavId) => void
}

export function Sidebar({ active, onNavigate }: Props) {
  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav} aria-label="Основная навигация">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`${styles.navBtn} ${active === item.id ? styles.active : ''}`}
            onClick={() => onNavigate(item.id)}
            title={item.label}
            aria-label={item.label}
            aria-current={active === item.id ? 'page' : undefined}
          >
            {item.icon}
          </button>
        ))}
        <button
          type="button"
          className={styles.navBtn}
          onClick={() => onNavigate('settings')}
          title="Настройки"
          aria-label="Настройки"
        >
          <IconSettings />
        </button>
      </nav>
      <div className={styles.bottom}>
        <button type="button" className={styles.navBtn} title="Помощь" aria-label="Помощь">
          <IconHelp />
        </button>
        <button type="button" className={styles.navBtn} title="Выход" aria-label="Выход">
          <IconLogout />
        </button>
      </div>
    </aside>
  )
}

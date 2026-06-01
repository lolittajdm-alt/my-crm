import { useState } from 'react'
import type { NavId } from './data/mockData'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { StockStatsCard } from './components/StockStatsCard'
import { WarehouseCard } from './components/WarehouseCard'
import { AnalyticsGauge } from './components/AnalyticsGauge'
import { MovementsList } from './components/MovementsList'
import { FinanceCard } from './components/FinanceCard'
import { SalesCard } from './components/SalesCard'
import { TasksList } from './components/TasksList'
import { PremiumBanner } from './components/PremiumBanner'
import styles from './App.module.css'

const navSubtitles: Record<NavId, string> = {
  dashboard: 'Учёт склада',
  warehouse: 'Аналитика склада',
  sales: 'Аналитика продаж',
  finance: 'Доходы и расходы',
  tasks: 'Задачи команды',
  settings: 'Настройки',
}

function DashboardGrid() {
  return (
    <div className={styles.grid}>
      <div className={styles.rowTop}>
        <StockStatsCard />
        <WarehouseCard />
        <AnalyticsGauge />
      </div>
      <div className={styles.rowBottom}>
        <div className={styles.colMovements}>
          <MovementsList />
        </div>
        <div className={styles.colRight}>
          <TasksList />
          <SalesCard />
          <FinanceCard />
          <PremiumBanner />
        </div>
      </div>
    </div>
  )
}

function WarehouseView() {
  return (
    <div className={styles.grid}>
      <div className={styles.rowTop}>
        <StockStatsCard />
        <AnalyticsGauge />
        <WarehouseCard />
      </div>
      <MovementsList />
    </div>
  )
}

function SalesView() {
  return (
    <div className={styles.grid}>
      <div className={styles.rowTop}>
        <SalesCard />
        <StockStatsCard />
      </div>
      <MovementsList />
    </div>
  )
}

function FinanceView() {
  return (
    <div className={styles.grid}>
      <div className={styles.rowTop}>
        <FinanceCard />
        <StockStatsCard />
      </div>
      <MovementsList />
    </div>
  )
}

function TasksView() {
  return (
    <div className={styles.grid}>
      <TasksList />
      <PremiumBanner />
    </div>
  )
}

function SettingsView() {
  return (
    <div className={styles.placeholder}>
      <p>Настройки профиля, склада и уведомлений — в разработке.</p>
    </div>
  )
}

export default function App() {
  const [nav, setNav] = useState<NavId>('dashboard')

  const content = (() => {
    switch (nav) {
      case 'warehouse':
        return <WarehouseView />
      case 'sales':
        return <SalesView />
      case 'finance':
        return <FinanceView />
      case 'tasks':
        return <TasksView />
      case 'settings':
        return <SettingsView />
      default:
        return <DashboardGrid />
    }
  })()

  return (
    <div className={styles.shell}>
      <div className={styles.app}>
        <Sidebar active={nav} onNavigate={setNav} />
        <main className={styles.main}>
          <Header subtitle={navSubtitles[nav]} />
          {content}
        </main>
      </div>
    </div>
  )
}

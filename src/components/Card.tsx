import type { ReactNode } from 'react'
import { IconMore } from './icons'
import styles from './Card.module.css'

type Props = {
  title: string
  children: ReactNode
  className?: string
  wide?: boolean
}

export function Card({ title, children, className = '', wide }: Props) {
  return (
    <section className={`${styles.card} ${wide ? styles.wide : ''} ${className}`}>
      <div className={styles.head}>
        <h2>{title}</h2>
        <button type="button" className={styles.more} aria-label="Ещё">
          <IconMore />
        </button>
      </div>
      {children}
    </section>
  )
}

import { tasks } from '../data/mockData'
import { Card } from './Card'
import styles from './TasksList.module.css'

const statusLabels = {
  todo: 'К выполнению',
  in_progress: 'В работе',
  done: 'Готово',
} as const

export function TasksList() {
  return (
    <Card title="Задачи между пользователями">
      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.task}>
            <div className={styles.avatars}>
              <img src={task.assigner.avatar} alt="" title={`От: ${task.assigner.name}`} />
              <img src={task.assignee.avatar} alt="" title={`Кому: ${task.assignee.name}`} />
            </div>
            <div className={styles.body}>
              <p className={styles.title}>{task.title}</p>
              <p className={styles.meta}>
                {task.assigner.name} → {task.assignee.name} · до {task.due}
              </p>
            </div>
            <span className={`${styles.status} ${styles[task.status]}`}>
              {statusLabels[task.status]}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}

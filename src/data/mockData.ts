export const currentUser = {
  id: '0',
  name: 'Алиф Реза',
  role: 'Менеджер склада',
  avatar: 'https://i.pravatar.cc/150?u=alif',
}

export const teamMembers = [
  { id: '1', name: 'Мария', avatar: 'https://i.pravatar.cc/150?u=maria' },
  { id: '2', name: 'Иван', avatar: 'https://i.pravatar.cc/150?u=ivan' },
  { id: '3', name: 'Олег', avatar: 'https://i.pravatar.cc/150?u=oleg' },
  { id: '4', name: 'Анна', avatar: 'https://i.pravatar.cc/150?u=anna' },
  { id: '5', name: 'Дмитрий', avatar: 'https://i.pravatar.cc/150?u=dmitry' },
]

export const stockStats = {
  totalValue: 2_847_500,
  currency: '₽',
  changePercent: 14,
  monthlyBars: [
    { month: 'Янв', value: 62 },
    { month: 'Фев', value: 45 },
    { month: 'Мар', value: 78 },
    { month: 'Апр', value: 55 },
    { month: 'Май', value: 88 },
    { month: 'Июн', value: 72 },
  ],
  sparkline: [40, 55, 48, 62, 58, 70, 65, 78, 72, 85],
}

export const warehouseCard = {
  warehouseId: 'WH-2847',
  name: 'Склад «Центральный»',
  location: 'Москва, ул. Складская 12',
  capacity: '12 400 м²',
}

export const warehouseAnalytics = {
  done: 72,
  inProgress: 18,
  todo: 10,
}

export const salesAnalytics = {
  thisMonth: 1_240_000,
  lastMonth: 980_000,
  ordersCount: 342,
  topCategory: 'Электроника',
}

export const financeSplit = {
  income: 64,
  expenses: 36,
  incomeAmount: 3_200_000,
  expensesAmount: 1_800_000,
}

export const recentMovements = [
  {
    id: '1',
    title: 'Поступление — Apple',
    date: '29 мая 2026',
    amount: '+240 шт.',
    type: 'in' as const,
    icon: '📦',
  },
  {
    id: '2',
    title: 'Отгрузка — Samsung',
    date: '28 мая 2026',
    amount: '-120 шт.',
    type: 'out' as const,
    icon: '📤',
  },
  {
    id: '3',
    title: 'Продажа — Xiaomi',
    date: '28 мая 2026',
    amount: '+₽84 200',
    type: 'sale' as const,
    icon: '💰',
  },
  {
    id: '4',
    title: 'Инвентаризация',
    date: '27 мая 2026',
    amount: 'Проверено',
    type: 'audit' as const,
    icon: '✓',
  },
  {
    id: '5',
    title: 'Закупка — LG',
    date: '26 мая 2026',
    amount: '-₽156 000',
    type: 'expense' as const,
    icon: '🛒',
  },
]

export const tasks = [
  {
    id: '1',
    title: 'Провести инвентаризацию зоны A',
    assignee: teamMembers[0],
    assigner: teamMembers[2],
    status: 'in_progress' as const,
    due: '30 мая',
  },
  {
    id: '2',
    title: 'Согласовать поставку с поставщиком',
    assignee: teamMembers[1],
    assigner: currentUser,
    status: 'todo' as const,
    due: '31 мая',
  },
  {
    id: '3',
    title: 'Подготовить отчёт по продажам',
    assignee: teamMembers[3],
    assigner: teamMembers[4],
    status: 'done' as const,
    due: '28 мая',
  },
  {
    id: '4',
    title: 'Разместить новую партию на стеллажах',
    assignee: teamMembers[4],
    assigner: teamMembers[0],
    status: 'in_progress' as const,
    due: '29 мая',
  },
]

export type NavId =
  | 'dashboard'
  | 'warehouse'
  | 'sales'
  | 'finance'
  | 'tasks'
  | 'settings'

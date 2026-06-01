/**
 * Bazario — локальное хранилище (localStorage).
 * Позже заменим методы на запросы к API / БД, интерфейс останется тем же.
 */
const BazarioDB = (() => {
  const PREFIX = 'bazario_v1_'
  const VERSION_KEY = 'bazario_schema_version'
  const SCHEMA_VERSION = 1

  const COLLECTIONS = {
    warehouses: [],
    products: [],
    shops: [],
    finance: [],
    tasks: [],
    accounts: [],
    orderTransactions: [],
    accountingSections: [],
    profiles: [],
    movements: [],
    profile: null,
    settings: null,
  }

  const PROFILE_ID = 'current-user'

  const SYNC_COLLECTIONS = new Set([
    'warehouses',
    'products',
    'shops',
    'finance',
    'tasks',
    'accounts',
    'orderTransactions',
    'accountingSections',
    'profiles',
    'movements',
  ])

  let syncListener = null
  let applyingRemote = false

  function setSyncListener(fn) {
    syncListener = typeof fn === 'function' ? fn : null
  }

  function setApplyingRemote(value) {
    applyingRemote = !!value
  }

  function notifySync(event) {
    if (applyingRemote || !syncListener) return
    syncListener(event)
  }

  const DEFAULT_PROFILE = {
    id: PROFILE_ID,
    firstName: 'Владислав',
    lastName: 'Чабанюк',
    email: 'lolitta.jdm@gmail.com',
    phone: '+380689462411',
    role: 'Адміністратор',
    storeName: 'MY CRM',
  }

  const DEFAULT_SETTINGS = {
    currency: '₴',
    locale: 'uk-UA',
  }

  function read(key) {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      if (raw === null) return undefined
      return JSON.parse(raw)
    } catch (e) {
      console.warn('BazarioDB read error:', key, e)
      return undefined
    }
  }

  function write(key, data) {
    localStorage.setItem(PREFIX + key, JSON.stringify(data))
  }

  function migrate() {
    const ver = localStorage.getItem(VERSION_KEY)
    if (!ver) {
      // Миграция со старых ключей bazario_*
      const legacy = ['warehouses', 'products', 'shops', 'finance', 'tasks']
      legacy.forEach((name) => {
        try {
          const old = localStorage.getItem('bazario_' + name)
          if (old) {
            write(name, JSON.parse(old))
            localStorage.removeItem('bazario_' + name)
          }
        } catch (_) { /* ignore */ }
      })
      localStorage.setItem(VERSION_KEY, String(SCHEMA_VERSION))
    }
  }

  function init() {
    migrate()
    Object.keys(COLLECTIONS).forEach((key) => {
      if (read(key) === undefined) {
        const fallback = Array.isArray(COLLECTIONS[key])
          ? []
          : key === 'profile'
            ? { ...DEFAULT_PROFILE }
            : { ...DEFAULT_SETTINGS }
        write(key, fallback)
      }
    })
  }

  function uid() {
    return `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
  }

  function now() {
    return new Date().toISOString()
  }

  /** @param {'warehouses'|'products'|'shops'|'finance'|'tasks'|'movements'} collection */
  function list(collection) {
    const data = read(collection)
    return Array.isArray(data) ? data : []
  }

  function get(collection, id) {
    return list(collection).find((item) => item.id === id) ?? null
  }

  function create(collection, payload) {
    const item = {
      ...payload,
      id: payload.id || uid(),
      createdAt: payload.createdAt || now(),
      updatedAt: now(),
    }
    const items = [item, ...list(collection)]
    write(collection, items)
    if (SYNC_COLLECTIONS.has(collection)) notifySync({ type: 'upsert', collection, record: item })
    return item
  }

  function update(collection, id, patch) {
    const items = list(collection)
    const idx = items.findIndex((i) => i.id === id)
    if (idx === -1) return null
    items[idx] = { ...items[idx], ...patch, updatedAt: now() }
    write(collection, items)
    if (SYNC_COLLECTIONS.has(collection)) notifySync({ type: 'upsert', collection, record: items[idx] })
    return items[idx]
  }

  function remove(collection, id) {
    const items = list(collection).filter((i) => i.id !== id)
    write(collection, items)
    if (SYNC_COLLECTIONS.has(collection)) notifySync({ type: 'delete', collection, id })
    return true
  }

  function getProfile() {
    const saved = read('profile') || {}
    const profile = { ...DEFAULT_PROFILE, ...saved, id: saved.id || PROFILE_ID }
    if (!String(profile.email || '').trim()) profile.email = DEFAULT_PROFILE.email
    if (!String(profile.phone || '').trim()) profile.phone = DEFAULT_PROFILE.phone
    if (!String(profile.role || '').trim()) profile.role = DEFAULT_PROFILE.role
    return profile
  }

  function getProfileId() {
    return getProfile().id
  }

  /** Повне ім'я — єдине джерело для шапки, задач, підписів */
  function getFullName(profile = getProfile()) {
    return `${profile.lastName || ''} ${profile.firstName || ''}`.trim()
  }

  function getFirstName() {
    return getProfile().firstName || ''
  }

  function getProfilesRecordIdForSession() {
    const profile = getProfile()
    const record = list('profiles').find((a) => a.email === profile.email)
    return record?.id || null
  }

  function isCurrentUser(userId) {
    if (!userId) return false
    if (userId === getProfileId()) return true
    const recordId = getProfilesRecordIdForSession()
    return recordId != null && userId === recordId
  }

  /** Ім'я виконавця задачі: з профілю або вручну введене */
  function getTaskAssigneeName(task) {
    if (task.assigneeUserId && isCurrentUser(task.assigneeUserId)) return getFullName()
    return task.assignee || '—'
  }

  function migrateUserLinks() {
    const profile = getProfile()
    const fullName = getFullName(profile)

    list('tasks').forEach((task) => {
      if (task.assigneeUserId === profile.id) return
      const name = (task.assignee || '').trim()
      if (!name) return
      if (name === fullName || name === `${profile.firstName} ${profile.lastName}`.trim()) {
        update('tasks', task.id, { assigneeUserId: profile.id, assignee: '' })
      }
    })
  }

  function saveProfile(patch) {
    const profile = { ...getProfile(), ...patch, id: getProfileId(), updatedAt: now() }
    write('profile', profile)
    notifySync({ type: 'profile', data: profile })
    return profile
  }

  /** Дані автора для нових записів у інших розділах */
  function getAuthorMeta() {
    const p = getProfile()
    return {
      authorUserId: p.id,
      authorName: getFullName(p),
    }
  }

  function getSettings() {
    return { ...DEFAULT_SETTINGS, ...read('settings') }
  }

  function getTasksNotificationsSeenAt() {
    return getSettings().tasksNotificationsSeenAt || '1970-01-01T00:00:00.000Z'
  }

  function markTasksNotificationsSeen() {
    const settings = { ...getSettings(), tasksNotificationsSeenAt: now() }
    write('settings', settings)
    notifySync({ type: 'settings', data: settings })
  }

  function logMovement(entry) {
    return create('movements', {
      title: entry.title,
      amount: entry.amount ?? '',
      type: entry.type || 'info',
      icon: entry.icon || '📋',
      meta: entry.meta || {},
    })
  }

  function parseAccountAmountValue(raw) {
    const v = String(raw ?? '').trim().replace(/\s/g, '')
    if (!v) return null
    const n = Number(v.replace(',', '.'))
    return Number.isFinite(n) && n >= 0 ? n : null
  }

  function getAccountAmountValue(account) {
    const n = Number(account?.amount)
    if (Number.isFinite(n)) return n
    return parseAccountAmountValue(account?.amountDisplay) ?? 0
  }

  /** Суми з розділу «Аккаунти» — витрати */
  function getAccountsExpensesTotal() {
    return list('accounts').reduce((sum, a) => sum + getAccountAmountValue(a), 0)
  }

  /** Сводка для головної */
  function getStats() {
    const products = list('products')
    const finance = list('finance')
    const tasks = list('tasks')

    const stockValue = products.reduce((s, p) => s + (Number(p.qty) || 0) * (Number(p.price) || 0), 0)
    const income = finance.filter((f) => f.type === 'income').reduce((s, f) => s + Number(f.amount), 0)
    const financeExpenses = finance.filter((f) => f.type === 'expense').reduce((s, f) => s + Number(f.amount), 0)
    const accountsExpenses = getAccountsExpensesTotal()
    const expenses = financeExpenses + accountsExpenses
    const total = income + expenses || 1

    const tasksDone = tasks.filter((t) => t.status === 'done').length
    const tasksProgress = tasks.filter((t) => t.status === 'in_progress').length
    const tasksTodo = tasks.filter((t) => t.status === 'todo').length
    const taskTotal = tasks.length || 1

    return {
      stockValue,
      income,
      expenses,
      financeExpenses,
      accountsExpenses,
      incomePercent: Math.round((income / total) * 100) || 0,
      expensePercent: Math.round((expenses / total) * 100) || 0,
      productsCount: products.length,
      warehousesCount: list('warehouses').length,
      shopsCount: list('shops').length,
      tasksDonePct: Math.round((tasksDone / taskTotal) * 100),
      tasksInProgressPct: Math.round((tasksProgress / taskTotal) * 100),
      tasksTodoPct: Math.round((tasksTodo / taskTotal) * 100),
      recentMovements: list('movements').slice(0, 8),
    }
  }

  function exportAll() {
    const data = {}
    Object.keys(COLLECTIONS).forEach((key) => {
      data[key] = key === 'profile' || key === 'settings' ? read(key) : list(key)
    })
    data.exportedAt = now()
    return data
  }

  function importAll(data) {
    Object.keys(COLLECTIONS).forEach((key) => {
      if (data[key] !== undefined) write(key, data[key])
    })
    notifySync({ type: 'full' })
  }

  function clearAll(confirmText) {
    if (confirmText !== 'CLEAR') return false
    Object.keys(COLLECTIONS).forEach((key) => {
      if (Array.isArray(COLLECTIONS[key])) write(key, [])
      else if (key === 'profile') write(key, { ...DEFAULT_PROFILE })
      else write(key, { ...DEFAULT_SETTINGS })
    })
    return true
  }

  function migrateSplitProfilesAndAccounts() {
    if (localStorage.getItem(PREFIX + 'split_profiles_v1')) return

    const accounts = list('accounts')
    const profiles = list('profiles')

    if (!profiles.length && accounts.length) {
      write('profiles', accounts.map((item) => ({ ...item })))
    }

    write('accounts', [])
    localStorage.setItem(PREFIX + 'split_profiles_v1', '1')
  }

  function migrateProfilesStatusAndClear() {
    if (localStorage.getItem(PREFIX + 'profiles_status_clear_v3')) return
    write('profiles', [])
    localStorage.setItem(PREFIX + 'profiles_status_clear_v3', '1')
  }

  function migrateProfilesRoleField() {
    if (localStorage.getItem(PREFIX + 'profiles_role_field_v4')) return
    const profiles = list('profiles').map(({ status, role, ...rest }) => ({
      ...rest,
      role: role || status || '',
    }))
    write('profiles', profiles)
    localStorage.setItem(PREFIX + 'profiles_role_field_v4', '1')
  }

  function migrateSessionProfileRole() {
    if (localStorage.getItem(PREFIX + 'session_role_fixed_v5')) return
    const saved = read('profile')
    if (saved && !String(saved.role || '').trim()) {
      write('profile', { ...saved, role: DEFAULT_PROFILE.role })
    }
    localStorage.setItem(PREFIX + 'session_role_fixed_v5', '1')
  }

  function migrateAccountsCreatedAt() {
    if (localStorage.getItem(PREFIX + 'accounts_created_at_v6')) return
    const accounts = list('accounts').map((a) => (
      a.createdAt ? a : { ...a, createdAt: a.updatedAt || now() }
    ))
    write('accounts', accounts)
    localStorage.setItem(PREFIX + 'accounts_created_at_v6', '1')
  }

  function migrateTasksDates() {
    if (localStorage.getItem(PREFIX + 'tasks_dates_v7')) return
    const tasks = list('tasks').map((t) => {
      const createdAt = t.createdAt || t.updatedAt || now()
      const completedAt = t.status === 'done'
        ? (t.completedAt || t.updatedAt || createdAt)
        : null
      return { ...t, createdAt, completedAt }
    })
    write('tasks', tasks)
    localStorage.setItem(PREFIX + 'tasks_dates_v7', '1')
  }

  function migrateTasksNotificationsSeen() {
    if (localStorage.getItem(PREFIX + 'tasks_notifications_seen_v8')) return
    write('settings', { ...getSettings(), tasksNotificationsSeenAt: now() })
    localStorage.setItem(PREFIX + 'tasks_notifications_seen_v8', '1')
  }

  function migrateTaskStatusTimestamps() {
    if (localStorage.getItem(PREFIX + 'tasks_status_ts_v9')) return
    const tasks = list('tasks').map((t) => {
      const createdAt = t.createdAt || t.updatedAt || now()
      const statusChangedAt = t.statusChangedAt || t.updatedAt || createdAt
      const inProgressAt = t.inProgressAt
        || (t.status === 'in_progress' ? statusChangedAt : null)
      const completedAt = t.status === 'done'
        ? (t.completedAt || statusChangedAt)
        : null
      return { ...t, createdAt, statusChangedAt, inProgressAt, completedAt }
    })
    write('tasks', tasks)
    localStorage.setItem(PREFIX + 'tasks_status_ts_v9', '1')
  }

  function migrateTaskStatusHistory() {
    if (localStorage.getItem(PREFIX + 'tasks_status_history_v10')) return
    const tasks = list('tasks').map((t) => {
      if (Array.isArray(t.statusHistory) && t.statusHistory.length) return t
      const createdAt = t.createdAt || t.updatedAt || now()
      const history = [{ status: 'todo', at: createdAt }]
      if (t.inProgressAt) history.push({ status: 'in_progress', at: t.inProgressAt })
      const status = t.status || 'todo'
      const changedAt = t.statusChangedAt || t.completedAt || t.updatedAt || createdAt
      if (status !== 'todo' || changedAt !== createdAt) {
        history.push({ status, at: changedAt })
      }
      history.sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime())
      const normalized = []
      history.forEach((entry) => {
        const last = normalized[normalized.length - 1]
        if (last?.status === entry.status) normalized[normalized.length - 1] = entry
        else normalized.push(entry)
      })
      return { ...t, statusHistory: normalized }
    })
    write('tasks', tasks)
    localStorage.setItem(PREFIX + 'tasks_status_history_v10', '1')
  }

  function migrateOwnerProfile() {
    if (localStorage.getItem(PREFIX + 'profile_owner_v11')) return

    const owner = {
      firstName: 'Владислав',
      lastName: 'Чабанюк',
      email: 'lolitta.jdm@gmail.com',
      phone: '+380689462411',
    }

    const saved = read('profile') || {}
    const isOwnerSession =
      saved.id === PROFILE_ID
      || (!saved.firstName && !saved.lastName)
      || (saved.firstName === owner.firstName && saved.lastName === owner.lastName)
      || saved.email === 'vlad.chabanuk@bazario.ua'

    if (isOwnerSession) {
      write('profile', {
        ...DEFAULT_PROFILE,
        ...saved,
        ...owner,
        id: PROFILE_ID,
        updatedAt: now(),
      })
    }

    const profiles = list('profiles')
    const idx = profiles.findIndex(
      (p) =>
        (p.firstName === owner.firstName && p.lastName === owner.lastName)
        || p.email === owner.email
        || p.email === 'vlad.chabanuk@bazario.ua',
    )
    if (idx >= 0) {
      profiles[idx] = { ...profiles[idx], ...owner, updatedAt: now() }
      write('profiles', profiles)
    } else {
      create('profiles', { ...owner, role: DEFAULT_PROFILE.role })
    }

    migrateUserLinks()
    localStorage.setItem(PREFIX + 'profile_owner_v11', '1')
  }

  function migrateTaskAssigneeUserIds() {
    if (localStorage.getItem(PREFIX + 'tasks_assignee_normalize_v12')) return
    const recordId = getProfilesRecordIdForSession()
    const sessionId = getProfileId()
    if (!recordId) {
      localStorage.setItem(PREFIX + 'tasks_assignee_normalize_v12', '1')
      return
    }
    const tasks = list('tasks').map((t) => {
      if (t.assigneeUserId === sessionId) {
        return { ...t, assigneeUserId: recordId, assignee: '' }
      }
      return t
    })
    write('tasks', tasks)
    localStorage.setItem(PREFIX + 'tasks_assignee_normalize_v12', '1')
  }

  function profileLabelMatchesPaymentId(profile, paymentId) {
    const pid = String(paymentId || '').trim()
    if (!pid) return false
    const variants = [
      `${profile.lastName || ''} ${profile.firstName || ''}`.trim(),
      `${profile.firstName || ''} ${profile.lastName || ''}`.trim(),
    ]
    return variants.includes(pid)
  }

  function migrateAccountPaymentProfiles() {
    if (localStorage.getItem(PREFIX + 'accounts_payment_profile_v13')) return
    const profiles = list('profiles')
    const accounts = list('accounts').map((a) => {
      if (a.paymentProfileId && profiles.some((p) => p.id === a.paymentProfileId)) return a
      const match = profiles.find((p) => profileLabelMatchesPaymentId(p, a.paymentId))
      if (!match) return a
      return {
        ...a,
        paymentProfileId: match.id,
        paymentId: `${match.lastName} ${match.firstName}`.trim(),
      }
    })
    write('accounts', accounts)
    localStorage.setItem(PREFIX + 'accounts_payment_profile_v13', '1')
  }

  function migrateBrandName() {
    if (localStorage.getItem(PREFIX + 'brand_my_crm_v14')) return
    const saved = read('profile')
    if (saved && (saved.storeName === 'Bazario' || !saved.storeName)) {
      write('profile', { ...saved, storeName: 'MY CRM', updatedAt: now() })
    }
    localStorage.setItem(PREFIX + 'brand_my_crm_v14', '1')
  }

  init()
  migrateUserLinks()
  migrateSplitProfilesAndAccounts()
  migrateProfilesStatusAndClear()
  migrateProfilesRoleField()
  migrateSessionProfileRole()
  migrateAccountsCreatedAt()
  migrateTasksDates()
  migrateTasksNotificationsSeen()
  migrateTaskStatusTimestamps()
  migrateTaskStatusHistory()
  migrateOwnerProfile()
  migrateTaskAssigneeUserIds()
  migrateAccountPaymentProfiles()
  migrateBrandName()

  return {
    list,
    get,
    create,
    update,
    remove,
    getProfile,
    getProfileId,
    getFullName,
    getFirstName,
    isCurrentUser,
    getTaskAssigneeName,
    getAuthorMeta,
    saveProfile,
    getSettings,
    getTasksNotificationsSeenAt,
    markTasksNotificationsSeen,
    logMovement,
    getStats,
    getAccountsExpensesTotal,
    getAccountAmountValue,
    exportAll,
    importAll,
    clearAll,
    uid,
    PROFILE_ID,
    setSyncListener,
    setApplyingRemote,
    SYNC_COLLECTIONS,
    read,
    write,
  }
})()

window.BazarioDB = BazarioDB

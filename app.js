/* Bazario — standalone dashboard */

const ICONS = {
  home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z" stroke-linejoin="round"/></svg>`,
  warehouse: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 10l10-5 10 5v10a1 1 0 01-1 1H3a1 1 0 01-1-1V10z" stroke-linejoin="round"/><path d="M8 21v-6h8v6" stroke-linecap="round"/><path d="M10 15h4M10 12h4M10 9h4" stroke-linecap="round"/></svg>`,
  product: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/></svg>`,
  shop: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l2-4h14l2 4"/><path d="M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9"/><path d="M9 21V12h6v9" stroke-linecap="round"/></svg>`,
  accounting: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke-linecap="round"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 14h6M9 11h6M9 8h3" stroke-linecap="round"/></svg>`,
  advertising: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 11v2a1 1 0 001 1h2l4 4V6L6 10H4a1 1 0 00-1 1z" stroke-linejoin="round"/><path d="M15.5 8.5a4.5 4.5 0 010 7M18 6a8 8 0 010 12" stroke-linecap="round"/></svg>`,
  monthly: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 3v4M16 3v4M4 10h16" stroke-linecap="round"/><path d="M8 14h2M12 14h2M16 14h2M8 17h2" stroke-linecap="round"/></svg>`,
  finance: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 6v12M9.5 9.5c0-1.5 1.12-2.5 2.5-2.5s2.5 1 2.5 2.5c0 2-2.5 2-2.5 4"/><circle cx="12" cy="16.8" r="1.1" fill="currentColor" stroke="none"/></svg>`,
  tasks: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  profile: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" stroke-linecap="round"/></svg>`,
  accounts: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="8" r="3.5"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6 1.1 0 2.1.3 3 .8M14 20c0-2.5 1.5-4.5 4-4.5 1 0 1.9.3 2.7.8" stroke-linecap="round"/></svg>`,
}

const NAV = [
  { id: 'home', label: 'Головна', icon: 'home' },
  { id: 'warehouse', label: 'Склад', icon: 'warehouse' },
  { id: 'product', label: 'Товар', icon: 'product' },
  { id: 'shop', label: 'Магазин', icon: 'shop' },
  { id: 'accounting', label: 'Облік', icon: 'accounting' },
  { id: 'advertising', label: 'Реклама', icon: 'advertising' },
  { id: 'finance', label: 'Фінанси', icon: 'finance' },
  { id: 'monthly', label: 'Місячний', icon: 'monthly' },
  { id: 'tasks', label: 'Задачі', icon: 'tasks' },
  { id: 'accounts', label: 'Аккаунти', icon: 'accounts' },
  { id: 'profile', label: 'Профіль', icon: 'profile' },
]

const SEARCH_PLACEHOLDERS = {
  home: 'Пошук по аналітиці...',
  warehouse: 'Пошук складів...',
  product: 'Пошук товарів...',
  shop: 'Пошук магазинів...',
  accounting: 'Пошук в обліку...',
  advertising: 'Пошук витрат на рекламу...',
  finance: 'Пошук операцій...',
  monthly: 'Пошук за місяцями...',
  tasks: 'Пошук задач...',
  accounts: 'Пошук акаунтів...',
  profile: 'Пошук у профілі...',
}

/** Поки false — усі розділи і кнопки доступні всім; пізніше увімкнемо обмеження для адміна. */
const ADMIN_ACCESS_ENABLED = false

const ADMIN_ROLE = 'Адміністратор'
const profileRoles = ['Адміністратор', 'Менеджер', 'Користувач']

const accountDeliveryStatuses = ['Оформлений', 'В дорозі', 'На відділенні', 'Доставлений', 'Відмова']
const accountPaymentTypes = ['Товар', 'Доставка', 'Товар+Доставка']
const bazarioOrderStatuses = ['Нове Замовлення', 'В обробці', 'Продаж', 'Відправлено', 'Доставляється', 'Очікує на відділенні', 'ПОВЕРНУТО', '-', 'Оформлено']
const ORDER_TRANSACTION_SALE_STATUS = 'Продаж'
const ORDER_TRANSACTION_CLEARANCE_STATUS = 'Розпродаж'
const bazarioDeliveryOptions = ['Нова Пошта', 'Rozetka']
const ORDER_TRANSACTION_ROZETKA_DELIVERY_COMMISSION = 30
const ARTICLE_PREFIX = 'Код: '

const ACCOUNT_STATUS_ROW_CLASSES = {
  'Оформлений': 'account-status-ordered',
  'В дорозі': 'account-status-transit',
  'На відділенні': 'account-status-branch',
  'Доставлений': 'account-status-delivered',
  'Відмова': 'account-status-refusal',
}

const ACCOUNTS_PAYMENT_SUMMARY_PROFILES = [
  { firstName: 'Владислав', lastName: 'Чабанюк' },
  { firstName: 'Максим', lastName: 'Овчаренко' },
]

function accountStatusRowClass(status) {
  return ACCOUNT_STATUS_ROW_CLASSES[status] || ''
}

function applyAccountStatusRowClass(row, status) {
  if (!row) return
  Object.values(ACCOUNT_STATUS_ROW_CLASSES).forEach((cls) => row.classList.remove(cls))
  const cls = accountStatusRowClass(status)
  if (cls) row.classList.add(cls)
}

/** Статус і оплата — фіксовані списки; оплата ID — з розділу «Профіль». */
const accountFieldOptions = {
  status: accountDeliveryStatuses,
  payment: accountPaymentTypes,
}

const db = window.BazarioDB

const statusLabels = { todo: 'До виконання', in_progress: 'В роботі', done: 'Готово' }

let activeNav = 'home'
let searchQuery = ''
let toastTimer
let editingProfileId = null
let editingWarehouseId = null
let warehouseDetailId = null
let warehouseModalOpen = false
let warehouseModalDraft = null
let accountsDeleteMode = false
let expandedPhoneKey = null
let expandedAccountId = null
let accountsStatusFilter = ''
let accountsPaymentFilter = ''
let accountsPaymentProfileFilter = ''
let tasksDeleteMode = false
let expandedTaskId = null
let productsDeleteMode = false
let expandedProductId = null
/** @type {null|'asc'|'desc'} */
let productsQtySort = null
/** @type {null|'asc'|'desc'} */
let productsZakupkaPaymentDateSort = 'desc'
/** @type {null|'asc'|'desc'} */
let productsZakupkaShippingDateSort = 'desc'
/** @type {null|'asc'|'desc'} */
let productsZakupkaArrivalDateSort = 'desc'
let productsZakupkaLogisticsTypeFilter = ''
/** @type {null|'asc'|'desc'} */
let productsUkraineStockSort = null
/** @type {null|'asc'|'desc'} */
let productsUkraineCostSort = null
/** @type {null|'asc'|'desc'} */
let productsUkraineMarginPromSort = null
/** @type {null|'asc'|'desc'} */
let productsUkraineMarginRozetkaSort = null
let productsUkraineWarehouseFilter = ''

const PRODUCT_CATALOG_STORAGE_KEY = 'bazario_product_catalog_v1'
const PRODUCT_CATALOG_MODES = {
  zakupka: { id: 'zakupka', title: 'Товар Закупка/Залишки', sub: 'Закупки та залишки на складі' },
  ukraine: { id: 'ukraine', title: 'Товар Україна', sub: 'Ціни, маржа та продажі' },
}
const ZAKUPKA_LOGISTICS_TYPES = ['Авіа', 'Ж/Д', 'Море']
const ZAKUPKA_COLLAPSED_COMPARE_FIELDS = ['purchasePrice', 'logistics', 'logisticsValue', 'ukraineLogistics', 'placement']
const ZAKUPKA_TABLE_COL_COUNT = 14
const UKRAINE_TABLE_COL_COUNT = 12
const UKRAINE_STOCK_DAYS_LOOKBACK = 30
const UKRAINE_STOCK_DAYS_GREEN = 30
const UKRAINE_STOCK_DAYS_ORANGE = 15
const UKRAINE_STOCK_DAYS_RED = 4
const UKRAINE_COMMISSION_PROM_MODE_KEY = 'bazario_ukraine_commission_prom_mode_v1'
const UKRAINE_COMMISSION_ROZETKA_MODE_KEY = 'bazario_ukraine_commission_rozetka_mode_v1'
const ORDER_TX_CATALOG_PRICE_KEY = 'bazario_order_tx_catalog_price_v2'
const ORDER_TX_STATUS_HISTORY_KEY = 'bazario_order_tx_status_history_v1'
const BAZARIO_ORDER_TABLE_COL_COUNT = 10
const ZAKUPKA_TOTAL_MODE_KEY = 'bazario_zakupka_total_mode_v1'
const ZAKUPKA_PURCHASE_MODE_KEY = 'bazario_zakupka_purchase_mode_v1'
const ZAKUPKA_PLACEMENT_MODE_KEY = 'bazario_zakupka_placement_mode_v1'
const ZAKUPKA_LOGISTICS_VALUE_MODE_KEY = 'bazario_zakupka_logistics_value_mode_v1'
/** @type {'all'|'unit'} */
let zakupkaPurchaseDisplayMode = 'all'
/** @type {'all'|'unit'} */
let zakupkaTotalDisplayMode = 'all'
/** @type {'all'|'unit'} */
let zakupkaPlacementDisplayMode = 'unit'
/** @type {'all'|'unit'} */
let zakupkaLogisticsValueDisplayMode = 'unit'
/** @type {'percent'|'amount'} */
let ukraineCommissionPromDisplayMode = 'percent'
/** @type {'percent'|'amount'} */
let ukraineCommissionRozetkaDisplayMode = 'percent'
let productCatalogMode = 'zakupka'
let productCatalogPickerOpen = false
/** @type {'zakupka'|'stock'} */
let productAddModalMode = 'zakupka'
let notificationsOpen = false
/** @type {null|'income'|'expense'|'overall'} */
let financeDetailPage = null
const FINANCE_ACCOUNTS_ENABLED_KEY = 'dashboardFinanceAccountsEnabled'
const FINANCE_EXPENSE_CATEGORIES = [
  'Утримання ФОП',
  'Баланс Rozetka',
  'Баланс Prom',
  'Заробітна плата (наймані)',
  'Реклама',
]
const FINANCE_EXPENSE_TYPE_COLORS = {
  'Утримання ФОП': '#8da3cf',
  'Баланс Rozetka': '#e8c96a',
  'Баланс Prom': '#9bc49b',
  'Заробітна плата (наймані)': '#d88484',
  'Реклама': '#f4a261',
  'Аккаунти': '#b39ddb',
  'Закупки': '#80cbc4',
  'Залишки': '#ffab91',
  'Інше': '#bdbdbd',
}
let financeAccountsExpensesEnabled = true
let financeExpenseModalOpen = false
let financeIncomeModalOpen = false
/** @type {null|string} */
let accountingSubPage = null
let orderShopAccountingYear = null
/** @type {null|string} YYYY-MM */
let orderShopAccountingMonthKey = null
let orderShopPeriodPickerOpen = false
let orderShopYearPickerOpen = false
const productPagePeriod = { year: null, monthKey: null, pickerOpen: false, yearPickerOpen: false }
const accountingPagePeriod = { year: null, monthKey: null, pickerOpen: false, yearPickerOpen: false }
const accountsPagePeriod = { year: null, monthKey: null, pickerOpen: false, yearPickerOpen: false }
const advertisingPagePeriod = { year: null, monthKey: null, pickerOpen: false, yearPickerOpen: false }
const financePagePeriod = { year: null, monthKey: null, pickerOpen: false, yearPickerOpen: false }
const orderShopPagePeriod = {
  get year() { return orderShopAccountingYear },
  set year(value) { orderShopAccountingYear = value },
  get monthKey() { return orderShopAccountingMonthKey },
  set monthKey(value) { orderShopAccountingMonthKey = value },
  get pickerOpen() { return orderShopPeriodPickerOpen },
  set pickerOpen(value) { orderShopPeriodPickerOpen = value },
  get yearPickerOpen() { return orderShopYearPickerOpen },
  set yearPickerOpen(value) { orderShopYearPickerOpen = value },
}
/** @type {null|string} */
let expandedOrderTxCommentId = null
let orderShopDeleteMode = false
/** @type {null|string} YYYY-MM — обраний місяць для детальної сторінки */
let activeFinanceMonthKey = null
let activeMonthlyYear = new Date().getFullYear()
let monthlyYearPickerOpen = false

const MONTHLY_STATE_KEY = 'bazario_monthly_view_v1'
const MONTHLY_INCOME_STORAGE_KEY = 'bazario_monthly_income_v1'
const INCOME_SHOP_OPTIONS = ['Bazario', 'MІКС МАРКЕТ']
const ACCOUNTING_ORDER_SHOPS = {
  bazario: {
    id: 'bazario',
    title: 'Bazario',
    sub: 'Транзакції по замовленнях магазину',
    shop: 'Bazario',
    ukrainePriceField: 'priceRozetka',
    cardModifier: 'accounting-link-card--bazario',
    summaryModifier: 'accounting-summary-card--bazario',
    pageClass: 'bazario-accounting-page',
  },
  'mix-market': {
    id: 'mix-market',
    title: 'MІКС МАРКЕТ',
    sub: 'Транзакції по замовленнях магазину',
    shop: 'MІКС МАРКЕТ',
    ukrainePriceField: 'priceProm',
    cardModifier: 'accounting-link-card--mix-market',
    summaryModifier: 'accounting-summary-card--mix-market',
    pageClass: 'mix-market-accounting-page',
  },
}
const ACCOUNTING_ADVERTISING_SECTION = {
  id: 'advertising',
  title: 'Реклама',
  sub: 'Витрати на рекламу та просування',
  cardModifier: 'accounting-link-card--advertising',
  summaryModifier: 'accounting-summary-card--advertising',
  pageClass: 'advertising-accounting-page',
}
const APP_NAV_STATE_KEY = 'bazario_app_nav_state_v1'
const VALID_NAV_IDS = new Set(NAV.map((item) => item.id))
const VALID_ACCOUNTING_SUB_PAGES = new Set(Object.keys(ACCOUNTING_ORDER_SHOPS))
const VALID_FINANCE_DETAIL_PAGES = new Set(['income', 'expense', 'overall'])
const SHOP_MARKETPLACE_OPTIONS = ['Rozetka', 'Prom']
let monthlyIncomePageKey = null
let monthlyExpensePageKey = null
/** @type {null|{ monthKey: string, dayKey: string, tab: 'income'|'expense' }} */
let monthlyDayPage = null

const FINANCE_MONTH_LABELS = ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень']

const TASK_MAX_ATTACHMENTS = 10
const TASK_MAX_FILE_BYTES = 2 * 1024 * 1024

function savedToastMessage() {
  return window.BazarioSync?.isReady?.() ? 'Збережено онлайн' : 'Збережено локально'
}

function showToast(message) {
  const el = document.getElementById('toast')
  el.textContent = message
  el.hidden = false
  el.classList.add('visible')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    el.hidden = true
    el.classList.remove('visible')
  }, 2800)
}

function syncHeader() {
  const p = db.getProfile()
  document.getElementById('brandName').textContent = 'MY CRM'
  document.getElementById('brandUser').textContent = db.getFullName()
  syncNotificationsUI()
}

function getTaskNotificationBuckets() {
  const tasks = db.list('tasks').filter(isTaskAssignedToCurrentUser)
  const newTasks = tasks.filter((t) => t.status === 'todo')
  const activeTasks = tasks.filter((t) => t.status === 'in_progress')
  return { newTasks, activeTasks }
}

function listAccountingOrderTransactions() {
  const shops = new Set(Object.values(ACCOUNTING_ORDER_SHOPS).map((cfg) => cfg.shop))
  return db.list('orderTransactions').filter((tx) => shops.has(orderTransactionShopValue(tx)))
}

function getOrderNotifications() {
  return listAccountingOrderTransactions()
    .filter(orderTransactionShowInNotifications)
    .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
}

function getAccountingSubPageForShop(shop) {
  const entry = Object.entries(ACCOUNTING_ORDER_SHOPS).find(([, cfg]) => cfg.shop === shop)
  return entry?.[0] || 'bazario'
}

function orderNotificationTitle(tx) {
  const client = String(tx?.firstName || '').trim()
  const product = String(tx?.productName || '').trim()
  if (client && product) return `${client} · ${product}`
  return client || product || '—'
}

function getNotificationsBadgeCount() {
  const { newTasks, activeTasks } = getTaskNotificationBuckets()
  return getOrderNotifications().length + newTasks.length + activeTasks.length
}

function taskNotificationItem(task, { isNew = false } = {}) {
  return `
    <li>
      <button type="button" class="notifications-item${isNew ? ' is-new' : ''}" data-task-notify="${task.id}">
        <span class="notifications-item-title">${escapeHtml(task.title || '—')}</span>
        <span class="notifications-item-meta">${escapeHtml(getTaskAssigneeDisplay(task))} · ${escapeHtml(statusLabels[task.status] || '—')}</span>
        <span class="notifications-item-time">${escapeHtml(formatTaskDateTime(task.createdAt))}</span>
      </button>
    </li>`
}

function orderNotificationItem(tx) {
  const status = orderTransactionStatusValue(tx)
  const isNew = status === 'Нове Замовлення'
  return `
    <li>
      <button type="button" class="notifications-item notifications-item--order${isNew ? ' is-new' : ''}" data-order-notify="${tx.id}">
        <span class="notifications-item-title">${escapeHtml(orderNotificationTitle(tx))}</span>
        <span class="notifications-item-meta notifications-item-meta--order">
          ${renderOrderTransactionStatusBadge(status, { extraClass: 'notifications-order-status' })}
          <span class="notifications-item-meta-text">${escapeHtml(orderTransactionShopValue(tx))} · ${escapeHtml(fmtMoney(orderTransactionAmountValue(tx)))}</span>
        </span>
        <span class="notifications-item-time">${escapeHtml(formatOrderTransactionDateLabel(tx))}</span>
      </button>
    </li>`
}

function renderNotificationsPanelContent() {
  const { newTasks, activeTasks } = getTaskNotificationBuckets()
  const orders = getOrderNotifications()

  const section = (title, bodyHtml) => `
    <section class="notifications-section">
      <h3 class="notifications-section-title">${title}</h3>
      ${bodyHtml}
    </section>`

  const listSection = (title, items, emptyText, renderItem) => {
    const body = items.length
      ? `<ul class="notifications-list">${items.map(renderItem).join('')}</ul>`
      : `<p class="notifications-empty muted">${emptyText}</p>`
    return section(title, body)
  }

  return [
    listSection('Замовлення', orders, 'Немає замовлень (окрім «Продаж» та «Розпродаж»)', orderNotificationItem),
    listSection('Нові', newTasks, 'У вас немає задач «До виконання»', (t) => taskNotificationItem(t, { isNew: true })),
    listSection('Активні', activeTasks, 'У вас немає задач «В роботі»', (t) => taskNotificationItem(t, { isNew: false })),
  ].join('')
}

function syncNotificationsUI() {
  const badge = document.getElementById('notificationsBadge')
  const panel = document.getElementById('notificationsPanel')
  const content = document.getElementById('notificationsContent')
  const btn = document.getElementById('notificationsBtn')
  if (!badge || !panel) return

  const count = getNotificationsBadgeCount()
  badge.hidden = count <= 0
  badge.textContent = count > 99 ? '99+' : String(count)

  panel.classList.toggle('is-hidden', !notificationsOpen)
  if (btn) btn.setAttribute('aria-expanded', notificationsOpen ? 'true' : 'false')
  if (notificationsOpen && content) content.innerHTML = renderNotificationsPanelContent()
}

function openNotificationsPanel() {
  notificationsOpen = true
  const content = document.getElementById('notificationsContent')
  if (content) content.innerHTML = renderNotificationsPanelContent()
  syncNotificationsUI()
}

function closeNotificationsPanel() {
  notificationsOpen = false
  syncNotificationsUI()
}

function toggleNotificationsPanel() {
  if (notificationsOpen) closeNotificationsPanel()
  else openNotificationsPanel()
}

function goToTaskFromNotification(taskId) {
  closeNotificationsPanel()
  activeNav = 'tasks'
  expandedTaskId = taskId
  searchQuery = ''
  const searchInput = document.getElementById('searchInput')
  if (searchInput) {
    searchInput.value = ''
    searchInput.placeholder = SEARCH_PLACEHOLDERS.tasks
  }
  renderNav({ animate: true })
  render()
}

function goToOrderFromNotification(txId) {
  const tx = db.get('orderTransactions', txId)
  if (!tx) return
  closeNotificationsPanel()
  activeNav = 'accounting'
  accountingSubPage = getAccountingSubPageForShop(orderTransactionShopValue(tx))
  financeDetailPage = null
  activeFinanceMonthKey = null
  const monthKey = orderTransactionMonthKey(tx) || getCurrentMonthKey()
  orderShopAccountingYear = Number(monthKey.split('-')[0]) || new Date().getFullYear()
  orderShopAccountingMonthKey = monthKey
  orderShopPeriodPickerOpen = false
  orderShopYearPickerOpen = false
  expandedOrderTxCommentId = tx.id
  orderShopDeleteMode = false
  searchQuery = ''
  const searchInput = document.getElementById('searchInput')
  if (searchInput) {
    searchInput.value = ''
    searchInput.placeholder = 'Пошук транзакцій...'
  }
  renderNav({ animate: true })
  render()
  requestAnimationFrame(() => {
    document.querySelector(`.bazario-order-row[data-order-tx-id="${tx.id}"]`)
      ?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  })
}

function initNotifications() {
  const wrap = document.querySelector('.notifications-wrap')
  if (!wrap || wrap.dataset.bound === '1') return
  wrap.dataset.bound = '1'

  wrap.addEventListener('click', (e) => {
    if (e.target.closest('#notificationsBtn')) {
      e.stopPropagation()
      toggleNotificationsPanel()
      return
    }
    const orderItem = e.target.closest('[data-order-notify]')
    if (orderItem) {
      e.preventDefault()
      goToOrderFromNotification(orderItem.dataset.orderNotify)
      return
    }
    const item = e.target.closest('[data-task-notify]')
    if (item) {
      e.preventDefault()
      goToTaskFromNotification(item.dataset.taskNotify)
    }
  })

  document.addEventListener('click', (e) => {
    if (!notificationsOpen) return
    if (e.target.closest('.notifications-wrap')) return
    closeNotificationsPanel()
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && notificationsOpen) closeNotificationsPanel()
  })
}

function initHomeTaskLinks() {
  const content = document.getElementById('content')
  if (!content || content.dataset.homeTasksBound === '1') return
  content.dataset.homeTasksBound = '1'

  content.addEventListener('click', (e) => {
    const homeTask = e.target.closest('[data-home-task]')
    if (homeTask) {
      e.preventDefault()
      goToTaskFromNotification(homeTask.dataset.homeTask)
      return
    }
    if (e.target.closest('[data-go-tasks]')) {
      e.preventDefault()
      activeNav = 'tasks'
      expandedTaskId = null
      searchQuery = ''
      const searchInput = document.getElementById('searchInput')
      if (searchInput) {
        searchInput.value = ''
        searchInput.placeholder = SEARCH_PLACEHOLDERS.tasks
      }
      renderNav({ animate: true })
      render()
    }
  })
}

function profileInitials() {
  const p = db.getProfile()
  return `${(p.firstName || '')[0] || ''}${(p.lastName || '')[0] || ''}`.toUpperCase() || 'Б'
}

function formatDate(iso) {
  if (!iso) return '—'
  try {
    return new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
  } catch {
    return iso
  }
}

function accountOrderDate(account) {
  return account?.createdAt || account?.updatedAt || null
}

function formatAccountDate(accountOrIso) {
  const iso = typeof accountOrIso === 'object' && accountOrIso !== null
    ? accountOrderDate(accountOrIso)
    : accountOrIso
  if (!iso) return '—'
  try {
    return new Intl.DateTimeFormat('uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(iso))
  } catch {
    return '—'
  }
}

function formatTaskDateTime(iso) {
  if (!iso) return '—'
  try {
    return new Intl.DateTimeFormat('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso))
  } catch {
    return '—'
  }
}

function fmt(n) {
  return new Intl.NumberFormat('uk-UA').format(n)
}

const AMOUNT_MAX_DECIMALS = 4

function fmtMoney(n) {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: AMOUNT_MAX_DECIMALS,
  }).format(n)
}

function parseAmountInput(raw) {
  const v = String(raw ?? '').trim().replace(/\s/g, '')
  if (!v) return null
  const normalized = v.replace(',', '.')
  const n = Number(normalized)
  return Number.isFinite(n) && n >= 0 ? n : null
}

function amountMinDecimalsFromRaw(raw) {
  const text = String(raw ?? '').trim().replace(/\s/g, '')
  if (!/[,.]/.test(text)) return 0
  const match = text.match(/[,.](\d*)/)
  if (!match) return 2
  if (!match[1].length) return 2
  return Math.min(match[1].length, AMOUNT_MAX_DECIMALS)
}

function amountInputDisplay(stored, { minDecimals = 0 } = {}) {
  if (stored == null || stored === '') return ''
  const n = Number(stored)
  if (!Number.isFinite(n)) return ''
  const cappedMin = Math.min(Math.max(minDecimals, 0), AMOUNT_MAX_DECIMALS)
  let frac = n.toFixed(AMOUNT_MAX_DECIMALS).split('.')[1] || ''
  if (cappedMin > 0) {
    while (frac.length > cappedMin && frac.endsWith('0')) frac = frac.slice(0, -1)
    if (frac.length < cappedMin) frac = frac.padEnd(cappedMin, '0')
  } else {
    frac = frac.replace(/0+$/, '')
  }
  const intPart = Math.trunc(n).toString()
  if (!frac) return intPart
  return `${intPart},${frac}`
}

function amountInputFieldDisplay(stored, options = {}) {
  return amountInputDisplay(stored, { minDecimals: AMOUNT_MAX_DECIMALS, ...options })
}

function accountAmountDisplay(account) {
  if (account?.amountDisplay) return account.amountDisplay
  return amountInputFieldDisplay(account?.amount)
}

function accountAmountPayload(raw) {
  const text = String(raw ?? '').trim()
  const parsed = parseAmountInput(text)
  if (parsed == null) return { amount: null, amountDisplay: null }
  const amountDisplay = amountInputDisplay(parsed, { minDecimals: amountMinDecimalsFromRaw(text) })
  return { amount: parsed, amountDisplay }
}

function enforceAmountInput(input) {
  let v = input.value.replace(/[^\d,.]/g, '')
  const comma = v.indexOf(',')
  const dot = v.indexOf('.')
  const sepIdx = comma >= 0 ? comma : dot
  if (sepIdx >= 0) {
    const sep = v[sepIdx]
    const intPart = v.slice(0, sepIdx).replace(/[,.]/g, '')
    const dec = v.slice(sepIdx + 1).replace(/[,.]/g, '').slice(0, AMOUNT_MAX_DECIMALS)
    input.value = v.endsWith(sep) && !dec ? `${intPart}${sep}` : (dec ? `${intPart}${sep}${dec}` : intPart)
  } else {
    input.value = v.replace(/[,.]/g, '')
  }
}

function syncAmountInputFilledState(input) {
  if (!input?.classList?.contains('account-amount-input')) return
  const filled = String(input.value || '').trim() !== ''
  input.classList.toggle('account-amount-input--filled', filled)
}

function syncAllAccountAmountInputsFilledState() {
  document.querySelectorAll('.account-amount-input').forEach(syncAmountInputFilledState)
}

function finalizeAmountInput(input) {
  const raw = input.value.trim()
  const parsed = parseAmountInput(raw)
  if (parsed == null) {
    input.value = ''
    syncAmountInputFilledState(input)
    return
  }
  input.value = amountInputDisplay(parsed, { minDecimals: amountMinDecimalsFromRaw(raw) })
  syncAmountInputFilledState(input)
}

function setAmountInputValueIfIdle(input, account) {
  if (!input) return
  const next = typeof account === 'object' && account !== null
    ? accountAmountDisplay(account)
    : amountInputFieldDisplay(account)
  if (document.activeElement === input) return
  input.value = next
  syncAmountInputFilledState(input)
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function card(title, body, extra = '') {
  return `<section class="card" data-searchable>${extra}<div class="card-head"><h2>${title}</h2><button type="button" class="card-more" aria-label="Ще">⋮</button></div>${body}</section>`
}

function pageHeader(title, subtitle) {
  return `<div class="page-header"><h1 class="page-title">${title}</h1>${subtitle ? `<p class="page-sub">${subtitle}</p>` : ''}</div>`
}

function getCurrentUserProfileRecord() {
  const p = db.getProfile()
  return db.list('profiles').find((a) => a.email === p.email) || null
}

function normalizeAssigneeUserIdForSave(userId) {
  if (!userId) return null
  const recordId = getCurrentUserProfileRecord()?.id
  const sessionId = db.getProfileId()
  if (userId === sessionId || userId === recordId) return recordId || sessionId
  return userId
}

function taskAssigneeSelectValue(task) {
  const id = task?.assigneeUserId
  if (!id) return ''
  const recordId = getCurrentUserProfileRecord()?.id
  const sessionId = db.getProfileId()
  if (id === sessionId || id === recordId) return recordId || id
  return id
}

function getCurrentUserRole() {
  const record = getCurrentUserProfileRecord()
  return record?.role ?? db.getProfile().role
}

function isAdministratorRole(role) {
  return String(role || '').trim() === ADMIN_ROLE
}

function isAdmin() {
  if (!ADMIN_ACCESS_ENABLED) return true
  const p = db.getProfile()
  const record = getCurrentUserProfileRecord()
  return isAdministratorRole(p.role) || isAdministratorRole(record?.role)
}

function syncCurrentUserRoleFromProfileRecord() {
  if (!ADMIN_ACCESS_ENABLED) return
  const record = getCurrentUserProfileRecord()
  const recordRole = String(record?.role || '').trim()
  if (!recordRole) return
  const p = db.getProfile()
  if (p.role !== recordRole) {
    db.saveProfile({ role: recordRole })
    syncHeader()
  }
}

function canManageProfiles() {
  if (!ADMIN_ACCESS_ENABLED) return true
  return isAdmin()
}

function profilePageHeader() {
  return `
    <div class="page-header page-header-row">
      <div>
        <h1 class="page-title">Профіль</h1>
        <p class="page-sub">Список профілів користувачів</p>
      </div>
      <button type="button" class="btn-primary" id="addProfileBtn">Додати</button>
    </div>`
}

function getProfilesForPage() {
  return db.list('profiles')
}

function profileRoleSelect(field, value) {
  const options = profileRoles
    .map((r) => `<option value="${escapeHtml(r)}"${r === value ? ' selected' : ''}>${escapeHtml(r)}</option>`)
    .join('')
  return `<select class="table-input table-select" data-field="${field}">${options}</select>`
}

function profileTableRows(profiles, { showEdit = false } = {}) {
  const colSpan = showEdit ? 6 : 5
  if (!profiles.length) {
    return `<tr><td colspan="${colSpan}" class="empty-cell">Профілів немає</td></tr>`
  }
  const myEmail = db.getProfile().email
  return profiles
    .map((a) => {
      const search = `${a.lastName} ${a.firstName} ${a.email} ${a.phone} ${a.role || ''}`
      const isMe = a.email === myEmail
      const isEditing = showEdit && editingProfileId === a.id

      if (isEditing) {
        return `
      <tr data-search="${escapeHtml(search)}" class="row-editing ${isMe ? 'row-current' : ''}" data-profile-id="${a.id}">
        <td><input type="text" class="table-input" data-field="lastName" value="${escapeHtml(a.lastName || '')}" required /></td>
        <td><input type="text" class="table-input" data-field="firstName" value="${escapeHtml(a.firstName || '')}" required /></td>
        <td><input type="email" class="table-input" data-field="email" value="${escapeHtml(a.email || '')}" required /></td>
        <td><input type="tel" class="table-input" data-field="phone" value="${escapeHtml(a.phone || '')}" required /></td>
        <td>${profileRoleSelect('role', a.role || profileRoles[0])}</td>
        <td class="td-actions td-actions-pair">
          <button type="button" class="btn-link" data-save-profile="${a.id}">Зберегти</button>
          <button type="button" class="btn-icon btn-delete-inline" data-delete-profile="${a.id}" title="Видалити" aria-label="Видалити">×</button>
        </td>
      </tr>`
      }

      return `
      <tr data-search="${escapeHtml(search)}" class="${isMe ? 'row-current' : ''}" data-profile-id="${a.id}">
        <td>${escapeHtml(a.lastName)}</td>
        <td>${escapeHtml(a.firstName)}</td>
        <td>${escapeHtml(a.email)}</td>
        <td>${escapeHtml(a.phone)}</td>
        <td>${escapeHtml(a.role || '—')}</td>
        ${showEdit ? `<td class="td-actions"><button type="button" class="btn-link" data-edit-profile="${a.id}">Редагувати</button></td>` : ''}
      </tr>`
    })
    .join('')
}

function saveProfileRowFromDom(row) {
  const id = row.dataset.profileId
  if (!id) return

  const getVal = (field) => row.querySelector(`[data-field="${field}"]`)?.value?.trim() ?? ''

  const patch = {
    lastName: getVal('lastName'),
    firstName: getVal('firstName'),
    email: getVal('email'),
    phone: getVal('phone'),
    role: getVal('role'),
  }

  const updated = db.update('profiles', id, patch)
  if (!updated) return

  const search = `${patch.lastName} ${patch.firstName} ${patch.email} ${patch.phone} ${patch.role}`
  row.dataset.search = search

  if (updated.email === db.getProfile().email) {
    db.saveProfile({
      lastName: patch.lastName,
      firstName: patch.firstName,
      email: patch.email,
      phone: patch.phone,
      role: patch.role,
    })
    syncHeader()
  }
}

function renderProfilesTable(profiles, title) {
  const q = searchQuery.toLowerCase()
  const filtered = q
    ? profiles.filter((a) =>
        `${a.lastName} ${a.firstName} ${a.email} ${a.phone} ${a.role || ''}`.toLowerCase().includes(q))
    : profiles
  const admin = canManageProfiles()

  return `
    <section class="card table-card profiles-fullwidth" data-searchable>
      <div class="card-head">
        <h2>${title}</h2>
        <span class="count-badge">${filtered.length}</span>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Прізвище</th><th>Ім'я</th><th>Email</th><th>Телефон</th><th>Роль</th>
              ${admin ? '<th></th>' : ''}
            </tr>
          </thead>
          <tbody id="profilesTableBody">${profileTableRows(filtered, { showEdit: admin })}</tbody>
        </table>
      </div>
    </section>`
}

function renderAddProfileModal() {
  const roleOptions = profileRoles.map((r) => `<option value="${r}">${r}</option>`).join('')
  return `
    <div class="modal-overlay is-hidden" id="profileModal" aria-hidden="true">
      <div class="modal card" role="dialog" aria-labelledby="profileModalTitle">
        <div class="card-head modal-head">
          <h2 id="profileModalTitle">Новий профіль</h2>
          <button type="button" class="btn-icon modal-close" id="profileModalClose" aria-label="Закрити">×</button>
        </div>
        <form id="addProfileForm">
          <div class="form-grid form-grid-single">
            <label class="form-field"><span>Прізвище</span><input name="lastName" required autocomplete="family-name" /></label>
            <label class="form-field"><span>Ім'я</span><input name="firstName" required autocomplete="given-name" /></label>
            <label class="form-field"><span>Email</span><input name="email" type="email" required autocomplete="email" /></label>
            <label class="form-field"><span>Телефон</span><input name="phone" type="tel" required autocomplete="tel" /></label>
            <label class="form-field"><span>Роль</span>
              <select name="role" required>${roleOptions}</select>
            </label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" id="profileModalCancel">Скасувати</button>
            <button type="submit" class="btn-primary">Зберегти</button>
          </div>
        </form>
      </div>
    </div>`
}

function accountsPageHeader(filteredAccounts = []) {
  const monthKey = resolveAccountsPagePeriodMonthKey()
  return `
    <div class="page-header page-header-row accounts-page-header">
      <div class="accounts-page-title">
        <div class="product-page-title-row page-period-row">
          <h1 class="page-period-title order-shop-block-title">Аккаунти</h1>
          ${renderPagePeriodLabelButton(accountsPagePeriod, 'accounts', monthKey)}
        </div>
        <p class="page-sub">Замовлення: ім'я, телефон, артикул, статус доставки, оплата</p>
      </div>
      <div class="accounts-payment-summaries" id="accountsPaymentSummaries">
        ${renderAccountsPaymentSummaryCells(filteredAccounts)}
      </div>
      <button type="button" class="btn-primary" id="addAccountBtn">Додати</button>
    </div>`
}

function findProfileForSummary(firstName, lastName) {
  const byName = db.list('profiles').find((p) => p.firstName === firstName && p.lastName === lastName)
  if (byName) return byName
  const session = db.getProfile()
  if (session.firstName === firstName && session.lastName === lastName) {
    return db.list('profiles').find((p) => p.email === session.email) || null
  }
  return null
}

/** Замовлення для верхніх підсумків: місяць + пошук + статус/тип оплати, без фільтра колонки «Оплата ID». */
function accountsForPaymentSummaries() {
  const accounts = listAccountsForCurrentPeriod()
  const q = searchQuery.toLowerCase()
  return accounts.filter((a) => {
    if (q && !accountSearchText(a).toLowerCase().includes(q)) return false
    if (accountsStatusFilter && a.status !== accountsStatusFilter) return false
    if (accountsPaymentFilter && a.payment !== accountsPaymentFilter) return false
    return true
  })
}

function listAccountsForCurrentPeriod() {
  const monthKey = resolveAccountsPagePeriodMonthKey()
  return db.list('accounts').filter((a) => accountMatchesMonth(a, monthKey))
}

function profilesRepresentSamePerson(a, b) {
  if (!a || !b) return false
  if (a.id === b.id) return true
  const emailA = String(a.email || '').trim().toLowerCase()
  const emailB = String(b.email || '').trim().toLowerCase()
  if (emailA && emailB && emailA === emailB) return true
  return a.firstName === b.firstName && a.lastName === b.lastName
}

function paymentIdTextMatchesProfile(paymentId, profile) {
  const pid = String(paymentId || '').trim()
  if (!pid || !profile) return false
  const byDisplay = profileDisplayName(profile)
  const byFirstLast = `${profile.firstName || ''} ${profile.lastName || ''}`.trim()
  const byLastFirst = `${profile.lastName || ''} ${profile.firstName || ''}`.trim()
  return pid === byDisplay || pid === byFirstLast || pid === byLastFirst
}

function accountMatchesPaymentProfile(account, profile) {
  if (!profile?.id || !account) return false
  if (account.paymentProfileId === profile.id) return true
  if (account.paymentProfileId) {
    const linked = db.get('profiles', account.paymentProfileId)
    if (linked && profilesRepresentSamePerson(linked, profile)) return true
  }
  return paymentIdTextMatchesProfile(account.paymentId, profile)
}

function accountAmountValue(account) {
  const n = Number(account?.amount)
  if (Number.isFinite(n)) return n
  const parsed = parseAmountInput(account?.amountDisplay)
  return parsed != null ? parsed : 0
}

function sumAccountsAmountForProfile(accounts, profile) {
  if (!profile?.id) return 0
  return accounts.reduce((sum, a) => {
    if (!accountMatchesPaymentProfile(a, profile)) return sum
    return sum + accountAmountValue(a)
  }, 0)
}

function getPaymentProfileForAccount(account) {
  if (!account) return null
  if (account.paymentProfileId) return db.get('profiles', account.paymentProfileId)
  const pid = String(account.paymentId || '').trim()
  if (!pid) return null
  return db.list('profiles').find((p) => accountMatchesPaymentProfile({ paymentId: pid }, p)) || null
}

function getGroupPaymentProfileForSum(groupAccounts, rep) {
  const fromRep = getPaymentProfileForAccount(rep)
  if (fromRep?.id) return fromRep
  const counts = new Map()
  groupAccounts.forEach((a) => {
    const p = getPaymentProfileForAccount(a)
    if (p?.id) counts.set(p.id, (counts.get(p.id) || 0) + 1)
  })
  let bestId = null
  let bestN = 0
  counts.forEach((n, id) => {
    if (n > bestN) {
      bestN = n
      bestId = id
    }
  })
  return bestId ? db.get('profiles', bestId) : null
}

function sumGroupAmountByPaymentProfile(groupAccounts, referenceAccount) {
  const profile = getGroupPaymentProfileForSum(groupAccounts, referenceAccount)
  if (!profile?.id) return 0
  return sumAccountsAmountForProfile(groupAccounts, profile)
}

function groupedAmountDisplay(total) {
  if (!total) return ''
  return amountInputDisplay(total)
}

function getAccountsByPhoneKey(phoneKey) {
  return db.list('accounts').filter((a) => getPhoneGroupKey(a.phone, a.id) === phoneKey)
}

function escapeSelectorValue(value) {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') return CSS.escape(value)
  return String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function refreshPhoneGroupAmountCell(phoneKey) {
  const groupRow = document.querySelector(`tr.account-phone-group-row[data-phone-key="${escapeSelectorValue(phoneKey)}"]`)
  if (!groupRow?.classList.contains('account-phone-group-row--grouped')) return
  const rep = db.get('accounts', groupRow.dataset.accountId)
  if (!rep) return
  const total = sumGroupAmountByPaymentProfile(getAccountsByPhoneKey(phoneKey), rep)
  const el = groupRow.querySelector('.account-group-amount-value')
  if (el) el.textContent = groupedAmountDisplay(total)
}

function renderAccountsPaymentSummaryCells(accounts) {
  return ACCOUNTS_PAYMENT_SUMMARY_PROFILES.map(({ firstName, lastName }) => {
    const profile = findProfileForSummary(firstName, lastName)
    const label = `${firstName} ${lastName}`
    const total = sumAccountsAmountForProfile(accounts, profile)
    return `
      <div class="accounts-summary-cell" data-profile-first="${escapeHtml(firstName)}" data-profile-last="${escapeHtml(lastName)}">
        <span class="accounts-summary-label">${escapeHtml(label)}</span>
        <span class="accounts-summary-amount">${fmtMoney(total)}</span>
      </div>`
  }).join('')
}

function refreshAccountsPaymentSummaries() {
  if (activeNav !== 'accounts') return
  const container = document.getElementById('accountsPaymentSummaries')
  if (!container) return
  const forSummaries = accountsForPaymentSummaries()
  ACCOUNTS_PAYMENT_SUMMARY_PROFILES.forEach(({ firstName, lastName }) => {
    const profile = findProfileForSummary(firstName, lastName)
    const total = sumAccountsAmountForProfile(forSummaries, profile)
    const cell = container.querySelector(
      `.accounts-summary-cell[data-profile-first="${firstName}"][data-profile-last="${lastName}"]`,
    )
    const amountEl = cell?.querySelector('.accounts-summary-amount')
    if (amountEl) amountEl.textContent = fmtMoney(total)
  })
}

function renderSelectOptions(values, selected = '') {
  return values
    .map((v) => `<option value="${escapeHtml(v)}"${v === selected ? ' selected' : ''}>${escapeHtml(v)}</option>`)
    .join('')
}

function profileDisplayName(p) {
  return `${p.lastName || ''} ${p.firstName || ''}`.trim() || p.email || '—'
}

function accountPaymentIdLabel(account) {
  if (account.paymentProfileId) {
    const p = db.get('profiles', account.paymentProfileId)
    if (p) return profileDisplayName(p)
  }
  return account.paymentId || '—'
}

function getAccountPickOptions(field) {
  if (field === 'status') {
    return accountDeliveryStatuses.map((v) => ({ value: v, label: v }))
  }
  if (field === 'payment') {
    return accountPaymentTypes.map((v) => ({ value: v, label: v }))
  }
  if (field === 'paymentProfileId') {
    return db.list('profiles').map((p) => ({ value: p.id, label: profileDisplayName(p) }))
  }
  return []
}

function getAccountPickDisplay(account, field) {
  if (field === 'paymentProfileId') return accountPaymentIdLabel(account)
  return account[field] || '—'
}

function formatArticleValue(raw) {
  const v = String(raw ?? '').trim()
  if (!v) return ''
  if (/^код:/i.test(v)) {
    const code = v.replace(/^код:\s*/i, '').trim()
    return code ? `${ARTICLE_PREFIX}${code}` : ''
  }
  return `${ARTICLE_PREFIX}${v}`
}

function articleInputDisplay(stored) {
  return formatArticleValue(stored)
}

function articleValueForSave(inputVal) {
  const v = String(inputVal ?? '').trim()
  if (!v || v === ARTICLE_PREFIX.trim()) return ''
  return formatArticleValue(v)
}

function enforceArticleInput(input) {
  if (!input.value.startsWith(ARTICLE_PREFIX)) {
    const code = input.value.replace(/^Код:\s*/i, '')
    input.value = `${ARTICLE_PREFIX}${code}`
  }
}

function guardArticlePrefixKeydown(e, input) {
  const prefixLen = ARTICLE_PREFIX.length
  const start = input.selectionStart ?? 0
  const end = input.selectionEnd ?? 0
  if (e.key === 'Backspace' && start <= prefixLen && end <= prefixLen) {
    e.preventDefault()
  }
  if (e.key === 'Delete' && start < prefixLen) {
    e.preventDefault()
  }
}

function focusArticleInput(input) {
  if (!input.value.trim()) {
    input.value = ARTICLE_PREFIX
    input.setSelectionRange(ARTICLE_PREFIX.length, ARTICLE_PREFIX.length)
  }
}

function accountSearchText(a) {
  return [
    a.firstName,
    a.phone,
    a.article,
    a.status,
    a.payment,
    accountPaymentIdLabel(a),
    formatAccountDate(a),
    a.amount != null && a.amount !== '' ? (a.amountDisplay || String(a.amount)) : '',
    a.notes,
  ]
    .filter(Boolean)
    .join(' ')
}

function accountPayloadFromForm(fd) {
  const paymentProfileId = fd.get('paymentProfileId') || ''
  const amountFields = accountAmountPayload(fd.get('amount'))
  return {
    firstName: String(fd.get('firstName') || '').trim(),
    phone: String(fd.get('phone') || '').trim(),
    article: articleValueForSave(String(fd.get('article') || '').trim()),
    status: fd.get('status'),
    payment: fd.get('payment'),
    paymentProfileId: paymentProfileId || null,
    paymentId: paymentProfileId
      ? profileDisplayName(db.get('profiles', paymentProfileId) || {})
      : '',
    amount: amountFields.amount,
    amountDisplay: amountFields.amountDisplay,
    notes: String(fd.get('notes') || '').trim(),
  }
}

function getAccountsColumnFilter(field) {
  if (field === 'status') return accountsStatusFilter
  if (field === 'payment') return accountsPaymentFilter
  if (field === 'paymentProfileId') return accountsPaymentProfileFilter
  return ''
}

function setAccountsColumnFilter(field, value) {
  if (field === 'status') accountsStatusFilter = value
  else if (field === 'payment') accountsPaymentFilter = value
  else if (field === 'paymentProfileId') accountsPaymentProfileFilter = value
}

function hasActiveAccountsFilters() {
  return !!(accountsStatusFilter || accountsPaymentFilter || accountsPaymentProfileFilter)
}

function resetAccountsFilters() {
  accountsStatusFilter = ''
  accountsPaymentFilter = ''
  accountsPaymentProfileFilter = ''
  expandedPhoneKey = null
  expandedAccountId = null
}

function filterAccountsForTable(accounts) {
  const q = searchQuery.toLowerCase()
  return accounts.filter((a) => {
    if (q && !accountSearchText(a).toLowerCase().includes(q)) return false
    if (accountsStatusFilter && a.status !== accountsStatusFilter) return false
    if (accountsPaymentFilter && a.payment !== accountsPaymentFilter) return false
    if (accountsPaymentProfileFilter && a.paymentProfileId !== accountsPaymentProfileFilter) return false
    return true
  })
}

function accountHeaderFilterTh(field, title) {
  const filterVal = getAccountsColumnFilter(field)
  const options = getAccountPickOptions(field)
  let display = title
  if (filterVal) {
    if (field === 'paymentProfileId') {
      const p = db.get('profiles', filterVal)
      display = p ? profileDisplayName(p) : title
    } else {
      display = filterVal
    }
  }

  const selectOptions = [
    `<option value="">Усі</option>`,
    ...options.map(
      (o) => `<option value="${escapeHtml(o.value)}"${o.value === filterVal ? ' selected' : ''}>${escapeHtml(o.label)}</option>`,
    ),
  ].join('')

  const arrowControl = options.length
    ? `<span class="account-pick-arrow-wrap">
        <select class="account-filter-select" data-field="${field}" aria-label="Фільтр: ${escapeHtml(title)}" tabindex="-1">
          ${selectOptions}
        </select>
        <span class="account-pick-arrow" aria-hidden="true"></span>
      </span>`
    : `<button type="button" class="account-pick-arrow-wrap account-pick-arrow-wrap--empty account-filter-empty" data-field="${field}" aria-label="Немає варіантів">
        <span class="account-pick-arrow" aria-hidden="true"></span>
      </button>`

  const activeClass = filterVal ? ' is-active' : ''
  return `<th class="account-filter-th${activeClass}" data-field="${field}">
    <div class="account-pick-wrap account-filter-wrap">
      <span class="account-pick-value account-filter-label">${escapeHtml(display)}</span>
      ${arrowControl}
    </div>
  </th>`
}

function accountPickCell(accountId, field, account) {
  const display = getAccountPickDisplay(account, field) || '—'
  const options = getAccountPickOptions(field)
  const current = field === 'paymentProfileId' ? account?.paymentProfileId : account?.[field]
  const selected = options.some((o) => o.value === current) ? current : (options[0]?.value ?? '')

  const arrowControl = options.length
    ? `<span class="account-pick-arrow-wrap">
        <select class="account-pick-select" data-account-id="${accountId}" data-field="${field}" aria-label="Вибір" tabindex="-1">
          ${options.map((o) => `<option value="${escapeHtml(o.value)}"${o.value === selected ? ' selected' : ''}>${escapeHtml(o.label)}</option>`).join('')}
        </select>
        <span class="account-pick-arrow" aria-hidden="true"></span>
      </span>`
    : `<button type="button" class="account-pick-arrow-wrap account-pick-arrow-wrap--empty" data-field="${field}" aria-label="Немає варіантів">
        <span class="account-pick-arrow" aria-hidden="true"></span>
      </button>`

  return `<td class="account-pick-cell" data-account-id="${accountId}" data-field="${field}">
    <div class="account-pick-wrap">
      <span class="account-pick-value">${escapeHtml(display)}</span>
      ${arrowControl}
    </div>
  </td>`
}

function renderProfilePaymentOptions(selectedId = '') {
  const profiles = db.list('profiles')
  if (!profiles.length) {
    return '<option value="">— Спочатку додайте профіль —</option>'
  }
  return profiles
    .map((p) => {
      const label = profileDisplayName(p)
      return `<option value="${escapeHtml(p.id)}"${p.id === selectedId ? ' selected' : ''}>${escapeHtml(label)}</option>`
    })
    .join('')
}

function renderAccountFormFields(values = {}, { idPrefix = '', productNameSuggest = false } = {}) {
  const id = (name) => (idPrefix ? `${idPrefix}${name.charAt(0).toUpperCase()}${name.slice(1)}` : '')
  const v = {
    firstName: '',
    phone: '',
    article: '',
    status: accountDeliveryStatuses[0],
    payment: accountPaymentTypes[0],
    paymentProfileId: '',
    amount: '',
    ...values,
  }
  const firstNameField = productNameSuggest
    ? renderOrderProductNameField(v.firstName, id('firstName'))
    : `<label class="form-field"><span>Ім'я</span><input name="firstName" ${id('firstName') ? `id="${id('firstName')}"` : ''} value="${escapeHtml(v.firstName)}" required autocomplete="given-name" /></label>`
  return `
    ${firstNameField}
    <label class="form-field"><span>Телефон</span><input name="phone" type="tel" ${id('phone') ? `id="${id('phone')}"` : ''} value="${escapeHtml(v.phone)}" required autocomplete="tel" /></label>
    <label class="form-field"><span>Артикул</span><input name="article" ${id('article') ? `id="${id('article')}"` : ''} value="${escapeHtml(articleInputDisplay(v.article))}" placeholder="Код:" required autocomplete="off" /></label>
    <label class="form-field"><span>Статус</span>
      <select name="status" ${id('status') ? `id="${id('status')}"` : ''} required>${renderSelectOptions(accountDeliveryStatuses, v.status)}</select>
    </label>
    <label class="form-field"><span>Оплата</span>
      <select name="payment" ${id('payment') ? `id="${id('payment')}"` : ''} required>${renderSelectOptions(accountPaymentTypes, v.payment)}</select>
    </label>
    <label class="form-field"><span>Оплата ID</span>
      <select name="paymentProfileId" ${id('paymentProfileId') ? `id="${id('paymentProfileId')}"` : ''}>${renderProfilePaymentOptions(v.paymentProfileId)}</select>
    </label>
    <label class="form-field form-field-amount"><span>Сума</span><input name="amount" type="text" inputmode="decimal" class="table-input account-amount-input${(v.amountDisplay || (v.amount != null && v.amount !== '')) ? ' account-amount-input--filled' : ''}" autocomplete="off" ${id('amount') ? `id="${id('amount')}"` : ''} value="${v.amountDisplay ? escapeHtml(v.amountDisplay) : (v.amount != null && v.amount !== '' ? escapeHtml(amountInputFieldDisplay(v.amount)) : '')}" placeholder="0,0000" /></label>`
}

function accountAmountCell(accountId, account) {
  const val = accountAmountDisplay(typeof account === 'object' && account !== null ? account : { amount: account })
  const filledClass = val ? ' account-amount-input--filled' : ''
  return `<td class="account-amount-cell">
    <input type="text" inputmode="decimal" class="table-input account-amount-input${filledClass}" data-field="amount" data-account-id="${accountId}" value="${escapeHtml(val)}" placeholder="0,0000" autocomplete="off" />
  </td>`
}

function accountGroupAmountCell(group, rep) {
  const profile = getGroupPaymentProfileForSum(group.accounts, rep)
  const total = profile?.id ? sumAccountsAmountForProfile(group.accounts, profile) : 0
  const val = groupedAmountDisplay(total)
  const title = profile
    ? `Сума замовлень у групі з «Оплата ID»: ${profileDisplayName(profile)}`
    : 'Сума замовлень у групі з обраним «Оплата ID»'
  return `<td class="account-amount-cell account-amount-cell--group-sum">
    <span class="account-group-amount-value" data-phone-key="${escapeHtml(group.key)}" title="${escapeHtml(title)}">${escapeHtml(val)}</span>
  </td>`
}

function accountArticleCell(accountId, article) {
  const val = articleInputDisplay(article)
  return `<td class="account-article-cell">
    <input type="text" class="table-input account-article-input" data-field="article" data-account-id="${accountId}" value="${escapeHtml(val)}" placeholder="Код:" autocomplete="off" />
  </td>`
}

function accountDateCell(account) {
  return `<td class="account-date-cell">${escapeHtml(formatAccountDate(account))}</td>`
}

function accountsTableColSpan() {
  return accountsDeleteMode ? 9 : 8
}

function getPhoneGroupKey(phone, accountId) {
  const digits = String(phone || '').replace(/\D/g, '')
  if (digits.length >= 6) return digits
  return `solo-${accountId}`
}

function getAccountsByPhone(account) {
  const key = getPhoneGroupKey(account.phone, account.id)
  return db.list('accounts').filter((a) => getPhoneGroupKey(a.phone, a.id) === key)
}

function accountOrderCountLabel(count) {
  if (count === 1) return '1 замовлення'
  if (count >= 2 && count <= 4) return `${count} замовлення`
  return `${count} замовлень`
}

function buildPhoneGroups(accounts) {
  const order = []
  const map = new Map()
  accounts.forEach((a) => {
    const key = getPhoneGroupKey(a.phone, a.id)
    if (!map.has(key)) {
      map.set(key, { key, phone: a.phone || '—', accounts: [] })
      order.push(key)
    }
    map.get(key).accounts.push(a)
  })
  return order.map((k) => map.get(k))
}

function phoneGroupSearchText(groupAccounts) {
  return groupAccounts.map((a) => accountSearchText(a)).join(' ')
}

function accountPhoneGroupNameCell(group) {
  const { key, accounts } = group
  const primary = accounts[0]
  const rep = accounts[accounts.length - 1]
  const isExpanded = expandedPhoneKey === key
  const displayName = accounts.length > 1
    ? `${rep.firstName || '—'} · ${accounts.length}`
    : (rep.firstName || '—')
  return `<td class="account-name-cell">
    <button type="button" class="account-name-toggle${isExpanded ? ' is-expanded' : ''}" data-phone-expand="${escapeHtml(key)}" data-account-expand="${primary.id}" aria-expanded="${isExpanded ? 'true' : 'false'}" title="${isExpanded ? 'Згорнути' : 'Історія замовлень'}">
      <span class="account-name-value">${escapeHtml(displayName)}</span>
      <span class="account-name-chevron" aria-hidden="true"></span>
    </button>
  </td>`
}

function renderAccountPhoneDetailRow(group) {
  const { key, phone, accounts } = group
  if (expandedPhoneKey !== key) return ''

  const notesAccount = accounts.find((a) => a.id === expandedAccountId) || accounts[0]
  const selectedId = notesAccount.id
  const historyColSpan = accountsDeleteMode ? 8 : 7

  const historyRows = accounts
    .map((a) => {
      const isSelected = a.id === selectedId
      const orderRow = `
      <tr class="account-history-item${isSelected ? ' is-current' : ''} ${accountStatusRowClass(a.status)}" data-account-id="${a.id}" data-phone-key="${escapeHtml(key)}" aria-selected="${isSelected ? 'true' : 'false'}">
        <td class="account-history-name">${escapeHtml(a.firstName || '—')}</td>
        ${accountArticleCell(a.id, a.article)}
        ${accountDateCell(a)}
        ${accountPickCell(a.id, 'status', a)}
        ${accountPickCell(a.id, 'payment', a)}
        ${accountPickCell(a.id, 'paymentProfileId', a)}
        ${accountAmountCell(a.id, a)}
        ${accountsDeleteMode ? `<td class="account-history-delete"><button type="button" class="btn-icon btn-delete-inline" data-delete-account="${a.id}" title="Видалити" aria-label="Видалити">×</button></td>` : ''}
      </tr>`

      if (!isSelected) return orderRow

      return `${orderRow}
      <tr class="account-history-notes-row" data-account-id="${a.id}" data-phone-key="${escapeHtml(key)}">
        <td colspan="${historyColSpan}">
          <label class="account-notes-field account-history-notes-field">
            <span class="account-detail-label">Примітка — ${escapeHtml(a.firstName || '—')}</span>
            <textarea class="account-notes-input table-input account-history-notes-input" data-account-id="${a.id}" rows="3" placeholder="Додайте примітку до цього замовлення...">${escapeHtml(a.notes || '')}</textarea>
          </label>
        </td>
      </tr>`
    })
    .join('')

  return `
    <tr class="account-detail-row account-phone-detail-row" data-phone-key="${escapeHtml(key)}">
      <td colspan="${accountsTableColSpan()}">
        <div class="account-detail-panel">
          <div class="account-history-header">
            <span class="account-detail-label">Історія замовлень · ${escapeHtml(phone)} · ${accountOrderCountLabel(accounts.length)}</span>
          </div>
          <p class="account-history-hint">Натисніть на рядок, щоб відкрити примітку. Статус, оплату та інші поля можна змінювати прямо в таблиці.</p>
          <div class="account-history-table-wrap">
            <table class="account-history-table">
              <thead>
                <tr>
                  <th>Ім'я</th><th>Артикул</th><th>Дата</th><th>Статус</th><th>Оплата</th><th>Оплата ID</th><th class="account-amount-th">Сума</th>
                  ${accountsDeleteMode ? '<th aria-label="Видалити"></th>' : ''}
                </tr>
              </thead>
              <tbody>${historyRows}</tbody>
            </table>
          </div>
        </div>
      </td>
    </tr>`
}

function syncAccountDisplays(accountId, account) {
  if (!account) return
  const groupRow = document.querySelector(`tr.account-phone-group-row[data-account-id="${accountId}"]`)
  if (groupRow) {
    groupRow.dataset.search = accountSearchText(account)
    const nameEl = groupRow.querySelector('.account-name-value')
    if (nameEl) nameEl.textContent = account.firstName || '—'
    const cells = groupRow.querySelectorAll('td')
    if (cells[1]) cells[1].textContent = account.phone || '—'
    const articleInput = groupRow.querySelector('.account-article-input')
    if (articleInput) {
      articleInput.value = articleInputDisplay(account.article)
    }
    if (groupRow.classList.contains('account-phone-group-row--grouped')) {
      Object.values(ACCOUNT_STATUS_ROW_CLASSES).forEach((cls) => groupRow.classList.remove(cls))
      refreshPhoneGroupAmountCell(groupRow.dataset.phoneKey)
    } else {
      const amountInput = groupRow.querySelector('.account-amount-input')
      setAmountInputValueIfIdle(amountInput, account)
      applyAccountStatusRowClass(groupRow, account.status)
    }
  }
  const historyRow = document.querySelector(`tr.account-history-item[data-account-id="${accountId}"]`)
  if (historyRow) {
    const nameCell = historyRow.querySelector('.account-history-name')
    if (nameCell) nameCell.textContent = account.firstName || '—'
    const articleInput = historyRow.querySelector('.account-article-input')
    if (articleInput) {
      articleInput.value = articleInputDisplay(account.article)
    }
    const amountInput = historyRow.querySelector('.account-amount-input')
    setAmountInputValueIfIdle(amountInput, account)
    applyAccountStatusRowClass(historyRow, account.status)
  }
  document.querySelectorAll(`.account-pick-cell[data-account-id="${accountId}"]`).forEach((el) => {
    const field = el.dataset.field
    const valEl = el.querySelector('.account-pick-value')
    if (valEl && field) valEl.textContent = getAccountPickDisplay(account, field) || '—'
  })
  refreshPhoneGroupAmountCell(getPhoneGroupKey(account.phone, account.id))
  refreshAccountsPaymentSummaries()
  if (activeNav === 'home' || activeNav === 'finance') render()
}

function accountTableRows(accounts) {
  const colSpan = accountsTableColSpan()
  if (!accounts.length) {
    return `<tr><td colspan="${colSpan}" class="empty-cell">Акаунтів поки немає</td></tr>`
  }

  return buildPhoneGroups(accounts)
    .map((group) => {
      const rep = group.accounts[group.accounts.length - 1]
      const search = phoneGroupSearchText(group.accounts)
      const isExpanded = expandedPhoneKey === group.key
      const deleteCell = accountsDeleteMode
        ? `<td class="td-actions account-row-delete"><button type="button" class="btn-icon btn-delete-inline" data-delete-phone-group="${escapeHtml(group.key)}" title="Видалити всі замовлення" aria-label="Видалити всі замовлення">×</button></td>`
        : ''

      const isGrouped = group.accounts.length > 1
      const rowClasses = [
        isExpanded ? 'account-row-expanded' : '',
        'account-phone-group-row',
        isGrouped ? 'account-phone-group-row--grouped' : accountStatusRowClass(rep.status),
      ].filter(Boolean).join(' ')

      return `
      <tr data-search="${escapeHtml(search)}" data-account-id="${rep.id}" data-phone-key="${escapeHtml(group.key)}" class="${rowClasses}">
        ${accountPhoneGroupNameCell(group)}
        <td class="account-phone-cell">${escapeHtml(group.phone)}</td>
        ${accountArticleCell(rep.id, rep.article)}
        ${accountDateCell(rep)}
        ${accountPickCell(rep.id, 'status', rep)}
        ${accountPickCell(rep.id, 'payment', rep)}
        ${accountPickCell(rep.id, 'paymentProfileId', rep)}
        ${isGrouped ? accountGroupAmountCell(group, rep) : accountAmountCell(rep.id, rep)}
        ${deleteCell}
      </tr>
      ${renderAccountPhoneDetailRow(group)}`
    })
    .join('')
}

function renderAccountsTable(accounts) {
  const filtered = filterAccountsForTable(accounts)
  const groupCount = buildPhoneGroups(filtered).length
  const filtersActive = hasActiveAccountsFilters()
  const countBadge = `<button type="button" class="count-badge count-badge-btn${accountsDeleteMode ? ' is-active' : ''}" id="accountsDeleteToggle" data-accounts-delete-toggle aria-pressed="${accountsDeleteMode ? 'true' : 'false'}" title="${accountsDeleteMode ? 'Завершити видалення' : 'Видалити операції'}">${groupCount}</button>`
  return `
    <section class="card table-card profiles-fullwidth accounts-table-card${accountsDeleteMode ? ' accounts-delete-mode' : ''}" data-searchable>
      <div class="card-head">
        <div class="accounts-card-head-title">
          <h2>Список</h2>
          ${filtersActive ? '<button type="button" class="btn-reset-filters" id="accountsResetFilters" title="Скинути фільтри">Скинути фільтри</button>' : ''}
        </div>
        ${countBadge}
      </div>
      <div class="table-wrap table-wrap-wide">
        <table class="data-table accounts-data-table">
          <colgroup>
            <col /><col /><col /><col /><col /><col /><col /><col />${accountsDeleteMode ? '<col class="account-delete-col" />' : ''}
          </colgroup>
          <thead>
            <tr>
              <th>Ім'я</th><th>Телефон</th><th>Артикул</th><th>Дата</th>
              ${accountHeaderFilterTh('status', 'Статус')}
              ${accountHeaderFilterTh('payment', 'Оплата')}
              ${accountHeaderFilterTh('paymentProfileId', 'Оплата ID')}
              <th class="account-amount-th">Сума</th>${accountsDeleteMode ? '<th class="account-delete-col" aria-label="Видалити"></th>' : ''}
            </tr>
          </thead>
          <tbody id="accountsTableBody">${accountTableRows(filtered)}</tbody>
        </table>
      </div>
    </section>`
}

function renderAddAccountModal() {
  return `
    <div class="modal-overlay is-hidden" id="accountModal" aria-hidden="true">
      <div class="modal card" role="dialog" aria-labelledby="accountModalTitle">
        <div class="card-head modal-head">
          <h2 id="accountModalTitle">Новий акаунт</h2>
          <button type="button" class="btn-icon modal-close" id="accountModalClose" aria-label="Закрити">×</button>
        </div>
        <form id="addAccountForm">
          <div class="form-grid form-grid-single">
            ${renderAccountFormFields()}
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" id="accountModalCancel">Скасувати</button>
            <button type="submit" class="btn-primary">Зберегти</button>
          </div>
        </form>
      </div>
    </div>`
}

// ——— Home widgets (з локальних даних) ———
function stockCard(stats) {
  const inventory = computeHomeInventoryValueStats()
  const totalMoney = formatProductMarginMoney(inventory.total)
  const shareMoney = formatProductMarginMoney(inventory.share)

  return card('Вартість залишків', `
    <div class="stock-top">
      <div class="stock-value-stack">
        <div class="stock-value-row">
          <span class="stock-value-label">Загальна</span>
          <p class="stock-value">${escapeHtml(totalMoney)}</p>
        </div>
        <div class="stock-value-row stock-value-row--share">
          <span class="stock-value-label">Моя доля</span>
          <p class="stock-value stock-value--share">${escapeHtml(shareMoney)}</p>
        </div>
        <span class="hint-text">${inventory.productsWithStock} товарів з залишком · усі місяці</span>
      </div>
    </div>`)
}

function gaugeCard(stats) {
  const done = stats.tasksDonePct
  const inProgress = stats.tasksInProgressPct
  const todo = stats.tasksTodoPct
  const d1 = (done / 100) * 180
  const d2 = d1 + (inProgress / 100) * 180
  const wh = db.list('warehouses')[0]
  return card('Задачі та склади', `
    <div class="gauge-wrap">
      <div class="gauge" style="background:conic-gradient(#8da3cf 0deg ${d1}deg,#e8c96a ${d1}deg ${d2}deg,#e0e0e0 ${d2}deg 180deg)">
        <div class="gauge-inner"><span class="gauge-pct">${done}%</span><span class="gauge-label">виконано</span></div>
      </div>
      <ul class="legend">
        <li><span class="dot" style="background:#8da3cf"></span>Готово — ${done}%</li>
        <li><span class="dot" style="background:#e8c96a"></span>В роботі — ${inProgress}%</li>
        <li><span class="dot" style="background:#e0e0e0"></span>Очікує — ${todo}%</li>
      </ul>
    </div>
    <p class="hint-text">Складів: <strong>${stats.warehousesCount}</strong> · Магазинів: <strong>${stats.shopsCount}</strong></p>
    ${wh ? `<p class="hint-text">Останній склад: <strong>${escapeHtml(wh.name)}</strong></p>` : ''}`)
}

function movementsCard(movements) {
  if (!movements.length) {
    return card('Останні рухи', '<p class="empty-hint">Рухів поки немає — з\'являться після додавання товарів і фінансів</p>')
  }
  const rows = movements.map((m) => {
    const cls = m.type === 'in' || m.type === 'sale' || m.type === 'income' ? 'positive' : (m.type === 'out' || m.type === 'expense' ? 'negative' : '')
    return `<li class="move-row" data-search="${escapeHtml(m.title)}">
      <span class="move-icon">${m.icon}</span>
      <div class="move-info"><p class="move-title">${escapeHtml(m.title)}</p><p class="move-date">${formatDate(m.createdAt)}</p></div>
      <span class="move-amount ${cls}">${escapeHtml(m.amount)}</span></li>`
  }).join('')
  return card('Останні рухи', `<ul>${rows}</ul>`)
}

function financeSummaryCard(stats) {
  const inc = stats.incomePercent
  const exp = stats.expensePercent
  const accountsNote = stats.accountsExpenses > 0
    ? `<p class="finance-accounts-note">з них аккаунти: ${fmtMoney(stats.accountsExpenses)}</p>`
    : ''
  return card('Доходи та витрати', `
    <div class="finance-split">
      <div><p class="finance-pct">${inc}%</p><p class="finance-label">Доходи</p><p class="finance-amt">${fmtMoney(stats.income)}</p>
      <div class="track"><div class="fill" style="width:${inc || 0}%;background:#8da3cf"></div></div></div>
      <div><p class="finance-pct">${exp}%</p><p class="finance-label">Витрати</p><p class="finance-amt">${fmtMoney(stats.expenses)}</p>
      ${accountsNote}
      <div class="track"><div class="fill" style="width:${exp || 0}%;background:#e8c96a"></div></div></div>
    </div>`)
}

function incomeCard() {
  const total = getFinancePageDataCached().income
  const share = total / 2
  return card('Дохід', `
    <div class="stock-top">
      <div class="stock-value-stack">
        <div class="stock-value-row">
          <span class="stock-value-label">Загальна</span>
          <p class="stock-value positive">${fmtMoney(total)}</p>
        </div>
        <div class="stock-value-row stock-value-row--share">
          <span class="stock-value-label">Моя доля</span>
          <p class="stock-value stock-value--share positive">${fmtMoney(share)}</p>
        </div>
        <span class="hint-text">за весь час</span>
      </div>
    </div>`)
}

function homeTaskListItems(tasks) {
  if (!tasks.length) return '<li class="empty-hint">Немає</li>'
  return tasks.map((t) => `
    <li class="task-item task-item--link" data-home-task="${t.id}" data-search="${escapeHtml(taskSearchText(t))}" role="button" tabindex="0">
      <div class="task-body">
        <p class="task-title">${escapeHtml(t.title || '—')}</p>
        <p class="task-meta">${escapeHtml(getTaskAssigneeDisplay(t))} · ${escapeHtml(formatTaskDateTime(t.createdAt))}</p>
      </div>
      <span class="status status-${t.status}">${escapeHtml(statusLabels[t.status] || '—')}</span>
    </li>`).join('')
}

function tasksPreviewCard() {
  const all = db.list('tasks').filter(isTaskAssignedToCurrentUser)
  const todoTasks = sortTasksForTable(all.filter((t) => t.status === 'todo'))
  const inProgressTasks = sortTasksForTable(all.filter((t) => t.status === 'in_progress'))
  const hasAny = todoTasks.length || inProgressTasks.length

  const block = (title, tasks) => `
    <div class="home-tasks-group">
      <p class="home-tasks-group-title">${title}</p>
      <ul class="task-list">${homeTaskListItems(tasks)}</ul>
    </div>`

  const body = hasAny
    ? `${block('До виконання', todoTasks)}${block('В роботі', inProgressTasks)}<p class="home-tasks-footer"><button type="button" class="btn-link" data-go-tasks>Усі задачі →</button></p>`
    : '<p class="empty-hint">У вас немає активних задач</p>'

  return card('Задачі', body)
}

function orderTransactionAmountValue(tx) {
  return orderTransactionLineTotal(tx)
}

function findUkraineProductForOrderTransaction(tx) {
  const products = listProductsByCatalog('ukraine')
  const sku = orderTransactionSkuLabel(tx)
  const skuKey = productSkuKey(sku)
  if (skuKey) {
    const match = products.find((product) => (
      productSkuKey(product.sku) === skuKey
      || productSkuKey(productUkraineArticleLabel(product)) === skuKey
      || productSkuKey(productDisplaySku(product)) === skuKey
    ))
    if (match) return match
  }
  const productName = orderTransactionProductName(tx) || String(tx?.firstName || '').trim()
  if (!productName) return null
  return products.find((p) => (
    productDisplayName(p).toLowerCase() === productName.toLowerCase()
  )) || null
}

function orderTransactionStoredUnitPrice(tx) {
  if (tx?.unitPrice != null && tx.unitPrice !== '') {
    const n = Number(tx.unitPrice)
    if (Number.isFinite(n) && n > 0) return n
  }
  const parsed = parseAmountInput(tx?.unitPriceDisplay)
  if (parsed != null && parsed > 0) return parsed
  return null
}

function orderTransactionUnitPrice(tx) {
  return orderTransactionStoredUnitPrice(tx) ?? orderTransactionUnitPriceFromCatalog(tx)
}

function orderTransactionUnitPriceFromCatalog(tx) {
  const shop = orderTransactionShopValue(tx)
  const ukraine = findUkraineProductForOrderTransaction(tx)
  if (!ukraine) return 0
  return ukraineProductOrderPrice(ukraine, shop)
}

function orderTransactionLineTotal(tx) {
  return orderTransactionQtyValue(tx) * orderTransactionUnitPrice(tx)
}

function orderTransactionDeliveryValue(tx) {
  return String(tx?.delivery || tx?.payment || '').trim()
}

function orderTransactionUsesRozetkaDelivery(tx) {
  return orderTransactionDeliveryValue(tx).toLowerCase() === 'rozetka'
}

function orderTransactionRozetkaDeliveryCommission(tx) {
  return orderTransactionUsesRozetkaDelivery(tx) ? ORDER_TRANSACTION_ROZETKA_DELIVERY_COMMISSION : 0
}

function buildOrderTransactionFifoCostLookup() {
  const lookup = new Map()
  listProductsByCatalog('ukraine').forEach((product) => {
    computeUkraineOrderTransactionFifoCosts(product).forEach((cost, txId) => {
      lookup.set(txId, cost)
    })
  })
  return lookup
}

function orderTransactionUnitCostForMargin(tx, fifoCostByTxId = null) {
  const cached = fifoCostByTxId?.get(tx.id)
  if (cached?.unitCost != null && Number.isFinite(cached.unitCost)) {
    return cached.unitCost
  }
  const ukraine = findUkraineProductForOrderTransaction(tx)
  if (!ukraine) return null
  return productUkraineUnitCost(ukraine)
}

function orderTransactionMarginUnit(tx, fifoCostByTxId = null) {
  const unitPrice = orderTransactionUnitPrice(tx)
  if (unitPrice <= 0) return 0
  const ukraine = findUkraineProductForOrderTransaction(tx)
  if (!ukraine) return 0
  const shop = orderTransactionShopValue(tx)
  const priceField = ukraineProductShopPriceField(shop)
  const marginField = priceField === 'priceRozetka' ? 'marginRozetka' : 'marginProm'
  if (productUkraineHasManualMargin(ukraine, marginField)) {
    return productUkraineManualMarginValue(ukraine, marginField)
  }
  const unitCost = orderTransactionUnitCostForMargin(tx, fifoCostByTxId)
  if (unitCost == null || !Number.isFinite(unitCost)) return 0
  const margin = productUkraineMarketplaceMargin(
    unitPrice,
    unitCost,
    orderTransactionCommissionPct(ukraine, tx),
  )
  return margin != null && Number.isFinite(margin) ? margin : 0
}

function orderTransactionMarginTotal(tx, fifoCostByTxId = null) {
  return orderTransactionQtyValue(tx) * orderTransactionMarginUnit(tx, fifoCostByTxId)
}

function orderTransactionFinanceIncomeAmount(tx, fifoCostByTxId = null) {
  const marginTotal = orderTransactionMarginTotal(tx, fifoCostByTxId)
  const rozetkaCommission = orderTransactionRozetkaDeliveryCommission(tx)
  return Math.max(0, marginTotal - rozetkaCommission)
}

function orderTransactionSearchText(tx) {
  return [
    tx.firstName,
    tx.productName,
    tx.phone,
    orderTransactionSkuLabel(tx),
    tx.article,
    tx.status,
    tx.delivery,
    tx.payment,
    tx.ttnComment,
    tx.clientComment,
    tx.notes,
    tx.paymentId,
    formatAccountDate(tx),
    orderTransactionUnitPrice(tx),
    orderTransactionLineTotal(tx),
  ]
    .filter(Boolean)
    .join(' ')
}

function orderTransactionPaymentIdLabel(tx) {
  if (!tx?.paymentProfileId) return tx?.paymentId || ''
  return profileDisplayName(db.get('profiles', tx.paymentProfileId) || {})
}

function orderTransactionArticleSku(article) {
  const v = String(article ?? '').trim()
  if (!v) return ''
  return v.replace(/^код:\s*/i, '').trim()
}

function orderTransactionProductName(tx) {
  return String(tx?.productName || '').trim()
}

function findZakupkaProductByName(name) {
  const key = String(name || '').trim().toLowerCase()
  if (!key) return null
  return listProductsByCatalog('zakupka').find((p) => (
    String(p.name || '').trim().toLowerCase() === key
  )) || null
}

function orderTransactionSkuLabel(tx) {
  const fromArticle = orderTransactionArticleSku(tx.article)
  if (fromArticle) return fromArticle
  const productName = orderTransactionProductName(tx) || String(tx?.firstName || '').trim()
  if (productName) {
    const zakupka = findZakupkaProductByName(productName)
    if (zakupka?.sku) return String(zakupka.sku).trim()
    const ukraine = listProductsForUkraineTable().find((p) => (
      productDisplayName(p).toLowerCase() === productName.toLowerCase()
    ))
    if (ukraine) return productDisplaySku(ukraine)
  }
  return ''
}

function getBazarioOrderPickOptions(field) {
  if (field === 'status') return bazarioOrderStatuses.map((v) => ({ value: v, label: v }))
  if (field === 'delivery') return bazarioDeliveryOptions.map((v) => ({ value: v, label: v }))
  return []
}

function getBazarioOrderPickDisplay(tx, field) {
  if (field === 'delivery') return tx?.delivery || tx?.payment || '—'
  return tx?.[field] || '—'
}

function getLocalDateInputValue(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

function getCurrentMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
}

function orderTransactionDateFromForm(raw) {
  const value = String(raw || '').trim()
  if (!value) return `${getLocalDateInputValue()}T12:00:00.000Z`
  return `${value}T12:00:00.000Z`
}

function formatShortDotDate(iso) {
  if (!iso) return '—'
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return '—'
    const day = String(d.getDate()).padStart(2, '0')
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const year = String(d.getFullYear()).slice(-2)
    return `${day}.${month}.${year}`
  } catch {
    return '—'
  }
}

function orderTransactionDateValue(tx) {
  const raw = tx?.date || tx?.createdAt
  if (!raw) return ''
  try {
    const d = new Date(raw)
    if (Number.isNaN(d.getTime())) return ''
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  } catch {
    return ''
  }
}

function formatOrderTransactionDateLabel(tx) {
  const raw = tx?.date || tx?.createdAt
  return raw ? formatShortDotDate(raw) : '—'
}

function formatOrderTransactionTimeLabel(iso) {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return ''
    return new Intl.DateTimeFormat('uk-UA', { hour: '2-digit', minute: '2-digit' }).format(d)
  } catch {
    return ''
  }
}

function orderTransactionDateCellHtml(tx) {
  const dateLabel = formatOrderTransactionDateLabel(tx)
  const timeLabel = formatOrderTransactionTimeLabel(tx?.createdAt || tx?.date)
  const timeHtml = timeLabel
    ? `<span class="product-tx-date-time">${escapeHtml(timeLabel)}</span>`
    : ''
  return `<span class="product-tx-date-stack"><span class="product-tx-date-day">${escapeHtml(dateLabel)}</span>${timeHtml}</span>`
}

function orderTransactionQtyValue(tx) {
  const qty = Number(tx?.qty)
  return Number.isFinite(qty) && qty > 0 ? qty : 1
}

function orderTransactionStatusValue(tx) {
  const status = String(tx?.status ?? '').trim()
  return status || bazarioOrderStatuses[0]
}

function orderTransactionIsSale(tx) {
  return orderTransactionStatusValue(tx) === ORDER_TRANSACTION_SALE_STATUS
}

/** Показувати в сповіщеннях будь-який статус, окрім «Продаж» та «Розпродаж». */
function orderTransactionShowInNotifications(tx) {
  const status = orderTransactionStatusValue(tx)
  return status !== ORDER_TRANSACTION_SALE_STATUS && status !== ORDER_TRANSACTION_CLEARANCE_STATUS
}

/** Показувати в сповіщеннях будь-який статус, окрім «Продаж». */
function orderTransactionIsBeforeSale(tx) {
  return !orderTransactionIsSale(tx)
}

function sumOrderTransactionsBeforeSale(monthKey = null) {
  return db.list('orderTransactions')
    .filter(orderTransactionIsBeforeSale)
    .filter((tx) => !monthKey || orderTransactionMatchesMonth(tx, monthKey))
    .reduce((sum, tx) => sum + orderTransactionAmountValue(tx), 0)
}

function orderTransactionDayKey(tx) {
  return resolveFinanceDayKey(tx?.date || tx?.createdAt)
}

function buildOrderTransactionsBeforeSaleByDay(monthKey) {
  const map = new Map()
  db.list('orderTransactions')
    .filter(orderTransactionIsBeforeSale)
    .filter((tx) => orderTransactionMatchesMonth(tx, monthKey))
    .forEach((tx) => {
      const dayKey = orderTransactionDayKey(tx)
      if (!dayKey) return
      map.set(dayKey, (map.get(dayKey) || 0) + orderTransactionAmountValue(tx))
    })
  return map
}

function normalizeOrderTransactionStatusHistory(entries) {
  const sorted = [...entries]
    .filter((e) => e?.at && String(e.status ?? '').trim())
    .sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime())
  const out = []
  sorted.forEach((entry) => {
    const last = out[out.length - 1]
    if (last?.status === entry.status) out[out.length - 1] = entry
    else out.push({ status: entry.status, at: entry.at })
  })
  return out
}

function getOrderTransactionStatusHistory(tx) {
  if (Array.isArray(tx?.statusHistory) && tx.statusHistory.length) {
    return normalizeOrderTransactionStatusHistory(tx.statusHistory)
  }
  const status = orderTransactionStatusValue(tx)
  const at = tx?.createdAt || tx?.date || tx?.updatedAt
  if (!at) return status ? [{ status, at: new Date().toISOString() }] : []
  return [{ status, at }]
}

function buildOrderTransactionStatusPatch(tx, newStatus) {
  const ts = new Date().toISOString()
  const base = Array.isArray(tx?.statusHistory) && tx.statusHistory.length
    ? tx.statusHistory
    : getOrderTransactionStatusHistory(tx)
  return {
    status: newStatus,
    statusHistory: appendStatusHistory(base, newStatus, ts),
  }
}

function applyInitialOrderTransactionStatusHistory(payload) {
  const status = orderTransactionStatusValue(payload)
  const ts = payload.createdAt || payload.date || new Date().toISOString()
  payload.statusHistory = [{ status, at: ts }]
  return payload
}

function orderTransactionStatusHistoryBadgeClass(status) {
  const value = String(status ?? '').trim()
  if (value === 'Нове Замовлення') return 'order-tx-status-badge--new'
  if (value === 'В обробці') return 'order-tx-status-badge--processing'
  if (value === 'Доставляється') return 'order-tx-status-badge--delivering'
  return ''
}

function renderOrderTransactionStatusHistoryHtml(tx) {
  const history = getOrderTransactionStatusHistory(tx)
  if (!history.length) {
    return '<p class="order-tx-status-history-empty muted">Історії змін немає</p>'
  }
  return `<ul class="order-tx-status-history-list task-status-history-list">${history.map((entry) => {
    const badgeClass = orderTransactionStatusHistoryBadgeClass(entry.status)
    return `
    <li class="order-tx-status-history-item task-status-history-item">
      <span class="order-tx-status-badge${badgeClass ? ` ${badgeClass}` : ''}">${escapeHtml(entry.status)}</span>
      <span class="order-tx-status-history-time task-status-history-time">${escapeHtml(formatTaskDateTime(entry.at))}</span>
    </li>`
  }).join('')}</ul>`
}

function renderOrderTransactionStatusBadge(status, { extraClass = '' } = {}) {
  const value = orderTransactionStatusValue({ status })
  const badgeClass = orderTransactionStatusHistoryBadgeClass(value)
  const classes = ['order-tx-status-badge', extraClass, badgeClass].filter(Boolean).join(' ')
  return `<span class="${classes}">${escapeHtml(value)}</span>`
}

function orderTransactionMatchesUkraineProduct(tx, product) {
  if (!tx || !product?.id) return false
  const matched = findUkraineProductForOrderTransaction(tx)
  return matched?.id === product.id
}

function orderTransactionsForProduct(product) {
  return db.list('orderTransactions').filter((tx) => orderTransactionMatchesUkraineProduct(tx, product))
}

function orderTransactionsForProductInMonth(product, monthKey = null) {
  const key = monthKey || resolveProductPagePeriodMonthKey()
  return orderTransactionsForProduct(product)
    .filter((tx) => orderTransactionMatchesMonth(tx, key))
}

function orderTransactionsSoldForProduct(product) {
  return orderTransactionsForProduct(product).filter(orderTransactionIsSale)
}

function orderTransactionsSoldForProductInMonth(product, monthKey = null) {
  const key = monthKey || resolveProductPagePeriodMonthKey()
  return orderTransactionsSoldForProduct(product)
    .filter((tx) => orderTransactionMatchesMonth(tx, key))
}

function productUkraineOrderReservedQty(product) {
  return orderTransactionsForProduct(product).reduce(
    (sum, tx) => sum + orderTransactionQtyValue(tx),
    0,
  )
}

function productUkraineOrderSoldQty(product) {
  return orderTransactionsSoldForProduct(product).reduce(
    (sum, tx) => sum + orderTransactionQtyValue(tx),
    0,
  )
}

function productUkraineAccountingQty(product) {
  if (Array.isArray(product.lines) && product.lines.length) {
    return product.lines.reduce((sum, line) => sum + (Number(line.qty) || 0), 0)
  }
  return Number(product.qty) || 0
}

/** Кількість для маржі, «Загальна» та «Закупка» — без вирахування транзакцій (на відміну від productDisplayQty). */
function productUkraineMetricQty(product) {
  return productUkraineAccountingQty(product)
}

function syncUkraineProductsAfterOrderTransaction(...txs) {
  const productIds = new Set()
  txs.forEach((tx) => {
    if (tx == null) return
    const normalized = typeof tx === 'string' ? { article: tx } : tx
    const product = findUkraineProductForOrderTransaction(normalized)
    if (product?.id) productIds.add(product.id)
  })
  if (activeNav === 'product' && isProductUkraineCatalog()) {
    render()
  } else {
    productIds.forEach((productId) => {
      const fresh = db.get('products', productId)
      if (fresh) syncProductCollapsedRow(productId, fresh)
    })
  }
  syncWarehouseCapacityDisplays()
}

function getAccountingOrderShopConfig(subPage = accountingSubPage) {
  return ACCOUNTING_ORDER_SHOPS[subPage] || null
}

function isOrderShopAccountingPage() {
  return Boolean(getAccountingOrderShopConfig())
}

function listAllAdvertisingExpenses() {
  return db.list('finance').filter((item) => (
    item.type === 'expense'
    && String(item.title || '').trim() === ACCOUNTING_ADVERTISING_SECTION.title
  ))
}

function listAdvertisingExpensesForMonth(monthKey) {
  return db.list('finance').filter((item) => (
    item.type === 'expense'
    && String(item.title || '').trim() === ACCOUNTING_ADVERTISING_SECTION.title
    && financeMonthKey(item.date) === monthKey
  ))
}

function advertisingExpensesMetaLabel(count) {
  if (count === 1) return '1 запис'
  if (count < 5) return `${count} записи`
  return `${count} записів`
}

function mapAdvertisingExpenseToFinanceTx(item) {
  return {
    id: item.id,
    source: 'finance',
    financeId: item.id,
    title: item.comment?.trim() || ACCOUNTING_ADVERTISING_SECTION.title,
    comment: item.comment || '',
    amount: Number(item.amount) || 0,
    date: item.date || '—',
    sortAt: item.date || item.createdAt || '',
  }
}

function groupAdvertisingByMonth(items = listAllAdvertisingExpenses()) {
  const map = new Map()
  items.forEach((item) => {
    const key = financeMonthKey(item.date) || '—'
    const prev = map.get(key) || { key, total: 0, count: 0 }
    prev.total += Number(item.amount) || 0
    prev.count += 1
    map.set(key, prev)
  })
  return [...map.values()].sort((a, b) => a.key.localeCompare(b.key))
}

function buildAdvertisingDailyChartData(items, monthKey) {
  const [yearPart, monthPart] = monthKey.split('-').map(Number)
  const daysInMonth = new Date(yearPart, monthPart, 0).getDate()
  const byDay = {}
  items.forEach((item) => {
    if (financeMonthKey(item.date) !== monthKey) return
    const day = Number(String(item.date).slice(8, 10))
    if (!Number.isFinite(day)) return
    byDay[day] = (byDay[day] || 0) + (Number(item.amount) || 0)
  })
  return Array.from({ length: daysInMonth }, (_, index) => ({
    day: index + 1,
    amount: byDay[index + 1] || 0,
  }))
}

function renderAdvertisingDailyChart(items, monthKey) {
  const chartData = buildAdvertisingDailyChartData(items, monthKey)
  const max = Math.max(...chartData.map((d) => d.amount), 1)
  if (!chartData.some((d) => d.amount > 0)) {
    return '<p class="finance-detail-empty">Немає витрат за обраний місяць</p>'
  }
  return `
    <div class="finance-bar-chart advertising-daily-chart">
      ${chartData.map((d) => `
        <div class="finance-bar-col" title="${d.day} — ${fmtMoney(d.amount)}">
          <div class="finance-bar-group">
            <div class="finance-bar-track" title="${fmtMoney(d.amount)}">
              <div class="finance-bar-fill finance-bar-fill--expense advertising-bar-fill" style="height:${Math.max(4, Math.round((d.amount / max) * 100))}%"></div>
            </div>
          </div>
          <span class="finance-bar-label">${d.day}</span>
        </div>`).join('')}
    </div>`
}

function getAdvertisingMonthAnalysis(monthKey) {
  const items = listAdvertisingExpensesForMonth(monthKey)
  const total = items.reduce((s, item) => s + (Number(item.amount) || 0), 0)
  const count = items.length
  return {
    items,
    total,
    count,
    average: count ? total / count : 0,
  }
}

function orderTransactionShopValue(tx) {
  return tx?.shop || 'Bazario'
}

function listOrderTransactionsByShop(shop) {
  return db.list('orderTransactions').filter((tx) => orderTransactionShopValue(tx) === shop)
}

function orderTransactionsMetaLabel(count) {
  if (count === 1) return '1 транзакція'
  if (count < 5) return `${count} транзакції`
  return `${count} транзакцій`
}

function orderTransactionPayloadFromForm(fd) {
  const qty = Math.max(1, Number(fd.get('qty')) || 1)
  const productName = String(fd.get('productName') || '').trim()
  let article = articleValueForSave(String(fd.get('article') || '').trim())
  if (!article && productName) {
    const zakupka = findZakupkaProductByName(productName)
    if (zakupka?.sku) article = articleValueForSave(zakupka.sku)
  }
  const shop = String(fd.get('shop') || 'Bazario').trim() || 'Bazario'
  const unitPriceFields = accountAmountPayload(fd.get('unitPrice'))
  let unitPrice = unitPriceFields.amount ?? 0
  if (!unitPrice) {
    const ukraine = findUkraineProductForOrderTransaction({
      article,
      productName,
      firstName: fd.get('firstName'),
    })
    if (ukraine) unitPrice = ukraineProductOrderPrice(ukraine, shop)
  }
  const lineTotal = qty * unitPrice
  const unitPriceDisplay = unitPrice
    ? amountInputFieldDisplay(unitPrice)
    : unitPriceFields.amountDisplay
  const payload = {
    shop,
    date: orderTransactionDateFromForm(fd.get('date')),
    firstName: String(fd.get('firstName') || '').trim(),
    productName,
    phone: String(fd.get('phone') || '').trim(),
    article,
    qty,
    unitPrice,
    unitPriceDisplay,
    amount: lineTotal,
    amountDisplay: lineTotal ? amountInputFieldDisplay(lineTotal) : '',
    status: fd.get('status') || bazarioOrderStatuses[0],
    delivery: fd.get('delivery') || bazarioDeliveryOptions[0],
    ttnComment: String(fd.get('ttnComment') || '').trim(),
  }
  return applyInitialOrderTransactionStatusHistory(payload)
}

function filterUkraineProductsForOrderSuggest(query) {
  const q = String(query || '').trim().toLowerCase()
  const products = listProductsForUkraineTable()
  if (!q) return products
  return products.filter((product) => {
    const name = productDisplayName(product).toLowerCase()
    const sku = String(productDisplaySku(product) || '').toLowerCase()
    return name.includes(q) || sku.includes(q)
  })
}

function ukraineProductShopPriceField(shop) {
  const config = Object.values(ACCOUNTING_ORDER_SHOPS).find((item) => item.shop === shop)
  return config?.ukrainePriceField || 'priceProm'
}

function ukraineProductOrderPrice(product, shop = 'Bazario') {
  const field = ukraineProductShopPriceField(shop)
  const value = Number(product?.[field])
  return Number.isFinite(value) ? value : 0
}

function orderShopFromForm(form) {
  if (!form) return 'Bazario'
  return String(form.querySelector('[name="shop"]')?.value || form.dataset.orderShop || 'Bazario').trim() || 'Bazario'
}

function hideBazarioOrderProductSuggest(input) {
  const wrap = input?.closest('.order-product-suggest-wrap')
  const menu = wrap?.querySelector('.order-product-suggest-menu')
  if (!menu) return
  menu.classList.add('is-hidden')
  menu.innerHTML = ''
  menu.dataset.activeIndex = '-1'
  input?.setAttribute('aria-expanded', 'false')
}

function renderBazarioOrderProductSuggest(input) {
  const wrap = input.closest('.order-product-suggest-wrap')
  const menu = wrap?.querySelector('.order-product-suggest-menu')
  if (!menu) return
  const form = input.closest('form')
  const shop = orderShopFromForm(form)
  const items = filterUkraineProductsForOrderSuggest(input.value)
  if (!items.length) {
    menu.innerHTML = '<div class="order-product-suggest-empty">Товарів не знайдено</div>'
    menu.classList.remove('is-hidden')
    input.setAttribute('aria-expanded', 'true')
    menu.dataset.activeIndex = '-1'
    return
  }
  menu.innerHTML = items.map((product, index) => {
    const name = productDisplayName(product)
    const sku = productDisplaySku(product)
    const price = ukraineProductOrderPrice(product, shop)
    const priceLabel = price ? amountInputDisplay(price) : '—'
    return `<button type="button" class="order-product-suggest-option" role="option" data-product-id="${escapeHtml(product.id)}" data-index="${index}">
      <span class="order-product-suggest-name">${escapeHtml(name)}</span>
      <span class="order-product-suggest-meta">${escapeHtml(sku)} · ${escapeHtml(priceLabel)}</span>
    </button>`
  }).join('')
  menu.classList.remove('is-hidden')
  input.setAttribute('aria-expanded', 'true')
  menu.dataset.activeIndex = '-1'
}

function applyUkraineProductToBazarioOrderForm(product, input) {
  const form = input?.closest('form')
  if (!form || !product) return
  const shop = orderShopFromForm(form)
  const productNameInput = form.querySelector('[name="productName"]')
  const articleInput = form.querySelector('[name="article"]')
  const unitPriceInput = form.querySelector('[name="unitPrice"]')
  if (productNameInput) productNameInput.value = productDisplayName(product)
  const sku = productDisplaySku(product)
  if (articleInput) articleInput.value = articleInputDisplay(sku)
  if (unitPriceInput) {
    const price = ukraineProductOrderPrice(product, shop)
    unitPriceInput.value = price ? amountInputFieldDisplay(price) : ''
    syncAmountInputFilledState(unitPriceInput)
  }
  syncBazarioOrderFormLineTotal(form)
  hideBazarioOrderProductSuggest(input || productNameInput)
}

function syncBazarioOrderFormLineTotal(form) {
  if (!form) return
  const qty = Math.max(1, Number(form.querySelector('[name="qty"]')?.value) || 1)
  const unitPrice = parseAmountInput(form.querySelector('[name="unitPrice"]')?.value) ?? 0
  const totalEl = form.querySelector('.bazario-line-total-input') || form.querySelector('#bazarioLineTotal')
  if (totalEl) totalEl.value = unitPrice ? amountInputFieldDisplay(qty * unitPrice) : '—'
}

function renderOrderProductNameField(value, {
  inputId = '',
  name = 'productName',
  label = 'Товар',
  placeholder = 'Оберіть товар зі списку',
} = {}) {
  const idAttr = inputId ? ` id="${inputId}"` : ''
  return `
    <label class="form-field order-product-suggest-field">
      <span>${escapeHtml(label)}</span>
      <div class="order-product-suggest-wrap">
        <input type="text" name="${escapeHtml(name)}"${idAttr} class="order-product-suggest-input" value="${escapeHtml(value)}" required autocomplete="off" aria-autocomplete="list" aria-expanded="false" placeholder="${escapeHtml(placeholder)}" />
        <div class="order-product-suggest-menu is-hidden" role="listbox"></div>
      </div>
    </label>`
}

function renderBazarioOrderFormFields(values = {}) {
  const v = {
    date: getLocalDateInputValue(),
    firstName: '',
    productName: '',
    phone: '',
    article: '',
    unitPrice: '',
    qty: 1,
    status: bazarioOrderStatuses[0],
    delivery: bazarioDeliveryOptions[0],
    ttnComment: '',
    ...values,
  }
  const unitPriceValue = v.unitPriceDisplay
    ? v.unitPriceDisplay
    : (v.unitPrice != null && v.unitPrice !== '' ? amountInputFieldDisplay(v.unitPrice) : '')
  const lineTotalValue = (Number(v.qty) || 1) * (parseAmountInput(unitPriceValue) ?? 0)
  return `
    <label class="form-field"><span>Дата</span><input type="date" name="date" id="bazarioDate" required value="${escapeHtml(v.date)}" /></label>
    <label class="form-field"><span>Клієнт</span><input type="text" name="firstName" id="bazarioFirstName" value="${escapeHtml(v.firstName)}" required autocomplete="name" /></label>
    <label class="form-field"><span>Телефон</span><input type="tel" name="phone" id="bazarioPhone" value="${escapeHtml(v.phone)}" required autocomplete="tel" /></label>
    ${renderOrderProductNameField(v.productName, { inputId: 'bazarioProductName' })}
    <label class="form-field"><span>Артикул SKU</span><input type="text" name="article" id="bazarioArticle" value="${escapeHtml(articleInputDisplay(v.article))}" placeholder="Код:" readonly tabindex="-1" autocomplete="off" /></label>
    <label class="form-field form-field-amount"><span>Ціна</span><input type="text" name="unitPrice" id="bazarioUnitPrice" inputmode="decimal" class="table-input account-amount-input${unitPriceValue ? ' account-amount-input--filled' : ''}" value="${escapeHtml(unitPriceValue)}" placeholder="0,0000" readonly tabindex="-1" autocomplete="off" /></label>
    <label class="form-field"><span>Кількість</span><input type="number" name="qty" id="bazarioQty" min="1" step="1" required value="${escapeHtml(String(v.qty || 1))}" /></label>
    <label class="form-field form-field-amount"><span>Сума</span><input type="text" id="bazarioLineTotal" class="table-input account-amount-input bazario-line-total-input" value="${lineTotalValue ? escapeHtml(amountInputFieldDisplay(lineTotalValue)) : '—'}" readonly tabindex="-1" autocomplete="off" /></label>
    <label class="form-field"><span>Статус</span><select name="status" id="bazarioStatus" required>${renderSelectOptions(bazarioOrderStatuses, v.status)}</select></label>
    <label class="form-field"><span>Доставка</span><select name="delivery" id="bazarioDelivery" required>${renderSelectOptions(bazarioDeliveryOptions, v.delivery)}</select></label>
    <label class="form-field"><span>Наша ТТН/Коментар</span><textarea name="ttnComment" id="bazarioTtnComment" rows="2" placeholder="ТТН або коментар">${escapeHtml(v.ttnComment)}</textarea></label>`
}

function filterBazarioOrderTransactions(transactions) {
  const q = searchQuery.toLowerCase()
  return transactions.filter((tx) => !q || orderTransactionSearchText(tx).toLowerCase().includes(q))
}

function bazarioOrderPickCell(txId, field, tx) {
  const display = getBazarioOrderPickDisplay(tx, field) || '—'
  const options = getBazarioOrderPickOptions(field)
  const current = field === 'delivery' ? (tx?.delivery || tx?.payment) : tx?.[field]
  const selected = options.some((o) => o.value === current) ? current : (options[0]?.value ?? '')

  const arrowControl = options.length
    ? `<span class="account-pick-arrow-wrap">
        <select class="account-pick-select bazario-order-pick-select" data-order-tx-id="${txId}" data-field="${field}" aria-label="Вибір" tabindex="-1">
          ${options.map((o) => `<option value="${escapeHtml(o.value)}"${o.value === selected ? ' selected' : ''}>${escapeHtml(o.label)}</option>`).join('')}
        </select>
        <span class="account-pick-arrow" aria-hidden="true"></span>
      </span>`
    : `<button type="button" class="account-pick-arrow-wrap account-pick-arrow-wrap--empty" data-field="${field}" aria-label="Немає варіантів">
        <span class="account-pick-arrow" aria-hidden="true"></span>
      </button>`

  return `<td class="account-pick-cell bazario-order-pick-cell" data-order-tx-id="${txId}" data-field="${field}">
    <div class="account-pick-wrap">
      <span class="account-pick-value">${escapeHtml(display)}</span>
      ${arrowControl}
    </div>
  </td>`
}

function bazarioOrderClientCell(tx) {
  const name = tx.firstName || '—'
  const isExpanded = expandedOrderTxCommentId === tx.id
  return `<td class="bazario-order-client-cell">
    <button type="button" class="bazario-order-client-toggle account-name-toggle${isExpanded ? ' is-expanded' : ''}"
      data-order-tx-client-toggle="${tx.id}" aria-expanded="${isExpanded ? 'true' : 'false'}"
      aria-label="Історія статусів — ${escapeHtml(name)}">
      <span class="bazario-order-client-name account-name-value">${escapeHtml(name)}</span>
      <span class="account-name-chevron" aria-hidden="true"></span>
    </button>
  </td>`
}

function bazarioOrderClientCommentRow(tx) {
  if (expandedOrderTxCommentId !== tx.id) return ''
  const comment = tx.clientComment ?? ''
  return `
    <tr class="bazario-order-comment-row account-detail-row" data-order-tx-id="${tx.id}">
      <td colspan="${bazarioOrderTableColSpan()}">
        <div class="bazario-order-client-detail-panel">
          <div class="order-tx-status-history-section">
            <span class="account-detail-label">Історія статусів · ${escapeHtml(tx.firstName || '—')}</span>
            <div class="order-tx-status-history-wrap" data-order-tx-id="${tx.id}">
              ${renderOrderTransactionStatusHistoryHtml(tx)}
            </div>
          </div>
          <label class="bazario-order-comment-field account-notes-field">
            <span class="bazario-order-comment-label account-detail-label">Коментар</span>
            <textarea class="table-input bazario-order-comment-input account-notes-input" data-order-tx-id="${tx.id}" rows="3" placeholder="Додайте коментар до клієнта...">${escapeHtml(comment)}</textarea>
          </label>
        </div>
      </td>
    </tr>`
}

function bazarioOrderMoneyCell(value) {
  const label = productMoneyLabel(value)
  return `<td class="bazario-order-money-cell">${escapeHtml(label)}</td>`
}

function bazarioOrderTtnCommentCell(txId, tx) {
  const val = tx.ttnComment ?? tx.notes ?? tx.paymentId ?? ''
  return `<td class="bazario-order-ttn-cell">
    <input type="text" class="table-input bazario-order-ttn-input" data-order-tx-id="${txId}" value="${escapeHtml(val)}" placeholder="ТТН або коментар" autocomplete="off" />
  </td>`
}

function bazarioOrderTableColSpan() {
  return BAZARIO_ORDER_TABLE_COL_COUNT + (orderShopDeleteMode ? 1 : 0)
}

function bazarioOrderTableRows(transactions) {
  if (!transactions.length) {
    return `<tr><td colspan="${bazarioOrderTableColSpan()}" class="empty-cell">Транзакцій поки немає</td></tr>`
  }
  return transactions
    .slice()
    .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
    .map((tx) => {
      const sku = orderTransactionSkuLabel(tx)
      const unitPrice = orderTransactionUnitPrice(tx)
      const lineTotal = orderTransactionLineTotal(tx)
      const isExpanded = expandedOrderTxCommentId === tx.id
      const deleteCell = orderShopDeleteMode
        ? `<td class="td-actions bazario-order-delete-cell"><button type="button" class="btn-icon btn-delete-inline" data-delete-order-tx="${tx.id}" title="Видалити" aria-label="Видалити">×</button></td>`
        : ''
      return `
      <tr class="bazario-order-row${isExpanded ? ' bazario-order-row-expanded account-row-expanded' : ''}" data-order-tx-id="${tx.id}" data-search="${escapeHtml(orderTransactionSearchText(tx))}">
        <td class="account-date-cell account-date-cell--stack">${orderTransactionDateCellHtml(tx)}</td>
        ${bazarioOrderClientCell(tx)}
        <td class="bazario-order-phone-cell">${escapeHtml(tx.phone || '—')}</td>
        <td class="account-article-cell bazario-order-sku-cell">${escapeHtml(sku || '—')}</td>
        ${bazarioOrderMoneyCell(unitPrice)}
        <td class="bazario-order-qty-cell">${escapeHtml(String(orderTransactionQtyValue(tx)))}</td>
        ${bazarioOrderMoneyCell(lineTotal)}
        ${bazarioOrderPickCell(tx.id, 'status', tx)}
        ${bazarioOrderPickCell(tx.id, 'delivery', tx)}
        ${bazarioOrderTtnCommentCell(tx.id, tx)}
        ${deleteCell}
      </tr>
      ${bazarioOrderClientCommentRow(tx)}`
    })
    .join('')
}

function renderBazarioOrdersTable(transactions) {
  const filtered = filterBazarioOrderTransactions(transactions)
  return `
    <section class="card table-card profiles-fullwidth bazario-orders-table-card${orderShopDeleteMode ? ' bazario-orders-delete-mode' : ''}" data-searchable>
      <div class="card-head">
        <div class="accounts-card-head-title">
          <h2>Транзакції по замовленнях</h2>
        </div>
        <button type="button" class="count-badge count-badge-btn${orderShopDeleteMode ? ' is-active' : ''}" id="orderShopDeleteToggle" aria-pressed="${orderShopDeleteMode ? 'true' : 'false'}" title="${orderShopDeleteMode ? 'Завершити видалення' : 'Видалити транзакції'}">${filtered.length}</button>
      </div>
      <div class="table-wrap table-wrap-wide">
        <table class="data-table bazario-orders-data-table">
          <colgroup>
            <col class="bazario-col-date" />
            <col class="bazario-col-client" />
            <col class="bazario-col-phone" />
            <col class="bazario-col-sku" />
            <col class="bazario-col-price" />
            <col class="bazario-col-qty" />
            <col class="bazario-col-sum" />
            <col class="bazario-col-status" />
            <col class="bazario-col-delivery" />
            <col class="bazario-col-ttn" />
            ${orderShopDeleteMode ? '<col class="bazario-col-actions" />' : ''}
          </colgroup>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Клієнт</th>
              <th>Телефон</th>
              <th>Артикул SKU</th>
              <th class="account-amount-th">Ціна</th>
              <th>Кількість</th>
              <th class="account-amount-th">Сума</th>
              <th>Статус</th>
              <th>Доставка</th>
              <th>Наша ТТН/Коментар</th>
              ${orderShopDeleteMode ? '<th class="bazario-order-delete-col" aria-label="Видалити"></th>' : ''}
            </tr>
          </thead>
          <tbody id="bazarioOrdersTableBody">${bazarioOrderTableRows(filtered)}</tbody>
        </table>
      </div>
    </section>`
}

function renderAddOrderShopModal(shop) {
  return `
    <div class="modal-overlay is-hidden" id="orderShopModal" aria-hidden="true">
      <div class="modal card modal--wide" role="dialog" aria-labelledby="orderShopModalTitle">
        <div class="card-head modal-head">
          <h2 id="orderShopModalTitle">Нова транзакція</h2>
          <button type="button" class="btn-icon modal-close" id="orderShopModalClose" aria-label="Закрити">×</button>
        </div>
        <form id="addOrderShopForm" data-order-shop="${escapeHtml(shop)}">
          <input type="hidden" name="shop" value="${escapeHtml(shop)}" />
          <div class="form-grid form-grid-single">
            ${renderBazarioOrderFormFields()}
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" id="orderShopModalCancel">Скасувати</button>
            <button type="submit" class="btn-primary">Зберегти</button>
          </div>
        </form>
      </div>
    </div>`
}

function renderAddBazarioOrderModal() {
  return renderAddOrderShopModal('Bazario')
}

function accountingPageHeader() {
  const monthKey = resolveAccountingPagePeriodMonthKey()
  return `
    <div class="page-header">
      <div class="order-shop-title-row page-period-row">
        <h1 class="page-period-title order-shop-block-title">Облік</h1>
        ${renderPagePeriodLabelButton(accountingPagePeriod, 'accounting', monthKey)}
      </div>
      <p class="page-sub">Замовлення, транзакції та суми</p>
    </div>`
}

function renderAccountingSectionCard(link, { modifier = '', actionAttr = '' } = {}) {
  const search = `${link.title} ${link.desc} ${link.meta || ''} ${link.amount || ''}`
  return `<button type="button" class="accounting-link-card${modifier ? ` ${modifier}` : ''}" ${actionAttr} data-search="${escapeHtml(search)}">
        <div class="accounting-link-head">
          <h2 class="accounting-link-title">${escapeHtml(link.title)}</h2>
          <span class="accounting-link-arrow" aria-hidden="true">→</span>
        </div>
        <p class="accounting-link-desc">${escapeHtml(link.desc)}</p>
        <strong class="accounting-link-amount">${escapeHtml(link.amount)}</strong>
        <p class="accounting-link-meta">${escapeHtml(link.meta)}</p>
      </button>`
}

function orderTransactionMonthKey(tx) {
  const raw = tx?.date || tx?.createdAt
  if (!raw) return null
  const str = String(raw).trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str.slice(0, 7)
  return financeMonthKey(raw)
}

function orderTransactionMatchesMonth(tx, monthKey) {
  return orderTransactionMonthKey(tx) === monthKey
}

function getCurrentOrderShopMonthKey() {
  return getCurrentMonthKey()
}

function resetPagePeriodToCurrentMonth(period) {
  const now = new Date()
  period.year = now.getFullYear()
  period.monthKey = getCurrentMonthKey(now)
  period.pickerOpen = false
  period.yearPickerOpen = false
}

function isValidMonthKey(key) {
  return typeof key === 'string' && /^\d{4}-\d{2}$/.test(key)
}

function applyPagePeriodSnapshot(period, snapshot) {
  if (!snapshot || !isValidMonthKey(snapshot.monthKey)) return
  period.year = Number(snapshot.year) || Number(snapshot.monthKey.split('-')[0])
  period.monthKey = snapshot.monthKey
  period.pickerOpen = false
  period.yearPickerOpen = false
}

function persistAppNavState() {
  try {
    localStorage.setItem(APP_NAV_STATE_KEY, JSON.stringify({
      v: 1,
      activeNav,
      accountingSubPage,
      financeDetailPage,
      activeFinanceMonthKey,
      orderShopAccountingYear,
      orderShopAccountingMonthKey,
      monthlyIncomePageKey,
      monthlyExpensePageKey,
      monthlyDayPage,
      activeMonthlyYear,
      warehouseDetailId,
      productPagePeriod: { year: productPagePeriod.year, monthKey: productPagePeriod.monthKey },
      accountingPagePeriod: { year: accountingPagePeriod.year, monthKey: accountingPagePeriod.monthKey },
      accountsPagePeriod: { year: accountsPagePeriod.year, monthKey: accountsPagePeriod.monthKey },
      advertisingPagePeriod: { year: advertisingPagePeriod.year, monthKey: advertisingPagePeriod.monthKey },
      financePagePeriod: { year: financePagePeriod.year, monthKey: financePagePeriod.monthKey },
    }))
  } catch (_) {}
}

function restoreAppNavState() {
  try {
    const raw = localStorage.getItem(APP_NAV_STATE_KEY)
    if (!raw) return false
    const data = JSON.parse(raw)
    if (!data || data.v !== 1 || !VALID_NAV_IDS.has(data.activeNav)) return false

    activeNav = data.activeNav
    accountingSubPage = data.accountingSubPage && VALID_ACCOUNTING_SUB_PAGES.has(data.accountingSubPage)
      ? data.accountingSubPage
      : null
    financeDetailPage = data.financeDetailPage && VALID_FINANCE_DETAIL_PAGES.has(data.financeDetailPage)
      ? data.financeDetailPage
      : null
    activeFinanceMonthKey = isValidMonthKey(data.activeFinanceMonthKey) ? data.activeFinanceMonthKey : null

    if (Number.isFinite(data.orderShopAccountingYear)) orderShopAccountingYear = data.orderShopAccountingYear
    if (isValidMonthKey(data.orderShopAccountingMonthKey)) {
      orderShopAccountingMonthKey = data.orderShopAccountingMonthKey
    }

    if (Number.isFinite(data.activeMonthlyYear)) activeMonthlyYear = data.activeMonthlyYear
    monthlyIncomePageKey = isValidMonthKey(data.monthlyIncomePageKey) ? data.monthlyIncomePageKey : null
    monthlyExpensePageKey = isValidMonthKey(data.monthlyExpensePageKey) ? data.monthlyExpensePageKey : null

    if (data.monthlyDayPage && isValidMonthKey(data.monthlyDayPage.monthKey) && data.monthlyDayPage.dayKey) {
      monthlyDayPage = {
        monthKey: data.monthlyDayPage.monthKey,
        dayKey: String(data.monthlyDayPage.dayKey),
        tab: data.monthlyDayPage.tab === 'expense' ? 'expense' : 'income',
      }
    } else {
      monthlyDayPage = null
    }

    if (data.warehouseDetailId && db.get('warehouses', data.warehouseDetailId)) {
      warehouseDetailId = data.warehouseDetailId
    } else {
      warehouseDetailId = null
    }

    applyPagePeriodSnapshot(productPagePeriod, data.productPagePeriod)
    applyPagePeriodSnapshot(accountingPagePeriod, data.accountingPagePeriod)
    applyPagePeriodSnapshot(accountsPagePeriod, data.accountsPagePeriod)
    applyPagePeriodSnapshot(advertisingPagePeriod, data.advertisingPagePeriod)
    applyPagePeriodSnapshot(financePagePeriod, data.financePagePeriod)

    orderShopPeriodPickerOpen = false
    orderShopYearPickerOpen = false
    monthlyYearPickerOpen = false
    return true
  } catch (_) {
    return false
  }
}

function resetAllPagePeriodsToCurrentMonth() {
  resetPagePeriodToCurrentMonth(productPagePeriod)
  resetPagePeriodToCurrentMonth(accountingPagePeriod)
  resetPagePeriodToCurrentMonth(accountsPagePeriod)
  resetPagePeriodToCurrentMonth(advertisingPagePeriod)
  resetPagePeriodToCurrentMonth(financePagePeriod)
  const now = new Date()
  orderShopAccountingYear = now.getFullYear()
  orderShopAccountingMonthKey = getCurrentMonthKey(now)
  orderShopPeriodPickerOpen = false
  orderShopYearPickerOpen = false
  activeMonthlyYear = now.getFullYear()
  activeFinanceMonthKey = null
  monthlyYearPickerOpen = false
}

function ensureOrderShopPeriodDefaults() {
  if (!orderShopAccountingYear) orderShopAccountingYear = new Date().getFullYear()
  if (!orderShopAccountingMonthKey) orderShopAccountingMonthKey = getCurrentOrderShopMonthKey()
}

function resolveOrderShopMonthKey() {
  ensureOrderShopPeriodDefaults()
  const [yearPart, monthPart = '01'] = orderShopAccountingMonthKey.split('-')
  if (Number(yearPart) === orderShopAccountingYear) return orderShopAccountingMonthKey
  return `${orderShopAccountingYear}-${monthPart}`
}

function getOrderShopYearOptions() {
  const nowYear = new Date().getFullYear()
  const max = Math.max(nowYear + 1, orderShopAccountingYear || nowYear, 2028)
  const min = 2024
  const years = []
  for (let year = max; year >= min; year -= 1) years.push(year)
  return years
}

function ensurePagePeriodDefaults(period) {
  if (!period.year) period.year = new Date().getFullYear()
  if (!period.monthKey) period.monthKey = getCurrentOrderShopMonthKey()
}

function resolvePagePeriodMonthKey(period) {
  ensurePagePeriodDefaults(period)
  const [yearPart, monthPart = '01'] = period.monthKey.split('-')
  if (Number(yearPart) === period.year) return period.monthKey
  return `${period.year}-${monthPart}`
}

function getPagePeriodYearOptions(period) {
  const nowYear = new Date().getFullYear()
  const max = Math.max(nowYear + 1, period.year || nowYear, 2028)
  const min = 2024
  const years = []
  for (let year = max; year >= min; year -= 1) years.push(year)
  return years
}

function resolveProductPagePeriodMonthKey() {
  return resolvePagePeriodMonthKey(productPagePeriod)
}

function resolveAccountingPagePeriodMonthKey() {
  return resolvePagePeriodMonthKey(accountingPagePeriod)
}

function resolveAccountsPagePeriodMonthKey() {
  return resolvePagePeriodMonthKey(accountsPagePeriod)
}

function resolveAdvertisingPagePeriodMonthKey() {
  return resolvePagePeriodMonthKey(advertisingPagePeriod)
}

function resolveFinancePagePeriodMonthKey() {
  return resolvePagePeriodMonthKey(financePagePeriod)
}

function closeAllPagePeriodPickers() {
  productPagePeriod.pickerOpen = false
  productPagePeriod.yearPickerOpen = false
  accountingPagePeriod.pickerOpen = false
  accountingPagePeriod.yearPickerOpen = false
  accountsPagePeriod.pickerOpen = false
  accountsPagePeriod.yearPickerOpen = false
  advertisingPagePeriod.pickerOpen = false
  advertisingPagePeriod.yearPickerOpen = false
  financePagePeriod.pickerOpen = false
  financePagePeriod.yearPickerOpen = false
  orderShopPeriodPickerOpen = false
  orderShopYearPickerOpen = false
}

function renderSharedPeriodPopup(period, context, selectedKey) {
  const years = getPagePeriodYearOptions(period)
  const months = getMonthlyTabMonths(period.year)
  return `
    <div class="order-shop-period-popup" role="dialog" aria-label="Обрати місяць і рік">
      <div class="order-shop-period-popup-head">
        <div class="order-shop-period-year-wrap monthly-year-picker-wrap">
          <button type="button" class="order-shop-period-year-btn" data-page-period-year-toggle="${context}"
            aria-haspopup="listbox" aria-expanded="${period.yearPickerOpen ? 'true' : 'false'}" aria-label="Обрати рік">
            <span>${period.year}</span>
            <svg class="monthly-year-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="monthly-year-menu order-shop-period-year-menu${period.yearPickerOpen ? '' : ' is-hidden'}" role="listbox" aria-label="Роки">
            ${years.map((year) => `
              <button type="button" role="option" class="monthly-year-option${year === period.year ? ' is-selected' : ''}"
                data-page-period-year="${year}" data-page-period-context="${context}" aria-selected="${year === period.year ? 'true' : 'false'}">
                ${year}
              </button>`).join('')}
          </div>
        </div>
      </div>
      <div class="order-shop-period-month-grid" role="listbox" aria-label="Місяці">
        ${months.map((t) => {
    const short = formatOrderShopMonthShort(t.monthIndex)
    const isActive = t.key === selectedKey
    return `
          <button type="button" role="option" class="order-shop-period-month${isActive ? ' is-active' : ''}"
            data-page-period-month="${escapeHtml(t.key)}" data-page-period-context="${context}"
            aria-selected="${isActive ? 'true' : 'false'}"
            aria-label="${escapeHtml(formatMonthlyTabTitle(t.monthIndex))}">
            ${escapeHtml(short)}
          </button>`
  }).join('')}
      </div>
    </div>`
}

function renderPagePeriodLabelButton(period, context, monthKey) {
  const periodLabel = capitalizeFinanceLabel(formatFinanceMonthLabel(monthKey))
  return `
    <div class="order-shop-period-anchor" data-page-period-anchor="${context}">
      <button type="button" class="order-shop-period-label-btn"
        data-page-period-toggle="${context}" aria-haspopup="dialog"
        aria-expanded="${period.pickerOpen ? 'true' : 'false'}"
        aria-label="Обрати місяць і рік">
        <span class="order-shop-period-label">${escapeHtml(periodLabel)}</span>
        <svg class="monthly-year-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      ${period.pickerOpen ? renderSharedPeriodPopup(period, context, monthKey) : ''}
    </div>`
}

function listOrderTransactionsByShopAndMonth(shop, monthKey) {
  return listOrderTransactionsByShop(shop).filter((tx) => orderTransactionMatchesMonth(tx, monthKey))
}

function formatOrderShopMonthShort(monthIndex) {
  const name = FINANCE_MONTH_LABELS[monthIndex] || ''
  return name ? capitalizeFinanceLabel(name.slice(0, 3)) : '—'
}

function renderOrderShopTitleRow(config, monthKey) {
  return `
    <div class="order-shop-title-row page-period-row">
      <h1 class="page-period-title order-shop-block-title">${escapeHtml(config.title)}</h1>
      ${renderPagePeriodLabelButton(orderShopPagePeriod, 'orderShop', monthKey)}
    </div>`
}

function renderOrderShopAccounting(config) {
  const monthKey = resolveOrderShopMonthKey()
  orderShopAccountingMonthKey = monthKey
  const transactions = listOrderTransactionsByShopAndMonth(config.shop, monthKey)
  const total = transactions.reduce((s, tx) => s + orderTransactionAmountValue(tx), 0)
  return `
    <div class="accounting-page bazario-accounting-page ${config.pageClass}" data-searchable>
      <div class="page-header finance-detail-header bazario-accounting-header">
        <button type="button" class="btn-link finance-back-btn" data-accounting-back>← Облік</button>
        <div class="bazario-accounting-head-row">
          <div class="order-shop-head-main">
            ${renderOrderShopTitleRow(config, monthKey)}
            <p class="page-sub">${escapeHtml(config.sub)}</p>
          </div>
          <div class="bazario-accounting-summary">
            <span class="bazario-accounting-summary-label">Разом</span>
            <strong class="bazario-accounting-summary-amount">${fmtMoney(total)}</strong>
            <span class="bazario-accounting-summary-meta">${orderTransactionsMetaLabel(transactions.length)}</span>
          </div>
          <button type="button" class="btn-primary" id="addOrderShopBtn">Додати транзакцію</button>
        </div>
      </div>
      ${renderBazarioOrdersTable(transactions)}
      ${renderAddOrderShopModal(config.shop)}
    </div>`
}

function renderAddAdvertisingExpenseModal() {
  const today = getLocalDateInputValue()
  return `
    <div class="modal-overlay is-hidden" id="advertisingExpenseModal" aria-hidden="true">
      <div class="modal card" role="dialog" aria-labelledby="advertisingExpenseModalTitle">
        <div class="card-head modal-head">
          <h2 id="advertisingExpenseModalTitle">Додати витрату на рекламу</h2>
          <button type="button" class="btn-icon modal-close" id="advertisingExpenseModalClose" aria-label="Закрити">×</button>
        </div>
        <form class="crud-form" data-storage="finance" id="addAdvertisingExpenseForm">
          <input type="hidden" name="type" value="expense" />
          <input type="hidden" name="title" value="${escapeHtml(ACCOUNTING_ADVERTISING_SECTION.title)}" />
          <div class="form-grid form-grid-single">
            <label class="form-field"><span>Сума, ₴</span><input type="number" name="amount" required min="0" step="0.01" placeholder="0.00" /></label>
            <label class="form-field"><span>Дата</span><input type="date" name="date" required value="${today}" /></label>
            <label class="form-field"><span>Коментар</span><input type="text" name="comment" placeholder="Канал, кампанія, примітка..." /></label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" id="advertisingExpenseModalCancel">Скасувати</button>
            <button type="submit" class="btn-primary">Зберегти</button>
          </div>
        </form>
      </div>
    </div>`
}

function renderAdvertisingExpensesTable(items) {
  const transactions = items.map(mapAdvertisingExpenseToFinanceTx)
  return `
    <section class="advertising-expenses-section">
      ${renderFinanceTransactionList(transactions, 'expense', { detail: true })}
    </section>`
}

function renderAdvertising() {
  const monthKey = resolveAdvertisingPagePeriodMonthKey()
  const analysis = getAdvertisingMonthAnalysis(monthKey)
  const monthGroups = groupAdvertisingByMonth().slice(-6)
  const monthChartTitle = formatFinanceMonthLabel(monthKey)

  return `
    <div class="advertising-page finance-dashboard" data-searchable>
      <div class="page-header">
        <div class="order-shop-title-row page-period-row">
          <h1 class="page-period-title order-shop-block-title">${escapeHtml(ACCOUNTING_ADVERTISING_SECTION.title)}</h1>
          ${renderPagePeriodLabelButton(advertisingPagePeriod, 'advertising', monthKey)}
        </div>
        <p class="page-sub">Аналіз витрат на рекламу та просування</p>
      </div>

      <div class="finance-kpi-row advertising-kpi-row">
        <article class="finance-kpi-card finance-kpi-card--expense">
          <span class="finance-kpi-label">Витрати за місяць</span>
          <strong class="finance-kpi-value negative">${fmtMoney(analysis.total)}</strong>
          <span class="finance-kpi-meta">${escapeHtml(monthChartTitle)}</span>
        </article>
        <article class="finance-kpi-card">
          <span class="finance-kpi-label">Операцій</span>
          <strong class="finance-kpi-value">${analysis.count}</strong>
          <span class="finance-kpi-meta">${advertisingExpensesMetaLabel(analysis.count)}</span>
        </article>
        <article class="finance-kpi-card">
          <span class="finance-kpi-label">Середня витрата</span>
          <strong class="finance-kpi-value negative">${fmtMoney(analysis.average)}</strong>
          <span class="finance-kpi-meta">на одну операцію</span>
        </article>
      </div>

      <div class="advertising-analysis-grid">
        <section class="finance-dash-card">
          <div class="finance-dash-card-head">
            <div>
              <h2 class="finance-dash-card-title">Динаміка за місяць</h2>
              <p class="finance-dash-card-sub">${escapeHtml(monthChartTitle)} · витрати по днях</p>
            </div>
          </div>
          ${renderAdvertisingDailyChart(analysis.items, monthKey)}
        </section>
        <section class="finance-dash-card">
          ${renderFinanceMonthBreakdown(monthGroups, 'expense')}
        </section>
      </div>

      <section class="finance-dash-card advertising-operations-card">
        <div class="finance-dash-card-head">
          <div>
            <h2 class="finance-dash-card-title">Операції</h2>
            <p class="finance-dash-card-sub">${escapeHtml(monthChartTitle)}</p>
          </div>
          <button type="button" class="btn-primary" id="addAdvertisingExpenseBtn">Додати витрату</button>
        </div>
        ${renderAdvertisingExpensesTable(analysis.items)}
      </section>
      ${renderAddAdvertisingExpenseModal()}
    </div>`
}

function openAdvertisingExpenseModal() {
  const modal = document.getElementById('advertisingExpenseModal')
  if (!modal) {
    render()
    return
  }
  const form = document.getElementById('addAdvertisingExpenseForm')
  form?.reset()
  const dateInput = form?.querySelector('[name="date"]')
  if (dateInput) dateInput.value = getLocalDateInputValue()
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
}

function closeAdvertisingExpenseModal() {
  const modal = document.getElementById('advertisingExpenseModal')
  if (!modal) return
  modal.classList.add('is-hidden')
  modal.setAttribute('aria-hidden', 'true')
  document.getElementById('addAdvertisingExpenseForm')?.reset()
}

function bindAdvertisingPage() {
  const page = document.querySelector('.advertising-page')
  if (!page || page.dataset.bound === '1') return
  page.dataset.bound = '1'
  document.getElementById('addAdvertisingExpenseBtn')?.addEventListener('click', openAdvertisingExpenseModal)
  document.getElementById('advertisingExpenseModalClose')?.addEventListener('click', closeAdvertisingExpenseModal)
  document.getElementById('advertisingExpenseModalCancel')?.addEventListener('click', closeAdvertisingExpenseModal)
  document.getElementById('advertisingExpenseModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'advertisingExpenseModal') closeAdvertisingExpenseModal()
  })
}

function renderBazarioAccounting() {
  return renderOrderShopAccounting(ACCOUNTING_ORDER_SHOPS.bazario)
}

function renderAccounting() {
  const orderShopConfig = getAccountingOrderShopConfig()
  if (orderShopConfig) {
    return renderOrderShopAccounting(orderShopConfig)
  }

  const monthKey = resolveAccountingPagePeriodMonthKey()
  const accounts = db.list('accounts').filter((a) => accountMatchesMonth(a, monthKey))
  const bazarioOrders = listOrderTransactionsByShop('Bazario').filter((tx) => orderTransactionMatchesMonth(tx, monthKey))
  const mixMarketOrders = listOrderTransactionsByShop('MІКС МАРКЕТ').filter((tx) => orderTransactionMatchesMonth(tx, monthKey))
  const advertisingExpenses = listAdvertisingExpensesForMonth(monthKey)
  const accountsTotal = accounts.reduce((s, a) => s + accountAmountValue(a), 0)
  const bazarioTotal = bazarioOrders.reduce((s, tx) => s + orderTransactionAmountValue(tx), 0)
  const mixMarketTotal = mixMarketOrders.reduce((s, tx) => s + orderTransactionAmountValue(tx), 0)
  const advertisingTotal = advertisingExpenses.reduce((s, item) => s + (Number(item.amount) || 0), 0)
  const q = searchQuery.toLowerCase()

  const accountsLink = {
    title: 'Аккаунти',
    desc: 'Замовлення, оплата ID, суми',
    amount: fmtMoney(accountsTotal),
    meta: `${accounts.length} ${accounts.length === 1 ? 'запис' : accounts.length < 5 ? 'записи' : 'записів'}`,
  }

  const bazarioLink = {
    title: 'Bazario',
    desc: 'Транзакції по замовленнях магазину',
    amount: fmtMoney(bazarioTotal),
    meta: orderTransactionsMetaLabel(bazarioOrders.length),
  }

  const mixMarketLink = {
    title: 'MІКС МАРКЕТ',
    desc: 'Транзакції по замовленнях магазину',
    amount: fmtMoney(mixMarketTotal),
    meta: orderTransactionsMetaLabel(mixMarketOrders.length),
  }

  const advertisingLink = {
    title: ACCOUNTING_ADVERTISING_SECTION.title,
    desc: ACCOUNTING_ADVERTISING_SECTION.sub,
    amount: fmtMoney(advertisingTotal),
    meta: advertisingExpensesMetaLabel(advertisingExpenses.length),
  }

  const matchesSearch = (link) => !q || `${link.title} ${link.desc} ${link.meta} ${link.amount}`.toLowerCase().includes(q)

  const linkCards = [
    matchesSearch(accountsLink)
      ? renderAccountingSectionCard(accountsLink, {
        modifier: 'accounting-link-card--accounts',
        actionAttr: 'data-go-nav="accounts"',
      })
      : '',
    matchesSearch(bazarioLink)
      ? renderAccountingSectionCard(bazarioLink, {
        modifier: 'accounting-link-card--bazario',
        actionAttr: 'data-go-accounting="bazario"',
      })
      : '',
    matchesSearch(mixMarketLink)
      ? renderAccountingSectionCard(mixMarketLink, {
        modifier: 'accounting-link-card--mix-market',
        actionAttr: 'data-go-accounting="mix-market"',
      })
      : '',
    matchesSearch(advertisingLink)
      ? renderAccountingSectionCard(advertisingLink, {
        modifier: ACCOUNTING_ADVERTISING_SECTION.cardModifier,
        actionAttr: 'data-go-nav="advertising"',
      })
      : '',
  ].filter(Boolean).join('')

  const linksSection = linkCards
    ? `<section class="accounting-links-section">
        <div class="accounting-links-grid">${linkCards}</div>
      </section>`
    : ''

  const empty = !linksSection ? '<p class="empty-hint">Нічого не знайдено</p>' : ''

  return `
    <div class="accounting-page" data-searchable>
      ${accountingPageHeader()}
      ${linksSection}
      ${empty}
    </div>`
}

function accountMatchesMonth(account, monthKey) {
  return financeMonthKey(accountOrderDate(account)) === monthKey
}

function zakupkaDateFieldMonthKey(value) {
  if (!value) return null
  const raw = String(value).trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw.slice(0, 7)
  return financeMonthKey(raw)
}

function zakupkaLineMatchesMonth(line, monthKey) {
  return ['arrivalDate', 'paymentDate', 'shippingDate', 'date'].some((field) => {
    const raw = field === 'date' ? (line?.date || line?.paymentDate) : line?.[field]
    return zakupkaDateFieldMonthKey(raw) === monthKey
  })
}

function productZakupkaMatchesMonth(product, monthKey) {
  const withLines = ensureProductZakupkaLines(product)
  return (withLines.lines || []).some((line) => zakupkaLineMatchesMonth(line, monthKey))
}

function ukraineReplenishmentEventMatchesMonth(event, monthKey) {
  if (!event?.dateRaw) return false
  return zakupkaDateFieldMonthKey(event.dateRaw) === monthKey
}

function productUkraineMatchesMonth(product, monthKey) {
  if (orderTransactionsForProductInMonth(product, monthKey).length) return true
  return listUkraineReplenishmentEvents(product).some((event) => (
    ukraineReplenishmentEventMatchesMonth(event, monthKey)
  ))
}

function getPagePeriodConfig(context) {
  const configs = {
    orderShop: {
      period: orderShopPagePeriod,
      isActive: () => activeNav === 'accounting' && isOrderShopAccountingPage(),
      onChange: () => { expandedOrderTxCommentId = null },
    },
    product: {
      period: productPagePeriod,
      isActive: () => activeNav === 'product',
    },
    accounting: {
      period: accountingPagePeriod,
      isActive: () => activeNav === 'accounting' && !accountingSubPage,
    },
    accounts: {
      period: accountsPagePeriod,
      isActive: () => activeNav === 'accounts',
    },
    advertising: {
      period: advertisingPagePeriod,
      isActive: () => activeNav === 'advertising',
    },
    finance: {
      period: financePagePeriod,
      isActive: () => activeNav === 'finance' && !financeDetailPage,
      onChange: (monthKey) => {
        if (activeFinanceMonthKey) activeFinanceMonthKey = monthKey
      },
    },
  }
  return configs[context] || null
}

function handlePagePeriodClick(e) {
  const toggle = e.target.closest('[data-page-period-toggle]')
  if (toggle) {
    const context = toggle.dataset.pagePeriodToggle
    const cfg = getPagePeriodConfig(context)
    if (!cfg?.isActive()) return false
    e.preventDefault()
    cfg.period.pickerOpen = !cfg.period.pickerOpen
    if (!cfg.period.pickerOpen) cfg.period.yearPickerOpen = false
    render()
    return true
  }

  const yearToggle = e.target.closest('[data-page-period-year-toggle]')
  if (yearToggle) {
    const context = yearToggle.dataset.pagePeriodYearToggle
    const cfg = getPagePeriodConfig(context)
    if (!cfg?.isActive()) return false
    e.preventDefault()
    e.stopPropagation()
    cfg.period.yearPickerOpen = !cfg.period.yearPickerOpen
    render()
    return true
  }

  const yearBtn = e.target.closest('[data-page-period-year]')
  if (yearBtn) {
    const context = yearBtn.dataset.pagePeriodContext
    const cfg = getPagePeriodConfig(context)
    if (!cfg?.isActive()) return false
    e.preventDefault()
    const year = Number(yearBtn.dataset.pagePeriodYear)
    if (!Number.isFinite(year)) return true
    cfg.period.year = year
    const [, month = String(new Date().getMonth() + 1).padStart(2, '0')] = (
      cfg.period.monthKey || getCurrentOrderShopMonthKey()
    ).split('-')
    cfg.period.monthKey = `${year}-${month}`
    cfg.period.yearPickerOpen = false
    cfg.onChange?.(cfg.period.monthKey)
    render()
    return true
  }

  const monthBtn = e.target.closest('[data-page-period-month]')
  if (monthBtn) {
    const context = monthBtn.dataset.pagePeriodContext
    const cfg = getPagePeriodConfig(context)
    if (!cfg?.isActive()) return false
    e.preventDefault()
    cfg.period.monthKey = monthBtn.dataset.pagePeriodMonth || null
    const [yearPart] = (cfg.period.monthKey || '').split('-')
    if (yearPart) cfg.period.year = Number(yearPart)
    cfg.period.pickerOpen = false
    cfg.period.yearPickerOpen = false
    cfg.onChange?.(cfg.period.monthKey)
    render()
    return true
  }

  return false
}

function initPagePeriodHandlers() {
  if (document.body.dataset.pagePeriodHandlers === '1') return
  document.body.dataset.pagePeriodHandlers = '1'

  document.addEventListener('click', (e) => {
    if (handlePagePeriodClick(e)) return

    for (const context of ['orderShop', 'product', 'accounting', 'accounts', 'advertising', 'finance']) {
      const cfg = getPagePeriodConfig(context)
      if (!cfg?.isActive()) continue
      const period = cfg.period
      if (period.yearPickerOpen && !e.target.closest(`[data-page-period-anchor="${context}"] .order-shop-period-year-wrap`)) {
        period.yearPickerOpen = false
        render()
        return
      }
      if (period.pickerOpen && !e.target.closest(`[data-page-period-anchor="${context}"]`)) {
        period.pickerOpen = false
        period.yearPickerOpen = false
        render()
        return
      }
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    for (const context of ['orderShop', 'product', 'accounting', 'accounts', 'advertising', 'finance']) {
      const cfg = getPagePeriodConfig(context)
      if (!cfg?.isActive()) continue
      const period = cfg.period
      if (period.yearPickerOpen) {
        e.preventDefault()
        period.yearPickerOpen = false
        render()
        return
      }
      if (period.pickerOpen) {
        e.preventDefault()
        period.pickerOpen = false
        render()
        return
      }
    }
    const advertisingModal = document.getElementById('advertisingExpenseModal')
    if (activeNav === 'advertising' && advertisingModal && !advertisingModal.classList.contains('is-hidden')) {
      e.preventDefault()
      closeAdvertisingExpenseModal()
    }
  })
}

function initAccountingNavLinks() {
  const content = document.getElementById('content')
  if (!content || content.dataset.accountingNav === '1') return
  content.dataset.accountingNav = '1'
  content.addEventListener('click', (e) => {
    if (activeNav !== 'accounting') return

    const backBtn = e.target.closest('[data-accounting-back]')
    if (backBtn) {
      e.preventDefault()
      accountingSubPage = null
      orderShopPeriodPickerOpen = false
      orderShopYearPickerOpen = false
      expandedOrderTxCommentId = null
      orderShopDeleteMode = false
      searchQuery = ''
      const searchInput = document.getElementById('searchInput')
      if (searchInput) {
        searchInput.value = ''
        searchInput.placeholder = SEARCH_PLACEHOLDERS.accounting
      }
      render()
      persistAppNavState()
      return
    }

    const bazarioBtn = e.target.closest('[data-go-accounting]')
    if (bazarioBtn) {
      e.preventDefault()
      accountingSubPage = bazarioBtn.dataset.goAccounting || null
      resetPagePeriodToCurrentMonth(accountingPagePeriod)
      const now = new Date()
      orderShopAccountingYear = now.getFullYear()
      orderShopAccountingMonthKey = getCurrentMonthKey(now)
      orderShopPeriodPickerOpen = false
      orderShopYearPickerOpen = false
      searchQuery = ''
      const searchInput = document.getElementById('searchInput')
      if (searchInput) {
        searchInput.value = ''
        searchInput.placeholder = 'Пошук транзакцій...'
      }
      render()
      persistAppNavState()
      return
    }

    if (isOrderShopAccountingPage()) return

    const btn = e.target.closest('[data-go-nav]')
    if (!btn) return
    e.preventDefault()
    accountingSubPage = null
    orderShopPeriodPickerOpen = false
    orderShopYearPickerOpen = false
    expandedOrderTxCommentId = null
    orderShopDeleteMode = false
    activeNav = btn.dataset.goNav
    financeDetailPage = null
    activeFinanceMonthKey = null
    searchQuery = ''
    const searchInput = document.getElementById('searchInput')
    if (searchInput) {
      searchInput.value = ''
      searchInput.placeholder = SEARCH_PLACEHOLDERS[activeNav]
    }
    renderNav({ animate: true })
    render()
    persistAppNavState()
  })
}

function renderHome() {
  const stats = db.getStats()
  const onlineEmptyHint = window.BazarioSync?.isReady?.() && !stats.productsCount && !stats.financeExpenses && !db.list('orderTransactions').length
    ? `<div class="empty-hint home-online-empty-hint">База порожня. Якщо дані були на localhost — увійдіть тим самим email. Або додайте товари / фінанси вручну.</div>`
    : ''
  return `
    ${onlineEmptyHint}
    <div class="home-greeting" data-searchable>
      <h1 class="greeting-title">Вітаємо, <span class="name-highlight">${escapeHtml(db.getFirstName())}</span></h1>
      <div class="team" title="${escapeHtml(db.getFullName())}">
        <span class="team-avatar">${profileInitials()}</span>
      </div>
    </div>
    <div class="grid">
      <div class="row-top">${stockCard(stats)}${gaugeCard(stats)}${incomeCard()}</div>
      <div class="row-bottom">
        <div>${movementsCard(stats.recentMovements)}</div>
        <div class="col-right">${tasksPreviewCard()}${financeSummaryCard(stats)}</div>
      </div>
    </div>`
}

// ——— CRUD page builder ———
function crudPage({ title, subtitle, storageKey, fields, columns, emptyText, formId = '', submitLabel = 'Зберегти', filterFn, mutable = true }) {
  const items = db.list(storageKey)
  const q = searchQuery.toLowerCase()
  const filtered = q
    ? items.filter((item) => (filterFn ? filterFn(item, q) : JSON.stringify(item).toLowerCase().includes(q)))
    : items

  const formFields = fields.map((f) => {
    if (f.type === 'html') return f.html
    if (f.type === 'select-static') {
      const opts = f.options.map((o) => `<option value="${o.value}">${escapeHtml(o.label)}</option>`).join('')
      return `<label class="form-field"><span>${f.label}</span><select name="${f.name}" ${f.required ? 'required' : ''}>${opts}</select></label>`
    }
    if (f.type === 'select') {
      const opts = f.options(db.list(f.optionsFrom)).map((o) =>
        `<option value="${o.value}">${escapeHtml(o.label)}</option>`).join('')
      return `<label class="form-field"><span>${f.label}</span><select name="${f.name}" ${f.required ? 'required' : ''}><option value="">—</option>${opts}</select></label>`
    }
    const val = f.defaultValue != null ? ` value="${escapeHtml(String(f.defaultValue))}"` : ''
    return `<label class="form-field"><span>${f.label}</span><input type="${f.type || 'text'}" name="${f.name}" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''}${val} /></label>`
  }).join('')

  const rows = filtered.length
    ? filtered.map((item) => {
        const cells = columns.map((c) => `<td>${c.render(item)}</td>`).join('')
        return `<tr data-id="${item.id}" data-search="${escapeHtml(columns.map((c) => c.searchValue?.(item) ?? '').join(' '))}">
          ${cells}
          <td class="td-actions"><button type="button" class="btn-icon btn-delete" data-delete="${item.id}" data-storage="${storageKey}" title="Видалити">×</button></td>
        </tr>`
      }).join('')
    : `<tr><td colspan="${columns.length + 1}" class="empty-cell">${emptyText}</td></tr>`

  return `
    ${pageHeader(title, subtitle)}
    <div class="page-layout">
      <section class="card form-card" data-searchable>
        <div class="card-head"><h2>Додати</h2></div>
        <form class="crud-form" data-storage="${storageKey}" ${formId ? `id="${formId}"` : ''}>
          <div class="form-grid">${formFields}</div>
          <button type="submit" class="btn-primary">${submitLabel}</button>
        </form>
      </section>
      <section class="card table-card" data-searchable>
        <div class="card-head"><h2>Список</h2><span class="count-badge">${filtered.length}</span></div>
        <div class="table-wrap">
          <table class="data-table">
            <thead><tr>${columns.map((c) => `<th>${c.label}</th>`).join('')}<th></th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </section>
    </div>`
}

function renderWarehouse() {
  pruneOrphanedUkraineFromZakupka()
  const items = db.list('warehouses')
  if (warehouseDetailId) {
    const warehouse = db.get('warehouses', warehouseDetailId)
    if (!warehouse) {
      warehouseDetailId = null
      return renderWarehouse()
    }
    return `
    <div class="warehouse-page" data-searchable>
      ${renderWarehouseDetailPage(warehouse)}
      ${renderWarehouseAddModal()}
    </div>`
  }
  return `
    <div class="warehouse-page" data-searchable>
      ${warehousePageHeader()}
      ${renderWarehouseTilesGrid(items)}
      ${renderWarehouseAddModal()}
    </div>`
}

function warehouseTileMeta(warehouse, { capacityLabel, incomingCount, outgoingCount, productCount } = {}) {
  const cap = capacityLabel ?? warehouseUkraineCapacityLabel(warehouse)
  const incoming = incomingCount ?? listWarehouseIncomingEvents(warehouse).length
  const outgoing = outgoingCount ?? listWarehouseOutgoingEvents(warehouse).length
  const products = productCount ?? listWarehouseProductsForName(warehouse?.name).length
  const productLabel = products === 1 ? '1 товар' : `${products} товарів`
  return `${cap} шт. · ${productLabel} · ${incoming} надход. · ${outgoing} видат.`
}

function warehouseIsNovaPoshta(warehouse) {
  return String(warehouse?.name || '').trim().toLowerCase().includes('нова пошта')
}

function warehouseLinkCardClass(warehouse, index) {
  if (warehouseIsNovaPoshta(warehouse)) return 'warehouse-link-card--nova-poshta'
  return `warehouse-link-card--tone-${index % 3}`
}

function warehouseTileSearchText(warehouse) {
  const capacityLabel = warehouseUkraineCapacityLabel(warehouse)
  const valueLabel = warehouseUkraineValueLabel(warehouse)
  const incoming = listWarehouseIncomingEvents(warehouse)
  const outgoing = listWarehouseOutgoingEvents(warehouse)
  const movementSearch = [...incoming, ...outgoing]
    .map((ev) => `${ev.dateLabel} ${ev.productName || ''} ${ev.qty || ''} ${ev.extraSearch || ''} ${ev.client || ''} ${ev.shop || ''}`)
    .join(' ')
  return `${warehouse.name} ${warehouse.address || ''} ${capacityLabel} ${valueLabel} ${warehouseTileMeta(warehouse, {
    capacityLabel,
    incomingCount: incoming.length,
    outgoingCount: outgoing.length,
  })} ${movementSearch}`
}

function renderWarehouseTileCard(warehouse, index) {
  const capacityLabel = warehouseUkraineCapacityLabel(warehouse)
  const valueLabel = warehouseUkraineValueLabel(warehouse)
  const meta = warehouseTileMeta(warehouse, { capacityLabel })
  const cardClass = warehouseLinkCardClass(warehouse, index)
  return `<button type="button" class="warehouse-link-card ${cardClass}" data-go-warehouse="${warehouse.id}" data-warehouse-id="${warehouse.id}" data-search="${escapeHtml(warehouseTileSearchText(warehouse))}">
        <div class="warehouse-link-head">
          <h2 class="warehouse-link-title">${escapeHtml(warehouse.name || '—')}</h2>
          <span class="warehouse-link-arrow" aria-hidden="true">→</span>
        </div>
        <p class="warehouse-link-desc">${escapeHtml(warehouse.address || 'Адреса не вказана')}</p>
        <strong class="warehouse-link-amount">${escapeHtml(valueLabel)}</strong>
        <p class="warehouse-link-meta">${escapeHtml(meta)}</p>
      </button>`
}

function renderWarehouseTilesGrid(items) {
  const q = searchQuery.toLowerCase()
  const filtered = q
    ? items.filter((item) => warehouseTileSearchText(item).toLowerCase().includes(q))
    : items

  const tiles = filtered.length
    ? filtered.map((item, index) => renderWarehouseTileCard(item, index)).join('')
    : ''

  const linksSection = tiles
    ? `<section class="warehouse-links-section">
        <div class="warehouse-links-grid">${tiles}</div>
      </section>`
    : ''

  const empty = !linksSection ? '<p class="empty-hint">Складів ще немає.</p>' : ''

  return `${linksSection}${empty}`
}

function renderWarehouseDetailPage(warehouse) {
  const capacityLabel = warehouseUkraineCapacityLabel(warehouse)
  const valueLabel = warehouseUkraineValueLabel(warehouse)
  const meta = warehouseTileMeta(warehouse, { capacityLabel })
  const isEditing = editingWarehouseId === warehouse.id
  const headerMain = isEditing
    ? `<div class="warehouse-detail-edit-fields">
        <label class="warehouse-detail-edit-field">
          <span class="warehouse-detail-edit-label">Назва</span>
          <input type="text" class="table-input warehouse-field-input" data-warehouse-field="name" value="${escapeHtml(warehouse.name || '')}" required aria-label="Назва" />
        </label>
        <label class="warehouse-detail-edit-field">
          <span class="warehouse-detail-edit-label">Адреса</span>
          <input type="text" class="table-input warehouse-field-input" data-warehouse-field="address" value="${escapeHtml(warehouse.address || '')}" required aria-label="Адреса" />
        </label>
      </div>`
    : `<div class="warehouse-detail-head-main">
        <h1 class="page-title warehouse-detail-title">${escapeHtml(warehouse.name || '—')}</h1>
        <p class="page-sub warehouse-detail-address">${escapeHtml(warehouse.address || 'Адреса не вказана')}</p>
      </div>`

  const actions = isEditing
    ? ''
    : `<div class="warehouse-detail-actions">
        <button type="button" class="btn-icon btn-edit-inline" data-edit-warehouse="${warehouse.id}" title="Редагувати" aria-label="Редагувати">✎</button>
        <button type="button" class="btn-icon btn-delete" data-delete="${warehouse.id}" data-storage="warehouses" title="Видалити">×</button>
      </div>`

  return `
    <div class="warehouse-detail-page" data-warehouse-id="${warehouse.id}" data-search="${escapeHtml(warehouseTileSearchText(warehouse))}">
      <div class="page-header warehouse-detail-header">
        <button type="button" class="btn-link finance-back-btn" data-warehouse-back>← Склад</button>
        <div class="warehouse-detail-head-row${isEditing ? ' warehouse-detail-editing' : ''}" data-id="${warehouse.id}">
          ${headerMain}
          <div class="warehouse-detail-summary">
            <div class="warehouse-detail-stat">
              <span class="warehouse-detail-stat-label">Залишок</span>
              <strong class="warehouse-detail-stat-value warehouse-detail-capacity">${escapeHtml(capacityLabel)}</strong>
            </div>
            <div class="warehouse-detail-stat">
              <span class="warehouse-detail-stat-label">Вартість</span>
              <strong class="warehouse-detail-stat-value warehouse-detail-value">${escapeHtml(valueLabel)}</strong>
            </div>
            <p class="warehouse-detail-meta">${escapeHtml(meta)}</p>
          </div>
          ${actions}
        </div>
      </div>
      ${renderWarehouseMovementPanel(warehouse)}
    </div>`
}

function warehouseMovementLineTotal(qty, unitCost) {
  const q = Number(qty)
  const cost = Number(unitCost)
  if (!Number.isFinite(q) || !Number.isFinite(cost) || q === 0 || cost === 0) return '—'
  return productMoneyLabel(q * cost)
}

function renderWarehouseMovementPanel(warehouse) {
  const incoming = listWarehouseIncomingEvents(warehouse)
  const outgoing = listWarehouseOutgoingEvents(warehouse)
  const incomingRows = incoming.map((ev) => `
    <div class="warehouse-movement-line warehouse-movement-line--in">
      <span>${escapeHtml(ev.dateLabel)}</span>
      <span>${escapeHtml(ev.productName)}</span>
      <span>${escapeHtml(fmt(ev.qty))}</span>
      <span>${escapeHtml(ev.unitCostLabel)}</span>
      <span>${escapeHtml(warehouseMovementLineTotal(ev.qty, ev.unitCost))}</span>
    </div>`).join('')
  const outgoingRows = outgoing.map((ev) => `
    <div class="warehouse-movement-line warehouse-movement-line--out">
      <span>${escapeHtml(ev.dateLabel)}</span>
      <span>${escapeHtml(ev.productName)}</span>
      <span>${escapeHtml(ev.client)}</span>
      <span>${escapeHtml(fmt(ev.qty))}</span>
      <span>${escapeHtml(ev.unitCostLabel)}</span>
      <span>${escapeHtml(ev.shop)}</span>
    </div>`).join('')
  return `
    <div class="warehouse-detail-panel">
      ${warehouseMovementSection(
    'Надходження з закупки',
    'in',
    ['Дата', 'Товар', 'Кількість', 'Собівартість', 'Усього'],
    incomingRows,
    'Надходжень ще немає',
  )}
      ${warehouseMovementSection(
    'Видаток з обліку',
    'out',
    ['Дата', 'Товар', 'Клієнт', 'К-ть', 'Собівартість', 'Магазин'],
    outgoingRows,
    'Видатків ще немає',
  )}
    </div>`
}

function warehousePageHeader() {
  return `
    <div class="page-header page-header-row">
      <div>
        <h1 class="page-title">Склад</h1>
        <p class="page-sub">Оберіть склад, щоб переглянути рух товарів</p>
      </div>
      <button type="button" class="btn-primary" id="addWarehouseBtn">Додати</button>
    </div>`
}

function warehouseEventSortTime(raw) {
  if (!raw) return 0
  const d = new Date(raw)
  if (!Number.isNaN(d.getTime())) return d.getTime()
  const dot = String(raw).match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
  if (dot) return new Date(Number(dot[3]), Number(dot[2]) - 1, Number(dot[1])).getTime()
  return 0
}

function listWarehouseProductsForName(warehouseName) {
  const name = String(warehouseName || '').trim()
  if (!name) return []
  return listProductsByCatalog('ukraine').filter((product) => {
    if (shouldRemoveUkraineAfterZakupkaDeletion(product)) return false
    return productUkraineWarehouseValue(product) === name
  })
}

function listWarehouseIncomingEvents(warehouse) {
  const events = []
  listWarehouseProductsForName(warehouse?.name).forEach((product) => {
    listUkraineReplenishmentEvents(product).forEach((ev) => {
      events.push({
        ...ev,
        productName: productDisplayName(product) || '—',
      })
    })
  })
  return events.sort((a, b) => warehouseEventSortTime(b.dateRaw) - warehouseEventSortTime(a.dateRaw))
}

function listWarehouseOutgoingEvents(warehouse) {
  const fifoCostByTxId = buildOrderTransactionFifoCostLookup()
  const events = []
  listWarehouseProductsForName(warehouse?.name).forEach((product) => {
    orderTransactionsForProduct(product).forEach((tx) => {
      const productName = orderTransactionProductName(tx) || productDisplayName(product) || '—'
      const qty = orderTransactionQtyValue(tx)
      const unitCost = orderTransactionUnitCostForMargin(tx, fifoCostByTxId)
      events.push({
        dateRaw: tx.date || tx.createdAt,
        dateLabel: formatOrderTransactionDateLabel(tx),
        productName,
        client: tx.firstName || '—',
        shop: orderTransactionShopValue(tx),
        qty,
        unitCostLabel: unitCost != null && Number.isFinite(unitCost) ? productMoneyLabel(unitCost) : '—',
        extraSearch: `${productName} ${tx.firstName || ''} ${tx.shop || ''}`,
      })
    })
  })
  return events.sort((a, b) => warehouseEventSortTime(b.dateRaw) - warehouseEventSortTime(a.dateRaw))
}

function warehouseMovementSection(title, tone, headers, rowsHtml, emptyText) {
  return `
    <section class="warehouse-movement-section warehouse-movement-section--${tone}">
      <h3 class="warehouse-movement-title">${escapeHtml(title)}</h3>
      ${rowsHtml
    ? `<div class="warehouse-movement-table-wrap">
          <div class="warehouse-movement-line warehouse-movement-line--header warehouse-movement-line--${tone}" aria-hidden="true">
            ${headers.map((h) => `<span>${escapeHtml(h)}</span>`).join('')}
          </div>
          ${rowsHtml}
        </div>`
    : `<p class="warehouse-movement-empty">${escapeHtml(emptyText)}</p>`}
    </section>`
}

function ukraineWarehouseNameOptions() {
  return db.list('warehouses')
    .map((warehouse) => String(warehouse.name || '').trim())
    .filter(Boolean)
}

function warehouseUkraineCapacity(warehouse) {
  const name = String(warehouse?.name || '').trim()
  if (!name) return 0
  return listProductsByCatalog('ukraine').reduce((sum, product) => {
    if (shouldRemoveUkraineAfterZakupkaDeletion(product)) return sum
    if (productUkraineWarehouseValue(product) !== name) return sum
    return sum + productUkraineActualStock(product)
  }, 0)
}

function warehouseUkraineCapacityLabel(warehouse) {
  const qty = warehouseUkraineCapacity(warehouse)
  return Number.isFinite(qty) ? fmt(qty) : '—'
}

function warehouseUkraineValue(warehouse) {
  const name = String(warehouse?.name || '').trim()
  if (!name) return 0
  return listProductsByCatalog('ukraine').reduce((sum, product) => {
    if (shouldRemoveUkraineAfterZakupkaDeletion(product)) return sum
    if (productUkraineWarehouseValue(product) !== name) return sum
    const stock = productUkraineActualStock(product)
    if (!stock) return sum
    const unitCost = Number(productUkraineUnitCost(product)) || 0
    return sum + stock * unitCost
  }, 0)
}

function warehouseUkraineValueLabel(warehouse) {
  return productMoneyLabel(warehouseUkraineValue(warehouse))
}

function syncWarehouseCapacityDisplays() {
  if (activeNav !== 'warehouse') return
  db.list('warehouses').forEach((warehouse) => {
    const capacityLabel = warehouseUkraineCapacityLabel(warehouse)
    const valueLabel = warehouseUkraineValueLabel(warehouse)
    const meta = warehouseTileMeta(warehouse, { capacityLabel })
    const searchText = warehouseTileSearchText(warehouse)

    document.querySelectorAll(`.warehouse-link-card[data-warehouse-id="${warehouse.id}"]`).forEach((card) => {
      card.dataset.search = searchText
      const amountEl = card.querySelector('.warehouse-link-amount')
      if (amountEl) amountEl.textContent = valueLabel
      const metaEl = card.querySelector('.warehouse-link-meta')
      if (metaEl) metaEl.textContent = meta
    })

    const detailPage = document.querySelector(`.warehouse-detail-page[data-warehouse-id="${warehouse.id}"]`)
    if (!detailPage) return
    detailPage.dataset.search = searchText
    const capacityEl = detailPage.querySelector('.warehouse-detail-capacity')
    if (capacityEl) capacityEl.textContent = capacityLabel
    const valueEl = detailPage.querySelector('.warehouse-detail-value')
    if (valueEl) valueEl.textContent = valueLabel
    const metaEl = detailPage.querySelector('.warehouse-detail-meta')
    if (metaEl) metaEl.textContent = meta
  })
}

function syncUkraineWarehouseName(oldName, newName) {
  const prev = String(oldName || '').trim()
  const next = String(newName || '').trim()
  if (!prev || prev === next) return
  listProductsByCatalog('ukraine').forEach((product) => {
    if (productUkraineWarehouseValue(product) !== prev) return
    db.update('products', product.id, { ukraineWarehouse: next })
  })
}

function saveWarehouseRowFromDom(row) {
  const id = row?.dataset?.id
  if (!id) return false
  const current = db.get('warehouses', id)
  if (!current) return false
  const name = row.querySelector('[data-warehouse-field="name"]')?.value.trim()
  const address = row.querySelector('[data-warehouse-field="address"]')?.value.trim()
  if (!name || !address) return false
  const updated = db.update('warehouses', id, { name, address })
  if (updated) syncUkraineWarehouseName(current.name, name)
  return Boolean(updated)
}

function renderWarehouseAddModal() {
  return `
    <div class="modal-overlay is-hidden" id="warehouseModal" aria-hidden="true">
      <div class="modal card" role="dialog" aria-labelledby="warehouseModalTitle">
        <div class="card-head modal-head">
          <h2 id="warehouseModalTitle">Додати</h2>
          <button type="button" class="btn-icon modal-close" id="warehouseModalClose" aria-label="Закрити">×</button>
        </div>
        <form class="crud-form" data-storage="warehouses" id="addWarehouseForm">
          <div class="form-grid form-grid-single">
            <label class="form-field"><span>Назва</span><input type="text" name="name" required placeholder="Назва складу" /></label>
            <label class="form-field"><span>Адреса</span><input type="text" name="address" required placeholder="Адреса" /></label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" id="warehouseModalCancel">Скасувати</button>
            <button type="submit" class="btn-primary">Зберегти</button>
          </div>
        </form>
      </div>
    </div>`
}

function getProductCatalogMode() {
  return PRODUCT_CATALOG_MODES[productCatalogMode] || PRODUCT_CATALOG_MODES.zakupka
}

function restoreProductCatalogMode() {
  try {
    const raw = localStorage.getItem(PRODUCT_CATALOG_STORAGE_KEY)
    if (raw && PRODUCT_CATALOG_MODES[raw]) productCatalogMode = raw
  } catch (_) {}
}

function persistProductCatalogMode() {
  try {
    localStorage.setItem(PRODUCT_CATALOG_STORAGE_KEY, productCatalogMode)
  } catch (_) {}
}

function renderProductCatalogPicker() {
  const current = getProductCatalogMode()
  return `
    <div class="product-catalog-picker-wrap monthly-year-picker-wrap">
      <button type="button" class="monthly-year-trigger finance-dash-title product-catalog-trigger" data-product-catalog-toggle
        aria-haspopup="listbox" aria-expanded="${productCatalogPickerOpen ? 'true' : 'false'}" aria-label="Обрати розділ товару">
        <span>${escapeHtml(current.title)}</span>
        <svg class="monthly-year-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="monthly-year-menu product-catalog-menu${productCatalogPickerOpen ? '' : ' is-hidden'}" role="listbox" aria-label="Розділи товару">
        ${Object.values(PRODUCT_CATALOG_MODES).map((mode) => `
          <button type="button" role="option" class="monthly-year-option product-catalog-option${mode.id === productCatalogMode ? ' is-selected' : ''}"
            data-product-catalog="${mode.id}" aria-selected="${mode.id === productCatalogMode ? 'true' : 'false'}">
            ${escapeHtml(mode.title)}
          </button>`).join('')}
      </div>
    </div>`
}

function productPageHeader() {
  const current = getProductCatalogMode()
  const monthKey = resolveProductPagePeriodMonthKey()
  const addBtn = isProductZakupkaCatalog()
    ? `<div class="product-page-add-actions">
        <button type="button" class="btn-primary" id="addProductBtn">Додати закупку</button>
        <button type="button" class="btn-secondary" id="addProductStockBtn">Додати залишок</button>
      </div>`
    : ''
  return `
    <div class="page-header page-header-row">
      <div>
        <div class="product-page-title-row page-period-row">
          ${renderProductCatalogPicker()}
          ${renderPagePeriodLabelButton(productPagePeriod, 'product', monthKey)}
        </div>
        <p class="page-sub">${escapeHtml(current.sub)}</p>
      </div>
      ${addBtn}
    </div>`
}

function getProductWarehouseOptions(includeEmpty = false) {
  const warehouses = db.list('warehouses').map((w) => ({ value: w.id, label: w.name }))
  if (includeEmpty) return [{ value: '', label: '—' }, ...warehouses]
  return warehouses
}

function productWarehouseLabel(product) {
  return db.get('warehouses', product.warehouseId)?.name || '—'
}

function productQtyLabel(product) {
  const qty = productDisplayQty(product)
  return Number.isFinite(qty) ? `${fmt(qty)} шт.` : '—'
}

function migrateProductCatalogField() {
  db.list('products').forEach((p) => {
    if (p.catalog !== 'ukraine' && p.catalog !== 'zakupka') {
      db.update('products', p.id, { catalog: 'zakupka' })
    }
  })
}

function migrateOrderTransactionStatusHistory() {
  try {
    if (localStorage.getItem(ORDER_TX_STATUS_HISTORY_KEY)) return
  } catch (_) {
    return
  }

  db.list('orderTransactions').forEach((tx) => {
    if (Array.isArray(tx.statusHistory) && tx.statusHistory.length) return
    const status = orderTransactionStatusValue(tx)
    const at = tx.createdAt || tx.date || tx.updatedAt || new Date().toISOString()
    db.update('orderTransactions', tx.id, { statusHistory: [{ status, at }] })
  })

  try {
    localStorage.setItem(ORDER_TX_STATUS_HISTORY_KEY, '1')
  } catch (_) {}
}

function migrateOrderTransactionCatalogPrices() {
  try {
    if (localStorage.getItem(ORDER_TX_CATALOG_PRICE_KEY)) return
  } catch (_) {
    return
  }

  db.list('orderTransactions').forEach((tx) => {
    const catalogPrice = orderTransactionUnitPriceFromCatalog(tx)
    if (!catalogPrice) return
    const qty = orderTransactionQtyValue(tx)
    const lineTotal = qty * catalogPrice
    db.update('orderTransactions', tx.id, {
      unitPrice: catalogPrice,
      unitPriceDisplay: amountInputFieldDisplay(catalogPrice),
      amount: lineTotal,
      amountDisplay: lineTotal ? amountInputFieldDisplay(lineTotal) : '',
    })
  })

  try {
    localStorage.setItem(ORDER_TX_CATALOG_PRICE_KEY, '1')
  } catch (_) {}
}

function productCatalogOf(product) {
  return product?.catalog === 'ukraine' ? 'ukraine' : 'zakupka'
}

function listProductsByCatalog(catalog = productCatalogMode) {
  return db.list('products').filter((p) => productCatalogOf(p) === catalog)
}

function productSkuKey(sku) {
  return String(sku || '').trim().toLowerCase()
}

function findUkraineProductByZakupka(zakupka) {
  if (!zakupka?.id) return null
  return listProductsByCatalog('ukraine').find((p) => p.zakupkaProductId === zakupka.id) || null
}

function findUkraineProductBySku(sku) {
  const key = productSkuKey(sku)
  if (!key) return null
  return listProductsByCatalog('ukraine').find((p) => productSkuKey(p.sku) === key) || null
}

function findUkraineProductsLinkedToZakupka(zakupka) {
  if (!zakupka) return []
  const linked = new Map()
  if (zakupka.id) {
    listProductsByCatalog('ukraine')
      .filter((product) => product.zakupkaProductId === zakupka.id)
      .forEach((product) => linked.set(product.id, product))
  }
  const sku = String(zakupka.sku || '').trim() || zakupkaSkuFromName(zakupka.name)
  const skuKey = productSkuKey(sku)
  if (skuKey) {
    listProductsByCatalog('ukraine')
      .filter((product) => productSkuKey(product.sku) === skuKey)
      .forEach((product) => linked.set(product.id, product))
  }
  return [...linked.values()]
}

function removeUkraineRecordsForZakupka(zakupka, { syncWarehouse = true } = {}) {
  syncUkraineProductsFromZakupkaArrivals()
  if (syncWarehouse) syncWarehouseCapacityDisplays()
}

function isStandaloneUkraineProduct(product) {
  return productCatalogOf(product) === 'ukraine' && !product.zakupkaProductId
}

function isUkraineProductLinkedToLiveZakupka(product) {
  if (productCatalogOf(product) !== 'ukraine') return false
  if (isStandaloneUkraineProduct(product)) return true
  return listZakupkaProductsForSku(product.sku).length > 0
}

function shouldRemoveUkraineAfterZakupkaDeletion(product) {
  if (productCatalogOf(product) !== 'ukraine') return false
  if (isStandaloneUkraineProduct(product)) return false
  if (ukraineManualStockQty(product) > 0) return false
  if (productUkraineTotalStock(product) > 0) return false
  if (productUkraineOrderReservedQty(product) > 0) return false
  return listZakupkaProductsForSku(product.sku).length === 0
}

function pruneOrphanedUkraineFromZakupka() {
  let removed = false
  listProductsByCatalog('ukraine').forEach((product) => {
    if (!shouldRemoveUkraineAfterZakupkaDeletion(product)) return
    db.remove('products', product.id)
    removed = true
  })
  if (removed) syncWarehouseCapacityDisplays()
  return removed
}

function syncUkraineRemovalAfterZakupkaStockChange(zakupka) {
  if (!zakupka || productCatalogOf(zakupka) !== 'zakupka') return
  removeUkraineRecordsForZakupka(zakupka)
}

function findZakupkaProductBySku(sku) {
  const key = productSkuKey(sku)
  if (!key) return null
  return listZakupkaProductsForSku(sku)[0] || null
}

function listZakupkaProductsForSku(sku) {
  const key = productSkuKey(sku)
  if (!key) return []
  return listProductsByCatalog('zakupka').filter((product) => {
    const productSku = String(product.sku || '').trim() || zakupkaSkuFromName(product.name)
    return productSkuKey(productSku) === key
  })
}

function productZakupkaTableTotal(product) {
  const withLines = ensureProductZakupkaLines(product)
  const lines = withLines?.lines || []
  if (lines.length) return productZakupkaLinesTotal(lines)
  const purchase = Number(product.purchasePrice) || 0
  const qty = Number(product.qty) || 0
  const logistics = Number(product.logistics) || 0
  const delivery = Number(product.commission) || 0
  return purchase * qty + logistics + delivery
}

function productLineZakupkaTotal(line) {
  const purchase = Number(line?.purchasePrice) || 0
  const qty = Number(line?.qty) || 0
  const logistics = Number(line?.logistics) || 0
  const delivery = Number(line?.commission) || 0
  return purchase * qty + logistics + delivery
}

/** Сума: закупка × кількість + доставка (без логістики). */
function productLineZakupkaSum(line) {
  const purchase = Number(line?.purchasePrice) || 0
  const qty = Number(line?.qty) || 0
  const delivery = Number(line?.commission) || 0
  return purchase * qty + delivery
}

function productZakupkaLinesSum(lines) {
  return (lines || []).reduce((sum, line) => sum + productLineZakupkaSum(line), 0)
}

function productZakupkaTableSum(product) {
  const withLines = ensureProductZakupkaLines(product)
  const lines = withLines?.lines || []
  if (lines.length) return productZakupkaLinesSum(lines)
  const purchase = Number(product.purchasePrice) || 0
  const qty = Number(product.qty) || 0
  const delivery = Number(product.commission) || 0
  return purchase * qty + delivery
}

function productZakupkaGrandTotalLabel() {
  return '—'
}

function productZakupkaDateValue(product, field, line = null) {
  const source = productZakupkaLineSource(line, product)
  const raw = source?.[field]
  if (!raw) return ''
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(raw))) return String(raw)
  return productLineDateValue({ date: raw })
}

function formatZakupkaDateDisplay(isoDate) {
  const raw = String(isoDate || '').trim()
  if (!raw) return '—'
  const m = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (!m) return raw
  return `${m[3]}.${m[2]}.${m[1].slice(-2)}`
}

function productZakupkaDateDisplay(product, field, line = null) {
  return formatZakupkaDateDisplay(productZakupkaDateValue(product, field, line))
}

/** Total = вартість + вартість логістики + логістика по Україні + розміщення */
function productZakupkaAmountLabel(value) {
  const n = Number(value)
  if (!Number.isFinite(n) || n === 0) return '—'
  return amountInputDisplay(n)
}

function productZakupkaQtyValue(product) {
  if (product?._manualStockLine) {
    return productZakupkaLineQtyValue(product._manualStockLine)
  }
  return Math.max(0, Number(product?.qty) || 0)
}

function productZakupkaLineQtyValue(line) {
  return Math.max(0, Number(line?.qty) || 0)
}

function productZakupkaLineSource(line, product) {
  if (line && isUkraineManualStockLine(line)) {
    return manualStockLineZakupkaView(line)
  }
  return line || product
}

function productZakupkaPurchaseDisplayValue(product, line = null) {
  const source = productZakupkaLineSource(line, product)
  const cost = Number(source?.purchasePrice) || 0
  const qty = line ? productZakupkaLineQtyValue(line) : productZakupkaQtyValue(product)
  if (zakupkaPurchaseDisplayMode === 'unit') return cost
  return cost * qty
}

function productZakupkaWeightValue(product, line = null) {
  const source = productZakupkaLineSource(line, product)
  return Math.max(0, Number(source?.weight) || 0)
}

function productZakupkaLogisticsUnitValue(product, line = null) {
  const source = productZakupkaLineSource(line, product)
  return Number(source?.logistics) || 0
}

function productZakupkaLogisticsBaseValue(product, line = null) {
  const source = productZakupkaLineSource(line, product)
  return productZakupkaLogisticsUnitValue(product, line) * Math.max(0, Number(source?.weight) || 0)
}

function productZakupkaLogisticsValueUnitStored(product, line = null) {
  const source = productZakupkaLineSource(line, product)
  return Number(source?.logisticsValue) || 0
}

function productZakupkaLogisticsValueDisplayValue(product, line = null) {
  const unit = productZakupkaLogisticsValueUnitStored(product, line)
  const qty = line ? productZakupkaLineQtyValue(line) : productZakupkaQtyValue(product)
  if (zakupkaLogisticsValueDisplayMode === 'unit') return unit
  return unit * qty
}

function productZakupkaLogisticsValueLabel(product, line = null) {
  const n = productZakupkaLogisticsValueDisplayValue(product, line)
  if (!Number.isFinite(n) || n === 0) return ''
  return amountInputDisplay(n)
}

function productZakupkaLogisticsPriceDisplayValue(product, line = null) {
  return productZakupkaLogisticsUnitValue(product, line)
}

function productZakupkaLogisticsPriceLabel(product, line = null) {
  const n = productZakupkaLogisticsUnitValue(product, line)
  if (!Number.isFinite(n) || n === 0) return '—'
  return `${amountInputDisplay(n)} у.е./кг`
}

function productZakupkaWeightLabel(product, line = null) {
  const w = productZakupkaWeightValue(product, line)
  if (!Number.isFinite(w) || w === 0) return '—'
  return `${amountInputDisplay(w)} кг`
}

function productZakupkaPlacementUnitValue(product, line = null) {
  const source = productZakupkaLineSource(line, product)
  return Number(source?.placement) || 0
}

function productZakupkaPlacementTotalValue(product, line = null) {
  const unit = productZakupkaPlacementUnitValue(product, line)
  const qty = line ? productZakupkaLineQtyValue(line) : productZakupkaQtyValue(product)
  return unit * qty
}

function productZakupkaPlacementDisplayValue(product, line = null) {
  if (zakupkaPlacementDisplayMode === 'unit') {
    return productZakupkaPlacementUnitValue(product, line)
  }
  return productZakupkaPlacementTotalValue(product, line)
}

function productZakupkaPlacementAmountLabel(product, line = null) {
  const n = productZakupkaPlacementDisplayValue(product, line)
  if (!Number.isFinite(n) || n === 0) return '—'
  const amount = amountInputDisplay(n)
  if (zakupkaPlacementDisplayMode === 'unit') return `${amount} шт.`
  return amount
}

function productZakupkaUkraineLogisticsUnitValue(product, line = null) {
  const source = productZakupkaLineSource(line, product)
  return Number(source?.ukraineLogistics) || 0
}

function productZakupkaUkraineLogisticsAmountLabel(product, line = null) {
  return productZakupkaAmountLabel(productZakupkaUkraineLogisticsUnitValue(product, line))
}

function productZakupkaTotalUnitValue(source) {
  const purchase = Number(source?.purchasePrice) || 0
  const logisticsValue = Number(source?.logisticsValue) || 0
  const ukraineLogistics = Number(source?.ukraineLogistics) || 0
  const placement = Number(source?.placement) || 0
  return purchase + logisticsValue + ukraineLogistics + placement
}

function productZakupkaLineTotal(line, mode = zakupkaTotalDisplayMode) {
  if (line && isUkraineManualStockLine(line)) {
    const hasManualTotal = line.manualTotal != null && line.manualTotal !== ''
    const manualTotal = Number(line.manualTotal)
    if (hasManualTotal && Number.isFinite(manualTotal)) {
      if (mode === 'unit') {
        const qty = productZakupkaLineQtyValue(line)
        return qty > 0 ? manualTotal / qty : manualTotal
      }
      return manualTotal
    }
  }
  const unit = productZakupkaTotalUnitValue(line)
  if (mode === 'unit') return unit
  return unit * productZakupkaLineQtyValue(line)
}

function productZakupkaTotalComponentValue(product, field, mode = zakupkaTotalDisplayMode, line = null) {
  const source = productZakupkaLineSource(line, product)
  const qty = line ? productZakupkaLineQtyValue(line) : productZakupkaQtyValue(product)
  let unit = 0
  if (field === 'purchasePrice') unit = Number(source?.purchasePrice) || 0
  else if (field === 'logisticsValue') unit = productZakupkaLogisticsValueUnitStored(product, line)
  else if (field === 'ukraineLogistics') unit = Number(source?.ukraineLogistics) || 0
  else if (field === 'placement') unit = Number(source?.placement) || 0
  if (mode === 'unit') return unit
  return unit * qty
}

function productZakupkaTotal(product, mode = zakupkaTotalDisplayMode) {
  if (!product) return 0
  if (product?._manualStockLine) {
    return productZakupkaLineTotal(manualStockLineZakupkaView(product._manualStockLine), mode)
  }
  const withLines = ensureProductZakupkaLines(product)
  const lines = withLines?.lines || []
  if (lines.length) {
    const allTotal = lines.reduce((sum, line) => sum + productZakupkaLineTotal(line, 'all'), 0)
    if (mode === 'unit') {
      const qty = productZakupkaQtyValue(withLines)
      return qty > 0 ? allTotal / qty : productZakupkaLineTotal(lines[0], 'unit')
    }
    return allTotal
  }
  if (mode === 'unit') return productZakupkaTotalUnitValue(product)
  return productZakupkaTotalUnitValue(product) * productZakupkaQtyValue(product)
}

function productZakupkaTotalTitle(product) {
  const qty = productZakupkaQtyValue(product)
  const formula = ' (вартість + вартість логістики + логістика по Україні + розміщення)'
  if (zakupkaTotalDisplayMode === 'unit') {
    return qty > 0
      ? `Total за 1 шт. (кількість у рядку: ${qty})${formula}`
      : `Total за 1 шт.${formula}`
  }
  return qty > 0
    ? `Total за ${qty} шт.${formula}`
    : `Total за всю кількість${formula}`
}

function productZakupkaTotalLabel(product) {
  return productZakupkaAmountLabel(productZakupkaTotal(product))
}

function zakupkaColModeRef(key) {
  if (key === 'purchase') {
    return {
      get: () => zakupkaPurchaseDisplayMode,
      set: (v) => { zakupkaPurchaseDisplayMode = v },
      storageKey: ZAKUPKA_PURCHASE_MODE_KEY,
    }
  }
  if (key === 'total') {
    return {
      get: () => zakupkaTotalDisplayMode,
      set: (v) => { zakupkaTotalDisplayMode = v },
      storageKey: ZAKUPKA_TOTAL_MODE_KEY,
    }
  }
  if (key === 'placement') {
    return {
      get: () => zakupkaPlacementDisplayMode,
      set: (v) => { zakupkaPlacementDisplayMode = v },
      storageKey: ZAKUPKA_PLACEMENT_MODE_KEY,
    }
  }
  if (key === 'logisticsValue') {
    return {
      get: () => zakupkaLogisticsValueDisplayMode,
      set: (v) => { zakupkaLogisticsValueDisplayMode = v },
      storageKey: ZAKUPKA_LOGISTICS_VALUE_MODE_KEY,
    }
  }
  return null
}

function restoreZakupkaColDisplayModes() {
  ;['purchase', 'logisticsValue', 'placement', 'total'].forEach((key) => {
    const ref = zakupkaColModeRef(key)
    if (!ref) return
    try {
      const raw = localStorage.getItem(ref.storageKey)
      if (raw === 'all' || raw === 'unit') ref.set(raw)
    } catch (_) {}
  })
}

function toggleZakupkaColDisplayMode(key) {
  const ref = zakupkaColModeRef(key)
  if (!ref) return
  ref.set(ref.get() === 'all' ? 'unit' : 'all')
  try {
    localStorage.setItem(ref.storageKey, ref.get())
  } catch (_) {}
}

function productZakupkaColToggleTitle(key) {
  const names = {
    purchase: 'Вартість',
    logisticsValue: 'Вартість логістики',
    placement: 'Розміщення',
    total: 'Total',
  }
  const name = names[key] || key
  const isUnit = zakupkaColModeRef(key)?.get() === 'unit'
  return isUnit
    ? `${name} за 1 шт. Натисніть, щоб показати за всю кількість`
    : `${name} за всю кількість. Натисніть, щоб показати за 1 шт.`
}

function syncAllZakupkaColDisplays() {
  document.querySelectorAll('tr.product-zakupka-row[data-product-id]').forEach((row) => {
    const productId = row.dataset.productId
    const product = db.get('products', productId)
    if (product) syncProductZakupkaRow(productId, product)
  })
  document.querySelectorAll('[data-zakupka-col-toggle]').forEach((toggle) => {
    const key = toggle.dataset.zakupkaColToggle
    if (!key) return
    const isUnit = zakupkaColModeRef(key)?.get() === 'unit'
    const title = productZakupkaColToggleTitle(key)
    toggle.title = title
    toggle.setAttribute('aria-label', title)
    toggle.classList.toggle('product-zakupka-col-toggle--unit', isUnit)
    toggle.classList.toggle('product-zakupka-col-toggle--all', !isUnit)
  })
}

function productZakupkaSearchText(product) {
  return [
    product.name,
    product.sku,
    ...(Array.isArray(product.extraSkus) ? product.extraSkus : []),
    product.purchasePrice,
    product.qty,
    product.weight,
    productZakupkaDateValue(product, 'paymentDate'),
    productZakupkaDateValue(product, 'shippingDate'),
    productZakupkaDateValue(product, 'arrivalDate'),
    product.logisticsType,
    product.logistics,
    product.logisticsValue,
    product.ukraineLogistics,
    product.placement,
    productZakupkaTotal(product),
  ].filter((v) => v != null && v !== '').join(' ')
}

function zakupkaSkuFromName(name) {
  const key = productSkuKey(name)
  return key || String(name || '').trim().slice(0, 64)
}

function productLineDateValue(line) {
  const raw = line?.date || line?.paymentDate
  if (!raw) return ''
  if (/^\d{4}-\d{2}-\d{2}$/.test(String(raw))) return String(raw)
  try {
    const d = new Date(raw)
    if (Number.isNaN(d.getTime())) return ''
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  } catch {
    return ''
  }
}

function createProductLineFromProduct(product) {
  const base = {
    id: `line_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    date: productDateInputValue(product) || '',
    logistics: Number(product.logistics) || 0,
    commission: Number(product.commission) || 0,
    warehouseId: product.warehouseId || null,
  }
  if (productCatalogOf(product) === 'ukraine') {
    return {
      ...base,
      price: Number(product.price) || 0,
      qty: Number(product.qty) || 0,
      unitCost: Number(product.unitCost) || 0,
    }
  }
  return {
    ...base,
    sku: product.sku || zakupkaSkuFromName(product.name) || '',
    qty: Number(product.qty) || 0,
    weight: Number(product.weight) || 0,
    purchasePrice: Number(product.purchasePrice) || 0,
    paymentDate: product.paymentDate || productZakupkaDateValue(product, 'paymentDate') || '',
    shippingDate: product.shippingDate || '',
    arrivalDate: product.arrivalDate || '',
    logisticsType: product.logisticsType || '',
    logisticsValue: Number(product.logisticsValue) || 0,
    ukraineLogistics: Number(product.ukraineLogistics) || 0,
    placement: Number(product.placement) || 0,
    date: product.paymentDate || productZakupkaDateValue(product, 'paymentDate') || productDateInputValue(product) || '',
  }
}

function createEmptyProductLine(catalog = 'zakupka') {
  const base = {
    id: `line_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    date: '',
    logistics: 0,
    commission: 0,
    warehouseId: null,
  }
  if (catalog === 'ukraine') {
    return { ...base, price: 0, qty: 0, unitCost: 0 }
  }
  return {
    ...base,
    sku: '',
    qty: 0,
    weight: 0,
    purchasePrice: 0,
    paymentDate: '',
    shippingDate: '',
    arrivalDate: '',
    logisticsType: '',
    logisticsValue: 0,
    ukraineLogistics: 0,
    placement: 0,
  }
}

function sortProductLines(lines) {
  return [...lines].sort((a, b) => {
    const da = productLineDateValue(a)
    const db = productLineDateValue(b)
    const ta = da ? new Date(`${da}T12:00:00`).getTime() : 0
    const tb = db ? new Date(`${db}T12:00:00`).getTime() : 0
    if (tb !== ta) return tb - ta
    return String(b.id).localeCompare(String(a.id))
  })
}

function computeProductAggregateFromZakupkaLines(lines) {
  const sorted = sortProductLines(lines)
  const primary = sorted[0] || {}
  let totalQty = 0
  let purchaseSum = 0
  let totalWeight = 0
  lines.forEach((line) => {
    const qty = Number(line.qty) || 0
    totalQty += qty
    purchaseSum += (Number(line.purchasePrice) || 0) * qty
    totalWeight += Number(line.weight) || 0
  })
  return {
    qty: totalQty,
    weight: totalWeight,
    purchasePrice: totalQty > 0 ? purchaseSum / totalQty : Number(primary.purchasePrice) || 0,
    paymentDate: primary.paymentDate || '',
    shippingDate: primary.shippingDate || '',
    arrivalDate: primary.arrivalDate || '',
    logisticsType: primary.logisticsType || '',
    logistics: Number(primary.logistics) || 0,
    logisticsValue: Number(primary.logisticsValue) || 0,
    ukraineLogistics: Number(primary.ukraineLogistics) || 0,
    placement: Number(primary.placement) || 0,
    sku: primary.sku || '',
    warehouseId: primary.warehouseId || null,
    date: productLineDateValue(primary) ? `${productLineDateValue(primary)}T12:00:00.000Z` : null,
  }
}

function computeProductAggregateFromLines(lines) {
  const sorted = sortProductLines(lines)
  const primary = sorted.find((line) => productLineDateValue(line)) || sorted[0] || {}
  let totalQty = 0
  let purchaseSum = 0
  let logisticsSum = 0
  let commissionSum = 0
  let sku = ''
  lines.forEach((line) => {
    const qty = Number(line.qty) || 0
    const purchase = Number(line.purchasePrice) || 0
    totalQty += qty
    purchaseSum += purchase * qty
    logisticsSum += Number(line.logistics) || 0
    commissionSum += Number(line.commission) || 0
    if (!sku && line.sku) sku = line.sku
  })
  const weightedPurchase = totalQty > 0 ? purchaseSum / totalQty : 0
  return {
    qty: totalQty,
    purchasePrice: weightedPurchase,
    logistics: logisticsSum,
    commission: commissionSum,
    sku: primary.sku || sku || '',
    warehouseId: primary.warehouseId || null,
    date: productLineDateValue(primary) ? `${productLineDateValue(primary)}T12:00:00.000Z` : null,
    price: productTotalUnitPrice({
      purchasePrice: weightedPurchase,
      logistics: logisticsSum,
      commission: commissionSum,
    }),
  }
}

function computeProductAggregateFromUkraineLines(lines) {
  const sorted = sortProductLines(lines)
  const primary = sorted.find((line) => productLineDateValue(line)) || sorted[0] || {}
  let logisticsSum = 0
  let qtySum = 0
  lines.forEach((line) => {
    logisticsSum += Number(line.logistics) || 0
    qtySum += Number(line.qty) || 0
  })
  return {
    qty: qtySum,
    logistics: logisticsSum,
    commission: Number(primary.commission) || 0,
    price: Number(primary.price) || 0,
    warehouseId: primary.warehouseId || null,
    date: productLineDateValue(primary) ? `${productLineDateValue(primary)}T12:00:00.000Z` : null,
  }
}

function enrichZakupkaLineFromProduct(line, product) {
  return {
    ...line,
    sku: line.sku || product.sku || zakupkaSkuFromName(product.name) || '',
    qty: line.qty != null ? Number(line.qty) || 0 : Number(product.qty) || 0,
    weight: line.weight != null ? Number(line.weight) || 0 : Number(product.weight) || 0,
    purchasePrice: line.purchasePrice != null ? Number(line.purchasePrice) || 0 : Number(product.purchasePrice) || 0,
    paymentDate: line.paymentDate || product.paymentDate || productZakupkaDateValue(product, 'paymentDate') || '',
    shippingDate: line.shippingDate || product.shippingDate || '',
    arrivalDate: line.arrivalDate || product.arrivalDate || '',
    logisticsType: line.logisticsType || product.logisticsType || '',
    logistics: line.logistics != null ? Number(line.logistics) || 0 : Number(product.logistics) || 0,
    logisticsValue: line.logisticsValue != null ? Number(line.logisticsValue) || 0 : Number(product.logisticsValue) || 0,
    ukraineLogistics: line.ukraineLogistics != null ? Number(line.ukraineLogistics) || 0 : Number(product.ukraineLogistics) || 0,
    placement: line.placement != null ? Number(line.placement) || 0 : Number(product.placement) || 0,
    date: productLineDateValue(line) || line.paymentDate || product.paymentDate || productZakupkaDateValue(product, 'paymentDate') || '',
  }
}

function ensureProductZakupkaLines(product) {
  if (!product || productCatalogOf(product) !== 'zakupka') return product
  if (Array.isArray(product.lines) && product.lines.length) {
    const needsEnrich = product.lines.some((line) => !Object.prototype.hasOwnProperty.call(line, 'logisticsValue'))
    if (needsEnrich) {
      const lines = product.lines.map((line) => enrichZakupkaLineFromProduct(line, product))
      const updated = syncProductLinesUpdate(product.id, lines)
      return updated || product
    }
    return product
  }
  const line = enrichZakupkaLineFromProduct(createProductLineFromProduct(product), product)
  const updated = db.update('products', product.id, { lines: [line] })
  return updated || product
}

function ensureProductUkraineLines(product) {
  if (!product || productCatalogOf(product) !== 'ukraine') return product
  if (Array.isArray(product.lines)) {
    if (product.lines.length) {
      const needsQty = product.lines.some((line) => line.qty == null)
      if (needsQty) {
        const lines = product.lines.map((line, index) => ({
          ...line,
          qty: line.qty != null ? Number(line.qty) || 0 : (index === 0 ? Number(product.qty) || 0 : 0),
        }))
        const updated = syncProductLinesUpdate(product.id, lines)
        return updated || product
      }
      return product
    }
    return product
  }
  const line = createProductLineFromProduct(product)
  const updated = db.update('products', product.id, { lines: [line] })
  return updated || product
}

function ensureProductLines(product) {
  if (productCatalogOf(product) === 'ukraine') return ensureProductUkraineLines(product)
  return ensureProductZakupkaLines(product)
}

function syncProductLinesUpdate(productId, lines, previousSku = '') {
  const current = db.get('products', productId)
  if (!current) return null
  const catalog = productCatalogOf(current)
  const aggregate = catalog === 'ukraine'
    ? computeProductAggregateFromUkraineLines(lines)
    : catalog === 'zakupka'
      ? computeProductAggregateFromZakupkaLines(lines)
      : computeProductAggregateFromLines(lines)
  const updated = db.update('products', productId, { ...aggregate, lines })
  if (updated && catalog === 'zakupka') {
    syncUkraineRecordsFromZakupka(updated)
  }
  return updated
}

function productLatestZakupkaLine(product) {
  if (productCatalogOf(product) !== 'zakupka') return null
  const withLines = ensureProductZakupkaLines(product)
  const lines = sortProductLines(withLines.lines || [])
  return lines[0] || null
}

function productZakupkaPrimaryLine(product) {
  if (product?._manualStockLine) {
    return manualStockLineZakupkaView(product._manualStockLine)
  }
  return productLatestZakupkaLine(product)
}

function productZakupkaPreviousLine(product) {
  if (productCatalogOf(product) !== 'zakupka') return null
  const withLines = ensureProductZakupkaLines(product)
  const lines = sortProductLines(withLines.lines || [])
  return lines[1] || null
}

function productZakupkaLineFieldCompareAmount(product, line, field) {
  if (!line) return 0
  const source = productZakupkaLineSource(line, product)
  if (field === 'purchasePrice') return Number(source?.purchasePrice) || 0
  if (field === 'logistics') return Number(source?.logistics) || 0
  if (field === 'logisticsValue') return productZakupkaLogisticsValueDisplayValue(product, line)
  if (field === 'ukraineLogistics') return productZakupkaUkraineLogisticsUnitValue(product, line)
  if (field === 'placement') return productZakupkaPlacementDisplayValue(product, line)
  return 0
}

function productZakupkaCompareIndicatorMarkup(current, prev) {
  if (!Number.isFinite(current) || !Number.isFinite(prev) || current === prev) return ''
  const higherThanPrev = current > prev
  const cls = higherThanPrev ? 'product-line-compare--bad' : 'product-line-compare--good'
  const arrow = higherThanPrev ? '↑' : '↓'
  const title = higherThanPrev ? 'Вище за попередній рядок' : 'Нижче за попередній рядок'
  return `<span class="product-line-compare ${cls}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">${arrow}</span>`
}

function productZakupkaPreviousLineForLine(product, line) {
  if (!line) return null
  const withLines = ensureProductZakupkaLines(product)
  const lines = sortProductLines(withLines.lines || [])
  const index = lines.findIndex((entry) => entry.id === line.id)
  if (index < 0 || index >= lines.length - 1) return null
  return lines[index + 1]
}

function productZakupkaLineCompareIndicator(product, line, field) {
  if (!ZAKUPKA_COLLAPSED_COMPARE_FIELDS.includes(field)) return ''
  const previous = productZakupkaPreviousLineForLine(product, line)
  if (!line || !previous) return ''
  const current = productZakupkaLineFieldCompareAmount(product, line, field)
  const prev = productZakupkaLineFieldCompareAmount(product, previous, field)
  return productZakupkaCompareIndicatorMarkup(current, prev)
}

function productZakupkaCollapsedCompareIndicator(product, field) {
  if (!ZAKUPKA_COLLAPSED_COMPARE_FIELDS.includes(field)) return ''
  const primary = productZakupkaPrimaryLine(product)
  const previous = productZakupkaPreviousLine(product)
  if (!primary || !previous) return ''
  const current = productZakupkaLineFieldCompareAmount(product, primary, field)
  const prev = productZakupkaLineFieldCompareAmount(product, previous, field)
  return productZakupkaCompareIndicatorMarkup(current, prev)
}

function productZakupkaDetailFieldWithCompare(product, line, field, contentHtml) {
  const indicator = productZakupkaLineCompareIndicator(product, line, field)
  if (!indicator) return contentHtml
  return `<span class="product-detail-field-with-compare" data-zakupka-compare-wrap="${field}">${contentHtml}${indicator}</span>`
}

function updateProductLine(productId, lineId, patch) {
  const product = db.get('products', productId)
  if (!product?.lines?.length) return null
  const previousSku = product.sku || ''
  const lines = product.lines.map((line) => (line.id === lineId ? { ...line, ...patch } : line))
  return syncProductLinesUpdate(productId, lines, previousSku)
}

function addProductLine(productId) {
  const product = ensureProductLines(db.get('products', productId))
  if (!product) return null
  const catalog = productCatalogOf(product)
  const emptyLine = createEmptyProductLine(catalog)
  if (catalog === 'zakupka') {
    emptyLine.sku = product.sku || zakupkaSkuFromName(product.name) || ''
    emptyLine.paymentDate = new Date().toISOString().slice(0, 10)
    emptyLine.date = emptyLine.paymentDate
  }
  const lines = [...(product.lines || []), emptyLine]
  return syncProductLinesUpdate(productId, lines)
}

function clearExpandedProductAfterDelete(productId) {
  if (!productId) return
  if (expandedProductId === productId || String(expandedProductId || '').startsWith(`${productId}:`)) {
    expandedProductId = null
  }
}

function removeUkraineManualStockLine(productId, lineId) {
  const product = db.get('products', productId)
  if (!product || productCatalogOf(product) !== 'ukraine') return null
  const line = getProductLine(product, lineId)
  if (!line || !isUkraineManualStockLine(line)) return null
  const previousSku = product.sku || ''
  const remainingLines = (product.lines || []).filter((l) => l.id !== lineId)
  if (!remainingLines.length) {
    db.remove('products', productId)
    return { deleted: true, id: productId }
  }
  return syncProductLinesUpdate(productId, remainingLines, previousSku)
}

function removeZakupkaProductLine(productId, lineId) {
  const product = db.get('products', productId)
  if (!product || productCatalogOf(product) !== 'zakupka') return null
  const line = getProductLine(product, lineId)
  if (!line) return null
  if ((product.lines || []).length <= 1) {
    removeUkraineRecordsForZakupka(product)
    db.remove('products', productId)
    pruneOrphanedUkraineFromZakupka()
    return { deleted: true, id: productId }
  }
  const lines = product.lines.filter((l) => l.id !== lineId)
  return syncProductLinesUpdate(productId, lines, product.sku || '')
}

function removeProductLine(productId, lineId) {
  const product = db.get('products', productId)
  if (!product) return null
  const line = getProductLine(product, lineId)
  if (!line) return null
  if (productCatalogOf(product) === 'ukraine' && isUkraineManualStockLine(line)) {
    return removeUkraineManualStockLine(productId, lineId)
  }
  if (productCatalogOf(product) === 'zakupka') {
    return removeZakupkaProductLine(productId, lineId)
  }
  if ((product.lines || []).length <= 1) return null
  const lines = (product.lines || []).filter((l) => l.id !== lineId)
  if (lines.length === (product.lines || []).length) return null
  return syncProductLinesUpdate(productId, lines, product.sku || '')
}

function getProductLine(product, lineId) {
  return product?.lines?.find((line) => line.id === lineId) || null
}

function productUkraineLinkedPurchasePrice(product) {
  const linked = productLinkedZakupka(product)
  if (!linked) return null
  return productZakupkaTableTotal(linked)
}

function productDisplayName(product) {
  if (productCatalogOf(product) === 'ukraine') {
    const linked = productLinkedZakupka(product)
    if (linked?.name) return linked.name
  }
  return product.name || '—'
}

function productDisplaySku(product) {
  if (productCatalogOf(product) === 'ukraine') {
    const linked = productLinkedZakupka(product)
    if (linked?.sku) return linked.sku
  }
  return product.sku || '—'
}

function productDisplayQty(product) {
  if (productCatalogOf(product) === 'ukraine') {
    return Math.max(0, productUkraineAccountingQty(product) - productUkraineOrderReservedQty(product))
  }
  return Number(product.qty) || 0
}

function createUkraineLineFromZakupkaLine(zakupkaLine, zakupkaProduct, existingUkraineLine = null) {
  const arrivalDate = productZakupkaDateValue(zakupkaProduct, 'arrivalDate', zakupkaLine)
  return {
    id: existingUkraineLine?.id || `line_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    zakupkaProductId: zakupkaProduct.id,
    zakupkaLineId: zakupkaLine.id,
    date: arrivalDate || productLineDateValue(zakupkaLine),
    qty: productZakupkaLineQtyValue(zakupkaLine),
    logistics: Number(existingUkraineLine?.logistics) || 0,
    commission: Number(existingUkraineLine?.commission) || 0,
    price: Number(existingUkraineLine?.price) || 0,
    warehouseId: zakupkaLine.warehouseId ?? existingUkraineLine?.warehouseId ?? null,
  }
}

function isUkraineManualStockLine(line) {
  return Boolean(line) && !line.zakupkaProductId && !line.zakupkaLineId
}

function ukraineManualStockLines(product) {
  const withLines = ensureProductUkraineLines(product)
  return (withLines.lines || []).filter(isUkraineManualStockLine)
}

function ukraineManualStockQty(product) {
  return ukraineManualStockLines(product).reduce((sum, line) => sum + (Number(line.qty) || 0), 0)
}

function createUkraineManualStockLine({ date = '', qty = 0, unitCost = 0, manualTotal = null, warehouseId = null } = {}) {
  const line = {
    ...createEmptyProductLine('ukraine'),
    date: date || '',
    qty: Math.max(0, Number(qty) || 0),
    unitCost: Number(unitCost) || 0,
    warehouseId: warehouseId || null,
  }
  if (manualTotal != null && manualTotal !== '') {
    const total = Number(manualTotal)
    if (Number.isFinite(total)) line.manualTotal = total
  }
  return line
}

function listUkraineManualStockEvents(product) {
  return ukraineManualStockLines(product).map((line) => {
    const unitCost = manualStockLineUnitCost(line)
    const dateRaw = productLineDateValue(line)
    return {
      lineId: line.id,
      dateRaw,
      dateLabel: formatZakupkaDateDisplay(dateRaw),
      qty: Number(line.qty) || 0,
      unitCost,
      unitCostLabel: productMoneyLabel(unitCost),
      extraSearch: `${unitCost} ${manualStockLineTotalValue(line)}`,
      source: 'manual',
    }
  })
}

function syncUkraineLinesFromAllZakupkas(ukraineProduct) {
  if (!ukraineProduct) return null
  const sku = String(ukraineProduct.sku || '').trim() || productDisplaySku(ukraineProduct)
  const skuKey = productSkuKey(sku)
  if (!skuKey) return ukraineProduct

  const existingUkraine = ensureProductUkraineLines(ukraineProduct)
  const existingLines = existingUkraine.lines || []
  const manualLines = existingLines.filter(isUkraineManualStockLine)
  const byKey = new Map(
    existingLines
      .filter((line) => line.zakupkaProductId && line.zakupkaLineId)
      .map((line) => [`${line.zakupkaProductId}:${line.zakupkaLineId}`, line]),
  )

  const syncedLines = []
  listZakupkaProductsForSku(sku).forEach((zakupka) => {
    const withLines = ensureProductZakupkaLines(zakupka)
    zakupkaArrivedLines(withLines).forEach((zLine) => {
      const key = `${withLines.id}:${zLine.id}`
      const matched = byKey.get(key) || null
      syncedLines.push(createUkraineLineFromZakupkaLine(zLine, withLines, matched))
    })
  })

  const mergedLines = [...manualLines, ...syncedLines]
  mergedLines.sort((a, b) => {
    const ta = productLineDateValue(a) ? new Date(`${productLineDateValue(a)}T12:00:00`).getTime() : 0
    const tb = productLineDateValue(b) ? new Date(`${productLineDateValue(b)}T12:00:00`).getTime() : 0
    if (tb !== ta) return tb - ta
    return String(b.id).localeCompare(String(a.id))
  })

  const latest = productUkraineLatestArrivedZakupkaLine(ukraineProduct)
  const aggregate = computeProductAggregateFromUkraineLines(mergedLines)
  const zakupkaStock = listZakupkaProductsForSku(sku).reduce((sum, zakupka) => sum + zakupkaArrivedStockQty(zakupka), 0)
  const manualQty = manualLines.reduce((sum, line) => sum + (Number(line.qty) || 0), 0)
  return db.update('products', ukraineProduct.id, {
    ...aggregate,
    qty: zakupkaStock + manualQty,
    lines: mergedLines,
    zakupkaProductId: latest?.zakupka?.id || ukraineProduct.zakupkaProductId || null,
  })
}

function syncUkraineLinesFromZakupka(zakupka, ukraineProduct = null) {
  const ukraine = ukraineProduct || findUkraineProductBySku(zakupka?.sku)
  if (!ukraine || !zakupka) return null
  return syncUkraineLinesFromAllZakupkas(ukraine)
}

function productLinkedZakupka(product) {
  if (productCatalogOf(product) !== 'ukraine') return null
  const latest = productUkraineLatestArrivedZakupkaLine(product)
  if (latest?.zakupka) return latest.zakupka
  if (product.zakupkaProductId) {
    const byId = db.get('products', product.zakupkaProductId)
    if (byId && productCatalogOf(byId) === 'zakupka') return byId
  }
  return findZakupkaProductBySku(product.sku)
}

function productUkraineLatestArrivedZakupkaLine(product) {
  const sku = product?.sku || productDisplaySku(product)
  if (!productSkuKey(sku)) return null
  let best = null
  let bestTime = 0
  listZakupkaProductsForSku(sku).forEach((zakupka) => {
    const withLines = ensureProductZakupkaLines(zakupka)
    zakupkaArrivedLines(withLines).forEach((line) => {
      const dateRaw = productZakupkaDateValue(withLines, 'arrivalDate', line)
      const time = warehouseEventSortTime(dateRaw)
      if (time > bestTime || (time === bestTime && !best)) {
        bestTime = time
        best = { zakupka: withLines, line }
      }
    })
  })
  return best
}

function listUkraineReplenishmentEvents(product) {
  const sku = product?.sku || productDisplaySku(product)
  const events = listUkraineManualStockEvents(product)
  listZakupkaProductsForSku(sku).forEach((zakupka) => {
    const withLines = ensureProductZakupkaLines(zakupka)
    zakupkaArrivedLines(withLines).forEach((line) => {
      const dateRaw = productZakupkaDateValue(withLines, 'arrivalDate', line)
      const unitCost = productZakupkaTotalUnitValue(line)
      events.push({
        dateRaw,
        dateLabel: formatZakupkaDateDisplay(dateRaw),
        qty: productZakupkaLineQtyValue(line),
        unitCost,
        unitCostLabel: productMoneyLabel(unitCost),
        extraSearch: `${unitCost}`,
        source: 'zakupka',
      })
    })
  })
  return events.sort((a, b) => warehouseEventSortTime(b.dateRaw) - warehouseEventSortTime(a.dateRaw))
}

function zakupkaLineHasArrival(product, line) {
  return Boolean(productZakupkaDateValue(product, 'arrivalDate', line))
}

function zakupkaArrivedLines(zakupka) {
  const withLines = ensureProductZakupkaLines(zakupka)
  return sortProductLines(withLines.lines || []).filter((line) => zakupkaLineHasArrival(withLines, line))
}

function zakupkaArrivedStockQty(zakupka) {
  return zakupkaArrivedLines(zakupka).reduce((sum, line) => sum + productZakupkaLineQtyValue(line), 0)
}

function zakupkaPrimaryArrivedLine(zakupka) {
  return zakupkaArrivedLines(zakupka)[0] || null
}

function productUkraineUnitCost(product) {
  const events = listUkraineReplenishmentEvents(product)
  if (events.length) {
    const unitCost = Number(events[0].unitCost)
    return Number.isFinite(unitCost) ? unitCost : 0
  }
  const zakupka = productLinkedZakupka(product)
  if (!zakupka) return null
  const line = zakupkaPrimaryArrivedLine(zakupka)
  const unit = line ? productZakupkaTotalUnitValue(line) : productZakupkaTotalUnitValue(zakupka)
  return Number.isFinite(unit) ? unit : null
}

function buildUkraineReplenishmentFifoLayers(product) {
  const layers = listUkraineReplenishmentEvents(product)
    .map((event, index) => ({
      id: event.lineId || `${event.source}-${event.dateRaw}-${index}`,
      sortTime: warehouseEventSortTime(event.dateRaw),
      unitCost: Number(event.unitCost) || 0,
      qty: Math.max(0, Number(event.qty) || 0),
      remaining: Math.max(0, Number(event.qty) || 0),
    }))
    .filter((layer) => layer.qty > 0)
    .sort((a, b) => {
      if (a.sortTime !== b.sortTime) return a.sortTime - b.sortTime
      return String(a.id).localeCompare(String(b.id))
    })

  if (layers.length) return layers

  const fallbackCost = productUkraineUnitCost(product)
  const totalQty = productUkraineTotalStock(product)
  if (fallbackCost != null && Number.isFinite(fallbackCost) && totalQty > 0) {
    return [{
      id: 'fallback',
      sortTime: 0,
      unitCost: fallbackCost,
      qty: totalQty,
      remaining: totalQty,
    }]
  }
  return []
}

function orderTransactionFifoSortTime(tx) {
  const raw = tx?.date || tx?.createdAt
  if (!raw) return 0
  const time = new Date(raw).getTime()
  return Number.isFinite(time) ? time : 0
}

function runUkraineFifoSimulation(product) {
  const layers = buildUkraineReplenishmentFifoLayers(product).map((layer) => ({ ...layer }))
  const fallbackCost = productUkraineUnitCost(product)
  const transactions = orderTransactionsForProduct(product)
    .slice()
    .sort((a, b) => {
      const ta = orderTransactionFifoSortTime(a)
      const tb = orderTransactionFifoSortTime(b)
      if (ta !== tb) return ta - tb
      return String(a.id).localeCompare(String(b.id))
    })

  const costsByTxId = new Map()
  transactions.forEach((tx) => {
    let qtyNeeded = orderTransactionQtyValue(tx)
    let totalCost = 0
    let allocatedQty = 0

    layers.forEach((layer) => {
      if (qtyNeeded <= 0 || layer.remaining <= 0) return
      const take = Math.min(qtyNeeded, layer.remaining)
      totalCost += take * layer.unitCost
      allocatedQty += take
      layer.remaining -= take
      qtyNeeded -= take
    })

    if (qtyNeeded > 0 && fallbackCost != null && Number.isFinite(fallbackCost)) {
      totalCost += qtyNeeded * fallbackCost
      allocatedQty += qtyNeeded
    }

    const unitCost = allocatedQty > 0 ? totalCost / allocatedQty : null
    costsByTxId.set(tx.id, {
      unitCost: unitCost != null && Number.isFinite(unitCost) ? unitCost : null,
      totalCost: Number.isFinite(totalCost) ? totalCost : null,
    })
  })

  const activeLayer = layers.find((layer) => layer.remaining > 0) || layers[layers.length - 1] || null
  return { layers, costsByTxId, activeLayer, fallbackCost }
}

function computeUkraineOrderTransactionFifoCosts(product) {
  return runUkraineFifoSimulation(product).costsByTxId
}

function productUkraineActiveUnitCost(product) {
  const { activeLayer, fallbackCost } = runUkraineFifoSimulation(product)
  if (activeLayer && Number.isFinite(activeLayer.unitCost)) return activeLayer.unitCost
  return productUkraineUnitCost(product)
}

function productUkraineActiveUnitCostLabel(product) {
  return productMoneyLabel(productUkraineActiveUnitCost(product))
}

function productUkraineActiveMarginProm(product) {
  if (productUkraineHasManualMargin(product, 'marginProm')) {
    return productUkraineManualMarginValue(product, 'marginProm')
  }
  return productUkraineCalculatedMarginProm(product, { useActiveCost: true })
}

function productUkraineActiveMarginRozetka(product) {
  if (productUkraineHasManualMargin(product, 'marginRozetka')) {
    return productUkraineManualMarginValue(product, 'marginRozetka')
  }
  return productUkraineCalculatedMarginRozetka(product, { useActiveCost: true })
}

function productUkraineActiveUnitCostCompareIndicator(product) {
  const { layers, activeLayer } = runUkraineFifoSimulation(product)
  if (!activeLayer || layers.length < 2) return ''
  const activeIndex = layers.findIndex((layer) => layer.id === activeLayer.id)
  if (activeIndex <= 0) return ''
  const prev = layers[activeIndex - 1]
  return productUnitCostCompareIndicatorMarkup(activeLayer.unitCost, prev.unitCost)
}

function productUkraineActiveMarginForLayer(product, field, unitCost) {
  if (field === 'marginRozetka') {
    return productUkraineMarketplaceMargin(
      product.priceRozetka,
      unitCost,
      product.commissionRozetka,
    )
  }
  return productUkraineMarketplaceMargin(
    product.priceProm,
    unitCost,
    product.commissionProm,
  )
}

function productMarginCompareIndicatorMarkup(current, prev, { label = 'Маржа' } = {}) {
  if (!Number.isFinite(current) || !Number.isFinite(prev) || prev === 0 || current === prev) return ''
  const higherThanPrev = current > prev
  const cls = higherThanPrev ? 'product-line-compare--good' : 'product-line-compare--bad'
  const arrow = higherThanPrev ? '↑' : '↓'
  const pct = Math.abs(((current - prev) / prev) * 100)
  const pctLabel = productPercentLabel(pct)
  const prevLabel = formatProductMarginMoney(prev)
  const currentLabel = formatProductMarginMoney(current)
  const title = higherThanPrev
    ? `${label} зросла на ${pctLabel} (${prevLabel} → ${currentLabel})`
    : `${label} зменшилась на ${pctLabel} (${prevLabel} → ${currentLabel})`
  return `<span class="product-line-compare ${cls}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">${arrow} ${escapeHtml(pctLabel)}</span>`
}

function productUkraineActiveMarginCompareIndicator(product, field) {
  if (productUkraineHasManualMargin(product, field)) return ''
  const { layers, activeLayer } = runUkraineFifoSimulation(product)
  if (!activeLayer || layers.length < 2) return ''
  const activeIndex = layers.findIndex((layer) => layer.id === activeLayer.id)
  if (activeIndex <= 0) return ''
  const prevLayer = layers[activeIndex - 1]
  const current = productUkraineActiveMarginForLayer(product, field, activeLayer.unitCost)
  const previous = productUkraineActiveMarginForLayer(product, field, prevLayer.unitCost)
  const label = field === 'marginRozetka' ? 'Маржа Rozetka' : 'Маржа Prom'
  return productMarginCompareIndicatorMarkup(current, previous, { label })
}

function productUkraineCollapsedCompareIndicator(product, field) {
  if (field === 'cost') return productUkraineActiveUnitCostCompareIndicator(product)
  if (field === 'marginProm' || field === 'marginRozetka') {
    return productUkraineActiveMarginCompareIndicator(product, field)
  }
  return ''
}

function orderTransactionCommissionPct(product, tx) {
  const priceField = ukraineProductShopPriceField(orderTransactionShopValue(tx))
  const commissionField = priceField === 'priceRozetka' ? 'commissionRozetka' : 'commissionProm'
  return productUkraineCommissionPctValue(product?.[commissionField])
}

function productUkraineOrderTransactionFifoMarginLabel(product, tx, fifoUnitCost) {
  const unitPrice = orderTransactionUnitPrice(tx)
  if (unitPrice <= 0 || fifoUnitCost == null || !Number.isFinite(fifoUnitCost)) return '—'
  const marginUnit = productUkraineMarketplaceMargin(
    unitPrice,
    fifoUnitCost,
    orderTransactionCommissionPct(product, tx),
  )
  if (marginUnit == null || !Number.isFinite(marginUnit)) return '—'
  const moneyFormatted = formatProductMarginMoney(marginUnit)
  const percent = unitPrice > 0 ? (marginUnit / unitPrice) * 100 : null
  if (percent == null || !Number.isFinite(percent)) return moneyFormatted
  const pctFormatted = new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(percent)
  return `${moneyFormatted} (${pctFormatted}%)`
}

function productUkraineTotalStock(product) {
  const manualQty = ukraineManualStockQty(product)
  const sku = product?.sku || productDisplaySku(product)
  const skuKey = productSkuKey(sku)
  if (!skuKey) {
    if (productCatalogOf(product) === 'ukraine' && product.zakupkaProductId) return manualQty
    return Math.max(manualQty, Number(product.qty) || 0)
  }
  const zakupkaQty = listZakupkaProductsForSku(sku).reduce((sum, zakupka) => sum + zakupkaArrivedStockQty(zakupka), 0)
  return zakupkaQty + manualQty
}

function productUkraineActualStock(product) {
  return Math.max(0, productUkraineTotalStock(product) - productUkraineOrderReservedQty(product))
}

function productUkraineStockAtWarehouse(product, warehouseName = null) {
  const warehouse = warehouseName ?? productUkraineWarehouseValue(product)
  if (!warehouse) return null
  return productUkraineActualStock(product)
}

function productUkraineCommissionPctValue(value) {
  if (value == null || value === '') return 0
  const pct = Number(value)
  return Number.isFinite(pct) ? pct : 0
}

function productUkraineMarketplaceMargin(price, unitCost, commissionPct) {
  const p = Number(price) || 0
  if (p <= 0) return null
  if (unitCost == null || !Number.isFinite(Number(unitCost))) return null
  const cost = Number(unitCost)
  const pct = productUkraineCommissionPctValue(commissionPct)
  const margin = p - cost - (p * pct / 100)
  return Number.isFinite(margin) ? margin : null
}

function productUkraineMarginProm(product) {
  if (productUkraineHasManualMargin(product, 'marginProm')) {
    return productUkraineManualMarginValue(product, 'marginProm')
  }
  return productUkraineMarketplaceMargin(
    product.priceProm,
    productUkraineUnitCost(product),
    product.commissionProm,
  )
}

function productUkraineMarginRozetka(product) {
  if (productUkraineHasManualMargin(product, 'marginRozetka')) {
    return productUkraineManualMarginValue(product, 'marginRozetka')
  }
  return productUkraineMarketplaceMargin(
    product.priceRozetka,
    productUkraineUnitCost(product),
    product.commissionRozetka,
  )
}

function productUkraineManualMarginFieldKey(field) {
  return field === 'marginRozetka' ? 'manualMarginRozetka' : 'manualMarginProm'
}

function productUkraineHasManualMargin(product, field) {
  const value = product?.[productUkraineManualMarginFieldKey(field)]
  return value != null && value !== '' && Number.isFinite(Number(value))
}

function productUkraineManualMarginValue(product, field) {
  return Number(product[productUkraineManualMarginFieldKey(field)])
}

function productUkraineCalculatedMarginProm(product, { useActiveCost = false } = {}) {
  const unitCost = useActiveCost ? productUkraineActiveUnitCost(product) : productUkraineUnitCost(product)
  return productUkraineMarketplaceMargin(
    product.priceProm,
    unitCost,
    product.commissionProm,
  )
}

function productUkraineCalculatedMarginRozetka(product, { useActiveCost = false } = {}) {
  const unitCost = useActiveCost ? productUkraineActiveUnitCost(product) : productUkraineUnitCost(product)
  return productUkraineMarketplaceMargin(
    product.priceRozetka,
    unitCost,
    product.commissionRozetka,
  )
}

function productUkraineArticleLabel(product) {
  const sku = String(productDisplaySku(product) || '').trim()
  return sku && sku !== '—' ? sku : '—'
}

function productUkraineStockLabel(product) {
  const qty = productUkraineStockAtWarehouse(product)
  if (qty == null) return '—'
  return Number.isFinite(qty) ? fmt(qty) : '—'
}

function productUkraineSoldQtyLastDays(product, days = UKRAINE_STOCK_DAYS_LOOKBACK) {
  const cutoff = new Date()
  cutoff.setHours(0, 0, 0, 0)
  cutoff.setDate(cutoff.getDate() - (days - 1))
  return orderTransactionsSoldForProduct(product).reduce((sum, tx) => {
    const raw = tx?.date || tx?.createdAt
    if (!raw) return sum
    const d = new Date(raw)
    if (Number.isNaN(d.getTime()) || d < cutoff) return sum
    return sum + orderTransactionQtyValue(tx)
  }, 0)
}

function productUkraineAverageDailySales(product, days = UKRAINE_STOCK_DAYS_LOOKBACK) {
  return productUkraineSoldQtyLastDays(product, days) / days
}

function productUkraineStockDaysRemaining(product) {
  const stock = productUkraineActualStock(product)
  const avgDaily = productUkraineAverageDailySales(product)
  if (!Number.isFinite(stock) || stock <= 0) return 0
  if (!Number.isFinite(avgDaily) || avgDaily <= 0) return null
  return stock / avgDaily
}

function productUkraineStockDaysToneClass(product) {
  const days = productUkraineStockDaysRemaining(product)
  if (days == null) return 'product-ukraine-stock-qty--neutral'
  if (days >= UKRAINE_STOCK_DAYS_GREEN) return 'product-ukraine-stock-qty--green'
  if (days >= UKRAINE_STOCK_DAYS_ORANGE) return 'product-ukraine-stock-qty--orange'
  if (days >= UKRAINE_STOCK_DAYS_RED) return 'product-ukraine-stock-qty--orange'
  return 'product-ukraine-stock-qty--red'
}

function productUkraineStockDaysTitle(product) {
  const days = productUkraineStockDaysRemaining(product)
  const avgDaily = productUkraineAverageDailySales(product)
  if (days == null) {
    return `Середні продажі за ${UKRAINE_STOCK_DAYS_LOOKBACK} д.: ${fmt(avgDaily)} шт./день. Немає продажів — дні залишку не розраховано.`
  }
  const daysLabel = days >= 100 ? '100+' : String(Math.max(0, Math.floor(days)))
  return `Орієнтовно ${daysLabel} дн. залишку (${fmt(productUkraineActualStock(product))} ÷ ${fmt(avgDaily)} шт./день за ${UKRAINE_STOCK_DAYS_LOOKBACK} д.)`
}

function productUkraineStockCellInner(product) {
  const label = productUkraineStockLabel(product)
  if (label === '—') return escapeHtml(label)
  const toneClass = productUkraineStockDaysToneClass(product)
  const title = productUkraineStockDaysTitle(product)
  return `<span class="product-ukraine-stock-qty ${toneClass}" title="${escapeHtml(title)}">${escapeHtml(label)}</span>`
}

function productUkraineWarehouseValue(product) {
  const value = String(product.ukraineWarehouse || '').trim()
  return ukraineWarehouseNameOptions().includes(value) ? value : ''
}

function productUkraineWarehouseLabel(product) {
  const value = productUkraineWarehouseValue(product)
  return value || '—'
}

function productUkraineWarehouseSelect(product) {
  const options = ukraineWarehouseNameOptions()
  if (!options.length) {
    return '<span class="product-detail-readonly-value muted">— Спочатку додайте склад —</span>'
  }
  const selected = productUkraineWarehouseValue(product)
  const optionHtml = ['<option value="">—</option>']
    .concat(options.map((option) => (
      `<option value="${escapeHtml(option)}"${option === selected ? ' selected' : ''}>${escapeHtml(option)}</option>`
    )))
  return `<select class="table-input table-select product-ukraine-warehouse-select product-detail-control product-detail-control-wide" data-product-id="${product.id}" data-ukraine-field="ukraineWarehouse" aria-label="Склад">${optionHtml.join('')}</select>`
}

function productUkraineNameInput(product) {
  const size = productDetailControlSize(product.name || 'Назва товару', 6, 24)
  return `<input type="text" size="${size}" class="table-input product-ukraine-field-input product-ukraine-name-input product-detail-control product-detail-control-fit" data-product-id="${product.id}" data-ukraine-field="name" value="${escapeHtml(product.name || '')}" placeholder="Назва товару" aria-label="Назва товару" />`
}

function productUkraineUnitCostLabel(product) {
  const cost = productUkraineUnitCost(product)
  return productMoneyLabel(cost)
}

function productUnitCostCompareIndicatorMarkup(current, prev) {
  if (!Number.isFinite(current) || !Number.isFinite(prev) || prev === 0 || current === prev) return ''
  const higherThanPrev = current > prev
  const cls = higherThanPrev ? 'product-line-compare--bad' : 'product-line-compare--good'
  const arrow = higherThanPrev ? '↑' : '↓'
  const pct = Math.abs(((current - prev) / prev) * 100)
  const pctLabel = productPercentLabel(pct)
  const prevLabel = productMoneyLabel(prev)
  const currentLabel = productMoneyLabel(current)
  const title = higherThanPrev
    ? `Собівартість зросла на ${pctLabel} (${prevLabel} → ${currentLabel})`
    : `Собівартість зменшилась на ${pctLabel} (${prevLabel} → ${currentLabel})`
  return `<span class="product-line-compare ${cls}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">${arrow} ${escapeHtml(pctLabel)}</span>`
}

function productUkraineUnitCostCompareIndicator(product) {
  const events = listUkraineReplenishmentEvents(product)
  if (events.length < 2) return ''
  const current = Number(events[0].unitCost) || 0
  const prev = Number(events[1].unitCost) || 0
  return productUnitCostCompareIndicatorMarkup(current, prev)
}

function productUkraineMarginLabel(value) {
  if (value == null || !Number.isFinite(value)) return '—'
  return formatProductMarginMoney(value)
}

function productUkrainePercentLabel(value) {
  return productPercentLabel(value)
}

function ukraineCommissionDisplayModeRef(field) {
  if (field === 'commissionProm') {
    return {
      get: () => ukraineCommissionPromDisplayMode,
      set: (v) => { ukraineCommissionPromDisplayMode = v },
      storageKey: UKRAINE_COMMISSION_PROM_MODE_KEY,
    }
  }
  if (field === 'commissionRozetka') {
    return {
      get: () => ukraineCommissionRozetkaDisplayMode,
      set: (v) => { ukraineCommissionRozetkaDisplayMode = v },
      storageKey: UKRAINE_COMMISSION_ROZETKA_MODE_KEY,
    }
  }
  return null
}

function restoreUkraineCommissionDisplayModes() {
  ;['commissionProm', 'commissionRozetka'].forEach((field) => {
    const ref = ukraineCommissionDisplayModeRef(field)
    if (!ref) return
    try {
      const raw = localStorage.getItem(ref.storageKey)
      if (raw === 'percent' || raw === 'amount') ref.set(raw)
    } catch (_) {}
  })
}

function toggleUkraineCommissionDisplayMode(field) {
  const ref = ukraineCommissionDisplayModeRef(field)
  if (!ref) return
  ref.set(ref.get() === 'percent' ? 'amount' : 'percent')
  try {
    localStorage.setItem(ref.storageKey, ref.get())
  } catch (_) {}
}

function productUkraineCommissionToggleTitle(field) {
  const label = field === 'commissionProm' ? 'Prom%' : 'Rozetka%'
  const isAmount = ukraineCommissionDisplayModeRef(field)?.get() === 'amount'
  return isAmount
    ? `${label}: сума комісії. Натисніть, щоб показати %`
    : `${label}: відсоток. Натисніть, щоб показати суму`
}

function productUkraineMarketplaceCommissionAmount(product, field) {
  const price = field === 'commissionProm' ? Number(product.priceProm) : Number(product.priceRozetka)
  const pct = field === 'commissionProm' ? Number(product.commissionProm) : Number(product.commissionRozetka)
  if (!Number.isFinite(price) || price <= 0) return null
  if (!Number.isFinite(pct) || pct === 0) return null
  return price * pct / 100
}

function productUkraineCommissionCollapsedDisplay(product, field) {
  if (ukraineCommissionDisplayModeRef(field)?.get() === 'amount') {
    return productMoneyLabel(productUkraineMarketplaceCommissionAmount(product, field))
  }
  const pct = field === 'commissionProm' ? product.commissionProm : product.commissionRozetka
  return productUkrainePercentLabel(pct)
}

function productUkraineCommissionDetailCell(product, field, label) {
  if (ukraineCommissionDisplayModeRef(field)?.get() === 'amount') {
    const sum = productMoneyLabel(productUkraineMarketplaceCommissionAmount(product, field))
    return `<span class="product-detail-readonly-value product-ukraine-commission-amount-value">${escapeHtml(sum)}</span>`
  }
  return productUkraineEditablePercentInput(product, field, label)
}

function consolidateDuplicateUkraineBySku() {
  const seen = new Map()
  let removed = false
  listProductsByCatalog('ukraine').forEach((product) => {
    const key = productSkuKey(product.sku)
    if (!key) return
    if (!seen.has(key)) {
      seen.set(key, product)
      return
    }
    const canonical = seen.get(key)
    const patch = {}
    if (!canonical.ukraineWarehouse && product.ukraineWarehouse) patch.ukraineWarehouse = product.ukraineWarehouse
    if (!canonical.name && product.name) patch.name = product.name
    if (!canonical.arrivalInfo && product.arrivalInfo) patch.arrivalInfo = product.arrivalInfo
    if (!Number(canonical.priceProm) && Number(product.priceProm)) patch.priceProm = product.priceProm
    if (!Number(canonical.priceRozetka) && Number(product.priceRozetka)) patch.priceRozetka = product.priceRozetka
    if (!Number(canonical.commissionProm) && Number(product.commissionProm)) patch.commissionProm = product.commissionProm
    if (!Number(canonical.commissionRozetka) && Number(product.commissionRozetka)) patch.commissionRozetka = product.commissionRozetka
    if (Object.keys(patch).length) db.update('products', canonical.id, patch)
    db.remove('products', product.id)
    removed = true
  })
  if (removed) {
    seen.forEach((product) => {
      syncUkraineLinesFromAllZakupkas(product)
    })
  }
  return removed
}

function syncUkraineProductsFromZakupkaArrivals() {
  const skuGroups = new Map()

  listProductsByCatalog('zakupka').forEach((zakupka) => {
    const sku = String(zakupka.sku || '').trim() || zakupkaSkuFromName(zakupka.name)
    const key = productSkuKey(sku)
    if (!key) return
    const arrivedQty = zakupkaArrivedStockQty(zakupka)
    if (arrivedQty <= 0) return

    if (!skuGroups.has(key)) {
      skuGroups.set(key, { sku, totalQty: 0, latestZakupka: null, latestTime: 0 })
    }
    const group = skuGroups.get(key)
    group.totalQty += arrivedQty
    const latestLine = zakupkaPrimaryArrivedLine(zakupka)
    const arrivalRaw = productZakupkaDateValue(zakupka, 'arrivalDate', latestLine)
    const time = warehouseEventSortTime(arrivalRaw)
    if (time >= group.latestTime) {
      group.latestTime = time
      group.latestZakupka = zakupka
    }
  })

  skuGroups.forEach((group) => {
    const existing = findUkraineProductBySku(group.sku)
    const latest = group.latestZakupka
    const patch = {
      name: latest?.name || existing?.name || '',
      sku: group.sku,
      catalog: 'ukraine',
      qty: group.totalQty,
      zakupkaProductId: latest?.id || existing?.zakupkaProductId || null,
    }
    let ukraine
    if (!existing) {
      ukraine = db.create('products', {
        ...patch,
        ...db.getAuthorMeta(),
        priceProm: 0,
        priceRozetka: 0,
        commissionProm: 0,
        commissionRozetka: 0,
        ukraineWarehouse: '',
        arrivalInfo: '',
      })
    } else {
      ukraine = db.update('products', existing.id, patch)
    }
    if (ukraine) syncUkraineLinesFromAllZakupkas(ukraine)
  })

  listProductsByCatalog('ukraine').forEach((product) => {
    if (isStandaloneUkraineProduct(product)) return
    const key = productSkuKey(product.sku)
    if (!key || skuGroups.has(key)) return
    syncUkraineLinesFromAllZakupkas(product)
  })

  consolidateDuplicateUkraineBySku()
  pruneOrphanedUkraineFromZakupka()
}

function ensureUkraineProductsFromZakupka() {
  syncUkraineProductsFromZakupkaArrivals()
}

function manualStockListItemMatchesMonth(item, monthKey) {
  const dateRaw = productLineDateValue(item.line)
  if (!dateRaw) return true
  return zakupkaLineMatchesMonth(item.line, monthKey)
}

function isManualStockListItem(item) {
  return item?.listKind === 'manualStock'
}

function createManualStockListItem(product, line) {
  return {
    listKind: 'manualStock',
    product,
    line,
    id: `${product.id}:${line.id}`,
  }
}

function listManualStockListItems() {
  const items = []
  listProductsByCatalog('ukraine').forEach((product) => {
    if (shouldRemoveUkraineAfterZakupkaDeletion(product)) return
    ukraineManualStockLines(product).forEach((line) => {
      items.push(createManualStockListItem(product, line))
    })
  })
  return items
}

function manualStockListItemSearchText(item) {
  const { product, line } = item
  const warehouse = db.get('warehouses', line.warehouseId)?.name || ''
  return [
    productDisplayName(product),
    productDisplaySku(product),
    productLineDateValue(line),
    line.qty,
    line.unitCost,
    warehouse,
    manualStockListItemTotal(item),
  ].filter((v) => v != null && v !== '').join(' ')
}

function manualStockListItemQty(item) {
  return Math.max(0, Number(item.line?.qty) || 0)
}

function manualStockListItemUnitCost(item) {
  return Number(item.line?.unitCost) || 0
}

function manualStockLineZakupkaView(line) {
  if (!line) return line
  const qty = Math.max(0, Number(line.qty) || 0)
  const manualTotal = Number(line.manualTotal)
  const hasManualTotal = line.manualTotal != null && line.manualTotal !== '' && Number.isFinite(manualTotal)
  let unitCost = Number(line.unitCost) || Number(line.purchasePrice) || 0
  if (hasManualTotal) {
    unitCost = qty > 0 ? manualTotal / qty : manualTotal
  }
  const paymentDate = line.paymentDate || productLineDateValue(line) || ''
  return {
    ...line,
    purchasePrice: unitCost,
    paymentDate,
    date: paymentDate || line.date || '',
    shippingDate: line.shippingDate || '',
    arrivalDate: line.arrivalDate || '',
    weight: Number(line.weight) || 0,
    logistics: Number(line.logistics) || 0,
    logisticsValue: Number(line.logisticsValue) || 0,
    ukraineLogistics: Number(line.ukraineLogistics) || 0,
    placement: Number(line.placement) || 0,
    logisticsType: line.logisticsType || '',
  }
}

function manualStockLineTotalValue(line) {
  if (line?.manualTotal != null && line.manualTotal !== '') {
    const manualTotal = Number(line.manualTotal)
    if (Number.isFinite(manualTotal)) return manualTotal
  }
  return productZakupkaLineTotal(manualStockLineZakupkaView(line), 'all')
}

function manualStockLineUnitCost(line) {
  const qty = Math.max(0, Number(line.qty) || 0)
  if (line?.manualTotal != null && line.manualTotal !== '') {
    const manualTotal = Number(line.manualTotal)
    if (Number.isFinite(manualTotal)) return qty > 0 ? manualTotal / qty : manualTotal
  }
  return Number(line.unitCost) || 0
}

function manualStockItemAsZakupkaProduct(item) {
  const { product, line } = item
  return {
    ...product,
    _manualStockItem: item,
    _manualStockLine: line,
  }
}

function manualStockListItemTotal(item) {
  return productZakupkaLineTotal(manualStockLineZakupkaView(item.line), 'all')
}

function manualStockListItemDateLabel(item) {
  return formatZakupkaDateDisplay(productLineDateValue(item.line))
}

function listProductsForZakupkaTable() {
  const monthKey = resolveProductPagePeriodMonthKey()
  const zakupkaItems = listProductsByCatalog('zakupka')
    .filter((product) => productZakupkaMatchesMonth(product, monthKey))
    .map((product) => ({ listKind: 'zakupka', product, id: product.id }))
  const manualItems = listManualStockListItems()
    .filter((item) => manualStockListItemMatchesMonth(item, monthKey))
  return [...zakupkaItems, ...manualItems]
}

function listItemProduct(item) {
  return item?.product || item
}

function listItemSearchText(item) {
  if (isManualStockListItem(item)) return manualStockListItemSearchText(item)
  return productSearchText(listItemProduct(item))
}

function listItemSortName(item) {
  if (isManualStockListItem(item)) return productDisplayName(item.product)
  return listItemProduct(item)?.name || ''
}

function productUkraineTableSortQty(product) {
  return Math.max(0, productUkraineActualStock(product))
}

function listItemSortQty(item) {
  if (isManualStockListItem(item)) return manualStockListItemQty(item)
  return productDisplayQty(listItemProduct(item))
}

function listItemSortDateValue(item, field) {
  if (isManualStockListItem(item)) {
    if (field === 'paymentDate') return productLineDateValue(item.line)
    return ''
  }
  const product = listItemProduct(item)
  return productZakupkaDateValue(product, field)
}

function computeHomeInventoryValueStats() {
  syncUkraineProductsFromZakupkaArrivals()
  let total = 0
  let productsWithStock = 0
  listProductsByCatalog('ukraine').forEach((product) => {
    if (shouldRemoveUkraineAfterZakupkaDeletion(product)) return
    const qty = productUkraineActualStock(product)
    if (qty <= 0) return
    const unitCost = productUkraineUnitCost(product)
    if (unitCost == null || !Number.isFinite(unitCost)) return
    total += unitCost * qty
    productsWithStock += 1
  })
  return {
    total,
    share: total / 2,
    productsWithStock,
  }
}

function listProductsForUkraineTable() {
  syncUkraineProductsFromZakupkaArrivals()
  return listProductsByCatalog('ukraine').filter((product) => !shouldRemoveUkraineAfterZakupkaDeletion(product))
}

function syncUkraineRecordsFromZakupka(zakupka) {
  if (!zakupka || productCatalogOf(zakupka) !== 'zakupka') return
  syncUkraineProductsFromZakupkaArrivals()
  const sku = String(zakupka.sku || '').trim() || zakupkaSkuFromName(zakupka.name)
  const ukraine = findUkraineProductBySku(sku)
  if (ukraine) {
    const fresh = db.get('products', ukraine.id)
    if (fresh) syncProductUkraineRow(ukraine.id, fresh)
  }
  if (activeNav === 'product' && isProductUkraineCatalog()) render()
  syncWarehouseCapacityDisplays()
}

function productZakupkaLatestLinePurchasePrice(zakupka) {
  if (!zakupka) return 0
  const line = productLatestZakupkaLine(zakupka)
  if (line) return Number(line.purchasePrice) || 0
  return Number(zakupka.purchasePrice) || 0
}

/** Закупка зі згорнутої картки «Закупка»: ціна закупки × кількість зі списку «Закупка». */
function productZakupkaCollapsedPurchaseProduct(zakupka) {
  if (!zakupka) return 0
  const purchaseUnit = productDisplayPurchasePrice(zakupka)
  const qty = Number(zakupka.qty) || 0
  return purchaseUnit * qty
}

function findZakupkaLineForUkraineLine(ukraineLine, product) {
  if (!ukraineLine) return null
  if (ukraineLine.zakupkaProductId && ukraineLine.zakupkaLineId) {
    const zakupka = db.get('products', ukraineLine.zakupkaProductId)
    if (zakupka && productCatalogOf(zakupka) === 'zakupka') {
      const withLines = ensureProductZakupkaLines(zakupka)
      const matched = (withLines.lines || []).find((line) => line.id === ukraineLine.zakupkaLineId)
      if (matched) return matched
    }
  }
  const linked = productLinkedZakupka(product)
  if (!linked) return null
  const zakupka = ensureProductZakupkaLines(linked)
  const lines = zakupka.lines || []
  if (ukraineLine.zakupkaLineId) {
    const matched = lines.find((line) => line.id === ukraineLine.zakupkaLineId)
    if (matched) return matched
  }
  const ukraineDate = productLineDateValue(ukraineLine)
  const skuKey = productSkuKey(productDisplaySku(product))
  if (!skuKey) return null
  return lines.find((line) => (
    productLineDateValue(line) === ukraineDate
    && productSkuKey(line.sku) === skuKey
  )) || null
}

function productUkraineLinePurchaseValue(ukraineLine, product) {
  return Number(ukraineLine?.purchasePrice ?? product?.purchasePrice) || 0
}

function productUkraineLinePurchaseDisplay(line, product) {
  return productUkraineLinePurchaseValue(line, product)
}

function productUkraineLinePurchaseLabel(line, product) {
  return productMoneyLabel(productUkraineLinePurchaseDisplay(line, product))
}

function productUkrainePurchaseValue(product) {
  return Number(product?.purchasePrice) || 0
}

function productUkrainePurchaseDisplay(product) {
  return productUkrainePurchaseValue(product)
}

function productUkrainePurchaseLabel(product) {
  return productMoneyLabel(productUkrainePurchaseDisplay(product))
}

function productDisplayPurchasePrice(product) {
  if (productCatalogOf(product) === 'zakupka') {
    return productZakupkaLatestLinePurchasePrice(product)
  }
  if (productCatalogOf(product) === 'ukraine') {
    return productUkrainePurchaseValue(product)
  }
  return Number(product.purchasePrice) || 0
}

function productUkraineCommissionAmount(product) {
  const price = Number(product.price) || 0
  const commissionPct = Number(product.commission) || 0
  const qty = Number(product.qty) || 0
  return (price * commissionPct / 100) * qty
}

function productUkraineTableTotal(product) {
  const purchase = productUkrainePurchaseValue(product)
  const logistics = Number(product.logistics) || 0
  const commissionAmount = productUkraineCommissionAmount(product)
  return purchase + logistics + commissionAmount
}

function productLineUkraineTotal(line, product) {
  const purchase = productUkraineLinePurchaseValue(line, product)
  const logistics = Number(line?.logistics) || 0
  const price = Number(line?.price) || 0
  const commissionPct = Number(line?.commission) || 0
  const qty = Number(line?.qty) || 0
  return purchase + logistics + (price * commissionPct / 100) * qty
}

function productLineUkraineTotalDisplay(line, product) {
  return productLineUkraineTotal(line, product)
}

function productLineUkraineTotalLabel(line, product) {
  return productMoneyLabel(productLineUkraineTotalDisplay(line, product))
}

function productUkraineTableTotalDisplay(product) {
  return productUkraineTableTotal(product)
}

function productUkraineTableTotalLabel(product) {
  return productMoneyLabel(productUkraineTableTotalDisplay(product))
}

function productUkraineCollapsedTotalUnit(product) {
  const total = productUkraineTableTotal(product)
  const qty = productUkraineMetricQty(product)
  if (qty <= 0) return null
  return total / qty
}

function productUkraineCollapsedTotalUnitLabel(product) {
  return productMoneyLabel(productUkraineCollapsedTotalUnit(product))
}

function productUkraineOrderTransactionPrice(product, tx) {
  return ukraineProductOrderPrice(product, orderTransactionShopValue(tx))
}

function productUkraineOrderTransactionTotal(product, tx) {
  return productUkraineOrderTransactionPrice(product) * orderTransactionQtyValue(tx)
}

function productUkraineOrderTransactionMargin(product, tx) {
  const price = productUkraineOrderTransactionPrice(product)
  const purchaseUnit = productUkraineCollapsedTotalUnit(product)
  const qty = orderTransactionQtyValue(tx)
  if (price <= 0 || purchaseUnit == null || !Number.isFinite(purchaseUnit)) return null
  const amount = price - purchaseUnit
  const percent = (amount / price) * 100
  return { amount, percent, totalAmount: amount * qty }
}

function productUkraineOrderTransactionMarginLabel(product, tx) {
  const margin = productUkraineOrderTransactionMargin(product, tx)
  if (!margin || !Number.isFinite(margin.amount)) return '—'
  const displayAmount = margin.amount
  const moneyFormatted = formatProductMarginMoney(displayAmount)
  if (margin.percent == null || !Number.isFinite(margin.percent)) return moneyFormatted
  const pctFormatted = new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(margin.percent)
  return `${moneyFormatted} (${pctFormatted}%)`
}

function productLineUkraineMargin(line, product) {
  const price = Number(line?.price) || 0
  const qty = Number(line?.qty) || 0
  const total = productLineUkraineTotal(line, product)
  if (qty <= 0 || price <= 0) return null
  const unitCost = total / qty
  const amount = price - unitCost
  const percent = (amount / price) * 100
  return { amount, percent, totalAmount: amount * qty }
}

function productLineUkraineMarginLabel(line, product) {
  const margin = productLineUkraineMargin(line, product)
  if (!margin || !Number.isFinite(margin.amount)) return '—'
  const displayAmount = margin.amount
  const moneyFormatted = formatProductMarginMoney(displayAmount)
  if (margin.percent == null || !Number.isFinite(margin.percent)) return moneyFormatted
  const pctFormatted = new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(margin.percent)
  return `${moneyFormatted} (${pctFormatted}%)`
}

function productUnitPriceForProduct(product) {
  if (productCatalogOf(product) === 'ukraine') {
    return productUkraineTableTotal(product)
  }
  return productTotalUnitPrice(product)
}

function syncLinkedUkraineProducts(sku) {
  const key = productSkuKey(sku)
  if (!key) return
  listProductsByCatalog('ukraine').forEach((p) => {
    if (productSkuKey(p.sku) !== key) return
    syncProductDisplays(p.id, p)
  })
}

function isProductUkraineCatalog() {
  return productCatalogMode === 'ukraine'
}

function isProductZakupkaCatalog() {
  return productCatalogMode === 'zakupka'
}

const PRODUCT_UKRAINE_COST_KEYS = ['purchasePrice', 'logistics', 'commission']

function productTotalUnitPrice(product) {
  return PRODUCT_UKRAINE_COST_KEYS.reduce((sum, key) => sum + (Number(product[key]) || 0), 0)
}

/** Сума для «Закупка»; «Загальна» для «Україна». */
function productTableTotal(product) {
  if (productCatalogOf(product) === 'zakupka') {
    return productZakupkaTableSum(product)
  }
  return productUkraineTableTotal(product)
}

function productMoneyLabel(value) {
  const n = Number(value)
  if (!Number.isFinite(n) || n === 0) return '—'
  return fmtMoney(n)
}

function productPercentLabel(value) {
  const n = Number(value)
  if (!Number.isFinite(n) || n === 0) return '—'
  const formatted = new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(n)
  return `${formatted}%`
}

function productCommissionLabel(product) {
  if (isProductUkraineCatalog() || productCatalogOf(product) === 'ukraine') {
    return productPercentLabel(product.commission)
  }
  return productMoneyLabel(product.commission)
}

function commissionInputDisplay(value, { minDecimals = 0 } = {}) {
  if (value == null || value === '') return ''
  const n = Number(value)
  if (!Number.isFinite(n)) return ''
  return amountInputDisplay(n, { minDecimals })
}

function commissionInputFieldDisplay(value) {
  return commissionInputDisplay(value, { minDecimals: AMOUNT_MAX_DECIMALS })
}

/** Маржа: Ціна − (Загальна ÷ Кількість); % = маржа ÷ Ціна. Кількість — облікова, без транзакцій. */
function productUkraineMargin(product) {
  const price = Number(product.price) || 0
  const qty = productUkraineMetricQty(product)
  const total = productUkraineTableTotal(product)

  if (qty <= 0 || price <= 0) return null

  const unitCost = total / qty
  const amount = price - unitCost
  const percent = (amount / price) * 100

  return { amount, percent, totalAmount: amount * qty }
}

function formatProductMarginMoney(value) {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
    maximumFractionDigits: AMOUNT_MAX_DECIMALS,
  }).format(value)
}

function productMarginLabel(product) {
  if (!isProductUkraineCatalog() && productCatalogOf(product) !== 'ukraine') return '—'
  const margin = productUkraineMargin(product)
  if (!margin || !Number.isFinite(margin.amount)) return '—'

  const displayAmount = margin.amount
  const moneyFormatted = formatProductMarginMoney(displayAmount)

  if (margin.percent == null || !Number.isFinite(margin.percent)) return moneyFormatted

  const pctFormatted = new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(margin.percent)
  return `${moneyFormatted} (${pctFormatted}%)`
}

function productMarginCell(product) {
  const text = productMarginLabel(product)
  return productReadOnlyCell(text, 'product-margin-cell product-col-price-cell', text)
}

function productMoneyReadCell(product, fieldKey, cellClass = '') {
  const text = fieldKey === 'sum'
    ? productMoneyLabel(productZakupkaTableSum(product))
    : fieldKey === 'grandTotal'
      ? productZakupkaGrandTotalLabel()
      : fieldKey === 'total'
        ? (isProductUkraineCatalog() || productCatalogOf(product) === 'ukraine'
          ? productUkraineTableTotalLabel(product)
          : productMoneyLabel(productTableTotal(product)))
        : fieldKey === 'purchasePrice'
          ? (isProductUkraineCatalog() || productCatalogOf(product) === 'ukraine'
            ? productUkrainePurchaseLabel(product)
            : productMoneyLabel(productDisplayPurchasePrice(product)))
          : fieldKey === 'commission'
            ? productCommissionLabel(product)
            : productMoneyLabel(product[fieldKey])
  return productReadOnlyCell(text, `product-money-cell product-col-price-cell ${cellClass}`.trim(), text)
}

function productQtyReadCell(product) {
  const text = productQtyLabel(product)
  return productReadOnlyCell(text, 'product-qty-cell product-col-qty-cell', text)
}

function productQtyCell(product) {
  return productQtyReadCell(product)
}

function productCostCells(product) {
  const priceCell = isProductUkraineCatalog()
    ? productMoneyReadCell(product, 'price', 'product-price-cell')
    : ''
  return `
      ${productMoneyReadCell(product, 'purchasePrice', 'product-purchasePrice-cell')}
      ${productMoneyReadCell(product, 'logistics', 'product-logistics-cell')}
      ${priceCell}
      ${productMoneyReadCell(product, 'commission', 'product-commission-cell')}`
}

function productSearchText(product) {
  if (productCatalogOf(product) === 'zakupka') return productZakupkaSearchText(product)
  if (productCatalogOf(product) === 'ukraine') {
    const parts = [
      productDisplayName(product),
      productUkraineArticleLabel(product),
      productUkraineStockLabel(product),
      productUkraineWarehouseLabel(product),
      productUkraineUnitCostLabel(product),
      product.priceProm,
      product.priceRozetka,
      product.commissionProm,
      product.commissionRozetka,
      product.arrivalInfo,
    ]
    return parts.filter((v) => v != null && v !== '' && v !== '—').join(' ')
  }
  const warehouse = db.get('warehouses', product.warehouseId)
  const parts = [
    productDisplayName(product),
    productDisplaySku(product),
    warehouse?.name,
    productDisplayQty(product),
    productDisplayPurchasePrice(product),
    product.logistics,
    product.price,
    product.commission,
    productTableTotal(product),
    productMarginLabel(product),
    productTotalUnitPrice(product),
  ]
  return parts.filter((v) => v != null && v !== '').join(' ')
}

function toggleProductsQtySort() {
  productsQtySort = productsQtySort === 'asc' ? 'desc' : 'asc'
}

function applyDefaultProductsZakupkaDateSorts() {
  productsZakupkaPaymentDateSort = 'desc'
  productsZakupkaShippingDateSort = 'desc'
  productsZakupkaArrivalDateSort = 'desc'
}

function resetProductsZakupkaTableControls() {
  productsQtySort = null
  applyDefaultProductsZakupkaDateSorts()
  productsZakupkaLogisticsTypeFilter = ''
}

function productsUkraineSortState(field) {
  if (field === 'stock') return productsUkraineStockSort
  if (field === 'cost') return productsUkraineCostSort
  if (field === 'marginProm') return productsUkraineMarginPromSort
  if (field === 'marginRozetka') return productsUkraineMarginRozetkaSort
  return null
}

function setProductsUkraineSortState(field, value) {
  if (field === 'stock') productsUkraineStockSort = value
  else if (field === 'cost') productsUkraineCostSort = value
  else if (field === 'marginProm') productsUkraineMarginPromSort = value
  else if (field === 'marginRozetka') productsUkraineMarginRozetkaSort = value
}

function toggleProductsUkraineSort(field) {
  const current = productsUkraineSortState(field)
  if (!current) {
    setProductsUkraineSortState(field, 'desc')
    return
  }
  setProductsUkraineSortState(field, current === 'desc' ? 'asc' : 'desc')
}

function productUkraineSortIndicator(field) {
  const sort = productsUkraineSortState(field)
  if (sort === 'desc') return '↓'
  if (sort === 'asc') return '↑'
  return '↕'
}

function productUkraineSortTitle(field, label) {
  const sort = productsUkraineSortState(field)
  if (sort === 'desc') return `${label}: від більшого до меншого`
  if (sort === 'asc') return `${label}: від меншого до більшого`
  return `Сортувати за ${label.toLowerCase()}`
}

function productUkraineSortTh(label, field, extraClass = '', fullLabel = label) {
  const sort = productsUkraineSortState(field)
  const title = productUkraineSortTitle(field, fullLabel)
  const colClass = `product-sort-th ${extraClass}${sort ? ' is-active' : ''}`
  return `
    <th class="${colClass}">
      <button type="button" class="product-sort-btn" data-product-sort-ukraine="${field}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">
        <span>${escapeHtml(label)}</span>
      </button>
    </th>`
}

function productUkraineWarehouseFilterTh() {
  const active = productsUkraineWarehouseFilter
  const label = active
    ? escapeHtml(active)
    : 'Склад'
  const options = ['<option value="">— Усі —</option>'].concat(
    ukraineWarehouseNameOptions().map(
      (name) => `<option value="${escapeHtml(name)}"${name === active ? ' selected' : ''}>${escapeHtml(name)}</option>`,
    ),
  ).join('')
  return `
    <th class="product-col-warehouse-th product-ukraine-warehouse-th product-ukraine-filter-th${active ? ' is-active' : ''}">
      <div class="product-ukraine-filter-wrap">
        <span class="product-ukraine-filter-label">${label}</span>
        <select class="product-ukraine-filter-select" data-ukraine-warehouse-filter aria-label="Фільтр складу">${options}</select>
      </div>
    </th>`
}

function hasActiveProductsUkraineTableControls() {
  return !!(
    productsUkraineWarehouseFilter
    || productsUkraineStockSort
    || productsUkraineCostSort
    || productsUkraineMarginPromSort
    || productsUkraineMarginRozetkaSort
  )
}

function resetProductsUkraineTableControls() {
  productsUkraineStockSort = null
  productsUkraineCostSort = null
  productsUkraineMarginPromSort = null
  productsUkraineMarginRozetkaSort = null
  productsUkraineWarehouseFilter = ''
}

function compareProductsUkraineNumericSort(a, b, getValue, dir) {
  const va = getValue(a)
  const vb = getValue(b)
  const aEmpty = va == null || !Number.isFinite(va)
  const bEmpty = vb == null || !Number.isFinite(vb)
  if (aEmpty && bEmpty) return 0
  if (aEmpty) return 1
  if (bEmpty) return -1
  const cmp = va - vb
  return dir === 'desc' ? -cmp : cmp
}

function productZakupkaDateSortValue(productOrItem, field) {
  const raw = isManualStockListItem(productOrItem)
    ? listItemSortDateValue(productOrItem, field)
    : productZakupkaDateValue(productOrItem, field)
  if (!raw) return null
  const time = new Date(`${raw}T12:00:00`).getTime()
  return Number.isFinite(time) ? time : null
}

function compareProductsZakupkaDateSort(a, b, field, dir) {
  const ta = productZakupkaDateSortValue(a, field)
  const tb = productZakupkaDateSortValue(b, field)
  const aEmpty = ta == null
  const bEmpty = tb == null
  if (aEmpty && bEmpty) return String(listItemSortName(a)).localeCompare(String(listItemSortName(b)), 'uk')
  if (aEmpty) return 1
  if (bEmpty) return -1
  if (ta !== tb) return dir === 'desc' ? tb - ta : ta - tb
  return String(listItemSortName(a)).localeCompare(String(listItemSortName(b)), 'uk')
}

function productsZakupkaDateSortState(field) {
  if (field === 'paymentDate') return productsZakupkaPaymentDateSort
  if (field === 'shippingDate') return productsZakupkaShippingDateSort
  if (field === 'arrivalDate') return productsZakupkaArrivalDateSort
  return null
}

function toggleProductsZakupkaDateSort(field) {
  const current = productsZakupkaDateSortState(field)
  const next = current === 'desc' ? 'asc' : 'desc'
  if (field === 'paymentDate') productsZakupkaPaymentDateSort = next
  else if (field === 'shippingDate') productsZakupkaShippingDateSort = next
  else if (field === 'arrivalDate') productsZakupkaArrivalDateSort = next
}

function productZakupkaDateSortIndicator(field) {
  const sort = productsZakupkaDateSortState(field)
  if (sort === 'desc') return '↓'
  if (sort === 'asc') return '↑'
  return '↕'
}

function productZakupkaDateSortTitle(field) {
  const labels = {
    paymentDate: 'Дата оплати',
    shippingDate: 'Дата отправки',
    arrivalDate: 'Дата Прибуття',
  }
  const label = labels[field] || 'Дата'
  const sort = productsZakupkaDateSortState(field)
  if (sort === 'desc') return `${label}: від новіших до старіших`
  if (sort === 'asc') return `${label}: від старіших до новіших`
  return `Сортувати за ${label.toLowerCase()}`
}

function productZakupkaDateSortTh(lines, field, extraClass = '') {
  const parts = Array.isArray(lines) ? lines : [lines]
  const label = parts.map((part) => escapeHtml(part)).join('<br>')
  const title = productZakupkaDateSortTitle(field)
  const sort = productsZakupkaDateSortState(field)
  const colClass = `product-sort-th ${extraClass}${sort ? ' is-active' : ''} product-zakupka-th`
  return `
    <th class="${colClass}">
      <button type="button" class="product-sort-btn" data-product-sort-zakupka-date="${field}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">
        <span class="product-zakupka-th-label">${label}</span>
        <span class="product-sort-indicator" aria-hidden="true">${productZakupkaDateSortIndicator(field)}</span>
      </button>
    </th>`
}

function productZakupkaLogisticsTypeFilterTh() {
  const active = productsZakupkaLogisticsTypeFilter
  const label = active
    ? escapeHtml(active)
    : '<span class="product-zakupka-th-label">Тип<br>логістики</span>'
  const options = ['<option value="">— Усі —</option>'].concat(
    ZAKUPKA_LOGISTICS_TYPES.map((type) => `<option value="${escapeHtml(type)}"${type === active ? ' selected' : ''}>${escapeHtml(type)}</option>`),
  ).join('')
  return `
    <th class="product-col-logistics-type-th product-zakupka-th product-zakupka-filter-th${active ? ' is-active' : ''}">
      <div class="product-zakupka-filter-wrap">
        <span class="product-zakupka-filter-label">${label}</span>
        <select class="product-zakupka-filter-select" data-zakupka-logistics-filter aria-label="Фільтр типу логістики">${options}</select>
      </div>
    </th>`
}

function productQtySortIndicator() {
  if (productsQtySort === 'asc') return '↑'
  if (productsQtySort === 'desc') return '↓'
  return '↕'
}

function productQtySortTh() {
  const title = productsQtySort === 'asc'
    ? 'Кількість: від меншого до більшого'
    : productsQtySort === 'desc'
      ? 'Кількість: від більшого до меншого'
      : 'Сортувати за кількістю'
  const qtyColClass = `product-sort-th product-col-qty-th${productsQtySort ? ' is-active' : ''}`
  const qtyLabel = isProductZakupkaCatalog()
    ? '<span class="product-zakupka-th-label">Кількість</span>'
    : '<span>Кількість</span>'
  return `
    <th class="${qtyColClass}${isProductZakupkaCatalog() ? ' product-zakupka-th' : ''}">
      <button type="button" class="product-sort-btn" data-product-sort-qty aria-label="${escapeHtml(title)}">
        ${qtyLabel}
        <span class="product-sort-indicator" aria-hidden="true">${productQtySortIndicator()}</span>
      </button>
    </th>`
}

function sortProductsForTable(products) {
  if (isProductZakupkaCatalog()) {
    const dateSorts = [
      ['paymentDate', productsZakupkaPaymentDateSort],
      ['shippingDate', productsZakupkaShippingDateSort],
      ['arrivalDate', productsZakupkaArrivalDateSort],
    ].filter(([, dir]) => dir)
    if (dateSorts.length || productsQtySort) {
      return [...products].sort((a, b) => {
        for (const [field, dir] of dateSorts) {
          const cmp = compareProductsZakupkaDateSort(a, b, field, dir)
          if (cmp !== 0) return cmp
        }
        if (productsQtySort) {
          const qa = listItemSortQty(a)
          const qb = listItemSortQty(b)
          const qtyCmp = productsQtySort === 'asc' ? qa - qb : qb - qa
          if (qtyCmp !== 0) return qtyCmp
        }
        return String(listItemSortName(a)).localeCompare(String(listItemSortName(b)), 'uk')
      })
    }
  }
  if (isProductUkraineCatalog()) {
    const sorts = [
      ['stock', productsUkraineStockSort, productUkraineTableSortQty],
      ['cost', productsUkraineCostSort, productUkraineActiveUnitCost],
      ['marginProm', productsUkraineMarginPromSort, productUkraineActiveMarginProm],
      ['marginRozetka', productsUkraineMarginRozetkaSort, productUkraineActiveMarginRozetka],
    ].filter(([, dir]) => dir)
    if (sorts.length) {
      return [...products].sort((a, b) => {
        for (const [, dir, getter] of sorts) {
          const cmp = compareProductsUkraineNumericSort(a, b, getter, dir)
          if (cmp !== 0) return cmp
        }
        return String(productDisplayName(a)).localeCompare(String(productDisplayName(b)), 'uk')
      })
    }
  }
  if (productsQtySort) {
    return [...products].sort((a, b) => {
      const qa = listItemSortQty(a)
      const qb = listItemSortQty(b)
      return productsQtySort === 'asc' ? qa - qb : qb - qa
    })
  }
  return [...products].sort((a, b) => {
    const nameA = listItemSortName(a)
    const nameB = listItemSortName(b)
    return String(nameA).localeCompare(String(nameB), 'uk')
  })
}

function filterProductsForTable(products) {
  const q = searchQuery.toLowerCase()
  let filtered = products.filter((item) => !q || listItemSearchText(item).toLowerCase().includes(q))
  if (isProductZakupkaCatalog()) {
    if (productsZakupkaLogisticsTypeFilter) {
      filtered = filtered.filter((item) => {
        if (isManualStockListItem(item)) return false
        return (listItemProduct(item).logisticsType || '') === productsZakupkaLogisticsTypeFilter
      })
    }
  }
  if (isProductUkraineCatalog() && productsUkraineWarehouseFilter) {
    filtered = filtered.filter((product) => productUkraineWarehouseValue(product) === productsUkraineWarehouseFilter)
  }
  return sortProductsForTable(filtered)
}

function productsTableBaseColCount() {
  if (isProductUkraineCatalog()) return UKRAINE_TABLE_COL_COUNT
  if (isProductZakupkaCatalog()) return ZAKUPKA_TABLE_COL_COUNT
  return 10
}

function productsTableColSpan() {
  return productsTableBaseColCount() + (productsDeleteMode ? 1 : 0)
}

function productUkraineCommissionToggleTh(label, field, extraClass = '') {
  const isAmount = ukraineCommissionDisplayModeRef(field)?.get() === 'amount'
  const title = productUkraineCommissionToggleTitle(field)
  const modeClass = isAmount ? 'product-ukraine-commission-toggle--amount' : 'product-ukraine-commission-toggle--percent'
  return `
    <th class="${extraClass} product-ukraine-commission-toggle-th">
      <button type="button" class="product-ukraine-commission-toggle ${modeClass}" data-ukraine-commission-toggle="${field}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">${escapeHtml(label)}</button>
    </th>`
}

function productTableTh(label, extraClass = '', title = '') {
  const titleAttr = title ? ` title="${escapeHtml(title)}"` : ''
  const ariaLabel = !label && title ? ` aria-label="${escapeHtml(title)}"` : ''
  return `<th class="${extraClass}"${titleAttr}${ariaLabel}>${escapeHtml(label)}</th>`
}

function productZakupkaTableTh(lines, extraClass = '', title = '') {
  const parts = Array.isArray(lines) ? lines : [lines]
  const fullTitle = title || parts.join(' ')
  const label = parts.map((part) => escapeHtml(part)).join('<br>')
  return `<th class="${extraClass} product-zakupka-th" title="${escapeHtml(fullTitle)}"><span class="product-zakupka-th-label">${label}</span></th>`
}

function productZakupkaColToggleTh(lines, toggleKey, extraClass = '') {
  const isUnit = zakupkaColModeRef(toggleKey)?.get() === 'unit'
  const title = productZakupkaColToggleTitle(toggleKey)
  const modeClass = isUnit ? 'product-zakupka-col-toggle--unit' : 'product-zakupka-col-toggle--all'
  const parts = Array.isArray(lines) ? lines : [lines]
  const label = parts.map((part) => escapeHtml(part)).join('<br>')
  return `
    <th class="${extraClass} product-zakupka-th product-zakupka-col-toggle-th">
      <button type="button" class="product-sort-btn product-zakupka-col-toggle ${modeClass}" data-zakupka-col-toggle="${toggleKey}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">
        <span class="product-zakupka-th-label">${label}</span>
      </button>
    </th>`
}

function productsTableColgroup() {
  const deleteCol = productsDeleteMode
    ? '<col class="product-delete-col task-delete-col" />'
    : ''
  if (isProductZakupkaCatalog()) {
    return `<col class="product-num-col" />
      <col class="product-col-name" />
      <col class="product-col-amount" />
      <col class="product-col-qty" />
      <col class="product-col-weight" />
      <col class="product-col-date" />
      <col class="product-col-date" />
      <col class="product-col-date" />
      <col class="product-col-logistics-type" />
      <col class="product-col-amount" />
      <col class="product-col-amount" />
      <col class="product-col-amount" />
      <col class="product-col-amount" />
      <col class="product-col-total" />
      ${deleteCol}`
  }
  const ukrainePriceCol = ''
  const ukraineMarginCol = ''
  if (isProductUkraineCatalog()) {
    const lastCol = productsDeleteMode
      ? '<col class="product-delete-col task-delete-col product-col-ukraine-static-last" />'
      : '<col class="product-col-amount product-col-ukraine-margin-rozetka product-col-ukraine-static-last" />'
    return `<col class="product-num-col product-col-ukraine-static-first" />
      <col class="product-col-name product-col-ukraine-static-second" />
      <col class="product-col-sku product-col-ukraine-dynamic" />
      <col class="product-col-qty product-col-ukraine-dynamic" />
      <col class="product-col-warehouse product-col-ukraine-dynamic" />
      <col class="product-col-amount product-col-ukraine-price-prom product-col-ukraine-dynamic" />
      <col class="product-col-amount product-col-ukraine-price-rozetka product-col-ukraine-dynamic" />
      <col class="product-col-amount product-col-ukraine-cost product-col-ukraine-dynamic" />
      <col class="product-col-amount product-col-ukraine-commission-prom product-col-ukraine-dynamic" />
      <col class="product-col-amount product-col-ukraine-commission-rozetka product-col-ukraine-dynamic" />
      <col class="product-col-amount product-col-ukraine-margin-prom product-col-ukraine-dynamic" />
      ${lastCol}`
  }
  return `<col class="product-num-col" />
      <col class="product-col-name" />
      <col class="product-col-sku" />
      <col class="product-col-qty" />
      <col class="product-col-price" />
      <col class="product-col-price" />
      ${ukrainePriceCol}
      <col class="product-col-price" />
      <col class="product-col-price" />
      ${ukraineMarginCol}
      ${deleteCol}
      <col class="product-col-warehouse" />`
}

function productsTableHeadRow() {
  const deleteTh = productsDeleteMode
    ? productTableTh('', 'product-delete-col task-delete-col', 'Видалити')
    : ''
  if (isProductZakupkaCatalog()) {
    return `
      ${productZakupkaTableTh('№', 'product-num-col')}
      ${productZakupkaTableTh('Товар', 'product-col-name-th')}
      ${productZakupkaColToggleTh('Вартість', 'purchase', 'product-col-amount-th')}
      ${productQtySortTh()}
      ${productZakupkaTableTh('Вага', 'product-col-weight-th')}
      ${productZakupkaDateSortTh(['Дата', 'оплати'], 'paymentDate', 'product-col-date-th')}
      ${productZakupkaDateSortTh(['Дата', 'отправки'], 'shippingDate', 'product-col-date-th')}
      ${productZakupkaDateSortTh(['Дата', 'Прибуття'], 'arrivalDate', 'product-col-date-th')}
      ${productZakupkaLogisticsTypeFilterTh()}
      ${productZakupkaTableTh(['Ціна', 'логістики'], 'product-col-amount-th', 'Ціна логістики (у.е./кг)')}
      ${productZakupkaColToggleTh(['Вартість', 'логістики'], 'logisticsValue', 'product-col-amount-th')}
      ${productZakupkaTableTh(['Логістика', 'по Україні'], 'product-col-amount-th', 'Логістика по Україні')}
      ${productZakupkaColToggleTh('Розміщення', 'placement', 'product-col-amount-th')}
      ${productZakupkaColToggleTh('Total', 'total', 'product-col-total-th product-zakupka-total-th')}
      ${deleteTh}`
  }
  if (isProductUkraineCatalog()) {
    return `
      ${productTableTh('№', 'product-num-col')}
      ${productTableTh('Назва', 'product-col-name-th')}
      ${productTableTh('Артикул', 'product-col-sku-th')}
      ${productUkraineSortTh('Залишок', 'stock', 'product-col-qty-th', 'Залишок фактичний')}
      ${productUkraineWarehouseFilterTh()}
      ${productTableTh('Prom', 'product-col-amount-th product-ukraine-price-prom-th', 'Ціна Prom')}
      ${productTableTh('Rozetka', 'product-col-amount-th product-ukraine-price-rozetka-th', 'Ціна Rozetka')}
      ${productUkraineSortTh('Собіварт.', 'cost', 'product-col-amount-th product-ukraine-cost-th', 'Собівартість за 1 шт.')}
      ${productUkraineCommissionToggleTh('Prom%', 'commissionProm', 'product-col-amount-th product-ukraine-commission-prom-th')}
      ${productUkraineCommissionToggleTh('Rozetka%', 'commissionRozetka', 'product-col-amount-th product-ukraine-commission-rozetka-th')}
      ${productUkraineSortTh('М. Prom', 'marginProm', 'product-col-amount-th product-ukraine-margin-prom-th', 'Маржа Prom')}
      ${productUkraineSortTh('М. Rozetka', 'marginRozetka', 'product-col-amount-th product-ukraine-margin-rozetka-th', 'Маржа Rozetka')}
      ${deleteTh}`
  }
  return `
      ${productTableTh('№', 'product-num-col')}
      ${productTableTh('Назва', 'product-col-name-th')}
      ${productTableTh('SKU', 'product-col-sku-th', 'Артикул (SKU)')}
      ${productQtySortTh()}
      ${productTableTh('Закупка', 'product-col-price-th', 'Ціна закупка')}
      ${productTableTh('Логістика', 'product-col-price-th')}
      ${productTableTh('Комісія%', 'product-col-price-th', 'Комісія (%)')}
      ${deleteTh}
      ${productTableTh('Склад', 'product-col-warehouse-th')}`
}

function productNumCell(index) {
  return `<td class="product-num-cell">${index + 1}</td>`
}

function productZakupkaFieldAttrs(product, field, line = null) {
  const lineAttr = line?.id ? ` data-product-line-id="${line.id}"` : ''
  return `data-product-id="${product.id}"${lineAttr} data-zakupka-field="${field}"`
}

function productZakupkaCollapsedDisplay(product, field) {
  const line = productZakupkaPrimaryLine(product)
  if (field === 'purchasePrice') {
    return productZakupkaAmountLabel(productZakupkaPurchaseDisplayValue(product, line))
  }
  if (field === 'logistics') {
    return productZakupkaLogisticsPriceLabel(product, line)
  }
  if (field === 'logisticsValue') {
    return productZakupkaLogisticsValueLabel(product, line)
  }
  if (field === 'ukraineLogistics') {
    return productZakupkaUkraineLogisticsAmountLabel(product, line)
  }
  if (field === 'placement') {
    return productZakupkaPlacementAmountLabel(product, line)
  }
  if (field === 'qty') {
    const qty = line ? productZakupkaLineQtyValue(line) : productZakupkaQtyValue(product)
    return Number.isFinite(qty) ? `${fmt(qty)} шт.` : '—'
  }
  if (field === 'weight') return productZakupkaWeightLabel(product, line)
  if (['paymentDate', 'shippingDate', 'arrivalDate'].includes(field)) {
    return productZakupkaDateDisplay(product, field, line)
  }
  if (field === 'logisticsType') return (line?.logisticsType || product.logisticsType) || '—'
  return '—'
}

function productZakupkaCollapsedCellInner(product, field) {
  const text = productZakupkaCollapsedDisplay(product, field)
  const emptyFallback = field === 'logisticsValue' ? '' : '—'
  const indicator = productZakupkaCollapsedCompareIndicator(product, field)
  if (indicator) {
    const valueText = text || emptyFallback
    return `<span class="product-collapsed-with-compare"><span class="product-collapsed-value">${escapeHtml(valueText)}</span>${indicator}</span>`
  }
  return escapeHtml(text || emptyFallback)
}

function productZakupkaReadOnlyCell(product, field, colClass) {
  const text = productZakupkaCollapsedDisplay(product, field)
  const emptyFallback = field === 'logisticsValue' ? '' : '—'
  const inner = productZakupkaCollapsedCellInner(product, field)
  const hasHtml = inner.includes('product-collapsed-with-compare')
  return productReadOnlyCell(hasHtml ? inner : text, `${colClass} product-zakupka-read-cell product-zakupka-read-${field}`, text, { html: hasHtml, emptyFallback })
}

function productZakupkaExtraSkus(product) {
  if (!Array.isArray(product?.extraSkus)) return []
  return product.extraSkus.map((sku) => String(sku || '').trim())
}

function productZakupkaAllSkus(product) {
  return [productZakupkaSkuValue(product), ...productZakupkaExtraSkus(product)]
}

function productZakupkaSkusJoined(product) {
  return productZakupkaAllSkus(product).filter(Boolean).join(', ')
}

function productZakupkaSkuValue(product) {
  return String(product?.sku || '').trim()
}

function productZakupkaSkuFieldAttrs(product, index) {
  return `data-product-id="${product.id}" data-zakupka-field="sku" data-zakupka-sku-index="${index}"`
}

function productZakupkaSkuInput(product, sku, index, { showAddButton = false, showDeleteButton = false } = {}) {
  const size = productDetailControlSize(sku || 'Артикул', 6, 18)
  const addBtn = showAddButton
    ? `<button type="button" class="product-detail-add-line-btn product-zakupka-add-sku-btn" data-product-add-sku="${product.id}" title="Додати артикул" aria-label="Додати артикул">+</button>`
    : ''
  const deleteBtn = showDeleteButton
    ? `<button type="button" class="product-detail-delete-line-btn product-zakupka-delete-sku-btn" data-product-delete-sku="${product.id}" data-zakupka-sku-index="${index}" title="Видалити артикул" aria-label="Видалити артикул">×</button>`
    : ''
  return `<span class="product-zakupka-sku-field-wrap"><span class="product-zakupka-sku-label">Артикул</span><input type="text" size="${size}" class="table-input zakupka-field-input product-zakupka-sku-input product-detail-control product-detail-control-fit" ${productZakupkaSkuFieldAttrs(product, index)} value="${escapeHtml(sku)}" placeholder="—" aria-label="Артикул" />${addBtn}${deleteBtn}</span>`
}

function productZakupkaNameInput(product) {
  const size = productDetailControlSize(product.name || 'Товар', 6, 24)
  return `<input type="text" size="${size}" class="table-input zakupka-field-input product-zakupka-name-input product-detail-control product-detail-control-fit" ${productZakupkaFieldAttrs(product, 'name')} value="${escapeHtml(product.name || '')}" placeholder="Товар" aria-label="Товар" />`
}

function productZakupkaNameRowFields(product) {
  const skus = productZakupkaAllSkus(product)
  const skuFields = skus.map((sku, index) => productZakupkaSkuInput(product, sku, index, {
    showAddButton: index === 0,
    showDeleteButton: index > 0,
  })).join('')
  return `<div class="product-zakupka-name-row-fields">${productZakupkaNameInput(product)}${skuFields}</div>`
}

function addProductZakupkaSku(productId) {
  const product = db.get('products', productId)
  if (!product || productCatalogOf(product) !== 'zakupka') return null
  const extraSkus = productZakupkaExtraSkus(product)
  extraSkus.push('')
  return db.update('products', productId, { extraSkus })
}

function removeProductZakupkaSku(productId, index) {
  const skuIndex = Number(index)
  if (!Number.isFinite(skuIndex) || skuIndex <= 0) return null
  const product = db.get('products', productId)
  if (!product || productCatalogOf(product) !== 'zakupka') return null
  const extraSkus = productZakupkaExtraSkus(product)
  extraSkus.splice(skuIndex - 1, 1)
  return db.update('products', productId, { extraSkus })
}

function productZakupkaAmountInput(product, field, label, line = null) {
  const source = productZakupkaLineSource(line, product)
  const raw = field === 'placement' ? Number(source.placement) || 0 : source[field]
  const value = amountInputFieldDisplay(raw)
  const size = productDetailControlSize(value || '0', 5, 14)
  const filled = value ? ' account-amount-input--filled' : ''
  return `<input type="text" inputmode="decimal" size="${size}" class="table-input account-amount-input zakupka-field-input zakupka-amount-input product-detail-control product-detail-control-fit${filled}" ${productZakupkaFieldAttrs(product, field, line)} value="${escapeHtml(value)}" placeholder="0,0000" aria-label="${escapeHtml(label)}" />`
}

function productZakupkaWeightInput(product, line = null) {
  const source = productZakupkaLineSource(line, product)
  const value = amountInputFieldDisplay(source.weight)
  const size = productDetailControlSize(value || '0', 5, 10)
  const filled = value ? ' account-amount-input--filled' : ''
  return `<input type="text" inputmode="decimal" size="${size}" class="table-input account-amount-input zakupka-field-input zakupka-amount-input product-zakupka-weight-input product-detail-control product-detail-control-fit${filled}" ${productZakupkaFieldAttrs(product, 'weight', line)} value="${escapeHtml(value)}" placeholder="0,0000" aria-label="Вага" />`
}

function productZakupkaQtyInput(product, line = null) {
  const source = productZakupkaLineSource(line, product)
  const qty = source.qty != null ? String(source.qty) : '0'
  const size = productDetailControlSize(qty, 3, 8)
  return `<input type="number" size="${size}" min="0" step="1" class="table-input zakupka-field-input product-zakupka-qty-input product-detail-control product-detail-control-fit" ${productZakupkaFieldAttrs(product, 'qty', line)} value="${escapeHtml(qty)}" aria-label="Кількість" />`
}

function productZakupkaDateInput(product, field, label, line = null) {
  const value = productZakupkaDateValue(product, field, line)
  return `<input type="date" class="table-input zakupka-field-input zakupka-date-input product-detail-control product-detail-control-fit product-detail-date-input" ${productZakupkaFieldAttrs(product, field, line)} value="${escapeHtml(value)}" aria-label="${escapeHtml(label)}" />`
}

function productZakupkaLogisticsTypeInput(product, line = null) {
  const source = productZakupkaLineSource(line, product)
  const selected = source.logisticsType || ''
  const options = ['<option value="">—</option>'].concat(
    ZAKUPKA_LOGISTICS_TYPES.map((type) => `<option value="${escapeHtml(type)}"${type === selected ? ' selected' : ''}>${escapeHtml(type)}</option>`),
  ).join('')
  return `<select class="table-input table-select zakupka-field-input zakupka-logistics-select product-detail-control product-detail-control-fit" ${productZakupkaFieldAttrs(product, 'logisticsType', line)} aria-label="Тип логістики">${options}</select>`
}

function productZakupkaLogisticsPriceInput(product, line = null) {
  const value = amountInputFieldDisplay(productZakupkaLogisticsUnitValue(product, line))
  const size = productDetailControlSize(value || '0', 5, 14)
  const filled = value ? ' account-amount-input--filled' : ''
  return `<span class="zakupka-logistics-price-field product-detail-control product-detail-control-fit">
    <input type="text" inputmode="decimal" size="${size}" class="table-input account-amount-input zakupka-field-input zakupka-amount-input zakupka-logistics-price-input product-detail-control-fit${filled}" ${productZakupkaFieldAttrs(product, 'logistics', line)} value="${escapeHtml(value)}" placeholder="0,0000" autocomplete="off" aria-label="Ціна логістики (у.е./кг)" />
    <span class="zakupka-logistics-price-suffix" aria-hidden="true">у.е.</span>
  </span>`
}

function productZakupkaLogisticsValueInput(product, line = null) {
  const value = amountInputFieldDisplay(productZakupkaLogisticsValueUnitStored(product, line))
  const size = productDetailControlSize(value || '0', 5, 14)
  const filled = value ? ' account-amount-input--filled' : ''
  return `<input type="text" inputmode="decimal" size="${size}" class="table-input account-amount-input zakupka-field-input zakupka-amount-input product-zakupka-logistics-value-input product-detail-control product-detail-control-fit${filled}" ${productZakupkaFieldAttrs(product, 'logisticsValue', line)} value="${escapeHtml(value)}" placeholder="0,0000" aria-label="Вартість логістики за 1 шт." />`
}

function productManualStockTotalInput(product, line = null) {
  const sourceLine = product?._manualStockLine || line
  const value = sourceLine ? manualStockLineTotalValue(sourceLine) : 0
  const display = Number.isFinite(value) && value !== 0 ? amountInputFieldDisplay(value) : ''
  const size = productDetailControlSize(display || '0', 5, 14)
  const filled = display ? ' account-amount-input--filled' : ''
  return `<input type="text" inputmode="decimal" size="${size}" class="table-input account-amount-input zakupka-field-input zakupka-amount-input product-manual-stock-total-input product-detail-control product-detail-control-fit${filled}" ${productZakupkaFieldAttrs(product, 'manualTotal', sourceLine)} value="${escapeHtml(display)}" placeholder="0,0000" aria-label="Сума" />`
}

function productZakupkaLineActionsContent(product, line, { showAddButton = false, showDeleteButton = false } = {}) {
  const addBtn = showAddButton
    ? `<button type="button" class="product-detail-add-line-btn" data-product-add-line="${product.id}" title="Додати рядок" aria-label="Додати рядок">+</button>`
    : ''
  const deleteBtn = showDeleteButton
    ? `<button type="button" class="product-detail-delete-line-btn" data-product-delete-line="${product.id}" data-product-line-id="${line.id}" title="Видалити рядок" aria-label="Видалити рядок">×</button>`
    : ''
  return `<div class="product-detail-date-wrap">${addBtn}${deleteBtn}</div>`
}

function productZakupkaDetailNameRow(product, colSpan) {
  return `
    <tr class="task-detail-row product-detail-row product-detail-name-row-tr product-zakupka-name-row-tr" data-product-id="${product.id}" data-search="${escapeHtml(productZakupkaSearchText(product))}">
      <td class="product-num-cell"></td>
      <td colspan="${colSpan - 1}" class="product-detail-name-cell product-col-name-cell">
        ${productZakupkaNameRowFields(product)}
      </td>
    </tr>`
}

function productZakupkaDetailLineRow(product, line, { showAddButton = false, showDeleteButton = false, editableManualTotal = false } = {}) {
  const deleteCell = productsDeleteMode
    ? `<td class="product-detail-field-cell product-detail-field-cell--delete product-row-delete"><button type="button" class="btn-icon btn-delete-inline" data-product-delete-line="${product.id}" data-product-line-id="${line.id}" title="Видалити" aria-label="Видалити">×</button></td>`
    : ''
  const lineTotalLabel = productZakupkaAmountLabel(productZakupkaLineTotal(line))
  const totalTitle = productZakupkaTotalTitle(product)
  const totalCell = editableManualTotal && isUkraineManualStockLine(line)
    ? productManualStockTotalInput(product, line)
    : `<span class="product-detail-readonly-value product-zakupka-total-value product-zakupka-total-cell" title="${escapeHtml(totalTitle)}">${escapeHtml(lineTotalLabel)}</span>`
  return `
    <tr class="task-detail-row product-detail-row product-detail-fields-row-tr product-zakupka-detail-row-tr" data-product-id="${product.id}" data-product-line-id="${line.id}" data-search="${escapeHtml(productZakupkaSearchText(product))}">
      ${productDetailFieldTd('', 'num', 'product-num-cell')}
      ${productDetailFieldTd(productZakupkaLineActionsContent(product, line, { showAddButton, showDeleteButton }), 'name', 'product-col-name-cell product-zakupka-line-actions-cell')}
      ${productDetailFieldTd(productZakupkaDetailFieldWithCompare(product, line, 'purchasePrice', productZakupkaAmountInput(product, 'purchasePrice', 'Вартість', line)), 'amount', 'product-col-amount-cell')}
      ${productDetailFieldTd(productZakupkaQtyInput(product, line), 'qty', 'product-col-qty-cell')}
      ${productDetailFieldTd(productZakupkaWeightInput(product, line), 'weight', 'product-col-weight-cell')}
      ${productDetailFieldTd(productZakupkaDateInput(product, 'paymentDate', 'Дата оплати', line), 'date', 'product-col-date-cell')}
      ${productDetailFieldTd(productZakupkaDateInput(product, 'shippingDate', 'Дата отправки', line), 'date', 'product-col-date-cell')}
      ${productDetailFieldTd(productZakupkaDateInput(product, 'arrivalDate', 'Дата Прибуття', line), 'date', 'product-col-date-cell')}
      ${productDetailFieldTd(productZakupkaLogisticsTypeInput(product, line), 'logisticsType', 'product-col-logistics-type-cell')}
      ${productDetailFieldTd(productZakupkaDetailFieldWithCompare(product, line, 'logistics', productZakupkaLogisticsPriceInput(product, line)), 'amount', 'product-col-amount-cell')}
      ${productDetailFieldTd(productZakupkaDetailFieldWithCompare(product, line, 'logisticsValue', productZakupkaLogisticsValueInput(product, line)), 'logisticsValue', 'product-col-amount-cell')}
      ${productDetailFieldTd(productZakupkaDetailFieldWithCompare(product, line, 'ukraineLogistics', productZakupkaAmountInput(product, 'ukraineLogistics', 'Логістика по Україні', line)), 'amount', 'product-col-amount-cell')}
      ${productDetailFieldTd(productZakupkaDetailFieldWithCompare(product, line, 'placement', productZakupkaAmountInput(product, 'placement', 'Розміщення за 1 шт.', line)), 'amount', 'product-col-amount-cell')}
      ${productDetailFieldTd(totalCell, 'total', 'product-col-total-cell')}
      ${deleteCell}
    </tr>`
}

function productZakupkaTotalCell(product) {
  const text = productZakupkaTotalLabel(product)
  const title = productZakupkaTotalTitle(product)
  return productReadOnlyCell(text, 'product-zakupka-total-cell product-col-total-cell', title)
}

function productZakupkaDateFieldFromCell(cell) {
  if (!cell) return ''
  const match = [...cell.classList].find((cls) => cls.startsWith('product-zakupka-read-'))
  if (!match) return ''
  const field = match.slice('product-zakupka-read-'.length)
  return ['paymentDate', 'shippingDate', 'arrivalDate'].includes(field) ? field : ''
}

function focusZakupkaDateInput(productId, field) {
  if (!productId || !field) return
  const input = document.querySelector(
    `.product-zakupka-detail-row-tr[data-product-id="${productId}"] .zakupka-date-input[data-zakupka-field="${field}"]`,
  )
  if (!input) return
  input.focus()
  if (typeof input.showPicker === 'function') {
    try {
      input.showPicker()
    } catch {
      /* ignore if picker already open */
    }
  }
}

function productManualStockTitleCell(item) {
  const { product } = item
  const expandKey = item.id
  const isExpanded = expandedProductId === expandKey
  const name = productDisplayName(product)
  return `<td class="task-title-cell product-col-name-cell">
    <button type="button" class="task-title-toggle${isExpanded ? ' is-expanded' : ''}" data-product-expand="${escapeHtml(expandKey)}" aria-expanded="${isExpanded ? 'true' : 'false'}" title="${isExpanded ? 'Згорнути' : 'Деталі товару'}">
      <span class="task-title-value">${escapeHtml(name)}</span>
    </button>
  </td>`
}

function productManualStockZakupkaTableRow(item, index) {
  const { product, line } = item
  const viewProduct = manualStockItemAsZakupkaProduct(item)
  const deleteCell = productsDeleteMode
    ? `<td class="td-actions product-row-delete"><button type="button" class="btn-icon btn-delete-inline" data-product-delete-line="${product.id}" data-product-line-id="${line.id}" title="Видалити" aria-label="Видалити">×</button></td>`
    : ''
  const isExpanded = expandedProductId === item.id
  return `
    <tr class="product-table-row task-table-row product-zakupka-row product-manual-stock-row${isExpanded ? ' task-row-expanded' : ''}" data-product-id="${product.id}" data-manual-stock-item-id="${item.id}" data-manual-stock-line-id="${line.id}" data-search="${escapeHtml(manualStockListItemSearchText(item))}">
      ${productNumCell(index)}
      ${productManualStockTitleCell(item)}
      ${productZakupkaReadOnlyCell(viewProduct, 'purchasePrice', 'product-col-amount-cell')}
      ${productZakupkaReadOnlyCell(viewProduct, 'qty', 'product-col-qty-cell')}
      ${productZakupkaReadOnlyCell(viewProduct, 'weight', 'product-col-weight-cell')}
      ${productZakupkaReadOnlyCell(viewProduct, 'paymentDate', 'product-col-date-cell')}
      ${productZakupkaReadOnlyCell(viewProduct, 'shippingDate', 'product-col-date-cell')}
      ${productZakupkaReadOnlyCell(viewProduct, 'arrivalDate', 'product-col-date-cell')}
      ${productZakupkaReadOnlyCell(viewProduct, 'logisticsType', 'product-col-logistics-type-cell')}
      ${productZakupkaReadOnlyCell(viewProduct, 'logistics', 'product-col-amount-cell')}
      ${productZakupkaReadOnlyCell(viewProduct, 'logisticsValue', 'product-col-amount-cell')}
      ${productZakupkaReadOnlyCell(viewProduct, 'ukraineLogistics', 'product-col-amount-cell')}
      ${productZakupkaReadOnlyCell(viewProduct, 'placement', 'product-col-amount-cell')}
      ${productZakupkaTotalCell(viewProduct)}
      ${deleteCell}
    </tr>`
}

function productManualStockDetailRows(item, colSpan) {
  if (expandedProductId !== item.id) return ''
  const { line } = item
  const viewProduct = manualStockItemAsZakupkaProduct(item)
  const manualAttrs = ` data-manual-stock-line-id="${line.id}"`
  const nameRow = productZakupkaDetailNameRow(viewProduct, colSpan)
    .replace('product-zakupka-name-row-tr"', `product-zakupka-name-row-tr product-manual-stock-name-row-tr"${manualAttrs}`)
  const fieldRow = productZakupkaDetailLineRow(viewProduct, line, { showDeleteButton: productsDeleteMode, editableManualTotal: true })
    .replace('product-zakupka-detail-row-tr"', `product-zakupka-detail-row-tr product-manual-stock-detail-row-tr"${manualAttrs}`)
  return nameRow + fieldRow
}

function productZakupkaTableRow(product, index) {
  const deleteCell = productsDeleteMode
    ? `<td class="td-actions product-row-delete"><button type="button" class="btn-icon btn-delete-inline" data-delete-product="${product.id}" title="Видалити" aria-label="Видалити">×</button></td>`
    : ''
  const isExpanded = expandedProductId === product.id
  return `
    <tr class="product-table-row task-table-row product-zakupka-row${isExpanded ? ' task-row-expanded' : ''}" data-product-id="${product.id}" data-search="${escapeHtml(productZakupkaSearchText(product))}">
      ${productNumCell(index)}
      ${productTitleCell(product)}
      ${productZakupkaReadOnlyCell(product, 'purchasePrice', 'product-col-amount-cell')}
      ${productZakupkaReadOnlyCell(product, 'qty', 'product-col-qty-cell')}
      ${productZakupkaReadOnlyCell(product, 'weight', 'product-col-weight-cell')}
      ${productZakupkaReadOnlyCell(product, 'paymentDate', 'product-col-date-cell')}
      ${productZakupkaReadOnlyCell(product, 'shippingDate', 'product-col-date-cell')}
      ${productZakupkaReadOnlyCell(product, 'arrivalDate', 'product-col-date-cell')}
      ${productZakupkaReadOnlyCell(product, 'logisticsType', 'product-col-logistics-type-cell')}
      ${productZakupkaReadOnlyCell(product, 'logistics', 'product-col-amount-cell')}
      ${productZakupkaReadOnlyCell(product, 'logisticsValue', 'product-col-amount-cell')}
      ${productZakupkaReadOnlyCell(product, 'ukraineLogistics', 'product-col-amount-cell')}
      ${productZakupkaReadOnlyCell(product, 'placement', 'product-col-amount-cell')}
      ${productZakupkaTotalCell(product)}
      ${deleteCell}
    </tr>`
}

function productReadOnlyCell(text, extraClass = '', title = '', { html = false, emptyFallback = '—' } = {}) {
  const titleAttr = title ? ` title="${escapeHtml(String(title))}"` : ''
  const display = text ? text : emptyFallback
  const inner = html ? display : escapeHtml(display)
  return `<td class="task-readonly-cell ${extraClass}"${titleAttr}>${inner}</td>`
}

function productTitleCell(product) {
  const isExpanded = expandedProductId === product.id
  const name = productDisplayName(product)
  return `<td class="task-title-cell product-col-name-cell">
    <button type="button" class="task-title-toggle${isExpanded ? ' is-expanded' : ''}" data-product-expand="${product.id}" aria-expanded="${isExpanded ? 'true' : 'false'}" title="${isExpanded ? 'Згорнути' : 'Деталі товару'}">
      <span class="task-title-value">${escapeHtml(name)}</span>
    </button>
  </td>`
}

function productDetailSelect(productId, field, product, line = null) {
  if (field === 'warehouseId') {
    const options = getProductWarehouseOptions(true)
    if (options.length <= 1) return '<span class="muted">— Спочатку додайте склад —</span>'
    const selectedValue = line?.warehouseId ?? product.warehouseId
    const selected = selectedValue && options.some((o) => o.value === selectedValue)
      ? selectedValue
      : ''
    const lineAttr = line?.id ? ` data-product-line-id="${line.id}"` : ''
    return `<select class="table-input table-select task-detail-select product-pick-select product-detail-control product-detail-control-wide" data-product-id="${productId}"${lineAttr} data-field="warehouseId" aria-label="Склад">
      ${options.map((o) => `<option value="${escapeHtml(o.value)}"${o.value === selected ? ' selected' : ''}>${escapeHtml(o.label)}</option>`).join('')}
    </select>`
  }
  return '<span class="muted">—</span>'
}

function productDetailDateCellContent(product, line, { showAddButton = false, showDeleteButton = false } = {}) {
  const lineId = line.id
  const dateValue = productLineDateValue(line)
  const addBtn = showAddButton
    ? `<button type="button" class="product-detail-add-line-btn" data-product-add-line="${product.id}" title="Додати рядок" aria-label="Додати рядок">+</button>`
    : ''
  const deleteBtn = showDeleteButton
    ? `<button type="button" class="product-detail-delete-line-btn" data-product-delete-line="${product.id}" data-product-line-id="${lineId}" title="Видалити рядок" aria-label="Видалити рядок">×</button>`
    : ''
  const dateInput = `<input type="date" size="10" class="table-input product-detail-control product-detail-control-fit product-detail-date-input" data-product-id="${product.id}" data-product-line-id="${lineId}" value="${escapeHtml(dateValue)}" aria-label="Дата" />`
  return `<div class="product-detail-date-wrap">${addBtn}${deleteBtn}${dateInput}</div>`
}

function productDetailFieldsRow(product, colSpan, line, { showAddButton = false, showDeleteButton = false } = {}) {
  const deleteCell = productsDeleteMode
    ? `<td class="product-detail-field-cell product-detail-field-cell--delete product-row-delete"></td>`
    : ''
  const skuSize = productDetailControlSize(line.sku || 'SKU', 6, 18)
  const qtySize = productDetailControlSize(String(line.qty ?? '0'), 3, 8)
  const sumLabel = productMoneyLabel(productLineZakupkaSum(line))
  const skuField = `<input type="text" size="${skuSize}" class="table-input product-detail-control product-detail-control-fit product-detail-sku-input" data-product-id="${product.id}" data-product-line-id="${line.id}" value="${escapeHtml(line.sku || '')}" placeholder="SKU" aria-label="Артикул (SKU)" />`
  const qtyField = `<input type="number" size="${qtySize}" min="0" step="1" class="table-input product-detail-control product-detail-control-fit product-detail-qty-input" data-product-id="${product.id}" data-product-line-id="${line.id}" value="${line.qty != null ? String(line.qty) : '0'}" aria-label="Кількість" />`
  return `
    <tr class="task-detail-row product-detail-row product-detail-fields-row-tr" data-product-id="${product.id}" data-product-line-id="${line.id}" data-search="${escapeHtml(productSearchText(product))}">
      ${productDetailFieldTd('', 'num', 'product-num-cell')}
      ${productDetailFieldTd(productDetailDateCellContent(product, line, { showAddButton, showDeleteButton }), 'date', 'product-col-name-cell')}
      ${productDetailFieldTd(skuField, 'sku', 'product-col-sku-cell')}
      ${productDetailFieldTd(qtyField, 'qty', 'product-col-qty-cell')}
      ${productDetailFieldTd(productDetailMoneyInputContent(product, 'purchasePrice', 'Закупка', line), 'money', 'product-col-price-cell')}
      ${productDetailFieldTd(productDetailMoneyInputContent(product, 'logistics', 'Логістика', line), 'money', 'product-col-price-cell')}
      ${productDetailFieldTd(productDetailMoneyInputContent(product, 'commission', 'Доставка', line), 'money', 'product-col-price-cell')}
      ${productDetailFieldTd(`<span class="product-detail-sum-value product-detail-control product-detail-control-fit product-detail-readonly-value">${escapeHtml(sumLabel)}</span>`, 'sum', 'product-col-price-cell product-sum-cell')}
      ${productDetailFieldTd(`<span class="product-detail-grand-total-value product-detail-control product-detail-control-fit product-detail-readonly-value">${escapeHtml(productZakupkaGrandTotalLabel())}</span>`, 'grandTotal', 'product-col-price-cell product-grand-total-cell')}
      ${deleteCell}
      ${productDetailFieldTd(productDetailSelect(product.id, 'warehouseId', product, line), 'warehouse', 'product-col-warehouse-cell')}
    </tr>`
}

function productUkraineDetailSectionTitleTd(titleHtml, tone) {
  const colSpan = productsTableColSpan() - 1 - (productsDeleteMode ? 1 : 0)
  return `<td colspan="${colSpan}" class="product-detail-field-cell product-detail-field-cell--name product-ukraine-${tone}-title-cell">${titleHtml}</td>`
}

function productUkraineOrderDetailHeaderRows() {
  const deleteCell = productUkraineDetailDeleteCell()
  return `
    <tr class="task-detail-row product-detail-row product-ukraine-order-header-row-tr">
      ${productDetailFieldTd('', 'num', 'product-num-cell')}
      ${productUkraineDetailSectionTitleTd('<span class="product-ukraine-order-section-title">Продажі</span>', 'order')}
      ${deleteCell}
    </tr>
    <tr class="task-detail-row product-detail-row product-ukraine-order-label-row-tr" aria-hidden="true">
      ${productDetailFieldTd('', 'num', 'product-num-cell')}
      ${productDetailFieldTd('<span class="product-ukraine-order-col-label">Дата</span>', 'date', 'product-col-name-cell')}
      ${productDetailFieldTd('<span class="product-ukraine-order-col-label">Клієнт</span>', 'sku', 'product-col-sku-cell')}
      ${productDetailFieldTd('<span class="product-ukraine-order-col-label">Статус</span>', 'status', 'product-col-status-cell product-ukraine-order-status-cell')}
      ${productDetailFieldTd('<span class="product-ukraine-order-col-label">К-ть</span>', 'qty', 'product-col-qty-cell product-ukraine-stock-cell')}
      ${productUkraineDetailEmptyTd('product-col-warehouse-cell product-ukraine-warehouse-cell')}
      ${productDetailFieldTd('<span class="product-ukraine-order-col-label">Ціна</span>', 'money', 'product-col-amount-cell product-ukraine-price-prom-cell')}
      ${productDetailFieldTd('<span class="product-ukraine-order-col-label">Сума</span>', 'money', 'product-col-amount-cell product-ukraine-price-rozetka-cell')}
      ${productDetailFieldTd('<span class="product-ukraine-order-col-label">Собівартість</span>', 'money', 'product-col-amount-cell product-ukraine-cost-cell')}
      ${productDetailFieldTd('<span class="product-ukraine-order-col-label">Маржа</span>', 'money', 'product-col-amount-cell product-ukraine-commission-prom-cell product-ukraine-order-margin-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-commission-rozetka-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-margin-prom-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-margin-rozetka-cell')}
      ${deleteCell}
    </tr>`
}

function productDetailUkraineOrderRow(product, tx, fifoCosts = null) {
  const deleteCell = productUkraineDetailDeleteCell()
  const soldQty = orderTransactionQtyValue(tx)
  const customer = tx.firstName || '—'
  const unitPrice = orderTransactionUnitPrice(tx)
  const lineTotal = orderTransactionLineTotal(tx)
  const fifo = fifoCosts?.get?.(tx.id) || null
  const fifoUnitCost = fifo?.unitCost ?? null
  const costLabel = fifoUnitCost != null && Number.isFinite(fifoUnitCost)
    ? productMoneyLabel(fifoUnitCost)
    : '—'
  const marginLabel = productUkraineOrderTransactionFifoMarginLabel(product, tx, fifoUnitCost)
  return `
    <tr class="task-detail-row product-detail-row product-ukraine-order-row-tr" data-order-tx-id="${tx.id}" data-search="${escapeHtml(productSearchText(product))}">
      ${productDetailFieldTd('', 'num', 'product-num-cell')}
      ${productDetailFieldTd(orderTransactionDateCellHtml(tx), 'date', 'product-col-name-cell')}
      ${productDetailFieldTd(`<span class="product-detail-readonly-value product-ukraine-order-client">${escapeHtml(customer)}</span>`, 'sku', 'product-col-sku-cell')}
      ${productDetailFieldTd(renderOrderTransactionStatusBadge(tx.status, { extraClass: 'product-ukraine-order-status' }), 'status', 'product-col-status-cell product-ukraine-order-status-cell')}
      ${productDetailFieldTd(`<span class="product-detail-readonly-value product-ukraine-order-qty">${escapeHtml(String(soldQty))}</span>`, 'qty', 'product-col-qty-cell product-ukraine-stock-cell')}
      ${productUkraineDetailEmptyTd('product-col-warehouse-cell product-ukraine-warehouse-cell')}
      ${productDetailFieldTd(`<span class="product-detail-readonly-value product-ukraine-order-price">${escapeHtml(productMoneyLabel(unitPrice))}</span>`, 'money', 'product-col-amount-cell product-ukraine-price-prom-cell')}
      ${productDetailFieldTd(`<span class="product-detail-readonly-value product-ukraine-order-sum">${escapeHtml(productMoneyLabel(lineTotal))}</span>`, 'money', 'product-col-amount-cell product-ukraine-price-rozetka-cell')}
      ${productDetailFieldTd(`<span class="product-detail-readonly-value product-ukraine-order-cost">${escapeHtml(costLabel)}</span>`, 'money', 'product-col-amount-cell product-ukraine-cost-cell')}
      ${productDetailFieldTd(`<span class="product-detail-readonly-value product-ukraine-order-margin">${escapeHtml(marginLabel)}</span>`, 'money', 'product-col-amount-cell product-ukraine-commission-prom-cell product-ukraine-order-margin-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-commission-rozetka-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-margin-prom-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-margin-rozetka-cell')}
      ${deleteCell}
    </tr>`
}

function productUkraineOrderDetailRows(product) {
  const monthKey = resolveProductPagePeriodMonthKey()
  const fifoCosts = computeUkraineOrderTransactionFifoCosts(product)
  const transactions = orderTransactionsForProductInMonth(product, monthKey)
    .slice()
    .sort((a, b) => new Date(b.date || b.createdAt || 0).getTime() - new Date(a.date || a.createdAt || 0).getTime())
  if (!transactions.length) return ''
  return productUkraineOrderDetailHeaderRows()
    + transactions.map((tx) => productDetailUkraineOrderRow(product, tx, fifoCosts)).join('')
}

function productUkraineReplenishmentDetailHeaderRows() {
  const deleteCell = productUkraineDetailDeleteCell()
  return `
    <tr class="task-detail-row product-detail-row product-ukraine-replenishment-header-row-tr">
      ${productDetailFieldTd('', 'num', 'product-num-cell')}
      ${productUkraineDetailSectionTitleTd('<span class="product-ukraine-replenishment-section-title">Поповнення</span>', 'replenishment')}
      ${deleteCell}
    </tr>
    <tr class="task-detail-row product-detail-row product-ukraine-replenishment-label-row-tr" aria-hidden="true">
      ${productDetailFieldTd('', 'num', 'product-num-cell')}
      ${productDetailFieldTd('<span class="product-ukraine-replenishment-col-label">Дата</span>', 'name', 'product-col-name-cell')}
      ${productUkraineDetailEmptyTd('product-col-sku-cell')}
      ${productDetailFieldTd('<span class="product-ukraine-replenishment-col-label">Кількість</span>', 'qty', 'product-col-qty-cell')}
      ${productUkraineDetailEmptyTd('product-col-warehouse-cell product-ukraine-warehouse-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-price-prom-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-price-rozetka-cell')}
      ${productDetailFieldTd('<span class="product-ukraine-replenishment-col-label">Собівартість</span>', 'money', 'product-col-amount-cell product-ukraine-cost-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-commission-prom-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-commission-rozetka-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-margin-prom-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-margin-rozetka-cell')}
      ${deleteCell}
    </tr>`
}

function productDetailUkraineReplenishmentRow(product, event) {
  const deleteCell = productsDeleteMode && event.source === 'manual' && event.lineId
    ? `<td class="product-detail-field-cell product-detail-field-cell--delete product-row-delete"><button type="button" class="btn-icon btn-delete-inline" data-product-delete-line="${product.id}" data-product-line-id="${event.lineId}" title="Видалити" aria-label="Видалити">×</button></td>`
    : productUkraineDetailDeleteCell()
  const line = event.lineId ? getProductLine(product, event.lineId) : null
  const costContent = event.source === 'manual' && event.lineId
    ? productDetailMoneyInputContent(product, 'unitCost', 'Собівартість', line || { id: event.lineId, unitCost: event.unitCost })
    : `<span class="product-detail-readonly-value product-ukraine-replenishment-cost">${escapeHtml(event.unitCostLabel)}</span>`
  const lineAttr = event.lineId ? ` data-product-line-id="${event.lineId}"` : ''
  return `
    <tr class="task-detail-row product-detail-row product-ukraine-replenishment-row-tr${event.source === 'manual' ? ' product-ukraine-replenishment-row-tr--manual' : ''}" data-product-id="${product.id}"${lineAttr} data-search="${escapeHtml(productSearchText(product))}">
      ${productDetailFieldTd('', 'num', 'product-num-cell')}
      ${productDetailFieldTd(`<span class="product-detail-readonly-value product-ukraine-replenishment-date">${escapeHtml(event.dateLabel || '—')}</span>`, 'name', 'product-col-name-cell')}
      ${productUkraineDetailEmptyTd('product-col-sku-cell')}
      ${productDetailFieldTd(`<span class="product-detail-readonly-value product-ukraine-replenishment-qty">${escapeHtml(fmt(event.qty))}</span>`, 'qty', 'product-col-qty-cell')}
      ${productUkraineDetailEmptyTd('product-col-warehouse-cell product-ukraine-warehouse-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-price-prom-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-price-rozetka-cell')}
      ${productDetailFieldTd(costContent, 'money', 'product-col-amount-cell product-ukraine-cost-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-commission-prom-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-commission-rozetka-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-margin-prom-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-margin-rozetka-cell')}
      ${deleteCell}
    </tr>`
}

function productUkraineReplenishmentDetailRows(product) {
  const events = listUkraineReplenishmentEvents(product)
  if (!events.length) return ''
  return productUkraineReplenishmentDetailHeaderRows()
    + events.map((event) => productDetailUkraineReplenishmentRow(product, event)).join('')
}

function productDetailUkraineFieldsRow(product, colSpan, line, { showAddButton = false, showDeleteButton = false } = {}) {
  const deleteCell = productsDeleteMode
    ? `<td class="product-detail-field-cell product-detail-field-cell--delete product-row-delete"></td>`
    : ''
  const displaySku = productDisplaySku(product)
  const lineQty = line.qty != null ? String(line.qty) : '0'
  const qtySize = productDetailControlSize(lineQty, 3, 8)
  const skuField = `<span class="product-detail-control product-detail-control-fit product-detail-readonly-value">${escapeHtml(displaySku || '—')}</span>`
  const qtyField = `<input type="number" size="${qtySize}" min="0" step="1" class="table-input product-detail-control product-detail-control-fit product-detail-qty-input" data-product-id="${product.id}" data-product-line-id="${line.id}" value="${lineQty}" aria-label="Кількість" />`
  return `
    <tr class="task-detail-row product-detail-row product-detail-fields-row-tr" data-product-id="${product.id}" data-product-line-id="${line.id}" data-search="${escapeHtml(productSearchText(product))}">
      ${productDetailFieldTd('', 'num', 'product-num-cell')}
      ${productDetailFieldTd(productDetailDateCellContent(product, line, { showAddButton, showDeleteButton }), 'date', 'product-col-name-cell')}
      ${productDetailFieldTd(skuField, 'sku', 'product-col-sku-cell')}
      ${productDetailFieldTd(qtyField, 'qty', 'product-col-qty-cell')}
      ${deleteCell}
      ${productDetailFieldTd(productDetailSelect(product.id, 'warehouseId', product, line), 'warehouse', 'product-col-warehouse-cell')}
    </tr>`
}

function productDateInputValue(product) {
  const raw = product.date || product.createdAt
  if (!raw) return ''
  try {
    const d = new Date(raw)
    if (Number.isNaN(d.getTime())) return ''
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${y}-${m}-${day}`
  } catch {
    return ''
  }
}

function productDetailControlSize(text, min = 4, max = 14) {
  const len = String(text ?? '').trim().length
  return Math.min(max, Math.max(min, len || min))
}

function syncProductDetailControlSize(input) {
  if (!input?.classList?.contains('product-detail-control-fit')) return
  if (input.classList.contains('product-detail-money-input')) {
    input.size = productDetailControlSize(input.value || '0', 5, 14)
  } else if (input.classList.contains('product-detail-commission-input')) {
    input.size = productDetailControlSize(input.value || '0', 2, 6)
  } else if (input.classList.contains('product-detail-qty-input')) {
    input.size = productDetailControlSize(input.value || '0', 3, 8)
  } else if (input.classList.contains('product-detail-sku-input')) {
    input.size = productDetailControlSize(input.value || 'SKU', 6, 18)
  }
}

function productDetailMoneyInputContent(product, field, label, line = null) {
  const productId = product.id
  const lineId = line?.id
  const source = line || product
  const value = amountInputFieldDisplay(source[field])
  const filled = value ? ' account-amount-input--filled' : ''
  const size = productDetailControlSize(value || '0', 5, 14)
  const lineAttr = lineId ? ` data-product-line-id="${lineId}"` : ''
  return `<input type="text" inputmode="decimal" size="${size}" class="table-input account-amount-input product-detail-money-input product-detail-control product-detail-control-fit${filled}"
    data-product-id="${productId}"${lineAttr} data-product-money-field="${field}" value="${escapeHtml(value)}" placeholder="0,0000" autocomplete="off" aria-label="${escapeHtml(label)}" />`
}

function productDetailCommissionInputContent(product, line = null) {
  const source = line || product
  const value = commissionInputFieldDisplay(source.commission)
  const size = productDetailControlSize(value || '0', 2, 6)
  const lineAttr = line?.id ? ` data-product-line-id="${line.id}"` : ''
  return `<input type="text" inputmode="decimal" size="${size}" class="table-input product-detail-commission-input product-detail-control product-detail-control-fit"
    data-product-id="${product.id}"${lineAttr} data-product-money-field="commission" value="${escapeHtml(value)}" placeholder="0" autocomplete="off" aria-label="Комісія (%)" />`
}

function productDetailFieldTd(content, extraClass = '', colClass = '') {
  const cls = extraClass ? ` product-detail-field-cell--${extraClass}` : ''
  const col = colClass ? ` ${colClass}` : ''
  return `<td class="product-detail-field-cell${cls}${col}">${content}</td>`
}

function productUkraineDetailEmptyTd(colClass = '') {
  return productDetailFieldTd('<span class="product-detail-readonly-value product-ukraine-detail-spacer">&nbsp;</span>', 'empty', colClass)
}

function productUkraineDetailDeleteCell() {
  return productsDeleteMode
    ? '<td class="product-detail-field-cell product-detail-field-cell--delete product-row-delete"></td>'
    : ''
}

function productUkraineDetailMiddleEmptyTds() {
  return `${productUkraineDetailEmptyTd('product-col-warehouse-cell product-ukraine-warehouse-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-price-prom-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-price-rozetka-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-commission-prom-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-commission-rozetka-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-margin-prom-cell')}
      ${productUkraineDetailEmptyTd('product-col-amount-cell product-ukraine-margin-rozetka-cell')}`
}

function productDetailRows(product, colSpan) {
  if (expandedProductId !== product.id) return ''
  if (isProductZakupkaCatalog()) {
    const withLines = ensureProductZakupkaLines(product)
    const lines = sortProductLines(withLines.lines || [])
    const nameRow = productZakupkaDetailNameRow(withLines, colSpan)
    const fieldRows = lines.map((line, index) => productZakupkaDetailLineRow(withLines, line, {
      showAddButton: index === 0,
      showDeleteButton: productsDeleteMode || lines.length > 1,
    })).join('')
    return nameRow + fieldRows
  }
  if (isProductUkraineCatalog()) {
    return productUkraineDetailNameRow(product, colSpan)
      + productUkraineDetailFieldsRow(product)
      + productUkraineReplenishmentDetailRows(product)
      + productUkraineOrderDetailRows(product)
      + productUkraineDetailInfoRow(product, colSpan)
  }
  return ''
}

function syncProductZakupkaDetailRow(productId, product) {
  if (!product) return
  const nameInput = document.querySelector(`tr.product-zakupka-name-row-tr[data-product-id="${productId}"] .product-zakupka-name-input`)
  if (nameInput && document.activeElement !== nameInput) {
    nameInput.value = product.name || ''
    syncProductDetailControlSize(nameInput)
  }
  document.querySelectorAll(`tr.product-zakupka-name-row-tr[data-product-id="${productId}"] .product-zakupka-sku-input`).forEach((input) => {
    if (input === document.activeElement) return
    const index = Number(input.dataset.zakupkaSkuIndex) || 0
    const skus = productZakupkaAllSkus(product)
    input.value = skus[index] || ''
    syncProductDetailControlSize(input)
  })
  document.querySelectorAll(`tr.product-zakupka-detail-row-tr[data-product-id="${productId}"]`).forEach((detailRow) => {
    const lineId = detailRow.dataset.productLineId
    const line = lineId ? getProductLine(product, lineId) : null
    detailRow.querySelectorAll('.zakupka-field-input').forEach((input) => {
      if (input === document.activeElement) return
      syncProductZakupkaDetailInput(input, product, line)
    })
    const totalValue = detailRow.querySelector('.product-zakupka-total-value')
    if (totalValue && line) {
      totalValue.textContent = productZakupkaAmountLabel(productZakupkaLineTotal(line))
      totalValue.title = productZakupkaTotalTitle(product)
    }
    if (line) {
      ZAKUPKA_COLLAPSED_COMPARE_FIELDS.forEach((field) => {
        const wrap = detailRow.querySelector(`[data-zakupka-compare-wrap="${field}"]`)
        if (!wrap) return
        const indicator = wrap.querySelector('.product-line-compare')
        const nextIndicator = productZakupkaLineCompareIndicator(product, line, field)
        if (indicator) {
          if (nextIndicator) indicator.outerHTML = nextIndicator
          else indicator.remove()
        } else if (nextIndicator) {
          wrap.insertAdjacentHTML('beforeend', nextIndicator)
        }
      })
    }
  })
}

function syncProductZakupkaDetailInput(input, product, line = null) {
  const field = input.dataset.zakupkaField
  if (!field) return
  const source = productZakupkaLineSource(line, product)
  if (field === 'name') {
    input.value = product.name || ''
    syncProductDetailControlSize(input)
  } else if (field === 'qty') {
    input.value = String(source.qty ?? 0)
    syncProductDetailControlSize(input)
  } else if (field === 'weight') {
    input.value = amountInputFieldDisplay(source.weight)
    syncAmountInputFilledState(input)
    syncProductDetailControlSize(input)
  } else if (['paymentDate', 'shippingDate', 'arrivalDate'].includes(field)) {
    input.value = productZakupkaDateValue(product, field, line)
  } else if (field === 'logisticsType') {
    input.value = source.logisticsType || ''
  } else if (field === 'logistics') {
    input.value = amountInputFieldDisplay(productZakupkaLogisticsUnitValue(product, line))
    syncAmountInputFilledState(input)
    syncProductDetailControlSize(input)
  } else if (field === 'logisticsValue') {
    const unitValue = productZakupkaLogisticsValueUnitStored(product, line)
    input.value = Number.isFinite(unitValue) && unitValue !== 0
      ? amountInputFieldDisplay(unitValue)
      : ''
    syncAmountInputFilledState(input)
    syncProductDetailControlSize(input)
  } else if (['purchasePrice', 'ukraineLogistics', 'placement'].includes(field)) {
    input.value = amountInputFieldDisplay(source[field])
    syncAmountInputFilledState(input)
    syncProductDetailControlSize(input)
  } else if (field === 'manualTotal') {
    const sourceLine = product._manualStockLine || line
    const value = sourceLine ? manualStockLineTotalValue(sourceLine) : 0
    input.value = Number.isFinite(value) && value !== 0 ? amountInputFieldDisplay(value) : ''
    syncAmountInputFilledState(input)
    syncProductDetailControlSize(input)
  }
}

function syncProductZakupkaRow(productId, product) {
  if (!product) return
  const row = document.querySelector(`tr.product-zakupka-row[data-product-id="${productId}"]`)
  if (!row) return
  row.dataset.search = productZakupkaSearchText(product)
  const titleValue = row.querySelector('.task-title-value')
  if (titleValue) titleValue.textContent = product.name || '—'
  ;['purchasePrice', 'qty', 'weight', 'paymentDate', 'shippingDate', 'arrivalDate', 'logisticsType', 'logistics', 'logisticsValue', 'ukraineLogistics', 'placement'].forEach((field) => {
    const cell = row.querySelector(`.product-zakupka-read-${field}`)
    if (!cell) return
    cell.innerHTML = productZakupkaCollapsedCellInner(product, field)
  })
  const totalCell = row.querySelector('.product-zakupka-total-cell')
  if (totalCell) {
    totalCell.textContent = productZakupkaTotalLabel(product)
    totalCell.title = productZakupkaTotalTitle(product)
  }
  syncProductZakupkaDetailRow(productId, product)
}

function syncProductCollapsedRow(productId, product) {
  if (!product) return
  if (isProductZakupkaCatalog()) {
    syncProductZakupkaRow(productId, product)
    return
  }
  if (isProductUkraineCatalog() || productCatalogOf(product) === 'ukraine') {
    syncProductUkraineRow(productId, product)
    return
  }
  const row = document.querySelector(`tr.product-table-row[data-product-id="${productId}"]`)
  if (!row) return
  row.dataset.search = productSearchText(product)
  const titleValue = row.querySelector('.task-title-value')
  if (titleValue) titleValue.textContent = productDisplayName(product)
  const skuCell = row.querySelector('.product-sku-cell')
  if (skuCell) skuCell.textContent = productDisplaySku(product)
  const qtyCell = row.querySelector('.product-qty-cell')
  if (qtyCell) qtyCell.textContent = productQtyLabel(product)
  const warehouseCell = row.querySelector('.product-warehouse-cell')
  if (warehouseCell) warehouseCell.textContent = productWarehouseLabel(product)
  PRODUCT_UKRAINE_COST_KEYS.forEach((key) => {
    const cell = row.querySelector(`.product-${key}-cell`)
    if (!cell) return
    let text
    if (key === 'purchasePrice' && isProductUkraineCatalog()) {
      text = productUkrainePurchaseLabel(product)
    } else if (key === 'commission' && isProductUkraineCatalog()) {
      text = productCommissionLabel(product)
    } else {
      text = key === 'purchasePrice'
        ? productMoneyLabel(productDisplayPurchasePrice(product))
        : productMoneyLabel(product[key])
    }
    cell.textContent = text
  })
  const sumCell = row.querySelector('.product-sum-cell')
  if (sumCell) sumCell.textContent = productMoneyLabel(productZakupkaTableSum(product))
  const grandTotalCell = row.querySelector('.product-grand-total-cell')
  if (grandTotalCell) grandTotalCell.textContent = productZakupkaGrandTotalLabel()
  const totalCell = row.querySelector('.product-total-cell')
  if (totalCell) totalCell.textContent = productUkraineTableTotalLabel(product)
  const priceCell = row.querySelector('.product-price-cell')
  if (priceCell) priceCell.textContent = productMoneyLabel(product.price)
  const marginCell = row.querySelector('.product-margin-cell')
  if (marginCell) marginCell.textContent = productMarginLabel(product)
}

function syncProductLineSum(productId, lineId, line) {
  const row = document.querySelector(`tr.product-detail-fields-row-tr[data-product-id="${productId}"][data-product-line-id="${lineId}"]`)
  if (!row) return
  const sumValue = row.querySelector('.product-detail-sum-value')
  if (sumValue) sumValue.textContent = productMoneyLabel(productLineZakupkaSum(line))
}

function syncProductUkraineLineDisplays(productId, lineId, product, line) {
  const row = document.querySelector(`tr.product-detail-fields-row-tr[data-product-id="${productId}"][data-product-line-id="${lineId}"]`)
  if (!row) return
  const dateInput = row.querySelector('.product-detail-date-input')
  if (dateInput && document.activeElement !== dateInput) {
    dateInput.value = productLineDateValue(line)
  }
  const warehouseSelect = row.querySelector('.product-pick-select')
  if (warehouseSelect) warehouseSelect.value = line.warehouseId || ''
  const skuReadonly = row.querySelector('.product-detail-field-cell--sku .product-detail-readonly-value')
  if (skuReadonly) skuReadonly.textContent = productDisplaySku(product) || '—'
  const qtyInput = row.querySelector('.product-detail-qty-input')
  if (qtyInput && document.activeElement !== qtyInput) {
    qtyInput.value = line.qty != null ? String(line.qty) : '0'
    syncProductDetailControlSize(qtyInput)
  }
}

function syncProductUkraineReplenishmentDisplays(productId, lineId, product, line) {
  const row = document.querySelector(`tr.product-ukraine-replenishment-row-tr[data-product-id="${productId}"][data-product-line-id="${lineId}"]`)
  if (!row) return
  const costInput = row.querySelector('.product-detail-money-input[data-product-money-field="unitCost"]')
  if (costInput && document.activeElement !== costInput) {
    costInput.value = amountInputFieldDisplay(line.unitCost)
    syncAmountInputFilledState(costInput)
    syncProductDetailControlSize(costInput)
  }
  const detailRow = document.querySelector(`tr.product-ukraine-detail-row-tr[data-product-id="${productId}"]`)
  const costValue = detailRow?.querySelector('.product-ukraine-detail-cost')
  if (costValue) costValue.textContent = productUkraineUnitCostLabel(product)
}

function syncProductLineDisplays(productId, lineId, product, line) {
  const row = document.querySelector(`tr.product-detail-fields-row-tr[data-product-id="${productId}"][data-product-line-id="${lineId}"]`)
  if (!row) return
  const dateInput = row.querySelector('.product-detail-date-input')
  if (dateInput && document.activeElement !== dateInput) {
    dateInput.value = productLineDateValue(line)
  }
  const skuInput = row.querySelector('.product-detail-sku-input')
  if (skuInput && document.activeElement !== skuInput) {
    skuInput.value = line.sku || ''
    syncProductDetailControlSize(skuInput)
  }
  const qtyInput = row.querySelector('.product-detail-qty-input')
  if (qtyInput && document.activeElement !== qtyInput) {
    qtyInput.value = line.qty != null ? String(line.qty) : '0'
    syncProductDetailControlSize(qtyInput)
  }
  const warehouseSelect = row.querySelector('.product-pick-select')
  if (warehouseSelect) warehouseSelect.value = line.warehouseId || ''
  PRODUCT_UKRAINE_COST_KEYS.forEach((key) => {
    const input = row.querySelector(`.product-detail-money-input[data-product-money-field="${key}"]`)
    if (input && document.activeElement !== input) {
      input.value = amountInputFieldDisplay(line[key])
      syncAmountInputFilledState(input)
      syncProductDetailControlSize(input)
    }
  })
  const sumValue = row.querySelector('.product-detail-sum-value')
  if (sumValue) sumValue.textContent = productMoneyLabel(productLineZakupkaSum(line))
}

function updateZakupkaProduct(productId, patch) {
  const current = db.get('products', productId)
  if (!current || productCatalogOf(current) !== 'zakupka') return null
  const previousSku = current.sku || ''
  const withLines = ensureProductZakupkaLines(current)

  if (patch.name != null) {
    const name = patch.name.trim()
    const updated = db.update('products', productId, { name })
    if (updated) syncUkraineRecordsFromZakupka(updated)
    return updated
  }

  if (patch.sku != null) {
    const index = Number(patch.skuIndex) || 0
    const skuValue = patch.sku.trim()
    if (index === 0) {
      const sku = skuValue || zakupkaSkuFromName(withLines.name) || ''
      const lines = (withLines.lines || []).map((line) => ({ ...line, sku }))
      const updated = db.update('products', productId, { sku, lines })
      if (updated) syncUkraineRecordsFromZakupka(updated)
      return updated
    }
    const extraSkus = productZakupkaExtraSkus(withLines)
    while (extraSkus.length < index) extraSkus.push('')
    extraSkus[index - 1] = skuValue
    const updated = db.update('products', productId, { extraSkus })
    if (updated) syncUkraineRecordsFromZakupka(updated)
    return updated
  }

  const lines = (withLines.lines || []).map((line) => enrichZakupkaLineFromProduct(line, withLines))
  if (!lines.length) return null
  const linePatch = { ...patch }
  if (linePatch.paymentDate != null) linePatch.date = linePatch.paymentDate
  lines[0] = { ...lines[0], ...linePatch }
  return syncProductLinesUpdate(productId, lines, previousSku)
}

function commitProductZakupkaLineField(target) {
  const id = target.dataset.productId
  const lineId = target.dataset.productLineId
  const field = target.dataset.zakupkaField
  if (!id || !lineId || !field) return

  const current = db.get('products', id)
  const line = getProductLine(current, lineId)
  if (!line) return

  let patch = {}
  if (field === 'qty') {
    const qty = Math.max(0, Number(target.value) || 0)
    target.value = String(qty)
    patch.qty = qty
  } else if (['paymentDate', 'shippingDate', 'arrivalDate'].includes(field)) {
    patch[field] = target.value || ''
    if (field === 'paymentDate') patch.date = patch.paymentDate
  } else if (field === 'logisticsType') {
    patch.logisticsType = target.value || ''
  } else if (field === 'logistics') {
    finalizeAmountInput(target)
    patch.logistics = parseAmountInput(target.value) ?? 0
  } else if (field === 'logisticsValue') {
    finalizeAmountInput(target)
    patch.logisticsValue = parseAmountInput(target.value) ?? 0
  } else if (['purchasePrice', 'ukraineLogistics', 'placement', 'weight'].includes(field)) {
    finalizeAmountInput(target)
    patch[field] = parseAmountInput(target.value) ?? 0
  } else if (field === 'manualTotal') {
    finalizeAmountInput(target)
    const manualTotal = parseAmountInput(target.value) ?? 0
    patch.manualTotal = manualTotal
    const qty = Math.max(0, Number(line.qty) || 0)
    patch.unitCost = qty > 0 ? manualTotal / qty : manualTotal
  } else {
    return
  }

  if (productCatalogOf(current) === 'ukraine' && isUkraineManualStockLine(line)) {
    if (patch.purchasePrice != null) {
      patch.unitCost = patch.purchasePrice
      patch.manualTotal = null
    }
    if (patch.qty != null && line.manualTotal != null && line.manualTotal !== '' && patch.manualTotal == null) {
      const manualTotal = Number(line.manualTotal)
      if (Number.isFinite(manualTotal)) {
        patch.unitCost = patch.qty > 0 ? manualTotal / patch.qty : manualTotal
      }
    }
    const updated = updateProductLine(id, lineId, patch)
    if (updated) {
      const freshLine = getProductLine(updated, lineId)
      syncManualStockZakupkaRow(id, lineId, updated, freshLine)
      syncProductUkraineRow(id, updated)
      syncWarehouseCapacityDisplays()
      if (field === 'paymentDate' && productsZakupkaDateSortState('paymentDate')) render()
      else if (field === 'qty' && productsQtySort) render()
      else if (
        ['paymentDate', 'shippingDate', 'arrivalDate'].includes(field)
        && productsZakupkaDateSortState(field)
      ) render()
      else if (field === 'logisticsType' && productsZakupkaLogisticsTypeFilter) render()
    }
    return
  }

  const updated = updateProductLine(id, lineId, patch)
  if (updated) {
    if (field === 'paymentDate' || field === 'arrivalDate') {
      syncUkraineRecordsFromZakupka(updated)
    }
    syncProductZakupkaRow(id, updated)
    if (field === 'paymentDate' && productsZakupkaDateSortState('paymentDate')) render()
    else if (field === 'qty' && productsQtySort) render()
    else if (
      ['paymentDate', 'shippingDate', 'arrivalDate'].includes(field)
      && productsZakupkaDateSortState(field)
    ) render()
    else if (field === 'logisticsType' && productsZakupkaLogisticsTypeFilter) render()
  }
}

function commitProductZakupkaField(target) {
  const id = target.dataset.productId
  const field = target.dataset.zakupkaField
  if (!id || !field) return

  if (target.dataset.productLineId && field !== 'name') {
    return commitProductZakupkaLineField(target)
  }

  const current = db.get('products', id)
  if (current && productCatalogOf(current) === 'ukraine') {
    if (field === 'name') {
      const updated = db.update('products', id, { name: target.value.trim() })
      if (updated) {
        syncManualStockZakupkaRowsForProduct(id, updated)
        syncProductUkraineRow(id, updated)
      }
      return
    }
    if (field === 'sku') {
      const sku = target.value.trim()
      target.value = sku
      syncProductDetailControlSize(target)
      const updated = db.update('products', id, { sku })
      if (updated) {
        syncManualStockZakupkaRowsForProduct(id, updated)
        syncProductUkraineRow(id, updated)
      }
      return
    }
  }

  let patch = {}
  if (field === 'name') {
    patch.name = target.value.trim()
  } else if (field === 'sku') {
    patch.skuIndex = Number(target.dataset.zakupkaSkuIndex) || 0
    patch.sku = target.value.trim()
    target.value = patch.sku
    syncProductDetailControlSize(target)
  } else if (field === 'qty') {
    const qty = Math.max(0, Number(target.value) || 0)
    target.value = String(qty)
    patch.qty = qty
  } else if (['paymentDate', 'shippingDate', 'arrivalDate'].includes(field)) {
    patch[field] = target.value || ''
  } else if (field === 'logisticsType') {
    patch.logisticsType = target.value || ''
  } else if (field === 'logistics') {
    finalizeAmountInput(target)
    patch.logistics = parseAmountInput(target.value) ?? 0
  } else if (field === 'logisticsValue') {
    finalizeAmountInput(target)
    patch.logisticsValue = parseAmountInput(target.value) ?? 0
  } else if (['purchasePrice', 'ukraineLogistics', 'placement', 'weight'].includes(field)) {
    finalizeAmountInput(target)
    patch[field] = parseAmountInput(target.value) ?? 0
  } else {
    return
  }

  const updated = updateZakupkaProduct(id, patch)
  if (updated) {
    syncProductZakupkaRow(id, updated)
    if (field === 'qty' && productsQtySort) render()
    else if (
      ['paymentDate', 'shippingDate', 'arrivalDate'].includes(field)
      && productsZakupkaDateSortState(field)
    ) render()
    else if (field === 'logisticsType' && productsZakupkaLogisticsTypeFilter) render()
  }
}

function syncProductDisplays(productId, product) {
  if (!product) return
  syncProductCollapsedRow(productId, product)
  if (productCatalogOf(product) === 'zakupka') return

  const nameValue = document.querySelector(`.product-detail-name-row-tr[data-product-id="${productId}"] .product-detail-name-value`)
  if (nameValue) nameValue.textContent = productDisplayName(product)

  if (productCatalogOf(product) === 'ukraine' && Array.isArray(product.lines)) {
    sortProductLines(product.lines).forEach((line) => {
      if (document.activeElement?.closest(`tr[data-product-line-id="${line.id}"]`)) return
      syncProductUkraineLineDisplays(productId, line.id, product, line)
    })
    return
  }

  const dateInput = document.querySelector(`.product-detail-date-input[data-product-id="${productId}"]:not([data-product-line-id])`)
  if (dateInput && document.activeElement !== dateInput) dateInput.value = productDateInputValue(product)
  const skuInput = document.querySelector(`.product-detail-sku-input[data-product-id="${productId}"]:not([data-product-line-id])`)
  if (skuInput && document.activeElement !== skuInput) {
    skuInput.value = product.sku || ''
    syncProductDetailControlSize(skuInput)
  }
  const qtyInput = document.querySelector(`.product-detail-qty-input[data-product-id="${productId}"]:not([data-product-line-id])`)
  if (qtyInput && document.activeElement !== qtyInput) {
    qtyInput.value = product.qty != null ? String(product.qty) : '0'
    syncProductDetailControlSize(qtyInput)
  }
  const warehouseSelect = document.querySelector(`.product-pick-select[data-product-id="${productId}"]:not([data-product-line-id])`)
  if (warehouseSelect) warehouseSelect.value = product.warehouseId || ''
  PRODUCT_UKRAINE_COST_KEYS.forEach((key) => {
    if (key === 'purchasePrice' && isProductUkraineCatalog()) return
    if (key === 'commission' && isProductUkraineCatalog()) {
      const commissionInput = document.querySelector(`.product-detail-commission-input[data-product-id="${productId}"]:not([data-product-line-id])`)
      if (commissionInput && document.activeElement !== commissionInput) {
        commissionInput.value = commissionInputFieldDisplay(product.commission)
        syncProductDetailControlSize(commissionInput)
      }
      return
    }
    const input = document.querySelector(`.product-detail-money-input[data-product-id="${productId}"][data-product-money-field="${key}"]:not([data-product-line-id])`)
    if (input && document.activeElement !== input) {
      input.value = amountInputFieldDisplay(product[key])
      syncAmountInputFilledState(input)
      syncProductDetailControlSize(input)
    }
  })
  const totalValue = document.querySelector(`.product-detail-fields-row-tr[data-product-id="${productId}"] .product-detail-total-value`)
  if (totalValue) totalValue.textContent = productMoneyLabel(productTableTotal(product))
  const marginValue = document.querySelector(`.product-detail-fields-row-tr[data-product-id="${productId}"] .product-detail-margin-value`)
  if (marginValue) marginValue.textContent = productMarginLabel(product)
  const linkedPurchase = document.querySelector(`.product-detail-fields-row-tr[data-product-id="${productId}"] .product-detail-linked-purchase-value`)
  if (linkedPurchase) linkedPurchase.textContent = productMoneyLabel(productDisplayPurchasePrice(product))
  const priceInput = document.querySelector(`.product-detail-money-input[data-product-id="${productId}"][data-product-money-field="price"]:not([data-product-line-id])`)
  if (priceInput && document.activeElement !== priceInput) {
    priceInput.value = amountInputFieldDisplay(product.price)
    syncAmountInputFilledState(priceInput)
    syncProductDetailControlSize(priceInput)
  }
}

function commitProductSkuField(input) {
  const id = input.dataset.productId
  const lineId = input.dataset.productLineId
  if (!id) return
  syncProductDetailControlSize(input)
  const sku = input.value.trim()
  if (lineId) {
    const updated = updateProductLine(id, lineId, { sku })
    if (updated) syncProductCollapsedRow(id, updated)
    return
  }
  const current = db.get('products', id)
  const updated = db.update('products', id, { sku })
  if (updated) {
    syncProductCollapsedRow(id, updated)
  }
}

function commitProductQtyField(input) {
  const id = input.dataset.productId
  const lineId = input.dataset.productLineId
  if (!id) return
  const qty = Math.max(0, Number(input.value) || 0)
  input.value = String(qty)
  syncProductDetailControlSize(input)
  if (lineId) {
    const updated = updateProductLine(id, lineId, { qty })
    if (updated) {
      syncProductCollapsedRow(id, updated)
      const line = getProductLine(updated, lineId)
      if (line) {
        if (productCatalogOf(updated) === 'zakupka') syncProductLineSum(id, lineId, line)
        else if (productCatalogOf(updated) === 'ukraine') syncProductUkraineLineDisplays(id, lineId, updated, line)
      }
      if (productsQtySort) render()
    }
    return
  }
  const updated = db.update('products', id, { qty })
  if (updated) {
    if (productsQtySort) render()
    else syncProductCollapsedRow(id, updated)
  }
}

function commitProductMoneyField(input) {
  const id = input.dataset.productId
  const lineId = input.dataset.productLineId
  const field = input.dataset.productMoneyField
  if (!id || !field) return
  const isCommissionPercent = input.classList.contains('product-detail-commission-input')
  if (isCommissionPercent) {
    const raw = input.value
    const parsed = parseAmountInput(raw)
    input.value = parsed != null ? commissionInputDisplay(parsed, { minDecimals: amountMinDecimalsFromRaw(raw) }) : ''
    syncProductDetailControlSize(input)
  } else {
    finalizeAmountInput(input)
    syncProductDetailControlSize(input)
  }
  const parsed = parseAmountInput(input.value)
  const value = parsed ?? 0
  const current = db.get('products', id)
  if (!current) return

  if (lineId && (productCatalogOf(current) === 'zakupka' || productCatalogOf(current) === 'ukraine')) {
    const updated = updateProductLine(id, lineId, { [field]: value })
    if (updated) {
      syncProductCollapsedRow(id, updated)
      const line = getProductLine(updated, lineId)
      if (!line) return
      if (productCatalogOf(updated) === 'zakupka') {
        syncProductLineSum(id, lineId, line)
      } else {
        syncProductUkraineLineDisplays(id, lineId, updated, line)
        if (field === 'unitCost') {
          syncProductUkraineReplenishmentDisplays(id, lineId, updated, line)
          syncProductUkraineRow(id, updated)
          if (isProductZakupkaCatalog()) syncManualStockZakupkaRow(id, lineId, updated, line)
          syncWarehouseCapacityDisplays()
        }
      }
    }
    return
  }

  if (field === 'price') {
    const updated = db.update('products', id, { price: value })
    if (updated) syncProductDisplays(id, updated)
    return
  }

  if (!PRODUCT_UKRAINE_COST_KEYS.includes(field)) return
  const patch = { [field]: value }
  if (productCatalogOf(current) === 'zakupka') {
    patch.price = productTotalUnitPrice({ ...current, [field]: value })
  }
  const updated = db.update('products', id, patch)
  if (updated) {
    syncProductDisplays(id, updated)
  }
}

function commitProductDetailSelect(select) {
  const id = select.dataset.productId
  const lineId = select.dataset.productLineId
  const field = select.dataset.field
  if (!id || field !== 'warehouseId') return
  const warehouseId = select.value || null
  if (lineId) {
    const updated = updateProductLine(id, lineId, { warehouseId })
    if (updated) syncProductCollapsedRow(id, updated)
    return
  }
  const updated = db.update('products', id, { warehouseId })
  if (updated) syncProductDisplays(id, updated)
}

function productUkraineCollapsedDisplay(product, field) {
  if (field === 'article') return productUkraineArticleLabel(product)
  if (field === 'stock') return productUkraineStockLabel(product)
  if (field === 'warehouse') return productUkraineWarehouseLabel(product)
  if (field === 'priceProm') return productMoneyLabel(product.priceProm)
  if (field === 'priceRozetka') return productMoneyLabel(product.priceRozetka)
  if (field === 'cost') return productUkraineActiveUnitCostLabel(product)
  if (field === 'commissionProm') return productUkraineCommissionCollapsedDisplay(product, 'commissionProm')
  if (field === 'commissionRozetka') return productUkraineCommissionCollapsedDisplay(product, 'commissionRozetka')
  if (field === 'marginProm') return productUkraineMarginLabel(productUkraineActiveMarginProm(product))
  if (field === 'marginRozetka') return productUkraineMarginLabel(productUkraineActiveMarginRozetka(product))
  return '—'
}

function productUkraineCollapsedCellInner(product, field) {
  if (field === 'stock') return productUkraineStockCellInner(product)
  const text = productUkraineCollapsedDisplay(product, field)
  const indicator = productUkraineCollapsedCompareIndicator(product, field)
  if (!indicator) return escapeHtml(text || '—')
  const valueText = text || '—'
  return `<span class="product-collapsed-with-compare"><span class="product-collapsed-value">${escapeHtml(valueText)}</span>${indicator}</span>`
}

function productUkraineReadOnlyCell(product, field, colClass) {
  const text = productUkraineCollapsedDisplay(product, field)
  const inner = productUkraineCollapsedCellInner(product, field)
  const hasHtml = inner.includes('<span')
  return productReadOnlyCell(hasHtml ? inner : text, `${colClass} product-ukraine-read-cell product-ukraine-read-${field}`, text, { html: hasHtml, emptyFallback: '—' })
}

function productUkraineEditableAmountInput(product, field, label) {
  const value = amountInputFieldDisplay(product[field])
  const size = productDetailControlSize(value || '0', 5, 12)
  const filled = value ? ' account-amount-input--filled' : ''
  return `<input type="text" inputmode="decimal" size="${size}" class="table-input account-amount-input product-ukraine-field-input product-detail-control product-detail-control-fit${filled}" data-product-id="${product.id}" data-ukraine-field="${field}" value="${escapeHtml(value)}" placeholder="0,0000" aria-label="${escapeHtml(label)}" />`
}

function productUkraineEditablePercentInput(product, field, label) {
  const value = commissionInputFieldDisplay(product[field])
  const size = productDetailControlSize(value || '0', 2, 6)
  return `<input type="text" inputmode="decimal" size="${size}" class="table-input product-ukraine-field-input product-ukraine-percent-input product-detail-control product-detail-control-fit" data-product-id="${product.id}" data-ukraine-field="${field}" value="${escapeHtml(value)}" placeholder="0" aria-label="${escapeHtml(label)}" />`
}

function productUkraineEditableMarginInput(product, field, label) {
  const storageKey = productUkraineManualMarginFieldKey(field)
  const resolved = field === 'marginRozetka'
    ? productUkraineMarginRozetka(product)
    : productUkraineMarginProm(product)
  const value = resolved != null && Number.isFinite(resolved) ? amountInputFieldDisplay(resolved) : ''
  const size = productDetailControlSize(value || '0', 5, 12)
  const filled = value ? ' account-amount-input--filled' : ''
  return `<input type="text" inputmode="decimal" size="${size}" class="table-input account-amount-input product-ukraine-field-input product-ukraine-margin-input product-detail-control product-detail-control-fit${filled}" data-product-id="${product.id}" data-ukraine-field="${storageKey}" value="${escapeHtml(value)}" placeholder="0,0000" aria-label="${escapeHtml(label)}" />`
}

function productUkraineTableRow(product, index) {
  const deleteCell = productsDeleteMode
    ? `<td class="td-actions product-row-delete"><button type="button" class="btn-icon btn-delete-inline" data-delete-product="${product.id}" title="Видалити" aria-label="Видалити">×</button></td>`
    : ''
  const isExpanded = expandedProductId === product.id
  return `
    <tr class="product-table-row task-table-row product-ukraine-row${isExpanded ? ' task-row-expanded' : ''}" data-product-id="${product.id}" data-search="${escapeHtml(productSearchText(product))}">
      ${productNumCell(index)}
      ${productTitleCell(product)}
      ${productUkraineReadOnlyCell(product, 'article', 'product-sku-cell product-col-sku-cell product-ukraine-article-cell')}
      ${productUkraineReadOnlyCell(product, 'stock', 'product-qty-cell product-col-qty-cell product-ukraine-stock-cell')}
      ${productUkraineReadOnlyCell(product, 'warehouse', 'product-warehouse-cell product-col-warehouse-cell product-ukraine-warehouse-cell')}
      ${productUkraineReadOnlyCell(product, 'priceProm', 'product-col-amount-cell product-ukraine-price-prom-cell')}
      ${productUkraineReadOnlyCell(product, 'priceRozetka', 'product-col-amount-cell product-ukraine-price-rozetka-cell')}
      ${productUkraineReadOnlyCell(product, 'cost', 'product-col-amount-cell product-ukraine-cost-cell')}
      ${productUkraineReadOnlyCell(product, 'commissionProm', 'product-col-amount-cell product-ukraine-commission-prom-cell')}
      ${productUkraineReadOnlyCell(product, 'commissionRozetka', 'product-col-amount-cell product-ukraine-commission-rozetka-cell')}
      ${productUkraineReadOnlyCell(product, 'marginProm', 'product-col-amount-cell product-ukraine-margin-prom-cell')}
      ${productUkraineReadOnlyCell(product, 'marginRozetka', 'product-col-amount-cell product-ukraine-margin-rozetka-cell')}
      ${deleteCell}
    </tr>`
}

function productUkraineDetailNameRow(product, colSpan) {
  return `
    <tr class="task-detail-row product-detail-row product-detail-name-row-tr product-ukraine-name-row-tr" data-product-id="${product.id}" data-search="${escapeHtml(productSearchText(product))}">
      <td class="product-num-cell"></td>
      <td colspan="${colSpan - 1}" class="product-detail-name-cell product-col-name-cell">
        ${productUkraineNameInput(product)}
      </td>
    </tr>`
}

function productUkraineDetailFieldsRow(product) {
  const deleteCell = productsDeleteMode
    ? `<td class="product-detail-field-cell product-detail-field-cell--delete product-row-delete"></td>`
    : ''
  return `
    <tr class="task-detail-row product-detail-row product-detail-fields-row-tr product-ukraine-detail-row-tr" data-product-id="${product.id}" data-search="${escapeHtml(productSearchText(product))}">
      ${productDetailFieldTd('', 'num', 'product-num-cell')}
      ${productDetailFieldTd('<span class="product-detail-readonly-value product-ukraine-detail-spacer">&nbsp;</span>', 'name', 'product-col-name-cell product-ukraine-line-actions-cell')}
      ${productDetailFieldTd(`<span class="product-detail-readonly-value product-ukraine-detail-article">${escapeHtml(productUkraineArticleLabel(product))}</span>`, 'sku', 'product-col-sku-cell product-ukraine-article-cell')}
      ${productDetailFieldTd(productUkraineStockCellInner(product), 'qty', 'product-col-qty-cell product-ukraine-stock-cell')}
      ${productDetailFieldTd(productUkraineWarehouseSelect(product), 'warehouse', 'product-warehouse-cell product-col-warehouse-cell product-ukraine-warehouse-cell')}
      ${productDetailFieldTd(productUkraineEditableAmountInput(product, 'priceProm', 'Ціна Prom'), 'money', 'product-col-amount-cell product-ukraine-price-prom-cell')}
      ${productDetailFieldTd(productUkraineEditableAmountInput(product, 'priceRozetka', 'Ціна Rozetka'), 'money', 'product-col-amount-cell product-ukraine-price-rozetka-cell')}
      ${productDetailFieldTd(`<span class="product-detail-readonly-value product-ukraine-detail-cost product-ukraine-cost-cell">${escapeHtml(productUkraineUnitCostLabel(product))}</span>`, 'money', 'product-col-amount-cell product-ukraine-cost-cell')}
      ${productDetailFieldTd(productUkraineCommissionDetailCell(product, 'commissionProm', 'Prom%'), 'money', 'product-col-amount-cell product-ukraine-commission-prom-cell')}
      ${productDetailFieldTd(productUkraineCommissionDetailCell(product, 'commissionRozetka', 'Rozetka%'), 'money', 'product-col-amount-cell product-ukraine-commission-rozetka-cell')}
      ${productDetailFieldTd(productUkraineEditableMarginInput(product, 'marginProm', 'Маржа Prom'), 'money', 'product-col-amount-cell product-ukraine-margin-prom-cell')}
      ${productDetailFieldTd(productUkraineEditableMarginInput(product, 'marginRozetka', 'Маржа Rozetka'), 'money', 'product-col-amount-cell product-ukraine-margin-rozetka-cell')}
      ${deleteCell}
    </tr>`
}

function productUkraineDetailInfoRow(product, colSpan) {
  return `
    <tr class="task-detail-row product-detail-row product-ukraine-detail-info-row-tr" data-product-id="${product.id}" data-search="${escapeHtml(productSearchText(product))}">
      <td class="product-num-cell"></td>
      <td colspan="${colSpan - 1}" class="product-ukraine-detail-cell product-col-name-cell">
        <label class="product-ukraine-arrival-info-field">
          <span class="product-ukraine-arrival-info-label">Інформація про додавання</span>
          <textarea class="table-input product-ukraine-arrival-info-input" data-product-id="${product.id}" data-ukraine-field="arrivalInfo" rows="3" placeholder="Заповнимо пізніше...">${escapeHtml(product.arrivalInfo || '')}</textarea>
        </label>
      </td>
    </tr>`
}

function syncUkraineTableDynamicColumns() {
  if (!isProductUkraineCatalog()) return
  const table = document.querySelector('.products-catalog-mode-ukraine .products-data-table')
  if (!table) return
  const cols = [...table.querySelectorAll('colgroup col')]
  if (cols.length < 4) return

  const staticFirstIndex = cols.findIndex((col) => col.classList.contains('product-col-ukraine-static-first'))
  const staticSecondIndex = cols.findIndex((col) => col.classList.contains('product-col-ukraine-static-second'))
  const staticLastIndex = cols.findIndex((col) => col.classList.contains('product-col-ukraine-static-last'))
  if (staticFirstIndex < 0 || staticSecondIndex < 0 || staticLastIndex < 2 || staticLastIndex <= staticSecondIndex) return

  const staticFirstWidth = 28
  const staticSecondWidth = 220
  const staticLastWidth = cols[staticLastIndex].classList.contains('product-delete-col')
    || cols[staticLastIndex].classList.contains('task-delete-col') ? 44 : 86
  const headerCells = table.querySelectorAll('thead tr:first-child th')
  const rows = table.querySelectorAll([
    'tbody tr.product-ukraine-row',
    'tbody tr.product-ukraine-detail-row-tr',
    'tbody tr.product-ukraine-replenishment-row-tr',
    'tbody tr.product-ukraine-replenishment-label-row-tr',
    'tbody tr.product-ukraine-order-row-tr',
    'tbody tr.product-ukraine-order-label-row-tr',
    'tbody tr.product-ukraine-order-header-row-tr',
  ].join(', '))
  const wrap = table.closest('.table-wrap-wide')
  const wrapWidth = wrap?.clientWidth || 0

  ;[staticFirstIndex, staticSecondIndex, staticLastIndex].forEach((index) => {
    cols[index].removeAttribute('style')
  })

  const measureCell = (cell) => {
    if (!cell) return 0
    const prevMaxWidth = cell.style.maxWidth
    cell.style.maxWidth = 'none'
    const width = Math.ceil(cell.scrollWidth)
    cell.style.maxWidth = prevMaxWidth
    return width > 0 ? width + 6 : 0
  }

  cols[staticFirstIndex].style.width = `${staticFirstWidth}px`
  cols[staticFirstIndex].style.minWidth = `${staticFirstWidth}px`
  cols[staticFirstIndex].style.maxWidth = `${staticFirstWidth}px`
  cols[staticSecondIndex].style.width = `${staticSecondWidth}px`
  cols[staticSecondIndex].style.minWidth = `${staticSecondWidth}px`
  cols[staticSecondIndex].style.maxWidth = `${staticSecondWidth}px`
  cols[staticLastIndex].style.width = `${staticLastWidth}px`
  cols[staticLastIndex].style.minWidth = `${staticLastWidth}px`
  cols[staticLastIndex].style.maxWidth = `${staticLastWidth}px`

  let middleTotal = 0
  for (let index = staticSecondIndex + 1; index < staticLastIndex; index += 1) {
    let maxWidth = measureCell(headerCells[index])
    rows.forEach((row) => {
      maxWidth = Math.max(maxWidth, measureCell(row.cells[index]))
    })
    maxWidth = Math.max(maxWidth, 52)
    cols[index].style.width = `${maxWidth}px`
    cols[index].style.minWidth = `${maxWidth}px`
    cols[index].style.maxWidth = `${maxWidth}px`
    middleTotal += maxWidth
  }

  const contentWidth = staticFirstWidth + staticSecondWidth + middleTotal + staticLastWidth
  let tableWidth = Math.max(wrapWidth, contentWidth)
  if (wrapWidth > contentWidth && staticLastIndex > staticSecondIndex + 1) {
    const fillIndex = staticLastIndex - 1
    const currentWidth = parseInt(cols[fillIndex].style.width, 10) || 52
    const extra = wrapWidth - contentWidth
    const fillWidth = currentWidth + extra
    cols[fillIndex].style.width = `${fillWidth}px`
    cols[fillIndex].style.minWidth = `${fillWidth}px`
    cols[fillIndex].style.maxWidth = `${fillWidth}px`
    tableWidth = wrapWidth
  }
  table.style.tableLayout = 'fixed'
  table.style.width = `${tableWidth}px`
}

function scheduleUkraineTableDynamicColumns() {
  if (!isProductUkraineCatalog()) return
  requestAnimationFrame(() => syncUkraineTableDynamicColumns())
}

function readUkraineDetailFieldValue(input, product, field) {
  if (!input) return Number(product[field]) || 0
  if (input.classList.contains('product-ukraine-percent-input')) {
    return productUkraineCommissionPctValue(parseAmountInput(input.value) ?? product[field])
  }
  return (parseAmountInput(input.value) ?? Number(product[field])) || 0
}

function refreshUkraineMarginPreview(productId) {
  const product = db.get('products', productId)
  if (!product) return
  const cost = productUkraineUnitCost(product)
  const detailRow = document.querySelector(`tr.product-ukraine-detail-row-tr[data-product-id="${productId}"]`)
  const collapsedRow = document.querySelector(`tr.product-ukraine-row[data-product-id="${productId}"]`)
  const calcProm = productUkraineMarketplaceMargin(
    detailRow
      ? readUkraineDetailFieldValue(detailRow.querySelector('[data-ukraine-field="priceProm"]'), product, 'priceProm')
      : product.priceProm,
    cost,
    detailRow
      ? readUkraineDetailFieldValue(detailRow.querySelector('[data-ukraine-field="commissionProm"]'), product, 'commissionProm')
      : product.commissionProm,
  )
  const calcRozetka = productUkraineMarketplaceMargin(
    detailRow
      ? readUkraineDetailFieldValue(detailRow.querySelector('[data-ukraine-field="priceRozetka"]'), product, 'priceRozetka')
      : product.priceRozetka,
    cost,
    detailRow
      ? readUkraineDetailFieldValue(detailRow.querySelector('[data-ukraine-field="commissionRozetka"]'), product, 'commissionRozetka')
      : product.commissionRozetka,
  )
  const displayProm = productUkraineHasManualMargin(product, 'marginProm')
    ? productUkraineManualMarginValue(product, 'marginProm')
    : calcProm
  const displayRozetka = productUkraineHasManualMargin(product, 'marginRozetka')
    ? productUkraineManualMarginValue(product, 'marginRozetka')
    : calcRozetka
  const marginPromLabel = productUkraineMarginLabel(displayProm)
  const marginRozetkaLabel = productUkraineMarginLabel(displayRozetka)
  if (detailRow) {
    const marginPromInput = detailRow.querySelector('[data-ukraine-field="manualMarginProm"]')
    if (marginPromInput && document.activeElement !== marginPromInput && !productUkraineHasManualMargin(product, 'marginProm')) {
      marginPromInput.value = calcProm != null && Number.isFinite(calcProm) ? amountInputFieldDisplay(calcProm) : ''
      syncAmountInputFilledState(marginPromInput)
      syncProductDetailControlSize(marginPromInput)
    }
    const marginRozetkaInput = detailRow.querySelector('[data-ukraine-field="manualMarginRozetka"]')
    if (marginRozetkaInput && document.activeElement !== marginRozetkaInput && !productUkraineHasManualMargin(product, 'marginRozetka')) {
      marginRozetkaInput.value = calcRozetka != null && Number.isFinite(calcRozetka) ? amountInputFieldDisplay(calcRozetka) : ''
      syncAmountInputFilledState(marginRozetkaInput)
      syncProductDetailControlSize(marginRozetkaInput)
    }
  }
  if (collapsedRow) {
    const marginPromCell = collapsedRow.querySelector('.product-ukraine-read-marginProm')
    if (marginPromCell) marginPromCell.textContent = marginPromLabel
    const marginRozetkaCell = collapsedRow.querySelector('.product-ukraine-read-marginRozetka')
    if (marginRozetkaCell) marginRozetkaCell.textContent = marginRozetkaLabel
  }
}

function syncProductUkraineDetailRow(productId, product) {
  if (!product) return
  const nameInput = document.querySelector(`tr.product-ukraine-name-row-tr[data-product-id="${productId}"] .product-ukraine-name-input`)
  if (nameInput && document.activeElement !== nameInput) {
    nameInput.value = product.name || ''
    syncProductDetailControlSize(nameInput)
  }

  const detailRow = document.querySelector(`tr.product-ukraine-detail-row-tr[data-product-id="${productId}"]`)
  if (detailRow) {
    const articleValue = detailRow.querySelector('.product-ukraine-detail-article')
    if (articleValue) articleValue.textContent = productUkraineArticleLabel(product)
    const stockCell = detailRow.querySelector('.product-ukraine-stock-cell')
    if (stockCell) stockCell.innerHTML = productUkraineStockCellInner(product)
    const warehouseSelect = detailRow.querySelector('.product-ukraine-warehouse-select')
    if (warehouseSelect && document.activeElement !== warehouseSelect) {
      warehouseSelect.value = productUkraineWarehouseValue(product)
    }
    const costValue = detailRow.querySelector('.product-ukraine-detail-cost')
    if (costValue) costValue.textContent = productUkraineUnitCostLabel(product)
    detailRow.querySelectorAll('.product-ukraine-field-input').forEach((input) => {
      if (input === document.activeElement) return
      const field = input.dataset.ukraineField
      if (!field) return
      if (field === 'manualMarginProm' || field === 'manualMarginRozetka') {
        const marginField = field === 'manualMarginRozetka' ? 'marginRozetka' : 'marginProm'
        const resolved = marginField === 'marginRozetka'
          ? productUkraineMarginRozetka(product)
          : productUkraineMarginProm(product)
        input.value = resolved != null && Number.isFinite(resolved) ? amountInputFieldDisplay(resolved) : ''
        syncAmountInputFilledState(input)
      } else if (input.classList.contains('product-ukraine-percent-input')) {
        input.value = commissionInputFieldDisplay(product[field])
      } else {
        input.value = amountInputFieldDisplay(product[field])
        syncAmountInputFilledState(input)
      }
      syncProductDetailControlSize(input)
    })
  }

  const infoInput = document.querySelector(`tr.product-ukraine-detail-info-row-tr[data-product-id="${productId}"] .product-ukraine-arrival-info-input`)
  if (infoInput && document.activeElement !== infoInput) {
    infoInput.value = product.arrivalInfo || ''
  }
  syncProductUkraineOrderSection(productId, product)
}

function syncProductUkraineOrderSection(productId, product) {
  if (expandedProductId !== productId || !isProductUkraineCatalog()) return
  const infoRow = document.querySelector(`tr.product-ukraine-detail-info-row-tr[data-product-id="${productId}"]`)
  if (!infoRow) return
  let prev = infoRow.previousElementSibling
  while (prev && (
    prev.classList.contains('product-ukraine-order-row-tr')
    || prev.classList.contains('product-ukraine-order-label-row-tr')
    || prev.classList.contains('product-ukraine-order-header-row-tr')
  )) {
    const toRemove = prev
    prev = prev.previousElementSibling
    toRemove.remove()
  }
  const orderHtml = productUkraineOrderDetailRows(product)
  if (orderHtml) infoRow.insertAdjacentHTML('beforebegin', orderHtml)
}

function syncManualStockZakupkaDetailRow(productId, lineId, viewProduct, line) {
  if (!viewProduct || !line) return
  const enrichedLine = manualStockLineZakupkaView(line)
  const nameInput = document.querySelector(`tr.product-manual-stock-name-row-tr[data-product-id="${productId}"][data-manual-stock-line-id="${lineId}"] .product-zakupka-name-input`)
  if (nameInput && document.activeElement !== nameInput) {
    nameInput.value = viewProduct.name || ''
    syncProductDetailControlSize(nameInput)
  }
  document.querySelectorAll(`tr.product-manual-stock-name-row-tr[data-product-id="${productId}"][data-manual-stock-line-id="${lineId}"] .product-zakupka-sku-input`).forEach((input) => {
    if (input === document.activeElement) return
    const index = Number(input.dataset.zakupkaSkuIndex) || 0
    const skus = productZakupkaAllSkus(viewProduct)
    input.value = skus[index] || ''
    syncProductDetailControlSize(input)
  })
  const detailRow = document.querySelector(`tr.product-manual-stock-detail-row-tr[data-product-id="${productId}"][data-manual-stock-line-id="${lineId}"]`)
  if (!detailRow) return
  detailRow.querySelectorAll('.zakupka-field-input').forEach((input) => {
    if (input === document.activeElement) return
    syncProductZakupkaDetailInput(input, viewProduct, line)
  })
  const totalCell = document.querySelector(`tr.product-manual-stock-row[data-product-id="${productId}"][data-manual-stock-line-id="${lineId}"] .product-zakupka-total-cell`)
  if (totalCell) {
    totalCell.textContent = productZakupkaTotalLabel(viewProduct)
    totalCell.title = productZakupkaTotalTitle(viewProduct)
  }
}

function syncManualStockZakupkaRowsForProduct(productId, product) {
  if (!product) return
  ukraineManualStockLines(product).forEach((line) => {
    syncManualStockZakupkaRow(productId, line.id, product, line)
  })
}

function syncManualStockZakupkaRow(productId, lineId, product, line) {
  if (!product || !line) return
  const item = createManualStockListItem(product, line)
  const viewProduct = manualStockItemAsZakupkaProduct(item)
  const row = document.querySelector(`tr.product-manual-stock-row[data-product-id="${productId}"][data-manual-stock-line-id="${lineId}"]`)
  if (row) {
    row.dataset.search = manualStockListItemSearchText(item)
    const titleValue = row.querySelector('.task-title-value')
    if (titleValue) titleValue.textContent = productDisplayName(product) || '—'
    ;['purchasePrice', 'qty', 'weight', 'paymentDate', 'shippingDate', 'arrivalDate', 'logisticsType', 'logistics', 'logisticsValue', 'ukraineLogistics', 'placement'].forEach((field) => {
      const cell = row.querySelector(`.product-zakupka-read-${field}`)
      if (!cell) return
      cell.innerHTML = productZakupkaCollapsedCellInner(viewProduct, field)
    })
    const totalCell = row.querySelector('.product-zakupka-total-cell')
    if (totalCell) {
      totalCell.textContent = productZakupkaTotalLabel(viewProduct)
      totalCell.title = productZakupkaTotalTitle(viewProduct)
    }
  }
  syncManualStockZakupkaDetailRow(productId, lineId, viewProduct, line)
}

function syncProductUkraineRow(productId, product) {
  if (!product) return
  const row = document.querySelector(`tr.product-ukraine-row[data-product-id="${productId}"]`)
  if (!row) return
  row.dataset.search = productSearchText(product)
  const titleValue = row.querySelector('.task-title-value')
  if (titleValue) titleValue.textContent = productDisplayName(product)
  ;['article', 'stock', 'warehouse', 'priceProm', 'priceRozetka', 'cost', 'commissionProm', 'commissionRozetka', 'marginProm', 'marginRozetka'].forEach((field) => {
    const cell = row.querySelector(`.product-ukraine-read-${field}`)
    if (!cell) return
    if (field === 'stock' || field === 'cost') {
      const inner = productUkraineCollapsedCellInner(product, field)
      if (inner.includes('<span')) {
        cell.innerHTML = inner
      } else {
        cell.textContent = productUkraineCollapsedDisplay(product, field)
      }
      return
    }
    cell.textContent = productUkraineCollapsedDisplay(product, field)
  })
  syncProductUkraineDetailRow(productId, product)
}

function commitProductUkraineField(input) {
  const id = input.dataset.productId
  const field = input.dataset.ukraineField
  if (!id || !field) return
  let value
  if (field === 'name') {
    value = String(input.value || '').trim()
  } else if (input.classList.contains('product-ukraine-percent-input')) {
    const raw = input.value
    const parsed = parseAmountInput(raw)
    value = parsed ?? 0
    input.value = parsed != null ? commissionInputDisplay(parsed, { minDecimals: amountMinDecimalsFromRaw(raw) }) : ''
  } else if (input.classList.contains('product-ukraine-arrival-info-input')) {
    value = input.value
  } else if (input.classList.contains('product-ukraine-warehouse-select')) {
    value = input.value || ''
  } else if (field === 'manualMarginProm' || field === 'manualMarginRozetka') {
    finalizeAmountInput(input)
    const raw = String(input.value || '').trim()
    value = raw ? (parseAmountInput(input.value) ?? 0) : null
    input.value = value != null ? amountInputFieldDisplay(value) : ''
    syncAmountInputFilledState(input)
  } else {
    finalizeAmountInput(input)
    value = parseAmountInput(input.value) ?? 0
    syncAmountInputFilledState(input)
  }
  syncProductDetailControlSize(input)
  const updated = db.update('products', id, { [field]: value })
  if (updated) {
    syncProductUkraineRow(id, updated)
    if (field === 'ukraineWarehouse') syncWarehouseCapacityDisplays()
  }
}

function productTableRows(products) {
  const colSpan = productsTableColSpan()
  if (!products.length) {
    return `<tr><td colspan="${colSpan}" class="empty-cell">Товарів немає</td></tr>`
  }

  if (isProductZakupkaCatalog()) {
    return products.map((item, index) => {
      if (isManualStockListItem(item)) {
        return productManualStockZakupkaTableRow(item, index) + productManualStockDetailRows(item, colSpan)
      }
      const product = listItemProduct(item)
      return productZakupkaTableRow(product, index) + productDetailRows(product, colSpan)
    }).join('')
  }

  if (isProductUkraineCatalog()) {
    return products.map((product, index) => (
      productUkraineTableRow(product, index) + productDetailRows(product, colSpan)
    )).join('')
  }

  return products.map((product, index) => {
    const deleteCell = productsDeleteMode
      ? `<td class="td-actions product-row-delete"><button type="button" class="btn-icon btn-delete-inline" data-delete-product="${product.id}" title="Видалити" aria-label="Видалити">×</button></td>`
      : ''
    const isExpanded = expandedProductId === product.id
    return `
    <tr class="product-table-row task-table-row${isExpanded ? ' task-row-expanded' : ''}" data-product-id="${product.id}" data-search="${escapeHtml(productSearchText(product))}">
      ${productNumCell(index)}
      ${productTitleCell(product)}
      ${productReadOnlyCell(productDisplaySku(product), 'product-sku-cell product-col-sku-cell', productDisplaySku(product))}
      ${productQtyCell(product)}
      ${deleteCell}
      ${productReadOnlyCell(productWarehouseLabel(product), 'product-warehouse-cell product-col-warehouse-cell', productWarehouseLabel(product))}
    </tr>
    ${productDetailRows(product, colSpan)}`
  }).join('')
}

function renderProductsTable(products) {
  const filtered = filterProductsForTable(products)
  const ukraineControlsActive = isProductUkraineCatalog() && hasActiveProductsUkraineTableControls()
  const countBadge = isProductZakupkaCatalog() || isProductUkraineCatalog()
    ? `<button type="button" class="count-badge count-badge-btn${productsDeleteMode ? ' is-active' : ''}" id="productsDeleteToggle" data-products-delete-toggle aria-pressed="${productsDeleteMode ? 'true' : 'false'}" title="${productsDeleteMode ? 'Завершити видалення' : 'Видалити рядки'}">${filtered.length}</button>`
    : `<span class="count-badge">${filtered.length}</span>`
  return `
    <section class="card table-card profiles-fullwidth products-table-card tasks-table-card products-catalog-ukraine${isProductUkraineCatalog() ? ' products-catalog-mode-ukraine' : ''}${isProductZakupkaCatalog() ? ' products-catalog-mode-zakupka' : ''}${productsDeleteMode ? ' products-delete-mode' : ''}" data-searchable>
      <div class="card-head">
        <div class="accounts-card-head-title">
          <h2>Список</h2>
          ${ukraineControlsActive ? '<button type="button" class="btn-reset-filters" id="productsUkraineResetFilters" title="Скинути фільтри">Скинути фільтри</button>' : ''}
        </div>
        ${countBadge}
      </div>
      <div class="table-wrap table-wrap-wide">
        <table class="data-table products-data-table tasks-data-table">
          <colgroup>${productsTableColgroup()}</colgroup>
          <thead>
            <tr>${productsTableHeadRow()}</tr>
          </thead>
          <tbody id="productsTableBody">${productTableRows(filtered)}</tbody>
        </table>
      </div>
    </section>`
}

function renderProductWarehouseSelect(selectedId = '') {
  const warehouses = db.list('warehouses')
  if (!warehouses.length) {
    return '<option value="">— Спочатку додайте склад —</option>'
  }
  return warehouses
    .map((w) => `<option value="${escapeHtml(w.id)}"${w.id === selectedId ? ' selected' : ''}>${escapeHtml(w.name)}</option>`)
    .join('')
}

function renderAddProductZakupkaPanel() {
  return `
          <div class="product-add-panel" data-product-add-panel="zakupka">
            <label class="form-field"><span>Товар</span><input type="text" name="name" data-required-when-active="1" placeholder="Назва товару" /></label>
            <label class="form-field form-field-amount"><span>Вартість</span><input type="text" name="purchasePrice" inputmode="decimal" class="table-input account-amount-input" placeholder="0,0000" autocomplete="off" /></label>
            <label class="form-field"><span>Кількість</span><input type="number" name="qty" min="0" step="1" value="0" /></label>
            <label class="form-field form-field-amount"><span>Вага</span><input type="text" name="weight" inputmode="decimal" class="table-input account-amount-input" placeholder="0,0000" autocomplete="off" /></label>
            <label class="form-field"><span>Дата оплати</span><input type="date" name="paymentDate" /></label>
            <label class="form-field"><span>Дата отправки</span><input type="date" name="shippingDate" /></label>
            <label class="form-field"><span>Дата Прибуття</span><input type="date" name="arrivalDate" /></label>
            <label class="form-field"><span>Тип логістики</span>
              <select name="logisticsType">
                <option value="">—</option>
                ${ZAKUPKA_LOGISTICS_TYPES.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`).join('')}
              </select>
            </label>
            <label class="form-field form-field-amount"><span>Ціна логістики (у.е./кг)</span><input type="text" name="logistics" inputmode="decimal" class="table-input account-amount-input" placeholder="0,0000" autocomplete="off" /></label>
            <label class="form-field form-field-amount"><span>Логістика по Україні</span><input type="text" name="ukraineLogistics" inputmode="decimal" class="table-input account-amount-input" placeholder="0,0000" autocomplete="off" /></label>
            <label class="form-field form-field-amount"><span>Розміщення (за 1 шт.)</span><input type="text" name="placement" inputmode="decimal" class="table-input account-amount-input" placeholder="0,0000" autocomplete="off" /></label>
          </div>`
}

function renderAddProductStockPanel() {
  return `
          <div class="product-add-panel" data-product-add-panel="stock">
            <p class="hint-text">Залишок на складі: назва, артикул, кількість, склад, дата, собівартість або сума вручну.</p>
            <label class="form-field"><span>Назва</span><input type="text" name="stockName" data-required-when-active="1" placeholder="Назва товару" /></label>
            <label class="form-field"><span>Артикул (SKU)</span><input type="text" name="stockSku" data-required-when-active="1" placeholder="SKU" /></label>
            <label class="form-field"><span>Кількість</span><input type="number" name="stockQty" min="0" step="1" data-required-when-active="1" value="0" /></label>
            <label class="form-field"><span>Склад</span>
              <select name="stockWarehouseId" data-required-when-active="1">${renderProductWarehouseSelect()}</select>
            </label>
            <label class="form-field"><span>Дата</span><input type="date" name="stockDate" /></label>
            <label class="form-field form-field-amount"><span>Сума</span><input type="text" name="stockTotal" inputmode="decimal" class="table-input account-amount-input" placeholder="0,0000" autocomplete="off" /></label>
            <label class="form-field form-field-amount"><span>Собівартість (за 1 шт.)</span><input type="text" name="unitCost" inputmode="decimal" class="table-input account-amount-input" placeholder="0,0000" autocomplete="off" /></label>
          </div>`
}

function renderAddProductCostFields() {
  if (isProductZakupkaCatalog()) {
    return ''
  }
  return `
            <p class="hint-text">Залишки на складі: назва, SKU, кількість і склад.</p>`
}

function renderAddProductModal() {
  if (isProductZakupkaCatalog()) {
    return `
    <div class="modal-overlay is-hidden" id="productModal" aria-hidden="true">
      <div class="modal card" role="dialog" aria-labelledby="productModalTitle">
        <div class="card-head modal-head">
          <h2 id="productModalTitle">Нова закупка</h2>
          <button type="button" class="btn-icon modal-close" id="productModalClose" aria-label="Закрити">×</button>
        </div>
        <form id="addProductForm">
          <div class="form-grid form-grid-single">
            ${renderAddProductZakupkaPanel()}
            ${renderAddProductStockPanel()}
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" id="productModalCancel">Скасувати</button>
            <button type="submit" class="btn-primary">Зберегти</button>
          </div>
        </form>
      </div>
    </div>`
  }
  const nameField = '<label class="form-field"><span>Назва</span><input type="text" name="name" required placeholder="Назва товару" /></label>'
  const skuField = '<label class="form-field"><span>Артикул (SKU)</span><input type="text" name="sku" required placeholder="SKU" /></label>'
  const qtyField = '<label class="form-field"><span>Кількість</span><input type="number" name="qty" min="0" step="1" required value="0" /></label>'
  const warehouseField = `<label class="form-field"><span>Склад</span>
              <select name="warehouseId" required>${renderProductWarehouseSelect()}</select>
            </label>`
  return `
    <div class="modal-overlay is-hidden" id="productModal" aria-hidden="true">
      <div class="modal card" role="dialog" aria-labelledby="productModalTitle">
        <div class="card-head modal-head">
          <h2 id="productModalTitle">Новий товар</h2>
          <button type="button" class="btn-icon modal-close" id="productModalClose" aria-label="Закрити">×</button>
        </div>
        <form id="addProductForm">
          <div class="form-grid form-grid-single">
            ${nameField}
            ${skuField}
            ${renderAddProductCostFields()}
            ${qtyField}
            ${warehouseField}
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" id="productModalCancel">Скасувати</button>
            <button type="submit" class="btn-primary">Зберегти</button>
          </div>
        </form>
      </div>
    </div>`
}

function syncProductAddModalView() {
  const modal = document.getElementById('productModal')
  if (!modal) return
  modal.querySelectorAll('[data-product-add-panel]').forEach((panel) => {
    const active = panel.dataset.productAddPanel === productAddModalMode
    panel.classList.toggle('is-hidden', !active)
    panel.querySelectorAll('input, select').forEach((el) => {
      el.required = active && el.dataset.requiredWhenActive === '1'
    })
  })
  const titleEl = document.getElementById('productModalTitle')
  if (titleEl) {
    titleEl.textContent = productAddModalMode === 'stock' ? 'Новий залишок' : 'Нова закупка'
  }
}

function submitManualStockProduct(fd) {
  if (!db.list('warehouses').length) {
    alert('Спочатку додайте склад у розділі «Склад»')
    return false
  }
  const name = String(fd.get('stockName') || '').trim()
  const sku = String(fd.get('stockSku') || '').trim()
  const qty = Math.max(0, Number(fd.get('stockQty')) || 0)
  const warehouseId = fd.get('stockWarehouseId') || null
  if (!name || !sku || !warehouseId) {
    alert('Заповніть назву, артикул і склад')
    return false
  }
  const warehouse = db.get('warehouses', warehouseId)
  const stockDate = String(fd.get('stockDate') || '')
  const manualTotal = parseAmountInput(fd.get('stockTotal'))
  const unitCostInput = parseAmountInput(fd.get('unitCost'))
  let unitCost = unitCostInput ?? 0
  let storedManualTotal = null
  if (manualTotal != null && Number.isFinite(manualTotal)) {
    storedManualTotal = manualTotal
    unitCost = qty > 0 ? manualTotal / qty : manualTotal
  } else if (unitCostInput != null && Number.isFinite(unitCostInput) && qty > 0) {
    storedManualTotal = unitCostInput * qty
  }
  const manualLine = createUkraineManualStockLine({
    date: stockDate,
    qty,
    unitCost,
    manualTotal: storedManualTotal,
    warehouseId,
  })
  const existing = findUkraineProductBySku(sku)
  if (existing) {
    const withLines = ensureProductUkraineLines(existing)
    const lines = [...(withLines.lines || []), manualLine]
    syncProductLinesUpdate(existing.id, lines)
    if (warehouse?.name && !productUkraineWarehouseValue(existing)) {
      db.update('products', existing.id, { ukraineWarehouse: warehouse.name })
    }
    logForCollection('products', db.get('products', existing.id))
  } else {
    const payload = {
      name,
      sku,
      qty,
      warehouseId,
      catalog: 'ukraine',
      ukraineWarehouse: warehouse?.name || '',
      priceProm: 0,
      priceRozetka: 0,
      commissionProm: 0,
      commissionRozetka: 0,
      lines: [manualLine],
      purchasePrice: 0,
      logistics: 0,
      logisticsValue: 0,
      commission: 0,
      price: 0,
      ...db.getAuthorMeta(),
    }
    const item = db.create('products', payload)
    logForCollection('products', item)
  }
  return true
}

function listProductsForCurrentCatalog() {
  const monthKey = resolveProductPagePeriodMonthKey()
  if (isProductUkraineCatalog()) {
    return listProductsForUkraineTable()
      .filter((product) => productUkraineMatchesMonth(product, monthKey))
  }
  return listProductsForZakupkaTable()
}

function renderProduct() {
  const products = listProductsForCurrentCatalog()
  return `
    <div class="product-page" data-searchable>
      ${productPageHeader()}
      ${renderProductsTable(products)}
      ${renderAddProductModal()}
    </div>`
}

function openProductModal(mode = 'zakupka') {
  productAddModalMode = mode === 'stock' ? 'stock' : 'zakupka'
  const modal = document.getElementById('productModal')
  if (!modal) return
  const form = document.getElementById('addProductForm')
  form?.reset()
  const qtyInput = form?.querySelector('[name="qty"]')
  if (qtyInput) qtyInput.value = '0'
  const stockQtyInput = form?.querySelector('[name="stockQty"]')
  if (stockQtyInput) stockQtyInput.value = '0'
  modal.querySelectorAll('[name="stockWarehouseId"], [name="warehouseId"]').forEach((select) => {
    select.innerHTML = renderProductWarehouseSelect()
  })
  syncProductAddModalView()
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
}

function closeProductModal() {
  const modal = document.getElementById('productModal')
  if (!modal) return
  modal.classList.add('is-hidden')
  modal.setAttribute('aria-hidden', 'true')
  document.getElementById('addProductForm')?.reset()
}

function bindProductModal() {
  document.getElementById('addProductBtn')?.addEventListener('click', () => openProductModal('zakupka'))
  document.getElementById('addProductStockBtn')?.addEventListener('click', () => openProductModal('stock'))
  document.getElementById('productModalClose')?.addEventListener('click', closeProductModal)
  document.getElementById('productModalCancel')?.addEventListener('click', closeProductModal)
  document.getElementById('productModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'productModal') closeProductModal()
  })

  const addProductForm = document.getElementById('addProductForm')
  if (addProductForm) {
    addProductForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const fd = new FormData(addProductForm)
      const payload = {
        name: String(fd.get('name') || '').trim(),
        sku: String(fd.get('sku') || '').trim(),
        qty: Math.max(0, Number(fd.get('qty')) || 0),
        warehouseId: fd.get('warehouseId') || null,
        catalog: productCatalogMode,
        purchasePrice: 0,
        logistics: 0,
        logisticsValue: 0,
        commission: 0,
        price: 0,
        paymentDate: '',
        shippingDate: '',
        arrivalDate: '',
        logisticsType: '',
        ukraineLogistics: 0,
        placement: 0,
        weight: 0,
      }

      if (isProductZakupkaCatalog() && productAddModalMode === 'stock') {
        if (!submitManualStockProduct(fd)) return
        closeProductModal()
        showToast('Залишок додано')
        syncWarehouseCapacityDisplays()
        render()
        return
      }

      if (isProductZakupkaCatalog()) {
        if (!payload.name) {
          alert('Заповніть назву товару')
          return
        }
        payload.sku = zakupkaSkuFromName(payload.name)
        payload.purchasePrice = parseAmountInput(fd.get('purchasePrice')) ?? 0
        payload.logistics = parseAmountInput(fd.get('logistics')) ?? 0
        payload.ukraineLogistics = parseAmountInput(fd.get('ukraineLogistics')) ?? 0
        payload.placement = parseAmountInput(fd.get('placement')) ?? 0
        payload.weight = parseAmountInput(fd.get('weight')) ?? 0
        payload.paymentDate = String(fd.get('paymentDate') || '')
        payload.shippingDate = String(fd.get('shippingDate') || '')
        payload.arrivalDate = String(fd.get('arrivalDate') || '')
        payload.logisticsType = String(fd.get('logisticsType') || '')
        payload.warehouseId = db.list('warehouses')[0]?.id || null
        payload.lines = [createProductLineFromProduct(payload)]
      } else {
        if (!db.list('warehouses').length) {
          alert('Спочатку додайте склад у розділі «Склад»')
          return
        }
        payload.logistics = 0
        payload.commission = 0
        payload.price = 0
        payload.purchasePrice = 0
        if (!payload.name || !payload.sku || !payload.warehouseId) {
          alert('Заповніть назву, артикул і склад')
          return
        }
      }

      Object.assign(payload, db.getAuthorMeta())
      const item = db.create('products', payload)
      logForCollection('products', item)
      closeProductModal()
      showToast('Товар додано')
      render()
    })
  }
}

function initProductTableDelegation() {
  const content = document.getElementById('content')
  if (!content || content.dataset.productDelegation === '1') return
  content.dataset.productDelegation = '1'

  content.addEventListener('change', (e) => {
    if (activeNav !== 'product') return

    const zakupkaSelect = e.target.closest('.zakupka-logistics-select')
    if (zakupkaSelect) {
      commitProductZakupkaField(zakupkaSelect)
      return
    }

    const zakupkaDate = e.target.closest('.zakupka-date-input')
    if (zakupkaDate) {
      commitProductZakupkaField(zakupkaDate)
      return
    }

    const logisticsFilter = e.target.closest('[data-zakupka-logistics-filter]')
    if (logisticsFilter) {
      productsZakupkaLogisticsTypeFilter = logisticsFilter.value || ''
      render()
      return
    }

    const ukraineWarehouseFilter = e.target.closest('[data-ukraine-warehouse-filter]')
    if (ukraineWarehouseFilter) {
      productsUkraineWarehouseFilter = ukraineWarehouseFilter.value || ''
      render()
      return
    }

    const ukraineWarehouseSelect = e.target.closest('.product-ukraine-warehouse-select')
    if (ukraineWarehouseSelect) {
      commitProductUkraineField(ukraineWarehouseSelect)
      return
    }

    const dateInput = e.target.closest('.product-detail-date-input')
    if (dateInput) {
      const id = dateInput.dataset.productId
      const lineId = dateInput.dataset.productLineId
      if (!id) return
      if (lineId) {
        updateProductLine(id, lineId, { date: dateInput.value || '' })
        render()
        return
      }
      const date = dateInput.value
      const updated = db.update('products', id, { date: date ? `${date}T12:00:00.000Z` : null })
      if (updated) syncProductDisplays(id, updated)
      return
    }

    const select = e.target.closest('.product-detail-fields-row-tr .product-pick-select')
    if (!select) return
    commitProductDetailSelect(select)
  })

  content.addEventListener('click', (e) => {
    if (activeNav !== 'product') return

    const catalogBtn = e.target.closest('[data-product-catalog]')
    if (catalogBtn) {
      e.preventDefault()
      e.stopPropagation()
      productCatalogMode = catalogBtn.dataset.productCatalog
      productCatalogPickerOpen = false
      expandedProductId = null
      productsDeleteMode = false
      productAddModalMode = 'zakupka'
      resetProductsZakupkaTableControls()
      resetProductsUkraineTableControls()
      searchQuery = ''
      const searchInput = document.getElementById('searchInput')
      if (searchInput) searchInput.value = ''
      persistProductCatalogMode()
      render()
      return
    }

    const catalogToggle = e.target.closest('[data-product-catalog-toggle]')
    if (catalogToggle) {
      e.preventDefault()
      e.stopPropagation()
      productCatalogPickerOpen = !productCatalogPickerOpen
      render()
      return
    }

    const ukraineResetFilters = e.target.closest('#productsUkraineResetFilters')
    if (ukraineResetFilters) {
      e.preventDefault()
      resetProductsUkraineTableControls()
      render()
      return
    }

    const ukraineSortBtn = e.target.closest('[data-product-sort-ukraine]')
    if (ukraineSortBtn) {
      e.preventDefault()
      toggleProductsUkraineSort(ukraineSortBtn.dataset.productSortUkraine)
      render()
      return
    }

    const qtySortBtn = e.target.closest('[data-product-sort-qty]')
    if (qtySortBtn) {
      e.preventDefault()
      toggleProductsQtySort()
      render()
      return
    }

    const dateSortBtn = e.target.closest('[data-product-sort-zakupka-date]')
    if (dateSortBtn) {
      e.preventDefault()
      toggleProductsZakupkaDateSort(dateSortBtn.dataset.productSortZakupkaDate)
      render()
      return
    }

    const colToggleBtn = e.target.closest('[data-zakupka-col-toggle]')
    if (colToggleBtn) {
      e.preventDefault()
      toggleZakupkaColDisplayMode(colToggleBtn.dataset.zakupkaColToggle)
      syncAllZakupkaColDisplays()
      return
    }

    const ukraineCommissionToggle = e.target.closest('[data-ukraine-commission-toggle]')
    if (ukraineCommissionToggle) {
      e.preventDefault()
      toggleUkraineCommissionDisplayMode(ukraineCommissionToggle.dataset.ukraineCommissionToggle)
      render()
      return
    }

    const addLineBtn = e.target.closest('[data-product-add-line]')
    if (addLineBtn) {
      e.preventDefault()
      const productId = addLineBtn.dataset.productAddLine
      if (!productId) return
      addProductLine(productId)
      showToast('Рядок додано')
      render()
      return
    }

    const addSkuBtn = e.target.closest('[data-product-add-sku]')
    if (addSkuBtn) {
      e.preventDefault()
      const productId = addSkuBtn.dataset.productAddSku
      if (!productId) return
      const updated = addProductZakupkaSku(productId)
      if (updated) {
        expandedProductId = productId
        render()
      }
      return
    }

    const deleteSkuBtn = e.target.closest('[data-product-delete-sku]')
    if (deleteSkuBtn) {
      e.preventDefault()
      const productId = deleteSkuBtn.dataset.productDeleteSku
      const skuIndex = deleteSkuBtn.dataset.zakupkaSkuIndex
      if (!productId) return
      const updated = removeProductZakupkaSku(productId, skuIndex)
      if (updated) {
        expandedProductId = productId
        render()
      }
      return
    }

    const deleteLineBtn = e.target.closest('[data-product-delete-line]')
    if (deleteLineBtn) {
      e.preventDefault()
      e.stopPropagation()
      const productId = deleteLineBtn.dataset.productDeleteLine
      const lineId = deleteLineBtn.dataset.productLineId
      if (!productId || !lineId) return
      if (!confirm('Видалити цей рядок?')) return
      const result = removeProductLine(productId, lineId)
      if (result) {
        showToast('Рядок видалено')
        if (result.deleted) {
          clearExpandedProductAfterDelete(result.id)
        } else if (productCatalogOf(result) === 'ukraine') {
          clearExpandedProductAfterDelete(productId)
        }
        syncWarehouseCapacityDisplays()
        pruneOrphanedUkraineFromZakupka()
        if (!listProductsForCurrentCatalog().length) productsDeleteMode = false
        render()
      } else {
        showToast('Не вдалося видалити рядок')
      }
      return
    }

    const expandBtn = e.target.closest('.task-title-toggle[data-product-expand]')
    if (expandBtn) {
      e.preventDefault()
      const id = expandBtn.dataset.productExpand
      expandedProductId = expandedProductId === id ? null : id
      render()
      return
    }

    const zakupkaDateCell = e.target.closest('.product-zakupka-row td.product-col-date-cell')
    if (zakupkaDateCell && isProductZakupkaCatalog()) {
      const field = productZakupkaDateFieldFromCell(zakupkaDateCell)
      if (!field) return
      e.preventDefault()
      const row = zakupkaDateCell.closest('tr.product-zakupka-row')
      const id = row?.dataset.productId
      if (!id) return
      if (expandedProductId === id) {
        focusZakupkaDateInput(id, field)
        return
      }
      expandedProductId = id
      render()
      requestAnimationFrame(() => focusZakupkaDateInput(id, field))
      return
    }

    const delBtn = e.target.closest('[data-delete-product]')
    if (delBtn) {
      e.preventDefault()
      e.stopPropagation()
      const id = delBtn.dataset.deleteProduct
      const product = db.get('products', id)
      if (!product) return
      const label = product.name || product.sku || 'товар'
      if (!confirm(`Видалити товар «${label}»?`)) return
      if (productCatalogOf(product) === 'zakupka') {
        removeUkraineRecordsForZakupka(product)
      }
      db.remove('products', id)
      pruneOrphanedUkraineFromZakupka()
      syncWarehouseCapacityDisplays()
      clearExpandedProductAfterDelete(id)
      if (!db.list('products').length) productsDeleteMode = false
      else if (!listProductsForCurrentCatalog().length) productsDeleteMode = false
      showToast('Товар видалено')
      render()
      return
    }
  })

  content.addEventListener('input', (e) => {
    if (activeNav !== 'product') return

    const zakupkaAmount = e.target.closest('.zakupka-amount-input')
    if (zakupkaAmount) {
      enforceAmountInput(zakupkaAmount)
      return
    }

    const ukraineAmount = e.target.closest('.product-ukraine-field-input:not(.product-ukraine-percent-input):not(.product-ukraine-arrival-info-input):not(.product-ukraine-margin-input)')
    if (ukraineAmount) {
      enforceAmountInput(ukraineAmount)
      refreshUkraineMarginPreview(ukraineAmount.dataset.productId)
      return
    }

    const zakupkaNameInput = e.target.closest('.product-zakupka-name-input, .product-zakupka-sku-input')
    if (zakupkaNameInput) {
      syncProductDetailControlSize(zakupkaNameInput)
      return
    }

    const ukraineNameInput = e.target.closest('.product-ukraine-name-input')
    if (ukraineNameInput) {
      syncProductDetailControlSize(ukraineNameInput)
      return
    }

    const skuInput = e.target.closest('.product-detail-sku-input')
    if (skuInput) {
      if (isProductUkraineCatalog()) return
      syncProductDetailControlSize(skuInput)
      return
    }

    const qtyInput = e.target.closest('.product-detail-qty-input')
    if (qtyInput) {
      syncProductDetailControlSize(qtyInput)
      return
    }

    const commissionInput = e.target.closest('.product-detail-commission-input, .product-ukraine-percent-input')
    if (commissionInput) {
      enforceAmountInput(commissionInput)
      syncProductDetailControlSize(commissionInput)
      refreshUkraineMarginPreview(commissionInput.dataset.productId)
      return
    }

    const moneyInput = e.target.closest('.product-detail-money-input')
    if (moneyInput) {
      enforceAmountInput(moneyInput)
    }
  })

  content.addEventListener('blur', (e) => {
    if (activeNav !== 'product') return

    const zakupkaField = e.target.closest('.zakupka-field-input')
    if (zakupkaField) {
      commitProductZakupkaField(zakupkaField)
      return
    }

    const ukraineField = e.target.closest('[data-ukraine-field]')
    if (ukraineField) {
      commitProductUkraineField(ukraineField)
      return
    }

    const skuInput = e.target.closest('.product-detail-sku-input')
    if (skuInput) {
      commitProductSkuField(skuInput)
      return
    }
    const qtyInput = e.target.closest('.product-detail-qty-input')
    if (qtyInput) {
      commitProductQtyField(qtyInput)
      return
    }
    const commissionInput = e.target.closest('.product-detail-commission-input')
    if (commissionInput) {
      commitProductMoneyField(commissionInput)
      return
    }
    const moneyInput = e.target.closest('.product-detail-money-input')
    if (moneyInput) commitProductMoneyField(moneyInput)
  }, true)

  document.addEventListener('click', (e) => {
    if (!productCatalogPickerOpen || activeNav !== 'product') return
    if (e.target.closest('.product-catalog-picker-wrap')) return
    productCatalogPickerOpen = false
    render()
  })
}

function bindProductsDeleteToggle() {
  document.getElementById('productsDeleteToggle')?.addEventListener('click', (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isProductZakupkaCatalog() && !isProductUkraineCatalog()) return
    productsDeleteMode = !productsDeleteMode
    render()
  })
}

function shopPageHeader() {
  return `
    <div class="page-header page-header-row">
      <div>
        <h1 class="page-title">Магазин</h1>
        <p class="page-sub">Мережа магазинів Bazario</p>
      </div>
      <button type="button" class="btn-primary" id="addShopBtn">Додати</button>
    </div>`
}

function renderShopAddModal() {
  return `
    <div class="modal-overlay is-hidden" id="shopModal" aria-hidden="true">
      <div class="modal card" role="dialog" aria-labelledby="shopModalTitle">
        <div class="card-head modal-head">
          <h2 id="shopModalTitle">Додати магазин</h2>
          <button type="button" class="btn-icon modal-close" id="shopModalClose" aria-label="Закрити">×</button>
        </div>
        <form class="crud-form" data-storage="shops" id="addShopForm">
          <div class="form-grid form-grid-single">
            <label class="form-field"><span>Назва магазину</span><input type="text" name="name" required /></label>
            <label class="form-field"><span>Маркетплейс</span>
              <select name="marketplace" required>
                ${SHOP_MARKETPLACE_OPTIONS.map((mp) => `<option value="${escapeHtml(mp)}">${escapeHtml(mp)}</option>`).join('')}
              </select>
            </label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" id="shopModalCancel">Скасувати</button>
            <button type="submit" class="btn-primary">Зберегти</button>
          </div>
        </form>
      </div>
    </div>`
}

function renderShopTable(items) {
  const q = searchQuery.toLowerCase()
  const filtered = q
    ? items.filter((item) => `${item.name} ${item.marketplace || ''}`.toLowerCase().includes(q))
    : items

  const rows = filtered.length
    ? filtered.map((item) => `
        <tr data-id="${item.id}" data-search="${escapeHtml(`${item.name} ${item.marketplace || ''}`)}">
          <td><strong>${escapeHtml(item.name)}</strong></td>
          <td>${escapeHtml(item.marketplace || '—')}</td>
          <td class="td-actions"><button type="button" class="btn-icon btn-delete" data-delete="${item.id}" data-storage="shops" title="Видалити">×</button></td>
        </tr>`).join('')
    : '<tr><td colspan="3" class="empty-cell">Магазинів ще немає.</td></tr>'

  return `
    <section class="card table-card profiles-fullwidth shop-table-card" data-searchable>
      <div class="card-head">
        <h2>Список</h2>
        <span class="count-badge">${filtered.length}</span>
      </div>
      <div class="table-wrap table-wrap-wide">
        <table class="data-table shop-data-table">
          <thead>
            <tr>
              <th>Магазин</th>
              <th>Маркетплейс</th>
              <th></th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
    </section>`
}

function renderShop() {
  const items = db.list('shops')
  return `
    <div class="shop-page" data-searchable>
      ${shopPageHeader()}
      ${renderShopTable(items)}
      ${renderShopAddModal()}
    </div>`
}

function financeTxSearchText(tx) {
  return `${tx.title} ${tx.comment || ''} ${tx.date} ${tx.amount}`.toLowerCase()
}

function buildOrderSaleIncomeTransactions() {
  const fifoCostByTxId = buildOrderTransactionFifoCostLookup()
  return db.list('orderTransactions')
    .filter(orderTransactionIsSale)
    .map((tx) => {
      const client = String(tx.firstName || '').trim()
      const product = orderTransactionProductName(tx) || String(tx.productName || '').trim()
      const shop = orderTransactionShopValue(tx)
      const titleParts = [shop]
      if (product) titleParts.push(product)
      else if (client) titleParts.push(client)
      else titleParts.push('Продаж')
      const grossAmount = orderTransactionLineTotal(tx)
      const rozetkaCommission = orderTransactionRozetkaDeliveryCommission(tx)
      const marginTotal = orderTransactionMarginTotal(tx, fifoCostByTxId)
      const amount = orderTransactionFinanceIncomeAmount(tx, fifoCostByTxId)
      const commentParts = [
        tx.ttnComment || tx.clientComment || '',
        marginTotal > 0 ? `Маржа ${fmtMoney(marginTotal)}` : '',
        rozetkaCommission ? `Комісія доставки Rozetka −${fmtMoney(rozetkaCommission)}` : '',
      ].filter(Boolean)
      return {
        id: `order-sale-${tx.id}`,
        source: 'order-sale',
        orderTxId: tx.id,
        title: titleParts.join(' · '),
        comment: commentParts.join(' · '),
        grossAmount,
        marginTotal,
        rozetkaCommission,
        amount,
        date: formatOrderTransactionDateLabel(tx),
        sortAt: tx.date || tx.createdAt || '',
      }
    })
}

function buildFinanceIncomeTransactions(financeItems) {
  const fromFinance = financeItems
    .filter((i) => i.type === 'income')
    .map((i) => ({
      id: `finance-${i.id}`,
      source: 'finance',
      financeId: i.id,
      title: i.title || '—',
      amount: Number(i.amount) || 0,
      date: i.date || '—',
      sortAt: i.date || i.createdAt || '',
    }))
  return [...fromFinance, ...buildOrderSaleIncomeTransactions()]
    .sort((a, b) => new Date(b.sortAt).getTime() - new Date(a.sortAt).getTime())
}

function productZakupkaExpenseDateRaw(product) {
  const withLines = ensureProductZakupkaLines(product)
  const raw = productZakupkaDateValue(withLines, 'paymentDate')
  if (raw) return raw
  const lines = withLines?.lines || []
  for (const line of lines) {
    const lineRaw = productZakupkaDateValue(withLines, 'paymentDate', line)
    if (lineRaw) return lineRaw
  }
  return ''
}

function buildZakupkaExpenseTransactions() {
  return listProductsByCatalog('zakupka')
    .map((product) => {
      const amount = productZakupkaTotal(product, 'all')
      if (!Number.isFinite(amount) || amount <= 0) return null
      const sortAt = productZakupkaExpenseDateRaw(product)
      return {
        id: `zakupka-${product.id}`,
        source: 'zakupka',
        productId: product.id,
        title: productDisplayName(product),
        amount,
        date: sortAt ? formatZakupkaDateDisplay(sortAt) : '—',
        sortAt,
      }
    })
    .filter(Boolean)
}

function buildUkraineStockExpenseTransactions() {
  const txs = []
  listProductsByCatalog('ukraine').forEach((product) => {
    if (shouldRemoveUkraineAfterZakupkaDeletion(product)) return
    ukraineManualStockLines(product).forEach((line) => {
      const amount = productZakupkaLineTotal(manualStockLineZakupkaView(line), 'all')
      if (!Number.isFinite(amount) || amount <= 0) return
      const sortAt = productLineDateValue(line)
      txs.push({
        id: `ukraine-stock-${product.id}-${line.id}`,
        source: 'ukraine-stock',
        productId: product.id,
        lineId: line.id,
        title: productDisplayName(product),
        amount,
        date: sortAt ? formatZakupkaDateDisplay(sortAt) : '—',
        sortAt,
      })
    })
  })
  return txs
}

function buildFinanceExpenseTransactions(financeItems, accounts) {
  const fromFinance = financeItems
    .filter((i) => i.type === 'expense')
    .map((i) => ({
      id: `finance-${i.id}`,
      source: 'finance',
      financeId: i.id,
      title: i.title || '—',
      comment: i.comment || '',
      amount: Number(i.amount) || 0,
      date: i.date || '—',
      sortAt: i.date || i.createdAt || '',
    }))

  const fromAccounts = accounts
    .map((a) => {
      const amount = accountAmountValue(a)
      if (!amount) return null
      const parts = [a.firstName, a.article, a.phone].filter(Boolean)
      return {
        id: `account-${a.id}`,
        source: 'account',
        title: parts.length ? `Аккаунт: ${parts.join(' · ')}` : 'Аккаунт',
        amount,
        date: formatAccountDate(a),
        sortAt: a.createdAt || a.updatedAt || '',
      }
    })
    .filter(Boolean)

  const fromZakupka = buildZakupkaExpenseTransactions()
  const fromUkraineStock = buildUkraineStockExpenseTransactions()

  return [...fromFinance, ...fromAccounts, ...fromZakupka, ...fromUkraineStock]
    .sort((a, b) => new Date(b.sortAt).getTime() - new Date(a.sortAt).getTime())
}

function filterFinanceTransactions(transactions, q) {
  if (!q) return transactions
  return transactions.filter((tx) => financeTxSearchText(tx).includes(q))
}

function applyFinanceExpenseSourceFilters(expenseTx) {
  if (financeAccountsExpensesEnabled) return expenseTx
  return expenseTx.filter((tx) => tx.source !== 'account')
}

function restoreFinanceAccountsExpensesEnabled() {
  try {
    const raw = localStorage.getItem(FINANCE_ACCOUNTS_ENABLED_KEY)
    if (raw === '0' || raw === 'false') financeAccountsExpensesEnabled = false
  } catch (_) {}
}

function toggleFinanceAccountsExpensesEnabled() {
  financeAccountsExpensesEnabled = !financeAccountsExpensesEnabled
  try {
    localStorage.setItem(FINANCE_ACCOUNTS_ENABLED_KEY, financeAccountsExpensesEnabled ? '1' : '0')
  } catch (_) {}
  render()
}

function renderFinanceAccountsToggle() {
  const on = financeAccountsExpensesEnabled
  return `
    <button type="button" class="finance-source-toggle${on ? ' is-on' : ' is-off'}"
      data-finance-accounts-toggle aria-pressed="${on ? 'true' : 'false'}"
      title="${on ? 'Витрати з акаунтів увімкнено' : 'Витрати з акаунтів вимкнено'}">
      <span class="finance-source-toggle-dot" aria-hidden="true"></span>
      <span>З акаунтів</span>
    </button>`
}

let financePageDataPassCache = null

function getFinancePageDataCached() {
  if (!financePageDataPassCache) financePageDataPassCache = getFinancePageData()
  return financePageDataPassCache
}

function getFinancePageData() {
  const financeItems = db.list('finance')
  const accounts = db.list('accounts')
  const incomeTx = buildFinanceIncomeTransactions(financeItems)
  const financeIncomeTx = incomeTx.filter((t) => t.source === 'finance')
  const orderSaleIncomeTx = incomeTx.filter((t) => t.source === 'order-sale')
  const allExpenseTx = buildFinanceExpenseTransactions(financeItems, accounts)
  const financeExpenseTx = allExpenseTx.filter((t) => t.source === 'finance')
  const accountsExpenseTx = allExpenseTx.filter((t) => t.source === 'account')
  const zakupkaExpenseTx = allExpenseTx.filter((t) => t.source === 'zakupka')
  const ukraineStockExpenseTx = allExpenseTx.filter((t) => t.source === 'ukraine-stock')
  const expenseTx = applyFinanceExpenseSourceFilters(allExpenseTx)
  const income = incomeTx.reduce((s, tx) => s + tx.amount, 0)
  const expense = expenseTx.reduce((s, tx) => s + tx.amount, 0)
  return {
    financeItems,
    accounts,
    incomeTx,
    financeIncomeTx,
    orderSaleIncomeTx,
    expenseTx,
    allExpenseTx,
    financeExpenseTx,
    accountsExpenseTx,
    zakupkaExpenseTx,
    ukraineStockExpenseTx,
    income,
    expense,
    balance: income - expense,
  }
}

function financeStatsFromTransactions(transactions) {
  const count = transactions.length
  const total = transactions.reduce((s, t) => s + t.amount, 0)
  if (!count) {
    return { count: 0, total: 0, avg: 0, max: 0, min: 0 }
  }
  const amounts = transactions.map((t) => t.amount)
  return {
    count,
    total,
    avg: total / count,
    max: Math.max(...amounts),
    min: Math.min(...amounts),
  }
}

function financeMonthKey(sortAt) {
  if (!sortAt) return null
  const d = new Date(sortAt)
  if (Number.isNaN(d.getTime())) {
    const iso = String(sortAt).slice(0, 7)
    if (/^\d{4}-\d{2}$/.test(iso)) return iso
    const dot = String(sortAt).match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
    if (dot) return `${dot[3]}-${dot[2]}`
    return null
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
}

function resolveFinanceMonthKey(value) {
  return financeMonthKey(value)
}

function financeTxMatchesMonth(tx, monthKey) {
  return resolveFinanceMonthKey(tx.sortAt) === monthKey
    || resolveFinanceMonthKey(tx.date) === monthKey
}

function resolveFinanceDayKey(value) {
  if (!value) return null
  const d = new Date(value)
  if (!Number.isNaN(d.getTime())) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }
  const dot = String(value).match(/^(\d{2})\.(\d{2})\.(\d{4})$/)
  if (dot) return `${dot[3]}-${dot[2]}-${dot[1]}`
  return String(value).slice(0, 10) || null
}

function getTodayFinanceDayKey() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function formatFinanceTodayDateLabel(dayKey = getTodayFinanceDayKey()) {
  const [year, month, day] = dayKey.split('-').map(Number)
  if (!year || !month || !day) return '—'
  const date = new Date(year, month - 1, day)
  try {
    const weekday = new Intl.DateTimeFormat('uk-UA', { weekday: 'long' }).format(date)
    const rest = new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }).format(date)
    return `${capitalizeFinanceLabel(weekday)}, ${rest}`
  } catch {
    return dayKey
  }
}

function sumFinanceAmountForDay(transactions, monthKey, dayKey) {
  return transactions
    .filter((tx) => financeTxMatchesMonth(tx, monthKey))
    .filter((tx) => resolveFinanceDayKey(tx.sortAt || tx.date) === dayKey)
    .reduce((sum, tx) => sum + tx.amount, 0)
}

function filterFinanceTransactionsByDay(transactions, dayKey) {
  return transactions.filter((tx) => resolveFinanceDayKey(tx.sortAt || tx.date) === dayKey)
}

function renderFinanceDayChart(incomeTx, expenseTx, monthKey) {
  const dayKey = getTodayFinanceDayKey()
  const income = sumFinanceAmountForDay(incomeTx, monthKey, dayKey)
  const expense = sumFinanceAmountForDay(expenseTx, monthKey, dayKey)
  const max = Math.max(income, expense, 1)
  const incomeWidth = income > 0 ? Math.max(4, Math.round((income / max) * 100)) : 0
  const expenseWidth = expense > 0 ? Math.max(4, Math.round((expense / max) * 100)) : 0
  const hasData = income > 0 || expense > 0

  return `
    <div class="finance-day-chart-today" role="region" aria-label="Графік доходів і витрат за сьогодні">
      <div class="finance-bar-chart finance-bar-chart--today finance-bar-chart--horizontal">
        <div class="finance-today-bar-row" title="Доходи ${fmtMoney(income)}">
          <span class="finance-today-bar-label">Доходи</span>
          <div class="finance-bar-track finance-bar-track--horizontal">
            <div class="finance-bar-fill finance-bar-fill--income-day" style="width:${incomeWidth}%"></div>
          </div>
          <span class="finance-today-bar-value positive">${fmtMoney(income)}</span>
        </div>
        <div class="finance-today-bar-row" title="Витрати ${fmtMoney(expense)}">
          <span class="finance-today-bar-label">Витрати</span>
          <div class="finance-bar-track finance-bar-track--horizontal">
            <div class="finance-bar-fill finance-bar-fill--expense-day" style="width:${expenseWidth}%"></div>
          </div>
          <span class="finance-today-bar-value negative">${fmtMoney(expense)}</span>
        </div>
      </div>
      ${hasData ? '' : '<p class="finance-day-chart-empty">Немає операцій за сьогодні</p>'}
    </div>`
}

function getFinanceMonthViewData(monthKey) {
  const data = getFinancePageData()
  const incomeTx = data.incomeTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const expenseTx = data.expenseTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const financeIncomeTx = data.financeIncomeTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const orderSaleIncomeTx = data.orderSaleIncomeTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const financeExpenseTx = data.financeExpenseTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const accountsExpenseTx = data.accountsExpenseTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const zakupkaExpenseTx = data.zakupkaExpenseTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const ukraineStockExpenseTx = data.ukraineStockExpenseTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const income = incomeTx.reduce((s, tx) => s + tx.amount, 0)
  const expense = expenseTx.reduce((s, tx) => s + tx.amount, 0)
  return {
    monthKey,
    incomeTx,
    expenseTx,
    financeIncomeTx,
    orderSaleIncomeTx,
    financeExpenseTx,
    accountsExpenseTx,
    zakupkaExpenseTx,
    ukraineStockExpenseTx,
    income,
    expense,
    balance: income - expense,
  }
}

function capitalizeFinanceLabel(label) {
  if (!label) return label
  return label.charAt(0).toUpperCase() + label.slice(1)
}

function persistMonthlyState() {
  const monthKey = activeFinanceMonthKey || resolveMonthlySelectedKey()
  try {
    localStorage.setItem(MONTHLY_STATE_KEY, JSON.stringify({
      year: activeMonthlyYear,
      monthKey,
    }))
  } catch (_) {}
}

function restoreMonthlyState() {
  try {
    const raw = localStorage.getItem(MONTHLY_STATE_KEY)
    if (!raw) return
    const data = JSON.parse(raw)
    if (Number.isFinite(data.year)) activeMonthlyYear = data.year
    if (typeof data.monthKey === 'string' && /^\d{4}-\d{2}$/.test(data.monthKey)) {
      activeFinanceMonthKey = data.monthKey
      const year = Number(data.monthKey.split('-')[0])
      if (Number.isFinite(year)) activeMonthlyYear = year
    }
  } catch (_) {}
}

function formatFinanceMonthLabel(key) {
  if (!key) return '—'
  const [year, month] = key.split('-')
  const name = FINANCE_MONTH_LABELS[Number(month) - 1] || month
  return `${name} ${year}`
}

function formatMonthlyTabTitle(monthIndex) {
  const name = FINANCE_MONTH_LABELS[monthIndex]
  return name ? capitalizeFinanceLabel(name) : '—'
}

function getMonthlyYearOptions() {
  const nowYear = new Date().getFullYear()
  const max = Math.max(nowYear + 1, activeMonthlyYear, 2028)
  const min = 2024
  const years = []
  for (let year = max; year >= min; year -= 1) years.push(year)
  return years
}

function getMonthlyTabMonths(year = activeMonthlyYear) {
  const tabs = []
  for (let month = 1; month <= 12; month += 1) {
    tabs.push({
      key: `${year}-${String(month).padStart(2, '0')}`,
      monthIndex: month - 1,
    })
  }
  return tabs
}

function resolveMonthlySelectedKey() {
  const tabs = getMonthlyTabMonths(activeMonthlyYear)
  if (!tabs.length) return `${activeMonthlyYear}-01`
  if (activeFinanceMonthKey) {
    const [year, month] = activeFinanceMonthKey.split('-')
    const sameYearKey = `${activeMonthlyYear}-${month}`
    if (Number(year) === activeMonthlyYear && tabs.some((t) => t.key === activeFinanceMonthKey)) {
      return activeFinanceMonthKey
    }
    if (tabs.some((t) => t.key === sameYearKey)) return sameYearKey
  }
  const now = new Date()
  if (activeMonthlyYear === now.getFullYear()) {
    const currentKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    if (tabs.some((t) => t.key === currentKey)) return currentKey
  }
  return tabs[0].key
}

function renderMonthlyYearPicker() {
  const years = getMonthlyYearOptions()
  return `
    <div class="monthly-year-picker-wrap">
      <button type="button" class="monthly-year-trigger finance-dash-title" data-monthly-year-toggle
        aria-haspopup="listbox" aria-expanded="${monthlyYearPickerOpen ? 'true' : 'false'}" aria-label="Обрати рік">
        <span>${activeMonthlyYear}</span>
        <svg class="monthly-year-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="monthly-year-menu${monthlyYearPickerOpen ? '' : ' is-hidden'}" role="listbox" aria-label="Роки">
        ${years.map((year) => `
          <button type="button" role="option" class="monthly-year-option${year === activeMonthlyYear ? ' is-selected' : ''}"
            data-monthly-year="${year}" aria-selected="${year === activeMonthlyYear ? 'true' : 'false'}">
            ${year}
          </button>`).join('')}
      </div>
    </div>`
}

function groupFinanceByMonth(transactions) {
  const map = new Map()
  transactions.forEach((tx) => {
    const key = financeMonthKey(tx.sortAt) || '—'
    if (!map.has(key)) map.set(key, { key, total: 0, count: 0 })
    const row = map.get(key)
    row.total += tx.amount
    row.count += 1
  })
  return [...map.values()].sort((a, b) => String(b.key).localeCompare(String(a.key)))
}

function renderFinanceStatCards(items) {
  return `<div class="finance-detail-stats">${items.map(({ label, value, hint, tone, incomePageMonthKey, expensePageMonthKey }) => {
    if (incomePageMonthKey) {
      return `
    <button type="button" class="finance-stat-card finance-stat-card--clickable${tone ? ` finance-stat-card--${tone}` : ''}"
      data-monthly-income-open="${escapeHtml(incomePageMonthKey)}" aria-label="${escapeHtml(label)} — таблиця">
      <span class="finance-stat-label">${escapeHtml(label)}</span>
      <strong class="finance-stat-value">${value}</strong>
      ${hint ? `<span class="finance-stat-hint">${escapeHtml(hint)}</span>` : ''}
    </button>`
    }
    if (expensePageMonthKey) {
      return `
    <button type="button" class="finance-stat-card finance-stat-card--clickable${tone ? ` finance-stat-card--${tone}` : ''}"
      data-monthly-expense-open="${escapeHtml(expensePageMonthKey)}" aria-label="${escapeHtml(label)} — список витрат">
      <span class="finance-stat-label">${escapeHtml(label)}</span>
      <strong class="finance-stat-value">${value}</strong>
      ${hint ? `<span class="finance-stat-hint">${escapeHtml(hint)}</span>` : ''}
    </button>`
    }
    return `
    <div class="finance-stat-card${tone ? ` finance-stat-card--${tone}` : ''}">
      <span class="finance-stat-label">${escapeHtml(label)}</span>
      <strong class="finance-stat-value">${value}</strong>
      ${hint ? `<span class="finance-stat-hint">${escapeHtml(hint)}</span>` : ''}
    </div>`
  }).join('')}</div>`
}

function getMonthlyIncomeStore() {
  try {
    const raw = localStorage.getItem(MONTHLY_INCOME_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch (_) {
    return {}
  }
}

function writeMonthlyIncomeStore(store) {
  try {
    localStorage.setItem(MONTHLY_INCOME_STORAGE_KEY, JSON.stringify(store))
  } catch (_) {}
}

function findFinanceByMonthlyIncomeDay(monthKey, dayKey) {
  const marker = `${monthKey}-${dayKey}`
  return db.list('finance').find((f) => f.type === 'income' && f.monthlyIncomeDay === marker) || null
}

function getMonthlyIncomeRowData(monthKey, dayKey) {
  const store = getMonthlyIncomeStore()
  const saved = store[monthKey]?.[dayKey]
  const finance = findFinanceByMonthlyIncomeDay(monthKey, dayKey)
  return {
    shop: saved?.shop || finance?.shop || INCOME_SHOP_OPTIONS[0],
    operation: saved?.operation ?? finance?.title ?? '',
    amount: saved?.amount ?? (finance?.amount != null ? finance.amount : ''),
    financeId: saved?.financeId || finance?.id || null,
  }
}

function syncMonthlyIncomeToFinance(monthKey, dayKey, row) {
  const marker = `${monthKey}-${dayKey}`
  const isoDate = marker
  const amount = Number(row.amount) || 0
  const operation = String(row.operation || '').trim()
  const shop = row.shop || INCOME_SHOP_OPTIONS[0]
  const existing = findFinanceByMonthlyIncomeDay(monthKey, dayKey)
  const hasData = amount > 0 || operation

  if (!hasData) {
    if (existing) db.remove('finance', existing.id)
    return null
  }

  const payload = {
    type: 'income',
    date: isoDate,
    title: operation || shop,
    amount,
    shop,
    monthlyIncomeDay: marker,
    ...db.getAuthorMeta(),
  }

  if (existing) {
    db.update('finance', existing.id, payload)
    return existing.id
  }
  const item = db.create('finance', payload)
  logForCollection('finance', item)
  return item.id
}

function saveMonthlyIncomeRowData(monthKey, dayKey, row) {
  const store = getMonthlyIncomeStore()
  if (!store[monthKey]) store[monthKey] = {}
  const financeId = syncMonthlyIncomeToFinance(monthKey, dayKey, row)
  store[monthKey][dayKey] = {
    shop: row.shop || INCOME_SHOP_OPTIONS[0],
    operation: String(row.operation || '').trim(),
    amount: Number(row.amount) || 0,
    financeId,
  }
  writeMonthlyIncomeStore(store)
}

function getMonthDayRows(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  if (!year || !month) return []
  const daysInMonth = new Date(year, month, 0).getDate()
  const rows = []
  for (let d = 1; d <= daysInMonth; d += 1) {
    const dayKey = String(d).padStart(2, '0')
    const mm = String(month).padStart(2, '0')
    rows.push({
      dayKey,
      iso: `${year}-${mm}-${dayKey}`,
      label: new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long' }).format(new Date(year, month - 1, d)),
    })
  }
  return rows
}

function renderMonthlyIncomeShopSelect(monthKey, dayKey, selected) {
  return `
    <select class="monthly-income-input monthly-income-select" data-monthly-income-field="shop"
      data-month-key="${escapeHtml(monthKey)}" data-day-key="${escapeHtml(dayKey)}" aria-label="Магазин">
      ${INCOME_SHOP_OPTIONS.map((shop) => `
        <option value="${escapeHtml(shop)}"${shop === selected ? ' selected' : ''}>${escapeHtml(shop)}</option>`).join('')}
    </select>`
}

function renderMonthlyIncomeTable(monthKey) {
  const days = getMonthDayRows(monthKey)
  let tableTotal = 0
  const body = days.map((day) => {
    const row = getMonthlyIncomeRowData(monthKey, day.dayKey)
    tableTotal += Number(row.amount) || 0
    const amountValue = row.amount === '' || row.amount == null ? '' : row.amount
    return `
      <tr data-monthly-income-row="${escapeHtml(day.dayKey)}">
        <td class="monthly-income-date">${escapeHtml(day.label)}</td>
        <td>${renderMonthlyIncomeShopSelect(monthKey, day.dayKey, row.shop)}</td>
        <td>
          <input type="text" class="monthly-income-input" data-monthly-income-field="operation"
            data-month-key="${escapeHtml(monthKey)}" data-day-key="${escapeHtml(day.dayKey)}"
            value="${escapeHtml(row.operation)}" placeholder="Операція" aria-label="Операція ${escapeHtml(day.label)}" />
        </td>
        <td>
          <input type="number" class="monthly-income-input monthly-income-amount" data-monthly-income-field="amount"
            data-month-key="${escapeHtml(monthKey)}" data-day-key="${escapeHtml(day.dayKey)}"
            value="${amountValue === '' ? '' : escapeHtml(String(amountValue))}"
            min="0" step="0.0001" placeholder="0" aria-label="Сума ${escapeHtml(day.label)}" />
        </td>
      </tr>`
  }).join('')

  return `
    <div class="table-wrap monthly-income-table-wrap">
      <table class="monthly-income-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Магазин</th>
            <th>Операція</th>
            <th>Сума</th>
          </tr>
        </thead>
        <tbody>${body}</tbody>
        <tfoot>
          <tr>
            <td colspan="3"><strong>Всього</strong></td>
            <td class="monthly-income-total positive" id="monthlyIncomeTableTotal">${fmtMoney(tableTotal)}</td>
          </tr>
        </tfoot>
      </table>
    </div>`
}

function renderMonthlyIncomePage(monthKey) {
  const title = capitalizeFinanceLabel(formatFinanceMonthLabel(monthKey))
  const data = getFinanceMonthViewData(monthKey)

  return `
    <div class="finance-dashboard finance-detail-page monthly-income-page" data-searchable>
      ${financeDetailPageHeader('Доходи', title, { backLabel: '← Місячний' })}
      <div class="finance-dash-card monthly-income-page-body">
        <div class="monthly-income-page-head">
          <p class="monthly-income-page-sub">Заповніть операції по днях місяця</p>
          <span class="monthly-income-page-summary positive">Разом: ${fmtMoney(data.income)}</span>
        </div>
        ${renderMonthlyIncomeTable(monthKey)}
      </div>
    </div>`
}

function openMonthlyIncomePage(monthKey) {
  monthlyIncomePageKey = monthKey
  monthlyDayPage = null
  monthlyExpensePageKey = null
  if (monthKey) activeFinanceMonthKey = monthKey
  monthlyYearPickerOpen = false
  render()
}

function closeMonthlyIncomePage() {
  monthlyIncomePageKey = null
  render()
}

function renderMonthlyExpensePage(monthKey) {
  const title = capitalizeFinanceLabel(formatFinanceMonthLabel(monthKey))
  const data = getFinanceMonthViewData(monthKey)

  return `
    <div class="finance-dashboard finance-detail-page monthly-expense-page" data-searchable>
      ${financeDetailPageHeader('Витрати', title, { backLabel: '← Місячний' })}
      <div class="finance-dash-card monthly-expense-page-body">
        <div class="monthly-income-page-head">
          <p class="monthly-income-page-sub">Операції витрат за місяць</p>
          <span class="monthly-income-page-summary negative">Разом: ${fmtMoney(data.expense)}</span>
        </div>
        ${renderFinanceTransactionList(data.expenseTx, 'expense', { detail: true })}
      </div>
    </div>`
}

function openMonthlyExpensePage(monthKey) {
  monthlyExpensePageKey = monthKey
  monthlyDayPage = null
  monthlyIncomePageKey = null
  if (monthKey) activeFinanceMonthKey = monthKey
  monthlyYearPickerOpen = false
  render()
}

function closeMonthlyExpensePage() {
  monthlyExpensePageKey = null
  render()
}

function openMonthlyDayPage(monthKey, dayKey = getTodayFinanceDayKey(), tab = 'expense') {
  monthlyDayPage = {
    monthKey,
    dayKey,
    tab: tab === 'income' ? 'income' : 'expense',
  }
  if (monthKey) activeFinanceMonthKey = monthKey
  monthlyIncomePageKey = null
  monthlyExpensePageKey = null
  monthlyYearPickerOpen = false
  render()
}

function closeMonthlyDayPage() {
  monthlyDayPage = null
  render()
}

function renderMonthlyDayTabs(activeTab) {
  const tabs = [
    { id: 'expense', label: 'Витрати' },
    { id: 'income', label: 'Доходи' },
  ]
  return `
    <div class="monthly-day-tabs" role="tablist" aria-label="Операції за день">
      ${tabs.map((t) => `
        <button type="button" class="monthly-day-tab${activeTab === t.id ? ' is-active' : ''}"
          role="tab" aria-selected="${activeTab === t.id ? 'true' : 'false'}"
          data-monthly-day-tab="${t.id}">${escapeHtml(t.label)}</button>`).join('')}
    </div>`
}

function renderMonthlyDayPage() {
  const { monthKey, dayKey, tab } = monthlyDayPage
  const data = getFinanceMonthViewData(monthKey)
  const incomeTx = filterFinanceTransactionsByDay(data.incomeTx, dayKey)
  const expenseTx = filterFinanceTransactionsByDay(data.expenseTx, dayKey)
  const isIncome = tab === 'income'
  const listTx = isIncome ? incomeTx : expenseTx
  const total = listTx.reduce((s, tx) => s + tx.amount, 0)
  const dateLabel = formatFinanceTodayDateLabel(dayKey)
  const monthLabel = formatFinanceMonthLabel(monthKey)

  return `
    <div class="finance-dashboard finance-detail-page monthly-day-page" data-searchable>
      ${financeDetailPageHeader('По днях', dateLabel, { backLabel: '← Місячний' })}
      ${renderMonthlyDayTabs(tab)}
      <div class="finance-dash-card monthly-day-page-body">
        <div class="monthly-day-page-head">
          <p class="monthly-day-page-sub">${escapeHtml(monthLabel)} · ${isIncome ? 'доходи' : 'витрати'} за день</p>
          <span class="monthly-day-page-summary ${isIncome ? 'positive' : 'negative'}">Разом: ${fmtMoney(total)}</span>
        </div>
        ${renderFinanceTransactionList(listTx, tab, { detail: true })}
      </div>
    </div>`
}

function persistMonthlyIncomeField(input) {
  const monthKey = input.dataset.monthKey
  const dayKey = input.dataset.dayKey
  const field = input.dataset.monthlyIncomeField
  if (!monthKey || !dayKey || !field) return

  const rowEl = input.closest('[data-monthly-income-row]')
  if (!rowEl) return

  const shop = rowEl.querySelector('[data-monthly-income-field="shop"]')?.value || INCOME_SHOP_OPTIONS[0]
  const operation = rowEl.querySelector('[data-monthly-income-field="operation"]')?.value || ''
  const amountRaw = rowEl.querySelector('[data-monthly-income-field="amount"]')?.value
  saveMonthlyIncomeRowData(monthKey, dayKey, { shop, operation, amount: amountRaw })

  if (monthlyIncomePageKey === monthKey) {
    refreshMonthlyIncomePageTotals(monthKey)
  }
}

function refreshMonthlyIncomePageTotals(monthKey) {
  const totalEl = document.getElementById('monthlyIncomeTableTotal')
  if (totalEl) {
    const days = getMonthDayRows(monthKey)
    let sum = 0
    days.forEach((day) => {
      sum += Number(getMonthlyIncomeRowData(monthKey, day.dayKey).amount) || 0
    })
    totalEl.textContent = fmtMoney(sum)
  }
  const summaryEl = document.querySelector('.monthly-income-page-summary')
  if (summaryEl) {
    const data = getFinanceMonthViewData(monthKey)
    summaryEl.textContent = `Разом: ${fmtMoney(data.income)}`
  }
}

function renderFinanceMonthBreakdown(groups, kind) {
  if (!groups.length) {
    return '<p class="finance-detail-empty">Немає даних за періодами</p>'
  }
  const max = Math.max(...groups.map((g) => g.total), 1)
  const amountClass = kind === 'income' ? 'positive' : 'negative'
  return `
    <section class="finance-detail-section">
      <h3 class="finance-detail-section-title">За місяцями</h3>
      <ul class="finance-month-list">
        ${groups.map((g) => `
          <li class="finance-month-item">
            <div class="finance-month-head">
              <span>${escapeHtml(formatFinanceMonthLabel(g.key))}</span>
              <strong class="${amountClass}">${fmtMoney(g.total)}</strong>
            </div>
            <div class="finance-month-track">
              <div class="finance-month-fill" style="width:${Math.round((g.total / max) * 100)}%"></div>
            </div>
            <span class="finance-month-meta">${g.count} ${g.count === 1 ? 'операція' : g.count < 5 ? 'операції' : 'операцій'}</span>
          </li>`).join('')}
      </ul>
    </section>`
}

function financeMonthChangePercent(transactions) {
  const groups = groupFinanceByMonth(transactions).filter((g) => g.key !== '—')
  if (groups.length < 2) return null
  const current = groups[0].total
  const previous = groups[1].total
  if (!previous) return current > 0 ? 100 : 0
  return Math.round(((current - previous) / previous) * 100)
}

function financeNetMonthChangePercent(data) {
  const incomeMonths = groupFinanceByMonth(data.incomeTx).filter((g) => g.key !== '—')
  const expenseMonths = groupFinanceByMonth(data.expenseTx).filter((g) => g.key !== '—')
  const keys = [...new Set([...incomeMonths, ...expenseMonths].map((m) => m.key))]
    .sort()
    .reverse()
  if (keys.length < 2) return null
  const net = (key) => {
    const inc = incomeMonths.find((m) => m.key === key)?.total || 0
    const exp = expenseMonths.find((m) => m.key === key)?.total || 0
    return inc - exp
  }
  const current = net(keys[0])
  const previous = net(keys[1])
  if (!previous) return current > 0 ? 100 : (current < 0 ? -100 : 0)
  return Math.round(((current - previous) / Math.abs(previous)) * 100)
}

function formatFinanceChangePill(pct) {
  if (pct == null) return '<span class="finance-kpi-pill finance-kpi-pill--muted">—</span>'
  const sign = pct > 0 ? '+' : ''
  const cls = pct > 0 ? 'finance-kpi-pill--up' : pct < 0 ? 'finance-kpi-pill--down' : 'finance-kpi-pill--muted'
  return `<span class="finance-kpi-pill ${cls}">${sign}${pct}%</span>`
}

function sparklineValuesFromTransactions(transactions, count = 8) {
  const groups = groupFinanceByMonth(transactions).filter((g) => g.key !== '—')
  const slice = groups.slice(0, count).reverse()
  if (!slice.length) return [0, 0, 0, 0]
  const values = slice.map((g) => g.total)
  while (values.length < 4) values.unshift(0)
  return values
}

function sparklineValuesFromMonthIncome(data, monthKey) {
  const days = buildFinanceMonthDailyChartData(data, monthKey)
  const todayKey = getTodayFinanceDayKey()
  const isCurrentMonth = monthKey === todayKey.slice(0, 7)
  let cumulative = 0
  const values = []
  days.forEach((d) => {
    if (isCurrentMonth && d.key > todayKey) return
    cumulative += d.income
    values.push(cumulative)
  })
  if (!values.length) return [0, 0]
  if (values.length === 1) return [0, values[0]]
  return values
}

function renderSparkline(values, color) {
  const w = 140
  const h = 40
  const max = Math.max(...values, 1)
  const pad = { top: 4, bottom: 4 }
  const plotH = h - pad.top - pad.bottom
  const baselineY = h - pad.bottom
  const step = values.length > 1 ? w / (values.length - 1) : 0
  const points = values.map((v, i) => ({
    x: values.length > 1 ? i * step : w / 2,
    y: pad.top + (1 - (Math.max(0, v) / max)) * plotH,
  }))
  const line = financeChartSmoothPath(points)
  const area = financeChartAreaPath(points, baselineY)
  const gradId = `sparkGrad-${String(color).replace(/[^a-z0-9]/gi, '')}`
  return `<svg class="finance-sparkline" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">
    <defs>
      <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="0.34" />
        <stop offset="100%" stop-color="${color}" stop-opacity="0.03" />
      </linearGradient>
    </defs>
    <path class="finance-sparkline-fill" d="${area}" fill="url(#${gradId})" />
    <path class="finance-sparkline-line" d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
  </svg>`
}

function buildFinanceMonthlyChartData(data, { limit } = {}) {
  const incomeMonths = groupFinanceByMonth(data.incomeTx)
  const expenseMonths = groupFinanceByMonth(data.expenseTx)
  let keys = [...new Set([...incomeMonths, ...expenseMonths].map((m) => m.key))]
    .filter((k) => k && k !== '—')
    .sort()
  if (limit) keys = keys.slice(-limit)
  return keys.map((key) => ({
    key,
    label: formatFinanceMonthLabel(key).split(' ')[0],
    fullLabel: formatFinanceMonthLabel(key),
    income: incomeMonths.find((m) => m.key === key)?.total || 0,
    expense: expenseMonths.find((m) => m.key === key)?.total || 0,
  }))
}

const FINANCE_WEEKDAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']

function sumFinanceAmountForDayKey(transactions, dayKey) {
  return filterFinanceTransactionsByDay(transactions, dayKey)
    .reduce((sum, tx) => sum + tx.amount, 0)
}

function getFinanceWeekdayLabelForDayKey(dayKey) {
  const [year, month, day] = dayKey.split('-').map(Number)
  if (!year || !month || !day) return '—'
  const date = new Date(year, month - 1, day)
  const index = date.getDay() === 0 ? 6 : date.getDay() - 1
  return FINANCE_WEEKDAY_LABELS[index] || '—'
}

function getFinanceMonthDayKeys(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  if (!year || !month) return []
  const daysInMonth = new Date(year, month, 0).getDate()
  const keys = []
  for (let day = 1; day <= daysInMonth; day += 1) {
    keys.push(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`)
  }
  return keys
}

function buildFinanceMonthDailyChartData(data, monthKey) {
  const pendingByDay = buildOrderTransactionsBeforeSaleByDay(monthKey)
  return getFinanceMonthDayKeys(monthKey).map((key) => {
    const day = Number(key.split('-')[2]) || 0
    return {
      key,
      day,
      weekday: getFinanceWeekdayLabelForDayKey(key),
      income: sumFinanceAmountForDayKey(data.incomeTx, key),
      expense: sumFinanceAmountForDayKey(data.expenseTx, key),
      pending: pendingByDay.get(key) || 0,
    }
  })
}

function financeChartCompactMoney(value) {
  const n = Number(value) || 0
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`
  return String(Math.round(n))
}

function financeChartSmoothPath(points) {
  if (!points.length) return ''
  if (points.length === 1) return `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`
  let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x.toFixed(2)} ${cp1y.toFixed(2)} ${cp2x.toFixed(2)} ${cp2y.toFixed(2)} ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`
  }
  return d
}

function financeChartAreaPath(points, baselineY) {
  if (!points.length) return ''
  const line = financeChartSmoothPath(points)
  const last = points[points.length - 1]
  const first = points[0]
  return `${line} L ${last.x.toFixed(2)} ${baselineY.toFixed(2)} L ${first.x.toFixed(2)} ${baselineY.toFixed(2)} Z`
}

function resolveFinanceExpenseStructureType(tx) {
  if (tx.source === 'account') return { key: 'account', label: 'Аккаунти' }
  if (tx.source === 'zakupka') return { key: 'zakupka', label: 'Закупки' }
  if (tx.source === 'ukraine-stock') return { key: 'ukraine-stock', label: 'Залишки' }
  const label = String(tx.title || '').trim() || 'Інше'
  return { key: `finance:${label}`, label }
}

function buildFinanceExpenseStructureSegments(expenseTx) {
  const totals = new Map()
  expenseTx
    .filter((tx) => tx.source !== 'ukraine-stock')
    .forEach((tx) => {
    const { key, label } = resolveFinanceExpenseStructureType(tx)
    const prev = totals.get(key) || { key, label, amount: 0, count: 0 }
    prev.amount += Number(tx.amount) || 0
    prev.count += 1
    totals.set(key, prev)
  })
  return [...totals.values()]
    .filter((seg) => seg.amount > 0)
    .sort((a, b) => b.amount - a.amount)
    .map((seg) => ({
      ...seg,
      color: FINANCE_EXPENSE_TYPE_COLORS[seg.label] || FINANCE_EXPENSE_TYPE_COLORS['Інше'],
    }))
}

function financeStructurePolarPoint(cx, cy, radius, angleDeg) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
}

function financeStructureDonutArcPath(cx, cy, outerR, innerR, startAngle, endAngle) {
  const sweep = endAngle - startAngle
  if (sweep >= 359.999) {
    return [
      `M ${cx} ${cy - outerR}`,
      `A ${outerR} ${outerR} 0 1 1 ${cx - 0.01} ${cy - outerR}`,
      `L ${cx - 0.01} ${cy - innerR}`,
      `A ${innerR} ${innerR} 0 1 0 ${cx} ${cy - innerR}`,
      'Z',
    ].join(' ')
  }
  const startOuter = financeStructurePolarPoint(cx, cy, outerR, startAngle)
  const endOuter = financeStructurePolarPoint(cx, cy, outerR, endAngle)
  const startInner = financeStructurePolarPoint(cx, cy, innerR, endAngle)
  const endInner = financeStructurePolarPoint(cx, cy, innerR, startAngle)
  const largeArc = sweep > 180 ? 1 : 0
  return [
    `M ${startOuter.x.toFixed(2)} ${startOuter.y.toFixed(2)}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x.toFixed(2)} ${endOuter.y.toFixed(2)}`,
    `L ${startInner.x.toFixed(2)} ${startInner.y.toFixed(2)}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${endInner.x.toFixed(2)} ${endInner.y.toFixed(2)}`,
    'Z',
  ].join(' ')
}

function renderFinanceExpenseStructureChart(expenseTx) {
  const segments = buildFinanceExpenseStructureSegments(expenseTx)
  const total = segments.reduce((sum, seg) => sum + seg.amount, 0)
  if (!total) {
    return '<p class="finance-detail-empty">Витрат за період немає</p>'
  }

  const cx = 100
  const cy = 100
  const outerR = 88
  const innerR = 58
  const gap = segments.length > 1 ? 2 : 0
  const available = 360 - gap * segments.length
  let cursor = 0
  const slices = segments.map((seg) => {
    const sweep = (seg.amount / total) * available
    const startAngle = cursor + gap / 2
    const endAngle = startAngle + sweep
    cursor += sweep + gap
    const pct = Math.round((seg.amount / total) * 100)
    return { ...seg, startAngle, endAngle, pct }
  })

  const ariaLabel = slices.map((seg) => `${seg.label}: ${fmtMoney(seg.amount)}`).join('; ')
  const segmentPaths = slices.map((seg) => `
    <g
      class="finance-expense-structure-segment"
      data-expense-type="${escapeHtml(seg.key)}"
      data-expense-label="${escapeHtml(seg.label)}"
      data-expense-amount="${seg.amount}"
      data-expense-pct="${seg.pct}"
      tabindex="0"
      role="button"
      aria-label="${escapeHtml(`${seg.label}: ${fmtMoney(seg.amount)} (${seg.pct}%)`)}"
    >
      <path
        d="${financeStructureDonutArcPath(cx, cy, outerR, innerR, seg.startAngle, seg.endAngle)}"
        fill="${seg.color}"
      />
    </g>`).join('')

  const legend = slices.map((seg) => `
    <li
      class="finance-expense-structure-legend-item"
      data-expense-type="${escapeHtml(seg.key)}"
      data-expense-label="${escapeHtml(seg.label)}"
      data-expense-amount="${seg.amount}"
      data-expense-pct="${seg.pct}"
      tabindex="0"
      role="button"
    >
      <span class="finance-expense-structure-dot" style="background:${seg.color}"></span>
      <span class="finance-expense-structure-legend-label">${escapeHtml(seg.label)}</span>
      <strong>${fmtMoney(seg.amount)}</strong>
    </li>`).join('')

  return `
    <div class="finance-expense-structure" data-expense-total="${total}">
      <div class="finance-expense-structure-chart" role="img" aria-label="${escapeHtml(ariaLabel)}">
        <svg class="finance-expense-structure-svg" viewBox="0 0 200 200" aria-hidden="true">
          <g class="finance-expense-structure-segments">${segmentPaths}</g>
        </svg>
        <div class="finance-expense-structure-center">
          <span class="finance-expense-structure-label">Витрати</span>
          <strong class="finance-expense-structure-value negative">${fmtMoney(total)}</strong>
        </div>
      </div>
      <ul class="finance-expense-structure-legend">${legend}</ul>
    </div>`
}

function resetFinanceExpenseStructureHighlight(chart) {
  if (!chart) return
  chart.querySelectorAll('.finance-expense-structure-segment.is-active, .finance-expense-structure-legend-item.is-active')
    .forEach((el) => el.classList.remove('is-active'))
  const label = chart.querySelector('.finance-expense-structure-label')
  const value = chart.querySelector('.finance-expense-structure-value')
  const total = Number(chart.dataset.expenseTotal) || 0
  if (label) label.textContent = 'Витрати'
  if (value) {
    value.textContent = fmtMoney(total)
    value.className = 'finance-expense-structure-value negative'
  }
}

function highlightFinanceExpenseStructureSegment(chart, typeKey) {
  if (!chart || !typeKey) return
  let target = null
  chart.querySelectorAll('.finance-expense-structure-segment, .finance-expense-structure-legend-item')
    .forEach((el) => {
      const active = el.dataset.expenseType === typeKey
      el.classList.toggle('is-active', active)
      if (active && !target) target = el
    })
  const label = chart.querySelector('.finance-expense-structure-label')
  const value = chart.querySelector('.finance-expense-structure-value')
  if (!target || !label || !value) return
  label.textContent = target.dataset.expenseLabel || '—'
  value.textContent = fmtMoney(Number(target.dataset.expenseAmount) || 0)
  value.className = 'finance-expense-structure-value negative'
}

function getFinanceExpenseStructureHoverTarget(target) {
  return target?.closest?.('.finance-expense-structure-segment, .finance-expense-structure-legend-item') || null
}

function renderFinanceMonthAreaChart(data, monthKey) {
  const days = buildFinanceMonthDailyChartData(data, monthKey)
  if (!days.length) {
    return '<p class="finance-detail-empty">Немає днів для відображення</p>'
  }

  const width = 920
  const height = 320
  const pad = { top: 18, right: 18, bottom: 58, left: 58 }
  const plotW = width - pad.left - pad.right
  const plotH = height - pad.top - pad.bottom
  const maxY = Math.max(...days.flatMap((d) => [d.income, d.expense, d.pending]), 1)
  const baselineY = pad.top + plotH
  const xAt = (index) => pad.left + (days.length === 1 ? plotW / 2 : (index / (days.length - 1)) * plotW)
  const yAt = (value) => pad.top + (1 - (Math.max(0, value) / maxY)) * plotH

  const incomePoints = days.map((d, i) => ({ x: xAt(i), y: yAt(d.income), meta: d }))
  const expensePoints = days.map((d, i) => ({ x: xAt(i), y: yAt(d.expense), meta: d }))
  const pendingPoints = days.map((d, i) => ({ x: xAt(i), y: yAt(d.pending), meta: d }))
  const incomeLine = financeChartSmoothPath(incomePoints)
  const expenseLine = financeChartSmoothPath(expensePoints)
  const pendingLine = financeChartSmoothPath(pendingPoints)
  const incomeArea = financeChartAreaPath(incomePoints, baselineY)
  const expenseArea = financeChartAreaPath(expensePoints, baselineY)
  const pendingArea = financeChartAreaPath(pendingPoints, baselineY)

  const yTicks = 4
  const gridLines = Array.from({ length: yTicks + 1 }, (_, i) => {
    const value = (maxY / yTicks) * i
    const y = yAt(value)
    return `
      <line class="finance-area-grid-line" x1="${pad.left}" y1="${y.toFixed(2)}" x2="${width - pad.right}" y2="${y.toFixed(2)}" />
      <text class="finance-area-y-label" x="${pad.left - 8}" y="${(y + 4).toFixed(2)}" text-anchor="end">${escapeHtml(financeChartCompactMoney(value))}</text>`
  }).join('')

  const labelStep = days.length > 20 ? 2 : 1
  const xLabels = days.map((d, i) => {
    if (i % labelStep !== 0 && i !== days.length - 1) return ''
    const x = xAt(i)
    return `
      <g class="finance-area-x-label" transform="translate(${x.toFixed(2)}, ${height - 18})">
        <text class="finance-area-x-day" text-anchor="middle">${d.day}</text>
        <text class="finance-area-x-weekday" y="14" text-anchor="middle">${escapeHtml(d.weekday)}</text>
      </g>`
  }).join('')

  const peakIncome = days.reduce((best, d) => (d.income > (best?.income || 0) ? d : best), null)
  const peakMarker = peakIncome && peakIncome.income > 0
    ? (() => {
      const idx = days.indexOf(peakIncome)
      const x = xAt(idx)
      const y = yAt(peakIncome.income)
      return `
        <circle class="finance-area-peak" cx="${x.toFixed(2)}" cy="${y.toFixed(2)}" r="7" />
        <text class="finance-area-peak-label" x="${x.toFixed(2)}" y="${(y - 14).toFixed(2)}" text-anchor="middle">${escapeHtml(fmtMoney(peakIncome.income))}</text>`
    })()
    : ''

  const monthTitle = formatFinanceMonthLabel(monthKey)

  return `
    <div class="finance-area-chart-wrap" role="img" aria-label="Динаміка доходів, замовлень в обробці та витрат за ${escapeHtml(monthTitle)}">
      <svg class="finance-area-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="financeIncomeAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#7cb87c" stop-opacity="0.42" />
            <stop offset="100%" stop-color="#7cb87c" stop-opacity="0.03" />
          </linearGradient>
          <linearGradient id="financeExpenseAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#d88484" stop-opacity="0.34" />
            <stop offset="100%" stop-color="#d88484" stop-opacity="0.02" />
          </linearGradient>
          <linearGradient id="financePendingAreaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#d4b84a" stop-opacity="0.34" />
            <stop offset="100%" stop-color="#d4b84a" stop-opacity="0.02" />
          </linearGradient>
        </defs>
        ${gridLines}
        <path class="finance-area-fill finance-area-fill--expense" d="${expenseArea}" />
        <path class="finance-area-fill finance-area-fill--pending" d="${pendingArea}" />
        <path class="finance-area-fill finance-area-fill--income" d="${incomeArea}" />
        <path class="finance-area-line finance-area-line--expense" d="${expenseLine}" />
        <path class="finance-area-line finance-area-line--pending" d="${pendingLine}" />
        <path class="finance-area-line finance-area-line--income" d="${incomeLine}" />
        ${peakMarker}
        ${xLabels}
      </svg>
    </div>`
}

function buildAllMonthlyChartData(data) {
  const incomeMonths = groupFinanceByMonth(data.incomeTx)
  const expenseMonths = groupFinanceByMonth(data.expenseTx)
  const incomeCount = new Map()
  const expenseCount = new Map()
  data.incomeTx.forEach((tx) => {
    const k = resolveFinanceMonthKey(tx.sortAt || tx.date)
    if (k) incomeCount.set(k, (incomeCount.get(k) || 0) + 1)
  })
  data.expenseTx.forEach((tx) => {
    const k = resolveFinanceMonthKey(tx.sortAt || tx.date)
    if (k) expenseCount.set(k, (expenseCount.get(k) || 0) + 1)
  })
  const keys = [...new Set([...incomeMonths, ...expenseMonths].map((m) => m.key))]
    .filter((k) => k && k !== '—')
    .sort()
    .reverse()
  return keys.map((key) => {
    const income = incomeMonths.find((m) => m.key === key)?.total || 0
    const expense = expenseMonths.find((m) => m.key === key)?.total || 0
    return {
      key,
      label: formatFinanceMonthLabel(key),
      income,
      expense,
      balance: income - expense,
      ops: (incomeCount.get(key) || 0) + (expenseCount.get(key) || 0),
    }
  })
}

function renderMonthlyTabsBar(selectedKey, activeIndex) {
  const tabs = getMonthlyTabMonths(activeMonthlyYear)
  const maxDistance = Math.max(activeIndex, tabs.length - 1 - activeIndex)
  return `
    <div class="monthly-tabs-wrap" style="--monthly-active-index:${activeIndex};--monthly-max-distance:${maxDistance};--monthly-tab-count:${tabs.length}">
      <div class="monthly-tabs-bar" role="tablist" aria-label="Місяці ${activeMonthlyYear}">
        ${tabs.map((t, index) => {
    const label = formatFinanceMonthLabel(t.key)
    const title = formatMonthlyTabTitle(t.monthIndex)
    const isActive = t.key === selectedKey
    const tabDistance = Math.abs(index - activeIndex)
    return `
          <button type="button" role="tab"
            class="monthly-tab${isActive ? ' is-active' : ''}"
            style="--tab-distance:${tabDistance}"
            data-finance-month="${escapeHtml(t.key)}"
            data-search="${escapeHtml(label)}"
            aria-selected="${isActive ? 'true' : 'false'}"
            aria-label="${escapeHtml(title)}"
            id="monthly-tab-${escapeHtml(t.key)}">
            <span class="monthly-tab-title">${escapeHtml(title)}</span>
          </button>`
  }).join('')}
      </div>
    </div>`
}

function renderMonthlyMonthList(months) {
  if (!months.length) {
    return '<p class="finance-detail-empty">Немає даних за місяцями</p>'
  }
  return `
    <ul class="monthly-list">
      ${months.map((m) => `
        <li>
          <button type="button" class="monthly-list-item" data-finance-month="${escapeHtml(m.key)}" data-search="${escapeHtml(`${m.label} ${m.income} ${m.expense} ${m.balance}`)}">
            <div class="monthly-list-head">
              <span class="monthly-list-title">${escapeHtml(m.label)}</span>
              <span class="monthly-list-arrow" aria-hidden="true">→</span>
            </div>
            <div class="monthly-list-stats">
              <span class="positive">+${fmtMoney(m.income)}</span>
              <span class="negative">−${fmtMoney(m.expense)}</span>
              <strong class="${m.balance >= 0 ? 'positive' : 'negative'}">${fmtMoney(m.balance)}</strong>
            </div>
            <span class="monthly-list-meta">${m.ops} ${m.ops === 1 ? 'операція' : m.ops < 5 ? 'операції' : 'операцій'}</span>
          </button>
        </li>`).join('')}
    </ul>`
}

function renderMonthly() {
  if (monthlyDayPage) {
    return renderMonthlyDayPage()
  }
  if (monthlyExpensePageKey) {
    return renderMonthlyExpensePage(monthlyExpensePageKey)
  }
  if (monthlyIncomePageKey) {
    return renderMonthlyIncomePage(monthlyIncomePageKey)
  }

  const selectedKey = resolveMonthlySelectedKey()
  const tabs = getMonthlyTabMonths(activeMonthlyYear)
  const activeIndex = Math.max(0, tabs.findIndex((t) => t.key === selectedKey))

  return `
    <div class="finance-dashboard monthly-page" data-searchable>
      <div class="monthly-window" style="--monthly-active-index:${activeIndex};--monthly-tab-count:${tabs.length}">
        <div class="monthly-tab-stage">
          <div class="monthly-period-bar" aria-label="Рік і місяць">
            <div class="monthly-year-section">
              ${renderMonthlyYearPicker()}
            </div>
            ${renderMonthlyTabsBar(selectedKey, activeIndex)}
          </div>
          <div class="monthly-tab-content" role="tabpanel" aria-labelledby="monthly-tab-${escapeHtml(selectedKey)}">
            ${renderFinanceMonthDetailBody(selectedKey)}
          </div>
        </div>
      </div>
    </div>`
}

function renderFinanceBarChart(chartData) {
  if (!chartData.length) return '<p class="finance-detail-empty">Недостатньо даних для графіка</p>'
  const max = Math.max(...chartData.flatMap((d) => [d.income, d.expense]), 1)
  return `
    <div class="finance-bar-chart">
      ${chartData.map((d) => `
        <button type="button" class="finance-bar-col" data-finance-month="${escapeHtml(d.key)}" aria-label="${escapeHtml(formatFinanceMonthLabel(d.key))} — деталі">
          <div class="finance-bar-group">
            <div class="finance-bar-track" title="Доходи ${fmtMoney(d.income)}">
              <div class="finance-bar-fill finance-bar-fill--income" style="height:${Math.max(4, Math.round((d.income / max) * 100))}%"></div>
            </div>
            <div class="finance-bar-track" title="Витрати ${fmtMoney(d.expense)}">
              <div class="finance-bar-fill finance-bar-fill--expense" style="height:${Math.max(4, Math.round((d.expense / max) * 100))}%"></div>
            </div>
          </div>
          <span class="finance-bar-label">${escapeHtml(d.label)}</span>
        </button>`).join('')}
    </div>`
}

function getRecentFinanceTransactions(data, limit = 8) {
  const all = [
    ...data.incomeTx.map((t) => ({ ...t, kind: 'income' })),
    ...data.expenseTx.map((t) => ({ ...t, kind: 'expense' })),
  ]
  return all
    .sort((a, b) => new Date(b.sortAt).getTime() - new Date(a.sortAt).getTime())
    .slice(0, limit)
}

function financeTxAvatar(title) {
  const clean = String(title).replace(/^Аккаунт:\s*/i, '')
  const parts = clean.split(/[\s·]+/).filter(Boolean)
  return ((parts[0]?.[0] || 'O') + (parts[1]?.[0] || '')).toUpperCase()
}

function renderFinanceRecentTable(rows) {
  if (!rows.length) {
    return '<p class="finance-detail-empty">Операцій немає</p>'
  }
  return `
    <div class="finance-table-wrap">
      <table class="finance-recent-table">
        <thead>
          <tr><th>Опис</th><th>Сума</th><th>Тип</th><th>Дата</th></tr>
        </thead>
        <tbody>
          ${rows.map((tx) => `
            <tr data-search="${escapeHtml(financeTxSearchText(tx))}">
              <td>
                <span class="finance-recent-user">
                  <span class="finance-avatar">${escapeHtml(financeTxAvatar(tx.title))}</span>
                  <span class="finance-recent-name">${escapeHtml(tx.title)}</span>
                </span>
              </td>
              <td class="finance-recent-amount ${tx.kind === 'income' ? 'positive' : 'negative'}">
                <strong>${tx.kind === 'income' ? '+' : '−'}${fmtMoney(tx.amount)}</strong>
              </td>
              <td>
                <span class="finance-status-pill finance-status-pill--${tx.kind}">
                  <span class="finance-status-dot"></span>
                  ${tx.kind === 'income' ? 'Дохід' : 'Витрата'}
                </span>
              </td>
              <td class="finance-recent-date">${escapeHtml(tx.date)}</td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`
}

function renderFinanceKpiExtraHtml(extraRows = []) {
  if (!extraRows.length) {
    return `<div class="finance-kpi-extra finance-kpi-extra--spacer" aria-hidden="true">
        <div class="finance-kpi-extra-row">
          <span class="finance-kpi-extra-label">&nbsp;</span>
          <span class="finance-kpi-extra-value">&nbsp;</span>
        </div>
      </div>`
  }
  return `<div class="finance-kpi-extra">${extraRows.map(({ label: rowLabel, value, tone }) => `
        <div class="finance-kpi-extra-row">
          <span class="finance-kpi-extra-label">${escapeHtml(rowLabel)}</span>
          <span class="finance-kpi-extra-value${tone ? ` finance-kpi-extra-value--${tone}` : ''}">${value}</span>
        </div>`).join('')}</div>`
}

function renderFinanceKpiCard({ kind, label, amount, changePct, sparkValues, sparkColor, detailKey, extraRows = [] }) {
  const icons = { income: '↗', expense: '↘', overall: '◎' }
  const addBtn = kind === 'expense'
    ? renderFinanceExpenseAddButton()
    : kind === 'income'
      ? renderFinanceIncomeAddButton()
      : '<span class="finance-kpi-add-placeholder" aria-hidden="true"></span>'
  const detailLabel = `${label} — детальна сторінка`
  const headHtml = `
      <div class="finance-kpi-top">
        <span class="finance-kpi-icon" aria-hidden="true">${icons[kind]}</span>
        ${formatFinanceChangePill(changePct)}
        <span class="finance-kpi-actions">${addBtn}</span>
      </div>
      <span class="finance-kpi-label">${escapeHtml(label)}</span>`
  const amountHtml = `<strong class="finance-kpi-value">${fmtMoney(amount)}</strong>`
  const extraRowsHtml = renderFinanceKpiExtraHtml(extraRows)
  const sparkHtml = `<div class="finance-kpi-spark">${renderSparkline(sparkValues, sparkColor)}</div>`

  if (kind === 'overall') {
    return `
    <button type="button" class="finance-kpi finance-kpi--${kind}" data-finance-detail="${detailKey}" aria-label="${escapeHtml(detailLabel)}">
      ${headHtml}
      <div class="finance-kpi-amount-row">${amountHtml}</div>
      ${extraRowsHtml}
      ${sparkHtml}
    </button>`
  }

  return `
    <div class="finance-kpi finance-kpi--${kind} finance-kpi--has-add">
      ${headHtml}
      <button type="button" class="finance-kpi-amount-row finance-kpi-value-btn" data-finance-detail="${detailKey}" aria-label="${escapeHtml(detailLabel)}">
        ${amountHtml}
      </button>
      ${extraRowsHtml}
      ${sparkHtml}
    </div>`
}

function financeDetailPageHeader(title, subtitle, { backLabel = '← Фінанси' } = {}) {
  return `
    <div class="page-header finance-detail-header">
      <button type="button" class="btn-link finance-back-btn" data-finance-back>${escapeHtml(backLabel)}</button>
      <h1 class="page-title">${escapeHtml(title)}</h1>
      <p class="page-sub">${escapeHtml(subtitle)}</p>
    </div>`
}

function renderFinancePageHeader(monthKey, { subtitle = 'Панель керування доходами та витратами', backLabel = null } = {}) {
  const backBtn = backLabel
    ? `<button type="button" class="btn-link finance-back-btn" data-finance-back>${escapeHtml(backLabel)}</button>`
    : ''
  return `
    <div class="page-header finance-detail-header finance-dash-header">
      ${backBtn}
      <div class="order-shop-title-row page-period-row">
        <h1 class="page-period-title order-shop-block-title">Фінанси</h1>
        ${renderPagePeriodLabelButton(financePagePeriod, 'finance', monthKey)}
      </div>
      <p class="page-sub finance-dash-sub">${escapeHtml(subtitle)}</p>
    </div>`
}

function filterFinanceDataByMonth(data, monthKey) {
  const incomeTx = data.incomeTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const expenseTx = data.expenseTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const financeIncomeTx = data.financeIncomeTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const orderSaleIncomeTx = data.orderSaleIncomeTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const financeExpenseTx = data.financeExpenseTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const accountsExpenseTx = data.accountsExpenseTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const zakupkaExpenseTx = data.zakupkaExpenseTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const ukraineStockExpenseTx = data.ukraineStockExpenseTx.filter((tx) => financeTxMatchesMonth(tx, monthKey))
  const income = incomeTx.reduce((s, tx) => s + tx.amount, 0)
  const expense = expenseTx.reduce((s, tx) => s + tx.amount, 0)
  return {
    ...data,
    incomeTx,
    expenseTx,
    financeIncomeTx,
    orderSaleIncomeTx,
    financeExpenseTx,
    accountsExpenseTx,
    zakupkaExpenseTx,
    ukraineStockExpenseTx,
    income,
    expense,
    balance: income - expense,
  }
}

function renderFinanceMonthDetailBody(monthKey, { showExpenseAdd = false, showIncomeAdd = false } = {}) {
  const data = getFinanceMonthViewData(monthKey)
  const title = formatFinanceMonthLabel(monthKey)
  const totalOps = data.incomeTx.length + data.expenseTx.length
  const recent = getRecentFinanceTransactions(
    { incomeTx: data.incomeTx, expenseTx: data.expenseTx },
    10,
  )
  const expenseHeadActions = showExpenseAdd
    ? renderFinanceExpenseCardHead({ total: fmtMoney(data.expense) })
    : `<div class="finance-dash-card-head">
              <h2 class="finance-dash-card-title">Витрати</h2>
              <span class="finance-month-side-total negative">${fmtMoney(data.expense)}</span>
            </div>`
  const incomeHeadActions = showIncomeAdd
    ? renderFinanceIncomeCardHead({ total: fmtMoney(data.income) })
    : `<div class="finance-dash-card-head">
              <h2 class="finance-dash-card-title">Доходи</h2>
              <span class="finance-month-side-total positive">${fmtMoney(data.income)}</span>
            </div>`

  return `
      <div class="finance-month-grid">
        <div class="finance-month-main">
          ${renderFinanceStatCards([
    { label: 'Доходи', value: fmtMoney(data.income), tone: 'income', incomePageMonthKey: monthKey },
    { label: 'Витрати', value: fmtMoney(data.expense), tone: 'expense', expensePageMonthKey: monthKey },
    { label: 'Баланс', value: fmtMoney(data.balance), tone: data.balance >= 0 ? 'income' : 'expense' },
    { label: 'Операцій', value: String(totalOps) },
    { label: 'З фінансів', value: fmtMoney(data.financeExpenseTx.reduce((s, t) => s + t.amount, 0)), hint: `${data.financeExpenseTx.length} записів` },
    { label: 'З аккаунтів', value: fmtMoney(data.accountsExpenseTx.reduce((s, t) => s + t.amount, 0)), hint: `${data.accountsExpenseTx.length} замовлень` },
    { label: 'З закупок', value: fmtMoney(data.zakupkaExpenseTx.reduce((s, t) => s + t.amount, 0)), hint: `${data.zakupkaExpenseTx.length} закупок` },
  ])}

          <button type="button" class="finance-dash-card finance-dash-card--clickable finance-day-card"
            data-monthly-day-open="${escapeHtml(monthKey)}" aria-label="По днях — операції за сьогодні">
            <div class="finance-dash-card-head finance-dash-card-head--day">
              <div>
                <h2 class="finance-dash-card-title">По днях</h2>
                <p class="finance-day-today-date">${escapeHtml(formatFinanceTodayDateLabel())}</p>
              </div>
              <span class="finance-day-card-arrow" aria-hidden="true">→</span>
            </div>
            ${renderFinanceDayChart(data.incomeTx, data.expenseTx, monthKey)}
          </button>

          <section class="finance-dash-card">
            <div class="finance-dash-card-head">
              <h2 class="finance-dash-card-title">Операції за місяць</h2>
            </div>
            ${renderFinanceRecentTable(recent)}
          </section>
        </div>

        <aside class="finance-month-side">
          <section class="finance-dash-card">
            <div class="finance-dash-card-head">
              <h2 class="finance-dash-card-title">Структура місяця</h2>
            </div>
            ${renderFinanceExpenseStructureChart(data.expenseTx)}
          </section>

          <section class="finance-dash-card">
            ${showIncomeAdd
    ? incomeHeadActions
    : `<div class="finance-dash-card-head">
              <h2 class="finance-dash-card-title">Доходи</h2>
              <span class="finance-month-side-total positive">${fmtMoney(data.income)}</span>
            </div>`}
            ${renderFinanceTransactionList(data.incomeTx, 'income', { detail: true, limit: 3 })}
          </section>

          <section class="finance-dash-card">
            ${showExpenseAdd
    ? expenseHeadActions
    : `<div class="finance-dash-card-head">
              <h2 class="finance-dash-card-title">Витрати</h2>
              <span class="finance-month-side-total negative">${fmtMoney(data.expense)}</span>
            </div>`}
            ${renderFinanceTransactionList(data.expenseTx, 'expense', { detail: true, limit: 3 })}
          </section>
        </aside>
      </div>`
}

function renderFinanceMonthDetailPage(monthKey, { backLabel = '← Фінанси' } = {}) {
  financePagePeriod.monthKey = monthKey
  financePagePeriod.year = Number(monthKey.split('-')[0]) || new Date().getFullYear()
  return financePageWithExpenseModal(`
    <div class="finance-dashboard finance-detail-page finance-month-page" data-searchable>
      ${renderFinancePageHeader(monthKey, {
    subtitle: 'Детальна статистика та операції за місяць',
    backLabel,
  })}
      ${renderFinanceMonthDetailBody(monthKey, { showExpenseAdd: true, showIncomeAdd: true })}
    </div>`)
}

function getFinanceDetailViewData() {
  let data = getFinancePageData()
  if (activeNav === 'finance' && !financeDetailPage && !activeFinanceMonthKey) {
    data = filterFinanceDataByMonth(data, resolveFinancePagePeriodMonthKey())
  }
  const q = searchQuery.toLowerCase()
  if (!q) return data
  const incomeTx = filterFinanceTransactions(data.incomeTx, q)
  const expenseTx = filterFinanceTransactions(data.expenseTx, q)
  const financeIncomeTx = filterFinanceTransactions(data.financeIncomeTx, q)
  const orderSaleIncomeTx = filterFinanceTransactions(data.orderSaleIncomeTx, q)
  const financeExpenseTx = filterFinanceTransactions(data.financeExpenseTx, q)
  const accountsExpenseTx = filterFinanceTransactions(data.accountsExpenseTx, q)
  const zakupkaExpenseTx = filterFinanceTransactions(data.zakupkaExpenseTx, q)
  const ukraineStockExpenseTx = filterFinanceTransactions(data.ukraineStockExpenseTx, q)
  const income = incomeTx.reduce((s, tx) => s + tx.amount, 0)
  const expense = expenseTx.reduce((s, tx) => s + tx.amount, 0)
  return {
    ...data,
    incomeTx,
    expenseTx,
    financeIncomeTx,
    orderSaleIncomeTx,
    financeExpenseTx,
    accountsExpenseTx,
    zakupkaExpenseTx,
    ukraineStockExpenseTx,
    income,
    expense,
    balance: income - expense,
  }
}

function renderFinanceDetailPage(kind) {
  const data = getFinanceDetailViewData()
  const meta = {
    income: {
      title: 'Доходи',
      subtitle: 'Детальна статистика; продажі з замовлень та внесення',
      body: renderFinanceIncomeDetail(data),
    },
    expense: {
      title: 'Витрати',
      subtitle: 'Детальна статистика; включно з «Аккаунтами» та total закупок',
      body: renderFinanceExpenseDetail(data),
    },
    overall: {
      title: 'Загально',
      subtitle: 'Зведення доходів, витрат і балансу',
      body: renderFinanceOverallDetail(data),
    },
  }
  const page = meta[kind]
  if (!page) return renderFinance()

  return financePageWithExpenseModal(`
    <div class="finance-dashboard finance-detail-page" data-searchable>
      ${financeDetailPageHeader(page.title, page.subtitle)}
      <div class="finance-detail-page-body finance-dash-card">
        ${page.body}
      </div>
    </div>`)
}

function renderFinanceIncomeDetail(data) {
  const stats = financeStatsFromTransactions(data.incomeTx)
  const financeSum = data.financeIncomeTx.reduce((s, t) => s + t.amount, 0)
  const orderSaleSum = data.orderSaleIncomeTx.reduce((s, t) => s + t.amount, 0)
  const months = groupFinanceByMonth(data.incomeTx)
  return `
    ${renderFinanceStatCards([
      { label: 'Всього', value: fmtMoney(stats.total), tone: 'income' },
      { label: 'Операцій', value: String(stats.count) },
      { label: 'З продажів', value: fmtMoney(orderSaleSum), hint: `${data.orderSaleIncomeTx.length} замовлень` },
      { label: 'Внесення', value: fmtMoney(financeSum), hint: `${data.financeIncomeTx.length} записів` },
      { label: 'Середня', value: fmtMoney(stats.avg) },
      { label: 'Максимум', value: fmtMoney(stats.max) },
    ])}
    ${renderFinanceMonthBreakdown(months, 'income')}
    <section class="finance-detail-section finance-income-list-section">
      ${renderFinanceIncomeCardHead()}
      ${renderFinanceTransactionList(data.incomeTx, 'income', { detail: true })}
    </section>`
}

function renderFinanceExpenseDetail(data) {
  const stats = financeStatsFromTransactions(data.expenseTx)
  const financeSum = data.financeExpenseTx.reduce((s, t) => s + t.amount, 0)
  const accountsSum = data.accountsExpenseTx.reduce((s, t) => s + t.amount, 0)
  const zakupkaSum = data.zakupkaExpenseTx.reduce((s, t) => s + t.amount, 0)
  const ukraineStockSum = data.ukraineStockExpenseTx.reduce((s, t) => s + t.amount, 0)
  const months = groupFinanceByMonth(data.expenseTx)
  return `
    <div class="finance-expense-toolbar">
      ${renderFinanceAccountsToggle()}
    </div>
    ${renderFinanceStatCards([
      { label: 'Всього витрат', value: fmtMoney(stats.total), tone: 'expense' },
      { label: 'Операцій', value: String(stats.count) },
      { label: 'З фінансів', value: fmtMoney(financeSum), hint: `${data.financeExpenseTx.length} записів` },
      { label: 'З аккаунтів', value: fmtMoney(accountsSum), hint: `${data.accountsExpenseTx.length} замовлень` },
      { label: 'З закупок', value: fmtMoney(zakupkaSum), hint: `${data.zakupkaExpenseTx.length} закупок` },
      { label: 'З залишків', value: fmtMoney(ukraineStockSum), hint: `${data.ukraineStockExpenseTx.length} записів` },
    ])}
    ${renderFinanceMonthBreakdown(months, 'expense')}
    <section class="finance-detail-section finance-expense-list-section">
      ${renderFinanceExpenseCardHead()}
      ${renderFinanceTransactionList(data.expenseTx, 'expense', { detail: true })}
    </section>`
}

function renderFinanceOverallDetail(data) {
  const flowTotal = data.income + data.expense || 1
  const incomePct = Math.round((data.income / flowTotal) * 100)
  const expensePct = Math.round((data.expense / flowTotal) * 100)
  const incomeMonths = groupFinanceByMonth(data.incomeTx)
  const expenseMonths = groupFinanceByMonth(data.expenseTx)
  const monthKeys = [...new Set([...incomeMonths, ...expenseMonths].map((m) => m.key))]
    .sort((a, b) => String(b).localeCompare(String(a)))
    .slice(0, 6)
  const netRows = monthKeys.map((key) => {
    const inc = incomeMonths.find((m) => m.key === key)?.total || 0
    const exp = expenseMonths.find((m) => m.key === key)?.total || 0
    return { key, net: inc - exp, inc, exp }
  })

  return `
    ${renderFinanceStatCards([
      { label: 'Доходи', value: fmtMoney(data.income), tone: 'income' },
      { label: 'Витрати', value: fmtMoney(data.expense), tone: 'expense' },
      { label: 'Баланс', value: fmtMoney(data.balance), tone: data.balance >= 0 ? 'income' : 'expense' },
      { label: 'Частка доходів', value: `${incomePct}%` },
      { label: 'Частка витрат', value: `${expensePct}%` },
      { label: 'Операцій', value: String(data.incomeTx.length + data.expenseTx.length) },
    ])}
    <section class="finance-detail-section">
      <h3 class="finance-detail-section-title">Структура потоків</h3>
      <div class="finance-flow-bars">
        <div class="finance-flow-row">
          <span>Доходи</span>
          <div class="finance-flow-track"><div class="finance-flow-fill finance-flow-fill--income" style="width:${incomePct}%"></div></div>
          <strong class="positive">${fmtMoney(data.income)}</strong>
        </div>
        <div class="finance-flow-row">
          <span>Витрати</span>
          <div class="finance-flow-track"><div class="finance-flow-fill finance-flow-fill--expense" style="width:${expensePct}%"></div></div>
          <strong class="negative">${fmtMoney(data.expense)}</strong>
        </div>
      </div>
    </section>
    <section class="finance-detail-section">
      <h3 class="finance-detail-section-title">Баланс за місяцями</h3>
      ${netRows.length
    ? `<ul class="finance-month-list">${netRows.map((row) => `
          <li class="finance-month-item">
            <div class="finance-month-head">
              <span>${escapeHtml(formatFinanceMonthLabel(row.key))}</span>
              <strong class="${row.net >= 0 ? 'positive' : 'negative'}">${fmtMoney(row.net)}</strong>
            </div>
            <span class="finance-month-meta positive">+${fmtMoney(row.inc)}</span>
            <span class="finance-month-meta negative">−${fmtMoney(row.exp)}</span>
          </li>`).join('')}</ul>`
    : '<p class="finance-detail-empty">Немає даних</p>'}
    </section>`
}

function renderFinanceExpenseAddButton() {
  return `<button type="button" class="btn-primary finance-expense-add-btn" data-finance-expense-add-open>Додати</button>`
}

function renderFinanceIncomeAddButton() {
  return `<button type="button" class="btn-primary finance-income-add-btn" data-finance-income-add-open>Додати</button>`
}

function renderFinanceIncomeCardHead({ total = null } = {}) {
  const totalHtml = total != null
    ? `<p class="finance-income-card-total positive">${total}</p>`
    : ''
  return `
    <div class="finance-dash-card-head finance-income-card-head">
      <h2 class="finance-dash-card-title">Доходи</h2>
      ${renderFinanceIncomeAddButton()}
    </div>${totalHtml}`
}

const FINANCE_INCOME_RANDOM_NAMES = ['Олена', 'Андрій', 'Марія', 'Іван', 'Софія', 'Дмитро', 'Наталія', 'Олег']
const FINANCE_INCOME_RANDOM_COMMENTS = ['', 'Оплата при отриманні', 'Prom', 'Rozetka', 'Накладна відправлена']

function pickRandomFinanceItem(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function randomFinanceIncomeFormValues() {
  const shop = pickRandomFinanceItem(INCOME_SHOP_OPTIONS)
  const products = listProductsForUkraineTable()
  const product = products.length ? pickRandomFinanceItem(products) : null
  const qty = Math.floor(Math.random() * 3) + 1
  const unitPrice = product
    ? ukraineProductOrderPrice(product, shop)
    : (Math.floor(Math.random() * 50) + 5) * 100
  return {
    shop,
    date: getLocalDateInputValue(),
    firstName: pickRandomFinanceItem(FINANCE_INCOME_RANDOM_NAMES),
    phone: `0${Math.floor(Math.random() * 9) + 1}${String(Math.floor(Math.random() * 1e8)).padStart(8, '0')}`,
    productName: product ? productDisplayName(product) : '',
    article: product ? productDisplaySku(product) : '',
    unitPrice: unitPrice ? amountInputFieldDisplay(unitPrice) : '',
    qty,
    ttnComment: pickRandomFinanceItem(FINANCE_INCOME_RANDOM_COMMENTS),
  }
}

function renderFinanceIncomeFormFields(values = {}) {
  const v = {
    shop: INCOME_SHOP_OPTIONS[0],
    date: getLocalDateInputValue(),
    firstName: '',
    productName: '',
    phone: '',
    article: '',
    unitPrice: '',
    qty: 1,
    ttnComment: '',
    ...values,
  }
  const shopOptions = INCOME_SHOP_OPTIONS.map((shop) => `
            <option value="${escapeHtml(shop)}"${shop === v.shop ? ' selected' : ''}>${escapeHtml(shop)}</option>`).join('')
  const unitPriceValue = v.unitPrice || ''
  const lineTotalValue = (Number(v.qty) || 1) * (parseAmountInput(unitPriceValue) ?? 0)
  return `
            <label class="form-field"><span>Магазин</span>
              <select name="shop" required>${shopOptions}</select>
            </label>
            <input type="hidden" name="status" value="${escapeHtml(ORDER_TRANSACTION_SALE_STATUS)}" />
            <input type="hidden" name="delivery" value="${escapeHtml(bazarioDeliveryOptions[0])}" />
            <label class="form-field"><span>Дата</span><input type="date" name="date" required value="${escapeHtml(v.date)}" /></label>
            <label class="form-field"><span>Клієнт</span><input type="text" name="firstName" value="${escapeHtml(v.firstName)}" required autocomplete="name" /></label>
            <label class="form-field"><span>Телефон</span><input type="tel" name="phone" value="${escapeHtml(v.phone)}" required autocomplete="tel" /></label>
            ${renderOrderProductNameField(v.productName, { inputId: 'financeIncomeProductName' })}
            <label class="form-field"><span>Артикул SKU</span><input type="text" name="article" value="${escapeHtml(articleInputDisplay(v.article))}" placeholder="Код:" readonly tabindex="-1" autocomplete="off" /></label>
            <label class="form-field form-field-amount"><span>Ціна</span><input type="text" name="unitPrice" inputmode="decimal" class="table-input account-amount-input${unitPriceValue ? ' account-amount-input--filled' : ''}" value="${escapeHtml(unitPriceValue)}" placeholder="0,0000" readonly tabindex="-1" autocomplete="off" /></label>
            <label class="form-field"><span>Кількість</span><input type="number" name="qty" min="1" step="1" required value="${escapeHtml(String(v.qty || 1))}" /></label>
            <label class="form-field form-field-amount"><span>Сума</span><input type="text" class="table-input account-amount-input bazario-line-total-input" value="${lineTotalValue ? escapeHtml(amountInputFieldDisplay(lineTotalValue)) : '—'}" readonly tabindex="-1" autocomplete="off" /></label>
            <label class="form-field"><span>Коментар</span><textarea name="ttnComment" rows="2" placeholder="ТТН або коментар">${escapeHtml(v.ttnComment)}</textarea></label>`
}

function fillFinanceIncomeModalRandom(form) {
  if (!form) return
  const v = randomFinanceIncomeFormValues()
  const shopSelect = form.querySelector('[name="shop"]')
  if (shopSelect) shopSelect.value = v.shop
  form.dataset.orderShop = v.shop
  const setVal = (name, value) => {
    const el = form.querySelector(`[name="${name}"]`)
    if (el) el.value = value
  }
  setVal('date', v.date)
  setVal('firstName', v.firstName)
  setVal('phone', v.phone)
  setVal('productName', v.productName)
  setVal('article', articleInputDisplay(v.article))
  const unitPriceInput = form.querySelector('[name="unitPrice"]')
  if (unitPriceInput) {
    unitPriceInput.value = v.unitPrice
    syncAmountInputFilledState(unitPriceInput)
  }
  setVal('qty', String(v.qty))
  setVal('ttnComment', v.ttnComment)
  syncBazarioOrderFormLineTotal(form)
}

function renderFinanceIncomeAddModal() {
  return `
    <div class="modal-overlay is-hidden" id="financeIncomeModal" aria-hidden="true">
      <div class="modal card modal--wide" role="dialog" aria-labelledby="financeIncomeModalTitle">
        <div class="card-head modal-head">
          <h2 id="financeIncomeModalTitle">Додати продаж</h2>
          <button type="button" class="btn-icon modal-close" id="financeIncomeModalClose" aria-label="Закрити">×</button>
        </div>
        <form id="addFinanceIncomeForm" data-order-shop="${escapeHtml(INCOME_SHOP_OPTIONS[0])}">
          <div class="form-grid form-grid-single">
            ${renderFinanceIncomeFormFields()}
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" id="financeIncomeModalCancel">Скасувати</button>
            <button type="submit" class="btn-primary">Зберегти</button>
          </div>
        </form>
      </div>
    </div>`
}

function renderFinanceExpenseCardHead({ total = null } = {}) {
  const totalHtml = total != null
    ? `<p class="finance-expense-card-total negative">${total}</p>`
    : ''
  return `
    <div class="finance-dash-card-head finance-expense-card-head">
      <h2 class="finance-dash-card-title">Витрати</h2>
      ${renderFinanceExpenseAddButton()}
    </div>${totalHtml}`
}

function renderFinanceExpenseAddModal() {
  const today = getLocalDateInputValue()
  const options = FINANCE_EXPENSE_CATEGORIES.map((category) => `
            <option value="${escapeHtml(category)}">${escapeHtml(category)}</option>`).join('')
  return `
    <div class="modal-overlay is-hidden" id="financeExpenseModal" aria-hidden="true">
      <div class="modal card" role="dialog" aria-labelledby="financeExpenseModalTitle">
        <div class="card-head modal-head">
          <h2 id="financeExpenseModalTitle">Додати витрату</h2>
          <button type="button" class="btn-icon modal-close" id="financeExpenseModalClose" aria-label="Закрити">×</button>
        </div>
        <form class="crud-form" data-storage="finance" id="addFinanceExpenseForm">
          <input type="hidden" name="type" value="expense" />
          <div class="form-grid form-grid-single">
            <label class="form-field"><span>Вид витрат</span>
              <select name="title" required>
                <option value="" disabled selected>Оберіть вид витрат</option>
                ${options}
              </select>
            </label>
            <label class="form-field"><span>Сума, ₴</span><input type="number" name="amount" required min="0" step="0.01" placeholder="0.00" /></label>
            <label class="form-field"><span>Дата</span><input type="date" name="date" required value="${today}" /></label>
            <label class="form-field"><span>Коментар</span><input type="text" name="comment" placeholder="Коментар (необов'язково)" /></label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" id="financeExpenseModalCancel">Скасувати</button>
            <button type="submit" class="btn-primary">Зберегти</button>
          </div>
        </form>
      </div>
    </div>`
}

function financePageWithModals(html) {
  return `${html}${renderFinanceExpenseAddModal()}${renderFinanceIncomeAddModal()}`
}

function financePageWithExpenseModal(html) {
  return financePageWithModals(html)
}

function openFinanceExpenseModal() {
  financeExpenseModalOpen = true
  const modal = document.getElementById('financeExpenseModal')
  if (!modal) {
    render()
    return
  }
  const form = document.getElementById('addFinanceExpenseForm')
  form?.reset()
  const dateInput = form?.querySelector('[name="date"]')
  if (dateInput) dateInput.value = getLocalDateInputValue()
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
}

function closeFinanceExpenseModal() {
  financeExpenseModalOpen = false
  const modal = document.getElementById('financeExpenseModal')
  if (!modal) return
  modal.classList.add('is-hidden')
  modal.setAttribute('aria-hidden', 'true')
  document.getElementById('addFinanceExpenseForm')?.reset()
}

function restoreFinanceExpenseModalState() {
  const modal = document.getElementById('financeExpenseModal')
  if (!modal) return
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
  const form = document.getElementById('addFinanceExpenseForm')
  const dateInput = form?.querySelector('[name="date"]')
  if (dateInput && !dateInput.value) dateInput.value = getLocalDateInputValue()
}

function bindFinanceExpenseModal() {
  document.getElementById('financeExpenseModalClose')?.addEventListener('click', closeFinanceExpenseModal)
  document.getElementById('financeExpenseModalCancel')?.addEventListener('click', closeFinanceExpenseModal)
  document.getElementById('financeExpenseModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'financeExpenseModal') closeFinanceExpenseModal()
  })
}

function openFinanceIncomeModal() {
  financeIncomeModalOpen = true
  const modal = document.getElementById('financeIncomeModal')
  if (!modal) {
    render()
    return
  }
  const form = document.getElementById('addFinanceIncomeForm')
  form?.reset()
  fillFinanceIncomeModalRandom(form)
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
  requestAnimationFrame(() => {
    const productInput = form?.querySelector('.order-product-suggest-input')
    if (productInput) renderBazarioOrderProductSuggest(productInput)
  })
}

function closeFinanceIncomeModal() {
  financeIncomeModalOpen = false
  const modal = document.getElementById('financeIncomeModal')
  if (!modal) return
  modal.classList.add('is-hidden')
  modal.setAttribute('aria-hidden', 'true')
  const form = document.getElementById('addFinanceIncomeForm')
  const productInput = form?.querySelector('.order-product-suggest-input')
  if (productInput) hideBazarioOrderProductSuggest(productInput)
  form?.reset()
}

function restoreFinanceIncomeModalState() {
  const modal = document.getElementById('financeIncomeModal')
  if (!modal) return
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
}

function bindFinanceIncomeModal() {
  const form = document.getElementById('addFinanceIncomeForm')
  if (!form || form.dataset.financeIncomeBound === '1') return
  form.dataset.financeIncomeBound = '1'

  document.getElementById('financeIncomeModalClose')?.addEventListener('click', closeFinanceIncomeModal)
  document.getElementById('financeIncomeModalCancel')?.addEventListener('click', closeFinanceIncomeModal)
  document.getElementById('financeIncomeModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'financeIncomeModal') closeFinanceIncomeModal()
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const fd = new FormData(form)
    fd.set('status', ORDER_TRANSACTION_SALE_STATUS)
    const payload = orderTransactionPayloadFromForm(fd)
    Object.assign(payload, db.getAuthorMeta())
    db.create('orderTransactions', payload)
    closeFinanceIncomeModal()
    showToast('Продаж додано')
    syncUkraineProductsAfterOrderTransaction(payload)
    render()
  })

  form.addEventListener('input', (e) => {
    if (e.target.matches('[name="qty"]')) syncBazarioOrderFormLineTotal(form)
  })

  form.addEventListener('change', (e) => {
    if (!e.target.matches('[name="shop"]')) return
    form.dataset.orderShop = e.target.value
    const productName = form.querySelector('[name="productName"]')?.value?.trim()
    if (!productName) return
    const product = filterUkraineProductsForOrderSuggest(productName).find(
      (item) => productDisplayName(item).toLowerCase() === productName.toLowerCase(),
    ) || filterUkraineProductsForOrderSuggest(productName)[0]
    if (product) {
      applyUkraineProductToBazarioOrderForm(product, form.querySelector('[name="productName"]'))
    }
  })
}

function renderFinanceTransactionItem(tx, kind, { compact = false } = {}) {
  const isIncome = kind === 'income'
  const sign = isIncome ? '+' : '−'
  const amountClass = isIncome ? 'positive' : 'negative'
  const sourceTag = tx.source === 'order-sale'
    ? '<span class="finance-tx-tag">Продаж</span>'
    : tx.source === 'account'
    ? '<span class="finance-tx-tag">Аккаунт</span>'
    : tx.source === 'zakupka'
      ? '<span class="finance-tx-tag">Закупка</span>'
      : tx.source === 'ukraine-stock'
        ? '<span class="finance-tx-tag">Залишок</span>'
        : '<span class="finance-tx-tag">Операція</span>'
  const isDateFirst = tx.source === 'zakupka' || tx.source === 'ukraine-stock'
  const commentHtml = tx.comment
    ? `<p class="finance-tx-comment">${escapeHtml(tx.comment)}</p>`
    : ''
  const infoHtml = isDateFirst
    ? `<p class="finance-tx-date">${escapeHtml(tx.date)}</p>
          <p class="finance-tx-title">${escapeHtml(tx.title)} ${compact ? '' : sourceTag}</p>${commentHtml}`
    : `<p class="finance-tx-title">${escapeHtml(tx.title)} ${compact ? '' : sourceTag}</p>
          <p class="finance-tx-date">${escapeHtml(tx.date)}</p>${commentHtml}`

  return `
    <li class="finance-tx finance-tx--${kind}${compact ? ' finance-tx--compact' : ''}${isDateFirst ? ' finance-tx--date-first' : ''}" data-search="${escapeHtml(financeTxSearchText(tx))}">
      <div class="finance-tx-row">
        <div class="finance-tx-info">
          ${infoHtml}
        </div>
        <span class="finance-tx-amount ${amountClass}">${sign}${fmtMoney(tx.amount)}</span>
      </div>
    </li>`
}

function sortFinanceTransactionsRecent(transactions) {
  return [...transactions].sort((a, b) => new Date(b.sortAt).getTime() - new Date(a.sortAt).getTime())
}

function sliceRecentFinanceTransactions(transactions, limit) {
  const sorted = sortFinanceTransactionsRecent(transactions)
  if (!limit || limit < 1) return sorted
  return sorted.slice(0, limit)
}

function renderFinanceTransactionList(transactions, kind, { detail = false, limit } = {}) {
  const list = sliceRecentFinanceTransactions(transactions, limit)
  if (!list.length) {
    return `<ul class="finance-tx-list${detail ? ' finance-tx-list--detail' : ''}"><li class="finance-tx-empty">Операцій немає</li></ul>`
  }
  return `<ul class="finance-tx-list${detail ? ' finance-tx-list--detail' : ''}">${list.map((tx) => renderFinanceTransactionItem(tx, kind)).join('')}</ul>`
}

function renderFinance() {
  if (activeFinanceMonthKey) {
    return renderFinanceMonthDetailPage(activeFinanceMonthKey)
  }
  if (financeDetailPage) {
    return renderFinanceDetailPage(financeDetailPage)
  }

  const raw = getFinancePageData()
  const view = getFinanceDetailViewData()
  const { income, expense, balance } = view
  const monthKey = resolveFinancePagePeriodMonthKey()
  const monthChartTitle = formatFinanceMonthLabel(monthKey)
  const ordersInProcessingTotal = sumOrderTransactionsBeforeSale(monthKey)
  const recent = getRecentFinanceTransactions(view, 3)

  return financePageWithExpenseModal(`
    <div class="finance-dashboard" data-searchable>
      ${renderFinancePageHeader(monthKey)}
      <p class="finance-dash-hint">Натисніть на картку для детальної статистики</p>

      <div class="finance-dash-grid">
        <div class="finance-dash-main">
          <div class="finance-kpi-row">
            ${renderFinanceKpiCard({
    kind: 'income',
    label: 'Доходи',
    amount: income,
    changePct: financeMonthChangePercent(raw.incomeTx),
    sparkValues: sparklineValuesFromMonthIncome(raw, monthKey),
    sparkColor: '#4a7a4a',
    detailKey: 'income',
    extraRows: [{ label: 'В обробці', value: fmtMoney(ordersInProcessingTotal), tone: 'pending' }],
  })}
            ${renderFinanceKpiCard({
    kind: 'expense',
    label: 'Витрати',
    amount: expense,
    changePct: financeMonthChangePercent(raw.expenseTx),
    sparkValues: sparklineValuesFromTransactions(raw.expenseTx),
    sparkColor: '#a67c00',
    detailKey: 'expense',
  })}
            ${renderFinanceKpiCard({
    kind: 'overall',
    label: 'Загально',
    amount: balance,
    changePct: financeNetMonthChangePercent(raw),
    sparkValues: (() => {
      const nets = buildFinanceMonthDailyChartData(raw, monthKey).map((d) => d.income - d.expense)
      return nets.length ? nets : [0, 0, 0, 0]
    })(),
    sparkColor: '#6b5cae',
    detailKey: 'overall',
  })}
          </div>

          <section class="finance-dash-card finance-chart-card">
            <div class="finance-dash-card-head">
              <div>
                <h2 class="finance-dash-card-title">Динаміка за місяць</h2>
                <p class="finance-dash-card-sub">${escapeHtml(monthChartTitle)} · зліва дні тижня, знизу числа місяця</p>
              </div>
            </div>
            ${renderFinanceMonthAreaChart(raw, monthKey)}
            <div class="finance-chart-legend">
              <span><i class="finance-legend-dot finance-legend-dot--income-week"></i>Доходи</span>
              <span><i class="finance-legend-dot finance-legend-dot--pending-week"></i>В обробці</span>
              <span><i class="finance-legend-dot finance-legend-dot--expense-week"></i>Витрати</span>
            </div>
          </section>

          <section class="finance-dash-card finance-table-card finance-recent-ops-card">
            <div class="finance-dash-card-head">
              <h2 class="finance-dash-card-title">Останні операції</h2>
              <button type="button" class="btn-link" data-finance-detail="overall">Усі операції →</button>
            </div>
            <div class="finance-recent-ops-body">
              ${renderFinanceRecentTable(recent)}
            </div>
          </section>
        </div>

        <aside class="finance-dash-side">
          <section class="finance-dash-card finance-donut-card">
            <div class="finance-dash-card-head">
              <h2 class="finance-dash-card-title">Структура</h2>
              <p class="finance-dash-card-sub">Витрати за типами</p>
            </div>
            ${renderFinanceExpenseStructureChart(view.expenseTx)}
          </section>

          <section class="finance-dash-card finance-income-list-card">
            ${renderFinanceIncomeCardHead({ total: fmtMoney(income) })}
            ${renderFinanceTransactionList(view.incomeTx, 'income', { detail: true, limit: 5 })}
          </section>

          <section class="finance-dash-card finance-expense-list-card finance-recent-ops-card">
            ${renderFinanceExpenseCardHead({ total: fmtMoney(expense) })}
            <div class="finance-recent-ops-body">
              ${renderFinanceTransactionList(view.expenseTx, 'expense', { detail: true, limit: 3 })}
            </div>
          </section>
        </aside>
      </div>
    </div>`)
}

function taskProfileLabel(profile) {
  return `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || '—'
}

function getTaskAssigneeDisplay(task) {
  if (task.assigneeUserId) {
    if (db.isCurrentUser(task.assigneeUserId)) return db.getFullName()
    const profile = db.get('profiles', task.assigneeUserId)
    if (profile) return taskProfileLabel(profile)
  }
  return task.assignee || '—'
}

function isTaskAssignedToCurrentUser(task) {
  if (!task) return false
  const sessionId = db.getProfileId()
  const profileRecordId = getCurrentUserProfileRecord()?.id
  if (task.assigneeUserId) {
    return task.assigneeUserId === sessionId
      || (profileRecordId && task.assigneeUserId === profileRecordId)
  }
  const name = String(task.assignee || '').trim()
  if (!name) return false
  return name === db.getFullName()
}
function formatDue(dateStr) {
  if (!dateStr) return '—'
  try {
    return new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${dateStr}T12:00:00`))
  } catch {
    return dateStr
  }
}

function taskStatusChangedAt(task) {
  return task.statusChangedAt || task.createdAt || null
}

function getTaskStatusHistory(task) {
  if (Array.isArray(task?.statusHistory) && task.statusHistory.length) {
    return normalizeTaskStatusHistory(task.statusHistory)
  }
  const entries = []
  const createdAt = task?.createdAt || task?.updatedAt
  if (createdAt) entries.push({ status: 'todo', at: createdAt })
  if (task?.inProgressAt) entries.push({ status: 'in_progress', at: task.inProgressAt })
  const status = task?.status || 'todo'
  const changedAt = task?.statusChangedAt || task?.completedAt || task?.updatedAt
  if (changedAt) entries.push({ status, at: changedAt })
  return normalizeTaskStatusHistory(entries)
}

function normalizeTaskStatusHistory(entries) {
  const sorted = [...entries]
    .filter((e) => e?.at && statusLabels[e.status])
    .sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime())
  const out = []
  sorted.forEach((entry) => {
    const last = out[out.length - 1]
    if (last?.status === entry.status) out[out.length - 1] = entry
    else out.push({ status: entry.status, at: entry.at })
  })
  return out
}

function appendStatusHistory(history, status, at) {
  const list = Array.isArray(history) ? [...history] : []
  const last = list[list.length - 1]
  if (last?.status === status) {
    list[list.length - 1] = { status, at }
    return list
  }
  list.push({ status, at })
  return list
}

function buildTaskStatusPatch(task, newStatus) {
  const ts = new Date().toISOString()
  const base = Array.isArray(task?.statusHistory) && task.statusHistory.length
    ? task.statusHistory
    : getTaskStatusHistory(task)
  const history = appendStatusHistory(base, newStatus, ts)
  const patch = { status: newStatus, statusChangedAt: ts, statusHistory: history }
  if (newStatus === 'done') patch.completedAt = ts
  else patch.completedAt = null
  if (newStatus === 'in_progress') patch.inProgressAt = ts
  return patch
}

function applyInitialTaskStatusTimestamps(payload) {
  const status = payload.status || 'todo'
  const ts = payload.statusChangedAt || payload.createdAt || new Date().toISOString()
  payload.statusChangedAt = ts
  payload.statusHistory = [{ status, at: ts }]
  if (status === 'in_progress') payload.inProgressAt = ts
  if (status === 'done') payload.completedAt = ts
  return payload
}

function renderTaskStatusHistoryHtml(task) {
  const history = getTaskStatusHistory(task)
  if (!history.length) {
    return '<p class="task-status-history-empty muted">Історії змін немає</p>'
  }
  return `<ul class="task-status-history-list">${history.map((entry) => `
    <li class="task-status-history-item">
      <span class="status status-${escapeHtml(entry.status)}">${escapeHtml(statusLabels[entry.status] || entry.status)}</span>
      <span class="task-status-history-time">${escapeHtml(formatTaskDateTime(entry.at))}</span>
    </li>`).join('')}</ul>`
}

function taskSearchText(task) {
  return [
    task.title,
    task.description,
    formatTaskDateTime(task.createdAt),
    formatTaskDateTime(taskStatusChangedAt(task)),
    getTaskAssigneeDisplay(task),
    statusLabels[task.status],
    task.status === 'done' ? formatTaskDateTime(task.completedAt) : '',
    task.inProgressAt ? formatTaskDateTime(task.inProgressAt) : '',
    ...getTaskStatusHistory(task).map((e) => `${statusLabels[e.status]} ${formatTaskDateTime(e.at)}`),
  ].filter(Boolean).join(' ')
}

function tasksTableColSpan() {
  return tasksDeleteMode ? 6 : 5
}

function getTaskPickOptions(field) {
  if (field === 'status') {
    return Object.entries(statusLabels).map(([value, label]) => ({ value, label }))
  }
  if (field === 'assigneeUserId') {
    const myRecordId = getCurrentUserProfileRecord()?.id
    const profiles = db.list('profiles')
    if (!profiles.length) {
      return [{ value: db.getProfileId(), label: `${db.getFullName()} (я)` }]
    }
    const options = profiles.map((p) => ({
      value: p.id,
      label: `${taskProfileLabel(p)}${p.id === myRecordId ? ' (я)' : ''}`,
    }))
    if (myRecordId) {
      options.sort((a, b) => {
        if (a.value === myRecordId) return -1
        if (b.value === myRecordId) return 1
        return 0
      })
    }
    return options
  }
  return []
}

function getTaskPickDisplay(task, field) {
  if (field === 'status') return statusLabels[task.status] || '—'
  if (field === 'assigneeUserId') return getTaskAssigneeDisplay(task)
  return task[field] || '—'
}

const TASK_STATUS_SORT_ORDER = { todo: 0, in_progress: 1, done: 2 }

function taskTableSortTime(task) {
  const iso = task.status === 'done'
    ? (task.completedAt || taskStatusChangedAt(task))
    : taskStatusChangedAt(task)
  return new Date(iso || 0).getTime()
}

function sortTasksForTable(tasks) {
  return [...tasks].sort((a, b) => {
    const orderA = TASK_STATUS_SORT_ORDER[a.status] ?? 1
    const orderB = TASK_STATUS_SORT_ORDER[b.status] ?? 1
    if (orderA !== orderB) return orderA - orderB
    return taskTableSortTime(b) - taskTableSortTime(a)
  })
}

function filterTasksForTable(tasks) {
  const q = searchQuery.toLowerCase()
  const filtered = tasks.filter((task) => {
    if (q && !taskSearchText(task).toLowerCase().includes(q)) return false
    return true
  })
  return sortTasksForTable(filtered)
}

function taskCreatedAtCell(task) {
  return `<td class="task-date-cell task-created-date-cell">${escapeHtml(formatTaskDateTime(task.createdAt))}</td>`
}

function taskStatusChangedDateCell(task) {
  return `<td class="task-date-cell task-status-date-cell">${escapeHtml(formatTaskDateTime(taskStatusChangedAt(task)))}</td>`
}

function taskReadOnlyCell(text, extraClass = '') {
  return `<td class="task-readonly-cell ${extraClass}">${escapeHtml(text || '—')}</td>`
}

function taskTitleCell(task) {
  const isExpanded = expandedTaskId === task.id
  return `<td class="task-title-cell">
    <button type="button" class="task-title-toggle${isExpanded ? ' is-expanded' : ''}" data-task-expand="${task.id}" aria-expanded="${isExpanded ? 'true' : 'false'}" title="${isExpanded ? 'Згорнути' : 'Деталі задачі'}">
      <span class="task-title-chevron" aria-hidden="true"></span>
      <span class="task-title-value">${escapeHtml(task.title || '—')}</span>
    </button>
  </td>`
}

function formatFileSize(bytes) {
  const n = Number(bytes)
  if (!Number.isFinite(n) || n <= 0) return ''
  if (n < 1024) return `${n} Б`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} КБ`
  return `${(n / (1024 * 1024)).toFixed(1)} МБ`
}

function taskDetailSelect(taskId, field, task) {
  const options = getTaskPickOptions(field)
  if (!options.length) {
    return `<span class="muted">—</span>`
  }
  const current = field === 'assigneeUserId' ? taskAssigneeSelectValue(task) : task?.[field]
  const hasMatch = current != null && current !== '' && options.some((o) => o.value === current)
  const selected = hasMatch ? current : ''
  const placeholder = field === 'assigneeUserId' && !hasMatch
    ? '<option value="">Оберіть виконавця</option>'
    : ''
  return `<select class="table-input table-select task-detail-select task-pick-select" data-task-id="${taskId}" data-field="${field}" aria-label="${field === 'status' ? 'Статус' : 'Виконавець'}">
    ${placeholder}${options.map((o) => `<option value="${escapeHtml(o.value)}"${o.value === selected ? ' selected' : ''}>${escapeHtml(o.label)}</option>`).join('')}
  </select>`
}

function taskAttachmentsList(task) {
  const files = task.attachments || []
  if (!files.length) {
    return '<p class="task-files-empty muted">Файлів немає</p>'
  }
  return `<ul class="task-files-list">${files.map((f) => `
    <li class="task-file-item">
      <a href="${f.dataUrl}" download="${escapeHtml(f.name)}" class="task-file-link">${escapeHtml(f.name)}</a>
      <span class="task-file-meta">${escapeHtml(formatFileSize(f.size))}</span>
      <button type="button" class="btn-link task-file-remove" data-task-id="${task.id}" data-file-id="${f.id}">Видалити</button>
    </li>`).join('')}</ul>`
}

function taskDetailRow(task, colSpan) {
  if (expandedTaskId !== task.id) return ''
  return `
    <tr class="task-detail-row${taskRowDoneClass(task)}" data-task-id="${task.id}" data-search="${escapeHtml(taskSearchText(task))}">
      <td colspan="${colSpan}">
        <div class="task-detail-panel">
          <label class="task-detail-field">
            <span class="task-detail-label">Опис</span>
            <textarea class="table-input task-description-input" data-task-id="${task.id}" rows="4" placeholder="Додайте опис задачі...">${escapeHtml(task.description || '')}</textarea>
          </label>
          <div class="task-detail-meta">
            <label class="task-detail-field task-detail-field--inline">
              <span class="task-detail-label">Виконавець</span>
              ${taskDetailSelect(task.id, 'assigneeUserId', task)}
            </label>
            <label class="task-detail-field task-detail-field--inline">
              <span class="task-detail-label">Статус</span>
              ${taskDetailSelect(task.id, 'status', task)}
            </label>
          </div>
          <div class="task-status-history-section">
            <span class="task-detail-label">Історія статусів</span>
            <div class="task-status-history-wrap" data-task-id="${task.id}">
              ${renderTaskStatusHistoryHtml(task)}
            </div>
          </div>
          <div class="task-files-section">
            <div class="task-files-head">
              <span class="task-detail-label">Файли</span>
              <input type="file" class="task-file-input" id="task-file-${escapeHtml(task.id)}" data-task-id="${task.id}" multiple hidden />
              <button type="button" class="btn-secondary task-file-add-btn" data-task-id="${task.id}">Додати файл</button>
            </div>
            ${taskAttachmentsList(task)}
          </div>
        </div>
      </td>
    </tr>`
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

async function handleTaskFileUpload(input) {
  const taskId = input.dataset.taskId
  const task = db.get('tasks', taskId)
  if (!task) return
  const picked = Array.from(input.files || [])
  input.value = ''
  if (!picked.length) return

  const attachments = [...(task.attachments || [])]
  let added = 0
  for (const file of picked) {
    if (attachments.length >= TASK_MAX_ATTACHMENTS) {
      showToast(`Не більше ${TASK_MAX_ATTACHMENTS} файлів на задачу`)
      break
    }
    if (file.size > TASK_MAX_FILE_BYTES) {
      showToast(`«${file.name}» занадто великий (макс. 2 МБ)`)
      continue
    }
    try {
      const dataUrl = await readFileAsDataUrl(file)
      attachments.push({
        id: db.uid(),
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        size: file.size,
        dataUrl,
        addedAt: new Date().toISOString(),
      })
      added += 1
    } catch {
      showToast(`Не вдалося прочитати «${file.name}»`)
    }
  }
  if (!added) return
  db.update('tasks', taskId, { attachments })
  showToast(added === 1 ? 'Файл додано' : `Додано файлів: ${added}`)
  render()
}

function taskRowDoneClass(task) {
  return task.status === 'done' ? ' task-row-done' : ''
}

function taskTableRows(tasks) {
  const colSpan = tasksTableColSpan()
  if (!tasks.length) {
    return `<tr><td colspan="${colSpan}" class="empty-cell">Задач поки немає</td></tr>`
  }

  return tasks.map((task) => {
    const deleteCell = tasksDeleteMode
      ? `<td class="td-actions task-row-delete"><button type="button" class="btn-icon btn-delete-inline" data-delete-task="${task.id}" title="Видалити" aria-label="Видалити">×</button></td>`
      : ''
    const isExpanded = expandedTaskId === task.id
    return `
    <tr class="task-table-row${isExpanded ? ' task-row-expanded' : ''}${taskRowDoneClass(task)}" data-task-id="${task.id}" data-search="${escapeHtml(taskSearchText(task))}">
      ${taskTitleCell(task)}
      ${taskCreatedAtCell(task)}
      ${taskReadOnlyCell(getTaskAssigneeDisplay(task), 'task-assignee-cell')}
      ${taskReadOnlyCell(statusLabels[task.status] || '—', 'task-status-cell')}
      ${taskStatusChangedDateCell(task)}
      ${deleteCell}
    </tr>
    ${taskDetailRow(task, colSpan)}`
  }).join('')
}

function syncTaskDisplays(taskId, task) {
  if (!task) return
  const row = document.querySelector(`tr.task-table-row[data-task-id="${taskId}"]`)
  if (row) {
    row.classList.toggle('task-row-done', task.status === 'done')
    row.dataset.search = taskSearchText(task)
    const titleValue = row.querySelector('.task-title-value')
    if (titleValue) titleValue.textContent = task.title || '—'
    const assigneeCell = row.querySelector('.task-assignee-cell')
    if (assigneeCell) assigneeCell.textContent = getTaskAssigneeDisplay(task) || '—'
    const statusCell = row.querySelector('.task-status-cell')
    if (statusCell) statusCell.textContent = statusLabels[task.status] || '—'
    const dateCell = row.querySelector('.task-created-date-cell')
    if (dateCell) dateCell.textContent = formatTaskDateTime(task.createdAt)
    const statusDateCell = row.querySelector('.task-status-date-cell')
    if (statusDateCell) statusDateCell.textContent = formatTaskDateTime(taskStatusChangedAt(task))
    const detailRow = document.querySelector(`tr.task-detail-row[data-task-id="${taskId}"]`)
    if (detailRow) detailRow.classList.toggle('task-row-done', task.status === 'done')
    const historyWrap = document.querySelector(`tr.task-detail-row[data-task-id="${taskId}"] .task-status-history-wrap`)
    if (historyWrap) historyWrap.innerHTML = renderTaskStatusHistoryHtml(task)
  }
  const descInput = document.querySelector(`.task-description-input[data-task-id="${taskId}"]`)
  if (descInput && document.activeElement !== descInput) {
    descInput.value = task.description || ''
  }
  document.querySelectorAll(`.task-detail-select[data-task-id="${taskId}"]`).forEach((select) => {
    const field = select.dataset.field
    const val = field === 'assigneeUserId' ? taskAssigneeSelectValue(task) : task[field]
    if (val != null && val !== '' && select.value !== val) select.value = val
    else if (field === 'assigneeUserId' && !val) select.value = ''
  })
}

function commitTaskPickSelect(select) {
  const id = select.dataset.taskId
  const field = select.dataset.field
  const val = select.value
  let patch
  if (field === 'assigneeUserId') {
    patch = { assigneeUserId: normalizeAssigneeUserIdForSave(val || null), assignee: '' }
  } else if (field === 'status') {
    patch = buildTaskStatusPatch(db.get('tasks', id), val)
  } else {
    patch = { [field]: val }
  }
  const updated = db.update('tasks', id, patch)
  if (updated) syncTaskDisplays(id, updated)
}

function tasksPageHeader() {
  return `
    <div class="page-header page-header-row">
      <div>
        <h1 class="page-title">Задачі</h1>
        <p class="page-sub">Призначення задач — дані виконавця з профілю або акаунтів</p>
      </div>
      <button type="button" class="btn-primary" id="addTaskBtn">Додати</button>
    </div>`
}

function renderTaskFormFields() {
  const myName = db.getFullName()
  const today = getLocalDateInputValue()
  return `
    <label class="form-field"><span>Задача</span><input name="title" required placeholder="Опис задачі" /></label>
    <label class="form-field"><span>Виконавець</span>
      <select name="assigneeType" id="assigneeType">
        <option value="profile">${escapeHtml(myName)} (я)</option>
        <option value="other">Інший співробітник</option>
      </select>
    </label>
    <label class="form-field assignee-other-field is-hidden" id="assigneeOtherWrap"><span>ПІБ співробітника</span>
      <input name="assigneeOther" placeholder="Прізвище Ім'я" />
    </label>
    <label class="form-field"><span>Термін</span><input name="due" type="date" required value="${today}" /></label>
    <label class="form-field"><span>Статус</span>
      <select name="status" required>
        <option value="todo">До виконання</option>
        <option value="in_progress">В роботі</option>
        <option value="done">Готово</option>
      </select>
    </label>`
}

function taskPayloadFromForm(fd) {
  const assigneeType = fd.get('assigneeType')
  const payload = {
    title: String(fd.get('title') || '').trim(),
    due: fd.get('due'),
    status: fd.get('status'),
    description: '',
    attachments: [],
  }
  if (assigneeType === 'profile') {
    payload.assigneeUserId = normalizeAssigneeUserIdForSave(db.getProfileId())
    payload.assignee = ''
  } else {
    payload.assignee = String(fd.get('assigneeOther') || '').trim()
    payload.assigneeUserId = null
    if (!payload.assignee) return null
  }
  return applyInitialTaskStatusTimestamps(payload)
}

function renderTasksTable(items) {
  const filtered = filterTasksForTable(items)
  return `
    <section class="card table-card profiles-fullwidth tasks-table-card${tasksDeleteMode ? ' tasks-delete-mode' : ''}" data-searchable>
      <div class="card-head">
        <h2>Список</h2>
        <span class="count-badge">${filtered.length}</span>
      </div>
      <div class="table-wrap table-wrap-wide">
        <table class="data-table tasks-data-table">
          <colgroup>
            <col /><col /><col /><col /><col />${tasksDeleteMode ? '<col class="task-delete-col" />' : ''}
          </colgroup>
          <thead>
            <tr>
              <th>Задача</th>
              <th>Дата</th>
              <th>Виконавець</th>
              <th>Статус</th>
              <th>Дата</th>
              ${tasksDeleteMode ? '<th class="task-delete-col" aria-label="Видалити"></th>' : ''}
            </tr>
          </thead>
          <tbody id="tasksTableBody">${taskTableRows(filtered)}</tbody>
        </table>
      </div>
    </section>`
}

function renderAddTaskModal() {
  return `
    <div class="modal-overlay is-hidden" id="taskModal" aria-hidden="true">
      <div class="modal card" role="dialog" aria-labelledby="taskModalTitle">
        <div class="card-head modal-head">
          <h2 id="taskModalTitle">Нова задача</h2>
          <button type="button" class="btn-icon modal-close" id="taskModalClose" aria-label="Закрити">×</button>
        </div>
        <form id="addTaskForm">
          <div class="form-grid form-grid-single">
            ${renderTaskFormFields()}
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" id="taskModalCancel">Скасувати</button>
            <button type="submit" class="btn-primary">Зберегти</button>
          </div>
        </form>
      </div>
    </div>`
}

function renderTasks() {
  const tasks = db.list('tasks')
  return `${tasksPageHeader()}${renderTasksTable(tasks)}${renderAddTaskModal()}`
}

function renderAccounts() {
  const accounts = listAccountsForCurrentPeriod()
  return `${accountsPageHeader(accountsForPaymentSummaries())}${renderAccountsTable(accounts)}${renderAddAccountModal()}`
}

function renderProfile() {
  const profiles = getProfilesForPage()
  return `${profilePageHeader()}${renderProfilesTable(profiles, 'Усі профілі')}${renderAddProfileModal()}`
}

function logForCollection(collection, item) {
  const logs = {
    warehouses: () => db.logMovement({ title: `Додано склад: ${item.name}`, type: 'in', icon: '🏭', amount: item.address }),
    shops: () => db.logMovement({ title: `Додано магазин: ${item.name}`, type: 'in', icon: '🏬', amount: item.marketplace || '' }),
    products: () => db.logMovement({ title: `Товар: ${item.name}`, type: 'in', icon: '📦', amount: `+${item.qty} шт.` }),
    finance: () => db.logMovement({
      title: item.title,
      type: item.type,
      icon: item.type === 'income' ? '💰' : '💸',
      amount: `${item.type === 'income' ? '+' : '-'}${fmtMoney(item.amount)}`,
    }),
    tasks: () => db.logMovement({ title: `Задача: ${item.title}`, type: 'info', icon: '📋', amount: db.getTaskAssigneeName(item) }),
    accountingSections: () => db.logMovement({ title: `Розділ обліку: ${item.title}`, type: 'info', icon: '📋', amount: item.desc || '' }),
  }
  logs[collection]?.()
}

function bindCrudEvents() {
  const content = document.getElementById('content')
  if (content && content.dataset.crudSubmitBound !== '1') {
    content.dataset.crudSubmitBound = '1'
    content.addEventListener('submit', (e) => {
      const form = e.target.closest('.crud-form')
      if (!form) return
      e.preventDefault()
      const collection = form.dataset.storage
      const fd = new FormData(form)
      const payload = {}
      fd.forEach((val, name) => { payload[name] = val })
      if (collection === 'products') {
        payload.qty = Number(payload.qty)
        payload.price = payload.price ? Number(payload.price) : 0
        if (!db.list('warehouses').length) {
          alert('Спочатку додайте склад у розділі «Склад»')
          return
        }
      }
      if (collection === 'finance') payload.amount = Number(payload.amount)
      Object.assign(payload, db.getAuthorMeta())
      const item = db.create(collection, payload)
      logForCollection(collection, item)
      form.reset()
      if (collection === 'shops') closeShopModal()
      if (collection === 'warehouses') closeWarehouseModal()
      if (collection === 'finance' && form.id === 'addFinanceExpenseForm') closeFinanceExpenseModal()
      if (collection === 'finance' && form.id === 'addAdvertisingExpenseForm') closeAdvertisingExpenseModal()
      showToast(savedToastMessage())
      render()
    })
  }

  document.querySelectorAll('.btn-delete').forEach((btn) => {
    if (btn.dataset.crudDeleteBound === '1') return
    btn.dataset.crudDeleteBound = '1'
    btn.addEventListener('click', () => {
      const collection = btn.dataset.storage || getActiveStorageKey()
      const id = btn.dataset.delete
      if (!collection || !confirm('Видалити запис?')) return
      if (collection === 'warehouses' && db.list('products').some((p) => p.warehouseId === id)) {
        alert('Неможливо видалити: на цьому складі є товари')
        return
      }
      if (collection === 'warehouses' && warehouseDetailId === id) warehouseDetailId = null
      db.remove(collection, id)
      showToast('Видалено')
      render()
    })
  })

  bindProfileModal()
  bindShopModal()
  bindWarehouseModal()
  initWarehouseNavLinks()
  bindProductModal()
  bindProductsDeleteToggle()
  bindProfileInlineEdit()
  bindAccountModal()
  bindAccountTableActions()
  bindBazarioOrderModal()
  initBazarioOrderDelegation()
  bindTaskModal()
  bindFinanceExpenseModal()
  bindFinanceIncomeModal()
  bindFinancePage()
}

function bindFinancePage() {
  const content = document.getElementById('content')
  if (!content || content.dataset.financeDelegation === '1') return
  content.dataset.financeDelegation = '1'

  content.addEventListener('mouseover', (e) => {
    if (activeNav !== 'finance') return
    const item = getFinanceExpenseStructureHoverTarget(e.target)
    if (!item) return
    const chart = item.closest('.finance-expense-structure')
    if (!chart) return
    highlightFinanceExpenseStructureSegment(chart, item.dataset.expenseType)
  })

  content.addEventListener('mouseout', (e) => {
    if (activeNav !== 'finance') return
    const chart = e.target.closest('.finance-expense-structure')
    if (!chart) return
    const related = getFinanceExpenseStructureHoverTarget(e.relatedTarget)
    if (related && chart.contains(related)) return
    resetFinanceExpenseStructureHighlight(chart)
  })

  content.addEventListener('focusin', (e) => {
    if (activeNav !== 'finance') return
    const item = getFinanceExpenseStructureHoverTarget(e.target)
    if (!item) return
    const chart = item.closest('.finance-expense-structure')
    if (!chart) return
    highlightFinanceExpenseStructureSegment(chart, item.dataset.expenseType)
  })

  content.addEventListener('focusout', (e) => {
    if (activeNav !== 'finance') return
    const chart = e.target.closest('.finance-expense-structure')
    if (!chart) return
    const related = getFinanceExpenseStructureHoverTarget(e.relatedTarget)
    if (related && chart.contains(related)) return
    resetFinanceExpenseStructureHighlight(chart)
  })

  content.addEventListener('click', (e) => {
    if (activeNav !== 'finance' && activeNav !== 'monthly') return

    if (e.target.closest('[data-finance-back]')) {
      e.preventDefault()
      if (activeNav === 'monthly' && monthlyDayPage) {
        closeMonthlyDayPage()
        return
      }
      if (activeNav === 'monthly' && monthlyExpensePageKey) {
        closeMonthlyExpensePage()
        return
      }
      if (activeNav === 'monthly' && monthlyIncomePageKey) {
        closeMonthlyIncomePage()
        return
      }
      if (activeFinanceMonthKey) {
        activeFinanceMonthKey = null
      } else {
        financeDetailPage = null
      }
      render()
      return
    }

    const monthTrigger = e.target.closest('[data-finance-month]')
    if (monthTrigger) {
      e.preventDefault()
      activeFinanceMonthKey = monthTrigger.dataset.financeMonth
      if (activeNav === 'monthly') {
        const [yearPart] = activeFinanceMonthKey.split('-')
        const year = Number(yearPart)
        if (Number.isFinite(year)) activeMonthlyYear = year
        monthlyYearPickerOpen = false
        persistMonthlyState()
      }
      financeDetailPage = null
      render()
      return
    }

    const expenseAddBtn = e.target.closest('[data-finance-expense-add-open]')
    if (expenseAddBtn) {
      e.preventDefault()
      e.stopPropagation()
      if (activeNav !== 'finance') return
      openFinanceExpenseModal()
      return
    }

    const incomeAddBtn = e.target.closest('[data-finance-income-add-open]')
    if (incomeAddBtn) {
      e.preventDefault()
      e.stopPropagation()
      if (activeNav !== 'finance') return
      openFinanceIncomeModal()
      return
    }

    if (activeNav !== 'finance') return

    const accountsToggle = e.target.closest('[data-finance-accounts-toggle]')
    if (accountsToggle) {
      e.preventDefault()
      toggleFinanceAccountsExpensesEnabled()
      return
    }

    const detailTrigger = e.target.closest('[data-finance-detail]')
    if (detailTrigger) {
      e.preventDefault()
      financeDetailPage = detailTrigger.dataset.financeDetail
      activeFinanceMonthKey = null
      render()
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return
    if (activeNav === 'monthly' && monthlyYearPickerOpen) {
      e.preventDefault()
      monthlyYearPickerOpen = false
      render()
      return
    }
    if (activeNav === 'monthly' && monthlyDayPage) {
      e.preventDefault()
      closeMonthlyDayPage()
      return
    }
    if (activeNav === 'monthly' && monthlyExpensePageKey) {
      e.preventDefault()
      closeMonthlyExpensePage()
      return
    }
    if (activeNav === 'monthly' && monthlyIncomePageKey) {
      e.preventDefault()
      closeMonthlyIncomePage()
      return
    }
    if (activeNav === 'finance' && (activeFinanceMonthKey || financeDetailPage)) {
      e.preventDefault()
      if (activeFinanceMonthKey) activeFinanceMonthKey = null
      else financeDetailPage = null
      render()
    }
    if (activeNav === 'finance' && financeExpenseModalOpen) {
      e.preventDefault()
      closeFinanceExpenseModal()
      return
    }
    if (activeNav === 'finance' && financeIncomeModalOpen) {
      e.preventDefault()
      closeFinanceIncomeModal()
    }
  })
}

function bindMonthlyPage() {
  const content = document.getElementById('content')
  if (!content || content.dataset.monthlyDelegation === '1') return
  content.dataset.monthlyDelegation = '1'

  content.addEventListener('click', (e) => {
    if (activeNav !== 'monthly') return

    const yearBtn = e.target.closest('[data-monthly-year]')
    if (yearBtn) {
      e.preventDefault()
      e.stopPropagation()
      const year = Number(yearBtn.dataset.monthlyYear)
      if (!Number.isFinite(year)) return
      activeMonthlyYear = year
      monthlyYearPickerOpen = false
      const monthPart = activeFinanceMonthKey?.split('-')[1] || String(new Date().getMonth() + 1).padStart(2, '0')
      activeFinanceMonthKey = `${year}-${monthPart}`
      persistMonthlyState()
      render()
      return
    }

    const yearToggle = e.target.closest('[data-monthly-year-toggle]')
    if (yearToggle) {
      e.preventDefault()
      e.stopPropagation()
      monthlyYearPickerOpen = !monthlyYearPickerOpen
      render()
      return
    }

    const dayOpen = e.target.closest('[data-monthly-day-open]')
    if (dayOpen) {
      e.preventDefault()
      openMonthlyDayPage(dayOpen.dataset.monthlyDayOpen)
      return
    }

    const dayTab = e.target.closest('[data-monthly-day-tab]')
    if (dayTab && monthlyDayPage) {
      e.preventDefault()
      const tab = dayTab.dataset.monthlyDayTab
      monthlyDayPage = { ...monthlyDayPage, tab: tab === 'income' ? 'income' : 'expense' }
      render()
      return
    }

    const expenseOpen = e.target.closest('[data-monthly-expense-open]')
    if (expenseOpen) {
      e.preventDefault()
      openMonthlyExpensePage(expenseOpen.dataset.monthlyExpenseOpen)
      return
    }

    const incomeOpen = e.target.closest('[data-monthly-income-open]')
    if (incomeOpen) {
      e.preventDefault()
      openMonthlyIncomePage(incomeOpen.dataset.monthlyIncomeOpen)
    }
  })

  content.addEventListener('change', (e) => {
    if (activeNav !== 'monthly') return
    const field = e.target.closest('[data-monthly-income-field]')
    if (field) persistMonthlyIncomeField(field)
  })

  content.addEventListener('input', (e) => {
    if (activeNav !== 'monthly') return
    const field = e.target.closest('[data-monthly-income-field="amount"]')
    if (field) persistMonthlyIncomeField(field)
  })

  document.addEventListener('click', (e) => {
    if (!monthlyYearPickerOpen || activeNav !== 'monthly') return
    if (e.target.closest('.monthly-year-picker-wrap')) return
    monthlyYearPickerOpen = false
    render()
  })
}

function openTaskModal() {
  const modal = document.getElementById('taskModal')
  if (!modal) return
  const form = document.getElementById('addTaskForm')
  form?.reset()
  const dueInput = form?.querySelector('[name="due"]')
  if (dueInput) dueInput.value = new Date().toISOString().slice(0, 10)
  document.getElementById('assigneeOtherWrap')?.classList.add('is-hidden')
  document.querySelector('#assigneeOtherWrap input')?.removeAttribute('required')
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
}

function closeTaskModal() {
  const modal = document.getElementById('taskModal')
  if (!modal) return
  modal.classList.add('is-hidden')
  modal.setAttribute('aria-hidden', 'true')
  document.getElementById('addTaskForm')?.reset()
}

function openShopModal() {
  const modal = document.getElementById('shopModal')
  if (!modal) return
  document.getElementById('addShopForm')?.reset()
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
}

function closeShopModal() {
  const modal = document.getElementById('shopModal')
  if (!modal) return
  modal.classList.add('is-hidden')
  modal.setAttribute('aria-hidden', 'true')
  document.getElementById('addShopForm')?.reset()
}

function readWarehouseModalDraft() {
  const form = document.getElementById('addWarehouseForm')
  if (!form) return warehouseModalDraft
  return {
    name: form.querySelector('[name="name"]')?.value ?? '',
    address: form.querySelector('[name="address"]')?.value ?? '',
  }
}

function restoreWarehouseModalState() {
  if (!warehouseModalOpen) return
  const modal = document.getElementById('warehouseModal')
  const form = document.getElementById('addWarehouseForm')
  if (!modal || !form || !warehouseModalDraft) return
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
  const nameInput = form.querySelector('[name="name"]')
  const addressInput = form.querySelector('[name="address"]')
  if (nameInput) nameInput.value = warehouseModalDraft.name
  if (addressInput) addressInput.value = warehouseModalDraft.address
}

function openWarehouseModal() {
  warehouseModalOpen = true
  warehouseModalDraft = { name: '', address: '' }
  const modal = document.getElementById('warehouseModal')
  if (!modal) return
  document.getElementById('addWarehouseForm')?.reset()
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
}

function closeWarehouseModal() {
  warehouseModalOpen = false
  warehouseModalDraft = null
  const modal = document.getElementById('warehouseModal')
  if (!modal) return
  modal.classList.add('is-hidden')
  modal.setAttribute('aria-hidden', 'true')
  document.getElementById('addWarehouseForm')?.reset()
}

function bindShopModal() {
  document.getElementById('addShopBtn')?.addEventListener('click', openShopModal)
  document.getElementById('shopModalClose')?.addEventListener('click', closeShopModal)
  document.getElementById('shopModalCancel')?.addEventListener('click', closeShopModal)
  document.getElementById('shopModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'shopModal') closeShopModal()
  })
}

function bindWarehouseModal() {
  document.getElementById('addWarehouseBtn')?.addEventListener('click', openWarehouseModal)
  document.getElementById('warehouseModalClose')?.addEventListener('click', closeWarehouseModal)
  document.getElementById('warehouseModalCancel')?.addEventListener('click', closeWarehouseModal)
  document.getElementById('warehouseModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'warehouseModal') closeWarehouseModal()
  })
}

function initWarehouseNavLinks() {
  const content = document.getElementById('content')
  if (!content || content.dataset.warehouseNav === '1') return
  content.dataset.warehouseNav = '1'

  content.addEventListener('click', (e) => {
    if (activeNav !== 'warehouse') return

    const backBtn = e.target.closest('[data-warehouse-back]')
    if (backBtn) {
      e.preventDefault()
      warehouseDetailId = null
      editingWarehouseId = null
      searchQuery = ''
      const searchInput = document.getElementById('searchInput')
      if (searchInput) {
        searchInput.value = ''
        searchInput.placeholder = SEARCH_PLACEHOLDERS.warehouse
      }
      render()
      return
    }

    const tileBtn = e.target.closest('[data-go-warehouse]')
    if (tileBtn) {
      e.preventDefault()
      warehouseDetailId = tileBtn.dataset.goWarehouse || null
      editingWarehouseId = null
      searchQuery = ''
      const searchInput = document.getElementById('searchInput')
      if (searchInput) {
        searchInput.value = ''
        searchInput.placeholder = 'Пошук рухів...'
      }
      render()
      return
    }

    const editBtn = e.target.closest('[data-edit-warehouse]')
    if (!editBtn) return
    e.preventDefault()
    editingWarehouseId = editBtn.dataset.editWarehouse
    render()
    document
      .querySelector(`.warehouse-detail-head-row[data-id="${editingWarehouseId}"] [data-warehouse-field="name"]`)
      ?.focus()
  })

  content.addEventListener('focusout', (e) => {
    if (activeNav !== 'warehouse') return
    const row = e.target.closest('.warehouse-detail-head-row.warehouse-detail-editing[data-id]')
    if (!row) return
    const next = e.relatedTarget
    if (next && row.contains(next)) return
    requestAnimationFrame(() => {
      if (!row.isConnected || editingWarehouseId !== row.dataset.id) return
      const active = document.activeElement
      if (active && row.contains(active)) return
      if (saveWarehouseRowFromDom(row)) {
        editingWarehouseId = null
        showToast('Склад збережено')
        render()
      }
    })
  }, true)
}

function bindTaskModal() {
  document.getElementById('addTaskBtn')?.addEventListener('click', openTaskModal)
  document.getElementById('taskModalClose')?.addEventListener('click', closeTaskModal)
  document.getElementById('taskModalCancel')?.addEventListener('click', closeTaskModal)
  document.getElementById('taskModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'taskModal') closeTaskModal()
  })

  document.getElementById('assigneeType')?.addEventListener('change', (e) => {
    const wrap = document.getElementById('assigneeOtherWrap')
    const other = e.target.value === 'other'
    wrap?.classList.toggle('is-hidden', !other)
    wrap?.querySelector('input')?.toggleAttribute('required', other)
  })

  const addTaskForm = document.getElementById('addTaskForm')
  if (addTaskForm) {
    addTaskForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const fd = new FormData(addTaskForm)
      const payload = taskPayloadFromForm(fd)
      if (!payload) {
        alert('Вкажіть ПІБ співробітника')
        return
      }
      Object.assign(payload, db.getAuthorMeta())
      const item = db.create('tasks', payload)
      logForCollection('tasks', item)
      closeTaskModal()
      showToast('Задачу додано')
      render()
    })
  }
}

function openProfileModal() {
  const modal = document.getElementById('profileModal')
  if (!modal) return
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
}

function closeProfileModal() {
  const modal = document.getElementById('profileModal')
  if (!modal) return
  modal.classList.add('is-hidden')
  modal.setAttribute('aria-hidden', 'true')
  document.getElementById('addProfileForm')?.reset()
}

function bindProfileModal() {
  document.getElementById('addProfileBtn')?.addEventListener('click', openProfileModal)
  document.getElementById('profileModalClose')?.addEventListener('click', closeProfileModal)
  document.getElementById('profileModalCancel')?.addEventListener('click', closeProfileModal)
  document.getElementById('profileModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'profileModal') closeProfileModal()
  })

  const addProfileForm = document.getElementById('addProfileForm')
  if (addProfileForm) {
    addProfileForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const fd = new FormData(addProfileForm)
      const payload = {
        lastName: fd.get('lastName'),
        firstName: fd.get('firstName'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        role: fd.get('role'),
      }
      Object.assign(payload, db.getAuthorMeta())
      db.create('profiles', payload)
      closeProfileModal()
      showToast('Профіль додано')
      render()
    })
  }
}

function bindProfileInlineEdit() {
  const tbody = document.getElementById('profilesTableBody')
  if (!tbody) return

  tbody.addEventListener('click', (e) => {
    const delBtn = e.target.closest('[data-delete-profile]')
    if (delBtn) {
      const id = delBtn.dataset.deleteProfile
      const profile = db.get('profiles', id)
      if (!profile) return
      const name = `${profile.lastName} ${profile.firstName}`.trim()
      if (!confirm(`Видалити профіль «${name}»?`)) return
      db.remove('profiles', id)
      if (editingProfileId === id) editingProfileId = null
      showToast('Профіль видалено')
      render()
      return
    }

    const saveBtn = e.target.closest('[data-save-profile]')
    if (saveBtn) {
      const row = saveBtn.closest('tr[data-profile-id]')
      if (row) saveProfileRowFromDom(row)
      editingProfileId = null
      showToast('Профіль збережено')
      render()
      return
    }

    const editBtn = e.target.closest('[data-edit-profile]')
    if (!editBtn) return

    editingProfileId = editBtn.dataset.editProfile
    render()
    document
      .querySelector(`#profilesTableBody tr[data-profile-id="${editingProfileId}"] .table-input`)
      ?.focus()
  })

  tbody.addEventListener('input', (e) => {
    const row = e.target.closest('tr.row-editing[data-profile-id]')
    if (!row) return
    saveProfileRowFromDom(row)
  })

  tbody.addEventListener('change', (e) => {
    const row = e.target.closest('tr.row-editing[data-profile-id]')
    if (!row) return
    saveProfileRowFromDom(row)
  })
}

function openAccountModal() {
  const modal = document.getElementById('accountModal')
  if (!modal) return
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
  requestAnimationFrame(() => {
    const input = document.querySelector('#addAccountForm .account-amount-input')
    syncAmountInputFilledState(input)
  })
}

function closeAccountModal() {
  const modal = document.getElementById('accountModal')
  if (!modal) return
  modal.classList.add('is-hidden')
  modal.setAttribute('aria-hidden', 'true')
  document.getElementById('addAccountForm')?.reset()
}

function bindOrderShopModal() {
  const form = document.getElementById('addOrderShopForm')
  if (!form || form.dataset.orderShopBound === '1') return
  form.dataset.orderShopBound = '1'

  document.getElementById('addOrderShopBtn')?.addEventListener('click', openOrderShopModal)
  document.getElementById('orderShopModalClose')?.addEventListener('click', closeOrderShopModal)
  document.getElementById('orderShopModalCancel')?.addEventListener('click', closeOrderShopModal)
  document.getElementById('orderShopModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'orderShopModal') closeOrderShopModal()
  })

  form.addEventListener('submit', (e) => {
      e.preventDefault()
      const fd = new FormData(form)
      const payload = orderTransactionPayloadFromForm(fd)
      Object.assign(payload, db.getAuthorMeta())
      db.create('orderTransactions', payload)
      closeOrderShopModal()
      showToast('Транзакцію додано')
      syncUkraineProductsAfterOrderTransaction(payload)
      syncNotificationsUI()
      if (activeNav !== 'product' || !isProductUkraineCatalog()) render()
    })

  form.addEventListener('input', (e) => {
    if (e.target.matches('[name="qty"]')) syncBazarioOrderFormLineTotal(form)
  })
}

function bindBazarioOrderModal() {
  bindOrderShopModal()
}

function openOrderShopModal() {
  const modal = document.getElementById('orderShopModal')
  if (!modal) return
  modal.classList.remove('is-hidden')
  modal.setAttribute('aria-hidden', 'false')
  const form = document.getElementById('addOrderShopForm')
  const dateInput = form?.querySelector('[name="date"]')
  if (dateInput) dateInput.value = getLocalDateInputValue()
  const firstNameInput = modal.querySelector('.order-product-suggest-input, [name="productName"]')
  if (firstNameInput) {
    requestAnimationFrame(() => {
      firstNameInput.focus()
      renderBazarioOrderProductSuggest(firstNameInput)
      syncBazarioOrderFormLineTotal(document.getElementById('addOrderShopForm'))
    })
  }
}

function openBazarioOrderModal() {
  openOrderShopModal()
}

function closeOrderShopModal() {
  const modal = document.getElementById('orderShopModal')
  if (!modal) return
  modal.classList.add('is-hidden')
  modal.setAttribute('aria-hidden', 'true')
  const firstNameInput = modal.querySelector('.order-product-suggest-input')
  if (firstNameInput) hideBazarioOrderProductSuggest(firstNameInput)
  document.getElementById('addOrderShopForm')?.reset()
}

function closeBazarioOrderModal() {
  closeOrderShopModal()
}

function commitBazarioOrderPickSelect(select) {
  const id = select.dataset.orderTxId
  const field = select.dataset.field
  const val = select.value
  if (!id || !field) return
  const current = db.get('orderTransactions', id)
  if (!current) return
  let patch
  if (field === 'status') {
    patch = buildOrderTransactionStatusPatch(current, val)
  } else if (field === 'paymentProfileId') {
    patch = {
      paymentProfileId: val,
      paymentId: profileDisplayName(db.get('profiles', val) || {}),
    }
  } else {
    patch = { [field]: val }
  }
  const updated = db.update('orderTransactions', id, patch)
  if (updated) {
    const historyWrap = document.querySelector(`.order-tx-status-history-wrap[data-order-tx-id="${id}"]`)
    if (historyWrap) historyWrap.innerHTML = renderOrderTransactionStatusHistoryHtml(updated)
    syncUkraineProductsAfterOrderTransaction(current, updated)
    if (field === 'status') syncNotificationsUI()
    if (activeNav !== 'product' || !isProductUkraineCatalog()) render()
  }
}

function commitBazarioOrderTtnCommentInput(input) {
  const id = input.dataset.orderTxId
  if (!id) return
  db.update('orderTransactions', id, { ttnComment: input.value.trim() })
}

function commitBazarioOrderClientCommentInput(input) {
  const id = input.dataset.orderTxId
  if (!id) return
  db.update('orderTransactions', id, { clientComment: input.value.trim() })
}

function initBazarioOrderDelegation() {
  const content = document.getElementById('content')
  if (!content || content.dataset.bazarioOrderDelegation === '1') return
  content.dataset.bazarioOrderDelegation = '1'

  content.addEventListener('change', (e) => {
    if (activeNav !== 'accounting' || !isOrderShopAccountingPage()) return
    const select = e.target.closest('.bazario-order-pick-select')
    if (!select) return
    commitBazarioOrderPickSelect(select)
  })

  content.addEventListener('click', (e) => {
    if (activeNav !== 'accounting' || !isOrderShopAccountingPage()) return

    const suggestInput = e.target.closest('.order-product-suggest-input')
    if (suggestInput) {
      renderBazarioOrderProductSuggest(suggestInput)
      return
    }

    const suggestOption = e.target.closest('.order-product-suggest-option')
    if (suggestOption) {
      e.preventDefault()
      const product = db.get('products', suggestOption.dataset.productId)
      const input = suggestOption.closest('.order-product-suggest-wrap')?.querySelector('.order-product-suggest-input')
      if (product) applyUkraineProductToBazarioOrderForm(product, input)
      return
    }

    const clientToggle = e.target.closest('[data-order-tx-client-toggle]')
    if (clientToggle) {
      e.preventDefault()
      const id = clientToggle.dataset.orderTxClientToggle
      expandedOrderTxCommentId = expandedOrderTxCommentId === id ? null : id
      render()
      if (expandedOrderTxCommentId === id) {
        window.setTimeout(() => {
          document.querySelector(`.bazario-order-comment-row[data-order-tx-id="${id}"] .bazario-order-comment-input`)?.focus()
        }, 0)
      }
      return
    }

    if (e.target.closest('#orderShopDeleteToggle')) {
      e.preventDefault()
      orderShopDeleteMode = !orderShopDeleteMode
      if (!orderShopDeleteMode) expandedOrderTxCommentId = null
      render()
      return
    }

    const delBtn = e.target.closest('[data-delete-order-tx]')
    if (!delBtn) return
    const id = delBtn.dataset.deleteOrderTx
    const tx = db.get('orderTransactions', id)
    if (!tx) return
    const name = tx.firstName || tx.phone || 'транзакцію'
    if (!confirm(`Видалити транзакцію «${name}»?`)) return
    if (expandedOrderTxCommentId === id) expandedOrderTxCommentId = null
    db.remove('orderTransactions', id)
    showToast('Транзакцію видалено')
    syncUkraineProductsAfterOrderTransaction(tx)
    if (!listOrderTransactionsByShop(orderTransactionShopValue(tx)).length) orderShopDeleteMode = false
    if (activeNav !== 'product' || !isProductUkraineCatalog()) render()
  })

  content.addEventListener('input', (e) => {
    if (activeNav !== 'accounting' || !isOrderShopAccountingPage()) return
    const suggestInput = e.target.closest('.order-product-suggest-input')
    if (!suggestInput) return
    renderBazarioOrderProductSuggest(suggestInput)
  })

  content.addEventListener('focusin', (e) => {
    if (activeNav !== 'accounting' || !isOrderShopAccountingPage()) return
    const suggestInput = e.target.closest('.order-product-suggest-input')
    if (!suggestInput) return
    renderBazarioOrderProductSuggest(suggestInput)
  })

  content.addEventListener('keydown', (e) => {
    if (activeNav !== 'accounting' || !isOrderShopAccountingPage()) return
    const suggestInput = e.target.closest('.order-product-suggest-input')
    if (!suggestInput) return
    const menu = suggestInput.closest('.order-product-suggest-wrap')?.querySelector('.order-product-suggest-menu')
    if (!menu || menu.classList.contains('is-hidden')) return
    const options = [...menu.querySelectorAll('.order-product-suggest-option')]
    let activeIndex = Number(menu.dataset.activeIndex)
    if (!Number.isFinite(activeIndex)) activeIndex = -1

    if (e.key === 'Escape') {
      hideBazarioOrderProductSuggest(suggestInput)
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      activeIndex = Math.min(activeIndex + 1, options.length - 1)
      menu.dataset.activeIndex = String(activeIndex)
      options.forEach((option, index) => option.classList.toggle('is-active', index === activeIndex))
      return
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      activeIndex = Math.max(activeIndex - 1, 0)
      menu.dataset.activeIndex = String(activeIndex)
      options.forEach((option, index) => option.classList.toggle('is-active', index === activeIndex))
      return
    }
    if (e.key === 'Enter' && activeIndex >= 0 && options[activeIndex]) {
      e.preventDefault()
      const product = db.get('products', options[activeIndex].dataset.productId)
      if (product) applyUkraineProductToBazarioOrderForm(product, suggestInput)
    }
  })

  content.addEventListener('mousedown', (e) => {
    if (activeNav !== 'accounting' || !isOrderShopAccountingPage()) return
    if (e.target.closest('.order-product-suggest-menu')) e.preventDefault()
  })

  content.addEventListener('blur', (e) => {
    if (activeNav !== 'accounting' || !isOrderShopAccountingPage()) return
    const suggestInput = e.target.closest('.order-product-suggest-input')
    if (suggestInput) {
      window.setTimeout(() => hideBazarioOrderProductSuggest(suggestInput), 150)
      return
    }
    const input = e.target.closest('.bazario-order-ttn-input')
    if (input) {
      commitBazarioOrderTtnCommentInput(input)
      return
    }
    const commentInput = e.target.closest('.bazario-order-comment-input')
    if (commentInput) commitBazarioOrderClientCommentInput(commentInput)
  }, true)
}

function bindAccountModal() {
  document.getElementById('addAccountBtn')?.addEventListener('click', openAccountModal)
  document.getElementById('accountModalClose')?.addEventListener('click', closeAccountModal)
  document.getElementById('accountModalCancel')?.addEventListener('click', closeAccountModal)
  document.getElementById('accountModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'accountModal') closeAccountModal()
  })

  const addAccountForm = document.getElementById('addAccountForm')
  if (addAccountForm) {
    addAccountForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const fd = new FormData(addAccountForm)
      db.create('accounts', accountPayloadFromForm(fd))
      closeAccountModal()
      showToast('Акаунт додано')
      render()
    })
  }
}

function commitAccountPickSelect(select) {
  const cell = select.closest('.account-pick-cell')
  if (!cell) return

  const id = select.dataset.accountId
  const field = select.dataset.field
  const val = select.value
  const patch = field === 'paymentProfileId'
    ? {
        paymentProfileId: val,
        paymentId: profileDisplayName(db.get('profiles', val) || {}),
      }
    : { [field]: val }
  const updated = db.update('accounts', id, patch)
  if (updated) syncAccountDisplays(id, updated)
}

function initAccountTableDelegation() {
  const content = document.getElementById('content')
  if (!content || content.dataset.accountDelegation === '1') return
  content.dataset.accountDelegation = '1'

  content.addEventListener('change', (e) => {
    if (activeNav !== 'accounts') return
    const filterSelect = e.target.closest('.account-filter-select')
    if (filterSelect) {
      setAccountsColumnFilter(filterSelect.dataset.field, filterSelect.value)
      expandedPhoneKey = null
      expandedAccountId = null
      render()
      return
    }
    const select = e.target.closest('.account-pick-select')
    if (!select) return
    commitAccountPickSelect(select)
  })

  content.addEventListener('click', (e) => {
    if (activeNav !== 'accounts') return

    if (e.target.closest('#accountsResetFilters')) {
      e.preventDefault()
      resetAccountsFilters()
      render()
      return
    }

    if (e.target.closest('#accountsDeleteToggle, [data-accounts-delete-toggle]')) {
      e.preventDefault()
      e.stopPropagation()
      accountsDeleteMode = !accountsDeleteMode
      render()
      return
    }

    const delBtn = e.target.closest('[data-delete-account]')
    if (delBtn) {
      const id = delBtn.dataset.deleteAccount
      const account = db.get('accounts', id)
      if (!account) return
      const name = account.firstName || account.phone || 'акаунт'
      if (!confirm(`Видалити акаунт «${name}»?`)) return
      db.remove('accounts', id)
      const phoneKey = getPhoneGroupKey(account.phone, account.id)
      const remaining = db.list('accounts').filter((a) => getPhoneGroupKey(a.phone, a.id) === phoneKey)
      if (!remaining.length) {
        expandedPhoneKey = null
        expandedAccountId = null
      } else if (expandedAccountId === id) {
        expandedAccountId = remaining[remaining.length - 1].id
      }
      if (!db.list('accounts').length) accountsDeleteMode = false
      showToast('Акаунт видалено')
      render()
      return
    }

    const delGroupBtn = e.target.closest('[data-delete-phone-group]')
    if (delGroupBtn) {
      const key = delGroupBtn.dataset.deletePhoneGroup
      const group = buildPhoneGroups(db.list('accounts')).find((g) => g.key === key)
      if (!group) return
      if (!confirm(`Видалити всі ${group.accounts.length} замовлення для ${group.phone}?`)) return
      group.accounts.forEach((a) => db.remove('accounts', a.id))
      if (expandedPhoneKey === key) {
        expandedPhoneKey = null
        expandedAccountId = null
      }
      if (!db.list('accounts').length) accountsDeleteMode = false
      showToast('Замовлення видалено')
      render()
      return
    }

    const expandBtn = e.target.closest('.account-name-toggle[data-phone-expand]')
    if (expandBtn) {
      e.preventDefault()
      const phoneKey = expandBtn.dataset.phoneExpand
      const id = expandBtn.dataset.accountExpand
      if (expandedPhoneKey === phoneKey) {
        expandedPhoneKey = null
        expandedAccountId = null
      } else {
        expandedPhoneKey = phoneKey
        expandedAccountId = id
      }
      render()
      return
    }

    const historyItem = e.target.closest('.account-history-item[data-account-id]')
    if (
      historyItem
      && !e.target.closest('[data-delete-account], .account-pick-cell, .account-pick-arrow-wrap, .account-article-input, .account-amount-input, .account-notes-input, .account-pick-select')
    ) {
      e.preventDefault()
      e.stopPropagation()
      const id = historyItem.dataset.accountId
      if (expandedAccountId === id) return
      expandedAccountId = id
      expandedPhoneKey = historyItem.dataset.phoneKey || expandedPhoneKey
      render()
      window.requestAnimationFrame(() => {
        document.querySelector(`.account-history-notes-row[data-account-id="${id}"] .account-history-notes-input`)?.focus()
      })
      return
    }

    const emptyTrigger = e.target.closest('.account-pick-arrow-wrap--empty')
    if (emptyTrigger) {
      e.preventDefault()
      const field = emptyTrigger.dataset.field
        || emptyTrigger.closest('.account-pick-cell')?.dataset.field
        || emptyTrigger.closest('.account-filter-th')?.dataset.field
      if (field === 'paymentProfileId') {
        showToast('Спочатку додайте профілі в розділі «Профіль»')
      }
    }
  })

  content.addEventListener('focusin', (e) => {
    if (activeNav !== 'accounts') return
    const articleInput = e.target.closest('.account-article-input, #addAccountForm [name="article"]')
    if (!articleInput) return
    focusArticleInput(articleInput)
  })

  content.addEventListener('keydown', (e) => {
    if (activeNav !== 'accounts') return
    const articleInput = e.target.closest('.account-article-input, #addAccountForm [name="article"]')
    if (!articleInput) return
    guardArticlePrefixKeydown(e, articleInput)
  })

  content.addEventListener('input', (e) => {
    if (activeNav !== 'accounts') return
    const amountInput = e.target.closest('.account-amount-input')
    if (amountInput) syncAmountInputFilledState(amountInput)
  })

  content.addEventListener('focusout', (e) => {
    if (activeNav !== 'accounts') return
    const articleInput = e.target.closest('.account-article-input, #addAccountForm [name="article"]')
    if (articleInput) {
      if (articleInput.value === ARTICLE_PREFIX) {
        articleInput.value = ''
      } else if (articleInput.value.trim()) {
        const normalized = articleValueForSave(articleInput.value)
        articleInput.value = normalized ? articleInputDisplay(normalized) : ''
      }
      if (articleInput.classList.contains('account-article-input')) {
        const id = articleInput.dataset.accountId
        if (!id) return
        const updated = db.update('accounts', id, { article: articleValueForSave(articleInput.value) })
        if (updated) syncAccountDisplays(id, updated)
      }
      return
    }

    const amountInput = e.target.closest('.account-amount-input, #addAccountForm [name="amount"]')
    if (!amountInput) return
    finalizeAmountInput(amountInput)
    if (!amountInput.classList.contains('account-amount-input')) return
    const id = amountInput.dataset.accountId
    if (!id) return
    const { amount, amountDisplay } = accountAmountPayload(amountInput.value)
    amountInput.value = amountDisplay || ''
    syncAmountInputFilledState(amountInput)
    const updated = db.update('accounts', id, { amount, amountDisplay })
    if (updated) syncAccountDisplays(id, updated)
  })

  content.addEventListener('input', (e) => {
    if (activeNav !== 'accounts') return

    const notesInput = e.target.closest('.account-notes-input')
    if (notesInput) {
      const id = notesInput.dataset.accountId
      if (!id) return
      const updated = db.update('accounts', id, { notes: notesInput.value.trim() })
      if (updated) {
        const phoneKey = getPhoneGroupKey(updated.phone, updated.id)
        const groupRow = document.querySelector(`tr.account-phone-group-row[data-phone-key="${phoneKey}"]`)
        if (groupRow) {
          const all = db.list('accounts').filter((a) => getPhoneGroupKey(a.phone, a.id) === phoneKey)
          groupRow.dataset.search = phoneGroupSearchText(all)
        }
      }
      return
    }

    const articleInput = e.target.closest('.account-article-input')
    if (articleInput) {
      enforceArticleInput(articleInput)
      const id = articleInput.dataset.accountId
      if (!id) return
      const updated = db.update('accounts', id, { article: articleValueForSave(articleInput.value) })
      if (updated) syncAccountDisplays(id, updated)
      return
    }

    const input = e.target.closest('.account-amount-input, #addAccountForm [name="amount"]')
    if (input) {
      enforceAmountInput(input)
    }
  })
}

function initTaskTableDelegation() {
  const content = document.getElementById('content')
  if (!content || content.dataset.taskDelegation === '1') return
  content.dataset.taskDelegation = '1'

  content.addEventListener('change', (e) => {
    if (activeNav !== 'tasks') return

    const fileInput = e.target.closest('.task-file-input')
    if (fileInput) {
      handleTaskFileUpload(fileInput)
      return
    }

    const select = e.target.closest('.task-detail-panel .task-pick-select')
    if (!select) return
    commitTaskPickSelect(select)
  })

  content.addEventListener('click', (e) => {
    if (activeNav !== 'tasks') return

    const expandBtn = e.target.closest('.task-title-toggle[data-task-expand]')
    if (expandBtn) {
      e.preventDefault()
      const id = expandBtn.dataset.taskExpand
      expandedTaskId = expandedTaskId === id ? null : id
      render()
      return
    }

    const fileAddBtn = e.target.closest('.task-file-add-btn')
    if (fileAddBtn) {
      e.preventDefault()
      document.getElementById(`task-file-${fileAddBtn.dataset.taskId}`)?.click()
      return
    }

    const fileRemoveBtn = e.target.closest('.task-file-remove')
    if (fileRemoveBtn) {
      e.preventDefault()
      const taskId = fileRemoveBtn.dataset.taskId
      const fileId = fileRemoveBtn.dataset.fileId
      const task = db.get('tasks', taskId)
      if (!task) return
      const attachments = (task.attachments || []).filter((f) => f.id !== fileId)
      db.update('tasks', taskId, { attachments })
      showToast('Файл видалено')
      render()
      return
    }

    const delBtn = e.target.closest('[data-delete-task]')
    if (delBtn) {
      const id = delBtn.dataset.deleteTask
      const task = db.get('tasks', id)
      if (!task) return
      if (!confirm(`Видалити задачу «${task.title}»?`)) return
      db.remove('tasks', id)
      if (expandedTaskId === id) expandedTaskId = null
      if (!db.list('tasks').length) tasksDeleteMode = false
      showToast('Задачу видалено')
      render()
      return
    }

    const emptyTrigger = e.target.closest('.account-pick-arrow-wrap--empty')
    if (emptyTrigger && emptyTrigger.closest('.task-detail-panel')) {
      e.preventDefault()
      showToast('Спочатку додайте профілі в розділі «Профіль»')
    }
  })

  content.addEventListener('input', (e) => {
    if (activeNav !== 'tasks') return

    const descInput = e.target.closest('.task-description-input')
    if (!descInput) return
    const id = descInput.dataset.taskId
    if (!id) return
    const updated = db.update('tasks', id, { description: descInput.value })
    if (updated) {
      const row = document.querySelector(`tr.task-table-row[data-task-id="${id}"]`)
      if (row) row.dataset.search = taskSearchText(updated)
    }
  })
}

function bindAccountTableActions() {
  /* делегування на #content — initAccountTableDelegation() */
}

function getActiveStorageKey() {
  const map = { warehouse: 'warehouses', product: 'products', shop: 'shops', tasks: 'tasks', accounts: 'accounts' }
  return map[activeNav]
}

function applySearchFilter() {
  const q = searchQuery.toLowerCase()
  document.querySelectorAll('[data-search]').forEach((el) => {
    const text = (el.dataset.search || el.textContent || '').toLowerCase()
    el.style.display = !q || text.includes(q) ? '' : 'none'
  })
  document.querySelectorAll('tr[data-search]').forEach((row) => {
    const text = (row.dataset.search || '').toLowerCase()
    row.style.display = !q || text.includes(q) ? '' : 'none'
  })
}

function renderContent() {
  const el = document.getElementById('content')
  if (activeNav === 'warehouse' && warehouseModalOpen) {
    warehouseModalDraft = readWarehouseModalDraft()
  }
  const renders = {
    home: renderHome,
    warehouse: renderWarehouse,
    product: renderProduct,
    shop: renderShop,
    accounting: renderAccounting,
    advertising: renderAdvertising,
    finance: renderFinance,
    monthly: renderMonthly,
    tasks: renderTasks,
    accounts: renderAccounts,
    profile: renderProfile,
  }
  el.innerHTML = renders[activeNav]()
  if (activeNav === 'warehouse') restoreWarehouseModalState()
  if (activeNav === 'finance' && financeExpenseModalOpen) {
    restoreFinanceExpenseModalState()
  }
  if (activeNav === 'finance' && financeIncomeModalOpen) {
    restoreFinanceIncomeModalState()
  }
  bindCrudEvents()
  applySearchFilter()
  if (activeNav === 'product' && isProductUkraineCatalog()) {
    scheduleUkraineTableDynamicColumns()
  }
  if (activeNav === 'accounts') {
    requestAnimationFrame(() => syncAllAccountAmountInputsFilledState())
  }
  if (activeNav === 'advertising') {
    bindAdvertisingPage()
  }
}

function buildNavButtonsHtml() {
  return NAV.map((item) => `
    <button type="button" class="nav-btn${activeNav === item.id ? ' active' : ''}" data-nav="${item.id}" title="${item.label}" aria-label="${item.label}" aria-current="${activeNav === item.id ? 'page' : 'false'}">
      ${ICONS[item.icon]}
    </button>
  `).join('')
}

function playNavSelectAnimation(btn) {
  if (!btn || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  btn.classList.remove('nav-btn-pop')
  void btn.offsetWidth
  btn.classList.add('nav-btn-pop')
  const onEnd = () => {
    btn.classList.remove('nav-btn-pop')
    btn.removeEventListener('animationend', onEnd)
  }
  btn.addEventListener('animationend', onEnd)
}

function applyNavActiveState({ animate = false } = {}) {
  const nav = document.getElementById('nav')
  if (!nav) return
  nav.querySelectorAll('[data-nav]').forEach((btn) => {
    const isActive = btn.dataset.nav === activeNav
    btn.classList.toggle('active', isActive)
    btn.setAttribute('aria-current', isActive ? 'page' : 'false')
    if (isActive && animate) playNavSelectAnimation(btn)
  })
}

function resetNavSectionContext() {
  financeDetailPage = null
  accountingSubPage = null
  resetAllPagePeriodsToCurrentMonth()
  expandedOrderTxCommentId = null
  orderShopDeleteMode = false
  if (activeNav !== 'monthly') {
    monthlyIncomePageKey = null
    monthlyExpensePageKey = null
    monthlyDayPage = null
  }
  editingProfileId = null
  editingWarehouseId = null
  warehouseModalOpen = false
  warehouseModalDraft = null
  financeExpenseModalOpen = false
  financeIncomeModalOpen = false
  warehouseDetailId = null
  accountsDeleteMode = false
  expandedPhoneKey = null
  expandedAccountId = null
  resetAccountsFilters()
  tasksDeleteMode = false
  expandedTaskId = null
  productsDeleteMode = false
  expandedProductId = null
  resetProductsZakupkaTableControls()
  resetProductsUkraineTableControls()
  productCatalogPickerOpen = false
  closeNotificationsPanel()
}

function initNavMain() {
  const nav = document.getElementById('nav')
  if (!nav || nav.dataset.bound === '1') return
  nav.dataset.bound = '1'
  nav.innerHTML = buildNavButtonsHtml()
  nav.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-nav]')
    if (!btn || btn.dataset.nav === activeNav) return
    if (activeNav === 'monthly') persistMonthlyState()
    activeNav = btn.dataset.nav
    resetNavSectionContext()
    searchQuery = ''
    const searchInput = document.getElementById('searchInput')
    if (searchInput) {
      searchInput.value = ''
      searchInput.placeholder = SEARCH_PLACEHOLDERS[activeNav]
    }
    applyNavActiveState({ animate: true })
    render()
    persistAppNavState()
  })
}

function renderNav({ animate = false } = {}) {
  const nav = document.getElementById('nav')
  if (!nav) return
  if (nav.dataset.bound !== '1') initNavMain()
  applyNavActiveState({ animate })
}

function render() {
  financePageDataPassCache = null
  syncCurrentUserRoleFromProfileRecord()
  syncHeader()
  renderContent()
}

syncCurrentUserRoleFromProfileRecord()
syncHeader()
initAccountTableDelegation()
initProductTableDelegation()
initTaskTableDelegation()
initNotifications()
initHomeTaskLinks()
initAccountingNavLinks()
initPagePeriodHandlers()
bindFinancePage()
bindMonthlyPage()
restoreProductCatalogMode()
restoreZakupkaColDisplayModes()
restoreUkraineCommissionDisplayModes()
restoreFinanceAccountsExpensesEnabled()
migrateProductCatalogField()
migrateOrderTransactionCatalogPrices()
migrateOrderTransactionStatusHistory()
const navRestored = restoreAppNavState()
if (!navRestored) resetAllPagePeriodsToCurrentMonth()
renderNav()
const searchInputEl = document.getElementById('searchInput')
searchInputEl.placeholder = SEARCH_PLACEHOLDERS[activeNav] || SEARCH_PLACEHOLDERS.home
searchInputEl.addEventListener('input', (e) => {
  searchQuery = e.target.value.trim()
  if (['warehouse', 'product', 'shop', 'accounting', 'advertising', 'finance', 'monthly', 'tasks', 'accounts', 'profile'].includes(activeNav)) {
    render()
  } else {
    applySearchFilter()
  }
})

window.addEventListener('pagehide', persistAppNavState)

let remoteRenderTimer = null
function scheduleRemoteRender() {
  clearTimeout(remoteRenderTimer)
  remoteRenderTimer = setTimeout(() => {
    remoteRenderTimer = null
    syncHeader()
    render()
  }, 450)
}

function startApp() {
  render()
}

startApp()

if (window.BazarioSync?.isEnabled()) {
  BazarioSync.init({
    onReady: startApp,
    onRemoteChange: scheduleRemoteRender,
  })
}

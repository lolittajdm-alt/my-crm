/**
 * Bazario — імпорт замовлень Rozetka Seller API в транзакції (orderTransactions).
 */
const BazarioRozetkaSync = (() => {
  const TOKEN_KEY = 'bazario_rozetka_token_v1'
  const LAST_SYNC_KEY = 'bazario_rozetka_last_sync_v1'
  const ORDER_STATUSES = [
    'Нове Замовлення',
    'В обробці',
    'Продаж',
    'Відправлено',
    'Доставляється',
    'Очікує на відділенні',
    'ПОВЕРНУТО',
    '-',
    'Оформлено',
  ]

  /** Точні назви статусів Rozetka (name_uk) → статус CRM */
  const ROZETKA_STATUS_EXACT = {
    'нове замовлення': 'Нове Замовлення',
    'новий заказ': 'Нове Замовлення',
    'обробляється менеджером': 'В обробці',
    'не оброблено продавцем протягом дня': 'В обробці',
    'планується повторний дзвінок': 'В обробці',
    'очікує отримання оплати': 'В обробці',
    'комплектується': 'В обробці',
    'комплектується. дані підтверджені': 'В обробці',
    'комплектується дані підтверджені': 'В обробці',
    'повторне замовлення': 'В обробці',
    'заплановано передачу перевізникові': 'В обробці',
    'заплановано передачу перевізнику': 'В обробці',
    'оброблено автоматично': 'В обробці',
    'опрацьовано автоматично': 'В обробці',
    'передано до служби доставки': 'Відправлено',
    'передано в службу доставки': 'Відправлено',
    'очікує отримання від продавця': 'Очікує на відділенні',
    'доставляється': 'Доставляється',
    'замовлення виконано': 'Продаж',
    'виконано автоматично. минув термін обробки': 'Продаж',
    'виконано автоматично': 'Продаж',
    'отримано': 'Продаж',
    'очікується повернення': 'ПОВЕРНУТО',
    'замовлення повернуто': 'ПОВЕРНУТО',
    'скасовано покупцем': 'ПОВЕРНУТО',
    'не вдалося зв\'язатися': 'ПОВЕРНУТО',
    'не вдалося зв\'язатися з покупцем': 'ПОВЕРНУТО',
    'неправильні контактні дані': 'ПОВЕРНУТО',
    'не влаштовує товар': 'ПОВЕРНУТО',
    'умови доставки не влаштовують': 'ПОВЕРНУТО',
    'не влаштовують умови оплати': 'ПОВЕРНУТО',
    'передоплата не влаштовує': 'ПОВЕРНУТО',
    'немає в наявності': 'ПОВЕРНУТО',
    'ціна змінилась': 'ПОВЕРНУТО',
    'брак': 'ПОВЕРНУТО',
    'повторне замовлення (скасування)': 'ПОВЕРНУТО',
    'відсутня оплата': 'ПОВЕРНУТО',
    'в кредиті відмовлено': 'ПОВЕРНУТО',
    'втрачено перевізником': 'ПОВЕРНУТО',
    'відмова при отриманні': 'ПОВЕРНУТО',
    'не з\'явився за замовленням': 'ПОВЕРНУТО',
  }

  const ROZETKA_STATUS_BY_ID = {
    1: 'Нове Замовлення',
    26: 'В обробці',
    2: 'В обробці',
    3: 'Відправлено',
    4: 'Доставляється',
    5: 'Продаж',
    6: 'ПОВЕРНУТО',
  }

  /** Статуси Rozetka для вибору в транзакціях (порядок як у кабінеті продавця) */
  const ROZETKA_STATUS_PICKER_LABELS = [
    'Нове замовлення',
    'Обробляється менеджером',
    'Планується повторний дзвінок',
    'Очікує отримання оплати',
    'Комплектується. Дані підтверджені',
    'Заплановано передачу перевізникові',
    'Очікує отримання від продавця',
    'Передано до служби доставки',
    'Доставляється',
    'Замовлення виконано',
    'Виконано автоматично. Минув термін обробки',
    'Не оброблено продавцем протягом дня',
    'Повторне замовлення',
    'Очікується повернення',
    'Замовлення повернуто',
    'Скасовано покупцем',
    'Не вдалося зв\'язатися з покупцем',
    'Неправильні контактні дані',
    'Не влаштовує товар',
    'Умови доставки не влаштовують',
    'Не влаштовують умови оплати',
    'Передоплата не влаштовує',
    'Немає в наявності',
    'Ціна змінилась',
    'Брак',
    'Відсутня оплата',
    'В кредиті відмовлено',
    'Втрачено перевізником',
    'Відмова при отриманні',
    'Не з\'явився за замовленням',
  ]

  const STATUS_ALIASES = [
    [/нов(е|ий)\s*замов/, 'Нове Замовлення'],
    [/нов(е|ий)\s*заказ/, 'Нове Замовлення'],
    [/оброб|обработ|менеджер/, 'В обробці'],
    [/комплектується.*дані підтверджені/, 'В обробці'],
    [/заплановано|передач.*перев/, 'В обробці'],
    [/оброблено автоматично|опрацьовано автоматично/, 'В обробці'],
    [/передано.*достав|в\s*служб/, 'Відправлено'],
    [/доставля/, 'Доставляється'],
    [/очіку.*відділ|ожида.*отдел/, 'Очікує на відділенні'],
    [/викон|отрим|заверш|продаж|done|success/, 'Продаж'],
    [/поверн|скас|cancel|break|refus/, 'ПОВЕРНУТО'],
    [/оформлен/, 'Оформлено'],
  ]

  const state = {
    syncing: false,
    lastSyncAt: null,
    lastResult: null,
    onSyncComplete: null,
    timer: null,
  }

  function config() {
    return window.BAZARIO_ROZETKA || {}
  }

  function hasApiToken() {
    return Boolean(String(config().apiToken || '').trim())
  }

  function hasLoginCredentials() {
    const { username, password } = config()
    return Boolean(String(username || '').trim() && String(password || '').trim())
  }

  function isEnabled() {
    return hasApiToken() || hasLoginCredentials()
  }

  function db() {
    return window.BazarioDB
  }

  function apiBase() {
    const base = String(config().apiBase || '/api/rozetka').trim()
    return window.BazarioApiBase?.resolve?.(base) || base.replace(/\/$/, '')
  }

  function readTokenCache() {
    try {
      const raw = sessionStorage.getItem(TOKEN_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      if (!parsed?.token || !parsed?.expiresAt) return null
      if (Date.parse(parsed.expiresAt) <= Date.now() + 60_000) return null
      return parsed.token
    } catch {
      return null
    }
  }

  function writeTokenCache(token) {
    const expiresAt = new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString()
    sessionStorage.setItem(TOKEN_KEY, JSON.stringify({ token, expiresAt }))
  }

  function clearTokenCache() {
    sessionStorage.removeItem(TOKEN_KEY)
  }

  function readLastSyncAt() {
    if (state.lastSyncAt) return state.lastSyncAt
    try {
      return localStorage.getItem(LAST_SYNC_KEY) || null
    } catch {
      return null
    }
  }

  function writeLastSyncAt(iso) {
    state.lastSyncAt = iso
    try {
      localStorage.setItem(LAST_SYNC_KEY, iso)
    } catch { /* ignore */ }
  }

  async function apiRequest(path, { method = 'GET', body = null, token = null } = {}) {
    const url = `${apiBase()}${path.startsWith('/') ? path : `/${path}`}`
    const headers = { Accept: 'application/json' }
    if (token) headers.Authorization = `Bearer ${token}`
    if (body != null) headers['Content-Type'] = 'application/json'

    const res = await fetch(url, {
      method,
      headers: window.BazarioApiBase?.headers?.(headers) || headers,
      body: body != null ? JSON.stringify(body) : undefined,
    })

    let data
    try {
      data = await res.json()
    } catch {
      throw new Error(`Rozetka API: некоректна відповідь (${res.status})`)
    }

    if (!res.ok) {
      throw new Error(data?.errors?.message || `HTTP ${res.status}`)
    }
    if (data?.success === false) {
      const code = data?.errors?.code
      const msg = data?.errors?.message || 'Помилка Rozetka API'
      const err = new Error(msg)
      err.code = code
      throw err
    }
    return data?.content ?? data
  }

  async function login() {
    const configuredToken = String(config().apiToken || '').trim()
    if (configuredToken) return configuredToken

    const cached = readTokenCache()
    if (cached) return cached

    const { username, password } = config()
    const content = await apiRequest('/sites', {
      method: 'POST',
      body: {
        username: String(username).trim(),
        password: btoa(unescape(encodeURIComponent(String(password)))),
      },
    })

    const token = content?.access_token
    if (!token) throw new Error('Rozetka: не отримано access_token')
    writeTokenCache(token)
    return token
  }

  function normalizeStatusText(value) {
    return String(value || '')
      .trim()
      .toLowerCase()
      .replace(/[’']/g, "'")
  }

  function mapRozetkaStatusName(name, statusGroup = null, statusId = null) {
    const normalized = normalizeStatusText(name)
    if (statusId != null && ROZETKA_STATUS_BY_ID[statusId]) {
      return ROZETKA_STATUS_BY_ID[statusId]
    }
    if (normalized && ROZETKA_STATUS_EXACT[normalized]) {
      return ROZETKA_STATUS_EXACT[normalized]
    }
    if (statusGroup === 3) return 'ПОВЕРНУТО'
    if (statusGroup === 2) {
      if (/поверн|скас|cancel|відмов|не вдал|немає в наяв|брак|втрач/.test(normalized)) return 'ПОВЕРНУТО'
      if (/комплектується.*дані підтверджені|комплектується\.?\s*дані/.test(normalized)) return 'В обробці'
      if (/заплановано.*перев|передач.*перевізник/.test(normalized)) return 'В обробці'
      if (/оброблено автоматично|опрацьовано автоматично/.test(normalized)) return 'В обробці'
      if (/комплект|обробляється|оброблено|оплат|дзвінок|планується повторний/.test(normalized)) return 'В обробці'
      if (/^нов/.test(normalized)) return 'Нове Замовлення'
      if (/виконано автоматично|виконано автоматично\./.test(normalized)) return 'Продаж'
      if (/замовлення виконано|^отримано$/.test(normalized)) return 'Продаж'
      if (/викон|отрим|заверш/.test(normalized)) return 'Продаж'
    }

    const exact = ORDER_STATUSES.find((s) => normalizeStatusText(s) === normalized)
    if (exact) return exact

    for (const [pattern, status] of STATUS_ALIASES) {
      if (pattern.test(normalized)) return status
    }

    if (name) {
      const titled = String(name).trim()
      const close = ORDER_STATUSES.find((s) => s.toLowerCase() === titled.toLowerCase())
      if (close) return close
    }
    return ORDER_STATUSES[0]
  }

  function currentRozetkaStatusLabel(order) {
    const label = order?.status_data?.name_uk || order?.status_data?.name
    if (label) return String(label).trim()
    return ROZETKA_STATUS_PICKER_LABELS[0] || 'Нове замовлення'
  }

  function isRozetkaCancelledByBuyerLabel(label) {
    return /скасовано\s*покупцем/.test(normalizeStatusText(label))
  }

  /** Рядок товару в замовленні неактивний (скасовано покупцем, повернено або видалено з замовлення). */
  function purchaseLineCancelled(purchase, order) {
    const purchaseStatus = Number(purchase?.status)
    if (purchaseStatus === 0 || purchaseStatus === 2) return true
    if (order && isRozetkaCancelledByBuyerLabel(currentRozetkaStatusLabel(order))) return true
    const purchaseOrderStatus = purchase?.order_status
    if (purchaseOrderStatus != null && order && Array.isArray(order.order_status_history)) {
      const match = order.order_status_history.find((entry) => {
        const { statusId } = rozetkaStatusEntryMeta(entry)
        return Number(statusId) === Number(purchaseOrderStatus)
      })
      if (match && isRozetkaCancelledByBuyerLabel(rozetkaStatusLabel(match))) return true
    }
    return false
  }

  function getStatusPickerLabels() {
    return [...ROZETKA_STATUS_PICKER_LABELS]
  }

  function mapStatusToCrm(name, statusGroup = null, statusId = null) {
    return mapRozetkaStatusName(name, statusGroup, statusId)
  }

  /** Чи статус Rozetka (name_uk з API) відноситься до «В обробці» за маппінгом CRM. */
  function isRozetkaInProcessingLabel(label) {
    if (!String(label || '').trim()) return false
    return mapRozetkaStatusName(label) === 'В обробці'
  }

  function mapOrderStatus(order) {
    const statusData = order?.status_data || {}
    return mapStatusToCrm(
      statusData.name_uk || statusData.name,
      order?.status_group,
      statusData.id ?? order?.status,
    )
  }

  function mapDelivery(order) {
    const parts = [
      order?.delivery_service?.title,
      order?.delivery_service?.name,
      order?.delivery?.delivery_service_name,
      order?.delivery?.title,
    ].filter(Boolean)
    const text = parts.join(' ').toLowerCase()
    if (text.includes('rozetka') || text.includes('розетк')) return 'Rozetka'
    return 'Нова Пошта'
  }

  function parseRozetkaDateTime(value, fallback = new Date().toISOString()) {
    if (value == null || value === '') {
      if (fallback == null || fallback === '') return null
      const fb = new Date(fallback)
      return Number.isNaN(fb.getTime()) ? new Date().toISOString() : fb.toISOString()
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
      return new Date(value < 1e12 ? value * 1000 : value).toISOString()
    }

    const raw = String(value).trim()
    const dmyTime = raw.match(/^(\d{2})\.(\d{2})\.(\d{4})[ T](\d{2}):(\d{2})(?::(\d{2}))?/)
    if (dmyTime) {
      const [, d, mo, y, h, mi, s = '0'] = dmyTime
      const local = new Date(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s))
      if (!Number.isNaN(local.getTime())) return local.toISOString()
    }

    const utcIso = raw.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?Z$/i)
    if (utcIso) {
      const [, y, mo, d, h, mi, s = '0'] = utcIso
      const local = new Date(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s))
      if (!Number.isNaN(local.getTime())) return local.toISOString()
    }

    const withTime = raw.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2})(?::(\d{2}))?/)
    if (withTime) {
      const [, y, mo, d, h, mi, s = '0'] = withTime
      const local = new Date(Number(y), Number(mo) - 1, Number(d), Number(h), Number(mi), Number(s))
      if (!Number.isNaN(local.getTime())) return local.toISOString()
    }

    const dayOnly = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (dayOnly) {
      const [, y, mo, d] = dayOnly
      const local = new Date(Number(y), Number(mo) - 1, Number(d), 12, 0, 0)
      if (!Number.isNaN(local.getTime())) return local.toISOString()
    }

    const d = new Date(raw)
    return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString()
  }

  function orderCreatedFrom(order) {
    return parseRozetkaDateTime(order?.created)
  }

  /** Календарна дата замовлення в локальному часі (без UTC-зсуву на попередній день). */
  function rozetkaLocalDateKey(value) {
    const raw = String(value ?? '').trim()
    if (!raw) return null
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw
    const localPrefix = raw.match(/^(\d{4}-\d{2}-\d{2})[ T]/)
    if (localPrefix && !/[Zz]$/.test(raw) && !/[+-]\d{2}:\d{2}$/.test(raw)) {
      return localPrefix[1]
    }
    const d = new Date(parseRozetkaDateTime(raw))
    if (Number.isNaN(d.getTime())) return null
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  function orderLocalDateKey(order) {
    return rozetkaLocalDateKey(order?.created) || rozetkaLocalDateKey(orderCreatedFrom(order))
  }

  function customerName(order) {
    const user = order?.user || {}
    const delivery = order?.delivery || {}
    const full = [
      user.full_name,
      user.fullName,
      [user.first_name, user.last_name].filter(Boolean).join(' '),
      [user.firstName, user.lastName].filter(Boolean).join(' '),
      delivery.recipient_title,
      delivery.recipient_name,
    ].find((v) => String(v || '').trim())
    return String(full || '').trim() || 'Клієнт Rozetka'
  }

  function customerPhone(order) {
    return String(
      order?.user_phone
      || order?.user?.phone
      || order?.delivery?.recipient_phone
      || '',
    ).trim()
  }

  function purchaseArticle(purchase, order) {
    const fromDetails = purchase?.item_details?.item_main?.article
      || purchase?.item_details?.item?.article
      || purchase?.item?.article
    if (fromDetails) return String(fromDetails).trim()

    const photo = (order?.items_photos || []).find((p) => (
      String(p.id) === String(purchase?.item_id)
    ))
    return String(photo?.article || '').trim()
  }

  function purchaseProductName(purchase, order) {
    return String(
      purchase?.item_name
      || purchase?.item_details?.item_main?.name
      || purchase?.item_details?.item_main?.name_ua
      || order?.items_photos?.find((p) => String(p.id) === String(purchase?.item_id))?.item_name
      || '',
    ).trim() || 'Товар Rozetka'
  }

  function isCrmOrderStatus(name) {
    const normalized = normalizeStatusText(name)
    return ORDER_STATUSES.some((status) => normalizeStatusText(status) === normalized)
  }

  function isLikelyRozetkaStatusLabel(name) {
    const normalized = normalizeStatusText(name)
    if (!normalized) return false
    if (ROZETKA_STATUS_PICKER_LABELS.some((label) => normalizeStatusText(label) === normalized)) {
      return true
    }
    if (Object.keys(ROZETKA_STATUS_EXACT).includes(normalized)) return true
    return !isCrmOrderStatus(name)
  }

  function latestRozetkaStatusEntryFromHistory(history) {
    if (!Array.isArray(history) || !history.length) return null
    return [...history].sort((a, b) => {
      const diff = new Date(a.at).getTime() - new Date(b.at).getTime()
      if (diff !== 0) return diff
      const aNew = isRozetkaNewOrderStatusLabel(a.statusRozetka || a.status) ? 0 : 1
      const bNew = isRozetkaNewOrderStatusLabel(b.statusRozetka || b.status) ? 0 : 1
      return aNew - bNew
    }).at(-1)
  }

  function latestRozetkaStatusFromTx(tx) {
    const entry = latestRozetkaStatusEntryFromHistory(tx?.rozetkaStatusHistory)
    if (entry) {
      const label = String(entry.statusRozetka || entry.status || '').trim()
      if (label) return label
    }
    const fromDetails = String(tx?.rozetkaOrderDetails?.status?.nameUk || '').trim()
    if (fromDetails) return fromDetails
    const current = String(tx?.status || '').trim()
    if (current && isLikelyRozetkaStatusLabel(current)) return current
    return current || null
  }

  function repairRozetkaTransactionStatus(tx) {
    if (!isRozetkaTransaction(tx) || shouldPreserveManualStatus(tx)) return null
    const correct = latestRozetkaStatusFromTx(tx)
    if (!correct || correct === tx.status) return null
    return db().update('orderTransactions', tx.id, { status: correct })
  }

  function repairRozetkaTransactionStatuses(shop) {
    let repaired = 0
    db().list('orderTransactions').forEach((tx) => {
      if (String(tx?.shop || 'Bazario') !== shop) return
      if (repairRozetkaTransactionStatus(tx)) repaired += 1
    })
    return repaired
  }

  function repairRozetkaStoredStatusHistory(tx) {
    if (!isRozetkaTransaction(tx)) return null
    const orderCreated = parseRozetkaDateTime(
      tx.rozetkaOrderDetails?.created || tx.createdAt || tx.date,
      null,
    )
    if (!orderCreated) return null
    const history = Array.isArray(tx.rozetkaStatusHistory) ? tx.rozetkaStatusHistory : []
    if (!history.length) return null

    const fixed = normalizeRozetkaStatusHistory(history.map((entry) => {
      const label = entry.statusRozetka || entry.status || ''
      if (!isRozetkaNewOrderStatusLabel(label)) return entry
      return { ...entry, at: orderCreated }
    }))

    const prev = normalizeRozetkaStatusHistory(history)
    if (JSON.stringify(fixed) === JSON.stringify(prev)) return null

    const latest = latestRozetkaStatusEntryFromHistory(fixed)
    const patch = { rozetkaStatusHistory: fixed }
    if (!shouldPreserveManualStatus(tx)) {
      patch.statusHistory = fixed.map((e) => ({ status: e.status, at: e.at }))
      patch.status = latest?.statusRozetka || latestRozetkaStatusFromTx(tx) || tx.status
    }
    return db().update('orderTransactions', tx.id, patch)
  }

  function repairRozetkaStoredStatusHistories(shop) {
    let repaired = 0
    db().list('orderTransactions').forEach((tx) => {
      if (String(tx?.shop || 'Bazario') !== shop) return
      if (repairRozetkaStoredStatusHistory(tx)) repaired += 1
    })
    return repaired
  }

  function normalizeRozetkaStatusHistory(entries) {
    const sorted = [...entries]
      .filter((e) => e?.at && String(e.statusRozetka || e.status || '').trim())
      .sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime())
    const byKey = new Map()
    sorted.forEach((entry) => {
      const key = String(entry.statusRozetka || entry.status || '').trim().toLowerCase()
      const prev = byKey.get(key)
      if (!prev || new Date(entry.at).getTime() < new Date(prev.at).getTime()) {
        byKey.set(key, entry)
      }
    })
    return [...byKey.values()].sort((a, b) => new Date(a.at).getTime() - new Date(b.at).getTime())
  }

  function isRozetkaNewOrderStatusLabel(name) {
    return /нов(е|ий)\s*замов/.test(normalizeStatusText(name))
  }

  /** Час переходу в статус (не час останнього оновлення замовлення). */
  function rozetkaStatusHistoryAt(entry, order) {
    const orderCreated = orderCreatedFrom(order)
    const statusRozetka = rozetkaStatusLabel(entry)
    const isNewOrder = isRozetkaNewOrderStatusLabel(statusRozetka)

    const specific = entry?.created ?? entry?.created_at ?? entry?.date ?? entry?.timestamp
    if (specific != null && String(specific).trim() !== '') {
      const at = parseRozetkaDateTime(specific, orderCreated)
      if (isNewOrder && new Date(at).getTime() > new Date(orderCreated).getTime()) {
        return orderCreated
      }
      return at
    }

    if (isNewOrder) return orderCreated

    if (entry?.changed != null && String(entry.changed).trim() !== '') {
      return parseRozetkaDateTime(entry.changed, null)
    }

    return null
  }

  function pickFirstValue(...values) {
    return values.map((v) => {
      if (v == null) return ''
      if (typeof v === 'object') {
        const nested = v.city_name || v.name_ua || v.name || v.title || v.name_en
        return String(nested ?? '').trim()
      }
      return String(v).trim()
    }).find(Boolean) || ''
  }

  function deliveryCityLabel(delivery) {
    return pickFirstValue(delivery?.city_name, delivery?.city, delivery?.place_name)
  }

  function rozetkaStatusEntryMeta(entry) {
    const nested = entry?.status && typeof entry.status === 'object' ? entry.status : null
    return {
      statusGroup: entry?.status_group ?? nested?.status_group ?? null,
      statusId: entry?.status_id ?? nested?.id ?? null,
    }
  }

  function rozetkaStatusLabel(entry) {
    const nested = entry?.status && typeof entry.status === 'object' ? entry.status : null
    return String(
      nested?.name_uk
      || nested?.title
      || nested?.name
      || entry?.status_name_uk
      || entry?.name_uk
      || entry?.title
      || entry?.status_title
      || '',
    ).trim()
  }

  function buildRozetkaStatusHistory(order) {
    const orderCreated = orderCreatedFrom(order)
    const history = order?.order_status_history
    if (Array.isArray(history) && history.length) {
      return normalizeRozetkaStatusHistory(history.map((entry) => {
        const statusRozetka = rozetkaStatusLabel(entry)
        const { statusGroup, statusId } = rozetkaStatusEntryMeta(entry)
        const at = isRozetkaNewOrderStatusLabel(statusRozetka)
          ? orderCreated
          : rozetkaStatusHistoryAt(entry, order)
        return {
          statusRozetka,
          status: mapRozetkaStatusName(statusRozetka, statusGroup, statusId),
          at,
        }
      }).filter((entry) => entry.statusRozetka && entry.at))
    }
    const statusRozetka = order?.status_data?.name_uk
      || order?.status_data?.name
      || 'Нове замовлення'
    return [{
      statusRozetka,
      status: mapOrderStatus(order),
      at: orderCreatedFrom(order),
    }]
  }

  function buildStatusHistory(order) {
    return buildRozetkaStatusHistory(order).map((entry) => ({
      status: entry.status,
      at: entry.at,
    }))
  }

  function ttnComment(order) {
    const ttn = String(order?.ttn || order?.delivery?.ttn || '').trim()
    const seller = String(order?.current_seller_comment || '').trim()
    const parts = [ttn ? `ТТН: ${ttn}` : '', seller].filter(Boolean)
    return parts.join(' · ')
  }

  function shouldPreserveTtnComment(existing) {
    if (existing?.ttnCommentManual) return true
    return Boolean(String(existing?.ttnComment ?? '').trim())
  }

  function shouldPreserveManualStatus(existing) {
    return Boolean(existing?.statusManual)
  }

  function clientComment(order) {
    return String(order?.comment || '').trim()
  }

  function buildRozetkaOrderSnapshot(order) {
    const user = order?.user || {}
    const delivery = order?.delivery || {}
    const deliveryService = order?.delivery_service || {}
    const statusData = order?.status_data || {}
    const payment = order?.payment || order?.payment_data || {}
    const purchases = purchasesFromOrder(order).filter(Boolean)

    const items = purchases.map((purchase) => {
      const name = purchaseProductName(purchase, order)
      const article = purchaseArticle(purchase, order) || findUkraineSkuByProductName(name)
      return {
        id: purchase?.id ?? purchase?.item_id ?? null,
        name,
        article,
        quantity: Math.max(1, Number(purchase?.quantity) || 1),
        price: purchaseUnitPrice(purchase, order),
        cost: Number(purchase?.cost) || null,
        status: purchase?.status ?? null,
        cancelled: purchaseLineCancelled(purchase, order),
      }
    })
    const activeItems = items.filter((item) => !item.cancelled)
    const qtyItems = activeItems.length ? activeItems : items

    return {
      orderId: order?.id ?? null,
      created: order?.created || null,
      updated: order?.updated || order?.changed || null,
      status: {
        id: statusData.id ?? order?.status ?? null,
        nameUk: pickFirstValue(statusData.name_uk, statusData.name, currentRozetkaStatusLabel(order)),
        group: order?.status_group ?? null,
      },
      amounts: {
        amount: Number(order?.amount) || 0,
        amountWithDiscount: Number(order?.amount_with_discount) || Number(order?.amount) || 0,
        cost: Number(order?.cost) || 0,
        totalQuantity: Math.max(
          1,
          Number(order?.total_quantity)
          || qtyItems.reduce((sum, item) => sum + item.quantity, 0)
          || 1,
        ),
      },
      client: {
        name: customerName(order),
        phone: customerPhone(order),
        email: pickFirstValue(user.email, user.login, order?.user_email),
      },
      delivery: {
        service: pickFirstValue(
          deliveryService.title,
          deliveryService.name,
          delivery.delivery_service_name,
          delivery.title,
        ),
        method: pickFirstValue(delivery.delivery_method_name, delivery.method_name, delivery.method),
        city: deliveryCityLabel(delivery),
        address: pickFirstValue(delivery.address, delivery.street, delivery.place_street),
        warehouse: pickFirstValue(
          delivery.place_number,
          delivery.warehouse,
          delivery.place_title,
          delivery.place_name,
        ),
        recipientName: pickFirstValue(delivery.recipient_title, delivery.recipient_name),
        recipientPhone: pickFirstValue(delivery.recipient_phone, delivery.phone),
        ttn: pickFirstValue(order?.ttn, delivery.ttn, delivery.barcode),
      },
      payment: {
        type: pickFirstValue(order?.payment_type_title, payment.title, payment.name_uk, payment.name),
        status: pickFirstValue(order?.payment_status_title, order?.payment_status, payment.status_title),
      },
      items,
      comments: {
        client: clientComment(order),
        seller: String(order?.current_seller_comment || '').trim(),
      },
      syncedAt: new Date().toISOString(),
    }
  }

  function syncFromDate() {
    const raw = String(config().syncFromDate || '2026-06-01').trim()
    if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw
    return '2026-06-01'
  }

  function orderMatchesSyncFrom(order) {
    const created = String(order?.created || '').slice(0, 10)
    if (!created) return false
    return created >= syncFromDate()
  }

  function normalizePhone(phone) {
    const digits = String(phone || '').replace(/\D/g, '')
    return digits.slice(-10)
  }

  let ukraineProductNameIndex = null
  let ukraineSkuToPrimaryIndex = null

  function resetUkraineProductNameIndex() {
    ukraineProductNameIndex = null
    ukraineSkuToPrimaryIndex = null
  }

  function normalizeProductNameKey(name) {
    return String(name || '').trim().toLowerCase()
  }

  function ukraineProductDisplayName(product) {
    if (product?.zakupkaProductId) {
      const linked = db().get('products', product.zakupkaProductId)
      if (linked?.name) return String(linked.name).trim()
    }
    return String(product?.name || '').trim()
  }

  function ukraineProductDisplaySku(product) {
    if (product?.zakupkaProductId) {
      const linked = db().get('products', product.zakupkaProductId)
      if (linked?.sku) return String(linked.sku).trim()
    }
    return String(product?.sku || '').trim()
  }

  function buildUkraineProductNameIndex() {
    if (ukraineProductNameIndex) return ukraineProductNameIndex
    ukraineProductNameIndex = new Map()
    db().list('products')
      .filter((product) => product?.catalog === 'ukraine')
      .forEach((product) => {
        const name = normalizeProductNameKey(ukraineProductDisplayName(product))
        const sku = ukraineProductDisplaySku(product)
        if (!name || !sku) return
        if (!ukraineProductNameIndex.has(name)) {
          ukraineProductNameIndex.set(name, sku)
        }
      })
    return ukraineProductNameIndex
  }

  function findUkraineSkuByProductName(name) {
    const key = normalizeProductNameKey(name)
    if (!key) return ''
    return buildUkraineProductNameIndex().get(key) || ''
  }

  function buildUkraineSkuToPrimaryIndex() {
    if (ukraineSkuToPrimaryIndex) return ukraineSkuToPrimaryIndex
    ukraineSkuToPrimaryIndex = new Map()
    db().list('products')
      .filter((product) => product?.catalog === 'ukraine')
      .forEach((product) => {
        const primary = ukraineProductDisplaySku(product)
        if (!primary) return
        ;[primary, String(product?.skuAlt || '').trim()].filter(Boolean).forEach((sku) => {
          const key = String(sku).trim().toLowerCase()
          if (key && !ukraineSkuToPrimaryIndex.has(key)) {
            ukraineSkuToPrimaryIndex.set(key, primary)
          }
        })
      })
    return ukraineSkuToPrimaryIndex
  }

  function findUkrainePrimarySkuByArticle(article) {
    const key = String(article || '').trim().toLowerCase()
    if (!key) return ''
    return buildUkraineSkuToPrimaryIndex().get(key) || ''
  }

  function resolveArticleFromUkraineCatalog(productNames, fallbackArticles = []) {
    const resolved = productNames.map((name, index) => {
      const fromCatalog = findUkraineSkuByProductName(name)
      if (fromCatalog) return fromCatalog
      const fallback = String(fallbackArticles[index] || fallbackArticles[0] || '').trim()
      const fromArticle = findUkrainePrimarySkuByArticle(fallback)
      if (fromArticle) return fromArticle
      return fallback
    }).filter(Boolean)
    return [...new Set(resolved)].join(', ')
  }

  function orderLineSummary(order) {
    const purchases = purchasesFromOrder(order).filter(Boolean)
    const activePurchases = purchases.filter((p) => !purchaseLineCancelled(p, order))
    const qtyPurchases = activePurchases.length ? activePurchases : purchases
    const purchaseRows = purchases.map((p) => ({
      name: purchaseProductName(p, order),
      article: purchaseArticle(p, order),
    })).filter((row) => row.name)
    const names = [...new Set(purchaseRows.map((row) => row.name))]
    const articles = purchaseRows.map((row) => row.article).filter(Boolean)
    const qty = Math.max(
      1,
      Number(order?.total_quantity)
      || qtyPurchases.reduce((sum, p) => sum + Math.max(1, Number(p?.quantity) || 1), 0)
      || 1,
    )
    const lineTotal = Number(order?.amount_with_discount || order?.amount || order?.cost) || 0
    let unitPrice = qty > 0 && lineTotal > 0 ? lineTotal / qty : 0
    if (!unitPrice && qtyPurchases.length === 1) {
      unitPrice = purchaseUnitPrice(qtyPurchases[0], order)
    }

    let productName = names[0] || 'Замовлення Rozetka'
    if (names.length > 1) {
      productName = names.length <= 3
        ? names.join(' · ')
        : `${names.slice(0, 2).join(' · ')} +${names.length - 2}`
    }

    let article = resolveArticleFromUkraineCatalog(names, articles)
    if (!article) article = articles[0] || ''

    return { productName, article, qty, unitPrice, lineTotal: lineTotal || unitPrice * qty, purchases }
  }

  function rozetkaOrderKey(orderId) {
    if (orderId == null || orderId === '') return null
    return String(orderId).trim()
  }

  function mergeRozetkaTransactionGroup(txs) {
    if (!txs.length) return { keeper: null, removed: [] }
    if (txs.length === 1) {
      const only = txs[0]
      const patch = {}
      if (only.rozetkaPurchaseId && only.rozetkaPurchaseId !== 'order') {
        patch.rozetkaPurchaseId = 'order'
      }
      if (only.source !== 'rozetka') patch.source = 'rozetka'
      if (!shouldPreserveManualStatus(only)) {
        const correctStatus = latestRozetkaStatusFromTx(only)
        if (correctStatus && correctStatus !== only.status) patch.status = correctStatus
      }
      if (Object.keys(patch).length) {
        const updated = db().update('orderTransactions', only.id, patch)
        return { keeper: updated, removed: [] }
      }
      return { keeper: only, removed: [] }
    }

    txs.sort(
      (a, b) => new Date(b.updatedAt || b.createdAt).getTime()
        - new Date(a.updatedAt || a.createdAt).getTime(),
    )
    const keeper = txs[0]
    const mergedHistory = normalizeRozetkaStatusHistory(
      txs.flatMap((t) => {
        if (Array.isArray(t.rozetkaStatusHistory) && t.rozetkaStatusHistory.length) {
          return t.rozetkaStatusHistory
        }
        if (t.status && isLikelyRozetkaStatusLabel(t.status)) {
          return [{
            statusRozetka: t.status,
            status: mapStatusToCrm(t.status),
            at: t.updatedAt || t.createdAt || t.date,
          }]
        }
        return []
      }),
    )
    const latest = latestRozetkaStatusEntryFromHistory(mergedHistory)
    const historyForCrm = mergedHistory.length
      ? mergedHistory
      : (Array.isArray(keeper.rozetkaStatusHistory) ? keeper.rozetkaStatusHistory : [])
    const orderId = txs.map((t) => rozetkaOrderKey(t.rozetkaOrderId)).find(Boolean)
      || rozetkaOrderKey(keeper.rozetkaOrderId)

      const mergePatch = {
      rozetkaOrderId: orderId || keeper.rozetkaOrderId,
      rozetkaStatusHistory: historyForCrm,
      rozetkaPurchaseId: 'order',
      source: 'rozetka',
      rozetkaOrderDetails: keeper.rozetkaOrderDetails
        || txs.find((t) => t.rozetkaOrderDetails)?.rozetkaOrderDetails,
    }
    if (!shouldPreserveManualStatus(keeper)) {
      mergePatch.statusHistory = historyForCrm.map((e) => ({ status: e.status, at: e.at }))
      mergePatch.status = latest?.statusRozetka || latestRozetkaStatusFromTx(keeper) || keeper.status
    }
    db().update('orderTransactions', keeper.id, mergePatch)

    const removed = []
    txs.slice(1).forEach((tx) => {
      db().remove('orderTransactions', tx.id)
      removed.push(tx)
    })
    return { keeper, removed }
  }

  function rozetkaOrphanGroupKey(tx) {
    if (!isRozetkaTransaction(tx)) return null
    const phone = normalizePhone(tx.phone)
    const day = txDateKey(tx)
    if (!phone || !day) return null
    const product = String(tx.productName || '').trim().toLowerCase().slice(0, 80)
    return `${phone}|${day}|${product}`
  }

  function findExistingTx(orderId, order, shop) {
    const orderKey = rozetkaOrderKey(orderId)
    const list = db().list('orderTransactions').filter(
      (tx) => String(tx?.shop || 'Bazario') === shop,
    )

    if (orderKey) {
      const byOrder = list.find((tx) => rozetkaOrderKey(tx.rozetkaOrderId) === orderKey)
      if (byOrder) return byOrder
      const legacyByPurchase = list.find(
        (tx) => isRozetkaTransaction(tx) && rozetkaOrderKey(tx.rozetkaPurchaseId) === orderKey,
      )
      if (legacyByPurchase) return legacyByPurchase
    }

    if (!order) return null
    const phone = normalizePhone(customerPhone(order))
    const day = orderCreatedFrom(order).slice(0, 10)
    const { productName } = orderLineSummary(order)
    const productKey = productName.toLowerCase()

    return list.find((tx) => {
      if (isRozetkaTransaction(tx) && rozetkaOrderKey(tx.rozetkaOrderId)) return false
      if (normalizePhone(tx.phone) !== phone || !phone) return false
      if (txDateKey(tx) !== day) return false
      const txProduct = String(tx.productName || '').trim().toLowerCase()
      if (!productKey || !txProduct) return true
      return txProduct === productKey
        || txProduct.includes(productKey)
        || productKey.includes(txProduct)
    }) || null
  }

  /** Злити дублікати одного замовлення Rozetka в один рядок + об'єднати історію статусів. */
  function consolidateRozetkaTransactions() {
    const shop = purgeShop()
    const removed = []
    const removedIds = new Set()
    const list = db().list('orderTransactions').filter(
      (tx) => String(tx?.shop || 'Bazario') === shop,
    )

    const byOrderId = new Map()
    list.forEach((tx) => {
      const key = rozetkaOrderKey(tx.rozetkaOrderId)
      if (!key) return
      if (!byOrderId.has(key)) byOrderId.set(key, [])
      byOrderId.get(key).push(tx)
    })

    byOrderId.forEach((txs) => {
      const { removed: batch } = mergeRozetkaTransactionGroup(txs)
      batch.forEach((tx) => {
        removed.push(tx)
        removedIds.add(tx.id)
      })
    })

    const orphanGroups = new Map()
    list.forEach((tx) => {
      if (removedIds.has(tx.id)) return
      if (rozetkaOrderKey(tx.rozetkaOrderId)) return
      if (!isRozetkaTransaction(tx)) return
      const key = rozetkaOrphanGroupKey(tx)
      if (!key) return
      if (!orphanGroups.has(key)) orphanGroups.set(key, [])
      orphanGroups.get(key).push(tx)
    })

    orphanGroups.forEach((txs) => {
      if (txs.length <= 1) return
      const { removed: batch } = mergeRozetkaTransactionGroup(txs)
      batch.forEach((tx) => {
        removed.push(tx)
        removedIds.add(tx.id)
      })
    })

    repairRozetkaTransactionStatuses(shop)
    repairRozetkaStoredStatusHistories(shop)

    return { removed: removed.length, transactions: removed }
  }

  function dedupeRozetkaTransactions() {
    return consolidateRozetkaTransactions()
  }

  function formatMoneyDisplay(amount) {
    const n = Number(amount)
    if (!Number.isFinite(n)) return ''
    return n.toFixed(4).replace('.', ',')
  }

  function buildOrderTxPayload(order, shop) {
    const { productName, article, qty, unitPrice, lineTotal } = orderLineSummary(order)
    const safeUnit = Number.isFinite(unitPrice) && unitPrice > 0 ? unitPrice : 0
    const rozetkaStatusHistory = buildRozetkaStatusHistory(order)
    const latestEntry = latestRozetkaStatusEntryFromHistory(rozetkaStatusHistory)
    const statusHistory = rozetkaStatusHistory.map((entry) => ({
      status: entry.status,
      at: entry.at,
    }))
    const dateIso = orderCreatedFrom(order)
    const dateLocal = orderLocalDateKey(order)
    const status = latestEntry?.statusRozetka || currentRozetkaStatusLabel(order)
    const rozetkaOrderDetails = buildRozetkaOrderSnapshot(order)
    if (rozetkaOrderDetails?.status) {
      rozetkaOrderDetails.status.nameUk = status
    }

    return {
      shop,
      source: 'rozetka',
      rozetkaOrderId: order.id,
      rozetkaPurchaseId: 'order',
      rozetkaStatusId: order?.status_data?.id ?? order?.status ?? null,
      rozetkaStatusHistory,
      rozetkaOrderDetails,
      date: dateIso,
      dateLocal,
      createdAt: dateIso,
      firstName: customerName(order),
      productName,
      phone: customerPhone(order),
      article,
      qty,
      unitPrice: safeUnit,
      unitPriceDisplay: safeUnit ? formatMoneyDisplay(safeUnit) : '',
      amount: lineTotal,
      amountDisplay: lineTotal ? formatMoneyDisplay(lineTotal) : '',
      status,
      statusHistory,
      delivery: mapDelivery(order),
      ttnComment: ttnComment(order),
      clientComment: clientComment(order),
    }
  }

  function purchaseUnitPrice(purchase, order) {
    if (purchase) {
      const direct = Number(purchase.price)
      if (Number.isFinite(direct) && direct > 0) return direct
      const cost = Number(purchase.cost)
      const qty = Math.max(1, Number(purchase.quantity) || 1)
      if (Number.isFinite(cost) && cost > 0) return cost / qty
    }
    const orderAmount = Number(order?.amount)
    const orderQty = Math.max(1, Number(order?.total_quantity) || 1)
    if (Number.isFinite(orderAmount) && orderAmount > 0) return orderAmount / orderQty
    return 0
  }

  function purchasesFromOrder(order) {
    const purchases = Array.isArray(order?.purchases) ? [...order.purchases] : []
    if (purchases.length) return purchases
    if (Array.isArray(order?.items_photos) && order.items_photos.length) {
      return order.items_photos.map((photo) => ({
        id: `photo-${photo.id}`,
        item_id: photo.id,
        item_name: photo.item_name,
        quantity: 1,
        price: order?.amount,
      }))
    }
    return [null]
  }

  async function fetchAllOrders(token) {
    const expand = 'user,delivery,delivery_service,purchases,status_data,order_status_history,item_details,payment,payment_data'
    const createdFrom = syncFromDate()
    const orders = []
    let page = 1
    let pageCount = 1

    while (page <= pageCount) {
      const qs = new URLSearchParams({
        page: String(page),
        sort: '-created',
        types: '1',
        created_from: createdFrom,
        expand,
      })
      const content = await apiRequest(`/orders/search?${qs}`, { token })
      const batch = content?.orders || []
      orders.push(...batch)
      pageCount = Number(content?._meta?.pageCount) || 1
      page += 1
      if (!batch.length) break
    }

    return orders
  }

  async function enrichOrderDetails(order, token) {
    if (Array.isArray(order.purchases) && order.purchases.length) return order
    try {
      const expand = 'user,delivery,delivery_service,purchases,status_data,order_status_history,item_details,payment,payment_data'
      const detail = await apiRequest(`/orders/${order.id}?expand=${expand}`, { token })
      return { ...order, ...detail }
    } catch {
      return order
    }
  }

  function orderTxPayloadChanged(existing, patch, { skipTtn = false, skipStatus = false } = {}) {
    const keys = [
      'status', 'firstName', 'phone', 'article', 'qty', 'unitPrice', 'amount',
      'delivery', 'ttnComment', 'clientComment', 'date', 'dateLocal', 'productName',
      'rozetkaStatusHistory', 'rozetkaOrderDetails', 'statusHistory',
    ]
    let compareKeys = keys
    if (skipTtn) compareKeys = compareKeys.filter((key) => key !== 'ttnComment')
    if (skipStatus) compareKeys = compareKeys.filter((key) => key !== 'status' && key !== 'statusHistory')
    return compareKeys.some((key) => {
      const left = existing?.[key]
      const right = patch?.[key]
      if (Array.isArray(left) || Array.isArray(right) || (left && typeof left === 'object') || (right && typeof right === 'object')) {
        return JSON.stringify(left ?? null) !== JSON.stringify(right ?? null)
      }
      return String(left ?? '') !== String(right ?? '')
    })
  }

  function upsertOrderTransaction(order, shop) {
    const existing = findExistingTx(order.id, order, shop)
    const payload = buildOrderTxPayload(order, shop)
    const orderKey = rozetkaOrderKey(order.id)

    if (existing) {
      const historyRows = payload.rozetkaStatusHistory?.length
        ? payload.rozetkaStatusHistory
        : (Array.isArray(existing.rozetkaStatusHistory) ? existing.rozetkaStatusHistory : [])
      const latest = latestRozetkaStatusEntryFromHistory(historyRows)
      const preserveTtn = shouldPreserveTtnComment(existing)
      const preserveStatus = shouldPreserveManualStatus(existing)
      const patch = {
        ...payload,
        rozetkaOrderId: orderKey,
        rozetkaPurchaseId: 'order',
        rozetkaStatusHistory: historyRows,
        createdAt: existing.createdAt || payload.createdAt,
      }
      if (preserveStatus) {
        delete patch.status
        delete patch.statusHistory
      } else {
        patch.statusHistory = historyRows.map((e) => ({ status: e.status, at: e.at }))
        patch.status = latest?.statusRozetka || payload.status
      }
      if (preserveTtn) delete patch.ttnComment
      else patch.ttnComment = ttnComment(order)
      if (!orderTxPayloadChanged(existing, patch, { skipTtn: preserveTtn, skipStatus: preserveStatus })) {
        return { action: 'unchanged', tx: existing }
      }
      const updated = db().update('orderTransactions', existing.id, patch)
      return { action: 'updated', tx: updated }
    }

    const created = db().create('orderTransactions', payload)
    return { action: 'created', tx: created }
  }

  async function syncOrders({ silent = false } = {}) {
    if (!isEnabled()) {
      throw new Error('Rozetka API не налаштовано (rozetka-config.js)')
    }
    if (state.syncing) {
      return state.lastResult || { created: 0, updated: 0, total: 0, skipped: true }
    }

    state.syncing = true
    const result = { created: 0, updated: 0, total: 0, errors: [], changed: [] }

    try {
      let token = await login()
      let orders
      try {
        orders = await fetchAllOrders(token)
      } catch (err) {
        if (err.code === 6001 || /session|token|credentials/i.test(err.message)) {
          clearTokenCache()
          token = await login()
          orders = await fetchAllOrders(token)
        } else {
          throw err
        }
      }

      const shop = String(config().shop || 'Bazario').trim() || 'Bazario'
      resetUkraineProductNameIndex()
      consolidateRozetkaTransactions()

      for (const rawOrder of orders) {
        try {
          if (!orderMatchesSyncFrom(rawOrder)) continue
          const order = await enrichOrderDetails(rawOrder, token)
          if (!orderMatchesSyncFrom(order)) continue
          result.total += 1

          const { action, tx } = upsertOrderTransaction(order, shop)
          if (action === 'created') {
            result.created += 1
            if (tx) result.changed.push(tx)
          } else if (action === 'updated') {
            result.updated += 1
            if (tx) result.changed.push(tx)
          }
        } catch (err) {
          result.errors.push({ orderId: rawOrder?.id, message: err.message || String(err) })
        }
      }

      writeLastSyncAt(new Date().toISOString())
      consolidateRozetkaTransactions()
      repairRozetkaStoredStatusHistories(shop)
      state.lastResult = result
      if (typeof state.onSyncComplete === 'function') {
        state.onSyncComplete(result, { silent })
      }
      return result
    } finally {
      state.syncing = false
    }
  }

  function formatSyncTime(ts) {
    if (!ts) return '—'
    try {
      return new Date(ts).toLocaleString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return '—'
    }
  }

  function txDateKey(tx) {
    if (tx?.dateLocal) {
      const local = String(tx.dateLocal).trim().slice(0, 10)
      if (/^\d{4}-\d{2}-\d{2}$/.test(local)) return local
    }
    return rozetkaLocalDateKey(tx?.date || tx?.createdAt)
  }

  function isRozetkaTransaction(tx) {
    return tx?.source === 'rozetka' || tx?.rozetkaOrderId != null
  }

  function purgeShop() {
    return String(config().shop || 'Bazario').trim() || 'Bazario'
  }

  /** Видалити Rozetka-транзакції старіші за syncFromDate; також «31.05» з UTC-зсувом для замовлень з 01.06. */
  function purgeBeforeSyncFrom() {
    const cutoff = syncFromDate()
    const shop = purgeShop()
    const toRemove = db().list('orderTransactions').filter((tx) => {
      if (String(tx?.shop || 'Bazario') !== shop) return false
      const day = txDateKey(tx)
      if (!day || day >= cutoff) return false
      if (isRozetkaTransaction(tx)) return true
      // Ручні записи до cutoff не чіпаємо
      return false
    })
    toRemove.forEach((tx) => db().remove('orderTransactions', tx.id))
    return { removed: toRemove.length, transactions: toRemove }
  }

  function autoSyncIntervalMs() {
    const cfg = config()
    const seconds = Number(cfg.autoSyncSeconds)
    if (Number.isFinite(seconds) && seconds > 0) return seconds * 1000
    const minutes = Number(cfg.autoSyncMinutes)
    if (Number.isFinite(minutes) && minutes > 0) return minutes * 60 * 1000
    return isEnabled() ? 5000 : 0
  }

  function scheduleAutoSync() {
    clearInterval(state.timer)
    const intervalMs = autoSyncIntervalMs()
    if (!intervalMs || !isEnabled()) return
    state.timer = setInterval(() => {
      syncOrders({ silent: true }).catch((err) => {
        console.warn('Rozetka auto-sync:', err)
      })
    }, intervalMs)
  }

  function init(options = {}) {
    state.onSyncComplete = options.onSyncComplete || null
    state.lastSyncAt = readLastSyncAt()

    const purge = purgeBeforeSyncFrom()
    if (purge.removed && typeof options.onPurge === 'function') {
      options.onPurge(purge)
    }

    const dedupe = consolidateRozetkaTransactions()
    if (dedupe.removed && typeof options.onPurge === 'function') {
      options.onPurge(dedupe)
    }

    scheduleAutoSync()
    const runInitialSync = () => {
      if (isEnabled() && autoSyncIntervalMs() > 0) {
        syncOrders({ silent: true }).catch((err) => {
          console.warn('Rozetka initial sync:', err)
        })
      }
    }
    if (options.deferInitialSync) {
      state.runInitialSync = runInitialSync
    } else {
      runInitialSync()
    }
    return true
  }

  function runInitialSyncIfDeferred() {
    if (typeof state.runInitialSync !== 'function') return
    const run = state.runInitialSync
    state.runInitialSync = null
    run()
  }

  return {
    init,
    isEnabled,
    isSyncing: () => state.syncing,
    syncOrders,
    runInitialSyncIfDeferred,
    purgeBeforeSyncFrom,
    consolidateRozetkaTransactions,
    dedupeRozetkaTransactions,
    getStatusPickerLabels,
    mapStatusToCrm,
    isRozetkaInProcessingLabel,
    latestRozetkaStatusFromTx,
    latestRozetkaStatusEntryFromHistory,
    isRozetkaCancelledByBuyerLabel,
    purchaseLineCancelled,
    isRozetkaTransaction,
    getLastSyncAt: readLastSyncAt,
    formatSyncTime,
    getLastResult: () => state.lastResult,
  }
})()

window.BazarioRozetkaSync = BazarioRozetkaSync

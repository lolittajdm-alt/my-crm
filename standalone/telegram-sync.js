/**
 * Bazario — повідомлення з Telegram у сповіщення CRM.
 * Режими:
 * - bot: Bot API + getUpdates (бот має бути в чаті)
 * - user: ваш акаунт Telegram (групи, де ви не адмін; сервер + telegram-user.local.json)
 */
const BazarioTelegramSync = (() => {
  const LAST_OFFSET_KEY = 'telegramLastUpdateId'
  const LAST_USER_POLL_KEY = 'telegramLastUserPollAt'

  function db() {
    return window.BazarioDB
  }

  const state = {
    polling: false,
    pollTimer: null,
    lastResult: null,
    _inFlight: false,
  }

  function config() {
    return window.BAZARIO_TELEGRAM || {}
  }

  function syncMode() {
    const mode = String(config().mode || 'bot').trim().toLowerCase()
    return mode === 'user' ? 'user' : 'bot'
  }

  function targetChatIds() {
    const raw = config().chatIds ?? config().chatId
    const list = Array.isArray(raw) ? raw : (raw == null || raw === '' ? [] : [raw])
    return list
      .map((id) => String(id).trim())
      .filter(Boolean)
  }

  function isEnabled() {
    const c = config()
    if (c.enabled === false) return false
    if (syncMode() === 'user') return c.userEnabled !== false
    return Boolean(String(c.botToken || '').trim() && targetChatIds().length)
  }

  function chatIdMatches(chat) {
    if (!chat?.id) return false
    const targets = targetChatIds()
    if (!targets.length) return false
    return targets.some((target) => String(chat.id) === String(target))
  }

  async function apiGet(method, params = {}) {
    const token = String(config().botToken || '').trim()
    if (!token) throw new Error('Telegram: не вказано botToken')

    const basePath = String(config().apiBase || '/api/telegram').replace(/\/$/, '')
    const base = window.BazarioApiBase?.resolve?.(basePath) || basePath
    const qs = new URLSearchParams()
    Object.entries(params).forEach(([key, val]) => {
      if (val == null || val === '') return
      qs.set(key, String(val))
    })
    const suffix = qs.toString() ? `?${qs}` : ''
    const res = await fetch(`${base}/${method}${suffix}`, {
      headers: window.BazarioApiBase?.headers?.({
        Accept: 'application/json',
        'X-Telegram-Bot-Token': token,
      }) || {
        Accept: 'application/json',
        'X-Telegram-Bot-Token': token,
      },
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.ok === false) {
      const msg = data.description || data.error || `HTTP ${res.status}`
      throw new Error(`Telegram API: ${msg}`)
    }
    return data.result
  }

  function getSettingsTelegram() {
    const raw = db().getSettings()?.telegram
    return raw && typeof raw === 'object' ? raw : {}
  }

  function saveSettingsTelegram(patch) {
    const prev = db().getSettings() || {}
    db().write('settings', {
      ...prev,
      telegram: { ...getSettingsTelegram(), ...patch },
    })
  }

  function normalizeMessage(message) {
    if (!message?.message_id || !message.chat) return null
    if (!chatIdMatches(message.chat)) return null

    const from = message.from || {}
    const fromName = [from.first_name, from.last_name].filter(Boolean).join(' ').trim()
      || from.username
      || message.chat.title
      || 'Telegram'

    const text = String(
      message.text
      || message.caption
      || (message.photo ? '📷 Фото' : '')
      || (message.document ? '📎 Файл' : '')
      || (message.voice ? '🎤 Голосове' : '')
      || (message.sticker ? 'Стікер' : '')
      || '—',
    ).trim().slice(0, 500)

    const dateIso = message.date
      ? new Date(message.date * 1000).toISOString()
      : new Date().toISOString()

    return {
      id: `tg_${message.chat.id}_${message.message_id}`,
      messageId: message.message_id,
      chatId: message.chat.id,
      chatTitle: message.chat.title || '',
      fromName,
      username: from.username || '',
      text,
      date: dateIso,
      createdAt: dateIso,
      source: 'bot',
    }
  }

  function normalizeUserMessage(msg) {
    if (!msg?.id) return null
    return {
      ...msg,
      source: msg.source || 'user',
    }
  }

  function upsertMessages(incoming) {
    const list = Array.isArray(getSettingsTelegram().messages) ? [...getSettingsTelegram().messages] : []
    const byId = new Map(list.map((m) => [m.id, m]))
    const newMessages = []
    let added = 0

    incoming.forEach((msg) => {
      if (!msg?.id) return
      if (!byId.has(msg.id)) {
        added += 1
        newMessages.push(msg)
      }
      byId.set(msg.id, { ...byId.get(msg.id), ...msg })
    })

    const merged = [...byId.values()]
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    const max = Math.max(20, Number(config().maxStoredMessages) || 80)
    const trimmed = merged.slice(0, max)

    saveSettingsTelegram({ messages: trimmed })
    return { added, total: trimmed.length, newMessages }
  }

  async function fetchBotUpdates() {
    const offset = Number(getSettingsTelegram()[LAST_OFFSET_KEY] || 0) + 1
    const updates = await apiGet('getUpdates', {
      offset,
      timeout: 0,
      allowed_updates: JSON.stringify(['message']),
    })

    if (!Array.isArray(updates) || !updates.length) {
      return { added: 0, updates: 0, changed: [] }
    }

    let maxUpdateId = Number(getSettingsTelegram()[LAST_OFFSET_KEY] || 0)
    const messages = []

    updates.forEach((entry) => {
      if (entry.update_id > maxUpdateId) maxUpdateId = entry.update_id
      const normalized = normalizeMessage(entry.message)
      if (normalized) messages.push(normalized)
    })

    saveSettingsTelegram({ [LAST_OFFSET_KEY]: maxUpdateId })
    const { added, newMessages } = upsertMessages(messages)

    return {
      added,
      updates: updates.length,
      changed: newMessages,
    }
  }

  async function fetchUserUpdates() {
    const basePath = String(config().userApiBase || '/api/telegram-user').replace(/\/$/, '')
    const base = window.BazarioApiBase?.resolve?.(basePath) || basePath
    const settings = getSettingsTelegram()
    let after = String(settings[LAST_USER_POLL_KEY] || '').trim()
    const localCount = Array.isArray(settings.messages) ? settings.messages.length : 0
    // Перший опит або «зламаний» стан після старої версії — забираємо буфер з сервера.
    if (!after || (localCount === 0 && after)) {
      after = ''
    }
    const qs = after ? `?after=${encodeURIComponent(after)}` : ''
    const res = await fetch(`${base}/poll${qs}`, {
      headers: window.BazarioApiBase?.headers?.({ Accept: 'application/json' }) || { Accept: 'application/json' },
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok || data.ok === false) {
      const msg = data.error || data.description || `HTTP ${res.status}`
      throw new Error(`Telegram User: ${msg}`)
    }
    if (!data.authorized) {
      throw new Error('Telegram User: увійдіть через node tools/telegram-user-auth.mjs')
    }

    const messages = (Array.isArray(data.messages) ? data.messages : [])
      .map(normalizeUserMessage)
      .filter(Boolean)

    if (messages.length) {
      const latest = messages.reduce((best, msg) => {
        const ms = new Date(msg.date || 0).getTime()
        const bestMs = new Date(best || 0).getTime()
        return ms > bestMs ? msg.date : best
      }, after)
      if (latest) saveSettingsTelegram({ [LAST_USER_POLL_KEY]: latest })
    }

    const { added, newMessages } = upsertMessages(messages)
    return {
      added,
      updates: messages.length,
      changed: newMessages,
    }
  }

  async function fetchUpdates() {
    return syncMode() === 'user' ? fetchUserUpdates() : fetchBotUpdates()
  }

  function stopPolling() {
    if (state.pollTimer) clearInterval(state.pollTimer)
    state.pollTimer = null
    state.polling = false
  }

  function pollIntervalMs() {
    const sec = Number(config().pollIntervalSeconds)
    if (Number.isFinite(sec) && sec > 0) return sec * 1000
    return 8000
  }

  function startPolling() {
    stopPolling()
    if (!isEnabled()) return
    state.polling = true
    const tick = () => {
      pollOnce({ silent: true }).catch(() => {})
    }
    state.pollTimer = setInterval(tick, pollIntervalMs())
  }

  async function pollOnce({ silent = false } = {}) {
    if (!isEnabled()) return { skipped: true, added: 0, changed: [] }
    if (state.polling && state._inFlight) return state.lastResult || { skipped: true }
    state._inFlight = true
    try {
      const result = await fetchUpdates()
      state.lastResult = result
      return result
    } finally {
      state._inFlight = false
    }
  }

  function init({ onSyncComplete, deferInitialSync = false } = {}) {
    state.onSyncComplete = typeof onSyncComplete === 'function' ? onSyncComplete : null
    if (!isEnabled()) return

    const run = () => {
      pollOnce({ silent: false })
        .then((result) => state.onSyncComplete?.(result, { silent: false }))
        .catch((err) => {
          if (!deferInitialSync) console.warn('Telegram sync:', err.message)
        })
    }

    if (deferInitialSync) {
      setTimeout(run, 1200)
    } else {
      run()
    }
    startPolling()
  }

  return {
    init,
    isEnabled,
    pollOnce,
    startPolling,
    stopPolling,
    targetChatIds,
    syncMode,
  }
})()

window.BazarioTelegramSync = BazarioTelegramSync

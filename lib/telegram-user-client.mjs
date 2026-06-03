import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..')
export const TELEGRAM_USER_CONFIG_PATH = join(ROOT, 'telegram-user.local.json')

const MAX_BUFFER = 300

/** @type {import('telegram').TelegramClient | null} */
let client = null
/** @type {Promise<import('telegram').TelegramClient | null> | null} */
let initPromise = null
/** @type {Array<object>} */
const messageBuffer = []
let lastError = null
let authorized = false
let watchedChatCount = 0

function normalizeChatIds(raw) {
  const list = Array.isArray(raw) ? raw : (raw == null || raw === '' ? [] : [raw])
  return new Set(
    list
      .map((id) => String(id).trim())
      .filter(Boolean),
  )
}

function chatIdMatchVariants(id) {
  const raw = String(id ?? '').trim()
  if (!raw) return new Set()
  const variants = new Set([raw])
  if (raw.startsWith('-100')) {
    variants.add(raw.slice(4))
    variants.add(`-${raw.slice(4)}`)
  } else if (raw.startsWith('-')) {
    const digits = raw.slice(1)
    variants.add(digits)
    variants.add(`-100${digits}`)
  } else {
    variants.add(`-${raw}`)
    variants.add(`-100${raw}`)
  }
  return variants
}

function watchChatMatches(watchIds, chatId) {
  if (!watchIds.size) return true
  const msgVariants = chatIdMatchVariants(chatId)
  for (const watchId of watchIds) {
    const watchVariants = chatIdMatchVariants(watchId)
    for (const v of msgVariants) {
      if (watchVariants.has(v)) return true
    }
  }
  return false
}

function isGroupEntity(entity) {
  if (!entity) return false
  const cls = entity.className || entity.constructor?.name || ''
  if (cls === 'Chat') return true
  if (cls === 'Channel' && !entity.broadcast) return true
  return false
}

async function resolveChatMeta(msg, tgClient) {
  let chatId = ''
  let chatTitle = ''
  let username = ''

  try {
    const { utils } = await import('telegram/index.js')
    if (msg?.peerId) {
      chatId = String(utils.getPeerId(msg.peerId))
    }
  } catch {
    // ignore
  }

  try {
    const chat = typeof msg.getChat === 'function' ? await msg.getChat() : (msg.chat || null)
    if (chat) {
      if (!chatId && chat.id != null) {
        chatId = chat.className === 'Channel'
          ? `-100${chat.id}`
          : (chat.className === 'Chat' ? `-${chat.id}` : String(chat.id))
      }
      chatTitle = String(chat.title || chat.firstName || '').trim()
      username = String(chat.username || '').trim()
    }
  } catch {
    // ignore
  }

  if (!chatId && msg.chatId != null) chatId = String(msg.chatId)

  return { chatId, chatTitle, username }
}

async function normalizeGramMessage(msg, tgClient) {
  if (!msg?.id) return null
  const { chatId, chatTitle, username } = await resolveChatMeta(msg, tgClient)
  if (!chatId) return null

  let fromName = chatTitle || 'Telegram'
  try {
    const sender = typeof msg.getSender === 'function' ? await msg.getSender() : (msg.sender || null)
    if (sender) {
      fromName = [sender.firstName, sender.lastName].filter(Boolean).join(' ').trim()
        || sender.username
        || fromName
    }
  } catch {
    // ignore
  }

  const text = String(
    msg.message
    || (msg.photo ? '📷 Фото' : '')
    || (msg.document ? '📎 Файл' : '')
    || (msg.voice ? '🎤 Голосове' : '')
    || (msg.sticker ? 'Стікер' : '')
    || '—',
  ).trim().slice(0, 500)

  const ts = msg.date instanceof Date ? msg.date : new Date((msg.date || 0) * 1000)
  const dateIso = Number.isNaN(ts.getTime()) ? new Date().toISOString() : ts.toISOString()

  return {
    id: `tg_${chatId}_${msg.id}`,
    messageId: msg.id,
    chatId,
    chatTitle,
    fromName,
    username: username || '',
    text,
    date: dateIso,
    createdAt: dateIso,
    source: 'user',
  }
}

function pushMessage(message) {
  if (!message?.id) return
  if (messageBuffer.some((m) => m.id === message.id)) return
  messageBuffer.unshift(message)
  if (messageBuffer.length > MAX_BUFFER) messageBuffer.length = MAX_BUFFER
}

export async function loadGramJs() {
  const telegram = await import('telegram/index.js')
  const sessions = await import('telegram/sessions/index.js')
  const events = await import('telegram/events/index.js')
  return {
    TelegramClient: telegram.TelegramClient,
    StringSession: sessions.StringSession,
    NewMessage: events.NewMessage,
    Api: telegram.Api,
  }
}

export async function loadTelegramUserConfig() {
  const envSession = String(process.env.TELEGRAM_SESSION || '').trim()
  const envApiId = Number(process.env.TELEGRAM_API_ID || 0)
  const envApiHash = String(process.env.TELEGRAM_API_HASH || '').trim()
  if (envSession && envApiId && envApiHash) {
    let chatIds = []
    const rawChatIds = String(process.env.TELEGRAM_CHAT_IDS || '').trim()
    if (rawChatIds) {
      try {
        const parsed = JSON.parse(rawChatIds)
        chatIds = Array.isArray(parsed) ? parsed : [parsed]
      } catch {
        chatIds = rawChatIds.split(',').map((id) => id.trim()).filter(Boolean)
      }
    }
    return {
      apiId: envApiId,
      apiHash: envApiHash,
      session: envSession,
      chatIds,
    }
  }

  try {
    const raw = await readFile(TELEGRAM_USER_CONFIG_PATH, 'utf8')
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch {
    return null
  }
}

export async function saveTelegramUserConfig(patch) {
  const prev = (await loadTelegramUserConfig()) || {}
  const next = { ...prev, ...patch }
  await writeFile(TELEGRAM_USER_CONFIG_PATH, `${JSON.stringify(next, null, 2)}\n`, 'utf8')
  return next
}

export function getTelegramUserStatus() {
  return {
    ok: true,
    authorized,
    connected: Boolean(client?.connected),
    watchedChatCount,
    bufferedMessages: messageBuffer.length,
    lastError,
    configPath: TELEGRAM_USER_CONFIG_PATH,
  }
}

export function pollTelegramUserMessages(afterIso = '') {
  const afterMs = afterIso ? new Date(afterIso).getTime() : 0
  const messages = messageBuffer
    .filter((msg) => {
      if (!afterMs) return true
      const ms = new Date(msg.date || 0).getTime()
      return Number.isFinite(ms) && ms > afterMs
    })
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
  return { messages, authorized, lastError }
}

export async function listTelegramUserChats() {
  const tgClient = await ensureTelegramUserClient()
  if (!tgClient) throw new Error(lastError || 'telegram_user_not_ready')

  const dialogs = await tgClient.getDialogs({ limit: 200 })
  return dialogs
    .map((dialog) => {
      const entity = dialog.entity
      if (!entity || !isGroupEntity(entity)) return null
      let chatId = entity.id != null ? String(entity.id) : ''
      if (entity.className === 'Channel') chatId = `-100${entity.id}`
      else if (entity.className === 'Chat') chatId = `-${entity.id}`
      return {
        chatId,
        title: String(entity.title || entity.firstName || '').trim(),
        username: String(entity.username || '').trim(),
        unreadCount: dialog.unreadCount || 0,
        isGroup: entity.className === 'Chat' || (entity.className === 'Channel' && !entity.broadcast),
        isChannel: entity.className === 'Channel' && Boolean(entity.broadcast),
      }
    })
    .filter(Boolean)
}

export async function ensureTelegramUserClient({ force = false } = {}) {
  if (!force && client?.connected) return client
  if (!force && initPromise) return initPromise

  initPromise = (async () => {
    lastError = null
    authorized = false
    watchedChatCount = 0

    const cfg = await loadTelegramUserConfig()
    if (!cfg?.apiId || !cfg?.apiHash || !cfg?.session) {
      lastError = 'missing_user_config'
      return null
    }

    let TelegramClient
    let StringSession
    let NewMessage
    try {
      ;({ TelegramClient, StringSession, NewMessage } = await loadGramJs())
    } catch (err) {
      lastError = 'telegram_package_missing'
      throw new Error('Встановіть залежність: npm install telegram')
    }

    if (client) {
      try { await client.disconnect() } catch { /* ignore */ }
      client = null
    }

    client = new TelegramClient(
      new StringSession(String(cfg.session)),
      Number(cfg.apiId),
      String(cfg.apiHash),
      { connectionRetries: 5 },
    )

    await client.connect()
    authorized = await client.isUserAuthorized()
    if (!authorized) {
      lastError = 'session_not_authorized'
      return null
    }

    const watchIds = normalizeChatIds(cfg.chatIds)
    watchedChatCount = watchIds.size

    client.addEventHandler(async (event) => {
      try {
        if (event.isPrivate) return
        const normalized = await normalizeGramMessage(event.message, client)
        if (!normalized) return
        if (!watchChatMatches(watchIds, normalized.chatId)) return
        pushMessage(normalized)
      } catch (err) {
        lastError = err.message || 'message_handler_error'
      }
    }, new NewMessage({}))

    return client
  })().catch((err) => {
    lastError = err.message || 'telegram_user_init_failed'
    return null
  })

  return initPromise
}

export async function createTelegramUserAuthClient() {
  const cfg = await loadTelegramUserConfig()
  if (!cfg?.apiId || !cfg?.apiHash) {
    throw new Error('У telegram-user.local.json потрібні apiId та apiHash (my.telegram.org)')
  }

  const { TelegramClient, StringSession } = await loadGramJs()
  const tgClient = new TelegramClient(
    new StringSession(''),
    Number(cfg.apiId),
    String(cfg.apiHash),
    {
      connectionRetries: 5,
      /** Авто-очікування при FLOOD_WAIT до 10 хв (напр. 278 сек при auth.SendCode) */
      floodSleepThreshold: 600,
    },
  )
  await tgClient.connect()
  return tgClient
}

export async function persistTelegramUserSession(session) {
  await saveTelegramUserConfig({ session })
  initPromise = null
  client = null
  return ensureTelegramUserClient({ force: true })
}

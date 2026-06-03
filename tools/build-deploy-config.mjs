#!/usr/bin/env node
/**
 * Генерує конфіги для деплою з env (Render / Railway).
 * Локально не запускається — використовуйте *.example.js вручну.
 */
import { writeFile } from 'fs/promises'

const root = new URL('../standalone/', import.meta.url)

function escJs(value) {
  return String(value ?? '')
    .trim()
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r/g, '\\r')
    .replace(/\n/g, '\\n')
}

async function writeApiOrigin() {
  const origin = String(process.env.BAZARIO_PUBLIC_URL || '').trim()
  const key = String(process.env.BAZARIO_API_KEY || '').trim()
  if (!origin && !key) return

  const content = `/** Auto-generated at deploy */
window.BAZARIO_API_ORIGIN = '${escJs(origin)}'
window.BAZARIO_API_KEY = '${escJs(key)}'
`
  await writeFile(new URL('api-origin.js', root), content, 'utf8')
  console.log('Wrote standalone/api-origin.js')
}

async function writeTelegramConfig() {
  const mode = String(process.env.TELEGRAM_MODE || 'user').trim()
  if (!process.env.TELEGRAM_MODE && !process.env.TELEGRAM_BOT_TOKEN) return

  const content = `/** Auto-generated at deploy */
window.BAZARIO_TELEGRAM = {
  mode: '${escJs(mode)}',
  botToken: '${escJs(process.env.TELEGRAM_BOT_TOKEN || '')}',
  chatIds: ${JSON.stringify(parseList(process.env.TELEGRAM_BOT_CHAT_IDS))},
  chatId: '',
  userApiBase: '/api/telegram-user',
  userEnabled: true,
  apiBase: '/api/telegram',
  pollIntervalSeconds: 8,
  maxStoredMessages: 80,
  enabled: true,
}
`
  await writeFile(new URL('telegram-config.js', root), content, 'utf8')
  console.log('Wrote standalone/telegram-config.js')
}

async function writeRozetkaConfig() {
  if (!process.env.ROZETKA_API_TOKEN && !process.env.ROZETKA_USERNAME) return

  const content = `/** Auto-generated at deploy */
window.BAZARIO_ROZETKA = {
  apiToken: '${escJs(process.env.ROZETKA_API_TOKEN || '')}',
  username: '${escJs(process.env.ROZETKA_USERNAME || '')}',
  password: '${escJs(process.env.ROZETKA_PASSWORD || '')}',
  shop: '${escJs(process.env.ROZETKA_SHOP || 'Bazario')}',
  apiBase: '/api/rozetka',
  syncFromDate: '${escJs(process.env.ROZETKA_SYNC_FROM || '2026-06-01')}',
  autoSyncMinutes: ${Number(process.env.ROZETKA_AUTO_SYNC_MINUTES || 15) || 15},
}
`
  await writeFile(new URL('rozetka-config.js', root), content, 'utf8')
  console.log('Wrote standalone/rozetka-config.js')
}

function parseList(raw) {
  const s = String(raw || '').trim()
  if (!s) return []
  try {
    const parsed = JSON.parse(s)
    return Array.isArray(parsed) ? parsed : [parsed]
  } catch {
    return s.split(',').map((v) => v.trim()).filter(Boolean)
  }
}

await writeApiOrigin()
await writeTelegramConfig()
await writeRozetkaConfig()
console.log('Deploy config build done.')

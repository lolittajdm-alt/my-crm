#!/usr/bin/env node
/**
 * Список груп/каналів вашого акаунта (для chatIds у telegram-user.local.json).
 */
import {
  ensureTelegramUserClient,
  listTelegramUserChats,
  TELEGRAM_USER_CONFIG_PATH,
} from '../lib/telegram-user-client.mjs'

async function main() {
  await ensureTelegramUserClient()
  const chats = await listTelegramUserChats()
  const groups = chats.filter((c) => c.isGroup)
  const channels = chats.filter((c) => c.isChannel)

  console.log(`Конфіг: ${TELEGRAM_USER_CONFIG_PATH}\n`)
  console.log('Групи (скопіюйте chatId у chatIds):')
  if (!groups.length) console.log('  — немає')
  groups.forEach((c) => {
    console.log(`  ${c.chatId}\t${c.title || '—'}${c.username ? ` (@${c.username})` : ''}`)
  })

  console.log('\nКанали:')
  if (!channels.length) console.log('  — немає')
  channels.forEach((c) => {
    console.log(`  ${c.chatId}\t${c.title || '—'}${c.username ? ` (@${c.username})` : ''}`)
  })

  console.log('\nПорожній chatIds [] = усі групи. Інакше лише вказані ID.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})

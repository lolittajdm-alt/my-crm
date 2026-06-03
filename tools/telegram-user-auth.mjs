#!/usr/bin/env node
/**
 * Вход в Telegram: по умолчанию QR-код (без SMS/кода в приложение).
 * Телефон: node tools/telegram-user-auth.mjs --phone
 */
import readline from 'readline/promises'
import { stdin as input, stdout as output } from 'process'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { join } from 'path'
import { fileURLToPath } from 'url'
import qrcodeTerminal from 'qrcode-terminal'
import QRCode from 'qrcode'
import {
  createTelegramUserAuthClient,
  loadGramJs,
  loadTelegramUserConfig,
  saveTelegramUserConfig,
  TELEGRAM_USER_CONFIG_PATH,
} from '../lib/telegram-user-client.mjs'

const rl = readline.createInterface({ input, output })
const usePhoneMode = process.argv.includes('--phone')
const execFileAsync = promisify(execFile)
const QR_PNG_PATH = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'telegram-login-qr.png')

function floodWaitSeconds(err) {
  if (err?.seconds != null && Number.isFinite(Number(err.seconds))) {
    return Number(err.seconds)
  }
  const msg = String(err?.message || err || '')
  const match = msg.match(/wait of (\d+) seconds/i)
  return match ? Number(match[1]) : null
}

function printFloodWaitHelp(seconds) {
  const min = Math.max(1, Math.ceil(seconds / 60))
  console.error('')
  console.error(`Telegram временно ограничил запросы: подождите ${seconds} сек (~${min} мин).`)
  console.error('Не перезапускайте скрипт много раз.')
  console.error('')
}

function loginUrlFromToken(token) {
  const buf = Buffer.isBuffer(token) ? token : Buffer.from(token)
  return `tg://login?token=${buf.toString('base64url')}`
}

async function openQrImage(path) {
  if (process.platform === 'darwin') {
    await execFileAsync('open', [path])
    return true
  }
  if (process.platform === 'win32') {
    await execFileAsync('cmd', ['/c', 'start', '', path])
    return true
  }
  return false
}

async function printLoginQr(token) {
  const url = loginUrlFromToken(token)
  console.log('')
  console.log('════════════════════════════════════════')
  console.log('  ВХОД ПО QR-КОДУ')
  console.log('════════════════════════════════════════')
  console.log('На телефоне:')
  console.log('  Telegram → Настройки → Устройства → Подключить устройство')
  console.log('')

  try {
    await QRCode.toFile(QR_PNG_PATH, url, { width: 420, margin: 2 })
    const opened = await openQrImage(QR_PNG_PATH)
    if (opened) {
      console.log(`✓ QR-код открыт в окне просмотра: ${QR_PNG_PATH}`)
      console.log('  Отсканируйте его камерой Telegram.')
    } else {
      console.log(`✓ QR сохранён: ${QR_PNG_PATH}`)
      console.log('  Откройте этот файл и отсканируйте.')
    }
  } catch (err) {
    console.error('Не удалось сохранить PNG:', err.message || err)
  }

  console.log('')
  console.log('QR в терминале (если видно):')
  qrcodeTerminal.generate(url, { small: true })
  console.log('')
  console.log('Ожидание сканирования... (QR обновится через ~30 сек)')
  console.log('')
}

function printCodeInstructions(isCodeViaApp, phone) {
  console.log('')
  if (isCodeViaApp) {
    console.log('Код приходит В ПРИЛОЖЕНИЕ Telegram (не SMS):')
    console.log(`  1. Telegram на телефоне ${phone}`)
    console.log('  2. Уведомление или чат «Telegram»')
    console.log('  3. Telegram Desktop / iPad')
  } else {
    console.log('Код отправлен SMS.')
  }
  console.log('')
  console.log('Нет кода? Прервите (Ctrl+C) и войдите по QR:')
  console.log('  node tools/telegram-user-auth.mjs')
  console.log('')
  console.log('Повтор SMS: введите sms и Enter')
  console.log('')
}

function normalizePhone(raw) {
  let phone = String(raw || '').trim().replace(/\s+/g, '')
  if (!phone) return ''
  if (/^0\d{9}$/.test(phone)) phone = `+38${phone}`
  if (/^380\d{9}$/.test(phone)) phone = `+${phone}`
  if (/^\d{9}$/.test(phone)) phone = `+380${phone}`
  if (phone && !phone.startsWith('+')) phone = `+${phone}`
  return phone
}

async function signInWithPassword(client, apiCredentials, hint = '') {
  const label = hint ? `Пароль 2FA (${hint})` : 'Пароль 2FA'
  const password = (await rl.question(`${label}: `)).trim()
  if (!password) throw new Error('Нужен пароль 2FA')
  await client.signInWithPassword(apiCredentials, {
    password: async () => password,
    onError: (err) => {
      const waitSec = floodWaitSeconds(err)
      if (waitSec != null && waitSec > 600) {
        printFloodWaitHelp(waitSec)
        process.exit(1)
      }
    },
  })
}

async function authByQr(client, apiCredentials) {
  console.log('Режим: QR-код (код по SMS не нужен).\n')
  await client.signInUserWithQrCode(apiCredentials, {
    qrCode: async ({ token }) => {
      await printLoginQr(token)
    },
    password: async (hint) => {
      const label = hint ? `Пароль 2FA (${hint})` : 'Пароль 2FA'
      const password = (await rl.question(`${label}: `)).trim()
      if (!password) throw new Error('Нужен пароль 2FA')
      return password
    },
    onError: async (err) => {
      const waitSec = floodWaitSeconds(err)
      if (waitSec != null && waitSec > 600) {
        printFloodWaitHelp(waitSec)
        process.exit(1)
      }
      if (err?.message) console.error('Telegram:', err.message)
      return false
    },
  })
}

async function authByPhone(client, apiCredentials) {
  const { Api } = await loadGramJs()
  console.log('Режим: код по телефону.\n')

  const phoneRaw = (await rl.question('Номер телефона (+380...): ')).trim()
  const phone = normalizePhone(phoneRaw)
  if (!phone) throw new Error('Номер не указан')
  if (phone !== phoneRaw) console.log(`Используем номер: ${phone}`)

  let phoneCodeHash
  let isCodeViaApp = false

  try {
    const sendResult = await client.sendCode(apiCredentials, phone, false)
    phoneCodeHash = sendResult.phoneCodeHash
    isCodeViaApp = sendResult.isCodeViaApp
  } catch (err) {
    const waitSec = floodWaitSeconds(err)
    if (waitSec != null) {
      printFloodWaitHelp(waitSec)
      process.exit(1)
    }
    throw err
  }

  printCodeInstructions(isCodeViaApp, phone)

  while (true) {
    const inputCode = (await rl.question('Код (или sms): ')).trim()

    if (inputCode.toLowerCase() === 'sms') {
      try {
        const resend = await client.invoke(new Api.auth.ResendCode({
          phoneNumber: phone,
          phoneCodeHash,
        }))
        phoneCodeHash = resend.phoneCodeHash
        isCodeViaApp = resend.type?.className === 'auth.SentCodeTypeApp'
        printCodeInstructions(isCodeViaApp, phone)
      } catch (err) {
        const waitSec = floodWaitSeconds(err)
        if (waitSec != null) {
          printFloodWaitHelp(waitSec)
          process.exit(1)
        }
        console.error('Ошибка повторной отправки:', err.message || err)
      }
      continue
    }

    if (!inputCode) {
      console.log('Введите код или sms.')
      continue
    }

    try {
      await client.invoke(new Api.auth.SignIn({
        phoneNumber: phone,
        phoneCodeHash,
        phoneCode: inputCode,
      }))
      return
    } catch (err) {
      if (err.errorMessage === 'SESSION_PASSWORD_NEEDED') {
        await signInWithPassword(client, apiCredentials)
        return
      }
      if (err.errorMessage === 'PHONE_CODE_INVALID') {
        console.error('Неверный код.')
        continue
      }
      if (err.errorMessage === 'PHONE_CODE_EXPIRED') {
        console.error('Код истёк. Введите sms.')
        continue
      }
      const waitSec = floodWaitSeconds(err)
      if (waitSec != null) {
        printFloodWaitHelp(waitSec)
        process.exit(1)
      }
      throw err
    }
  }
}

async function main() {
  const cfg = await loadTelegramUserConfig()
  if (!cfg?.apiId || !cfg?.apiHash) {
    console.error(`Заполните apiId и apiHash в ${TELEGRAM_USER_CONFIG_PATH}`)
    console.error('Получить: https://my.telegram.org/apps')
    process.exit(1)
  }

  const client = await createTelegramUserAuthClient()
  const apiCredentials = {
    apiId: Number(cfg.apiId),
    apiHash: String(cfg.apiHash),
  }

  if (usePhoneMode) {
    await authByPhone(client, apiCredentials)
  } else {
    await authByQr(client, apiCredentials)
  }

  const session = String(client.session.save() || '').trim()
  if (session.length < 20) {
    throw new Error('Сессия пустая — войдите снова: node tools/telegram-user-auth.mjs')
  }
  await saveTelegramUserConfig({ session })
  console.log('\n✓ Готово. Сессия сохранена в telegram-user.local.json')
  console.log('  node tools/telegram-user-list-chats.mjs')
  console.log('  ./start.sh')
  try {
    await client.destroy()
  } catch {
    // ignore shutdown noise
  }
  rl.close()
  process.exit(0)
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})

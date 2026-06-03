import { createServer } from 'http'
import { readFile } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { request as httpsRequest } from 'https'
import {
  ensureTelegramUserClient,
  getTelegramUserStatus,
  listTelegramUserChats,
  pollTelegramUserMessages,
} from './lib/telegram-user-client.mjs'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, 'standalone')
const PORT = Number(process.env.PORT || process.argv[2]) || 8080
const ROZETKA_API = 'https://api-seller.rozetka.com.ua'
const TELEGRAM_API = 'https://api.telegram.org'
const API_KEY = String(process.env.BAZARIO_API_KEY || '').trim()

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
}

function corsHeaders(extra = {}) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization, Content-Type, Accept, Content-Language, X-Telegram-Bot-Token, X-Bazario-Api-Key',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    ...extra,
  }
}

function isApiPath(pathname = '') {
  return pathname.startsWith('/api/')
}

function checkApiKey(req, res) {
  if (!API_KEY) return true
  if (req.headers['x-bazario-api-key'] === API_KEY) return true
  res.writeHead(401, {
    ...corsHeaders(),
    'Content-Type': 'application/json; charset=utf-8',
  })
  res.end(JSON.stringify({ ok: false, error: 'unauthorized' }))
  return false
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function proxyRozetka(req, res) {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`)
  if (!url.pathname.startsWith('/api/rozetka')) return false

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders())
    res.end()
    return true
  }

  if (!checkApiKey(req, res)) return true

  const targetPath = url.pathname.replace(/^\/api\/rozetka/, '') + url.search
  const headers = {
    Accept: req.headers.accept || 'application/json',
  }
  if (req.headers.authorization) headers.Authorization = req.headers.authorization
  if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type']
  if (req.headers['content-language']) headers['Content-Language'] = req.headers['content-language']

  const proxyReq = httpsRequest(
    `${ROZETKA_API}${targetPath}`,
    { method: req.method, headers },
    (proxyRes) => {
      const outHeaders = {
        ...corsHeaders(),
        'Content-Type': proxyRes.headers['content-type'] || 'application/json; charset=utf-8',
      }
      res.writeHead(proxyRes.statusCode || 502, outHeaders)
      proxyRes.pipe(res)
    },
  )

  proxyReq.on('error', (err) => {
    res.writeHead(502, {
      ...corsHeaders(),
      'Content-Type': 'application/json; charset=utf-8',
    })
    res.end(JSON.stringify({
      success: false,
      errors: { message: err.message || 'proxy_error', code: 0 },
    }))
  })

  readBody(req)
    .then((body) => {
      if (body.length) proxyReq.write(body)
      proxyReq.end()
    })
    .catch((err) => {
      proxyReq.destroy()
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify({
        success: false,
        errors: { message: err.message || 'proxy_read_error', code: 0 },
      }))
    })

  return true
}

function proxyTelegram(req, res) {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`)
  if (!url.pathname.startsWith('/api/telegram/')) return false

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders({
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    }))
    res.end()
    return true
  }

  if (!checkApiKey(req, res)) return true

  const token = String(req.headers['x-telegram-bot-token'] || '').trim()
  if (!token) {
    res.writeHead(401, {
      ...corsHeaders(),
      'Content-Type': 'application/json; charset=utf-8',
    })
    res.end(JSON.stringify({ ok: false, description: 'missing_bot_token' }))
    return true
  }

  const methodPath = url.pathname.replace(/^\/api\/telegram\/?/, '')
  const targetPath = `/bot${token}/${methodPath}${url.search}`
  const headers = { Accept: req.headers.accept || 'application/json' }
  if (req.headers['content-type']) headers['Content-Type'] = req.headers['content-type']

  const proxyReq = httpsRequest(
    `${TELEGRAM_API}${targetPath}`,
    { method: req.method, headers },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode || 502, {
        ...corsHeaders({ 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' }),
        'Content-Type': proxyRes.headers['content-type'] || 'application/json; charset=utf-8',
      })
      proxyRes.pipe(res)
    },
  )

  proxyReq.on('error', (err) => {
    res.writeHead(502, {
      ...corsHeaders(),
      'Content-Type': 'application/json; charset=utf-8',
    })
    res.end(JSON.stringify({ ok: false, description: err.message || 'proxy_error' }))
  })

  readBody(req)
    .then((body) => {
      if (body.length) proxyReq.write(body)
      proxyReq.end()
    })
    .catch((err) => {
      proxyReq.destroy()
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify({ ok: false, description: err.message || 'proxy_read_error' }))
    })

  return true
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    ...corsHeaders(),
    'Content-Type': 'application/json; charset=utf-8',
  })
  res.end(JSON.stringify(payload))
}

async function handleTelegramUserApi(req, res) {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`)
  if (!url.pathname.startsWith('/api/telegram-user')) return false

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders({ 'Access-Control-Allow-Methods': 'GET, OPTIONS' }))
    res.end()
    return true
  }

  if (!checkApiKey(req, res)) return true

  if (req.method !== 'GET') {
    sendJson(res, 405, { ok: false, error: 'method_not_allowed' })
    return true
  }

  const subPath = url.pathname.replace(/^\/api\/telegram-user\/?/, '')

  try {
    if (subPath === 'status') {
      sendJson(res, 200, getTelegramUserStatus())
      return true
    }

    if (subPath === 'poll') {
      await ensureTelegramUserClient()
      const after = url.searchParams.get('after') || ''
      const result = pollTelegramUserMessages(after)
      sendJson(res, 200, { ok: true, ...result })
      return true
    }

    if (subPath === 'chats') {
      await ensureTelegramUserClient()
      const chats = await listTelegramUserChats()
      sendJson(res, 200, { ok: true, chats })
      return true
    }

    sendJson(res, 404, { ok: false, error: 'not_found' })
  } catch (err) {
    sendJson(res, 502, { ok: false, error: err.message || 'telegram_user_error' })
  }
  return true
}

createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://127.0.0.1:${PORT}`)

  if (url.pathname === '/api/health') {
    sendJson(res, 200, {
      ok: true,
      telegramUser: getTelegramUserStatus(),
      apiKeyRequired: Boolean(API_KEY),
    })
    return
  }

  if (req.method === 'OPTIONS' && isApiPath(url.pathname)) {
    res.writeHead(204, corsHeaders())
    res.end()
    return
  }

  if (proxyRozetka(req, res)) return
  if (proxyTelegram(req, res)) return
  if (await handleTelegramUserApi(req, res)) return

  let path = url.pathname === '/' ? '/index.html' : url.pathname
  if (path.includes('..')) {
    res.writeHead(400)
    return res.end('Bad request')
  }
  const file = join(ROOT, path)
  try {
    const data = await readFile(file)
    const ext = extname(file)
    const headers = { 'Content-Type': MIME[ext] || 'application/octet-stream' }
    if (ext === '.html' || ext === '.js' || ext === '.css') {
      headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
      headers.Pragma = 'no-cache'
    }
    res.writeHead(200, headers)
    res.end(data)
  } catch {
    res.writeHead(404)
    res.end('Not found')
  }
}).listen(PORT, '0.0.0.0', () => {
  console.log(`StockHub: http://0.0.0.0:${PORT}`)
  console.log(`Rozetka API proxy: http://localhost:${PORT}/api/rozetka`)
  console.log(`Telegram API proxy: http://localhost:${PORT}/api/telegram`)
  console.log(`Telegram User API: http://localhost:${PORT}/api/telegram-user`)
  ensureTelegramUserClient().catch(() => {})
})

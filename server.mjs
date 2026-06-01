import { createServer } from 'http'
import { readFile } from 'fs/promises'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const ROOT = join(__dirname, 'standalone')
const PORT = Number(process.argv[2]) || 8080

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
}

createServer(async (req, res) => {
  let path = req.url === '/' ? '/index.html' : req.url.split('?')[0]
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
}).listen(PORT, () => {
  console.log(`StockHub: http://localhost:${PORT}`)
})

/**
 * Базовий URL API для локального сервера та хмари (GitHub Pages + Render).
 * Локально: BAZARIO_API_ORIGIN не задано → /api/... на тому ж хості.
 * GitHub Pages: у api-origin.js задайте origin Render-сервера.
 */
const BazarioApiBase = (() => {
  function origin() {
    return String(window.BAZARIO_API_ORIGIN || '').replace(/\/$/, '')
  }

  function apiKey() {
    return String(window.BAZARIO_API_KEY || '').trim()
  }

  function resolve(path) {
    const p = path.startsWith('/') ? path : `/${path}`
    const o = origin()
    return o ? `${o}${p}` : p
  }

  function headers(extra = {}) {
    const h = { ...extra }
    const key = apiKey()
    if (key) h['X-Bazario-Api-Key'] = key
    return h
  }

  return { resolve, headers, origin, apiKey }
})()

window.BazarioApiBase = BazarioApiBase

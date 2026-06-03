/**
 * Системные push-уведомления на устройство (не только внутри страницы).
 */
const BazarioDeviceNotifications = (() => {
  const SW_URL = 'sw.js'
  let registration = null
  let initPromise = null

  function supported() {
    return typeof window !== 'undefined' && 'Notification' in window
  }

  function permission() {
    return supported() ? Notification.permission : 'denied'
  }

  function enabledInSettings() {
    const raw = window.BazarioDB?.getSettings?.()?.deviceNotifications
    return raw !== false
  }

  function saveEnabled(value) {
    window.BazarioDB?.write?.('settings', {
      ...window.BazarioDB.getSettings(),
      deviceNotifications: value !== false,
    })
  }

  async function ensureRegistration() {
    if (!('serviceWorker' in navigator)) return null
    if (registration) return registration
    if (!initPromise) {
      initPromise = navigator.serviceWorker.register(SW_URL, { scope: './' })
        .then((reg) => {
          registration = reg
          return reg
        })
        .catch(() => null)
    }
    return initPromise
  }

  async function ensurePermission({ prompt = true } = {}) {
    if (!supported()) return false
    if (Notification.permission === 'granted') {
      saveEnabled(true)
      await ensureRegistration()
      return true
    }
    if (Notification.permission === 'denied') return false
    if (!prompt) return false
    const result = await Notification.requestPermission()
    if (result === 'granted') {
      saveEnabled(true)
      await ensureRegistration()
      return true
    }
    return false
  }

  function iconUrl() {
    try {
      return new URL('assets/apple-touch-icon.png', window.location.href).href
    } catch {
      return 'assets/apple-touch-icon.png'
    }
  }

  async function notify(payload) {
    if (!supported() || !enabledInSettings()) return false
    if (Notification.permission !== 'granted') return false

    const title = String(payload?.title || 'MY CRM').trim()
    const body = String(payload?.body || '').trim()
    const tag = payload?.tag ? String(payload.tag) : undefined
    const data = payload?.data && typeof payload.data === 'object' ? payload.data : {}
    const icon = payload?.icon || iconUrl()
    const options = { body, tag, icon, data, silent: false }

    const reg = await ensureRegistration()
    if (reg?.showNotification) {
      try {
        await reg.showNotification(title, options)
        return true
      } catch {
        // fallback below
      }
    }

    try {
      // eslint-disable-next-line no-new
      new Notification(title, options)
      return true
    } catch {
      return false
    }
  }

  async function notifyTest() {
    return notify({
      tag: 'bazario:test',
      title: 'MY CRM',
      body: 'Сповіщення на пристрої працюють',
      data: { kind: 'test' },
    })
  }

  function handleNotificationClick(data) {
    if (!data?.kind) return
    if (data.kind === 'telegram' && data.id) {
      window.openTelegramNotification?.(data.id)
      return
    }
    if (data.kind === 'order' && data.id) {
      window.goToOrderFromNotification?.(data.id)
      return
    }
    if (data.kind === 'task' && data.id) {
      window.goToTaskFromNotification?.(data.id)
    }
  }

  function init() {
    if (!supported()) return
    ensureRegistration()
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'device-notification-click') {
          handleNotificationClick(event.data.data)
        }
      })
    }
  }

  return {
    init,
    supported,
    permission,
    ensurePermission,
    notify,
    notifyTest,
    enabledInSettings,
    saveEnabled,
  }
})()

window.BazarioDeviceNotifications = BazarioDeviceNotifications

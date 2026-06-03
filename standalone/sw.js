/* MY CRM — системные уведомления на устройство (macOS / iOS PWA / Android). */

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const data = event.notification.data || {}
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        client.postMessage({ type: 'device-notification-click', data })
        if ('focus' in client) return client.focus()
      }
      const url = data.url || self.registration.scope
      return self.clients.openWindow(url)
    }),
  )
})

self.addEventListener('message', (event) => {
  const msg = event.data
  if (!msg || msg.type !== 'show-notification') return
  const p = msg.payload || {}
  event.waitUntil(
    self.registration.showNotification(p.title || 'MY CRM', {
      body: p.body || '',
      tag: p.tag || undefined,
      icon: p.icon || 'assets/apple-touch-icon.png',
      badge: p.icon || 'assets/apple-touch-icon.png',
      data: p.data || {},
      silent: false,
    }),
  )
})

/**
 * Скопіюйте в rozetka-config.js і заповніть один із варіантів авторизації.
 *
 * Варіант 1 (рекомендовано): API-токен
 *   seller.rozetka.com.ua → Налаштування → Безпека API → Згенерувати
 *
 * Варіант 2: логін + пароль від кабінету продавця
 *
 * Сервер: ./start.sh (потрібен Node для проксі /api/rozetka)
 */
window.BAZARIO_ROZETKA = {
  /** Токен з «Безпека API» (якщо є — логін/пароль не потрібні) */
  apiToken: '',
  username: '',
  password: '',
  shop: 'Bazario',
  apiBase: '/api/rozetka',
  /** Замовлення з цієї дати (YYYY-MM-DD), старіші не імпортуються */
  syncFromDate: '2026-06-01',
  /** Інтервал авто-синхронізації (секунди); якщо 0 — використовується autoSyncMinutes */
  autoSyncSeconds: 5,
  autoSyncMinutes: 0,
}

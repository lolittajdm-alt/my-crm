/**
 * Скопіюйте в telegram-config.js і заповніть.
 *
 * ═══ Режим user (групи, де ви НЕ адмін) ═══
 * 1. https://my.telegram.org/apps → apiId, apiHash
 * 2. cp telegram-user.local.example.json telegram-user.local.json
 * 3. npm install telegram
 * 4. node tools/telegram-user-auth.mjs
 * 5. node tools/telegram-user-list-chats.mjs → chatIds у telegram-user.local.json
 * 6. ./start.sh і mode: 'user' нижче
 *
 * ═══ Режим bot (бот має бути в чаті) ═══
 * 1. @BotFather → /newbot → botToken
 * 2. Додайте бота в чат (часто потрібен адмін)
 * 3. @BotFather → /setprivacy → Disable
 * 4. chatIds з getUpdates
 *
 * Сервер: ./start.sh (Node для /api/telegram та /api/telegram-user)
 */
window.BAZARIO_TELEGRAM = {
  /** 'user' — ваш акаунт; 'bot' — Bot API */
  mode: 'bot',

  /** --- bot mode --- */
  botToken: '',
  /** Один або кілька chatId: рядок, число або масив */
  chatIds: '',
  /** Зворотна сумісність */
  chatId: '',

  /** --- user mode --- */
  userApiBase: '/api/telegram-user',
  userEnabled: true,

  apiBase: '/api/telegram',
  pollIntervalSeconds: 8,
  maxStoredMessages: 80,
  enabled: true,
}

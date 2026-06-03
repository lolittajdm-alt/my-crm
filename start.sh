#!/bin/bash
# Запуск дашборда. Для Rozetka API потрібен Node (server.mjs + прокси).

cd "$(dirname "$0")"
PORT="${PORT:-8080}"

# shellcheck source=tools/find-node.sh
source ./tools/find-node.sh

NODE="$(find_node || true)"

echo "StockHub — запуск локального сервера..."
echo ""

if [ -n "$NODE" ]; then
  echo "Node: $NODE"
  echo "Rozetka API: увімкнено (прокси /api/rozetka)"
  echo "Telegram Bot API: /api/telegram"
  echo "Telegram User API: /api/telegram-user (групи без прав адміна)"
  echo "  Спочатку: ./setup-telegram-user.sh  (потрібен Node.js + npm)"
  echo "Відкрийте: http://localhost:$PORT"
  echo "Зупинка: Ctrl+C"
  echo ""
  exec "$NODE" "server.mjs" "$PORT"
fi

if command -v python3 >/dev/null 2>&1; then
  echo "Увага: Node не знайдено — Rozetka синхронізація НЕ працюватиме."
  echo "Відкрийте: http://localhost:$PORT"
  echo "Зупинка: Ctrl+C"
  echo ""
  cd standalone
  exec python3 -m http.server "$PORT"
fi

if command -v python >/dev/null 2>&1; then
  echo "Увага: Node не знайдено — Rozetka синхронізація НЕ працюватиме."
  echo "Відкрийте: http://localhost:$PORT"
  cd standalone
  exec python -m http.server "$PORT" 2>/dev/null || python -m SimpleHTTPServer "$PORT"
fi

echo "Помилка: не знайдено node і python3."
print_node_install_help
exit 1

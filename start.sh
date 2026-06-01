#!/bin/bash
# Запуск дашборда без npm — только Python или Node

cd "$(dirname "$0")/standalone"
PORT="${PORT:-8080}"

echo "StockHub — запуск локального сервера..."
echo ""

if command -v python3 >/dev/null 2>&1; then
  echo "Откройте в браузере: http://localhost:$PORT"
  echo "Остановка: Ctrl+C"
  echo ""
  exec python3 -m http.server "$PORT"
fi

if command -v python >/dev/null 2>&1; then
  echo "Откройте в браузере: http://localhost:$PORT"
  exec python -m SimpleHTTPServer "$PORT" 2>/dev/null || python -m http.server "$PORT"
fi

NODE=""
for p in \
  "/opt/homebrew/bin/node" \
  "/usr/local/bin/node" \
  "$HOME/.nvm/versions/node/$(ls "$HOME/.nvm/versions/node" 2>/dev/null | tail -1)/bin/node" \
  "/Volumes/Cursor Installer/Cursor.app/Contents/Resources/app/resources/helpers/node"
do
  if [ -x "$p" ]; then NODE="$p"; break; fi
done

if [ -n "$NODE" ]; then
  echo "Откройте в браузере: http://localhost:$PORT"
  exec "$NODE" "../server.mjs" "$PORT"
fi

echo "Ошибка: не найден python3 и node."
echo "Установите Node.js: https://nodejs.org/ — затем: npm install && npm run dev"
exit 1

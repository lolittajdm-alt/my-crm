#!/bin/bash
# Налаштування Telegram User API (групи без прав адміна).

set -e
cd "$(dirname "$0")"

# shellcheck source=tools/find-node.sh
source ./tools/find-node.sh

NODE="$(find_node || true)"
NPM="$(find_npm || true)"

if [ -z "$NPM" ] || [ -z "$NODE" ]; then
  echo "Помилка: npm або node не знайдено."
  print_node_install_help
  exit 1
fi

echo "Node: $NODE ($("$NODE" --version))"
echo "npm:  $NPM ($("$NPM" --version))"
echo ""

if [ ! -f telegram-user.local.json ]; then
  echo "Створюю telegram-user.local.json з прикладу..."
  cp telegram-user.local.example.json telegram-user.local.json
  echo ""
  echo "Відредагуйте telegram-user.local.json:"
  echo "  apiId, apiHash — https://my.telegram.org/apps"
  echo ""
  echo "Потім знову запустіть: ./setup-telegram-user.sh"
  exit 0
fi

if ! grep -q '"apiId"' telegram-user.local.json || grep -q '"apiId": 0' telegram-user.local.json; then
  echo "Заповніть apiId та apiHash у telegram-user.local.json (my.telegram.org/apps)"
  exit 1
fi

echo "Встановлення залежності telegram..."
"$NPM" install

echo ""
echo "Вхід у Telegram (код прийде в додаток)..."
"$NODE" tools/telegram-user-auth.mjs

echo ""
echo "Список груп (скопіюйте chatId у telegram-user.local.json → chatIds):"
"$NODE" tools/telegram-user-list-chats.mjs

echo ""
echo "Готово. Запустіть дашборд: ./start.sh"
echo "У standalone/telegram-config.js має бути mode: 'user'"

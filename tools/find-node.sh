#!/bin/bash
# Знаходить node/npm (PATH, Homebrew, Cursor, nvm).

find_node() {
  for p in \
    "$(command -v node 2>/dev/null)" \
    "/opt/homebrew/bin/node" \
    "/usr/local/bin/node" \
    "$HOME/.nvm/versions/node/$(ls "$HOME/.nvm/versions/node" 2>/dev/null | tail -1)/bin/node" \
    "/Applications/Cursor.app/Contents/Resources/app/resources/helpers/node" \
    "/Volumes/Cursor Installer/Cursor.app/Contents/Resources/app/resources/helpers/node"
  do
    if [ -n "$p" ] && [ -x "$p" ]; then
      echo "$p"
      return 0
    fi
  done
  return 1
}

find_npm() {
  for p in \
    "$(command -v npm 2>/dev/null)" \
    "/opt/homebrew/bin/npm" \
    "/usr/local/bin/npm" \
    "$HOME/.nvm/versions/node/$(ls "$HOME/.nvm/versions/node" 2>/dev/null | tail -1)/bin/npm"
  do
    if [ -n "$p" ] && [ -x "$p" ]; then
      echo "$p"
      return 0
    fi
  done
  return 1
}

print_node_install_help() {
  cat <<'EOF'

Node.js не знайдено (потрібен для Telegram User API і npm install).

Встановіть Node.js LTS (разом із npm):
  https://nodejs.org/en/download
  → macOS → Installer (.pkg) → далі «Install»

Після встановлення:
  1. Закрийте і знову відкрийте Terminal (або Cursor)
  2. Перевірте:  node --version   і   npm --version
  3. Запустіть:  ./setup-telegram-user.sh

Альтернатива (якщо є Homebrew):
  brew install node

EOF
}

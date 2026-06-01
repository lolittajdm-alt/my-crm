# Bazario — Учёт склада и аналитика

Дашборд: учёт товаров, аналитика склада и продаж, доходы/расходы, задачи между сотрудниками.

## Быстрый запуск (без npm)

Если `npm` не установлен или `npm run dev` не работает:

```bash
cd /Users/vladcabanuk/Desktop/Dashboard
chmod +x start.sh
./start.sh
```

Откройте в браузере: **http://localhost:8080**

Альтернатива вручную:

```bash
cd standalone
python3 -m http.server 8080
```

Затем откройте http://localhost:8080

> Не открывайте `index.html` двойным щелчком — в некоторых браузерах скрипты блокируются. Нужен локальный сервер (команды выше).

## Запуск через Vite (если установлен Node.js)

```bash
npm install
npm run dev
```

Адрес обычно: http://localhost:5173

Если `npm: command not found` — установите Node.js с https://nodejs.org/ (LTS), перезапустите терминал.

## Структура

| Папка | Описание |
|-------|----------|
| `standalone/` | Версия без сборки — HTML/CSS/JS |
| `src/` | React + Vite (нужен npm) |
| `start.sh` | Скрипт запуска standalone |

## Локальное хранение данных

Все записи (склады, товары, магазины, финансы, задачи, профиль) сохраняются в **localStorage** браузера через `standalone/storage.js`.

- При добавлении — уведомление «Збережено локально»
- Главная страница строится из ваших данных
- В **Профіль** — экспорт/импорт JSON (резервная копия)

> Supabase и деплой отложены. Заготовки лежат в `standalone/supabase/` и `standalone/SUPABASE.md`.

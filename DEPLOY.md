# Деплой MY CRM онлайн (Telegram + Rozetka + API)

GitHub Pages — **только статика**, без Node. Для всех API нужен **облачный сервер**.

## Рекомендуется: всё на Render (один URL)

CRM, Rozetka-прокси, Telegram Bot и Telegram User API работают как на `./start.sh`.

### 1. Репозиторий на GitHub

У вас уже есть: `https://github.com/lolittajdm-alt/my-crm`

```bash
cd ~/Desktop/Dashboard
git add .
git commit -m "Cloud deploy: Render + API"
git push origin main
```

### 2. Render.com

1. [render.com](https://render.com) → **Sign Up** (через GitHub)
2. **New** → **Blueprint** → подключите репозиторий `my-crm`
3. Render прочитает `render.yaml` и создаст сервис **my-crm**
4. В **Environment** добавьте секреты:

| Переменная | Значение |
|------------|----------|
| `TELEGRAM_API_ID` | из [my.telegram.org/apps](https://my.telegram.org/apps) |
| `TELEGRAM_API_HASH` | там же |
| `TELEGRAM_SESSION` | строка `session` из `telegram-user.local.json` |
| `TELEGRAM_CHAT_IDS` | `["-5051169703"]` |
| `TELEGRAM_MODE` | `user` |
| `ROZETKA_API_TOKEN` | токен Rozetka (или логин/пароль ниже) |
| `ROZETKA_USERNAME` | если без токена |
| `ROZETKA_PASSWORD` | если без токена |

`BAZARIO_API_KEY` Render создаст сам — **скопируйте** его (нужен для варианта B).

5. **Deploy** → через 2–3 мин сайт:

```
https://my-crm-xxxx.onrender.com
```

6. Откройте URL на Mac и iPhone → включите уведомления в колокольчике.

### 3. Telegram session для облака

Сессию получаете **локально один раз**:

```bash
node tools/telegram-user-auth.mjs
```

Скопируйте `"session": "..."` из `telegram-user.local.json` → в Render → `TELEGRAM_SESSION`.

> На бесплатном Render сервер «засыпает» после 15 мин без запросов. Первый заход может занять ~30 сек.

---

## Вариант B: GitHub Pages + Render API

Фронт на Pages, API на Render (два URL).

### 1. API на Render

Как выше, но можно назвать сервис `my-crm-api`.

### 2. Связать фронт с API

В `standalone/api-origin.js`:

```javascript
window.BAZARIO_API_ORIGIN = 'https://my-crm-xxxx.onrender.com'
window.BAZARIO_API_KEY = 'ключ_из_Render_BAZARIO_API_KEY'
```

Закоммитьте и включите GitHub Pages (ветка `gh-pages`).

### 3. URLs

- CRM: `https://lolittajdm-alt.github.io/my-crm/`
- API: `https://my-crm-xxxx.onrender.com/api/health`

---

## Что работает онлайн

| Функция | Render (вариант A) | Pages + API (вариант B) |
|---------|-------------------|-------------------------|
| CRM интерфейс | ✅ | ✅ |
| Rozetka `/api/rozetka` | ✅ | ✅ |
| Telegram Bot `/api/telegram` | ✅ | ✅ |
| Telegram User (группы без админа) | ✅ | ✅ |
| Push на iPhone | ✅ | ✅ |
| Supabase | ✅*, настройте URL в Supabase | ✅ |

\* `standalone/supabase-config.js` — добавьте в репозиторий или через env (см. ниже).

---

## Supabase

**Authentication → URL Configuration**:

- **Site URL:** ваш URL CRM (Render или GitHub Pages)
- **Redirect URLs:** `https://ваш-url/**` и `http://localhost:8080/**`

---

## Локальная разработка

```bash
./start.sh
# http://localhost:8080
```

`api-origin.js` с пустым `BAZARIO_API_ORIGIN` — API на том же хосте, ключ не нужен.

---

## Проверка API

```bash
curl https://my-crm-xxxx.onrender.com/api/health
curl -H "X-Bazario-Api-Key: YOUR_KEY" https://my-crm-xxxx.onrender.com/api/telegram-user/status
```

---

## Обновление

```bash
git push origin main
```

Render и GitHub Actions обновятся автоматически.

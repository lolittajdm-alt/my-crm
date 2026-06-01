# Bazario + Supabase

Підключення спільної бази для 2 користувачів.

## 1. Створіть проект Supabase

1. Зайдіть на [supabase.com](https://supabase.com) → **New project**
2. Збережіть пароль до БД

## 2. Виконайте SQL-схему

1. Supabase Dashboard → **SQL** → **New query**
2. Скопіюйте весь файл [`supabase/schema.sql`](./supabase/schema.sql)
3. Натисніть **Run**

## 3. Увімкніть Realtime (для синхронізації між 2 людьми)

1. **Database** → **Replication**
2. Увімкніть таблицю `app_records`

## 4. Auth (рекомендовано для старту)

1. **Authentication** → **Providers** → **Email** — увімкнено
2. **Authentication** → **Settings** → вимкніть **Confirm email** (для швидкого старту без листів)

## 5. Ключі API

1. **Project Settings** → **API**
2. Скопіюйте **Project URL** і **anon public key**
3. Вставте в `standalone/supabase-config.js`:

```javascript
window.BAZARIO_SUPABASE = {
  url: 'https://xxxxx.supabase.co',
  anonKey: 'eyJhbGciOi...',
}
```

## 6. Запуск

```bash
./start.sh
```

Відкрийте http://localhost:8080

## 7. Перший і другий користувач

| Крок | Хто |
|------|-----|
| Реєстрація + вхід | Користувач 1 |
| **Створити Bazario** | Користувач 1 |
| Скопіювати **код запрошення** (внизу сторінки після входу) | Користувач 1 → передає Користувачу 2 |
| Реєстрація + вхід | Користувач 2 |
| **Приєднатися** з кодом | Користувач 2 |

Обидва працюють з **одними даними**. Зміни одного оновлюються у другого через Realtime.

## 8. Перенос даних з браузера

Якщо в localStorage уже були дані, а в Supabase workspace порожній — при першому вході вони **автоматично завантажаться** в хмару.

Резервна копія як і раніше: експорт JSON у розділі **Профіль**.

## 9. Деплой онлайн

1. Залийте папку `standalone/` на **Vercel**, **Netlify** або **Cloudflare Pages**
2. `supabase-config.js` має містити production URL і anon key
3. Supabase → **Authentication** → **URL Configuration** → додайте URL вашого сайту в **Site URL** і **Redirect URLs**

## Локальний режим (без Supabase)

Якщо в `supabase-config.js` порожні `url` і `anonKey` — сайт працює як раніше, дані тільки в браузері.

## Структура БД

| Таблиця | Призначення |
|---------|-------------|
| `workspaces` | Спільний магазин + settings |
| `workspace_members` | Хто має доступ |
| `user_sessions` | Профіль сесії кожного користувача |
| `app_records` | Усі колекції (товари, фінанси, задачі…) у JSON |

## Безпека

- **anon key** можна тримати у фронті — доступ обмежений RLS
- **service_role key** ніколи не додавайте у фронтенд
- Для 2 довірених людей поточної схеми достатньо

# Деплой MY CRM онлайн (GitHub Pages)

## 1. Створіть репозиторій на GitHub

1. [github.com/new](https://github.com/new)
2. **Repository name:** `my-crm` (або будь-яка назва)
3. **Public**
4. **Не** додавайте README / .gitignore (репо порожній)
5. **Create repository**

## 2. Завантажте код (один раз у терміналі)

```bash
cd /Users/vladcabanuk/Desktop/Dashboard
git init
git branch -M main
git add .
git commit -m "MY CRM — standalone + GitHub Pages deploy"
git remote add origin https://github.com/ВАШ_ЛОГІН/my-crm.git
git push -u origin main
```

Замініть `ВАШ_ЛОГІН` і `my-crm` на свої.

## 3. Увімкніть GitHub Pages

1. GitHub → ваш репозиторій → **Settings**
2. **Pages** (ліворуч)
3. **Build and deployment** → Source: **Deploy from a branch**
4. **Branch:** `gh-pages` → **`/ (root)`** → **Save**

> Після першого push GitHub Actions створить гілку `gh-pages` (1–2 хв).
> Якщо її ще немає — зачекайте зеленого deploy у **Actions**, потім оновіть Settings → Pages.

## 4. Ваш сайт

```
https://ВАШ_ЛОГІН.github.io/my-crm/
```

## 5. Supabase

**Authentication** → **URL Configuration**:

- **Site URL:** `https://ВАШ_ЛОГІН.github.io/my-crm/`
- **Redirect URLs:**
  ```
  https://ВАШ_ЛОГІН.github.io/my-crm/**
  http://localhost:8080/**
  ```

## Оновлення сайту

Після змін у коді:

```bash
cd /Users/vladcabanuk/Desktop/Dashboard
git add .
git commit -m "update"
git push
```

GitHub Actions автоматично оновить сайт.

# Инструкция по выгрузке на GitHub

## ✅ Проект готов к выгрузке!

Все упоминания Lovable удалены, проект очищен от мусора.

## 🚀 Шаги для выгрузки на GitHub

### 1. Создайте репозиторий на GitHub

1. Перейдите на https://github.com
2. Нажмите кнопку **"New repository"** (или **"+"** → **"New repository"**)
3. Заполните форму:
   - **Repository name**: `staff-concierge-academy` (или любое другое имя)
   - **Description**: `Professional landing page for Staff Concierge Academy course`
   - **Visibility**: выберите Public или Private
   - **НЕ** создавайте README, .gitignore или лицензию (у нас уже есть)
4. Нажмите **"Create repository"**

### 2. Подключите локальный репозиторий к GitHub

После создания репозитория GitHub покажет инструкции. Выполните команды:

```bash
# Перейдите в папку проекта
cd E:\Cursor\staff-con-main\staff-con-main

# Добавьте remote (замените YOUR_USERNAME на ваш GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/staff-concierge-academy.git

# Или если используете SSH:
# git remote add origin git@github.com:YOUR_USERNAME/staff-concierge-academy.git

# Переименуйте ветку в main (если нужно)
git branch -M main

# Загрузите код на GitHub
git push -u origin main
```

### 3. Проверка

После выполнения команд:
- Обновите страницу репозитория на GitHub
- Убедитесь, что все файлы загружены
- Проверьте, что README.md отображается корректно

## 📝 Дополнительные настройки (опционально)

### Настройка GitHub Pages (для деплоя)

1. Перейдите в **Settings** → **Pages**
2. В разделе **Source** выберите **GitHub Actions**
3. Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Настройка веток

Если хотите использовать другую ветку для production:

```bash
# Создайте ветку develop
git checkout -b develop

# Загрузите на GitHub
git push -u origin develop
```

## ⚠️ Важно

- **НЕ коммитьте** файлы с секретами (API ключи, пароли)
- Все секреты должны быть в `.env` файлах (они в `.gitignore`)
- `node_modules` автоматически исключены через `.gitignore`

## 🔒 Безопасность

Перед выгрузкой убедитесь, что:
- ✅ Нет API ключей в коде
- ✅ Нет паролей в коде
- ✅ `.env` файлы в `.gitignore`
- ✅ `node_modules` в `.gitignore`

## 📞 Поддержка

Если возникнут проблемы:
1. Проверьте, что Git установлен: `git --version`
2. Проверьте подключение к GitHub: `git remote -v`
3. Убедитесь, что у вас есть права на запись в репозиторий

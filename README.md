# Staff Concierge Academy

Профессиональный лендинг для курса Staff Concierge Academy — образовательной программы для нянь и гувернанток премиум‑класса.

## 🚀 Технологии

- **Vite** — быстрая сборка и разработка
- **TypeScript** — типобезопасность
- **React 18** — современный UI фреймворк
- **Tailwind CSS** — утилитарный CSS
- **shadcn/ui** — компоненты интерфейса
- **Framer Motion** — анимации
- **React Router** — маршрутизация
- **React Hook Form + Zod** — валидация форм
- **Supabase** — backend интеграция

## 📦 Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для production
npm run build

# Предпросмотр production сборки
npm run preview
```

Проект запускается на `http://localhost:8080` (порт настраивается в `vite.config.ts`).

## 📁 Структура проекта

```
src/
├── components/     # React компоненты
│   ├── ui/         # UI компоненты (shadcn)
│   └── ...         # Бизнес-компоненты
├── pages/          # Страницы приложения
├── hooks/          # Кастомные хуки
├── lib/            # Утилиты
└── assets/          # Статические ресурсы
```

## 🧪 Тестирование

```bash
npm run test        # Запуск тестов
npm run test:watch  # Тесты в watch режиме
```

## 📝 Лицензия

Private project — Staff Concierge Academy

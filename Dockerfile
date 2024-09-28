# Используем официальный образ Bun как базовый
FROM oven/bun:latest AS base

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файлы package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN bun install

# Копируем исходный код приложения
COPY . .

# Собираем приложение
RUN bun --bun run build

# Экспонируем порт, на котором работает приложение (обычно 3000 для Nuxt)
EXPOSE 3000

# Запускаем приложение
CMD ["bun", "run", "start"]
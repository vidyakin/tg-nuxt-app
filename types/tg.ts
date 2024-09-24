import type { User } from 'node-telegram-bot-api';

// Расширяем интерфейс User из node-telegram-bot-api
export type TelegramUser = User & {
  // Здесь вы можете добавить дополнительные поля, если они вам нужны
};
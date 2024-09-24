declare module 'node-telegram-bot-api'
// import type { TelegramUser } from '~/types/tg'
interface Window {
  Telegram: {
    WebApp: {
      initData: any;
      sendData: (data: string) => void;
      ready: () => void;
      initDataUnsafe: {
        user: any //TelegramUser
      },
    };
  };
}
import TelegramBot from 'node-telegram-bot-api';

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.web_app_data) {
    const data = JSON.parse(msg.web_app_data.data);
    if (data.action === 'button_clicked') {
      bot.sendMessage(chatId, 'Вы нажали на кнопку!');
    }
  }
});

export default defineEventHandler((event) => {
  return { message: 'Bot running!' };
});
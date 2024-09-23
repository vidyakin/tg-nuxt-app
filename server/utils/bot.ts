import TelegramBot from 'node-telegram-bot-api'

let bot: TelegramBot | null = null

export function initBot() {
  if (!process.env.BOT_TOKEN) {
    console.log('No tg-token found');
    return
  }
  if (!bot) {
    bot = new TelegramBot(process.env.BOT_TOKEN , { polling: true })

    // Ваша логика бота здесь
    bot.on('message', (msg) => {
      console.log('Получено сообщение:', msg);
      const chatId = msg.chat.id;
      if (msg.web_app_data) {
        const data = JSON.parse(msg.web_app_data.data);
        if (data.action === 'button_clicked') {
          bot!.sendMessage(chatId, 'Вы нажали на кнопку!');
        }
      }
    });
  
    bot.on('callback_query', (query: any) => {
      // Обработка callback запросов
    })

    // Другие обработчики событий
  }
  return bot
}

export function getBot() {
  return bot
}
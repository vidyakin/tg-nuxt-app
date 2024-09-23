import { getBot } from '../utils/bot'

export default defineEventHandler(async (event) => {
  const { chatId, action, body } = await readBody(event)
  const bot = getBot()

  if (!bot) {
    throw new Error('Bot is not initialized')
  }

  if (action === 'button_clicked') {
    await bot.sendMessage(chatId, 'Вы нажали на кнопку!')
  }

  return { ok: true }
})
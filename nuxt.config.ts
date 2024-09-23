// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // Обязательно для серверной обработки
  ssr: true,

  runtimeConfig: {
    public: {
      BOT_TOKEN: process.env.BOT_TOKEN, // Токен бота
    }
  },

  modules: ['@pinia/nuxt', '@nuxt/ui'],
})
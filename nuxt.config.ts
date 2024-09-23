// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  // Обязательно для серверной обработки
  ssr: true,

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: '@use "~/assets/css/colors.scss" as *;'
        }
      }
    }
  },
  css: ['~/assets/css/main.scss'],

  runtimeConfig: {
    public: {
      BOT_TOKEN: process.env.BOT_TOKEN, // Токен бота
    }
  },

  app: {
    head: {
      script: [
        { src: 'https://telegram.org/js/telegram-web-app.js', defer: true },
      ],
    },
  },

  modules: ['@pinia/nuxt', '@nuxt/ui'],
  nitro: {
    plugins: ['~/server/plugins/bot.ts']
  },
})
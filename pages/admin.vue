<template>
  Hello, Admin
  <BounceLoader v-if="!loaded" />
  <div v-else-if="isTelegramUser">
    <div>
      <h1>Привет АДМИН, {{ user.first_name }}!</h1>
      <p>Ваше имя: {{ user.first_name }} {{ user.last_name }}</p>
      <p>Ваш ID: {{ user.id }}</p>
    </div>
    <UButton @click="sendDataToBot">Нажми меня</UButton>
    
  </div>
  <div v-else>
    <UButton>Вы не в телеграме, увы 2</UButton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const loaded = ref(false)

import { useRouter } from 'vue-router';
import BounceLoader from "@/components/ui/BounceLoader.vue"
import type { TelegramUser } from '~/types/tg';
const { useWebApp, useWebAppPopup } = await import('vue-tg')
const { showAlert } = useWebAppPopup()


const router = useRouter();

const isTelegramUser = ref(false)
const user: TelegramUser = ref({});

const sendActionToBot = () => {
  // Отправляем данные в Telegram бота
  useWebApp().sendData(JSON.stringify({ action: 'button_clicked' }));
};

const sendDataToBot = async () => {
  // const chatId = useWebApp().initDataUnsafe.user.id;
  await fetch('/api/bot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chatId: user.value.id, action: 'button_clicked' }),
  });
  showAlert('Заказ принят!')
}

// Инициализация Web App Telegram
onMounted(() => {
  loaded.value = true
  if (!window.Telegram) return
  const {initDataUnsafe, ready} = useWebApp()
  ready();
  user.value = initDataUnsafe?.user;
  isTelegramUser.value = user.value?.id != undefined
  
  
});
</script>
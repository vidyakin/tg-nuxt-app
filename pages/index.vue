<template>
  <div>
    <div>isTelegramUser: {{ isTelegramUser }}</div>
    <BounceLoader v-if="!loaded" />
    <div v-else-if="isTelegramUser">
      <div>
        Привет обычный юзер. Твои данные:
        <!-- <pre>{{ user }}</pre> -->
        <h1>Привет, {{ user.first_name }}!</h1>
        <p>Ваше имя: {{ user.first_name }} {{ user.last_name }}</p>
        <p>Ваш ID: {{ user.id }}, ник: {{ user.username }}</p>
      </div>
      <UButton @click="sendDataToBot">Нажми меня</UButton>
    </div>
    <div v-else>
      <UButton>Вы не в телеграме, увы 1</UButton>
    </div>
  </div>
  
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { TelegramUser } from '~/types/tg';
const { useWebApp, useWebAppPopup } = await import('vue-tg')
const { showAlert } = useWebAppPopup()

import BounceLoader from "@/components/ui/BounceLoader.vue"

import { useRouter } from 'vue-router';
const router = useRouter();


const isTelegramUser = ref(false)
const loaded = ref(false)
const user: TelegramUser = ref({});

const sendActionToBot = () => {
  if (!window.Telegram) return
  // Отправляем данные в Telegram бота
  useWebApp().sendData(JSON.stringify({ action: 'button_clicked' }));
};

const sendDataToBot = async () => {
  const {initDataUnsafe} = useWebApp()
  const chatId = initDataUnsafe?.user?.id;
  if (!chatId) return
  await fetch('/api/bot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chatId, action: 'button_clicked' }),
  });
  showAlert('OK!')
}

// Инициализация Web App Telegram
onMounted(() => {
  const { initData, initDataUnsafe, ready } = window.Telegram.WebApp;
  ready();
  user.value = initDataUnsafe?.user;
  
  isTelegramUser.value = user.value?.id != undefined
  if (!isTelegramUser.value) {
    router.push('/web')
  } else {
    // Логика перенаправления на разные страницы для разных пользователей
    // if (user.value.id === 23481476) {
    if (user.value.username === 'vid_sergey') {
      // Перенаправление на страницу клиента 1
      router.push('/admin');
    } else if (user.value.username === 'xlevinx') {
      // Перенаправление на страницу клиента 2
      router.push('/xlevinx');
    } else if (user.value.username === 'MriyaVid') {
      // Перенаправление на страницу клиента 2
      router.push('/masha');
    } else {
      loaded.value = true
      // все остальные просто остаются здесь
    }
  }
});
</script>
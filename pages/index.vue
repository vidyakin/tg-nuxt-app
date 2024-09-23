<template>
  <BounceLoader v-if="!loaded" />
  <div v-else-if="isTelegramUser">
    <div>
      <h1>Привет, {{ user.first_name }}!</h1>
      <p>Ваше имя: {{ user.first_name }} {{ user.last_name }}</p>
      <p>Ваш ID: {{ user.id }}</p>
    </div>
    <UButton @click="sendDataToBot">Нажми меня</UButton>
    
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
  </div>
  <div v-else>
    <UButton>Вы не в телеграме, увы</UButton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import BounceLoader from "@/components/ui/BounceLoader.vue"
const router = useRouter();

const isTelegramUser = ref(false)
const loaded = ref(false)
const user = ref({});

const sendActionToBot = () => {
  if (!window.Telegram) return
  // Отправляем данные в Telegram бота
  window.Telegram.WebApp.sendData(JSON.stringify({ action: 'button_clicked' }));
};

const sendDataToBot = async () => {
  const chatId = window.Telegram.WebApp.initDataUnsafe.user.id;
  await fetch('/api/bot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chatId, action: 'button_clicked' }),
  });
}

// Инициализация Web App Telegram
onMounted(() => {
  loaded.value = true
  if (!window.Telegram) return
  window.Telegram.WebApp.ready();
  user.value = window.Telegram.WebApp.initDataUnsafe?.user;
  isTelegramUser.value = user.value != undefined
  
  // Логика перенаправления на разные страницы для разных пользователей
  // if (user.value.id === 12345) {
  //   // Перенаправление на страницу клиента 1
  //   router.push('/client1');
  // } else if (user.value.id === 67890) {
  //   // Перенаправление на страницу клиента 2
  //   router.push('/client2');
  // } else {
  //   // Если пользователь не найден или нет условий, перенаправляем на общую страницу
  //   router.push('/default');
  // }
});
</script>
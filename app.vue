<template>
  <div v-if="isTelegram">
    <div>
      <h1>Привет, {{ user.first_name }}!</h1>
      <p>Ваше имя: {{ user.first_name }} {{ user.last_name }}</p>
      <p>Ваш ID: {{ user.id }}</p>
    </div>
    <button @click="sendActionToBot">Нажми меня</button>
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
  </div>
  <div v-else>
    <UButton>Вы не в телеграме</UButton>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();

const isTelegram = ref(false)
const user = ref({});

const sendActionToBot = () => {
  if (!window.Telegram) return
  // Отправляем данные в Telegram бота
  window.Telegram.WebApp.sendData(JSON.stringify({ action: 'button_clicked' }));
};

// Инициализация Web App Telegram
onMounted(() => {
  if (!window.Telegram) return
  isTelegram.value = true
  window.Telegram.WebApp.ready();
  user.value = window.Telegram.WebApp.initDataUnsafe.user;
  
  // Логика перенаправления на разные страницы для разных пользователей
  if (user.value.id === 12345) {
    // Перенаправление на страницу клиента 1
    router.push('/client1');
  } else if (user.value.id === 67890) {
    // Перенаправление на страницу клиента 2
    router.push('/client2');
  } else {
    // Если пользователь не найден или нет условий, перенаправляем на общую страницу
    router.push('/default');
  }
});
</script>
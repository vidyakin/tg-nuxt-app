<template>
  <div>
    Hello, Masha!
    <UButton @click="sendDataToBot">Нажми меня</UButton>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const loaded = ref(false)
const { useWebApp, useWebAppPopup } = await import('vue-tg')
const { showAlert } = useWebAppPopup()
import type { TelegramUser } from '~/types/tg';

const user: TelegramUser = ref({});

const sendDataToBot = async () => {
  // const chatId = useWebApp().initDataUnsafe.user.id;
  await fetch('/api/bot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ chatId: user.value.id, action: 'button_clicked' }),
  });
  showAlert(`Заказ принят, ${user.value.username}!`)
}

// Инициализация Web App Telegram
onMounted(() => {
  loaded.value = true
  if (!window.Telegram) return
  const {initDataUnsafe, ready} = useWebApp()
  ready();
  user.value = initDataUnsafe?.user;  
  
});

</script>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BounceLoader from "@/components/ui/BounceLoader.vue"

import type { TelegramUser } from '~/types/tg';

const loaded = ref(false)

// Инициализация Web App Telegram
onMounted(() => {
  loaded.value = true  
})
</script>

<template>
  <BounceLoader v-if="!loaded" />
  <NuxtLayout>
    <ClientOnly>
      <NuxtPage />
    </ClientOnly>
  </NuxtLayout>
</template>
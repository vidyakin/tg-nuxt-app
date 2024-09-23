<script setup lang="ts">

</script>

<template>
  <main>
    <ClientOnly>
      <UContainer class="px-4 py-2 lg:w-2/3">
        Welcome to Telegram!
        <slot />
      </UContainer>
    </ClientOnly>
  </main>
</template>
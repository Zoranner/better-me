<template>
  <main class="main-content">
    <ChatContainer />
  </main>
</template>

<script setup lang="ts">
import ChatContainer from '../chat/ChatContainer.vue'
</script>

<style scoped>
.main-content {
  flex-grow: 1;
  background-color: var(--primary-bg);
  height: 100vh;
  overflow: hidden;
}
</style> 
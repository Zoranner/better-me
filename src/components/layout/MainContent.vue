<template>
  <main class="main-content">
    <ChatContainer v-if="isChat" />
    <div v-else class="placeholder">
      <p>{{ menuStore.activeMainMenu }} 功能正在开发中...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMenuStore } from '../../stores/menu'
import ChatContainer from '../chat/ChatContainer.vue'

const menuStore = useMenuStore()
const isChat = computed(() => menuStore.activeMainMenu === 'chat')
</script>

<style scoped>
.main-content {
  flex: 1;
  min-width: 0;
  background-color: var(--primary-bg);
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.placeholder {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  opacity: 0.5;
  font-size: 1.1rem;
}
</style> 
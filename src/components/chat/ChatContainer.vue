<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ChatMessage from './ChatMessage.vue'
import ChatInput from './ChatInput.vue'
import { useChatStore } from '../../stores/chat'

const chatStore = useChatStore()
const { activeChat } = storeToRefs(chatStore)
</script>

<template>
  <div class="chat-container">
    <div class="chat-content">
      <div v-if="activeChat" class="messages-list">
        <ChatMessage
          v-for="message in activeChat.messages"
          :key="message.id"
          v-bind="message"
        />
      </div>
      <div v-else class="empty-state">
        请选择一个对话或开始新的对话
      </div>
    </div>
    <ChatInput v-if="activeChat" />
  </div>
</template>

<style scoped>
.chat-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #18181b;
}

.chat-content {
  flex: 1;
  overflow-y: auto;
}

.messages-list {
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.empty-state {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #71717a;
  font-size: 1.1rem;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
</style> 
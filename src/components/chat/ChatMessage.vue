<script setup lang="ts">
import MarkdownRenderer from './MarkdownRenderer.vue'

interface Props {
  content: string
  timestamp?: string
  isUser?: boolean
  tokens?: number
  model?: string
}

defineProps<Props>()
</script>

<template>
  <div class="message-container" :class="{ 'user-message': isUser }">
    <div class="avatar" :class="{ 'user-avatar': isUser }"></div>
    <div class="message-content">
      <div class="message-text">
        <MarkdownRenderer :content="content" />
      </div>
      <div class="message-info">
        <div class="message-actions">
          <button class="action-btn">
            <i class="bookmark-icon"></i>
          </button>
          <button class="action-btn">
            <i class="copy-icon"></i>
          </button>
          <button class="action-btn">
            <i class="delete-icon"></i>
          </button>
        </div>
        <div class="message-meta">
          <span v-if="tokens">{{ tokens }} tokens</span>
          <span v-if="model">{{ model }}</span>
          <span v-if="timestamp">{{ timestamp }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.message-container {
  display: flex;
  padding: 16px;
  gap: 12px;
  width: 100%;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
  flex-shrink: 0;
}

.user-avatar {
  background: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
}

.message-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0; /* 防止flex子元素溢出 */
}

.message-text {
  font-size: 14px;
  line-height: 1.6;
  color: #e4e4e7;
}

.message-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.message-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: #71717a;
}

.action-btn:hover {
  color: #e4e4e7;
}

.message-meta {
  display: flex;
  gap: 12px;
  color: #71717a;
  font-size: 12px;
}
</style> 
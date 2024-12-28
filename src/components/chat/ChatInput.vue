<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useChatStore } from '../../stores/chat'
import MarkdownRenderer from './MarkdownRenderer.vue'

const chatStore = useChatStore()
const message = ref('')
const textareaRef = ref<HTMLTextAreaElement>()
const showPreview = ref(false)

const handleSubmit = () => {
  if (!message.value.trim()) return
  
  chatStore.sendMessage(message.value)
  message.value = ''
  
  // 重置输入框高度
  if (textareaRef.value) {
    textareaRef.value.style.height = '80px'
  }
  showPreview.value = false
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSubmit()
  }
}

const adjustHeight = () => {
  const textarea = textareaRef.value
  if (!textarea) return
  
  // 先将高度设为 auto，以便正确计算 scrollHeight
  textarea.style.height = '80px'
  
  // 计算新的高度，但不超过最大高度
  const newHeight = Math.min(textarea.scrollHeight, 200)
  textarea.style.height = `${Math.max(80, newHeight)}px`
}

const handleInput = () => {
  nextTick(adjustHeight)
}

const togglePreview = () => {
  showPreview.value = !showPreview.value
}
</script>

<template>
  <div class="chat-input-container">
    <div class="input-wrapper">
      <div v-if="showPreview" class="preview-area">
        <MarkdownRenderer :content="message" />
      </div>
      <textarea
        v-else
        ref="textareaRef"
        v-model="message"
        class="message-input"
        placeholder="输入消息，Enter 发送，Shift + Enter 换行，支持 Markdown 语法"
        @keydown="handleKeydown"
        @input="handleInput"
      />
      <div class="button-container">
        <button 
          class="preview-button"
          :class="{ active: showPreview }"
          :title="showPreview ? '编辑' : '预览'"
          @click="togglePreview"
        >
          <span aria-hidden="true">{{ showPreview ? '✏️' : '👁️' }}</span>
        </button>
        <button 
          class="send-button"
          :disabled="!message.trim()"
          @click="handleSubmit"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-input-container {
  border-top: 1px solid var(--border-color);
  padding: 20px;
  background-color: #18181b;
}

.input-wrapper {
  display: flex;
  gap: 12px;
  background-color: #27272a;
  border-radius: 8px;
  padding: 16px;
}

.message-input {
  flex: 1;
  height: 80px;
  background: none;
  border: none;
  color: #e4e4e7;
  font-size: 14px;
  line-height: 1.5;
  resize: none;
  outline: none;
  padding: 0;
}

.message-input::placeholder {
  color: #71717a;
}

.preview-area {
  flex: 1;
  height: 80px;
  overflow-y: auto;
  padding: 0;
}

.button-container {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding-bottom: 4px;
}

.preview-button {
  background: none;
  border: 1px solid var(--border-color);
  color: #71717a;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.preview-button:hover {
  color: #e4e4e7;
  background-color: #3f3f46;
}

.preview-button.active {
  color: #e4e4e7;
  background-color: #3f3f46;
}

.send-button {
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.send-button:hover {
  background-color: #2563eb;
}

.send-button:disabled {
  background-color: #3f3f46;
  cursor: not-allowed;
}
</style> 
<template>
  <div class="chat-content">
    <div class="chat-header">
      <h2 class="title">{{ currentChat?.title }}</h2>
      <div class="actions">
        <button class="action-btn" @click="handleRename">
          <span class="icon">✏️</span>
        </button>
        <button class="action-btn" @click="handleDelete">
          <span class="icon">🗑️</span>
        </button>
      </div>
    </div>

    <div class="message-list" ref="messageList">
      <div 
        v-for="message in messages" 
        :key="message.id"
        class="message"
        :class="message.role"
      >
        <div class="message-content">{{ message.content }}</div>
        <div class="message-meta">
          <span class="time">{{ message.time }}</span>
          <button 
            v-if="message.role === 'assistant'"
            class="copy-btn"
            @click="copyToClipboard(message.content)"
          >
            复制
          </button>
        </div>
      </div>
    </div>

    <div class="input-area">
      <div class="input-wrapper">
        <textarea
          v-model="inputContent"
          class="input"
          placeholder="输入消息..."
          rows="1"
          @keydown.enter.prevent="handleSend"
          @input="autoResize"
          ref="textarea"
        ></textarea>
        <button 
          class="send-btn"
          :disabled="!inputContent.trim()"
          @click="handleSend"
        >
          发送
        </button>
      </div>
      <div class="tools">
        <button class="tool-btn">
          <span class="icon">📎</span>
        </button>
        <button class="tool-btn">
          <span class="icon">🎤</span>
        </button>
        <button class="tool-btn">
          <span class="icon">⚙️</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '../../stores/menu'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  time: string
}

const menuStore = useMenuStore()
const { currentItem: currentChat } = storeToRefs(menuStore)

// 模拟消息数据
const messages = ref<Message[]>([
  {
    id: '1',
    role: 'assistant',
    content: '你好！我是一个AI助手，有什么我可以帮你的吗？',
    time: '12:00'
  }
])

const messageList = ref<HTMLElement>()
const textarea = ref<HTMLTextAreaElement>()
const inputContent = ref('')

const handleSend = async () => {
  const content = inputContent.value.trim()
  if (!content) return

  // 添加用户消息
  messages.value.push({
    id: Date.now().toString(),
    role: 'user',
    content,
    time: new Date().toLocaleTimeString()
  })

  // 清空输入框
  inputContent.value = ''
  
  // 重置输入框高度
  if (textarea.value) {
    textarea.value.style.height = 'auto'
  }

  // 滚动到底部
  await nextTick()
  scrollToBottom()

  // TODO: 发送消息到服务器并处理响应
}

const handleRename = () => {
  // TODO: 实现重命名功能
}

const handleDelete = () => {
  // TODO: 实现删除功能
}

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
  // TODO: 显示复制成功提示
}

const autoResize = () => {
  const element = textarea.value
  if (!element) return

  element.style.height = 'auto'
  element.style.height = `${element.scrollHeight}px`
}

const scrollToBottom = () => {
  const element = messageList.value
  if (!element) return

  element.scrollTop = element.scrollHeight
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #1e1e1e;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.title {
  font-size: 1.125rem;
  font-weight: 500;
  margin: 0;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.message {
  max-width: 80%;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.message.user {
  align-self: flex-end;
}

.message-content {
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.05);
  font-size: 0.875rem;
  line-height: 1.5;
}

.message.user .message-content {
  background-color: #0a84ff;
  color: #ffffff;
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
}

.time {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

.copy-btn {
  font-size: 0.75rem;
  padding: 0.125rem 0.375rem;
  border: none;
  background: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: color 0.2s ease;
}

.copy-btn:hover {
  color: rgba(255, 255, 255, 0.8);
}

.input-area {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.input-wrapper {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.input {
  flex: 1;
  min-height: 2.5rem;
  max-height: 8rem;
  padding: 0.625rem 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.5;
  resize: none;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.send-btn {
  align-self: flex-end;
  padding: 0.625rem 1.25rem;
  background-color: #0a84ff;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.send-btn:disabled {
  background-color: rgba(10, 132, 255, 0.5);
  cursor: not-allowed;
}

.send-btn:not(:disabled):hover {
  background-color: #0070e0;
}

.tools {
  display: flex;
  gap: 0.5rem;
}

.tool-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
}

.tool-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
}

.message-list::-webkit-scrollbar {
  width: 4px;
}

.message-list::-webkit-scrollbar-track {
  background: transparent;
}

.message-list::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.message-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
</style> 
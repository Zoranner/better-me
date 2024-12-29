<template>
  <div class="h-full flex flex-col bg-base-100">
    <ContentHeader :title="currentChat?.title || ''">
      <template #actions>
        <button class="btn btn-ghost btn-square btn-sm" @click="handleRename">
          <span class="text-lg">✏️</span>
        </button>
        <button class="btn btn-ghost btn-square btn-sm" @click="handleDelete">
          <span class="text-lg">🗑️</span>
        </button>
      </template>
    </ContentHeader>

    <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messageList">
      <div 
        v-for="message in messages" 
        :key="message.id"
        class="max-w-[80%]"
        :class="message.role === 'user' ? 'self-end' : ''"
      >
        <div 
          class="px-4 py-3 rounded-2xl text-sm leading-relaxed"
          :class="message.role === 'user' ? 'bg-primary text-primary-content' : 'bg-base-200'"
        >
          {{ message.content }}
        </div>
        <div class="flex items-center gap-2 px-2 mt-1">
          <span class="text-xs opacity-70">{{ message.time }}</span>
          <button 
            v-if="message.role === 'assistant'"
            class="btn btn-ghost btn-xs"
            @click="copyToClipboard(message.content)"
          >
            复制
          </button>
        </div>
      </div>
    </div>

    <div class="p-4 border-t bg-base-200">
      <div class="join w-full">
        <textarea
          v-model="inputContent"
          class="textarea textarea-bordered join-item flex-1"
          placeholder="输入消息..."
          rows="1"
          @keydown.enter.prevent="handleSend"
          @input="autoResize"
          ref="textarea"
        ></textarea>
        <button 
          class="btn join-item"
          :disabled="!inputContent.trim()"
          @click="handleSend"
        >
          发送
        </button>
      </div>
      <div class="flex gap-2 mt-2">
        <button class="btn btn-ghost btn-square btn-sm">
          <span class="text-lg">📎</span>
        </button>
        <button class="btn btn-ghost btn-square btn-sm">
          <span class="text-lg">🎤</span>
        </button>
        <button class="btn btn-ghost btn-square btn-sm">
          <span class="text-lg">⚙️</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '../../stores/menu'
import ContentHeader from '../shared/ContentHeader.vue'

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
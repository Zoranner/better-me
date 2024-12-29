<template>
  <div class="h-full flex flex-col bg-base-100">
    <ContentHeader :title="currentChat?.title || ''">
      <template #actions>
        <button class="btn btn-ghost btn-sm gap-2">
          <span>📝</span>
          重命名
        </button>
        <button class="btn btn-ghost btn-sm gap-2">
          <span>🗑️</span>
          删除
        </button>
      </template>
    </ContentHeader>

    <div class="flex-1 p-4 overflow-y-auto space-y-4" ref="messageList">
      <div
        v-for="message in messages"
        :key="message.id"
        class="chat"
        :class="message.role === 'assistant' ? 'chat-receiver' : 'chat-sender'"
      >
        <div class="chat-avatar avatar">
          <div class="size-10 rounded-full">
            <img 
              :src="message.role === 'assistant' 
                ? 'https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png' 
                : 'https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png'" 
              alt="avatar" 
            />
          </div>
        </div>
        <div class="chat-header text-base-content/90">
          {{ message.role === 'assistant' ? 'AI 助手' : '我' }}
          <time class="text-base-content/50">{{ message.time }}</time>
        </div>
        <div class="chat-bubble">{{ message.content }}</div>
        <div class="chat-footer text-base-content/50">
          <div class="flex items-center gap-1">
            {{ message.role === 'assistant' ? 'AI 生成' : '已发送' }}
            <span v-if="message.role === 'user'" class="icon-[tabler--checks] text-success align-bottom"></span>
          </div>
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
import { ref, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '../../stores/menu'
import type { Message } from '../../types/chat'
import ContentHeader from '../shared/ContentHeader.vue'

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

const autoResize = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  target.style.height = 'auto'
  target.style.height = target.scrollHeight + 'px'
}

const scrollToBottom = () => {
  if (messageList.value) {
    messageList.value.scrollTop = messageList.value.scrollHeight
  }
}

onMounted(() => {
  scrollToBottom()
})
</script> 
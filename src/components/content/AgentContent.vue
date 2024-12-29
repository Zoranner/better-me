<template>
  <div class="h-full flex flex-col bg-base-100">
    <ContentHeader :title="item?.title || ''">
      <template #actions>
        <div 
          class="badge badge-lg"
          :class="{
            'badge-success': item?.status === 'online',
            'badge-error': item?.status === 'offline'
          }"
        >
          {{ item?.status === 'online' ? '在线' : '离线' }}
        </div>
      </template>
    </ContentHeader>

    <div class="flex-1 p-6 overflow-y-auto">
      <div class="mb-8">
        <div class="flex gap-4 items-center mb-4">
          <div class="w-12 h-12 flex items-center justify-center text-2xl bg-base-100 rounded-xl border">
            🤖
          </div>
          <p class="text-base-content/70 m-0">{{ item?.description }}</p>
        </div>
      </div>

      <div class="mb-8">
        <h3 class="text-base font-medium mb-4">功能介绍</h3>
        <p class="text-base-content/70 leading-relaxed">这是一个智能助手，可以帮助你完成特定领域的任务。</p>
      </div>

      <div class="mb-8">
        <h3 class="text-base font-medium mb-4">使用说明</h3>
        <ul class="pl-5 text-base-content/70 leading-relaxed">
          <li class="mb-2">直接输入你的问题或需求</li>
          <li class="mb-2">支持多轮对话</li>
          <li class="mb-2">可以上传相关文件</li>
        </ul>
      </div>

      <div>
        <h3 class="text-base font-medium mb-4">示例</h3>
        <div class="space-y-3">
          <div class="p-3 bg-base-200 border rounded-lg cursor-pointer hover:bg-base-300 transition-all">
            "帮我优化这段代码的性能"
          </div>
          <div class="p-3 bg-base-200 border rounded-lg cursor-pointer hover:bg-base-300 transition-all">
            "分析这篇文章的主要观点"
          </div>
          <div class="p-3 bg-base-200 border rounded-lg cursor-pointer hover:bg-base-300 transition-all">
            "给这段文字提供修改建议"
          </div>
        </div>
      </div>
    </div>

    <div class="p-5 border-t bg-base-200">
      <textarea 
        class="textarea textarea-bordered w-full h-32 mb-3"
        placeholder="输入你的需求..."
        v-model="message"
        @keydown.enter.prevent="sendMessage"
      ></textarea>
      <div class="flex justify-end gap-3">
        <button class="btn btn-ghost">📎</button>
        <button class="btn btn-primary">发送</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AgentItem } from '../../types/menu'
import ContentHeader from '../shared/ContentHeader.vue'

defineProps<{
  item?: AgentItem
}>()

const message = ref('')

const sendMessage = (e: KeyboardEvent) => {
  if (e.shiftKey) {
    return
  }
  if (message.value.trim()) {
    // TODO: 发送消息
    message.value = ''
  }
}
</script> 
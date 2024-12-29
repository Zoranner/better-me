<template>
  <div class="w-20 h-full flex flex-col bg-base-200 border-r border-base-200">
    <ul class="menu menu-sm flex-1 p-2">
      <li v-for="menu in menus" :key="menu.type">
        <a 
          href="#"
          :class="{ 'active bg-primary text-primary-content': menu.type === activeMenu }"
          @click.prevent="$emit('change', menu.type)"
          class="flex flex-col items-center py-3 hover:bg-base-300"
        >
          <span class="text-2xl mb-1">{{ menu.icon }}</span>
          <span class="text-xs">{{ menu.label }}</span>
        </a>
      </li>
    </ul>
    <ul class="menu menu-sm p-2 border-t border-base-200">
      <li>
        <a 
          href="#"
          @click.prevent="$emit('openSettings')"
          class="flex flex-col items-center py-3 hover:bg-base-300"
        >
          <span class="text-2xl mb-1">⚙️</span>
          <span class="text-xs">设置</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { MenuType } from '../../types/menu'

defineProps<{
  activeMenu: MenuType
}>()

defineEmits<{
  (e: 'change', type: MenuType): void
  (e: 'openSettings'): void
}>()

const menus = [
  { type: 'chat' as const, icon: '💬', label: '对话' },
  { type: 'agent' as const, icon: '🤖', label: '智能体' },
  { type: 'knowledge' as const, icon: '📚', label: '知识库' },
  { type: 'tool' as const, icon: '🛠️', label: '工具' }
]
</script> 
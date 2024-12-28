<template>
  <div class="menu-bar">
    <div class="main-menu">
      <button 
        v-for="menu in menus" 
        :key="menu.type"
        class="menu-btn"
        :class="{ active: menu.type === activeMenu }"
        @click="$emit('change', menu.type)"
      >
        <span class="icon">{{ menu.icon }}</span>
        <span class="label">{{ menu.label }}</span>
      </button>
    </div>
    <button class="settings-btn" @click="$emit('openSettings')">
      <span class="icon">⚙️</span>
      <span class="label">设置</span>
    </button>
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

<style scoped>
.menu-bar {
  width: 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #2d2d2d;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.5rem 0;
}

.main-menu {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0 0.5rem;
}

.menu-btn,
.settings-btn {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.menu-btn:hover,
.settings-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
}

.menu-btn.active {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.icon {
  font-size: 1.25rem;
}

.label {
  font-size: 0.7rem;
}
</style> 
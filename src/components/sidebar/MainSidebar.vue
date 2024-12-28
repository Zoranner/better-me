<template>
  <div class="sidebar">
    <div class="menu-items">
      <div 
        v-for="type in ['chat', 'agent', 'knowledge', 'tool'] as const"
        :key="type"
        class="menu-item" 
        :class="{ active: activeMenu === type }"
        @click="$emit('menu-change', type)"
      >
        <i class="icon">{{ 
          type === 'chat' ? '💬' :
          type === 'agent' ? '🤖' :
          type === 'knowledge' ? '📚' : '🛠️'
        }}</i>
        {{ menuTitles[type] }}
      </div>
    </div>
    <div class="settings-item" @click="$emit('open-settings')">
      <i class="icon">⚙️</i>
      设置
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuType } from '../../types/menu'

defineProps<{
  activeMenu: MenuType
}>()

defineEmits<{
  (e: 'menu-change', type: MenuType): void
  (e: 'open-settings'): void
}>()

const menuTitles: Record<MenuType, string> = {
  chat: '对话',
  agent: '智能体',
  knowledge: '知识库',
  tool: '工具'
}
</script>

<style scoped>
.sidebar {
  width: 64px;
  background-color: #2d2d2d;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item, .settings-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.625rem 0.375rem;
  cursor: pointer;
  font-size: 0.75rem;
  gap: 0.25rem;
  transition: all 0.2s ease;
  border-radius: 8px;
  margin: 0 0.375rem;
  opacity: 0.85;
  position: relative;
}

.menu-item:hover, .settings-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-1px);
  opacity: 1;
}

.menu-item.active {
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: 1;
}

.menu-item.active::before {
  content: '';
  position: absolute;
  left: -0.375rem;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 1.5rem;
  background-color: #0066cc;
  border-radius: 0 3px 3px 0;
}

.icon {
  font-size: 1.4rem;
  margin-bottom: 0.125rem;
  transition: transform 0.2s ease;
}

.menu-item:hover .icon,
.settings-item:hover .icon {
  transform: scale(1.1);
}

.menu-item.active .icon {
  transform: scale(1.1);
  text-shadow: 0 2px 8px rgba(255, 255, 255, 0.2);
}
</style> 
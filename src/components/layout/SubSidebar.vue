<script setup lang="ts">
import { computed } from 'vue'
import { useMenuStore } from '../../stores/menu'
import { useChatStore } from '../../stores/chat'
import { useI18n } from 'vue-i18n'
import type { MenuItem } from '../../types/menu'

const menuStore = useMenuStore()
const chatStore = useChatStore()
const { t } = useI18n()

const activeMenuTitle = computed(() => {
  const activeItem = menuStore.mainMenuItems.find((item: MenuItem) => item.id === menuStore.activeMainMenu)
  return activeItem ? t(`menu.${activeItem.id}`) : ''
})

const isChat = computed(() => menuStore.activeMainMenu === 'chat')
</script>

<template>
  <aside class="sub-sidebar">
    <header class="sub-header">
      <h2>{{ activeMenuTitle }}</h2>
      <button class="add-button" :title="t('actions.add')">
        <span aria-hidden="true">+</span>
      </button>
    </header>
    <div class="sub-menu-items">
      <template v-if="isChat">
        <button
          v-for="chat in chatStore.chats" 
          :key="chat.id" 
          :class="['sub-menu-item', { active: chat.id === chatStore.activeChatId }]"
          @click="chatStore.setActiveChat(chat.id)"
        >
          <div class="title">{{ chat.title }}</div>
          <time class="time">{{ chat.time }}</time>
        </button>
      </template>
      <template v-else>
        <button
          v-for="(item, index) in menuStore.subMenuItems[menuStore.activeMainMenu]" 
          :key="index" 
          class="sub-menu-item"
        >
          <div class="title">{{ item.title }}</div>
          <template v-if="'description' in item">
            <div class="description">{{ item.description }}</div>
          </template>
          <template v-else>
            <div class="time">{{ item.time }}</div>
          </template>
        </button>
      </template>
    </div>
  </aside>
</template>

<style scoped>
.sub-sidebar {
  width: var(--sub-sidebar-width);
  min-width: var(--sub-sidebar-width);
  background-color: var(--secondary-bg);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
}

.sub-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color);
}

.sub-header h2 {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.add-button {
  background: none;
  border: 1px solid var(--border-color);
  color: var(--text-color);
  width: 30px;
  height: 30px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-left: 12px;
}

.add-button:hover {
  background-color: var(--hover-bg);
}

.sub-menu-items {
  padding: 12px;
  overflow-y: auto;
  flex: 1;
}

.sub-menu-item {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 8px;
  background: none;
  border: none;
  color: inherit;
  text-align: left;
  font: inherit;
  transition: all 0.2s ease;
}

.sub-menu-item:hover {
  background-color: var(--hover-bg);
}

.sub-menu-item.active {
  background-color: var(--hover-bg);
}

.sub-menu-item .title {
  font-weight: 500;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sub-menu-item .time,
.sub-menu-item .description {
  font-size: 0.9rem;
  opacity: 0.7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style> 
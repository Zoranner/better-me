<script setup lang="ts">
import { ref } from 'vue'
import { useMenuStore } from '../../stores/menu'
import { useI18n } from 'vue-i18n'
import SettingsDialog from '../settings/SettingsDialog.vue'
import type { MenuItem } from '../../types/menu'

const { t } = useI18n()
const menuStore = useMenuStore()
const showSettings = ref(false)

const handleMenuClick = (item: MenuItem) => {
  menuStore.setActiveMainMenu(item.id)
}
</script>

<template>
  <nav class="main-sidebar">
    <div class="menu-items">
      <button
        v-for="item in menuStore.mainMenuItems" 
        :key="item.id" 
        :class="['menu-item', { active: menuStore.activeMainMenu === item.id }]"
        :title="t(`menu.${item.id}`)"
        @click="handleMenuClick(item)"
      >
        <span class="icon" aria-hidden="true">{{ item.icon }}</span>
        <span class="text">{{ t(`menu.${item.id}`) }}</span>
      </button>
    </div>
    <div class="settings-container">
      <button 
        class="menu-item" 
        :title="t('general.settings')"
        @click="showSettings = true"
      >
        <span class="icon" aria-hidden="true">⚙️</span>
        <span class="text">{{ t('general.settings') }}</span>
      </button>
    </div>
    <SettingsDialog v-model="showSettings" />
  </nav>
</template>

<style scoped>
.main-sidebar {
  width: var(--main-sidebar-width);
  min-width: var(--main-sidebar-width);
  background-color: var(--primary-bg);
  border-right: 1px solid var(--border-color);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex-shrink: 0;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 6px;
  margin: 0 8px;
  background: none;
  border: none;
  color: inherit;
  text-align: left;
  font: inherit;
}

.menu-item:hover {
  background-color: var(--hover-bg);
}

.menu-item.active {
  background-color: var(--secondary-bg);
}

.menu-item .icon {
  margin-right: 12px;
  flex-shrink: 0;
}

.menu-item .text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.settings-container {
  padding: 10px 0;
  border-top: 1px solid var(--border-color);
}
</style> 
<script setup lang="ts">
import { ref } from 'vue'
import { useMenuStore } from '../../stores/menu'
import { useI18n } from 'vue-i18n'
import SettingsDialog from '../settings/SettingsDialog.vue'

const { t } = useI18n()
const menuStore = useMenuStore()
const showSettings = ref(false)

const openSettings = () => {
  showSettings.value = true
}
</script>

<template>
  <nav class="main-sidebar">
    <div class="menu-items">
      <div v-for="item in menuStore.mainMenuItems" 
           :key="item.id" 
           :class="['menu-item', { active: menuStore.activeMainMenu === item.id }]"
           @click="menuStore.setActiveMainMenu(item.id)">
        <span class="icon">{{ item.icon }}</span>
        <span class="text">{{ t(`menu.${item.id}`) }}</span>
      </div>
    </div>
    <div class="settings-container">
      <div class="menu-item" @click="openSettings">
        <span class="icon">⚙️</span>
        <span class="text">{{ t('general.settings') }}</span>
      </div>
    </div>
    <SettingsDialog v-model="showSettings" />
  </nav>
</template>

<style scoped>
.main-sidebar {
  width: var(--main-sidebar-width);
  background-color: var(--primary-bg);
  border-right: 1px solid var(--border-color);
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  border-radius: 6px;
  margin: 0 8px;
}

.menu-item:hover {
  background-color: var(--hover-bg);
}

.menu-item.active {
  background-color: var(--secondary-bg);
}

.menu-item .icon {
  margin-right: 12px;
}

.settings-container {
  padding: 10px 0;
  border-top: 1px solid var(--border-color);
}
</style> 
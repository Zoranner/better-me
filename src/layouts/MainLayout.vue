<template>
  <div class="flex h-screen overflow-hidden">
    <MenuBar
      :active-menu="activeMainMenu"
      @change="setActiveMainMenu"
      @openSettings="$emit('openSettings')"
    />
    
    <ListContainer
      :type="activeMainMenu"
      :active-id="activeSubMenuId"
      @select="setActiveSubMenu"
    />

    <ContentContainer
      :type="activeMainMenu"
      :active-id="activeSubMenuId"
      class="flex-1"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMenuStore } from '../stores/menu'
import type { MenuType } from '../types/menu'

import MenuBar from '../components/menu/MenuBar.vue'
import ListContainer from '../components/menu/ListContainer.vue'
import ContentContainer from '../components/content/ContentContainer.vue'

const menuStore = useMenuStore()
const { 
  activeMainMenu,
  activeSubMenuId
} = storeToRefs(menuStore)

const setActiveMainMenu = (type: MenuType) => {
  menuStore.setActiveMainMenu(type)
}

const setActiveSubMenu = (id: string) => {
  menuStore.setActiveSubMenu(id)
}

defineEmits<{
  (e: 'openSettings'): void
}>()
</script> 
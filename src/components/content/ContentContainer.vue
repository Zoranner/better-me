<template>
  <div class="content-container">
    <Transition name="fade" mode="out-in">
      <component 
        :is="currentContent"
        :key="type + activeId"
        :item="currentItem"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useMenuStore } from '../../stores/menu'
import type { MenuType } from '../../types/menu'

import ChatContent from './ChatContent.vue'
import AgentContent from './AgentContent.vue'
import KnowledgeContent from './KnowledgeContent.vue'
import ToolContent from './ToolContent.vue'

const props = defineProps<{
  type: MenuType
  activeId: string | null
}>()

const { currentItem } = storeToRefs(useMenuStore())

const currentContent = computed(() => {
  switch (props.type) {
    case 'chat':
      return ChatContent
    case 'agent':
      return AgentContent
    case 'knowledge':
      return KnowledgeContent
    case 'tool':
      return ToolContent
    default:
      return null
  }
})
</script>

<style scoped>
.content-container {
  flex: 1;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 
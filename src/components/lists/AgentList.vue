<template>
  <ListView
    title="智能体"
    :items="items"
    :active-id="activeId"
    @select="$emit('select', $event)"
    @new="$emit('new')"
  >
    <template #item="{ item }">
      <ListItemContent :title="item.title">
        <template #description>
          <div class="text-xs text-base-content/70 mb-1">{{ item.description }}</div>
        </template>
        <template #footer>
          <ListItemFooter>
            <div 
              class="px-2 py-0.5 rounded-sm inline-block"
              :class="{
                'bg-success text-success-content opacity-90': item.status === 'online',
                'bg-error text-error-content opacity-90': item.status === 'offline'
              }"
            >
              {{ item.status === 'online' ? '在线' : '离线' }}
            </div>
          </ListItemFooter>
        </template>
      </ListItemContent>
    </template>
  </ListView>
</template>

<script setup lang="ts">
import ListView from '../shared/ListView.vue'
import ListItemContent from '../shared/ListItemContent.vue'
import ListItemFooter from '../shared/ListItemFooter.vue'
import type { AgentItem } from '../../types/menu'

defineProps<{
  items: AgentItem[]
  activeId: string | null
}>()

defineEmits<{
  (e: 'select', id: string): void
  (e: 'new'): void
}>()
</script> 
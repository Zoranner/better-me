<template>
  <ListView
    title="知识库"
    :items="items"
    :active-id="activeId"
    @select="$emit('select', $event)"
    @new="$emit('new')"
  >
    <template #item="{ item }">
      <ListItemContent :title="item.title">
        <template #footer>
          <ListItemFooter>
            <div class="flex justify-between">
              <span>{{ item.count }} 条</span>
              <span>{{ item.lastUpdated }}</span>
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
import type { KnowledgeItem } from '../../types/menu'

defineProps<{
  items: KnowledgeItem[]
  activeId: string | null
}>()

defineEmits<{
  (e: 'select', id: string): void
  (e: 'new'): void
}>()
</script> 
<template>
  <ListView
    title="工具"
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
            <div class="flex flex-wrap gap-1">
              <span 
                v-for="tag in item.tags" 
                :key="tag"
                class="px-2 py-0.5 rounded-sm bg-base-300 text-base-content"
              >
                {{ tag }}
              </span>
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
import type { ToolItem } from '../../types/menu'

defineProps<{
  items: ToolItem[]
  activeId: string | null
}>()

defineEmits<{
  (e: 'select', id: string): void
  (e: 'new'): void
}>()
</script> 
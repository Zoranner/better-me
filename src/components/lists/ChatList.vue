<template>
  <ListView
    title="对话"
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
              <span>{{ item.messageCount }} 条消息</span>
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
import type { ChatItem } from '../../types/menu'

defineProps<{
  items: ChatItem[]
  activeId: string | null
}>()

defineEmits<{
  (e: 'select', id: string): void
  (e: 'new'): void
}>()
</script> 
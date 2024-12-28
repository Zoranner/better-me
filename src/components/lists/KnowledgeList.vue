<template>
  <BaseList title="知识库" @new="$emit('new')">
    <BaseListItem
      v-for="item in items"
      :key="item.id"
      :active="item.id === activeId"
      @select="$emit('select', item.id)"
    >
      <BaseItemStyles>
        <div class="item-title">{{ item.title }}</div>
        <div class="item-info">
          <span>{{ item.count }} 条</span>
          <span>{{ item.lastUpdated }}</span>
        </div>
      </BaseItemStyles>
    </BaseListItem>
  </BaseList>
</template>

<script setup lang="ts">
import BaseList from '../shared/BaseList.vue'
import BaseListItem from '../shared/BaseListItem.vue'
import BaseItemStyles from '../shared/BaseItemStyles.vue'
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

<style scoped>
.item-title {
  font-size: 0.8rem;
  margin-bottom: 0.125rem;
  opacity: 0.9;
  line-height: 1.2;
}

.item-info {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: space-between;
}
</style> 
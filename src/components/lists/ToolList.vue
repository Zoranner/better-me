<template>
  <BaseList title="工具" @new="$emit('new')">
    <BaseListItem
      v-for="item in items"
      :key="item.id"
      :active="item.id === activeId"
      @select="$emit('select', item.id)"
    >
      <BaseItemStyles>
        <div class="item-title">{{ item.title }}</div>
        <div class="item-desc">{{ item.description }}</div>
        <div class="item-tags">
          <span 
            v-for="tag in item.tags" 
            :key="tag"
            class="tag"
          >
            {{ tag }}
          </span>
        </div>
      </BaseItemStyles>
    </BaseListItem>
  </BaseList>
</template>

<script setup lang="ts">
import BaseList from '../shared/BaseList.vue'
import BaseListItem from '../shared/BaseListItem.vue'
import BaseItemStyles from '../shared/BaseItemStyles.vue'
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

<style scoped>
.item-title {
  font-size: 0.8rem;
  margin-bottom: 0.125rem;
  opacity: 0.9;
  line-height: 1.2;
}

.item-desc {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.25rem;
}

.item-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.tag {
  font-size: 0.65rem;
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
}
</style> 
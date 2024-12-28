<template>
  <BaseList title="智能体" @new="$emit('new')">
    <BaseListItem
      v-for="item in items"
      :key="item.id"
      :active="item.id === activeId"
      @select="$emit('select', item.id)"
    >
      <BaseItemStyles>
        <div class="item-title">{{ item.title }}</div>
        <div class="item-desc">{{ item.description }}</div>
        <div class="item-status" :class="item.status">
          {{ item.status === 'online' ? '在线' : '离线' }}
        </div>
      </BaseItemStyles>
    </BaseListItem>
  </BaseList>
</template>

<script setup lang="ts">
import BaseList from '../shared/BaseList.vue'
import BaseListItem from '../shared/BaseListItem.vue'
import BaseItemStyles from '../shared/BaseItemStyles.vue'
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

.item-status {
  font-size: 0.65rem;
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  display: inline-block;
}

.item-status.online {
  background-color: rgba(52, 199, 89, 0.15);
  color: #34c759;
}

.item-status.offline {
  background-color: rgba(255, 69, 58, 0.15);
  color: #ff453a;
}
</style> 
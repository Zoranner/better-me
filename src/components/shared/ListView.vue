<template>
  <div class="h-full flex flex-col">
    <ListHeader :title="title" @new="$emit('new')" />
    <div class="flex-1 overflow-y-auto">
      <div class="p-2">
        <div
          v-for="item in items"
          :key="item.id"
          class="p-3 rounded-btn cursor-pointer hover:bg-base-200 transition-all"
          :class="{ 'bg-primary text-primary-content': item.id === activeId }"
          @click="$emit('select', item.id)"
        >
          <slot name="item" :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ListHeader from './ListHeader.vue'

interface Item {
  id: string
  [key: string]: any
}

defineProps<{
  title: string
  items: Item[]
  activeId: string | null
}>()

defineEmits<{
  (e: 'select', id: string): void
  (e: 'new'): void
}>()
</script> 
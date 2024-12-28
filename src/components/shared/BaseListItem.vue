<template>
  <div 
    class="base-list-item"
    :class="{ active }"
    @click="$emit('select')"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  active: boolean
}>()

defineEmits<{
  (e: 'select'): void
}>()
</script>

<style scoped>
.base-list-item {
  padding: 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.base-list-item:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.base-list-item.active {
  background-color: rgba(255, 255, 255, 0.1);
}
</style> 
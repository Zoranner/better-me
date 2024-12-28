<template>
  <div class="base-list">
    <div class="list-header">
      <h3 class="list-title">{{ title }}</h3>
      <button class="new-btn" @click="$emit('new')">
        <span class="icon">+</span>
      </button>
    </div>
    <div class="list-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()

defineEmits<{
  (e: 'new'): void
  (e: 'select', id: string): void
}>()
</script>

<style scoped>
.base-list {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0.625rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.list-title {
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.9;
}

.new-btn {
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: all 0.2s ease;
}

.new-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
}

.icon {
  font-size: 1rem;
  line-height: 1;
}

.list-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}

.list-content::-webkit-scrollbar {
  width: 4px;
}

.list-content::-webkit-scrollbar-track {
  background: transparent;
}

.list-content::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.list-content::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.15);
}
</style> 
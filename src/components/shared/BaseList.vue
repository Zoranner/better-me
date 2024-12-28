<template>
  <div class="base-list">
    <div class="list-header">
      <h2 class="title">{{ title }}</h2>
      <button class="new-btn" @click="handleNew">
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

const emit = defineEmits<{
  (e: 'new'): void
}>()

const handleNew = () => {
  console.log('BaseList new button clicked')
  emit('new')
}
</script>

<style scoped>
.base-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #2d2d2d;
}

.list-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.title {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
}

.new-btn {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.new-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.icon {
  font-size: 1.2rem;
  line-height: 1;
}

.list-content {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem;
}
</style> 
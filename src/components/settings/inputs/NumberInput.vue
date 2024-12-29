<template>
  <div class="setting-input">
    <input
      :id="item.key"
      type="number"
      :value="item.value"
      :min="item.min"
      :max="item.max"
      :step="item.step"
      @change="handleChange"
    >
  </div>
</template>

<script setup lang="ts">
import type { NumberSettingItem } from '../../../types/settings'

const props = defineProps<{
  item: NumberSettingItem
}>()

const emit = defineEmits<{
  (e: 'update', key: string, value: number): void
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update', props.item.key, Number(target.value))
}
</script>

<style scoped>
.setting-input input {
  width: 100%;
  padding: var(--spacing-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast) var(--transition-timing);
}

.setting-input input:hover {
  border-color: var(--color-border-dark);
}

.setting-input input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

/* 自定义数字输入的上下箭头样式 */
.setting-input input[type="number"]::-webkit-inner-spin-button,
.setting-input input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
  height: 1.5em;
  margin: 0 var(--spacing-1);
  cursor: pointer;
}

.setting-input input[type="number"] {
  padding-right: var(--spacing-6);
}
</style> 
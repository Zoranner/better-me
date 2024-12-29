<template>
  <div class="setting-input">
    <select
      :id="item.key"
      :value="item.value"
      @change="handleChange"
    >
      <option
        v-for="option in item.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import type { SelectSettingItem } from '../../../types/settings'

const props = defineProps<{
  item: SelectSettingItem
}>()

const emit = defineEmits<{
  (e: 'update', key: string, value: string): void
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update', props.item.key, target.value)
}
</script>

<style scoped>
.setting-input select {
  width: 100%;
  padding: var(--spacing-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-background);
  color: var(--color-text);
  cursor: pointer;
  appearance: none;
  font-size: var(--font-size-base);
  transition: all var(--transition-fast) var(--transition-timing);
  
  /* Custom dropdown arrow */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right var(--spacing-2) center;
  background-size: var(--font-size-lg);
  padding-right: var(--spacing-10);
}

.setting-input select:hover {
  border-color: var(--color-border-dark);
}

.setting-input select:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.setting-input select option {
  background-color: var(--color-background);
  color: var(--color-text);
  padding: var(--spacing-2);
}

.setting-input select option:hover {
  background-color: var(--color-primary-light);
  color: var(--color-background);
}
</style> 
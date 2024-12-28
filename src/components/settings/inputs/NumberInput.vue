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
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--input-background);
  color: var(--text-primary);
}

.setting-input input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color-alpha);
}
</style> 
<template>
  <div class="setting-input">
    <div class="color-input">
      <input
        :id="item.key"
        type="color"
        :value="item.value"
        @change="handleChange"
      >
      <input
        type="text"
        :value="item.value"
        @change="handleTextChange"
        class="color-text"
        pattern="^#[0-9A-Fa-f]{6}$"
        maxlength="7"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ColorSettingItem } from '../../../types/settings'

const props = defineProps<{
  item: ColorSettingItem
}>()

const emit = defineEmits<{
  (e: 'update', key: string, value: string): void
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update', props.item.key, target.value)
}

const handleTextChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  
  // 验证颜色格式
  if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
    emit('update', props.item.key, value)
  } else {
    // 如果格式不正确，恢复原值
    target.value = props.item.value
  }
}
</script>

<style scoped>
.color-input {
  display: flex;
  gap: var(--spacing-2);
  align-items: center;
}

input[type="color"] {
  width: 44px;
  height: 24px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  background: none;
  transition: all var(--transition-fast) var(--transition-timing);
}

input[type="color"]:hover {
  border-color: var(--color-border-dark);
  transform: scale(1.05);
}

input[type="color"]:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: calc(var(--radius-sm) - 1px);
}

.color-text {
  flex: 1;
  padding: var(--spacing-1) var(--spacing-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-background);
  color: var(--color-text);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  text-transform: uppercase;
  transition: all var(--transition-fast) var(--transition-timing);
}

.color-text:hover {
  border-color: var(--color-border-dark);
}

.color-text:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}
</style> 
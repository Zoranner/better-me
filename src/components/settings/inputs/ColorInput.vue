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
  gap: 0.5rem;
  align-items: center;
}

input[type="color"] {
  width: 44px;
  height: 24px;
  padding: 0;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  cursor: pointer;
  background: none;
}

input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 2px;
}

.color-text {
  flex: 1;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--input-background);
  color: var(--text-primary);
  font-family: monospace;
  text-transform: uppercase;
}

.color-text:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-color-alpha);
}
</style> 
<template>
  <label class="toggle">
    <input
      :id="item.key"
      type="checkbox"
      :checked="item.value"
      @change="handleChange"
    >
    <span class="toggle-slider"></span>
  </label>
</template>

<script setup lang="ts">
import type { BooleanSettingItem } from '../../../types/settings'

const props = defineProps<{
  item: BooleanSettingItem
}>()

const emit = defineEmits<{
  (e: 'update', key: string, value: boolean): void
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update', props.item.key, target.checked)
}
</script>

<style scoped>
.toggle {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 24px;
  cursor: pointer;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-border);
  transition: all var(--transition-normal) var(--transition-timing);
  border-radius: var(--radius-full);
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: var(--color-background);
  transition: all var(--transition-normal) var(--transition-timing);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-sm);
}

input:checked + .toggle-slider {
  background-color: var(--color-primary);
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}

/* 悬浮效果 */
.toggle:hover .toggle-slider {
  background-color: var(--color-border-dark);
}

.toggle:hover input:checked + .toggle-slider {
  background-color: var(--color-primary-dark);
}

/* 焦点效果 */
input:focus + .toggle-slider {
  box-shadow: 0 0 0 2px var(--color-primary-light);
}
</style> 
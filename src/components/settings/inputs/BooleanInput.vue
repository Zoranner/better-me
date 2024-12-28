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
  background-color: var(--border-color);
  transition: 0.3s;
  border-radius: 24px;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.3s;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

input:checked + .toggle-slider {
  background-color: var(--primary-color);
}

input:checked + .toggle-slider:before {
  transform: translateX(20px);
}
</style> 
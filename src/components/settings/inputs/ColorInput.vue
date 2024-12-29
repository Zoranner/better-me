<template>
  <div class="flex items-center gap-2">
    <input
      :id="item.key"
      type="color"
      :value="item.value"
      @change="handleChange"
      class="w-11 h-6 p-0 border border-base-300 rounded-md cursor-pointer bg-transparent hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
    >
    <input
      type="text"
      :value="item.value"
      @change="handleTextChange"
      class="input input-bordered flex-1 font-mono text-sm uppercase"
      pattern="^#[0-9A-Fa-f]{6}$"
      maxlength="7"
    >
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
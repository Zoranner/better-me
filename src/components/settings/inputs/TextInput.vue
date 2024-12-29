<template>
  <div class="relative w-full">
    <input
      :id="item.key"
      type="text"
      class="input input-bordered w-full"
      :value="item.value"
      :placeholder="item.placeholder"
      @change="handleChange"
    >
  </div>
</template>

<script setup lang="ts">
import type { TextSettingItem } from '../../../types/settings'

const props = defineProps<{
  item: TextSettingItem
}>()

const emit = defineEmits<{
  (e: 'update', key: string, value: string): void
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update', props.item.key, target.value)
}
</script> 
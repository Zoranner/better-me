<template>
  <div class="w-full">
    <input
      :id="item.key"
      type="number"
      class="input input-bordered w-full"
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
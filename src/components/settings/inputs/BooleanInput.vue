<template>
  <div class="flex items-center gap-1">
    <input
      :id="item.key"
      type="checkbox"
      class="toggle"
      :checked="item.value"
      @change="handleChange"
    >
    <label class="label label-text text-base" :for="item.key">{{ item.label }}</label>
  </div>
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
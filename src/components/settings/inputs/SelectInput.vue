<template>
  <div class="relative w-full">
    <select
      :id="item.key"
      class="select select-bordered w-full"
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
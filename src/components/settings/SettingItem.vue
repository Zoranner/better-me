<template>
  <div class="mb-4 p-2 rounded-md transition-colors hover:bg-base-200">
    <div class="mb-2">
      <label :for="item.key" class="text-base font-medium text-base-content">{{ item.label }}</label>
      <span class="block text-sm text-base-content/70 mt-1 leading-relaxed">{{ item.description }}</span>
    </div>
    
    <TextInput
      v-if="item.type === 'text'"
      :item="item as TextSettingItem"
      @update="handleUpdate"
    />
    <NumberInput
      v-else-if="item.type === 'number'"
      :item="item as NumberSettingItem"
      @update="handleUpdate"
    />
    <BooleanInput
      v-else-if="item.type === 'boolean'"
      :item="item as BooleanSettingItem"
      @update="handleUpdate"
    />
    <SelectInput
      v-else-if="item.type === 'select'"
      :item="item as SelectSettingItem"
      @update="handleUpdate"
    />
    <ColorInput
      v-else-if="item.type === 'color'"
      :item="item as ColorSettingItem"
      @update="handleUpdate"
    />
  </div>
</template>

<script setup lang="ts">
import type { SettingItem, TextSettingItem, NumberSettingItem, BooleanSettingItem, SelectSettingItem, ColorSettingItem } from '../../types/settings'
import TextInput from './inputs/TextInput.vue'
import NumberInput from './inputs/NumberInput.vue'
import BooleanInput from './inputs/BooleanInput.vue'
import SelectInput from './inputs/SelectInput.vue'
import ColorInput from './inputs/ColorInput.vue'

const props = defineProps<{
  item: SettingItem
}>()

const emit = defineEmits<{
  (e: 'update', key: string, value: any): void
}>()

const handleUpdate = (key: string, value: any) => {
  emit('update', key, value)
}
</script> 
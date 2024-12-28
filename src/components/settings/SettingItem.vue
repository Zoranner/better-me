<template>
  <div class="setting-item">
    <div class="setting-label">
      <label :for="item.key">{{ item.label }}</label>
      <span class="setting-desc">{{ item.description }}</span>
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

<style scoped>
.setting-item {
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.setting-label {
  margin-bottom: 0.5rem;
}

.setting-desc {
  display: block;
  font-size: 0.9em;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}
</style> 
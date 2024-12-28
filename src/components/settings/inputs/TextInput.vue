<template>
  <div class="setting-input">
    <div v-if="isPasswordField" class="password-input">
      <input
        :id="item.key"
        :type="showPassword ? 'text' : 'password'"
        :value="item.value"
        :placeholder="item.placeholder"
        @change="handleChange"
      >
      <button 
        class="password-toggle"
        @click="togglePassword"
        type="button"
      >
        {{ showPassword ? '👁️' : '👁️‍🗨️' }}
      </button>
    </div>
    <input
      v-else
      :id="item.key"
      type="text"
      :value="item.value"
      :placeholder="item.placeholder"
      @change="handleChange"
    >
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TextSettingItem } from '../../../types/settings'

const props = defineProps<{
  item: TextSettingItem
}>()

const emit = defineEmits<{
  (e: 'update', key: string, value: string): void
}>()

const showPassword = ref(false)

const isPasswordField = computed(() => {
  return props.item.key.toLowerCase().includes('key') || 
         props.item.key.toLowerCase().includes('password')
})

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update', props.item.key, target.value)
}
</script>

<style scoped>
.setting-input input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background: var(--input-background);
  color: var(--text-primary);
}

.password-input {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input input {
  padding-right: 2.5rem;
}

.password-toggle {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
}
</style> 
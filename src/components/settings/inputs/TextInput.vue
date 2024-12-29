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
  padding: var(--spacing-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: var(--font-size-base);
  transition: all var(--transition-fast) var(--transition-timing);
}

.setting-input input:hover {
  border-color: var(--color-border-dark);
}

.setting-input input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.password-input {
  position: relative;
  display: flex;
  align-items: center;
}

.password-input input {
  padding-right: var(--spacing-10);
}

.password-toggle {
  position: absolute;
  right: var(--spacing-2);
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-1);
  color: var(--color-text-light);
  font-size: var(--font-size-lg);
  transition: all var(--transition-fast) var(--transition-timing);
  border-radius: var(--radius-sm);
}

.password-toggle:hover {
  background-color: var(--color-secondary-dark);
  color: var(--color-text);
}
</style> 
<template>
  <div
    class="base-select"
    :class="[
      size,
      {
        'is-disabled': disabled,
        'is-error': error,
        'is-open': isOpen
      }
    ]"
    @click="toggleDropdown"
    @blur="handleBlur"
    tabindex="0"
  >
    <div class="select-trigger">
      <div class="select-value" :class="{ placeholder: !selectedLabel }">
        {{ selectedLabel || placeholder }}
      </div>
      <div class="select-arrow">
        <span class="arrow-icon">▼</span>
      </div>
    </div>

    <Transition name="dropdown">
      <div v-if="isOpen" class="select-dropdown">
        <div
          v-for="option in options"
          :key="option.value"
          class="select-option"
          :class="{
            'is-selected': option.value === modelValue,
            'is-disabled': option.disabled
          }"
          @click="handleSelect(option)"
        >
          {{ option.label }}
        </div>
      </div>
    </Transition>

    <div v-if="error" class="select-error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Option {
  label: string
  value: string | number
  disabled?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: string | number
  options: Option[]
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  error?: string
}>(), {
  size: 'md',
  disabled: false,
  placeholder: '请选择'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
  (e: 'change', value: string | number): void
}>()

const isOpen = ref(false)

const selectedLabel = computed(() => {
  const selected = props.options.find(option => option.value === props.modelValue)
  return selected?.label
})

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const handleSelect = (option: Option) => {
  if (props.disabled || option.disabled) return
  
  emit('update:modelValue', option.value)
  emit('change', option.value)
  isOpen.value = false
}

const handleBlur = () => {
  setTimeout(() => {
    isOpen.value = false
  }, 200)
}
</script>

<style scoped>
.base-select {
  position: relative;
  display: inline-flex;
  width: 100%;
  font-size: var(--font-size-base);
  line-height: 1.5;
  cursor: pointer;
  user-select: none;
}

/* 尺寸变体 */
.base-select.sm {
  font-size: var(--font-size-sm);
}

.base-select.lg {
  font-size: var(--font-size-lg);
}

/* 触发器样式 */
.select-trigger {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast) var(--transition-timing);
}

.sm .select-trigger {
  padding: var(--spacing-1) var(--spacing-2);
}

.lg .select-trigger {
  padding: var(--spacing-3) var(--spacing-4);
}

/* 选择值 */
.select-value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-text);
}

.select-value.placeholder {
  color: var(--color-text-light);
}

/* 箭头图标 */
.select-arrow {
  display: flex;
  align-items: center;
  margin-left: var(--spacing-2);
  color: var(--color-text-light);
  font-size: 0.8em;
  transition: transform var(--transition-fast) var(--transition-timing);
}

.is-open .select-arrow {
  transform: rotate(180deg);
}

/* 下拉菜单 */
.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: var(--spacing-1);
  max-height: 200px;
  overflow-y: auto;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-dropdown);
}

/* 选项样式 */
.select-option {
  padding: var(--spacing-2) var(--spacing-3);
  color: var(--color-text);
  transition: all var(--transition-fast) var(--transition-timing);
}

.select-option:hover:not(.is-disabled) {
  background-color: var(--color-background-alt);
}

.select-option.is-selected {
  color: var(--color-primary);
  background-color: var(--color-primary-light);
}

.select-option.is-disabled {
  color: var(--color-text-light);
  cursor: not-allowed;
}

/* 错误状态 */
.is-error .select-trigger {
  border-color: var(--color-error);
}

.select-error {
  margin-top: var(--spacing-1);
  font-size: var(--font-size-xs);
  color: var(--color-error);
}

/* 禁用状态 */
.is-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.is-disabled .select-trigger {
  background-color: var(--color-background-alt);
}

/* 焦点和悬浮状态 */
.base-select:focus {
  outline: none;
}

.base-select:focus .select-trigger {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

.select-trigger:hover:not(.is-disabled) {
  border-color: var(--color-border-dark);
}

/* 下拉动画 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all var(--transition-normal) var(--transition-timing);
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-var(--spacing-2));
}

/* 响应式设计 */
@media (max-width: var(--breakpoint-md)) {
  .select-dropdown {
    max-height: 160px;
  }

  .select-option {
    padding: var(--spacing-2);
  }
}
</style> 
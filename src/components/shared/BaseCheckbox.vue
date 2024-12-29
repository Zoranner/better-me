<template>
  <label
    class="base-checkbox"
    :class="[
      size,
      {
        'is-disabled': disabled,
        'is-checked': modelValue,
        'is-indeterminate': indeterminate
      }
    ]"
  >
    <input
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="checkbox-input"
      @change="handleChange"
    >
    
    <span class="checkbox-inner">
      <span v-if="modelValue && !indeterminate" class="check-icon">✓</span>
      <span v-if="indeterminate" class="indeterminate-icon">-</span>
    </span>
    
    <span v-if="$slots.default" class="checkbox-label">
      <slot></slot>
    </span>
  </label>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: boolean
  indeterminate?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}>(), {
  modelValue: false,
  indeterminate: false,
  disabled: false,
  size: 'md'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.checked)
  emit('change', target.checked)
}
</script>

<style scoped>
.base-checkbox {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  cursor: pointer;
  user-select: none;
}

/* 尺寸变体 */
.base-checkbox.sm {
  font-size: var(--font-size-sm);
}

.base-checkbox.md {
  font-size: var(--font-size-base);
}

.base-checkbox.lg {
  font-size: var(--font-size-lg);
}

/* 复选框输入 */
.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;
}

/* 复选框外观 */
.checkbox-inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast) var(--transition-timing);
}

/* 选中状态 */
.is-checked .checkbox-inner {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
}

.check-icon,
.indeterminate-icon {
  color: var(--color-background);
  font-size: 0.8em;
  font-weight: bold;
  opacity: 0;
  transform: scale(0.5);
  transition: all var(--transition-fast) var(--transition-timing);
}

.is-checked .check-icon,
.is-indeterminate .indeterminate-icon {
  opacity: 1;
  transform: scale(1);
}

/* 标签样式 */
.checkbox-label {
  color: var(--color-text);
  line-height: 1.5;
}

/* 禁用状态 */
.is-disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.is-disabled .checkbox-inner {
  background-color: var(--color-background-alt);
  border-color: var(--color-border);
}

.is-disabled .checkbox-label {
  color: var(--color-text-light);
}

/* 悬浮效果 */
.base-checkbox:not(.is-disabled):hover .checkbox-inner {
  border-color: var(--color-primary);
}

.is-checked:not(.is-disabled):hover .checkbox-inner {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

/* 焦点状态 */
.checkbox-input:focus + .checkbox-inner {
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

/* 响应式设计 */
@media (max-width: var(--breakpoint-md)) {
  .base-checkbox {
    gap: var(--spacing-1);
  }

  .checkbox-inner {
    width: 1em;
    height: 1em;
  }

  .check-icon,
  .indeterminate-icon {
    font-size: 0.7em;
  }
}
</style> 
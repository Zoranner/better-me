<template>
  <div
    class="base-input"
    :class="[
      size,
      {
        'is-disabled': disabled,
        'is-readonly': readonly,
        'is-error': error,
        'with-prefix': $slots.prefix,
        'with-suffix': $slots.suffix
      }
    ]"
  >
    <div v-if="$slots.prefix" class="input-prefix">
      <slot name="prefix"></slot>
    </div>

    <input
      ref="inputRef"
      v-bind="$attrs"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      class="input-inner"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    >

    <div v-if="$slots.suffix" class="input-suffix">
      <slot name="suffix"></slot>
    </div>

    <div v-if="maxlength" class="input-count">
      {{ modelValue?.length || 0 }}/{{ maxlength }}
    </div>

    <div v-if="error" class="input-error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string
  type?: string
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  readonly?: boolean
  maxlength?: number
  error?: string
}>(), {
  type: 'text',
  size: 'md',
  disabled: false,
  readonly: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
  (e: 'change', value: string): void
}>()

const inputRef = ref<HTMLInputElement>()

const handleInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleFocus = (e: FocusEvent) => {
  emit('focus', e)
}

const handleBlur = (e: FocusEvent) => {
  emit('blur', e)
}

const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('change', target.value)
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select()
})
</script>

<style scoped>
.base-input {
  position: relative;
  display: inline-flex;
  width: 100%;
  font-size: var(--font-size-base);
  line-height: 1.5;
}

/* 尺寸变体 */
.base-input.sm {
  font-size: var(--font-size-sm);
}

.base-input.lg {
  font-size: var(--font-size-lg);
}

/* 输入框主体 */
.input-inner {
  flex: 1;
  width: 100%;
  padding: var(--spacing-2) var(--spacing-3);
  color: var(--color-text);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: all var(--transition-fast) var(--transition-timing);
}

.sm .input-inner {
  padding: var(--spacing-1) var(--spacing-2);
}

.lg .input-inner {
  padding: var(--spacing-3) var(--spacing-4);
}

/* 前缀和后缀 */
.with-prefix .input-inner {
  padding-left: var(--spacing-8);
}

.with-suffix .input-inner {
  padding-right: var(--spacing-8);
}

.input-prefix,
.input-suffix {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  color: var(--color-text-light);
  pointer-events: none;
}

.input-prefix {
  left: var(--spacing-3);
}

.input-suffix {
  right: var(--spacing-3);
}

/* 字数统计 */
.input-count {
  position: absolute;
  right: var(--spacing-2);
  bottom: var(--spacing-1);
  font-size: var(--font-size-xs);
  color: var(--color-text-light);
  pointer-events: none;
}

/* 错误状态 */
.is-error .input-inner {
  border-color: var(--color-error);
}

.input-error {
  margin-top: var(--spacing-1);
  font-size: var(--font-size-xs);
  color: var(--color-error);
}

/* 禁用和只读状态 */
.is-disabled .input-inner {
  background-color: var(--color-background-alt);
  cursor: not-allowed;
  opacity: 0.6;
}

.is-readonly .input-inner {
  background-color: var(--color-background-alt);
  cursor: default;
}

/* 焦点状态 */
.input-inner:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-primary-light);
}

/* 悬浮状态 */
.input-inner:hover:not(:disabled):not(:read-only) {
  border-color: var(--color-border-dark);
}

/* 响应式设计 */
@media (max-width: var(--breakpoint-md)) {
  .input-inner {
    font-size: var(--font-size-sm);
  }

  .sm .input-inner {
    font-size: var(--font-size-xs);
  }

  .lg .input-inner {
    font-size: var(--font-size-base);
  }
}
</style> 
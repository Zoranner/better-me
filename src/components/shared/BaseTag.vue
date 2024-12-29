<template>
  <span
    class="base-tag"
    :class="[
      variant,
      size,
      {
        'is-closable': closable,
        'is-round': round
      }
    ]"
  >
    <span v-if="$slots.icon" class="tag-icon">
      <slot name="icon"></slot>
    </span>
    <span class="tag-content">
      <slot></slot>
    </span>
    <button
      v-if="closable"
      class="close-btn"
      @click="$emit('close')"
      type="button"
    >
      ✕
    </button>
  </span>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  closable?: boolean
  round?: boolean
}>(), {
  variant: 'primary',
  size: 'md',
  closable: false,
  round: false
})

defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>
.base-tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  border-radius: var(--radius-md);
  font-weight: var(--font-weight-medium);
  line-height: 1;
  white-space: nowrap;
}

/* 尺寸变体 */
.base-tag.sm {
  padding: var(--spacing-1) var(--spacing-2);
  font-size: var(--font-size-xs);
}

.base-tag.md {
  padding: var(--spacing-1) var(--spacing-3);
  font-size: var(--font-size-sm);
}

.base-tag.lg {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--font-size-base);
}

/* 颜色变体 */
.base-tag.primary {
  background-color: var(--color-primary);
  color: var(--color-background);
}

.base-tag.secondary {
  background-color: var(--color-secondary);
  color: var(--color-background);
}

.base-tag.success {
  background-color: var(--color-success);
  color: var(--color-background);
}

.base-tag.error {
  background-color: var(--color-error);
  color: var(--color-background);
}

.base-tag.info {
  background-color: var(--color-info);
  color: var(--color-background);
}

/* 圆角样式 */
.base-tag.is-round {
  border-radius: var(--radius-full);
}

/* 图标样式 */
.tag-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1em;
}

/* 关闭按钮 */
.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.2em;
  height: 1.2em;
  padding: 0;
  margin-right: calc(var(--spacing-1) * -1);
  background: none;
  border: none;
  border-radius: var(--radius-full);
  color: currentColor;
  cursor: pointer;
  opacity: 0.8;
  transition: all var(--transition-fast) var(--transition-timing);
}

.close-btn:hover {
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.1);
}

/* 响应式设计 */
@media (max-width: var(--breakpoint-md)) {
  .base-tag {
    max-width: 100%;
  }

  .tag-content {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style> 
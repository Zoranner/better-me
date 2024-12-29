<template>
  <div class="base-empty" :class="size">
    <div class="empty-image">
      <slot name="image">
        <div class="default-image">
          <span>📭</span>
        </div>
      </slot>
    </div>

    <div class="empty-content">
      <div class="empty-title">
        <slot name="title">{{ title || '暂无数据' }}</slot>
      </div>
      <div v-if="$slots.description || description" class="empty-description">
        <slot name="description">{{ description }}</slot>
      </div>
    </div>

    <div v-if="$slots.default" class="empty-footer">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
}>(), {
  size: 'md'
})
</script>

<style scoped>
.base-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-6);
  text-align: center;
}

/* 尺寸变体 */
.base-empty.sm {
  gap: var(--spacing-3);
}

.base-empty.md {
  gap: var(--spacing-4);
}

.base-empty.lg {
  gap: var(--spacing-6);
}

/* 默认图片 */
.default-image {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-light);
}

.sm .default-image span {
  font-size: var(--font-size-3xl);
}

.md .default-image span {
  font-size: var(--font-size-4xl);
}

.lg .default-image span {
  font-size: var(--font-size-5xl);
}

/* 内容样式 */
.empty-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2);
}

.empty-title {
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

.sm .empty-title {
  font-size: var(--font-size-sm);
}

.md .empty-title {
  font-size: var(--font-size-base);
}

.lg .empty-title {
  font-size: var(--font-size-lg);
}

.empty-description {
  color: var(--color-text-light);
}

.sm .empty-description {
  font-size: var(--font-size-xs);
}

.md .empty-description {
  font-size: var(--font-size-sm);
}

.lg .empty-description {
  font-size: var(--font-size-base);
}

/* 底部操作区 */
.empty-footer {
  display: flex;
  gap: var(--spacing-3);
}

/* 响应式设计 */
@media (max-width: var(--breakpoint-md)) {
  .base-empty {
    padding: var(--spacing-4);
  }

  .sm .default-image span {
    font-size: var(--font-size-2xl);
  }

  .md .default-image span {
    font-size: var(--font-size-3xl);
  }

  .lg .default-image span {
    font-size: var(--font-size-4xl);
  }

  .empty-footer {
    flex-direction: column;
    width: 100%;
  }
}
</style> 
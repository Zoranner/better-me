<template>
  <Transition name="message">
    <div
      v-if="visible"
      class="base-message"
      :class="[
        type,
        {
          'with-icon': showIcon,
          'is-closable': closable
        }
      ]"
      role="alert"
    >
      <div v-if="showIcon" class="message-icon">
        <span v-if="type === 'success'">✓</span>
        <span v-else-if="type === 'error'">✕</span>
        <span v-else-if="type === 'warning'">⚠</span>
        <span v-else-if="type === 'info'">ℹ</span>
      </div>

      <div class="message-content">
        <div v-if="title" class="message-title">{{ title }}</div>
        <div class="message-text">
          <slot></slot>
        </div>
      </div>

      <button
        v-if="closable"
        class="close-btn"
        @click="handleClose"
        type="button"
        aria-label="关闭"
      >
        ✕
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  showIcon?: boolean
  closable?: boolean
  duration?: number
  onClose?: () => void
}>(), {
  type: 'info',
  showIcon: true,
  closable: true,
  duration: 3000
})

const visible = ref(true)
let timer: NodeJS.Timeout | null = null

const handleClose = () => {
  visible.value = false
  props.onClose?.()
}

onMounted(() => {
  if (props.duration > 0) {
    timer = setTimeout(() => {
      handleClose()
    }, props.duration)
  }
})

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<style scoped>
.base-message {
  position: fixed;
  top: var(--spacing-4);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-start;
  gap: var(--spacing-3);
  padding: var(--spacing-3) var(--spacing-4);
  min-width: 300px;
  max-width: 80%;
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: var(--z-message);
}

/* 类型变体 */
.base-message.success {
  background-color: var(--color-success-light);
  border: 1px solid var(--color-success);
}

.base-message.error {
  background-color: var(--color-error-light);
  border: 1px solid var(--color-error);
}

.base-message.warning {
  background-color: var(--color-warning-light);
  border: 1px solid var(--color-warning);
}

.base-message.info {
  background-color: var(--color-info-light);
  border: 1px solid var(--color-info);
}

/* 图标样式 */
.message-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--spacing-6);
  height: var(--spacing-6);
  border-radius: var(--radius-full);
  font-size: var(--font-size-lg);
}

.success .message-icon {
  color: var(--color-success);
}

.error .message-icon {
  color: var(--color-error);
}

.warning .message-icon {
  color: var(--color-warning);
}

.info .message-icon {
  color: var(--color-info);
}

/* 内容样式 */
.message-content {
  flex: 1;
  min-width: 0;
}

.message-title {
  margin-bottom: var(--spacing-1);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.message-text {
  font-size: var(--font-size-sm);
  line-height: 1.5;
  color: var(--color-text-light);
}

/* 关闭按钮 */
.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--spacing-6);
  height: var(--spacing-6);
  padding: 0;
  background: none;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text-light);
  cursor: pointer;
  transition: all var(--transition-fast) var(--transition-timing);
}

.close-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--color-text);
}

/* 过渡动画 */
.message-enter-active,
.message-leave-active {
  transition: all var(--transition-normal) var(--transition-timing);
}

.message-enter-from,
.message-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}

/* 响应式设计 */
@media (max-width: var(--breakpoint-md)) {
  .base-message {
    min-width: auto;
    width: 90%;
  }

  .message-icon {
    width: var(--spacing-5);
    height: var(--spacing-5);
    font-size: var(--font-size-base);
  }

  .close-btn {
    width: var(--spacing-5);
    height: var(--spacing-5);
  }
}
</style> 
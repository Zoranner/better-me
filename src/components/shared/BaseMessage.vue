<template>
  <Transition name="message">
    <div
      v-if="visible"
      class="fixed top-4 left-1/2 -translate-x-1/2 flex items-start gap-3 p-3 min-w-[300px] max-w-[80%] bg-base-100 rounded-lg shadow-lg z-50"
      :class="[
        {
          'bg-success/10 border border-success': type === 'success',
          'bg-error/10 border border-error': type === 'error',
          'bg-warning/10 border border-warning': type === 'warning',
          'bg-info/10 border border-info': type === 'info'
        }
      ]"
      role="alert"
    >
      <div v-if="showIcon" class="flex items-center justify-center w-6 h-6 text-lg rounded-full">
        <span v-if="type === 'success'" class="text-success">✓</span>
        <span v-else-if="type === 'error'" class="text-error">✕</span>
        <span v-else-if="type === 'warning'" class="text-warning">⚠</span>
        <span v-else-if="type === 'info'" class="text-info">ℹ</span>
      </div>

      <div class="flex-1 min-w-0">
        <div v-if="title" class="mb-1 text-sm font-medium text-base-content">{{ title }}</div>
        <div class="text-sm text-base-content/70 leading-relaxed">
          <slot></slot>
        </div>
      </div>

      <button
        v-if="closable"
        class="flex items-center justify-center w-6 h-6 p-0 rounded hover:bg-base-200 text-base-content/70 hover:text-base-content transition-colors"
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
.message-enter-active,
.message-leave-active {
  @apply transition-all duration-300 ease-in-out;
}

.message-enter-from,
.message-leave-to {
  @apply opacity-0 -translate-y-full;
}

@media (max-width: 768px) {
  .base-message {
    @apply min-w-0 w-[90%];
  }
}
</style> 
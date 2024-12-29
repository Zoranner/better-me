<template>
  <Transition name="loading">
    <div
      v-if="visible"
      class="loading-overlay"
      :class="{
        'is-fullscreen': fullscreen,
        'with-background': background
      }"
    >
      <div class="loading-spinner" :class="size">
        <svg class="circular" viewBox="25 25 50 50">
          <circle
            class="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width="4"
            stroke-miterlimit="10"
          />
        </svg>
      </div>
      <div v-if="text" class="loading-text" :class="size">
        {{ text }}
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  visible?: boolean
  fullscreen?: boolean
  background?: boolean
  size?: 'sm' | 'md' | 'lg'
  text?: string
}>(), {
  visible: true,
  fullscreen: false,
  background: true,
  size: 'md'
})
</script>

<style scoped>
.loading-overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-3);
  z-index: var(--z-loading);
}

.loading-overlay.is-fullscreen {
  position: fixed;
}

.loading-overlay.with-background {
  background-color: rgba(0, 0, 0, 0.7);
}

/* 加载动画 */
.loading-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner.sm {
  width: var(--spacing-8);
  height: var(--spacing-8);
}

.loading-spinner.md {
  width: var(--spacing-12);
  height: var(--spacing-12);
}

.loading-spinner.lg {
  width: var(--spacing-16);
  height: var(--spacing-16);
}

.circular {
  width: 100%;
  height: 100%;
  animation: rotate 2s linear infinite;
}

.path {
  stroke: var(--color-primary);
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;
}

/* 文本样式 */
.loading-text {
  color: var(--color-text);
}

.loading-text.sm {
  font-size: var(--font-size-xs);
}

.loading-text.md {
  font-size: var(--font-size-sm);
}

.loading-text.lg {
  font-size: var(--font-size-base);
}

/* 动画关键帧 */
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}

/* 过渡动画 */
.loading-enter-active,
.loading-leave-active {
  transition: opacity var(--transition-normal) var(--transition-timing);
}

.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: var(--breakpoint-md)) {
  .loading-spinner.sm {
    width: var(--spacing-6);
    height: var(--spacing-6);
  }

  .loading-spinner.md {
    width: var(--spacing-10);
    height: var(--spacing-10);
  }

  .loading-spinner.lg {
    width: var(--spacing-14);
    height: var(--spacing-14);
  }
}
</style> 
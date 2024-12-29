<template>
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="modelValue" class="dialog-overlay" @click="handleOverlayClick">
        <div class="dialog" @click.stop>
          <div class="dialog-header">
            <h3 class="dialog-title">{{ title }}</h3>
            <button class="close-btn" @click="$emit('update:modelValue', false)">
              ✕
            </button>
          </div>
          
          <div class="dialog-body">
            <slot></slot>
          </div>
          
          <div class="dialog-footer" v-if="$slots.footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
  title: string
  closeOnOverlayClick?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const handleOverlayClick = (e: MouseEvent) => {
  if (props.closeOnOverlayClick) {
    emit('update:modelValue', false)
  }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-dialog);
}

.dialog {
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  background-color: var(--color-background);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  display: flex;
  flex-direction: column;
}

.dialog-header {
  padding: var(--spacing-4) var(--spacing-6);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-title {
  margin: 0;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-medium);
  color: var(--color-text);
}

.close-btn {
  width: var(--spacing-8);
  height: var(--spacing-8);
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-radius: var(--radius-md);
  color: var(--color-text-light);
  cursor: pointer;
  transition: all var(--transition-normal) var(--transition-timing);
}

.close-btn:hover {
  background-color: var(--color-secondary-dark);
  color: var(--color-text);
}

.dialog-body {
  flex: 1;
  padding: var(--spacing-6);
  overflow-y: auto;
}

.dialog-footer {
  padding: var(--spacing-4) var(--spacing-6);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
}

/* 过渡动画 */
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity var(--transition-normal) var(--transition-timing);
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active .dialog,
.dialog-leave-active .dialog {
  transition: transform var(--transition-normal) var(--transition-timing);
}

.dialog-enter-from .dialog,
.dialog-leave-to .dialog {
  transform: scale(0.9);
}

/* 响应式设计 */
@media (max-width: var(--breakpoint-md)) {
  .dialog {
    width: 95%;
  }

  .dialog-header {
    padding: var(--spacing-3) var(--spacing-4);
  }

  .dialog-body {
    padding: var(--spacing-4);
  }

  .dialog-footer {
    padding: var(--spacing-3) var(--spacing-4);
  }
}
</style> 
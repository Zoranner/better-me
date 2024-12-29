<template>
  <button
    :disabled="disabled || loading"
    @click="handleClick"
    :class="[
      'inline-flex items-center justify-center gap-2 border border-transparent rounded-md font-medium transition-all duration-200 select-none',
      // 尺寸
      {
        'px-3 py-1 text-sm': size === 'sm',
        'px-4 py-2 text-base': size === 'md',
        'px-6 py-3 text-lg': size === 'lg',
      },
      // 类型
      {
        'bg-blue-500 text-white hover:bg-blue-600': type === 'primary' && !plain,
        'bg-green-500 text-white hover:bg-green-600': type === 'success' && !plain,
        'bg-yellow-500 text-white hover:bg-yellow-600': type === 'warning' && !plain,
        'bg-red-500 text-white hover:bg-red-600': type === 'error' && !plain,
        'bg-gray-500 text-white hover:bg-gray-600': type === 'info' && !plain,
      },
      // 朴素按钮
      {
        'border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white': type === 'primary' && plain,
        'border-green-500 text-green-500 hover:bg-green-500 hover:text-white': type === 'success' && plain,
        'border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white': type === 'warning' && plain,
        'border-red-500 text-red-500 hover:bg-red-500 hover:text-white': type === 'error' && plain,
        'border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white': type === 'info' && plain,
      },
      // 圆角
      { 'rounded-full': round },
      // 禁用状态
      { 'opacity-60 cursor-not-allowed': disabled },
      // 加载状态
      { 'opacity-80 cursor-default': loading },
      // 块级
      { 'w-full': block },
      // 悬浮效果
      { 'hover:-translate-y-0.5': !disabled && !loading }
    ]"
  >
    <span v-if="loading" class="animate-spin w-4 h-4">
      <svg class="w-full h-full" viewBox="25 25 50 50">
        <circle
          class="stroke-current"
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke-width="4"
          stroke-linecap="round"
        />
      </svg>
    </span>
    <span v-if="$slots.icon && !loading" class="button-icon">
      <slot name="icon"></slot>
    </span>
    <span>
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  plain?: boolean
  round?: boolean
  disabled?: boolean
  loading?: boolean
  block?: boolean
  onClick?: (e: MouseEvent) => void
}>(), {
  type: 'primary',
  size: 'md',
  plain: false,
  round: false,
  disabled: false,
  loading: false,
  block: false
})

const handleClick = (e: MouseEvent) => {
  if (props.disabled || props.loading) return
  props.onClick?.(e)
}
</script>

<style scoped>
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

circle {
  animation: dash 1.5s ease-in-out infinite;
}
</style> 
<template>
  <div class="h-14 flex-none flex justify-between items-center px-4 border-b bg-base-200">
    <h2 class="text-base font-medium m-0">{{ title }}</h2>
    <button class="btn btn-ghost btn-square btn-sm" @click="$emit('new')">
      <span class="text-lg">+</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()

defineEmits<{
  (e: 'new'): void
}>()
</script> 
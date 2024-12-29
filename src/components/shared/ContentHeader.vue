<template>
  <div class="h-14 flex justify-between items-center px-4 border-b bg-base-200">
    <h2 class="text-base font-medium m-0">{{ title }}</h2>
    <div class="flex gap-2">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script> 
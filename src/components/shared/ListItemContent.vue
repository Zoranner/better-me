<template>
  <div class="w-full">
    <div class="text-sm mb-1 leading-tight">{{ title }}</div>
    <slot name="description"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script> 
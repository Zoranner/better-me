<template>
  <div class="h-full flex flex-col bg-base-100">
    <ContentHeader :title="item?.title || ''">
      <template #actions>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="tag in item?.tags"
            :key="tag" 
            class="badge badge-secondary"
          >
            {{ tag }}
          </span>
        </div>
      </template>
    </ContentHeader>

    <div class="flex-1 p-6 overflow-y-auto">
      <div class="flex gap-4 items-center mb-6">
        <div class="w-12 h-12 flex items-center justify-center text-2xl bg-base-100 rounded-xl border">
          🛠️
        </div>
        <p class="text-base-content/70 m-0">{{ item?.description }}</p>
      </div>

      <div class="flex items-center justify-center">
        <div class="text-center text-base-content/70">
          <div class="text-4xl mb-4">🚧</div>
          <h3 class="text-lg font-medium mb-2 text-base-content">工具开发中</h3>
          <p class="text-sm">该工具正在开发中，敬请期待...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToolItem } from '../../types/menu'
import ContentHeader from '../shared/ContentHeader.vue'

defineProps<{
  item?: ToolItem
}>()
</script> 
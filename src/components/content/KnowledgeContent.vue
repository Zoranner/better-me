<template>
  <div class="h-full flex flex-col bg-base-100">
    <ContentHeader :title="item?.title || ''">
      <template #actions>
        <button class="btn btn-secondary btn-sm gap-2">
          <span>📤</span>
          导入
        </button>
        <button class="btn btn-secondary btn-sm gap-2">
          <span>📝</span>
          编辑
        </button>
      </template>
    </ContentHeader>

    <div class="flex-1 p-6 overflow-y-auto">
      <div class="mb-6">
        <div class="flex gap-4 text-sm text-base-content/70 mb-4">
          <span>{{ item?.count }} 条内容</span>
          <span>最后更新：{{ item?.lastUpdated }}</span>
        </div>
        <input 
          type="text" 
          class="input input-bordered w-full"
          placeholder="搜索知识库内容..." 
          v-model="searchQuery"
        >
      </div>

      <div class="space-y-3">
        <div class="card bg-base-200 hover:bg-base-300 transition-all cursor-pointer">
          <div class="card-body p-4">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-lg">📄</span>
              <h3 class="card-title text-base m-0">项目架构说明</h3>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-base-content/70">更新于 2024-01-02</span>
              <div class="flex gap-2">
                <span class="badge badge-secondary">文档</span>
                <span class="badge badge-secondary">架构</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-base-200 hover:bg-base-300 transition-all cursor-pointer">
          <div class="card-body p-4">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-lg">📄</span>
              <h3 class="card-title text-base m-0">API 接口文档</h3>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-base-content/70">更新于 2024-01-01</span>
              <div class="flex gap-2">
                <span class="badge badge-secondary">API</span>
                <span class="badge badge-secondary">接口</span>
              </div>
            </div>
          </div>
        </div>

        <div class="card bg-base-200 hover:bg-base-300 transition-all cursor-pointer">
          <div class="card-body p-4">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-lg">📄</span>
              <h3 class="card-title text-base m-0">部署流程说明</h3>
            </div>
            <div class="flex justify-between items-center text-sm">
              <span class="text-base-content/70">更新于 2023-12-31</span>
              <div class="flex gap-2">
                <span class="badge badge-secondary">部署</span>
                <span class="badge badge-secondary">运维</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { KnowledgeItem } from '../../types/menu'
import ContentHeader from '../shared/ContentHeader.vue'

defineProps<{
  item?: KnowledgeItem
}>()

const searchQuery = ref('')
</script> 
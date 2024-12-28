<template>
  <div class="knowledge-content">
    <div class="knowledge-header">
      <div class="knowledge-info">
        <h2>{{ item?.title }}</h2>
        <div class="knowledge-meta">
          <span>{{ item?.count }} 条内容</span>
          <span>最后更新：{{ item?.lastUpdated }}</span>
        </div>
      </div>
      <div class="knowledge-actions">
        <button class="action-btn">
          <span>📤</span>
          导入
        </button>
        <button class="action-btn">
          <span>📝</span>
          编辑
        </button>
      </div>
    </div>

    <div class="knowledge-body">
      <div class="search-bar">
        <input 
          type="text" 
          placeholder="搜索知识库内容..." 
          v-model="searchQuery"
        >
      </div>

      <div class="content-list">
        <div class="content-item">
          <div class="content-title">
            <span class="content-icon">📄</span>
            项目架构说明
          </div>
          <div class="content-meta">
            <span>更新于 2024-01-02</span>
            <div class="content-tags">
              <span class="tag">文档</span>
              <span class="tag">架构</span>
            </div>
          </div>
        </div>

        <div class="content-item">
          <div class="content-title">
            <span class="content-icon">📄</span>
            API 接口文档
          </div>
          <div class="content-meta">
            <span>更新于 2024-01-01</span>
            <div class="content-tags">
              <span class="tag">API</span>
              <span class="tag">接口</span>
            </div>
          </div>
        </div>

        <div class="content-item">
          <div class="content-title">
            <span class="content-icon">📄</span>
            部署流程说明
          </div>
          <div class="content-meta">
            <span>更新于 2023-12-31</span>
            <div class="content-tags">
              <span class="tag">部署</span>
              <span class="tag">运维</span>
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

defineProps<{
  item?: KnowledgeItem
}>()

const searchQuery = ref('')
</script>

<style scoped>
.knowledge-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #1e1e1e;
}

.knowledge-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.knowledge-info h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.knowledge-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.knowledge-actions {
  display: flex;
  gap: 0.75rem;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.knowledge-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.search-bar {
  margin-bottom: 1.5rem;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.95rem;
  transition: all 0.2s ease;
}

.search-bar input:focus {
  outline: none;
  border-color: rgba(0, 102, 204, 0.5);
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.2);
}

.content-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.content-item {
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.content-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.content-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
}

.content-icon {
  font-size: 1.1rem;
}

.content-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.content-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  font-size: 0.75rem;
}
</style> 
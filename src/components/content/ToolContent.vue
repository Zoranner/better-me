<template>
  <div class="tool-content">
    <div class="tool-header">
      <div class="tool-info">
        <div class="tool-icon">🛠️</div>
        <div>
          <h2>{{ item?.title }}</h2>
          <p class="tool-description">{{ item?.description }}</p>
        </div>
      </div>
      <div class="tool-tags">
        <span 
          v-for="tag in item?.tags"
          :key="tag" 
          class="tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>

    <div class="tool-body">
      <!-- 工具主体内容区域 -->
      <div class="tool-placeholder">
        <div class="placeholder-icon">🚧</div>
        <h3>工具开发中</h3>
        <p>该工具正在开发中，敬请期待...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ToolItem } from '../../types/menu'

defineProps<{
  item?: ToolItem
}>()
</script>

<style scoped>
.tool-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #1e1e1e;
}

.tool-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tool-info {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.tool-icon {
  width: 3rem;
  height: 3rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.tool-info h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 500;
}

.tool-description {
  margin: 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.tool-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  padding: 0.375rem 0.75rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
}

.tool-body {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-placeholder {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.tool-placeholder h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

.tool-placeholder p {
  margin: 0;
  font-size: 0.9rem;
}
</style> 
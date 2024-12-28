<template>
  <div class="settings-overlay" @click.self="$emit('close')">
    <div class="settings-window">
      <div class="settings-header">
        <h2>
          <i class="category-icon">{{ getCategoryIcon(activeCategory) }}</i>
          {{ getCategoryLabel(activeCategory) }}
        </h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      
      <div class="settings-body">
        <div class="settings-sidebar">
          <div 
            v-for="category in categories"
            :key="category.value"
            class="category-item"
            :class="{ active: category.value === activeCategory }"
            @click="setActiveCategory(category.value)"
          >
            <i class="category-icon">{{ category.icon }}</i>
            {{ category.label }}
          </div>
        </div>

        <div class="settings-content">
          <div class="settings-group">
            <SettingItem
              v-for="item in currentCategorySettings"
              :key="item.key"
              :item="item"
              @update="updateSetting"
            />
          </div>
          
          <SettingsActions />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingsStore } from '../../stores/modules/settings'
import type { SettingCategory } from '../../types/settings'
import SettingItem from './SettingItem.vue'
import SettingsActions from './SettingsActions.vue'

const settingsStore = useSettingsStore()
const { activeCategory, currentCategorySettings } = storeToRefs(settingsStore)
const { setActiveCategory, updateSetting } = settingsStore

// 设置分类
const categories = [
  { value: 'model' as SettingCategory, label: '模型', icon: '🤖' },
  { value: 'user' as SettingCategory, label: '用户', icon: '👤' },
  { value: 'data' as SettingCategory, label: '数据', icon: '💾' },
  { value: 'appearance' as SettingCategory, label: '外观', icon: '🎨' },
  { value: 'advanced' as SettingCategory, label: '高级', icon: '⚙️' },
]

// 获取分类图标
const getCategoryIcon = (category: SettingCategory) => {
  return categories.find(c => c.value === category)?.icon || '⚙️'
}

// 获取分类标签
const getCategoryLabel = (category: SettingCategory) => {
  return categories.find(c => c.value === category)?.label || '设置'
}

// 初始化
onMounted(() => {
  // 设置初始分类
  if (!activeCategory.value) {
    setActiveCategory('model')
  }
})

defineEmits(['close'])
</script>

<style scoped>
.settings-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(4px);
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.settings-window {
  width: 800px;
  height: 600px;
  background-color: var(--background-color);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideIn 0.3s ease;
  border: 1px solid var(--border-color);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.settings-header {
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--surface-color);
}

.settings-header h2 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.close-btn {
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.375rem;
  opacity: 0.8;
  transition: all 0.2s ease;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  background-color: var(--hover-color);
  transform: scale(1.1);
}

.settings-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.settings-sidebar {
  width: 200px;
  background-color: var(--surface-color);
  padding: 1rem 0;
  border-right: 1px solid var(--border-color);
}

.category-item {
  padding: 0.875rem 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0.8;
  position: relative;
  margin: 0.125rem 0.5rem;
  border-radius: 8px;
}

.category-item:hover {
  background-color: var(--hover-color);
  opacity: 1;
}

.category-item.active {
  background-color: var(--active-color);
  opacity: 1;
}

.category-item.active::before {
  content: '';
  position: absolute;
  left: -0.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 1.5rem;
  background-color: var(--primary-color);
  border-radius: 0 3px 3px 0;
}

.category-icon {
  font-size: 1.25rem;
  transition: transform 0.2s ease;
}

.category-item:hover .category-icon {
  transform: scale(1.1);
}

.settings-content {
  flex: 1;
  padding: 1.75rem;
  overflow-y: auto;
}

.settings-group {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

/* 响应式布局 */
@media (max-width: 900px) {
  .settings-window {
    width: 90vw;
    height: 90vh;
  }
}

@media (max-width: 600px) {
  .settings-body {
    flex-direction: column;
  }
  
  .settings-sidebar {
    width: 100%;
    padding: 0.5rem;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
  }
  
  .category-item {
    padding: 0.75rem 1rem;
  }
}
</style> 
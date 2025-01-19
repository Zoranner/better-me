<template>
  <div
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-150"
    @click.self="$emit('close')"
  >
    <div
      class="w-[800px] h-[600px] bg-base-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-all duration-250 ease-out transform"
    >
      <div class="p-5 border-b bg-base-200 flex justify-between items-center">
        <h2 class="text-lg font-medium flex items-center gap-3 m-0">
          <i class="text-xl">{{ getCategoryIcon(activeCategory) }}</i>
          {{ getCategoryLabel(activeCategory) }}
        </h2>
        <button class="btn btn-ghost btn-square btn-sm text-xl" @click="$emit('close')">×</button>
      </div>

      <div class="flex-1 flex overflow-hidden">
        <div class="w-50 bg-base-200 py-4 border-r">
          <div
            v-for="category in categories"
            :key="category.value"
            class="mx-2 px-5 py-3 flex items-center gap-3 cursor-pointer rounded-lg transition-all opacity-80 hover:opacity-100 hover:bg-base-300 relative"
            :class="{
              'bg-primary text-primary-content opacity-100': category.value === activeCategory,
            }"
            @click="setActiveCategory(category.value)"
          >
            <i class="text-xl transition-transform hover:scale-110">{{ category.icon }}</i>
            {{ category.label }}
            <div
              v-if="category.value === activeCategory"
              class="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r"
            ></div>
          </div>
        </div>

        <div class="flex-1 flex flex-col">
          <div class="flex-1 p-6 overflow-y-auto">
            <div class="space-y-6">
              <SettingItem
                v-for="item in currentCategorySettings"
                :key="item.key"
                :item="item"
                @update="updateSetting"
              />
            </div>
          </div>

          <div class="p-4 border-t bg-base-200 flex justify-end gap-3">
            <button class="btn" @click="$emit('close')">取消</button>
            <button class="btn btn-primary" @click="handleApply">应用</button>
            <button class="btn btn-primary" @click="handleSave">保存</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useSettingsStore } from '../../stores/modules/settings';
  import type { SettingCategory } from '../../types/settings';
  import SettingItem from './SettingItem.vue';

  const settingsStore = useSettingsStore();
  const { activeCategory, currentCategorySettings } = storeToRefs(settingsStore);
  const { setActiveCategory, updateSetting } = settingsStore;

  // 设置分类
  const categories = [
    { value: 'model' as SettingCategory, label: '模型', icon: '🤖' },
    { value: 'user' as SettingCategory, label: '用户', icon: '👤' },
    { value: 'data' as SettingCategory, label: '数据', icon: '💾' },
    { value: 'appearance' as SettingCategory, label: '外观', icon: '🎨' },
    { value: 'advanced' as SettingCategory, label: '高级', icon: '⚙️' },
  ];

  // 获取分类图标
  const getCategoryIcon = (category: SettingCategory) => {
    return categories.find((c) => c.value === category)?.icon || '⚙️';
  };

  // 获取分类标签
  const getCategoryLabel = (category: SettingCategory) => {
    return categories.find((c) => c.value === category)?.label || '设置';
  };

  // 初始化
  onMounted(() => {
    // 设置初始分类
    if (!activeCategory.value) {
      setActiveCategory('model');
    }
  });

  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const handleApply = () => {
    // 应用设置但不关闭窗口
    settingsStore.saveSettings()
  }

  const handleSave = () => {
    // 保存设置并关闭窗口
    settingsStore.saveSettings()
    emit('close')
  }
</script>

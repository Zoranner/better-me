<template>
  <div class="flex gap-4 p-4 border-t bg-base-200">
    <button class="btn btn-primary gap-2" @click="handleImport">
      <span class="text-lg">📥</span>
      导入设置
    </button>
    <button class="btn btn-secondary gap-2" @click="handleExport">
      <span class="text-lg">📤</span>
      导出设置
    </button>
    <button class="btn btn-error gap-2 ml-auto" @click="handleReset">
      <span class="text-lg">🔄</span>
      重置设置
    </button>
    
    <input
      ref="fileInput"
      type="file"
      accept=".json"
      class="hidden"
      @change="onFileSelected"
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSettingsStore } from '../../stores/modules/settings'
import { useThemeStore } from '../../stores/modules/theme'
import { exportSettings, importSettings, validateSettings, mergeSettings } from '../../utils/settings'
import type { ThemeMode } from '../../types/theme'

const settingsStore = useSettingsStore()
const themeStore = useThemeStore()
const fileInput = ref<HTMLInputElement | null>(null)

const handleImport = () => {
  fileInput.value?.click()
}

const handleExport = async () => {
  await exportSettings(settingsStore.settings, {
    mode: themeStore.mode as ThemeMode,
    customTheme: themeStore.customTheme
  })
}

const handleReset = () => {
  if (confirm('确定要重置所有设置吗？这将无法撤销。')) {
    settingsStore.$reset()
    themeStore.$reset()
  }
}

const onFileSelected = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  
  try {
    const file = input.files[0]
    const data = await importSettings(file)
    
    if (validateSettings(data)) {
      // 更新设置
      const mergedSettings = mergeSettings(settingsStore.settings, data.settings)
      settingsStore.settings = mergedSettings
      
      // 更新主题
      if (data.theme) {
        themeStore.setMode(data.theme.mode as ThemeMode)
        themeStore.updateCustomTheme(data.theme.customTheme)
      }
      
      // 保存更改
      settingsStore.saveSettings()
      alert('设置导入成功')
    } else {
      throw new Error('无效的设置文件')
    }
  } catch (error: any) {
    alert(`导入失败: ${error.message}`)
  } finally {
    // 清除文件选择
    input.value = ''
  }
}
</script> 
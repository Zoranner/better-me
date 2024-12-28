import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Theme, ThemeMode } from '../../types/theme'
import { defaultLightTheme, defaultDarkTheme } from '../../types/theme'

export const useThemeStore = defineStore('theme', () => {
  // 当前主题模式
  const mode = ref<ThemeMode>('system')
  
  // 自定义主题
  const customTheme = ref<Theme>({ ...defaultLightTheme })
  
  // 系统主题偏好
  const systemPrefersDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    systemPrefersDark.value = e.matches
  })
  
  // 当前激活的主题
  const activeTheme = computed<Theme>(() => {
    switch (mode.value) {
      case 'light':
        return defaultLightTheme
      case 'dark':
        return defaultDarkTheme
      case 'system':
        return systemPrefersDark.value ? defaultDarkTheme : defaultLightTheme
      case 'custom':
        return customTheme.value
      default:
        return defaultLightTheme
    }
  })
  
  // CSS变量
  const cssVariables = computed(() => {
    const theme = activeTheme.value
    return {
      '--primary-color': theme.colors.primary,
      '--secondary-color': theme.colors.secondary,
      '--background-color': theme.colors.background,
      '--surface-color': theme.colors.surface,
      '--text-color': theme.colors.text,
      '--text-secondary-color': theme.colors.textSecondary,
      '--border-color': theme.colors.border,
      '--error-color': theme.colors.error,
      '--warning-color': theme.colors.warning,
      '--success-color': theme.colors.success,
      '--info-color': theme.colors.info,
      '--font-size-base': theme.fontSize.base,
      '--font-size-small': theme.fontSize.small,
      '--font-size-large': theme.fontSize.large,
      '--spacing-base': theme.spacing.base,
      '--spacing-small': theme.spacing.small,
      '--spacing-large': theme.spacing.large,
      '--border-radius-base': theme.borderRadius.base,
      '--border-radius-small': theme.borderRadius.small,
      '--border-radius-large': theme.borderRadius.large,
      '--transition-base': theme.transition.base,
      '--transition-fast': theme.transition.fast,
      '--transition-slow': theme.transition.slow
    }
  })
  
  // 应用CSS变量
  watch(cssVariables, (variables) => {
    Object.entries(variables).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value)
    })
  }, { immediate: true })
  
  // 设置主题模式
  function setMode(newMode: ThemeMode) {
    mode.value = newMode
    saveThemeSettings()
  }
  
  // 更新自定义主题
  function updateCustomTheme(newTheme: Partial<Theme>) {
    customTheme.value = {
      ...customTheme.value,
      ...newTheme
    }
    saveThemeSettings()
  }
  
  // 保存主题设置
  function saveThemeSettings() {
    const settings = {
      mode: mode.value,
      customTheme: customTheme.value
    }
    localStorage.setItem('theme-settings', JSON.stringify(settings))
  }
  
  // 加载主题设置
  function loadThemeSettings() {
    const settings = localStorage.getItem('theme-settings')
    if (settings) {
      const { mode: savedMode, customTheme: savedCustomTheme } = JSON.parse(settings)
      mode.value = savedMode
      customTheme.value = savedCustomTheme
    }
  }
  
  // 重置主题设置
  function resetTheme() {
    mode.value = 'system'
    customTheme.value = { ...defaultLightTheme }
    saveThemeSettings()
  }
  
  // 初始化时加载设置
  loadThemeSettings()
  
  return {
    mode,
    customTheme,
    activeTheme,
    cssVariables,
    setMode,
    updateCustomTheme,
    resetTheme
  }
}) 
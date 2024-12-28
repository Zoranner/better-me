import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Settings } from '../types/settings'
import { updateLocale } from '../i18n'

const SETTINGS_STORAGE_KEY = 'better-me-settings'

export const useSettingsStore = defineStore('settings', () => {
  const settings = ref<Settings>({
    general: {
      language: 'zh-CN',
      theme: 'system',
    },
    user: {
      name: '',
      avatar: '',
      gender: 'male',
      birthDate: '',
    },
    model: {
      language: {
        provider: 'openai',
        model: 'gpt-4',
        apiKey: '',
        apiEndpoint: '',
      },
      embedding: {
        provider: 'openai',
        model: 'text-embedding-ada-002',
        apiKey: '',
        apiEndpoint: '',
      },
    },
    data: {
      vectorDb: {
        type: 'milvus',
        endpoint: '',
        apiKey: '',
        collection: '',
      },
    },
  })

  // 从本地存储加载设置
  const loadSettings = () => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
    if (savedSettings) {
      settings.value = JSON.parse(savedSettings)
    }
  }

  // 保存设置到本地存储
  const saveSettings = () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings.value))
  }

  // 更新设置
  const updateSettings = (newSettings: Partial<Settings>) => {
    // 深度合并设置
    if (newSettings.general) {
      settings.value.general = {
        ...settings.value.general,
        ...newSettings.general
      }
      
      // 如果更新了语言设置，立即应用
      if (newSettings.general.language) {
        applyLanguage()
      }
      
      // 如果更新了主题设置，立即应用
      if (newSettings.general.theme) {
        applyTheme()
      }
    }
    if (newSettings.user) {
      settings.value.user = {
        ...settings.value.user,
        ...newSettings.user
      }
    }
    if (newSettings.model) {
      settings.value.model = {
        language: {
          ...settings.value.model.language,
          ...newSettings.model?.language || {}
        },
        embedding: {
          ...settings.value.model.embedding,
          ...newSettings.model?.embedding || {}
        }
      }
    }
    if (newSettings.data) {
      settings.value.data = {
        ...settings.value.data,
        ...newSettings.data
      }
    }

    // 保存到本地存储
    saveSettings()
  }

  // 应用主题
  const applyTheme = () => {
    const theme = settings.value.general.theme
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', isDark)
    } else {
      document.documentElement.classList.toggle('dark', theme === 'dark')
    }
  }

  // 监听系统主题变化
  const watchSystemTheme = () => {
    if (settings.value.general.theme === 'system') {
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', applyTheme)
    }
  }

  // 应用语言
  const applyLanguage = () => {
    updateLocale(settings.value.general.language)
  }

  // 初始化
  loadSettings()
  applyTheme()
  watchSystemTheme()
  applyLanguage()

  return {
    settings,
    updateSettings,
    applyTheme,
    applyLanguage,
  }
}) 
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { SettingCategory, SettingItem, SettingsState } from '../../types/settings'

export const useSettingsStore = defineStore('settings', () => {
  // 当前选中的设置分类
  const activeCategory = ref<SettingCategory>('general')

  // 设置列表
  const settings = ref<SettingItem[]>([
    // 模型设置
    {
      key: 'llmProvider',
      label: '语言模型服务商',
      description: '选择语言模型服务提供商',
      category: 'model',
      type: 'select',
      value: 'openai',
      options: [
        { label: 'OpenAI', value: 'openai' }
      ]
    },
    {
      key: 'llmModel',
      label: '语言模型',
      description: '选择要使用的语言模型',
      category: 'model',
      type: 'select',
      value: 'gpt-4',
      options: [
        { label: 'GPT-4', value: 'gpt-4' }
      ]
    },
    {
      key: 'embeddingProvider',
      label: '嵌入模型服务商',
      description: '选择嵌入模型服务提供商',
      category: 'model',
      type: 'select',
      value: 'openai',
      options: [
        { label: 'OpenAI', value: 'openai' }
      ]
    },
    {
      key: 'embeddingModel',
      label: '嵌入模型',
      description: '选择要使用的嵌入模型',
      category: 'model',
      type: 'select',
      value: 'text-embedding-ada-002',
      options: [
        { label: 'text-embedding-ada-002', value: 'text-embedding-ada-002' }
      ]
    },
    {
      key: 'apiKey',
      label: 'API Key',
      description: '用于访问模型服务的密钥',
      category: 'model',
      type: 'text',
      value: '',
      placeholder: 'sk-...'
    },
    {
      key: 'apiEndpoint',
      label: 'API 地址',
      description: '模型服务的接口地址',
      category: 'model',
      type: 'text',
      value: '',
      placeholder: 'https://api.openai.com'
    },
    // 用户设置
    {
      key: 'username',
      label: '用户名',
      description: '设置您的用户名',
      category: 'user',
      type: 'text',
      value: '',
      placeholder: '请输入用户名'
    },
    {
      key: 'avatar',
      label: '头像',
      description: '选择您的头像图片',
      category: 'user',
      type: 'text',
      value: '',
      placeholder: '选择文件'
    },
    {
      key: 'gender',
      label: '性别',
      description: '选择您的性别',
      category: 'user',
      type: 'select',
      value: 'male',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
        { label: '其他', value: 'other' }
      ]
    },
    // 数据设置
    {
      key: 'vectorDb',
      label: '向量数据库',
      description: '选择向量数据库服务',
      category: 'data',
      type: 'select',
      value: 'milvus',
      options: [
        { label: 'Milvus', value: 'milvus' }
      ]
    },
    {
      key: 'vectorDbEndpoint',
      label: '服务地址',
      description: '向量数据库服务的地址',
      category: 'data',
      type: 'text',
      value: '',
      placeholder: '请输入服务地址'
    },
    {
      key: 'vectorDbApiKey',
      label: 'API Key',
      description: '访问向量数据库服务的密钥',
      category: 'data',
      type: 'text',
      value: '',
      placeholder: '请输入API Key'
    },
    {
      key: 'collectionName',
      label: '集合名称',
      description: '向量数据库集合名称',
      category: 'data',
      type: 'text',
      value: '',
      placeholder: '请输入集合名称'
    },
    // 外观设置
    {
      key: 'theme',
      label: '主题',
      description: '选择界面主题',
      category: 'appearance',
      type: 'select',
      value: 'dark',
      options: [
        { label: '深色', value: 'dark' },
        { label: '浅色', value: 'light' }
      ]
    },
    {
      key: 'language',
      label: '语言',
      description: '选择界面语言',
      category: 'appearance',
      type: 'select',
      value: 'zh',
      options: [
        { label: '中文', value: 'zh' },
        { label: 'English', value: 'en' }
      ]
    },
    // 高级设置
    {
      key: 'proxyEnabled',
      label: '启用代理',
      description: '是否启用网络代理',
      category: 'advanced',
      type: 'boolean',
      value: false
    },
    {
      key: 'proxyHost',
      label: '代理地址',
      description: '代理服务器地址',
      category: 'advanced',
      type: 'text',
      value: '',
      placeholder: '127.0.0.1'
    },
    {
      key: 'proxyPort',
      label: '代理端口',
      description: '代理服务器端口',
      category: 'advanced',
      type: 'number',
      value: 7890,
      min: 1,
      max: 65535
    },
    {
      key: 'maxTokens',
      label: '最大Token数',
      description: '单次对话最大Token数量',
      category: 'advanced',
      type: 'number',
      value: 4096,
      min: 1,
      max: 32768,
      step: 1
    },
    {
      key: 'temperature',
      label: '温度',
      description: '模型输出的随机性（0-2之间，越大越随机）',
      category: 'advanced',
      type: 'number',
      value: 0.7,
      min: 0,
      max: 2,
      step: 0.1
    },
    {
      key: 'debugMode',
      label: '调试模式',
      description: '启用调试模式以显示详细日志',
      category: 'advanced',
      type: 'boolean',
      value: false
    },
    {
      key: 'autoUpdate',
      label: '自动更新',
      description: '是否自动检查并下载更新',
      category: 'advanced',
      type: 'boolean',
      value: true
    }
  ])

  // 根据分类获取设置项
  const currentCategorySettings = computed(() => {
    return settings.value.filter(item => item.category === activeCategory.value)
  })

  // 获取设置值
  function getSetting<T>(key: string): T | undefined {
    const setting = settings.value.find(item => item.key === key)
    return setting?.value as T
  }

  // 更新设置值
  function updateSetting(key: string, value: any) {
    const setting = settings.value.find(item => item.key === key)
    if (setting) {
      setting.value = value
      // 保存到本地存储
      saveSettings()
    }
  }

  // 切换设置分类
  function setActiveCategory(category: SettingCategory) {
    activeCategory.value = category
  }

  // 保存设置到本地存储
  function saveSettings() {
    const settingsData = settings.value.reduce((acc, item) => {
      acc[item.key] = item.value
      return acc
    }, {} as Record<string, any>)
    
    localStorage.setItem('settings', JSON.stringify(settingsData))
  }

  // 从本地存储加载设置
  function loadSettings() {
    const settingsData = localStorage.getItem('settings')
    if (settingsData) {
      const data = JSON.parse(settingsData)
      settings.value.forEach(item => {
        if (data[item.key] !== undefined) {
          item.value = data[item.key]
        }
      })
    }
  }

  // 初始化时加载设置
  loadSettings()

  return {
    activeCategory,
    settings,
    currentCategorySettings,
    getSetting,
    updateSetting,
    setActiveCategory,
    saveSettings,
    loadSettings
  }
}) 
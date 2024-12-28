import type { SettingItem } from '../types/settings'
import type { Theme } from '../types/theme'

interface ExportData {
  version: string
  timestamp: number
  settings: SettingItem[]
  theme: {
    mode: string
    customTheme: Theme
  }
}

// 导出设置
export async function exportSettings(settings: SettingItem[], theme: { mode: string; customTheme: Theme }): Promise<string> {
  const data: ExportData = {
    version: '1.0.0',
    timestamp: Date.now(),
    settings,
    theme
  }
  
  // 创建Blob对象
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  
  // 创建下载链接
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `better-llm-settings-${new Date().toISOString().split('T')[0]}.json`
  
  // 触发下载
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  // 释放URL
  URL.revokeObjectURL(url)
  
  return 'success'
}

// 导入设置
export async function importSettings(file: File): Promise<ExportData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        
        // 验证数据格式
        if (!data.version || !data.settings || !data.theme) {
          throw new Error('无效的设置文件格式')
        }
        
        // 验证版本兼容性
        const [major] = data.version.split('.')
        if (parseInt(major) > 1) {
          throw new Error('不支持的设置文件版本')
        }
        
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => {
      reject(new Error('读取文件失败'))
    }
    
    reader.readAsText(file)
  })
}

// 验证设置数据
export function validateSettings(data: any): boolean {
  // 验证基本结构
  if (!data || typeof data !== 'object') {
    return false
  }
  
  // 验证必需字段
  const requiredFields = ['version', 'timestamp', 'settings', 'theme']
  if (!requiredFields.every(field => field in data)) {
    return false
  }
  
  // 验证设置项
  if (!Array.isArray(data.settings)) {
    return false
  }
  
  // 验证主题
  if (!data.theme || typeof data.theme !== 'object') {
    return false
  }
  
  return true
}

// 合并设置
export function mergeSettings(currentSettings: SettingItem[], importedSettings: SettingItem[]): SettingItem[] {
  const merged = [...currentSettings]
  
  importedSettings.forEach(importedSetting => {
    const index = merged.findIndex(item => item.key === importedSetting.key)
    if (index !== -1) {
      merged[index] = { ...merged[index], ...importedSetting }
    }
  })
  
  return merged
} 
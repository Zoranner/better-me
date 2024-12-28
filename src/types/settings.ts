// 设置分类
export type SettingCategory = 'general' | 'model' | 'user' | 'data' | 'appearance' | 'advanced'

// 设置项类型
export type SettingValueType = 'text' | 'number' | 'boolean' | 'select' | 'color'

// 基础设置项接口
interface BaseSettingItem {
  key: string
  label: string
  description?: string
  category: SettingCategory
  type: SettingValueType
}

// 文本设置项
export interface TextSettingItem extends BaseSettingItem {
  type: 'text'
  value: string
  placeholder?: string
}

// 数字设置项
export interface NumberSettingItem extends BaseSettingItem {
  type: 'number'
  value: number
  min?: number
  max?: number
  step?: number
}

// 布尔设置项
export interface BooleanSettingItem extends BaseSettingItem {
  type: 'boolean'
  value: boolean
}

// 选择设置项
export interface SelectSettingItem extends BaseSettingItem {
  type: 'select'
  value: string
  options: Array<{
    label: string
    value: string
  }>
}

// 颜色设置项
export interface ColorSettingItem extends BaseSettingItem {
  type: 'color'
  value: string
}

// 设置项联合类型
export type SettingItem = 
  | TextSettingItem 
  | NumberSettingItem 
  | BooleanSettingItem 
  | SelectSettingItem
  | ColorSettingItem

// 设置状态接口
export interface SettingsState {
  settings: SettingItem[]
  activeCategory: SettingCategory
} 
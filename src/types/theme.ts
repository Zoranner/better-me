// 主题模式
export type ThemeMode = 'light' | 'dark' | 'system' | 'custom'

// 主题颜色
export interface ThemeColors {
  primary: string
  secondary: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  error: string
  warning: string
  success: string
  info: string
}

// 字体大小
export interface ThemeFontSize {
  base: string
  small: string
  large: string
}

// 间距
export interface ThemeSpacing {
  base: string
  small: string
  large: string
}

// 边框圆角
export interface ThemeBorderRadius {
  base: string
  small: string
  large: string
}

// 过渡
export interface ThemeTransition {
  base: string
  fast: string
  slow: string
}

// 主题接口
export interface Theme {
  colors: ThemeColors
  fontSize: ThemeFontSize
  spacing: ThemeSpacing
  borderRadius: ThemeBorderRadius
  transition: ThemeTransition
}

// 默认亮色主题
export const defaultLightTheme: Theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    background: '#ffffff',
    surface: '#f3f4f6',
    text: '#1f2937',
    textSecondary: '#4b5563',
    border: '#e5e7eb',
    error: '#ef4444',
    warning: '#f59e0b',
    success: '#10b981',
    info: '#3b82f6'
  },
  fontSize: {
    base: '1rem',
    small: '0.875rem',
    large: '1.125rem'
  },
  spacing: {
    base: '1rem',
    small: '0.5rem',
    large: '1.5rem'
  },
  borderRadius: {
    base: '0.375rem',
    small: '0.25rem',
    large: '0.5rem'
  },
  transition: {
    base: '0.2s ease',
    fast: '0.1s ease',
    slow: '0.3s ease'
  }
}

// 默认暗色主题
export const defaultDarkTheme: Theme = {
  colors: {
    primary: '#60a5fa',
    secondary: '#9ca3af',
    background: '#1f2937',
    surface: '#374151',
    text: '#f3f4f6',
    textSecondary: '#d1d5db',
    border: '#4b5563',
    error: '#f87171',
    warning: '#fbbf24',
    success: '#34d399',
    info: '#60a5fa'
  },
  fontSize: {
    base: '1rem',
    small: '0.875rem',
    large: '1.125rem'
  },
  spacing: {
    base: '1rem',
    small: '0.5rem',
    large: '1.5rem'
  },
  borderRadius: {
    base: '0.375rem',
    small: '0.25rem',
    large: '0.5rem'
  },
  transition: {
    base: '0.2s ease',
    fast: '0.1s ease',
    slow: '0.3s ease'
  }
} 
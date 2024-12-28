// 主题类型
export type ThemeMode = 'light' | 'dark' | 'system' | 'custom'

// 主题颜色配置接口
export interface ThemeColors {
  primary: string
  secondary: string
  background: string
  surface: string
  text: {
    primary: string
    secondary: string
    disabled: string
  }
  border: string
  error: string
  warning: string
  success: string
}

export interface ThemeTypography {
  fontFamily: {
    primary: string
    code: string
  }
  fontSize: {
    xs: string
    sm: string
    base: string
    lg: string
    xl: string
    '2xl': string
  }
  fontWeight: {
    normal: number
    medium: number
    bold: number
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
  }
}

export interface ThemeSpacing {
  xs: string
  sm: string
  md: string
  lg: string
  xl: string
}

export interface ThemeShadows {
  sm: string
  md: string
  lg: string
}

export interface ThemeEffects {
  transition: {
    fast: string
    normal: string
    slow: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
    full: string
  }
}

// 主题配置接口
export interface Theme {
  mode: ThemeMode
  colors: ThemeColors
  fontSize: {
    base: string
    small: string
    large: string
  }
  spacing: {
    base: string
    small: string
    large: string
  }
  borderRadius: {
    base: string
    small: string
    large: string
  }
  transition: {
    base: string
    fast: string
    slow: string
  }
  typography: ThemeTypography
  spacing: ThemeSpacing
  shadows: ThemeShadows
  effects: ThemeEffects
}

// 默认主题配置
export const defaultLightTheme: Theme = {
  mode: 'light',
  colors: {
    primary: '#0066cc',
    secondary: '#6c757d',
    background: '#ffffff',
    surface: '#f8f9fa',
    text: {
      primary: '#212529',
      secondary: '#6c757d',
      disabled: '#a0a0a0'
    },
    border: '#dee2e6',
    error: '#dc3545',
    warning: '#ffc107',
    success: '#28a745'
  },
  fontSize: {
    base: '1rem',
    small: '0.875rem',
    large: '1.25rem'
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
    base: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease'
  },
  typography: {
    fontFamily: {
      primary: 'Arial',
      code: 'Monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8
    }
  },
  spacing: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  },
  effects: {
    transition: {
      fast: '0.15s ease',
      normal: '0.3s ease',
      slow: '0.5s ease'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px'
    }
  }
}

// 默认深色主题配置
export const defaultDarkTheme: Theme = {
  mode: 'dark',
  colors: {
    primary: '#0d6efd',
    secondary: '#6c757d',
    background: '#1a1a1a',
    surface: '#2d2d2d',
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
      disabled: '#6c757d'
    },
    border: '#404040',
    error: '#dc3545',
    warning: '#ffc107',
    success: '#28a745'
  },
  fontSize: {
    base: '1rem',
    small: '0.875rem',
    large: '1.25rem'
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
    base: '0.3s ease',
    fast: '0.15s ease',
    slow: '0.5s ease'
  },
  typography: {
    fontFamily: {
      primary: 'Arial',
      code: 'Monospace'
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem'
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      bold: 700
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8
    }
  },
  spacing: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem'
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
  },
  effects: {
    transition: {
      fast: '0.15s ease',
      normal: '0.3s ease',
      slow: '0.5s ease'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      full: '9999px'
    }
  }
} 
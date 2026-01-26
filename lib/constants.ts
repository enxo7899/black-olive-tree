export const DESIGN_TOKENS = {
  colors: {
    nightBase: '#1A1F18',
    dayBase: '#F2F0E9',
    accentGold: '#C2A878',
    actionTerra: '#BC5D41',
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },
  transitions: {
    theme: 300,
    spring: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 30,
    },
  },
} as const

export const THEME_STORAGE_KEY = 'black-olive-tree-theme'

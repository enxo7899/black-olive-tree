'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Theme, ThemeContextType } from '@/types/theme'
import { THEME_STORAGE_KEY } from '@/lib/constants'

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('day')

  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null
    if (stored && (stored === 'day' || stored === 'night')) {
      setThemeState(stored)
    } else {
      const hour = new Date().getHours()
      const autoTheme = hour >= 18 || hour < 6 ? 'night' : 'day'
      setThemeState(autoTheme)
    }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'day' ? 'night' : 'day'))
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

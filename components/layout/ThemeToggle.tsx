'use client'

import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'day' ? 'Night' : 'Day'} Mode`}
      className={cn(
        'relative w-12 h-12 rounded-full flex items-center justify-center',
        'border border-accent-gold/30 backdrop-blur-sm',
        'transition-colors duration-300',
        'hover:bg-accent-gold/10 focus:outline-none focus:ring-2 focus:ring-accent-gold'
      )}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'night' ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {theme === 'day' ? (
          <Sun className="w-5 h-5 text-accent-gold" />
        ) : (
          <Moon className="w-5 h-5 text-accent-gold" />
        )}
      </motion.div>
    </button>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { ThemeToggle } from './ThemeToggle'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'
import { motion, useScroll } from 'framer-motion'

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme } = useTheme()
  const { scrollY } = useScroll()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-heading text-accent-gold tracking-wide">
              Black Olive Tree
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled && theme === 'night' && 'bg-night-base/80 backdrop-blur-md border-b border-white/10',
        scrolled && theme === 'day' && 'bg-day-base/80 backdrop-blur-md border-b border-black/5',
        !scrolled && 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-heading text-accent-gold tracking-wide">
            Black Olive Tree
          </div>

          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#story">Story</NavLink>
            <NavLink href="#menu">Menu</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <MagneticButton>Book Table</MagneticButton>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className={cn(
        'text-sm font-body tracking-wide',
        'transition-colors duration-200',
        'hover:text-accent-gold'
      )}
    >
      {children}
    </a>
  )
}

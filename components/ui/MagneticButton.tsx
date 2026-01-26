'use client'

import { motion } from 'framer-motion'
import { useMagneticEffect } from '@/hooks/useMagneticEffect'
import { cn } from '@/lib/utils'

interface MagneticButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export function MagneticButton({ children, onClick, className }: MagneticButtonProps) {
  const { ref, x, y, handleMouseMove, handleMouseLeave } = useMagneticEffect(0.3)

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn(
        'px-6 py-3 rounded-full font-body text-sm tracking-wide',
        'bg-action-terra text-day-base',
        'transition-all duration-200',
        'hover:shadow-lg hover:shadow-action-terra/20',
        'focus:outline-none focus:ring-2 focus:ring-accent-gold',
        'md:block hidden',
        className
      )}
    >
      {children}
    </motion.button>
  )
}

'use client'

import { motion } from 'framer-motion'
import { MenuItem as MenuItemType } from '@/types/menu'
import { cn } from '@/lib/utils'

interface MenuItemProps {
  item: MenuItemType
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        layout: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      }}
      className={cn(
        'p-6 rounded-lg border transition-colors duration-200',
        'border-accent-gold/20 hover:border-accent-gold/40',
        'bg-day-base/50 backdrop-blur-sm',
        '[data-theme="night"]_&:bg-night-base/30'
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <h3 className="font-heading text-xl mb-1">
            {item.name}
            {item.featured && (
              <span className="ml-2 text-xs text-accent-gold font-body">★</span>
            )}
          </h3>
          {item.dietTags.length > 0 && (
            <div className="flex gap-2 mb-2">
              {item.dietTags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-accent-gold/10 text-accent-gold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <span className="font-heading text-xl text-accent-gold whitespace-nowrap">
          £{item.price.toFixed(2)}
        </span>
      </div>
      
      <p className="font-body text-sm opacity-80 leading-relaxed">
        {item.description}
      </p>

      {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
        <div className="mt-3 flex items-center gap-1">
          <span className="text-xs opacity-60">Heat:</span>
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                'text-action-terra',
                i < item.spiceLevel! ? 'opacity-100' : 'opacity-20'
              )}
            >
              🌶️
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

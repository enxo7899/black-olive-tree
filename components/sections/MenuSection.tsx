'use client'

import { useState } from 'react'
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion'
import { menuItems, menuCategories } from '@/lib/data/menu'
import { MenuItem } from '@/components/ui/MenuItem'
import { MenuCategory } from '@/types/menu'
import { cn } from '@/lib/utils'

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all')

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  return (
    <section id="menu" className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-7xl mb-4 text-accent-gold">
            Our Menu
          </h2>
          <p className="font-body text-lg opacity-80 max-w-2xl mx-auto">
            Curated dishes celebrating Mediterranean traditions with modern London flair
          </p>
        </motion.div>

        {/* Layout: Sticky Sidebar + Grid */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Category Sidebar */}
          <div className="lg:w-64 lg:sticky lg:top-32 h-fit">
            <nav className="space-y-2">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as MenuCategory | 'all')}
                  className={cn(
                    'w-full text-left px-6 py-4 rounded-lg font-body text-lg',
                    'transition-all duration-200',
                    'border border-transparent',
                    activeCategory === category.id
                      ? 'bg-accent-gold text-night-base border-accent-gold'
                      : 'hover:border-accent-gold/30 hover:bg-accent-gold/5'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span>{category.name}</span>
                    <span className="text-sm opacity-60">{category.count}</span>
                  </div>
                </button>
              ))}
            </nav>

            {/* Filter Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-4 rounded-lg bg-accent-gold/5 border border-accent-gold/20"
            >
              <p className="text-xs font-body opacity-70">
                Click categories to filter. Watch the items animate smoothly into place.
              </p>
            </motion.div>
          </div>

          {/* Menu Grid */}
          <div className="flex-1">
            <LayoutGroup>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item) => (
                    <MenuItem key={item.id} item={item} />
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="font-body text-lg opacity-60">
                  No items found in this category
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

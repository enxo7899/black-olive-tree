'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import { menuItems, menuCategories } from '@/lib/data/menu'
import { MenuCategory } from '@/types/menu'
import { cn } from '@/lib/utils'

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  
  const mouseX = useSpring(0, { stiffness: 200, damping: 20 })
  const mouseY = useSpring(0, { stiffness: 200, damping: 20 })

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX)
    mouseY.set(e.clientY)
  }

  return (
    <section 
      id="menu" 
      className="min-h-screen py-24 px-6 bg-[#1A1F18]"
      onMouseMove={handleMouseMove}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-5xl md:text-7xl mb-4 text-[#C2A878]">
            The Menu
          </h2>
          <p className="font-body text-lg text-[#F2F0E9]/70 max-w-2xl mx-auto">
            Mediterranean traditions refined for London
          </p>
        </motion.div>

        {/* Layout: Sticky Sidebar + Editorial List */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Category Sidebar */}
          <div className="lg:w-48 lg:sticky lg:top-32 h-fit">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {menuCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id as MenuCategory | 'all')}
                  className={cn(
                    'font-body text-sm lg:text-base uppercase tracking-wider transition-all duration-200 text-left whitespace-nowrap lg:whitespace-normal',
                    activeCategory === category.id
                      ? 'text-[#C2A878]'
                      : 'text-[#F2F0E9]/50 hover:text-[#F2F0E9]'
                  )}
                >
                  {category.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Editorial Menu List */}
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-1"
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="group cursor-pointer py-6 border-b border-dotted border-[#F2F0E9]/20 transition-colors hover:border-[#C2A878]/50"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl md:text-3xl text-[#F2F0E9] mb-2 group-hover:text-[#C2A878] transition-colors">
                          {item.name}
                        </h3>
                        <p className="font-body text-sm md:text-base text-[#F2F0E9]/60 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="font-heading text-xl md:text-2xl text-[#C2A878] whitespace-nowrap">
                        £{item.price.toFixed(2)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-20">
                <p className="font-body text-lg text-[#F2F0E9]/50">
                  No items in this category
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Image on Hover (Desktop Only) - Fixed Position with Spring */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            style={{
              x: mouseX,
              y: mouseY,
              translateX: '20px',
              translateY: '-100px',
            }}
            className="hidden lg:block fixed pointer-events-none z-50"
          >
            <div className="w-64 h-64 rounded-lg bg-[#C2A878]/10 border border-[#C2A878]/30 flex items-center justify-center backdrop-blur-sm">
              <p className="text-[#C2A878]/50 font-body text-sm">
                Dish Image
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

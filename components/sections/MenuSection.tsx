'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion'
import { menuItems, menuCategories } from '@/lib/data/menu'
import { MenuCategory, MenuItem } from '@/types/menu'
import { cn } from '@/lib/utils'

const dishImages: Record<string, string> = {
  'menu-001': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=400&fit=crop',
  'menu-002': 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop',
  'menu-003': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=400&fit=crop',
  'menu-004': 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&h=400&fit=crop',
  'menu-005': 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop',
  'menu-006': 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=400&fit=crop',
  'menu-007': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop',
  'menu-008': 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=400&fit=crop',
  'menu-009': 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=400&h=400&fit=crop',
  'menu-010': 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400&h=400&fit=crop',
  'menu-011': 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop',
  'menu-012': 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop',
  'menu-013': 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=400&h=400&fit=crop',
  'menu-014': 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=400&fit=crop',
  'menu-015': 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=400&fit=crop',
}

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 }
  const imageX = useSpring(cursorX, springConfig)
  const imageY = useSpring(cursorY, springConfig)

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  const handleMouseMove = (e: React.MouseEvent) => {
    cursorX.set(e.clientX)
    cursorY.set(e.clientY)
  }

  const hoveredItemData = hoveredItem ? menuItems.find(item => item.id === hoveredItem) : null

  return (
    <section 
      ref={sectionRef}
      id="menu" 
      className="min-h-screen py-24 px-6 bg-[#1A1F18] relative"
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
          <span className="text-xs font-body tracking-[0.3em] uppercase text-[#C2A878]/60 block mb-4">
            Culinary Journey
          </span>
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
                    'font-body text-sm lg:text-base uppercase tracking-wider transition-all duration-300 text-left whitespace-nowrap lg:whitespace-normal py-2',
                    activeCategory === category.id
                      ? 'text-[#C2A878]'
                      : 'text-[#F2F0E9]/50 hover:text-[#F2F0E9]'
                  )}
                >
                  {category.name}
                  <span className="ml-2 text-xs text-[#F2F0E9]/30">({category.count})</span>
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
                className="space-y-0"
              >
                {filteredItems.map((item, index) => (
                  <MenuItemRow
                    key={item.id}
                    item={item}
                    index={index}
                    isHovered={hoveredItem === item.id}
                    onHover={() => setHoveredItem(item.id)}
                    onLeave={() => setHoveredItem(null)}
                  />
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

      {/* Spotlight Floating Image - Circular, Follows Cursor with Lag */}
      <AnimatePresence>
        {hoveredItem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ 
              opacity: { duration: 0.2 },
              scale: { type: 'spring', stiffness: 300, damping: 25 }
            }}
            style={{
              x: imageX,
              y: imageY,
            }}
            className="hidden lg:block fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-2 rounded-full bg-[#C2A878]/20 blur-xl" />
              
              {/* Image container */}
              <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-[#C2A878]/40 shadow-2xl relative">
                <motion.img
                  key={hoveredItem}
                  src={dishImages[hoveredItem] || dishImages['menu-001']}
                  alt={hoveredItemData?.name || 'Dish'}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-cover"
                />
                
                {/* Inner overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F18]/60 via-transparent to-transparent" />
              </div>
              
              {/* Floating label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <span className="font-heading text-sm text-[#C2A878] bg-[#1A1F18]/80 px-3 py-1 rounded-full backdrop-blur-sm">
                  {hoveredItemData?.name}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

interface MenuItemRowProps {
  item: MenuItem
  index: number
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
}

function MenuItemRow({ item, index, isHovered, onHover, onLeave }: MenuItemRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={cn(
        'group cursor-pointer py-6 border-b border-dotted transition-all duration-300',
        isHovered 
          ? 'border-[#C2A878]/50 bg-[#C2A878]/5' 
          : 'border-[#F2F0E9]/20'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <motion.h3 
              className={cn(
                'font-heading text-2xl md:text-3xl transition-colors duration-300',
                isHovered ? 'text-[#C2A878]' : 'text-[#F2F0E9]'
              )}
            >
              {item.name}
            </motion.h3>
            {item.featured && (
              <span className="text-[10px] uppercase tracking-wider text-[#BC5D41] bg-[#BC5D41]/10 px-2 py-0.5 rounded-full font-body">
                Chef&apos;s Pick
              </span>
            )}
          </div>
          <p className={cn(
            'font-body text-sm md:text-base leading-relaxed transition-colors duration-300',
            isHovered ? 'text-[#F2F0E9]/80' : 'text-[#F2F0E9]/60'
          )}>
            {item.description}
          </p>
          
          {/* Diet tags */}
          {item.dietTags && item.dietTags.length > 0 && (
            <div className="flex gap-2 mt-3">
              {item.dietTags.map(tag => (
                <span 
                  key={tag}
                  className="text-[10px] uppercase tracking-wider text-[#F2F0E9]/40 font-body"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <motion.span 
            className="font-heading text-xl md:text-2xl text-[#C2A878] whitespace-nowrap"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            £{item.price.toFixed(2)}
          </motion.span>
          
          {/* Animated arrow on hover */}
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              x: isHovered ? 0 : -10 
            }}
            transition={{ duration: 0.2 }}
            className="text-[#C2A878] text-sm"
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.div>
  )
}

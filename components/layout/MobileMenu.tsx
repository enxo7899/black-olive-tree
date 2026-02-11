'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLenis } from '@/providers/SmoothScrollProvider'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'Our Story' },
  { href: '#menu', label: 'Menu' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

const menuVariants = {
  closed: {
    clipPath: 'inset(0 0 100% 0)',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  open: {
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
}

const linkContainerVariants = {
  closed: {
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
}

const linkVariants = {
  closed: {
    y: 80,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  open: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1],
    },
  },
}

const tickerVariants = {
  closed: {
    opacity: 0,
    y: 20,
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.8,
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1],
    },
  },
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { lenis } = useLenis()

  useEffect(() => {
    if (lenis) {
      if (isOpen) {
        lenis.stop()
      } else {
        lenis.start()
      }
    }
  }, [isOpen, lenis])

  const handleLinkClick = (href: string) => {
    onClose()
    setTimeout(() => {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }, 800)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-40 bg-[#1A1F18] flex flex-col"
        >
          {/* Main Navigation Links */}
          <motion.nav
            variants={linkContainerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex-1 flex flex-col justify-center px-8 md:px-16"
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                variants={linkVariants}
                className="overflow-hidden py-2"
              >
                <button
                  onClick={() => handleLinkClick(link.href)}
                  className={cn(
                    'block font-heading text-5xl md:text-7xl lg:text-8xl',
                    'text-[#F2F0E9] hover:text-[#C2A878]',
                    'transition-colors duration-300',
                    'text-left w-full'
                  )}
                >
                  <span className="inline-block">
                    <span className="text-[#C2A878]/40 text-lg md:text-xl font-body mr-4">
                      0{index + 1}
                    </span>
                    {link.label}
                  </span>
                </button>
              </motion.div>
            ))}
          </motion.nav>

          {/* Scrolling Ticker at Bottom */}
          <motion.div
            variants={tickerVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="border-t border-[#F2F0E9]/10 py-4 overflow-hidden"
          >
            <div className="ticker-wrapper">
              <div className="ticker-content animate-ticker">
                <TickerItem />
                <TickerItem />
                <TickerItem />
                <TickerItem />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TickerItem() {
  return (
    <span className="inline-flex items-center gap-8 px-8 font-body text-sm text-[#F2F0E9]/60 whitespace-nowrap">
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C2A878]" />
        18 The Broadway, Southgate, London N14
      </span>
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C2A878]" />
        Mon–Sun: 8am – 11pm
      </span>
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C2A878]" />
        +44 20 1234 5678
      </span>
      <span className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C2A878]" />
        hello@blackolivetree.london
      </span>
    </span>
  )
}

// Hamburger Icon Component (exported for use in Navbar)
interface HamburgerIconProps {
  isOpen: boolean
  onClick: () => void
}

export function HamburgerIcon({ isOpen, onClick }: HamburgerIconProps) {
  return (
    <button
      onClick={onClick}
      className="md:hidden relative w-10 h-10 flex items-center justify-center z-50"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <div className="relative w-6 h-4">
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 6 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="absolute top-0 left-0 w-full h-0.5 bg-[#F2F0E9] origin-center"
        />
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
            scaleX: isOpen ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="absolute top-1/2 left-0 w-full h-0.5 bg-[#F2F0E9] -translate-y-1/2"
        />
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -6 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F2F0E9] origin-center"
        />
      </div>
    </button>
  )
}

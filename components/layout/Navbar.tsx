'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { MagneticButton } from '@/components/ui/MagneticButton'
import { MobileMenu, HamburgerIcon } from '@/components/layout/MobileMenu'
import { cn } from '@/lib/utils'

export function Navbar() {
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

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
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled && !mobileMenuOpen && 'bg-[#1A1F18]/80 backdrop-blur-md border-b border-white/10',
          !scrolled && !mobileMenuOpen && 'bg-transparent',
          mobileMenuOpen && 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-heading text-accent-gold tracking-wide z-50">
              Black Olive Tree
            </div>

            <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden md:flex items-center gap-6">
                <a href="#menu" className="font-body text-sm hover:text-accent-gold transition-colors duration-200">
                  Menu
                </a>
                <a href="#about" className="font-body text-sm hover:text-accent-gold transition-colors duration-200">
                  About
                </a>
                <a href="#contact" className="font-body text-sm hover:text-accent-gold transition-colors duration-200">
                  Contact
                </a>
              </div>

              <div className="hidden md:block">
                <MagneticButton onClick={() => console.log('Book table')}>
                  Book Table
                </MagneticButton>
              </div>

              <HamburgerIcon isOpen={mobileMenuOpen} onClick={toggleMobileMenu} />
            </div>
          </div>
        </div>
      </motion.nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
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

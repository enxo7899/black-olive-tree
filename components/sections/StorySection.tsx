'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [
      'circle(0% at 50% 50%)',
      'circle(150% at 50% 50%)',
      'circle(150% at 50% 50%)',
    ]
  )

  const dayOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0])
  const nightOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 0.5, 1])

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Day Image Layer */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=1920&q=80"
            alt="Morning café atmosphere"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-day-base/20" />
        </div>

        {/* Night Image Layer with Clip-Path Reveal */}
        <motion.div
          style={{ clipPath }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&q=80"
            alt="Evening cocktail bar atmosphere"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-night-base/30" />
        </motion.div>

        {/* Content Overlay */}
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            {/* Morning Text */}
            <motion.div
              style={{ opacity: dayOpacity }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-night-base">
                Morning Calm
              </h2>
              <p className="text-xl md:text-2xl font-body text-night-base/80 max-w-2xl">
                Start your day beneath the shade of our namesake tree. Fresh pastries, 
                artisan coffee, and Mediterranean-inspired breakfast in a tranquil setting.
              </p>
            </motion.div>

            {/* Evening Text */}
            <motion.div
              style={{ opacity: nightOpacity }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <h2 className="font-heading text-5xl md:text-7xl font-bold mb-6 text-day-base">
                Evening Energy
              </h2>
              <p className="text-xl md:text-2xl font-body text-day-base/80 max-w-2xl">
                As dusk falls, the tree transforms. Handcrafted cocktails, curated wines, 
                and vibrant tapas under dappled lighting. The shady lady comes alive.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Progress Indicator */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="fixed right-8 top-1/2 -translate-y-1/2 w-1 h-32 bg-accent-gold origin-top"
        />
      </div>
    </div>
  )
}

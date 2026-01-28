'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { GrainOverlay } from '@/components/ui/GrainOverlay'

const Scene = dynamic(() => import('@/components/three/Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
})

export function HeroSection() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-[#1A1F18]">
      {/* LAYER 0: Grain Texture */}
      <div className="absolute inset-0 z-0">
        <GrainOverlay />
      </div>

      {/* LAYER 1: The 3D Scene (Full Screen Background) */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* LAYER 2: Content Overlay */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            {/* Glow Effect Behind Text */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none" />
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.6, 0.01, 0.05, 0.95] }}
              className="relative font-heading text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] text-[#F2F0E9] mb-6 mix-blend-overlay"
            >
              Black <br /> Olive Tree
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative font-body text-lg md:text-xl text-[#F2F0E9]/80 max-w-md leading-relaxed"
            >
              Mediterranean Soul, London Heart. <br />
              <span className="text-accent-gold/60">18 The Broadway, Southgate.</span>
            </motion.p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (Bottom Center) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-body text-[#F2F0E9]/60">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 rounded-full border-2 border-accent-gold/40 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-accent-gold rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

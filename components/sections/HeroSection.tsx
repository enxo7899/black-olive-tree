'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/three/Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
})

export function HeroSection() {
  const words = ['Black', 'Olive', 'Tree']

  return (
    <section className="relative h-[100dvh] w-full bg-[#1A1F18] flex items-center justify-center overflow-hidden">
      {/* LAYER 1: The 3D Backplate */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* LAYER 2: The Vignette - Focus the eye on center */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, #1A1F18 90%)'
        }}
      />

      {/* LAYER 3: The Typography */}
      <div className="relative z-20 text-center px-4">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.6, 0.01, 0.05, 0.95] }}
          className="font-heading text-6xl md:text-8xl lg:text-9xl text-[#F2F0E9] mix-blend-overlay opacity-90 leading-[0.95] mb-8"
        >
          {words.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.2, 
                duration: 0.8,
                ease: [0.6, 0.01, 0.05, 0.95]
              }}
              className="inline-block mr-4 last:mr-0"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-accent-gold uppercase tracking-[0.2em] text-sm md:text-base font-body"
        >
          Southgate, London
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-accent-gold/30 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-accent-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/three/Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
})

export function HeroSection() {
  return (
    <section className="relative h-[100dvh] w-full bg-gradient-to-b from-[#1A1F18] via-[#1A1F18] to-[#0f120e] flex items-center justify-center overflow-hidden">
      {/* LAYER 1: The 3D Backplate */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* LAYER 2: The Vignette - Focus the eye on center */}
      <div 
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, #1A1F18 90%)'
        }}
      />

      {/* LAYER 3: The Typography - Editorial Style */}
      <div className="relative z-10 text-center px-6 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ 
            duration: 1.2,
            ease: [0.6, 0.01, 0.05, 0.95]
          }}
        >
          {/* Main Title - High Fashion */}
          <h1 className="font-heading font-medium text-[clamp(3rem,8vw,8rem)] text-[#F2F0E9] leading-[0.85] tracking-tight drop-shadow-2xl mb-6">
            Black Olive Tree
          </h1>
          
          {/* Subtitle - Wide Tracking Editorial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="flex items-center justify-center gap-3 text-accent-gold uppercase tracking-[0.3em] text-xs md:text-sm font-body"
          >
            <span>Restaurant</span>
            <span className="w-1 h-1 rounded-full bg-accent-gold"></span>
            <span className="text-[#F2F0E9]/70">Southgate, London</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
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

'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/three/Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
})

export function HeroSection() {
  const title = 'Black Olive Tree'

  const letterVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.6, 0.01, 0.05, 0.95],
      },
    }),
  }

  return (
    <section className="relative h-[100dvh] overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="https://cdn.coverr.co/videos/coverr-olive-tree-branches-moving-in-the-wind-5388/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F18]/50 to-[#1A1F18]" />
      </div>

      {/* Layout Container - Mobile First */}
      <div className="relative z-10 h-full flex flex-col-reverse md:grid md:grid-cols-2 md:gap-8 items-center">
        
        {/* Text Content - Top on Mobile, Left on Desktop */}
        <div className="relative z-20 flex flex-col items-center md:items-start justify-center px-6 md:px-12 pt-24 md:pt-0 pb-12 md:pb-0">
          {/* Glow Effect Behind Text */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-start">
            <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-accent-gold/5 blur-[100px] rounded-full" />
          </div>

          <motion.h1
            initial="hidden"
            animate="visible"
            className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading text-center md:text-left mb-4 md:mb-6 leading-tight"
          >
            {title.split('').map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                custom={index}
                variants={letterVariants}
                style={{ display: 'inline-block' }}
                className="text-[#F2F0E9]"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative text-lg md:text-xl lg:text-2xl font-body text-center md:text-left max-w-xl mb-8 md:mb-12 text-[#F2F0E9]/80"
          >
            Mediterranean Soul, London Heart
          </motion.p>

          {/* Scroll Indicator - Hidden on Mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="hidden md:flex flex-col items-start gap-2"
          >
            <span className="text-sm font-body opacity-60">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-6 h-10 rounded-full border-2 border-accent-gold/40 flex items-start justify-center p-2"
            >
              <div className="w-1 h-2 bg-accent-gold rounded-full" />
            </motion.div>
          </motion.div>
        </div>

        {/* 3D Scene - Bottom on Mobile, Right on Desktop */}
        <div 
          className="relative z-10 h-[40vh] md:h-full w-full flex items-center justify-center"
          style={{ pointerEvents: 'none' }}
        >
          <div className="w-full h-full scale-75 md:scale-100">
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Mobile Scroll Indicator - Bottom Fixed */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="md:hidden absolute bottom-6 left-0 right-0 z-30 flex justify-center"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-accent-gold/40 flex items-start justify-center p-2"
        >
          <div className="w-1 h-2 bg-accent-gold rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}

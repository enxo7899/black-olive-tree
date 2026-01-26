'use client'

import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Scene = dynamic(() => import('@/components/three/Scene').then(mod => ({ default: mod.Scene })), {
  ssr: false,
  loading: () => null,
})

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

export function HeroSection() {
  const title = "Black Olive Tree"
  const letters = title.split('')

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source
            src="https://cdn.coverr.co/videos/coverr-olive-tree-branches-moving-in-the-wind-5388/1080p.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-day-base/50" />
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 z-10 opacity-30">
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <h1 className="font-heading text-7xl md:text-9xl font-bold tracking-tight mb-6">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className="inline-block"
                style={{
                  mixBlendMode: 'overlay',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl md:text-2xl font-body text-accent-gold tracking-wide"
          >
            Mediterranean Soul, London Heart
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-accent-gold rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-accent-gold rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

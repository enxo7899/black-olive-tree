'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const atmosphereCards = [
  {
    id: 1,
    title: 'The Sun Dappled Café',
    description: 'Morning light filters through olive branches as espresso meets fresh pastry',
    time: 'Morning',
    image: 'https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=1600&q=90',
  },
  {
    id: 2,
    title: 'The Culinary Craft',
    description: 'Precision and passion meet in every dish that leaves our kitchen',
    time: 'Transition',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1600&q=90',
  },
  {
    id: 3,
    title: 'The Evening Lounge',
    description: 'Dim lighting illuminates handcrafted cocktails and shared stories',
    time: 'Evening',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600&q=90',
  },
]

export function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Map vertical scroll to horizontal movement
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-66.666%'])

  return (
    <section className="bg-[#1A1F18]">
      {/* Desktop: Horizontal Scroll Gallery */}
      <div ref={containerRef} className="hidden md:block h-[400vh]">
        <div className="sticky top-0 h-screen overflow-hidden flex items-center">
          <motion.div 
            style={{ x }}
            className="flex h-full"
          >
            {atmosphereCards.map((card) => (
              <div
                key={card.id}
                className="relative h-full flex-shrink-0"
                style={{ width: '80vw' }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    priority={card.id === 1}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F18] via-[#1A1F18]/60 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative h-full flex items-end pb-24 px-12">
                  <div className="max-w-3xl">
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="text-sm font-body tracking-[0.3em] uppercase text-[#C2A878] mb-6 block"
                    >
                      {card.time}
                    </motion.span>
                    
                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="font-heading text-6xl lg:text-8xl text-[#F2F0E9] mb-8 leading-[0.85]"
                    >
                      {card.title}
                    </motion.h2>
                    
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className="font-body text-2xl text-[#F2F0E9]/80 max-w-2xl leading-relaxed"
                    >
                      {card.description}
                    </motion.p>

                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '200px' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="h-[2px] bg-[#C2A878] mt-12"
                    />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Scroll Progress Bar */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-[2px] bg-[#F2F0E9]/10 z-10">
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full bg-[#C2A878] origin-left"
            />
          </div>
        </div>
      </div>

      {/* Mobile: Vertical Stack */}
      <div className="md:hidden py-24 px-6 space-y-24">
        {atmosphereCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="space-y-4"
          >
            <div className="relative h-64 rounded-lg overflow-hidden mb-6">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#1A1F18]/40" />
            </div>

            <span className="text-xs font-body tracking-[0.3em] uppercase text-[#C2A878] block">
              {card.time}
            </span>
            
            <h2 className="font-heading text-4xl text-[#F2F0E9] leading-tight">
              {card.title}
            </h2>
            
            <p className="font-body text-lg text-[#F2F0E9]/70 leading-relaxed">
              {card.description}
            </p>

            <div className="h-[1px] bg-[#C2A878] w-24 mt-6" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

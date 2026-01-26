'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section id="about" ref={containerRef} className="min-h-screen py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Parallax Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[600px] rounded-lg overflow-hidden"
          >
            <motion.div
              style={{ y: imageY }}
              className="relative h-[120%] w-full"
            >
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80"
                alt="Mediterranean restaurant interior"
                fill
                className="object-cover"
              />
            </motion.div>
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-night-base/50 to-transparent" />
            
            {/* Decorative frame */}
            <div className="absolute inset-4 border-2 border-accent-gold/30 rounded-lg pointer-events-none" />
          </motion.div>

          {/* Right: Typography Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-sm font-body tracking-widest uppercase text-accent-gold"
              >
                Our Story
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="font-heading text-4xl md:text-6xl leading-tight"
              >
                From the Earth to Southgate
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-4 font-body text-lg leading-relaxed opacity-90"
            >
              <p>
                Inspired by the "Shady Lady" trees of the Mediterranean—the majestic 
                <span className="italic text-accent-gold"> Bucida buceras</span>—our restaurant 
                embodies the dual character of these remarkable trees.
              </p>
              
              <p>
                By day, we offer shelter and calm, a place to gather beneath dappled light. 
                By evening, we transform into a lively social hub where stories are shared 
                over handcrafted cocktails and mezze platters.
              </p>
              
              <p>
                Our chef's table approach means every dish is crafted with intention, 
                sourcing ingredients from family farms across Greece, Spain, and Italy. 
                We bring the warmth of Mediterranean hospitality to the heart of North London.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-6 py-8 border-y border-accent-gold/20"
            >
              <div>
                <div className="font-heading text-3xl text-accent-gold">12+</div>
                <div className="font-body text-sm opacity-70">Years Experience</div>
              </div>
              <div>
                <div className="font-heading text-3xl text-accent-gold">50+</div>
                <div className="font-body text-sm opacity-70">Signature Dishes</div>
              </div>
              <div>
                <div className="font-heading text-3xl text-accent-gold">5★</div>
                <div className="font-body text-sm opacity-70">Average Rating</div>
              </div>
            </motion.div>

            {/* CTA Button - Outline Variant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <button
                className="px-8 py-4 rounded-full font-body text-sm tracking-wide border-2 border-accent-gold text-accent-gold transition-all duration-200 hover:bg-accent-gold hover:text-night-base"
              >
                Meet the Team
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

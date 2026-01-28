'use client'

import { motion } from 'framer-motion'

export function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen py-32 px-6 bg-[#1A1F18] overflow-hidden">
      {/* Subtle Olive Branch Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg
          viewBox="0 0 800 800"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M200 400 Q300 350 400 380 T600 400"
            stroke="#F2F0E9"
            strokeWidth="3"
            fill="none"
          />
          <ellipse cx="250" cy="360" rx="20" ry="40" fill="#F2F0E9" opacity="0.5" />
          <ellipse cx="350" cy="340" rx="22" ry="42" fill="#F2F0E9" opacity="0.5" />
          <ellipse cx="450" cy="370" rx="20" ry="40" fill="#F2F0E9" opacity="0.5" />
          <ellipse cx="550" cy="380" rx="21" ry="41" fill="#F2F0E9" opacity="0.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Magazine Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Large Typography */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xs font-body tracking-[0.3em] uppercase text-[#C2A878] block mb-6"
              >
                Our Roots
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="font-heading text-5xl md:text-7xl lg:text-8xl text-[#F2F0E9] leading-[0.9] mb-8"
              >
                From the Earth to Southgate
              </motion.h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="font-body text-lg md:text-xl text-[#F2F0E9]/70 leading-relaxed max-w-xl"
            >
              Named after the <span className="italic text-[#C2A878]">Bucida buceras</span>—the 
              "Black Olive Tree" of the Mediterranean—we embody the quiet strength and natural 
              hospitality of these ancient groves. From morning light to evening shadow, we are 
              your gathering place.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex gap-12 pt-8"
            >
              <div>
                <div className="font-heading text-2xl text-[#C2A878]">Est. 2024</div>
                <div className="font-body text-sm text-[#F2F0E9]/50 uppercase tracking-wider mt-1">
                  Founded
                </div>
              </div>
              <div>
                <div className="font-heading text-2xl text-[#C2A878]">18 The Broadway</div>
                <div className="font-body text-sm text-[#F2F0E9]/50 uppercase tracking-wider mt-1">
                  Southgate
                </div>
              </div>
              <div>
                <div className="font-heading text-2xl text-[#C2A878]">London</div>
                <div className="font-body text-sm text-[#F2F0E9]/50 uppercase tracking-wider mt-1">
                  N14
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Image Mosaic (3 placeholder boxes) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4 h-[600px]"
          >
            {/* Top Left - Chef Hands */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#C2A878]/10 rounded-lg border border-[#C2A878]/20 flex items-center justify-center"
            >
              <p className="text-[#C2A878]/40 font-body text-sm">Chef Hands</p>
            </motion.div>

            {/* Top Right - Ingredients (Tall) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="bg-[#C2A878]/10 rounded-lg border border-[#C2A878]/20 flex items-center justify-center row-span-2"
            >
              <p className="text-[#C2A878]/40 font-body text-sm">Fresh Ingredients</p>
            </motion.div>

            {/* Bottom Left - Interior Detail */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="bg-[#C2A878]/10 rounded-lg border border-[#C2A878]/20 flex items-center justify-center"
            >
              <p className="text-[#C2A878]/40 font-body text-sm">Interior Detail</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

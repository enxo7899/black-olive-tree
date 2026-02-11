'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function BentoStory() {
  return (
    <section id="story" className="py-24 md:py-32 px-6 bg-[#1A1F18] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-xs font-body tracking-[0.3em] uppercase text-[#C2A878]/60 block mb-4">
            Our Story
          </span>
          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-[#F2F0E9] mb-4">
            The Mediterranean Bento
          </h2>
          <p className="font-body text-lg text-[#F2F0E9]/60 max-w-xl mx-auto">
            Four pillars that define our essence
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {/* Card 1: The Philosophy - Large Text Block */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 lg:row-span-1"
          >
            <div className="h-full min-h-[300px] md:min-h-[350px] p-8 md:p-10 rounded-2xl bg-gradient-to-br from-[#C2A878]/10 to-[#C2A878]/5 border border-[#C2A878]/20 flex flex-col justify-between group hover:border-[#C2A878]/40 transition-all duration-500">
              <div>
                <span className="text-xs font-body tracking-[0.2em] uppercase text-[#C2A878] mb-6 block">
                  01 — The Philosophy
                </span>
                <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#F2F0E9] leading-[1.1] mb-6">
                  Named after the <span className="italic text-[#C2A878]">Bucida buceras</span>
                </h3>
              </div>
              <p className="font-body text-base md:text-lg text-[#F2F0E9]/70 leading-relaxed max-w-2xl">
                The "Black Olive Tree" of the Mediterranean embodies quiet strength and natural hospitality. 
                Like these ancient groves, we are rooted in tradition yet ever-reaching toward the light. 
                From morning's first coffee to evening's last cocktail—we are your gathering place.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Sourcing - Video Card */}
          <motion.div
            variants={itemVariants}
            className="lg:row-span-2"
          >
            <div className="h-full min-h-[400px] lg:min-h-full rounded-2xl overflow-hidden relative group">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
                poster="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&h=1000&fit=crop"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-pouring-olive-oil-on-a-salad-42991-large.mp4" type="video/mp4" />
              </video>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F18] via-[#1A1F18]/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className="text-xs font-body tracking-[0.2em] uppercase text-[#C2A878] mb-3 block">
                  02 — Sourcing
                </span>
                <h3 className="font-heading text-2xl md:text-3xl text-[#F2F0E9] mb-3">
                  From Grove to Table
                </h3>
                <p className="font-body text-sm text-[#F2F0E9]/70 leading-relaxed">
                  Our olive oil arrives weekly from a family estate in Kalamata, Greece. 
                  Single-origin, cold-pressed, extraordinary.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: The Chef - Portrait */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1"
          >
            <div className="h-full min-h-[300px] md:min-h-[280px] rounded-2xl overflow-hidden relative group cursor-pointer">
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=800&fit=crop"
                  alt="Executive Chef"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F18] via-[#1A1F18]/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-body tracking-[0.2em] uppercase text-[#C2A878] mb-2 block">
                  03 — The Chef
                </span>
                <h3 className="font-heading text-xl md:text-2xl text-[#F2F0E9]">
                  Chef Alexandros Papadopoulos
                </h3>
                <p className="font-body text-xs text-[#F2F0E9]/60 mt-1">
                  15 years, three Michelin stars
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Location - Stylized Map */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-1"
          >
            <div className="h-full min-h-[300px] md:min-h-[280px] rounded-2xl overflow-hidden relative bg-[#1A1F18] border border-[#C2A878]/20 group hover:border-[#C2A878]/40 transition-all duration-500">
              {/* Stylized Map SVG Background */}
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
                <svg
                  viewBox="0 0 400 400"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simplified London North area map paths */}
                  <path
                    d="M50 200 Q100 150 200 180 T350 160"
                    stroke="#C2A878"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.5"
                  />
                  <path
                    d="M80 250 Q150 200 250 220 T380 200"
                    stroke="#C2A878"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.3"
                  />
                  <path
                    d="M30 300 Q120 260 220 280 T400 260"
                    stroke="#C2A878"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.2"
                  />
                  
                  {/* Grid pattern */}
                  {[...Array(10)].map((_, i) => (
                    <line
                      key={`h-${i}`}
                      x1="0"
                      y1={i * 40}
                      x2="400"
                      y2={i * 40}
                      stroke="#C2A878"
                      strokeWidth="0.5"
                      opacity="0.1"
                    />
                  ))}
                  {[...Array(10)].map((_, i) => (
                    <line
                      key={`v-${i}`}
                      x1={i * 40}
                      y1="0"
                      x2={i * 40}
                      y2="400"
                      stroke="#C2A878"
                      strokeWidth="0.5"
                      opacity="0.1"
                    />
                  ))}
                  
                  {/* Location pin */}
                  <circle cx="200" cy="180" r="8" fill="#C2A878" opacity="0.8" />
                  <circle cx="200" cy="180" r="16" fill="none" stroke="#C2A878" strokeWidth="2" opacity="0.4" />
                  <circle cx="200" cy="180" r="24" fill="none" stroke="#C2A878" strokeWidth="1" opacity="0.2" />
                </svg>
              </div>
              
              {/* Animated pulse on pin location */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C2A878] opacity-40"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#C2A878]"></span>
                </span>
              </div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="text-xs font-body tracking-[0.2em] uppercase text-[#C2A878] mb-2 block">
                  04 — Location
                </span>
                <h3 className="font-heading text-xl md:text-2xl text-[#F2F0E9] mb-2">
                  North London
                </h3>
                <p className="font-body text-sm text-[#F2F0E9]/70">
                  18 The Broadway<br />
                  Southgate, N14
                </p>
                <div className="mt-4 flex items-center gap-2 text-[#C2A878] font-body text-xs group-hover:gap-3 transition-all duration-300">
                  <span>Get Directions</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          <StatItem number="2024" label="Established" />
          <StatItem number="47" label="Mediterranean Suppliers" />
          <StatItem number="8am–11pm" label="Daily Hours" />
          <StatItem number="100+" label="Wines & Spirits" />
        </motion.div>
      </div>
    </section>
  )
}

function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center md:text-left">
      <div className="font-heading text-2xl md:text-3xl text-[#C2A878] mb-1">
        {number}
      </div>
      <div className="font-body text-xs md:text-sm text-[#F2F0E9]/50 uppercase tracking-wider">
        {label}
      </div>
    </div>
  )
}

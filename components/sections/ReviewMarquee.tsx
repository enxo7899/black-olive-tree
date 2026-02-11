'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const accolades = [
  { text: 'Michelin Guide 2026', icon: '★' },
  { text: 'TimeOut London Best New Restaurant', icon: '◆' },
  { text: 'Vogue Entertaining Pick', icon: '✦' },
  { text: 'Evening Standard Critics Choice', icon: '★' },
  { text: 'Condé Nast Traveller Hot List', icon: '◆' },
  { text: 'Harpers Bazaar Dining', icon: '✦' },
]

const reviews = [
  {
    id: 1,
    quote: "An absolute revelation. The octopus carpaccio transported me straight to the Aegean coast. This is what Mediterranean dining should be.",
    author: "Alexandra H.",
    source: "Google Reviews",
    rating: 5,
  },
  {
    id: 2,
    quote: "From the moment you step inside, you're enveloped in warmth. The lamb kleftiko is the best I've had outside of Greece. A new favourite.",
    author: "James M.",
    source: "TripAdvisor",
    rating: 5,
  },
  {
    id: 3,
    quote: "The attention to detail is extraordinary. Every dish tells a story, and the sommelier's wine pairings were nothing short of inspired.",
    author: "Sophie L.",
    source: "OpenTable",
    rating: 5,
  },
  {
    id: 4,
    quote: "Finally, a restaurant in North London that understands true hospitality. The seafood orzo risotto is pure luxury on a plate.",
    author: "Michael K.",
    source: "Yelp",
    rating: 5,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

export function ReviewMarquee() {
  return (
    <section id="reviews" className="py-24 md:py-32 bg-[#1A1F18] overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 md:mb-16 px-6"
      >
        <span className="text-xs font-body tracking-[0.3em] uppercase text-[#C2A878]/60 block mb-4">
          Recognition
        </span>
        <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl text-[#F2F0E9] mb-4">
          What They Say
        </h2>
      </motion.div>

      {/* Infinite Marquee - Press Accolades */}
      <div className="relative mb-16 md:mb-24">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#1A1F18] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#1A1F18] to-transparent z-10 pointer-events-none" />
        
        <div className="flex overflow-hidden">
          <div className="flex animate-marquee">
            {[...accolades, ...accolades].map((accolade, index) => (
              <div
                key={index}
                className="flex items-center gap-3 px-8 md:px-12 whitespace-nowrap"
              >
                <span className="text-[#C2A878] text-lg">{accolade.icon}</span>
                <span className="font-heading text-xl md:text-2xl lg:text-3xl text-[#F2F0E9]/80 tracking-wide">
                  {accolade.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex animate-marquee" aria-hidden="true">
            {[...accolades, ...accolades].map((accolade, index) => (
              <div
                key={`dup-${index}`}
                className="flex items-center gap-3 px-8 md:px-12 whitespace-nowrap"
              >
                <span className="text-[#C2A878] text-lg">{accolade.icon}</span>
                <span className="font-heading text-xl md:text-2xl lg:text-3xl text-[#F2F0E9]/80 tracking-wide">
                  {accolade.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Grid - Glassmorphism Cards */}
      <div className="px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              className="group"
            >
              <div
                className={cn(
                  'h-full p-8 md:p-10 rounded-2xl',
                  'bg-white/[0.03] backdrop-blur-md',
                  'border border-white/10',
                  'hover:border-[#C2A878]/30 hover:bg-white/[0.05]',
                  'transition-all duration-500'
                )}
              >
                {/* Quote Mark */}
                <div className="text-[#C2A878]/20 text-6xl md:text-7xl font-heading leading-none mb-4">
                  &ldquo;
                </div>
                
                {/* Review Text - Playfair Display (serif) */}
                <blockquote className="font-heading text-lg md:text-xl lg:text-2xl text-[#F2F0E9] leading-relaxed mb-8 italic">
                  {review.quote}
                </blockquote>
                
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-body text-sm text-[#F2F0E9] mb-1">
                      {review.author}
                    </div>
                    <div className="font-body text-xs text-[#F2F0E9]/50">
                      {review.source}
                    </div>
                  </div>
                  
                  {/* Star Rating */}
                  <div className="flex gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="text-[#C2A878] text-sm">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-16 px-6"
      >
        <p className="font-body text-sm text-[#F2F0E9]/50 mb-4">
          Join our guests in experiencing Mediterranean excellence
        </p>
        <a
          href="#contact"
          className={cn(
            'inline-flex items-center gap-2 px-6 py-3 rounded-full',
            'bg-[#C2A878]/10 border border-[#C2A878]/30',
            'text-[#C2A878] font-body text-sm tracking-wide',
            'hover:bg-[#C2A878]/20 hover:border-[#C2A878]/50',
            'transition-all duration-300'
          )}
        >
          Reserve Your Table
          <span className="group-hover:translate-x-1 transition-transform">→</span>
        </a>
      </motion.div>
    </section>
  )
}

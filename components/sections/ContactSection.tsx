'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    guests: '',
    request: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="min-h-screen py-24 px-6 bg-[#1A1F18]">
      <div className="max-w-7xl mx-auto">
        {/* Split Screen Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-first lg:order-last space-y-6"
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xs font-body tracking-[0.3em] uppercase text-[#C2A878] block"
            >
              Private Dining
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="font-heading text-5xl md:text-7xl lg:text-8xl text-[#F2F0E9] leading-[0.9]"
            >
              Host Your Event
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="font-body text-lg md:text-xl text-[#F2F0E9]/70 leading-relaxed max-w-xl"
            >
              From intimate dinners to full venue hire, we craft unforgettable experiences. 
              Our team works with you to create bespoke menus and ambiance tailored to your celebration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="space-y-3 pt-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[#C2A878]" />
                <p className="font-body text-base text-[#F2F0E9]/60">Capacity: 10-80 guests</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[#C2A878]" />
                <p className="font-body text-base text-[#F2F0E9]/60">Bespoke menu design</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1 h-1 rounded-full bg-[#C2A878]" />
                <p className="font-body text-base text-[#F2F0E9]/60">Dedicated event coordinator</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-0 border-b border-[#F2F0E9]/20 py-4 font-body text-lg text-[#F2F0E9] placeholder:text-[#F2F0E9]/40 focus:outline-none focus:border-[#C2A878] transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="date"
                  placeholder="Preferred Date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-transparent border-0 border-b border-[#F2F0E9]/20 py-4 font-body text-lg text-[#F2F0E9] placeholder:text-[#F2F0E9]/40 focus:outline-none focus:border-[#C2A878] transition-colors"
                  required
                />
              </div>

              <div>
                <input
                  type="number"
                  placeholder="Number of Guests"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-transparent border-0 border-b border-[#F2F0E9]/20 py-4 font-body text-lg text-[#F2F0E9] placeholder:text-[#F2F0E9]/40 focus:outline-none focus:border-[#C2A878] transition-colors"
                  required
                  min="10"
                  max="80"
                />
              </div>

              <div>
                <textarea
                  placeholder="Tell us about your event"
                  value={formData.request}
                  onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                  rows={4}
                  className="w-full bg-transparent border-0 border-b border-[#F2F0E9]/20 py-4 font-body text-lg text-[#F2F0E9] placeholder:text-[#F2F0E9]/40 focus:outline-none focus:border-[#C2A878] transition-colors resize-none"
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-4 bg-[#C2A878] text-[#1A1F18] font-body text-base uppercase tracking-wider font-medium rounded-full transition-all duration-200 hover:bg-[#d4ba8a]"
              >
                Enquire Now
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

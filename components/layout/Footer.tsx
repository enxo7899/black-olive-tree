'use client'

import { motion } from 'framer-motion'
import { Instagram, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative bg-[#141812] py-20 px-6">
      {/* Grain Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Massive Typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="font-heading text-[clamp(3rem,12vw,12rem)] leading-[0.85] text-[#F2F0E9] tracking-tight">
            BLACK OLIVE TREE
          </h2>
        </motion.div>

        {/* 3-Column Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16"
        >
          {/* Address */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-[#C2A878]" />
              <h3 className="font-body text-sm uppercase tracking-[0.2em] text-[#C2A878]">
                Address
              </h3>
            </div>
            <p className="font-body text-base text-[#F2F0E9]/70 leading-relaxed">
              18 The Broadway<br />
              Southgate<br />
              London N14 6PH
            </p>
          </div>

          {/* Socials */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Instagram className="w-4 h-4 text-[#C2A878]" />
              <h3 className="font-body text-sm uppercase tracking-[0.2em] text-[#C2A878]">
                Socials
              </h3>
            </div>
            <div className="space-y-2">
              <a
                href="https://instagram.com/blackolivetree"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-base text-[#F2F0E9]/70 hover:text-[#C2A878] transition-colors block"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com/blackolivetree"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-base text-[#F2F0E9]/70 hover:text-[#C2A878] transition-colors block"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-4">
              <Mail className="w-4 h-4 text-[#C2A878]" />
              <h3 className="font-body text-sm uppercase tracking-[0.2em] text-[#C2A878]">
                Hours
              </h3>
            </div>
            <div className="space-y-2 font-body text-base text-[#F2F0E9]/70">
              <div>
                <div className="text-[#C2A878]">Mon - Fri</div>
                <div>8:00 AM - 11:00 PM</div>
              </div>
              <div>
                <div className="text-[#C2A878]">Weekend</div>
                <div>9:00 AM - 12:00 AM</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="pt-8 border-t border-[#F2F0E9]/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-body text-xs text-[#F2F0E9]/40 uppercase tracking-wider">
              © {new Date().getFullYear()} Black Olive Tree. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a
                href="/privacy"
                className="font-body text-xs text-[#F2F0E9]/40 hover:text-[#C2A878] transition-colors uppercase tracking-wider"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="font-body text-xs text-[#F2F0E9]/40 hover:text-[#C2A878] transition-colors uppercase tracking-wider"
              >
                Terms
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

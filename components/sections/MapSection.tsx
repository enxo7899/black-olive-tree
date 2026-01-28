'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export function MapSection() {
  return (
    <section className="relative h-[50vh] w-full bg-[#1A1F18] overflow-hidden">
      {/* Dark Mode Google Maps with CSS Filter */}
      <div className="absolute inset-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2477.8!2d-0.1277!3d51.6321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDM3JzU1LjYiTiAwwrAwNyczOS43Ilc!5e0!3m2!1sen!2suk!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(0.8)' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Black Olive Tree Location"
        />
      </div>

      {/* Floating Location Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute top-8 left-8 bg-[#1A1F18]/95 backdrop-blur-md border border-[#C2A878]/30 rounded-lg p-6 max-w-sm"
      >
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-[#C2A878] flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-heading text-xl text-[#F2F0E9] mb-2">
              The Location
            </h3>
            <p className="font-body text-sm text-[#F2F0E9]/70 leading-relaxed">
              18 The Broadway<br />
              Southgate<br />
              London N14 6PH
            </p>
            <a
              href="https://maps.google.com/?q=18+The+Broadway+Southgate+London"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 font-body text-sm text-[#C2A878] hover:text-[#d4ba8a] transition-colors uppercase tracking-wider"
            >
              Get Directions →
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

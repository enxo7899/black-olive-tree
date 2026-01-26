'use client'

import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, MapPin, Phone, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Footer() {
  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  ]

  const contactInfo = [
    { icon: MapPin, text: '123 High Street, Southgate, London N14 6BP' },
    { icon: Phone, text: '+44 20 1234 5678' },
    { icon: Mail, text: 'hello@blackolivetree.co.uk' },
  ]

  const hours = [
    { day: 'Monday - Friday', time: '8:00 AM - 11:00 PM' },
    { day: 'Saturday', time: '9:00 AM - 12:00 AM' },
    { day: 'Sunday', time: '9:00 AM - 10:00 PM' },
  ]

  return (
    <footer className="relative border-t border-accent-gold/20 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-heading text-3xl mb-4 text-accent-gold">
              Black Olive Tree
            </h3>
            <p className="font-body text-sm opacity-70 leading-relaxed mb-6">
              Mediterranean soul meets London heart. A dual character venue celebrating 
              the art of hospitality.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    'border border-accent-gold/30 transition-all duration-200',
                    'hover:bg-accent-gold hover:border-accent-gold',
                    'hover:text-night-base'
                  )}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-heading text-xl mb-4">Contact</h4>
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <item.icon className="w-4 h-4 text-accent-gold mt-1 flex-shrink-0" />
                  <span className="font-body text-sm opacity-80">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Opening Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-heading text-xl mb-4">Opening Hours</h4>
            <div className="space-y-2">
              {hours.map((schedule, index) => (
                <div key={index} className="font-body text-sm">
                  <div className="opacity-80">{schedule.day}</div>
                  <div className="text-accent-gold">{schedule.time}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="font-heading text-xl mb-4">Stay Updated</h4>
            <p className="font-body text-sm opacity-70 mb-4">
              Subscribe to our newsletter for exclusive offers and events.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="your@email.com"
                className={cn(
                  'w-full px-4 py-3 rounded-lg font-body text-sm',
                  'bg-transparent border border-accent-gold/30',
                  'focus:outline-none focus:border-accent-gold',
                  'transition-colors duration-200',
                  'placeholder:opacity-50'
                )}
              />
              <button
                type="submit"
                className={cn(
                  'w-full px-4 py-3 rounded-lg font-body text-sm tracking-wide',
                  'bg-accent-gold text-night-base',
                  'transition-all duration-200',
                  'hover:shadow-lg hover:shadow-accent-gold/20'
                )}
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-accent-gold/20 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="font-body text-sm opacity-60">
            © {new Date().getFullYear()} Black Olive Tree. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="font-body text-sm opacity-60 hover:opacity-100 hover:text-accent-gold transition-all duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="font-body text-sm opacity-60 hover:opacity-100 hover:text-accent-gold transition-all duration-200"
            >
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

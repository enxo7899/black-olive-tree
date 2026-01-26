'use client'

import { useRef, useState, MouseEvent } from 'react'
import { useSpring } from 'framer-motion'

export function useMagneticEffect(strength: number = 0.3) {
  const ref = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY

    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)
    const maxDistance = 150

    if (distance < maxDistance) {
      x.set(distanceX * strength)
      y.set(distanceY * strength)
      setIsHovered(true)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return {
    ref,
    x,
    y,
    isHovered,
    handleMouseMove,
    handleMouseLeave,
  }
}

'use client'

import { useScroll, useTransform } from 'framer-motion'
import { RefObject } from 'react'

export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  return scrollYProgress
}

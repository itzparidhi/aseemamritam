import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.4 })
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.4 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(mq.matches)
    const handler = (e) => setEnabled(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    const onOver = (e) => {
      const el = e.target instanceof Element ? e.target : null
      if (!el) return
      const isHover = !!el.closest('a, button, [data-cursor-hover], [role="button"]')
      setHovering(isHover)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      {/* Inner dot — 6px. ml/mt -3px shifts its center to the cursor. */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-white mix-blend-difference"
      />
      {/* Outer ring — 36px. ml/mt -18px shifts its center to the cursor. */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        animate={{ scale: hovering ? 2.4 : 1, opacity: hovering ? 0.55 : 1 }}
        transition={{
          scale: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.2 },
        }}
        className="pointer-events-none fixed left-0 top-0 z-[9998] -ml-[18px] -mt-[18px] h-9 w-9 rounded-full border border-white mix-blend-difference"
      />
    </>
  )
}

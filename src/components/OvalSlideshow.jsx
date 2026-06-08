import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export const heroSlides = [
  { src: '/dr-samar.png', label: 'Dr. Aseem Kumar Samar', position: 'object-top' },
  { src: '/clinic/clinic2.jpeg', label: 'Aseem Amritam Cancer Centre', position: 'object-center' },
  { src: '/clinic/clinic3.jpeg', label: 'Reception · Aseem Amritam', position: 'object-center' },
  { src: '/clinic/clinic4.jpeg', label: 'Patient waiting area', position: 'object-center' },
]

export default function OvalSlideshow({ idx = 0 }) {
  const reduced = useReducedMotion()
  const slide = heroSlides[idx]

  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px]">
      {/* Outline rings offset outside */}
      <div className="pointer-events-none absolute -inset-[10px] rounded-[50%] border border-teal-800/30" />
      <div className="pointer-events-none absolute -inset-1 rounded-[50%] border border-teal-800/15" />

      {/* Oval frame — clips the sliding images to the oval shape */}
      <div className="relative h-full w-full overflow-hidden rounded-[50%] bg-teal-100">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={idx}
            src={slide.src}
            alt={slide.label}
            initial={reduced ? { opacity: 0 } : { x: '100%', opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { x: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { x: '-100%', opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
            className={`absolute inset-0 h-full w-full object-cover ${slide.position || 'object-center'}`}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        </AnimatePresence>

        {/* Soft inner shadow */}
        <div className="pointer-events-none absolute inset-0 rounded-[50%] shadow-[inset_0_0_60px_rgba(8,32,30,0.18)]" />
      </div>
    </div>
  )
}

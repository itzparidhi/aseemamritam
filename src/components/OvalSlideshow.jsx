import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export const heroSlides = [
  { src: '/dr-samar.png', label: 'Dr. Aseem Kumar Samar', position: 'object-top' },
  { src: '/clinic/clinic2.jpeg', label: 'Aseem Amritam Cancer Centre', position: 'object-center' },
  { src: '/clinic/clinic3.jpeg', label: 'Reception · Aseem Amritam', position: 'object-center' },
  { src: '/clinic/clinic4.jpeg', label: 'Patient waiting area', position: 'object-center' },
]

/**
 * Props:
 *   idx         current slide index (controlled by parent)
 *   onSwipe     fn(direction: -1|1) called when user drags past threshold
 *   onTap       fn() called when user taps the image (opens lightbox)
 */
export default function OvalSlideshow({ idx = 0, onSwipe, onTap }) {
  const reduced = useReducedMotion()
  const slide = heroSlides[idx]

  const handleDragEnd = (_, info) => {
    if (!onSwipe) return
    const SWIPE_DISTANCE = 60
    const SWIPE_VELOCITY = 400
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) {
      onSwipe(1) // swipe left = go forward
    } else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) {
      onSwipe(-1) // swipe right = go back
    }
  }

  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px]">
      {/* Outline rings offset outside */}
      <div className="pointer-events-none absolute -inset-[10px] rounded-[50%] border border-teal-800/30" />
      <div className="pointer-events-none absolute -inset-1 rounded-[50%] border border-teal-800/15" />

      {/* Oval frame — clips the sliding images to the oval shape.
          `isolation: isolate` + `transform: translateZ(0)` force a new stacking
          context so Safari respects the border-radius clip even when children
          have transforms applied (e.g. framer-motion drag). */}
      <div
        className="group relative h-full w-full overflow-hidden rounded-[50%] bg-teal-100"
        style={{
          touchAction: 'pan-y pinch-zoom',
          isolation: 'isolate',
          transform: 'translateZ(0)',
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.img
            key={idx}
            src={slide.src}
            alt={slide.label}
            drag={onSwipe ? 'x' : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            onTap={() => onTap?.()}
            initial={reduced ? { opacity: 0 } : { x: '100%', opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { x: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { x: '-100%', opacity: 0 }}
            transition={{ duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
            className={`absolute inset-0 h-full w-full select-none object-cover ${slide.position || 'object-center'}`}
            draggable={false}
            style={{ cursor: onTap ? 'zoom-in' : 'grab' }}
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

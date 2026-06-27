import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

/**
 * Fullscreen image viewer with:
 *   - Swipe left/right (mobile) or click arrows (desktop) to navigate
 *   - Double-tap / click-to-zoom (1× ↔ 2.5×)
 *   - Drag to pan when zoomed
 *   - Native pinch-zoom on mobile via touch-action
 *   - Keyboard: ← → arrows, Esc to close
 *
 * Props:
 *   open: boolean
 *   onClose: () => void
 *   images: [{ src, label }]
 *   activeIdx: number
 *   setActiveIdx: (n: number) => void
 */
export default function ImageLightbox({
  open,
  onClose,
  images,
  activeIdx,
  setActiveIdx,
}) {
  const [zoom, setZoom] = useState(1)
  const constraintsRef = useRef(null)

  const go = useCallback(
    (delta) => {
      if (!images?.length) return
      const n = (activeIdx + delta + images.length) % images.length
      setActiveIdx(n)
      setZoom(1) // always reset zoom when switching images
    },
    [activeIdx, images, setActiveIdx],
  )

  // Body scroll lock + cleanup
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Keyboard navigation
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(3, z + 0.5))
      else if (e.key === '-') setZoom((z) => Math.max(1, z - 0.5))
      else if (e.key === '0') setZoom(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, go])

  const handleDragEnd = (_, info) => {
    if (zoom !== 1) return // when zoomed in, drag is for panning, not swiping
    const SWIPE_DISTANCE = 60
    const SWIPE_VELOCITY = 400
    if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) go(1)
    else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) go(-1)
  }

  const toggleZoom = () => setZoom((z) => (z === 1 ? 2.5 : 1))

  if (!images?.length) return null
  const current = images[activeIdx]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] bg-navy-950/95 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-label="Image viewer"
        >
          {/* Header: counter + zoom + close */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-4 sm:p-6">
            <div className="font-num text-xs font-bold uppercase tracking-[0.2em] text-cream/75">
              {activeIdx + 1} / {images.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setZoom((z) => Math.max(1, z - 0.5))
                }}
                aria-label="Zoom out"
                disabled={zoom <= 1}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-cream backdrop-blur transition hover:bg-white/20 disabled:opacity-40"
              >
                <ZoomOut size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setZoom((z) => Math.min(3, z + 0.5))
                }}
                aria-label="Zoom in"
                disabled={zoom >= 3}
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-cream backdrop-blur transition hover:bg-white/20 disabled:opacity-40"
              >
                <ZoomIn size={18} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onClose()
                }}
                aria-label="Close"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-cream backdrop-blur transition hover:bg-white/20"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Image stage */}
          <div
            ref={constraintsRef}
            className="absolute inset-0 grid place-items-center px-4 py-20 sm:px-8 sm:py-24"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={activeIdx}
                drag={zoom === 1 ? 'x' : true}
                dragConstraints={zoom === 1 ? { left: 0, right: 0 } : constraintsRef}
                dragElastic={zoom === 1 ? 0.3 : 0}
                onDragEnd={handleDragEnd}
                onDoubleClick={toggleZoom}
                initial={{ opacity: 0, x: 60, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -60, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="cursor-grab active:cursor-grabbing"
                style={{
                  touchAction: zoom === 1 ? 'pan-y pinch-zoom' : 'none',
                }}
              >
                <motion.img
                  src={current.src}
                  alt={current.label}
                  draggable={false}
                  animate={{ scale: zoom }}
                  transition={{ scale: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                  className="block max-h-[80vh] max-w-[90vw] select-none object-contain sm:max-h-[78vh] sm:max-w-[85vw]"
                  onDoubleClick={toggleZoom}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev / next arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              go(-1)
            }}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-cream backdrop-blur transition hover:bg-white/20 sm:left-6 sm:h-14 sm:w-14"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              go(1)
            }}
            aria-label="Next image"
            className="absolute right-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-cream backdrop-blur transition hover:bg-white/20 sm:right-6 sm:h-14 sm:w-14"
          >
            <ChevronRight size={22} />
          </button>

          {/* Caption + dots */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-3 p-4 text-center text-cream/80 sm:p-6">
            <div className="text-[17px] font-semibold sm:text-sm">{current.label}</div>
            <div className="pointer-events-auto flex items-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveIdx(i)
                    setZoom(1)
                  }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIdx ? 'h-2 w-6 bg-cream' : 'h-2 w-2 bg-cream/40 hover:bg-cream/60'
                  }`}
                />
              ))}
            </div>
            <div className="hidden text-[14px] font-bold uppercase tracking-[0.2em] text-cream/45 sm:block">
              Swipe / arrow keys to navigate · Double-tap to zoom
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

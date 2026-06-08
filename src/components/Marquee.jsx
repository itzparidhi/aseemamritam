import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const items = [
  'Chemotherapy',
  'Targeted Therapy',
  'Immunotherapy',
  'Maintenance Therapy',
  'Solid Tumours',
  'Ovarian Cancer',
  'Oral Cancer',
  'Day-care Chemotherapy',
  'Precision Oncology',
  'Supportive Care',
]

function Star() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3 fill-gold-500" aria-hidden>
      <path d="M8 0 L9 7 L16 8 L9 9 L8 16 L7 9 L0 8 L7 7 Z" />
    </svg>
  )
}

export default function Marquee() {
  const trackRef = useRef(null)

  useEffect(() => {
    if (!trackRef.current) return
    const track = trackRef.current
    const half = track.scrollWidth / 2

    // Scale duration to viewport width so the perceived speed stays consistent
    // across screen sizes. Mobile screens are narrow → items spend less wall-time
    // crossing the viewport, so a fixed 38s feels glacial on a phone but fine on
    // a 1440px desktop. We aim for ~80 px/s on desktop, ~120 px/s on mobile.
    const PX_PER_SEC = window.innerWidth < 768 ? 140 : 90
    const duration = Math.max(8, half / PX_PER_SEC)

    const tween = gsap.to(track, {
      x: -half,
      duration,
      ease: 'none',
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [])

  // Render the items twice so the loop is seamless
  const row = [...items, ...items]

  return (
    <section
      aria-label="Treatments offered"
      className="relative overflow-hidden border-y border-teal-200/40 bg-cream py-6 md:py-7"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-cream to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-cream to-transparent" />

      <div ref={trackRef} className="flex w-max items-center gap-6 whitespace-nowrap sm:gap-10">
        {row.map((label, i) => (
          <span key={i} className="inline-flex items-center gap-6 sm:gap-10">
            <span className="text-sm font-bold uppercase tracking-[0.28em] text-teal-900/80 md:text-base">
              {label}
            </span>
            <Star />
          </span>
        ))}
      </div>
    </section>
  )
}

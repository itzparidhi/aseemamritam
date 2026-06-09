import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import OvalSlideshow, { heroSlides } from './OvalSlideshow'
import RotatingScrollBadge from './RotatingScrollBadge'
import { HeroDivider } from './EmergencyStrip'
import ImageLightbox from './ImageLightbox'

const testimonials = [
  {
    quote:
      "I was anxious when I first visited, but Dr. Samar and his team explained everything with such patience and kindness. The care I received gave my family real hope. We are deeply grateful.",
    name: 'R. Sharma',
    role: 'Family of patient · 2024',
  },
  {
    quote:
      "From the first consultation through every cycle of treatment, the team has been precise, present, and genuinely warm. The centre feels less like a hospital — more like a second home.",
    name: 'M. Agarwal',
    role: 'Patient · Jaipur',
  },
  {
    quote:
      "Dr. Samar's clarity at every step gave us strength. We always knew what to expect and felt held by a team that truly cares. We will never forget this kindness.",
    name: 'S. Khandelwal',
    role: 'Family · 2023',
  },
]

export default function Hero() {
  const [tIdx, setTIdx] = useState(0)
  const [slideIdx, setSlideIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const pausedUntilRef = useRef(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = setInterval(() => setTIdx((i) => (i + 1) % testimonials.length), 7000)
    return () => clearInterval(id)
  }, [])

  // Auto-advance the oval slideshow every 4.5s, unless the user is interacting
  // (swiped manually or has the lightbox open) — then we pause for 10s after.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = setInterval(() => {
      if (lightboxOpen) return
      if (Date.now() < pausedUntilRef.current) return
      setSlideIdx((i) => (i + 1) % heroSlides.length)
    }, 4500)
    return () => clearInterval(id)
  }, [lightboxOpen])

  // User actions on the slideshow pause the auto-advance for 10s
  const pauseAuto = (ms = 10000) => {
    pausedUntilRef.current = Date.now() + ms
  }

  const handleSwipe = (direction) => {
    pauseAuto()
    setSlideIdx((i) => (i + direction + heroSlides.length) % heroSlides.length)
  }

  const handleTap = () => {
    pauseAuto()
    setLightboxOpen(true)
  }

  const initials = (name) =>
    name.split(' ').map((s) => s[0]).join('')

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-cream pt-28 sm:pt-32 md:pt-40 lg:pt-44 xl:pt-48">
      {/* Soft drifting background tint */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 h-[320px] w-[320px] rounded-full bg-teal-100/50 blur-3xl animate-drift sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px]" />
        <div
          className="absolute -right-32 bottom-32 h-[260px] w-[260px] rounded-full bg-gold-100/40 blur-3xl animate-drift sm:h-[340px] sm:w-[340px] lg:h-[420px] lg:w-[420px]"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="container-x relative grid items-start gap-10 pb-16 sm:gap-12 sm:pb-20 md:pb-24 lg:grid-cols-12 lg:gap-6 xl:gap-8">
        {/* LEFT — wordmark + intro + testimonial */}
        <div className="order-1 lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="font-display font-bold leading-[0.95] tracking-[0.01em] bg-gradient-to-b from-teal-950 via-teal-700 to-teal-500 bg-clip-text text-transparent text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.2rem] xl:text-[5rem]"
              style={{
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                fontVariationSettings: "'opsz' 144",
              }}
            >
              ASEEM<br />
              AMRITAM
            </h1>
            <div className="mt-3 text-[12px] font-semibold uppercase tracking-[0.32em] text-teal-800/70 sm:text-[14px] sm:tracking-[0.38em] md:text-[15px]">
              Cancer Centre · Jaipur
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-teal-900/75 sm:mt-7 sm:text-[17px] md:text-[19px]"
          >
            Located in Vaishali Nagar, Jaipur, <b className="text-teal-950">Aseem Amritam Cancer Centre</b> is a comprehensive medical oncology centre where <b className="text-teal-950">Dr. Aseem Kumar Samar</b> listens carefully to every patient and guides them through treatment with expertise and compassion.
          </motion.p>

          {/* Rotating testimonial — no visible card, just an accent border */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-7 max-w-md border-l-2 border-teal-800/25 pl-4 sm:mt-8 sm:pl-5"
          >
            <div className="relative min-h-[200px] sm:min-h-[180px]">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-[1100ms] ease-out"
                  style={{
                    opacity: i === tIdx ? 1 : 0,
                    pointerEvents: i === tIdx ? 'auto' : 'none',
                  }}
                  aria-hidden={i !== tIdx}
                >
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="grid h-7 w-7 place-items-center rounded-full border border-teal-800/30 text-[10px] font-semibold text-teal-800/80">
                      {initials(t.name)}
                    </span>
                    <div className="text-[12px] uppercase tracking-[0.2em] text-teal-800/55 sm:text-[14px] sm:tracking-[0.24em]">
                      Patient Voice
                    </div>
                  </div>
                  <p className="text-[14px] leading-[1.65] text-teal-900/75 sm:text-[16px]">
                    "{t.quote}"
                  </p>
                  <div className="mt-3 text-[10px] uppercase tracking-[0.2em] text-teal-900/55">
                    — {t.name} · {t.role}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CENTER — oval slideshow + scroll badge */}
        <div className="relative order-2 mx-auto w-full max-w-[340px] sm:max-w-[400px] md:max-w-[440px] lg:order-2 lg:col-span-4 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <OvalSlideshow idx={slideIdx} onSwipe={handleSwipe} onTap={handleTap} />
          </motion.div>

          {/* Scroll badge — lower-right of oval */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -bottom-2 right-0 sm:right-2 md:right-8 lg:-right-2 xl:-right-4"
          >
            <RotatingScrollBadge label={heroSlides[slideIdx].label} />
          </motion.div>
        </div>

        {/* RIGHT — lotus + tagline */}
        <div className="order-3 lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="mx-auto h-44 w-44 sm:h-56 sm:w-56 md:h-64 md:w-64 lg:h-60 lg:w-60 xl:h-80 xl:w-80"
          >
            <img
              src="/logo.svg"
              alt="Aseem Amritam Cancer Centre"
              className="h-full w-full object-contain"
            />
          </motion.div>

          {/* Headline tagline — directly under the logo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9 }}
            className="mx-auto -mt-6 max-w-[18rem] px-4 text-center font-display text-lg font-bold italic leading-snug text-teal-900 sm:-mt-8 sm:max-w-[20rem] sm:text-xl md:-mt-10 md:max-w-[22rem] md:text-[22px] lg:-mt-8 lg:max-w-[16rem] lg:text-[19px] xl:-mt-14 xl:max-w-[20rem] xl:text-2xl"
            style={{ textWrap: 'balance' }}
          >
            Compassionate, world-class cancer care
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="mx-auto mt-6 flex max-w-md sm:mt-8 lg:max-w-none"
          >
            <div className="mr-4 w-px self-stretch bg-teal-800/25 sm:mr-5" />
            <div className="space-y-3">
              <p className="text-[13px] leading-relaxed text-teal-900/70 sm:text-[14px] lg:text-[13px]">
                Aseem Amritam is a place of healing and hope.
              </p>
              <p className="text-[13px] leading-relaxed text-teal-900/70 sm:text-[14px] lg:text-[13px]">
                We are with you at every step of the journey.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Thin divider with four-point star at bottom
      <div className="container-x relative mb-10">
        <HeroDivider />
      </div> */}

      {/* Fullscreen viewer for the clinic photos — swipe, pinch-zoom, pan */}
      <ImageLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={heroSlides}
        activeIdx={slideIdx}
        setActiveIdx={setSlideIdx}
      />
    </section>
  )
}

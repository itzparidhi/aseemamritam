import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import OvalSlideshow, { heroSlides } from './OvalSlideshow'
import RotatingScrollBadge from './RotatingScrollBadge'
import { HeroDivider } from './EmergencyStrip'

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

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = setInterval(() => setTIdx((i) => (i + 1) % testimonials.length), 7000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return
    const id = setInterval(() => setSlideIdx((i) => (i + 1) % heroSlides.length), 4500)
    return () => clearInterval(id)
  }, [])

  const initials = (name) =>
    name.split(' ').map((s) => s[0]).join('')

  return (
    <section id="top" className="relative min-h-screen overflow-hidden bg-cream pt-36 sm:pt-40 md:pt-44 lg:pt-48">
      {/* Soft drifting background tint */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-teal-100/50 blur-3xl animate-drift" />
        <div
          className="absolute -right-32 bottom-32 h-[420px] w-[420px] rounded-full bg-gold-100/40 blur-3xl animate-drift"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="container-x relative grid items-start gap-12 pb-20 md:pb-24 lg:grid-cols-12 lg:gap-6 xl:gap-8">
        {/* LEFT — wordmark + intro + testimonial */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="font-display font-bold leading-[0.95] tracking-[0.01em] bg-gradient-to-b from-teal-950 via-teal-700 to-teal-500 bg-clip-text text-transparent text-[2.4rem] sm:text-[3.4rem] md:text-[4rem] lg:text-[4.2rem] xl:text-[5rem]"
              style={{
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                fontVariationSettings: "'opsz' 144",
              }}
            >
              ASEEM<br />
              AMRITAM
            </h1>
            <div className="mt-3 text-[15px] font-semibold uppercase tracking-[0.38em] text-teal-800/70 sm:text-[15px]">
              Cancer Centre · Jaipur
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-7 max-w-md text-sm leading-relaxed text-teal-900/75 sm:text-[19px]"
          >
            Located in Vaishali Nagar, Jaipur, <b className="text-teal-950">Aseem Amritam Cancer Centre</b> is a comprehensive medical oncology centre where <br /><b className="text-teal-950">Dr. Aseem Kumar Samar</b> listens carefully to every patient and guides them through treatment with expertise and compassion.
          </motion.p>

          {/* Rotating testimonial — no visible card, just an accent border */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="mt-8 max-w-md border-l-2 border-teal-800/25 pl-5"
          >
            <div className="relative min-h-[170px]">
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
                    <div className="text-[15px] uppercase tracking-[0.24em] text-teal-800/55">
                      Patient Voice
                    </div>
                  </div>
                  <p className="text-[16px] leading-[1.65] text-teal-900/75">
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
        <div className="relative lg:col-span-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <OvalSlideshow idx={slideIdx} />
          </motion.div>

          {/* Scroll badge — lower-right of oval */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="absolute -bottom-2 right-2 md:right-8 lg:-right-2 xl:-right-4"
          >
            <RotatingScrollBadge label={heroSlides[slideIdx].label} />
          </motion.div>
        </div>

        {/* RIGHT — lotus + tagline */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="mx-auto h-56 w-56 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-64 lg:w-64 xl:h-80 xl:w-80"
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
            className="mx-auto -mt-8 w-56 text-center font-display text-xl font-bold italic leading-snug text-teal-900 sm:w-60 md:-mt-12 md:w-72 md:text-[22px] lg:-mt-10 lg:w-64 lg:text-[20px] xl:-mt-14 xl:w-80 xl:text-2xl"
          >
            Compassionate, world-class cancer care
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="mt-8 flex"
          >
            <div className="mr-5 w-px self-stretch bg-teal-800/25" />
            <div className="space-y-3">
              <p className="text-[13px] leading-relaxed text-teal-900/70">
                Aseem Amritam is a place of healing and hope.
              </p>
              <p className="text-[13px] leading-relaxed text-teal-900/70">
                We are with you at every step of the journey.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Thin divider with four-point star at bottom */}
      <div className="container-x relative mb-10">
        <HeroDivider />
      </div>
    </section>
  )
}

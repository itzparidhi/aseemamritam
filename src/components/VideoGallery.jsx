import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, ArrowUpRight } from 'lucide-react'
import SectionLabel from './SectionLabel'
import WordReveal from './WordReveal'
import BookingModal from './BookingModal'

const highlights = [
  '15+ years of medical oncology practice',
  "DM from Tata Memorial Hospital, Mumbai — India's foremost cancer institute",
  'Patient-first consultation — plain language, unhurried, attentive',
]

export default function VideoGallery() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)

  // SearchPalette dispatches 'open-booking' when the user picks the
  // "Book a consultation" action — receive it here so the modal opens
  // regardless of where the action was triggered from.
  useEffect(() => {
    const onOpen = () => setBookingOpen(true)
    window.addEventListener('open-booking', onOpen)
    return () => window.removeEventListener('open-booking', onOpen)
  }, [])

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      // After the video ends, currentTime sits at duration — play() then
      // does nothing visible. Rewind first so the user can replay.
      if (el.ended || (el.duration && el.currentTime >= el.duration - 0.1)) {
        el.currentTime = 0
      }
      const p = el.play()
      if (p && typeof p.then === 'function') p.catch(() => setPlaying(false))
      setPlaying(true)
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <section id="gallery" className="relative bg-teal-950 py-24 text-cream md:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-32 left-1/3 h-[400px] w-[400px] rounded-full bg-teal-500/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-gold-400/20 blur-3xl" />
      </div>

      <div className="container-x">
        <SectionLabel index={2} label="A Message" light />

        <div className="mt-12 grid items-center gap-14 lg:mt-16 lg:grid-cols-2 lg:gap-20">
          {/* LEFT — incoming text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-[15px] font-bold uppercase tracking-[0.28em] text-gold-400">
              In His Own Voice
            </div>

            <WordReveal
              as="h2"
              className="h-display mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-[3.2rem]"
              stagger={0.06}
            >
              Hear directly from <em className="text-gold-300">Dr. Samar</em>.
            </WordReveal>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-md text-base leading-[1.85] text-teal-100/80"
            >
              In every consultation, Dr. Samar takes the time to listen — not just to
              symptoms, but to the worries and questions that come with a cancer diagnosis.
              Watch a short message about his approach and what every patient can expect at
              Aseem Amritam.
            </motion.p>

            <ul className="mt-8 space-y-3.5">
              {highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    delay: 0.5 + i * 0.13,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex items-start gap-3 text-[18px] leading-[1.6] text-teal-100/85 sm:text-[19px]"
                >
                  <span className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-gold-400" />
                  <span>{h}</span>
                </motion.li>
              ))}
            </ul>

            <motion.button
              type="button"
              onClick={() => setBookingOpen(true)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-gold-400 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-teal-950 transition hover:bg-gold-300"
            >
              Book a consultation
              <ArrowUpRight size={16} className="transition group-hover:rotate-45" />
            </motion.button>
          </motion.div>

          {/* RIGHT — video player */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="group relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-3xl border border-teal-700/40 shadow-glow"
          >
            <video
              ref={videoRef}
              src="/dr-samar-message.mp4"
              poster="/dr-samar.jpeg"
              playsInline
              preload="metadata"
              loop
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark gradient overlay — fades out while playing */}
            <div
              className={`pointer-events-none absolute inset-0 bg-gradient-to-t from-teal-950/70 via-transparent to-teal-950/30 transition-opacity duration-500 ${
                playing ? 'opacity-0' : 'opacity-100'
              }`}
            />

            {/* Play / pause control */}
            <button
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
              className="absolute inset-0 grid place-items-center"
            >
              <span
                className={`grid h-20 w-20 place-items-center rounded-full bg-gold-400 text-teal-950 shadow-glow transition-all duration-300 ${
                  playing
                    ? 'scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                    : 'scale-100 opacity-100'
                }`}
              >
                {playing ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
              </span>
            </button>

            {/* Caption bottom-left */}
            <div
              className={`pointer-events-none absolute inset-x-0 bottom-0 p-6 transition-opacity duration-500 ${
                playing ? 'opacity-0' : 'opacity-100'
              }`}
            >
              <div className="text-[14px] font-bold uppercase tracking-[0.22em] text-gold-300">
                Watch · 60 seconds
              </div>
              <div className="mt-1 font-display text-lg font-bold leading-tight text-cream">
                A message from Dr. Aseem Samar
              </div>
            </div>
          </motion.figure>
        </div>
      </div>

      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </section>
  )
}
